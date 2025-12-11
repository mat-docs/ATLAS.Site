# Reader Module (Packet Reading)

## Overview

The Reader Module (Packet Reading Module) provides API for consuming data packets from the streaming broker. It supports both live session monitoring and historical session playback, with configurable options for stream filtering, auto-start behavior, and inactivity timeout.

## Key Features

- **Live Reading**: Monitor live sessions as data arrives
- **Historical Playback**: Read complete historical sessions
- **Stream Filtering**: Read specific streams or all streams
- **Auto-Start or Manual Start**: Control when reading begins
- **Coverage Cursor Support**: Track data availability and gaps
- **Event System**: Rich events for tracking reading progress
- **Handler Pattern**: Attach custom handlers to process packets
- **Session Pattern Matching**: Read sessions matching specific patterns
- **Inactivity Timeout**: Automatically stop reading after inactivity period

## API Access

### Get the Reader API

```csharp
var readerApi = supportLibApi.GetReadingPacketApi();

```

### Create a Reader Service

There are two ways to create a reader service:

#### Option 1: Simple Creation (Data Source + Session Key)

```csharp
var serviceResult = readerApi.CreateService(
    dataSource: "CarA",
    sessionKey: "specific-session-key");

if (serviceResult.Success && serviceResult.Data != null)
{
    var readerService = serviceResult.Data;
}

```

#### Option 2: Advanced Creation (Using Configuration)

```csharp
using MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.ReadingModule;

var config = new PacketReadingConfiguration(
    dataSource: "CarA",
    sessionIdentifierPattern: "*",  // Match all sessions
    readingType: ReadingType.Live,
    streams: new[] { "Telemetry", "Events" },
    excludeMainStream: false,
    inactivityTimeoutSeconds: 30,
    sessionKey: null);

var serviceResult = readerApi.CreateService(config);

```

## Configuration Options

### PacketReadingConfiguration

```csharp
public PacketReadingConfiguration(
    string? dataSource = "Default",
    string? sessionIdentifierPattern = "*",
    ReadingType? readingType = ReadingType.Live,
    IReadOnlyList<string>? streams = null,
    bool? excludeMainStream = false,
    uint? inactivityTimeoutSeconds = 30,
    string? sessionKey = null)

```

**Parameters:**

- **dataSource**: The data source to read from (default: "Default")
- **sessionIdentifierPattern**: Pattern for matching session identifiers
  - Use `"*"` to match all session identifires
  - Use specific identifier to match exact session
- **readingType**: Type of reading mode
  - `ReadingType.Live`: Monitor live sessions
  - `ReadingType.Historical`: Read completed sessions
- **streams**: List of specific streams to read (default: all streams)
  - `null` or empty list reads all streams
  - Specify streams like `["Telemetry", "Events"]` to filter
- **excludeMainStream**: Whether to exclude the main stream (default: false)
- **inactivityTimeoutSeconds**: Timeout in seconds after which reading stops if no data arrives (default: 30)
- **sessionKey**: Specific session key to read (optional)
  - If provided, only this session is read
  - If null, pattern matching is used

### ReadingType Enum

```csharp
public enum ReadingType
{
    Live,       // Read live sessions
    Historical  // Read historical (completed) sessions
}

```

## Methods

### AddHandler

Adds a packet handler to process received packets.

```csharp
public void AddHandler(IHandler<IReceivedPacketDto> handler)

```

**Example:**

```csharp
public class MyPacketHandler : IHandler<IReceivedPacketDto>
{
    public void Handle(IReceivedPacketDto receivedPacket)
    {
        var packet = receivedPacket.Packet;
        Console.WriteLine($"Received: {packet.Type} (ID: {packet.Id})");
        
        // Process based on packet type
        switch (packet.Type)
        {
            case "PeriodicData":
                HandlePeriodicData(packet);
                break;
            case "Event":
                HandleEvent(packet);
                break;
        }
    }
    
    private void HandlePeriodicData(Packet packet)
    {
        var periodicData = PeriodicDataPacket.Parser.ParseFrom(packet.Content);
        // Process periodic data...
    }
    
    private void HandleEvent(Packet packet)
    {
        var eventData = EventPacket.Parser.ParseFrom(packet.Content);
        // Process event...
    }
}

// Usage
var handler = new MyPacketHandler();
readerService.AddHandler(handler);

```

