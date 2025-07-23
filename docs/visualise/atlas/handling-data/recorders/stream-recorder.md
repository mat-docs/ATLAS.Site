# Stream Recorder

## Purpose
Connects to a broker (e.g. Kafka, NATS) to record live telemetry via the Open Data Streaming Architecture.

## Prerequisites
Stream Server Configuration must be set up.
Data Source must be active.
Session Identifier Pattern must be defined.

## Setup Instructions

1. Open Session Browser.
2. Add a Stream Recorder.
3. Configure:
    - Recorder Name
    - Database Engine: SQLite or SQL Race.
    - Database Path / Connection String
    - Delete Recorded Session on Close
    - Auto Export to SSN2
    - Export Folder
    - Stream Server / Data Source
    - Session Identifier Pattern / Source
- Session Details Source / Details
4. Choose between:
    - Start: Waits for a live session and records it.
    - Auto Record: Continuously records new sessions as they appear.

## Notes
Supports backfill for late-start clients (10x speed).
Automatically reconnects after network changes.
Only sessions matching the identifier pattern will be recorded