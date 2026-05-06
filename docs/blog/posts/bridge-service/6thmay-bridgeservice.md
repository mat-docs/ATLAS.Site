---
date:
  created: 2026-05-06
categories:
  - Releases
tags:
  - Bridge Service
---

# Bridge Service Release: v2.1.3.9

This release is a patch update addressing two specific issues. This release focuses exclusively on resolving  bugs and does not introduce new features.

<!-- more -->

## Downloads

- **Docker:** [Container image](https://hub.docker.com/repository/docker/atlasplatformdocker/bridge-service-host/general)
- **Windows Binary:** [Download](https://portal.mclarenapplied.com/portal/Downloads/ATLAS%20Streaming%20Platform%20-%20Bridge%20Service/Bridge%20Service%202.1.3.9/MA.DataPlatforms.Bridge.Host.zip)

## Bug Fixes

### Fails to start when launched via ADS

Resolved an issue where Bridge Service fails to start when launched via ADS due to invalid port format (":9697") causing a startup exception.

### Missing Error Packets in Subsequent Runs

Timezone mismatch in condition check (UTC vs local time) caused telemetry streaming to stall after initial log in certain races.