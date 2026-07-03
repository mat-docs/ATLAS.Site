## Configuration

System Monitor allows users to customise the desktop layout, window behaviour, and display settings.

### Desktop Layout

Windows can be arranged freely across the desktop. Users can:

- Create multiple pages to organise windows by function
- Save and load desktop configurations
- Cascade or tile windows for visibility

### Pages

Pages act as tabs or layers within the desktop. Each page can contain a unique set of windows. Useful for separating calibration, diagnostics, and logging views.

### Fonts

Font size and style can be adjusted globally or per window. This improves readability, especially in high-density layouts.

### Axis Properties

Graphical windows (e.g. strip charts) allow axis configuration:

- **Range**: Set min/max values
- **Labels**: Custom axis labels
- **Scaling**: Linear or logarithmic

### Conversion Properties

Parameters may require conversion from raw values to engineering units. Conversion settings include:

- **Scaling factors**
- **Offsets**
- **Lookup tables** (if supported)

## Advanced Tools

### Shortcuts

System Monitor supports keyboard shortcuts for common actions:

- **Ctrl+S**: Save desktop
- **Ctrl+L**: Start/stop logging
- **Ctrl+E**: Open parameter explorer

Shortcuts can be customised in the settings menu.

### Mathematical Operators

Used in virtual parameters and data analysis. Supported operators include:

- Basic arithmetic: `+`, `-`, `*`, `/`
- Logical: `AND`, `OR`, `NOT`
- Comparison: `>`, `<`, `==`

### Number Formats

Parameters can be displayed in various formats:

- Decimal
- Hexadecimal
- Scientific notation

Format is set per parameter or window.

### Parameter Unlock List

Some parameters are locked by default. Unlocking requires appropriate permissions and may involve entering a password or key.

### Advanced Settings

To open Advanced Settings, go to **Tools > Advanced Settings**. Some settings take effect
immediately, some require reconnecting to the ECU, and some require restarting System Monitor —
this is called out per setting below. Settings are grouped by area to make them easier to find.

!!! note "Version note"
    Settings and defaults below reflect System Monitor 8.87.2. If you are running an older
    version, a setting's default may differ from what is shown here.

#### Startup and project behaviour

| Setting Name | Options Available | Description of Setting | Default | Restart/Reconnect required |
|---|---:|---|---|---|
| Enable Multiple Instances | Y / N | Allow multiple instances of System Monitor to run simultaneously on the PC. | Y | No |
| Open most recently used project | Y / N | Open the most recently used project when System Monitor starts. | N | No |
| Go online when opening project | Y / N | Put the ECU On-Line automatically when a project is opened. | N | No |
| Warn if Program Versions do not match | Y / N | If Y, a mismatch prevents ECU being put On-Line and shows a message box; if N the message is ignored. | N | No |
| Prompt for unit connection on opening project | Y / N | If N, automatically attempt connection to the last unit connection used for the project. | Y | No |
| Enable livetune on opening project | Y / N | If Y, start livetune immediately after project open and unit connection. | N | No |
| Default Explorer display to collapsed view | Y / N | If Y, the Parameter Explorer starts collapsed instead of expanded. | N | No |

#### Data versions and team security

| Setting Name | Options Available | Description of Setting | Default | Restart/Reconnect required |
|---|---:|---|---|---|
| Search base for versions | Y / N | Controls search base for versions (see ECU Search). | N | No |
| Format data version text | Y / N | Control formatting of data version text (see ECU Bar). | N | Restart |
| Enable Data Version Security | Y / N | Enable Team Security globally for data versions. | Y | No |
| Directory for Parameter Unlock List files | Path | Directory used to list parameters accessible by restricted teams. Leave blank to use System Monitor's default location. | (blank) | No |
| Search base for non-active versions | Y / N | When N, multi-application base is not searched for non-active application DTVs. | Y | No |
| Enable Parameter Offset | Y / N | If N, disable the zero offset button and value offset input in parameter properties. | Y | No |
| Auto save DTV changes | Y / N | Auto-save modified data versions when necessary without prompting; saved to next incremented version. | N | No |
| Enable Enhanced RDA DTV unlocking | Y / N | Allow RDA settings on Enhanced RDA2 DTVs to be disabled. | N | No |
| Disable DTV backup | Y / N | If Y, DTV backup files are not created/updated after each edit (performance improvement). | N | Restart |
| Default Virtual Parameter format to XML | Y / N | If N, revert Virtual Parameter file save format to historical binary VPM format. | Y | Restart |
| Disable Search for DTV on opening PGV | Y / N | If Y, disable multi-application search after PGV change (may improve performance). | N | No |
| Use Encrypted Parameter Unlock List Files | Y / N | If Y, Parameter Unlock List files are read/written in an encrypted format. | N | No |

#### Backups and file locations

| Setting Name | Options Available | Description of Setting | Default | Restart/Reconnect required |
|---|---:|---|---|---|
| Save Document Backups | Y / N | Automatically save backup copies of documents. | N | No |
| Directory for backup files | Path | Override default location for backup files. Leave blank to use System Monitor's default location. | (blank) | No |
| Directory for configuration and macro files | Path | Location of logging configuration files and macros. Leave blank to use System Monitor's default location. | (blank) | No |
| Directory for exporting logging files | Path | Location for exported logging configuration files. Leave blank to use System Monitor's default location. | (blank) | No |
| Ident translation file | Path | Pathname of the file used to translate parameter identifiers when they change between versions. | (blank) | Restart |
| File for sensor calibration | Path (.prm) | Pathname of the .prm sensor calibration file; System Monitor requires the correct path to locate it. Leave blank to use System Monitor's default location. | (blank) | No |
| File for unit IP addresses | Path | Pathname of the Unit Definition file used to resolve unit IP addresses. Leave blank to use System Monitor's default location. | (blank) | No |

