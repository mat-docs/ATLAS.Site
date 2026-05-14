"""MkDocs hook: emit /llms.txt and /llms-full.txt at build time.

Follows the llms.txt convention (https://llmstxt.org/) so that language
models can discover and ingest this documentation efficiently:

  - llms.txt       Structured index of every page in the navigation, with a
                   short summary per page. Mirrors the site's nav hierarchy.
  - llms-full.txt  Concatenated markdown of every page, in nav order, with
                   canonical URLs as anchors. Lets an LLM ingest the entire
                   site in one fetch.

Both files are written into the MkDocs site_dir, so Netlify serves them at
/llms.txt and /llms-full.txt.
"""

from __future__ import annotations

import re
from pathlib import Path

from mkdocs.config.defaults import MkDocsConfig
from mkdocs.structure.files import Files
from mkdocs.structure.nav import Link, Navigation, Section
from mkdocs.structure.pages import Page

_PAGE_MARKDOWN: dict[str, str] = {}
_NAV_ITEMS: list = []

_FRONT_MATTER_RE = re.compile(r"\A---\n.*?\n---\s*\n", re.DOTALL)
_HTML_COMMENT_RE = re.compile(r"<!--.*?-->", re.DOTALL)
_BLANK_LINES_RE = re.compile(r"\n{3,}")
_SUMMARY_MAX_LEN = 200


def on_page_markdown(
    markdown: str, *, page: Page, config: MkDocsConfig, files: Files
) -> str:
    _PAGE_MARKDOWN[page.file.src_uri] = markdown
    return markdown


def on_nav(
    nav: Navigation, *, config: MkDocsConfig, files: Files
) -> Navigation:
    global _NAV_ITEMS
    _NAV_ITEMS = list(nav.items)
    return nav


def on_post_build(config: MkDocsConfig) -> None:
    site_dir = Path(config.site_dir)
    site_url = (config.site_url or "").rstrip("/")
    site_name = config.site_name or "Site"
    site_description = _clean_quoted(config.site_description or "")
    repo_url = config.repo_url or ""

    site_dir.mkdir(parents=True, exist_ok=True)

    index_text = _render_index(
        site_name, site_description, site_url, repo_url, _NAV_ITEMS
    )
    (site_dir / "llms.txt").write_text(index_text, encoding="utf-8")

    full_text = _render_full(site_name, site_description, site_url, _NAV_ITEMS)
    (site_dir / "llms-full.txt").write_text(full_text, encoding="utf-8")


# ---------- shared helpers ----------


def _clean_quoted(s: str) -> str:
    return s.strip().strip('"').strip("'").strip()


def _abs_url(site_url: str, page_url: str) -> str:
    page_url = (page_url or "").lstrip("/")
    if site_url:
        return f"{site_url}/{page_url}"
    return "/" + page_url


def _collapse_blank(s: str) -> str:
    return _BLANK_LINES_RE.sub("\n\n", s)


def _one_line(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


def _strip_markdown_for_summary(text: str) -> str:
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"[*_`]+", "", text)
    return _one_line(text)


# ---------- llms.txt (index) ----------


def _render_index(
    site_name: str,
    site_description: str,
    site_url: str,
    repo_url: str,
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
        out.extend(_render_index_top(item, site_url))

    return _collapse_blank("\n".join(out).rstrip()) + "\n"


def _render_index_top(item, site_url: str) -> list[str]:
    if isinstance(item, Section):
        lines = [f"## {item.title}", ""]
        for child in item.children:
            lines.extend(_render_index_bullet(child, site_url, depth=0))
        lines.append("")
        return lines
    if isinstance(item, Page):
        lines = [f"## {item.title or item.file.src_uri}", ""]
        lines.extend(_render_index_bullet(item, site_url, depth=0))
        lines.append("")
        return lines
    if isinstance(item, Link):
        return [f"## {item.title}", "", f"- [{item.title}]({item.url})", ""]
    return []


def _render_index_bullet(item, site_url: str, depth: int) -> list[str]:
    pad = "  " * depth
    if isinstance(item, Page):
        title = item.title or item.file.src_uri
        url = _abs_url(site_url, item.url)
        summary = _page_summary(item)
        line = f"{pad}- [{title}]({url})"
        if summary:
            line += f": {summary}"
        return [line]
    if isinstance(item, Section):
        bullets = [f"{pad}- **{item.title}**"]
        for child in item.children:
            bullets.extend(_render_index_bullet(child, site_url, depth + 1))
        return bullets
    if isinstance(item, Link):
        return [f"{pad}- [{item.title}]({item.url})"]
    return []


def _page_summary(page: Page) -> str:
    desc = (getattr(page, "meta", None) or {}).get("description")
    if desc:
        return _one_line(str(desc))[:_SUMMARY_MAX_LEN]
    md = _PAGE_MARKDOWN.get(page.file.src_uri, "")
    if not md:
        return ""
    md = _FRONT_MATTER_RE.sub("", md)
    md = _HTML_COMMENT_RE.sub("", md)
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
            # Skip admonitions — they're typically disclaimers or callouts,
            # not the page's actual subject.
            continue
        cleaned = _strip_markdown_for_summary(para)
        if cleaned:
            return cleaned[:_SUMMARY_MAX_LEN]
    return ""


# ---------- llms-full.txt ----------


def _render_full(
    site_name: str, site_description: str, site_url: str, nav_items: list
) -> str:
    out: list[str] = [f"# {site_name}", ""]
    if site_description:
        out += [f"> {site_description}", ""]
    if site_url:
        out += [f"Source: {site_url}", ""]
    out += [
        "Full text of the documentation, ordered by site navigation. Each",
        "page is preceded by its title and canonical URL. Generated at build",
        "time by hooks/llms_txt.py.",
        "",
    ]

    seen: set[str] = set()
    for item in nav_items:
        out.extend(_render_full_walk(item, site_url, seen))

    return _collapse_blank("\n".join(out).rstrip()) + "\n"


def _render_full_walk(item, site_url: str, seen: set[str]) -> list[str]:
    if isinstance(item, Page):
        src = item.file.src_uri
        if src in seen:
            return []
        seen.add(src)
        md = _PAGE_MARKDOWN.get(src, "")
        md = _FRONT_MATTER_RE.sub("", md).strip()
        md = _HTML_COMMENT_RE.sub("", md).strip()
        if not md:
            return []
        md = re.sub(r"\A#\s+[^\n]*\n+", "", md)
        title = item.title or src
        url = _abs_url(site_url, item.url)
        return ["---", "", f"# {title}", "", f"<{url}>", "", md, ""]
    if isinstance(item, Section):
        out: list[str] = []
        for child in item.children:
            out.extend(_render_full_walk(child, site_url, seen))
        return out
    return []
