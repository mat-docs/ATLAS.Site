# Alarm Display

The Alarm Display window shows active alarms triggered by defined conditions. It appears automatically when an alarm message is triggered, or can be opened manually via: Desktop > Window > Alarms

## Display Columns

Each alarm is shown in a row with:

- **Description**: The message text defined in the Actions tab of the Alarm Properties.
- **Time**: The time the trigger condition became TRUE.

## Features

- Rows are cleared when the trigger condition becomes FALSE.
- The window remains open even if all rows are cleared.
- Default location is at the top of the desktop, but it can be moved and resized.
- Column widths are adjustable.
- Alarm windows appear on every page by default.

## Alarm Setup

Alarms consist of a **Trigger** and a set of **Actions**. Actions are executed immediately when the trigger condition becomes TRUE.

### Creating Alarms

To open the Alarm Setup dialog: Desktop > Alarm Triggers

Each alarm is listed with its message text. Alarms are active when their checkbox is selected.

!!! note
    Alarms operate immediately upon creation. The setup dialog does not need to be closed for alarms to function.

## Alarm Setup Controls

- **Add**: Creates a new alarm and opens the Alarm Properties dialog at the Trigger tab.
- **Properties**: Opens the Alarm Properties dialog for the selected alarm.
- **Remove**: Deletes the selected alarm.

## Alarm Properties

The Alarm Properties dialog defines the behaviour of an alarm. It includes two tabs:

- **Trigger**: Defines the condition that activates the alarm.
- **Action**: Specifies what happens when the condition is met.

### Trigger Tab

The trigger is a logical formula comparing one or more Measurement Parameters with each other or with a constant.

- Use mathematical operators to build the condition.
- Example: `RPM > 8000 AND Throttle > 90%`

### Action Tab
Defines the response when the trigger condition becomes TRUE. Multiple actions can be combined.

**Available Actions**

- **Display a Message** (default: on)
- **Jump to a Page** (default: off)
- **Emit a Sound** (default: off)

**Message Panel**

- **Display warning message**: Shows message while condition is TRUE.
- **Use alarm condition for message text**: Uses trigger formula as message.
- **Message Text**: Custom message if above option is disabled.

**Goto Page Panel**

- **Goto page**: Jumps to selected page when condition is TRUE.
- **Page name**: Select from dropdown list.

**Sound Panel**

- **Sound alarm**: Plays audible alert.
- **Test**: Play/stop alarm sound.
- **Default**: Use system default tone.
- **Custom**: Use selected `.wav` or `.mp3` file.
- **Repeat**: Sound repeats until condition clears.
- **Duration**: Sound plays for set time (in seconds).
- **Reset**: Delay before alarm can restart while still active.