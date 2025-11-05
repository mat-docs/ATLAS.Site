# Session Manager Module

## Overview

The Session Manager Module is one of the two independent core modules in the Support Library. It provides comprehensive session lifecycle management, including session creation, metadata management, session associations, and real-time notifications for session state changes.

## Key Features

- **Session Creation**: Create new sessions with custom metadata and identifiers
- **Session Lifecycle**: Track live sessions from creation to completion
- **Metadata Management**: Attach and update custom key-value details to sessions
- **Session Associations**: Link related sessions (e.g., linking multiple data collection sessions)
- **Real-time Events**: Subscribe to session lifecycle events
- **Historical Sessions**: Mark sessions as complete and maintain session history
- **Session Querying**: Retrieve all sessions or specific session information

## API Access

### Get the Session Manager API

```csharp
var sessionManagerApi = supportLibApi.GetSessionManagerApi();

```

### Create a Service Instance

```csharp
var serviceResult = sessionManagerApi.CreateService();

if (serviceResult.Success && serviceResult.Data != null)
{
    var sessionService = serviceResult.Data;
    
    // Initialize and start the service
    sessionService.Initialise();
    sessionService.Start();
}

```

## Core Concepts

### Session Information

Each session contains:

- **SessionKey**: Unique identifier for the session (auto-generated)
- **DataSource**: The data source name (e.g., car identifier, system name)
- **Identifier**: User-defined session identifier
- **Type**: Session type (e.g., "session", "virtual", "vtag")
- **Version**: Session version number
- **Historical**: Boolean indicating if session is complete
- **UtcOffset**: Time zone offset for the session
- **Details**: Dictionary of custom metadata (key-value pairs)
- **AssociateSessionKeys**: List of associated session keys

### Session States

Sessions can be in one of two states:

1. **Live Session**: Currently active, `Historical = false`
2. **Historical Session**: Completed session, `Historical = true`

## Methods

### CreateNewSession

Creates a new session with specified metadata.

```csharp
public ApiResult<ISessionInfo?> CreateNewSession(SessionCreationDto createSessionDto)

```

**Parameters:**

```csharp
var sessionDto = new SessionCreationDto(
    dataSource: "DataSource_A",            // Required: Data source identifier
    identifier: "Session_001",             // Optional: Session identifier
    type: "Session",                       // Optional: Session type (Session, VirtualSession, VTS)
    version: 1,                            // Optional: Version number (default: 1)
    utcOffset: TimeSpan.FromHours(1),     // Optional: UTC offset (default: local)
    details: new[] {                       // Optional: Custom metadata
        new SessionDetailDto("Location", "BuildingB"),
        new SessionDetailDto("Equipment", "Sensor_v2"),
        new SessionDetailDto("Operator", "User_42")
    },
    associatedSessionKeys: new[] {         // Optional: Related session GUIDs
        "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    }
);

var result = sessionService.CreateNewSession(sessionDto);

```

**Example:**

```csharp
var result = sessionService.CreateNewSession(
    new SessionCreationDto(
        dataSource: "DataSourceX",
        identifier: Guid.NewGuid().ToString(),
        type: "VirtualSession",
        version: 1,
        details: new[] {
            new SessionDetailDto("CollectionId", "C12345"),
            new SessionDetailDto("BatchNumber", "B789")
        }
    ));

if (result.Success && result.Data != null)
{
    var sessionKey = result.Data.SessionKey;
    Console.WriteLine($"Session created: {sessionKey}");
}

```

### GetSessionInfo

Retrieves detailed information about a specific session.

```csharp
public ApiResult<ISessionInfo?> GetSessionInfo(string dataSource, string sessionKey)

```

**Example:**

```csharp
var result = sessionService.GetSessionInfo("MyDataSource", sessionKey);

if (result.Success && result.Data != null)
{
    var session = result.Data;
    Console.WriteLine($"Session: {session.Identifier}");
    Console.WriteLine($"Type: {session.Type}");
    Console.WriteLine($"Historical: {session.Historical}");
    Console.WriteLine($"Details: {session.Details.Count}");
}

```

### GetAllSessions

Retrieves all sessions from the broker.

```csharp
public ApiResult<IReadOnlyList<ISessionInfo>> GetAllSessions()

```

**Example:**

```csharp
var result = sessionService.GetAllSessions();

if (result.Success && result.Data != null)
{
    Console.WriteLine($"Found {result.Data.Count} sessions");
    
    foreach (var session in result.Data)
    {
        Console.WriteLine($"- {session.SessionKey}: {session.Identifier} ({session.Type})");
    }
}

```

### UpdateIdentifier

Updates the session identifier.

