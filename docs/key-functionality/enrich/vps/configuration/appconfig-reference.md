# AppConfig Reference

The VPS is configured via a single JSON file — `AppConfig.json`. This page documents every section and setting.


## File Location

By default, the service looks for the config file at:

```
Configs/AppConfig.json
```

This path is relative to the executable or working directory. Override it using:

- **Command-line argument:** `-c /path/to/AppConfig.json`
- **Environment variable:** `CONFIG_FILE_PATH=/path/to/AppConfig.json`


## Full Example

```json
{
  "StreamApiConfig": {
    "StreamCreationStrategy": 2,
    "BrokerUrl": "192.168.0.6:9094",
    "PartitionMappings": [{}],
    "IntegrateSessionManagement": true,
    "IntegrateDataFormatManagement": true,
    "UseRemoteKeyGenerator": false,
    "RemoteKeyGeneratorServiceAddress": "",
    "BatchingResponses": false,
    "StreamApiPort": 13579
  },
  "VirtualParameterServiceConfig": {
    "DataSource": "Default",
    "BufferingWindowLengthInMs": "3000",
    "SlidingWindowPercentage": 5,
    "SessionTypesToProcess": [ "Session", "VTS" ],
    "MetricPort": 10010,
    "CalculationMode": "Default",
    "MaxWriteBatchSizeInKb": 100
  },
  "Serilog": {
    "Using": [
      "Serilog.Sinks.Console",
      "Serilog.Sinks.File"
    ],
    "MinimumLevel": "Debug",
    "WriteTo": [
      { "Name": "Console" },
      {
        "Name": "File",
        "Args": {
          "path": "C:/logs/vps-svc-log.txt"
        }
      }
    ]
  }
}
```


## VirtualParameterServiceConfig

Controls the core behaviour of the virtual parameter calculation engine.

| Setting | Type | Default | Description |
|---|---|---|---|
| `DataSource` | `string` | `"Default"` | The data source name to listen for. Only **one** data source is supported per service instance. Must match the data source configured in ADS. |
| `BufferingWindowLengthInMs` | `uint` | `3000` | The time window (in milliseconds) over which incoming sample data is buffered before processing begins. Increasing this value allows more data to accumulate before calculation, which can improve accuracy at the cost of latency. |
| `SlidingWindowPercentage` | `byte` | `5` | The percentage of the buffering window that controls how frequently computed data is emitted. For example, with a 3000 ms window and 5%, results are emitted approximately every 150 ms. |
| `SessionTypesToProcess` | `string[]` | `["Session", "VTS"]` | The ATLAS session types the service processes. Historical sessions and the service's own virtual-session output are filtered out automatically regardless of this setting. |
| `MetricPort` | `int` | `10010` | The port the Prometheus metrics endpoint listens on. |
| `CalculationMode` | `string` (`Default` or `Snapshot`) | `Default` | Selects the virtual parameter calculation strategy. See [Calculation Modes](#calculation-modes) below. |
| `MaxWriteBatchSizeInKb` | `uint` | `100` | Only used when `CalculationMode` is `Snapshot`. Caps the size of each packet written for a virtual — once a virtual's pending samples reach this limit within a batch, they're flushed immediately and accumulation restarts, so no single packet exceeds the limit. Set it to match the Kafka `message.max.bytes` setting. |

!!! info "Single data source"
    The VPS only supports a single `DataSource` per instance. To process multiple data sources, deploy separate VPS instances.

## Calculation Modes

`CalculationMode` controls how the VPS decides when to recalculate a virtual parameter, and what happens when a source parameter is slow, quiet, or delivers samples out of order.

=== "Default"

    Waits until every source parameter has data covering a given timestamp before calculating, so a virtual's output timestamp is only produced once all of its inputs are aligned. Timestamps that can't yet be aligned are deferred to a later buffering window.

    Use Default when a virtual must never be computed from an input that doesn't actually cover its output timestamp — for example, processing recorded or replayed sessions, or sources that can redeliver samples out of order.

=== "Snapshot"

    Keeps only the latest known value per source parameter. Any time a source changes, the virtual recalculates immediately using that change together with the latest known value of its other sources (forward-filling the ones that haven't changed). Nested virtuals that depend on the result cascade in the same pass.

    Use Snapshot for live streaming: memory use stays flat regardless of session length, and a virtual keeps producing values even while one of its sources ticks slowly. The trade-off is in the warning below.

!!! warning "Snapshot mode never accepts out-of-order data"
    If a sample's timestamp is older than the latest value Snapshot has already recorded for that parameter, the sample is rejected rather than retroactively applied. Use `Default` mode for sources that can deliver historical or out-of-order samples.

| | Default | Snapshot |
|---|---|---|
| **Recalculates when** | Every source for a timestamp has arrived | Any one source changes |
| **Memory use** | Grows with source lag over the life of a session | Flat, independent of session length or sample rate |
| **Slow or quiet sources** | Virtual stalls until the slow source catches up | Keeps producing, using the last known value |
| **Out-of-order samples** | Tolerated within the buffering window | Rejected |

```json title="AppConfig.json — enabling Snapshot mode" linenums="1"
"VirtualParameterServiceConfig": {
    "CalculationMode": "Snapshot",
    "MaxWriteBatchSizeInKb": 100
}
```

!!! note "Add or update — don't replace the whole file"
    Add these two settings to your existing `VirtualParameterServiceConfig` section.

## Serilog

Controls application logging. Standard [Serilog configuration](https://github.com/serilog/serilog-settings-configuration) is supported.

!!! warning "Precedence"
    The `Serilog` section in `AppConfig.json` takes precedence over command-line arguments (`-l`) and environment variables (`LOG_FILE_PATH`) for log file paths.

### Common Settings

| Setting | Description |
|---|---|
| `MinimumLevel` | Log level: `Verbose`, `Debug`, `Information`, `Warning`, `Error`, `Fatal` |
| `Using` | Serilog sink packages to load |
| `WriteTo` | Array of configured sinks |

### Example: Console + File (Debug Level)

```json
{
  "Serilog": {
    "Using": [
      "Serilog.Sinks.Console",
      "Serilog.Sinks.File"
    ],
    "MinimumLevel": "Debug",
    "WriteTo": [
      { "Name": "Console" },
      {
        "Name": "File",
        "Args": {
          "path": "C:/logs/vps-svc-log.txt"
        }
      }
    ]
  }
}
```

### Example: File Only (Information Level)

```json
{
  "Serilog": {
    "Using": ["Serilog.Sinks.File"],
    "MinimumLevel": "Information",
    "WriteTo": [
      {
        "Name": "File",
        "Args": {
          "path": "/logs/vps-svc-log.txt"
        }
      }
    ]
  }
}
```
