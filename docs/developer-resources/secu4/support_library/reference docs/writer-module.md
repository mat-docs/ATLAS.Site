# Writer Module

## Overview

The Writer Module (Packet Writing Module) provides API for publishing data packets and session information to the streaming broker (Kafka). It handles the serialization and transmission of telemetry data, events, markers, and session metadata.

## Key Features

- **Packet Writing**: Publish data packets to specific streams
- **Session Info Publishing**: Write session-related information to the broker
- **Multiple Stream Support**: Write to different streams within a session
- **Info Type Support**: Publish different types of information (SessionInfo, DataFormatInfo, etc.)
- **Automatic Serialization**: Handles packet serialization internally
- **Error Handling**: Returns detailed results for each write operation

## API Access

### Get the Writer API

```csharp

var writerApi = supportLibApi.GetWritingPacketApi();

```

### Create a Writer Service

```csharp

var serviceResult = writerApi.CreateService();

if (serviceResult.Success && serviceResult.Data != null)
{
    var writerService = serviceResult.Data;
    
    // Initialize and start the service
    writerService.Initialise();
    writerService.Start();
}

```

**Note**: Unlike Reader services, Writer services are not tied to a specific session. A single writer service can write to multiple sessions and data sources.

## Methods

### WriteData

Writes a data packet to a specific stream within a session.

```csharp

public ApiResult<bool?> WriteData(
    string dataSource,
    string stream,
    string sessionKey,
    Packet packet)

```

**Parameters:**
- `dataSource`: The data source identifier
- `stream`: The stream name within the session
- `sessionKey`: The session key to write to
- `packet`: The packet to write

**Returns:**
- `ApiResult<bool?>` indicating success or failure

**Example:**

```csharp

using MA.Streaming.OpenData;

// Create a packet (example with PeriodicDataPacket)
var periodicPacket = new PeriodicDataPacket
{
    DataFormat = new SampleDataFormat
    {
        DataFormatIdentifier = 1234
    },
    StartTime = 123456,
    Interval = 1000, // 1ms
    Columns =
    {
        new SampleColumn[]
        {
            new()
            {
                DoubleSamples = new DoubleSampleList
                {
                    Samples =
                    {
                        new DoubleSample[]
                        {
                            new DoubleSample
                            {
                                Status = DataStatus.Valid,
                                Value = 123456
                            }
                        }
                    }
                }
            }
        }
    }
};

var packet = new Packet
{
    SessionKey = sessionKey,
    Content = periodicPacket.ToByteString(),
    Id = packetCounter++,
    Type = "PeriodicData",
    IsEssential = false
};

var result = writerService.WriteData(
    dataSource: "CarA",
    stream: "Telemetry",
    sessionKey: sessionKey,
    packet: packet);

if (result.Success)
{
    Console.WriteLine("Packet written successfully");
}
else
{
    Console.WriteLine($"Failed to write packet: {result.Message}");
}

```

### WriteInfo

Writes information packets (metadata) to the broker.

```csharp

public ApiResult<bool?> WriteInfo(
    Packet packet,
    InfoType infoType = InfoType.SessionInfo)

```

**Parameters:**
- `packet`: The information packet to write
- `infoType`: The type of information (default: SessionInfo)

**InfoType Values:**
- `InfoType.SessionInfo`: Session-related information
- `InfoType.DataFormatInfo`: Data format definitions
- `InfoType.Other`: Other metadata types

**Example:**

```csharp

var infoPacket = new Packet
{
    SessionKey = sessionKey,
    Content = sessionInfoData.ToByteString(),
    Type = "SessionInfo",
    IsEssential = true
};

var result = writerService.WriteInfo(
    packet: infoPacket,
    infoType: InfoType.SessionInfo);

if (!result.Success)
{
    Console.WriteLine($"Failed to write info: {result.Message}");
}

```

## Packet Types

The library supports various packet types from the MA.Streaming.OpenData namespace:

### Data Packets

- **PeriodicDataPacket**: Regular interval data (e.g., 100Hz telemetry)
- **RowDataPacket**: Timestamped data rows
- **SynchroDataPacket**: Data logged in synchronous of another. 
- **EventPacket**: Event occurrences
- **MarkerPacket**: Session markers
- **ErrorPacket**: Error occurrences.
- **RawCANPacket**: Raw CAN packets.
- **ConfigurationPacket**: Packet containing list of parameters, events, and group definitions.

### Control Packets

- **NewSessionPacket**: Session start indicator
- **EndOfSessionPacket**: Session end indicator
- **DataFormatDefinitionPacket**: Format definitions
- **CoverageCursorInfoPacket**: Data coverage information

