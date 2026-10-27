---
date:
  created: 2026-10-28
categories:
  - Releases
tags:
  - vTAG Service
---

# vTAG Service Release: v1.0.0.0

The first release of vTAG Service, a Windows console application that runs your vTAG model on telemetry read from a Kafka broker and publishes the model's outputs back to the broker as a new session, with no need for ADS.

<!-- more -->

## New Features

### Run vTAG Models on Streamed Telemetry

vTAG Service reads its inputs from a session streamed to a Kafka broker using the Open Streaming Architecture. It runs your vTAG model at the model's own base rate as the data arrives, and writes the outputs to an associated session on the same broker, linked to the input session. ATLAS and other consumers can then read the outputs like any other stream.

```
Telemetry source → Kafka → vTAG Service (your vTAG model) → Kafka → ATLAS / recorders
```

Anything that writes parameters to the stream can feed the model, including parameters that don't come directly from the TAG unit. This makes vTAG Service a good fit when your telemetry is already on a broker, for example published by the Bridge Service. Choose vTAG Server instead if you work with ADS and the VTS Recorder, or need historical replay inside ATLAS.

vTAG Service processes sessions as they are streamed. It doesn't replace vTAG Server's historical replay features, such as lap-based calculation periods.

### Program Your Model with System Monitor

vTAG Service provides a virtual vTAG unit. You program your vTAG application (`.pgv`) onto it with System Monitor, in the same way as for vTAG Server. vTAG Service then reads the model's input and output parameters and subscribes to the inputs on the broker.

If you reprogram the unit while the service is running, vTAG Service picks up the new model's parameters automatically. You don't need to restart it.

### Simple Installation and Licensing

A single installer, `MA.DataPlatforms.vTAGService.Setup.exe`, installs vTAG Service and Licence Manager if it isn't already installed, adds Start Menu and desktop shortcuts, and creates your configuration file. vTAG Service ships with its own runtime, and you don't need ATLAS, ADS or vTAG Server installed. It requires a Motion Applied licence with the vTAG Server feature.

### Configure Everything in One File

All settings live in `Documents\Motion Applied\vTAG Service\AppConfig.json`. Most setups change only the broker address, the data source your telemetry is published under, and the folders holding your model's `.pgv`, `.cfg` and `.pul` files. Other options include a fixed output session identifier, the output session type, sample batching, and the address System Monitor connects to when programming the model.

### Configurable Logging

vTAG Service logs to the console window and to daily rolling files in `Documents\Motion Applied\vTAG Service\logs`. The logging level and destinations are configurable, and the troubleshooting guide uses Debug logging to diagnose startup, licence, subscription and missing-output problems.

See the [vTAG Service documentation](../../../key-functionality/enrich/vtag-service/index.md) to get started, and the [Getting Started guide](../../../key-functionality/enrich/vtag-service/getting-started.md) for a walkthrough from installation to your first outputs.

## Download

[vTAG Service Installer](https://portal.motionapplied.com/portal/Downloads/Software#ATLAS%20vTAG%20Service)

## Support
If you have any questions about this release or need assistance with upgrading or validation, please contact Support via [Portal](https://portal.motionapplied.com/Tickets/New).
