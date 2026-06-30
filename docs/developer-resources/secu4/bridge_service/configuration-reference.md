# Bridge Service Configuration Reference

!!! tip "Looking for task-based guidance?"
    This page is the field-by-field reference for every configuration option. For step-by-step setup, start with [Getting Started](getting-started.md) or the [Configuration Guide](configuration.md).

## Deployment Modes

Bridge Service ships in two deployment modes, and **which config file you edit — and which sections apply — depends on the mode.**

| Mode | Config file | Sections used |
| :--- | :--- | :--- |
| **Bundled with ADS** (Windows) | `BridgeServiceConfig.json` in `…\ATLAS9\BridgeService` | `StreamApiConfig`, `StreamSelectionConfig` only. ADS supplies licence, CFG, PGV, PUL automatically. |
| **Standalone / Container** | `AppConfig.json` (default `Configs/AppConfig.json`; override with `-c`) | Full 6-section schema below. .NET 8 console exe; Linux/Docker supported. |

**Standalone CLI flags:** `-c <path>` config file (`CONFIG_FILE_PATH`), `-l <path>` log file (`LOG_FILE_PATH`), `-p <port>` feed port (`FEED_PORT`).

!!! note "AppConfig.json top-level structure (standalone)"
    ```json
    {
      "StreamApiConfig": { },
      "StreamSelectionConfig": { },
      "BridgeConfig": { },
      "EssentialsConfig": { },
      "RdaConfig": { },
      "Serilog": { }
    }
    ```

---

## 1. StreamApiConfig

Controls Stream API integration and Kafka connectivity. `StreamApiConfig` is owned by the **external Streaming API library**, so defaults and the authoritative key list live in the [Stream API server-config reference](../stream_api/reference_docs/configuration/server-config.md). The keys below are those observed in the verified 2.1.3 standalone sample — illustrative, not exhaustive.

| Key | Observed value | Notes |
| :--- | :--- | :--- |
| `StreamCreationStrategy` | `1` | `1` = Partition-based, `2` = Topic-based. The shipped standalone sample uses `1`. |
| `BrokerUrl` | `"localhost:9094"` | Kafka broker connection string. |
| `PartitionMappings` | `[{Stream, Partition}]` | Used with strategy `1`. Maps stream names to partition numbers. |
| `IntegrateSessionManagement` | `true` | Enable session management integration. |
| `IntegrateDataFormatManagement` | `true` | Enable data format management integration. |
| `UseRemoteKeyGenerator` | `false` | Use a remote key generator service. |
| `RemoteKeyGeneratorServiceAddress` | `""` | URL of the remote key generator service. |
| `BatchingResponses` | `false` | |
| `InitialisationTimeoutSeconds` | `1` | Stream API initialization timeout. |
| `Domain` | `"Test2"` | Optional domain namespace. |

!!! note "StreamApiConfig defaults are external"
    Do not treat these as canonical defaults. `StreamApiPort` (seen in some ADS-mode examples) is a **Streaming API setting, not a Bridge field** — see the [Stream API server-config reference](../stream_api/reference_docs/configuration/server-config.md) for authoritative details.

### Stream Creation Strategy

The two strategies determine how Bridge streams map to Kafka:

* **Topic-Based (`2`)** — each stream name becomes its own Kafka topic (`{Domain}.Data.{StreamName}`). Simpler; best for fewer than ~100 streams.
* **Partition-Based (`1`)** — all streams share one topic (`{Domain}.Data.MainDataSource`), distributed across partitions via `PartitionMappings`. Used in the verified sample. **Partition 0 is reserved by Stream API**, so mappings start at partition 1; stream names must match `StreamSelectionConfig`, and the topic needs `max partition + 1` partitions.

!!! tip "Time-aligned data"
    Kafka guarantees order only within a single partition (or topic). To time-align data across multiple application groups, map them all to a **single stream name** in `StreamSelectionConfig`.

For a worked walkthrough of the mapping flow (AppName → Stream → Kafka destination), see the [Configuration Guide](configuration.md).

```json title="StreamApiConfig (partition-based)"
{
  "StreamApiConfig": {
    "StreamCreationStrategy": 1,
    "BrokerUrl": "localhost:9094",
    "PartitionMappings": [
      { "Stream": "Live", "Partition": 1 },
      { "Stream": "Offload", "Partition": 2 }
    ],
    "Domain": "Production"
  }
}
```

---

## 2. StreamSelectionConfig