## Complete Example
```csharp 

using Google.Protobuf;

using MA.DataPlatforms.Streaming.Support.Lib.Core.Abstractions;
using MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.DataFormatInfoModule;
using MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.SessionInfoModule;
using MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.SessionInfoModule.Abstractions;
using MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.WritingModule;
using MA.Streaming.OpenData;

public class DataPublisher
{
    private readonly IPacketWriterService writerService;
    private readonly ISessionManagementService sessionService;
    private readonly IDataFormatManagementService formatService;
    private readonly string dataSource;

    private ulong packetId;

    public DataPublisher(
        ISupportLibApi supportLibApi,
        string dataSource)
    {
        this.dataSource = dataSource;

        // Get writer service
        var writerApi = supportLibApi.GetWritingPacketApi();
        this.writerService = writerApi.CreateService().Data;
        this.writerService.Initialise();
        this.writerService.Start();

        // Get session and format services
        var sessionApi = supportLibApi.GetSessionManagerApi();
        this.sessionService = sessionApi.CreateService().Data;
        this.sessionService.Initialise();
        this.sessionService.Start();

        var formatApi = supportLibApi.GetDataFormatManagerApi();
        this.formatService = formatApi.CreateService().Data;
        this.formatService.Initialise();
        this.formatService.Start();
    }

    public void PublishSession()
    {
        // 1. Create session
        var sessionResult = this.sessionService.CreateNewSession(
            new SessionCreationDto(
                dataSource: this.dataSource,
                identifier: "TestRun_001",
                type: "Testing",
                details:
                [
                    new SessionDetailDto("Driver", "TestDriver"), new SessionDetailDto("Track", "TestTrack")
                ]));

        if (!sessionResult.Success ||
            sessionResult.Data == null)
        {
            Console.WriteLine($"Failed to create session: {sessionResult.Message}");
            return;
        }

        var sessionKey = sessionResult.Data.SessionKey;
        Console.WriteLine($"Created session: {sessionKey}");

        // 2. Define data formats
        var engineFormatResult = this.formatService.GetParameterDataFormatId(
            this.dataSource,
            [
                "RPM", "EngineTemp", "Throttle"
            ]);

        if (!engineFormatResult.Success ||
            engineFormatResult.Data == null)
        {
            Console.WriteLine("Failed to create format");
            return;
        }

        var engineFormatId = engineFormatResult.Data.DataFormatId;

        // 3. Send session start packet
        this.SendSessionStartPacket(sessionKey);

        // 4. Send periodic data
        for (int i = 0; i < 100; i++)
        {
            this.SendPeriodicData(sessionKey, engineFormatId, (ulong)i * 10000); // 10ms intervals
            Thread.Sleep(10); // Simulate real-time
        }

        // 5. Send session end packet
        this.SendSessionEndPacket(sessionKey);

        // 6. Mark session as complete
        this.sessionService.EndSession(this.dataSource, sessionKey);

        Console.WriteLine("Session publishing complete");
    }

    private void SendSessionStartPacket(string sessionKey)
    {
        var startPacket = new NewSessionPacket
        {
            DataSource = this.dataSource,
        };

        var packet = new Packet
        {
            SessionKey = sessionKey,
            Content = startPacket.ToByteString(),
            Id = this.packetId++,
            Type = nameof(NewSessionPacket).Replace("Packet", ""),
            IsEssential = true
        };

        this.writerService.WriteData(this.dataSource, "Main", sessionKey, packet);
    }

    private void SendPeriodicData(string sessionKey, ulong formatId, ulong timestamp)
    {
        var periodicData = new PeriodicDataPacket
        {
            DataFormat = new SampleDataFormat
            {
                DataFormatIdentifier = formatId
            },
            StartTime = timestamp,
            Interval = 10000, // 10ms in microseconds
            // Add sample values (RPM, EngineTemp, Throttle)
            Columns =

            {
                new SampleColumn[]
                {
                    new()
                    {
                        DoubleSamples = new DoubleSampleList
                        {
                            Samples =
                            {
                                new DoubleSample[]
                                {
                                    new()
                                    {
                                        Value = 8500.0,
                                        Status = DataStatus.Valid
                                    },
                                    new()
                                    {
                                        Value = 8501.0,
                                        Status = DataStatus.Valid
                                    },
                                    new()
                                    {
                                        Value = 8502.0,
                                        Status = DataStatus.Valid
                                    }
                                }
                            }
                        }
                    },
                    new()
                    {
                        DoubleSamples = new DoubleSampleList
                        {
                            Samples =
                            {
                                new DoubleSample[]
                                {
                                    new()
                                    {
                                        Value = 92.5,
                                        Status = DataStatus.Valid
                                    },
                                    new()
                                    {
                                        Value = 92.5,
                                        Status = DataStatus.Valid
                                    },
                                    new()
                                    {
                                        Value = 92.6,
                                        Status = DataStatus.Valid
                                    }
                                }
                            }
                        }
                    },
                    new()
                    {
                        DoubleSamples = new DoubleSampleList
                        {
                            Samples =
                            {
                                new DoubleSample[]
                                {
                                    new()
                                    {
                                        Value = 0.85,
                                        Status = DataStatus.Valid
                                    },
                                    new()
                                    {
                                        Value = 0.86,
                                        Status = DataStatus.Valid
                                    },
                                    new()
                                    {
                                        Value = 0.87,
                                        Status = DataStatus.Valid
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        var packet = new Packet
        {
            SessionKey = sessionKey,
            Content = periodicData.ToByteString(),
            Id = this.packetId++,
            Type = nameof(PeriodicDataPacket).Replace("Packet", ""),
            IsEssential = false
        };

        var result = this.writerService.WriteData(this.dataSource, "Telemetry", sessionKey, packet);

        if (!result.Success)
        {
            Console.WriteLine($"Failed to write data: {result.Message}");
        }
    }

    private void SendSessionEndPacket(string sessionKey)
    {
        var endPacket = new EndOfSessionPacket
        {
            DataSource = this.dataSource
        };

        var packet = new Packet
        {
            SessionKey = sessionKey,
            Content = endPacket.ToByteString(),
            Id = this.packetId++,
            Type = nameof(EndOfSessionPacket).Replace("Packet", ""),
            IsEssential = true
        };

        this.writerService.WriteData(this.dataSource, "Main", sessionKey, packet);
    }
}

```

