# Configuration Guide

This page is organized by what you want to achieve. Each section explains the situation, shows
the relevant config, and notes any difference between the two deployment modes.

For a full field-by-field reference see [Configuration Reference](configuration-reference.md).
For first-time setup see [Getting Started](getting-started.md).

---

## Put each stream in its own Kafka topic (Topic-based, strategy 2)

**When to use:** You have a small number of named streams and want each one isolated in its own
Kafka topic, making it easy to set per-topic retention or access control.

Set `StreamCreationStrategy` to `2` and optionally set `Auto: true` to let Bridge Service create
topic names from app group names automatically.

=== "Bundled with ADS (BridgeServiceConfig.json)"

    ```json title="BridgeServiceConfig.json (topic-based)" linenums="1" hl_lines="3"
    {
      "StreamApiConfig": {
        "StreamCreationStrategy": 2,
        "BrokerUrl": "localhost:9094",
        "PartitionMappings": [],
        "IntegrateSessionManagement": true,
        "IntegrateDataFormatManagement": true,
        "UseRemoteKeyGenerator": false,
        "RemoteKeyGeneratorServiceAddress": "",
        "BatchingResponses": false,
        "StreamApiPort": 13579
      },
      "StreamSelectionConfig": {
        "Auto": true,
        "Mappings": []
      }
    }
    ```

    With `Auto: true`, each ADS app group (e.g. `ATLAS`, `FIA`, `Chassis`) becomes a separate
    Kafka topic automatically.

    !!! note "`StreamApiPort` is a Streaming API setting"
        `StreamApiPort` is a [Streaming API configuration](../stream_api/reference_docs/configuration/server-config.md)
        key, not a Bridge field. It appears here because it is part of the real ADS-generated
        config — leave it as supplied unless the Stream API docs direct otherwise.

=== "Standalone / Container (AppConfig.json)"

    ```json title="AppConfig.json (topic-based)" linenums="1" hl_lines="3"
    {
      "StreamApiConfig": {
        "StreamCreationStrategy": 2,
        "BrokerUrl": "localhost:9094",
        "PartitionMappings": [],
        "IntegrateSessionManagement": true,
        "IntegrateDataFormatManagement": true,
        "UseRemoteKeyGenerator": false,
        "RemoteKeyGeneratorServiceAddress": "",
        "BatchingResponses": false,
        "InitialisationTimeoutSeconds": 1,
        "Domain": "MyDomain"
      },
      "StreamSelectionConfig": {
        "Auto": true,
        "Mappings": []
      },
      "BridgeConfig": {
        "DataSource": "MyBridge"
      }
    }
    ```

