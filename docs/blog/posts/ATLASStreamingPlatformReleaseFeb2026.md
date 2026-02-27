---
date:
  created: 2026-01-23
categories:
  - Releases
tags:
  - Bridge Service
  - Stream API
  - Stream Protocol
  - Support Library
---

# Bridge Service Release: v2.1.1.21

This release includes improvements to session management, data handling reliability, and expanded data type support.

<!-- more -->

## Downloads

- **Docker:** [Container image](https://hub.docker.com/repository/docker/atlasplatformdocker/bridge-service-host/general)
- **Windows Binary:** [Download](https://portal.mclarenapplied.com/portal/Downloads/ATLAS%20Streaming%20Platform%20-%20Bridge%20Service/Bridge%20Service%202.1.1.21/MA.DataPlatforms.Bridge.Host.zip)
- **Documentation:** [Read docs](https://atlas.motionapplied.com/developer-resources/secu4/bridge_service/)

## Key Enhancements

### 1. Improved Session Timeout Management

**Heartbeat-Based Timeout Detection**

The Bridge now uses heartbeat monitoring for more reliable session timeout detection, preventing premature timeouts and ensuring stable data streaming.

**Benefits:**
- More accurate detection of connection issues
- Reduced false-positive timeouts
- Better handling of network fluctuations

**Automatic Message Filtering**

Messages from stopped sessions are now automatically discarded, preventing stale data from being processed and ensuring only active session data is streamed.

**Why this matters:**
- Cleaner data streams with no residual messages
- Improved data quality and reliability
- Better resource utilization

### 2. Session Data Prioritization

**Process Flow Configuration**

You can now configure how the Bridge handles data flow during high-load scenarios with two strategies:

**Sequential Processing:**
- Processes data in strict order (first-in, first-out)
- Guarantees message ordering
- Best for scenarios where order is critical

**Drop Oldest Processing:**
- Prioritizes the most recent data
- Automatically drops older messages when buffers are full
- Ideal for real-time applications where latest data is most important

**Configuration:**
```json
{
  "ProcessFlow": "DropOldest"  // or "SequentialAll"
}
```

**Benefits:**
- Better control over data flow during peak loads
- Optimize for your specific use case (ordering vs. real-time)
- Improved system responsiveness under pressure

### 3. Double Precision Support for Row Data

**Enhanced Data Type Support**

Row data now fully supports double-precision floating-point numbers

### 4. PGV Search Optimization

**Session-Aware PGV Searching**

PGV (Parameter Group Value) file searching now properly terminates when a session ends, improving performance and resource usage.

**Improvements:**
- Faster session cleanup
- Reduced system resource consumption
- More efficient handling of session transitions
- Better support for back-to-back sessions


## Support

If you have any questions about this release or need assistance with 
migration, please contact the Support via [Zendesk](https://mclarenappliedtechnologies.zendesk.com/hc/en-us).