### RemoveHandler

Removes a previously added handler.

```csharp
public void RemoveHandler(IHandler<IReceivedPacketDto> handler)

```

**Example:**

```csharp
readerService.RemoveHandler(handler);

```

### Initialise and Start

Initialize and start the reader service.

```csharp
readerService.Initialise();
readerService.Start();

```

**Note**: 
- `Initialise()` prepares the service
- `Start()` begins reading packets
- For auto-start readers, packets begin arriving immediately after `Start()`
- For manual-start readers, `Start()` waits for the session to begin

### Stop

Stops the reader service.

```csharp
readerService.Stop();

```

## Events

### SessionReadingStarted

Fired when reading of a session begins.

```csharp
readerService.SessionReadingStarted += (sender, sessionInfo) =>
{
    Console.WriteLine($"Started reading session: {sessionInfo.SessionKey}");
    Console.WriteLine($"Data Source: {sessionInfo.DataSource}");
    Console.WriteLine($"Session Type: {sessionInfo.Type}");
};

```

### SessionReadingCompleted

Fired when reading of a session is complete.

```csharp
readerService.SessionReadingCompleted += (sender, sessionInfo) =>
{
    Console.WriteLine($"Completed reading session: {sessionInfo.SessionKey}");
    Console.WriteLine($"Historical: {sessionInfo.Historical}");
};

```

### StreamReadingStarted

Fired when reading of a stream begins.

```csharp
readerService.StreamReadingStarted += (sender, streamInfo) =>
{
    Console.WriteLine($"Started reading stream: {streamInfo.Stream}");
    Console.WriteLine($"Session: {streamInfo.SessionKey}");
};

```

### StreamReadingCompleted

Fired when reading of a stream is complete.

```csharp
readerService.StreamReadingCompleted += (sender, streamInfo) =>
{
    Console.WriteLine($"Completed reading stream: {streamInfo.Stream}");
};

```

### SessionInfoUpdated

Fired when session information changes during reading.

```csharp
readerService.SessionInfoUpdated += (sender, sessionInfo) =>
{
    Console.WriteLine($"Session info updated: {sessionInfo.SessionKey}");
    Console.WriteLine($"Details: {sessionInfo.Details.Count}");
};

```

### SessionAssociationInfoUpdated

Fired when session association information is detected.

```csharp
readerService.SessionAssociationInfoUpdated += (sender, associationInfo) =>
{
    Console.WriteLine($"Association detected:");
    Console.WriteLine($"  Main: {associationInfo.MainSessionInfo.SessionKey}");
    Console.WriteLine($"  Associate: {associationInfo.AssociateSessionInfo.SessionKey}");
};

```

### CoverageCursorReceived

Fired when a coverage cursor packet is received.

```csharp
readerService.CoverageCursorReceived += (sender, coverageCursor) =>
{
    Console.WriteLine($"Coverage cursor received:");
    Console.WriteLine($"  Data Source: {coverageCursor.DataSource}");
    Console.WriteLine($"  Time: {coverageCursor.CoverageCursorTime}");
};

```

**Coverage Cursor**: Indicates the latest timestamp where all of the data has been received. Useful for post processing data in real time.

## Complete Examples

### Example 1: Read Historical Session

