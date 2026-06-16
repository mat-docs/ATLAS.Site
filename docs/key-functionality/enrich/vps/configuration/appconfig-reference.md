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
    "SlidingWindowPercentage": 5
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

!!! info "Single data source"
    The VPS only supports a single `DataSource` per instance. To process multiple data sources, deploy separate VPS instances.

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
