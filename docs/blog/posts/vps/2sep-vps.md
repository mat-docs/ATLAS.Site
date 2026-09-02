---
date:
  created: 2026-09-02
categories:
  - Releases
tags:
  - Virtual Parameter Service
---

# Virtual Parameter Service Release: v2.1.3.5

This release adds a new `Snapshot` calculation mode for virtual parameter calculation, alongside the existing `Default` mode, and fixes virtual parameters failing to calculate when a source parameter's identifier differs from its name.

<!-- more -->

## Downloads

- **Docker:** [Container image](https://hub.docker.com/repository/docker/atlasplatformdocker/virtual-parameter-service-host/general)
- **Windows Binary:** [Download](https://portal.motionapplied.com/portal/Downloads/ATLAS%20Streaming%20Platform%20-%20Virtual%20Parameter%20Service/VPS%202.1.3.5/MA.DataPlatforms.VirtualParameterService.Host.zip)

## New Features

### New `Snapshot` Calculation Mode for Virtual Parameters

VPS now supports two calculation modes for virtual parameters, selected via the new `CalculationMode` setting in `AppConfig.json`:

- **`Default`** (unchanged) waits until every source parameter has data covering a given timestamp before calculating, so a virtual is only produced once all of its inputs are aligned.
- **`Snapshot`** (new) recalculates a virtual immediately whenever any one of its sources changes, using the latest known value for sources that haven't changed. Memory use stays flat regardless of session length, and a virtual keeps producing values even while one of its sources ticks slowly — ideal for long-running live sessions. The trade-off is that Snapshot mode never accepts samples older than the latest value it has already recorded for that source, so it isn't suitable for replayed or out-of-order data.

A new `MaxWriteBatchSizeInKb` setting (default `100`) caps the size of each output packet written in Snapshot mode.

See the [Calculation Modes documentation](../../../key-functionality/enrich/vps/configuration/appconfig-reference.md#calculation-modes) for the full comparison and configuration example.

## Bug Fixes

### Virtual Parameters Not Calculated When Identifier Differs From Name

Fixed an issue where VPS failed to calculate a virtual parameter when its source parameter's identifier was different from its name.

## Support

If you have any questions about this release or need assistance with
migration, please contact the Support via [Portal](https://portal.motionapplied.com/Tickets/New).
