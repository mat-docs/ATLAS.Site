# Coming from another analysis tool

**Course step 1 of 9 · about 10 minutes**

You have analysed measurement or test data before. You know what a channel, a sample rate and a unit are, and you have opened plenty of recorded files. This page covers what works differently in ATLAS, and how each idea maps to what you already know, ahead of your first hour in [ATLAS Viewer](../../key-functionality/analyse/viewer/index.md).

!!! note "Two words, two meanings"
    **ATLAS** is the whole ecosystem: configuring hardware, streaming, enriching, storing and analysing data. **ATLAS Viewer** (Viewer, for short) is the desktop application where you look at the data. Colleagues will often say "ATLAS" and mean Viewer. When you read these docs, check which one is meant.

## Six things that work differently

### 1. Data lives in sessions, and sessions usually live in a database

In many tools you open a file and that file *is* your dataset. In ATLAS the unit of data is a **session**: everything recorded during one run, with its metadata (driver, car, circuit, run type, notes and so on).

Sessions are normally stored in a **SQL Race database**, which means you browse them by their metadata instead of by folder name. Viewer also opens session files directly (`.ssn2`, plus legacy `.ssn`) and can import delimited text such as CSV. See [Getting your data in](getting-data-in.md).

### 2. A session can still be arriving while you look at it

A **historical** session is finished. A **live** (telemetry) session is still being recorded, and Viewer shows it as it arrives. The same displays, parameters and comparisons work for both. Live data comes in through a **recorder**, which you set up in the Session Browser.

### 3. Layout and data are kept apart

Your screen layout is a **workbook** (a `.wbkx` file) containing **pages**, and each page holds **displays** (plots, tables, gauges). The workbook does not contain the data. Sessions are loaded into **sets**, and displays are pointed at a set.

The practical effect: you build a workbook once, then re-use it on any session. It also means that if a workbook opens with empty displays, the usual cause is that no session is loaded into the set it points at.

### 4. Comparison is built in

A **compare set** holds one or more sessions that you want to look at together. You can overlay them in the same display, or point different displays at different sets. Overlaying is not a separate mode you switch on later. It is how sets work.

### 5. Time is divided into laps and markers

A **lap** is a labelled segment of a session, and a **marker** is a labelled point or range. They started in motorsport, but they are a general way of structuring any recording that has repeated cycles or phases (a test cycle, a warm-up, a stage of a test). You can define them yourself. Most analysis in Viewer, such as comparing runs, statistics per segment and zooming to a section, is built on them. See [Laps, markers and comparing runs](laps-and-comparison.md).

### 6. It is a system, not just an application

Behind Viewer there can be hardware configuration, live distribution servers, calculation services and shared databases. Many analysts never touch those. But their existence explains a lot of the vocabulary in the docs. [The five stages](five-stages.md) is the map.

## Concept map

Terms differ between tools, so treat this as a starting guide rather than an exact translation.

| If you think in terms of… | In ATLAS this is a… | Notes |
|---|---|---|
| A measurement or recording | **Session** | Includes its metadata and laps. Stored in a database or in an `.ssn2` file. |
| A signal, channel or measured variable | **Parameter** | Identified as `name:application`, for example `vCar:Chassis`. |
| A group of signals from one source or subsystem | **Application group** | Shown as a tree in the Parameter Browser. Defined by the logging system, not editable in Viewer. |
| A calculated or derived channel | **Function** (written in FDL, C# or MATLAB) or a **virtual parameter** | A function is used like a parameter once saved. |
| A layout, experiment or workspace | **Workbook** (`.wbkx`) | Holds pages and displays; does not hold the data. |
| A tab or sheet in the layout | **Page** | |
| A plot, table or gauge | **Display** | Waveform, Numeric, Scatterplot, Histogram, FFT and others. |
| A group of measurements opened together for overlay | **Compare set** | Sessions in the same set can be overlaid. |
| A cycle, run segment or stage | **Lap** | Define your own if the data source does not. |
| An annotation, event or region of interest | **Marker** (user-defined) or **event** (from the ECU) | Markers can carry labels, values and units. |
| A data-acquisition connection | **Recorder** | Created in the Session Browser. |
| A saved export recipe | **Export configuration** | Text, MATLAB, SSN2 or SQL Race Database. Needs the CSV/ASCII Export licence option. |

## What you will recognise

- Time-series plots with a cursor that is synchronised across displays.
- Zooming with the scroll wheel and selecting a region to zoom to.
- Statistics per lap, histograms, FFT and scatter plots.
- Calculated channels, and a way to export to MATLAB or text.
- Scripting: you can drive Viewer and read the data store from code. See [Automating it](automating.md).

## Quick answers to common first questions

| What you see | Usually because |
|---|---|
| Displays are blank | No session has been loaded into the set the display points at. Open the Session Browser (`Ctrl+L`) and add one. |
| You cannot find a parameter | It is in a different application group, or the session does not contain it. Search with `*` as a wildcard, or choose **All Groups**. |
| The session you recorded is not showing | Starting a recorder does not load the session. Add it to a set yourself. |
| An option or format is missing | Some features, such as CSV/ASCII import and export, depend on the licence options you have. |
| Laps cannot be edited | Laps are read-only while a session is live. Editing is enabled once it becomes historical. |

## Next

[The five stages](five-stages.md) shows where Viewer sits in the wider ecosystem and which parts you can ignore for now.
