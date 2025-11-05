# Buffering Module (Sample Reader)

## Overview

The Buffering Module, also known as the Sample Reader Module, is a critical component that pipelines with the Packet Reader Module. It buffers incoming packets, merges data segments, and extracts time-aligned samples from the raw packet stream. This module transforms packet-level data into sample-level data suitable for analysis and visualization.

## Key Features

- **Packet Buffering**: Buffer incoming packets in configurable time windows
- **Data Merging**: Merge data from multiple packets into coherent samples
- **Sample Extraction**: Extract time-aligned parameter samples
- **Sliding Window**: Process data with configurable sliding windows
- **Parameter Subscription**: Subscribe to specific parameters or all parameters
- **Dynamic Subscription**: Add/remove parameter subscriptions on-the-fly
- **Multiple Merge Strategies**: Support different merging approaches
- **Event Filtering**: Include/exclude markers, events, errors, and CAN data
- **Pipeline Architecture**: Seamlessly connects to Packet Reader output

## API Access

### Get the Sample Reader API

```csharp
var sampleReaderApi = supportLibApi.GetSampleReaderApi();

```

### Create a Sample Reader Service

```csharp
using MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.BufferingModule;

var config = new BufferingConfiguration(
    subscribedParameters: new[] { "Speed", "RPM", "Throttle" },
    bufferingWindowLength: 3000,      // 3 seconds
    slidingWindowPercentage: 5,       // 5% slide
    mergeStrategy: MergeStrategy.ReadingMerge, // better to use reading merge for performance
    includeMarkerData: false,
    includeEventData: false,
    includeErrorData: false,
    includeCanData: false);

var result = sampleReaderApi.CreateService(config);

if (result.Success && result.Data != null)
{
    var sampleReaderService = result.Data;
}

```

## Configuration Options

### BufferingConfiguration

```csharp
public BufferingConfiguration(
    IReadOnlyList<string>? subscribedParameters = null,
    uint? bufferingWindowLength = 3000,
    uint? slidingWindowPercentage = 5,
    MergeStrategy? mergeStrategy = null,
    bool? includeMarkerData = null,
    bool? includeEventData = null,
    bool? includeErrorData = null,
    bool? includeCanData = null)
```

**Parameters:**

- **subscribedParameters**: List of parameter identifiers to subscribe to
  - `null` or empty list = no parameters initially subscribed
  - Can subscribe/unsubscribe dynamically later
  - Parameter names must match those defined in Data Format Manager

- **bufferingWindowLength**: Length of buffering window in milliseconds (default: 3000ms = 3 seconds)
  - Larger windows provide more context but increase latency
  - Smaller windows reduce latency but may miss data correlations

- **slidingWindowPercentage**: Percentage of window to advance on each slide (default: 5%)
  - Range: 1-100
  - 5% = window slides by 5% of its length each iteration
  - 100% = window jumps by full length (no overlap)
  - Lower percentage = more overlap, smoother results, higher processing

- **mergeStrategy**: Strategy for merging data segments
  - `MergeStrategy.ReadingMerge`: Default strategy optimized for reading
  - Other strategies may be available based on implementation

- **includeMarkerData**: Include marker packets in buffering (default: false)

- **includeEventData**: Include event packets in buffering (default: false)

- **includeErrorData**: Include error packets in buffering (default: false)

- **includeCanData**: Include CAN bus data in buffering (default: false)

### MergeStrategy Enum

```csharp
public enum MergeStrategy
{
    WritingMerge,
    ReadingMerge // Optimized for sequential reading and merging        
}

```

## Methods

### SetReaderService

Connects the sample reader to a packet reader service.

```csharp
public void SetReaderService(IPacketReaderService readingService)

```

**Example:**

```csharp
// Create packet reader
var packetReaderService = readerApi.CreateService(dataSource, sessionKey).Data;

// Create sample reader
var sampleReaderService = sampleReaderApi.CreateService(bufferingConfig).Data;

// Pipeline them together
sampleReaderService.SetReaderService(packetReaderService);

// Initialize both
packetReaderService.Initialise();
sampleReaderService.Initialise();

// Start both (order matters: start packet reader last)
sampleReaderService.Start();
packetReaderService.Start();

```

### AddHandler (Timestamp Data)

Adds a handler for timestamp data (merged samples).

```csharp
public void AddHandler(IHandler<ITimestampData> timestampHandler)

```

**Example:**

