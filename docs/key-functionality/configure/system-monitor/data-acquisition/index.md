# Data Acquisition 

System Monitor is a configuration and monitoring tool used in TAG systems to manage how Electronic Control Units (ECUs) and other data logging devices acquire and store data. It supports both live and offline data acquisition workflows and integrates with ATLAS for analysis.

## Key Functional Areas

System Monitor provides tools grouped into two main categories:

- **Logging**: Configure how data is acquired and stored by the ECU, including live streaming, memory-based logging, and telemetry.
- **Sensors**: Set up and calibrate sensors connected to the ECU, including both software-calibrated and externally configured sensors.

## Supported Hardware

System Monitor is optimised for the following TAG hardware:

- **TAG-300 / MCU-300**: Distributed control units for engine and chassis respectively.
- **TAG 3.8 Family**: Engine control units with optional data logging.
- **DLU (DATALab Logging Unit)**: Stores data for later upload via wirelink.

## Integration with ATLAS

System Monitor works closely with ATLAS for session analysis. Depending on the logging method, session files are either generated directly or uploaded from the ECU for post-processing.

## Logging Methods

System Monitor supports three primary logging methods:

- **Live Logging**: Real-time data acquisition via wirelink.
- **Remote Logging**: Data stored in DATALab memory for later upload.
- **Burst Logging**: High-speed data stored in Burst memory, often used with Wide Band Telemetry.

Each method has its own configuration tools and memory management strategies.

## Telemetry Support

TAG systems support two types of telemetry:

- **Narrow Band (Continuous)**: Low data rate, not configured via System Monitor.
- **Wide Band (Burst)**: High data rate, configured via Burst Logging tools.