```csharp
public ApiResult<ISessionInfo?> UpdateIdentifier(
    string dataSource, 
    string sessionKey, 
    string newIdentifier)

```

**Example:**

```csharp
var result = sessionService.UpdateIdentifier(
    "MyDataSource",
    sessionKey,
    "UpdatedSessionIdentifier_001");

if (result.Success && result.Data != null)
{
    Console.WriteLine($"Updated identifier: {result.Data.Identifier}");
}

```

### UpdateSessionDetails

Adds or updates session metadata details.

```csharp
public ApiResult<ISessionInfo?> UpdateSessionDetails(
    string dataSource,
    string sessionKey,
    IReadOnlyList<SessionDetailDto> sessionDetails)

```

**Example:**

```csharp
var newDetails = new[] {
    new SessionDetailDto("LapCount", "45"),
    new SessionDetailDto("BestLapTime", "1:32.456")
};

var result = sessionService.UpdateSessionDetails(
    "MyDataSource",
    sessionKey,
    newDetails);

if (result.Success && result.Data != null)
{
    Console.WriteLine($"Session now has {result.Data.Details.Count} details");
}

```

**Note**: Details with existing keys are updated; new keys are added.

### AddAssociateSession

Links another session as an associate.

```csharp
public ApiResult<ISessionInfo?> AddAssociateSession(
    string dataSource,
    string sessionKey,
    string addingAssociateKey)

```

**Example:**

```csharp
// Create an associate session
var associateResult = sessionService.CreateNewSession(
    new SessionCreationDto(
        dataSource: "MyDataSource",
        identifier: "AssociateSession",
        type: "Data"
    ));

if (associateResult.Success && associateResult.Data != null)
{
    var associateKey = associateResult.Data.SessionKey;
    
    // Link it to the main session
    var linkResult = sessionService.AddAssociateSession(
        "MyDataSource",
        mainSessionKey,
        associateKey);
    
    if (linkResult.Success && linkResult.Data != null)
    {
        Console.WriteLine($"Associated sessions: {linkResult.Data.AssociateSessionKeys.Count}");
    }
}

```

### EndSession

Marks a session as historical (completed).

```csharp
public ApiResult<ISessionInfo?> EndSession(string dataSource, string sessionKey)

```

**Example:**

```csharp
var result = sessionService.EndSession("MyDataSource", sessionKey);

if (result.Success && result.Data != null)
{
    Console.WriteLine($"Session ended. Historical: {result.Data.Historical}");
}

```

**Important**: Once a session is marked as historical, it should not be modified.

## Events

The Session Manager provides four events for tracking session lifecycle.

**Important - Forward-Only Event Notifications**: All events are **only triggered for actions that occur after the session manager has started**. Events will not fire for sessions or changes that existed before the session manager was initialized. This means:
- No replay of existing sessions or state when you subscribe
- Only new changes happening after startup will trigger events
- To retrieve existing sessions, use the `GetAllSessions()` method

**Event Scope**:
- `LiveSessionStarted`, `LiveSessionStateChange`, `LiveSessionEnded`: Only triggered for live sessions (where `Historical = false`)
- `NewAssociationDetected`: Can be triggered for both live and historical sessions

### LiveSessionStarted

Fired when a new live session is detected or created after the session manager has started.

```csharp
sessionService.LiveSessionStarted += (sender, sessionInfo) =>
{
    Console.WriteLine($"Live session started: {sessionInfo.SessionKey}");
    Console.WriteLine($"Data Source: {sessionInfo.DataSource}");
    Console.WriteLine($"Identifier: {sessionInfo.Identifier}");
};

```

**Note**: Only triggered for live sessions created or detected after session manager startup. Pre-existing live sessions will not trigger this event.

### LiveSessionStateChange

Fired when a live session's state is updated (e.g., details changed, identifier updated) after the session manager has started.

```csharp
sessionService.LiveSessionStateChange += (sender, sessionInfo) =>
{
    Console.WriteLine($"Live session state changed: {sessionInfo.SessionKey}");
    Console.WriteLine($"Details count: {sessionInfo.Details.Count}");
};

```

**Note**: Only triggered for state changes occurring after session manager startup. Does not fire for historical sessions.

### LiveSessionEnded

Fired when a live session is marked as historical (transitioned from live to completed) after the session manager has started.

```csharp
sessionService.LiveSessionEnded += (sender, sessionInfo) =>
{
    Console.WriteLine($"Live session ended: {sessionInfo.SessionKey}");
    Console.WriteLine($"Final identifier: {sessionInfo.Identifier}");
    Console.WriteLine($"Now historical: {sessionInfo.Historical}"); // Will be true
};

```

**Note**: Triggered during the transition from live to historical that occurs after session manager startup. Once a session is historical, no further live session events are triggered for it.

