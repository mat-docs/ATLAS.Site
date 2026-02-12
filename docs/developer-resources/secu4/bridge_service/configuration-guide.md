# Bridge Service Configuration Guide

The MA DataPlatforms Bridge service uses multiple configuration sections to control various aspects of data streaming, processing, and integration. This guide provides comprehensive documentation for all configuration sections.

## Configuration File Structure

The main configuration file is typically `AppConfig.json` and contains the following top-level sections:

```json
{
  "StreamApiConfig": { ... },
  "StreamSelectionConfig": { ... },
  "BridgeConfig": { ... },
  "EssentialsConfig": { ... },
  "RdaConfig": { ... },
  "Serilog": { ... }
}
```

## 1. StreamApiConfig

Controls the Stream API integration and Kafka broker connectivity.

### Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `StreamCreationStrategy` | int/enum| 2 | Strategy for creating Kafka topics/streams<br>• `1` = PartitionBased<br>• `2` = TopicBased (recommended) |
| `BrokerUrl` | string | "localhost:9092" | Kafka broker connection string |
| `PartitionMappings` | array | [] | Partition mapping configurations (PartitionBased only) |
| `IntegrateSessionManagement` | boolean | true | Enable session management integration |
| `IntegrateDataFormatManagement`| boolean | true | Enable data format management integration |
| `UseRemoteKeyGenerator` | boolean | false | Use remote key generator service |
| `RemoteKeyGeneratorServiceAddress` | string | "" | URL of remote key generator service |
| `InitialisationTimeoutSeconds` | int | 1 | Timeout in seconds for Stream API init |
| `Domain` | string | "" | Optional domain specification |

### Example Configuration

```json
{
  "StreamApiConfig": {
    "StreamCreationStrategy": 2,
    "BrokerUrl": "kafka-broker.company.com:9092",
    "PartitionMappings": [],
    "IntegrateSessionManagement": true,
    "IntegrateDataFormatManagement": true,
    "UseRemoteKeyGenerator": false,
    "RemoteKeyGeneratorServiceAddress": "",
    "InitialisationTimeoutSeconds": 1,
    "Domain": "Telemetry"
  }
}
```

### Stream Creation Strategy Explained

The Bridge service works with Stream API's two streaming strategies. Your choice affects how Bridge streams are mapped to Kafka topics.

#### Topic-Based Strategy (`StreamCreationStrategy = 2`)

Each stream from the Bridge service maps to its own Kafka topic. This is simpler and recommended for most use cases.

**How Mapping Works:**

* Bridge uses `StreamSelectionConfig` to determine stream names.
* Each unique stream name creates a separate Kafka topic.
* **Topic naming:** `{Domain}.Data.{StreamName}`

!!! example "Example Scenario"
    **Bridge Configuration:**
    ```json
    {
      "StreamApiConfig": {
        "StreamCreationStrategy": 2,
        "Domain": "Production"
      },
      "StreamSelectionConfig": {
        "Auto": false,
        "Mappings": [
          { "AppName": "Engine*", "Stream": "EngineTelemetry" },
          { "AppName": "Chassis*", "Stream": "ChassisTelemetry" },
          { "AppName": "Aero*", "Stream": "AeroTelemetry" }
        ]
      }
    }
    ```

    **Resulting Kafka Topics:**
    * `Production.Data.EngineTelemetry` (All Engine* app groups)
    * `Production.Data.ChassisTelemetry` (All Chassis* app groups)
    * `Production.Data.AeroTelemetry` (All Aero* app groups)

**Use Topic-Based When:**

* You have fewer than 100 unique streams.
* You want simple debugging (each stream has its own topic).
* Topic limits are not a concern.
* Message time alignment across streams is not important, or will be handled at the consumer level (note: Kafka does not align messages between topics).

#### Partition-Based Strategy (`StreamCreationStrategy = 1`)

