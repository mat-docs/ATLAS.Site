---
date:
  created: 2026-09-03
categories:
  - Releases
tags:
  - Broadcast Service
---

# Bridge Broadcast Service Release: v1.0.0.4

This is the first release of Bridge Broadcast Service, a new product that gives your live telemetry feed highly-available replication to multiple downstream consumers — so a downstream restart, network blip, or slow consumer never costs you data.

<!-- more -->

## Downloads

- **Docker:** [Container image](https://hub.docker.com/r/atlasplatformdocker/broadcast-service-host)
- **Windows Binary:** [Download](https://portal.motionapplied.com/portal/Downloads/ATLAS%20Streaming%20Platform%20-%20Bridge%20Broadcaster%20Service/Bridge%20Broadcast%20Service%201.0.0.4/MA.DataPlatforms.Bridge.Broadcast.Host.zip)
- **Documentation:** [Read docs](https://atlas.motionapplied.com/developer-resources/secu4/broadcast_service/)

## New Features

### Resilient, Multi-Target Bridge Data Delivery

Broadcast Service sits between an upstream source and one or more downstream consumers. Towards its upstream source, it exposes the same ADS messages, so it looks like an ordinary downstream. Towards its own downstreams, it replays that same ADS messages as the upstream, so each downstream Bridge target can consume, fall behind, and recover independently without affecting the others.

Durability comes from a segmented, write-ahead log: incoming records are persisted to disk before being forwarded, each target tracks its own replay cursor, and a stalled or disconnected target can catch up from where it left off once it reconnects. WAL segments are rolled at a configurable size and compacted automatically once every target has replayed past them, so disk usage stays bounded under normal operation.

### Per-Target Control Over Historical (Offload) Data

Each downstream target can be configured with `OffloadProcessing` to decide whether it receives the bulk historical data a source sends during an offload, or only live telemetry. This defaults to off, so a target only needs to opt in if it should also receive the full historical record — for example, an archive target — while live-only targets skip offload traffic without falling behind.

### Downstream Health Monitoring and Automatic Reconnection

Broadcast Service tracks the health of every configured downstream target independently, exposed via the `broadcast_target_up` metric, and reconnects automatically with exponential backoff if a target goes down — without affecting delivery to any other target. 

## Support

If you have any questions about this release or need assistance with upgrading or validation, please contact Support via [Portal](https://portal.motionapplied.com/Tickets/New).
