# The History of ATLAS

From a trailer full of rack-mounted monitors to a plugin platform with more than 20 display types.

ATLAS (Advanced Telemetry Linked Acquisition System) began in the early 1990s with TAG Electronic Systems' telemetry work for Group C sportscars. It grew into the data visualisation software used across the Formula 1 grid and beyond. Today its makers describe it as ["an advanced data-visualisation tool"](https://www.motionapplied.com/products/ATLAS) that captures, distributes, displays and analyses data from control systems.

This page follows two threads together: the company behind ATLAS, which has had five names, and how ATLAS changed as a way of seeing data.

!!! note "A note on names"
    Historically, "ATLAS" meant the application engineers used to look at data. Today **ATLAS** is the whole ecosystem and **ATLAS Viewer** is that application. This page uses "ATLAS" for the product as it was known at the time, and "ATLAS Viewer" for the current application. See [Start here](index.md) for the ecosystem today.

## At a glance

<div class="grid cards" markdown>

-   :material-flag-checkered: __1988 to 1991__

    ---

    TAG Electronic Systems is formed. Its Group C telemetry trailer carries the first TAG telemetry system, with early versions of views still in ATLAS today.

-   :material-car-sports: __1992 to 2007__

    ---

    McLaren adopts TAG engine control for 1993. By 2006 the company says it works with every F1 team.

-   :material-view-dashboard: __2008 to 2017__

    ---

    The company's standard ECU becomes compulsory on every F1 car, and ATLAS 9 becomes the paddock standard.

-   :material-puzzle: __2018 to 2021__

    ---

    ATLAS 10 is rebuilt from the ground up as a plugin platform, with compare sets and an open architecture.

-   :material-rocket-launch: __2022 to 2026__

    ---

    Regular 11.x releases. The company becomes Motion Applied, and AI integration is announced.

</div>

## Five names, one company

