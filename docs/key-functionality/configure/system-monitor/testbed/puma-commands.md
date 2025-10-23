# PUMA Commands

System Monitor supports a subset of commands from the AVL PUMA protocol V2.0. Commands from V1.0 or its sub-versions are not supported.

All values exchanged use engineering units for:
- Measurement parameters
- Editable parameters
- Map breakpoints
- Plausible physical limits
- Minimum increments

---

## 1. Initialisation Commands

### `Init`
Initialises System Monitor for a PUMA tuning session.

When received:
- Starts the Watchdog (if enabled)
- Opens the Debug File (if enabled)

### `Identify`
Sent by PUMA to declare protocol version and identify itself.

- If version is V2.0 or later: System Monitor replies with its version (V7.0)
- If version is V1.0 or sub-version: System Monitor replies with `command not available` error and rejects all subsequent commands

---

## 2. Configuration Commands

### `Select Project and Embedded Data`
Must follow an `Init` command.

PUMA must provide:
- Project file name
- Embedded data file name

System Monitor checks program stamps for compatibility. If valid:
- Opens project and embedded data file
- Returns LUN = 1

### `Copy Embedded Data`
Copies data from edit buffer to file.

PUMA must specify:
- Source = 3 (edit buffer)
- Destination = 2 (file)
- LUN = 1

System Monitor writes:
- New data stamp (if filename changed)
- Comment (includes changed parameters and PUMA name)
- User name and date
- Editable parameter values

### `Change Embedded Data Filename`
Changes the filename for future saves.

- Does not save data
- If filename is invalid, returns `error during execution`

---

## 3. Map Manipulation Commands

### `Select Map`
PUMA nominates a map to read or modify.

System Monitor returns:
- Map number
- Number of breakpoints (x and y axes)

If invalid or not a map, returns `error during execution`.

### `Get Map from System Monitor`
Returns:
- Breakpoint values
- Map site values
- Minimum increment
- Plausible physical limits

### `Put Map to System Monitor`
Sets map values as specified by PUMA.

- Ignores increment and limits
- Caps values outside limits without error
- Returns error if breakpoints are out of sequence

### `Get Map Value`
Returns value of a single map site.

PUMA must specify:
- Map number
- x and y index

### `Set Map`
Sets all map sites in a grid range to a single value.

Returns error if:
- Grid range is off-map
- Values are capped if outside limits (no error sent)

### `Increase Map`
Increases map site values in a grid range.

Returns error if:
- Grid range is off-map
- Values are capped if outside limits (no error sent)

---

## 4. Scalar Manipulation Commands
### `Get Scalar from System Monitor`
PUMA must send:
- LUN = 1
- Parameter identifier

System Monitor returns:
- Scalar value
- Plausible physical limits
- Minimum increment
> Cannot be used for measurement parameters.

### `Set Scalar on System Monitor`
PUMA must send:
- LUN = 1
- Parameter identifier
- Value

Returns error if:
- Parameter is not editable
- Value is capped if outside limits (no error sent)

---

## 5. Data Acquisition Commands

### `Select Parameters for Acquisition`
Specifies parameters to be acquired.

PUMA must send:
- LUN = 1
- Sampling rate
- List of parameter identifiers

- Multiple commands append to the list
- Empty list clears all selections
- Updates Live Logging Configuration

Returns error if parameter is not in project description.

### `Switch Offline/Online`
Switches ECU mode.

#### Online Mode:
- Downloads edit buffer changes immediately
- Generates new data stamp
- Accepts `Acquire Parameters` commands

#### Offline Mode:
- Changes affect edit buffer only
- No data is downloaded
- `Acquire Parameters` commands are rejected

> ⚠️ Caution: Switching modes without saving may result in data loss.

### `Acquire Parameters`
Requests current values for selected parameters.

Returns:
- List of parameter values (in order)

If offline, returns `command not executed`.

---

## 6. Special Parameters

### `APS_Errors`

#### `Get Scalar`
Returns:
- Number of errors since link enabled
- Min = 0, Max = defined limit, Increment = 1

#### `Set Scalar`
Returns `error during execution`

#### `Select Parameters for Acquisition`
Includes error count in response to `Acquire Parameters`

---

### `APS_LinkOK`

#### `Get Scalar`
Returns:
- 1 if link is active
- 0 if link is inactive

#### `Set Scalar`
Returns `error during execution`

#### `Select Parameters for Acquisition`
Includes link status (1 = active, 0 = inactive)

---

## 7. Unsupported Commands

System Monitor does **not** support the following PUMA commands:

### Initialisation
- `Emergency`

### Recording
- `Define Recording Parameters`
- `Define Trigger Parameters`
- `Activate Recorder`
- `Get Recorder Status`
- `Get Recorder Result Header`
- `Get Recorder File`
- `Save Recorder File`
- `Load Recorder File`

### Miscellaneous
- `Set Graphic Mode`
- `Reset Device`
- `Set Format`

---

## 8. Error Handling

System Monitor may return the following errors:

- **`command not executed`**  
  Incorrect command sequence

- **`error during execution`**  
  Invalid arguments or external error (e.g. disk full)

- **`command not available`**  
  Command not supported in PUMA protocol V2.0

> All errors include an error code and comment.  
> Errors are visible in the Testbed Message Window.

---

## 9. PUMA Errors

Although PUMA is designed for unattended tuning, commands may occasionally fail. System Monitor can return the following error messages:

### `command not executed`
- The command could not be executed due to an incorrect sequence.
- Example: A configuration command sent before initialisation.

### `error during execution`
- The command started but could not complete.
- Causes may include:
  - Invalid command arguments (e.g. non-existent project file)
  - External issues (e.g. disk full)

### `command not available`
- The command is not supported in PUMA protocol V2.0.
- Typically occurs when using commands from V1.0 or unsupported groups.

### Error Details
- Each error includes:
  - An error code
  - A comment generated by System Monitor

### Viewing Errors
- Errors are displayed in the **Testbed Message Window**
- The **Last Error** field in the status bar shows the most recent error, even if the link has recovered

> ⚠️ Reminder: System Monitor only supports one project at a time.  
> The LUN parameter must always be set to `1`. Any other value will trigger an `error during execution`.

---

## Notes

- Only one project may be active at a time
- LUN must always be set to `1`; other values will trigger an error