```csharp
using MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.ReadingModule.Abstractions;
using MA.Streaming.OpenData;

public class HistoricalSessionReader
{
    private readonly IPacketReaderService readerService;
    private readonly AutoResetEvent completionEvent = new(false);
    private int packetCount = 0;
    
    public HistoricalSessionReader(ISupportLibApi supportLibApi, string dataSource, string sessionKey)
    {
        var readerApi = supportLibApi.GetReadingPacketApi();
        
        // Create reader for specific session
        var result = readerApi.CreateService(dataSource, sessionKey);
        this.readerService = result.Data;
        
        // Subscribe to events
        this.readerService.SessionReadingStarted += OnReadingStarted;
        this.readerService.SessionReadingCompleted += OnReadingCompleted;
        
        // Add packet handler
        this.readerService.AddHandler(new PacketCounter(this));
        
        // Initialize
        this.readerService.Initialise();
    }
    
    public void ReadSession()
    {
        Console.WriteLine("Starting to read historical session...");
        readerService.Start();
        
        // Wait for completion
        completionEvent.WaitOne(TimeSpan.FromMinutes(5));
        
        Console.WriteLine($"Total packets read: {packetCount}");
    }
    
    private void OnReadingStarted(object sender, ISessionInfo session)
    {
        Console.WriteLine($"Reading started: {session.Identifier}");
    }
    
    private void OnReadingCompleted(object sender, ISessionInfo session)
    {
        Console.WriteLine($"Reading completed: {session.Identifier}");
        completionEvent.Set();
    }
    
    private class PacketCounter : IHandler<IReceivedPacketDto>
    {
        private readonly HistoricalSessionReader parent;
        
        public PacketCounter(HistoricalSessionReader parent)
        {
            this.parent = parent;
        }
        
        public void Handle(IReceivedPacketDto receivedPacket)
        {
            parent.packetCount++;
            
            if (parent.packetCount % 1000 == 0)
            {
                Console.WriteLine($"Processed {parent.packetCount} packets...");
            }
        }
    }
}

```

### Example 2: Monitor Live Session

```csharp
public class LiveSessionMonitor
{
    private readonly IPacketReaderService readerService;
    
    public LiveSessionMonitor(
        ISupportLibApi supportLibApi,
        ISessionManagementService sessionService,
        string dataSource)
    {
        // Subscribe to session started event
        sessionService.LiveSessionStarted += (sender, session) =>
        {
            if (session.DataSource == dataSource)
            {
                StartReadingLiveSession(supportLibApi, session);
            }
        };
    }
    
    private void StartReadingLiveSession(ISupportLibApi supportLibApi, ISessionInfo session)
    {
        Console.WriteLine($"New live session detected: {session.SessionKey}");
        
        var readerApi = supportLibApi.GetReadingPacketApi();
        
        // Create reader for the live session
        var config = new PacketReadingConfiguration(
            dataSource: session.DataSource,
            sessionKey: session.SessionKey,
            readingType: ReadingType.Live,
            streams: new[] { "Telemetry", "Events" },  // Only read specific streams
            inactivityTimeoutSeconds: 60);
        
        var result = readerApi.CreateService(config);
        var readerService = result.Data;
        
        // Add handlers
        readerService.AddHandler(new LiveDataHandler());
        
        // Subscribe to events
        readerService.SessionReadingCompleted += (sender, sessionInfo) =>
        {
            Console.WriteLine($"Live session ended: {sessionInfo.SessionKey}");
            readerService.Stop();
        };
        
        // Start reading
        readerService.Initialise();
        readerService.Start();
    }
    
    private class LiveDataHandler : IHandler<IReceivedPacketDto>
    {
        public void Handle(IReceivedPacketDto packet)
        {
            // Process live data in real-time
            Console.WriteLine($"[{DateTime.UtcNow:HH:mm:ss.fff}] {packet.Packet.Type}");
        }
    }
}

```

### Example 3: Read All Sessions with Pattern

