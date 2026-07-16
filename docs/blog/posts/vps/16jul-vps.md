---
date:
  created: 2026-07-16
categories:
  - Releases
tags:
  - Virtual Parameter Service
---

# Virtual Parameter Service Release: v2.1.2.21

This release fixes data loss and unclean session shutdown at session end, adds configurable Kafka publishing, consuming, and authentication settings, and stops VPS from logging misleading warnings for virtual parameters that go on to build successfully.

<!-- more -->

## Downloads

- **Docker:** [Container image](https://hub.docker.com/repository/docker/atlasplatformdocker/virtual-parameter-service-host/general)
- **Windows Binary:** [Download](https://portal.motionapplied.com/portal/Downloads/ATLAS%20Streaming%20Platform%20-%20Virtual%20Parameter%20Service/VPS%202.1.2.21/MA.DataPlatforms.VirtualParameterService.Host.zip)

## New Features

### Configurable Kafka Publishing, Consuming, and Authentication Settings

You can now configure Kafka publishing and consuming settings independently, including authentication and authorization options, directly through the VPS configuration.

## Bug Fixes

### Data Loss and Unclean Shutdown at Session End

Fixed an issue where, at the end of a live session, VPS could discard the buffered tail of session data instead of waiting for it to be fully delivered, and could silently drop virtual parameter values whose source parameters arrived in different merge batches. Sessions now close cleanly and no longer lose data at the end of a session.

### Misleading "Build Incomplete" Warnings

Fixed an issue where VPS logged a "Build Incomplete" warning for a virtual parameter missing its dependencies, but never logged a follow-up message if that parameter subsequently built successfully — leaving only the warning in the logs and misleading troubleshooting. VPS now logs when a previously incomplete virtual parameter is built successfully.

## Support

If you have any questions about this release or need assistance with
migration, please contact the Support via [Portal](https://portal.motionapplied.com/Tickets/New).
