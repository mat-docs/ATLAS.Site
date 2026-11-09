# The History of ATLAS

In 1991 the first TAG telemetry system for Group C sportscars travelled in an articulated trailer, and its views appear to have had a monitor each. Today ATLAS Viewer has more than 20 display types and a plugin platform, and it has been the standard data package across the Formula 1 paddock. We have fitted a lot more onto a single screen since then, and we have not needed a trailer for it. This is the story of how we got here.

We began as TAG Electronic Systems in 1988. We became McLaren Electronic Systems, then McLaren Applied, and we are now Motion Applied. Through every one of those names, ATLAS (Advanced Telemetry Linked Acquisition System) has been our [data visualisation tool](https://www.motionapplied.com/products/ATLAS) for capturing, distributing, displaying and analysing data from control systems.

!!! note "A note on names"
    Historically, "ATLAS" meant the application engineers used to look at data. Today **ATLAS** is the whole ecosystem and **ATLAS Viewer** is that application. This page says "ATLAS" for the product as it was known at the time, and "ATLAS Viewer" for the application today. See [Start here](index.md) for the ecosystem as it is now.

## At a glance

<div class="grid cards" markdown>

-   :material-flag-checkered: __1991__

    ---

    A trailer carries the first TAG telemetry system for Group C. Histograms, a circuit map and strip-chart traces appear on its screens.

-   :material-car-sports: __1993__

    ---

    McLaren adopts our engine control and telemetry for its MP4/8.

-   :material-view-dashboard: __2008__

    ---

    Our standard ECU becomes compulsory on every F1 car, and ATLAS 9 becomes the paddock standard.

-   :material-puzzle: __2018__

    ---

    ATLAS 10 is rebuilt from the ground up as a plugin platform.

-   :material-rocket-launch: __2026__

    ---

    ATLAS Viewer: more than 20 displays, compare sets and open APIs.

</div>

## A trailer full of monitors, 1991

Our earliest look at ATLAS is a photograph from the archive. It shows the trailer that carried the first TAG telemetry system for Group C, with equipment panels bearing the ATLAS name.

The screens are our favourite part. Each view appears to have had a rack-mounted CRT monitor of its own, rather than being a window on a shared desktop. One screen is titled "Histograms" and shows rows of bar gauges. Others show a circuit map with the car's position, strip-chart traces, and a text "main screen" of values. If that reading is right, histogram, circuit and trace views, all standard ATLAS display types today, were already there in some form in 1991.

### The people and the car

TAG Electronic Systems was led by Dr Udo Zucker. Before TAG, Zucker had developed the electronic ignition and injection control for the TAG-Porsche engine in McLaren's 1984 MP4/2 ([Formula1.com](https://www.formula1.com/en/latest/article/how-niki-laudas-final-title-winning-car-the-1984-mclaren-mp4-2-changed-f1.7vGiQXahtUbaKo70ZJ8OGQ)). By July 1991, Motor Sport was calling him the "father" of the Motronic engine management system ([Motor Sport, July 1991](https://www.motorsportmagazine.com/archive/article/july-1991/34/under-scrutiny-mercedes-c291/?v=7516fd43adaa)). He later became chief executive of TAG McLaren Audio ([Design Week, 1998](https://www.designweek.co.uk/issues/15-october-1998/clive-grinyer-quits-fitch-for-client-role/)).

Our first large contract was the Mercedes-Benz Group C sportscar programme ([Motion Applied history](https://motionapplied.com/about/our-history/)). Motor Sport's analysis of the Mercedes C291 confirms that we supplied its engine management and a comprehensive telemetry system, which Zucker said transmitted five million bits of information per second.

!!! info "What we know, and what we are still digging for"
    The photograph is our evidence for the 1991 trailer, and we are still looking for the first dated reference to the ATLAS name and for descriptions of the earliest screens. The earliest dated statement we have found is iRacing's 2011 release, which says ATLAS was developed in the 1990s to support McLaren's own Formula 1 team ([iRacing, 2011](https://www.iracing.com/iracing-partners-with-mclaren-electronic-systems-for-online-racing-data-analysis/)). Accounts describe Zucker as the head of TAG Electronic Systems. If you have archive material from the period, we would love to see it.

## Into the paddock, 1992 to 2007

Honda's departure pushed McLaren onto our control systems for 1993, and the telemetry came along.

| Year | What happened |
| --- | --- |
| 1992 to 1993 | McLaren ran our gearbox unit with Honda in 1992, then adopted our full engine control unit for 1993 ([Motor Sport, 2024](https://www.motorsportmagazine.com/archive/article/may-2024/70/sennas-underdog-f1-success-the-special-talent-and-nimble-mclaren-that-won-five-times-in-1993/)). McLaren credits us with the 1993 MP4/8's engine management, chassis control, data acquisition and telemetry ([McLaren heritage](https://www.mclaren.com/racing/heritage/formula-1/cars/1993-formula-1-mclaren-mp4-8/)). |
| 2000 | We introduce 32-bit PowerPC ECUs and start generating software automatically from model-based design tools ([Electronics Weekly](https://www.electronicsweekly.com/market-sectors/embedded-systems/embedded-processing-at-mclaren-2012-06/)). |
| 2002 | McLaren's technical specification credits us with its data analysis and telemetry systems ([Atlas F1, 2002](http://atlasf1.autosport.com/news/2002/features/teams/mclaren.html)). |
| 2003 | We become McLaren Electronic Systems (MES). |
| 2005 | The TAG-310, precursor to the standard ECU, first runs ([New Electronics](https://www.newelectronics.co.uk/content/features/racing-ahead-developing-an-engine-control-unit-for-all-f1-teams)). |
| 2006 | With Microsoft, we win the FIA contract to supply the standard ECU from 2008. Our managing director, Peter van Manen, says we already work with all the F1 teams ([Microsoft, 2006](https://news.microsoft.com/source/2006/12/11/microsoft-and-mclaren-electronic-systems-win-race-to-provide-electronic-technology-to-the-fia-formula-one-world-championship-for-2008-to-2010/)). |

### From dedicated monitors to the Windows desktop

By the time of the standard ECU, ATLAS was a client–server system built on Microsoft's stack. ECU data went to an ATLAS Server developed first with Visual Studio 2005, then 2008 ([formula1-dictionary](https://www.formula1-dictionary.net/f1-ecu-electronic-control-unit/)). Remote Data Servers could be daisy-chained, so live telemetry could be watched at the track, the factory and the engine supplier at once.

The ATLAS client ran on garage laptops under Windows XP or Vista, giving near real-time displays of the car's health, with Excel 2007 alongside for further analysis. We are still working out exactly when ATLAS made the move from dedicated monitors to the desktop.

## The paddock standard, 2008 to 2017

From 2008 our standard ECU was compulsory on every F1 car, and ATLAS came with it. A 2011 analysis put it neatly: ATLAS was the standard because every car ran the FIA-specified MES ECU ([ScarbsF1, 2011](https://scarbsf1.wordpress.com/2011/08/18/telemetry-and-data-analysis-introduction/)).

### A lap comparison at Monaco, 2011

Our favourite picture of ATLAS 9 at work is a real printout from the 2011 Monaco Grand Prix, analysed by data engineer Brian Jee (same ScarbsF1 source). It shows an engineer comparing two drivers:

- The two drivers' laps are overlaid in red and blue against lap distance.
- A vertical cursor shows the exact value on every trace as it moves.
- ATLAS draws a time-difference (TDiff) trace automatically whenever layers are overlaid, so you can see at a glance where time was gained or lost.
- A dot on a track map follows the cursor. ATLAS built the map from lateral acceleration and distance data, and coloured the corners by lateral-acceleration thresholds.
- Drivers reviewed displays like this as printouts in the garage.

### How ATLAS 9 was organised

ATLAS 9 followed a layout that spreadsheet users will find familiar. A workbook held multiple pages, and each page held displays the engineer built. An undated [ATLAS product sheet](https://www.scribd.com/document/480702902/ATLAS-pdf) lists what was on offer:

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

### Beyond Formula 1

ATLAS turned out to be good company away from the F1 grid too.

<div class="grid cards" markdown>

-   :material-flag: __NASCAR__

    ---

    In 2011 we became NASCAR's official ECU supplier, and electronic fuel injection made its debut at the 2012 Daytona 500 ([Electronics Weekly](https://www.electronicsweekly.com/market-sectors/embedded-systems/embedded-processing-at-mclaren-2012-06/)).

-   :material-flash: __Formula E__

    ---

    We supplied the motor, transmission and electronics for the first Spark-Renault car ([Motorsport.com, 2013](https://www.motorsport.com/formula-e/news/mclaren-the-power-behind-formula-e/440037/)).

-   :material-controller: __Sim racing__

    ---

    In May 2011 we offered iRacing members ATLAS Express, a version derived from the F1 software ([iRacing](https://www.iracing.com/iracing-partners-with-mclaren-electronic-systems-for-online-racing-data-analysis/)). The set-up guide installed into an "ATLAS 9" folder and shipped a sample workbook ([guide](https://www.scribd.com/document/352980261/McLaren-ATLAS-iRacing-pdf)).

</div>

## Rebuilt from the ground up, 2018 to 2021

Around 2018 to 2019, ATLAS 10 arrived. We described it as a new visualisation platform ["built from the ground up"](https://mclarenappliedtechnologies.zendesk.com/hc/en-us/sections/360000858514-ATLAS-10) for faster, easier access to data, and we designed ATLAS 9 and ATLAS 10 to run side by side during the transition so nobody had to switch overnight.

<div class="grid cards" markdown>

-   :material-puzzle-outline: __A plugin platform__

    ---

    ATLAS became a user-interface shell in which most functionality comes from display, functionality and recorder plugins ([Motion Applied](https://www.motionapplied.com/products/ATLAS)). Developers could write their own display plugins in .NET ([Writing a Display Plugin](https://mclarenappliedtechnologies.zendesk.com/hc/en-us/articles/115001760613-Writing-a-Display-Plugin)). Today that is the [Display API](../developer-resources/atlas/display-api/index.md).

-   :material-lan-connect: __An open architecture__

    ---

    Engineers could feed data from third-party tools into ATLAS 10 for the rest of the team to view alongside other sources ([Race Tech, 2019](https://www.racetechmag.com/article/five-f1-tech-facts-every-fan-should-know/)).

-   :material-compare: __Compare sets__

    ---

    Compare sets were an ATLAS 10 feature ([automation API notes](https://mclarenappliedtechnologies.zendesk.com/hc/en-us/articles/360009038334-ATLAS-10-Automation-API)). They are still how Viewer overlays runs today.

</div>

Race Tech reported in March 2019 that teams would be evaluating ATLAS 10 that season. Our support site carried a provisional 2018 F1 release schedule, and guidance on importing ATLAS 9 workbooks.

## How far we have come

The ideas on those early screens have held up well: traces against time or distance, a cursor that reads every value, overlaid laps with a time difference, and workbooks of pages of displays. They are all still here, and we have built a lot around them.

| | Where we started | Where we are |
| --- | --- | --- |
| **Screens** | A rack-mounted monitor for each view (1991 photograph) | Displays that dock or float on any monitor, grouped into pages and saved in workbooks |
| **Display types** | Nine on the ATLAS 9 product sheet | [More than 20](../key-functionality/analyse/viewer/displays/index.md), including a 3D Surface Map, a Bing satellite map, video and a steering-wheel PCU Dash simulator |
| **Comparing runs** | Two laps overlaid and printed for the garage (Monaco, 2011) | [Compare sets](../key-functionality/analyse/viewer/handling-data/sessions/loading-sessions.md): several sessions overlaid live, with TDiff in the [Waveform display](../key-functionality/analyse/viewer/displays/waveform.md) |
| **Calculations** | Engineers took data into Excel for further analysis | [Functions](../key-functionality/analyse/viewer/functions/index.md) written in FDL, C# or MATLAB inside Viewer, plus Simulink models through vTAG |
| **Extending it** | ActiveX controls running inside ATLAS | Plugins and three APIs: [Display](../developer-resources/atlas/display-api/index.md), [Automation](../developer-resources/atlas/automation-api/index.md) and [SQL Race](../developer-resources/atlas/sql-race/index.md) |
| **Sharing data** | Printed displays reviewed in the garage | A shared SQL Race database that a whole team can use at once, plus session references and configuration bundles |
| **Live data** | Remote Data Servers daisy-chained between track, factory and supplier | The same path, plus [Open Streaming](../key-functionality/stream/open_streaming_architecture/index.md), a Kafka-based layer that remote or late-joining consumers can read |

## Where to go next

- [Start here](index.md): the ecosystem today, and a short course for new users.
- [ATLAS Viewer](../key-functionality/analyse/viewer/index.md): the current application.
- [Release notes](../blog/index.md): what we are changing now.
