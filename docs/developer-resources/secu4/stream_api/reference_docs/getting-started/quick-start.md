# Quick Start Guide

Get up and running with the Motion Applied Stream API in minutes. This guide walks you through setting up your first data streaming application.

## Prerequisites

- .NET 8.0 or later (for C# clients)
- Docker and Docker Compose (for server deployment)
- Access to a Kafka broker

## Step 1: Start the Server

### Using Docker Compose

Create a `docker-compose.yml` file:

```yaml
services:  
  zookeeper:
    image: confluentinc/cp-zookeeper:latest    
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - 12181:2181
    
  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper 
    ports:
      - 9092:9092    
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

  stream-api-server:
    image: atlasplatformdocker/streaming-proto-server-host:latest
    ports:
      - 13579:13579
      - 10010:10010
    depends_on:
      - kafka
    restart: always
    environment:     
      CONFIG_PATH: /Configs/AppConfig.json
      AUTO_START: true
    volumes:
      - ./Configs:/app/Configs 
```

Create the configuration directory and file:

```bash
mkdir Configs
```

Create `Configs/AppConfig.json`:

```json
{
  "StreamCreationStrategy": 2,
  "BrokerUrl": "kafka:9092",
  "PartitionMappings": [],
  "StreamApiPort": 13579,
  "IntegrateSessionManagement": true,
  "IntegrateDataFormatManagement": true,
  "BatchingResponses": false,
  "PrometheusMetricPort": 10010
}
```

Start the services:

```bash
docker-compose up -d
```

## Step 2: Install Client Library

### For C# Applications

```xml
<PackageReference Include="MA.Streaming.Proto.Client.Local" Version="latest" />
```

### For Other Languages

Download the proto files from the [Protocol Repository](https://github.com/Software-Products/MA.DataPlatforms.Protocol) and generate client code for your language.

## Step 3: Create Your First Application

### Simple Example

Here's a minimal example to get you started:

```csharp
using MA.Streaming.API;
using MA.Streaming.Proto.Client.Local;
using MA.Streaming.Core;
using MA.Streaming.Core.Configs;
using Google.Protobuf;

// Initialize the client
var config = new StreamingApiConfiguration(
    StreamCreationStrategy.TopicBased, 
    "localhost:9092", 
    []);

StreamingApiClient.Initialise(
    config,
    new CancellationTokenSourceProvider(),
    new KafkaBrokerAvailabilityChecker(),
    new LoggingDirectoryProvider(@"C:\Temp"));

// Get service clients
var sessionManager = StreamingApiClient.GetSessionManagementClient();
var connectionManager = StreamingApiClient.GetConnectionManagerClient();
var packetWriter = StreamingApiClient.GetPacketWriterClient();
var packetReader = StreamingApiClient.GetPacketReaderClient();

const string DataSource = "QuickStartDemo";

// Create a session
var sessionResponse = await sessionManager.CreateSessionAsync(new CreateSessionRequest
{
    DataSource = DataSource,
    Type = "DemoSession",
    Version = 1,
    Identifier = "quick-start-001"
});

string sessionKey = sessionResponse.SessionKey;
Console.WriteLine($"Created session: {sessionKey}");

// Create a connection
var connectionResponse = await connectionManager.NewConnectionAsync(new NewConnectionRequest
{
    Details = new ConnectionDetails
    {
        DataSource = DataSource,
        SessionKey = sessionKey,
        Streams = { "demo-stream" },
        StreamOffsets = { 0 } // Start from beginning
    }
});

Console.WriteLine($"Connected with ID: {connectionResponse.Connection.Id}");

// Write a simple packet (using custom message - see Custom Messages example)
var customData = new { Message = "Hello Stream API", Timestamp = DateTime.UtcNow };
string jsonData = System.Text.Json.JsonSerializer.Serialize(customData);
byte[] jsonBytes = System.Text.Encoding.UTF8.GetBytes(jsonData);

await packetWriter.WriteDataPacketAsync(new WriteDataPacketRequest
{
    Detail = new DataPacketDetails
    {
        DataSource = DataSource,
        Stream = "demo-stream",
        SessionKey = sessionKey,
        Message = new Packet
        {
            Content = ByteString.CopyFrom(jsonBytes),
            Type = "CustomMessage",
            IsEssential = false,
            SessionKey = sessionKey
        }
    }
});

Console.WriteLine("Sent packet successfully!");

// Read packets
var stream = packetReader.ReadPackets(new ReadPacketsRequest
{
    Connection = connectionResponse.Connection
});

await foreach (var response in stream.ResponseStream.ReadAllAsync())
{
    foreach (var packet in response.Response)
    {
        Console.WriteLine($"Received: {packet.Packet.Type} from {packet.Stream}");
    }
}

// Clean up
await connectionManager.CloseConnectionAsync(new CloseConnectionRequest
{
    Connection = connectionResponse.Connection
});

await sessionManager.EndSessionAsync(new EndSessionRequest
{
    DataSource = DataSource,
    SessionKey = sessionKey
});

Console.WriteLine("Demo completed!");
```

### Run the Application

```bash
dotnet run
```

You should see output showing your session being created, packet sent, and data received.

## Complete Examples

For more comprehensive examples with real-world scenarios:

- **[Telemetry Example](../examples/telemetry-example.md)** - Complete vehicle telemetry streaming with Protocol Buffers
- **[Custom Messages Example](../examples/custom-messages.md)** - Send and receive custom message types with JSON serialization

## Next Steps

- [Explore the Connection Management Service](../services/connection-management.md)
- [Learn about Session Management](../services/session-management.md)
- [View more examples](../examples/telemetry-example.md)
- [Docker Setup Guide](../configuration/docker-setup.md)