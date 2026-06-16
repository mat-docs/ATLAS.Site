---
date:
  created: 2026-06-03
categories:
  - Releases
tags:
  - Virtual Parameter Service
---

# Virtual Parameter Service Release: v2.1.2.3

This release fixes session handling so that VPS only processes the data sources and session types it is configured for, and adds a new configuration option to control which session types are handled.

<!-- more -->

## Downloads

- **Docker:** [Container image](https://hub.docker.com/repository/docker/atlasplatformdocker/virtual-parameter-service-host/general)
- **Windows Binary:** [Download](https://portal.motionapplied.com/portal/Downloads/ATLAS%20Streaming%20Platform%20-%20Virtual%20Parameter%20Service/VPS%202.1.2.3/MA.DataPlatforms.VirtualParameterService.Host.zip)
- **Documentation:** [Read docs](../../../key-functionality/stream/open_streaming_architecture/index.md)

## Bug Fixes

### Sessions from unintended data sources no longer processed

VPS no longer processes sessions from unintended data sources. Previously, when multiple data sources were active, VPS would create virtual sessions for all of them regardless of the configured `DataSource` setting. Session start and end events from non-matching data sources are now correctly ignored.

### Unintended session types no longer processed

VPS no longer processes unintended session types. Previously, VPS would respond to all session types except `VirtualSession`, which caused conflicts when third-party or custom data publishers were running alongside VPS. VPS now only processes the session types in the configurable `SessionTypesToProcess` list, which defaults to `["Session", "VTS"]`.

## Configuration

- A new `SessionTypesToProcess` config option has been added to `VirtualParameterServiceConfig`. It accepts a list of session type strings to filter which sessions VPS will handle, and defaults to `["Session", "VTS"]` if not specified.

## Maintenance / Dependencies

- Support Library updated from 2.1.1.27 to 2.1.3.3.

## Support

If you have any questions about this release or need assistance with
migration, please contact the Support via [Portal](https://portal.motionapplied.com/Tickets/New).
