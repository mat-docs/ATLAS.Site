# Stream Recorder

## Purpose
Connects to a Kafka broker to record live telemetry via the Open Data Streaming Architecture.

## Prerequisites
Stream Server Configuration must be set up in Tools|Options|Recorders|Stream Recorder.
<img width="912" height="742" alt="image" src="https://github.com/user-attachments/assets/08e5d355-788a-40c2-820a-684d57631435" />

## Recording Modes
The Stream Recorder supports two operational modes for consuming OSAP data from Kafka. These modes determine where in the stream the Recorder begins reading data and how it handles historical backlog.

1.** Live Mode:** Live mode begins consuming data only from the moment the Recorder starts. The Recorder attaches to the Kafka topic at the current offset and continues forward.

2. **Live with Catchup Mode: **The Recorder starts at the live edge, ensuring it processes new data immediately. Simultaneously, it begins consuming all data from the start of the session. Catch‑up happens in the background, at a controlled rate, without disrupting live processing. Priority is always given to leading‑edge, real‑time data.

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
<img width="602" height="698" alt="image" src="https://github.com/user-attachments/assets/7e402b69-a585-4968-a083-d36463c657d3" />
