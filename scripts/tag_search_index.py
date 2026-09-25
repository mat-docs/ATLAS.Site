#!/usr/bin/env python3
"""Tag every entry in the built search index with its top-level nav section.

Zensical's search UI ("Disco") supports exactly one flat, multi-select "Tags"
facet: with nothing selected it lists every tag present anywhere in the
index, and narrows (AND, with recomputed counts) as tags are selected. Tagging
every ancestor level of the nav tree makes that unfiltered list show all ~90
section names at once (deep leaf sections and top-level areas mixed
together) - overwhelming before anyone's clicked anything. Tagging only the
top-level nav section (e.g. "User Guides", "Developer Resources") keeps the
initial list to a handful of broad, meaningful choices; each result's
breadcrumb already shows the fuller path (e.g. "Developer Resources / ATLAS /
Automation API"), so hierarchy context isn't lost, it's just not also forced
into the filter list.

Existing tags (e.g. blog posts' product tags) are preserved; the top-level
nav tag is appended and de-duplicated.

Run after the site build, pointed at the site's output directory:

    python scripts/tag_search_index.py [site_dir]
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent


def main() -> None:
    site_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else REPO_ROOT / "site"
    search_json = site_dir / "search.json"

    data = json.loads(search_json.read_text(encoding="utf-8"))
    items = data.get("items", [])

    for item in items:
        path = item.get("path") or []
        if len(path) < 2:
            continue  # a lone segment is the page's own title, not a section
        top_level = path[0]
        tags = list(item.get("tags") or [])
        if top_level not in tags:
            tags.append(top_level)
        item["tags"] = tags

    search_json.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    print(f"Tagged {len(items)} search entries with their top-level nav section in {search_json}")


if __name__ == "__main__":
    main()
