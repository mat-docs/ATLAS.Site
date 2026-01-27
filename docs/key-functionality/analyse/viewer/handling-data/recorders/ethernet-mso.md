# Ethernet Multi-Session Offload Recorder

## Purpose

Offloads multiple stored sessions from ECUs that support multi-session memory (e.g. TAG-310).

## Prerequisites

ECU must support multi-session (BIOS B023+).

ATLAS or ADS must be running.

## Setup Instructions

1. Open Session Browser.

2. Add an Ethernet Multi-Session Offload Recorder.

3. Use the Connection Tab to:

    - Select Car and Unit.

    - Choose SQL Server or SQLite.

    - Set Export Folder.

    - Define Session Identifier.

    - Use the Select Sessions Tab to:

    - View sessions stored on the ECU.

    - Select sessions to offload.

    - Use buttons: Select All, Clear All, Hide Offloaded, Query.

4. Click Start to offload selected sessions.

## Notes

Sessions with overlapping timestamps are grouped into one SQL Race session.
If the unit doesn’t support multi-session, use the standard Ethernet Telemetry Recorder