One legal company, number 02322992, has owned ATLAS under every name since 1988 ([Companies House](https://find-and-update.company-information.service.gov.uk/company/02322992)).

| Period | Legal name | Context |
| --- | --- | --- |
| 29 Nov to 22 Dec 1988 | Shotpart Limited | Shelf company at incorporation |
| 1988 to 2003 | TAG Electronic Systems Limited | Part of the TAG/McLaren group |
| 2003 to 2014 | McLaren Electronic Systems Limited | First company into the McLaren Technology Centre ([Motion Applied history](https://motionapplied.com/about/our-history/)) |
| 2014 to 2020 | McLaren Applied Technologies Limited | Merged with the existing McLaren Applied Technologies business |
| 2020 to 2025 | McLaren Applied Limited | Sold by McLaren Group to Greybull Capital in August 2021 ([GPFans](https://www.gpfans.com/en/f1-news/68324/mclaren-agrees-sale-of-technology-division-to-increase-investment-push/)) |
| 3 Jul 2025 to present | Motion Applied Limited | Rebrand announced 8 August 2025 ([McLaren Applied](https://mclarenapplied.com/news/mclaren-applied-becomes-motion-applied)) |

??? info "Dates differ between sources"
    Motion Applied's own history page dates the business to 1989, a year after incorporation. Wikipedia says the company was "founded 1991 as McLaren Composites". That appears to conflate a separate entity that merged in during 2014, and it conflicts with Companies House. The dates above follow Companies House.

## Origins, 1988 to 1991

TAG Electronic Systems was led by Dr Udo Zucker. Its first large contract was the Mercedes-Benz Group C sportscar programme ([Motion Applied history](https://motionapplied.com/about/our-history/)).

### Dr Udo Zucker

Before TAG, Zucker developed the electronic ignition and injection control for the TAG-Porsche engine in McLaren's 1984 MP4/2 ([Formula1.com](https://www.formula1.com/en/latest/article/how-niki-laudas-final-title-winning-car-the-1984-mclaren-mp4-2-changed-f1.7vGiQXahtUbaKo70ZJ8OGQ)). By July 1991, Motor Sport described TAG Electronics as a McLaren subsidiary headed by Zucker, and called him the "father" of the Motronic engine management system ([Motor Sport, July 1991](https://www.motorsportmagazine.com/archive/article/july-1991/34/under-scrutiny-mercedes-c291/?v=7516fd43adaa)). He later became chief executive of TAG McLaren Audio ([Design Week, 1998](https://www.designweek.co.uk/issues/15-october-1998/clive-grinyer-quits-fitch-for-client-role/)).

!!! note "Leader, not necessarily founder"
    No published source we found calls Zucker the *founder* of TAG Electronic Systems. Well-sourced accounts call him its head.

### Group C and the 1991 trailer

Motor Sport's 1991 analysis of the Mercedes C291 confirms that TAG supplied its engine management and a comprehensive telemetry system. Zucker claimed the system transmitted five million bits of information per second ([Motor Sport, July 1991](https://www.motorsportmagazine.com/archive/article/july-1991/34/under-scrutiny-mercedes-c291/?v=7516fd43adaa)).

An exhibit photograph captioned "ATLAS trailer · 1991 · Articulated trailer containing the 1st TAG telemetry system for Group C" shows the trailer and equipment panels bearing the ATLAS name. No published source confirms the ATLAS name was in use in 1991. The earliest dated published statement is iRacing's 2011 release, which says ATLAS was developed in the 1990s to support McLaren's own Formula 1 team ([iRacing, 2011](https://www.iracing.com/iracing-partners-with-mclaren-electronic-systems-for-online-racing-data-analysis/)).

### What the first screens showed

No published description of the earliest ATLAS screens exists, so this reading rests on the exhibit photograph alone:

- Each view appears to have had its own rack-mounted CRT monitor, rather than being a window on a shared desktop.
- Visible screens include one titled "Histograms" showing rows of bar gauges, a circuit map with the car's position, strip-chart traces, and a text "main screen" of values.

If that reading holds, histogram, circuit and trace views, all standard ATLAS display types today, existed in some form by 1991.

## Into Formula 1, 1992 to 2007

Honda's departure pushed McLaren onto TAG's control systems for 1993, and by 2006 the company said it worked with every F1 team.

| Year | What happened |
| --- | --- |
| 1992 to 1993 | McLaren ran a TAG gearbox unit with Honda in 1992, then adopted TAG's full engine control unit for 1993 ([Motor Sport, 2024](https://www.motorsportmagazine.com/archive/article/may-2024/70/sennas-underdog-f1-success-the-special-talent-and-nimble-mclaren-that-won-five-times-in-1993/)). McLaren credits TAG with the 1993 MP4/8's engine management, chassis control, data acquisition and telemetry ([McLaren heritage](https://www.mclaren.com/racing/heritage/formula-1/cars/1993-formula-1-mclaren-mp4-8/)). |
| 2000 to 2002 | TAG is credited with McLaren's data analysis and telemetry systems ([Atlas F1, 2002](http://atlasf1.autosport.com/news/2002/features/teams/mclaren.html)). It introduces 32-bit PowerPC ECUs in 2000 and moves to auto-generated software from model-based design tools ([Electronics Weekly](https://www.electronicsweekly.com/market-sectors/embedded-systems/embedded-processing-at-mclaren-2012-06/)). |
| 2003 | The company is renamed McLaren Electronic Systems (MES). |
| 2005 | The TAG-310, precursor to the standard ECU, first runs ([New Electronics](https://www.newelectronics.co.uk/content/features/racing-ahead-developing-an-engine-control-unit-for-all-f1-teams)). |
| 2006 | MES and Microsoft win the FIA standard ECU contract for 2008 onwards. MES's managing director says the company already works with all F1 teams ([Microsoft, 11 Dec 2006](https://news.microsoft.com/source/2006/12/11/microsoft-and-mclaren-electronic-systems-win-race-to-provide-electronic-technology-to-the-fia-formula-one-world-championship-for-2008-to-2010/)). |

### ATLAS on the Windows desktop

By the time of the standard ECU, ATLAS was a client–server system built on Microsoft's stack. ECU data went to an ATLAS Server developed first with Visual Studio 2005, then 2008 ([formula1-dictionary](https://www.formula1-dictionary.net/f1-ecu-electronic-control-unit/)). Remote Data Servers could be daisy-chained so that live telemetry could be watched at the track, the factory and the engine supplier at once.

The ATLAS client ran on garage laptops under Windows XP or Vista and gave near real-time displays of the car's health, with Excel 2007 used alongside for further analysis. Published sources do not show when ATLAS moved from dedicated monitors to the Windows desktop.

## The standard ECU era, 2008 to 2017

Once the MES standard ECU was compulsory on every F1 car from 2008, ATLAS became the paddock's standard data package. A 2011 analysis put it plainly: ATLAS was standard because every car ran the FIA-specified MES ECU ([ScarbsF1, 2011](https://scarbsf1.wordpress.com/2011/08/18/telemetry-and-data-analysis-introduction/)).

### Beyond Formula 1

<div class="grid cards" markdown>

-   :material-flag: __NASCAR__

    ---

    McLaren became NASCAR's official ECU supplier in 2011, and electronic fuel injection debuted at the 2012 Daytona 500 ([Electronics Weekly](https://www.electronicsweekly.com/market-sectors/embedded-systems/embedded-processing-at-mclaren-2012-06/)).

-   :material-flash: __Formula E__

    ---

    MES supplied the motor, transmission and electronics for the first Spark-Renault car ([Motorsport.com, 2013](https://www.motorsport.com/formula-e/news/mclaren-the-power-behind-formula-e/440037/)).

-   :material-controller: __Sim racing__

    ---

    In May 2011 iRacing offered members ATLAS Express, a version derived from the F1 software ([iRacing](https://www.iracing.com/iracing-partners-with-mclaren-electronic-systems-for-online-racing-data-analysis/)). The set-up guide installed into an "ATLAS 9" folder and shipped a sample workbook ([guide](https://www.scribd.com/document/352980261/McLaren-ATLAS-iRacing-pdf)).

</div>

In 2014 MES was renamed McLaren Applied Technologies.

### How ATLAS 9 showed data

ATLAS 9 organised everything the way a spreadsheet does. A workbook held multiple pages, and each page held user-built displays ([ScarbsF1, 2011](https://scarbsf1.wordpress.com/2011/08/18/telemetry-and-data-analysis-introduction/)). An undated [ATLAS product sheet](https://www.scribd.com/document/480702902/ATLAS-pdf) lists the display types:

| Display | What it showed |
| --- | --- |
| Waveform | Several parameters plotted as traces |
| Scatter | Pairs of parameters in a cross-plot |
| Circuit | The car's position on a track map generated from recorded data |
| Histogram | The distribution of a parameter |
| Summary | Statistics for the session by lap, section or segment |
| FFT | Frequency analysis, transfer functions and correlations |
| Map | Logged data on a 3D wireframe |
| Bar | Simple bar graphs |
| InPlace | ActiveX controls running inside ATLAS with full access to the data |

A real 2011 Monaco printout, analysed by data engineer Brian Jee, shows how these combined in a driver comparison (same ScarbsF1 source):

- Two drivers' laps were overlaid in red and blue against lap distance.
- A vertical cursor showed exact values on every trace as it moved.
- ATLAS created a time-difference (TDiff) trace automatically whenever layers were overlaid, making it easy to see where time was gained or lost.
- A dot on a track map followed the cursor. ATLAS built the map from lateral acceleration and distance data, and coloured corners by lateral-acceleration thresholds.
- Drivers reviewed these displays as printouts in the garage.

## The ATLAS 10 rebuild, 2018 to 2021

ATLAS 10 replaced ATLAS 9 around 2018 to 2019. The company described it as a new visualisation platform ["built from the ground up"](https://mclarenappliedtechnologies.zendesk.com/hc/en-us/sections/360000858514-ATLAS-10) for faster, easier access to data.

- **Rollout.** The support site carried a provisional 2018 ATLAS 10 F1 release schedule and guidance on importing ATLAS 9 workbooks. Race Tech reported in March 2019 that teams would be evaluating it that season ([Race Tech, 2019](https://www.racetechmag.com/article/five-f1-tech-facts-every-fan-should-know/)).
- **Forward Cursor.** The headline feature used machine learning to predict quantities such as tyre wear, fuel consumption and weather as a session evolved (Race Tech, 2019).
- **Open architecture.** Engineers could feed data from third-party tools into ATLAS 10 for the rest of the team to view alongside other sources (Race Tech, 2019).
- **Plugins and custom displays.** ATLAS became a user-interface shell in which most functionality comes from display, functionality and recorder plugins ([Motion Applied](https://www.motionapplied.com/products/ATLAS)). Developers could write their own display plugins in .NET ([Writing a Display Plugin](https://mclarenappliedtechnologies.zendesk.com/hc/en-us/articles/115001760613-Writing-a-Display-Plugin)). Today that is the [Display API](../developer-resources/atlas/display-api/index.md).
- **Compare sets.** Listed as ATLAS 10-only functionality in the [automation API notes](https://mclarenappliedtechnologies.zendesk.com/hc/en-us/articles/360009038334-ATLAS-10-Automation-API). ATLAS 9 and ATLAS 10 were designed to run side by side during the transition.

The company became McLaren Applied on 2 January 2020 and was sold to Greybull Capital in August 2021.

## Version 11 and Motion Applied, 2022 to 2026

Since 2022 ATLAS has shipped as dated, numbered releases in the 11.x series. The company became Motion Applied in July 2025 and named ATLAS as one of its core investments ([McLaren Applied](https://mclarenapplied.com/news/mclaren-applied-becomes-motion-applied)). The documentation moved from naming the product "ATLAS 10" to naming it ATLAS Viewer.

### Releases that changed what users see

| Release | What changed |
| --- | --- |
| February 2022 (11.1.1.222) | Custom markers in the ATLAS client ([ATLAS news](https://atlas.mclarenapplied.com/news)) |
| August 2022 (11.1.3.367) | Interface support for lap markers |
| March 2024 (11.3.1.584) | A Go To dialog, marker improvements and a NASCAR telemetry recorder preview |
| August 2025 (11.4.3.239) | Histograms can be copied straight to the clipboard ([release notes](https://atlas.motionapplied.com/blog/2025/08/18/atlas-viewer-release-v1143239/)) |
| February 2026 (11.5.1.8) | Unit definitions for the TAG-700 and TAG-510 control units ([release notes](https://atlas.motionapplied.com/blog/2026/02/27/atlas-viewer-release-v11518/)) |

### The display set today

ATLAS Viewer now offers [more than 20 display types](../key-functionality/analyse/viewer/displays/index.md), which can be docked or floated and are saved with their layout and settings in workbooks. New since the ATLAS 9 product sheet:

- a 3D Surface Map, for surfaces such as a torque map,
- a Bing satellite map of the car's GPS position,
- a simulator of the steering-wheel PCU Dash, and
- Numeric readouts with colour thresholds.

The core ideas of 2011 are intact. The [Waveform display](../key-functionality/analyse/viewer/displays/waveform.md) still plots traces against time or distance, uses TDiff for multi-session comparison, and scrolls in real time during live telemetry.

### Data and AI behind the displays

- **KX partnership (August 2023).** Integrating the kdb+ time-series database was presented as a better way of visualising higher-rate data and running AI and ML queries ([eeNews Europe](https://www.eenewseurope.com/en/mclaren-boosts-racecar-industrial-analytics/)).
- **E1 powerboats.** E1 named McLaren Applied its official data viewing software supplier, with ATLAS available to all teams ([E1](https://www.e1series.com/partner/65_McLaren-Applied)).
- **AIPEX Racing alliance (9 December 2025).** Motion Applied will lead the integration of AI algorithms into ATLAS ([Motion Applied](https://www.motionapplied.com/news/strategic-alliance-with-aipex-racing/)).
- **Standard ECU to 2030.** The FIA selected the company to supply the F1 standard ECU for 2026 to 2030 ([MIA](https://the-mia.com/news/624190/McLaren-Applied-extends-SECU-contract-with-FIA-until-2030.htm)).

## Timeline

??? abstract "Key events, newest first"

    | Date | Event |
    | --- | --- |
    | Feb 2026 | ATLAS Viewer 11.5.1.8 adds TAG-700 and TAG-510 unit definitions |
    | 9 Dec 2025 | AIPEX Racing alliance to bring AI into ATLAS |
    | Aug 2025 | Histogram copy-to-clipboard (11.4.3.239) |
    | 8 Aug 2025 | McLaren Applied announces it is now Motion Applied (legal change 3 July) |
    | Aug 2023 | KX kdb+ partnership for higher-rate data and AI/ML queries |
    | Nov 2022 | FIA selects the company for the F1 standard ECU, 2026 to 2030 |
    | Aug 2022 | Lap markers in the ATLAS interface (11.1.3.367) |
    | Feb 2022 | Custom markers in ATLAS (11.1.1.222) |
    | Aug 2021 | McLaren Group sells McLaren Applied to Greybull Capital |
    | 2 Jan 2020 | Renamed McLaren Applied |
    | Mar 2019 | Race Tech reports teams evaluating ATLAS 10, with Forward Cursor |
    | 2018 | Provisional ATLAS 10 F1 release schedule |
    | 2 Jan 2014 | Renamed McLaren Applied Technologies |
    | Aug 2011 | Published analysis of an ATLAS 9-era Monaco driver-comparison display |
    | May 2011 | ATLAS Express launched for iRacing members |
    | 2008 | MES standard ECU on every F1 car; ATLAS becomes the paddock standard |
    | 11 Dec 2006 | MES and Microsoft announced as standard ECU suppliers |
    | 2005 | TAG-310 first runs |
    | 24 Nov 2003 | Renamed McLaren Electronic Systems |
    | 2000 | TAG introduces 32-bit PowerPC ECUs and model-based software |
    | 1993 | McLaren MP4/8 uses TAG engine management, data acquisition and telemetry |
    | 1991 | TAG telemetry on the Mercedes C291; exhibit dates the first Group C telemetry trailer to this year |
    | 22 Dec 1988 | Shotpart Limited renamed TAG Electronic Systems Limited |
    | 29 Nov 1988 | Company 02322992 incorporated as Shotpart Limited |

## What we do not know yet

Some parts of this history could not be confirmed from published sources and need archival work:

- When was the ATLAS name first used, and was it already applied to the 1991 Group C trailer?
- What did ATLAS look like in the 1990s, and when did it move from dedicated monitors to the Windows desktop?
- When was each display type first introduced? The ATLAS product sheet is undated.
- Who wrote the original ATLAS software?
- Did Udo Zucker found TAG Electronic Systems or only lead it, and when did he leave?
- Exactly when did ATLAS 9 launch, and was there a single official launch of ATLAS 10?

The most promising primary sources are period technical features in Racecar Engineering, Autosport and Motor Sport (1991 to 2000), surviving printed telemetry sheets, and Motion Applied's own archive. If you have material that fills any of these gaps, we would like to hear from you.

## Where to go next

- [Start here](index.md): the ecosystem today, and a short course for new users.
- [ATLAS Viewer](../key-functionality/analyse/viewer/index.md): the current application.
- [Release notes](../blog/index.md): what is changing now.