## Writing Different Packet Types

### Periodic Data (Regular Intervals)

```csharp

public void WritePeriodicData(string sessionKey, ulong formatId, ulong timestamp)
{
    var periodicData = new PeriodicDataPacket
    {
        DataFormat = new SampleDataFormat
        {
            DataFormatIdentifier = formatId
        },
        StartTime = timestamp,
        Interval = 1000  // 1ms intervals
        Columns = 
        [
            new SampleColumn
            {
                DoubleSamples = new DoubleSampleList
                {
                    Samples = [
                        new DoubleSample
                        {
                            Value = 100.5,
                            Status = DataStatus.Valid
                        },
                        new DoubleSample
                        {
                            Value = 101.2,
                            Status = DataStatus.Valid
                        },
                        new DoubleSample
                        {
                            Value = 102.0,
                            Status = DataStatus.Valid
                        }
                    ]
                }
            }
        ]
    };
    
    var packet = new Packet
    {
        SessionKey = sessionKey,
        Content = periodicData.ToByteString(),
        Id = packetId++,
        Type = "PeriodicData",
        IsEssential = false
    };
    
    writerService.WriteData(dataSource, "Telemetry", sessionKey, packet);
}

```

### Row Data (Timestamped Rows)

```csharp

public void WriteRowData(string sessionKey, ulong formatId)
{
    var rowData = new RowDataPacket
    {
        DataFormat = new SampleDataFormat
        {
            DataFormatIdentifier = formatId
        },
        // The number of rows and timestamps must match.
        Timestamps = [ 1000000, 1001000, 1002000 ],
        Rows = 
        [
            new SampleRow
            {
                DoubleSamples = new DoubleSampleList
                {
                    Samples = 
                    [
                        // Add values for each parameter
                        new DoubleSample
                        {
                            Value = 100.0
                            Status = DataStatus.Valid
                        },
                        new DoubleSample
                        {
                            Value = 101.0
                            Status = DataStatus.Valid
                        },
                        new DoubleSample
                        {
                            Value = 102.0
                            Status = DataStatus.Valid
                        },
                    ]
                }
            },
            new SampleRow
            {
                DoubleSamples = new DoubleSampleList
                {
                    Samples = 
                    [
                        // Add values for each parameter
                        new DoubleSample
                        {
                            Value = 101.0
                            Status = DataStatus.Valid
                        },
                        new DoubleSample
                        {
                            Value = 102.0
                            Status = DataStatus.Valid
                        },
                        new DoubleSample
                        {
                            Value = 103.0
                            Status = DataStatus.Valid
                        },
                    ]
                }
            },
            new SampleRow
            {
                DoubleSamples = new DoubleSampleList
                {
                    Samples = 
                    [
                        // Add values for each parameter
                        new DoubleSample
                        {
                            Value = 102.0
                            Status = DataStatus.Valid
                        },
                        new DoubleSample
                        {
                            Value = 103.0
                            Status = DataStatus.Valid
                        },
                        new DoubleSample
                        {
                            Value = 104.0
                            Status = DataStatus.Valid
                        },
                    ]
                }
            }
        ]
    };
    
    var packet = new Packet
    {
        SessionKey = sessionKey,
        Content = rowData.ToByteString(),
        Id = packetId++,
        Type = "RowData",
        IsEssential = false
    };
    
    writerService.WriteData(dataSource, "VariableRate", sessionKey, packet);
}

```

