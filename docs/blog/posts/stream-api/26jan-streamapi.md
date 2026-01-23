---
date:
  created: 2026-01-23
categories:
  - Releases
tags:
  - Stream API
---

# Stream API Release: vX

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

### 1. DOMAIN-BASED KAFKA TOPIC NAMING

You can now organize your Kafka topics with a configurable domain prefix. 

This helps you:
  - Keep your topics organized by environment, team, or application
  - Easily identify which system generated the data
  - Support multi-tenant architectures

What's New:

  - Configure a custom domain name through the 'Domain' configuration property
  - Topics are automatically prefixed with your domain 
    (e.g., MyDomain.Data.SensorData)
  - Leave it empty if you prefer to keep your existing topic naming structure
  - Works seamlessly with both topic-based and partition-based streaming 
    strategies

Example:
  With Domain = "Production":     Production.Data.SensorData
  With Domain = "" (empty):       Data.SensorData


### 2. CONSISTENT TOPIC NAMING CONVENTIONS

All Kafka topics now follow a clear and consistent naming structure, making 
it easier to identify the purpose of each topic at a glance.

What's New:

  - System Topics now have a 'Sys' prefix:
      * Session information: Sys.SessionInfo
      * Status updates: Sys.Status
      * Dead letter queue: Sys.DeadLetter
  - Data Topics have a 'Data' prefix:
      * Main data streams: Data.YourDataSource
  - Essential Topics use the 'Essential' prefix:
      * Essential data streams: Essential.YourDataSource
  - All reserved topic names are now in camelCase format for consistency

Benefits:

  - Quickly identify topic types by their prefix
  - Better organization in Kafka topic browsers
  - Consistent naming across all environments
  - Easier to set up monitoring and alerting rules


### 3. NEW ESSENTIAL SERVICE WITH SESSION LIFECYCLE MANAGEMENT

Introducing a new essential service that actively manages data delivery 
throughout the session.

What's New:

  - Essential service now stays active for the entire duration of the session
  - Automatically pushes data and updates to connected clients in real-time
  - Service lifecycle is tied to the session lifecycle
  - Remains active until explicitly closed by the client

Benefits:

  - More reliable essential data delivery
  - Real-time updates without polling
  - Better synchronization between session state and data streams
  - Reduced latency for critical data


### 4. ENHANCED STREAM LIFECYCLE TRACKING

The API now provides complete visibility into when streams start and stop, making it easier to:

  - Monitor active streams in real-time
  - Track stream activity across sessions
  - Debug streaming issues with better event tracking

What's New:

  - Automatic stream start notifications sent to all active streams when a 
    session begins
  - Automatic stream stop notifications sent when a session is closed
  - Better tracking of stream states throughout their lifecycle
  - Session creation and termination timestamps are now included in session 
    information packets


### 5. SIMPLIFIED LOGGING INTEGRATION

Logging has been completely refactored to give you full control over where 
and how logs are written.

What's New:

  - Inject your own logger implementation from your host application
  - All Streaming API logs now use your provided logger
  - Keep streaming logs alongside your application logs in the same file
  - No need to manage separate log configurations
  - Full flexibility to use any logging framework (Serilog, NLog, etc.)

Benefits:

  - Unified logging across your application
  - Easier troubleshooting with all logs in one place
  - Less configuration overhead

!!! note
    If no logger is provided, the API will use a console logger with Warning level by default.


### 6. SESSION TIMING INFORMATION

Session packets now include precise timing information:

  - Session Creation Time: When the session was established
  - Session Termination Time: When the session was closed

This makes it easier to:

  - Calculate session duration
  - Track session activity patterns
  - Generate accurate usage reports

## Migration Guide

### 1. Domain Configuration (Optional)

   If you want to use domain prefixing, add the 'Domain' property to your 
   configuration:

   Example:
     // Add domain prefix
     Domain = "MyApplication"

    // Or leave empty for backward compatibility with existing configurations

!!! important "BREAKING CHANGE"
   While the configuration file format is backward compatible (existing configs 
   will work without modification), the Kafka topic naming changes are BREAKING.
   
   All components that interact with Kafka topics must be updated:
   - Consumer applications reading from these topics
   - Monitoring and alerting systems referencing topic names
   - Infrastructure as Code (IaC) scripts managing topics
   - Documentation and operational runbooks
   
   This is a coordinated release - all systems must be updated together to 
   maintain compatibility.


### 2 . Topic Name Updates (REQUIRED)
   Update all references to Kafka topics in your systems:

   Old Topic Names          →  New Topic Names
   ----------------             ----------------
   SessionInfo              →  Sys.SessionInfo
   Status                   →  Sys.Status
   deadLetter               →  Sys.DeadLetter
   [YourDataSource]         →  Data.[YourDataSource]
   [YourDataSource].essentials    →  Essential.[YourDataSource]

   If using Domain configuration (e.g., Domain = "Production"):
   SessionInfo              →  Production.Sys.SessionInfo
   [YourDataSource]         →  Production.Data.[YourDataSource]

   ACTION REQUIRED:
   - Update all consumer applications to use new topic names
   - Update Kafka topic configurations
   - Coordinate deployment across all dependent systems


### 3. Logger Integration (Recommended)
   Update your initialization code to inject your logger:

   Before: Streaming API managed its own logging

   After: Inject your application's logger
     var streamingServer = StreamingServerFactory.Create(
         configuration,
         yourLogger  // Your ILogger instance
     );

   This ensures all streaming logs appear in your application's log files.


### 4. Session Time Tracking

   Session info packets now include timing information. If you're processing 
   these packets, you can now access:
     - SessionCreationTime
     - SessionTerminationTime

   No code changes required, but these fields are now available for use.

!!! note
  - Existing configurations will continue to work without modification
  - Domain configuration defaults to empty string (no prefix)
  - Stream lifecycle notifications are automatic and require no code changes

## Support

If you have any questions about this release or need assistance with 
migration, please contact the Support via [Zendesk](https://mclarenappliedtechnologies.zendesk.com/hc/en-us).