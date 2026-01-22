---
date:
  created: 2026-01-23
categories:
  - Releases
tags:
  - Bridge Service
---

# Bridge Service Release: vX

This release brings several improvements to make the Bridge service more 
flexible and reliable, with better support for the latest Stream API and 
enhanced data streaming capabilities.
<!-- more -->

## Key Improvements


### 1. Updated Stream API Support

The Bridge now works with the latest version of the Stream API (v2.1.1.x), 
providing better performance and reliability when streaming telemetry data.


### 2. Flexible Stream Mapping with Wildcards

You can now use wildcards (*) when configuring how data streams are mapped, 
making it much easier to set up and manage your data routing.

Example:

Instead of configuring each stream individually:

    EngineData → engine-stream
    EngineTemperature → engine-stream
    EnginePressure → engine-stream

You can now use a simple pattern:

    Engine* → engine-stream

This automatically matches all streams starting with "Engine" and routes them 
to the correct destination.

Popular patterns you can use:
- Engine* - Matches all engine-related streams
- *Telemetry - Matches any telemetry streams
- Chassis_*_Data - Matches specific chassis data patterns


### 3. Better Stream Tracking

The system now automatically tracks when streams start and stop, providing 
clearer visibility into your data flow.

Benefits:
- Know exactly when data streaming begins and ends
- Better session management and monitoring
- More accurate time range information for each session


### 4. Session Time Information

Each data session now includes timing information showing the earliest and 
latest data points recorded. This information is created at the end of the 
session when it closes. This helps you:
- Understand the full time span of your data
- Better organize and analyze your sessions


## Configuration Updates

Some configuration settings have been simplified and enhanced:

New settings:
- Domain - You can now specify the domain for streaming connections

Logging improvements:
- Now uses Serilog for Stream API configurations
- Better formatted console output to help you monitor what's happening
- Leverages Serilog's advanced logging capabilities for more detailed 
  diagnostics


## What You Need to Know


**If You're Using the Default Configuration**

No action needed - everything will continue to work as before with these 
improvements automatically applied.

**If You're Using Custom Stream Mappings**

You can optionally update your mappings to use wildcards for simpler 
configuration. Your existing exact-match mappings will continue to work 
perfectly.

**Configuration File Updates**

Some configuration options have been streamlined. If you have custom settings 
for StreamApiPort or AdsTimeoutInSeconds, these are no longer needed and can 
be removed.

## Support

If you have any questions about this release or need assistance with 
migration, please contact the Support via [Zendesk](https://mclarenappliedtechnologies.zendesk.com/hc/en-us).

