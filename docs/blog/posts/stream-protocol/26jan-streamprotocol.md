---
date:
  created: 2026-01-23
categories:
  - Releases
tags:
  - Stream Protocol
---

# Stream Protocol Release: v2.1.1.10

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

We've added the ability to track precise session creation and termination times, giving you better visibility into your session lifecycle.

**What this means for you**

- You can now specify a custom **session creation time** when starting a session  
  *(if not provided, the server time is used automatically)*
- **Session termination time** can be recorded when ending a session  
  *(if not provided, the server time is used automatically)*
- **Historical accuracy**: This is especially useful when importing historical data where the actual session times differ from processing times
- You can retrieve these timestamps through session info queries

**Technical Details**

New Fields Added:

- `creation_time` field in `CreateSessionRequest` and `NewSessionPacket`
- `termination_time` field in `EndSessionRequest` and `EndOfSessionPacket`
- Enhanced `GetSessionInfoResponse` to include both `creation_time` and `termination_time`
- Updated `SessionInfoPacket` to include `creation_time`, `termination_time`, and `utc_offset`

!!! example "Use Case"
    When replaying historical race data recorded on January 1st but processed on January 15th, you can now set the session creation time to January 1st to maintain accurate historical records.

### 2. Stream Lifecycle Notifications

New stream lifecycle messages help you monitor when streams start and stop in real-time.

**What this means for you**

- **Better observability**: Know exactly when your data streams begin and end
- **Improved debugging**: Easily track stream interruptions or unexpected stops
- **Enhanced monitoring**: Build dashboards that display active streams and their durations

**Technical Details**

New Packet Types:

| Packet | Description | Includes |
|--------|-------------|----------|
| `StreamStartedPacket` | Notifies when a stream begins | Data source, session key, stream name, start time |
| `StreamStoppedPacket` | Notifies when a stream ends | Data source, session key, stream name, stop time |

!!! tip "Monitoring Streams"
    Subscribe to these lifecycle events to build real-time dashboards showing active data streams and their health status.

### 3. Batch Configuration Support

Configuration data can now be sent in multiple smaller packets instead of one large packet, solving issues with very large configurations.

**What this means for you**

- **Handle larger configurations**: No more limitations on configuration size
- **Better performance**: Reduced memory pressure when dealing with complex configurations
- **More reliable**: Avoid timeouts and errors when transmitting large configuration datasets

**Technical Details**

New Fields in ConfigurationPacket:

| Field | Type | Description |
|-------|------|-------------|
| `partial_packet` | boolean | Indicates if the packet is part of a larger configuration |
| `packet_number` | int | Sequence number of the current packet |
| `total_packet_number` | int | Total number of packets in the complete configuration |

**Example Flow:**
```
Packet 1/3: partial_packet=true, packet_number=1, total_packet_number=3
Packet 2/3: partial_packet=true, packet_number=2, total_packet_number=3
Packet 3/3: partial_packet=false, packet_number=3, total_packet_number=3
```

### 4. Bug Fix: Synchronous Data Packet Field Naming

Fixed a naming inconsistency in the `SynchroDataPacket` message.

!!! warning "Action Required"
    If you're using the `column` field in `SynchroDataPacket`, you need to update your code to use `columns` (plural).

This change makes the API more consistent and clearer (since it represents multiple columns).

**Technical Details**

- **Changed**: `column` → `columns` in `SynchroDataPacket` message

## Migration Guide

### Breaking Changes

1. **SynchroDataPacket field rename**
   - Update all references from `column` to `columns`
   - This affects serialization/deserialization code

### New Features (Optional)

1. **Session Time Tracking**
   - Optionally set `creation_time` when creating sessions
   - Optionally set `termination_time` when ending sessions

2. **Stream Lifecycle Events**
   - Subscribe to `StreamStartedPacket` and `StreamStoppedPacket` for monitoring

3. **Batch Configuration**
   - Handle `partial_packet` flag for large configurations
   - Process packets sequentially using `packet_number`

## Compatibility

- ✅ Backward compatible (except for `column` → `columns` rename)
- ✅ Works with Stream API v2.1.1.48
- ✅ Compatible with all current client libraries after update

## Support

If you have any questions about this release or need assistance with 
migration, please contact the Support via [Zendesk](https://mclarenappliedtechnologies.zendesk.com/hc/en-us).
