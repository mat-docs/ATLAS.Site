#!/usr/bin/env python3
"""Emit /llms.txt and /llms-full.txt for the built site.

Standalone replacement for the old hooks/llms_txt.py MkDocs hook. Zensical
doesn't run MkDocs build hooks, so this walks mkdocs.yml's `nav:` tree and
each page's markdown directly from disk instead of relying on MkDocs'
internal Page/Navigation/Files objects. Run after the site build, pointed at
the site's output directory:

    python scripts/generate_llms_txt.py [site_dir]

Follows the llms.txt convention (https://llmstxt.org/):

  - llms.txt       Structured index of every page in the navigation, with a
                    short summary per page. Mirrors the site's nav hierarchy.
  - llms-full.txt  Concatenated markdown of every page, in nav order, with
                    canonical URLs as anchors.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
MKDOCS_YML = REPO_ROOT / "mkdocs.yml"

_FRONT_MATTER_RE = re.compile(r"\A---\n.*?\n---\s*\n", re.DOTALL)
_HTML_COMMENT_RE = re.compile(r"<!--.*?-->", re.DOTALL)
_BLANK_LINES_RE = re.compile(r"\n{3,}")
_H1_RE = re.compile(r"^#\s+(.+?)\s*$", re.MULTILINE)
_SUMMARY_MAX_LEN = 200


# ---------- lenient mkdocs.yml loading ----------
# mkdocs.yml uses custom tags (!ENV, !!python/name:...) for values we don't
# need here (env var substitution, emoji callables). Ignore them rather than
# depending on mkdocs/pyyaml-env-tag being installed to resolve them.


class _LenientLoader(yaml.SafeLoader):
    pass


def _construct_passthrough(loader: yaml.SafeLoader, tag_suffix: str, node: yaml.Node):
    if isinstance(node, yaml.ScalarNode):
        return loader.construct_scalar(node)
    if isinstance(node, yaml.SequenceNode):
        return loader.construct_sequence(node)
    return loader.construct_mapping(node)


_LenientLoader.add_multi_constructor("!", _construct_passthrough)
_LenientLoader.add_multi_constructor(
    "tag:yaml.org,2002:python/name:", _construct_passthrough
)


def _load_mkdocs_config() -> dict:
    return yaml.load(MKDOCS_YML.read_text(encoding="utf-8"), Loader=_LenientLoader)


# ---------- lightweight nav model ----------


class NavPage:
    __slots__ = ("title", "src_uri")

    def __init__(self, title: str | None, src_uri: str):
        self.title = title
        self.src_uri = src_uri


class NavSection:
    __slots__ = ("title", "children")

    def __init__(self, title: str, children: list):
        self.title = title
        self.children = children


class NavLink:
    __slots__ = ("title", "url")

    def __init__(self, title: str, url: str):
        self.title = title
        self.url = url


def _is_external(target: str) -> bool:
    return target.startswith(("http://", "https://", "mailto:"))


def _build_nav(items: list) -> list:
    return [_build_nav_item(item) for item in items]


def _build_nav_item(item):
    if isinstance(item, str):
        return NavLink(item, item) if _is_external(item) else NavPage(None, item)
    if isinstance(item, dict) and len(item) == 1:
        ((title, value),) = item.items()
        if isinstance(value, str):
            return NavLink(title, value) if _is_external(value) else NavPage(title, value)
        if isinstance(value, list):
            return NavSection(title, _build_nav(value))
    raise ValueError(f"Unrecognised nav entry: {item!r}")


# ---------- page content helpers ----------


def _clean_quoted(s: str) -> str:
    return s.strip().strip('"').strip("'").strip()


def _abs_url(site_url: str, page_url: str) -> str:
    page_url = (page_url or "").lstrip("/")
    return f"{site_url}/{page_url}" if site_url else "/" + page_url


def _collapse_blank(s: str) -> str:
    return _BLANK_LINES_RE.sub("\n\n", s)


def _one_line(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


def _strip_markdown_for_summary(text: str) -> str:
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"[*_`]+", "", text)
    return _one_line(text)


def _page_url(src_uri: str) -> str:
    """Mirrors MkDocs' default use_directory_urls: foo/bar.md -> foo/bar/.

    index.md and README.md are both treated as a directory's index page.
    """
    for index_name in ("index.md", "README.md"):
        if src_uri == index_name:
            return ""
        if src_uri.endswith("/" + index_name):
            return src_uri[: -len(index_name)]
    if src_uri.endswith(".md"):
        return src_uri[:-3] + "/"
    return src_uri


class _Page:
    def __init__(self, docs_dir: Path, nav_title: str | None, src_uri: str):
        raw = (docs_dir / src_uri).read_text(encoding="utf-8")
        front_matter: dict = {}
        md = raw
        fm_match = _FRONT_MATTER_RE.match(raw)
        if fm_match:
            fm_text = fm_match.group(0).strip("-\n")
            try:
                front_matter = yaml.safe_load(fm_text) or {}
            except yaml.YAMLError:
                front_matter = {}
            md = raw[fm_match.end() :]

        h1_match = _H1_RE.search(md)
        self.title = (
            nav_title
            or front_matter.get("title")
            or (h1_match.group(1).strip() if h1_match else src_uri)
        )
        self.description = front_matter.get("description")
        self.markdown = md
        self.src_uri = src_uri
        self.url = _page_url(src_uri)


def _load_page(docs_dir: Path, nav_page: NavPage) -> _Page | None:
    path = docs_dir / nav_page.src_uri
    if not path.is_file():
        print(f"warning: nav references missing file {nav_page.src_uri}", file=sys.stderr)
        return None
    return _Page(docs_dir, nav_page.title, nav_page.src_uri)


def _page_summary(page: _Page) -> str:
    if page.description:
        return _one_line(str(page.description))[:_SUMMARY_MAX_LEN]
    md = _HTML_COMMENT_RE.sub("", page.markdown)
    for para in re.split(r"\n\s*\n", md):
        para = para.strip()
        if not para:
            continue
        if para.startswith("#") or para.startswith("---"):
            continue
        if para.startswith("<") or para.startswith("```"):
            continue
        if para.startswith("|") or para.startswith("=="):
            continue
        if para.startswith("!!!") or para.startswith("???"):
            # Skip admonitions - they're typically disclaimers or callouts,
            # not the page's actual subject.
            continue
        cleaned = _strip_markdown_for_summary(para)
        if cleaned:
            return cleaned[:_SUMMARY_MAX_LEN]
    return ""


# ---------- llms.txt (index) ----------


def _render_index(
    site_name: str,
    site_description: str,
    site_url: str,
    repo_url: str,
    docs_dir: Path,
    nav_items: list,
) -> str:
    out: list[str] = [f"# {site_name}", ""]
    if site_description:
        out += [f"> {site_description}", ""]
    out += [
        "This file follows the llms.txt convention (https://llmstxt.org/).",
        "It maps the public documentation so language models can locate any",
        "topic without crawling the rendered HTML site.",
        "",
    ]
    if repo_url:
        out.append(f"Source repository: {repo_url}")
    if site_url:
        out.append(f"Full text: {site_url}/llms-full.txt")
    out.append("")

    for item in nav_items:
        out.extend(_render_index_top(item, site_url, docs_dir))

    return _collapse_blank("\n".join(out).rstrip()) + "\n"


def _render_index_top(item, site_url: str, docs_dir: Path) -> list[str]:
    if isinstance(item, NavSection):
        lines = [f"## {item.title}", ""]
        for child in item.children:
            lines.extend(_render_index_bullet(child, site_url, docs_dir, depth=0))
        lines.append("")
        return lines
    if isinstance(item, NavPage):
        page = _load_page(docs_dir, item)
        if page is None:
            return []
        lines = [f"## {page.title}", ""]
        lines.extend(_render_index_bullet(item, site_url, docs_dir, depth=0))
        lines.append("")
        return lines
    if isinstance(item, NavLink):
        return [f"## {item.title}", "", f"- [{item.title}]({item.url})", ""]
    return []


def _render_index_bullet(item, site_url: str, docs_dir: Path, depth: int) -> list[str]:
    pad = "  " * depth
    if isinstance(item, NavPage):
        page = _load_page(docs_dir, item)
        if page is None:
            return []
        url = _abs_url(site_url, page.url)
        summary = _page_summary(page)
        line = f"{pad}- [{page.title}]({url})"
        if summary:
            line += f": {summary}"
        return [line]
    if isinstance(item, NavSection):
        bullets = [f"{pad}- **{item.title}**"]
        for child in item.children:
            bullets.extend(_render_index_bullet(child, site_url, docs_dir, depth + 1))
        return bullets
    if isinstance(item, NavLink):
        return [f"{pad}- [{item.title}]({item.url})"]
    return []


# ---------- llms-full.txt ----------


def _render_full(
    site_name: str, site_description: str, site_url: str, docs_dir: Path, nav_items: list
) -> str:
    out: list[str] = [f"# {site_name}", ""]
    if site_description:
        out += [f"> {site_description}", ""]
    if site_url:
        out += [f"Source: {site_url}", ""]
    out += [
        "Full text of the documentation, ordered by site navigation. Each",
        "page is preceded by its title and canonical URL. Generated at build",
        "time by scripts/generate_llms_txt.py.",
        "",
    ]

    seen: set[str] = set()
    for item in nav_items:
        out.extend(_render_full_walk(item, site_url, docs_dir, seen))

    return _collapse_blank("\n".join(out).rstrip()) + "\n"


def _render_full_walk(item, site_url: str, docs_dir: Path, seen: set[str]) -> list[str]:
    if isinstance(item, NavPage):
        if item.src_uri in seen:
            return []
        seen.add(item.src_uri)
        page = _load_page(docs_dir, item)
        if page is None:
            return []
        md = _FRONT_MATTER_RE.sub("", page.markdown).strip()
        md = _HTML_COMMENT_RE.sub("", md).strip()
        if not md:
            return []
        md = re.sub(r"\A#\s+[^\n]*\n+", "", md)
        url = _abs_url(site_url, page.url)
        return ["---", "", f"# {page.title}", "", f"<{url}>", "", md, ""]
    if isinstance(item, NavSection):
        out: list[str] = []
        for child in item.children:
            out.extend(_render_full_walk(child, site_url, docs_dir, seen))
        return out
    return []


def main() -> None:
    site_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else REPO_ROOT / "site"
    config = _load_mkdocs_config()

    docs_dir = REPO_ROOT / config.get("docs_dir", "docs")
    site_name = config.get("site_name") or "Site"
    site_url = (config.get("site_url") or "").rstrip("/")
    site_description = _clean_quoted(config.get("site_description") or "")
    repo_url = config.get("repo_url") or ""
    nav_items = _build_nav(config.get("nav") or [])

    site_dir.mkdir(parents=True, exist_ok=True)

    index_text = _render_index(
        site_name, site_description, site_url, repo_url, docs_dir, nav_items
    )
    (site_dir / "llms.txt").write_text(index_text, encoding="utf-8")

    full_text = _render_full(site_name, site_description, site_url, docs_dir, nav_items)
    (site_dir / "llms-full.txt").write_text(full_text, encoding="utf-8")

    print(f"Wrote {site_dir / 'llms.txt'} and {site_dir / 'llms-full.txt'}")


if __name__ == "__main__":
    main()
