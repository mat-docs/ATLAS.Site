# Sensor Configuration

Configure and calibrate sensors in TAGtronic systems to convert physical properties into electrical signals for logging and analysis.

## Sensor Types

- Program Version sensors - Configure via Sensors & Actuators tool
- External inputs - Configure via External Inputs Configuration tool

## Configuration Tools

### Sensors & Actuators
For Program Version defined sensors:
- Apply calibrations
- Enable/disable sensors
- Assign serial numbers
- Set sensor constants

> **Note:** Requires associated Sensor Set file

### External Inputs Configuration 
For non-Program Version sensors:
- Set up input sources and buses
- Configure and assign sensors
- Apply calibrations
- Supports drag-and-drop

## Software Calibration

TAGtronic systems use lookup tables for software calibration:
- `.dat` files contain calibration data
- Convert to `.bcf` using `Sbinary.exe`
- Store in Multi-Application Base root

> **Important:** Sbinary must be configured in Advanced Settings

## Calibration Tool

Access via: `Sensors > Live Calibration`

Features:
- View/edit calibration curves
- Manual and live calibration support
- Voltage to engineering value mapping

### Live Calibration Process
1. Connect sensor in External Inputs
2. Apply known loads
3. Put ECU online
4. Select parameter
5. Enter values at voltage points
6. Save calibration

## Sensor Management

### Calibration Data
- Use Get Sensor Data Utility for McLaren Applied sensors
- Connect to TAG network
- Run gs utility
- Enter codes and serial numbers

!!! warning
    Do not manually edit .dat files

### Sensor Sets
- Store in \SenSets\ directory
- Save as XXXXXnnn.set
- Upload/download via Unit Status

### Serial Numbers
- Assign via dropdown
- Support sequential assignment
- Check for duplicates
- Also configurable in External Inputs

### Constants
- Enter in Sensors & Actuators
- Organize on separate tabs
- Download with Sensor Set

### Enable/Disable
- Control via Enable/Disable dialog
- Affects connected ECU only
- Changes not stored in Sensor Set
