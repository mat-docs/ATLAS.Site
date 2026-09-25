---
date:
  created: 2026-09-29
categories:
  - Releases
tags:
  - ADS
---
# ATLAS Data Server Release: v9.87.4.XX

This release includes several bug fixes to support SSN2 adoption. There are no new features in this release.

<!-- more -->

## Download

[ATLAS Data Server Installer](https://portal.mclarenapplied.com/portal/Downloads/Standalone%20ADS/ADS%209.87.4.XX/AtlasDataServer.exe)

## Bug Fixes

### Unattended Offload Could Be Blocked (#57296, #60473, #60742, #60896)
Fixed an issue where a "Server Busy" dialog could interrupt unattended SSN2 offloads.

### SSN2 Offload Folder Path Handling
Fixed an issue where SSN2 or SQL Race offloads could be written to the default location when the configured output folder contained leading or trailing whitespace.

### Crash (#60820)
Fixed a stability issue that could cause ADS to crash after updating to version 9.87.3.93.

### SQLRace Parameter Resolution Errors (#60756)
Fixed an issue that could generate SQLRace parameter data access errors, spamming logs during offload.

### RAW File Replay Compatibility (#60839, #60703)
Fixed an issue where RAW telemetry files could be created with an incorrect file suffix, preventing replay.

### SSN2 Session Detail Resolution (#60797)
Fixed an issue where session identifiers and session details were not resolved correctly when generating SSN2 sessions from RDS.

### Dual Recorder Initialisation (#60796)
Fixed an issue where the dual recorder could fail to initialise after restarting ADS.

## Known Issues

### Wildcard Resolution
We are continuing to investigate additional edge cases involving wildcard resolution in session identifiers, session details and recording paths when using SSN2. If you encounter any further wildcard-related issues, please raise a Support Portal ticket with example configuration and reproduction steps.

### SSN2 Missing Channel
We are continuing to investigate reports of channels not being present in some SSN2 sessions. If you encounter missing-channel scenarios, please raise a Support Portal ticket and include the source recording, generated SSN2 session and any relevant logs.

### SSN2 Missing Lap Triggers
We are continuing to investigate reports of lap triggers not being generated correctly in some SSN2 sessions. If you encounter similar behaviour, please raise a Support Portal ticket and provide the affected session together with associated logs and reproduction details.

## Support
If you have any questions about this release or need assistance with upgrading or validation, please contact Support via [Portal](https://portal.motionapplied.com/Tickets/New).
