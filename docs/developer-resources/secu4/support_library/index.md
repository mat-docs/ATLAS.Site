# MA DataPlatforms Streaming Support Library - Documentation

Welcome to the comprehensive documentation for the MA DataPlatforms Streaming Support Library. This documentation is organized in an MkDocs-friendly format for easy navigation and readability.

## Documentation Structure

### Getting Started
- **[Main Overview](index.md)** - Introduction, architecture, and quick start guide

### Module Documentation

#### Core Modules (Independent)
1. **[Session Manager Module](session-manager.md)** - Session lifecycle management
   - Create and manage sessions
   - Session metadata and associations
   - Live session tracking
   - Events and notifications

2. **[Data Format Manager Module](data-format-manager.md)** - Data format definitions
   - Parameter format management
   - Event format management
   - Automatic ID generation
   - Format querying

#### Data Flow Modules (Dependent)
3. **[Writer Module](writer-module.md)** - Packet writing to broker
   - Write data packets
   - Publish session information
   - Multiple stream support
   - Packet types and serialization

4. **[Reader Module](reader-module.md)** - Packet reading from broker
   - Live and historical reading
   - Stream filtering
   - Coverage tracking
   - Event system
   - Configuration options

5. **[Buffering Module](buffering-module.md)** - Sample buffering and merging
   - Packet buffering
   - Data merging strategies
   - Sample extraction
   - Sliding window processing
   - Dynamic parameter subscription

6. **[Interpolation Module](interpolation-module.md)** - Data interpolation and subscription
   - Custom frequency subscriptions
   - Automatic interpolation/decimation
   - Batch result delivery
   - Multiple subscription management

### Reference
- **[API Reference](api-reference.md)** - Complete API reference with all interfaces, methods, and types

## Quick Navigation by Task

### I want to...

**Create and manage sessions**
→ See [Session Manager Module](session-manager.md)

**Define data formats for my parameters**
→ See [Data Format Manager Module](data-format-manager.md)

**Write telemetry data to Kafka**
→ See [Writer Module](writer-module.md)

**Read live or historical data**
→ See [Reader Module](reader-module.md)

**Buffer and merge packet data into samples**
→ See [Buffering Module](buffering-module.md)

**Subscribe to data at custom frequencies**
→ See [Interpolation Module](interpolation-module.md)

**Find specific API details**
→ See [API Reference](api-reference.md)

## Architecture Overview

![Architecture Diagram](images/architecture-diagram.svg)

## Key Concepts

### Module Dependencies

**Independent Core Modules:**
- Session Manager
- Data Format Manager

**Pipeline Modules:**
- Reader Module → Buffering Module → Interpolation Module

### Data Flow

1. **Writing**: Session → Data Format → Writer → Kafka
2. **Reading**: Kafka → Reader → Buffering → Interpolation → Application

### Common Workflows

#### Write Data Workflow
1. Initialize Support Library
2. Create Session (Session Manager)
3. Define Data Formats (Data Format Manager)
4. Write Packets (Writer Module)
5. End Session

#### Read Live Data Workflow
1. Initialize Support Library
2. Monitor for Live Sessions (Session Manager)
3. Create Reader for Session (Reader Module)
4. Create Sample Reader (Buffering Module)
5. Subscribe to Interpolated Data (Interpolation Module)

#### Read Historical Data Workflow
1. Initialize Support Library
2. Query Available Sessions (Session Manager)
3. Create Reader for Session (Reader Module)
4. Process Packets or Samples

## Code Examples

### Minimal Example

```csharp
// Initialize
var supportLibApi = new SupportLibApiFactory().Create(logger, config, retryPolicy);
await supportLibApi.InitialiseAsync(cancellationToken);
supportLibApi.Start();

// Create session
var sessionApi = supportLibApi.GetSessionManagerApi();
var sessionService = sessionApi.CreateService().Data;
sessionService.Initialise();
sessionService.Start();

var session = sessionService.CreateNewSession(
    new SessionCreationDto(dataSource: "MyDataSource"));
```

### Full Pipeline Example

