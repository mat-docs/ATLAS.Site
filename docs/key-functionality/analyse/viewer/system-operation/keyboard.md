# Keyboard Shortcuts

Keyboard shortcuts let you drive ATLAS without the mouse. Most shortcuts act on the active Display, so click a Display first to give it focus. Shortcuts do not run while you are typing in a text box or editing a property grid, with two exceptions. In the [Notepad display](../displays/notepad.md), `Page Up`, `Page Down`, `Ctrl+Q` and the set association keys still work. In the [Web Browser display](../displays/web.md) address box, `Ctrl+Q` searches your favourites.

Shortcuts cannot be changed in this release.

## Main Window

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|---------------------------------------------------------------------------------------- |
| ++ctrl+l++                                                  | Open Session Browser                                                                    |
| ++p++ or ++insert++                                         | Open Parameter Browser                                                                  |
| ++ctrl+q++                                                  | Quick Access Assistant (see [Quick Access](#quick-access))                              |
| ++ctrl+g++                                                  | Open the Go to window                                                                   |
| ++ctrl+n++                                                  | New workbook page                                                                       |
| ++page-down++                                               | Next workbook page                                                                      |
| ++page-up++                                                 | Previous workbook page                                                                  |
| ++ctrl+tab++                                                | Cycle between displays (forwards)                                                       |
| ++ctrl+shift+tab++                                          | Cycle between displays (backwards)                                                      |
| ++ctrl+enter++                                              | Toggles full screen mode (View > Full Screen)                                           |
| ++ctrl+f10++                                                | Toggles the title bar of the current display                                            |
| ++ctrl+f11++                                                | Hides all title bars                                                                    |
| ++ctrl+f12++                                                | Shows all title bars                                                                    |
| ++ctrl+shift+r++                                            | Rebuild all functions                                                                   |
| ++ctrl+e++                                                  | Show the Data Export Tool (Tools > Export Data)                                         |
| ++f1++                                                      | Open the ATLAS help (Help > View Help)                                                  |
| ++escape++                                                  | Close the active dialog or tool window                                                  |

!!! note
    ++ctrl+enter++ opens Parameter Properties instead of switching to full screen when a parameter list has focus, for example in the Scatterplot or Load Map display.

!!! note
    ++ctrl+tab++ and ++ctrl+shift+tab++ are also assigned to set 19 (see [Associating Compare Sets](#associating-compare-sets)). If you use 19 or more sets, check which action runs on your system.

### Saving and Loading

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|---------------------------------------------------------------------------------------- |
| ++ctrl+o++                                                  | Open a workbook                                                                         |
| ++ctrl+s++                                                  | Save a workbook                                                                         |
| ++ctrl+alt+s++                                              | Save a workbook as...                                                                   |
| ++ctrl+shift+c++                                            | Copies a Session Reference to the clipboard (File > Copy Session Reference)             |
| ++ctrl+shift+l++                                            | Load a Session Reference from the clipboard (File > Load Session Reference)             |

!!! note
    The File > Import menu shows ++ctrl+i++, but no key is assigned to it in this release. Use the menu instead.

### Quick Access

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| ++ctrl+q++                                                  | Open the Quick Access Assistant. Press again to switch between modes                    |
| ++down++                                                    | Select the next Quick Access item                                                       |
| ++up++                                                      | Select the previous Quick Access item                                                   |
| ++enter++                                                   | Select the current Quick Access item                                                    |
| ++escape++                                                  | Close the Quick Access Assistant                                                        |
| ++ctrl+a++                                                  | Select all text in the search box                                                       |
| ++semicolon++                                               | Validate the function you are typing (Create New Function mode)                         |

#### Quick Access modes

The Quick Access Assistant opens in the mode that suits the active Display. The label on the left of the search box shows the current mode.

- **Add New Parameter:** Type part of a parameter name and press ++enter++ to add the parameter to the active Display.
- **Create New Function:** Type `=` or a space to switch from Add New Parameter to this mode. Type a function such as `name = expression;`. Press ++semicolon++ to check the syntax, and press ++enter++ after the closing `;` to create the function.
- **Search For Favourite:** Used when the active Display is a Web Browser Display. Select a favourite to load it in that Display.
- **Enter Action Name:** Lists **New Page** and a **New** entry for each Display type. Select one to add it to the current workbook or page. Quick Access uses this mode when there is no suitable active Display, or when you press ++ctrl+q++ again.

### Associating Compare Sets

| Shortcut															| Description                                                                             |
| ------------------------------------------------------------------|---------------------------------------------------------------------------------------- |
| ++shift+1++ … ++shift+9++											| Select the Compare Set for the _active display_                                         |
| ++shift+0++														| Select the Compare Set for the _active display_ (set 10*)                               |
| ++shift++ + ++minus++												| Select the Compare Set for the _active display_ (set 11)                                |
| ++shift++ + ++equal++												| Select the Compare Set for the _active display_ (set 12)                                |
| ++shift+backspace++												| Select the Compare Set for the _active display_ (set 13)                                |
| ++shift++ + ++semicolon++											| Select the Compare Set for the _active display_ (set 14)                                |
| ++shift++ + ++single-quote++										| Select the Compare Set for the _active display_ (set 15)                                |
| ++shift++ + ++comma++												| Select the Compare Set for the _active display_ (set 16)                                |
| ++shift++ + ++period++											| Select the Compare Set for the _active display_ (set 17)                                |
| ++shift++ + ++slash++												| Select the Compare Set for the _active display_ (set 18)                                |
| ++shift+tab++														| Select the Compare Set for the _active display_ (set 19)                                |
| ++shift+caps-lock++												| Select the Compare Set for the _active display_ (set 20)                                |
| ++ctrl+1++ … ++ctrl+9++											| Select the Compare Set for all displays on the _active page_                            |
| ++ctrl++ + same order of keyboard characters listed above			| Select the Compare Set for all displays on the _active page_ (sets 10-20)               |
| ++ctrl+shift+1++ … ++ctrl+shift+9++								| Select the Compare Set for all displays in the _active page group_                      |
| ++ctrl+shift++ + same order of keyboard characters listed above   | Select the Compare Set for all displays in the _active page group_ (sets 10-20)         |
| ++shift+delete++													| Clears the Compare Set for the _active display_                                         |
| ++ctrl+delete++													| Clears the Compare Set for all displays on the _active page_                            |
| ++ctrl+shift+delete++												| Clears the Compare Set for all displays in the _active page group_                      |
| ++ctrl+f1++ … ++ctrl+f9++											| Show or hide session 1 to 9 in the set used by the _active display_                     |

The number keys on the numeric keypad work in the same way as the number keys above the letters.

Pages and Displays set to **Lock to Current Association** keep their set when you use the page or page group shortcuts.

++ctrl+f1++ … ++ctrl+f9++ do not hide the primary session, and do not hide the last visible session in the set.

## Timeline and Navigation

| Shortcut                                                    | Description                                                                             |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| ++plus++                                                    | Zoom in (View > Zoom > X Zoom In)                                                       |
| ++minus++                                                   | Zoom out (View > Zoom > X Zoom Out)                                                     |
| ++ctrl+shift+f++                                            | Select all laps                                                                         |
| ++ctrl+shift+t++                                            | Select all timed laps (excludes in/out laps)                                            |
| ++home++                                                    | Move to start of session                                                                |
| ++end++                                                     | Move to end of session                                                                  |
| ++ctrl+shift+right++                                        | Move to next lap                                                                        |
| ++ctrl+shift+left++                                         | Move to previous lap                                                                    |
| ++ctrl+shift+space++                                        | Move to the lap at the cursor (current lap)                                             |
| ++ctrl+f++                                                  | Move to fastest lap                                                                     |
| ++ctrl+bracket-right++                                      | Go to next occurrence of event                                                          |
| ++ctrl+bracket-left++                                       | Go to previous occurrence of event                                                      |
| ++ctrl+alt+right++                                          | Go to next signal change                                                                |
| ++ctrl+alt+left++                                           | Go to previous signal change                                                            |

The lap and session moves are also on the View > Move menu.

Hold down the event or signal change keys to keep stepping. The event used by ++ctrl+bracket-right++ and ++ctrl+bracket-left++ is set by **Event Tracking Mask** in the Waveform Display options. The parameter used by ++ctrl+alt+right++ and ++ctrl+alt+left++ is set by **Move to Next/Previous Signal Change Parameter** in [Options](options.md) (default `NGear:Chassis`).

## Displays

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|---------------------------------------------------------------------------------------- |
| ++ctrl+q++                                                  | Quick-Access Parameter or Function                                                      |
| ++p++ or ++insert++                                         | Insert Parameter                                                                        |
| ++del++                                                     | Delete Parameter                                                                        |
| ++d++                                                       | Show the Display Properties                                                             |
| ++ctrl+tab++                                                | Cycle between displays (forwards)                                                       |
| ++ctrl+shift+tab++                                          | Cycle between displays (backwards)                                                      |
| ++ctrl+f10++                                                | Toggles the current titlebar on/off                                                     |
| ++ctrl+f11++                                                | Hides all titlebars                                                                     |
| ++ctrl+f12++                                                | Shows all titlebars                                                                     |

### Circuit Display

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| ++ctrl+alt+t++                                              | Generate circuit from the current lap                                                   |

### Histogram Display

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| ++k++                                                       | Cycle the X axis mapping instance                                                       |
| ++ctrl+shift+k++                                            | Set the X axis mapping instance for all displays                                        |
| ++ctrl+k++                                                  | Set the X axis mapping instance for all page displays                                   |

### Load Map Display

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| ++ctrl+enter++                                              | Show the Parameter Properties                                                           |

### Numeric Display

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| ++ctrl+c++                                                  | Copy to Clipboard                                                                       |
| ++ctrl+a++                                                  | Select All                                                                              |

### PCU Dash Display

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| ++alt+enter++                                               | Show the Parameter Properties for the selected parameter                                |

### Scatterplot Display

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| ++r++                                                       | Reference cursor                                                                        |
| ++h++                                                       | Hide/show cursor                                                                        |
| ++t++                                                       | Hide/show parameter trace                                                               |
| ++plus++                                                    | Zoom in                                                                                 |
| ++minus++                                                   | Zoom out                                                                                |
| ++ctrl+z++                                                  | Undo zoom                                                                               |
| ++ctrl+alt+z++                                              | Undo all zooms                                                                          |
| ++ctrl+y++                                                  | Redo zoom                                                                               |
| ++ctrl+enter++                                              | Show the Parameter Properties                                                           |
| ++ctrl+p++                                                  | Print                                                                                   |
| ++ctrl+shift+p++                                            | Print Preview                                                                           |

### Waveform Display

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| ++r++                                                       | Toggle Reference Mode (reference cursor)                                                |
| ++c++                                                       | Cross-hair cursor                                                                       |
| ++g++                                                       | Gradient cursor                                                                         |
| ++v++                                                       | Value cursor                                                                            |
| ++h++                                                       | Hide cursor                                                                             |
| ++right++                                                   | Move to next sample timestamp                                                           |
| ++left++                                                    | Move to previous sample timestamp                                                       |
| ++t++                                                       | Hide/show parameter trace                                                               |
| ++del++                                                     | Delete parameter trace                                                                  |
| ++ctrl+a++                                                  | Selects legend items                                                                    |
| ++ctrl+c++                                                  | Copies selected legend items to clipboard                                               |
| ++k++                                                       | Cycle the X axis mapping instance                                                       |
| ++ctrl+shift+k++                                            | Set the X axis mapping instance for all displays                                        |
| ++ctrl+k++                                                  | Set the X axis mapping instance for all page displays                                   |
| ++f++                                                       | Set zero time reference for TimeDiff                                                    |
| ++e++                                                       | Show delta statistics                                                                   |
| ++ctrl+t++                                                  | Show the display docking area, and View Scatterplot of Selected Parameters (see note)   |
| ++ctrl+shift+alt+1++ … ++ctrl+shift+alt+9++                 | Show or hide the traces of compared session 1 to 9                                      |
| ++s++                                                       | Show statistics                                                                         |
| ++m++                                                       | Show minimum statistics                                                                 |
| ++x++                                                       | Show maximum statistics                                                                 |
| ++n++                                                       | Show mean statistics                                                                    |
| ++q++                                                       | Show standard deviation statistics                                                      |
| ++plus++                                                    | Zoom in                                                                                 |
| ++minus++                                                   | Zoom out                                                                                |
| ++ctrl+z++                                                  | Undo zoom                                                                               |
| ++ctrl+alt+z++                                              | Undo all zooms                                                                          |
| ++z++                                                       | Zoom box                                                                                |
| ++escape++                                                  | Cancel zoom box                                                                         |
| ++ctrl+p++                                                  | Print                                                                                   |
| ++ctrl+shift+p++                                            | Print Preview                                                                           |

!!! warning "Ctrl+T in the Waveform Display"
    ++ctrl+t++ is assigned to two Waveform actions in this release: show the display docking area, and View Scatterplot of Selected Parameters. Pressing it can run both.

### Print Preview

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| ++ctrl+alt+p++                                              | Copy To Clipboard                                                                       |

## Tools and Browsers

### Session Browser

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| ++f5++                                                      | Refresh                                                                                 |
| ++enter++                                                   | Add the selected sessions to the current set                                            |
| ++ctrl+enter++                                              | Add the selected sessions to a new set                                                  |
| ++shift+enter++                                             | Overwrite the sessions in the current set with the selected sessions                    |

### Function Editor

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| ++ctrl+n++                                                  | New function                                                                            |
| ++ctrl+s++                                                  | Save function                                                                           |
| ++f6++                                                      | Build function                                                                          |

### Laps and Markers Editor

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| ++insert++                                                  | Add a lap or marker                                                                     |
| ++del++                                                     | Delete the selected lap or marker                                                       |

### About ATLAS

| Shortcut                                                    | Description                                                                             |
| ------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| ++ctrl+c++                                                  | Copy the installed plugin list, for example to send to support                          |

### Known issue (Windows 11)

The command to switch a page group to the 10th compare set (++ctrl+shift+0++) may not work on some Windows 11 systems due to a system-level language hotkey using the same combination. To restore the shortcut, disable the language hotkeys:

- Open Windows Settings > Typing > Advanced keyboard settings.
- Click "Input language hot keys".
- Select "Between input languages" or "Keyboard layout" and click "Change Key Sequence".
- Set "Switch keyboard layout" to "Not assigned".

This change removes the OS-level binding that can block ++ctrl+shift+0++, allowing the application shortcut to work as expected.
Also to note, for switching to set 15, on US keyboards you'll need to use the # key instead of ++single-quote++.
