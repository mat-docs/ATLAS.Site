# Logging Overview
System Monitor provides comprehensive tools to configure how data is logged by an ECU or other data logging device. Logging is the process of acquiring data from measurement parameters and storing it for analysis, either live or post-session.

## Logging Categories

System Monitor supports three main logging methods:

- **Live Logging**: Sends data directly to System Monitor via wirelink, without storing it in the ECU.
- **Remote Logging**: Stores data in DATALab memory for later upload.
- **Burst Logging**: Stores high-frequency data in Burst memory, also used for Wide Band Telemetry.

Each method has its own configuration tools and session management features.

## Memory Allocation
TAG systems use two types of memory for data logging:

### Burst Memory
- Designed for high-speed logging of engine parameters.
- Triggering is simple and data is collected at the highest rate supported by the hardware.
- Configured via the Burst Logging configuration.

### DATALab Memory
- Used for chassis parameters that require lower sampling rates.
- Offers versatile triggering and configurable sampling rates.
- Configured via the Remote Logging configuration.

## Session Generation
Sessions represent the data collected during a test or race. They can be generated in three ways:

- **Live**: Real-time session file created during online ECU operation.
- **Upload**: Data stored in ECU memory is uploaded to ATLAS for session creation.
- **Telemetry**: Data transmitted during a test session is analysed live by ATLAS, which generates a session file when telemetry ends.

