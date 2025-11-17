# Sensor Configuration

Configure and calibrate sensors in TAGtronic systems to convert physical properties into electrical signals for logging and analysis.

System Monitor has the following facilities to configure the way that Sensors are used:

- Sensors & Actuators - Used to apply Calibration data to sensors, enable/disable individual sensors and enter values for sensor constants. Used on sensors and actuators defined in the Program Version.
- External Inputs Configuration - Used to configure sensor inputs and apply Calibration data to sensors connected to the ECU. Used on sensors that are not defined in the Program Version. Also used to configure systems using communication links such as TAG Sensor Bus or CAN.
- Sensor Calibration Tool - Used to view and edit sensor calibration curves.

## Configuration Tools

### [Sensors & Actuators](./sensors-and-actuators.md)
For Program Version defined sensors:
- Apply calibrations
- Enable/disable sensors
- Assign serial numbers
- Set sensor constants

!!! note
    Requires associated Sensor Set file

### [External Inputs Configuration](./external.md) 
For non-Program Version sensors:
- Set up input sources and buses
- Configure and assign sensors
- Apply calibrations
- Supports drag-and-drop

## [Software Calibration](./software-calibrated-sensors.md)

TAGtronic systems use lookup tables for software calibration:
- `.dat` files contain calibration data
- Convert to `.bcf` using `Sbinary.exe`
- Store in Multi-Application Base root

!!! important
    Sbinary must be configured in Advanced Settings
