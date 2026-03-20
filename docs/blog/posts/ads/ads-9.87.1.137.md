---
date:
  created: 2026-03-20
categories:
  - Releases
tags:
  - ADS
---
# ATLAS Data Service Release: v9.87.1.137

This release focuses on stability, installer reliability, and recorder correctness, addressing a number of customer‑reported issues identified. No new user‑facing features are introduced.

<!-- more -->

## Download

[ATLAS Data Server Installer](https://portal.mclarenapplied.com/portal/Downloads/Standalone%20ADS/ADS%209.87.1.137/AtlasDataServer.exe)

## Bug Fixes

### Channel Data Size Error During Recording (#6616)
Resolved an issue where ADS could raise an OnAddChannelDataErrorOccurred error when incoming channel data did not match the expected row size.

### Installer Confirmation Prompt Appearing Unexpectedly (#6714, #7226, #7107)
Fixed an issue where the ADS installer could display an “Are you sure you want to cancel?” prompt during a normal installation flow.

### Missing DataFolder After Installation
Resolved an issue where DataFolder is not set as part of the installation.

### Standalone ADS Missing Redistributable Dependency (#7163)
Resolved an issue where running ADS without ATLAS installed could fail due to a missing VC++ redistributable dependency.

### File Renaming With Parameter Wildcards (#7160, #7308, #7335)
Fixed an issue where SSN, DTV, and M files were not correctly renamed when using parameter wildcards with DST multi‑source recorders.

### SQL Race Parameters Remaining Locked (#7243)
Resolved an issue where the SQL Race RDA unlock list search path was not updated automatically, causing parameters to remain locked in recorded sessions.

### CAN Messages With DLC < 8 Not Handled Correctly
Implemented better error handling when where SQL Race fails to write CAN data to disk with a DLC less than 8. 

### Improved SSN2 Offload Performance
Improved SSN2 offload performance from ADS by optimising SQLite write and journaling behaviour, significantly reducing offload times for large sessions. This change applies only to SSN2 and does not affect SSNDB.

## Support
If you have any questions about this release or need assistance with upgrading or validation, please contact Support via [Zendesk](https://mclarenappliedtechnologies.zendesk.com/hc/en-us).