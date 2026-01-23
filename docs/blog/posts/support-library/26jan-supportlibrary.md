---
date:
  created: 2026-01-23
categories:
  - Releases
tags:
  - Support Library
---

# Support Library Release: vX

This release introduces significant enhancements to the Support Library,
focusing on essential data stream management and improved buffering capabilities.
<!-- more -->

## Downloads

- **Python FFI (GitHub):** [Repository](https://github.com/Software-Products/MA.DataPlatforms.Streaming.Support.Library)
- **NuGet Package:** [Support Library NuGet](https://github.com/mat-docs/packages/pkgs/nuget/MA.DataPlatforms.Streaming.Support.Lib.Core)
- **Documentation:** [Read docs](https://atlas.motionapplied.com/developer-resources/secu4/support_library/reference_docs/)

## Key Improvements

### 1. Essential Data Stream Service

We've introduced a new Essential Data Stream Service that ensures you never 
miss critical data from your sessions. This service:

  * Tracks your data streams in real-time to keep you informed about their 
    status
  * Automatically notifies you when streams start and stop
  * Prevents data loss by ensuring proper cleanup and resource management
  * Improves reliability with smart detection of stream activity and 
    automatic recovery

This means you can now have greater confidence that your essential data is 
being captured consistently, even during long-running sessions or when 
working with historical data playback.


### 2. Enhanced Buffering Module with FFI Support

The Buffering Module now includes Foreign Function Interface (FFI) support, 
making it easier to integrate with external systems and programming 
languages like Python, Rust, or C++. 

What this means for you:

  * Cross-platform compatibility - Use the library from your preferred 
    programming environment
  * Better interoperability - Seamlessly integrate with existing data 
    pipelines and tools
  * New capabilities - Access stream lifecycle events 
    (StreamStarted/StreamStopped) to track your data flow
  * Enhanced logging - Better visibility into what's happening with your 
    data streams

The buffering module continues to provide powerful sample extraction, data 
merging, and time-alignment features, now accessible from more platforms 
than ever before.