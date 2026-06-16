# Working with Displays

This guide covers the core concepts and workflows that apply across all display types in ATLAS Viewer. Understanding these will help you work efficiently with any display.

!!! tip "Quick Start"
    New to ATLAS displays? Start here to learn the fundamentals, then explore individual display guides for specifics.

## Display Windows

Every display is a window that can be:

- **Docked**: Attached to the main window in a tabbed layout
- **Floating**: Separate window that can move independently (great for multi-monitor setups)
- **Resized**: Drag edges or corners to resize
- **Closed**: Click X button or right-click > Close

Only one display is "selected" at a time (click inside it).

## Display Properties

### Opening Display Properties

- Press `D` when display is focused
- Right-click display > Display Properties
- Toolbar button when display is selected

### Understanding Property Icons

!!! info "Property Status Icons"
    **◻️ Square Icon**: Default value — reset with the reset button
    
    **♦️ Diamond Icon**: Changed for this display instance only — other displays unaffected
    
    **⚪ Circle Icon**: Global setting — applies to ALL displays of this type, including future ones

### Making Properties Global

1. Right-click the property name
2. Select "Make Global" — property becomes global (⚪ icon)
3. All future displays of that type will use this value

To remove global status: right-click the property > "Clear Global".

!!! warning
    Global properties affect ALL future displays of that type. Use carefully!

The meaning of each property is shown at the bottom of the Display Properties window when selected.

## Working with Parameters

### Parameter Browser

The Parameter Browser is your main tool for finding and adding parameters.

**Opening**:

- Press `Ctrl+P`
- View menu > Parameter Browser
- Usually docked on the left side

**Features**:

- :mag: **Search**: Type in search box to filter the parameter list (supports partial matches)
- :star: **Favourites**: Star frequently used parameters for quick access from the Favourites tab

### Adding Parameters to Displays

=== "Drag and Drop"
    Find parameter in Parameter Browser, click and drag onto display, release to add.
    
    :mouse: **Fastest** for single parameters

=== "Add Button"
    Select parameters in Parameter Browser, click "Add to Display" button.
    
    :heavy_check_mark: **Best** for multiple parameters

=== "Double-Click"
    Double-click parameter in browser to add to active display (some displays only).
    
    :zap: **Quick** single-parameter add

### Parameter Properties

Edit individual parameter settings by double-clicking the parameter in the display, or right-click > Properties.

| Setting | Description |
|---------|-------------|
| **Colour** | Parameter trace or text colour |
| **Format** | Decimal places, hex, scientific |
| **Units** | Display units |
| **Scale** | Y-axis range (waveforms) |
| **Thresholds** | Warning and critical levels |
| **Post-Processing** | Smoothing, filtering, differences |

### Removing Parameters

- Select parameter in display
- Press `Delete`, or right-click > Remove Parameter

!!! note
    Some displays allow hiding parameters instead of deleting — hidden parameters can be restored.

## Display Layout and Organisation

### Pages

Workbooks contain pages; pages contain displays.

- **Create pages**: Right-click page tabs > New Page (or duplicate an existing page)
- **Name pages**: Right-click page tab > Rename — use descriptive names like "Overview", "Sector 1", "Gearbox"
- **Organise**: Group related displays on the same page; use separate pages for different analysis areas

### Docking and Floating

**Docking**:

- Drag display by title bar
- Blue target indicators show dock locations
- Drop on target to dock

**Floating**:

- Drag display outside dock area to create an independent window
- Perfect for multi-monitor setups
- Drag back to dock area to re-dock

### Resizing

- Drag edges to resize
- Drag corners to resize proportionally
- Double-click title bar to maximise/restore
- Docked displays share space with neighbours

## Session Management

### Loading Sessions

**Single Session**:

1. File > Open Session
2. Browse to session file
3. Session loads into Compare Set 1

**Multiple Sessions** (Compare Sets):

1. File > Add to Compare Set
2. Choose set number (1-8)
3. Session loads into specified set
4. All displays can switch between sets

### Switching Between Sessions

| Action | Shortcut | Result |
|--------|----------|--------|
| Switch selected display | `Shift+<n>` | Changes active display only |
| Switch entire page | `Ctrl+<n>` | All displays on page switch together |
| Click coloured tag | Mouse click on title bar | Menu shows available sets |

When a whole page shows the same set, a coloured line appears across the page header.

### Compare Sets

Compare Sets let you analyse multiple sessions:

- Load up to 8 sessions simultaneously
- Compare different laps, runs, or drivers
- Each display can show a different set
- Switch quickly with keyboard shortcuts

## Cursor Control

### Moving the Cursor

