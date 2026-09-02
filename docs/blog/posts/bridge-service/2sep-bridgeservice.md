---
date:
  created: 2026-09-02
categories:
  - Releases
tags:
  - Bridge Service
---

# Bridge Service Release: v2.1.5.3

This release makes the Feed and Metric ports configurable through the Bridge configuration, adds a disk-backed overflow buffer for messages pending validation retry, and fixes several bugs affecting parameter error handling, Virtual Parameter Service calculation, and session timestamps.

<!-- more -->

## Downloads

- **Docker:** [Container image](https://hub.docker.com/repository/docker/atlasplatformdocker/bridge-service-host/general)
- **Windows Binary:** [Download](https://portal.motionapplied.com/portal/Downloads/ATLAS%20Streaming%20Platform%20-%20Bridge%20Service/Bridge%20Service%202.1.5.3/MA.DataPlatforms.Bridge.Host.zip)

## New Features

### Configurable Feed and Metric Ports

The Feed Port and Metric Port can now be set directly in the Bridge configuration, instead of relying solely on environment variables. Ports resolve in a fixed order: an environment variable (or the `-p` command-line argument for the feed port) takes precedence, then the Bridge configuration, then a built-in default — so an existing environment variable continues to override the configuration file rather than the other way around.

Both properties are optional, so most existing `AppConfig.json` files are unaffected. One thing to check before upgrading: previously, a `FeedPort`/`MetricPort` value in `AppConfig.json` had no effect at all — the port was always the environment variable/CLI value if set, otherwise a hard-coded default, and the configuration value was never actually read. If your configuration already has a `FeedPort` or `MetricPort` set (for example, copied from an example file) and you're not overriding it with an environment variable, it will now take effect and could change the port the Bridge binds to.

### Disk-Backed Overflow Buffer

Each session's buffer of messages pending validation retry can now spill to disk once it exceeds a configurable size, instead of growing memory unbounded. This is configured via the new `DiskBackedBufferConfig` section, with a `MaxQueueLength` (default 1000) and a `TempFolderPath` for the overflow files.

## Bug Fixes

### Bridge Service Not Purging Messages for Sessions with vTAG

Fixed a race condition in session start and stop handling, combined with unbounded growth of the pending-retry message buffer, that could cause the Bridge to run out of thread pool capacity and drop telemetry for long-running vTAG sessions. See also the new Disk-Backed Overflow Buffer above.

### Parameter Error Handling

Fixed an issue where the error mask on incoming parameter data was not applied correctly when converting row data, causing parameter error states to be reported incorrectly.

### Incorrect Timestamp After a Few Days (#57465)

Fixed an issue where the Bridge Service would keep using the timezone that was active when it started, rather than the machine's current timezone, causing session timestamps to become incorrect after the timezone changed.

## Support

If you have any questions about this release or need assistance with
migration, please contact the Support via [Portal](https://portal.motionapplied.com/Tickets/New).
