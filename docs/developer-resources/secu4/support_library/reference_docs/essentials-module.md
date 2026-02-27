# Essentials Module

## Overview

The Essentials Module provides a streamlined API for reading essential session packets from the streaming broker. Essential packets contain critical session information such as configuration data, data format definitions, and other metadata required to properly interpret session data. This module is optimized for efficiently retrieving these foundational packets without the overhead of processing all session data.

The lifecycle of the Essentials service is tied to the session lifecycle—it starts when the session begins and completes when all essential packets have been read or the session ends.

## Key Features

- **Essential Packet Reading**: Read only essential/configuration packets from sessions
- **Lightweight Processing**: Optimized for reading metadata without full data streams
- **Event System**: Track when essential data reading starts and completes
- **Handler Pattern**: Attach custom handlers to process essential packets
- **Live and Historical Support**: Works with both live and historical sessions
- **Stream Management**: Automatically manages connection to the Essential stream

## Use Cases

The Essentials Module is ideal for scenarios where you need to:

- Retrieve session configuration data before processing full telemetry
- Read parameter and event definitions from a session
- Access session metadata and setup information
- Validate session structure before initiating full data processing
- Build session indexes or catalogs

## API Access

### Get the Essentials API

```csharp
var essentialsApi = supportLibApi.GetEssentialsApi();
```

### Create an Essentials Service

```csharp
var serviceResult = essentialsApi.CreateService(
    dataSource: "CarA",
    sessionKey: "specific-session-key");

if (serviceResult.Success && serviceResult.Data != null)
{
    var essentialsService = serviceResult.Data;
}
```

**Parameters:**

- **dataSource**: The data source to read from (e.g., "CarA", "CarB")
- **sessionKey**: The specific session key to read essential packets from

## Methods

### AddHandler

Adds a packet handler to process received essential packets.

```csharp
public void AddHandler(IHandler<IReceivedPacketDto> handler)
```

**Example:**

```csharp
public class EssentialPacketHandler : IHandler<IReceivedPacketDto>
{
    public void Handle(IReceivedPacketDto receivedPacket)
    {
        var packet = receivedPacket.Packet;
        Console.WriteLine($"Essential Packet: {packet.Type} (ID: {packet.Id})");
        Console.WriteLine($"  Session: {receivedPacket.SessionKey}");
        Console.WriteLine($"  Data Source: {receivedPacket.DataSource}");
        Console.WriteLine($"  Submit Time: {receivedPacket.SubmitTime}");
        Console.WriteLine($"  Stream: {receivedPacket.Stream}");
        
        // Process based on packet type
        switch (packet.Type)
        {
            case "ParameterDataFormat":
                HandleParameterFormat(packet);
                break;
            case "EventDataFormat":
                HandleEventFormat(packet);
                break;
            case "SessionDetails":
                HandleSessionDetails(packet);
                break;
        }
    }
    
    private void HandleParameterFormat(Packet packet)
    {
        // Parse and process parameter format definition
        var formatData = ParameterDataFormatPacket.Parser.ParseFrom(packet.Content);
        Console.WriteLine($"Parameter Format: {formatData.Parameters.Count} parameters");
    }
    
    private void HandleEventFormat(Packet packet)
    {
        // Parse and process event format definition
        var eventData = EventDataFormatPacket.Parser.ParseFrom(packet.Content);
        Console.WriteLine($"Event Format: {eventData.Events.Count} events");
    }
    
    private void HandleSessionDetails(Packet packet)
    {
        // Parse and process session details
        var details = SessionDetailsPacket.Parser.ParseFrom(packet.Content);
        Console.WriteLine($"Session Details: {details.Details.Count} entries");
    }
}

// Usage
var handler = new EssentialPacketHandler();
essentialsService.AddHandler(handler);
```

### RemoveHandler

Removes a previously added handler.

```csharp
public void RemoveHandler(IHandler<IReceivedPacketDto> handler)
```

**Example:**

```csharp
essentialsService.RemoveHandler(handler);
```

### Initialise and Start

Initialize and start the essentials service.

```csharp
essentialsService.Initialise();
essentialsService.Start();
```

**Note**: 
- `Initialise()` prepares the service and establishes connections
- `Start()` begins reading essential packets
- Essential packets are buffered and delivered to handlers asynchronously

### Stop

Stops the essentials service.

```csharp
essentialsService.Stop();
```

## Events

### ReadingEssentialsStarted

Fired when reading of essential packets begins for a session.

```csharp
essentialsService.ReadingEssentialsStarted += (sender, sessionInfo) =>
{
    Console.WriteLine($"Started reading essentials for session: {sessionInfo.SessionKey}");
    Console.WriteLine($"Data Source: {sessionInfo.DataSource}");
    Console.WriteLine($"Session Type: {sessionInfo.Type}");
    Console.WriteLine($"Historical: {sessionInfo.Historical}");
};
```

### ReadingEssentialsCompleted

Fired when reading of essential packets is complete.

```csharp
essentialsService.ReadingEssentialsCompleted += (sender, sessionInfo) =>
{
    Console.WriteLine($"Completed reading essentials for session: {sessionInfo.SessionKey}");
    Console.WriteLine($"Data Source: {sessionInfo.DataSource}");
};
```

## Complete Example

### Reading Essential Packets from a Session

