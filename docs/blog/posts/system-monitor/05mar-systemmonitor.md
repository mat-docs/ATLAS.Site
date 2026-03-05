---
date:
  created: 2026-03-05
categories:
  - Releases
tags:
  - System Monitor
---
# System Monitor 8.87.1.15 – Patch Release

We have released **System Monitor version 8.87.1.15**, a **patch update** addressing two specific issues affecting **TAG700 workflows**. This release focuses exclusively on stability and correctness improvements and does not introduce new features.

<!-- more -->

## What’s Fixed

### Crash When Opening Some TAG700 PGVs

System Monitor could crash when opening certain **TAG700 PGV files**.  
This issue has been resolved, and affected PGVs can now be opened reliably without unexpected termination.

---

### Locked CAN Section Ignored Due to Incorrect Logging Config Termination

An issue was identified where **incorrect termination of the logging configuration for TAG700** caused the **locked CAN section** to be ignored.

This has been fixed to ensure that:
- Logging configuration termination is handled correctly
- Locked CAN sections are consistently respected during TAG700 result processing

---

## Support

If you have any questions about this release or need assistance with 
migration, please contact the Support via [Zendesk](https://mclarenappliedtechnologies.zendesk.com/hc/en-us).
