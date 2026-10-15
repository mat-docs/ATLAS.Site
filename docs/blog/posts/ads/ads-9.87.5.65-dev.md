---
date:
  created: 2026-10-15
categories:
  - Releases
tags:
  - ADS
---
# ATLAS Data Server Release: v9.87.5.65-dev

This release focuses on SSN2 and SQL Race recording, with fixes for wildcard resolution in session identifiers, session details and file paths, RAW file replay, and SSN2 offload folder handling. There are no new features in this release.

<!-- more -->

!!! info "Development Build Notice"
  This release is provided as a development build and is a pre-release version made available for early testing and feedback. Please report any problems or feedback encountered while using this build to help improve the final release.

## Download

[ATLAS Data Server Installer](https://portal.mclarenapplied.com/portal/Downloads/Standalone%20ADS/ADS%209.87.5.65/AtlasDataServer.exe)

## Bug Fixes

### Wildcards Not Resolved When Recording to SQL Race or SSN2 (#60061, #60797, #60803, #60888)
Fixed several issues where wildcards in the session identifier, session details and SSN2 file path were not resolved when recording to SQL Race or SSN2.

### RAW File Replay Compatibility (#60839, #60703, #61033)
Fixed an issue where RAW telemetry files recorded while recording to SSN2 or SQL Race could be created with an incorrect file suffix, preventing replay via ADS.

### Channel Value Differences Between SSN and SSN2 or SQL Race (#60940)
Fixed an issue where channel data could differ between SSN and SSN2 or SQL Race recordings made from the same source. When multiple values were received for the same timestamp, SSN kept the first value while SQL Race kept the last, so the final sample of a channel could differ. SQL Race now keeps the first value, matching SSN.

### SSN2 Offload Folder Path Handling
Fixed an issue where SSN2 files were offloaded to the default location instead of the configured folder when the recording or export folder path contained leading or trailing whitespace.

## Support
If you have any questions about this release or need assistance with upgrading or validation, please contact Support via [Portal](https://portal.motionapplied.com/Tickets/New).
