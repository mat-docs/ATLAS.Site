# Interpolation Module (Data Reader / Data API)

## Overview

The Interpolation Module, also known as the Data Reader or Data API Module, provides advanced data processing capabilities by subscribing to parameters at custom frequencies and performing automatic interpolation or decimation. This module pipelines with the Sample Reader output and enables applications to receive data at their desired sampling rates regardless of the original data frequency.

## Key Features

- **Custom Frequency Subscriptions**: Subscribe to parameters at any desired frequency
- **Automatic Interpolation**: Super-sample lower frequency data to higher frequencies
- **Automatic Decimation**: Sub-sample higher frequency data to lower frequencies
- **Batch Result Delivery**: Receive results in configurable batches
- **Multiple Subscriptions**: Manage multiple subscriptions with different frequencies
- **Subscription Processors**: Apply custom processing logic to subscriptions
- **Dynamic Management**: Add and remove subscriptions on-the-fly
- **Pipeline Integration**: Seamlessly connects to Sample Reader output

## API Access

### Get the Data Reader API

```csharp
var dataReaderApi = supportLibApi.GetDataReaderApi();

```

### Create a Data Reader Service

```csharp
var result = dataReaderApi.CreateService();

if (result.Success && result.Data != null)
{
    var dataReaderService = result.Data;
}

```

**Note**: Unlike other services, the Data Reader has no configuration at creation time. All configuration is done through subscriptions.

## Core Concepts

### Subscription Model

Each subscription specifies:
- **Subscription Key**: Unique identifier for the subscription
- **Parameters**: List of parameter identifiers to include
- **Subscription Frequency**: Target frequency in Hz (samples per second)
- **Delivery Frequency**: How often to deliver batched results (optional)
- **Handler**: Callback to receive interpolated results
- **Processor**: Optional custom processing logic

### Interpolation vs. Decimation

- **Super-sampling (Interpolation)**: When subscription frequency > original data frequency
  - Data is interpolated to fill gaps
  - Creates smooth transitions between known values

- **Sub-sampling (Decimation)**: When subscription frequency < original data frequency
  - Data is decimated to reduce sample count
  - Selects or averages samples to match target frequency

## Methods

### SetSampleReaderService

Connects the data reader to a sample reader service.

```csharp
public void SetSampleReaderService(ISampleReaderService sampleReaderService)
```

**Example:**

```csharp
// Create the pipeline: PacketReader -> SampleReader -> DataReader

// 1. Create packet reader
var packetReaderService = readerApi.CreateService(dataSource, sessionKey).Data;

// 2. Create sample reader
var sampleReaderService = sampleReaderApi.CreateService(bufferingConfig).Data;

// 3. Create data reader
var dataReaderService = dataReaderApi.CreateService().Data;

// 4. Connect the pipeline
sampleReaderService.SetReaderService(packetReaderService);
dataReaderService.SetSampleReaderService(sampleReaderService);

// 5. Initialize and start (in order)
packetReaderService.Initialise();
sampleReaderService.Initialise();
dataReaderService.Initialise();

dataReaderService.Start();
sampleReaderService.Start();
packetReaderService.Start();
```

### Subscribe

Creates a new subscription for interpolated data.

```csharp
public void Subscribe(
    string subscriptionKey,
    IReadOnlyList<string> parameterIdentifiers,
    double subscriptionFrequencyHz,
    IBatchResultHandler handler,
    double? deliveryFrequencyHz = null,
    ISubscriptionProcessor? processor = null)
```

**Parameters:**

- **subscriptionKey**: Unique identifier for this subscription (used to unsubscribe later)
- **parameterIdentifiers**: List of parameter names to include in results
- **subscriptionFrequencyHz**: Target sampling frequency in Hz (e.g., 10.0 = 10 samples/second)
- **deliveryFrequencyHz**: (Optional) How often to deliver batched results in Hz (default: 10.0)
    - If not specified, defaults to 10 Hz (10 deliveries per second)
    - If specified, results are batched and delivered at this frequency
    - Should not be set to 0
- **processor**: (Optional) Custom processor for additional data transformation

**Example:**