Maps application groups to Stream API streams, with wildcard pattern matching.

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `Auto` | boolean | `true` | `true` = map each app group to a stream of the same name. `false` = use `Mappings`. |
| `Mappings` | array | `[]` | Custom app-name → stream mappings (used when `Auto=false`). |

Each `Mappings` entry has `AppName` (string, supports `*` wildcards) and `Stream` (string, target stream name).

!!! note "Wildcards"
    `AppName` supports `*`: prefix (`"Engine*"`), suffix (`"*Telemetry"`), or contains (`"*_Data_*"`). Patterns are evaluated in order — **first match wins** — and matching is case-insensitive. Place specific patterns before general ones.

```json title="StreamSelectionConfig (wildcard mapping)"
{
  "StreamSelectionConfig": {
    "Auto": false,
    "Mappings": [
      { "AppName": "Engine*", "Stream": "engine-telemetry" },
      { "AppName": "Chassis*", "Stream": "chassis-telemetry" },
      { "AppName": "*Telemetry", "Stream": "general-telemetry" }
    ]
  }
}
```

---

## 3. BridgeConfig

Controls core Bridge behaviour: concurrency, data handling, and flow control.

!!! warning "Standalone only"
    These settings apply to the standalone `AppConfig.json` only. The bundled-with-ADS `BridgeServiceConfig.json` does **not** use a `BridgeConfig` section.

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `DataSource` | string | `"Default"` | Name identifier for the data source. (In bundled mode this is taken automatically from the ADS instance name — no config needed.) |
| `UseStringIdentifier` | boolean | `false` | Use string-based identifiers instead of numeric IDs. |
| `BatchingLevel` | `BatchDecodingLevel` (enum) | `Medium` | **Advanced.** Decoding batch level; enum defined in an external decoding library. Change only if advised by support. |
| `AdsTimeoutInSeconds` | int | `720` | Seconds with no data before a session is considered stopped (default: 12 minutes). |
| `ProcessFlow` | `ProcessFlow` (enum) | `SequentialAll` | Data flow / backpressure strategy. See below. |
| `FeedPort` | int? | `null` | Optional feed port override (also settable via `-p` / `FEED_PORT`). |
| `LiveConcurrencyFactor` | int | `4` | Parallel processing units for the **live** stream. |
| `OffloadConcurrencyFactor` | int | `12` | Parallel processing units for the **offload** stream. |
| `OffloadProcessing` | bool | `true` | Whether offload processing is enabled. |
| `OffloadStream` | string | `""` | Name of the stream used for offload data (match a stream in `StreamSelectionConfig`). |

**`ProcessFlow` values:** `SequentialAll` (`0`, default) processes all data without dropping — favours completeness. `DropOldest` (`1`) drops the oldest unprocessed data when buffers fill — favours real-time freshness.

!!! warning "On Bridge 2.1.2 or earlier?"
    Releases 2.1.1 (Jan 2026) and 2.1.2 (Feb 2026) used `NumberProcessingUnit` and `NumberWritingUnit` instead of `LiveConcurrencyFactor` / `OffloadConcurrencyFactor`. Those old names do **not** exist in 2.1.3 and are ignored if present. On an older build, consult that release's documentation.

!!! note "Tuning concurrency"
    Raise `LiveConcurrencyFactor` for higher live throughput and `OffloadConcurrencyFactor` for faster offload replay — both cost CPU and memory, and setting them too high on small machines risks threadpool starvation. A good starting point on an 8-core machine is `12` / `24`. See the [Configuration Guide](configuration.md) for detailed tuning advice.

```json title="BridgeConfig"
{
  "BridgeConfig": {
    "DataSource": "Default",
    "UseStringIdentifier": true,
    "AdsTimeoutInSeconds": 720,
    "ProcessFlow": "SequentialAll",
    "FeedPort": null,
    "LiveConcurrencyFactor": 4,
    "OffloadConcurrencyFactor": 12,
    "OffloadProcessing": true,
    "OffloadStream": "Offload"
  }
}
```

---

## 4. EssentialsConfig

CFG and PGV directories used for data decoding.

!!! note "ADS-bundled mode"
    When bundled with ADS, these files are supplied automatically — you do **not** configure `EssentialsConfig`. **Standalone deployments require these paths** for decoding to work.

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `CfgDirectoryPaths` | string[] | (required) | Directories containing CFG configuration files. |
| `PgvDirectoryPaths` | string[] | (required) | Directories containing PGV parameter files. |
| `RemoteConfigIndexerUrl` | string? | `null` | Optional remote config indexer URL. Falls back to local directories if unavailable or empty. |

