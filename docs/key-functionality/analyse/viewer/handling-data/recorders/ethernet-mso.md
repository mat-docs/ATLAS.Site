# Ethernet Multi-Session Offload Recorder

## Purpose

Offloads multiple stored sessions from ECUs that support multi-session memory (e.g. TAG-310).

## Prerequisites

ECU must support multi-session (BIOS B023+).

ATLAS or ADS must be running.

## Setup Instructions

1. Open Session Browser.

2. Add an Ethernet Multi-Session Offload Recorder.

3. Use the **Connection** tab to:

    - Select Car and Unit.

    - Choose the **Database engine** (SQL Server or SQLite).

    - Set the **Export folder**.

    - Define the Session Identifier.

4. Use the **Select Session** tab to:

    - View sessions stored on the ECU, with their **Type / Number**, **Start Date / Time**, **End Date / Time**, **Length**, **Laps**, **Config ID**, **Offloaded By** and **Offload Progress**.

    - Select sessions to offload.

    - Use the buttons: **Select All**, **Clear All**, **Hide Offloaded** (or **Show Offloaded**) and **Query**.

5. Click Start to offload selected sessions.

## Notes

Sessions with overlapping timestamps are grouped into one SQL Race session.
If the unit doesn’t support multi-session, use the standard Ethernet Telemetry Recorder