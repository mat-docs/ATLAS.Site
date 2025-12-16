# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [ma/streaming/api/v1/api.proto](#ma_streaming_api_v1_api-proto)
    - [AddAssociateSessionRequest](#ma-streaming-api-v1-AddAssociateSessionRequest)
    - [AddAssociateSessionResponse](#ma-streaming-api-v1-AddAssociateSessionResponse)
    - [CloseConnectionRequest](#ma-streaming-api-v1-CloseConnectionRequest)
    - [CloseConnectionResponse](#ma-streaming-api-v1-CloseConnectionResponse)
    - [Connection](#ma-streaming-api-v1-Connection)
    - [ConnectionDetails](#ma-streaming-api-v1-ConnectionDetails)
    - [CreateSessionRequest](#ma-streaming-api-v1-CreateSessionRequest)
    - [CreateSessionRequest.DetailsEntry](#ma-streaming-api-v1-CreateSessionRequest-DetailsEntry)
    - [CreateSessionResponse](#ma-streaming-api-v1-CreateSessionResponse)
    - [DataPacketDetails](#ma-streaming-api-v1-DataPacketDetails)
    - [DataPacketRequest](#ma-streaming-api-v1-DataPacketRequest)
    - [EndSessionRequest](#ma-streaming-api-v1-EndSessionRequest)
    - [EndSessionResponse](#ma-streaming-api-v1-EndSessionResponse)
    - [GetConnectionRequest](#ma-streaming-api-v1-GetConnectionRequest)
    - [GetConnectionResponse](#ma-streaming-api-v1-GetConnectionResponse)
    - [GetCurrentSessionsRequest](#ma-streaming-api-v1-GetCurrentSessionsRequest)
    - [GetCurrentSessionsResponse](#ma-streaming-api-v1-GetCurrentSessionsResponse)
    - [GetEventDataFormatIdRequest](#ma-streaming-api-v1-GetEventDataFormatIdRequest)
    - [GetEventDataFormatIdResponse](#ma-streaming-api-v1-GetEventDataFormatIdResponse)
    - [GetEventRequest](#ma-streaming-api-v1-GetEventRequest)
    - [GetEventResponse](#ma-streaming-api-v1-GetEventResponse)
    - [GetParameterDataFormatIdRequest](#ma-streaming-api-v1-GetParameterDataFormatIdRequest)
    - [GetParameterDataFormatIdResponse](#ma-streaming-api-v1-GetParameterDataFormatIdResponse)
    - [GetParametersListRequest](#ma-streaming-api-v1-GetParametersListRequest)
    - [GetParametersListResponse](#ma-streaming-api-v1-GetParametersListResponse)
    - [GetSessionInfoRequest](#ma-streaming-api-v1-GetSessionInfoRequest)
    - [GetSessionInfoResponse](#ma-streaming-api-v1-GetSessionInfoResponse)
    - [GetSessionInfoResponse.DetailsEntry](#ma-streaming-api-v1-GetSessionInfoResponse-DetailsEntry)
    - [GetSessionInfoResponse.TopicPartitionOffsetsEntry](#ma-streaming-api-v1-GetSessionInfoResponse-TopicPartitionOffsetsEntry)
    - [GetSessionStartNotificationRequest](#ma-streaming-api-v1-GetSessionStartNotificationRequest)
    - [GetSessionStartNotificationResponse](#ma-streaming-api-v1-GetSessionStartNotificationResponse)
    - [GetSessionStopNotificationRequest](#ma-streaming-api-v1-GetSessionStopNotificationRequest)
    - [GetSessionStopNotificationResponse](#ma-streaming-api-v1-GetSessionStopNotificationResponse)
    - [NewConnectionRequest](#ma-streaming-api-v1-NewConnectionRequest)
    - [NewConnectionResponse](#ma-streaming-api-v1-NewConnectionResponse)
    - [PacketResponse](#ma-streaming-api-v1-PacketResponse)
    - [ReadDataPacketsRequest](#ma-streaming-api-v1-ReadDataPacketsRequest)
    - [ReadDataPacketsResponse](#ma-streaming-api-v1-ReadDataPacketsResponse)
    - [ReadEssentialsRequest](#ma-streaming-api-v1-ReadEssentialsRequest)
    - [ReadEssentialsResponse](#ma-streaming-api-v1-ReadEssentialsResponse)
    - [ReadPacketsRequest](#ma-streaming-api-v1-ReadPacketsRequest)
    - [ReadPacketsResponse](#ma-streaming-api-v1-ReadPacketsResponse)
    - [UpdateSessionDetailsRequest](#ma-streaming-api-v1-UpdateSessionDetailsRequest)
    - [UpdateSessionDetailsRequest.DetailsEntry](#ma-streaming-api-v1-UpdateSessionDetailsRequest-DetailsEntry)
    - [UpdateSessionDetailsResponse](#ma-streaming-api-v1-UpdateSessionDetailsResponse)
    - [UpdateSessionIdentifierRequest](#ma-streaming-api-v1-UpdateSessionIdentifierRequest)
    - [UpdateSessionIdentifierResponse](#ma-streaming-api-v1-UpdateSessionIdentifierResponse)
    - [WriteDataPacketRequest](#ma-streaming-api-v1-WriteDataPacketRequest)
    - [WriteDataPacketResponse](#ma-streaming-api-v1-WriteDataPacketResponse)
    - [WriteDataPacketsRequest](#ma-streaming-api-v1-WriteDataPacketsRequest)
    - [WriteDataPacketsResponse](#ma-streaming-api-v1-WriteDataPacketsResponse)
    - [WriteInfoPacketRequest](#ma-streaming-api-v1-WriteInfoPacketRequest)
    - [WriteInfoPacketResponse](#ma-streaming-api-v1-WriteInfoPacketResponse)
    - [WriteInfoPacketsRequest](#ma-streaming-api-v1-WriteInfoPacketsRequest)
    - [WriteInfoPacketsResponse](#ma-streaming-api-v1-WriteInfoPacketsResponse)
  
    - [InfoType](#ma-streaming-api-v1-InfoType)
  
    - [ConnectionManagerService](#ma-streaming-api-v1-ConnectionManagerService)
    - [DataFormatManagerService](#ma-streaming-api-v1-DataFormatManagerService)
    - [PacketReaderService](#ma-streaming-api-v1-PacketReaderService)
    - [PacketWriterService](#ma-streaming-api-v1-PacketWriterService)
    - [SessionManagementService](#ma-streaming-api-v1-SessionManagementService)
  
- [ma/streaming/open_data/v1/open_data.proto](#ma_streaming_open_data_v1_open_data-proto)
    - [AxisDataPacket](#ma-streaming-open_data-v1-AxisDataPacket)
    - [BoolSample](#ma-streaming-open_data-v1-BoolSample)
    - [BoolSampleList](#ma-streaming-open_data-v1-BoolSampleList)
    - [ConfigurationPacket](#ma-streaming-open_data-v1-ConfigurationPacket)
    - [CoverageCursorInfoPacket](#ma-streaming-open_data-v1-CoverageCursorInfoPacket)
    - [DataFormatConfigurationPacket](#ma-streaming-open_data-v1-DataFormatConfigurationPacket)
    - [DataFormatDefinitionPacket](#ma-streaming-open_data-v1-DataFormatDefinitionPacket)
    - [DoubleSample](#ma-streaming-open_data-v1-DoubleSample)
    - [DoubleSampleList](#ma-streaming-open_data-v1-DoubleSampleList)
    - [EndOfSessionPacket](#ma-streaming-open_data-v1-EndOfSessionPacket)
    - [EndOfSessionPacket.TopicPartitionOffsetsEntry](#ma-streaming-open_data-v1-EndOfSessionPacket-TopicPartitionOffsetsEntry)
    - [ErrorPacket](#ma-streaming-open_data-v1-ErrorPacket)
    - [EventDataFormat](#ma-streaming-open_data-v1-EventDataFormat)
    - [EventDefinition](#ma-streaming-open_data-v1-EventDefinition)
    - [EventPacket](#ma-streaming-open_data-v1-EventPacket)
    - [FormulaDefinition](#ma-streaming-open_data-v1-FormulaDefinition)
    - [GroupDefinition](#ma-streaming-open_data-v1-GroupDefinition)
    - [Int32Sample](#ma-streaming-open_data-v1-Int32Sample)
    - [Int32SampleList](#ma-streaming-open_data-v1-Int32SampleList)
    - [MapDataPacket](#ma-streaming-open_data-v1-MapDataPacket)
    - [MarkerPacket](#ma-streaming-open_data-v1-MarkerPacket)
    - [MetadataPacket](#ma-streaming-open_data-v1-MetadataPacket)
    - [MetadataPacket.MetadataEntry](#ma-streaming-open_data-v1-MetadataPacket-MetadataEntry)
    - [NewSessionPacket](#ma-streaming-open_data-v1-NewSessionPacket)
    - [NewSessionPacket.TopicPartitionOffsetsEntry](#ma-streaming-open_data-v1-NewSessionPacket-TopicPartitionOffsetsEntry)
    - [Packet](#ma-streaming-open_data-v1-Packet)
    - [ParameterDefinition](#ma-streaming-open_data-v1-ParameterDefinition)
    - [ParameterList](#ma-streaming-open_data-v1-ParameterList)
    - [PeriodicDataPacket](#ma-streaming-open_data-v1-PeriodicDataPacket)
    - [RawCANDataPacket](#ma-streaming-open_data-v1-RawCANDataPacket)
    - [RowDataPacket](#ma-streaming-open_data-v1-RowDataPacket)
    - [SampleColumn](#ma-streaming-open_data-v1-SampleColumn)
    - [SampleDataFormat](#ma-streaming-open_data-v1-SampleDataFormat)
    - [SampleRow](#ma-streaming-open_data-v1-SampleRow)
    - [SessionInfoPacket](#ma-streaming-open_data-v1-SessionInfoPacket)
    - [SessionInfoPacket.DetailsEntry](#ma-streaming-open_data-v1-SessionInfoPacket-DetailsEntry)
    - [StringSample](#ma-streaming-open_data-v1-StringSample)
    - [StringSampleList](#ma-streaming-open_data-v1-StringSampleList)
    - [SynchroDataPacket](#ma-streaming-open_data-v1-SynchroDataPacket)
    - [SystemStatusMessage](#ma-streaming-open_data-v1-SystemStatusMessage)
    - [TextConversionDefinition](#ma-streaming-open_data-v1-TextConversionDefinition)
    - [ValueArray](#ma-streaming-open_data-v1-ValueArray)
  
    - [CanType](#ma-streaming-open_data-v1-CanType)
    - [DataFormatType](#ma-streaming-open_data-v1-DataFormatType)
    - [DataStatus](#ma-streaming-open_data-v1-DataStatus)
    - [DataType](#ma-streaming-open_data-v1-DataType)
    - [ErrorStatus](#ma-streaming-open_data-v1-ErrorStatus)
    - [ErrorType](#ma-streaming-open_data-v1-ErrorType)
    - [EventPriority](#ma-streaming-open_data-v1-EventPriority)
    - [FormulaType](#ma-streaming-open_data-v1-FormulaType)
    - [SystemStatusType](#ma-streaming-open_data-v1-SystemStatusType)
  
- [ma/streaming/key_generator/v1/key_generator.proto](#ma_streaming_key_generator_v1_key_generator-proto)
    - [GenerateUniqueKeyRequest](#ma-streaming-key_generator-v1-GenerateUniqueKeyRequest)
    - [GenerateUniqueKeyResponse](#ma-streaming-key_generator-v1-GenerateUniqueKeyResponse)
  
    - [KeyType](#ma-streaming-key_generator-v1-KeyType)
  
    - [UniqueKeyGeneratorService](#ma-streaming-key_generator-v1-UniqueKeyGeneratorService)
  
- [Scalar Value Types](#scalar-value-types)



<a name="ma_streaming_api_v1_api-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ma/streaming/api/v1/api.proto



<a name="ma-streaming-api-v1-AddAssociateSessionRequest"></a>

### AddAssociateSessionRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| session_key | [string](#string) |  | Unique session key of the parent session |
| associate_session_key | [string](#string) |  | Unique session key of the associate session |






<a name="ma-streaming-api-v1-AddAssociateSessionResponse"></a>

### AddAssociateSessionResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | Whether the add associate session request succeeded |






<a name="ma-streaming-api-v1-CloseConnectionRequest"></a>

### CloseConnectionRequest
Request to close an existing connection


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| connection | [Connection](#ma-streaming-api-v1-Connection) |  | Identifier for the connection |






<a name="ma-streaming-api-v1-CloseConnectionResponse"></a>

### CloseConnectionResponse
Response to a close connection request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | Whether the close connection request succeeded |






<a name="ma-streaming-api-v1-Connection"></a>

### Connection
A connection identifier


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [int64](#int64) |  | For internal use only - do not modify this |






<a name="ma-streaming-api-v1-ConnectionDetails"></a>

### ConnectionDetails
Details of a connection


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_source | [string](#string) |  | Data source to read from |
| session_key | [string](#string) |  | Session key of the session to read (can be ommitted if sessions are not being used) |
| streams | [string](#string) | repeated | Streams to read (can be ommitted if all streams are required) |
| stream_offsets | [int64](#int64) | repeated | Offset from which to start for each stream -1 = Latest, 0 = Earliest (default) |
| main_offset | [int64](#int64) |  | Offset from which to start for the main data source topic |
| essentials_offset | [int64](#int64) |  | Offset from which to start for the data source essentials topic |
| exclude_main_stream | [bool](#bool) |  | to specify exclusion of the main stream from reading |






<a name="ma-streaming-api-v1-CreateSessionRequest"></a>

### CreateSessionRequest
Request for the creation of a new session


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_source | [string](#string) |  | Data Source name |
| type | [string](#string) |  | Session type (defaults to &#34;Session&#34;) |
| version | [uint32](#uint32) |  | Version (defaults to 1) |
| utc_offset | [google.protobuf.Duration](#google-protobuf-Duration) |  | Difference between UTC time and local standard time in the timezone in which the data is recorded (negative for negative longitudes, positive for positive longitudes, defaults to 0) |
| identifier | [string](#string) |  | Session identifier |
| associate_session_key | [string](#string) | repeated | List of unique session key to associate to the session |
| details | [CreateSessionRequest.DetailsEntry](#ma-streaming-api-v1-CreateSessionRequest-DetailsEntry) | repeated | Session details to update (detail name, detail value) |






<a name="ma-streaming-api-v1-CreateSessionRequest-DetailsEntry"></a>

### CreateSessionRequest.DetailsEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="ma-streaming-api-v1-CreateSessionResponse"></a>

### CreateSessionResponse
Response to a session creation request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| session_key | [string](#string) |  | Unique session key |
| new_session | [ma.streaming.open_data.v1.NewSessionPacket](#ma-streaming-open_data-v1-NewSessionPacket) |  | New session packet |
| success | [bool](#bool) |  | Whether the create session request succeeded |






<a name="ma-streaming-api-v1-DataPacketDetails"></a>

### DataPacketDetails
Details for the packet being written


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message | [ma.streaming.open_data.v1.Packet](#ma-streaming-open_data-v1-Packet) |  | Packet to write |
| data_source | [string](#string) |  | Data source for this packet |
| stream | [string](#string) |  | Stream name to which to write |
| session_key | [string](#string) |  | Unique session key of the session to which to write |






<a name="ma-streaming-api-v1-DataPacketRequest"></a>

### DataPacketRequest
Request for reading parameters


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| connection | [Connection](#ma-streaming-api-v1-Connection) |  | Connection to Read |
| include_parameters | [string](#string) | repeated | Parameters to include (regular expressions) |
| exclude_parameters | [string](#string) | repeated | Parameters to exclude (regular expressions) |
| include_events | [string](#string) | repeated | Events to include (regular expressions) |
| exclude_events | [string](#string) | repeated | Events to exclude (regular expressions) |
| include_markers | [bool](#bool) |  | Include markers? |






<a name="ma-streaming-api-v1-EndSessionRequest"></a>

### EndSessionRequest
Request to end an existing session


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_source | [string](#string) |  | Data source name |
| session_key | [string](#string) |  | Unique session key |






<a name="ma-streaming-api-v1-EndSessionResponse"></a>

### EndSessionResponse
Response to the termination of a session


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| end_session | [ma.streaming.open_data.v1.EndOfSessionPacket](#ma-streaming-open_data-v1-EndOfSessionPacket) |  | End of session packet |
| success | [bool](#bool) |  | Whether the end session request succeeded |






<a name="ma-streaming-api-v1-GetConnectionRequest"></a>

### GetConnectionRequest
Request for details of an existing connection


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| connection | [Connection](#ma-streaming-api-v1-Connection) |  | Identifier for the connection |






<a name="ma-streaming-api-v1-GetConnectionResponse"></a>

### GetConnectionResponse
Response to a get connection request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| details | [ConnectionDetails](#ma-streaming-api-v1-ConnectionDetails) |  | The connection details |






<a name="ma-streaming-api-v1-GetCurrentSessionsRequest"></a>

### GetCurrentSessionsRequest
Request to return all sessions present on the broker for a given data source


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_source | [string](#string) |  | Data source name |






<a name="ma-streaming-api-v1-GetCurrentSessionsResponse"></a>

### GetCurrentSessionsResponse
Response to the listing of all available sessions on the broker request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| session_keys | [string](#string) | repeated | List of unique session keys present on the broker for the specified data source |
| success | [bool](#bool) |  | Whether the get current session request succeeded |






<a name="ma-streaming-api-v1-GetEventDataFormatIdRequest"></a>

### GetEventDataFormatIdRequest
Request for a data format ID for a given event


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_source | [string](#string) |  | Data source for which this format is to be used |
| event | [string](#string) |  | Event identifier |






<a name="ma-streaming-api-v1-GetEventDataFormatIdResponse"></a>

### GetEventDataFormatIdResponse
Response for a data format request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_format_identifier | [uint64](#uint64) |  | Data format identifier |






<a name="ma-streaming-api-v1-GetEventRequest"></a>

### GetEventRequest
Request for an event from a data format ID


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_source | [string](#string) |  | Data source for which this format is used |
| data_format_identifier | [uint64](#uint64) |  | Data format identifier |






<a name="ma-streaming-api-v1-GetEventResponse"></a>

### GetEventResponse
Response for an event request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| event | [string](#string) |  | Event identifier |






<a name="ma-streaming-api-v1-GetParameterDataFormatIdRequest"></a>

### GetParameterDataFormatIdRequest
Request for a data format ID for a given set of parameters


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_source | [string](#string) |  | Data source for which this format is to be used |
| parameters | [string](#string) | repeated | Ordered of parameter identifiers (the same parameters in a different order is a different id) |






<a name="ma-streaming-api-v1-GetParameterDataFormatIdResponse"></a>

### GetParameterDataFormatIdResponse
Response for a data format request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_format_identifier | [uint64](#uint64) |  | Data format identifier |






<a name="ma-streaming-api-v1-GetParametersListRequest"></a>

### GetParametersListRequest
Request for a list of parameters from a data format ID


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_source | [string](#string) |  | Data source for which this format is used |
| data_format_identifier | [uint64](#uint64) |  | Data format identifier |






<a name="ma-streaming-api-v1-GetParametersListResponse"></a>

### GetParametersListResponse
Response for a parameter list request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [string](#string) | repeated | List of parameters |






<a name="ma-streaming-api-v1-GetSessionInfoRequest"></a>

### GetSessionInfoRequest
Request to return session info of a given session


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| session_key | [string](#string) |  | Unique session key |






<a name="ma-streaming-api-v1-GetSessionInfoResponse"></a>

### GetSessionInfoResponse
Response to the session info request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_source | [string](#string) |  | Data Source name |
| identifier | [string](#string) |  | Identifier |
| type | [string](#string) |  | Type |
| version | [uint32](#uint32) |  | Version |
| associate_session_keys | [string](#string) | repeated | Associate session keys |
| is_complete | [bool](#bool) |  | Shows whether the session is completed or not |
| streams | [string](#string) | repeated | Available streams |
| topic_partition_offsets | [GetSessionInfoResponse.TopicPartitionOffsetsEntry](#ma-streaming-api-v1-GetSessionInfoResponse-TopicPartitionOffsetsEntry) | repeated | The offsets into each topic / partition (key is topic name, optionally appended with a &#39;:&#39; followed by the partition number) |
| main_offset | [int64](#int64) |  | Offset of the main data source topic |
| essentials_offset | [int64](#int64) |  | Offset of the data source essentials topic |
| details | [GetSessionInfoResponse.DetailsEntry](#ma-streaming-api-v1-GetSessionInfoResponse-DetailsEntry) | repeated | Session details (detail name, detail value) |
| utc_offset | [google.protobuf.Duration](#google-protobuf-Duration) |  | Difference between UTC time and local standard time in the timezone in which the data is recorded (negative for negative longitudes, positive for positive longitudes) |
| success | [bool](#bool) |  | Whether the get session info request succeeded |






<a name="ma-streaming-api-v1-GetSessionInfoResponse-DetailsEntry"></a>

### GetSessionInfoResponse.DetailsEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="ma-streaming-api-v1-GetSessionInfoResponse-TopicPartitionOffsetsEntry"></a>

### GetSessionInfoResponse.TopicPartitionOffsetsEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [int64](#int64) |  |  |






<a name="ma-streaming-api-v1-GetSessionStartNotificationRequest"></a>

### GetSessionStartNotificationRequest
Request for obtaining a session start notification


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_source | [string](#string) |  | Data source name |






<a name="ma-streaming-api-v1-GetSessionStartNotificationResponse"></a>

### GetSessionStartNotificationResponse
Response to a session start notification request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| session_key | [string](#string) |  | Unique session key of the started session |
| data_source | [string](#string) |  | Data source name |






<a name="ma-streaming-api-v1-GetSessionStopNotificationRequest"></a>

### GetSessionStopNotificationRequest
Request for obtaining a session end notification


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_source | [string](#string) |  | Data source name |






<a name="ma-streaming-api-v1-GetSessionStopNotificationResponse"></a>

### GetSessionStopNotificationResponse
Response to a session end notification request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| session_key | [string](#string) |  | Unique session key of the ended session |
| data_source | [string](#string) |  | Data source name |






<a name="ma-streaming-api-v1-NewConnectionRequest"></a>

### NewConnectionRequest
Request for a new (read) connection


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| details | [ConnectionDetails](#ma-streaming-api-v1-ConnectionDetails) |  | The connection details |






<a name="ma-streaming-api-v1-NewConnectionResponse"></a>

### NewConnectionResponse
Response to a new connection request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| connection | [Connection](#ma-streaming-api-v1-Connection) |  | Identifier for the connection |






<a name="ma-streaming-api-v1-PacketResponse"></a>

### PacketResponse
The return from a packet read


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| packet | [ma.streaming.open_data.v1.Packet](#ma-streaming-open_data-v1-Packet) |  | The packet that was read |
| stream | [string](#string) |  | The stream the packet was read from |
| submit_time | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | the time that packet submit in the broker topic partition |






<a name="ma-streaming-api-v1-ReadDataPacketsRequest"></a>

### ReadDataPacketsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| request | [DataPacketRequest](#ma-streaming-api-v1-DataPacketRequest) |  |  |






<a name="ma-streaming-api-v1-ReadDataPacketsResponse"></a>

### ReadDataPacketsResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| response | [PacketResponse](#ma-streaming-api-v1-PacketResponse) | repeated |  |






<a name="ma-streaming-api-v1-ReadEssentialsRequest"></a>

### ReadEssentialsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| connection | [Connection](#ma-streaming-api-v1-Connection) |  |  |






<a name="ma-streaming-api-v1-ReadEssentialsResponse"></a>

### ReadEssentialsResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| response | [PacketResponse](#ma-streaming-api-v1-PacketResponse) | repeated |  |






<a name="ma-streaming-api-v1-ReadPacketsRequest"></a>

### ReadPacketsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| connection | [Connection](#ma-streaming-api-v1-Connection) |  |  |






<a name="ma-streaming-api-v1-ReadPacketsResponse"></a>

### ReadPacketsResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| response | [PacketResponse](#ma-streaming-api-v1-PacketResponse) | repeated |  |






<a name="ma-streaming-api-v1-UpdateSessionDetailsRequest"></a>

### UpdateSessionDetailsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| session_key | [string](#string) |  | Unique session key |
| details | [UpdateSessionDetailsRequest.DetailsEntry](#ma-streaming-api-v1-UpdateSessionDetailsRequest-DetailsEntry) | repeated | Session details to update (detail name, detail value) |






<a name="ma-streaming-api-v1-UpdateSessionDetailsRequest-DetailsEntry"></a>

### UpdateSessionDetailsRequest.DetailsEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="ma-streaming-api-v1-UpdateSessionDetailsResponse"></a>

### UpdateSessionDetailsResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | Whether the update session details request succeeded |






<a name="ma-streaming-api-v1-UpdateSessionIdentifierRequest"></a>

### UpdateSessionIdentifierRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| session_key | [string](#string) |  | Unique session key |
| identifier | [string](#string) |  | Session identifier |






<a name="ma-streaming-api-v1-UpdateSessionIdentifierResponse"></a>

### UpdateSessionIdentifierResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| success | [bool](#bool) |  | Whether the update session identifier request succeeded |






<a name="ma-streaming-api-v1-WriteDataPacketRequest"></a>

### WriteDataPacketRequest
Request for writing a data packet to the stream


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| detail | [DataPacketDetails](#ma-streaming-api-v1-DataPacketDetails) |  |  |






<a name="ma-streaming-api-v1-WriteDataPacketResponse"></a>

### WriteDataPacketResponse
Response to a request for writing a data packet to the stream






<a name="ma-streaming-api-v1-WriteDataPacketsRequest"></a>

### WriteDataPacketsRequest
Request for writing a stream of data packets


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| details | [DataPacketDetails](#ma-streaming-api-v1-DataPacketDetails) | repeated |  |






<a name="ma-streaming-api-v1-WriteDataPacketsResponse"></a>

### WriteDataPacketsResponse
Response to a request for writing a stream of data packets






<a name="ma-streaming-api-v1-WriteInfoPacketRequest"></a>

### WriteInfoPacketRequest
Request for writing an info packet to the stream


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message | [ma.streaming.open_data.v1.Packet](#ma-streaming-open_data-v1-Packet) |  | Packet to write |
| type | [InfoType](#ma-streaming-api-v1-InfoType) |  | Type for this packet |






<a name="ma-streaming-api-v1-WriteInfoPacketResponse"></a>

### WriteInfoPacketResponse
Response to a request for writing an info packet to the stream






<a name="ma-streaming-api-v1-WriteInfoPacketsRequest"></a>

### WriteInfoPacketsRequest
Request for writing a stream of info packets


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| message | [ma.streaming.open_data.v1.Packet](#ma-streaming-open_data-v1-Packet) |  | Packet to write |
| type | [InfoType](#ma-streaming-api-v1-InfoType) |  | Type for this packet |






<a name="ma-streaming-api-v1-WriteInfoPacketsResponse"></a>

### WriteInfoPacketsResponse
Response to a request for writing a stream of info packets





 


<a name="ma-streaming-api-v1-InfoType"></a>

### InfoType
Info type

| Name | Number | Description |
| ---- | ------ | ----------- |
| INFO_TYPE_UNSPECIFIED | 0 | Unspecified |
| INFO_TYPE_SESSION_INFO | 1 | Session info |
| INFO_TYPE_SYSTEM_STATUS | 2 | System status |


 

 


<a name="ma-streaming-api-v1-ConnectionManagerService"></a>

### ConnectionManagerService
Connection manager service
Open and close Connections
Connections maintain the current offset position

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| NewConnection | [NewConnectionRequest](#ma-streaming-api-v1-NewConnectionRequest) | [NewConnectionResponse](#ma-streaming-api-v1-NewConnectionResponse) | Create a new connection |
| GetConnection | [GetConnectionRequest](#ma-streaming-api-v1-GetConnectionRequest) | [GetConnectionResponse](#ma-streaming-api-v1-GetConnectionResponse) | Get an existing connection |
| CloseConnection | [CloseConnectionRequest](#ma-streaming-api-v1-CloseConnectionRequest) | [CloseConnectionResponse](#ma-streaming-api-v1-CloseConnectionResponse) | Close connection |


<a name="ma-streaming-api-v1-DataFormatManagerService"></a>

### DataFormatManagerService
Data format manager service

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetParameterDataFormatId | [GetParameterDataFormatIdRequest](#ma-streaming-api-v1-GetParameterDataFormatIdRequest) | [GetParameterDataFormatIdResponse](#ma-streaming-api-v1-GetParameterDataFormatIdResponse) | Request a data format ID for a set of parameters |
| GetEventDataFormatId | [GetEventDataFormatIdRequest](#ma-streaming-api-v1-GetEventDataFormatIdRequest) | [GetEventDataFormatIdResponse](#ma-streaming-api-v1-GetEventDataFormatIdResponse) | Request a data format ID for an event |
| GetParametersList | [GetParametersListRequest](#ma-streaming-api-v1-GetParametersListRequest) | [GetParametersListResponse](#ma-streaming-api-v1-GetParametersListResponse) | Request a list of paramters for a given data format ID |
| GetEvent | [GetEventRequest](#ma-streaming-api-v1-GetEventRequest) | [GetEventResponse](#ma-streaming-api-v1-GetEventResponse) | Request an event for a given data format ID |


<a name="ma-streaming-api-v1-PacketReaderService"></a>

### PacketReaderService
Read packets

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| ReadPackets | [ReadPacketsRequest](#ma-streaming-api-v1-ReadPacketsRequest) | [ReadPacketsResponse](#ma-streaming-api-v1-ReadPacketsResponse) stream | Continuously read all packets from the specified connection |
| ReadEssentials | [ReadEssentialsRequest](#ma-streaming-api-v1-ReadEssentialsRequest) | [ReadEssentialsResponse](#ma-streaming-api-v1-ReadEssentialsResponse) stream | Continuously read all of the essential packets from this connection |
| ReadDataPackets | [ReadDataPacketsRequest](#ma-streaming-api-v1-ReadDataPacketsRequest) | [ReadDataPacketsResponse](#ma-streaming-api-v1-ReadDataPacketsResponse) stream | Continuously read all data packets containing any of the specified parameters or events Only data packets will be returned (i.e. no config, metadata etc) |


<a name="ma-streaming-api-v1-PacketWriterService"></a>

### PacketWriterService
Packet writer service.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| WriteDataPacket | [WriteDataPacketRequest](#ma-streaming-api-v1-WriteDataPacketRequest) | [WriteDataPacketResponse](#ma-streaming-api-v1-WriteDataPacketResponse) | Write a packet for a specified data source |
| WriteDataPackets | [WriteDataPacketsRequest](#ma-streaming-api-v1-WriteDataPacketsRequest) stream | [WriteDataPacketsResponse](#ma-streaming-api-v1-WriteDataPacketsResponse) | Continuously write a stream of data packets |
| WriteInfoPacket | [WriteInfoPacketRequest](#ma-streaming-api-v1-WriteInfoPacketRequest) | [WriteInfoPacketResponse](#ma-streaming-api-v1-WriteInfoPacketResponse) | Write an info packet of a specified type |
| WriteInfoPackets | [WriteInfoPacketsRequest](#ma-streaming-api-v1-WriteInfoPacketsRequest) stream | [WriteInfoPacketsResponse](#ma-streaming-api-v1-WriteInfoPacketsResponse) | Continuously write a stream of info packets |


<a name="ma-streaming-api-v1-SessionManagementService"></a>

### SessionManagementService
Manage sessions

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| CreateSession | [CreateSessionRequest](#ma-streaming-api-v1-CreateSessionRequest) | [CreateSessionResponse](#ma-streaming-api-v1-CreateSessionResponse) | Create a new session. Returns the unique session key |
| EndSession | [EndSessionRequest](#ma-streaming-api-v1-EndSessionRequest) | [EndSessionResponse](#ma-streaming-api-v1-EndSessionResponse) | End the session for a given unique session key |
| GetCurrentSessions | [GetCurrentSessionsRequest](#ma-streaming-api-v1-GetCurrentSessionsRequest) | [GetCurrentSessionsResponse](#ma-streaming-api-v1-GetCurrentSessionsResponse) | Get a list of the current sessions within the broker |
| GetSessionInfo | [GetSessionInfoRequest](#ma-streaming-api-v1-GetSessionInfoRequest) | [GetSessionInfoResponse](#ma-streaming-api-v1-GetSessionInfoResponse) | Get the info for a session |
| GetSessionStartNotification | [GetSessionStartNotificationRequest](#ma-streaming-api-v1-GetSessionStartNotificationRequest) | [GetSessionStartNotificationResponse](#ma-streaming-api-v1-GetSessionStartNotificationResponse) stream | Continuously notifies the client when a session starts |
| GetSessionStopNotification | [GetSessionStopNotificationRequest](#ma-streaming-api-v1-GetSessionStopNotificationRequest) | [GetSessionStopNotificationResponse](#ma-streaming-api-v1-GetSessionStopNotificationResponse) stream | Continuously notifies the client when a session ends |
| UpdateSessionIdentifier | [UpdateSessionIdentifierRequest](#ma-streaming-api-v1-UpdateSessionIdentifierRequest) | [UpdateSessionIdentifierResponse](#ma-streaming-api-v1-UpdateSessionIdentifierResponse) | Update the session identifier given its unique session key |
| AddAssociateSession | [AddAssociateSessionRequest](#ma-streaming-api-v1-AddAssociateSessionRequest) | [AddAssociateSessionResponse](#ma-streaming-api-v1-AddAssociateSessionResponse) | Add associate session to a session given its unique session key |
| UpdateSessionDetails | [UpdateSessionDetailsRequest](#ma-streaming-api-v1-UpdateSessionDetailsRequest) | [UpdateSessionDetailsResponse](#ma-streaming-api-v1-UpdateSessionDetailsResponse) | Update the session details for a session given its unique session key |

 



<a name="ma_streaming_open_data_v1_open_data-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ma/streaming/open_data/v1/open_data.proto



<a name="ma-streaming-open_data-v1-AxisDataPacket"></a>

### AxisDataPacket
Values corresponsponding to points on an axis for map parameters


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| axis_identifier | [string](#string) |  | Axis identifier |
| timestamp | [fixed64](#fixed64) |  | Timestamp |
| values | [ValueArray](#ma-streaming-open_data-v1-ValueArray) |  | The data for the axis |






<a name="ma-streaming-open_data-v1-BoolSample"></a>

### BoolSample



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| value | [bool](#bool) |  |  |
| status | [DataStatus](#ma-streaming-open_data-v1-DataStatus) |  |  |






<a name="ma-streaming-open_data-v1-BoolSampleList"></a>

### BoolSampleList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| samples | [BoolSample](#ma-streaming-open_data-v1-BoolSample) | repeated |  |






<a name="ma-streaming-open_data-v1-ConfigurationPacket"></a>

### ConfigurationPacket
Data configuration


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| config_id | [string](#string) |  | Configuration ID |
| parameter_definitions | [ParameterDefinition](#ma-streaming-open_data-v1-ParameterDefinition) | repeated | The parameter definitions |
| event_definitions | [EventDefinition](#ma-streaming-open_data-v1-EventDefinition) | repeated | The event definitions |
| group_definitions | [GroupDefinition](#ma-streaming-open_data-v1-GroupDefinition) | repeated | The group definitions |
| partial_packet | [bool](#bool) |  | Flag to indicate if this packet is part of a larger config. |
| packet_number | [uint32](#uint32) |  | The packet number out of the total packets sent if partial packet was set to true. |
| total_packet_number | [uint32](#uint32) |  | The total packet number that make up the config id if partial packet was set to true. |






<a name="ma-streaming-open_data-v1-CoverageCursorInfoPacket"></a>

### CoverageCursorInfoPacket
Coverage cursor position for a session has been updated


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_source | [string](#string) |  | Data Source name |
| coverage_cursor_time | [fixed64](#fixed64) |  | Coverage cursor time (nanoseconds since the UNIX epoch of 1st January 1970, UTC) |






<a name="ma-streaming-open_data-v1-DataFormatConfigurationPacket"></a>

### DataFormatConfigurationPacket
Data format


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_format_id | [string](#string) |  | Data format ID |
| data_formats | [DataFormatDefinitionPacket](#ma-streaming-open_data-v1-DataFormatDefinitionPacket) | repeated | The data format definitions |






<a name="ma-streaming-open_data-v1-DataFormatDefinitionPacket"></a>

### DataFormatDefinitionPacket
Data Format Definition


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| identifier | [uint64](#uint64) |  | Data format identifier |
| type | [DataFormatType](#ma-streaming-open_data-v1-DataFormatType) |  | Data format type |
| parameter_identifiers | [ParameterList](#ma-streaming-open_data-v1-ParameterList) |  |  |
| event_identifier | [string](#string) |  |  |






<a name="ma-streaming-open_data-v1-DoubleSample"></a>

### DoubleSample



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| value | [double](#double) |  |  |
| status | [DataStatus](#ma-streaming-open_data-v1-DataStatus) |  |  |






<a name="ma-streaming-open_data-v1-DoubleSampleList"></a>

### DoubleSampleList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| samples | [DoubleSample](#ma-streaming-open_data-v1-DoubleSample) | repeated |  |






<a name="ma-streaming-open_data-v1-EndOfSessionPacket"></a>

### EndOfSessionPacket
A session has ended


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_source | [string](#string) |  | Data Source name |
| topic_partition_offsets | [EndOfSessionPacket.TopicPartitionOffsetsEntry](#ma-streaming-open_data-v1-EndOfSessionPacket-TopicPartitionOffsetsEntry) | repeated | The offsets into each topic / partition (key is topic name, optionally appended with a &#39;:&#39; followed by the partition number) |






<a name="ma-streaming-open_data-v1-EndOfSessionPacket-TopicPartitionOffsetsEntry"></a>

### EndOfSessionPacket.TopicPartitionOffsetsEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [int64](#int64) |  |  |






<a name="ma-streaming-open_data-v1-ErrorPacket"></a>

### ErrorPacket
Error Packet


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error_identifier | [string](#string) |  | Error Identifier |
| timestamp | [fixed64](#fixed64) |  | Time the error occurred |
| application_name | [string](#string) |  | The application containing the error |
| group | [string](#string) |  | The error group |
| name | [string](#string) |  | The error name |
| description | [string](#string) |  | The error description |
| type | [ErrorType](#ma-streaming-open_data-v1-ErrorType) |  | The error type |
| status | [ErrorStatus](#ma-streaming-open_data-v1-ErrorStatus) |  | The error status |






<a name="ma-streaming-open_data-v1-EventDataFormat"></a>

### EventDataFormat
Desribes the event in this data packet


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_format_identifier | [uint64](#uint64) |  |  |
| event_identifier | [string](#string) |  |  |






<a name="ma-streaming-open_data-v1-EventDefinition"></a>

### EventDefinition
Defines the metadata for a given event


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| identifier | [string](#string) |  | The full identifier for the event |
| name | [string](#string) |  | The name of the event |
| definition_id | [uint32](#uint32) |  | A numeric identifier for the event |
| application_name | [string](#string) |  | The application containing the event |
| description | [string](#string) |  | The event description |
| priority | [EventPriority](#ma-streaming-open_data-v1-EventPriority) |  | Event priority |
| groups | [string](#string) | repeated | List of group identifiers in which the event should appear |
| data_types | [DataType](#ma-streaming-open_data-v1-DataType) | repeated | List of native data types for each value |
| format_strings | [string](#string) | repeated | List of format strings, applied to event values for display |
| conversions | [TextConversionDefinition](#ma-streaming-open_data-v1-TextConversionDefinition) | repeated | Text conversion rules to be applied to event values if applicable |
| units | [string](#string) | repeated | List of units applied to event values for display |






<a name="ma-streaming-open_data-v1-EventPacket"></a>

### EventPacket
Event


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_format | [EventDataFormat](#ma-streaming-open_data-v1-EventDataFormat) |  | Data format |
| timestamp | [fixed64](#fixed64) |  | Time the event occurred |
| raw_values | [double](#double) | repeated | Raw data (list of doubles, event specific meaning) |






<a name="ma-streaming-open_data-v1-FormulaDefinition"></a>

### FormulaDefinition
A formula definition


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | [FormulaType](#ma-streaming-open_data-v1-FormulaType) |  | Type of formula |
| formula | [string](#string) |  | The formula code |






<a name="ma-streaming-open_data-v1-GroupDefinition"></a>

### GroupDefinition
Defines the group


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| identifier | [string](#string) |  | The full identifier for the group |
| name | [string](#string) |  | The name of the group |
| application_name | [string](#string) |  | The applicaion that the group is contained within |
| description | [string](#string) |  | Description for the group |
| groups | [GroupDefinition](#ma-streaming-open_data-v1-GroupDefinition) | repeated | Any subgroups nested within the group |






<a name="ma-streaming-open_data-v1-Int32Sample"></a>

### Int32Sample



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| value | [int32](#int32) |  |  |
| status | [DataStatus](#ma-streaming-open_data-v1-DataStatus) |  |  |






<a name="ma-streaming-open_data-v1-Int32SampleList"></a>

### Int32SampleList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| samples | [Int32Sample](#ma-streaming-open_data-v1-Int32Sample) | repeated |  |






<a name="ma-streaming-open_data-v1-MapDataPacket"></a>

### MapDataPacket
Values corresponsponding to the map


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| map_identifier | [string](#string) |  | Map identifier |
| timestamp | [fixed64](#fixed64) |  | Timestamp |
| x_axis_identifier | [string](#string) |  | The identifier of the X axis |
| x_index_identifier | [string](#string) |  | The identifier of the X axis index parameter |
| y_axis_identifier | [string](#string) |  | The name of the Y axis (only for 2D maps) |
| y_index_identifier | [string](#string) |  | The identifier of the Y axis index parameter (only for 2D maps) |
| values | [ValueArray](#ma-streaming-open_data-v1-ValueArray) | repeated | The data for the map |






<a name="ma-streaming-open_data-v1-MarkerPacket"></a>

### MarkerPacket
Marker


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| timestamp | [fixed64](#fixed64) |  | Start time of marker |
| end_time | [fixed64](#fixed64) |  | End time of marker (optional) |
| label | [string](#string) |  | Text label |
| type | [string](#string) |  | Type of marker |
| description | [string](#string) |  | Text Description |
| source | [string](#string) |  | Source |
| value | [int64](#int64) |  | Value of the marker if applicable |






<a name="ma-streaming-open_data-v1-MetadataPacket"></a>

### MetadataPacket
General metadata


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| metadata | [MetadataPacket.MetadataEntry](#ma-streaming-open_data-v1-MetadataPacket-MetadataEntry) | repeated | Metadata |






<a name="ma-streaming-open_data-v1-MetadataPacket-MetadataEntry"></a>

### MetadataPacket.MetadataEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [google.protobuf.Any](#google-protobuf-Any) |  |  |






<a name="ma-streaming-open_data-v1-NewSessionPacket"></a>

### NewSessionPacket
New session has started


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_source | [string](#string) |  | Data Source name |
| topic_partition_offsets | [NewSessionPacket.TopicPartitionOffsetsEntry](#ma-streaming-open_data-v1-NewSessionPacket-TopicPartitionOffsetsEntry) | repeated | The offsets into each topic / partition (key is topic name, optionally appended with a &#39;:&#39; followed by the partition number) |
| utc_offset | [google.protobuf.Duration](#google-protobuf-Duration) |  | Difference between UTC time and local standard time in the timezone in which the data is recorded (negative for negative longitudes, positive for positive longitudes) |
| session_info | [SessionInfoPacket](#ma-streaming-open_data-v1-SessionInfoPacket) | optional | Session info |






<a name="ma-streaming-open_data-v1-NewSessionPacket-TopicPartitionOffsetsEntry"></a>

### NewSessionPacket.TopicPartitionOffsetsEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [int64](#int64) |  |  |






<a name="ma-streaming-open_data-v1-Packet"></a>

### Packet
Wrapper for all packets


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | [string](#string) |  | Message type (unique name) |
| session_key | [string](#string) |  | Unique session key |
| is_essential | [bool](#bool) |  | Is this packet essential? |
| content | [bytes](#bytes) |  | Content |
| id | [uint64](#uint64) |  | Id (optional if needed by default is 0) |






<a name="ma-streaming-open_data-v1-ParameterDefinition"></a>

### ParameterDefinition
Defines the metadata for a given parameter


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| identifier | [string](#string) |  | The full identifier for the parameter |
| name | [string](#string) |  | The name of the parameter |
| application_name | [string](#string) |  | The application containing the parameter |
| description | [string](#string) |  | The parameter description |
| groups | [string](#string) | repeated | List of group identifiers in which the parameter should appear |
| units | [string](#string) |  | Units that this parameter is measured in |
| data_type | [DataType](#ma-streaming-open_data-v1-DataType) |  | Native data type |
| format_string | [string](#string) |  | Format strings, applied to sample values for display |
| min_value | [double](#double) |  | Minimum value expected for samples of this parameter |
| max_value | [double](#double) |  | Maximum value expected for samples of this parameter |
| warning_min_value | [double](#double) |  | Threshold minimum value for warnings |
| warning_max_value | [double](#double) |  | Threshold maximum value for warnings |
| frequencies | [double](#double) | repeated | Frequencies at which samples of this parameter may be sent |
| includes_row_data | [bool](#bool) |  | Whether row data samples may be sent for this parameter |
| includes_synchro_data | [bool](#bool) |  | Whether synchro data samples may be sent for this parameter |
| conversion | [TextConversionDefinition](#ma-streaming-open_data-v1-TextConversionDefinition) |  | Text conversion rule to be applied if applicable |
| formula | [FormulaDefinition](#ma-streaming-open_data-v1-FormulaDefinition) |  | Formula for calculating sample values if applicable |






<a name="ma-streaming-open_data-v1-ParameterList"></a>

### ParameterList
List of parameter identifiers


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_identifiers | [string](#string) | repeated |  |






<a name="ma-streaming-open_data-v1-PeriodicDataPacket"></a>

### PeriodicDataPacket
Telemetry samples in periodic format (equally spaced / fixed frequency samples)


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_format | [SampleDataFormat](#ma-streaming-open_data-v1-SampleDataFormat) |  | Data format |
| start_time | [fixed64](#fixed64) |  | Start time (timestamp of first sample) |
| interval | [uint32](#uint32) |  | Step / time between samples |
| columns | [SampleColumn](#ma-streaming-open_data-v1-SampleColumn) | repeated | The rest of the Data Each column must have the same no of values |






<a name="ma-streaming-open_data-v1-RawCANDataPacket"></a>

### RawCANDataPacket
Raw CAN message


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| timestamp | [fixed64](#fixed64) |  | Timestamp of the packet |
| bus | [uint32](#uint32) |  | CAN Bus |
| can_id | [uint32](#uint32) |  | CAN ID |
| payload | [bytes](#bytes) |  | Message payload |
| type | [CanType](#ma-streaming-open_data-v1-CanType) |  | CAN RxTx |






<a name="ma-streaming-open_data-v1-RowDataPacket"></a>

### RowDataPacket
Telemetry samples in time series format (timestamped rows)


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_format | [SampleDataFormat](#ma-streaming-open_data-v1-SampleDataFormat) |  | Data format |
| timestamps | [fixed64](#fixed64) | repeated | Timestamps |
| rows | [SampleRow](#ma-streaming-open_data-v1-SampleRow) | repeated | The rest of the Data Each row must have the same no of values = the same as the parameters |






<a name="ma-streaming-open_data-v1-SampleColumn"></a>

### SampleColumn
&#34;Column&#34; of telemetry sample values


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| double_samples | [DoubleSampleList](#ma-streaming-open_data-v1-DoubleSampleList) |  |  |
| int32_samples | [Int32SampleList](#ma-streaming-open_data-v1-Int32SampleList) |  |  |
| bool_samples | [BoolSampleList](#ma-streaming-open_data-v1-BoolSampleList) |  |  |
| string_samples | [StringSampleList](#ma-streaming-open_data-v1-StringSampleList) |  |  |






<a name="ma-streaming-open_data-v1-SampleDataFormat"></a>

### SampleDataFormat
Desribes the parameters in this data packet


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_format_identifier | [uint64](#uint64) |  |  |
| parameter_identifiers | [ParameterList](#ma-streaming-open_data-v1-ParameterList) |  |  |






<a name="ma-streaming-open_data-v1-SampleRow"></a>

### SampleRow
&#34;Row&#34; of telemetry sample values


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| double_samples | [DoubleSampleList](#ma-streaming-open_data-v1-DoubleSampleList) |  |  |
| int32_samples | [Int32SampleList](#ma-streaming-open_data-v1-Int32SampleList) |  |  |
| bool_samples | [BoolSampleList](#ma-streaming-open_data-v1-BoolSampleList) |  |  |
| string_samples | [StringSampleList](#ma-streaming-open_data-v1-StringSampleList) |  |  |






<a name="ma-streaming-open_data-v1-SessionInfoPacket"></a>

### SessionInfoPacket
Session info


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_source | [string](#string) |  | Data Source name |
| identifier | [string](#string) |  | Identifier |
| type | [string](#string) |  | Type |
| version | [uint32](#uint32) |  | Version |
| associate_session_keys | [string](#string) | repeated | Associate session keys |
| details | [SessionInfoPacket.DetailsEntry](#ma-streaming-open_data-v1-SessionInfoPacket-DetailsEntry) | repeated | Session details (detail name, detail value) |






<a name="ma-streaming-open_data-v1-SessionInfoPacket-DetailsEntry"></a>

### SessionInfoPacket.DetailsEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="ma-streaming-open_data-v1-StringSample"></a>

### StringSample



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| value | [string](#string) |  |  |
| status | [DataStatus](#ma-streaming-open_data-v1-DataStatus) |  |  |






<a name="ma-streaming-open_data-v1-StringSampleList"></a>

### StringSampleList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| samples | [StringSample](#ma-streaming-open_data-v1-StringSample) | repeated |  |






<a name="ma-streaming-open_data-v1-SynchroDataPacket"></a>

### SynchroDataPacket
Telemetry samples in synchro format (variable frequency samples)


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_format | [SampleDataFormat](#ma-streaming-open_data-v1-SampleDataFormat) |  | Data format |
| start_time | [fixed64](#fixed64) |  | Start time (timestamp of first sample) |
| intervals | [uint32](#uint32) | repeated | Step / time between each sample and the previous |
| column | [SampleColumn](#ma-streaming-open_data-v1-SampleColumn) | repeated | The rest of the Data Each column must have number of values = number of intervals &#43; 1 |






<a name="ma-streaming-open_data-v1-SystemStatusMessage"></a>

### SystemStatusMessage
A system status message


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service | [string](#string) |  | Service to which this message relates |
| data_source | [string](#string) |  | Data source name that this service relates to |
| type | [SystemStatusType](#ma-streaming-open_data-v1-SystemStatusType) |  | Type of message

Contents......... TBD |






<a name="ma-streaming-open_data-v1-TextConversionDefinition"></a>

### TextConversionDefinition
A text conversion definition


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_identifier | [string](#string) |  | The conversion rule identifier |
| input_values | [double](#double) | repeated | The values to convert from |
| string_values | [string](#string) | repeated | The strings to convert to |
| default | [string](#string) |  | The default string if the input does not match |






<a name="ma-streaming-open_data-v1-ValueArray"></a>

### ValueArray
&#34;Array&#34; of values


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| values | [double](#double) | repeated |  |





 


<a name="ma-streaming-open_data-v1-CanType"></a>

### CanType
CAN type

| Name | Number | Description |
| ---- | ------ | ----------- |
| CAN_TYPE_UNSPECIFIED | 0 |  |
| CAN_TYPE_TRANSMIT | 1 |  |
| CAN_TYPE_RECEIVE | 2 |  |



<a name="ma-streaming-open_data-v1-DataFormatType"></a>

### DataFormatType
Data format type

| Name | Number | Description |
| ---- | ------ | ----------- |
| DATA_FORMAT_TYPE_UNSPECIFIED | 0 |  |
| DATA_FORMAT_TYPE_PARAMETER | 1 |  |
| DATA_FORMAT_TYPE_EVENT | 2 |  |



<a name="ma-streaming-open_data-v1-DataStatus"></a>

### DataStatus
Data status showing if samples are invalid for any reason

| Name | Number | Description |
| ---- | ------ | ----------- |
| DATA_STATUS_UNSPECIFIED | 0 |  |
| DATA_STATUS_VALID | 1 |  |
| DATA_STATUS_MISSING | 2 |  |
| DATA_STATUS_ERROR | 3 |  |



<a name="ma-streaming-open_data-v1-DataType"></a>

### DataType
Native data type

| Name | Number | Description |
| ---- | ------ | ----------- |
| DATA_TYPE_UNSPECIFIED | 0 | Unspecified |
| DATA_TYPE_FLOAT64 | 1 | 64 bit floating point (i.e. “double”) |
| DATA_TYPE_FLOAT32 | 2 | 32 bit floating point |
| DATA_TYPE_UINT32 | 3 | 32 bit unsigned integer |
| DATA_TYPE_SINT32 | 4 | 32 bit signed integer |
| DATA_TYPE_UINT16 | 5 | 16 bit unsigned integer |
| DATA_TYPE_SINT16 | 6 | 16 bit signed integer |
| DATA_TYPE_UINT8 | 7 | 8 bit unsigned integer |
| DATA_TYPE_SINT8 | 8 | 8 bit signed integer |
| DATA_TYPE_STRING | 9 | String |



<a name="ma-streaming-open_data-v1-ErrorStatus"></a>

### ErrorStatus
Error Status

| Name | Number | Description |
| ---- | ------ | ----------- |
| ERROR_STATUS_UNSPECIFIED | 0 |  |
| ERROR_STATUS_SET | 1 |  |
| ERROR_STATUS_CLEARED | 2 |  |



<a name="ma-streaming-open_data-v1-ErrorType"></a>

### ErrorType
Error type

| Name | Number | Description |
| ---- | ------ | ----------- |
| ERROR_TYPE_UNSPECIFIED | 0 |  |
| ERROR_TYPE_CURRENT | 1 |  |
| ERROR_TYPE_LOGGED | 2 |  |



<a name="ma-streaming-open_data-v1-EventPriority"></a>

### EventPriority
Event priority type

| Name | Number | Description |
| ---- | ------ | ----------- |
| EVENT_PRIORITY_UNSPECIFIED | 0 |  |
| EVENT_PRIORITY_CRITICAL | 1 |  |
| EVENT_PRIORITY_HIGH | 2 |  |
| EVENT_PRIORITY_MEDIUM | 3 |  |
| EVENT_PRIORITY_LOW | 4 |  |
| EVENT_PRIORITY_DEBUG | 5 |  |



<a name="ma-streaming-open_data-v1-FormulaType"></a>

### FormulaType
Types of formula. Can be extended to support other languages in the future

| Name | Number | Description |
| ---- | ------ | ----------- |
| FORMULA_TYPE_UNSPECIFIED | 0 | Unspecified |
| FORMULA_TYPE_FDL | 1 | Mclaren Applied proprietary FDL, used for virtual parameters with System Monitor |
| FORMULA_TYPE_CSHARP | 2 | An open format translated from FDL to C# |



<a name="ma-streaming-open_data-v1-SystemStatusType"></a>

### SystemStatusType
Types of status message

| Name | Number | Description |
| ---- | ------ | ----------- |
| SYSTEM_STATUS_TYPE_UNSPECIFIED | 0 | Unspecified |
| SYSTEM_STATUS_TYPE_HEARTBEAT | 1 | Service is still alive |
| SYSTEM_STATUS_TYPE_STATUS | 2 | Service has a status update |
| SYSTEM_STATUS_TYPE_ERROR | 3 | Service has generated an error |
| SYSTEM_STATUS_TYPE_WARNING | 4 | Service has generated a warning |
| SYSTEM_STATUS_TYPE_CONNECTION | 5 | A source has connected/disconnected |


 

 

 



<a name="ma_streaming_key_generator_v1_key_generator-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ma/streaming/key_generator/v1/key_generator.proto



<a name="ma-streaming-key_generator-v1-GenerateUniqueKeyRequest"></a>

### GenerateUniqueKeyRequest
Request for generating a unique key


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| type | [KeyType](#ma-streaming-key_generator-v1-KeyType) |  |  |






<a name="ma-streaming-key_generator-v1-GenerateUniqueKeyResponse"></a>

### GenerateUniqueKeyResponse
Response to a request for generating a unique key


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| string_key | [string](#string) |  |  |
| ulong_key | [uint64](#uint64) |  |  |





 


<a name="ma-streaming-key_generator-v1-KeyType"></a>

### KeyType
The type of key that should be generated

| Name | Number | Description |
| ---- | ------ | ----------- |
| KEY_TYPE_UNSPECIFIED | 0 |  |
| KEY_TYPE_ULONG | 1 |  |
| KEY_TYPE_STRING | 2 |  |


 

 


<a name="ma-streaming-key_generator-v1-UniqueKeyGeneratorService"></a>

### UniqueKeyGeneratorService
Unique key generator service

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GenerateUniqueKey | [GenerateUniqueKeyRequest](#ma-streaming-key_generator-v1-GenerateUniqueKeyRequest) | [GenerateUniqueKeyResponse](#ma-streaming-key_generator-v1-GenerateUniqueKeyResponse) | Generate a unique key which can be used to uniquely identify entities |

 



## Scalar Value Types

| .proto Type | Notes | C++ | Java | Python | Go | C# | PHP | Ruby |
| ----------- | ----- | --- | ---- | ------ | -- | -- | --- | ---- |
| <a name="double" /> double |  | double | double | float | float64 | double | float | Float |
| <a name="float" /> float |  | float | float | float | float32 | float | float | Float |
| <a name="int32" /> int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="int64" /> int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="uint32" /> uint32 | Uses variable-length encoding. | uint32 | int | int/long | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="uint64" /> uint64 | Uses variable-length encoding. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum or Fixnum (as required) |
| <a name="sint32" /> sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sint64" /> sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="fixed32" /> fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="fixed64" /> fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum |
| <a name="sfixed32" /> sfixed32 | Always four bytes. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sfixed64" /> sfixed64 | Always eight bytes. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="bool" /> bool |  | bool | boolean | boolean | bool | bool | boolean | TrueClass/FalseClass |
| <a name="string" /> string | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode | string | string | string | String (UTF-8) |
| <a name="bytes" /> bytes | May contain any arbitrary sequence of bytes. | string | ByteString | str | []byte | ByteString | string | String (ASCII-8BIT) |

