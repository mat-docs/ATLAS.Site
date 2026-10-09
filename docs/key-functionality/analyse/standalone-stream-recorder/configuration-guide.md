# Configuration Guide

Task-based recipes for `Config/AppConfig.json`. Each recipe shows only the settings that change; for every field see the [Configuration Reference](configuration-reference.md).

!!! note "Add or update — don't replace the whole file"
    The snippets below are deltas on the shipped `AppConfig.json` shown in [Getting Started](getting-started.md).

## Connect to my Kafka broker

Use this when your producer's Stream API uses a different broker or stream layout from the sample. The recorder must match the producer.

```json title="AppConfig.json (StreamApiConfig)" linenums="1"
"StreamApiConfig": {
  "StreamCreationStrategy": 2,
  "BrokerUrl": "localhost:9094",
  "PartitionMappings": [{}]
}
```

- `StreamCreationStrategy` is `1` (`PartitionBased`) or `2` (`TopicBased`); the names also work.
- `PartitionMappings` is only used with `PartitionBased`; each entry needs a `Stream` name and a `Partition` number.
- If Kafka uses SASL or SSL, see [Kafka Security](../../../developer-resources/secu4/stream_api/reference_docs/configuration/kafka-security.md).

The remaining `StreamApiConfig` fields are documented in [Server Configuration](../../../developer-resources/secu4/stream_api/reference_docs/configuration/server-config.md#configuration-properties).

## Record to SSN2 files

Use this when you want one SSN2 file per session.

```json title="AppConfig.json (WritingConfig)" linenums="1"
"WritingConfig": {
  "SessionFormat": "SSN2",
  "RecordingFolder": "C:\\Standalone Stream Recorder\\SSN2",
  "UseTemporaryRecordingFolder": false,
  "UseStreamApiSessionIdentifier": true,
  "UseStreamApiSessionDetails": true
}
```

`RecordingFolder` is required for SSN2. It may contain wildcards such as `%r`, `%c`, `%y%m%d` or `$Param$`, which are resolved for each session.

### Write to a temporary folder first

Use this when the final folder is on a slow or shared drive. The file is written to the temporary folder while the session is live, then moved to `RecordingFolder` when it closes.

```json title="AppConfig.json (WritingConfig)" linenums="1" hl_lines="3 4"
"WritingConfig": {
  "SessionFormat": "SSN2",
  "UseTemporaryRecordingFolder": true,
  "TemporaryRecordingFolder": "C:\\Standalone Stream Recorder\\Temp",
  "RecordingFolder": "C:\\Standalone Stream Recorder\\SSN2",
  "UseStreamApiSessionIdentifier": true,
  "UseStreamApiSessionDetails": true
}
```

`TemporaryRecordingFolder` is required when `UseTemporaryRecordingFolder` is `true`.

## Record to a database

Use this when you want sessions in a SQL Race database, or want to load live sessions from the recorder.

=== "SQLite"

    ```json title="AppConfig.json" linenums="1"
    "WritingConfig": {
      "SessionFormat": "Database",
      "UseTemporaryRecordingFolder": false,
      "UseStreamApiSessionIdentifier": true,
      "UseStreamApiSessionDetails": true
    },
    "SqlRaceConfig": {
      "ConnectionString": "DbEngine=SQLite;Data Source=C:\\Standalone Stream Recorder\\stream_recorder.ssndb;PRAGMA journal_mode=WAL;",
      "DbEngine": "SQLite",
      "DataSource": "C:\\Standalone Stream Recorder\\stream_recorder.ssndb",
      "DeleteSessionOnClose": "NoSessionDelete",
      "ServerListenerAddress": "127.0.0.1:7300"
    }
    ```

=== "SQL Server"

    ```json title="AppConfig.json" linenums="1"
    "WritingConfig": {
      "SessionFormat": "Database",
      "UseTemporaryRecordingFolder": false,
      "UseStreamApiSessionIdentifier": true,
      "UseStreamApiSessionDetails": true
    },
    "SqlRaceConfig": {
      "ConnectionString": "server=<ServerName>\\<InstanceName>;Initial Catalog=<DatabaseName>;Trusted_Connection=True;",
      "DbEngine": "SQLServer",
      "DataSource": "<ServerName>\\<InstanceName>",
      "DeleteSessionOnClose": "NoSessionDelete",
      "ServerListenerAddress": "127.0.0.1:7300"
    }
    ```

    Replace the `<...>` placeholders with your SQL Server name, instance and SQL Race database. This example uses Windows authentication (`Trusted_Connection=True`); use whichever SQL Server connection string your SQL Race database requires.

With `Database`, `ConnectionString`, `DbEngine`, `DataSource` and `DeleteSessionOnClose` must all be set, otherwise the recorder will not start. `DbEngine` accepts `SQLite` or `SQLServer`, in any letter case.

The recorder only starts its Server Listener when `SessionFormat` is `Database`.

## Change session identifier or details

Use this when the producer's session identifier or details are not what you want stored.

```json title="AppConfig.json (WritingConfig)" linenums="1" hl_lines="2 3 4 5 6 7"
"WritingConfig": {
  "UseStreamApiSessionIdentifier": false,
  "SessionIdentifierText": "%y%m%d%H%M%S",
  "UseStreamApiSessionDetails": false,
  "SessionDetails": {
    "MyDetailName": "MyDetailValue"
  },
  "SessionFormat": "SSN2",
  "RecordingFolder": "C:\\Standalone Stream Recorder\\SSN2",
  "UseTemporaryRecordingFolder": false
}
```

- `SessionIdentifierText` is required when `UseStreamApiSessionIdentifier` is `false`, and may contain date wildcards.
- `SessionDetails` is a set of text key/value pairs applied when `UseStreamApiSessionDetails` is `false`. `MyDetailName` and `MyDetailValue` are placeholders — use your own.

## Record only some sessions

Use `StreamReadingConfig.SessionIdentifierPattern` to filter by session identifier; `*` records everything.

```json title="AppConfig.json (StreamReadingConfig)" linenums="1"
"StreamReadingConfig": {
  "ReadingMode": "Live",
  "DataSource": "Default",
  "SessionIdentifierPattern": "*"
}
```

`DataSource` must match the data source name set on the producer. When the producer is the Bridge Service, this is the name of the ADS.

## Catchup on missed data

Set `ReadingMode` to `LiveWithCatchUp` to read live data and also catch up on data missed earlier. With `Live` only live data is read.

## Resume recording after a disconnect

Set `StreamReadingConfig.GroupId` so the recorder can continue from where it left off if it disconnects for any reason. Restart the recorder with the same `GroupId` to resume. It may contain only letters, digits, underscores and hyphens.

```json title="AppConfig.json (StreamReadingConfig)" linenums="1" hl_lines="5"
"StreamReadingConfig": {
  "ReadingMode": "Live",
  "DataSource": "Default",
  "SessionIdentifierPattern": "*",
  "GroupId": "my-recorder"
}
```

## Record VPS sessions

Set the top-level `"RecordVpsSessions": true`. It defaults to `false`.

## Expose Prometheus metrics

```json title="AppConfig.json (MetricsConfig)" linenums="1"
"MetricsConfig": {
  "Port": 10015,
  "IsEnabled": true
}
```

`Port` must be between 1 and 65535.

!!! warning "Administrator rights"
    On Windows the metrics endpoint may need the recorder to run as Administrator. If it does not have access, the recorder logs that it is continuing without Prometheus.

## Change logging

Logging is configured by the `Serilog` section. The shipped file logs to the console and to a daily rolling file `./logs/standalone-stream-recorder-.txt` (10 MB limit, rolls on size). If the section is removed, the recorder logs at `Information` level to the console and to `logs/standalone-stream-recorder-.txt`, rolling daily.
