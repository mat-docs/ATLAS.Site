---
date:
  created: 2026-06-03
categories:
  - Releases
tags:
  - Stream API
---

# Stream API Release: v2.1.3.4

This release fixes a UTC offset bug that could block end-of-session messages and a thread leak on gRPC cancellation, alongside improvements to the Test Client.

<!-- more -->

## Downloads

- **GitHub:** [Repository](https://github.com/Software-Products/MA.DataPlatforms.StreamApi)
- **NuGet Package:** [Stream API NuGet](https://github.com/orgs/mat-docs/packages?q=&tab=packages&q=MA.Streaming.)
- **Documentation:** [Read docs](../../../developer-resources/secu4/stream_api/index.md)

## Bug Fixes

### UTC negative offset bug 

The end-of-session message was blocked when the server ran behind UTC. This has been fixed by ensuring consistent UTC timestamp comparison.

### Thread leak on gRPC cancellation 

Threads were permanently blocked after each session cycle. This has been fixed with cancellation token registration, an idempotent stop, and `RpcException` handling in `ConsumeAsync`.

## Improvements

### Test Client

The Test Client received a number of improvements that shipped alongside the thread-leak fix, making it more reliable when running repeated session cycles.

## Support

If you have any questions about this release or need assistance with
migration, please contact the Support via [Portal](https://portal.motionapplied.com/Tickets/New).