Multiple streams share a single Kafka topic but are distributed across different partitions. Requires explicit partition mappings in `StreamApiConfig`.

**How Mapping Works:**

* Bridge uses `StreamSelectionConfig` to determine stream names.
* Stream API uses `PartitionMappings` to assign each stream to a partition.
* All streams share the same topic: `{Domain}.Data.MainDataSource`.
* **IMPORTANT:** Partition 0 is reserved by Stream API.

!!! example "Example Scenario"
    **Bridge Configuration:**
    ```json
    {
      "StreamApiConfig": {
        "StreamCreationStrategy": 1,
        "Domain": "Production",
        "PartitionMappings": [
          { "StreamIdentifier": "EngineTelemetry", "Partition": 1 },
          { "StreamIdentifier": "ChassisTelemetry", "Partition": 2 },
          { "StreamIdentifier": "AeroTelemetry", "Partition": 3 },
          { "StreamIdentifier": "BrakeTelemetry", "Partition": 4 }
        ]
      },
      "StreamSelectionConfig": {
        "Auto": false,
        "Mappings": [
          { "AppName": "Engine*", "Stream": "EngineTelemetry" },
          { "AppName": "Chassis*", "Stream": "ChassisTelemetry" },
          { "AppName": "Aero*", "Stream": "AeroTelemetry" },
          { "AppName": "Brake*", "Stream": "BrakeTelemetry" }
        ]
      }
    }
    ```

    **Resulting Kafka Topic with Partitions:**
    Topic: `Production.Data.MainDataSource`
    * Partition 0: [Reserved by Stream API]
    * Partition 1: `EngineTelemetry` data
    * Partition 2: `ChassisTelemetry` data
    * Partition 3: `AeroTelemetry` data
    * Partition 4: `BrakeTelemetry` data

!!! danger "Critical Rules for Partition-Based"
    1. Stream names in `StreamSelectionConfig` **MUST** match `StreamIdentifier` in `PartitionMappings`.
    2. **Partition 0 is reserved** - all mappings must use partition 1 and above.
    3. Each stream must have a unique partition number.
    4. Kafka topic must be created with enough partitions (max partition number + 1).

**Use Partition-Based When:**

* You have hundreds or thousands of streams.
* Kafka topic limits are a concern.
* You need better resource utilization.
* You need better resource utilization.
* **You need time-aligned data across multiple streams** - Kafka guarantees message order only within a single partition, so partition-based allows all streams to share one topic with proper temporal alignment.

!!! note "Time-Aligned Data Consideration"
    For both Topic-Based and Partition-Based strategies: If you need time-aligned data across multiple application groups, map all of them to a **single stream name** in `StreamSelectionConfig`. This ensures:
    
    * **Topic-Based (Strategy 2):** All data goes to one Kafka topic with aligned timestamps.
    * **Partition-Based (Strategy 1):** All data goes to one partition within the topic with aligned timestamps.
    
    **Example for time-aligned data:**
    ```json
    {
      "StreamSelectionConfig": {
      "Auto": false,
      "Mappings": [
        { "AppName": "Engine*", "Stream": "VehicleTelemetry" },
        { "AppName": "Chassis*", "Stream": "VehicleTelemetry" },
        { "AppName": "Aero*", "Stream": "VehicleTelemetry" },
        { "AppName": "Brake*", "Stream": "VehicleTelemetry" }
      ]
      }
    }
    ```
    All application groups now write to the same stream, ensuring temporal alignment in Kafka.

### Stream Mapping Flow

1.  **Data arrives** at Bridge with `AppName` (e.g., "EngineData")
2.  **`StreamSelectionConfig`** maps `AppName` to **Stream**
    * *Example:* "EngineData" -> matches "Engine*" -> "EngineTelemetry"
