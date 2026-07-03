---
date:
  created: 2026-07-03
categories:
  - Releases
tags:
  - ADS
---
# ATLAS Data Server Release: v9.87.2.101

This release introduces recorder connection status indicators and a search filter for the Recording options page, alongside a number of fixes to VTS recording, dual recorder offload behaviour, SSN2 stability, and vTAG session handling.

<!-- more -->

## Download

[ATLAS Data Server Installer](https://portal.mclarenapplied.com/portal/Downloads/Standalone%20ADS/ADS%209.87.2.101/AtlasDataServer.exe)

## New Features

### Search Filter and Mouse Wheel Scrolling in Recording Options
The **Tools > Options > Recording** page now includes a search field above the settings grid. Typing filters the visible settings in real time by name, hiding non-matching rows and group headers so a specific setting can be located without scrolling the full list. The grid also now supports mouse wheel scrolling.

## Bug Fixes

### VTS Raw Files Copied to SSN Session Folder
Resolved an issue where recording VTS data to an SSN session with a Raw Data Root path configured would produce raw files in the correct location during the recording, but also copy them into the SSN session folder at the end of the recording. Raw files now stay only in the configured Raw Data Root path.

### Dual Recorder — Slow Offload When Recording to SSN2
Fixed a performance regression where offloading a session with a dual recorder configured to SSN2 (and the main recorder to SSN) was significantly slower than offloading with the main recorder alone. Dual recorder offloads now run at the same speed as the primary recorder.

### Dual Recorder — Multi Session Offload Sessions Not Renamed Correctly
Resolved an issue where, when offloading multiple sessions via an Ethernet Multi Session Offload recorder with a dual recorder configured to SSN2, some of the dual recorder sessions would keep their temporary identifier/filename instead of being renamed to match the primary recorder session.

### Raw Files Not Created After a Filename Token Failed to Decode
Fixed an issue where, once a raw file was created with a filename containing undecoded tokens (typically caused by a very short log before ADS had received the data needed to expand the tokens), no further raw files would be created until the offending file was manually deleted. Raw file creation now recovers automatically.

### SSN2 Recording Crashes and Memory Leaks (#57296, #57417)
Resolved memory leaks affecting long SSN2 recordings that could lead to excessive crashing during recording.

### Delete File on Close Option Removed
The **Delete file on close** option has been removed from all ADS recorders. The option did not delete SSN2 files as expected and was misleading — files were still copied to the final output folder regardless of the setting. To prevent a session from being written to disk, untick **Enable Record to Disk** in the recorder's general settings instead.

### Laps Merged When Config or PGV Search Takes a Long Time
Fixed an issue where, if ADS spent a long time searching for missing configs or PGVs at the start of a recording, the out lap and first lap could be merged in the resulting session. Laps are now preserved correctly even when the config/PGV search is slow.

### vTAG — Associate Files Not Separated Into a New SSN2 (#56992, #57184)
Resolved an issue where reprocessing an SSN2 file with vTAG placed the associate channels back into the original SSN2 database rather than creating a separate associate SSN2. vTAG reprocessing now also recognises SSN2 filename extensions regardless of case.

### SQLRace Connection Manager — Server Refresh Not Working
Fixed an issue where clicking Refresh on the Server Name field in the SQLRace connection manager did not produce a list of available servers.

## Known Issues

### Data type not supported
The current implementation of the Bridge Service doesn’t support ability to stream configurable/tuneable data.

### Raw files not created correctly when recording to SQL Race
When recording to a SQL Race database, no raw files are created if the Raw Data Root Folder is blank. If it is set, raw files are created directly in that folder and may not be renamed correctly.

### Session detail wildcard mismatch when recording to SSN
When recording to SSN using ADS Master and an RDS recorder on separate machines, the
file name wildcard uses the ADS Master value, while the session detail uses the RDS recorder value.

## Support
If you have any questions about this release or need assistance with upgrading or validation, please contact Support via [Portal](https://portal.motionapplied.com/Tickets/New).
