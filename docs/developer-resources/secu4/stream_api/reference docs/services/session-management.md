# Session Management Service

The Session Management Service handles the complete lifecycle of data sessions, including creation, monitoring, and termination.

## Overview

Sessions represent logical groupings of data streams with associated metadata. The service provides:

- Session creation with custom metadata
- Real-time session state tracking
- Automatic session cleanup and resource management
- Session information updates during runtime

## Key Features

### Session Lifecycle Management
- **Creation**: Initialize new sessions with metadata
- **Monitoring**: Track session state and activity
- **Updates**: Modify session information during runtime
- **Termination**: Clean shutdown with proper resource cleanup

### Metadata Support
- Custom session types and versions
- Associated participant information
- Dynamic key-value properties
- Hierarchical session relationships

### Integration
- Automatic integration with other Stream API services
- Event-driven architecture for real-time updates
- Optional Prometheus metrics for monitoring (requires admin privileges)

## Usage Examples

### Basic Session Operations

```csharp
var sessionManager = StreamingApiClient.GetSessionManagerClient();

// Create a new session
var newSessionResponse = sessionManager.CreateSession(new CreateSessionRequest
{
    DataSource = DataSource,
    Type = "Session",
    Version = 1,
    UtcOffset = new Google.Protobuf.WellKnownTypes.Duration { Seconds = 0 },
    Identifier = "silverstone-gp-2024",
    Details = {
        {"track", "Silverstone Circuit"},
        {"weather", "dry"},
        {"temperature", "22°C"}
    }
});
```

### Session Information Updates

```csharp
// Update session information during runtime
 await sessionManager.UpdateSessionDetailsAsync(new UpdateSessionDetailsRequest
 {
     SessionKey = "race-session-2024-001",
     Details = {
             {"status", "active"},
             {"participant", "driver-hamilton"},
             {"lap_count", "15"},
             {"sector_time", "1:23.456"}
         }
 });
```

### Session Termination

```csharp
// End session with proper cleanup
await sessionManager.EndSessionAsync(new EndSessionRequest
{
    SessionKey = "race-session-2024-001",
    DataSource = "DataSource"
});
```

## Advanced Features

### Session Hierarchies

```csharp
// Create child sessions
var associateSession = await sessionManager.CreateSessionAsync(
    new CreateSessionRequest
    {
        DataSource = "DataSource",
        Details =
        {
            {
                "track", "Silverstone Circuit"
            },
            {
                "weather", "dry"
            },
            {
                "temperature", "22°C"
            }
        },
        Identifier = "associate_session",
        Type = "Session",
        UtcOffset = new Duration
        {
            Seconds = 0
        },
        Version = 1
    });

// Create a parent session
var parentSession = await sessionManager.CreateSessionAsync(
    new CreateSessionRequest
    {
        DataSource = "DataSource",
        Details =
        {
            {
                "track", "Silverstone Circuit"
            },
            {
                "weather", "dry"
            },
            {
                "temperature", "22°C"
            }
        },
        Identifier = "main_sesssion",
        Type = "Session",
        UtcOffset = new Duration
        {
            Seconds = 0
        },
        Version = 1,
        AssociateSessionKey =
        {
            associateSession.SessionKey
        }
    });
```

### Session Queries

```csharp
// Get session information
var sessionInfo = await sessionManager.GetSessionInfoAsync(
    new GetSessionInfoRequest
    {
        SessionKey = "session_key"
    });

// List all sessions
var activeSessions = await sessionManager.GetCurrentSessionsAsync(new GetCurrentSessionsRequest());
```

### Session Notifications

The Session Management Service provides real-time notification streams that push updates whenever sessions are created or stopped. These notification methods create persistent streams that remain open and deliver notifications as session events occur.

#### Session Start Notifications

Subscribe to receive notifications when new sessions are created for a specific data source:

```csharp
var sessionManager = StreamingApiClient.GetSessionManagementClient();

// Create a streaming call to receive session start notifications
var startNotificationStream = sessionManager.GetSessionStartNotification(
    new GetSessionStartNotificationRequest
    {
        DataSource = "DataSource"
    });

// Process notifications as they arrive
await foreach (var notification in startNotificationStream.ResponseStream.ReadAllAsync())
{
    Console.WriteLine($"New session started:");
    Console.WriteLine($"  Data Source: {notification.DataSource}");
    Console.WriteLine($"  Session Key: {notification.SessionKey}");
    
    // Handle the new session (e.g., create connections, start monitoring)
    await HandleNewSession(notification.SessionKey, notification.DataSource);
}
```

