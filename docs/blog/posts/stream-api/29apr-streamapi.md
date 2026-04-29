---
date:
  created: 2026-04-29
categories:
  - Releases
tags:
  - Stream API
---

# Stream API Release: v2.1.2.92

This release brings a fix for a race condition that caused session details to update inconsistently.

<!-- more -->

## Bug Fixes

- **Session Details Update Timing Issue**: Fixed a race condition where session details were not being updated correctly due to a timing issue. The update logic has been revised to ensure session details are consistently applied regardless of the order or timing of incoming events.