```csharp
public class TimestampDataHandler : IHandler<ITimestampData>
{
    public void Handle(ITimestampData data)
    {
        Console.WriteLine($"Start Timestamp: {data.TimeColumns[0].Timestamp}");
        Console.WriteLine($"Data Source: {data.DataSource}");
        Console.WriteLine($"Session: {data.SessionKey}");

        foreach (var column in data.TimeColumns)
        {
            Console.WriteLine($"  Timestamp: {column.Timestamp}");
            Console.WriteLine($"  Samples: {column.SampleValues.Count}");

            foreach (var sample in column.SampleValues)
            {
                Console.WriteLine($"  Parameter Identifier:{sample.Identifier}  Value: {sample.Value} at  {column.Timestamp}");
            }
        }

        // Check if this is the end marker
        if (data is EndTimestampData)
        {
            Console.WriteLine("End of session data");
        }
    }
}

var handler = new TimestampDataHandler();
sampleReaderService.AddHandler(handler);

```

### AddHandler (Sample Data)

Adds a handler for sample data (alternative data format). It contains all values for each parameter in that reading range, with values ordered per parameter but not time-aligned across parameters.

```csharp
public void AddHandler(IHandler<ISampleData> sampleHandler)

```

### RemoveHandler

Removes previously added handlers.

```csharp
public void RemoveHandler(IHandler<ITimestampData> timestampHandler);
public void RemoveHandler(IHandler<ISampleData> sampleHandler);

```

### Subscribe

Subscribes to specific parameters.

```csharp
public void Subscribe(IEnumerable<string> parameterIdentifiers)

```

**Example:**

```csharp
// Subscribe to additional parameters
sampleReaderService.Subscribe(new[] { "BrakePressure", "SteeringAngle" });

```

**Note**: Can be called before or during data processing for dynamic subscription. There is a limitation on the number of parameters that can be merged simultaneously. To maintain optimal live processing performance, avoid subscribing to an excessive number of parameters, as merging operations may be constrained by system resources and processing capabilities.

### Unsubscribe

Unsubscribes from specific parameters.

```csharp
public void Unsubscribe(IEnumerable<string> parameterIdentifiers)
```

**Example:**

```csharp
sampleReaderService.Unsubscribe(new[] { "Throttle" });
```

### UnsubscribeAll

Unsubscribes from all parameters.

```csharp
public void UnsubscribeAll()

```

### GetLastTimeInfo

Gets the last timestamp information for each stream.

```csharp
public IReadOnlyList<(string Stream, ulong LastTimestamp)> GetLastTimeInfo(
    string dataSource,
    string sessionKey)

```

**Example:**

```csharp
var timeInfo = sampleReaderService.GetLastTimeInfo(dataSource, sessionKey);

foreach (var (stream, lastTimestamp) in timeInfo)
{
    Console.WriteLine($"Stream: {stream}, Last Timestamp: {lastTimestamp}µs");
}

```

## Events

### SessionDataMergingStarted

Fired when sample merging starts for a session.

```csharp
sampleReaderService.SessionDataMergingStarted += (sender, sessionInfo) =>
{
    Console.WriteLine($"Started merging data for session: {sessionInfo.SessionKey}");
    Console.WriteLine($"Session Type: {sessionInfo.Type}");
};

```

### SessionDataMergingCompleted

Fired when sample merging completes for a session.

```csharp
sampleReaderService.SessionDataMergingCompleted += (sender, sessionInfo) =>
{
    Console.WriteLine($"Completed merging data for session: {sessionInfo.SessionKey}");
    Console.WriteLine($"Historical: {sessionInfo.Historical}");
};

```

## Data Structures

### ITimestampData

Represents merged sample data at a specific timestamp.

```csharp
public interface ITimestampData
{
    string DataSource { get; }

    string SessionKey { get; }

    ulong StartTime { get; }

    ulong EndTime { get; }

    IReadOnlyList<ITimestampColumn> TimeColumns { get; }
}

```

### ITimeColumn

Represents sample values for a single parameter.

```csharp
public interface ITimestampColumn
{
    ulong Timestamp { get; }

    IReadOnlyList<ISampleValue> SampleValues { get; }
}
```

### ISampleValue

Represents a single sample value.

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

### EndTimestampData

Special marker indicating end of session data and merging.

```csharp
if (data is EndTimestampData)
{
    // Session data processing complete
}

```

## Complete Examples

### Example 1: Basic Buffering Pipeline

