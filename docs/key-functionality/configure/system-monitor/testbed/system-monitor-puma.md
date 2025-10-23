# System Monitor & PUMA Integration

System Monitor communicates with the AVL PUMA testbed system via a serial port using a software protocol. This integration enables automated tuning workflows.

## Communication Protocol

PUMA issues commands to System Monitor and receives replies. Supported operations include:

- Reading and modifying editable parameters
- Downloading parameters to the ECU
- Acquiring measurement parameters
- Selecting parameter description and binary data files

> Note: Only one project and one embedded data file can be active at a time.

## Parameter Management
- **Editable Parameters**: Can be read and changed
- **Measurement Parameters**: Can be acquired
- **Project Files**: Contain parameter descriptions
- **Embedded Data Files**: Contain binary data

## Link Control

Use the following commands from `Tools > Testbed`:

- **Enable Link**: Activates communication between System Monitor and the testbed
- **Message Window**: Displays communication logs
- **Configure**: Opens the Testbed Properties dialog

### Link Status Indicators

- **Enabled**: Link selected, no data received
- **Disabled**: Link not selected
- **Active**: Link selected, data received
- **Inactive**: Link selected, but timeout occurred

When the link is enabled:
- ECU goes online
- "PUMA enabled" appears in the status bar
- Live Tune is enabled if Full Operation mode is selected

If the ECU goes offline or Live Tune is disabled, the link is automatically disabled.

## Live Logging Configuration

System Monitor acquires ECU parameters based on the Live Logging Configuration. Ensure **Auto Configuration** is enabled to send and display correct data.
