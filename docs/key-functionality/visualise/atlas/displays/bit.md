# Bit Display

Status bits of one or more parameters, with configurable On/Off colours, labels, and captions per bit. You can pick which bits are active for each parameter.

![Bit Display](assets/bit-display.png)

## Adding a Bit Display

To add a Bit Display to a Page do one of the following:

- Click the Bit Display button on the DisplayToolbar.

- Click `File > New > Display` and select Bit Display.

- Press `Ctrl + Q` twice to use the QuickAccess Assistant and select New Bit Display.


To select which Bits you want to show for each Parameter:

1. Right click the column on the Display for the required Parameter.

2. Select Show Bit Options or Double Click a Parameter name on the Display headers

3. Choose from the following options for each Bit:


| Option      | Description                                             | Default Value      |
|-------------|--------------------------------------------------------|--------------------|
| **Active**  | Whether the Bit is shown or not                        | —                  |
| **Caption** | Text caption for that Bit                              | —                  |
| **OffColour** | Colour displayed when that Bit is off                 | Red                |
| **OffLabel**  | Text label displayed when that Bit is off             | —                  |
| **OnColour**  | Colour displayed when that Bit is on                  | Green              |
| **OnLabel**   | Text label displayed when that Bit is on              | —                  |


You can also quickly set up your Bit Display by loading a `.bcg` (Bit Configuration) file.

### Using a Bit Configuration File

- The location of the `.bcg` file can be set in **Tools > Options > Plugins > Bit Display**.
- Each Bit Display can be configured using the same `.bcg` file, with settings based on the parameter shown.

#### File Format

Each line in the `.bcg` file configures bits for a specific parameter. All bit definitions for a parameter must be on the same line.

**Format:**
```
ParameterName,BitNumber,Show(1|0),Caption,OffColour(COLORREF),OnColour(COLORREF),OffLabel,OnLabel,BitNumber,Show(1|0),Caption,OffColour(COLORREF),OnColour(COLORREF),OffLabel,OnLabel,...
```

- `ParameterName`: Name of the parameter.
- `BitNumber`: Zero-based index of the bit.
- `Show`: `1` to show, `0` to hide.
- `Caption`: Text caption for the bit.
- `OffColour` / `OnColour`: Colour when bit is off/on, using C++ `COLORREF` format (`0x00RRGGBB`).
- `OffLabel` / `OnLabel`: Text label when bit is off/on.

**Example:**
```
Status,0,1,Power,0x00FF0000,0x0000FF00,Off,On,1,1,Error,0x00FF0000,0x0000FF00,No,Yes
```

> **Note:** The Bit Display will use the `.bcg` file only after you double-click the display and check the **Use bit config file?** option. The display will then refresh with the new configuration.
