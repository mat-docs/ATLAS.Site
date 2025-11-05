# Packet Writer Service

The Packet Writer Service enables high-performance data publishing to Kafka topics with support for both individual packets and batch operations.

## Overview

The service provides multiple writing modes optimized for different use cases:

- **Single packet writing**: For low-frequency, critical data
- **Batch operations**: For high-throughput scenarios
- **Essential packet handling**: For critical data that requires special routing
- **Stream-based routing**: Automatic topic/partition selection

## Key Features

### Writing Modes
- Individual packet writing with immediate publishing
- Batch writing for optimal throughput
- Streaming writes for continuous data flows
- Essential packet routing for critical data

### Performance Optimization
- Asynchronous operations for non-blocking writes
- Internal buffering for batch efficiency
- Connection pooling and reuse
- Optional Prometheus metrics for monitoring (requires admin privileges)

## Usage Examples

### Single Packet Writing

```csharp
var packetWriter = StreamingApiClient.GetPacketWriterClient();

// Write individual telemetry packet
await packetWriter.WriteDataPacketAsync(new WriteDataPacketRequest
{
    Detail = new DataPacketDetails
    {
        DataSource = "vehicle-telemetry",
        Stream = "engine",
        SessionKey = "race-session-2024-001",
        Message = new Packet
        {
            Content = ByteString.CopyFrom(engineData),
            Type = "PeriodicData",
            IsEssential = false
        }
    }
});
```

### Batch Writing

```csharp
// High-throughput batch writing
var batchStream = packetWriter.WriteDataPackets();

try
{
    for (int i = 0; i < 1000; i++)
    {
        await batchStream.RequestStream.WriteAsync(new WriteDataPacketsRequest
        {
            Details = 
            {
                new DataPacketDetails
                {
                    DataSource = "high-frequency-sensors",
                    Stream = "accelerometers",
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
    await batchStream.RequestStream.CompleteAsync();
}
```

### Essential Packet Writing

```csharp
// Write critical system events
await packetWriter.WriteDataPacketAsync(new WriteDataPacketRequest
{
    Detail = new DataPacketDetails
    {
        DataSource = "system-events",
        Stream = "", // Writes to the main stream
        SessionKey = sessionKey,
        Message = new Packet
        {
            Content = ByteString.CopyFrom(criticalEventData),
            Type = "Event",
            IsEssential = true // Ensures special routing and persistence
        }
    }
});
```

## Advanced Usage

### Multi-Stream Writing

```csharp
// Write to multiple streams simultaneously
var tasks = new List<Task>();

// Engine data
tasks.Add(packetWriter.WriteDataPacketAsync(new WriteDataPacketRequest
{
    Detail = new DataPacketDetails
    {
        DataSource = "telemetry",
        Stream = "engine",
        SessionKey = sessionKey,
        Message = CreateEnginePacket(engineData)
    }
}));

// Brake data
tasks.Add(packetWriter.WriteDataPacketAsync(new WriteDataPacketRequest
{
    Detail = new DataPacketDetails
    {
        DataSource = "telemetry", 
        Stream = "brakes",
        SessionKey = sessionKey,
        Message = CreateBrakePacket(brakeData)
    }
}));

// Wait for all writes to complete
await Task.WhenAll(tasks);
```

### Structured Data Writing

```csharp
// Write structured telemetry data
public async Task WriteVehicleState(VehicleState state)
{
    var packet = new Packet
    {
        Content = ByteString.CopyFrom(JsonSerializer.SerializeToUtf8Bytes(new
        {
            timestamp = state.Timestamp.Ticks,
            vehicle_id = state.VehicleId,
            position = new 
            {
                latitude = state.Position.Latitude,
                longitude = state.Position.Longitude,
                altitude = state.Position.Altitude
            },
            dynamics = new
            {
                speed = state.Speed,
                heading = state.Heading,
                acceleration = state.Acceleration
            }
        })),
        Type = "VehicleState",
        SessionKey = state.SessionKey
    };

    await packetWriter.WriteDataPacketAsync(new WriteDataPacketRequest
    {
        Detail = new DataPacketDetails
        {
            DataSource = "vehicle-tracking",
            Stream = "position",
            SessionKey = state.SessionKey,
            Message = packet
        }
    });
}
```