```csharp
public class SessionPatternReader
{
    public void ReadAllQualifyingSessions(ISupportLibApi supportLibApi)
    {
        var readerApi = supportLibApi.GetReadingPacketApi();
        
        // Read all historical qualifying sessions
        var config = new PacketReadingConfiguration(
            dataSource: "RaceCar",
            sessionIdentifierPattern: "Qualifying_*",  // Pattern matching
            readingType: ReadingType.Both,
            inactivityTimeoutSeconds: 30);
        
        var result = readerApi.CreateService(config);
        var readerService = result.Data;
        
        var sessionPackets = new Dictionary<string, List<IReceivedPacketDto>>();
        
        // Track packets by session
        readerService.SessionReadingStarted += (sender, session) =>
        {
            sessionPackets[session.SessionKey] = new List<IReceivedPacketDto>();
            Console.WriteLine($"Reading session: {session.Identifier}");
        };
        
        // Collect packets
        readerService.AddHandler(new SessionPacketCollector(sessionPackets));
        
        readerService.SessionReadingCompleted += (sender, session) =>
        {
            var count = sessionPackets[session.SessionKey].Count;
            Console.WriteLine($"Session {session.Identifier} had {count} packets");
        };
        
        readerService.Initialise();
        readerService.Start();
        
        // Wait for completion...
    }
    
    private class SessionPacketCollector : IHandler<IReceivedPacketDto>
    {
        private readonly Dictionary<string, List<IReceivedPacketDto>> packets;
        
        public SessionPacketCollector(Dictionary<string, List<IReceivedPacketDto>> packets)
        {
            this.packets = packets;
        }
        
        public void Handle(IReceivedPacketDto packet)
        {
            var sessionKey = packet.Packet.SessionKey;
            if (packets.ContainsKey(sessionKey))
            {
                packets[sessionKey].Add(packet);
            }
        }
    }
}

```

## Best Practices

1. **Subscribe to Events First**: Attach event handlers before calling `Start()` to capture all events.

2. **Handle All Packet Types**: Implement handlers that can process different packet types gracefully.

3. **Use Configuration for Flexibility**: Use `PacketReadingConfiguration` for complex scenarios with multiple options.

4. **Stream Filtering**: Filter streams when you only need specific data to reduce processing overhead.

5. **Inactivity Timeout**: Set appropriate timeout values based on expected data frequency.

6. **Resource Cleanup**: Always call `Stop()` when done to release resources.

7. **Thread Safety**: Handlers may be called from different threads; ensure thread-safe processing.

8. **Error Handling in Handlers**: Wrap handler logic in try-catch to prevent crashes from processing errors.

## Common Patterns

### Buffered Handler

```csharp
public class BufferedPacketHandler : IHandler<IReceivedPacketDto>
{
    private readonly BlockingCollection<IReceivedPacketDto> buffer = new();
    private readonly CancellationTokenSource cts = new();
    
    public BufferedPacketHandler()
    {
        // Start processing thread
        Task.Run(() => ProcessBuffer());
    }
    
    public void Handle(IReceivedPacketDto packet)
    {
        buffer.Add(packet);
    }
    
    private void ProcessBuffer()
    {
        foreach (var packet in buffer.GetConsumingEnumerable(cts.Token))
        {
            // Process packet asynchronously
            ProcessPacket(packet);
        }
    }
    
    private void ProcessPacket(IReceivedPacketDto packet)
    {
        // Your processing logic
    }
    
    public void Stop()
    {
        buffer.CompleteAdding();
        cts.Cancel();
    }
}

```

### Type-Specific Handlers

```csharp
public class TypeDispatchingHandler : IHandler<IReceivedPacketDto>
{
    private readonly Dictionary<string, Action<Packet>> handlers = new();
    
    public TypeDispatchingHandler()
    {
        handlers["PeriodicData"] = HandlePeriodicData;
        handlers["Event"] = HandleEventData;
        handlers["Marker"] = HandleMarkerData;
    }
    
    public void Handle(IReceivedPacketDto receivedPacket)
    {
        var packet = receivedPacket.Packet;
        
        if (handlers.TryGetValue(packet.Type, out var handler))
        {
            handler(packet);
        }
        else
        {
            Console.WriteLine($"Unknown packet type: {packet.Type}");
        }
    }
    
    private void HandlePeriodicData(Packet packet) { /* ... */ }
    private void HandleEventData(Packet packet) { /* ... */ }
    private void HandleMarkerData(Packet packet) { /* ... */ }
}

```

## See Also

- [Session Manager Module](session-manager.md)
- [Writer Module](writer-module.md)
- [Buffering Module](buffering-module.md)
- [API Reference](api-reference.md)