See [Stream Creation Strategies](../stream_api/reference_docs/configuration/server-config.md#stream-creation-strategies)
in the Stream API docs for a detailed comparison of the two strategies.

---

## Map app groups to specific streams (manual stream mapping)

**When to use:** You want explicit control over which app group goes to which stream name —
for example, to consolidate several app groups onto one stream, or to rename streams.

Set `Auto: false` and provide `Mappings`. The wildcard `*` in `AppName` matches any group not
covered by a more specific entry.

```json title="StreamSelectionConfig — manual mappings" linenums="1"
"StreamSelectionConfig": {
  "Auto": false,
  "Mappings": [
    { "AppName": "ATLAS",   "Stream": "Stream1" },
    { "AppName": "FIA",     "Stream": "Stream2" },
    { "AppName": "Chassis", "Stream": "Stream3" },
    { "AppName": "*",       "Stream": "Other"   }
  ]
}
```

!!! info "Add or update — don't replace the whole file"
    This is a partial snippet. Add or update this section in your existing config file — do not
    replace the whole file.

This block works in both `BridgeServiceConfig.json` and `AppConfig.json`.

!!! tip "How the mapping is resolved"
    Each app group name is matched against the `AppName` patterns (wildcards like `Engine*`
    supported), which resolves it to a `Stream` name, which is then placed on Kafka according to
    your `StreamCreationStrategy`. For example, app group `EngineData` matches `AppName: "Engine*"`
    → stream `EngineTelemetry` → a Kafka **topic** named `EngineTelemetry` (strategy 2) or the
    **partition** mapped to `EngineTelemetry` in `PartitionMappings` (strategy 1).

---

## Consolidate all streams to one partition (partition-based, single stream)

**When to use:** You want everything on one Kafka partition — simplest consumer setup,
lowest broker overhead.

Use strategy 1 with a single partition mapping and `AppName: "*"` to catch all groups:

```json title="Single-partition consolidation" linenums="1"
{
  "StreamApiConfig": {
    "StreamCreationStrategy": 1,
    "BrokerUrl": "localhost:9094",
    "PartitionMappings": [
      { "Stream": "Live", "Partition": 1 }
    ],
    "IntegrateSessionManagement": true,
    "IntegrateDataFormatManagement": true,
    "UseRemoteKeyGenerator": false,
    "RemoteKeyGeneratorServiceAddress": "",
    "BatchingResponses": false
  },
  "StreamSelectionConfig": {
    "Auto": false,
    "Mappings": [
      { "AppName": "*", "Stream": "Live" }
    ]
  }
}
```

---

## Tune throughput

**When to use:** You are seeing high CPU usage, data being dropped under load, or you want to
maximize how quickly data is published to Kafka.

These fields are in `BridgeConfig` and only apply to the **standalone** `AppConfig.json`.
The bundled ADS mode does not expose `BridgeConfig`.

### Concurrency factors

`LiveConcurrencyFactor` and `OffloadConcurrencyFactor` control how many parallel units process
the live and offload streams respectively.

| Field | Default | Notes |
|---|---|---|
| `LiveConcurrencyFactor` | `4` | Parallel processing units for the live (real-time) stream. |
| `OffloadConcurrencyFactor` | `12` | Parallel processing units for the offload stream. |

Increase these values if you have spare CPU cores and are processing high-frequency data.
The shipped sample uses 12 and 24.

```json title="BridgeConfig — raised concurrency" linenums="1"
"BridgeConfig": {
  "DataSource": "MyBridge",
  "LiveConcurrencyFactor": 12,
  "OffloadConcurrencyFactor": 24
}
```

!!! info "Add or update — don't replace the whole file"
    This is a partial snippet. Add or update these sections in your existing `AppConfig.json` —
    do not replace the whole file.

!!! warning "Field names changed in 2.1.3"
    If you are on version 2.1.2 or earlier, these fields were called `NumberProcessingUnit` and
    `NumberWritingUnit`. See [Configuration Reference](configuration-reference.md) for details.

### ProcessFlow — drop vs sequential

`ProcessFlow` controls what happens when the processing pipeline gets behind.

| Value | Behaviour |
|---|---|
| `SequentialAll` | Process every packet in order; nothing is dropped. Higher latency under load. **Default.** |
| `DropOldest` | Drop the oldest queued packet when buffers fill; favors freshness over completeness. |

For live telemetry where current data matters more than completeness, `DropOldest` is common.
For offload or replay scenarios where you need every packet, use `SequentialAll`.

```json title="BridgeConfig — drop oldest under load" linenums="1"
"BridgeConfig": {
  "DataSource": "MyBridge",
  "ProcessFlow": "DropOldest",
  "LiveConcurrencyFactor": 12,
  "OffloadConcurrencyFactor": 24
}
```

!!! info "Add or update — don't replace the whole file"
    This is a partial snippet. Add or update these sections in your existing `AppConfig.json` —
    do not replace the whole file.

---

## Enable offload processing

**When to use:** You want Bridge Service to process file offload / replay streams in addition to
live telemetry. This is only relevant in standalone mode.

```json title="BridgeConfig — offload enabled" linenums="1"
"BridgeConfig": {
  "DataSource": "MyBridge",
  "OffloadProcessing": true,
  "OffloadStream": "Offload",
  "OffloadConcurrencyFactor": 24
}
```

Set `OffloadProcessing: false` to disable offload handling entirely.

!!! info "Add or update — don't replace the whole file"
    This is a partial snippet. Add or update these sections in your existing `AppConfig.json` —
    do not replace the whole file.

---

## Point at CFG, PGV, and PUL files (Standalone only)

**When to use:** Running standalone or in a container where Bridge Service must locate
engineering configuration files itself.

!!! note "Bundled ADS mode"
    When bundled with ADS, these files are supplied by ADS automatically — you do not need
    `EssentialsConfig` or `RdaConfig` in `BridgeServiceConfig.json`.

```json title="EssentialsConfig and RdaConfig" linenums="1"
"EssentialsConfig": {
  "CfgDirectoryPaths": [ "/data/cfg", "/data/extra-cfg" ],
  "PgvDirectoryPaths": [ "/data/pgv" ],
  "RemoteConfigIndexerUrl": null
},
"RdaConfig": {
  "PulFilesSearchPaths": [ "/data/pul" ]
}
```

!!! info "Add or update — don't replace the whole file"
    This is a partial snippet. Add or update these sections in your existing `AppConfig.json` —
    do not replace the whole file.

- `CfgDirectoryPaths` — directories containing `.cfg` (parameter configuration) files.
- `PgvDirectoryPaths` — directories containing `.pgv` (parameter group) files.
- `PulFilesSearchPaths` — directories containing `.pul` (RDA licence) files.
- `RemoteConfigIndexerUrl` — optional URL for a remote config indexer; falls back to local
  directories if `null` or omitted.

---

## Configure logging (Standalone)

Bridge Service uses standard Serilog JSON configuration. Add or modify the `Serilog` section
in `AppConfig.json`:

```json title="Serilog — file + console" linenums="1"
"Serilog": {
  "MinimumLevel": { "Default": "Information" },
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
        "path": "/logs/bridge-.log",
        "rollingInterval": "Day"
      }
    }
  ]
}
```

!!! info "Add or update — don't replace the whole file"
    This is a partial snippet. Add or update this section in your existing `AppConfig.json` —
    do not replace the whole file.

The log file path can also be set via the `-l` command-line argument or the `LOG_FILE_PATH`
environment variable — these override the `Serilog` section.

---

## See also

- [Getting Started](getting-started.md) — minimal setup for each mode.
- [Configuration Reference](configuration-reference.md) — complete field list with types and defaults.
- [Troubleshooting](troubleshooting.md) — common problems and fixes.
- [Stream API: Stream Creation Strategies](../stream_api/reference_docs/configuration/server-config.md#stream-creation-strategies)
