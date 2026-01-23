# Server Configuration

The MA Streaming API provides a flexible way to stream data using Kafka as the messaging backbone. The API supports two streaming strategies: **Topic-Based** and **Partition-Based**, each suited for different use cases and scalability requirements.

## Configuration

The Streaming API is configured through the `IStreamingApiConfiguration` interface.

### Interface Definition

```csharp
public interface IStreamingApiConfiguration
{
    StreamCreationStrategy StreamCreationStrategy { get; }
    string BrokerUrl { get; }
    IReadOnlyList<PartitionMapping>? PartitionMappings { get; }
    int StreamApiPort { get; }
    bool IntegrateSessionManagement { get; }
    bool IntegrateDataFormatManagement { get; }
    bool UseRemoteKeyGenerator { get; }
    string RemoteKeyGeneratorServiceAddress { get; }
    bool BatchingResponses { get; }
    uint InitialisationTimeoutSeconds { get; }
    uint TerminationTimeoutSeconds { get; }
    string Domain { get; }
}
```

### Configuration Properties

| Property | Description | Required | Default Value |
|----------|-------------|----------|---------------|
| `StreamCreationStrategy` | Topic-Based or Partition-Based streaming | Yes | TopicBased |
| `BrokerUrl` | Kafka broker connection string | Yes | "localhost:9092" |
| `PartitionMappings` | Partition mapping (Partition-Based only) | Yes* | null |
| `StreamApiPort` | Port number for the Streaming API server | No | 5000 |
| `IntegrateSessionManagement` | Enable/disable session management | No | true |
| `IntegrateDataFormatManagement` | Enable/disable data format management | No | true |
| `UseRemoteKeyGenerator` | Use remote key generator service | No | false |
| `RemoteKeyGeneratorServiceAddress` | Address of remote key generator | No | "" |
| `BatchingResponses` | Enable response batching | No | true |
| `InitialisationTimeoutSeconds` | Timeout for initialization operations | No | 30 |
| `TerminationTimeoutSeconds` | Timeout for graceful termination | No | 1 |
| `Domain` | Domain prefix for Kafka topics | No | "" |

!!! warning "Required Conditionally"
    `PartitionMappings` is required when using Partition-Based streaming strategy.


## Stream Creation Strategies

The Streaming API supports two distinct strategies for organizing data streams. The choice between them depends on your scalability needs, topic management preferences, and use case requirements.

### Topic-Based Streaming

In Topic-Based streaming, each data stream is created as a separate Kafka topic. This is the simpler approach and is suitable for most use cases.

#### When to Use Topic-Based

- You have a moderate number of streams
- You want clear separation between different data streams
- You prefer easier debugging and monitoring (each stream has its own topic)
- You don't need to worry about Kafka topic limits
- Simpler configuration and management

#### How It Works

```
Stream 1 → Kafka Topic: {Domain}.Data.Stream1
Stream 2 → Kafka Topic: {Domain}.Data.Stream2
Stream 3 → Kafka Topic: {Domain}.Data.Stream3
```

#### Configuration Example

```json
{
  "StreamApiConfig": {
    "StreamCreationStrategy": "TopicBased",
    "BrokerUrl": "kafka-broker.company.com:9092",
    "Domain": "Production",
    "IntegrateSessionManagement": true,
    "IntegrateDataFormatManagement": true
  }
}
```

#### Benefits

✅ Simple to configure  
✅ Clear separation between streams  
✅ Easy debugging and monitoring  
✅ Natural Kafka topic organization  
✅ Recommended for most use cases  

#### Limitations

⚠️ Each stream creates a new Kafka topic  
⚠️ May hit Kafka topic limits with thousands of streams  
⚠️ More topics to manage in Kafka  


### Partition-Based Streaming

In Partition-Based streaming, multiple streams can share the same Kafka topic, with data distributed across different partitions. This is more complex but allows for greater scalability.

#### When to Use Partition-Based

- You have a very large number of streams (hundreds to thousands)
- You want to minimize the number of Kafka topics
- You need fine-grained control over partition distribution
- You're working with Kafka cluster topic limits
- You understand Kafka partition management

#### How It Works

```
Stream 1 → Kafka Topic: DataStream, Partition 0
Stream 2 → Kafka Topic: DataStream, Partition 1
Stream 3 → Kafka Topic: DataStream, Partition 0
Stream 4 → Kafka Topic: DataStream, Partition 2
```

Multiple streams can share the same topic but are distributed across different partitions.

#### Configuration Example