### High-Performance Streaming

```csharp
// Continuous data streaming pattern
public class ContinuousDataStreamer
{
    private readonly PacketWriterService.PacketWriterServiceClient packetWriter;
    private AsyncClientStreamingCall<WriteDataPacketsRequest, WriteDataPacketsResponse>? streamWriter;
    
    public async Task StartStreaming()
    {
        streamWriter = packetWriter.WriteDataPackets();
        
        // Continuous streaming loop
        while (isStreaming)
        {
            var data = await GetNextDataPoint();
            
            await streamWriter.RequestStream.WriteAsync(new WriteDataPacketsRequest
            {
                Details = 
                {
                    new DataPacketDetails
                    {
                        DataSource = "continuous-stream",
                        Stream = "sensor-data",
                        SessionKey = sessionKey,
                        Message = new Packet
                        {
                            Content = ByteString.CopyFrom(data),
                            Type = "PeriodicData"
                        }
                    }
                }
            });
        }
        
        await streamWriter.RequestStream.CompleteAsync();
    }
}
```

## Data Types and Packet Structure

### Packet Types

```csharp
// Different packet types for different data
public enum PacketType
{
    PeriodicData,    // Regular sensor readings
    Event,           // Discrete events (lap start, gear change)
    Marker,          // Time markers and annotations
    Config,          // Configuration changes
    Alert            // System alerts and warnings
}
```

### Packet Content Formats

```csharp
// Protocol Buffer packet
var protoData = new TelemetryData { /* populate fields */ };
var protoPacket = new Packet
{
    Content = protoData.ToByteString(),
    Type = "ProtobufData"
};
```

## Performance Optimization

### Batching Strategies

```csharp
// Time-based batching
public class TimeBatchedWriter
{
    private readonly List<WriteDataPacketsRequest> batch = new();
    private readonly Timer batchTimer;
    
    public TimeBatchedWriter()
    {
        batchTimer = new Timer(FlushBatch, null, TimeSpan.FromMilliseconds(100), 
            TimeSpan.FromMilliseconds(100));
    }
    
    public void QueueWrite(WriteDataPacketsRequest request)
    {
        lock (batch)
        {
            batch.Add(request);
            
            // Size-based flushing
            if (batch.Count >= 100)
            {
                FlushBatch(null);
            }
        }
    }
    
    private async void FlushBatch(object? state)
    {
        List<WriteDataPacketsRequest> toFlush;
        lock (batch)
        {
            if (batch.Count == 0) return;
            
            toFlush = new List<WriteDataPacketsRequest>(batch);
            batch.Clear();
        }
        
        var batchStream = packetWriter.WriteDataPackets();
        try
        {
            foreach (var request in toFlush)
            {
                await batchStream.RequestStream.WriteAsync(request);
            }
        }
        finally
        {
            await batchStream.RequestStream.CompleteAsync();
        }
    }
}
```

### Connection Reuse

```csharp
// Reuse streaming connections for better performance
public class OptimizedPacketWriter
{
    private AsyncClientStreamingCall<WriteDataPacketsRequest, WriteDataPacketsResponse>? currentStream;
    private readonly SemaphoreSlim streamLock = new(1, 1);
    
    public async Task WritePacketOptimized(WriteDataPacketsRequest request)
    {
        await streamLock.WaitAsync();
        try
        {
            if (currentStream == null)
            {
                currentStream = packetWriter.WriteDataPackets();
            }
            
            await currentStream.RequestStream.WriteAsync(request);
        }
        finally
        {
            streamLock.Release();
        }
    }
    
    public async Task FlushAndClose()
    {
        await streamLock.WaitAsync();
        try
        {
            if (currentStream != null)
            {
                await currentStream.RequestStream.CompleteAsync();
                currentStream = null;
            }
        }
        finally
        {
            streamLock.Release();
        }
    }
}
```

