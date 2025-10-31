# Logging Types

## Live Logging

Live Logging is the process by which System Monitor acquires data from a connected ECU in real time. It supports both display and session recording functionality.

### Purpose

Live Logging Configuration serves two main purposes:

- **Display**: Enables parameters to be shown in the current desktop.
- **Session Recording**: Selects parameters to be included in a session file for analysis in ATLAS.

!!! note
    ATLAS must be configured to display slow row parameters to view live logging data.

### Configuration
To configure Live Logging:

1. Select `Logging > Live Configuration`.
2. If unavailable, create a new Live Logging Configuration File.
3. The configuration dialog includes three tabs:
   - **Session**: Define session characteristics.
   - **Trigger Timing**: Set session duration and trigger timing.
   - **Trigger Condition**: Define the trigger condition.

### Session Tab

- **Next Session Filename**: Automatically generated as `SESSnnn.SSN`.
- **Multiple Shot Sessions**: Enables automatic recording of multiple sessions.
- **Notes and Comments**: Opens the Session Details dialog for metadata entry.

![Session](../assets/session-tab.png)

### Trigger Timing Tab

- **Logging Time**: Default is 10 minutes.
- **Mode Options**:
  - Manual
  - Start Logging
  - Stop Logging
  - Pre and Post Trigger
- **Disk Space Panel**: Displays required and available space.

![Trigger](../assets/trigger-tab.png)

### Trigger Condition Tab

- Define logical conditions using measurement parameters and mathematical operators.

![Condition](../assets/condition-tab.png)

### Recording Modes

- **Manual**: Trigger manually via menu.
- **Automatic**: Trigger based on defined conditions.

#### Status Bar Indicators

- `Recording OFF`: Not recording.
- `Recording ON`: Actively recording.
- `Trigger Pending`: Awaiting trigger condition.

### Automatic Recording Steps

1. Set trigger mode.
2. Enable trigger via `Logging > Trigger Enable`.
3. Put ECU online via `ECU > On Line`.

## Remote Logging

Remote Logging allows an ECU to store data in DATALab memory while disconnected from System Monitor. Configuration is managed via System Monitor and uploaded/downloaded manually.

### Configuration Access

- Select `Logging > Remote Configuration`.
- If unavailable, create a new Remote Logging Configuration File.

### Channel Overview Tab

- **Memory End Strategy**:
  - Stop when full
  - Wrap (overwrite oldest data)
- **Driver Push Button Options**:
  - Clear memory
  - Use as trigger
  - Disabled

### Logging Duration

System Monitor calculates and displays the logging duration on the Channel Overview tab in:
  - Hours:minutes:seconds 
  - Number of laps

The calculation considers:
  - Sample rates of enabled parameters across all channels
  - Settings in the Logging Duration dialog

Access via `Setup` button in Configure Remote Logging dialog.

!!! note
    These settings only affect duration calculations, not the actual logging configuration.

Settings include:

- **Logging Memory**: Available memory size for logging
- **Out Lap Time**: Estimated out lap duration (seconds)
- **In Lap Time**: Estimated in lap duration (seconds) 
- **Typical Lap Time**: Estimated flying lap duration (seconds)
- **Row Data Frequency**: Average sample rate of Row data
- **Average RPM**: Estimated average engine RPM

The dialog displays memory requirements for each time period. Row data memory is subtracted from the total available memory.

The duration calculation accommodates channels with non-continuous sampling.

![Duration](../assets/remote-duration.png)

### Channel Configuration
- Up to 8 channels available.
- Parameters can be logged at different frequencies per channel.
- Prime Parameters (from ASAP file) are always logged in Channel 1.

### Controls

- Enable/Disable parameters.
- Set frequency (1–1000 Hz).
- Cycle logging per engine cycle.
- Segment logging via Synchro Pattern.
- Trigger setup per channel.

### Channel Trigger Dialog

- Start/Stop triggers defined by:
  - On data
  - Driver push button
  - Ignition on
  - Lap trigger
  - No condition
- Conditions: `Condition 1 OR (Condition 2 AND Condition 3)`
- Post-trigger delay supported.
- Multiple triggers per lap can be estimated.

## Burst Logging

Burst Logging stores high-frequency data in Burst Memory. It is often used with Wide Band Telemetry and supports export to ATLAS.

### Configuration Access

- Select `Logging > Burst Configuration`.
- If unavailable, create a new Burst Logging Configuration File.

### Configuration Tabs

- **Parameters**: Select parameters and assign to blocks.
- **Triggers**: Define start/stop conditions.
- **Session**: Set session metadata and telemetry settings.

### Parameters Tab
- Display options: Parameters, A Blocks, B Blocks.
- Parameters assigned to blocks with sampling intervals.
- Auto Assign and manual block assignment supported.
- Intervals range from lowest available to 16384 ms.

### Blocks
- **A Blocks**: 4 WORDs or 2 DWORDs.
- **B Blocks**: 8 WORDs or 4 DWORDs.
- Max 64 blocks per type.

### Intervals

- Minimum interval = number of blocks with parameters × 1 ms.
- Adjust interval by:
  - Moving parameters between blocks
  - Disabling parameters
  - Removing parameters
### Triggers Tab

- Start options:
  - Driver button
  - Ignition on
  - Engine started
  - Engine speed + throttle
- Stop options:
  - Speed below threshold
  - Memory end strategy (Stop when full / Wrap)

### Session Tab
- Metadata: Car ID, transmitter settings, frequency.
- Multi-Burst Coverage File support for ATLAS.
