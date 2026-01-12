# Server Configuration

This guide covers configuring the Stream API server for different deployment scenarios.

## Configuration Files

The server uses JSON configuration files to define behavior and connectivity settings.

### Basic Configuration

Create `AppConfig.json`:

```json
{
  "StreamCreationStrategy": 2,
  "BrokerUrl": "localhost:9092",
  "StreamApiPort": 13579,
  "IntegrateSessionManagement": true,
  "IntegrateDataFormatManagement": true,
  "BatchingResponses": false,
  "PrometheusMetricPort": 10010
}
```

### Configuration Options

| Setting | Description | Default |
|---------|-------------|---------|
| `StreamCreationStrategy` | 1=Partition-based (uses PartitionMappings), 2=Topic-based (each stream in own topic) | 2 |
| `BrokerUrl` | Kafka broker connection string | localhost:9092 |
| `StreamApiPort` | gRPC server port | 13579 |
| `IntegrateSessionManagement` | Enable session management | true |
| `IntegrateDataFormatManagement` | Enable data format management | true |
| `BatchingResponses` | Enable response batching | false |
| `PrometheusMetricPort` | Metrics server port (requires admin privileges) | 10010 |

## Stream Creation Strategies

### Strategy 1: Partition-Based

Each stream is stored in a specific partition of the same topic. Use `PartitionMappings` to define which partition each stream uses.

```json
{
  "StreamCreationStrategy": 1,
  "PartitionMappings": [
    {
      "Stream": "telemetry",
      "Partition": 1
    },
    {
      "Stream": "events", 
      "Partition": 2
    }
  ]
}
```

### Strategy 2: Topic-Based (Default)

Each stream is stored in its own dedicated topic with partition 0. **PartitionMappings are not used** in this strategy.

```json
{
  "StreamCreationStrategy": 2
  // PartitionMappings not needed - each stream uses its own topic
}
```

### Advanced Configuration

Example using partition-based strategy:

```json
{
  "StreamCreationStrategy": 1,
  "BrokerUrl": "kafka-cluster:9092",
  "StreamApiPort": 13579,
  "IntegrateSessionManagement": true,
  "IntegrateDataFormatManagement": true,
  "BatchingResponses": true,
  "PrometheusMetricPort": 10010,
  "PartitionMappings": [
    {
      "Stream": "telemetry",
      "Partition": 1
    },
    {
      "Stream": "events", 
      "Partition": 2
    }
  ]
}
```

## See Also

- [Docker Setup](docker-setup.md)