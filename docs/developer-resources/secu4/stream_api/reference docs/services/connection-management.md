# Connection Management Service

The Connection Management Service handles client connections to data sessions with unique connection tracking and efficient resource management.

## Overview

Connections represent individual client access points to data streams. The service provides:

- Unique connection ID assignment for tracking
- Connection validation and authentication
- Real-time connection state management
- Automatic cleanup of inactive connections

## Key Features

### Connection Lifecycle
- **Creation**: Establish new connections with validation
- **Tracking**: Monitor connection state and activity
- **Validation**: Ensure connection integrity
- **Cleanup**: Automatic resource deallocation

### Stream Management
- Multiple stream subscription per connection
- Flexible offset management for each stream
- Main stream inclusion/exclusion options
- Dynamic stream addition and removal

### Resource Optimization
- Connection pooling for efficiency
- Automatic timeout handling
- Memory-efficient connection tracking
- Optional Prometheus metrics integration (requires admin privileges)

## Usage Examples

### Basic Connection Operations

```csharp
var connectionManager = StreamingApiClient.GetConnectionManagerClient();

// Create new connection
var connection = await connectionManager.NewConnectionAsync(new NewConnectionRequest
{
    Details = new ConnectionDetails
    {
        DataSource = "vehicle-telemetry",
        SessionKey = "race-session-2024-001",
        Streams = { "engine", "brakes", "suspension", "aerodynamics" },
        StreamOffsets = { 0, 0, 0, 0 }, // Start from beginning
        ExcludeMainStream = false
    }
});

Console.WriteLine($"Connection created with ID: {connection.Connection.Id}");
```

### Connection Information Retrieval

```csharp
// Retrieve connection details
var connectionInfo = await connectionManager.GetConnectionAsync(new GetConnectionRequest
{
    Connection = new Connection { Id = connectionId }
});

if (connectionInfo.Details != null)
{
    Console.WriteLine($"Data Source: {connectionInfo.Details.DataSource}");
    Console.WriteLine($"Session: {connectionInfo.Details.SessionKey}");
    Console.WriteLine($"Streams: {string.Join(", ", connectionInfo.Details.Streams)}");
}
```

### Connection Termination

```csharp
// Close connection properly
var closeResult = await connectionManager.CloseConnectionAsync(new CloseConnectionRequest
{
    Connection = new Connection { Id = connectionId }
});

if (closeResult.Success)
{
    Console.WriteLine("Connection closed successfully");
}
else
{
    Console.WriteLine("Failed to close connection");
}
```

## Advanced Configuration

### Stream Offset Management

```csharp
// Connect with specific offsets for each stream
var connection = await connectionManager.NewConnectionAsync(new NewConnectionRequest
{
    Details = new ConnectionDetails
    {
        DataSource = "historical-data",
        SessionKey = "replay-session-001",
        Streams = { "engine", "brakes" },
        StreamOffsets = { 1000, 500 }, // Resume from specific positions
        ExcludeMainStream = true // Skip main data stream
    }
});
```

### Multi-Stream Subscriptions

```csharp
// Subscribe to multiple related streams
var connection = await connectionManager.NewConnectionAsync(new NewConnectionRequest
{
    Details = new ConnectionDetails
    {
        DataSource = "comprehensive-telemetry",
        SessionKey = "test-session-001",
        Streams = 
        { 
            "engine-rpm", "engine-temp", "engine-pressure",
            "brake-temp-fl", "brake-temp-fr", "brake-temp-rl", "brake-temp-rr",
            "suspension-travel-fl", "suspension-travel-fr"
        },
        StreamOffsets = new long[9], // All zeros - start from beginning
        ExcludeMainStream = false
    }
});
```

### Connection Validation

```csharp
// Validate connection before use
private async Task<bool> ValidateConnection(long connectionId)
{
    try
    {
        var connectionInfo = await connectionManager.GetConnectionAsync(new GetConnectionRequest
        {
            Connection = new Connection { Id = connectionId }
        });
        
        return connectionInfo.Details != null;
    }
    catch (RpcException ex) when (ex.StatusCode == StatusCode.NotFound)
    {
        return false;
    }
}
```

## Connection Patterns

### Single-Use Connections

```csharp
// Pattern for short-lived connections
public async Task ProcessQuickData()
{
    NewConnectionResponse connection = null;
    try
    {
        connection = await connectionManager.NewConnectionAsync(request);
        
        // Process data quickly
        await ProcessData(connection.Connection);
    }
    finally
    {
        if (connection != null)
        {
            await connectionManager.CloseConnectionAsync(new CloseConnectionRequest
            {
                Connection = connection.Connection
            });
        }
    }
}
```

