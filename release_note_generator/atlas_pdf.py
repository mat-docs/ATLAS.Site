#!/usr/bin/env python3
"""
Release Note PDF Generator

Converts markdown release notes to branded Motion Applied PDFs.
Supports ATLAS Viewer, ATLAS Data Server, System Monitor, Bridge Service, and more.

Usage:
    python atlas_pdf.py <path/to/release.md> [output.pdf]
"""

import sys, re, os, requests
from datetime import datetime
import frontmatter, mistune

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate,
    Paragraph, Spacer, HRFlowable,
    Table, TableStyle, PageBreak, NextPageTemplate, KeepTogether,
)
from reportlab.pdfgen import canvas as rl_canvas

# ── Page geometry ──────────────────────────────────────────────────────────────
PAGE_W, PAGE_H = A4
ML, MR = 20*mm, 20*mm
MT = 28*mm   # below logo bar
MB = 18*mm   # above footer
CW = PAGE_W - ML - MR

# ── Brand ──────────────────────────────────────────────────────────────────────
ORANGE = HexColor("#E8631A")
NAVY   = HexColor("#1A1F2E")
GREY   = HexColor("#6B7080")
LTGREY = HexColor("#F5F6F8")
BLACK  = HexColor("#222222")
WHITE  = colors.white

LOGO_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logo_icon.png")

