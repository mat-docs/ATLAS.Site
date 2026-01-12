# API Reference

Complete reference for the Stream API gRPC services and message types based on `ma.streaming.api.v1`.

## Service Overview

The Stream API consists of four main gRPC services:

1. **[Connection Manager Service](#connection-manager-service)**: Manage client connections and data source access
2. **[Session Management Service](#session-management-service)**: Handle data sessions and session lifecycle
3. **[Packet Writer Service](#packet-writer-service)**: Publish data and info packets to streams
4. **[Packet Reader Service](#packet-reader-service)**: Consume data packets with filtering capabilities
5. **[Data Format Manager Service](#data-format-manager-service)**: Manage data format identifiers for parameters and events

## Connection Manager Service

Manages client connections to data sources and streams. Connections maintain current offset positions and provide access to streaming data.

### Methods

#### NewConnection
Creates a new connection to data streams.

```protobuf
rpc NewConnection(NewConnectionRequest) returns (NewConnectionResponse);
```

**Request:**
```protobuf
message NewConnectionRequest {
  ConnectionDetails details = 1;
}

message ConnectionDetails {
  string data_source = 1;                    // Data source to read from
  string session_key = 2;                    // Session key (optional if sessions not used)
  repeated string streams = 3;               // Streams to read (optional for all streams)
  repeated int64 stream_offsets = 4;         // Start offset for each stream (-1=Latest, 0=Earliest)
  int64 main_offset = 5;                     // Offset for main data source topic
  int64 essentials_offset = 6;               // Offset for essentials topic
  bool exclude_main_stream = 7;              // Exclude main stream from reading
}
```

**Response:**
```protobuf
message NewConnectionResponse {
  Connection connection = 1;                 // Connection identifier
}

message Connection {
  int64 id = 1;                             // Internal connection ID (do not modify)
}
```

#### GetConnection
Retrieves details of an existing connection.

```protobuf
rpc GetConnection(GetConnectionRequest) returns (GetConnectionResponse);
```

**Request:**
```protobuf
message GetConnectionRequest {
  Connection connection = 1;                // Connection identifier
}
```

**Response:**
```protobuf
message GetConnectionResponse {
  ConnectionDetails details = 1;            // The connection details
}
```

#### CloseConnection
Closes an existing connection.

```protobuf
rpc CloseConnection(CloseConnectionRequest) returns (CloseConnectionResponse);
```

**Request:**
```protobuf
message CloseConnectionRequest {
  Connection connection = 1;                // Connection identifier
}
```

**Response:**
```protobuf
message CloseConnectionResponse {
  bool success = 1;                         // Whether the close connection request succeeded
}
```

### Usage Examples

```csharp
// Create connection
var connectionManager = StreamingApiClient.GetConnectionManagerClient();
var connection = await connectionManager.NewConnectionAsync(new NewConnectionRequest
{
    Details = new ConnectionDetails
    {
        DataSource = "telemetry",
        SessionKey = "session-001",
        Streams = { "engine", "brakes" },
        StreamOffsets = { 0, 0 }
    }
});

// Get connection info
var info = await connectionManager.GetConnectionAsync(new GetConnectionRequest
{
    Connection = connection.Connection
});

// Close connection
await connectionManager.CloseConnectionAsync(new CloseConnectionRequest
{
    Connection = connection.Connection
});
```

## Session Management Service

Manages data sessions and session lifecycle. Sessions group related data streams and provide metadata context.

### Methods

#### CreateSession
Creates a new data session with metadata.

```protobuf
rpc CreateSession(CreateSessionRequest) returns (CreateSessionResponse);
```

**Request:**
```protobuf
message CreateSessionRequest {
  string data_source = 1;                   // Data source name
  string type = 2;                          // Session type (defaults to "Session")
  uint32 version = 3;                       // Version (defaults to 1)
  google.protobuf.Duration utc_offset = 4;  // UTC offset for timezone
  string identifier = 5;                    // Session identifier
  repeated string associate_session_key = 6; // Associated session keys
  map<string, string> details = 7;          // Session details (key-value pairs)
}
```

**Response:**
```protobuf
message CreateSessionResponse {
  string session_key = 1;                   // Unique session key
  ma.streaming.open_data.v1.NewSessionPacket new_session = 2; // New session packet
  bool success = 3;                         // Whether creation succeeded
}
```

#### EndSession
Ends an existing session.

```protobuf
rpc EndSession(EndSessionRequest) returns (EndSessionResponse);
```

**Request:**
```protobuf
message EndSessionRequest {
  string data_source = 1;                   // Data source name
  string session_key = 2;                   // Unique session key
}
```

**Response:**
```protobuf
message EndSessionResponse {
  ma.streaming.open_data.v1.EndOfSessionPacket end_session = 2; // End session packet
  bool success = 3;                         // Whether end succeeded
}
```

#### GetCurrentSessions
Lists all active sessions for a data source.

```protobuf
rpc GetCurrentSessions(GetCurrentSessionsRequest) returns (GetCurrentSessionsResponse);
```

**Request:**
```protobuf
message GetCurrentSessionsRequest {
  string data_source = 1;                   // Data source name
}
```

**Response:**
```protobuf
message GetCurrentSessionsResponse {
  repeated string session_keys = 1;         // List of active session keys
  bool success = 2;                         // Whether request succeeded
}
```

#### GetSessionInfo
Retrieves detailed information about a session.

```protobuf
rpc GetSessionInfo(GetSessionInfoRequest) returns (GetSessionInfoResponse);
```

**Request:**
```protobuf
message GetSessionInfoRequest {
  string session_key = 1;                   // Unique session key
}
```

**Response:**
```protobuf
message GetSessionInfoResponse {
  string data_source = 1;                   // Data source name
  string identifier = 2;                    // Session identifier
  string type = 3;                          // Session type
  uint32 version = 4;                       // Session version
  repeated string associate_session_keys = 5; // Associated sessions
  bool is_complete = 6;                      // Whether session is completed
  repeated string streams = 7;               // Available streams
  map<string, int64> topic_partition_offsets = 8; // Topic/partition offsets
  int64 main_offset = 9;                     // Main topic offset
  int64 essentials_offset = 10;              // Essentials topic offset
  map<string, string> details = 11;         // Session details
  google.protobuf.Duration utc_offset = 12; // UTC offset
  bool success = 13;                         // Whether request succeeded
}
```

#### GetSessionStartNotification
Continuously receives notifications when sessions start.

```protobuf
rpc GetSessionStartNotification(GetSessionStartNotificationRequest) returns (stream GetSessionStartNotificationResponse);
```

**Request:**
```protobuf
message GetSessionStartNotificationRequest {
  string data_source = 1;                   // Data source name
}
```

**Response:**
```protobuf
message GetSessionStartNotificationResponse {
  string session_key = 1;                   // Unique session key of the started session
  string data_source = 2;                   // Data source name
}
```

#### GetSessionStopNotification
Continuously receives notifications when sessions end.

```protobuf
rpc GetSessionStopNotification(GetSessionStopNotificationRequest) returns (stream GetSessionStopNotificationResponse);
```

**Request:**
```protobuf
message GetSessionStopNotificationRequest {
  string data_source = 1;                   // Data source name
}
```

**Response:**
```protobuf
message GetSessionStopNotificationResponse {
  string session_key = 1;                   // Unique session key of the ended session
  string data_source = 2;                   // Data source name
}
```

#### UpdateSessionIdentifier
Updates the identifier of an existing session.

```protobuf
rpc UpdateSessionIdentifier(UpdateSessionIdentifierRequest) returns (UpdateSessionIdentifierResponse);
```

**Request:**
```protobuf
message UpdateSessionIdentifierRequest {
  string session_key = 1;                   // Unique session key
  string identifier = 2;                    // Session identifier
}
```

**Response:**
```protobuf
message UpdateSessionIdentifierResponse {
  bool success = 1;                         // Whether the update session identifier request succeeded
}
```

#### AddAssociateSession
Associates one session with another.

```protobuf
rpc AddAssociateSession(AddAssociateSessionRequest) returns (AddAssociateSessionResponse);
```

**Request:**
```protobuf
message AddAssociateSessionRequest {
  string session_key = 1;                   // Unique session key of the parent session
  string associate_session_key = 2;         // Unique session key of the associate session
}
```

**Response:**
```protobuf
message AddAssociateSessionResponse {
  bool success = 1;                         // Whether the add associate session request succeeded
}
```

#### UpdateSessionDetails
Updates the details of an existing session.

```protobuf
rpc UpdateSessionDetails(UpdateSessionDetailsRequest) returns (UpdateSessionDetailsResponse);
```

**Request:**
```protobuf
message UpdateSessionDetailsRequest {
  string session_key = 1;                   // Unique session key
  map<string, string> details = 2;          // Session details to update (detail name, detail value)
}
```

**Response:**
```protobuf
message UpdateSessionDetailsResponse {
  bool success = 1;                         // Whether the update session details request succeeded
}
```

### Usage Examples

```csharp
var sessionManager = StreamingApiClient.GetSessionManagerClient();

// Create session
var session = await sessionManager.CreateSessionAsync(new CreateSessionRequest
{
    SessionKey = "race-session-001",
    DataSource = "telemetry",
    SessionInfo = new SessionInfoPacket
    {
        Type = "Race Session",
        Version = 1,
        Identifier = "silverstone-2024",
        Details = 
        {
            ["track"] = "Silverstone Circuit",
            ["weather"] = "dry"
        }
    }
});

// Update session
await sessionManager.UpdateSessionInfoAsync(new UpdateSessionInfoRequest
{
    SessionKey = "race-session-001",
    SessionInfo = new SessionInfoPacket
    {
        Details = { ["status"] = "active" }
    }
});
```

## Packet Writer Service

Provides methods to write data packets to streams. Supports both single packet and batch operations.

### Methods

#### WriteDataPacket
Writes a single data packet to the stream.

```protobuf
rpc WriteDataPacket(WriteDataPacketRequest) returns (WriteDataPacketResponse);
```

**Request:**
```protobuf
message WriteDataPacketRequest {
  DataPacketDetails detail = 1;
}

message DataPacketDetails {
  ma.streaming.open_data.v1.Packet message = 1; // Packet to write
  string data_source = 2;                        // Data source for this packet
  string stream = 3;                             // Stream name to which to write
  string session_key = 4;                        // Unique session key
}
```

**Response:**
```protobuf
message WriteDataPacketResponse {
}
```

#### WriteDataPackets
Writes multiple data packets in a batch/streaming operation.

```protobuf
rpc WriteDataPackets(stream WriteDataPacketsRequest) returns (WriteDataPacketsResponse);
```

**Request:**
```protobuf
message WriteDataPacketsRequest {
  repeated DataPacketDetails details = 1;
}
```

**Response:**
```protobuf
message WriteDataPacketsResponse {
}
```

#### WriteInfoPacket
Writes a single info packet to the stream.

```protobuf
rpc WriteInfoPacket(WriteInfoPacketRequest) returns (WriteInfoPacketResponse);
```

**Request:**
```protobuf
message WriteInfoPacketRequest {
  ma.streaming.open_data.v1.Packet message = 1; // Packet to write
  InfoType type = 2;                             // Type for this packet
}

enum InfoType {
  INFO_TYPE_UNSPECIFIED = 0;  // Unspecified
  INFO_TYPE_SESSION_INFO = 1; // Session info
  INFO_TYPE_SYSTEM_STATUS = 2; // System status
}
```

**Response:**
```protobuf
message WriteInfoPacketResponse {
}
```

#### WriteInfoPackets
Writes multiple info packets in a streaming operation.

```protobuf
rpc WriteInfoPackets(stream WriteInfoPacketsRequest) returns (WriteInfoPacketsResponse);
```

**Request:**
```protobuf
message WriteInfoPacketsRequest {
  ma.streaming.open_data.v1.Packet message = 1; // Packet to write
  InfoType type = 2;                             // Type for this packet
}
```

**Response:**
```protobuf
message WriteInfoPacketsResponse {
}
```

### Usage Examples

```csharp
using MA.Streaming.OpenData;
using MA.Streaming.API;

var packetWriter = StreamingApiClient.GetPacketWriterClient();

// Create periodic data packet with parameter samples
var timestamp = (ulong)DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() * 1000000; // nanoseconds

var periodicData = new PeriodicDataPacket
{
    DataFormat = new SampleDataFormat
    {
        ParameterIdentifiers = new ParameterList
        {
            ParameterIdentifiers =
            {
                "Engine.Rpm",
                "Engine.Temperature",
                "Engine.OilPressure"
            }
        }
    },
    StartTime = timestamp,
    Interval = 100000000, // 100ms in nanoseconds  
    Columns =
    {
        new SampleColumn // RPM
        {
            DoubleSamples = new DoubleSampleList
            {
                Samples =
                {
                    new DoubleSample
                    {
                        Value = 5000.0,
                        Status = DataStatus.Valid
                    }
                }
            }
        },
        new SampleColumn // Temperature
        {
            DoubleSamples = new DoubleSampleList
            {
                Samples =
                {
                    new DoubleSample
                    {
                        Value = 85.5,
                        Status = DataStatus.Valid
                    }
                }
            }
        },
        new SampleColumn // Oil Pressure
        {
            DoubleSamples = new DoubleSampleList
            {
                Samples =
                {
                    new DoubleSample
                    {
                        Value = 4.2,
                        Status = DataStatus.Valid
                    }
                }
            }
        }
    }
};

// Write single packet
await packetWriter.WriteDataPacketAsync(
    new WriteDataPacketRequest
    {
        Detail = new DataPacketDetails
        {
            DataSource = "telemetry",
            Stream = "engine",
            SessionKey = "session-001",
            Message = new Packet
            {
                Content = periodicData.ToByteString(),
                Type = "PeriodicData",
                IsEssential = false,
                SessionKey = "session-001"
            }
        }
    });

// Write multiple packets in batch
var packets = new List<Packet> 
{ 
    new Packet
    {
        Content = periodicData.ToByteString(),
        Type = "PeriodicData",
        SessionKey = "session-001"
    }
};

var batchResponse = await packetWriter.WriteDataPacketsAsync(new WriteDataPacketsRequest
{
    Details = { 
        new DataPacketDetails
        {
            DataSource = "telemetry",
            Stream = "engine",
            SessionKey = "session-001",
            Message = packets[0]
        }
    }
});
```

## Packet Reader Service

Provides methods to read data packets from streams with filtering and streaming capabilities.

### Methods

#### ReadPackets
Reads data packets from streams with optional filtering.

```protobuf
rpc ReadPackets(ReadPacketsRequest) returns (stream ReadPacketsResponse);
```

**Request:**
```protobuf
message ReadPacketsRequest {
  Connection connection = 1;
}
```

**Response:**
```protobuf
message ReadPacketsResponse {
  repeated PacketResponse response = 1;
}

message PacketResponse {
  ma.streaming.open_data.v1.Packet packet = 1; // The packet that was read
  string stream = 2;                            // The stream the packet was read from
  google.protobuf.Timestamp submit_time = 3;    // Time that packet was submitted to broker
}
```

#### ReadEssentials
Reads only essential packets from the stream.

```protobuf
rpc ReadEssentials(ReadEssentialsRequest) returns (stream ReadEssentialsResponse);
```

**Request:**
```protobuf
message ReadEssentialsRequest {
  Connection connection = 1;
}
```

**Response:**
```protobuf
message ReadEssentialsResponse {
  repeated PacketResponse response = 1;
}
```

#### ReadDataPackets
Reads data packets with advanced filtering capabilities.

```protobuf
rpc ReadDataPackets(ReadDataPacketsRequest) returns (stream ReadDataPacketsResponse);
```

**Request:**
```protobuf
message ReadDataPacketsRequest {
  DataPacketRequest request = 1;
}

message DataPacketRequest {
  Connection connection = 1;                     // Connection to read
  repeated string include_parameters = 2;        // Parameters to include (regex)
  repeated string exclude_parameters = 3;        // Parameters to exclude (regex)
  repeated string include_events = 4;            // Events to include (regex)
  repeated string exclude_events = 5;            // Events to exclude (regex)
  bool include_markers = 6;                      // Include markers?
}
```

**Response:**
```protobuf
message ReadDataPacketsResponse {
  repeated PacketResponse response = 1;
}
```

### Usage Examples

```csharp
using MA.Streaming.OpenData;

var packetReader = StreamingApiClient.GetPacketReaderClient();

// Get connection details first
var connectionManager = StreamingApiClient.GetConnectionManagerClient();
var connectionResponse = await connectionManager.NewConnectionAsync(new NewConnectionRequest
{
    Details = new ConnectionDetails
    {
        DataSource = "telemetry",
        SessionKey = "session-001",
        Streams =
        {
            "engine",
            "brakes",
            "suspension",
            "position"
        },
        StreamOffsets =
        {
            0,
            0,
            0,
            0
        } // Start from beginning
    }
});

// Read all packets
var readRequest = new ReadPacketsRequest
{
    Connection = connectionResponse.Connection
};

var stream = packetReader.ReadPackets(readRequest);
while (await stream.ResponseStream.MoveNext())
{
    var response = stream.ResponseStream.Current;
    if (response.Success)
    {
        var packet = response.Packet;
        
        // Process different packet types
        switch (packet.Type)
        {
            case "PeriodicData":
                ProcessPeriodicData(packet);
                break;
            case "Event":
                ProcessEvent(packet);
                break;
            case "Configuration":
                ProcessConfiguration(packet);
                break;
        }
    }
}

// Read only essential packets
var essentialsRequest = new ReadEssentialsRequest
{
    Connection = connectionResponse.Connection
};

var essentialsStream = packetReader.ReadEssentials(essentialsRequest);
while (await essentialsStream.ResponseStream.MoveNext())
{
    var response = essentialsStream.ResponseStream.Current;
    if (response.Success)
    {
        ProcessEssentialPacket(response.Packet);
    }
}
```

## Data Format Manager Service

Manages data format definitions and provides access to parameter and event schemas.

### Methods

#### GetParameterDataFormatId
Retrieves the data format ID for parameter data.

```protobuf
rpc GetParameterDataFormatId(GetParameterDataFormatIdRequest) returns (GetParameterDataFormatIdResponse);
```

**Request:**
```protobuf
message GetParameterDataFormatIdRequest {
  string data_source = 1;                        // Data source name
  repeated string parameters = 2;                // Ordered list of parameter identifiers
}
```

**Response:**
```protobuf
message GetParameterDataFormatIdResponse {
  uint64 data_format_identifier = 1;             // Data format identifier
}
```

#### GetEventDataFormatId
Retrieves the data format ID for event data.

```protobuf
rpc GetEventDataFormatId(GetEventDataFormatIdRequest) returns (GetEventDataFormatIdResponse);
```

**Request:**
```protobuf
message GetEventDataFormatIdRequest {
  string data_source = 1;                        // Data source name
  string event = 2;                              // Event identifier
}
```

**Response:**
```protobuf
message GetEventDataFormatIdResponse {
  uint64 data_format_identifier = 1;             // Data format identifier
}
```

#### GetParametersList
Retrieves the list of available parameters for a data source.

```protobuf
rpc GetParametersList(GetParametersListRequest) returns (GetParametersListResponse);
```

**Request:**
```protobuf
message GetParametersListRequest {
  string data_source = 1;                        // Data source name
  uint64 data_format_identifier = 2;             // Data format identifier
}
```

**Response:**
```protobuf
message GetParametersListResponse {
  repeated string parameters = 1;                // List of parameters
}
```

#### GetEvent
Retrieves information about a specific event.

```protobuf
rpc GetEvent(GetEventRequest) returns (GetEventResponse);
```

**Request:**
```protobuf
message GetEventRequest {
  string data_source = 1;                        // Data source name
  uint64 data_format_identifier = 2;             // Data format identifier
}
```

**Response:**
```protobuf
message GetEventResponse {
  string event = 1;                              // Event identifier
}
```

### Usage Examples

```csharp
var dataFormatManager = StreamingApiClient.GetDataFormatManagerClient();

// Get parameter data format ID
var parameterFormatResponse = await dataFormatManager.GetParameterDataFormatIdAsync(
    new GetParameterDataFormatIdRequest
    {
        DataSource = "telemetry"
    });

if (parameterFormatResponse.Success)
{
    var formatId = parameterFormatResponse.DataFormatId;
    Console.WriteLine($"Parameter data format ID: {formatId}");
}

// Get event data format ID
var eventFormatResponse = await dataFormatManager.GetEventDataFormatIdAsync(
    new GetEventDataFormatIdRequest
    {
        DataSource = "telemetry"
    });

// Get parameters list
var parametersResponse = await dataFormatManager.GetParametersListAsync(
    new GetParametersListRequest
    {
        DataSource = "telemetry"
    });

if (parametersResponse.Success)
{
    foreach (var parameter in parametersResponse.Parameters)
    {
        Console.WriteLine($"Parameter: {parameter.Name} (ID: {parameter.Id})");
    }
}

// Get specific event information
var eventResponse = await dataFormatManager.GetEventAsync(
    new GetEventRequest
    {
        DataSource = "telemetry",
        EventId = 1001
    });

if (eventResponse.Success)
{
    var eventInfo = eventResponse.Event;
    Console.WriteLine($"Event: {eventInfo.Name} - {eventInfo.Description}");
}
```

## Common Message Types

### Error Handling

All services use standard gRPC status codes:

- `OK` (0): Success
- `INVALID_ARGUMENT` (3): Invalid request parameters
- `NOT_FOUND` (5): Resource not found
- `ALREADY_EXISTS` (6): Resource already exists
- `RESOURCE_EXHAUSTED` (8): Resource limits exceeded
- `UNAVAILABLE` (14): Service temporarily unavailable

### Status Codes

```csharp
try
{
    var result = await client.SomeOperation();
}
catch (RpcException ex)
{
    switch (ex.StatusCode)
    {
        case StatusCode.InvalidArgument:
            // Handle invalid parameters
            break;
        case StatusCode.NotFound:
            // Handle missing resource
            break;
        case StatusCode.Unavailable:
            // Handle service unavailable
            break;
        default:
            // Handle other errors
            break;
    }
}
```

## Monitoring and Metrics (Optional)

### Prometheus Metrics

If Prometheus is enabled with admin privileges, metrics are available at `/metrics` endpoint (default port 10010):

**Write Metrics:**
- `stream_api_data_packets_published_total`: Number of data packets published
- `stream_api_info_packets_published_total`: Number of info packets published
- `stream_api_data_packets_routed_total`: Number of data packets routed
- `stream_api_data_packets_routed_bytes_total`: Total bytes of data packets routed
- `stream_api_info_packets_routed_total`: Number of info packets routed
- `stream_api_info_packets_routed_bytes_total`: Total bytes of info packets routed

**Read Metrics:**
- `stream_api_data_packets_read_total`: Number of data packets read
- `stream_api_data_packets_delivered_total`: Number of data packets delivered
- `stream_api_essential_packets_read_total`: Number of essential packets read
- `stream_api_essential_packets_delivered_total`: Number of essential packets delivered
- `stream_api_router_messages_received_total`: Total messages received from router
- `stream_api_router_messages_received_bytes_total`: Total message bytes received from router

**Resource Metrics:**
- `stream_api_connections_total`: Number of active connections
- `stream_api_sessions_total`: Number of available sessions
- `stream_api_data_formats_total`: Number of data formats stored

## See Also

- [Service Documentation](../services/connection-management.md)
- [Examples](../examples/telemetry-example.md)
- [Error Handling](error-handling.md)