```csharp
// Subscribe to parameters at 100 Hz with results delivered every 10 Hz
dataReaderService.Subscribe(
    subscriptionKey: "TelemetryData_100Hz",
    parameterIdentifiers: new[] { "Speed", "RPM", "Throttle", "BrakePressure" },
    subscriptionFrequencyHz: 100.0,  // Want 100 samples per second
    handler: new MyBatchResultHandler(),
    deliveryFrequencyHz: 10.0);  // Deliver batches 10 times per second
    
```

### Unsubscribe

Removes a subscription.

```csharp
public void Unsubscribe(string subscriptionKey)

```

**Example:**

```csharp
dataReaderService.Unsubscribe("TelemetryData_100Hz");

```

## Handlers

### IBatchResultHandler Interface

Implement this interface to receive interpolation results.

```csharp
public interface IBatchResultHandler
{
    void Handle(BatchResult result);
}
```

### BatchResult

Contains the interpolated results for a batch.

```csharp
public class BatchResult
{
    public readonly string DataSource;
    public readonly string SubscriptionKey;
    public readonly string SessionKey;
    public readonly ulong DeliveryIntervalStartTimeNano;
    public readonly ulong DeliveryIntervalEndTimeNano;
    public readonly IReadOnlyList<IProcessResult> Results;
}
```

**Properties:**

- **DataSource**: The data source identifier
- **SubscriptionKey**: Unique identifier for the subscription
- **SessionKey**: Session identifier for the data
- **DeliveryIntervalStartTimeNano**: Start timestamp of the delivery interval in nanoseconds
- **DeliveryIntervalEndTimeNano**: End timestamp of the delivery interval in nanoseconds
- **Results**: Collection of interpolated results in this batch

### IProcessResult

Individual interpolation result.

```csharp
public interface IProcessResult
{
    string Identifier { get; }
    ulong IntervalStartTimeNano { get; }
    ulong IntervalEndTimeNano { get; }
}
```

**Properties:**

- **Identifier**: parameter identifier
- **IntervalStartTimeNano**: Start timestamp of the interval in nanoseconds
- **IntervalEndTimeNano**: End timestamp of the interval in nanoseconds

## Complete Examples

### Example 1: Basic Interpolation

```csharp
using MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts.InterpolationModule.Abstractions;

public class BasicInterpolationExample
{
    public void SetupInterpolation(ISupportLibApi supportLibApi, string dataSource, string sessionKey)
    {
        // 1. Create the full pipeline
        var readerApi = supportLibApi.GetReadingPacketApi();
        var packetReaderService = readerApi.CreateService(dataSource, sessionKey).Data;
        
        var sampleReaderApi = supportLibApi.GetSampleReaderApi();
        var bufferingConfig = new BufferingConfiguration(
            subscribedParameters: new[] { "Speed", "RPM", "Throttle" });
        var sampleReaderService = sampleReaderApi.CreateService(bufferingConfig).Data;
        
        var dataReaderApi = supportLibApi.GetDataReaderApi();
        var dataReaderService = dataReaderApi.CreateService().Data;
        
        // 2. Connect pipeline
        sampleReaderService.SetReaderService(packetReaderService);
        dataReaderService.SetSampleReaderService(sampleReaderService);
        
        // 3. Create subscription
        dataReaderService.Subscribe(
            subscriptionKey: "MainTelemetry",
            parameterIdentifiers: new[] { "Speed", "RPM", "Throttle" },
            subscriptionFrequencyHz: 50.0,  // 50 Hz output
            handler: new InterpolationHandler(),
            deliveryFrequencyHz: 10.0);  // Deliver 10 times per second
        
        // 4. Initialize and start
        packetReaderService.Initialise();
        sampleReaderService.Initialise();
        dataReaderService.Initialise();
        
        dataReaderService.Start();
        sampleReaderService.Start();
        packetReaderService.Start();
    }
    
    private class InterpolationHandler : IBatchResultHandler
    {
        private int batchCount = 0;
        
        public void Handle(BatchResult result)
        {
            batchCount++;
            
            Console.WriteLine($"\n=== Batch {batchCount} ===");
            Console.WriteLine($"Subscription: {result.SubscriptionKey}");
            Console.WriteLine($"Session: {result.SessionKey}");
            Console.WriteLine($"Data Source: {result.DataSource}");
            Console.WriteLine($"Interval: {result.DeliveryIntervalStartTimeNano}ns - {result.DeliveryIntervalEndTimeNano}ns");
            Console.WriteLine($"Results: {result.Results.Count}");
            
            foreach (var processResult in result.Results)
            {
                Console.WriteLine($"  Parameter: {processResult.Identifier}");
                Console.WriteLine($"  Interval: {processResult.IntervalStartTimeNano}ns - {processResult.IntervalEndTimeNano}ns");
            }
        }
    }
}

```