#### Logging configuration

| Setting Name | Options Available | Description of Setting | Default | Restart/Reconnect required |
|---|---:|---|---|---|
| Logging Config ID Seed | 0 – 3 | Seed applied to Logging Config ID to help ensure unique config IDs between units. | 0 | No |
| Limit Logging To MAX_REFRESH | Y / N | If Y, enforce maximum refresh rates for parameter logging; if N, allow rates above max with warning. | N | No |
| Session Row Logging Interval (ms) | Numeric (ms) | Interval for session row logging in milliseconds. | 1000 | No |
| Directory for log files | Path | Location for System Monitor's own log files. Leave blank to use System Monitor's default location. | (blank) | Reconnect |
| Enable log file per project | Y / N | Create log files unique to each project name to aid identification when switching projects. | N | Restart |
| Automatic IP Message Logging | Y / N | If Y, a new message log is started when the project is opened or unit selection changes; if N, logging is controlled by the Record button. | N | Reconnect |
| Message log level (for debugging) | Levels / Not Logging | Enable logging of System Monitor messages for debugging. | Not Logging | Reconnect |
| Message log file size (MB) | Numeric (MB) | Sets the size limit for the message log. | (blank) | Reconnect |
| Export Extended MESL Config Binary | Y / N | Enable MCB Writer to export a binary MCB containing logging/telemetry description and IDs. | N | No |
| Log Single Messages | Y / N | If Y, log single messages from Active-X or GUI to individual log files. | N | No |

#### Sensors

| Setting Name | Options Available | Description of Setting | Default | Restart/Reconnect required |
|---|---:|---|---|---|
| Enable New Sensor Subset Upload | Y / N | Enable upload of new sensor subsets. | N | No |
| Prompt New Sensor Subset Upload | Y / N | Enable a prompt when uploading new sensor subsets. | N | No |
| Zero Offset Sampling Time (ms) | Numeric (ms) | Duration for sampling to compute an average zero offset value. | 5000 | No |

#### Comms and ECU link

| Setting Name | Options Available | Description of Setting | Default | Restart/Reconnect required |
|---|---:|---|---|---|
| Timeout before link lost (ms) | Numeric (ms) | Time System Monitor will attempt to send a message before treating the link as lost. | 2000 | No |
| Read Ram View Timeout | Numeric (ms) | Timeout for Read RAM view operations. | 100 | No |
| Use extended read RAM messages | Y / N | Use extended read RAMs if the unit supports them (faster large reads). | Y | Reconnect |
| Use extended write RAM messages | Y / N | Use extended write RAMs if the unit supports them (faster large writes). | N | No |
| Enable FIA lock checking | Y / N | Check for FIA-locked ECUs before reprogramming and prevent programming of not-permitted versions. | N | No |
| Default message timeout (ms) | Numeric (ms) | Timeout for messages sent to the unit. | 200 | No |
| Disable Encrypted Comms | Y / N | If Y, disables encrypted comms (enables network logging but disables some programming features). | N | Reconnect |
| Preferred port for unit link | Port (hex/dec) | Default starting port for unit connection; if unavailable, the port is incremented and retried. | 0xC000 (49152) | No |
| Increase ECU Bar display contrast | Y / N | Change ECU Bar text colours for greater contrast in bright conditions. | N | Reconnect |

#### ECU programming and control

| Setting Name | Options Available | Description of Setting | Default | Restart/Reconnect required |
|---|---:|---|---|---|
| Enforce Prime Parameter requirements | Y / N | Allow Prime Parameters to be toggled per Application via the Parameter Explorer context menu. | Y | No |
| Enable Matlab Export after each parameter tune | Y / N | Control writing of Tune Log entries and Matlab export after parameter tunes. | N | No |
| Enable Matlab Export after DataWizard Merge | Y / N | Control Matlab/Tune Log export after DataWizard merges. | N | No |
| ECU Read Only mode | Y / N | When Y, user cannot modify values on the ECU. | N | No |
| Prompt for confirmation on Remote Reset | Y / N | If N, remote reset executes without a confirmation prompt. | N | No |
| Enable Multi Document Options in Open Dialog | Y / N | When N, open dialog does not offer multi-document options for CAN and remote logging configs. | Y | No |
| Minimum default time before leave boot (ms) | Numeric (ms) | Minimum time before sending the leave boot message at end of programming. | 0 | No |
| Enable Enhanced Slow Row | Y / N | Enables the enhanced slow row acquisition mechanism. | Y | Restart |

#### Miscellaneous and integration

| Setting Name | Options Available | Description of Setting | Default | Restart/Reconnect required |
|---|---:|---|---|---|
| Enable export of associated documents with project export | Y / N | Include Program Version documents when exporting a project to reduce manual inclusion. | N | No |
| Enable Unit.Def configuration | Y / N | Replace Customer Base project management with Unit.Def file management. | N | Restart |
| Suppress Licence Expiry Warnings | Y / N | If Y, System Monitor does not show warnings when a licence is due to expire. | N | No |
| Enable Remote Configuration Upload | Y / N | Allow remote configuration to be uploaded from the ECU. | Y | No |
| Enable FFC creation for PGV and Logging Configuration | Y / N | Enable creation of an FFC file alongside PGV and Logging Configuration files. | N | No |
| Suppress 'Not live-tuneable' warning during import | Y / N | If Y, suppresses the warning normally shown when importing parameters that are not live-tuneable. | N | No |
| Auto-increment filename for all numerically terminated files on save | Y / N | If Y, automatically increments a trailing number in the filename each time a file is saved. | N | No |
| Enable Logging of API Calls | Y / N | Enable logging of calls made through System Monitor's API. | N | No |
