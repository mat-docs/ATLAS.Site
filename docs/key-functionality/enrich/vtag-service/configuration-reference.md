# Configuration Reference

Every setting vTAG Service reads from `AppConfig.json`. For step-by-step changes, see the [Configuration Guide](configuration-guide.md).

## The configuration file

| | |
|---|---|
| **Location** | `Documents\Motion Applied\vTAG Service\AppConfig.json` |
| **Created by** | The installer, from the default template, if the file doesn't already exist. If it is still missing when the service starts, the service creates it from the same template. |
| **On upgrade or uninstall** | Your file is never overwritten or removed. |
| **When changes apply** | At startup only. Restart vTAG Service after editing. |
| **Overrides** | Environment variables override values in the file, using `Section__Key` names (for example `VTagHost__DataSource`). |

The file has five sections:

| Section | What it controls |
|---|---|
| [`StreamApiConfig`](#streamapiconfig) | The connection to the Kafka broker |
| [`VTagHost`](#vtaghost) | Which data source the model subscribes to, and the output session |
| [`VTagClient`](#vtagclient) | The virtual vTAG unit that runs your model |
| [`EssentialsConfig`](#essentialsconfig) | Folders containing your `.pgv`, `.cfg` and `.pul` files |
| [`Serilog`](#serilog) | Logging |

## Default file

This is the file the installer creates:

```json title="AppConfig.json (default)" linenums="1"
{
  "StreamApiConfig": {
    "StreamCreationStrategy": 2,
    "BrokerUrl": "localhost:9094",
    "PartitionMappings": [
      {}
    ],
    "IntegrateSessionManagement": true,
    "IntegrateDataFormatManagement": true,
    "UseRemoteKeyGenerator": false,
    "RemoteKeyGeneratorServiceAddress": "",
    "BatchingResponses": false,
    "InitialisationTimeoutSeconds": 10,
    "Domain": ""
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
          "path": "{AppConfigDirectory}/logs/vTAG_log-.txt",
          "rollingInterval": "Day",
          "fileSizeLimitBytes": 10485760,
          "rollOnFileSizeLimit": true
        }
      }
    ]
  },
  "VTagClient": {
    "VTagClientDllPath": "",
    "BindIpAddress": "127.0.0.1"
  },
  "VTagHost": {
    "DataSource": "Default",
    "SessionType": "vTAG",
    "AutoGenerateSessionIdentifier": true,
    "SessionIdentifier": "",
    "BatchSamples": true,
    "BatchSize": 100
  },
  "EssentialsConfig": {
    "PgvPaths": [
      "C:\\McLaren Applied"
    ],
    "CfgPaths": [
      "C:\\McLaren Applied"
    ],
    "PulFilePaths": [
      "C:\\McLaren Applied"
    ]
  }
}
```

## StreamApiConfig

The connection to your Kafka broker. vTAG Service uses the standard Stream API configuration, which is shared with other Open Streaming components; for details of each field, see the [Stream API configuration in the Bridge Service guide](../../../developer-resources/secu4/bridge_service/configuration-guide.md).

The settings you are most likely to change:

| Property | Type | Value in default file | Description |
|---|---|---|---|
| `BrokerUrl` | string | `"localhost:9094"` | `host:port` of the Kafka broker. |
| `StreamCreationStrategy` | int | `2` | `1` = partition based, `2` = topic based. Must match the producer of your input data. |
| `PartitionMappings` | array | `[{}]` | Stream-to-partition mappings. Used only when `StreamCreationStrategy` is `1`. |
| `Domain` | string | `""` | Stream API domain. Must match the producer of your input data. |

!!! note
    If the whole `StreamApiConfig` section is missing, vTAG Service connects to `localhost:9094` using the topic-based strategy.

## VTagHost

How the model is subscribed to the stream, and how its output session is created.

| Property | Type | Default if missing | Description |
|---|---|---|---|
| `DataSource` | string | `"Default"` | The Stream API data source vTAG Service subscribes to. It must match the data source your input telemetry is published to. |
| `SessionType` | string | `"vTAG"` | Session type given to the output session. |
| `AutoGenerateSessionIdentifier` | bool | `true` | When `true`, an identifier is generated for each output session. |
| `SessionIdentifier` | string | `""` | Identifier for the output session. Used only when `AutoGenerateSessionIdentifier` is `false`. |
| `BatchSamples` | bool | `true` | When `true`, the model processes samples in batches rather than one time step at a time. |
| `BatchSize` | uint | `100` | Number of time steps in each batch when `BatchSamples` is `true`. |

## VTagClient

The virtual vTAG unit that System Monitor programs and that runs your model.

| Property | Type | Default if missing | Description |
|---|---|---|---|
| `BindIpAddress` | string | `"127.0.0.1"` | IP address of the virtual vTAG unit. Connect System Monitor to this address to program it. |
| `VTagClientDllPath` | string | `""` | Full path to `vTAGClient.dll`. When empty, the copy in the `vTAGClientDll` folder of the installation is used. |
| `LicenceLibrariesDirectory` | string | `""` | Folder containing `AtlasCoreA.dll`, `SysMonCoreA.dll` and `OCSCoreA.dll`, which the vTAG licence check needs. When empty, the installation folder is used; the installer puts the files there. Not in the default file. |
| `BootTimeoutSeconds` | int | `10` | Internal wait limit, in seconds, used when the unit is starting a session. It isn't a startup timeout: the service starts without waiting for a model. Not in the default file; leave it unset unless Motion Applied support asks you to change it. |

!!! note
    Leave `VTagClientDllPath` and `LicenceLibrariesDirectory` empty unless Motion Applied support asks you to change them.

## EssentialsConfig

The folders that hold the configuration files for the model you program onto vTAG Service. vTAG Service uses them to identify the model's output parameters.

| Property | Type | Default if missing | Description |
|---|---|---|---|
| `PgvPaths` | string array | `[]` | Folders containing `.pgv` files. |
| `CfgPaths` | string array | `[]` | Folders containing `.cfg` files. |
| `PulFilePaths` | string array | `[]` | Folders containing `.pul` files. |

The default file sets each list to `C:\McLaren Applied`.

## Serilog

Logging uses [Serilog](https://github.com/serilog/serilog-settings-configuration), configured in the standard Serilog format. The default file logs at `Information` level to the console window and to daily log files in `Documents\Motion Applied\vTAG Service\logs` (`vTAG_log-<date>.txt`), starting a new file when one reaches 10 MB.

| Property | Value in default file | Description |
|---|---|---|
| `MinimumLevel` | `"Information"` | Lowest level that is logged. Set it to `"Debug"` for more detail when troubleshooting. |
| `WriteTo` | Console and File | Where logs are written. The File entry's `Args` set the path, how often a new file starts (`rollingInterval`) and the size limit (`fileSizeLimitBytes`, `rollOnFileSizeLimit`). |

The log file path in the default file starts with `{AppConfigDirectory}`. vTAG Service replaces this with the folder that holds `AppConfig.json` (`Documents\Motion Applied\vTAG Service`) when it loads the file. You can use `{AppConfigDirectory}` in any setting.

If the `Serilog` section is missing, vTAG Service logs at `Information` level to the console and to the same log folder.
