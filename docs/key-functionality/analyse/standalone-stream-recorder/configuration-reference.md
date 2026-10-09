# Configuration Reference

Every setting in `Config/AppConfig.json`. For task-based examples see the [Configuration Guide](configuration-guide.md).

The shipped `Config` folder includes `AppConfig.schema.json`; the `$schema` entry at the top of `AppConfig.json` lets editors validate and auto-complete the file. Enum settings accept either the name or the number.

The sections `StreamApiConfig`, `WritingConfig`, `StreamReadingConfig`, `SqlRaceConfig` and `MetricsConfig` must be present. `Serilog` is optional.

## Top level

| Key | Type | Default | Description |
|---|---|---|---|
| `RecordVpsSessions` | bool | `false` | Record VPS sessions. |

## StreamApiConfig

Connection settings for the Stream API. The recorder's key settings are below.

| Key | Type | Notes |
|---|---|---|
| `StreamCreationStrategy` | `PartitionBased` (1) / `TopicBased` (2) | Must match the producer. |
| `BrokerUrl` | string | Kafka broker address, for example `localhost:9094`. |
| `PartitionMappings` | array of `{ "Stream": string, "Partition": int }` | Only used with `PartitionBased`. |

All other `StreamApiConfig` settings, including `Security` and the Kafka broker tuning file paths, are described in the [Stream API Server Configuration properties](../../../developer-resources/secu4/stream_api/reference_docs/configuration/server-config.md#configuration-properties). See also [Kafka Security](../../../developer-resources/secu4/stream_api/reference_docs/configuration/kafka-security.md) and [Kafka Broker Tuning](../../../developer-resources/secu4/stream_api/reference_docs/configuration/kafka-broker-tuning.md).

## WritingConfig

| Key | Type | Default | Description |
|---|---|---|---|
| `SessionFormat` | `Database` (0) / `SSN2` (1) | `Database` | Format sessions are recorded in. **Required.** |
| `UseStreamApiSessionIdentifier` | bool | — | Use the session identifier from the Stream API. **Required.** |
| `SessionIdentifierText` | string | empty | Identifier to use instead. Required when `UseStreamApiSessionIdentifier` is `false`; may contain wildcards such as `%y%m%d%H%M%S`. |
| `UseStreamApiSessionDetails` | bool | — | Use session details from the Stream API. **Required.** |
| `SessionDetails` | object of strings | empty | Details to apply when `UseStreamApiSessionDetails` is `false`. |
| `RecordingFolder` | string | empty | Final folder for SSN2 files. Required for `SSN2`; ignored for `Database`. May contain wildcards (`%r`, `%c`, `%y%m%d`, `$Param$`). |
| `UseTemporaryRecordingFolder` | bool | — | Write SSN2 files to `TemporaryRecordingFolder` while live, then move them to `RecordingFolder`. **Required.** |
| `TemporaryRecordingFolder` | string | empty | Required when `UseTemporaryRecordingFolder` is `true` and the format is `SSN2`. |

## StreamReadingConfig

| Key | Type | Default | Description |
|---|---|---|---|
| `ReadingMode` | `Live` (0) / `LiveWithCatchUp` (1) | `Live` | `Live` reads live data only; `LiveWithCatchUp` also catches up on missed data. **Required.** |
| `DataSource` | string | — | Data source to read from, for example `Default`. **Required.** |
| `SessionIdentifierPattern` | string | — | Which sessions to read, for example `*`. **Required.** |
| `GroupId` | string | empty | Group id used to consume the data, so the recorder can continue where it left off after a disconnect. Letters, digits, `_` and `-` only. |

## SqlRaceConfig

Only used when `WritingConfig.SessionFormat` is `Database`. With `SSN2` the section must still be present but may be empty.

| Key | Type | Default | Description |
|---|---|---|---|
| `ConnectionString` | string | — | SQL Race connection string. Required for `Database`. |
| `DbEngine` | `SQLite` / `SQLServer` | — | Case-insensitive. Required for `Database`. |
| `DataSource` | string | — | File path (SQLite) or server address (SQL Server). Required for `Database`. |
| `DeleteSessionOnClose` | `NoSessionDelete` (0) / `RecordedSessions` (1) / `SQLiteDatabase` (2) | — | Whether to delete the session from the database when the recorder closes or new sessions appear. Required for `Database`. |
| `ServerListenerAddress` | string `host:port` | — | Address the Server Listener listens on, used to load live sessions from the recorder. Shipped value: `127.0.0.1:7300`. Only started for `Database`. |

## MetricsConfig

| Key | Type | Default | Description |
|---|---|---|---|
| `Port` | int, 1–65535 | `10110` | Port for Prometheus metrics. The shipped file uses `10015`. |
| `IsEnabled` | bool | `false` | Enable Prometheus metrics. |

!!! note "Metrics endpoint"
    In this release the recorder starts the metrics endpoint on `Port` whether or not `IsEnabled` is `true`.

## Serilog

Standard [Serilog configuration](https://github.com/serilog/serilog-settings-configuration). The shipped file uses the Console and File sinks with `MinimumLevel` `Information`; the file sink uses `rollingInterval` `Day`, `fileSizeLimitBytes` `10485760` and `rollOnFileSizeLimit` `true`.

## Validation rules

The recorder checks the file at startup and does not start if any rule fails:

- A required section is missing.
- `UseStreamApiSessionIdentifier`, `UseStreamApiSessionDetails`, `UseTemporaryRecordingFolder` or `SessionFormat` is not set.
- `SessionFormat` is `SSN2` and `RecordingFolder` is empty, or `UseTemporaryRecordingFolder` is `true` and `TemporaryRecordingFolder` is empty.
- `UseStreamApiSessionIdentifier` is `false` and `SessionIdentifierText` is empty.
- `SessionFormat` is `Database` and `ConnectionString`, `DbEngine`, `DataSource` or `DeleteSessionOnClose` is not set.
- `DbEngine` is not `SQLite` or `SQLServer`.
- `ServerListenerAddress` is not `host:port`.
- `MetricsConfig.Port` is outside 1–65535.
- `GroupId` contains characters other than letters, digits, `_` or `-`.
