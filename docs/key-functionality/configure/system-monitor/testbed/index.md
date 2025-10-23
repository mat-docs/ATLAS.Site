# Testbed Operation Overview
The System Monitor can be integrated with an AVL PUMA testbed system to enable unattended tuning. Communication between the PUMA system and System Monitor is established via a serial port using the ASAP3-compliant protocol.

## Supported Protocols

- AVL ECU Application System Interface – SERIAL V1.0
- AVL ECU Application System Interface – V2.0 Serial (Translation)

## Capabilities

Using this setup, PUMA can:
- Read and modify editable parameters
- Download editable parameters to the ECU
- Acquire measurement parameters
- Select parameter description and binary data files

> Note: Only one project (description) and one embedded data (binary) file can be active at a time.

## Accessing Testbed Commands

Navigate via: `Tools > Testbed`

Available commands:
- **Configure**: Opens the Testbed Properties dialog (`CTRL+SHIFT+F5`)
- **Enable Link**: Toggles the testbed link (`CTRL+SHIFT+F6`)
- **Message Window**: Opens the communication log (`CTRL+SHIFT+F7`)

## Link Status

When the link is enabled:
- ECU is set to Online
- "PUMA enabled" appears in the status bar
- Live Tune is enabled if Full Operation mode is selected
- Link is disabled if ECU goes offline or Live Tune is disabled

System Monitor windows can display parameter values during active link sessions. The Testbed Message Window shows link status and data exchange.

Ensure **Auto Configuration** is enabled to send and display correct data.