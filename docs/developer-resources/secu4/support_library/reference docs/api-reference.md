# API Reference

## Overview

This document provides a comprehensive reference for all public APIs, interfaces, and types in the MA DataPlatforms Streaming Support Library.

## Namespace Organization

- `MA.DataPlatforms.Streaming.Support.Lib.Core.Abstractions` - Core abstractions and factory
- `MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.SessionInfoModule` - Session management
- `MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.DataFormatInfoModule` - Data format management
- `MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.WritingModule` - Packet writing
- `MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.ReadingModule` - Packet reading
- `MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.BufferingModule` - Sample buffering
- `MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.InterpolationModule` - Data interpolation

---

## Core API

### ISupportLibApi

Main entry point for the support library.

```csharp
public interface ISupportLibApi : IServiceModel
{
    ISessionManagerModuleApi? GetSessionManagerApi();
    IDataFormatManagerModuleApi? GetDataFormatManagerApi();
    IPacketWritingModuleApi? GetWritingPacketApi();
    IPacketReadingModuleApi? GetReadingPacketApi();
    ISampleReadingModuleApi? GetSampleReaderApi();
    IDataReadingModuleApi? GetDataReaderApi();
    
    event EventHandler<DateTime>? Initialised;
    bool IsInitialised { get; }
    
    Task InitialiseAsync(CancellationToken cancellationToken);
    void Initialise();
    void Start();
    void Stop();
}
```

### SupportLibApiFactory

Factory for creating support library instances.

```csharp
public class SupportLibApiFactory : ISupportLibApiFactory
{
    public ISupportLibApi Create(
        ILogger logger,
        StreamingApiConfiguration streamingApiConfiguration,
        RetryPolicy retryPolicy);
}
```

### ApiResult<T>

Standard result wrapper for all API calls.

```csharp
public class ApiResult<T>
{
    public bool Success { get; }
    public string Message { get; }
    public T? Data { get; }
}
```

### IServiceModel

Base interface for all services.

```csharp
public interface IServiceModel : IDisposable
{
    event EventHandler<DateTime>? Initialised;
    event EventHandler<DateTime>? Started;
    event EventHandler<DateTime>? Stopped;
    
    bool IsInitialised { get; }
    bool IsStarted { get; }
    
    void Initialise();
    Task InitialiseAsync(CancellationToken cancellationToken);
    void Start();
    void Stop();
}
```

---

## Session Manager Module

### ISessionManagerModuleApi

```csharp
public interface ISessionManagerModuleApi : IModuleApi
{
    ApiResult<ISessionManagementService?> CreateService();
}
```

### ISessionManagementService

```csharp
public interface ISessionManagementService : IModuleApiService
{
    // Events
    event EventHandler<ISessionInfo>? LiveSessionStateChange;
    event EventHandler<ISessionInfo>? LiveSessionStarted;
    event EventHandler<ISessionInfo>? LiveSessionEnded;
    event EventHandler<ISessionAssociationInfo>? NewAssociationDetected;
    
    // Properties
    Guid Id { get; }
    
    // Methods
    ApiResult<IReadOnlyList<ISessionInfo>> GetAllSessions();
    ApiResult<ISessionInfo?> CreateNewSession(SessionCreationDto createSessionDto);
    ApiResult<ISessionInfo?> UpdateIdentifier(string dataSource, string sessionKey, string newIdentifier);
    ApiResult<ISessionInfo?> AddAssociateSession(string dataSource, string sessionKey, string addingAssociateKey);
    ApiResult<ISessionInfo?> UpdateSessionDetails(string dataSource, string sessionKey, IReadOnlyList<SessionDetailDto> sessionDetails);
    ApiResult<ISessionInfo?> GetSessionInfo(string dataSource, string sessionKey);
    ApiResult<ISessionInfo?> EndSession(string dataSource, string sessionKey);
}
```

### ISessionInfo

```csharp
public interface ISessionInfo
{
    string SessionKey { get; }
    string DataSource { get; }
    string Identifier { get; }
    string Type { get; }
    uint Version { get; }
    bool Historical { get; }
    TimeSpan UtcOffset { get; }
    IReadOnlyDictionary<string, string> Details { get; }
    IReadOnlyList<string> AssociateSessionKeys { get; }
}
```

### SessionCreationDto

