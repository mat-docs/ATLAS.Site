# Glossary

Terms you will meet in ATLAS and its documentation. **ATLAS** means the whole ecosystem. **ATLAS Viewer** (or **Viewer**) means the analysis application.

## A

**ADS (ATLAS Data Server)**
:   Receives live telemetry and distributes it to ATLAS clients. See [ATLAS Data Server](../key-functionality/stream/ads/index.md).

**Application group**
:   A group of parameters from one source or subsystem, for example Chassis or Engine. Defined by the logging system. Shown as a tree in the Parameter Browser. Also called an *application*.

**Alarm**
:   A condition on parameters that Viewer flags when it occurs. See [Alarms](../key-functionality/analyse/viewer/alarms/index.md).

**Automation API**
:   An API for controlling Viewer from code. See [Automating it](course/automating.md).

## B

**Bridge Service**
:   Decodes raw ADS data into engineering values and publishes it to a broker. Part of [Open Streaming](../key-functionality/stream/open_streaming_architecture/index.md).

## C

**Compare set**
:   One or more sessions loaded together. Displays point at a set, and sessions in the same set can be overlaid. Also called a *set*. See [Loading sessions](../key-functionality/analyse/viewer/handling-data/sessions/loading-sessions.md).

**Composite session**
:   Several sessions appended into one continuous timeline. Also called an *appended session*.

## D

**Display**
:   A single visualisation on a page: Waveform, Numeric, Scatterplot and so on. See [Displays](../key-functionality/analyse/viewer/displays/index.md).

**Display API**
:   An API for building custom displays that run inside Viewer.

## E

**ECU**
:   Electronic control unit. [System Monitor](../key-functionality/configure/system-monitor/index.md) configures and calibrates Motion Applied ECUs.

**Event**
:   A time-stamped occurrence recorded by an ECU, such as a fault. Shown in the Event display. Compare with *marker*.

## F

**FDL (Function Definition Language)**
:   The language used to write functions in the Function Editor. See [Functions](../key-functionality/analyse/viewer/functions/index.md).

**Function**
:   A user-defined calculation on session data that is used like a parameter. Written in FDL, C# or MATLAB.

## K

**Kafka**
:   The message broker used by Open Streaming.

## L

**Lap**
:   A labelled segment of a session. In motorsport, a trip round a circuit. In general, any repeated cycle or phase. See [Laps](../key-functionality/analyse/viewer/handling-data/laps-markers/laps.md).

**Live session**
:   See *telemetry session*.

## M

**Marker**
:   A user-defined labelled point or range in a session, with optional labels, values and units. See [Markers](../key-functionality/analyse/viewer/handling-data/laps-markers/markers.md).

## O

**Open Streaming**
:   The Kafka-based, open-schema streaming layer of ATLAS. See [Open Streaming](../key-functionality/stream/open_streaming_architecture/index.md).

## P

**Page**
:   A tab in a workbook that holds displays.

**Parameter**
:   A measured or calculated signal, identified as `name:application`, for example `vCar:Chassis`. Other tools may call this a channel or a signal.

**Parameter Browser**
:   The panel for finding and adding parameters (`P`).

## R

**RDA (Reduced Data Access)**
:   A System Monitor feature that restricts sharing of data and set-ups between applications, according to licence. See [RDA](../key-functionality/configure/system-monitor/getting-started/rda.md).

**RDS (Remote Data Server)**
:   Lets a client listen to an ADS on another network over a WAN. See [RDS](../key-functionality/stream/ads/rds.md).

**Recorder**
:   A connection that captures live or offloaded data and writes it into a session. Created in the Session Browser. See [Getting your data in](course/getting-data-in.md#live-data-with-recorders).

**RTA (Remote Telemetry Architecture)**
:   An architecture for connecting ATLAS to your own existing database through a data adapter. See [RTA](../key-functionality/integrate/rta/index.md).

## S

**Session**
:   One recording with its metadata, laps, events and parameter data. Either *historical* (finished) or *telemetry* (live).

**Session Browser**
:   The tool for finding, loading, recording and managing sessions (`Ctrl+L`).

**Set**
:   See *compare set*.

**SQL Race**
:   The session data layer behind ATLAS. Provides the database, and the API for reading and writing sessions. See [SQL Race](../key-functionality/store/sqlrace/index.md).

**SQL Race API**
:   The API for reading, writing and searching session data from code.

**SRMS (SQL Race Management Studio)**
:   The tool for organising, bulk-importing and auto-importing sessions in a SQL Race database.

**SSN / SSN2**
:   ATLAS session files. SSN2 is the current format. SSN is the legacy format, which can still be loaded.

**Stream API**
:   The standard API for reading and writing telemetry on the broker in Open Streaming.

**System Monitor**
:   The application for configuring, calibrating and tuning Motion Applied ECUs and data loggers.

## T

**Telemetry session**
:   A session that is still being recorded, and shown in Viewer as data arrives. Becomes historical when recording ends.

**Timebase**
:   The time range a display shows. **Timeline**: the bar at the top of the Viewer window that controls it.

## V

**Virtual parameter**
:   A parameter calculated from other parameters, rather than measured. Can be produced by Functions, vTAG, or the Virtual Parameter Service.

**vTAG Server / vTAG Service**
:   Applications that run Simulink models on telemetry to produce new parameters. See [Enrich](../key-functionality/enrich/index.md).

**VPS (Virtual Parameter Service)**
:   A service that calculates FDL virtual parameters centrally in an Open Streaming set-up.

## W

**Workbook**
:   Your saved workspace (`.wbkx`): pages, displays, layout and properties. Does not contain the session data. See [Workbooks and pages](../key-functionality/analyse/viewer/system-operation/workbook.md).