3.  **Stream API** receives "EngineTelemetry" stream
4.  **`StreamCreationStrategy`** determines Kafka destination:
    *   **Topic-Based (Strategy 2):** Writes to Kafka topic `Production.Data.EngineTelemetry`.
    *   **Partition-Based (Strategy 1):**
        *   Looks up "EngineTelemetry" in `PartitionMappings`.
        *   Finds Partition 1.
        *   Writes to `Production.Data.MainDataSource`, Partition 1.


## 2. StreamSelectionConfig

Controls how data streams are mapped from application groups to Stream API streams, including wildcard pattern matching support.

### Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `Auto` | boolean | true | Automatically map app names to stream names without transformation |
| `Mappings` | array | [] | Custom mappings from app names to streams with wildcard support (when `Auto=false`) |

### Mappings Structure

Each mapping entry contains:

| Field | Type | Description |
| :--- | :--- | :--- |
| `AppName` | string | Application group name or pattern (supports wildcards: `*`) |
| `Stream` | string | Target stream name in Stream API |

### Wildcard Pattern Matching (New in January 2026)

The `AppName` field now supports wildcard patterns using the `*` character:

*   **Exact match:** `"EngineData"` - matches only "EngineData"
*   **Prefix match:** `"Engine*"` - matches "EngineData", "EngineTemp", "EnginePressure"
*   **Suffix match:** `"*Telemetry"` - matches "EngineTelemetry", "ChassisTelemetry"
*   **Contains:** `"*_Data_*"` - matches any app name containing "_Data_"

**Pattern Evaluation Rules:**

1.  Patterns are evaluated in order of definition.
2.  First matching pattern wins.
3.  Case-insensitive matching.
4.  Results are cached for performance.

### Example Configurations

#### Auto Mode (Simple)
```json
{
  "StreamSelectionConfig": {
    "Auto": true
  }
}
```
*In Auto mode, each app group streams to its own stream with the same name.*

#### Manual Mapping (No Wildcards)
```json
{
  "StreamSelectionConfig": {
    "Auto": false,
    "Mappings": [
      {
        "AppName": "EngineData",
        "Stream": "engine-telemetry-stream"
      },
      {
        "AppName": "ChassisData",
        "Stream": "chassis-telemetry-stream"
      }
    ]
  }
}
```

#### Wildcard Mapping (Flexible)
```json
{
  "StreamSelectionConfig": {
    "Auto": false,
    "Mappings": [
      {
        "AppName": "Engine*",
        "Stream": "engine-telemetry-stream"
      },
      {
        "AppName": "Chassis*",
        "Stream": "chassis-telemetry-stream"
      },
      {
        "AppName": "*Telemetry",
        "Stream": "general-telemetry-stream"
      },
      {
        "AppName": "Aero_*_Data",
        "Stream": "aerodynamics-stream"
      }
    ]
  }
}
```

### Best Practices

1.  **Ordering Matters:** Place more specific patterns before general ones.
2.  **Auto Mode:** Use when stream names match app group names exactly.
3.  **Wildcards:** Use to reduce configuration complexity when dealing with many similar app groups.

## 3. BridgeConfig

Controls core Bridge service behavior including processing units and data handling.

### Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `DataSource` | string | "Default" | Name identifier for the data source |
| `UseStringIdentifier` | boolean | false | Use string-based identifiers instead of numeric IDs |
| `NumberWritingUnit` | int | 8 | Number of parallel writing units (threads) for Stream API |
| `NumberProcessingUnit` | int | 4 | Number of parallel processing units for data decoding |
| `AdsTimeoutInSeconds` | int | 720 | Timeout for ADS operations in seconds |

### Example Configuration

```json
{
  "BridgeConfig": {
    "DataSource": "RaceTrack01",
    "UseStringIdentifier": true,
    "NumberWritingUnit": 16,
    "NumberProcessingUnit": 8,
    "AdsTimeoutInSeconds": 600
  }
}
```

### Performance Tuning