# ── Product catalogue ──────────────────────────────────────────────────────────
PRODUCTS = {
    "atlas viewer": {
        "cover_name":      "Advanced Telemetry\nLinked Acquisition System",
        "cover_short":     "ATLAS",
        "section1_title":  "ATLAS Release",
        "overview_heading":"ATLAS Overview",
        "overview": (
            "ATLAS is a software package used to obtain, display and analyse data from "
            "control systems such as those used within motorsport and other telemetry "
            "applications. ATLAS is used by professional data analysts working with data "
            "acquired by telemetry or uploaded via a data logger, and is appropriate for "
            "an individual data analyst or for many engineers all monitoring telemetry together."
        ),
        "release_filler": (
            "Specific details of what has been covered in each of these areas, as well as "
            "information on other bug fixes made, is included in section 4.\n\n"
            "We appreciate that there are still items to address in the improved areas and "
            "would appreciate your feedback such that we can prioritise issues for future releases."
        ),
        "sysreq_intro": "The following table lists the minimum and recommended PC specifications for running ATLAS.",
        "sysreq_table": [
            ["",               "Minimum Supported",                        "Recommended"],
            ["Operating System","Windows 10 Professional 64-bit",          "Windows 11 Professional 64-bit"],
            ["Memory",         "8 GB",                                     "16 GB or Higher"],
            ["Processor",      "Intel Pentium i3 or AMD A8, 2.0 GHz\n64-bit processor\n4 Cores",
                               "Intel Core i7 Processor 2.8 GHz\n64-bit processor\n8 Cores"],
            ["Disk Space",     "HDD with 20 GB free disk space",           "High Capacity SSD 512 GB or more with 50 GB or higher free disk space"],
            ["Graphics",       "DirectX 10.1 supported Graphics Card",     "NVIDIA Quadro\n2 GB Memory\nDirectX 11 Support"],
        ],
        "sysreq_notes": [],
        "licensing": (
            "An ATLAS license is required to use the ATLAS client. Due to the name change, the licence "
            "product name is now \u201cATLAS\u201d but both ATLAS and ATLAS 10 licences will be issued "
            "to cater for version 10.x and the new ATLAS v11."
        ),
        "installation": None,  # ATLAS Viewer has no installation section
        "diagnostics": True,   # Include diagnostics section
    },
    "atlas data server": {
        "cover_name":      "ATLAS Data Server",
        "cover_short":     "ADS",
        "section1_title":  "ATLAS Data Server Release",
        "overview_heading":"ATLAS Data Server Overview",
        "overview": (
            "ATLAS Data Server application enables receiving of data via Wide Band telemetry "
            "or Ethernet Wirelink and send it to one or more Client PCs over an Ethernet "
            "network. ATLAS Data Server sets up two data streams (sockets accessible through "
            "TCP/IP) to attach Client PCs. One Data stream is dedicated to Telemetry and the "
            "other to Wirelink Uploads."
        ),
        "release_filler": (
            "Specific details of what has been covered in each of these areas, as well as "
            "information on other bug fixes made, is included in section 4.\n\n"
            "We appreciate that there are still items to address in the improved areas and "
            "would appreciate your feedback such that we can prioritise issues for future releases."
        ),
        "sysreq_intro": "The following table lists the minimum and recommended PC specifications for running ATLAS Data Server.",
        "sysreq_table": [
            ["",               "Minimum Supported",                "Recommended"],
            ["Operating System","Windows 11*",                     "Windows 11*"],
            ["Memory",         "1 GB",                             "8 GB or Higher"],
            ["Processor",      "Intel Core Duo 2 GHz",             "Intel Core i7 Processor"],
            ["Disk Space",     "HDD with 200 GB free disk space",  "High Capacity SSD 512 GB or more"],
        ],
        "sysreq_notes": [
            "*Motion Applied now solely support Windows 11 for ATLAS. Motion Applied do not validate Windows 10 implementations on future releases.",
        ],
        "licensing": (
            "An additional extension to the standard ATLAS licence is required to use ATLAS with "
            "SQL Race (in addition to SQL Race licence). Additional extensions are required to use "
            "the \u201cvTAG Server Recorder (VTS)\u201d and the Remote Data Server feature."
        ),
        "installation": {
            "instructions": (
                "To install or upgrade ATLAS Data Server 9.x, run AtlasDataServer.msi from the "
                "installation media. If you are downgrading, you will need to remove previous "
                "installations using the add/remove programs panel in Windows OS."
            ),
            "versioning": (
                "Please consider schema and versioning compatibility before upgrading. If necessary, "
                "please consult with Motion Applied and we will be happy to assist with appropriate "
                "migration strategies."
            ),
            "bullets": ["ATLAS uses .NET 6"],
            "restrictions": [
                "Enabling the Windows OS firewall may prevent ATLAS clients from receiving data from "
                "ATLAS data servers. We advise that the firewall is disabled prior to running with this configuration.",
                "Note that a 64-bit version of the software is not available \u2013 ATLAS will run in "
                "32-bit Windows on-Windows (WOW) mode when running on 64-bit Operating Systems. "
                "Therefore, ATLAS is NOT able to take advantage of the 64-bit virtual address space.",
            ],
        },
        "diagnostics": False,
    },
    "system monitor": {
        "cover_name":      "System Monitor",
        "cover_short":     "",
        "section1_title":  "System Monitor Release",
        "overview_heading":"System Monitor Overview",
        "overview": (
            "System Monitor is an ECU calibration and configuration tool developed by Motion "
            "Applied to interface with our range of control products in Motorsport and Aviation. "
            "It is used by engineers and technicians in trackside support, test and development to:\n\n"
            "Display and Modify Editable Parameters \u2014 Ability to view and modify editable "
            "parameters to modify how the ECU operates. Changes can be pushed to the ECU immediately "
            "(Live Tune) or applied offline.\n\n"
            "ECU Program Management \u2014 Management of ECU program files to enable upload and "
            "download of the latest versions.\n\n"
            "Configuration \u2014 Capable of configuring the data logging behaviour of Motion Applied "
            "ECUs and calibrating sensors and actuators connected to the ECU."
        ),
        "release_filler": (
            "Specific details of what has been covered in each of these areas, as well as "
            "information on other bug fixes made, is included in section 3.\n\n"
            "We appreciate that there are still items to address in the improved areas and "
            "would appreciate your feedback such that we can prioritise issues for future releases."
        ),
        "sysreq_intro": "The following table lists the minimum and recommended PC specifications for running System Monitor.",
        "sysreq_table": [
            ["",               "Minimum Supported",                "Recommended"],
            ["Operating System","Windows 11",                      "Windows 11"],
            ["Memory",         "8 GB",                             "8 GB or Higher"],
            ["Processor",      "Intel Core Duo 2 GHz",             "Intel Core i7 Processor"],
            ["Disk Space",     "HDD with 20 GB free disk space",   "High Capacity SSD 512 GB or more"],
        ],
        "sysreq_notes": [
            "Motion Applied solely supports Windows 11 with this release of System Monitor. "
            "Microsoft no longer supports Windows 10, and as such Motion Applied only test "
            "System Monitor on Windows 11.",
        ],
        "licensing": None,
        "installation": None,
        "diagnostics": False,
    },
    "bridge service": {
        "cover_name":      "ATLAS Streaming Platform\n\u2013 Bridge Service",
        "cover_short":     "",
        "section1_title":  "ATLAS Streaming Platform \u2013 Bridge Service Release",
        "overview_heading":"Bridge Service Overview",
        "overview": (
            "Bridge Service is a component of the ATLAS Streaming Platform that routes "
            "telemetry data streams between sources and consumers. It provides flexible "
            "stream mapping, session lifecycle management, and reliable high-throughput "
            "data delivery via the Stream API."
        ),
        "release_filler": (
            "Specific details of what has been covered in each of these areas, as well as "
            "information on other changes made, is included in section 2.\n\n"
            "We appreciate that there are still items to address in the improved areas and "
            "would appreciate your feedback such that we can prioritise issues for future releases."
        ),
        "sysreq_intro":  None,
        "sysreq_table":  None,
        "sysreq_notes":  [],
        "licensing":     None,
        "installation":  None,
        "diagnostics":   False,
    },
    "virtual parameter service": {
        "cover_name":      "ATLAS Streaming Platform\n\u2013 Virtual Parameter Service",
        "cover_short":     "",
        "section1_title":  "ATLAS Streaming Platform \u2013 Virtual Parameter Service Release",
        "overview_heading":"Virtual Parameter Service Overview",
        "overview": (
            "Virtual Parameter Service (VPS) is a component of the ATLAS Streaming Platform "
            "that computes derived parameters in real time from incoming telemetry streams, "
            "enabling engineers to define virtual calculations once and consume results "
            "across multiple ATLAS clients."
        ),
        "release_filler": (
            "Specific details of what has been covered in each of these areas, as well as "
            "information on other changes made, is included in section 2.\n\n"
            "We appreciate that there are still items to address in the improved areas and "
            "would appreciate your feedback such that we can prioritise issues for future releases."
        ),
        "sysreq_intro":  None,
        "sysreq_table":  None,
        "sysreq_notes":  [],
        "licensing":     None,
        "installation":  None,
        "diagnostics":   False,
    },
}

