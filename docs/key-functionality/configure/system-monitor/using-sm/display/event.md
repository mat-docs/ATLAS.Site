# Event Display

Events report status changes in the control system and include a timestamp. They are defined by the Event File in the Program Version.

## Features

- Events are displayed in order of receipt (most recent at bottom).
- Maximum of 2000 events per window; older entries are deleted.
- Events are automatically logged to: \work\Ev_.log
- Events can be saved manually via `Save As`.

## Creating an Event Window

Select: `Desktop > Window > Event`

Each event appears as a row with:

- **Priority Icon**: High, Medium, or Low.
- **Date**: When the event occurred.
- **Time**: Timestamp.
- **Event Name**: From Event File.
- **Description**: Diagnostic info (HEX or converted text).

## Display Options

- Events appear on every page by default.
- Column widths are adjustable.
- Appearance settings available via Display tab and System Menu.

## System Menu – Events

- **Clear All Event Windows**: Removes all listed events.
- **Save As**: Save events to a file.

## Event Masking

- Use the Mask tab in Window Properties.
- Mask by:
- **Group**: Entire application group.
- **Individual Events**
- **Priority Level**: Low, Medium, High, All
