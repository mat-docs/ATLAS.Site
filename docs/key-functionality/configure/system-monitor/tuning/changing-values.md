# Changing Parameter Values

Editable Parameters can be modified within System Monitor, provided the ASAP file allows it and the application is active and not read-only.

## General Editing

To change a value:
1. Select the parameter value.
2. Enter a new value.
3. Accepted values change colour (default: red/blue).

> Values can also be changed in Graphical Maps.


## Edit Mode

Edit Mode controls how values are selected and modified.

### Edit Mode On
- Only the text is highlighted.
- One cell can be selected.
- Edit Context Menu is available.
- Copy only sends the value to clipboard.

### Edit Mode Off
- Entire cell or row is highlighted.
- Multiple cells can be selected.
- Windows Context Menu is available.
- Copy includes parameter reference.

> Press `ESC` or `ENTER` to exit Edit Mode.


## Editing Methods

### By Mouse
- Click on a value and enter a new one.
- Use the Edit Bar to modify Breakpoints or Output values.

### By Keyboard
- Use cursor keys to select a value.
- Use `TAB` to cycle through Edit Bar fields.

## Selecting Multiple Values

### Mouse
- Click and drag to select a rectangle.
- Use `SHIFT` to select corners.
- Use `CTRL` for non-continuous selection (cannot be copied).

### Keyboard
- Use `SHIFT` and cursor keys to select a block.
- Use `CTRL + SPACE` for non-continuous selection.

> Entering a value overwrites the first (top-left) selected cell.


## Maths Bar

The **Maths Bar** allows mathematical operations on selected values.


## Value Limit Warning

Each parameter has upper and lower limits defined in the ASAP file.

If a value exceeds limits:
- A warning dialog appears.
- You can:
  - Accept the adjusted value.
  - Enter a new valid value.
  - Apply changes to all values (`OK to All`).
  - Cancel the change.


## Breakpoint Editing
### Mouse
- Click on column (X-axis) or row (Y-axis) headers.
- Enter new values directly or via Edit Bar.

### Keyboard
- Use cursor keys and `TAB` to navigate and edit.


## Breakpoint Warning

Changing a Breakpoint affects all parameters using that axis.

- A warning is shown listing affected parameters.
- Option to suppress future warnings for the axis.


## Breakpoint Monotony
Breakpoints must follow a monotonic order (increasing or decreasing).

- Set in the ASAP file.
- If violated, a warning is shown and the value is rejected.