### Event Data

```csharp
public void WriteEvent(string sessionKey, ulong eventFormatId, ulong timestamp)
{
    var eventData = new EventPacket
    {
        DataFormat = new EventDataFormat
        {
            DataFormatIdentifier = eventFormatId
        },
        Timestamp = timestamp
        RawValues = [/* add raw values for the event if needed */]
    };
    
    var packet = new Packet
    {
        SessionKey = sessionKey,
        Content = eventData.ToByteString(),
        Id = packetId++,
        Type = "EventData",
        IsEssential = true
    };
    
    writerService.WriteData(dataSource, "Events", sessionKey, packet);
}

```

### Marker Data

```csharp
public void WriteMarker(string sessionKey, string markerLabel, ulong timestamp)
{
    var markerData = new MarkerPacket
    {
        Timestamp = timestamp,
        Label = markerLabel,
        Description = "Important event marker"
    };
    
    var packet = new Packet
    {
        SessionKey = sessionKey,
        Content = markerData.ToByteString(),
        Id = packetId++,
        Type = "MarkerData",
        IsEssential = false
    };
    
    writerService.WriteData(dataSource, "Markers", sessionKey, packet);
}

```
## Best Practices

1. **Initialize Once**: Create a single writer service that can write to multiple sessions.

2. **Sequential Packet IDs**: Maintain a counter for packet IDs to ensure proper ordering.

3. **Mark Essential Packets**: Set `IsEssential = true` for critical packets (session start/end, format definitions).

4. **Use Appropriate Streams**: Organize data into logical streams (e.g., "Telemetry", "Events", "Markers").

5. **Send Session Lifecycle Packets**: Always send NewSessionPacket at start and EndOfSessionPacket at end.

6. **Define Formats First**: Create data formats before sending data packets that reference them.

7. **Handle Write Failures**: Always check the result and handle failures appropriately.

8. **Batch When Possible**: Group related data in single packets to reduce overhead.

## Error Handling

```csharp
public bool SafeWriteData(string dataSource, string stream, string sessionKey, Packet packet)
{
    var result = writerService.WriteData(dataSource, stream, sessionKey, packet);
    
    if (!result.Success)
    {
        logger.Error($"Failed to write packet {packet.Id}: {result.Message}");
        
        // Implement retry logic if needed
        for (int retry = 0; retry < 3; retry++)
        {
            Thread.Sleep(100 * (retry + 1));
            result = writerService.WriteData(dataSource, stream, sessionKey, packet);
            
            if (result.Success)
            {
                logger.Info($"Packet {packet.Id} written on retry {retry + 1}");
                return true;
            }
        }
        
        return false;
    }
    
    return true;
}

```

## Integration with Other Modules

### With Session Manager

```csharp
// Create session first
var sessionResult = sessionService.CreateNewSession(sessionDto);
var sessionKey = sessionResult.Data.SessionKey;

// Then write data to that session
writerService.WriteData(dataSource, stream, sessionKey, packet);

// End session when done
sessionService.EndSession(dataSource, sessionKey);

```

### With Data Format Manager

```csharp
// Define format first
var formatResult = formatService.GetParameterDataFormatId(dataSource, parameters);
var formatId = formatResult.Data.DataFormatId;

// Create packet with format ID
var periodicData = new PeriodicDataPacket
{
    DataFormat = new SampleDataFormat{DataFormatIdentifier = formatId},
    // ... data
};

// Write the packet
writerService.WriteData(dataSource, stream, sessionKey, packet);

```

## Performance Considerations

1. **Minimize Serialization Overhead**: Reuse packet objects when possible
2. **Batch Data**: Combine multiple values in single packets
3. **Use Appropriate Intervals**: Don't send data more frequently than needed
4. **Stream Selection**: Use different streams to parallelize writes
5. **Essential Flag**: Use sparingly to avoid unnecessary broker overhead

## Cleanup

```csharp
// When done with the writer service
writerService.Stop();
```

## See Also

- [Session Manager Module](session-manager.md)
- [Data Format Manager Module](data-format-manager.md)
- [Reader Module](reader-module.md)
- [API Reference](api-reference.md)