## Error Handling

### Retry Mechanisms

```csharp
// Robust writing with retry logic
public async Task WriteWithRetry(WriteDataPacketRequest request, int maxRetries = 3)
{
    for (int attempt = 0; attempt <= maxRetries; attempt++)
    {
        try
        {
            await packetWriter.WriteDataPacketAsync(request);
            return; // Success
        }
        catch (RpcException ex) when (attempt < maxRetries)
        {
            switch (ex.StatusCode)
            {
                case StatusCode.Unavailable:
                case StatusCode.DeadlineExceeded:
                    // Transient errors - retry
                    await Task.Delay(TimeSpan.FromMilliseconds(100 * Math.Pow(2, attempt)));
                    break;
                    
                default:
                    // Non-retryable error
                    throw;
            }
        }
    }
}
```

### Error Recovery

```csharp
// Handle streaming errors gracefully
public async Task WriteStreamWithRecovery(IEnumerable<WriteDataPacketsRequest> requests)
{
    var requestQueue = new Queue<WriteDataPacketsRequest>(requests);
    
    while (requestQueue.Count > 0)
    {
        var stream = packetWriter.WriteDataPackets();
        try
        {
            // Write batch
            while (requestQueue.Count > 0)
            {
                var request = requestQueue.Dequeue();
                await stream.RequestStream.WriteAsync(request);
            }
            
            await stream.RequestStream.CompleteAsync();
        }
        catch (RpcException ex)
        {
            // Log error and retry remaining requests
            Console.WriteLine($"Stream error: {ex.Message}, retrying {requestQueue.Count} requests");
            await Task.Delay(1000); // Wait before retry
        }
    }
}
```

## Monitoring (Optional)

### Performance Metrics

If Prometheus is enabled with admin privileges, the following metrics are available:

- `stream_api_data_packets_published_total`: Number of data packets published (by data source, stream)
- `stream_api_info_packets_published_total`: Number of info packets published (by data source)
- `stream_api_data_packets_routed_total`: Number of data packets routed by router (by data source, stream)
- `stream_api_data_packets_routed_bytes_total`: Total bytes of data packets routed (by data source, stream)
- `stream_api_info_packets_routed_total`: Number of info packets routed by router (by data source)
- `stream_api_info_packets_routed_bytes_total`: Total bytes of info packets routed (by data source)

Example usage:

```csharp
// Metrics are automatically tracked by the service when Prometheus is enabled
public class MetricsCollector
{
    private readonly Counter packetsWritten = Metrics
        .CreateCounter("packets_written_total", "Total packets written");
    
    private readonly Histogram writeLatency = Metrics
        .CreateHistogram("packet_write_duration_seconds", "Packet write latency");
    
    public async Task WriteWithMetrics(WriteDataPacketRequest request)
    {
        using var timer = writeLatency.NewTimer();
        
        try
        {
            await packetWriter.WriteDataPacketAsync(request);
            packetsWritten.Inc();
        }
        catch
        {
            // Handle errors
            throw;
        }
    }
}
```

## Best Practices

### Data Organization
- Use consistent packet types for similar data
- Include timestamps in packet content
- Validate data before writing
- Use appropriate stream names for logical grouping

### Performance
- Use batch writing for high-frequency data
- Implement appropriate retry mechanisms
- Monitor write latency and throughput
- Consider data compression for large packets

### Reliability
- Mark critical data as essential
- Implement proper error handling
- Use structured logging for debugging
- Monitor system resources

## See Also

- [Packet Reader Service](packet-reader.md)
- [Data Format Management](data-format-management.md)