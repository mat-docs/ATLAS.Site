InPlace Control acts as the vTAG Server for both live and historic processing of ATLAS data.

vTAG Server contains 6 tabs plus a bottom control section showing Process State and Progress. All vTAGServer settings are saved within the workbook.

## Tabs:
- **Settings** – configure vTAGServer
- **Status** – view processing and recording information
- **Reset** – vECU control
- **APP Info** – view information on APPs
- **Log** – view logging output
- **Control section** – operate the model and view progress

## Settings Tab

### Live Mode
In Live Mode you can:
- Set the IP address
- Check/uncheck parameter options
- Stop the model

### Historic Mode
In Historic Mode you can:
- Set .ssv file name
- Set calculation period
- Play and stop the model

### General Workflow
1. Choose Live or Historic from the Mode list.
2. Choose your own IP address (the machine running ATLAS).
3. In Historic Mode, specify a session name (part used by extension manager). If omitted, the .ssv file name matches the .ssn file.
4. Define the Calculation Period:
    - Session
    - Current Lap
    - Fastest Lap
    - All Timed Laps
    - Current Time Base
5. Wait for parameters up to X seconds.
6. Re‑run model on cable data – when enabled, VTS recorder records during ATLAS wire‑link upload and generates a new .ssv file.
7. Use coverage cursor (Live only) – recommended. Ensures Apps run on complete data.
8. Channel latency (up to 4s) is considered.
9. Auto reload historic run – automatically loads .ssv after generation.
10. Delay – apply constant delay without using coverage cursor.

## Status Tab
Displays:
- Logging Status
- Memory Size (MB)
- Memory Used (MB)
- Parameter List – parameters created by vTAGServer

### Possible Logging States
- Cleared
- Cleared to Logging
- Stopped
- Logger Only
- Telemetry Only
- End of Logging Pending
- Download Request
- Download Pending
- Download
- Full Reset Request
- Erase
- Disabled
- Reconfiguration Request
- Reconfiguration

## Reset Tab
- **Reset virtual ECU** – reinitialises applications, BIOS, and logging memory.
- **Clear vECU** – removes PGVs and logging configuration. Use whenever programming a new PGV via System Monitor.

## APP Info Tab
Shows:
- Models running per APP
- BIOS usage
- Parameters and PGVs used

## Log Tab
Displays the log, also saved as a standard log file.
### Options:
- **Autoscroll** – disable to stop auto‑scroll
- **Filter out trace** – filters debug information

## Control Section

### Live Mode
- Start/Stop the model

### Historic Mode
- Play/Stop the model
- Progress bar shows processing progress
- Progress may pause temporarily while searching for PGVs

### Process States
- Stop
- Stopped on Error
- Running Live
- Running after Upload
- Running Historic


!!! tip
    - The Process States and the progress are shown in the 'control' part.
    - When running live, no progress is shown. When running on Wire Link Upload or Historic, you can see the progress.
    - Note that in Historic mode the progress bar sometimes 'holds'  for a few seconds. vTAGServer is then searching for the PGV's (this will be shown in the Status Bar of ATLAS Viewer)
