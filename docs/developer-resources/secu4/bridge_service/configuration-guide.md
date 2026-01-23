# Bridge Service Configuration Guide

## Overview

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

---

## 1. StreamApiConfig

Controls the Stream API integration and Kafka broker connectivity.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `StreamCreationStrategy` | int/enum | 2 | Strategy for creating Kafka topics/streams<br>• `1` = PartitionBased<br>• `2` = TopicBased (recommended) |
| `BrokerUrl` | string | "localhost:9092" | Kafka broker connection string |
| `PartitionMappings` | array | [] | Partition mapping configurations (PartitionBased only) |
| `IntegrateSessionManagement` | boolean | true | Enable session management integration |
| `IntegrateDataFormatManagement` | boolean | true | Enable data format management integration |
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

#### Topic-Based Strategy (StreamCreationStrategy = 2)

Each stream from the Bridge service maps to its own Kafka topic. This is simpler and recommended for most use cases.

**How Mapping Works:**

- Bridge uses `StreamSelectionConfig` to determine stream names
- Each unique stream name creates a separate Kafka topic
- Topic naming: `{Domain}.Data.{StreamName}`

**Example Scenario:**

Bridge Configuration:
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
      { "AppName": "Chassis*", "Stream": "ChassisTelemetry" }
    ]
  }
}
```

!!! info "Topic-Based Strategy Benefits"
    - Simple to configure and understand
    - Each stream is isolated in its own topic
    - Easy to monitor and manage
    - Recommended for most use cases

---

## Additional Configuration Sections

### StreamSelectionConfig

Controls how data streams are selected and named for processing.

### BridgeConfig  

Manages Bridge service-specific settings and behavior.

### EssentialsConfig

Configures essential data stream handling.

### RdaConfig

Settings for RDA (Race Data Analysis) integration.

### Serilog

Logging configuration using the Serilog framework.

---

## Best Practices

!!! tip "Configuration Tips"
    - Use **Topic-Based strategy** (StreamCreationStrategy = 2) for simpler deployment
    - Specify a meaningful **Domain** name to organize your Kafka topics
    - Enable session and data format management unless you have specific reasons not to
    - Keep default timeout values unless experiencing connectivity issues
    - Use wildcards in StreamSelectionConfig for flexible stream mapping

!!! warning "Important Notes"
    - Always validate your Kafka broker URL is accessible
    - Ensure proper network connectivity to Kafka brokers
    - Monitor initialization timeout if experiencing connection issues