#### Session Stop Notifications

Subscribe to receive notifications when sessions are terminated:

```csharp
var sessionManager = StreamingApiClient.GetSessionManagementClient();

// Create a streaming call to receive session stop notifications
var stopNotificationStream = sessionManager.GetSessionStopNotification(
    new GetSessionStopNotificationRequest
    {
        DataSource = "DataSource"
    });

// Process notifications as they arrive
await foreach (var notification in stopNotificationStream.ResponseStream.ReadAllAsync())
{
    Console.WriteLine($"Session stopped:");
    Console.WriteLine($"  Data Source: {notification.DataSource}");
    Console.WriteLine($"  Session Key: {notification.SessionKey}");
    
    // Handle session termination (e.g., cleanup resources, close connections)
    await HandleSessionTermination(notification.SessionKey, notification.DataSource);
}
```

#### Combined Notification Monitoring

Monitor both session start and stop events concurrently:

```csharp
var sessionManager = StreamingApiClient.GetSessionManagementClient();
var cancellationToken = new CancellationToken();

// Start monitoring session lifecycle
var startTask = Task.Run(async () =>
{
    var stream = sessionManager.GetSessionStartNotification(
        new GetSessionStartNotificationRequest { DataSource = "DataSource" });
    
    await foreach (var notification in stream.ResponseStream.ReadAllAsync(cancellationToken))
    {
        await OnSessionStarted(notification.SessionKey, notification.DataSource);
    }
}, cancellationToken);

var stopTask = Task.Run(async () =>
{
    var stream = sessionManager.GetSessionStopNotification(
        new GetSessionStopNotificationRequest { DataSource = "DataSource" });
    
    await foreach (var notification in stream.ResponseStream.ReadAllAsync(cancellationToken))
    {
        await OnSessionStopped(notification.SessionKey, notification.DataSource);
    }
}, cancellationToken);

// Wait for both monitoring tasks
await Task.WhenAll(startTask, stopTask);
```

#### Notification Behavior

- **Persistent Streams**: Once established, notification streams remain open and continuously deliver events
- **Real-time Delivery**: Notifications are pushed immediately when sessions are created or stopped
- **Data Source Filtering**: Each notification stream is scoped to a specific data source
- **No Historical Events**: Only new events that occur after the stream is established are delivered
- **Automatic Reconnection**: If the stream is disconnected, the client must re-establish the connection to continue receiving notifications

#### Use Cases

Session notifications are particularly useful for:

- **Session Discovery**: Automatically detect and connect to new sessions as they are created
- **Resource Management**: Clean up resources when sessions terminate
- **Monitoring Dashboards**: Display real-time session activity
- **Automated Testing**: Coordinate test scenarios based on session lifecycle events
- **Multi-client Coordination**: Synchronize multiple clients working with the same data sources

## Configuration

### Enable Session Management

```json
{
  "IntegrateSessionManagement": true,
}
```

## Best Practices
### Session Key
- Session Key is automatically allocated when the session is created.
- The session key can be retreived by taking the result of the CreateNewSessionRequest call.
```csharp
var newSessionResponse = sessionManager.CreateSession(new CreateSessionRequest
{
    DataSource = "DataSource",
    Type = "Session",
    Version = 1,
    UtcOffset = new Google.Protobuf.WellKnownTypes.Duration { Seconds = 0 },
    Identifier = "silverstone-gp-2024",
    Details = {
        {"track", "Silverstone Circuit"},
        {"weather", "dry"},
        {"temperature", "22°C"}
    }
});

var sessionKey = newSession.SessionKey;
```


## Monitoring (Optional)

### Metrics

If Prometheus is enabled with admin privileges, the service exposes metrics:

- `stream_api_sessions_total`: Number of sessions available

## See Also

- [Connection Management Service](connection-management.md)
- [Configuration Guide](../configuration/server-config.md)
- [Telemetry Example](../examples/telemetry-example.md)