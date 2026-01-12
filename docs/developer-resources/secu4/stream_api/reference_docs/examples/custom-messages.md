# Custom Message Implementation

This guide demonstrates how to implement and use custom message types with the Stream API. While the API uses Protocol Buffers internally for the packet structure, you can serialize your custom message content using any serialization method (JSON, XML, MessagePack, etc.).

## Overview

The Stream API `Packet` structure supports custom message types:

```protobuf
message Packet {
  bytes content = 1;           // Your serialized custom message
  string type = 2;             // Your custom message type name
  bool is_essential = 3;       // Whether this is critical data
  string session_key = 4;      // Session identifier
}
```

You can put **any serialized data** into the `content` field and identify it with a custom `type` name.

## Simple Custom Message Example

### Step 1: Create Session

```csharp
using MA.Streaming.API;

const string DataSource = "sensors";

// Create session first
var sessionManager = StreamingApiClient.GetSessionManagerClient();
var sessionResponse = await sessionManager.CreateSessionAsync(new CreateSessionRequest
{
    DataSource = DataSource,
    Type = "SensorSession",
    Version = 1,
    Identifier = "temperature-monitoring",
    Details =
    {
        ["location"] = "Lab A"
    }
});

string sessionKey = sessionResponse.SessionKey;
Console.WriteLine($"Created session: {sessionKey}");
```

### Step 2: Define Your Custom Message Class

```csharp
using System;

// Simple custom message class
public class CustomType
{
    public string MessageId { get; set; }
    public DateTime Timestamp { get; set; }
    public string Source { get; set; }
    public double Value { get; set; }
    public string Unit { get; set; }
}
```

### Step 3: Serialize and Send

```csharp
using System.Text;
using System.Text.Json;
using Google.Protobuf;
using MA.Streaming.API;

// Create your custom message
var customMessage = new CustomType
{
    MessageId = "msg-001",
    Timestamp = DateTime.UtcNow,
    Source = "temperature-sensor",
    Value = 85.5,
    Unit = "celsius"
};

// Serialize to JSON
string jsonString = JsonSerializer.Serialize(customMessage);
byte[] jsonBytes = Encoding.UTF8.GetBytes(jsonString);

// Create packet with custom message
var packet = new Packet
{
    Content = ByteString.CopyFrom(jsonBytes),
    Type = "CustomType",  // Your custom type identifier
    IsEssential = false,
    SessionKey = sessionKey
};

// Send the packet (use same data source as session)
var packetWriter = StreamingApiClient.GetPacketWriterClient();
await packetWriter.WriteDataPacketAsync(new WriteDataPacketRequest
{
    Detail = new DataPacketDetails
    {
        DataSource = DataSource,  // Same as session
        Stream = "temperature",
        SessionKey = sessionKey,  // Session key from Step 1
        Message = packet
    }
});
```

### Step 4: Receive and Deserialize

```csharp
using System.Text;
using System.Text.Json;

// Create connection with same data source and session key
var connectionManager = StreamingApiClient.GetConnectionManagerClient();
var connectionResponse = await connectionManager.NewConnectionAsync(new NewConnectionRequest
{
    Details = new ConnectionDetails
    {
        DataSource = DataSource,  // Same data source
        SessionKey = sessionKey,  // Same session key
        Streams = { "temperature" },
        StreamOffsets = { 0 }  // Start from beginning
    }
});

// Read packets
var packetReader = StreamingApiClient.GetPacketReaderClient();
var stream = packetReader.ReadPackets(new ReadPacketsRequest
{
    Connection = connectionResponse.Connection
});

while (await stream.ResponseStream.MoveNext())
{
    foreach (var response in stream.ResponseStream.Current.Response)
    {
        var packet = response.Packet;
        
        // Check if it's your custom type
        if (packet.Type == "CustomType")
        {
            // Deserialize from JSON
            string jsonString = Encoding.UTF8.GetString(packet.Content.ToByteArray());
            var customMessage = JsonSerializer.Deserialize<CustomType>(jsonString);
            
            Console.WriteLine($"Received custom message:");
            Console.WriteLine($"  ID: {customMessage.MessageId}");
            Console.WriteLine($"  Timestamp: {customMessage.Timestamp}");
            Console.WriteLine($"  Source: {customMessage.Source}");
            Console.WriteLine($"  Value: {customMessage.Value} {customMessage.Unit}");
        }
    }
}
```

## Complete Working Example

