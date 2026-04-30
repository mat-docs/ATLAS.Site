#!/usr/bin/env python3
"""
ATLAS Markdown Normaliser
Reads a release markdown file and outputs a clean, consistent version.

Usage:
    python normalise_md.py <input.md> [output.md]
    python normalise_md.py <https://raw.githubusercontent.com/.../release.md> [output.md]

Normalises:
  - Removes YAML frontmatter (---) — date/tags extracted and re-added cleanly
  - Strips MkDocs-specific syntax (admonitions, HTML comments, emoji checkboxes)
  - Normalises section headings to standard names
  - Removes download sections (links go stale, not useful in PDF)
  - Standardises Support section
  - Adds product preamble placeholder if missing
"""

import sys, re, os, requests
from datetime import datetime
import frontmatter

# ── Section heading normalisation map ─────────────────────────────────────────
# Maps any variant → standard name
HEADING_MAP = {
    # New features
    "new features":             "New Features",
    "new feature":              "New Features",
    "key improvements":         "New Features",
    "what's new":               "New Features",
    "whats new":                "New Features",
    "improvements":             "New Features",
    "enhancements":             "New Features",
    "features":                 "New Features",
    "changes":                  "New Features",
    "key changes":              "New Features",

    # Bug fixes
    "bug fixes":                "Bug Fixes",
    "bug fix":                  "Bug Fixes",
    "what's fixed":             "Bug Fixes",
    "whats fixed":              "Bug Fixes",
    "fixes":                    "Bug Fixes",
    "resolved issues":          "Bug Fixes",
    "issues fixed":             "Bug Fixes",

    # Known issues
    "known issues":             "Known Issues",
    "known issue":              "Known Issues",
    "known limitations":        "Known Issues",
    "limitations":              "Known Issues",

    # Support
    "support":                  "Support",
    "feedback/support":         "Support",
    "feedback / support":       "Support",
    "feedback and support":     "Support",
    "get support":              "Support",

    # Sections to drop entirely
    "download":                 "__DROP__",
    "downloads":                "__DROP__",
    "compatibility":            "__DROP__",
    "migration guide":          "__DROP__",
    "upgrading from previous version": "__DROP__",
    "technical details":        "__DROP__",
    "configuration updates":    "__DROP__",
    "what you need to know":    "__DROP__",
    "optional configuration enhancements": "__DROP__",

    # Clarified settings → treated as New Features subsections
    "clarified settings":       "New Features",
}

# Standard support text
SUPPORT_TEXT = (
    "If you have any questions about this release or need assistance, "
    "please contact your Motion Applied first line support representative, "
    "or submit bugs and suggestions through the "
    "[ATLAS Zendesk Portal](https://mclarenappliedtechnologies.zendesk.com/hc/en-us)."
)

# ── Helpers ────────────────────────────────────────────────────────────────────
def normalise_heading(text):
    """Return (normalised_name, drop_bool) for a heading string."""
    key = text.strip().lower().rstrip(":")
    # Strip leading numbers like "1. " or "1.1 "
    key = re.sub(r"^\d+[\.\d]*\s*", "", key).strip()
    mapped = HEADING_MAP.get(key)
    if mapped == "__DROP__":
        return None, True
    return mapped or text.strip(), False

def clean_inline(text):
    """Strip MkDocs / emoji cruft from inline text."""
    # Remove emoji checkboxes
    text = re.sub(r"[✅❌✓✗☑️]\s*", "", text)
    # Remove bold/italic markdown around single words that are just emphasis noise
    # (keep content, remove excessive bolding of single-word headers used as labels)
    return text.strip()

def strip_admonitions(content):
    """Convert !!! type blocks to plain paragraphs."""
    def repl(m):
        title = (m.group(1) or "").strip().strip('"')
        body  = re.sub(r"^ {4}", "", m.group(2), flags=re.M).strip()
        # If title is meaningful (not just the type word), prepend it
        if title and title.lower() not in ("note","tip","info","warning","success","check","important"):
            return f"**{title}:** {body}\n\n"
        return f"{body}\n\n"
    content = re.sub(
        r'^!!!\s+\w+(?:\s+"([^"]*)")?\n((?:^    .+\n?)+)',
        repl, content, flags=re.M,
    )
    return content

def strip_html_comments(content):
    return re.sub(r"<!--.*?-->", "", content, flags=re.DOTALL)

def strip_emoji_lines(content):
    """Remove lines that are purely emoji/checkmark."""
    return re.sub(r"^[✅❌✓✗☑️\s]+$", "", content, flags=re.M)

def normalise_bullets(content):
    """Normalise bullet styles to - """
    content = re.sub(r"^(\s*)[*•]\s+", r"\1- ", content, flags=re.M)
    return content

def remove_manual_numbering(text):
    """Strip manually numbered headings like '### 1. Title' → '### Title'"""
    return re.sub(r"^(#{1,6}\s+)\d+[\.\d]*\s+", r"\1", text, flags=re.M)