```csharp
public class SessionCreationDto
{
    public readonly string DataSource;
    public readonly string Identifier;
    public readonly string Type;
    public readonly uint Version;
    public readonly TimeSpan UtcOffset;
    public readonly IReadOnlyList<SessionDetailDto> Details;
    public readonly IReadOnlyList<string> AssociatedSessionKeys;
    
    public SessionCreationDto(
        string dataSource = "Default",
        string identifier = "",
        string type = "Session",
        uint version = 1,
        TimeSpan? utcOffset = null,
        IReadOnlyList<SessionDetailDto>? details = null,
        IReadOnlyList<string>? associatedSessionKeys = null);
}
```

### SessionDetailDto

```csharp
public class SessionDetailDto
{
    public readonly string Key;
    public readonly string Value;
    
    public SessionDetailDto(string key, string value);
}
```

### ISessionAssociationInfo

```csharp
public interface ISessionAssociationInfo
{
    ISessionInfo MainSessionInfo { get; }
    ISessionInfo AssociateSessionInfo { get; }
    string Group { get; }
}
```

---

## Data Format Manager Module

### IDataFormatManagerModuleApi

```csharp
public interface IDataFormatManagerModuleApi : IModuleApi
{
    ApiResult<IDataFormatManagementService?> CreateService();
}
```

### IDataFormatManagementService

```csharp
public interface IDataFormatManagementService : IModuleApiService
{
    // Events
    event EventHandler<DataFormatInfo> DataFormatInfoUpdated;
    
    // Methods
    ApiResult<EventDataFormatInfo?> GetEventDataFormatId(string dataSource, string eventName);
    ApiResult<EventDataFormatInfo?> GetEvent(string dataSource, ulong dataFormatId);
    ApiResult<ParameterDataFormatInfo?> GetParameterDataFormatId(string dataSource, IReadOnlyList<string> parameterList);
    ApiResult<ParameterDataFormatInfo?> GetParametersList(string dataSource, ulong dataFormatId);
    ApiResult<IReadOnlyList<DataFormatInfo>?> GetDataSourceDataFormatInfo(string dataSource);
}
```

### DataFormatInfo

```csharp
public class DataFormatInfo
{
    public string DataSource { get; }    
    public string Key { get; }
    public IReadOnlyList<ulong> DataFormats { get; }
    public IReadOnlyList<string> Identifiers { get; }
    public DataFormatInfoType DataFormatInfoType { get; }
}
```

### ParameterDataFormatInfo

```csharp
public class ParameterDataFormatInfo
{
    public readonly string DataSource;
    public IReadOnlyList<string> ParameterList;
    public readonly ulong DataFormatId;
}
```

### EventDataFormatInfo

```csharp
public class EventDataFormatInfo
{
    public readonly string DataSource;
    public ulong DataFormatId;
    public string EventName;
}
```

### DataFormatInfoType

```csharp
public enum DataFormatInfoType
{
    Parameters,
    Event
}
```

---

## Writer Module

### IPacketWritingModuleApi

```csharp
public interface IPacketWritingModuleApi : IModuleApi
{
    ApiResult<IPacketWriterService?> CreateService();
}
```

### IPacketWriterService

```csharp
public interface IPacketWriterService : IModuleApiService
{
    ApiResult<bool?> WriteData(string dataSource, string stream, string sessionKey, Packet packet);
    ApiResult<bool?> WriteInfo(Packet packet, InfoType infoType = InfoType.SessionInfo);
}
```

### InfoType

```csharp
public enum InfoType
{
    Unspecified,
    SessionInfo,
    SystemStatus
}
```

---

## Reader Module

### IPacketReadingModuleApi

```csharp
public interface IPacketReadingModuleApi : IModuleApi
{
    ApiResult<IPacketReaderService?> CreateService(string dataSource, string sessionKey);
    ApiResult<IPacketReaderService?> CreateService(IPacketReadingConfiguration config);
}
```

### IPacketReaderService

```csharp
public interface IPacketReaderService : IModuleApiService
{
    // Events
    event EventHandler<ISessionInfo> SessionReadingStarted;
    event EventHandler<ISessionInfo> SessionReadingCompleted;
    event EventHandler<IStreamInfo> StreamReadingStarted;
    event EventHandler<IStreamInfo> StreamReadingCompleted;
    event EventHandler<ISessionInfo> SessionInfoUpdated;
    event EventHandler<ISessionAssociationInfo> SessionAssociationInfoUpdated;
    event EventHandler<ICoverageCursorInfo> CoverageCursorReceived;
    
    // Properties
    Guid Id { get; }
    
    // Methods
    void AddHandler(IHandler<IReceivedPacketDto> handler);
    void RemoveHandler(IHandler<IReceivedPacketDto> handler);
}
```

