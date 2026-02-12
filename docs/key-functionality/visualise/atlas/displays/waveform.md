# Waveform Display

The Waveform Display plots multiple parameters as traces against Time or Distance. It supports live telemetry and historical sessions, fast zooming, and rich formatting. Use it for:

- Braking/throttle application vs. speed, per corner or lap
- Multi-session comparisons with Time Difference (TDiff) in Distance mode
- Event-driven triage (ECU events/errors) aligned to timestamps or distances

![Waveform Display](assets/waveform.png)

## Setup & Prerequisites

- **Add Display:**  
    - Display Toolbar ▸ Waveform  
    - File ▸ New ▸ Display ▸ Waveform  
    - Shortcut: Ctrl+Q, Ctrl+Q
- **Parameter Selection:**  
    - Use Parameter Browser (default max 100 parameters, configurable)
    - Double-click legend items for Parameter Properties (supports single/multi-session editing)
- **Compare Sets:**  
    - Load multiple sessions into a set
    - Switch sets: Shift+<n> (selected display), Ctrl+<n> (whole page), or click coloured tag on title bar

## Display Anatomy

- **Plot Area:**  
    - One trace per parameter
    - Grid (vertical/horizontal/both) with spacing shown at top
    - Cursor text at top-left (shows Time, and Distance in Distance mode)
- **Legend:**  
    - Per-parameter row with cursor value and statistics
    - Reposition, resize, grid, show units, toggle headers
    - Select rows (Ctrl/Shift) to highlight traces and perform actions (hide/delete/distribute)
- **Axes:**  
    - X-axis: Time or Distance (config via K)
    - Y-axis: Per-parameter scales (enable in Parameter Properties)

## Selecting, Highlighting, Hiding, Deleting

- Click legend rows to select; selected traces flash by default
- **Hide Selected Parameters:** Hides traces, keeps legend entries (names struck through; values italic)
- **Delete Selected Parameters:** Removes from display
- **Distribute:** Stacks selected traces into bands; Reset Distribute restores
- **Autoscale:** Fits data to vertical space; Reset Auto-Scale restores

## Cursors & Reference Cursor

- **Cursor Modes:**
    - Value (default): Vertical line; legend shows sample value(s)
    - Crosshair: Adds horizontal sight line
    - Gradient: Diagonal line with three handles; legend shows per-signal gradient
    - Toggle via View/context menu or shortcuts (V, C, G). Hide Cursor/None turns off
- **Reference Cursor (R):**
    - Red reference line; grey window between reference and current cursor defines analysis range
    - Legend shows ΔTime/ΔDistance and computes statistics for that window
    - Drag either cursor to adjust window

![Waveform Display with Reference Cursor](assets/ref-cursor.png)

## Statistics

- Enable Show Statistics and choose Statistics Level: Display, Lap, Session, or All
- Reference Cursor can have its own level or swap with chosen level
- Toggle metrics via shortcuts:
    - Min, Max, Mean, E (Delta), Q (Std Dev)
    - Legend prefixes indicate level (e.g., LMin for Lap)

## X-Axis Modes & Time Difference (TDiff)

- Press K to cycle X-axis mappings (Time/Distance)
- In Distance mode with multiple sessions, enable Show Time Diff to plot TDiff trace and show value in legend
- Choose TDiff Start point: Start of lap or Cursor

## Events & Markers

- **Event Markers:**  
    - Solid squares under X-axis (Show Event Indicators enabled)
    - Red = High, Blue = Medium, Green = Low
    - Hover for details; marker shows highest priority colour if multiple events coincide
    - Mask/unmask from hover; view masked via context menu
- **Lap Markers:** Dashed vertical lines (toggle per property)
- **Date Markers & Show Time As:** In Time mode, show clock/lap time on X-axis
- **Circuit Stripe:** Show Segments/Sectors across top of plot; toggle labels; choose global/overridden Circuit Definition

## Live Telemetry, Historical Replay & Scrolling

- **Live:** Waveform scrolls/updates if Live session is in set
- **Historical Replay:** Enable Allow Historical Replay; double-click plot to replay
- **Pause/Inspect:** Single-click stops scrolling and positions cursor; double-click resumes
- **Autoscroll:** Middle mouse (or both buttons); pointer controls speed; click to exit
- **Left-to-Right Mode (Strip Chart):**  
    - Enable Draw left to right to overwrite as laps progress
    - Optionally add Gap % ahead of cursor and choose Left to Right Overlay lap

## Sampling Model: Sub-Sampling & Interpolation

- **Sub-Sampling (cursor spans >1 sample):**  
    - Choose reporting/drawing mode: First, Min, Max, Mean, Min→Max, Max→Min
    - Legend shows min/max; trace shows vertical min–max line
- **Interpolation:**  
    - Enable Interpolate between samples (Parameter Properties ▸ Post Processing) to smooth traces and generate interpolated legend values

## Compare Sessions & “Show Differences”

- In Parameter Properties ▸ Post Processing, enable Show Differences for value differences between sessions at cursor
- Notes: Pause live scrolling for readability; not compatible with Filters/Trends; not available for Boolean/Text parameters or Functions

!!! tip "Troubleshooting & Gotchas"
    - **No Y-axis?** Enable per-parameter Y-Scale property
    - **Cluttered traces?** Use Distribute, Autoscale, hide traces, or reduce parameters
    - **Stepped signals?** Consider Interpolate between samples if appropriate
    - **Missing event markers?** Ensure Show Event Indicators is on; check Event Filters for masked priorities
    - **Differences not showing?** “Show Differences” not available with Filters/Trends, Boolean/Text, or Functions; pause live scroll to read values
