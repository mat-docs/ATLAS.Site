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

To open Advanced Settings, go to **Tools > Advanced Settings**. System Monitor will need restarting if any changes are made to these settings, The table below describes each setting:

| Setting Name | Options Available | Description of Setting | Default |
|---|---:|---|---|
| Enable Multiple Instances | Y / N | Allow multiple instances of System Monitor to run simultaneously on the PC. | Y |
| Automatic IP Message Logging | Y / N | If Y, a new message log is started when the project is opened or unit selection changes; if N, logging is controlled by the Record button. | N |
| Open most recently used project | Y / N | Open the most recently used project when System Monitor starts. | N |
| Message log level (for debugging) | Levels / Not Logging | Enable logging of System Monitor messages for debugging (developer use). | Not Logging |
| Go online when opening project | Y / N | Put the ECU On-Line automatically when a project is opened. | N |
| Message log file size (MB) | Numeric (MB) | Sets the size limit for the message log (developer use). | Not specified |
| Warn if Program Versions do not match | Y / N | If Y, a mismatch prevents ECU being put On-Line and shows a message box; if N the message is ignored. | N |
| Enable export of associated documents with project export | Y / N | Include Program Version documents when exporting a project to reduce manual inclusion. | N |
| Search base for versions | Y / N | Controls search base for versions (see ECU Search). | N |
| Enable Data Version Security | Y / N | Enable Team Security globally for data versions. | Y |
| Format data version text | Y / N | Control formatting of data version text (see ECU Bar). | N |
| Directory for Parameter Unlock List files | Path | Path and filename for the Unlock File used to list parameters accessible by restricted teams; default is .pgv location unless overridden. | Same as .pgv (unless specified) |
| Directory for backup files | Path | Override default location for backup data versions. | Not specified |
| Prompt for unit connection on opening project | Y / N | If N, automatically attempt connection to the last unit connection used for the project. | Y |
| Directory for configuration and macro files | Path | Location of logging configuration files and macros (default: path\config under System Monitor install). | path\config (System Monitor install) |
| Enable livetune on opening project | Y / N | If Y, start livetune immediately after project open and unit connection. | N |
| Directory for exporting logging files | Path | Location for Burst Logging export files (default: path\Config\Logging\AutoConfig). | path\Config\Logging\AutoConfig |
| Search base for non-active versions | Y / N | When N, multi-application base is not searched for non-active application DTVs. | Y |
| Logging Config ID Seed | 0–3 | Seed applied to Logging Config ID to help ensure unique config IDs between units. | Not specified |
| Export Extended MESL Config Binary | Y / N | Enable MCB Writer to export a binary MCB containing logging/telemetry description and IDs. | N |
| Limit Logging To MAX_REFRESH | Y / N | If Y, enforce maximum refresh rates for parameter logging; if N, allow rates above max with warning. | N |
| Enable Parameter Offset | Y / N | If N, disable the zero offset button and value offset input in parameter properties. | Y |
| Enforce Prime Parameter requirements | Y / N | Allow Prime Parameters to be toggled per Application via the Parameter Explorer context menu. | Y |
| ECU Read Only mode | Y / N | When Y, user cannot modify values on the ECU. | N |
| Session Row Logging Interval (ms) | Numeric (ms) | Interval for session row logging in milliseconds. | Not specified |
| Auto save DTV changes | Y / N | Auto-save modified data versions when necessary without prompting; saved to next incremented version. | N |
| File for sensor calibration | Path (.prm) | Pathname of the .prm sensor calibration file; System Monitor requires correct path to locate it. | Not specified |
| Prompt for confirmation on Remote Reset | Y / N | If N, remote reset executes without a confirmation prompt. | Y |
| Enable New Sensor Subset Upload | Y / N | Enable upload of new sensor subsets. | N |
| Enable Multi Document Options in Open Dialog | Y / N | When N, open dialog does not offer multi-document options for CAN and remote logging configs. | Y |
| Prompt New Sensor Subset Upload | Y / N | Enable a prompt when uploading new sensor subsets. | N |
| Minimum default time before leave boot (ms) | Numeric (ms) | Minimum time before sending the leave boot message at end of programming. | Not specified |
| Zero Offset Sampling Time (ms) | Numeric (ms) | Duration for sampling to compute an average zero offset value. | Not specified |
| Default message timeout (ms) | Numeric (ms) | Timeout for messages sent to the unit. | 200 ms |
| File for unit IP addresses | Path | Pathname of the Unit Definition file (default: path\unitfile.ini in ATLAS/System Monitor install folder). | path\unitfile.ini (installation folder) |
| Enable Enhanced RDA DTV unlocking | Y / N | Allow RDA settings on Enhanced RDA2 DTVs to be disabled. | N |
| Timeout before link lost (ms) | Numeric (ms) | Time System Monitor will attempt to send a message before treating the link as lost. | Not specified |
| Disable Encrypted Comms | Y / N | If Y, disables encrypted comms (enables network logging but disables some programming features). | N |
| Read Ram View Timeout | Numeric (ms) | Timeout for Read RAM view operations. | Not specified |
| Disable DTV backup | Y / N | If Y, DTV backup files are not created/updated after each edit (performance improvement). | N |
| Use extended read RAM messages | Y / N | Use extended read RAMs if BIOS supports them (faster large reads). | Y |
| Default Virtual Parameter format to XML | Y / N | If N, revert Virtual Parameter file save format to historical binary VPM format. | Y |
| Use extended write RAM messages | Y / N | Use extended write RAMs if BIOS supports them (faster large writes). | N |
| Disable Search for DTV on opening PGV | Y / N | If Y, disable multi-application search after PGV change (may improve performance). | N |
| Enable FIA lock checking | Y / N | Check for FIA-locked ECUs before reprogramming and prevent programming of not-permitted versions. | N |
| Preferred port for unit link | Port (hex/dec) | Default starting port for unit connection; if unavailable, port ID is incremented and retried. | 0xC000 |
| Enable Matlab Export after each parameter tune | Y / N | Control writing of Tune Log entries and Matlab export after parameter tunes. | N |
| Increase ECU Bar display contrast | Y / N | Change ECU Bar text colours for greater contrast in bright conditions. | N |
| Enable Matlab Export after DataWizard Merge | Y / N | Control Matlab/Tune Log export after DataWizard merges. | N |
| Log Single Messages | Y / N | If Y, log single messages from Active-X or GUI to individual log files. | N |
| Directory for log files | Path | Location for current system logs (default: drive where System Monitor is installed). | Installation drive |
| Enable Unit.Def configuration | Y / N | Replace Customer Base project management with Unit.Def file management. | N |
| Enable log file per project | Y / N | Create log files unique to each project name to aid identification when switching projects. | N |
