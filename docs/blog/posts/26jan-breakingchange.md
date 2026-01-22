---
date:
  created: 2026-01-23
categories:
  - Announcement
tags:
  - ATLAS Client
  - Virtual Parameter Service
  - Support Library
  - Stream Protocol
  - Stream API
  - Bridge Service
---

# Important Compatibility Notice: Stream API Breaking Change & Required Full‑Stack Upgrade

A major update to the Stream API introduces a breaking change affecting all components that interact with the Streaming Architecture.

<!-- more -->

The new Stream API includes updated Kafka topic naming, revised lifecycle behaviour, and enhanced session‑level tracking.  
**If you plan to adopt the updated Streaming Architecture, a full‑stack upgrade is required for compatibility.**

Existing configurations will continue to work *only if you remain on the previous Streaming Architecture*. Upgrading a single component alone will not be compatible with the new Stream API behaviour. ATLAS can also be upgraded independently as long as you are not using the Stream Recorder.

## Downloads

For detailed changes to each component and guidance on updating between versions,  
**please see the individual component release notes and the migration guides**.

| Component | Download Link | Github/Docker | Documentation | Release Notes |
|-----------|---------------|----------------|----------------|---------------|
| ATLAS Client | | | | |
| Virtual Parameter Service | | | | [Release Notes](26jan-vps.md) |
| Bridge Service | | | | [Release Notes](26jan-bridge.md) |
| ADS with Bridge Service | | | | |
| Support Library | | | | [Release Notes](26jan-supportlibrary.md) |
| Stream API | | | | [Release Notes](26jan-streamapi.md) |
| Stream Protocol | | | | [Release Notes](26jan-streamprotocol.md) |

## Support

If you have any questions about this release or need assistance with 
migration, please contact the Support via [Zendesk](https://mclarenappliedtechnologies.zendesk.com/hc/en-us).