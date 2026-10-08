# Getting Started

This page takes you from a fresh install to a recorded session.

## Before you begin

- A Windows machine to run the recorder.
- A Kafka broker that a Stream API producer (for example the [Bridge Service](../../../developer-resources/secu4/bridge_service/index.md)) is publishing to.
- The producer's **Stream Creation Strategy**, **broker address** and **data source name**. The recorder must use the same values. See [Server Configuration](../../../developer-resources/secu4/stream_api/reference_docs/configuration/server-config.md).

## 1. Edit AppConfig.json

The recorder reads `Config/AppConfig.json` from the folder containing the executable. This is the shipped file, which records to SSN2 files and works as a starting point:

```json title="AppConfig.json" linenums="1"
{
  "$schema": "./AppConfig.schema.json",
  "StreamApiConfig": {
    "StreamCreationStrategy": 2,
    "BrokerUrl": "localhost:9094",
    "PartitionMappings": [{}],
    "IntegrateSessionManagement": true,
    "IntegrateDataFormatManagement": true,
    "UseRemoteKeyGenerator": false,
    "RemoteKeyGeneratorServiceAddress": "",
    "BatchingResponses": false,
    "StreamApiPort": 13579,
    "Domain": ""
  },
  "RecordVpsSessions": false,
  "WritingConfig": {
    "SessionFormat": "SSN2",
    "RecordingFolder": "C:\\Standalone Stream Recorder\\SSN2",
    "UseTemporaryRecordingFolder": false,
    "TemporaryRecordingFolder": "",
    "UseStreamApiSessionIdentifier": true,
    "UseStreamApiSessionDetails": true
  },
  "StreamReadingConfig": {
    "ReadingMode": "Live",
    "DataSource": "Default",
    "SessionIdentifierPattern": "*",
    "GroupId": ""
  },
  "SqlRaceConfig": {
    "ConnectionString": "DbEngine=SQLite;Data Source=C:\\Standalone Stream Recorder\\stream_recorder.ssndb;PRAGMA journal_mode=WAL;",
    "DbEngine": "SQLite",
    "DataSource": "C:\\Standalone Stream Recorder\\stream_recorder.ssndb",
    "DeleteSessionOnClose": "NoSessionDelete",
    "ServerListenerAddress": "127.0.0.1:7300"
  },
  "MetricsConfig": {
    "Port": 10015,
    "IsEnabled": false
  },
  "Serilog": {
    "Using": [
      "Serilog.Sinks.Console",
      "Serilog.Sinks.File"
    ],
    "MinimumLevel": "Information",
    "WriteTo": [
      {
        "Name": "Console"
      },
      {
        "Name": "File",
        "Args": {
          "path": "./logs/standalone-stream-recorder-.txt",
          "rollingInterval": "Day",
          "fileSizeLimitBytes": 10485760,
          "rollOnFileSizeLimit": true
        }
      }
    ]
  }
}
```

Change at least `StreamApiConfig.BrokerUrl`, `StreamApiConfig.StreamCreationStrategy` and `StreamReadingConfig.DataSource` to match your producer, and `WritingConfig.RecordingFolder` to a folder you want.

!!! note "Add or update — don't replace the whole file"
    To record to a SQL Race database instead of SSN2 files, change only `WritingConfig.SessionFormat` to `"Database"` and make sure the `SqlRaceConfig` values are right for your database. The shipped `SqlRaceConfig` already points at a SQLite file. See the [Configuration Guide](configuration-guide.md#record-to-a-database).

## 2. Start the recorder

Run `MA.DataPlatforms.DataRecorder.Host.exe`. It takes no command-line arguments; all settings come from `AppConfig.json` (and environment variables, see below).

If the configuration is invalid, the recorder logs each problem and does not start. See [Troubleshooting](troubleshooting.md#the-recorder-exits-straight-away).

## 3. Publish a session

Start a session from your Stream API producer on the configured data source. The recorder logs to the console and to `logs/standalone-stream-recorder-<date>.txt`.

## 4. Stop the recorder

Press Ctrl+C in the console window.

## Overriding settings with environment variables

Environment variables are read after `AppConfig.json`, so they override it. Use a double underscore for nesting, for example `WritingConfig__SessionFormat`.