### PacketReadingConfiguration

```csharp
public class PacketReadingConfiguration : IPacketReadingConfiguration
{
    public string SessionKey { get; }
    public uint InactivityTimeoutSeconds { get; }
    public bool ExcludeMainStream { get; }
    public string DataSource { get; }
    public string SessionIdentifierPattern { get; }
    public ReadingType ReadingType { get; }
    public IReadOnlyList<string> Streams { get; }
    
    public PacketReadingConfiguration(
        string? dataSource = "Default",
        string? sessionIdentifierPattern = "*",
        ReadingType? readingType = ReadingType.Live,
        IReadOnlyList<string>? streams = null,
        bool? excludeMainStream = false,
        uint? inactivityTimeoutSeconds = 30,
        string? sessionKey = null);
}
```

### ReadingType

```csharp
public enum ReadingType
{
    Live = 0,
    Historic = 1,
    Both = 2
}
```

### IReceivedPacketDto

```csharp
public interface IReceivedPacketDto
{
    string DataSource { get; }
    string SessionKey { get; }
    Packet Packet { get; }
    DateTime SubmitTime { get; }
    string Stream { get; }
}
```

### IStreamInfo

```csharp
public interface IStreamInfo
{
    string Stream { get; }
    string SessionKey { get; }
    string DataSource { get; }
}
```

### ICoverageCursorInfo

```csharp
public interface ICoverageCursorInfo
{
    string DataSource { get; }
    string SessionKey { get; }
    ulong CoverageCursorTime { get; }
}
```

---

## Buffering Module

### ISampleReadingModuleApi

```csharp
public interface ISampleReadingModuleApi : IModuleApi
{
    ApiResult<ISampleReaderService?> CreateService(IBufferingConfiguration bufferingConfiguration);
}
```

### ISampleReaderService

```csharp
public interface ISampleReaderService : IModuleApiService
{
    // Events
    event EventHandler<ISessionInfo> SessionDataMergingStarted;
    event EventHandler<ISessionInfo> SessionDataMergingCompleted;
    
    // Properties
    Guid Id { get; }
    
    // Methods
    void SetReaderService(IPacketReaderService readingService);
    void AddHandler(IHandler<ITimestampData> timestampHandler);
    void AddHandler(IHandler<ISampleData> sampleHandler);
    void RemoveHandler(IHandler<ITimestampData> timestampHandler);
    void RemoveHandler(IHandler<ISampleData> sampleHandler);
    IReadOnlyList<(string Stream, ulong LastTimestamp)> GetLastTimeInfo(string dataSource, string sessionKey);
    void Subscribe(IEnumerable<string> parameterIdentifiers);
    void SubscribeAll(); // Not recommended due to performance implications
    void Unsubscribe(IEnumerable<string> parameterIdentifiers);
    void UnsubscribeAll();
}
```

### BufferingConfiguration

```csharp
public class BufferingConfiguration : IBufferingConfiguration
{
    public bool IncludeMarkerData { get; }
    public bool IncludeEventData { get; }
    public bool IncludeErrorData { get; }
    public bool IncludeCanData { get; }
    public MergeStrategy MergeStrategy { get; }
    public uint BufferingWindowLength { get; }
    public uint SlidingWindowPercentage { get; }
    public IReadOnlyList<string> SubscribedParameters { get; }
    
    public BufferingConfiguration(
        IReadOnlyList<string>? subscribedParameters = null,
        uint? bufferingWindowLength = 3000,
        uint? slidingWindowPercentage = 5,
        MergeStrategy? mergeStrategy = null,
        bool? includeMarkerData = null,
        bool? includeEventData = null,
        bool? includeErrorData = null,
        bool? includeCanData = null);
}
```

### MergeStrategy

Defines the strategy for merging data packets.

```csharp
public enum MergeStrategy
{
    WritingMerge = 0,
    ReadingMerge = 1 // Default strategy; recommended for better performance
}
```

### ITimestampData

```csharp
public interface ITimestampData
{
    string DataSource { get; }
    string SessionKey { get; }
    ulong Timestamp { get; }
    IReadOnlyList<ITimestampColumn> TimeColumns { get; }
}
```

