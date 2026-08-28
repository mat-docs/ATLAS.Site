---
date:
  created: 2026-08-28
categories:
  - Releases
tags:
  - ADS
---
# ATLAS Data Server Release: v9.87.3.93

This release completes a redesign of RDS connection handling, bundles an updated Bridge Service (v2.1.4.15), and provides improvements for SSN2 missing offload performance.

<!-- more -->

## Download

[ATLAS Data Server Installer](https://portal.mclarenapplied.com/portal/Downloads/Standalone%20ADS/ADS%209.87.3.93/AtlasDataServer.exe)

## New Features

### Robust RDS Connection Handling (#57051, #56803, #56792, #57273, #57401)
Redesigned RDS connections. RDS now automatically reconnects when the connection is interrupted, without requiring the Master ADS to be restarted.

### Bridge Service Updated to v2.1.4.15
ADS now bundles [Bridge Service v2.1.4.15](https://atlas.motionapplied.com/blog/2026/07/16/bridge-service-release-v21415/). See the linked release note for full details.

## Bug Fixes

### VTS Raw Files Copied to SSN Session Folder When Raw Data Root Path Is Set
Fixed an issue where VTS raw files were again being copied into the SSN session folder at the end of a recording even though a Raw Data Root path was configured. Raw files now stay only in the configured Raw Data Root path.

### Multiple Attempts to Add an Out Lap Causing Very Slow Offloads
Fixed an issue where repeated attempts to add an out lap during offload could make the offload dramatically slower than expected.

### SSN2 Slow to Save
Resolved an issue where saving an SSN2 file after offload could take several minutes longer than the offload itself, with the upload and save progress indicators becoming misaligned.

### ADS Crash on Divide by Zero
Fixed a crash caused by a divide-by-zero error.

### Dual Recorder Status Indicator Stuck on Red
Fixed an issue where the Dual Recorder status indicator could remain red even after the dual recorder was manually restarted and running correctly, despite the main ADS window reporting an "OK" status.

### Unhandled Exception Loop When VTS Recorder Is Configured
Fixed an issue where ADS could repeatedly show an "Unhandled Exception" popup on launch when a VTS recorder was configured in ATLAS.ini, making ADS unusable until the VTS recorder was removed from the configuration.

## Support
If you have any questions about this release or need assistance with upgrading or validation, please contact Support via [Portal](https://portal.motionapplied.com/Tickets/New).
