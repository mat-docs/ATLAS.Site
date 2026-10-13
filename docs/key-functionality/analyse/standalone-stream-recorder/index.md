# Standalone Stream Recorder

The Standalone Stream Recorder is a Windows console application that listens to live telemetry published through the [Stream API](../../../developer-resources/secu4/stream_api/index.md) and saves each session to disk, without needing ATLAS Viewer to act as the recorder.

## At a glance

| | |
|---|---|
| **Application** | `MA.DataPlatforms.DataRecorder.Host` |
| **Platform** | Windows (x64) |
| **Input** | A Kafka broker carrying Stream API data |
| **Output** | SSN2 files, or a SQL Race database (SQLite or SQL Server) |
| **Configuration file** | `Config/AppConfig.json`, next to the executable |
| **Logs** | Console and daily rolling files in `logs/` (default) |

## What it does

When the recorder starts it connects to the Kafka broker, waits for sessions published to the configured data source, and records each one as it arrives. When a session ends it waits for the next one.

## Choose your output format

The first decision is `WritingConfig.SessionFormat`:

| Format | Use it when | Also needs |
|---|---|---|
| `SSN2` | You want one SSN2 file per session in a folder. | `WritingConfig.RecordingFolder` |
| `Database` | You want sessions stored in a SQL Race database, and want to load live sessions through the recorder's Server Listener. | `SqlRaceConfig` (connection string, engine, data source, delete option) |

## The three things you must configure

1. **Where to read from** — `StreamApiConfig` (`BrokerUrl`, `StreamCreationStrategy`) and `StreamReadingConfig.DataSource`. These must match the producer's Stream API settings.
2. **Where to write to** — `WritingConfig` and, for `Database`, `SqlRaceConfig`.
3. **Which sessions to record** — `StreamReadingConfig.SessionIdentifierPattern` and `RecordVpsSessions`.

## Next steps

- [Getting Started](getting-started.md) — run the recorder for the first time
- [Configuration Guide](configuration-guide.md) — task-based recipes
- [Configuration Reference](configuration-reference.md) — every field
- [Troubleshooting](troubleshooting.md)