```csharp
// Create full data reading pipeline
var packetReader = readerApi.CreateService(dataSource, sessionKey).Data;
var sampleReader = sampleReaderApi.CreateService(bufferingConfig).Data;
var dataReader = dataReaderApi.CreateService().Data;

// Connect pipeline
sampleReader.SetReaderService(packetReader);
dataReader.SetSampleReaderService(sampleReader);

// Subscribe to interpolated data
dataReader.Subscribe(
    subscriptionKey: "MySubscription",
    parameterIdentifiers: new[] { "Speed", "RPM" },
    subscriptionFrequencyHz: 100.0,
    handler: myHandler);

// Initialize and start
packetReader.Initialise();
sampleReader.Initialise();
dataReader.Initialise();

dataReader.Start();
sampleReader.Start();
packetReader.Start();
```

## Configuration Reference

### Initialization Configuration

- **StreamingApiConfiguration**: Kafka broker and topic configuration
- **RetryPolicy**: Connection retry behavior

### Module Configurations

- **PacketReadingConfiguration**: Reader behavior (live/historical, streams, timeout)
- **BufferingConfiguration**: Window size, sliding percentage, merge strategy
- **SessionCreationDto**: Session metadata and properties

## Event System

All modules provide rich event systems for tracking:
- Session lifecycle events
- Data availability events
- Reading/writing progress events
- Error and state change events

See individual module documentation for specific events.

## Best Practices

1. **Initialize in Order**: Core modules → Dependent modules
2. **Start in Reverse**: Start dependent modules before their dependencies
3. **Check Results**: Always validate `ApiResult.Success` before using data
4. **Subscribe to Events**: Attach event handlers before starting services
5. **Clean Up**: Stop services in reverse order of starting
6. **Error Handling**: Wrap handler logic in try-catch blocks
7. **Resource Management**: Dispose/unsubscribe when done

## Common Patterns

### Service Creation Pattern

```csharp
var result = moduleApi.CreateService(/* config */);
if (result.Success && result.Data != null)
{
    var service = result.Data;
    service.Initialise();
    service.Start();
}
```

### Handler Pattern

```csharp
public class MyHandler : IHandler<IReceivedPacketDto>
{
    public void Handle(IReceivedPacketDto packet)
    {
        // Process packet
    }
}
```

### Pipeline Setup Pattern

```csharp
// Create → Connect → Initialize → Start
var reader = CreateReader();
var buffer = CreateBuffer();
var interpolator = CreateInterpolator();

buffer.SetReaderService(reader);
interpolator.SetSampleReaderService(buffer);

reader.Initialise();
buffer.Initialise();
interpolator.Initialise();

interpolator.Start();
buffer.Start();
reader.Start();
```

## Troubleshooting

### Common Issues

**Issue: Service creation fails**
- Check that Support Library is initialized
- Verify configuration parameters
- Check logs for specific error messages

**Issue: No data received**
- Verify session exists and is active
- Check stream names match
- Ensure handlers are added before starting
- Verify subscription parameters match available data

**Issue: High latency**
- Reduce buffering window length
- Increase sliding window percentage
- Reduce subscription frequencies

**Issue: Missing samples**
- Increase buffering window length
- Check coverage cursors for gaps
- Verify parameter subscriptions

## Support

For issues, questions, or contributions, please contact the development team.

## License

Copyright (c) Motion Applied Ltd.

---

**Last Updated**: October 2025  
**Version**: 1.0

## MkDocs Configuration

To use with MkDocs, create a `mkdocs.yml` file:

```yaml
site_name: MA DataPlatforms Streaming Support Library
nav:
  - Home: index.md
  - Modules:
    - Session Manager: session-manager.md
    - Data Format Manager: data-format-manager.md
    - Writer Module: writer-module.md
    - Reader Module: reader-module.md
    - Buffering Module: buffering-module.md
    - Interpolation Module: interpolation-module.md
  - Reference:
    - API Reference: api-reference.md

theme:
  name: material
  features:
    - navigation.tabs
    - navigation.sections
    - toc.integrate
    - search.suggest
    - search.highlight
```

Then run:
```bash
mkdocs serve
```