```json
{
  "StreamApiConfig": {
    "StreamCreationStrategy": "PartitionBased",
    "BrokerUrl": "kafka-broker.company.com:9092",
    "Domain": "Production",
    "PartitionMappings": [
      {
        "DataSource": "SensorGroup1",
        "Topic": "TelemetryData",
        "NumPartitions": 10
      },
      {
        "DataSource": "SensorGroup2",
        "Topic": "TelemetryData",
        "NumPartitions": 5
      }
    ]
  }
}
```

#### Benefits

✅ Scales to thousands of streams  
✅ Minimizes number of Kafka topics  
✅ Fine-grained partition control  
✅ Efficient use of Kafka resources  
✅ Better for high-cardinality data sources  

#### Limitations

⚠️ More complex configuration  
⚠️ Requires careful partition planning  
⚠️ More difficult to debug individual streams  
⚠️ Requires understanding of Kafka partitions  

## Partition Mappings

When using **Partition-Based Streaming**, you must define partition mappings that specify how streams are distributed across Kafka topics and partitions.

### PartitionMapping Structure

```csharp
public class PartitionMapping
{
    public string DataSource { get; set; }
    public string Topic { get; set; }
    public int NumPartitions { get; set; }
}
```

### Example Configuration

```json
{
  "PartitionMappings": [
    {
      "DataSource": "EngineData",
      "Topic": "Production.Data.Engine",
      "NumPartitions": 10
    },
    {
      "DataSource": "ChassisData",
      "Topic": "Production.Data.Chassis",
      "NumPartitions": 5
    }
  ]
}
```

### Best Practices

!!! tip "Partition Sizing"
    - Start with fewer partitions and scale up as needed
    - Consider your throughput requirements
    - More partitions = better parallelism but more overhead
    - Typical range: 3-10 partitions per topic

!!! warning "Planning Considerations"
    - Partitions cannot be decreased after creation
    - Plan for growth in your data volume
    - Consider consumer parallelism needs

## Domain Configuration

The **Domain** property allows you to organize Kafka topics with a meaningful prefix.

### Purpose

- Organize topics by environment (Production, Staging, Development)
- Separate topics by team or application
- Support multi-tenant architectures
- Make topic identification easier

### Examples

```json
{
  "Domain": "Production"
}
```

**Results in topics like:**
- `Production.Data.SensorData`
- `Production.Sys.SessionInfo`
- `Production.Essential.CriticalData`

```json
{
  "Domain": ""
}
```

**Results in topics like:**
- `Data.SensorData`
- `Sys.SessionInfo`
- `Essential.CriticalData`

!!! tip "Naming Conventions"
    Use clear, consistent domain names:
    
    - ✅ `Production`, `Staging`, `Development`
    - ✅ `TeamA`, `TeamB`
    - ✅ `F1`, `IndyCar`, `LeMans`
    - ❌ `prod123`, `test`, `my-domain`

## Logging Configuration

The Streaming API uses **Serilog** for structured logging, giving you full control over log output.

### Configure Logging

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
      {
        "Name": "Console",
        "Args": {
          "outputTemplate": "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}"
        }
      },
      {
        "Name": "File",
        "Args": {
          "path": "logs/streaming-api-.log",
          "rollingInterval": "Day",
          "retainedFileCountLimit": 7
        }
      }
    ]
  }
}
```

## Best Practices

### Choosing a Strategy

| Use Topic-Based If... | Use Partition-Based If... |
|------------------------|---------------------------|
| You have < 100 streams | You have > 100 streams |
| Simple is better | You need maximum scalability |
| Easy debugging is important | You're hitting Kafka topic limits |
| Standard use case | High-cardinality data sources |

### Configuration Tips

!!! success "Recommended Settings"
    ```json
    {
      "StreamCreationStrategy": "TopicBased",
      "IntegrateSessionManagement": true,
      "IntegrateDataFormatManagement": true,
      "BatchingResponses": true,
      "InitialisationTimeoutSeconds": 30,
      "TerminationTimeoutSeconds": 1
    }
    ```

### Performance Optimization

- **Enable Batching**: Set `BatchingResponses: true` for better throughput
- **Tune Timeouts**: Adjust `InitialisationTimeoutSeconds` based on your network
- **Monitor Partition Count**: Keep partitions per topic under 100 for optimal performance
- **Use Domains**: Organize topics with meaningful domain prefixes

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection timeout | Increase `InitialisationTimeoutSeconds` |
| Too many topics | Switch to Partition-Based strategy |
| Slow startup | Check network connectivity to Kafka broker |
| Stream not appearing | Verify `BrokerUrl` and domain configuration |