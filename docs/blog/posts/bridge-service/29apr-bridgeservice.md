---
date:
  created: 2026-04-29
categories:
  - Releases
tags:
  - Bridge Service
---
# Bridge Service Release: v2.1.3.3

This release brings independent tuning for live and offload data processing, and a fix for lost error packets.

<!-- more -->

## Downloads

- **Docker:** [Container image](https://hub.docker.com/repository/docker/atlasplatformdocker/bridge-service-host/general)
- **Windows Binary:** [Download](https://portal.mclarenapplied.com/portal/Downloads/ATLAS%20Streaming%20Platform%20-%20Bridge%20Service/Bridge%20Service%202.1.3.3/MA.DataPlatforms.Bridge.Host.zip)

## New Features

### Separate Performance Tuning for Live and Offload Processing

Previously, the Bridge used a single concurrency setting (`ConcurrencyFactor`) for all data processing. This meant live and offload workloads shared the same resource allocation, making it difficult to optimise for different data processing needs.

Now, you can independently control how much processing power is dedicated to **live data** versus **offload (historical) data** using two separate settings:

- **`LiveConcurrencyFactor`** — Controls how many live data items are processed in parallel.
- **`OffloadConcurrencyFactor`** — Controls how many offload data items are processed in parallel.

This allows you to prioritise live data throughput while still efficiently processing historical data in the background.

### Offload Processing Control

Two new options give you full control over how the Bridge handles offload (missing/historical) data:

- **`OffloadProcessing`** — When enabled (`true`), the Bridge will process any missing or historical data that needs to be recovered. When disabled (`false`), offload data is discarded, which can be useful if you only care about live data and want to reduce resource usage.

- **`OffloadStream`** — When set, offload data is published to a separate stream from live data. This keeps historical data recovery traffic isolated from your real-time data feed, preventing offload processing from impacting live data consumers.

!!! note
    Regardless of whether offload processing is enabled or not, when an offload begins the Bridge publishes an "Offload Started" marker notification. This lets downstream consumers know that an offload has started and when it began.

### Offload Lifecycle Aligned with ADS

The Bridge now mirrors the offload behaviour you see in ADS. When ADS reports offload progress, the same progress is visible through the Bridge. Session start and close times are governed by ADS session creation and termination — so even when offload processing is disabled, the session remains active in the Bridge until ADS closes it.

### Cleaner Logging Output

Informational messages that were previously logged at a high visibility level have been moved to Debug level. This means your logs will now be cleaner and easier to read during normal operation, showing only meaningful events. If you need the detailed output for troubleshooting, you can change the log level to `Debug` in the configuration.

## Bug Fixes

### Missing Error Packets in Subsequent Runs

Fixed an issue where error packets were not correctly carried over between consecutive processing runs. Previously, error packets could be lost on follow-up runs, leading to incomplete data. This has been resolved — error packets are now reliably preserved and reported across all runs.

## Configuration Changes

The `BridgeConfig` section has been updated. Below is the new format:

```json
"BridgeConfig": {
    "DataSource": "Default",
    "UseStringIdentifier": true,
    "ProcessFlow": "DropOldest",
    "LiveConcurrencyFactor": 4,
    "OffloadConcurrencyFactor": 12,
    "OffloadProcessing": true,
    "OffloadStream": "Offload"
}
```

### Migration Guide

| Previous Setting | New Setting | Default | Notes |
|---|---|---|---|
| `ConcurrencyFactor` | `LiveConcurrencyFactor` | `4` | Controls live data parallelism |
| *(not available)* | `OffloadConcurrencyFactor` | `12` | Controls offload data parallelism |
| *(not available)* | `OffloadProcessing` | `true` | Set to `true` to process missing data, `false` to discard |
| *(not available)* | `OffloadStream` | `""` (empty) | Name of the stream for offload data (e.g. `"Offload"`) |

If you were using the previous `ConcurrencyFactor`, replace it with `LiveConcurrencyFactor` set to your previous value, and add `OffloadConcurrencyFactor` with a value appropriate for your offload workload (a higher value is typical since offload is less latency-sensitive).