def get_product(title):
    tl = title.lower()
    for key, val in PRODUCTS.items():
        if key in tl:
            return val
    return {
        "cover_name":      title,
        "cover_short":     "",
        "section1_title":  f"{title} Release",
        "overview_heading":f"{title} Overview",
        "overview":        "",
        "sysreq_intro":    None,
        "sysreq_table":    None,
        "sysreq_notes":    [],
        "licensing":       None,
        "installation":    None,
        "diagnostics":     False,
    }

# ── Escape ─────────────────────────────────────────────────────────────────────
def esc(t):
    return (str(t).replace("&","&amp;").replace("<","&lt;")
                  .replace(">","&gt;").replace('"',"&quot;"))

# ── Canvas callbacks ───────────────────────────────────────────────────────────
def _logo(c):
    """Draw logo icon only, top-right."""
    icon_h = 10*mm
    icon_w = icon_h * (88/92)
    if os.path.exists(LOGO_PATH):
        c.drawImage(LOGO_PATH, PAGE_W - MR - icon_w, PAGE_H - 5*mm - icon_h,
                    width=icon_w, height=icon_h, mask="auto")

def _rule(c):
    c.setStrokeColor(HexColor("#DDDDDD"))
    c.setLineWidth(0.5)
    c.line(ML, PAGE_H - 18*mm, PAGE_W - MR, PAGE_H - 18*mm)

def _footer(c, date_str, page_num):
    c.setFont("Helvetica", 7.5)
    c.setFillColor(GREY)
    c.drawString(ML, 10*mm, f"C O N F I D E N T I A L  |  {date_str}")
    c.drawRightString(PAGE_W - MR, 10*mm, str(page_num))

def make_cover_cb(meta):
    def cb(c, doc):
        c.saveState()
        _logo(c)
        _rule(c)

        c.setFillColor(NAVY)

        # Product long name — top-left ~58% down
        y = PAGE_H * 0.59
        for line in meta["cover_name"].split("\n"):
            c.setFont("Helvetica", 24)
            c.drawString(ML, y, line)
            y -= 32

        # Product short name — large, right-aligned ~46%
        short = meta.get("cover_short", "")
        if short:
            c.setFont("Helvetica", 52)
            sw = c.stringWidth(short, "Helvetica", 52)
            c.drawString(PAGE_W - MR - sw, PAGE_H * 0.455, short)

        # "Release Note" — bottom-right ~28%
        c.setFont("Helvetica", 26)
        rw = c.stringWidth("Release Note", "Helvetica", 26)
        c.drawString(PAGE_W - MR - rw, PAGE_H * 0.28, "Release Note")

        # Version below
        v = meta.get("version", "")
        if v:
            c.setFont("Helvetica", 13)
            c.setFillColor(GREY)
            vw = c.stringWidth(v, "Helvetica", 13)
            c.drawString(PAGE_W - MR - vw, PAGE_H * 0.24, v)

        _footer(c, meta["date"], 1)
        c.restoreState()
    return cb

def make_page_cb(meta):
    def cb(c, doc):
        c.saveState()
        _logo(c)
        _rule(c)
        _footer(c, meta["date"], doc.page)
        c.restoreState()
    return cb

