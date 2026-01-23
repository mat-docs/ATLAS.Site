---
date:
  created: 2026-01-23
categories:
  - Releases
tags:
  - Stream API
---

# Stream API Release: v2.1.1.48

This release introduces several major improvements focused on better 
configurability, enhanced stream lifecycle tracking, and simplified logging 
integration. The changes make the Streaming API more flexible and easier to 
integrate into your applications.
<!-- more -->

## Downloads

- **GitHub:** [Repository](https://github.com/Software-Products/MA.DataPlatforms.StreamApi)
- **NuGet Package:** [Stream API NuGet](https://github.com/orgs/mat-docs/packages?q=&tab=packages&q=MA.Streaming.)
- **Documentation:** [Read docs](../../../developer-resources/secu4/stream_api/index.md)

## Key Improvements

### 1. Domain-Based Kafka Topic Naming

You can now organize your Kafka topics with a configurable domain prefix.

**What's New**

- Configure a custom domain name through the `Domain` configuration property
- Topics are automatically prefixed with your domain (e.g., `MyDomain.Data.SensorData`)
- Leave it empty if you prefer to keep your existing topic naming structure
- Works seamlessly with both topic-based and partition-based streaming strategies

**Benefits**

- Keep your topics organized by environment, team, or application
- Easily identify which system generated the data
- Support multi-tenant architectures

**Examples**

| Domain Setting | Resulting Topic |
|----------------|-----------------|
| `Domain = "Production"` | `Production.Data.SensorData` |
| `Domain = ""` (empty) | `Data.SensorData` |

!!! tip "Multi-Environment Setup"
    Use different domains for each environment:
    
    - Production: `Production.Data.SensorData`
    - Staging: `Staging.Data.SensorData`
    - Development: `Dev.Data.SensorData`

### 2. Consistent Topic Naming Conventions

All Kafka topics now follow a clear and consistent naming structure, making it easier to identify the purpose of each topic at a glance.

**Topic Prefixes**

| Prefix | Purpose | Examples |
|--------|---------|----------|
| `Sys` | System Topics | `Sys.SessionInfo`, `Sys.Status`, `Sys.DeadLetter` |
| `Data` | Data Topics | `Data.YourDataSource` |
| `Essential` | Essential Topics | `Essential.YourDataSource` |

**Naming Format**

All reserved topic names are now in **camelCase** format for consistency.

**Benefits**

- Quickly identify topic types by their prefix  
- Better organization in Kafka topic browsers  
- Consistent naming across all environments  
- Easier to set up monitoring and alerting rules  

### 3. New Essential Service with Session Lifecycle Management

Introducing a new essential service that actively manages data delivery throughout the session.

**What's New**

- Essential service now stays active for the **entire duration** of the session
- Automatically pushes data and updates to connected clients in real-time
- Service lifecycle is tied to the session lifecycle
- Remains active until explicitly closed by the client

**Benefits**

- More reliable essential data delivery
- Real-time updates without polling
- Better synchronization between session state and data streams
- Reduced latency for critical data

!!! example "Use Case"
    Critical race telemetry data is now guaranteed to be delivered throughout the entire session, with automatic notifications when the stream starts and stops.

### 4. Enhanced Stream Lifecycle Tracking

The API now provides complete visibility into when streams start and stop, making it easier to monitor and debug streaming operations.

**What's New**

- Automatic **stream start notifications** sent to all active streams when a session begins
- Automatic **stream stop notifications** sent when a session is closed
- Better tracking of stream states throughout their lifecycle
- Session creation and termination timestamps are now included in session information packets

**Benefits**

- Monitor active streams in real-time
- Track stream activity across sessions
- Debug streaming issues with better event tracking
- Build comprehensive monitoring dashboards

!!! info "Stream Events"
    Subscribe to `StreamStartedPacket` and `StreamStoppedPacket` events to track all stream activity in your system.

### 5. Simplified Logging Integration

Logging has been completely refactored to give you full control over where and how logs are written.

**What's New**

- **Removed hard-coded logging dependencies**
- You now provide your own Serilog `ILogger` instance
- Full flexibility in configuring log destinations, formats, and levels
- Better integration with existing logging infrastructure

**Migration Example**

**Before:**
```csharp
// Logging was configured internally
var streamingApi = new StreamingApi(config);
```

**After:**
```csharp
// You provide the logger
var logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/streaming-api.log")
    .CreateLogger();

var streamingApi = new StreamingApi(config, logger);
```

**Benefits**

- Choose your own log destinations (console, file, database, cloud)
- Configure log levels per component
- Integrate with existing logging infrastructure
- Better control over log formatting and output

!!! tip "Logging Best Practices"
    Configure different log levels for development and production:
    
    - **Development**: `Debug` level with console output
    - **Production**: `Information` level with file and centralized logging

## Breaking Changes

**Logging Constructor Change**

!!! warning "Action Required"
    The Streaming API constructor now requires an `ILogger` parameter:
    
    ```csharp
    // Old (no longer supported)
    var api = new StreamingApi(config);
    
    // New (required)
    var logger = Log.Logger; // or your configured logger
    var api = new StreamingApi(config, logger);
    ```

## Configuration Updates

**New Configuration Properties**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `Domain` | string | "" | Domain prefix for all Kafka topics |

**Updated Properties**

No existing properties have changed, only new ones added.

## Migration Guide

### Step 1: Update Logging Configuration

1. Install Serilog if not already installed:
   ```bash
   dotnet add package Serilog
   dotnet add package Serilog.Sinks.Console
   dotnet add package Serilog.Sinks.File
   ```

2. Configure your logger:
   ```csharp
   Log.Logger = new LoggerConfiguration()
       .MinimumLevel.Information()
       .WriteTo.Console()
       .WriteTo.File("logs/streaming-api-.log", rollingInterval: RollingInterval.Day)
       .CreateLogger();
   ```

3. Pass logger to Streaming API:
   ```csharp
   var api = new StreamingApi(config, Log.Logger);
   ```

### Step 2: Add Domain Configuration (Optional)

Add a domain to your configuration:
```json
{
  "StreamApiConfig": {
    "Domain": "Production",
    ...
  }
}
```

### Step 3: Subscribe to Lifecycle Events (Optional)

Listen for stream start/stop events:
```csharp
api.OnStreamStarted += (source, streamName, time) => 
{
    Console.WriteLine($"Stream {streamName} started at {time}");
};

api.OnStreamStopped += (source, streamName, time) => 
{
    Console.WriteLine($"Stream {streamName} stopped at {time}");
};
```

## Compatibility

| Component | Version | Compatibility |
|-----------|---------|---------------|
| Protocol | 2.1.1.10 | ✅ Required |
| Bridge Service | 2.1.1.21 | ✅ Recommended |
| Data Recorder | 11.4.4.691-W04 | ✅ Recommended |
| Support Library | 2.1.1.27 | ✅ Recommended |

## Upgrading

**Requirements**

- Update Protocol to v2.1.1.10 or later
- Update Serilog packages to latest versions
- .NET 6.0 or later recommended

**Steps**:

1. Update NuGet packages
2. Update logging configuration in your code
3. Add domain configuration to config files (optional)
4. Test stream lifecycle events
5. Deploy to production

## Support

If you have any questions about this release or need assistance with 
migration, please contact the Support via [Zendesk](https://mclarenappliedtechnologies.zendesk.com/hc/en-us).