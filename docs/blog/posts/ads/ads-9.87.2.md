---
date:
  created: 2026-03-19
categories:
  - Releases
tags:
  - ADS
---
# ATLAS Data Service Release: v9.87.2

This release focuses on stability, installer reliability, and recorder correctness, addressing a number of customer‑reported issues identified during pre‑season testing. No new user‑facing features are introduced.

<!-- more -->

## Bug Fixes

### Channel Data Size Error During Recording
Resolved an issue where ADS could raise an OnAddChannelDataErrorOccurred error when incoming channel data did not match the expected row size.

### Installer Confirmation Prompt Appearing Unexpectedly
Fixed an issue where the ADS installer could display an “Are you sure you want to cancel?” prompt during a normal installation flow.

### Missing Data Folder After Installation
Resolved an issue where required ADS data folders were not always created during installation.

### Incorrect Restart Messaging
Corrected user‑facing messages that incorrectly instructed users to restart ATLAS instead of ADS.

### Standalone ADS Missing Redistributable Dependency
Resolved an issue where running ADS without ATLAS installed could fail due to a missing VC++ redistributable dependency.

### File Renaming With Parameter Wildcards
Fixed an issue where SSN, DTV, and M files were not correctly renamed when using parameter wildcards with DST multi‑source recorders.

### SQL Race Parameters Remaining Locked
Resolved an issue where the SQL Race RDA unlock list search path was not updated automatically, causing parameters to remain locked in recorded sessions.

### CAN Messages With DLC < 8 Not Handled Correctly
Fixed an issue where recorders were unable to correctly handle CAN messages with a DLC less than 8.

### Improved SSN2 Offload Performance
Improved SSN2 offload performance from ADS by optimising SQLite write and journaling behaviour, significantly reducing offload times for large sessions. This change applies only to SSN2 and does not affect SSNDB.

## Support
If you have any questions about this release or need assistance with upgrading or validation, please contact Support via [Zendesk](https://mclarenappliedtechnologies.zendesk.com/hc/en-us).