*   **`NumberWritingUnit`**: Increase for higher throughput to Stream API. Higher values use more CPU.
*   **`NumberProcessingUnit`**: Controls parallel data decoding/processing. Increase for multi-core systems.

## 4. EssentialsConfig

Configuration files (CFG) and Parameter Group Values (PGV) are essential for data decoding.

!!! note
    When using integrated Windows Bridge with ADS, these files are automatically retrieved from ADS (ATLAS Data Server) and do not need to be manually configured.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `CfgDirectoryPaths` | string[] | Array of directory paths containing CFG configuration files |
| `PgvDirectoryPaths` | string[] | Array of directory paths containing PGV parameter files |
> **Note:** The `RemoteConfigIndexerUrl` option is only used when the configuration indexer service is deployed and accessible.
| `RemoteConfigIndexerUrl`| string? | Optional URL for remote configuration indexer service |

### Example Configuration

```json
{
  "EssentialsConfig": {
    "CfgDirectoryPaths": [
      "C:\\Data\\Logging\\AutoConfig",
      "C:\\Data\\Logging\\ManualConfig"
    ],
    "PgvDirectoryPaths": [
      "C:\\Data\\Parameters\\PGVs",
      "C:\\SharedConfigs\\PGVs"
    ],
    "RemoteConfigIndexerUrl": null
  }
}
```

### Using Remote Config Indexer

For centralized configuration management:

```json
{
  "EssentialsConfig": {
    "CfgDirectoryPaths": [],
    "PgvDirectoryPaths": [],
    "RemoteConfigIndexerUrl": "http://config-server.company.com:5050"
  }
}
```

## 5. RdaConfig

Reduced Data Access (RDA) configuration for reading telemetry data files.

### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `PulFilesSearchPaths` | string[] | Array of directory paths to search for PUL files |

### Example Configuration

```json
{
  "RdaConfig": {
    "PulFilesSearchPaths": [
      "C:\\RDA\\SessionData\\2026",
      "C:\\RDA\\Archive",
      "\\\\FileServer\\RDA\\Shared"
    ]
  }
}
```

## 6. Serilog Configuration

Structured logging configuration using the Serilog framework.

### Configuration Priority

The Bridge service uses the following priority order for logging configuration:

1.  **Serilog section** in `AppConfig.json` (if present) - Full customization via JSON.
2.  **`LOG_FILE_PATH`** environment variable or `-l` command-line argument.
3.  **Windows Registry** (Windows only) - `HKCU\SOFTWARE\McLaren Electronic Systems\ATLAS\9.0\AdsAdvancedSettings\LogFileFolder`.
4.  **Default** - Falls back to `Logs/bridge-svc-log.txt`.

!!! important
    If you include a `Serilog` section in your `AppConfig.json`, you have full control over logging configuration. Without it, the service uses built-in defaults.

### Basic Structure

```json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    },
    "WriteTo": [
      { "Name": "Console", "Args": { ... } },
      { "Name": "File", "Args": { ... } }
    ],
    "Enrich": ["FromLogContext", "WithMachineName", "WithThreadId"]
  }
}
```

### Log Levels

*   **Verbose:** Very detailed, trace-level information.
*   **Debug:** Debugging information.
*   **Information:** General informational messages (recommended default).
*   **Warning:** Warnings that don't stop operation.
*   **Error:** Errors and exceptions.
*   **Fatal:** Critical failures causing shutdown.

### Console Sink Configuration

```json
{
  "Name": "Console",
  "Args": {
    "outputTemplate": "[{Timestamp:HH:mm:ss} {Level:u3}] {SourceContext}: {Message:lj}{NewLine}{Exception}"
  }
}
```

### File Sink Configuration

```json
{
  "Name": "File",
  "Args": {
    "path": "C:\\Logs\\bridge-service-.txt",
    "rollingInterval": "Day",
    "retainedFileCountLimit": 30,
    "fileSizeLimitBytes": 104857600,
    "outputTemplate": "[{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz}] [{Level:u3}] {Message:lj}{NewLine}{Exception}"
  }
}
```

