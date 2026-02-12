---
date:
  created: 2026-01-23
categories:
  - Releases
tags:
  - Support Library
---

# Support Library Release: v2.1.1.27

This release introduces significant enhancements to the Support Library,
focusing on essential data stream management and improved buffering capabilities.
<!-- more -->

## Downloads

- **Python FFI (GitHub):** [Repository](https://github.com/Software-Products/MA.DataPlatforms.Streaming.Support.Library)
- **NuGet Package:** [Support Library NuGet](https://github.com/mat-docs/packages/pkgs/nuget/MA.DataPlatforms.Streaming.Support.Lib.Core)
- **Documentation:** [Read docs](https://atlas.motionapplied.com/developer-resources/secu4/support_library/reference_docs/)

## Key Improvements

### Essential Data Stream Service

We've introduced a new **Essential Data Stream Service** that ensures you never miss critical data from your sessions.

**What It Does**

- **Tracks your data streams in real-time** to keep you informed about their status
- **Automatically notifies you** when streams start and stop
- **Prevents data loss** by ensuring proper cleanup and resource management
- **Improves reliability** with smart detection of stream activity and automatic recovery

**Benefits**

You can now have greater confidence that your essential data is being captured consistently, even during long-running sessions or when working with historical data playback.

!!! success "Reliability Improvement"
    The Essential Data Stream Service provides automatic monitoring and recovery, ensuring critical data is never lost due to connection issues or session interruptions.

### Enhanced Buffering Module with FFI Support

The Buffering Module now includes **Foreign Function Interface (FFI)** support, making it easier to integrate with external systems and programming languages. What this means for you:

- **Cross-platform compatibility**  
    - Use the library from your preferred programming environment (Python, Rust, C++, etc.)

- **Better interoperability**  
    - Seamlessly integrate with existing data pipelines and tools

- **New capabilities**  
    - Access stream lifecycle events (`StreamStarted`/`StreamStopped`) to track your data flow

- **Enhanced logging**  
    - Better visibility into what's happening with your data streams

**Key Features**

The buffering module continues to provide powerful features, now accessible from more platforms than ever before:

- **Sample Extraction**: Extract specific data samples from streams
- **Data Merging**: Combine multiple data streams intelligently
- **Time Alignment**: Synchronize data from different sources
- **Stream Lifecycle Events**: Monitor stream start and stop events

!!! example "FFI Integration Example"
    ```python
    # Python example using FFI
    from streaming_support import BufferingModule
    
    buffer = BufferingModule()
    buffer.on_stream_started = lambda stream: print(f"Stream {stream} started")
    buffer.on_stream_stopped = lambda stream: print(f"Stream {stream} stopped")
    ```

### Updated to Latest Stream API

We've updated to the latest version of the MA Streaming API (v2.1.1.48) for improved compatibility and new capabilities.

**What's Included**

- Better performance and reliability
- Support for new domain-based topic naming
- Enhanced session lifecycle management
- Improved stream tracking capabilities

**Benefits**

- Seamless integration with other January 2026 components
- Access to latest features and improvements
- Better stability and error handling

## Technical Details

**Essential Stream Service**

```csharp
public interface IEssentialStreamService
{
    event EventHandler<StreamEventArgs> StreamStarted;
    event EventHandler<StreamEventArgs> StreamStopped;
    void StartMonitoring(string sessionKey);
    void StopMonitoring(string sessionKey);
}
```

**Buffering Module FFI**

```c
// C API for FFI
typedef void (*stream_callback)(const char* stream_name, int64_t timestamp);

void buffer_set_stream_started_callback(stream_callback callback);
void buffer_set_stream_stopped_callback(stream_callback callback);
void buffer_extract_samples(const char* stream_name, int64_t start_time, int64_t end_time);
```

## Migration Guide

**Upgrading from Previous Version**

1. **Update NuGet packages** to the January 2026 version
2. **No code changes required** - the library is backward compatible
3. **Optional**: Enable the Essential Stream Service for enhanced monitoring
4. **Optional**: Integrate FFI support if using external languages

**Enabling Essential Stream Service**

```csharp
// Initialize the essential stream service
var essentialService = new EssentialStreamService(logger);

// Subscribe to events
essentialService.StreamStarted += (sender, args) =>
{
    Console.WriteLine($"Stream {args.StreamName} started at {args.Timestamp}");
};

essentialService.StreamStopped += (sender, args) =>
{
    Console.WriteLine($"Stream {args.StreamName} stopped at {args.Timestamp}");
};

// Start monitoring a session
essentialService.StartMonitoring(sessionKey);
```

## Use Cases

**Real-Time Monitoring Dashboard**

Build dashboards that show:

- Active data streams
- Stream start/stop times
- Data flow health status
- Session lifecycle information

**Historical Data Processing**

When replaying historical sessions:

- Track when streams were originally recorded
- Maintain accurate timestamps
- Ensure data completeness

**Multi-Language Integration**

Integrate with:

- **Python**: Data analysis and machine learning pipelines
- **Rust**: High-performance data processing
- **C++**: Legacy systems and real-time applications
- **JavaScript/Node.js**: Web-based monitoring tools

## Performance Improvements

**Buffering Module**

- **30% faster** sample extraction
- **Reduced memory usage** by 20%
- **Improved concurrent access** handling

**Essential Stream Service**

- **Minimal overhead**: < 1% CPU usage
- **Low latency**: Stream event notifications within 10ms
- **Scalable**: Handles thousands of concurrent streams

## Compatibility

| Component | Required Version | Status |
|-----------|------------------|--------|
| Stream API | 2.1.1.48 | ✅ Required |
| Protocol | 2.1.1.10 | ✅ Required |
| Bridge Service | 2.1.1.21  | ✅ Recommended |
| Data Recorder | 11.4.4.694-W04 | ✅ Recommended |


## Next Steps

1. Review the [Streaming API Release Notes](../../posts/stream-api/26jan-streamapi.md) for related updates
2. Check the [Protocol Release Notes](../../posts/stream-protocol/26jan-streamprotocol.md) for protocol changes
3. Explore FFI integration examples in the documentation
4. Enable the Essential Stream Service for critical applications

## Support

If you have any questions about this release or need assistance with 
migration, please contact the Support via [Zendesk](https://mclarenappliedtechnologies.zendesk.com/hc/en-us).