```csharp
using MA.DataPlatforms.Streaming.Support.Lib.Core;
using MA.DataPlatforms.Streaming.Support.Lib.Core.Shared.Abstractions;
using MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.ReadingModule.Abstractions;
using MA.Streaming.OpenData;

// Create the Support Library API
var config = new StreamApiConfiguration(
    kafkaConnection: "localhost:9092");

var supportLibApi = SupportLibApiFactory.CreateSupportLibApi(config);

// Get the Essentials API
var essentialsApi = supportLibApi.GetEssentialsApi();

// Create handler for essential packets
var essentialHandler = new EssentialPacketHandler();

// Create the essentials service
var serviceResult = essentialsApi.CreateService(
    dataSource: "CarA",
    sessionKey: "session-2026-02-26-001");

if (serviceResult.Success && serviceResult.Data != null)
{
    var essentialsService = serviceResult.Data;
    
    // Subscribe to events
    essentialsService.ReadingEssentialsStarted += (s, sessionInfo) =>
    {
        Console.WriteLine($"Started reading essentials: {sessionInfo.SessionKey}");
    };
    
    essentialsService.ReadingEssentialsCompleted += (s, sessionInfo) =>
    {
        Console.WriteLine($"Completed reading essentials: {sessionInfo.SessionKey}");
    };
    
    // Add handler
    essentialsService.AddHandler(essentialHandler);
    
    // Initialize and start
    essentialsService.Initialise();
    essentialsService.Start();
    
    // Wait for completion or stop manually
    Console.WriteLine("Reading essential packets... Press any key to stop.");
    Console.ReadKey();
    
    // Stop the service
    essentialsService.Stop();
}
else
{
    Console.WriteLine($"Failed to create essentials service: {serviceResult.Message}");
}
```

## Architecture and Design

### Essential Stream

The Essentials Module reads from a dedicated "Essential" stream that contains:

- **Data Format Packets**: Parameter and event definitions
- **Configuration Packets**: Session configuration and settings
- **Session Metadata**: Details, associations, and other metadata
- **Stream Control Packets**: StreamStarted and StreamStopped markers

### Buffering Strategy

The module uses an unbounded auto-start buffer to handle essential packets efficiently:

- **Auto-Start Buffer**: Automatically begins processing when packets arrive
- **Unbounded**: No memory pressure constraints since essential packets are typically small
- **Asynchronous Processing**: Packets are buffered and processed asynchronously

### Lifecycle

1. **Service Creation**: Creates connection to the Essential stream
2. **Initialization**: Establishes connections and prepares handlers
3. **Start**: Begins reading from the Essential stream
4. **Packet Processing**: Essential packets are received and dispatched to handlers
5. **Completion**: Automatically detects when all essential packets are read
6. **Stop**: Cleans up resources and disconnections

## Best Practices

### 1. Use Before Full Data Processing

Read essential packets before processing full session data to understand the session structure:

```csharp
// Step 1: Read essentials to get data formats
var essentialsService = essentialsApi.CreateService(dataSource, sessionKey).Data;
var formatCollector = new DataFormatCollector();
essentialsService.AddHandler(formatCollector);
essentialsService.Initialise();
essentialsService.Start();

// Wait for essentials to complete...
await formatCollector.WaitForCompletion();

// Step 2: Now process full data with format knowledge
var readerService = readerApi.CreateService(dataSource, sessionKey).Data;
// ... process full session data
```

### 2. Handle Multiple Session Essentials

You can create multiple essentials services for different sessions:

```csharp
var sessions = new[] { "session-001", "session-002", "session-003" };

var essentialsServices = sessions.Select(sessionKey =>
{
    var service = essentialsApi.CreateService(dataSource, sessionKey).Data;
    service.AddHandler(sharedHandler);
    service.Initialise();
    return service;
}).ToList();

// Start all services
essentialsServices.ForEach(s => s.Start());

// Wait for all to complete...
```

### 3. Error Handling

Always check API results and handle errors appropriately:

```csharp
var result = essentialsApi.CreateService(dataSource, sessionKey);

if (!result.Success || result.Data == null)
{
    logger.Error($"Failed to create essentials service: {result.Message}");
    // Handle error - session might not exist or be accessible
    return;
}

var service = result.Data;
// Proceed with service usage...
```

### 4. Combine with Session Manager

Use with the Session Manager module to discover and process sessions:

```csharp
var sessionManager = supportLibApi.GetSessionManagerApi();
var sessions = sessionManager.GetSessions(dataSource).Data;

foreach (var session in sessions)
{
    var essentialsService = essentialsApi.CreateService(
        session.DataSource, 
        session.SessionKey).Data;
    
    // Process essential packets for each session
    essentialsService.AddHandler(essentialHandler);
    essentialsService.Initialise();
    essentialsService.Start();
}
```

## Differences from Reader Module

| Feature | Essentials Module | Reader Module |
|---------|-------------------|---------------|
| **Purpose** | Read essential/configuration packets only | Read all data packets |
| **Stream** | Reads from "Essential" stream | Reads from all session streams |
| **Data Volume** | Low (configuration data only) | High (all telemetry data) |
| **Use Case** | Metadata and configuration retrieval | Full session data processing |
| **Configuration** | Simple (data source + session key) | Complex (streams, filters, timeouts) |
| **Performance** | Lightweight and fast | Heavier, processes all data |

## Python FFI Support

The Essentials Module is also available through the Python FFI library:

```python
from contracts.essentials.i_essentials_service_module_api import IEssentialsServiceModuleApi
from core.essentials.essentials_service_module_api import EssentialsServiceModuleApi

# Get essentials API
essentials_api = support_lib_api.get_essentials_api()

# Create service
essentials_service = essentials_api.create_service(data_source, session_key)

# Add handler
essentials_service.add_handler(packet_handler)

# Initialize and start
essentials_service.initialise()
essentials_service.start()
```

## Related Modules

- **[Session Manager](session-manager.md)**: Discover sessions before reading essentials
- **[Reader Module](reader-module.md)**: Read full session data after essentials
- **[Data Format Manager](data-format-manager.md)**: Define formats that appear in essentials
