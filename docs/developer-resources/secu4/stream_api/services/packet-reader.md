# Packet Reader Service

The Packet Reader Service provides high-performance data consumption from Kafka topics with support for real-time streaming and historical data replay.

## Overview

The service offers flexible data consumption modes:

- **All packets**: Continuous consumption of all packet types via `ReadPackets`
- **Essential packets**: Read only configuration and metadata via `ReadEssentials`
- **Filtered data packets**: Consume specific parameters using regex patterns via `ReadDataPackets`
- **Real-time streaming**: Continuous data consumption from live streams

## Key Features

### Reading Modes
- **ReadPackets**: Continuous streaming of all packet types
- **ReadEssentials**: Essential packets only (config, metadata)
- **ReadDataPackets**: Filtered data packets using regex patterns
- Multi-connection support for parallel processing

### Performance
- Low-latency data delivery
- Efficient memory usage
- Connection pooling
- Backpressure handling

## Usage Examples

### Basic Stream Reading

```csharp
var packetReader = StreamingApiClient.GetPacketReaderClient();

// Start reading all packets from a connection
var readRequest = new ReadPacketsRequest
{
    Connection = connection.Connection
};

var stream = packetReader.ReadPackets(readRequest);

while (await stream.ResponseStream.MoveNext())
{
    var response = stream.ResponseStream.Current;
    foreach (var packet in response.Response)
    {
        Console.WriteLine($"Received: {packet.Packet.Type} from {packet.Stream}");
        ProcessPacket(packet.Packet);
    }
}
```

### Reading Essential Packets

```csharp
// Read only essential packets (configuration, metadata, etc.)
var essentialsRequest = new ReadEssentialsRequest
{
    Connection = connection.Connection
};

var stream = packetReader.ReadEssentials(essentialsRequest);

while (await stream.ResponseStream.MoveNext())
{
    var response = stream.ResponseStream.Current;
    foreach (var packet in response.Response)
    {
        Console.WriteLine($"Essential packet: {packet.Packet.Type}");
        ProcessEssentialPacket(packet.Packet);
    }
}
```

### Filtered Data Packet Reading

```csharp
// Read data packets with specific parameters (supports regex patterns)
var dataPacketRequest = new ReadDataPacketsRequest
{
    Request = new DataPacketRequest
    {
        Connection = connection.Connection,
        IncludeParameters = { "vCar.*", ".*Temp.*", "NGear.*" },
        ExcludeParameters = { ".*Debug.*" }
    }
};

var stream = packetReader.ReadDataPackets(dataPacketRequest);

while (await stream.ResponseStream.MoveNext())
{
    var response = stream.ResponseStream.Current;
    foreach (var packet in response.Response)
    {
        // Only data packets matching the filter
        ProcessDataPacket(packet.Packet);
    }
}
```

## Advanced Features

### Parameter Filtering with Regex

```csharp
// Include all engine-related parameters, exclude calibration data
var dataRequest = new ReadDataPacketsRequest
{
    Request = new DataPacketRequest
    {
        Connection = connection.Connection,
        IncludeParameters = 
        { 
            "NEngine.*",      // All engine parameters
            "TEngine.*",      // Engine temperature
            "PEngine.*"       // Engine pressure
        },
        ExcludeParameters = 
        { 
            ".*Calibration.*",  // Exclude calibration
            ".*Raw.*"           // Exclude raw data
        }
    }
};

var stream = packetReader.ReadDataPackets(dataRequest);
```

### Combined Reading Strategies

```csharp
// Read essentials and filtered data packets concurrently
var essentialsTask = Task.Run(async () =>
{
    var stream = packetReader.ReadEssentials(new ReadEssentialsRequest
    {
        Connection = connection.Connection
    });
    
    while (await stream.ResponseStream.MoveNext())
    {
        var response = stream.ResponseStream.Current;
        foreach (var packet in response.Response)
        {
            ProcessEssentialPacket(packet.Packet);
        }
    }
});

var dataTask = Task.Run(async () =>
{
    var stream = packetReader.ReadDataPackets(new ReadDataPacketsRequest
    {
        Request = new DataPacketRequest
        {
            Connection = connection.Connection,
            IncludeParameters = { "vCar.*", "NGear.*" }
        }
    });
    
    while (await stream.ResponseStream.MoveNext())
    {
        var response = stream.ResponseStream.Current;
        foreach (var packet in response.Response)
        {
            ProcessDataPacket(packet.Packet);
        }
    }
});

await Task.WhenAll(essentialsTask, dataTask);
```

## Best Practices

- Handle backpressure appropriately
- Implement proper error recovery
- Monitor consumer lag
- Use appropriate buffer sizes

## See Also

- [Packet Writer Service](packet-writer.md)
- [Connection Management](connection-management.md)
- [Examples](../examples/telemetry-example.md)