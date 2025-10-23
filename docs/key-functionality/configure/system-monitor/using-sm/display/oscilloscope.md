# Oscilloscope Display

The Oscilloscope Display plots one or more Measurement Parameters against time. It consists of a Plot Area and a Parameter Info Box.

## Features

- **Trace Types**:
  - **Linear**: Straight lines between values.
  - **Digital**: Horizontal and vertical steps.
  - **Logical**: TRUE (1.00) or FALSE (0.00); shown below the timebase.
- **Y-Axis**:
  - Labelled Y-axis for selected parameters.
  - Option to show Y-axis for all parameters.
  - No Y-axis for Logical traces.
- **Timebase Duration**: Configurable in Extras tab.
- **Update Rate**: Set in Display tab.
- **Grid Display**: Optional background grid.
- **Band Clearing**:
  - **On**: Previous traces overwritten.
  - **Off**: Plot area cleared after each sweep.

## Parameter Info Box

- Shows Name and Value of each parameter.
- Can be hidden via Extras tab.
- Text colour matches trace colour.
- Width adjustable; height fixed relative to Plot Area.

## Selecting Parameters
- **Single**: Click name or use cursor keys.
- **Multiple**:
  - Mouse: SHIFT or CTRL + click.
  - Keyboard: SHIFT or CTRL + cursor keys + SPACE.
- **All**: Use "Select All" from Context Menu.

## Trace Limits

To adjust Y-axis limits:

1. Open Context Menu.
2. Select **Trace Limits**.
3. Edit Low and High values.

> Note: Trace Limits do not affect Logical traces.
