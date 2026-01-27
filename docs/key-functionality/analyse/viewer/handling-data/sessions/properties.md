# Editing and Understanding Session Properties

The Session Properties Panel in ATLAS provides detailed metadata for each Session. This information is essential for identifying, organising, and aligning Sessions for analysis. Some properties are editable, allowing users to customise or correct Session details, while others are read-only and automatically populated by the system.

## Session Identifier Macros

Session Identifiers (aka _names_) help you identify recorded sessions.

ATLAS provides formatting macros to fill in parts of the identifier automatically.  
You can include them in the identifier when configuring a recorder.

!!! tip

    These macros can also be used in Session Details (metadata).

### Time Codes

These codes format the session identifier from the time of recording:

| Macro  | Description
| ------ | -------------------------------------------- |
| `%y`   | Year (Short form - 2 digits: 00 to 99)       |
| `%Y`   | Year (Long form - 4 digits: 0000 to 9999)    |
| `%m`   | Month (2 digits: 01 to 12)                   |
| `%d`   | Day of month (2 digits: 01 to 31)            |
| `%H`   | Hour (2 digits: 00 to 23)                    |
| `%M`   | Minute (2 digits: 00 to 59)                  |
| `%S`   | Second (2 digits: 00 to 59)                  |

!!! example

    `%y%m%d%H%M%S` = `210730140617` _at 2021-07-30 14:06:17 local time_

### Session Details

These codes incorporate standard session details (metadata):

| Macro  | Session Detail
| ------ | -------------------------------------------- |
| `%a`   | _Car_                                        |
| `%c`   | _Circuit_                                    |
| `%e`   | _Engine_                                     |
| `%r`   | _Driver_                                     |
| `%n`   | _Session Number_                             |
| `%t`   | _Race/Test_                                  |
| `%O`   | _Unit Data Source_ (populated automatically) |

### Parameter Data

To extract parameter values, use `${param}$`, where `{param}` is the parameter identifier or name.

This is commonly used together with text conversions &mdash; to spell out driver initials, for example.

!!! example

    `$NDriverInitial1$$NDriverInitial2$$NDriverInitial3$_$NFOMRacingNo$` = `HAM_44`

If the parameter is not present &mdash; for example, while configuration is being processed &mdash; the macro will not be expanded.

## Accessing the Session Properties Panel

To view or edit Session properties:

1.  Open the Session Browser.
2. Select a Session from the Session List.

The Session Properties Panel will appear, displaying all available metadata for the selected Session.

!!! tip 
    Editable fields are shown in white. Read-only fields are shown in grey.

## Editable Session Properties

These fields can be modified directly in the Session Properties Panel. Click on the value to edit it.

**Property**|**Description**
:-----:|:-----:
Session Name|The name assigned to the Session. Automatically generated but can be renamed for clarity.
Session Number|A numeric identifier. If the name ends in a number, it is incremented with each new recording. A blank entry is not incremented. Default is 1.
Pit Lane Trigger|Defines the position of the pit lane trigger relative to the team pit box. Options: None, After Pit, Before Pit.
Session Description|Free text field for describing the Session’s purpose or context.
Driver|Name of the driver for the Session.
Car|Identifier or name of the car used.
Engine Description|Description of the engine configuration.
Circuit|Name of the circuit or track.
Race/Test|Indicates whether the Session was part of a race or a test.
Chassis Number|Identifier for the chassis used.
Note 1 / Note 2 / Extra Notes|Free text fields for additional comments or observations.
Weather|Description of weather conditions during the Session.
Version|Optional versioning field for tracking changes or configurations.
Lap Trigger Offset|Distance (in metres) from the lap trigger to the Start/Finish line. Negative values = Start/Finish is ahead of the trigger. Positive values = behind. Used to align data across Sessions with different trigger positions.

!!! tip
    Use consistent naming conventions and metadata values to make filtering and comparison easier across large datasets.

## Read-Only Session Properties

These fields are automatically populated by ATLAS and cannot be edited.

**Property**|**Description**
:-----:|:-----:
Unit Data Source|The Recorder that captured the Session data.
Date of Recording|The date and time the Session was recorded.
ECU Version|Version of the ECU (Engine Control Unit) used.
ECU Serial Number|Serial number of the ECU.

These values are critical for traceability and technical validation, especially when comparing Sessions across different hardware or configurations.

**Special Field: Pit Lane Trigger**

The Pit Lane Trigger setting affects how ATLAS calculates lap times and identifies the fastest lap. Options include:

- None: Trigger is located at the team pit box.
- After Pit: Trigger is after the pit lane. The last full lap may be the fastest and is included in analysis.
- Before Pit: Trigger is before the pit lane. The in-lap is excluded from fastest lap calculations.

This setting ensures accurate lap timing and should be configured based on the physical layout of the circuit.

**Special Field: Lap Trigger Offset**

The Lap Trigger Offset is used to align Sessions recorded with different lap trigger positions. It defines a consistent reference point on the track.

- Negative values: Start/Finish line is ahead of the trigger.
- Positive values: Start/Finish line is behind the trigger.

This is especially useful when comparing data from multiple Sessions recorded at the same circuit but with different trigger setups.

!!! note
    The reference point does not have to be the Start/Finish line. Any consistent track feature can be used, as long as it is applied uniformly across Sessions.

## Best Practices
1. Always review and update Session metadata after recording to ensure accuracy.
2. Use descriptive names and notes to make Sessions easier to identify later.
3. Align Sessions using Lap Trigger Offset when comparing data across different setups.
4. Use consistent values for fields like Driver, Circuit, and Car to improve filtering and searchability.