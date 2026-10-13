---
date:
  created: 2026-07-16
categories:
  - Releases
tags:
  - Support Library
---

# Support Library Release: v2.1.4.22

This release fixes a set of stacked defects in the buffering pipeline that could stall or silently discard live session data, adds configurable Kafka publishing, consuming, and authentication settings, and fixes a Kafka SASL handshake issue.

<!-- more -->

## Downloads

- **Python FFI (GitHub):** [Repository](https://github.com/Software-Products/MA.DataPlatforms.Streaming.Support.Library)
- **NuGet Package:** [Support Library NuGet](https://github.com/mat-docs/packages/pkgs/nuget/MA.DataPlatforms.Streaming.Support.Lib.Core)
- **Documentation:** [Read docs](https://atlas.motionapplied.com/developer-resources/secu4/support_library/reference_docs/)

## New Features

### Configurable Kafka Publishing, Consuming, and Authentication Settings

You can now configure Kafka publishing and consuming settings independently, including authentication and authorization options. The underlying client library has also been updated to support Kafka 4.

## Bug Fixes

### Live Sessions Never Completing After Session End

Fixed a set of stacked defects in the buffering pipeline that could prevent a live session from completing after it ended. Consumers waiting for buffering to finish would never receive the completion notification, while consumers that stopped at session end instead would silently discard the queued tail of session data. Live sessions now complete and close cleanly, with no data loss.

### Kafka SASL Handshake Exception

Fixed an issue where the new Kafka authentication settings could cause a SASL handshake exception, preventing consumers from connecting to the Kafka broker. Kafka connections now authenticate correctly.

## Support

If you have any questions about this release or need assistance with
migration, please contact the Support via [Portal](https://portal.motionapplied.com/Tickets/New).