### Long-Running Connections

```csharp
// Pattern for persistent connections
public class TelemetryProcessor
{
    private Connection? activeConnection;
    private readonly ConnectionManagerService.ConnectionManagerServiceClient connectionManager;
    
    public async Task StartProcessing()
    {
        var connectionResponse = await connectionManager.NewConnectionAsync(request);
        activeConnection = connectionResponse.Connection;
        
        // Long-running processing...
    }
    
    public async Task StopProcessing()
    {
        if (activeConnection != null)
        {
            await connectionManager.CloseConnectionAsync(new CloseConnectionRequest
            {
                Connection = activeConnection
            });
            activeConnection = null;
        }
    }
}
```

### Connection Pooling

```csharp
// Connection pool implementation
public class ConnectionPool
{
    private readonly ConcurrentQueue<Connection> availableConnections = new();
    private readonly ConnectionManagerService.ConnectionManagerServiceClient connectionManager;
    
    public async Task<Connection> GetConnection()
    {
        if (availableConnections.TryDequeue(out var connection))
        {
            // Validate connection is still active
            if (await ValidateConnection(connection.Id))
            {
                return connection;
            }
        }
        
        // Create new connection
        var newConnection = await connectionManager.NewConnectionAsync(request);
        return newConnection.Connection;
    }
    
    public void ReturnConnection(Connection connection)
    {
        availableConnections.Enqueue(connection);
    }
}
```

## Configuration (Optional)

### Connection Metrics

If Prometheus is enabled with admin privileges, monitor connection health:

- `stream_api_connections_total`: Number of active connections in the stream API
- `stream_api_data_packets_read_total`: Number of packets read and ready to deliver (by connection, data source, stream)
- `stream_api_data_packets_delivered_total`: Number of packets delivered (by connection, data source, stream)
- `stream_api_essential_packets_read_total`: Number of essential packets read (by connection, data source)
- `stream_api_essential_packets_delivered_total`: Number of essential packets delivered (by connection, data source)
- `stream_api_router_messages_received_total`: Total messages received from router (by connection, data source, stream, session key)
- `stream_api_router_messages_received_bytes_total`: Total message bytes received from router (by connection, data source, stream, session key)

## Error Handling

### Common Connection Errors

```csharp
try
{
    var connection = await connectionManager.NewConnectionAsync(request);
}
catch (RpcException ex)
{
    switch (ex.StatusCode)
    {
        case StatusCode.InvalidArgument:
            // Invalid connection parameters
            Console.WriteLine("Invalid connection request");
            break;
            
        case StatusCode.ResourceExhausted:
            // Too many connections
            Console.WriteLine("Connection limit reached");
            break;
            
        case StatusCode.FailedPrecondition:
            // Session not found or invalid
            Console.WriteLine("Session validation failed");
            break;
            
        case StatusCode.Unavailable:
            // Service temporarily unavailable
            Console.WriteLine("Service unavailable, retry later");
            break;
            
        default:
            Console.WriteLine($"Unexpected error: {ex.Message}");
            break;
    }
}
```

### Connection Recovery

```csharp
// Automatic connection recovery
public async Task<Connection> GetOrCreateConnection()
{
    if (currentConnection != null)
    {
        try
        {
            // Test connection
            await connectionManager.GetConnectionAsync(new GetConnectionRequest
            {
                Connection = currentConnection
            });
            
            return currentConnection; // Connection is valid
        }
        catch (RpcException ex) when (ex.StatusCode == StatusCode.NotFound)
        {
            // Connection lost, create new one
            currentConnection = null;
        }
    }
    
    // Create new connection
    var newConnection = await connectionManager.NewConnectionAsync(connectionRequest);
    currentConnection = newConnection.Connection;
    return currentConnection;
}
```

## Best Practices

### Resource Management
- Always close connections when done
- Use `using` statements for automatic cleanup
- Monitor connection count and duration

### Error Handling
- Implement retry logic for transient failures
- Validate connections before critical operations
- Handle connection loss gracefully

### Performance
- Reuse connections when possible
- Use connection pooling for high-frequency access

## See Also

- [Session Management Service](session-management.md)
- [Packet Reader Service](packet-reader.md)
- [Configuration Guide](../configuration/server-config.md)