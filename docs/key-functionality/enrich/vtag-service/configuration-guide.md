# Configuration Guide

Common changes to `Documents\Motion Applied\vTAG Service\AppConfig.json`, organised by what you want to do. Restart vTAG Service after every change. For every setting, see the [Configuration Reference](configuration-reference.md).

!!! note "Add or update — don't replace the whole file"
    The snippets on this page show only the settings involved. Change those values in your existing file and leave everything else as it is.

## Connect to a broker on another machine

**When:** your Kafka broker isn't on the same PC as vTAG Service, for example a broker running in Docker on a separate server.

Set `BrokerUrl` to the broker's address. `StreamCreationStrategy` and `Domain` must match the producer that publishes your input data (for example, the `StreamApiConfig` in your Bridge Service configuration), or vTAG Service won't find its sessions.

!!! warning "Partition-based producers"
    If the producer uses the partition-based strategy (`StreamCreationStrategy` `1`), also copy its `PartitionMappings` into vTAG Service's `StreamApiConfig`. Every stream needs a mapping, or it won't route correctly; see [Partition Mappings](../../../developer-resources/secu4/stream_api/reference_docs/configuration/server-config.md#partition-mappings).

```json title="AppConfig.json" linenums="1" hl_lines="3 4 5"
{
  "StreamApiConfig": {
    "StreamCreationStrategy": 2,
    "BrokerUrl": "192.168.1.50:9094",
    "Domain": ""
  }
}
```

**Result:** at startup the console shows `Support Library started (broker: "192.168.1.50:9094")`.

## Read input data from a different data source

**When:** your telemetry is published to a data source other than `Default`.

Set `VTagHost.DataSource` to the data source name your producer uses.

```json title="AppConfig.json" linenums="1" hl_lines="3"
{
  "VTagHost": {
    "DataSource": "Track"
  }
}
```

**Result:** vTAG Service runs the model on sessions published to `Track`.

## Give the output session a fixed identifier

**When:** a downstream tool needs to find the output session by a known identifier. In most setups, leave the identifier to be generated automatically.

```json title="AppConfig.json" linenums="1" hl_lines="3 4"
{
  "VTagHost": {
    "AutoGenerateSessionIdentifier": false,
    "SessionIdentifier": "Run42_vTAG"
  }
}
```

**Result:** the output session is created with the identifier `Run42_vTAG` instead of a generated one.

To change the session type the output session is published with, set `VTagHost.SessionType` (the default is `vTAG`).

## Change how samples are batched

**When:** you want to tune how many time steps the model processes at once.

By default, vTAG Service processes samples in batches of 100 time steps. To use a different batch size, change `BatchSize`; to process one time step at a time, set `BatchSamples` to `false`.

```json title="AppConfig.json" linenums="1" hl_lines="3 4"
{
  "VTagHost": {
    "BatchSamples": true,
    "BatchSize": 50
  }
}
```

**Result:** the console line `Subscribing vTAG model to Support Library (frequency: ... Hz, batchSize: 50)` shows the new batch size.

## Point vTAG Service at your model's configuration files

**When:** the `.pgv`, `.cfg` or `.pul` files for your model aren't in `C:\McLaren Applied`.

Each setting is a list, so you can add more than one folder. In JSON, write each backslash twice.

```json title="AppConfig.json" linenums="1"
{
  "EssentialsConfig": {
    "PgvPaths": [
      "C:\\McLaren Applied",
      "D:\\vTAG\\MyFirstVtagApp"
    ],
    "CfgPaths": [
      "D:\\vTAG\\Config"
    ],
    "PulFilePaths": [
      "C:\\McLaren Applied"
    ]
  }
}
```

## Program vTAG Service from another PC

**When:** System Monitor runs on a different PC from vTAG Service.

By default the virtual vTAG unit uses `127.0.0.1`, which only System Monitor on the same PC can reach. Set `BindIpAddress` to the IP address of the vTAG Service PC on the network that System Monitor uses, then connect System Monitor to that address.

```json title="AppConfig.json" linenums="1" hl_lines="3"
{
  "VTagClient": {
    "BindIpAddress": "192.168.1.20"
  }
}
```

## Run a different model

**When:** you want vTAG Service to run a different vTAG application.

You don't need to restart vTAG Service or edit `AppConfig.json` to change models. Reprogram the unit with System Monitor. vTAG Service pauses while programming is in progress, then reads the new model's parameters and subscribes to its inputs.

```text title="Console output"
vTAG unit is being reprogrammed by System Monitor — pausing until it completes
vTAG reached Running — resetting state and rediscovering parameters
```

Make sure the new model's `.pgv`, `.cfg` and `.pul` files are in the folders listed in `EssentialsConfig`.

## Override a setting without editing the file

**When:** you want to change a setting for one run, or from a script.

Environment variables override `AppConfig.json`. Use the section and property name separated by two underscores:

```powershell title="PowerShell"
$env:StreamApiConfig__BrokerUrl = "192.168.1.50:9094"
& "C:\Program Files (x86)\Motion Applied\MA.DataPlatforms.vTAGService\MA.DataPlatforms.vTAGService.exe"
```
