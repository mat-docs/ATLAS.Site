---
date:
  created: 2026-07-16
categories:
  - Releases
tags:
  - Bridge Service
---

# Bridge Service Release: v2.1.4.15

This release adds configurable Kafka publishing, consuming, and authentication settings with Kafka 4 support, adds support for processing standalone PGVs, and fixes a Kafka SASL handshake issue.

<!-- more -->

## Downloads

- **Docker:** [Container image](https://hub.docker.com/repository/docker/atlasplatformdocker/bridge-service-host/general)
- **Windows Binary:** [Download](https://portal.motionapplied.com/portal/Downloads/ATLAS%20Streaming%20Platform%20-%20Bridge%20Service/Bridge%20Service%202.1.4.15/MA.DataPlatforms.Bridge.Host.zip)

## New Features

### Configurable Kafka Publishing, Consuming, and Authentication Settings

You can now configure Kafka publishing and consuming settings independently, including authentication and authorization options, directly through the Bridge configuration. The underlying client library has also been updated to support Kafka 4.

### Processing Standalone PGVs

The Bridge can now process "standalone" PGVs — parameter group value packets sent by the unit that aren't associated with any of that session's CFGs. Previously these were ignored and any associated row data was discarded. You can now configure a list of standalone PGVs so their data is processed and made available like any other row data.

## Bug Fixes

### Kafka SASL Handshake Exception

Fixed an issue where the new Kafka authentication settings could cause a SASL handshake exception, preventing the Bridge from connecting to the Kafka broker. Kafka connections now authenticate correctly.

## Support

If you have any questions about this release or need assistance with
migration, please contact the Support via [Portal](https://portal.motionapplied.com/Tickets/New).
