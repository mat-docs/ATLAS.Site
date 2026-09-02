---
date:
  created: 2026-09-02
categories:
  - Releases
tags:
  - Support Library
---

# Support Library Release: v2.1.5.11

This release adds regex matching for subscribed parameters and improves buffering performance, and fixes excessive startup delay.

<!-- more -->

## Downloads

- **Python FFI (GitHub):** [Repository](https://github.com/Software-Products/MA.DataPlatforms.Streaming.Support.Library)
- **NuGet Package:** [Support Library NuGet](https://github.com/mat-docs/packages/pkgs/nuget/MA.DataPlatforms.Streaming.Support.Lib.Core)
- **Documentation:** [Read docs](https://atlas.motionapplied.com/developer-resources/secu4/support_library/reference_docs/)

## New Features

### Subscribed Parameter Regex Matching

You can now subscribe to parameters using regex patterns, making it easier to select multiple related parameters at once instead of listing each one individually.

### Buffering Performance Improvements

Improved the performance of the buffering module. Parameters whose values fall outside the buffering window now return their last known (stale) value instead of no value.

## Bug Fixes

### Excessive Startup Delay 

Fixed an issue in the buffering module where sessions could take a long time to start after the session began.

## Support

If you have any questions about this release or need assistance with
migration, please contact the Support via [Portal](https://portal.motionapplied.com/Tickets/New).