```csharp
using MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.BufferingModule;
using MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.BufferingModule.Abstractions;

public class BasicBufferingExample
{
    public void SetupBufferingPipeline(
        ISupportLibApi supportLibApi,
        string dataSource,
        string sessionKey)
    {
        // 1. Create packet reader
        var readerApi = supportLibApi.GetReadingPacketApi();
        var packetReaderResult = readerApi.CreateService(dataSource, sessionKey);
        var packetReaderService = packetReaderResult.Data;
        
        // 2. Create sample reader with configuration
        var sampleReaderApi = supportLibApi.GetSampleReaderApi();
        
        var bufferingConfig = new BufferingConfiguration(
            subscribedParameters: new[] { 
                "Speed", 
                "RPM", 
                "Throttle", 
                "BrakePressure" 
            },
            bufferingWindowLength: 5000,  // 5 second window
            slidingWindowPercentage: 10);  // 10% slide
        
        var sampleReaderResult = sampleReaderApi.CreateService(bufferingConfig);
        var sampleReaderService = sampleReaderResult.Data;
        
        // 3. Connect them
        sampleReaderService.SetReaderService(packetReaderService);
        
        // 4. Add handler
        sampleReaderService.AddHandler(new SampleProcessor());
        
        // 5. Subscribe to events
        sampleReaderService.SessionDataMergingStarted += (s, session) =>
        {
            Console.WriteLine($"Merging started for {session.SessionKey}");
        };
        
        sampleReaderService.SessionDataMergingCompleted += (s, session) =>
        {
            Console.WriteLine($"Merging completed for {session.SessionKey}");
        };
        
        // 6. Initialize and start
        packetReaderService.Initialise();
        sampleReaderService.Initialise();
        
        sampleReaderService.Start();
        packetReaderService.Start();  // Start packet reader last
        
        // Wait for completion...
    }
    
    private class SampleProcessor : IHandler<ITimestampData>
    {
        private int sampleCount = 0;

        public void Handle(ITimestampData data)
        {
            if (data is EndTimestampData)
            {
                Console.WriteLine($"Total samples processed: {this.sampleCount}");
                return;
            }

            foreach (var column in data.TimeColumns)
            {
                this.sampleCount += column.SampleValues.Count;
                Console.WriteLine($"#Sample {column.SampleValues.Count} at {column.Timestamp}");
            }
        }
    }
}

```

### Example 2: Dynamic On-the-Fly Subscription

```csharp
public class DynamicSubscriptionExample
{
    private ISampleReaderService sampleReaderService;
    private HashSet<string> currentSubscriptions = new();

    public void SetupDynamicSubscription(ISupportLibApi supportLibApi)
    {
        // Create with no initial subscriptions
        var sampleReaderApi = supportLibApi.GetSampleReaderApi();
        var config = new BufferingConfiguration();  // Empty subscription list

        var result = sampleReaderApi.CreateService(config);
        sampleReaderService = result.Data;

        // Add handler
        sampleReaderService.AddHandler(new DynamicSampleHandler());

        // Start with no subscriptions, add them dynamically
        Task.Run(() => ManageSubscriptionsAsync());
    }

    private async Task ManageSubscriptionsAsync()
    {
        await Task.Delay(1000);

        // Subscribe to initial set
        Console.WriteLine("Subscribing to Speed and RPM");
        SubscribeTo(new[] { "Speed", "RPM" });

        await Task.Delay(5000);

        // Add more parameters
        Console.WriteLine("Adding Throttle and BrakePressure");
        SubscribeTo(new[] { "Throttle", "BrakePressure" });

        await Task.Delay(5000);

        // Remove a parameter
        Console.WriteLine("Removing RPM");
        UnsubscribeFrom(new[] { "RPM" });       
    }

    private void SubscribeTo(string[] parameters)
    {
        sampleReaderService.Subscribe(parameters);
        foreach (var param in parameters)
        {
            currentSubscriptions.Add(param);
        }
    }

    private void UnsubscribeFrom(string[] parameters)
    {
        sampleReaderService.Unsubscribe(parameters);
        foreach (var param in parameters)
        {
            currentSubscriptions.Remove(param);
        }
    }

    private class DynamicSampleHandler : IHandler<ITimestampData>
    {
        public void Handle(ITimestampData data)
        {
            if (data is EndTimestampData) return;

            var receivedParams = data.TimeColumns.SelectMany(c => c.SampleValues.Select(sv=>sv.Identifier)).ToList();
            Console.WriteLine($"Received parameters: {string.Join(", ", receivedParams)}");
        }
    }
}

```

### Example 3: Advanced Sample Analysis