# ── Styles ─────────────────────────────────────────────────────────────────────
def make_styles():
    def ps(n, **k): return ParagraphStyle(n, **k)
    return {
        # Main section: "1. ATLAS Data Server Release"
        "h1":      ps("h1",  fontName="Helvetica",      fontSize=18, textColor=NAVY,
                             leading=22, spaceBefore=0, spaceAfter=8),
        # Sub-section: "1.1 ATLAS Data Server Overview"
        "h2":      ps("h2",  fontName="Helvetica",      fontSize=12, textColor=NAVY,
                             leading=16, spaceBefore=10, spaceAfter=4),
        # Plain sub-heading — no number, used in section 1
        "h2_plain":ps("h2p", fontName="Helvetica",      fontSize=12, textColor=NAVY,
                             leading=16, spaceBefore=10, spaceAfter=4),
        # Item heading: "4.1.1  Channel Data Size Error..."
        "h3":      ps("h3",  fontName="Helvetica",      fontSize=10.5, textColor=NAVY,
                             leading=14, spaceBefore=8, spaceAfter=2),
        "h4":      ps("h4",  fontName="Helvetica-Bold", fontSize=10, textColor=BLACK,
                             leading=14, spaceBefore=6, spaceAfter=2),
        # Body text under section headings (no indent)
        "body":    ps("body",fontName="Helvetica",      fontSize=10, textColor=BLACK,
                             leading=15, spaceAfter=5, alignment=TA_JUSTIFY),
        # Body text indented under h3 item headings
        "body_indent": ps("body_i", fontName="Helvetica", fontSize=10, textColor=BLACK,
                             leading=15, spaceAfter=5, alignment=TA_JUSTIFY,
                             leftIndent=14),
        "bullet":  ps("bul", fontName="Helvetica",      fontSize=10, textColor=BLACK,
                             leading=14, spaceAfter=3, leftIndent=28, bulletIndent=14),
        "bullet2": ps("bul2",fontName="Helvetica",      fontSize=10, textColor=BLACK,
                             leading=14, spaceAfter=2, leftIndent=42, bulletIndent=28),
        "code":    ps("code",fontName="Courier",        fontSize=8,  textColor=HexColor("#333"),
                             leading=11, backColor=LTGREY,
                             leftIndent=14, spaceBefore=3, spaceAfter=3, borderPad=4),
        "note":    ps("note",fontName="Helvetica",      fontSize=10, textColor=BLACK,
                             leading=15, spaceAfter=5, leftIndent=14,
                             backColor=LTGREY, borderPad=4),
        "th":      ps("th",  fontName="Helvetica-Bold", fontSize=9, textColor=WHITE,  leading=12),
        "td":      ps("td",  fontName="Helvetica",      fontSize=9, textColor=BLACK,  leading=12),
        "td_hd":   ps("tdhd",fontName="Helvetica-Bold", fontSize=9, textColor=WHITE,  leading=12),
    }

# ── Section counter ────────────────────────────────────────────────────────────
class Counter:
    def __init__(self): self.a = self.b = self.c = 0
    def h1(self): self.a+=1; self.b=0; self.c=0; return f"{self.a}."
    def h2(self): self.b+=1; self.c=0;            return f"{self.a}.{self.b}"
    def h3(self): self.c+=1;                       return f"{self.a}.{self.b}.{self.c}"

# ── Inline tokens → RL XML ─────────────────────────────────────────────────────
def inl(children):
    out = []
    for t in (children or []):
        tp = t.get("type","")
        if   tp == "text":         out.append(esc(t.get("raw","")))
        elif tp == "codespan":     out.append(f'<font name="Courier" size="9">{esc(t.get("raw",""))}</font>')
        elif tp == "strong":       out.append(f"<b>{inl(t.get('children',[]))}</b>")
        elif tp == "emphasis":     out.append(f"<i>{inl(t.get('children',[]))}</i>")
        elif tp == "link":         out.append(f'<font color="#E8631A">{inl(t.get("children",[]))}</font>')
        elif tp in ("softline_break","linebreak"): out.append(" ")
        elif "children" in t:     out.append(inl(t["children"]))
        elif "raw" in t:          out.append(esc(t["raw"]))
    return "".join(out)

