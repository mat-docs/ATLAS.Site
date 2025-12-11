# overrides/hooks/shortcodes.py
import re
from typing import Match
from mkdocs.structure.pages import Page
from mkdocs.structure.files import Files
from mkdocs.config.defaults import MkDocsConfig

_VERSION_RE = re.compile(r"<!--\s*md:version\s+(.+?)\s*-->", re.I | re.M)

def _badge(icon: str, text: str = "", type_: str = "") -> str:
    badge_style = (
        "display:inline-flex;align-items:center;gap:.4rem;"
        "margin:0 .35rem .35rem 0;padding:.15rem .5rem;border-radius:999px;"
        "font-size:.85em;line-height:1.6;white-space:nowrap;"
        "color:var(--md-primary-fg-text, #222);"
        "background:var(--md-primary-fg-color--lightest, #eef1ff);"
        "border:1px solid var(--md-primary-fg-color--lighter, #d9dfff);"
    )
    icon_html = (
        f'<span style="display:inline-flex" title="Minimum Version">:{icon}:</span>'
        if icon else ""
    )
    text_html = f'<span style="opacity:.9">{text}</span>' if text else ""
    return f'<span style="{badge_style}">{icon_html}{text_html}</span>'

def on_page_markdown(markdown: str, *, page: Page, config: MkDocsConfig, files: Files) -> str:
    def repl(m: Match[str]) -> str:
        spec = (m.group(1) or "").strip()
        return _badge(icon="material-tag", text=spec)
    return _VERSION_RE.sub(repl, markdown)
