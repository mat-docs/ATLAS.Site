# Graphical Maps

System Monitor supports graphical representations of 1-axis and 2-axis maps to help visualise and edit parameter values more intuitively.

## Graphical Views for 1-Axis Maps

### View Options
- **Graphical View – 1 axis**: 2D graph of parameter value vs. index value.
- **Difference View**: Shows the difference between Edit Buffer and Data Version values.

### Display Features
- Each parameter has a trace; the active one is bold and coloured.
- Axis limits are set via Conversion dialog boxes.
- Breakpoint spacing can be **even** or **proportional**.
- Axis labels and subdivisions are generated automatically.

## Graphical Views for 2-Axis Maps

### View Options
- **Graphical View – 2 axis**: 3D graph of parameter value vs. X and Y index values.
- **Difference View**: 3D graph of differences between Edit Buffer and Data Version.
- **End View**: 2D graph of parameter value vs. X index for each Y index.
- **Slice View**: 2D graph for either X or Y axis based on selected value.

### Display Features
- Hidden lines removed for clarity.
- Axis limits and labels are auto-generated.
- Breakpoint spacing can be even or proportional.
- Views can be zoomed and rotated.

## Zooming

All graphical views support zooming via the Map Bar:

- **Zoom In**: Enlarges view by 50%.
- **Zoom Out**: Reverses zoom incrementally.
- View centres on selected value.

### Selecting Values
- **3D Display**: Click on surface intersections or use cursor keys.
- **2D Display**: Click on trace at breakpoint or use arrow keys.

> Use `Alt+G` to toggle between Graphical and Engineering views.

## Rotating Views

Only available for 3D views (2-axis maps):

- **Toolbar Buttons**: Rotate left/right or up/down in 10° increments.
- **Mouse**: Click and drag to rotate the display.


## Editing Values in Graphical Views

Values can be changed directly in graphical views (except Difference View).

### Steps
1. **Select a value**:
   - Click or use cursor keys.
   - Selected value is marked with a black spot.
2. **Edit the value**:
   - Use mouse to drag up/down.
   - Use keyboard to enter new value via Edit Bar.
3. **Confirm**:
   - Press `ENTER` to accept and redraw the map.

> The Maths Bar can also be used to apply changes.

## Breakpoint Spacing

Breakpoint spacing affects how maps are displayed:

- **Even**: Equal spacing between breakpoints.
- **Proportional**: Spacing reflects actual breakpoint values.

Toggle using the Map Bar button.
