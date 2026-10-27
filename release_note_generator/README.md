# Release note generator

Release notes are Markdown blog posts in `docs/blog/posts/<product-folder>/`. This folder
turns a post into a branded Motion Applied PDF.

## Create a PDF

```bash
pip install reportlab python-frontmatter mistune requests
python3 release_note_generator/atlas_pdf.py docs/blog/posts/<product-folder>/<post>.md release-notes/<post>.pdf
```

The output path is optional (it defaults to `<post>.pdf` in the current directory).
`release-notes/*.pdf` is gitignored.

## Add a new product

1. Add the blog post folder and post (see the existing posts for the format).
2. Add an entry to `PRODUCTS` in `atlas_pdf.py`. The key is a lowercase fragment of the post
   title's product name (for example `"vtag service"`); copy an existing entry and edit
   `cover_name`, `section1_title`, `overview_heading` and `overview`.
3. Generate the PDF and check the cover and first pages.

The version shown in the PDF is read from the post's H1 title, for example
`# Bridge Service Release: v2.1.5.3`. A title with no version (the first vTAG Service release)
produces a PDF with no version.
