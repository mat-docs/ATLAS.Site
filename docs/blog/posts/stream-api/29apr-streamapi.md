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

## Downloads

- **GitHub:** [Repository](https://github.com/Software-Products/MA.DataPlatforms.StreamApi)
- **NuGet Package:** [Stream API NuGet](https://github.com/orgs/mat-docs/packages?q=&tab=packages&q=MA.Streaming.)

## Bug Fixes

- **Session Details Update Timing Issue**: Fixed a race condition where session details were not being updated correctly due to a timing issue. The update logic has been revised to ensure session details are consistently applied regardless of the order or timing of incoming events.