```csharp
using System;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Google.Protobuf;
using MA.Streaming.API;
using MA.Streaming.Proto.Client;

public class CustomType
{
    public string MessageId { get; set; }
    public DateTime Timestamp { get; set; }
    public string Source { get; set; }
    public double Value { get; set; }
    public string Unit { get; set; }
}

public class CustomMessageExample
{
    private readonly StreamingApiClient _apiClient;
    private const string DataSource = "sensors";
    
    public CustomMessageExample(string serverAddress)
    {
        _apiClient = new StreamingApiClient(serverAddress);
    }
    
    public async Task<string> CreateSessionAsync()
    {
        // Create session first
        var sessionManager = _apiClient.GetSessionManagerClient();
        var sessionResponse = await sessionManager.CreateSessionAsync(new CreateSessionRequest
        {
            DataSource = DataSource,
            Type = "SensorSession",
            Version = 1,
            Identifier = "temperature-monitoring",
            Details =
            {
                ["location"] = "Lab A",
                ["purpose"] = "Temperature monitoring"
            }
        });
        
        Console.WriteLine($"Created session: {sessionResponse.SessionKey}");
        return sessionResponse.SessionKey;
    }
    
    public async Task SendCustomMessageAsync(string sessionKey)
    {
        // Create custom message
        var customMessage = new CustomType
        {
            MessageId = Guid.NewGuid().ToString(),
            Timestamp = DateTime.UtcNow,
            Source = "temperature-sensor-01",
            Value = 85.5,
            Unit = "celsius"
        };
        
        // Serialize to JSON bytes
        string jsonString = JsonSerializer.Serialize(customMessage);
        byte[] jsonBytes = Encoding.UTF8.GetBytes(jsonString);
        
        // Wrap in Packet
        var packet = new Packet
        {
            Content = ByteString.CopyFrom(jsonBytes),
            Type = "CustomType",
            IsEssential = false,
            SessionKey = sessionKey
        };
        
        // Send packet
        var packetWriter = _apiClient.GetPacketWriterClient();
        await packetWriter.WriteDataPacketAsync(new WriteDataPacketRequest
        {
            Detail = new DataPacketDetails
            {
                DataSource = DataSource,
                Stream = "temperature",
                SessionKey = sessionKey,
                Message = packet
            }
        });
        
        Console.WriteLine($"Sent custom message: {customMessage.MessageId}");
    }
    
    public async Task ReceiveCustomMessagesAsync(string sessionKey)
    {
        // Create connection with same data source and session key
        var connectionManager = _apiClient.GetConnectionManagerClient();
        var connectionResponse = await connectionManager.NewConnectionAsync(new NewConnectionRequest
        {
            Details = new ConnectionDetails
            {
                DataSource = DataSource,
                SessionKey = sessionKey,
                Streams = { "temperature" },
                StreamOffsets = { 0 } // Start from beginning
            }
        });
        
        Console.WriteLine($"Created connection: {connectionResponse.Connection.Id}");
        
        // Read packets
        var packetReader = _apiClient.GetPacketReaderClient();
        var stream = packetReader.ReadPackets(new ReadPacketsRequest
        {
            Connection = connectionResponse.Connection
        });
        
        while (await stream.ResponseStream.MoveNext())
        {
            foreach (var response in stream.ResponseStream.Current.Response)
            {
                var packet = response.Packet;
                
                // Handle custom message type
                if (packet.Type == "CustomType")
                {
                    ProcessCustomMessage(packet);
                }
            }
        }
    }
    
    private void ProcessCustomMessage(Packet packet)
    {
        try
        {
            // Deserialize from JSON
            string jsonString = Encoding.UTF8.GetString(packet.Content.ToByteArray());
            var customMessage = JsonSerializer.Deserialize<CustomType>(jsonString);
            
            Console.WriteLine($"Received CustomType message:");
            Console.WriteLine($"  ID: {customMessage.MessageId}");
            Console.WriteLine($"  Timestamp: {customMessage.Timestamp:yyyy-MM-dd HH:mm:ss}");
            Console.WriteLine($"  Source: {customMessage.Source}");
            Console.WriteLine($"  Value: {customMessage.Value} {customMessage.Unit}");
        }
        catch (JsonException ex)
        {
            Console.WriteLine($"Failed to deserialize custom message: {ex.Message}");
        }
    }
}

// Usage
public static async Task Main()
{
    var example = new CustomMessageExample("localhost:13579");
    
    // Step 1: Create session
    string sessionKey = await example.CreateSessionAsync();
    
    // Step 2: Send custom messages
    await example.SendCustomMessageAsync(sessionKey);
    
    // Step 3: Read custom messages (use same data source and session key)
    await example.ReceiveCustomMessagesAsync(sessionKey);
}
```

## Using Different Serializers

### MessagePack Serialization

