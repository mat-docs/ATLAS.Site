---
date:
  created: 2026-01-23
categories:
  - Releases
tags:
  - Stream Protocol
---

# Stream Protocol Release: vX

This release includes important enhancements to the MA Data Platforms Protocol, 
focusing on improved session management, better streaming lifecycle tracking, 
and support for large configuration datasets.
<!-- more -->

## Downloads

- **Protos (GitHub):** [Repository](https://github.com/Software-Products/MA.DataPlatforms.Protocol)
- **NuGet Package:** [Stream Protocol NuGet](https://github.com/mat-docs/packages/pkgs/nuget/MA.Streaming.Proto.Client.Local)
- **Documentation:** [Read docs](../../../developer-resources/secu4/stream_api/reference_docs/stream_protocol/)

## Key Improvements

### 1. Session Creation and Termination Time Tracking

We've added the ability to track precise session creation and termination 
times, giving you better visibility into your session lifecycle.

What this means for you:

- You can now specify a custom session creation time when starting a session 
  (if not provided, the server time is used automatically)
- Session termination time can be recorded when ending a session 
  (if not provided, the server time is used automatically)
- Historical accuracy: This is especially useful when importing historical 
  data where the actual session times differ from processing times
- You can retrieve these timestamps through session info queries

Technical Details:

- Added creation_time field to CreateSessionRequest and NewSessionPacket
- Added termination_time field to EndSessionRequest and EndOfSessionPacket
- Enhanced GetSessionInfoResponse to include both creation_time and 
  termination_time
- Updated SessionInfoPacket to include creation_time, termination_time, 
  and utc_offset

### 2. Stream Lifecycle Notifications

New stream lifecycle messages help you monitor when streams start and stop 
in real-time.

What this means for you:

- Better observability: Know exactly when your data streams begin and end
- Improved debugging: Easily track stream interruptions or unexpected stops
- Enhanced monitoring: Build dashboards that display active streams and 
  their durations

Technical Details:

- New StreamStartedPacket message: Notifies when a stream begins, including 
  data source, session key, stream name, and start time
- New StreamStoppedPacket message: Notifies when a stream ends, including 
  data source, session key, stream name, and stop time

### 3. Batch Configuration Support

Configuration data can now be sent in multiple smaller packets instead of 
one large packet, solving issues with very large configurations.

What this means for you:

- Handle larger configurations: No more limitations on configuration size
- Better performance: Reduced memory pressure when dealing with complex 
  configurations
- More reliable: Avoid timeouts and errors when transmitting large 
  configuration datasets

Technical Details:

- Added partial_packet flag to ConfigurationPacket to indicate if the packet 
  is part of a larger configuration
- Added packet_number field to track the sequence number of the current packet
- Added total_packet_number field to indicate how many total packets make up 
  the complete configuration

### 4. Synchronous Data Packet Field Naming

Renamed field column to columns in SynchroDataPacket message

!!! danger "What this means for you"
    - ACTION REQUIRED: If you're using the column field in SynchroDataPacket, 
    you need to update your code to use columns (plural)
    - This change makes the API more consistent and clearer (since it represents 
    multiple columns)

## Migration Guide

### For users of SynchroDataPacket

If your code accesses the data columns in SynchroDataPacket, update the 
field name:

Before:
  message.column[0]

After:
  message.columns[0]

### For users creating sessions

The new creation_time field is optional. If you don't provide it, the server 
will use its current time automatically, so no changes are required unless 
you need custom timestamps.

### For users ending sessions

The new termination_time field is optional. If you don't provide it, the 
server will use its current time automatically.

### For users processing configurations

If you receive configuration packets, check the partial_packet flag. If it's 
true, you'll need to collect and combine all packets (using packet_number and 
total_packet_number) before processing the complete configuration.


!!! tip "Kafka Message Size Limit"
    By default, Kafka has a message size limit of 1MB. If you're working 
    with large configuration datasets or data packets that might exceed this 
    limit, you should:
        - Use the batch configuration support (partial packets) to split large 
        configurations into smaller chunks
        - Configure your Kafka broker's message.max.bytes setting to allow larger 
        messages if needed
        - Be aware that increasing message size limits may impact broker performance 
        and memory usage

## Support

If you have any questions about this release or need assistance with 
migration, please contact the Support via [Zendesk](https://mclarenappliedtechnologies.zendesk.com/hc/en-us).
