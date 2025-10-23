# Testbed properties

## Link

The **Link** tab in the Testbed Properties dialog allows configuration of the communication link between System Monitor and the AVL PUMA testbed.

### Accessing the Link Tab

Navigate to:  
`Tools > Testbed > Configure`  
Then select the **Link** tab.

### Link Modes

Choose the desired mode from the dropdown list:

- **Measurement**  
  - System Monitor responds only to Initialisation and Data Acquisition commands.
  - Suitable for basic data collection.

- **Full Operation**  
  - System Monitor responds to all commands from PUMA.
  - Enables full tuning and control capabilities.

### Serial Communication Setup

Click **Comms Setup** to open the Serial Comm Setup dialog.

- Default settings are suitable for most applications.
- If communication fails, verify settings against your testbed requirements.
- Settings are saved per project and may need adjustment for each use case.

> Note: The link configuration is stored as part of the project settings.

##  Watchdog

The **Watchdog** tab in the Testbed Properties dialog allows configuration of timeout behaviour between System Monitor and the PUMA testbed.

### Accessing the Watchdog Tab

Navigate to:  
`Tools > Testbed > Configure`  
Then select the **Watchdog** tab.

### Message Timeout

#### Controls

- **Time Between**  
  - Defines the maximum allowable time between messages.
  - Range: `0.1 to 36000 seconds`  
  - Resolution: `0.1 seconds`  
  - Default: `300 seconds`

- **Enabled?**  
  - If checked, the link is terminated when the timeout is exceeded.
  - The link is automatically re-established by the PUMA testbed.

### Byte Timeout

#### Controls

- **Time Between**  
  - Defines the maximum allowable time between bytes of the same message.
  - Range: `0.1 to 100 seconds`  
  - Resolution: `0.1 seconds`  
  - Default: `1 second`

> Note: Byte Timeout is always enabled.

⚠️ **Important:**  
Watchdog properties cannot be modified while the Testbed Link is enabled.

See also:  
- testbed-properties-link.md

## Debug

The **Debug** tab in the Testbed Properties dialog allows configuration of the debug file used to log communication between System Monitor and the PUMA testbed.

### Accessing the Debug Tab

Navigate to:  
`Tools > Testbed > Configure`  
Then select the **Debug** tab.

### Debug Settings
- **Debug Enabled?**  
  - When checked, all text shown in the Testbed Message Window is copied to the debug file.
  - If the file already exists, new entries are appended.

- **Debug File**  
  - Specify the name and path of the file where debug information will be saved.
  - Default filename: `tb_debug.txt`  
  - No default path is provided.

> ⚠️ The debug filename cannot be changed while the Testbed Link is enabled.  
> However, debug logging can still be toggled on or off.

### Use Case

Enabling debug logging is useful for:
- Diagnosing communication issues
- Tracking command sequences
- Reviewing parameter exchanges

## Commands

The **Commands** tab in the Testbed Properties dialog allows configuration of how System Monitor responds to commands issued by the PUMA testbed.

### Accessing the Commands Tab

Navigate to:  
`Tools > Testbed > Configure`  
Then select the **Commands** tab.

### Command Confirmation

- **Send command confirmation to PUMA?**  
  - When enabled, System Monitor sends a confirmation message before the definitive reply.
  - This is useful when System Monitor cannot complete a command within the expected time.
  - The confirmation extends the time available for execution and allows the reply to be sent later.

> Each command has a checkbox. If selected, that command will be confirmed before the reply is sent.

### Command Naming
- **View as**  
  - PUMA and System Monitor use different command names.
  - You can choose to view commands using either:
    - PUMA terminology
    - System Monitor equivalents

This setting helps align the interface with the user's preferred terminology or protocol documentation.

## Translate

The **Translate** tab in the Testbed Properties dialog allows configuration of parameter identifier translation between System Monitor and the PUMA testbed.

### Accessing the Translate Tab
Navigate to:  
`Tools > Testbed > Configure`  
Then select the **Translate** tab.

### Translation Settings

- **Command translation enabled?**  
  - When selected, System Monitor translates parameter identifiers between its own format and PUMA’s format.
  - This applies to both incoming and outgoing commands.

- **Translation file**  
  - Specify the path and filename of the translation file.
  - This file contains the equivalence list used for identifier mapping.

> The translation file ensures compatibility between differing naming conventions used by System Monitor and PUMA.

### Use Case

This feature is essential when:
- Integrating systems with differing parameter naming schemes
- Ensuring consistent interpretation of commands and data