### NewAssociationDetected

Fired when a session association is created between sessions after the session manager has started.

```csharp
sessionService.NewAssociationDetected += (sender, associationInfo) =>
{
    Console.WriteLine($"New association detected:");
    Console.WriteLine($"  Main: {associationInfo.MainSessionInfo.SessionKey}");
    Console.WriteLine($"  Associate: {associationInfo.AssociateSessionInfo.SessionKey}");
};

```

**Note**: Can be triggered for both live and historical sessions, but **only for associations created after the session manager has started**. Pre-existing associations will not trigger this event.

## Complete Example

```csharp
using MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.SessionInfoModule;
using MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.SessionInfoModule.Abstractions;

public class SessionManagerExample
{
    private readonly ISessionManagementService sessionService;
    
    public SessionManagerExample(ISupportLibApi supportLibApi)
    {
        var sessionApi = supportLibApi.GetSessionManagerApi();
        this.sessionService = sessionApi.CreateService().Data;
        
        // Subscribe to events
        this.sessionService.LiveSessionStarted += OnLiveSessionStarted;
        this.sessionService.LiveSessionStateChange += OnSessionStateChange;
        this.sessionService.LiveSessionEnded += OnSessionEnded;
        this.sessionService.NewAssociationDetected += OnAssociationDetected;
        
        // Initialize and start
        this.sessionService.Initialise();
        this.sessionService.Start();
    }
    
    public string CreateAndManageSession()
    {
        // Create session
        var createResult = sessionService.CreateNewSession(
            new SessionCreationDto(
                dataSource: "TestCar",
                identifier: "Test_Run_001",
                type: "Testing",
                version: 1,
                details: new[] {
                    new SessionDetailDto("Driver", "TestDriver"),
                    new SessionDetailDto("Track", "TestTrack")
                }));
        
        if (!createResult.Success || createResult.Data == null)
        {
            Console.WriteLine($"Failed to create session: {createResult.Message}");
            return null;
        }
        
        var sessionKey = createResult.Data.SessionKey;
        
        // Update session details
        sessionService.UpdateSessionDetails(
            "TestCar",
            sessionKey,
            new[] { new SessionDetailDto("Status", "InProgress") });
        
        // Create and link associate session
        var associateResult = sessionService.CreateNewSession(
            new SessionCreationDto(
                dataSource: "TestCar",
                identifier: "Associated_Data",
                type: "Telemetry"));
        
        if (associateResult.Success && associateResult.Data != null)
        {
            sessionService.AddAssociateSession(
                "TestCar",
                sessionKey,
                associateResult.Data.SessionKey);
        }
        
        // Later... end the session
        sessionService.EndSession("TestCar", sessionKey);
        
        return sessionKey;
    }
    
    private void OnLiveSessionStarted(object sender, ISessionInfo session)
    {
        Console.WriteLine($"[Event] Live session started: {session.SessionKey}");
    }
    
    private void OnSessionStateChange(object sender, ISessionInfo session)
    {
        Console.WriteLine($"[Event] Session state changed: {session.SessionKey}");
    }
    
    private void OnSessionEnded(object sender, ISessionInfo session)
    {
        Console.WriteLine($"[Event] Session ended: {session.SessionKey}");
    }
    
    private void OnAssociationDetected(object sender, ISessionAssociationInfo info)
    {
        Console.WriteLine($"[Event] Association: {info.MainSessionInfo.SessionKey} <-> {info.AssociateSessionInfo.SessionKey}");
    }
}

```

## Best Practices

1. **Always Check Results**: All methods return `ApiResult<T>` - always check the `Success` property and handle errors appropriately.

2. **Subscribe to Events Early**: Subscribe to events before calling `Start()` to ensure you don't miss any notifications.

3. **Handle Session Lifecycle**: Use the event system to track when sessions start and end for proper resource management.

4. **Store Session Keys**: Keep track of session keys for later reference, as they're needed for most operations.

5. **End Sessions Properly**: Always call `EndSession()` when a session is complete to mark it as historical.

6. **Use Details for Metadata**: Store important session metadata in details for easy retrieval and filtering.

## Error Handling

```csharp
var result = sessionService.CreateNewSession(sessionDto);

if (!result.Success)
{
    Console.WriteLine($"Error: {result.Message}");
    // Handle the error appropriately
    return;
}

if (result.Data == null)
{
    Console.WriteLine("Error: No data returned despite success");
    return;
}

// Proceed with the session
var sessionKey = result.Data.SessionKey;

```

## See Also

- [Data Format Manager Module](data-format-manager.md)
- [Writer Module](writer-module.md)
- [Reader Module](reader-module.md)
- [API Reference](api-reference.md)
