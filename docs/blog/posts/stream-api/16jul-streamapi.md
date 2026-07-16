---
date:
  created: 2026-07-16
categories:
  - Releases
tags:
  - Stream API
---

# Stream API Release: v2.1.4.14

This release adds configurable Kafka publishing, consuming, and authentication settings with Kafka 4 support, and fixes a Kafka SASL handshake exception.

<!-- more -->

## Downloads

- **GitHub:** [Repository](https://github.com/Software-Products/MA.DataPlatforms.StreamApi)
- **NuGet Package:** [Stream API NuGet](https://github.com/orgs/mat-docs/packages?q=&tab=packages&q=MA.Streaming.)
- **Documentation:** [Read docs](../../../developer-resources/secu4/stream_api/index.md)

## New Features

### Configurable Kafka Publishing, Consuming, and Authentication Settings

You can now configure Kafka publishing and consuming settings independently, including authentication and authorization options. The underlying client library has also been updated to support Kafka 4.

## Bug Fixes

### Kafka SASL Handshake Exception

Fixed an issue where the new Kafka authentication settings could cause a SASL handshake exception during group coordination. Kafka connections now authenticate correctly.

## Support

If you have any questions about this release or need assistance with
migration, please contact the Support via [Portal](https://portal.motionapplied.com/Tickets/New).