```json title="EssentialsConfig"
{
  "EssentialsConfig": {
    "CfgDirectoryPaths": ["C:\\Data\\Configs\\CFG"],
    "PgvDirectoryPaths": ["C:\\Data\\Configs\\PGV"],
    "RemoteConfigIndexerUrl": null
  }
}
```

---

## 5. RdaConfig

Reduced Data Access (RDA) configuration for reading telemetry data files.

| Property | Type | Description |
| :--- | :--- | :--- |
| `PulFilesSearchPaths` | string[] | Directories to search for PUL files. |

```json title="RdaConfig"
{
  "RdaConfig": {
    "PulFilesSearchPaths": ["C:\\RDA\\SessionData", "C:\\RDA\\Archive"]
  }
}
```

---

## 6. Serilog

Structured logging via Serilog. Logging priority: a `Serilog` section in the config (full JSON customisation) → `LOG_FILE_PATH` env / `-l` arg → built-in default. Standard levels: Verbose, Debug, Information (recommended default), Warning, Error, Fatal.

```json title="Serilog (console + file sinks)"
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Information",
      "Override": { "Microsoft": "Warning", "System": "Warning" }
    },
    "WriteTo": [
      {
        "Name": "Console",
        "Args": {
          "outputTemplate": "[{Timestamp:HH:mm:ss} {Level:u3}] {SourceContext}: {Message:lj}{NewLine}{Exception}"
        }
      },
      {
        "Name": "File",
        "Args": {
          "path": "C:\\Logs\\bridge-service-.txt",
          "rollingInterval": "Day",
          "retainedFileCountLimit": 30
        }
      }
    ]
  }
}
```

---

## Data timestamps

Timestamps from Motion Applied ECUs are relative to **midnight local time**. Bridge Service converts them to UNIX epoch time in **UTC**, using the date and the local timezone of the host machine.

!!! warning "Timezone and date must be correct on the host"
    This conversion applies to live telemetry, **File Telemetry Recorders**, and **Multi-Session Offload Recorders**. Replaying a raw file on a machine with an incorrect date or timezone will publish data at the wrong time.

---

## Example standalone AppConfig.json

The verified Bridge 2.1.3 (June 2026) standalone configuration, using the partition-based strategy with Live and Offload streams. `EssentialsConfig` and `RdaConfig` are **required for standalone** (CFG/PGV/PUL paths); in bundled-with-ADS mode they are supplied by ADS and omitted.

```json title="AppConfig.json" linenums="1"
{
  "StreamApiConfig": {
    "StreamCreationStrategy": 1,
    "BrokerUrl": "localhost:9094",
    "PartitionMappings": [
      { "Stream": "Live", "Partition": 1 },
      { "Stream": "Offload", "Partition": 2 }
    ],
    "IntegrateSessionManagement": true,
    "IntegrateDataFormatManagement": true,
    "UseRemoteKeyGenerator": false,
    "RemoteKeyGeneratorServiceAddress": "",
    "BatchingResponses": false,
    "InitialisationTimeoutSeconds": 1,
    "Domain": "Test2"
  },
  "StreamSelectionConfig": {
    "Auto": false,
    "Mappings": [
      { "AppName": "*", "Stream": "Live" }
    ]
  },
  "BridgeConfig": {
    "DataSource": "Default",
    "UseStringIdentifier": true,
    "ProcessFlow": "DropOldest",
    "LiveConcurrencyFactor": 12,
    "OffloadConcurrencyFactor": 24,
    "OffloadProcessing": true,
    "OffloadStream": "Offload"
  },
  "EssentialsConfig": {
    "CfgDirectoryPaths": ["C:\\Data\\Configs\\CFG"],
    "PgvDirectoryPaths": ["C:\\Data\\Configs\\PGV"],
    "RemoteConfigIndexerUrl": null
  },
  "RdaConfig": {
    "PulFilesSearchPaths": ["C:\\RDA\\SessionData"]
  },
  "Serilog": {
    "MinimumLevel": { "Default": "Information" },
    "WriteTo": [
      {
        "Name": "Console",
        "Args": {
          "outputTemplate": "[{Timestamp:HH:mm:ss} {Level:u3}] {SourceContext}: {Message:lj}{NewLine}{Exception}"
        }
      }
    ]
  }
}
```

---

For common problems, see [Troubleshooting](troubleshooting.md).