!!! tip
    When using the Serilog section in `AppConfig.json`, the file sink path is fully customisable.

### File Sink Configuration

```json
{
  "Name": "File",
  "Args": {
  "path": "C:\\Logs\\bridge-service-.txt",
  "rollingInterval": "Day",
  "retainedFileCountLimit": 30,
  "fileSizeLimitBytes": 104857600,
  "outputTemplate": "[{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz}] [{Level:u3}] {Message:lj}{NewLine}{Exception}"
  }
}
```

!!! tip
    When using the Serilog section in `AppConfig.json`, the file sink path is fully customisable.

## Complete Configuration Example

```json
{
  "StreamApiConfig": {
    "StreamCreationStrategy": 2,
    "BrokerUrl": "kafka-prod.company.com:9094",
    "PartitionMappings": [],
    "IntegrateSessionManagement": true,
    "IntegrateDataFormatManagement": true,
    "UseRemoteKeyGenerator": false,
    "RemoteKeyGeneratorServiceAddress": "",
    "BatchingResponses": false,
    "InitialisationTimeoutSeconds": 1,
    "Domain": "motorsport"
  },
  "StreamSelectionConfig": {
    "Auto": false,
    "Mappings": [
      { "AppName": "Engine*", "Stream": "engine-telemetry" },
      { "AppName": "Chassis*", "Stream": "chassis-telemetry" },
      { "AppName": "Aero*", "Stream": "aerodynamics-telemetry" },
      { "AppName": "*Telemetry", "Stream": "general-telemetry" }
    ]
  },
  "BridgeConfig": {
    "DataSource": "TestTrack_Simulator",
    "UseStringIdentifier": true,
    "NumberWritingUnit": 16,
    "NumberProcessingUnit": 8,
    "AdsTimeoutInSeconds": 600
  },
  "EssentialsConfig": {
    "CfgDirectoryPaths": [
      "C:\\ProgramData\\ATLAS\\Configs",
      "\\\\FileServer\\SharedConfigs\\CFG"
    ],
    "PgvDirectoryPaths": [
      "C:\\ProgramData\\ATLAS\\Parameters",
      "\\\\FileServer\\SharedConfigs\\PGV"
    ],
    "RemoteConfigIndexerUrl": null
  },
  "RdaConfig": {
    "PulFilesSearchPaths": [
      "C:\\RDA\\Sessions\\2026",
      "\\\\FileServer\\RDA\\Archive"
    ]
  },
  "Serilog": {
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
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
          "retainedFileCountLimit": 30,
          "outputTemplate": "[{Timestamp:yyyy-MM-dd HH:mm:ss}] [{Level:u3}] {Message:lj}{NewLine}{Exception}"
        }
      }
    ]
  }
}
```

## Troubleshooting

### Common Configuration Issues

*   **Issue: Stream API fails to initialize**
    *   Check `BrokerUrl` is correct and accessible.
    *   Verify Kafka broker is running.
    *   Increase `InitialisationTimeoutSeconds`.
*   **Issue: Data not decoding correctly**
    *   Verify CFG files exist in `CfgDirectoryPaths`.
    *   Check PGV files are present in `PgvDirectoryPaths`.
*   **Issue: Stream mapping not working**
    *   Verify `Auto` is set to `false` when using custom mappings.
    *   Check wildcard patterns/order.
*   **Issue: Performance problems**
    *   Increase `NumberWritingUnit` / `NumberProcessingUnit`.
      

!!! warning "Resource Requirements"
    Increasing these values requires more system resources (CPU and memory). Setting values too high on smaller machines may lead to deadlock or threadpool starvation. **Recommended settings for an 8-core machine with 16GB RAM:**

      - `NumberProcessingUnit`: 12
      - `NumberWritingUnit`: 24