### ITimeColumn

```csharp
public interface ITimeColumn
{
    ulong Timestamp { get; }
    IReadOnlyList<ISampleValue> SampleValues { get; }
}
```

### ISampleValue

```csharp
public interface ISampleValue
{
    string Identifier { get; }
    IGenericValue Value { get; }
    ValueStatus Status { get; }
    Type ValueType { get; }
    T? Cast<T>();
}
```

### ISampleData

```csharp
public interface ISampleData
{
    string DataSource { get; }
    string SessionKey { get; }
    ulong StartTime { get; }
    ulong EndTime { get; }
    string Identifier { get; }
    IReadOnlyList<ITimestampValue> Values { get; }
}
```
### ITimestampValue

```csharp
public interface ITimestampValue
{
    ulong Timestamp { get; }
    IGenericValue Value { get; }
    ValueStatus Status { get; }
    Type ValueType { get; }
    T? Cast<T>();
}
```

---

## Interpolation Module

### IDataReadingModuleApi

```csharp
public interface IDataReadingModuleApi : IModuleApi
{
    ApiResult<IDataReaderService?> CreateService();
}
```

### IDataReaderService

```csharp
public interface IDataReaderService : IModuleApiService
{
    // Properties
    Guid Id { get; }
    
    // Methods
    void SetSampleReaderService(ISampleReaderService sampleReaderService);
    void Subscribe(
        string subscriptionKey,
        IReadOnlyList<string> parameterIdentifiers,
        double subscriptionFrequencyHz,
        IBatchResultHandler handler,
        double? deliveryFrequencyHz = null,
        ISubscriptionProcessor? processor = null);
    void Unsubscribe(string subscriptionKey);
}
```

### IBatchResultHandler

```csharp
public interface IBatchResultHandler
{
    void Handle(BatchResult result);
}
```

### BatchResult

```csharp
public class BatchResult
{
    public readonly string DataSource;
    public readonly string SubscriptionKey;
    public readonly string SessionKey;
    public readonly ulong DeliveryIntervalStartTimeNano;
    public readonly ulong DeliveryIntervalEndTimeNano;
    public readonly IReadOnlyList<IProcessResult> Results;

    public BatchResult(
        string dataSource,
        string sessionKey,
        string subscriptionKey,
        ulong start,
        ulong end,
        IReadOnlyList<IProcessResult> results);
}
```

### IProcessResult

```csharp
public interface IProcessResult
{
    string Identifier { get; }
    ulong IntervalStartTimeNano { get; }
    ulong IntervalEndTimeNano { get; }
}
```

### ProcessResult

```csharp
public abstract class ProcessResult : IProcessResult
{
    protected ProcessResult(string identifier, ulong start, ulong end);
    
    public string Identifier { get; }
    public ulong IntervalStartTimeNano { get; }
    public ulong IntervalEndTimeNano { get; }
}
```

### DefaultResult

Default implementation of `IProcessResult` that provides standard aggregation results. This is the default result created by the default processor within the interpolation module.

```csharp
public class DefaultResult : ProcessResult
{
    // Constructor for Subsampling 
    public DefaultResult(string paramId, ulong start, ulong end, double first, double last, double min, double max, double mean, int count)
        : base(paramId, start, end);
    
    // Constructor for Super-sampling 
    public DefaultResult(string paramId, ulong start, ulong end, double lastValueBefore)
        : base(paramId, start, end);
    
    // Empty Result Constructor
    public DefaultResult(string paramId, ulong start, ulong end)
        : base(paramId, start, end);
    
    public bool IsSuperSampled { get; }
    public double? First { get; }
    public double? Last { get; }
    public double? Min { get; }
    public double? Max { get; }
    public double? Mean { get; }
    public int Count { get; }
}
```



### ISubscriptionProcessor

```csharp
public interface ISubscriptionProcessor
{
    // Custom processor interface for advanced subscription processing
    IProcessResult Process(ProcessContext context);
}
```

---

## Common Interfaces

### IHandler<T>

```csharp
public interface IHandler<in T>
{
    void Handle(T obj);
}
```

### IModuleApi

```csharp
public interface IModuleApi
{
    internal void Initialise();
    internal Task InitialiseAsync(CancellationToken cancellationToken);
    internal void Start();
    internal void Stop();
}
```

### IModuleApiService

```csharp
public interface IModuleApiService : IServiceModel
{
    // Base interface for all module services 
}
```