=== "Mouse"
    Click in display to position cursor. Drag cursor line to move.
    
    :mouse: **Quick** positioning

=== "Keyboard"
    | Keys | Action |
    |------|--------|
    | `←` / `→` | Move by one sample |
    | `Shift+←` / `Shift+→` | Move faster |
    | `Home` | Jump to session start |
    | `End` | Jump to session end |
    | `Page Up` / `Page Down` | Larger steps |
    
    :keyboard: **Precise** control

=== "Direct Entry"
    Right-click cursor area, enter specific time or distance, press `Enter` to jump.
    
    :dart: **Exact** positioning

### Cursor Synchronisation

!!! info "Synchronised Cursors"
    The cursor is synchronised across displays:
    
    - Moving cursor in one display moves all displays
    - All displays show data at the same time point
    - **Exception**: Displays showing different sessions

## Workbooks

### What are Workbooks?

Workbooks save your entire workspace:

- All pages and displays
- Display positions and sizes
- Display properties
- Parameter selections
- Compare set configuration

### Saving and Opening

- **Save**: `Ctrl+S` or File > Save
- **Save As**: File > Save As (useful for creating templates)
- **Open**: File > Open Workbook (restores exact workspace; prompts if sessions not found)

### Workbook Templates

Create reusable templates:

1. Set up displays and layout
2. Configure all properties
3. Save As with a descriptive name
4. Use as starting point for similar analysis

Keep templates in a dedicated folder for easy access.

## Common Workflows

=== "Quick Session Review"
    1. Open workbook template
    2. Load session
    3. Cursor through interesting areas
    4. Make notes in Notepad display
    
    :fast_forward: **Goal**: Rapid session inspection

=== "Multi-Lap Comparison"
    1. Load laps into compare sets
    2. Switch displays to each lap
    3. Use Reference Cursor to compare points
    4. Note differences in Notepad
    
    :left_right_arrow: **Goal**: Identify lap differences

=== "Event Investigation"
    1. Open Event Display
    2. Select event of interest
    3. Cursor jumps to event time
    4. Check parameters in other displays
    
    :mag: **Goal**: Diagnose issues

=== "Dashboard Monitoring"
    1. Create Numeric Displays for key parameters
    2. Set warning/critical thresholds
    3. Position displays for visibility
    4. Save as monitoring workbook template
    
    :bar_chart: **Goal**: Live monitoring station

## Performance Tips

For smooth operation:

- Limit parameters per display to a reasonable number
- Use appropriate refresh rates
- Close unused displays
- Disable features you don't need (e.g., interpolation)
- For large sessions, zoom to area of interest and enable sub-sampling where available
- Use Summary Display instead of Waveform for statistics over large ranges

## Best Practices

!!! tip "Organisation"
    :file_folder: **Organise with pages**: Group related displays on separate pages
    
    :floppy_disk: **Use templates**: Create workbooks for common analysis tasks
    
    :bookmark: **Name sessions clearly**: Easy to identify later

!!! tip "Efficiency"
    :keyboard: **Learn shortcuts**: Faster than mouse for frequent actions
    
    :arrows_counterclockwise: **Save often**: Don't lose your workspace
    
    :broom: **Clean up**: Close displays you're not using

!!! tip "Analysis"
    :memo: **Document findings**: Use Notepad display for notes
    
    :rocket: **Start simple**: Add complexity as needed
    
    :chart_with_upwards_trend: **Work methodically**: Systematic approach beats random exploration

## Troubleshooting

??? question "Display not updating?"
    - Check session is loaded
    - Verify parameter is available in session
    - Check refresh rate in display properties
    - Ensure display is focused (click it)
    - Check you're not paused

??? question "Can't add more parameters?"
    - Each display has a maximum parameter limit (see [Display Comparison](index.md#display-comparison))
    - Check parameter exists in loaded session
    - Verify display supports that parameter type

??? question "Display shows 'No Data'?"
    - Check cursor is in valid data range
    - Verify parameters have data at cursor position
    - Ensure session is properly loaded
    - Check time/distance mode is correct

??? question "Properties won't save?"
    - Save workbook after changes (`Ctrl+S`)
    - Check workbook is not read-only
    - Verify write permissions to workbook location

??? question "Display performance is poor?"
    - Reduce number of visible parameters
    - Lower refresh rate
    - Disable expensive features (interpolation, etc.)
    - Close other displays temporarily
    - Check system resources

??? question "Display looks cluttered?"
    - Hide parameters temporarily (don't delete)
    - Use Distribute function (Waveform)
    - Adjust font sizes and layout
    - Reduce number of visible parameters

??? question "Cursor not moving?"
    - Click to focus the display
    - Check if display supports cursors
    - Verify session is active