```csharp
public class SampleAnalyzer : IHandler<ITimestampData>
{
    private readonly Dictionary<string, List<double>> parameterValues = new();
    private readonly Dictionary<string, (double Min, double Max)> ranges = new();

    public void Handle(ITimestampData data)
    {
        if (data is EndTimestampData)
        {
            PrintSummary();
            return;
        }

        foreach (var column in data.TimeColumns)
        {
            foreach (var sample in column.SampleValues)
            {
                if (!parameterValues.ContainsKey(sample.Identifier))
                {
                    parameterValues[sample.Identifier] = [];
                    ranges[sample.Identifier] = (double.MaxValue, double.MinValue);
                }
                if (sample.Value.ValueType==typeof(double))
                {
                    var value = sample.Value.Cast<double>();
                    parameterValues[sample.Identifier].Add(value);

                    var (min, max) = ranges[sample.Identifier];
                    ranges[sample.Identifier] = (
                        Math.Min(min, value),
                        Math.Max(max, value)
                    );
                }
            }
        }
    }

    private void PrintSummary()
    {
        Console.WriteLine("\n=== Sample Analysis Summary ===");

        foreach (var param in parameterValues.Keys)
        {
            var values = parameterValues[param];
            var (min, max) = ranges[param];
            var avg = values.Average();

            Console.WriteLine($"\nParameter: {param}");
            Console.WriteLine($"  Samples: {values.Count}");
            Console.WriteLine($"  Min: {min:F2}");
            Console.WriteLine($"  Max: {max:F2}");
            Console.WriteLine($"  Avg: {avg:F2}");
        }
    }
}

```

### Example 4: Buffering with Events and Markers

```csharp
public void SetupWithEventsAndMarkers(ISupportLibApi supportLibApi)
{
    var sampleReaderApi = supportLibApi.GetSampleReaderApi();
    
    // Configure to include events and markers
    var config = new BufferingConfiguration(
        subscribedParameters: new[] { "Speed", "RPM" },
        bufferingWindowLength: 3000,
        slidingWindowPercentage: 5,
        includeMarkerData: true,   // Include markers
        includeEventData: true);   // Include events
    
    var result = sampleReaderApi.CreateService(config);
    var sampleReaderService = result.Data;
    
    sampleReaderService.AddHandler(new SampleHandler());
    
    // Setup pipeline and start...
}

```

## Working with Generic Values

### Extracting Values from IGenericValue

Use the `ValueType` property to check the type, then use `Cast<T>()` to extract the value:

```csharp
public object? ExtractValue(IGenericValue genericValue)
{
    if (genericValue.ValueType == typeof(double))
        return genericValue.Cast<double>();       

    if (genericValue.ValueType == typeof(MarkerData))
        return genericValue.Cast<MarkerData>();
    
    if (genericValue.ValueType == typeof(EventData))
        return genericValue.Cast<EventData>();
    
    if (genericValue.ValueType == typeof(ErrorData))
        return genericValue.Cast<ErrorData>();
    
    if (genericValue.ValueType == typeof(CanData))
        return genericValue.Cast<CanData>();
    
    return null;
}
```

## Best Practices

1. **Configure Window Size Appropriately**: 
   - Larger windows for analysis requiring more context
   - Smaller windows for low-latency applications

2. **Optimize Sliding Percentage**:
   - Lower percentage (10-20%) for smooth, continuous analysis
   - Higher percentage (50-100%) for distinct chunks with less overlap

3. **Subscribe Selectively**: 
   - Only subscribe to parameters you need to reduce memory and processing
   - Use dynamic subscription to adapt to changing requirements

4. **Pipeline Order Matters**:
   - Always initialize services before starting
   - Start sample reader before packet reader
   - Stop in reverse order

5. **Handle End Markers**: Always check for `EndTimestampData` to detect completion

6. **Thread Safety**: Handlers may be called from different threads. Create separate handler instances for each sample reader service rather than sharing a single handler instance across multiple services to avoid concurrency issues and ensure proper isolation of processing logic.

7. **Memory Management**: Unsubscribe from parameters you no longer need

8. **Event Filtering**: Only include events/markers/CAN data if needed

## Performance Tuning

### For Real-Time Processing

```csharp
var realtimeConfig = new BufferingConfiguration(
    subscribedParameters: criticalParameters,
    bufferingWindowLength: 3000,    // 3 second
    slidingWindowPercentage: 10,    // 20% slide for lower latency
    includeMarkerData: false,
    includeEventData: false);
```

### For Analysis/Playback

```csharp
var analysisConfig = new BufferingConfiguration(
    subscribedParameters: null,      // Subscribe dynamically
    bufferingWindowLength: 20000,    // 20 seconds
    slidingWindowPercentage: 5,      // 5% for maximum overlap
    includeMarkerData: true,
    includeEventData: true);
```

## Common Issues and Solutions

### Issue: Missing Samples

**Solution**: Increase `bufferingWindowLength` to capture more data in each window.

### Issue: High Latency

**Solution**: Decrease `bufferingWindowLength` or increase `slidingWindowPercentage`.

### Issue: High Memory Usage

**Solution**: Reduce subscribed parameters or decrease window length.


## See Also

- [Reader Module](reader-module.md)
- [Interpolation Module](interpolation-module.md)
- [API Reference](api-reference.md)
- [Configuration Guide](configuration.md)
