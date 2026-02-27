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
    sessionKey: null,
    liveReadingType: LiveReadingType.FromBeginning,
    bufferLength: 1000,
    groupId: "my-consumer-group");

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
    string? sessionKey = null,
    LiveReadingType? liveReadingType = null,
    int? bufferLength = null,
    string? groupId = null)

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
- **liveReadingType**: Type of live reading mode (default: `LiveReadingType.FromBeginning`)
    - `LiveReadingType.FromBeginning`: Read from the start of the session
    - `LiveReadingType.LeadingEdge`: Read only new data from the current point forward (skip historical data)
- **bufferLength**: Size of the internal buffer for packets (default: 0 = use system default)
    - Larger buffers can handle higher data rates but use more memory
    - Set to appropriate size based on expected packet rate and processing speed
    - Value of 0 uses the default unbounded buffer
- **groupId**: Kafka consumer group identifier (default: empty string = auto-generated)
    - Use a specific group ID to control consumer group membership
    - Multiple readers with same group ID share the load (Kafka consumer group behavior)
    - Use different group IDs for independent readers of the same topic
    - Empty string creates a unique consumer group per reader

### ReadingType Enum

```csharp
public enum ReadingType
{
    Live,       // Read live sessions
    Historical  // Read historical (completed) sessions
}
```

### LiveReadingType Enum

```csharp
public enum LiveReadingType
{
    FromBeginning = 0,  // Read live session from the beginning
    LeadingEdge = 1     // Read live session from the current point (skip past data)
}
```

**LiveReadingType Details:**

- **FromBeginning** (default): When reading a live session, start from the beginning and process all available data, then continue with live data as it arrives. This ensures you get the complete session history.
  
- **LeadingEdge**: When reading a live session, skip any historical data and start reading from the current point forward. This is useful for real-time monitoring where you only care about the latest data and want to minimize latency. Also known as "tail mode" or "live-only mode".

**Use Cases:**

- Use `FromBeginning` when you need the complete session data (e.g., analysis, visualization)
- Use `LeadingEdge` when you only need real-time updates (e.g., live dashboards, alerts)

**Note**: `LiveReadingType` only applies when `ReadingType` is set to `Live`. It has no effect for historical session reading.



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

### Example 4: Leading Edge Live Reading

```csharp
public class RealTimeDashboard
{
    public void MonitorLiveSession(ISupportLibApi supportLibApi, string dataSource, string sessionKey)
    {
        var readerApi = supportLibApi.GetReadingPacketApi();
        
        // Configure for leading edge reading - only new data
        var config = new PacketReadingConfiguration(
            dataSource: dataSource,
            sessionKey: sessionKey,
            readingType: ReadingType.Live,
            liveReadingType: LiveReadingType.LeadingEdge,  // Skip historical data
            inactivityTimeoutSeconds: 60);
        
        var result = readerApi.CreateService(config);
        var readerService = result.Data;
        
        readerService.SessionReadingStarted += (sender, session) =>
        {
            Console.WriteLine($"Started monitoring live session from current point");
        };
        
        // Process only new live data
        readerService.AddHandler(new RealtimeDataHandler());
        
        readerService.Initialise();
        readerService.Start();
    }
    
    private class RealtimeDataHandler : IHandler<IReceivedPacketDto>
    {
        private DateTime lastUpdate = DateTime.UtcNow;
        
        public void Handle(IReceivedPacketDto packet)
        {
            var latency = DateTime.UtcNow - packet.SubmitTime;
            Console.WriteLine($"[{DateTime.UtcNow:HH:mm:ss.fff}] Packet: {packet.Packet.Type}, Latency: {latency.TotalMilliseconds}ms");
            lastUpdate = DateTime.UtcNow;
        }
    }
}
```

### Example 5: Bounded Buffer for High-Volume Sessions

```csharp
public class HighVolumeSessionReader
{
    public void ReadHighVolumeSession(ISupportLibApi supportLibApi, string dataSource, string sessionKey)
    {
        var readerApi = supportLibApi.GetReadingPacketApi();
        
        // Configure with bounded buffer to control memory usage
        var config = new PacketReadingConfiguration(
            dataSource: dataSource,
            sessionKey: sessionKey,
            readingType: ReadingType.Historical,
            bufferLength: 10000,  // Limit buffer to 10,000 packets
            inactivityTimeoutSeconds: 30);
        
        var result = readerApi.CreateService(config);
        var readerService = result.Data;
        
        Console.WriteLine("Reading high-volume session with bounded buffer...");
        
        readerService.AddHandler(new BatchProcessor());
        
        readerService.Initialise();
        readerService.Start();
    }
    
    private class BatchProcessor : IHandler<IReceivedPacketDto>
    {
        private readonly List<IReceivedPacketDto> batch = new();
        private const int BatchSize = 1000;
        
        public void Handle(IReceivedPacketDto packet)
        {
            batch.Add(packet);
            
            if (batch.Count >= BatchSize)
            {
                ProcessBatch(batch);
                batch.Clear();
            }
        }
        
        private void ProcessBatch(List<IReceivedPacketDto> packets)
        {
            Console.WriteLine($"Processing batch of {packets.Count} packets");
            // Batch processing logic here
        }
    }
}
```

### Example 6: Using Consumer Groups