### Example 2: Multiple Subscriptions at Different Frequencies

```csharp
public class MultiFrequencyExample
{
    private IDataReaderService dataReaderService;
    
    public void SetupMultipleSubscriptions(IDataReaderService dataReaderService)
    {
        this.dataReaderService = dataReaderService;
        
        // High frequency subscription for critical parameters
        dataReaderService.Subscribe(
            subscriptionKey: "HighFreq_Critical",
            parameterIdentifiers: new[] { "Speed", "BrakePressure", "ThrottlePosition" },
            subscriptionFrequencyHz: 200.0,  // 200 Hz
            handler: new HighFrequencyHandler(),
            deliveryFrequencyHz: 20.0);
        
        // Medium frequency for engine data
        dataReaderService.Subscribe(
            subscriptionKey: "MediumFreq_Engine",
            parameterIdentifiers: new[] { "RPM", "EngineTemp", "OilPressure" },
            subscriptionFrequencyHz: 50.0,  // 50 Hz
            handler: new MediumFrequencyHandler(),
            deliveryFrequencyHz: 10.0);
        
        // Low frequency for slowly changing parameters
        dataReaderService.Subscribe(
            subscriptionKey: "LowFreq_Ambient",
            parameterIdentifiers: new[] { "AmbientTemp", "TrackTemp", "Humidity" },
            subscriptionFrequencyHz: 1.0,  // 1 Hz
            handler: new LowFrequencyHandler(),
            deliveryFrequencyHz: 1.0);
    }
    
    private class HighFrequencyHandler : IBatchResultHandler
    {
        public void Handle(BatchResult result)
        {
            // Process high-frequency critical data
            Console.WriteLine($"[200Hz] Received {result.Results.Count} samples");
        }
    }
    
    private class MediumFrequencyHandler : IBatchResultHandler
    {
        public void Handle(BatchResult result)
        {
            // Process medium-frequency engine data
            Console.WriteLine($"[50Hz] Received {result.Results.Count} samples");
        }
    }
    
    private class LowFrequencyHandler : IBatchResultHandler
    {
        public void Handle(BatchResult result)
        {
            // Process low-frequency ambient data
            Console.WriteLine($"[1Hz] Received {result.Results.Count} samples");
        }
    }
}
```


## Best Practices

1. **Choose Appropriate Frequencies**:
   - Higher frequencies = more data, higher processing cost
   - Match frequency to your actual needs (display update rate, analysis requirements)

2. **Use Delivery Frequency Wisely**:
   - Batching results reduces handler call overhead
   - Balance between latency and efficiency

3. **Subscription Keys**:
   - Use descriptive keys for easier management
   - Follow a naming convention (e.g., "Feature_Frequency_Purpose")

4. **Pipeline Order**:
   - Always set up the full pipeline before starting
   - Initialize in order: Packet -> Sample -> Data
   - Start in reverse order: Data -> Sample -> Packet

5. **Resource Management**:
   - Unsubscribe from subscriptions you no longer need
   - Close file handles and dispose resources in handlers

6. **Error Handling**:
   - Wrap handler logic in try-catch to prevent crashes
   - Log errors for debugging

## Performance Considerations

### Interpolation Overhead

- Higher subscription frequencies require more interpolation calculations
- Consider the original data frequency vs. desired output frequency
- Large frequency mismatches increase processing load

### Delivery Frequency Optimization

```csharp
// High overhead - handler called very frequently
dataReaderService.Subscribe("Sub1", params, 100.0, handler, deliveryFrequencyHz: 100.0);

// Optimized - results batched, handler called less frequently
dataReaderService.Subscribe("Sub2", params, 100.0, handler, deliveryFrequencyHz: 10.0);

```

### Memory Management

- Batched results accumulate in memory until delivered
- Very low delivery frequencies with high subscription frequencies may use significant memory
- Balance batch size with available memory

## See Also

- [Buffering Module](buffering-module.md)
- [Reader Module](reader-module.md)
- [API Reference](api-reference.md)
- [Configuration Guide](configuration.md)