```csharp
using MessagePack;

[MessagePackObject]
public class CustomType
{
    [Key(0)]
    public string MessageId { get; set; }
    
    [Key(1)]
    public DateTime Timestamp { get; set; }
    
    [Key(2)]
    public string Source { get; set; }
    
    [Key(3)]
    public double Value { get; set; }
    
    [Key(4)]
    public string Unit { get; set; }
}

// Serialize
byte[] msgPackBytes = MessagePackSerializer.Serialize(customMessage);
var packet = new Packet
{
    Content = ByteString.CopyFrom(msgPackBytes),
    Type = "CustomType",
    // ...
};

// Deserialize
var customMessage = MessagePackSerializer.Deserialize<CustomType>(packet.Content.ToByteArray());
```

### Binary Serialization

```csharp
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;

// Serialize
using var ms = new MemoryStream();
var formatter = new BinaryFormatter();
formatter.Serialize(ms, customMessage);
byte[] binaryBytes = ms.ToArray();

var packet = new Packet
{
    Content = ByteString.CopyFrom(binaryBytes),
    Type = "CustomType",
    // ...
};

// Deserialize
using var ms = new MemoryStream(packet.Content.ToByteArray());
var formatter = new BinaryFormatter();
var customMessage = (CustomType)formatter.Deserialize(ms);
```

### XML Serialization

```csharp
using System.Xml.Serialization;

// Serialize
var xmlSerializer = new XmlSerializer(typeof(CustomType));
using var stringWriter = new StringWriter();
xmlSerializer.Serialize(stringWriter, customMessage);
byte[] xmlBytes = Encoding.UTF8.GetBytes(stringWriter.ToString());

var packet = new Packet
{
    Content = ByteString.CopyFrom(xmlBytes),
    Type = "CustomType",
    // ...
};

// Deserialize
string xmlString = Encoding.UTF8.GetString(packet.Content.ToByteArray());
using var stringReader = new StringReader(xmlString);
var customMessage = (CustomType)xmlSerializer.Deserialize(stringReader);
```

## Message Type Registry Pattern

For larger applications, implement a message type registry:

```csharp
public interface ICustomMessageHandler
{
    string MessageType { get; }
    void Process(byte[] content);
}

public class CustomTypeHandler : ICustomMessageHandler
{
    public string MessageType => "CustomType";
    
    public void Process(byte[] content)
    {
        string jsonString = Encoding.UTF8.GetString(content);
        var message = JsonSerializer.Deserialize<CustomType>(jsonString);
        
        // Process your custom message
        Console.WriteLine($"Processing {message.Source}: {message.Value} {message.Unit}");
    }
}

public class MessageRegistry
{
    private readonly Dictionary<string, ICustomMessageHandler> _handlers = new();
    
    public void Register(ICustomMessageHandler handler)
    {
        _handlers[handler.MessageType] = handler;
    }
    
    public void ProcessPacket(Packet packet)
    {
        if (_handlers.TryGetValue(packet.Type, out var handler))
        {
            handler.Process(packet.Content.ToByteArray());
        }
        else
        {
            Console.WriteLine($"Unknown message type: {packet.Type}");
        }
    }
}

// Usage
var registry = new MessageRegistry();
registry.Register(new CustomTypeHandler());

// Process incoming packets
foreach (var response in packetResponses)
{
    registry.ProcessPacket(response.Packet);
}
```

## Best Practices

### 1. **Use Consistent Type Names**
```csharp
public static class MessageTypes
{
    public const string CustomType = "CustomType";
    public const string SensorData = "SensorData";
    public const string AlertMessage = "AlertMessage";
}

var packet = new Packet
{
    Type = MessageTypes.CustomType,
    // ...
};
```

### 2. **Handle Deserialization Errors**
```csharp
private CustomType DeserializeCustomMessage(byte[] content)
{
    try
    {
        string jsonString = Encoding.UTF8.GetString(content);
        return JsonSerializer.Deserialize<CustomType>(jsonString);
    }
    catch (JsonException ex)
    {
        Console.WriteLine($"Deserialization failed: {ex.Message}");
        return null;
    }
}
```

## Key Takeaways

1. **Flexible Content**: The `Packet.Content` field accepts any byte array, allowing you to use any serialization format
2. **Type Identification**: Use the `Packet.Type` field to identify your custom message types
3. **Any Serializer**: Choose JSON for readability, MessagePack for performance, or any other serialization library
4. **Standard Protocol**: The packet structure itself uses Protocol Buffers, but your message content is completely flexible
5. **Type Safety**: Implement a message registry pattern for handling multiple custom types in a type-safe manner

## See Also

- [API Reference](../reference/api-reference.md)
- [Packet Writer Service](../services/packet-writer.md)
- [Packet Reader Service](../services/packet-reader.md)
- [Telemetry Example](telemetry-example.md)
