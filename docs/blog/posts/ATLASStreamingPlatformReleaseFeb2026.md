---
date:
  created: 2026-02-27
categories:
  - Releases
tags:
  - Bridge Service
  - Stream API
  - Stream Protocol
  - Support Library
---

# ATLAS Streaming Platform – Release Notes

This release introduces updates across multiple components of the ATLAS Streaming Platform, with a focus on reliability, scalability, and improved operational control.

<!-- more -->

## Bridge Service v2.1.2.6

**Artifacts**
[Docker](https://hub.docker.com/repository/docker/atlasplatformdocker/bridge-service-host/general) .
[Windows Binary](https://portal.motionapplied.com/portal/Downloads/ATLAS%20Streaming%20Platform%20-%20Bridge%20Service/Bridge%20Service%202.1.2.6/MA.DataPlatforms.Bridge.Host.zip) .
[Documentation](https://atlas.motionapplied.com/developer-resources/secu4/bridge_service/)

**Changes**
### Heartbeat-Based Timeout Detection
The Bridge now uses heartbeat monitoring for more reliable session timeout detection. This prevents premature session termination and ensures stable, continuous data streaming.

### Automatic Message Filtering
Messages originating from stopped sessions are now automatically discarded. This prevents stale data from being processed and ensures that only data from active sessions is streamed.

### Process Flow Configuration
You can now configure how the Bridge handles data flow during high-load scenarios using one of the following strategies:

#### Sequential Processing
- Processes messages in strict first-in, first-out (FIFO) order
- Guarantees message ordering
- Best suited for scenarios where data order is critical

#### Drop Oldest Processing
- Prioritizes the most recent data
- Automatically drops older messages when buffers are full
- Ideal for real-time applications where the latest data is most important

### 64-bit Support for Row Data
Added support for 64-bit row data, enabling handling of larger and more complex datasets.

### Session-Aware PGV Searching
PGV (Parameter Group Value) file searching now correctly terminates when a session ends, improving both performance and resource utilization.

---

## Stream API v2.1.2.52

**Artifacts:**
[GitHub](https://github.com/Software-Products/MA.DataPlatforms.StreamApi) .
[NuGet](https://github.com/orgs/mat-docs/packages?q=&tab=packages&q=MA.Streaming.) .
[Documentation](../../../developer-resources/secu4/stream_api/index.md)

**Changes**
### Kafka Consumer Group Support
You can now specify a Kafka consumer group when creating a connection. This enables:

- **State Persistence** – Resume reading from the last committed offset after a restart (or from a specified offset if provided)
- **Offset Management** – Kafka automatically tracks consumer progress

### Configurable Batch Message Sizes
The server now supports configurable batch message sizes, allowing you to:

- **Prevent gRPC Errors** – Avoid "message size exceeded" errors
- **Optimize Throughput** – Configure batch sizes based on your infrastructure
- **Control Timing** – Set a maximum wait time before sending incomplete batches

---

## Stream Protocol v2.1.2.4

**Artifacts:**
[GitHub](https://github.com/Software-Products/MA.DataPlatforms.Protocol) .
[NuGet](https://github.com/mat-docs/packages/pkgs/nuget/MA.Streaming.Proto.Client.Local) .
[Documentation](../../../developer-resources/secu4/docs)

**Changes**
- Protos updated to add support of rejoin by exposing consumer group identifier

---

## Support Library v2.1.2.17

**Artifacts:**
[GitHub](https://github.com/Software-Products/MA.DataPlatforms.Streaming.Support.Library) ·
[NuGet](https://github.com/mat-docs/packages/pkgs/nuget/MA.DataPlatforms.Streaming.Support.Lib.Core) ·
[Documentation](https://atlas.motionapplied.com/developer-resources/secu4/support_library/reference_docs/)

**Changes**
- Updated to leverage changes introduced in the Stream API

---

## Indexing Service

### File Indexer v2.1.2.5

**Artifacts:**
[Docker](https://hub.docker.com/r/atlasplatformdocker/file-indexing-service) .
[Documentation](https://atlas.motionapplied.com/developer-resources/secu4/indexing_services/#files-service-features)

**Changes**
- General-purpose file indexing and management

### Config Indexer v2.1.2.5

**Artifacts:**
[Docker](https://hub.docker.com/r/atlasplatformdocker/config-indexing-service) .
[Documentation](https://atlas.motionapplied.com/developer-resources/secu4/indexing_services/#configs-service-features)

**Changes**
- Specialized indexing and processing for CFG and PGV files

---
## Support

If you have any questions about this release or need assistance with 
migration, please contact the Support via [Zendesk](https://mclarenappliedtechnologies.zendesk.com/hc/en-us).