# ── Build story from AST ───────────────────────────────────────────────────────
def build_story(tokens, st, product_info, release_summary, date_str, eval_notice=""):
    """
    Constructs the full story:
      Page 1 cover (empty — drawn by canvas callback)
      Page 2: Section 1 — product overview + release summary + feedback
      Page 3+: remaining sections from markdown, each starting on new page
    """
    story = []
    ctr   = Counter()

    # ── Helper to add a section break (new page + H1) ──────────────────────────
    def new_section(title):
        story.append(PageBreak())
        num = ctr.h1()
        story.append(Paragraph(f"{num} {title}", st["h1"]))
        story.append(HRFlowable(width="100%", thickness=0.5,
                                 color=HexColor("#CCCCCC"), spaceAfter=6))

    # ── Section 1: always built from product catalogue + markdown summary ───────
    story.append(PageBreak())  # end cover page
    num = ctr.h1()
    story.append(Paragraph(f"{num} {product_info['section1_title']}", st["h1"]))
    story.append(HRFlowable(width="100%", thickness=0.5,
                             color=HexColor("#CCCCCC"), spaceAfter=6))

    # Sub-headings in section 1 are plain (no numbers) matching the real template
    story.append(Paragraph(product_info['overview_heading'], st["h2_plain"]))
    for para in product_info["overview"].split("\n\n"):
        if para.strip():
            story.append(Paragraph(esc(para.strip()), st["body_indent"]))

    story.append(Paragraph("Release Overview", st["h2_plain"]))
    if release_summary:
        story.append(Paragraph(esc(release_summary), st["body_indent"]))
    for filler_para in (product_info.get("release_filler") or "").split("\n\n"):
        if filler_para.strip():
            story.append(Paragraph(esc(filler_para.strip()), st["body_indent"]))

    # Evaluation Build Notice — injected from admonition if present in markdown
    if eval_notice:
        story.append(Paragraph("Evaluation Build Notice", st["h2_plain"]))
        story.append(Paragraph(esc(eval_notice), st["body_indent"]))

    story.append(Paragraph("Feedback/Support", st["h2_plain"]))
    story.append(Paragraph(
        "Where applicable, please contact your Motion Applied first line support "
        "representative for assistance.", st["body_indent"]))
    story.append(Paragraph(
        "Submit bugs and suggestions for future releases through the "
        '<font color="#E8631A"><link href="https://mclarenappliedtechnologies.zendesk.com/hc/en-us">'
        'ATLAS Zendesk Portal</link></font>.', st["body_indent"]))

    # ── Section 2: System Requirements (if product has them) ──────────────────
    if product_info.get("sysreq_table"):
        new_section("System Requirements")

        # PC System Requirements
        story.append(Paragraph(f"{ctr.h2()} PC System Requirements", st["h2"]))
        if product_info.get("sysreq_intro"):
            story.append(Paragraph(esc(product_info["sysreq_intro"]), st["body"]))

        # Build the table — first col is row headers (orange bg)
        rows_data = []
        for r_idx, row in enumerate(product_info["sysreq_table"]):
            cells = []
            for c_idx, cell in enumerate(row):
                txt = esc(str(cell)).replace("\n", "<br/>")
                if r_idx == 0:  # column header row
                    cells.append(Paragraph(f"<b>{txt}</b>", st["th"]))
                elif c_idx == 0 and txt.strip():  # row header
                    cells.append(Paragraph(f"<b>{txt}</b>", st["td_hd"]))
                else:
                    cells.append(Paragraph(txt, st["td"]))
            rows_data.append(cells)

        col_w = [35*mm, (CW-35*mm)/2, (CW-35*mm)/2]
        t = Table(rows_data, colWidths=col_w, repeatRows=1, hAlign="LEFT")
        t.setStyle(TableStyle([
            ("BACKGROUND",     (0, 0), (-1, 0),  ORANGE),   # header row
            ("BACKGROUND",     (0, 1), (0, -1),  ORANGE),   # first col
            ("ROWBACKGROUNDS", (1, 1), (-1, -1), [WHITE, LTGREY]),
            ("GRID",           (0, 0), (-1, -1), 0.4, HexColor("#CCCCCC")),
            ("TOPPADDING",     (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING",  (0, 0), (-1, -1), 5),
            ("LEFTPADDING",    (0, 0), (-1, -1), 7),
            ("RIGHTPADDING",   (0, 0), (-1, -1), 7),
            ("VALIGN",         (0, 0), (-1, -1), "TOP"),
        ]))
        story.append(t)
        story.append(Spacer(1, 3*mm))

        for note in (product_info.get("sysreq_notes") or []):
            story.append(Paragraph(esc(note), st["body"]))

        # Licensing
        if product_info.get("licensing"):
            story.append(Paragraph(f"{ctr.h2()} Licensing Requirements", st["h2"]))
            story.append(Paragraph(esc(product_info["licensing"]), st["body"]))

    # ── Section 3: Installation (if product has it) ────────────────────────────
    if product_info.get("installation"):
        inst = product_info["installation"]
        new_section("Installation")

        story.append(Paragraph(f"{ctr.h2()} Instructions", st["h2"]))
        story.append(Paragraph(esc(inst["instructions"]), st["body"]))

        story.append(Paragraph(f"{ctr.h2()} Versioning", st["h2"]))
        story.append(Paragraph(esc(inst["versioning"]), st["body"]))
        for b in (inst.get("bullets") or []):
            story.append(Paragraph(f"<bullet>&#x2022;</bullet>{esc(b)}", st["bullet"]))

        if inst.get("restrictions"):
            story.append(Paragraph(f"{ctr.h2()} Known System Restrictions", st["h2"]))
            for r in inst["restrictions"]:
                story.append(Paragraph(f"<bullet>&#x2022;</bullet>{esc(r)}", st["bullet"]))

    # ── Diagnostics section (ATLAS Viewer only) ────────────────────────────────
    if product_info.get("diagnostics"):
        new_section("Diagnostics")

        story.append(Paragraph(f"{ctr.h2()} Application Insights", st["h2"]))
        story.append(Paragraph(
            "ATLAS 10 includes Microsoft Azure\u2019s Application Insights\u00a9 to capture "
            "and detect performance anomalies automatically by gathering exceptions and "
            "performance metrics. No data or workbooks will be captured as part of this. "
            "For more information, please refer to the Zendesk article on ATLAS 10 Application "
            "Insights. This option is on by default and may be disabled via "
            "ATLAS \u2192 Tools \u2192 \u2018Allow collection of Metric and Error data\u2019.",
            st["body"]))

        story.append(Paragraph(f"{ctr.h2()} Performance Counters", st["h2"]))
        story.append(Paragraph(
            "In order for the Watchdog to provide sufficient information for us to analyse, "
            "diagnose and fix issues, it is highly desirable to have access to the performance "
            "counters of a machine. Access to the performance counters allows it to be determined "
            "whether crashes are as a result of resource issues, such as excessive memory usage "
            "due to memory leaks or operating system handle leaks.", st["body"]))
        story.append(Paragraph(
            "<b>To monitor Windows Performance Counters, the user account must either be a "
            "member of the Administrators group or a member of the Performance Monitor Users "
            "group in Windows.</b>", st["body"]))

    # ── Now parse markdown body for remaining sections ─────────────────────────
    first_h1_seen   = False
    first_para_done = False
    in_skipped      = False
    in_changes      = False
    in_known_issues = False
    ki_intro_added  = False
    in_item         = False  # True when under an h3 — use indented body style
    had_new_features = False  # track if New Features came before Bug Fixes

    CHANGES_SUBSECTIONS = {
        "new features", "bug fixes", "changes", "bug fix",
        "features", "enhancements", "improvements",
    }
    SUPPORT_HEADINGS = {
        "support", "feedback / support", "feedback/support",
        "feedback and support", "feedback &amp; support",
    }

    def _list_items(tok, depth=0):
        sty = st["bullet"] if depth == 0 else st["bullet2"]
        for item in (tok.get("children") or []):
            parts, subs = [], []
            for child in (item.get("children") or []):
                if child["type"] == "list":
                    subs.append(child)
                elif child["type"] in ("block_text","paragraph"):
                    parts.append(inl(child.get("children",[])))
                elif "children" in child:
                    parts.append(inl(child["children"]))
                elif "raw" in child:
                    parts.append(esc(child["raw"]))
            txt = " ".join(parts).strip()
            if txt:
                story.append(Paragraph(f"<bullet>&#x2022;</bullet>{txt}", sty))
            for sub in subs:
                _list_items(sub, depth+1)

    def _table(tok):
        rows = []
        for grp in (tok.get("children") or []):
            for tr in (grp.get("children") or []):
                row = []
                is_head = grp.get("type") == "table_head"
                for cell in (tr.get("children") or []):
                    txt = inl(cell.get("children",[]))
                    sty = st["th"] if is_head else st["td"]
                    row.append(Paragraph(f"<b>{txt}</b>" if is_head else txt, sty))
                if row: rows.append(row)
        if not rows: return
        nc = max(len(r) for r in rows)
        t = Table(rows, colWidths=[CW/nc]*nc, repeatRows=1, hAlign="LEFT")
        t.setStyle(TableStyle([
            ("BACKGROUND",     (0,0),(-1,0),  ORANGE),
            ("ROWBACKGROUNDS", (0,1),(-1,-1), [WHITE, LTGREY]),
            ("GRID",           (0,0),(-1,-1), 0.4, HexColor("#CCCCCC")),
            ("TOPPADDING",     (0,0),(-1,-1), 5),
            ("BOTTOMPADDING",  (0,0),(-1,-1), 5),
            ("LEFTPADDING",    (0,0),(-1,-1), 7),
            ("RIGHTPADDING",   (0,0),(-1,-1), 7),
            ("VALIGN",         (0,0),(-1,-1), "TOP"),
        ]))
        story.append(t)
        story.append(Spacer(1,3*mm))

    def _walk(tok):
        nonlocal first_h1_seen, first_para_done, in_skipped
        nonlocal in_changes, in_known_issues, ki_intro_added
        nonlocal in_item, had_new_features
        tp = tok["type"]

        if tp == "heading":
            level = tok["attrs"]["level"]
            text  = inl(tok.get("children",[]))
            tl    = text.strip().lower()

            if level == 1:
                if not first_h1_seen:
                    first_h1_seen = True
                    return
                new_section(text)
                in_changes = in_known_issues = in_skipped = in_item = False

            elif level == 2:
                if tl in SUPPORT_HEADINGS:
                    in_skipped = True
                    in_changes = in_known_issues = in_item = False
                    return

                in_skipped = False

                if tl in CHANGES_SUBSECTIONS:
                    if not in_changes:
                        new_section("Changes")
                        in_changes = True

                    # Bug Fixes always starts on a new page if New Features preceded it
                    is_bugfix = "bug" in tl
                    if is_bugfix and had_new_features:
                        story.append(PageBreak())
                    if "new feature" in tl or tl == "features" or tl == "enhancements":
                        had_new_features = True

                    ctr.b += 1; ctr.c = 0
                    in_item = False
                    story.append(Spacer(1, 3*mm))
                    story.append(Paragraph(f"{ctr.a}.{ctr.b} {text}", st["h2"]))
                    return

                if "known issue" in tl:
                    new_section(text)
                    in_changes = in_item = False
                    in_known_issues = True
                    story.append(Paragraph(
                        "These are new issues which our QA process has identified for this "
                        "release build. Workarounds are detailed where possible.", st["body"]))
                    ki_intro_added = True
                    ctr.b = 1
                    return

                # Any other H2 (Downloads, Configuration Changes, Migration Guide etc.)
                # is not standard release note content — drop it and its content
                # but keep in_changes flag so subsequent New Features/Bug Fixes still go in Changes
                in_skipped = True
                in_known_issues = in_item = False

            elif level == 3:
                if in_skipped: return
                ctr.c += 1
                num = f"{ctr.a}.{ctr.b}.{ctr.c}"
                story.append(Paragraph(f"{num}  {text}", st["h3"]))
                in_item = True  # subsequent paragraphs/bullets get indented

            else:
                if in_skipped: return
                story.append(Paragraph(f"<b>{text}</b>", st["h4"]))
                in_item = False

        elif tp == "paragraph":
            if in_skipped: return
            txt = inl(tok.get("children",[]))
            if not txt.strip(): return
            if not first_para_done and first_h1_seen:
                first_para_done = True
                return
            sty = st["body_indent"] if in_item else st["body"]
            story.append(Paragraph(txt, sty))

        elif tp == "list":
            if in_skipped: return
            _list_items(tok)

        elif tp == "block_code":
            if in_skipped: return
            story.append(Paragraph(
                esc(tok.get("raw","")).replace("\n","<br/>"), st["code"]))

        elif tp == "block_quote":
            pass  # Drop !!! notes and blockquotes entirely

        elif tp == "thematic_break":
            if in_skipped: return
            story.append(HRFlowable(width="100%", thickness=0.4,
                                     color=HexColor("#DDDDDD"), spaceAfter=3))

        elif tp == "table":
            if in_skipped: return
            _table(tok)

        elif tp in ("block_html", "blank_line"):
            pass

        else:
            for child in (tok.get("children") or []):
                _walk(child)

    for tok in tokens:
        _walk(tok)

    return story

# ── Pre-process markdown ───────────────────────────────────────────────────────
def extract_eval_notice(raw_content):
    """Extract the Evaluation Build Notice from an admonition block, if present."""
    m = re.search(
        r'^!!!\s+\w+\s+"Evaluation Build Notice"\n((?:^    .+\n?)+)',
        raw_content, flags=re.M
    )
    if m:
        return re.sub(r"^ {4}", "", m.group(1), flags=re.M).strip()
    # Also catch if it was already converted to **Evaluation Build Notice:** text
    m2 = re.search(
        r'\*\*Evaluation Build Notice[:\*]+\*?\*?\s*(.+?)(?=\n\n|\Z)',
        raw_content, flags=re.DOTALL
    )
    if m2:
        return m2.group(1).strip().replace("\n", " ")
    return ""

def clean_md(content):
    content = content.replace("<!-- more -->", "")
    # Drop all !!! admonitions entirely. The Evaluation Build Notice is the only
    # one we keep, and it's extracted separately by extract_eval_notice().
    content = re.sub(
        r'^!!!\s+\w+(?:\s+"[^"]*")?\n((?:^    .+\n?)+)',
        "", content, flags=re.M,
    )
    return content

# ── Meta ───────────────────────────────────────────────────────────────────────
def extract_meta(post, src):
    fm = post.metadata
    created = fm.get("date", {})
    d = created.get("created","") if isinstance(created,dict) else created
    if isinstance(d, datetime):
        date_str = d.strftime("%d %B %Y")
    elif d:
        try:    date_str = datetime.strptime(str(d),"%Y-%m-%d").strftime("%d %B %Y")
        except: date_str = str(d)
    else:
        date_str = datetime.now().strftime("%d %B %Y")

    m = re.search(r"^#\s+(.+)$", post.content, re.M)
    title = m.group(1).strip() if m else "Release Notes"

    vm = re.search(r"v?([\d]+\.[\d]+[\.\d]*(?:-[\w]+)?)", title)
    version = "v"+vm.group(1) if vm else ""

    product = re.sub(r"\s*[Rr]elease:?\s*v?[\d\.]+.*","", title).strip()
    product = re.sub(r"\s*[Rr]elease\s*[Nn]otes?$","", product).strip()

    # Release summary = first paragraph after H1, with filler sentences stripped
    summary = ""
    body = post.content
    h1_m = re.search(r"^#\s+.+$", body, re.M)
    if h1_m:
        after = body[h1_m.end():].lstrip("\n")
        after = re.sub(r"<!--.*?-->","",after,flags=re.DOTALL)
        p_m = re.search(r"^(.+?)(?:\n\n|\n#)", after, re.DOTALL)
        if p_m:
            summary = p_m.group(1).strip().replace("\n"," ")

    # Strip boilerplate filler sentences that add no value in a PDF
    FILLER = [
        r"Specific details of what has been covered[^.]+\.",
        r"Specific details of what has changed[^.]+\.",
        r"specific details[^.]+section \d+[^.]*\.",
        r"We appreciate that there are still items to address[^.]+\.",
        r"We appreciate that there[^.]+prioritise[^.]+\.",
        r"would appreciate your feedback[^.]+\.",
    ]
    for pattern in FILLER:
        summary = re.sub(pattern, "", summary, flags=re.IGNORECASE).strip()
    # Clean up any double spaces left behind
    summary = re.sub(r"  +", " ", summary).strip()

    return {
        "title":   title,
        "product": product,
        "version": version,
        "date":    date_str,
        "summary": summary,
    }

# ── Build PDF ──────────────────────────────────────────────────────────────────
def build_pdf(md_src, out_path):
    if md_src.startswith("http"):
        r = requests.get(md_src, timeout=20); r.raise_for_status()
        raw = r.text
    else:
        raw = open(md_src, encoding="utf-8").read()

    post        = frontmatter.loads(raw)
    meta        = extract_meta(post, md_src)
    prod        = get_product(meta["product"])
    eval_notice = extract_eval_notice(post.content)
    content     = clean_md(post.content)

    print(f"  Product : {meta['product']}")
    print(f"  Version : {meta['version']}")
    print(f"  Date    : {meta['date']}")
    if eval_notice:
        print(f"  Eval    : yes")

    tokens = mistune.create_markdown(renderer=None)(content)
    st     = make_styles()
    story  = build_story(tokens, st, prod, meta["summary"],
                          meta["date"], eval_notice=eval_notice)

    meta["cover_name"]  = prod["cover_name"]
    meta["cover_short"] = prod.get("cover_short", "")

    cf = Frame(ML, MB, CW, PAGE_H-MT-MB, id="cover")
    nf = Frame(ML, MB, CW, PAGE_H-MT-MB, id="normal")
    doc = BaseDocTemplate(
        out_path, pagesize=A4,
        leftMargin=ML, rightMargin=MR, topMargin=MT, bottomMargin=MB,
        pageTemplates=[
            PageTemplate(id="Cover",  frames=[cf], onPage=make_cover_cb(meta)),
            PageTemplate(id="Normal", frames=[nf], onPage=make_page_cb(meta)),
        ],
        title=meta["title"], author="Motion Applied Ltd.",
    )
    doc.build([NextPageTemplate("Normal")] + story)
    print(f"  Saved   : {out_path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python atlas_pdf_final.py <file.md> [out.pdf]")
        sys.exit(1)
    src = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else \
          os.path.splitext(os.path.basename(src.rstrip("/")))[0] + ".pdf"
    build_pdf(src, out)
