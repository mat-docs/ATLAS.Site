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

# Streaming Platform – Release Notes

This release introduces updates across multiple components of the Streaming Platform, with a focus on reliability, scalability, and improved operational control.

---

## Bridge Service v2.1.2.6

### 1. Heartbeat-Based Timeout Detection
The Bridge now uses heartbeat monitoring for more reliable session timeout detection. This prevents premature session termination and ensures stable, continuous data streaming.

### 2. Automatic Message Filtering
Messages originating from stopped sessions are now automatically discarded. This prevents stale data from being processed and ensures that only data from active sessions is streamed.

### 3. Process Flow Configuration
You can now configure how the Bridge handles data flow during high-load scenarios using one of the following strategies:

#### Sequential Processing
- Processes messages in strict first-in, first-out (FIFO) order
- Guarantees message ordering
- Best suited for scenarios where data order is critical

#### Drop Oldest Processing
- Prioritizes the most recent data
- Automatically drops older messages when buffers are full
- Ideal for real-time applications where the latest data is most important

For more information, see:  
https://atlas.motionapplied.com/developer-resources/secu4/bridge_service/configuration-guide/#processflow-strategies

### 4. 64-bit Support for Row Data
Added support for 64-bit row data, enabling handling of larger and more complex datasets.

### 5. Session-Aware PGV Searching
PGV (Parameter Group Value) file searching now correctly terminates when a session ends, improving both performance and resource utilization.

---

## Stream API v2.1.2.52

### New Features

#### 1. Kafka Consumer Group Support
You can now specify a Kafka consumer group when creating a connection. This enables:

- **State Persistence** – Resume reading from the last committed offset after a restart (or from a specified offset if provided)
- **Offset Management** – Kafka automatically tracks consumer progress

#### 2. Configurable Batch Message Sizes
The server now supports configurable batch message sizes, allowing you to:

- **Prevent gRPC Errors** – Avoid "message size exceeded" errors
- **Optimize Throughput** – Configure batch sizes based on your infrastructure
- **Control Timing** – Set a maximum wait time before sending incomplete batches

---

## Stream Protocol v2.1.2.4

- Protobuf definitions updated to support consumer rejoin functionality
- Consumer group identifier is now exposed to enable rejoin behavior

---

## Support Library v2.1.2.17

- Updated to leverage changes introduced in the Stream API

---

## Indexing Service

### File Indexer v2.1.2.5
- General-purpose file indexing and management

### Config Indexer v2.1.2.5
- Specialized indexing and processing for CFG and PGV files

For more information about the Indexing Services, see:  
https://atlas.motionapplied.com/developer-resources/secu4/indexing_services/
## Support

If you have any questions about this release or need assistance with 
migration, please contact the Support via [Zendesk](https://mclarenappliedtechnologies.zendesk.com/hc/en-us).
