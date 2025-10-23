# Logging and Sensor Configuration

System Monitor supports multiple logging modes and sensor configuration tools.

## Logging Modes
### Live Logging

- Captures data from a connected ECU.
- Configuration stored in `LogCfgs` directory.

### Burst Logging

- ECU stores data in Burst Memory while disconnected.
- Configuration stored in `LogCfgs`.

### Remote Logging

- ECU stores data in DATALab Memory while disconnected.
- Configuration stored in `LogCfgs`.

## Sensor Configuration
### External Inputs Configuration
- Configures sensor inputs and applies calibration data.
- Stored in `SenSets` directory.

### Sensor Sets

- Define sensor and actuator data.
- Stored in `SenSets`.

### History Report

- Extracts vehicle operation statistics from the ECU.
- Stored in `HistReps`.

### Virtual Parameters

- Created per project.
- Stored in `Virtuals` directory.

## CAN Configuration

- Configure Transmit and Receive CAN messages.
- Stored in CAN buffers.

## Prime Parameter Override (.ppo)

Used to override logging configuration parameters.

- Format: `App id, parameter identifier, minimum frequency`
- No header line
- Minimum frequency of 0 removes prime status
- Requires "Enforce Prime Parameter Requirements" to be enabled