---

## Configuration Classes

### StreamingApiConfiguration

```csharp
public class StreamingApiConfiguration : IStreamingApiConfiguration
{
    public StreamCreationStrategy StreamCreationStrategy { get; }
    public string BrokerUrl { get; }
    public IReadOnlyList<PartitionMapping>? PartitionMappings { get; }
    public int StreamApiPort { get; }
    public bool IntegrateSessionManagement { get; }
    public bool IntegrateDataFormatManagement { get; }
    public bool UseRemoteKeyGenerator { get; }
    public string RemoteKeyGeneratorServiceAddress { get; }
    public bool BatchingResponses { get; }
    public uint InitialisationTimeoutSeconds { get; }
    
    public StreamingApiConfiguration(
        StreamCreationStrategy? streamCreationStrategy = null,
        string? brokerUrl = null,
        IReadOnlyList<PartitionMapping>? partitionMappings = null,
        int? streamApiPort = 13579,
        bool? integrateSessionManagement = true,
        bool? integrateDataFormatManagement = true,
        bool? useRemoteKeyGenerator = false,
        string? remoteKeyGeneratorServiceAddress = "",
        bool? batchingResponses = false,
        uint? initialisationTimeoutSeconds = 3);
}
```

### StreamCreationStrategy

```csharp
public enum StreamCreationStrategy
{
    PartitionBased = 1,
    TopicBased = 2,
}
```

### RetryPolicy

```csharp
public class RetryPolicy : IRetryPolicy
{
    public int MaxRetryCount { get; }
    public TimeSpan DelayBetweenRetries { get; }
    public RetryMode RetryMode { get; }
    
    public RetryPolicy(
        int maxRetryCount,
        TimeSpan delayBetweenRetries,
        RetryMode retryMode);
}
```


### RetryMode

```csharp
public enum RetryMode
{
    Finite,
    Infinite
}
```

---

## Packet Types (MA.Streaming.OpenData)

### Packet

```csharp
public class Packet
{
    public string SessionKey { get; set; }
    public ByteString Content { get; set; }
    public ulong Id { get; set; }
    public string Type { get; set; }
    public bool IsEssential { get; set; }
}
```

### Common Packet Types

- **NewSessionPacket**: Session start marker
- **EndOfSessionPacket**: Session end marker
- **PeriodicDataPacket**: Regular interval data
- **RowDataPacket**: Timestamped row data
- **EventPacket**: Event occurrences
- **MarkerPacket**: Session markers
- **DataFormatDefinitionPacket**: Format definitions
- **CoverageCursorInfoPacket**: Coverage information

---

## Usage Patterns

### Standard Initialization Pattern

```csharp
// Create and initialize
var supportLibApi = new SupportLibApiFactory().Create(logger, config, retryPolicy);
await supportLibApi.InitialiseAsync(cancellationToken);

if (supportLibApi.IsInitialised)
{
    supportLibApi.Start();
}
```

### Service Creation Pattern

```csharp
// Get API
var moduleApi = supportLibApi.GetXxxApi();

// Create service
var result = moduleApi.CreateService(/* config */);

if (result.Success && result.Data != null)
{
    var service = result.Data;
    service.Initialise();
    service.Start();
}
```

### Pipeline Pattern

```csharp
// Create pipeline: Reader -> Sample Reader -> Data Reader
var packetReader = readerApi.CreateService(config).Data;
var sampleReader = sampleReaderApi.CreateService(bufferingConfig).Data;
var dataReader = dataReaderApi.CreateService().Data;

// Connect pipeline
sampleReader.SetReaderService(packetReader);
dataReader.SetSampleReaderService(sampleReader);

// Initialize
packetReader.Initialise();
sampleReader.Initialise();
dataReader.Initialise();

// Start (reverse order)
dataReader.Start();
sampleReader.Start();
packetReader.Start();
```

### Cleanup Pattern

```csharp
// Stop services (reverse of start order)
packetReader.Stop();
sampleReader.Stop();
dataReader.Stop();

// Stop main API
supportLibApi.Stop();
```

---

## See Also

- [Index](index.md)
- [Session Manager Module](session-manager.md)
- [Data Format Manager Module](data-format-manager.md)
- [Writer Module](writer-module.md)
- [Reader Module](reader-module.md)
- [Buffering Module](buffering-module.md)
- [Interpolation Module](interpolation-module.md)