```csharp
public class DistributedProcessing
{
    public void SetupDistributedReaders(ISupportLibApi supportLibApi, string dataSource, string sessionKey)
    {
        // Create multiple readers in the same consumer group for load balancing
        var groupId = "processing-cluster-1";
        
        var readers = new List<IPacketReaderService>();
        
        for (int i = 0; i < 3; i++)
        {
            var config = new PacketReadingConfiguration(
                dataSource: dataSource,
                sessionKey: sessionKey,
                readingType: ReadingType.Historical,
                groupId: groupId,  // Same group ID for load balancing
                inactivityTimeoutSeconds: 30);
            
            var readerApi = supportLibApi.GetReadingPacketApi();
            var result = readerApi.CreateService(config);
            var reader = result.Data;
            
            reader.AddHandler(new DistributedHandler(i));
            reader.Initialise();
            readers.Add(reader);
            
            Console.WriteLine($"Reader {i} created in consumer group '{groupId}'");
        }
        
        // Start all readers - they will share the workload
        foreach (var reader in readers)
        {
            reader.Start();
        }
        
        Console.WriteLine("Distributed processing started - readers sharing workload via consumer group");
    }
    
    private class DistributedHandler : IHandler<IReceivedPacketDto>
    {
        private readonly int readerId;
        private int packetCount = 0;
        
        public DistributedHandler(int readerId)
        {
            this.readerId = readerId;
        }
        
        public void Handle(IReceivedPacketDto packet)
        {
            packetCount++;
            if (packetCount % 100 == 0)
            {
                Console.WriteLine($"Reader {readerId}: Processed {packetCount} packets");
            }
        }
    }
}
```

### Example 7: Resuming from Last Position

```csharp
public class ResumableSessionReader
{
    private const string CustomGroupId = "my-data-processor";
    
    public void StartOrResumeSession(ISupportLibApi supportLibApi, string dataSource, string sessionKey)
    {
        var readerApi = supportLibApi.GetReadingPacketApi();
        
        // Create a stable group ID combining custom group identifier and session key
        // This allows resuming from the last committed position
        var groupId = $"{CustomGroupId}_{sessionKey}";
        
        var config = new PacketReadingConfiguration(
            dataSource: dataSource,
            sessionKey: sessionKey,
            readingType: ReadingType.Live,  // Use Live mode to enable resume behavior
            liveReadingType = LiveReadingType.LeadingEdge,
            groupId: groupId,  // Consistent group ID for resumption
            inactivityTimeoutSeconds: 60);
        
        var result = readerApi.CreateService(config);
        var readerService = result.Data;
        
        Console.WriteLine($"Starting reader with group ID: {groupId}");
        Console.WriteLine("If this is a restart, reading will resume from last committed position");
        
        readerService.AddHandler(new CheckpointHandler());
        
        readerService.SessionReadingStarted += (sender, session) =>
        {
            Console.WriteLine($"Session reading started/resumed: {session.SessionKey}");
        };
        
        readerService.Initialise();
        readerService.Start();
        
        // When this reader restarts with the same groupId, it will automatically
        // resume from where it left off, thanks to Kafka consumer group offsets
    }
    
    private class CheckpointHandler : IHandler<IReceivedPacketDto>
    {
        private int processedCount = 0;
        
        public void Handle(IReceivedPacketDto packet)
        {
            processedCount++;
            
            // Process the packet
            if (processedCount % 1000 == 0)
            {
                Console.WriteLine($"Processed {processedCount} packets (position automatically tracked by consumer group)");
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

9. **Choose Appropriate LiveReadingType**:
   - Use `FromBeginning` for complete session analysis and when historical context is needed
   - Use `LeadingEdge` for real-time dashboards and alerts where only current data matters
   - `LeadingEdge` reduces latency and memory usage for live monitoring scenarios

10. **Buffer Size Configuration**:
    - Use bounded buffers (`bufferLength > 0`) for high-volume sessions to prevent memory pressure
    - Use unbounded buffers (default) for normal sessions where memory is not a concern
    - Monitor memory usage and adjust buffer size based on packet rate and processing speed
    - Ensure packet handlers are efficient to keep up with data flow; slow handlers with bounded buffers will cause backpressure

11. **Consumer Groups**:
    - Use unique `groupId` for each independent processing pipeline
    - Share `groupId` across readers only when you want load balancing/distributed processing
    - Leave `groupId` empty (default) for single-reader scenarios
    - Be aware that readers in the same group will split data - they won't all receive the same packets
    - Group ID naming: avoid spaces and follow Kafka naming principles (use alphanumeric characters, hyphens, underscores, and periods)
    - **Resuming from last position**: To rejoin a session and continue from where you left off, use `ReadingType.Live` with a consistent `groupId` pattern like `{customGroupId}_{sessionKey}`. This leverages Kafka consumer group offsets to resume from the last committed position.
    - **Warning**: Do not reuse the same static `groupId` across different sessions. Using the same consumer group ID for multiple sessions can lead to reading from incorrect offsets, missing data, or late reading as Kafka will resume from the last committed position which may be from a different session. Always include the session key or unique identifier in your group ID to avoid these issues.

12. **Resumable Live Reading**:
    - To implement fault-tolerant live reading that can resume after interruption, use `ReadingType.Live` with a session-specific `groupId` like `{customGroupId}_{sessionKey}`
    - This pattern is ideal for applications that need to process all data even after crashes or restarts
    - The reader will automatically resume from the last committed offset, avoiding data loss or duplicate processing
    - Ensure your application logic is idempotent if there's a possibility of receiving duplicate messages during recovery

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
- [Essentials Module](essentials-module.md) - Read essential/configuration packets only
- [Writer Module](writer-module.md)
- [Buffering Module](buffering-module.md)
- [API Reference](api-reference.md)
