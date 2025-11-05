The Stream API is a high-performance component that manages real-time data streaming to and from Kafka brokers as part of the Open Streaming Architecture. It provides a gRPC-based interface that enables any programming language to interact with live data streams efficiently.

For more information, see [Open Streaming Architecture Documentation](https://atlas.motionapplied.com/developer-resources/secu4/docs/)

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Services](#services)
- [Configuration](#configuration)
- [Examples](#examples)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Overview

The Stream API enables real-time data streaming with the following key features:

- **High-performance streaming**: Optimized for low-latency, high-throughput data transmission
- **Multi-language support**: gRPC-based interface accessible from any programming language
- **Session management**: Create, manage, and monitor data sessions
- **Data format management**: Define and manage parameter and event schemas
- **Connection pooling**: Efficient connection management for multiple clients
- **Flexible deployment**: Self-hosted or Docker-based server deployment

### Key Benefits

- **Real-time processing**: Stream data with minimal latency
- **Scalability**: Handle thousands of concurrent connections
- **Reliability**: Built-in error handling and recovery mechanisms
- **Flexibility**: Support for both partition-based and topic-based routing strategies

## Architecture

### Core Components

The Stream API consists of five main services:

1. **Session Management Service**: Handles session lifecycle and state management
2. **Connection Management Service**: Manages client connections to data streams
3. **Packet Writer Service**: Publishes data and info packets (single or batch)
4. **Packet Reader Service**: Reads all packets, essentials, or filtered data packets
5. **Data Format Management Service**: Manages parameter and event format definitions

### Deployment Models

#### Local Self-Hosted
```csharp
// Embed the Stream API server directly in your application
var streamConfiguration = new StreamingApiConfiguration(
    StreamCreationStrategy.TopicBased,
    "localhost:9092",
    partitionMappings,
    integrateDataFormatManagement: true,
    integrateSessionManagement: true,
    batchingResponses: false);

StreamingApiClient.Initialise(streamConfiguration, cancellationTokenProvider, 
    brokerChecker, loggingProvider);
```

#### Remote Docker Server
```bash
# Run the Stream API server in Docker
docker run -p 13579:13579 -p 10010:10010 \
  -v ./Configs:/app/Configs \
  atlasplatformdocker/streaming-proto-server-host:latest
```

## Getting Started

### Client Setup

#### C# NuGet Package
For C# applications, use the NuGet packages from the [Motion Applied NuGet Repository](https://github.com/mat-docs/packages).

```xml
<PackageReference Include="MA.Streaming.Proto.Client.Local" Version="x.x.x" />
```

#### Other Languages
For other programming languages, use the proto files from the [MA.DataPlatforms.Protocol](https://github.com/Software-Products/MA.DataPlatforms.Protocol) repository to generate client code.

### Quick Start Example

```csharp
// Initialize the client
var configuration = new StreamingApiConfiguration(
    StreamCreationStrategy.TopicBased,
    "localhost:9092",
    new[] { new PartitionMapping("Stream1", 1) });

StreamingApiClient.Initialise(configuration, tokenProvider, brokerChecker, loggingProvider);

// Get service clients
var connectionManager = StreamingApiClient.GetConnectionManagerClient();
var packetWriter = StreamingApiClient.GetPacketWriterClient();
var packetReader = StreamingApiClient.GetPacketReaderClient();

// Create connection
var connection = await connectionManager.NewConnectionAsync(new NewConnectionRequest
{
    Details = new ConnectionDetails
    {
        DataSource = "MyDataSource",
        SessionKey = "MySession",
        Streams = { "Stream1" }
    }
});

// Write data
await packetWriter.WriteDataPacketAsync(new WriteDataPacketRequest
{
    Detail = new DataPacketDetails
    {
        DataSource = "MyDataSource",
        Stream = "Stream1",
        Message = new Packet
        {
            Content = ByteString.CopyFrom(data),
            SessionKey = "MySession",
            Type = "MyDataType"
        }
    }
});

// Read data
var readStream = packetReader.ReadPackets(new ReadPacketsRequest
{
    Connection = connection.Connection
});

await foreach (var response in readStream.ResponseStream.ReadAllAsync())
{
    foreach (var packet in response.Response)
    {
        // Process received packet
        ProcessPacket(packet);
    }
}
```

### Server Setup with Docker

#### Docker Compose
```yaml
name: kafka-compose

services:
  kafka:
    image: apache/kafka:latest
    hostname: kafka 
    container_name: kafka-broker-1
    networks:
      kafka_net_interal:
        ipv4_address: 172.22.0.7
    ports:
      - "9094:9094"
    environment:
      CLUSTER_ID: 'dev-kafka-cluster' 
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: 'broker,controller'
      KAFKA_CONTROLLER_QUORUM_VOTERS: '1@kafka:9093' 
      KAFKA_LISTENERS: 'PLAINTEXT://:9092,CONTROLLER://:9093,PLAINTEXT_HOST://:9094'
      KAFKA_ADVERTISED_LISTENERS: 'PLAINTEXT://kafka:9092,PLAINTEXT_HOST://localhost:9094'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: 'CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT'
      KAFKA_INTER_BROKER_LISTENER_NAME: 'PLAINTEXT'
      KAFKA_CONTROLLER_LISTENER_NAMES: 'CONTROLLER'
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
      KAFKA_LOG_DIRS: '/tmp/kraft-kafka-logs' 

  kafka-ui:
    image: provectuslabs/kafka-ui:latest 
    container_name: kafka-ui-1
    networks:
      kafka_net_interal:
        ipv4_address: 172.22.0.8
    ports:
      - "8080:8080" 
    environment:
      KAFKA_CLUSTERS_0_NAME: 'dev-kafka-cluster'
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: 'kafka:9092'
      DYNAMIC_CONFIG_ENABLED: 'true' 
    depends_on:
      - kafka 

  stream-api-server:
    image: atlasplatformdocker/streaming-proto-server-host-dev:latest
    container_name: stream-api-server
    networks:
      kafka_net_interal:
        ipv4_address: 172.22.0.9
    ports:
      - 13579:13579
      - 10010:10010
    depends_on:
      - kafka
    environment:
      AUTO_START: true
    volumes:
      - ./configs:/app/Configs

  key-generator:
    image: atlasplatformdocker/keygenerator-proto-server-dev:latest
    container_name: key-generator-server
    networks:
      kafka_net_interal:
        ipv4_address: 172.22.0.10
    ports:
      - 15379:15379
      - 10011:10010
    depends_on:
      - kafka
    environment:
      AUTO_START: true
    volumes:
      - ./key-configs:/app/Configs

networks:
  kafka_net_interal:
    driver: bridge
    ipam:
      config:
        - subnet: 172.22.0.0/16
          gateway: 172.22.0.1
```

## Services

### Session Management Service

Manages the lifecycle of data sessions, including creation, monitoring, and termination.

#### Key Features
- Session creation with metadata
- Session state tracking
- Automatic session cleanup
- Session information updates

#### Example Usage
```csharp
var sessionManager = StreamingApiClient.GetSessionManagementClient();

// Create a new session
var newSession = await sessionManager.CreateSessionAsync(new CreateSessionRequest
{
    SessionKey = "unique-session-id",
    DataSource = "sensor-data",
    SessionInfo = new SessionInfoPacket
    {
        Type = "Test Session",
        Version = 1,
        Identifier = "test-001"
    }
});

// Update session information
await sessionManager.UpdateSessionInfoAsync(new UpdateSessionInfoRequest
{
    SessionKey = "unique-session-id",
    SessionInfo = new SessionInfoPacket
    {
        Details = { {"status", "active"}, {"participant", "driver-123"} }
    }
});

// End session
await sessionManager.EndSessionAsync(new EndSessionRequest
{
    SessionKey = "unique-session-id"
});
```

### Connection Management Service

Handles client connections to data sessions with unique connection tracking.

#### Key Features
- Unique connection ID assignment
- Connection validation
- Connection state management
- Automatic connection cleanup

#### Example Usage
```csharp
var connectionManager = StreamingApiClient.GetConnectionManagerClient();

// Create new connection
var connection = await connectionManager.NewConnectionAsync(new NewConnectionRequest
{
    Details = new ConnectionDetails
    {
        DataSource = "telemetry",
        SessionKey = "session-123",
        Streams = { "engine", "brakes", "suspension" },
        StreamOffsets = { 0, 0, 0 },
        ExcludeMainStream = false
    }
});

// Retrieve connection details
var connectionInfo = await connectionManager.GetConnectionAsync(new GetConnectionRequest
{
    Connection = connection.Connection
});

// Close connection
var closeResult = await connectionManager.CloseConnectionAsync(new CloseConnectionRequest
{
    Connection = connection.Connection
});
```

### Packet Writer Service

Enables high-performance data publishing to Kafka topics with support for both individual packets and batch operations.

#### Key Features
- Single packet writing
- Batch packet writing
- Essential packet handling
- Stream-based routing
- Automatic data format registration

#### Example Usage
```csharp
var packetWriter = StreamingApiClient.GetPacketWriterClient();

// Write single packet
await packetWriter.WriteDataPacketAsync(new WriteDataPacketRequest
{
    Detail = new DataPacketDetails
    {
        DataSource = "telemetry",
        Stream = "engine",
        SessionKey = "session-123",
        Message = new Packet
        {
            Content = ByteString.CopyFrom(sensorData),
            Type = "PeriodicData",
            IsEssential = false
        }
    }
});

// Write batch of packets
var batchStream = packetWriter.WriteDataPackets();
foreach (var data in dataPoints)
{
    await batchStream.RequestStream.WriteAsync(new WriteDataPacketsRequest
    {
        Details = {
            new DataPacketDetails
            {
                DataSource = "telemetry",
                Stream = "engine",
                SessionKey = "session-123",
                Message = new Packet
                {
                    Content = ByteString.CopyFrom(data),
                    Type = "PeriodicData"
                }
            }
        }
    });
}
await batchStream.RequestStream.CompleteAsync();
```

### Packet Reader Service

Provides flexible data consumption with three reading modes: all packets, essential packets only, or filtered data packets.

#### Key Features
- **ReadPackets**: Continuous streaming of all packet types
- **ReadEssentials**: Essential packets only (config, metadata)
- **ReadDataPackets**: Filtered data packets using regex patterns
- Multi-connection support for parallel processing

#### Example Usage
```csharp
var packetReader = StreamingApiClient.GetPacketReaderClient();

// Read all packets
var readStream = packetReader.ReadPackets(new ReadPacketsRequest
{
    Connection = connection.Connection
});

// Read essential packets only
var essentialStream = packetReader.ReadEssentials(new ReadEssentialsRequest
{
    Connection = connection.Connection
});

// Read filtered data packets (supports regex patterns)
var filteredStream = packetReader.ReadDataPackets(new ReadDataPacketsRequest
{
    Request = new DataPacketRequest
    {
        Connection = connection.Connection,
        IncludeParameters = { "vCar.*", ".*Temp.*", "NGear.*" },
        ExcludeParameters = { ".*Debug.*" }
    }
});

// Process received data
var cts = new CancellationTokenSource();
while (await readStream.ResponseStream.MoveNext(cts.Token))
{
    var response = readStream.ResponseStream.Current.Response;
    foreach (var packetResponse in response)
    {
        ProcessPacket(packetResponse.Packet, packetResponse.Stream);
    }
}
```

### Data Format Management Service

Manages data schemas for parameters and events, enabling efficient data serialization and client-side filtering.

#### Key Features
- Parameter list registration
- Event format registration
- Data format retrieval
- Automatic ID generation

#### Example Usage
```csharp
var dataFormatManager = StreamingApiClient.GetDataFormatManagerClient();

// Register parameter data format
var parameterFormat = await dataFormatManager.GetParameterDataFormatIdAsync(
    new GetParameterDataFormatIdRequest
    {
        DataSource = "telemetry",
        Parameters = { "EngineRPM", "Speed", "Throttle", "Brake" }
    });

// Register event data format
var eventFormat = await dataFormatManager.GetEventDataFormatIdAsync(
    new GetEventDataFormatIdRequest
    {
        DataSource = "telemetry",
        Event = "LapCompleted"
    });

// Retrieve parameter list
var parameters = await dataFormatManager.GetParametersListAsync(
    new GetParametersListRequest
    {
        DataSource = "telemetry",
        DataFormatIdentifier = parameterFormat.DataFormatIdentifier
    });

// Retrieve event name
var eventInfo = await dataFormatManager.GetEventAsync(new GetEventRequest
{
    DataSource = "telemetry",
    DataFormatIdentifier = eventFormat.DataFormatIdentifier
});
```

## Configuration

### AppConfig.json

Configure the Stream API server using the AppConfig.json file:

```json
{
  "StreamCreationStrategy": 2,
  "BrokerUrl": "kafka:9092",
  "PartitionMappings": [],
  "StreamApiPort": 13579,
  "IntegrateSessionManagement": true,
  "IntegrateDataFormatManagement": true,
  "UseRemoteKeyGenerator": true,
  "RemoteKeyGeneratorServiceAddress": "key-generator-service:15379",
  "BatchingResponses": false,
  "PrometheusMetricPort": 10010,
  "InitialisationTimeoutSeconds": 5
}
```

#### Configuration Options

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `StreamCreationStrategy` | `int` | 1=Partition-based, 2=Topic-based | 2 |
| `BrokerUrl` | `string` | Kafka broker connection string | Required |
| `PartitionMappings` | `array` | Stream to partition mappings | `[]` |
| `StreamApiPort` | `int` | gRPC server port | 13579 |
| `IntegrateSessionManagement` | `bool` | Enable session management | true |
| `IntegrateDataFormatManagement` | `bool` | Enable data format management | true |
| `UseRemoteKeyGenerator` | `bool` | Use external key generator | false |
| `BatchingResponses` | `bool` | Enable response batching | false |
| `PrometheusMetricPort` | `int` | Metrics endpoint port | 10010 |
| `InitialisationTimeoutSeconds` | `uint` | Service startup timeout | 3 |

### Stream Creation Strategies

#### Topic-Based Strategy (Strategy 2)
Each stream maps to a separate Kafka topic, providing better isolation and scalability. This is the default strategy. PartitionMappings are not used in this mode.

```json
{
  "StreamCreationStrategy": 2,
  "PartitionMappings": []
}
```

#### Partition-Based Strategy (Strategy 1)
All streams use the same topic but different partitions, suitable for related data streams. Requires PartitionMappings configuration to specify which stream goes to which partition.

```json
{
  "StreamCreationStrategy": 1,
  "PartitionMappings": [
    {"Stream": "Engine", "Partition": 1},
    {"Stream": "Brakes", "Partition": 2},
    {"Stream": "Suspension", "Partition": 3}
  ]
}
```

## Examples

### Complete Telemetry Example

```csharp
using MA.Streaming.API;
using MA.Streaming.Proto.Client.Local;
using Google.Protobuf;

public class TelemetryExample
{
    private PacketWriterService.PacketWriterServiceClient packetWriter;
    private PacketReaderService.PacketReaderServiceClient packetReader;
    private ConnectionManagerService.ConnectionManagerServiceClient connectionManager;
    private DataFormatManagerService.DataFormatManagerServiceClient dataFormatManager;

    public async Task RunExample()
    {
        // 1. Initialize the Stream API
        await InitializeStreamApi();
        
        // 2. Create connection
        var connection = await CreateConnection();
        
        // 3. Register data formats
        await RegisterDataFormats();
        
        // 4. Start reading data in background
        var readingTask = StartReading(connection);
        
        // 5. Write telemetry data
        await WriteTelemtryData();
        
        // 6. Wait for reading to complete
        await readingTask;
        
        // 7. Close connection
        await CloseConnection(connection);
    }

    private async Task InitializeStreamApi()
    {
        var configuration = new StreamingApiConfiguration(
            StreamCreationStrategy.TopicBased,
            "localhost:9092",
            [],
            integrateDataFormatManagement: true,
            integrateSessionManagement: true,
            batchingResponses: false);

        var tokenProvider = new CancellationTokenSourceProvider();
        var brokerChecker = new KafkaBrokerAvailabilityChecker();
        var loggingProvider = new LoggingDirectoryProvider("");

        StreamingApiClient.Initialise(configuration, tokenProvider, brokerChecker, loggingProvider);

        // Get service clients
        packetWriter = StreamingApiClient.GetPacketWriterClient();
        packetReader = StreamingApiClient.GetPacketReaderClient();
        connectionManager = StreamingApiClient.GetConnectionManagerClient();
        dataFormatManager = StreamingApiClient.GetDataFormatManagerClient();
    }

    private async Task<NewConnectionResponse> CreateConnection()
    {
        return await connectionManager.NewConnectionAsync(new NewConnectionRequest
        {
            Details = new ConnectionDetails
            {
                DataSource = "VehicleTelemetry",
                SessionKey = $"Session_{DateTime.UtcNow:yyyyMMdd_HHmmss}",
                Streams = { "Engine", "Brakes", "Suspension" },
                StreamOffsets = { 0, 0, 0 },
                ExcludeMainStream = false
            }
        });
    }

    private async Task RegisterDataFormats()
    {
        // Register engine parameters
        await dataFormatManager.GetParameterDataFormatIdAsync(new GetParameterDataFormatIdRequest
        {
            DataSource = "VehicleTelemetry",
            Parameters = { "RPM", "Throttle", "FuelFlow", "OilPressure", "WaterTemp" }
        });

        // Register brake parameters  
        await dataFormatManager.GetParameterDataFormatIdAsync(new GetParameterDataFormatIdRequest
        {
            DataSource = "VehicleTelemetry", 
            Parameters = { "BrakePressure", "BrakeTemp_FL", "BrakeTemp_FR", "BrakeTemp_RL", "BrakeTemp_RR" }
        });

        // Register events
        await dataFormatManager.GetEventDataFormatIdAsync(new GetEventDataFormatIdRequest
        {
            DataSource = "VehicleTelemetry",
            Event = "LapCompleted"
        });
    }

    private async Task StartReading(NewConnectionResponse connection)
    {
        var readStream = packetReader.ReadDataPackets(new ReadDataPacketsRequest
        {
            Request = new DataPacketRequest
            {
                Connection = connection.Connection,
                IncludeParameters = { "RPM", "Throttle", "BrakePressure" }
            }
        });

        var cts = new CancellationTokenSource();
        while (await readStream.ResponseStream.MoveNext(cts.Token))
        {
            var response = readStream.ResponseStream.Current.Response;
            foreach (var packetResponse in response)
            {
                await ProcessTelemetryPacket(packetResponse);
            }
        }
    }

    private async Task WriteTelemtryData()
    {
        var sessionKey = $"Session_{DateTime.UtcNow:yyyyMMdd_HHmmss}";
        var random = new Random();

        // Simulate engine data
        for (int i = 0; i < 100; i++)
        {
            var engineData = CreateEngineData(random);
            await packetWriter.WriteDataPacketAsync(new WriteDataPacketRequest
            {
                Detail = new DataPacketDetails
                {
                    DataSource = "VehicleTelemetry",
                    Stream = "Engine", 
                    SessionKey = sessionKey,
                    Message = new Packet
                    {
                        Content = ByteString.CopyFrom(engineData),
                        Type = "PeriodicData",
                        IsEssential = false
                    }
                }
            });

            await Task.Delay(100); // 10Hz data rate
        }
    }

    private byte[] CreateEngineData(Random random)
    {
        // Create sample engine telemetry data
        var data = new
        {
            Timestamp = DateTime.UtcNow.Ticks,
            RPM = 6000 + random.Next(-500, 500),
            Throttle = random.NextDouble() * 100,
            FuelFlow = 15.5 + random.NextDouble() * 5,
            OilPressure = 4.2 + random.NextDouble() * 0.5,
            WaterTemp = 85 + random.Next(-5, 10)
        };

        return System.Text.Json.JsonSerializer.SerializeToUtf8Bytes(data);
    }

    private async Task ProcessTelemetryPacket(PacketResponse packetResponse)
    {
        Console.WriteLine($"Received packet from {packetResponse.Stream} at {packetResponse.SubmitTime}");
        
        switch (packetResponse.Packet.Type)
        {
            case "PeriodicData":
                await ProcessPeriodicData(packetResponse);
                break;
            case "Event":
                await ProcessEvent(packetResponse);
                break;
            case "Marker":
                await ProcessMarker(packetResponse);
                break;
        }
    }

    private async Task CloseConnection(NewConnectionResponse connection)
    {
        await connectionManager.CloseConnectionAsync(new CloseConnectionRequest
        {
            Connection = connection.Connection
        });
    }
}
```

### Batch Writing Example

```csharp
public async Task WriteBatchData()
{
    var batchWriter = packetWriter.WriteDataPackets();
    var sessionKey = "BatchSession_001";
    
    try
    {
        // Write 1000 packets in batch
        for (int i = 0; i < 1000; i++)
        {
            await batchWriter.RequestStream.WriteAsync(new WriteDataPacketsRequest
            {
                Details = 
                {
                    new DataPacketDetails
                    {
                        DataSource = "HighFrequencyData",
                        Stream = "Sensors",
                        SessionKey = sessionKey,
                        Message = new Packet
                        {
                            Content = ByteString.CopyFrom(GenerateSensorData(i)),
                            Type = "PeriodicData"
                        }
                    }
                }
            });
        }
    }
    finally
    {
        await batchWriter.RequestStream.CompleteAsync();
    }
}
```

## API Reference

For API reference, please refer to the [Stream API Reference](https://atlas.motionapplied.com/developer-resources/secu4/docs/)

### Error Handling

The Stream API uses standard gRPC status codes for error reporting:

```csharp
try
{
    var result = await packetWriter.WriteDataPacketAsync(request);
}
catch (RpcException ex)
{
    switch (ex.StatusCode)
    {
        case StatusCode.InvalidArgument:
            // Handle invalid request parameters
            break;
        case StatusCode.Unavailable:
            // Handle service unavailability
            break;
        case StatusCode.DeadlineExceeded:
            // Handle timeout
            break;
        default:
            // Handle other errors
            break;
    }
}
```

## Testing

The Stream API includes comprehensive testing at multiple levels:

### Unit Tests
Located in `MA.Streaming.UnitTests`, these test individual components:

```bash
cd MA.Streaming.UnitTests
dotnet test
```

### Integration Tests  
Located in `MA.Streaming.IntegrationTests`, these test end-to-end scenarios:

```bash
cd MA.Streaming.IntegrationTests  
dotnet test
```

Key integration test scenarios:
- Topic-based packet writing and reading
- Partition-based packet writing and reading
- Batch operations
- Data packet filtering
- Session management
- Connection management

### Sample Applications
Example usage can be found in the [Sample Code](https://github.com/mat-docs/MA.Streaming.Api.UsageSample) repository.

## Deployment

### Standalone Deployment

The Stream API can be deployed as a standalone executable or integrated into existing applications:

```csharp
// Self-hosted deployment
var host = Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        services.AddStreamingApi(configuration);
    })
    .Build();

await host.RunAsync();
```

### Docker Deployment

#### Production Docker Compose
```yaml
version: '3.8'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_LOG_RETENTION_HOURS: 168
      KAFKA_LOG_SEGMENT_BYTES: 1073741824

  stream-api:
    image: atlasplatformdocker/streaming-proto-server-host:latest
    depends_on:
      - kafka
    ports:
      - "13579:13579"prot
      - "10010:10010"
    environment:
      CONFIG_PATH: /app/Configs/AppConfig.json
      AUTO_START: true
    volumes:
      - ./configs:/app/Configs
```

### Monitoring

The Stream API exposes Prometheus metrics on the configured port (default: 10010):

```yaml
# Prometheus configuration
scrape_configs:
  - job_name: 'stream-api'
    static_configs:
      - targets: ['stream-api:10010']
    scrape_interval: 15s
    metrics_path: /metrics
```

Key metrics include:
- `stream_api_connections_total`: Total number of active connections
- `stream_api_packets_routed_total`: Total number of routed packets
- `stream_api_sessions_active`: Number of active sessions
- `stream_api_data_formats_registered`: Number of registered data formats

## Troubleshooting

### Common Issues

#### Connection Failures
```csharp
// Check Kafka broker connectivity
var brokerChecker = new KafkaBrokerAvailabilityChecker();
bool isAvailable = await brokerChecker.CheckAsync("localhost:9092");
```

#### Missing Data Formats
```csharp
// Verify data format registration
var formats = await dataFormatManager.GetParametersListAsync(new GetParametersListRequest
{
    DataSource = "MyDataSource",
    DataFormatIdentifier = formatId
});
```

#### Performance Issues
- Enable response batching for high-throughput scenarios
- Use appropriate partition mapping for load distribution
- Monitor Kafka broker performance and scaling

#### Memory Management
```csharp
// Properly dispose of streaming calls
using var readStream = packetReader.ReadPackets(request);
// Process data...
```

## Support

For technical support and questions:

- **Documentation**: [Open Streaming Architecture Documentation](https://atlas.motionapplied.com/developer-resources/secu4/stream_api/)
- **Sample Code**: [Usage Examples](https://github.com/mat-docs/MA.Streaming.Api.UsageSample)
- **Protocol Definitions**: [MA.DataPlatforms.Protocol Repository](https://github.com/Software-Products/MA.DataPlatforms.Protocol)
- **NuGet Packages**: [Motion Applied Packages](https://github.com/mat-docs/packages)

---

© 2025 Motion Applied Ltd. All rights reserved.
