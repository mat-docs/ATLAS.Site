# Bar Graph Display

The Bar Graph Display visualises one or more Measurement Parameters as bars. Each bar's height and colour reflect the parameter's value and status.

## Features

- **Bar Height**: Proportional to parameter value.
- **Bar Colour**:
  - **Normal**: Between warning limits (default grey).
  - **Low**: Below low warning limit (default blue).
  - **High**: Above high warning limit (default red).
- **Orientation**: Bars are vertical by default; can be changed to horizontal via System Menu.
- **Max/Min Values**: Shown beside each bar; editable via Display Limits dialog.
- **Warning Limits**: Displayed and colour-coded.
- **Name/Description**: Shown below each bar.
- **Value**: Engineering value shown below name/description; matches bar colour.
- If a parameter is not in the Live Logging Configuration, “not logged” is displayed.

## Selecting Parameters
- **Single**: Click bar or use cursor keys.
- **Multiple**:
  - Mouse: CTRL + click.
  - Keyboard: CTRL + cursor keys + SPACE.
- **All**: Use "Select All" from the Bar Graph Context Menu.

## Display Limits
To change the display range for a parameter:

1. Open the Bar Graph Context Menu.
2. Select **Display Limits**.
3. Edit Low and High values.
