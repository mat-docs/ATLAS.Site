---
date:
  created: 2026-06-03
categories:
  - Releases
tags:
  - Support Library
---

# Support Library Release: v2.1.3.3

This release resolves intermittent session detail and buffering issues, and introduces a new event that notifies you when data offloading begins during a live session.

<!-- more -->

## Downloads

- **Python FFI (GitHub):** [Repository](https://github.com/Software-Products/MA.DataPlatforms.Streaming.Support.Library)
- **NuGet Package:** [Support Library NuGet](https://github.com/mat-docs/packages/pkgs/nuget/MA.DataPlatforms.Streaming.Support.Lib.Core)
- **Documentation:** [Read docs](https://atlas.motionapplied.com/developer-resources/secu4/support_library/reference_docs/)

## Bug Fixes

### Session details missing intermittently

Session details were occasionally missing. This has been resolved by updating the Stream API library to the latest version.

### Buffering crash on startup

Resolved an unexpected crash in the buffering component that could occur when data arrived in a specific order at startup.

### False "timestamps not sorted" error

Fixed a timing issue in the buffering component that incorrectly reported out-of-order data under high load.

## New Feature

### Offload Started Event

You can now be notified when data offloading begins during a live session, allowing you to react at the right moment.

!!! note "Live sessions only"
    This event is only raised during live sessions and will not fire when replaying historical data.

## Support

If you have any questions about this release or need assistance with
migration, please contact the Support via [Portal](https://portal.motionapplied.com/Tickets/New).
