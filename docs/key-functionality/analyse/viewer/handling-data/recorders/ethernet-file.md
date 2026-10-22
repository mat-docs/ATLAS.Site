# Ethernet Telemetry Recorder

## Purpose

Streams live data from ECUs connected via Ethernet (e.g. TAG-310).

## Prerequisites

Car Definition must be loaded.

ECU must be connected via Ethernet.

## Setup Instructions

1. Open Session Browser.

2. Add an Ethernet Telemetry Recorder.

3. Configure:

    - Recorder Name

    - Car: Select from Car Definitions. Click **...** to open the **Unit Definition** window.

    - Unit: Shows the unit used for the selected car. ATLAS selects **All Units** when it is available.

    - Data Versions: Enable to upload DTVs at start.

    - Export Config As text

    - Export M files

    - SQLRace database setting: choose the **Database engine** and **Export folder**.

    - Session Identifier

    Options that the connected unit does not support are disabled.

4. Click Start to begin recording.

## Notes

Ideal for continuous data streaming during track sessions.
Does not require a radio link; Ethernet is sufficient