# ── Section parser ─────────────────────────────────────────────────────────────
class Section:
    def __init__(self, level, heading, lines=None):
        self.level   = level       # 1, 2, 3 ...
        self.heading = heading     # normalised heading text
        self.lines   = lines or [] # content lines (not including heading)
        self.drop    = False

    def content(self):
        return "\n".join(self.lines).strip()

    def is_empty(self):
        return not self.content()

def parse_sections(content):
    """Split markdown into a flat list of Section objects."""
    sections = []
    current  = Section(0, "__root__")

    for line in content.splitlines():
        m = re.match(r"^(#{1,6})\s+(.+)$", line)
        if m:
            sections.append(current)
            level   = len(m.group(1))
            heading = m.group(2).strip()
            current = Section(level, heading)
        else:
            current.lines.append(line)

    sections.append(current)
    return sections

def rebuild(sections):
    """Reconstruct markdown from sections."""
    parts = []
    for s in sections:
        if s.level == 0:
            body = s.content()
            if body:
                parts.append(body)
        else:
            parts.append(f"{'#' * s.level} {s.heading}")
            body = s.content()
            if body:
                parts.append(body)
        parts.append("")  # blank line after each section
    return "\n".join(parts).strip() + "\n"

# ── Main normaliser ────────────────────────────────────────────────────────────
def normalise(raw_content, source=""):
    # Parse frontmatter
    post = frontmatter.loads(raw_content)
    fm   = post.metadata
    body = post.content

    # Extract date
    created = fm.get("date", {})
    d = created.get("created", "") if isinstance(created, dict) else created
    if isinstance(d, datetime):
        date_str = d.strftime("%Y-%m-%d")
    else:
        try:    date_str = datetime.strptime(str(d), "%Y-%m-%d").strftime("%Y-%m-%d")
        except: date_str = str(d) if d else datetime.now().strftime("%Y-%m-%d")

    # Extract tags
    tags = fm.get("tags", [])
    if isinstance(tags, str):
        tags = [tags]

    # Clean body
    body = strip_html_comments(body)
    body = strip_admonitions(body)
    body = strip_emoji_lines(body)
    body = normalise_bullets(body)
    body = remove_manual_numbering(body)

    # Parse into sections
    sections = parse_sections(body)

    # Process each section
    out_sections = []
    drop_until_level = None  # for dropping sub-sections of a dropped section

    for s in sections:
        # Root content (before first heading) — keep as-is
        if s.level == 0:
            out_sections.append(s)
            continue

        # Check if we're inside a dropped section
        if drop_until_level is not None:
            if s.level > drop_until_level:
                continue  # drop child sections too
            else:
                drop_until_level = None  # back out of dropped section

        # Normalise heading
        norm_heading, drop = normalise_heading(s.heading)

        if drop:
            drop_until_level = s.level
            continue

        s.heading = norm_heading

        # Clean section content
        cleaned_lines = []
        for line in s.lines:
            # Remove MkDocs plugin lines (links to docs, docker images, etc.)
            if re.search(r"hub\.docker\.com|portal\.mclarenapplied\.com|Read docs\]", line, re.I):
                continue
            # Remove standalone link-only lines (download links)
            if re.match(r"^\s*[-*]?\s*\*{0,2}(Docker|Windows Binary|Documentation)\*{0,2}:", line, re.I):
                continue
            cleaned_lines.append(line)

        # Strip trailing blank lines from content
        while cleaned_lines and not cleaned_lines[-1].strip():
            cleaned_lines.pop()

        s.lines = cleaned_lines

        # Replace Support section content with standard text
        if s.heading == "Support":
            s.lines = [SUPPORT_TEXT]

        out_sections.append(s)

    # Ensure Support section exists at the end
    has_support = any(s.heading == "Support" for s in out_sections if s.level > 0)
    if not has_support:
        out_sections.append(Section(2, "Support", [SUPPORT_TEXT]))

    # Rebuild markdown body
    clean_body = rebuild(out_sections)

    # Build clean frontmatter
    fm_lines = ["---", f"date: {date_str}"]
    if tags:
        fm_lines.append("tags:")
        for t in tags:
            fm_lines.append(f"  - {t}")
    fm_lines.append("---")
    fm_block = "\n".join(fm_lines)

    return f"{fm_block}\n\n{clean_body}"


def load_source(src):
    if src.startswith("http://") or src.startswith("https://"):
        print(f"  Fetching: {src}")
        r = requests.get(src, timeout=20)
        r.raise_for_status()
        return r.text
    else:
        with open(src, encoding="utf-8") as f:
            return f.read()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python normalise_md.py <input.md> [output.md]")
        sys.exit(1)

    src  = sys.argv[1]
    base = os.path.splitext(os.path.basename(src.rstrip("/")))[0]
    out  = sys.argv[2] if len(sys.argv) > 2 else f"{base}_normalised.md"

    raw    = load_source(src)
    result = normalise(raw, src)

    with open(out, "w", encoding="utf-8") as f:
        f.write(result)

    print(f"  Saved: {out}")
    print()
    print(result)
