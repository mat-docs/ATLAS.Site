# File Telemetry Recorder

## Purpose

Replays previously recorded raw telemetry data for diagnostics or analysis.

## Setup Instructions

!!! note
    .raw_tm file must exist. These are created during sessions where raw data logging is enabled.

1. Open Session Browser.
2. Add a File Telemetry Recorder.
3. Configure:
    - Recorder Name
    - Telemetry Timestamp File: Browse to .raw_tm file.
    - Session Identifier
4. Click Start to begin playback.

## Notes

Useful for debugging or training without needing live data.

The file must be located in the same directory as the session and named accordingly