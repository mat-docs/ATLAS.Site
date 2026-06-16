# Event Display

 ECU Events (from program version files defined in Options), with Priority (High/Medium/Low), Timestamp, Group, Id, Description, and parameter snapshots at the event time. Tabs allow quick filtering by priority or “Masked”. Clicking an event moves the timeline cursor to that time/distance.

 ![Event Display](assets/event.png)

## Adding an Event Display
- Use the Event Display button on the DisplayToolbar.

- Navigate to File > New > Display and select Event Display.

- Press Ctrl + Q twice to open the QuickAccess Assistant and select New Event Display.

**Event Display Overview**
Each event appears as a row with the following columns:
- **Priority Indicator**: Symbol showing event priority (High, Medium, Low).
- **Timestamp**: Time when the event occurred.
- **Group**: Parameter group name related to the event.
- **Id**: Unique integer for diagnostics.
- **Description**: Text describing the event.
- **Parameter Name**: Value of selected parameters at event time.

**Filtering and Customization**
- Tabs at the top allow filtering by priority: All, High, Medium, Low, Masked.
- Column widths are adjustable (see "Columns in Displays").
- Warning ranges for parameters can be set in the Appearance section of Parameter Properties.

**Display Options**
- By default, text uses the foreground colour.
- If "Show Warning Colours" is enabled in Display Options, parameter text changes colour when in the warning range.
    - If "Critical" is checked: Critical colour (default Red) is used.
    - If "Critical" is unchecked: Non-Critical colour (default Blue) is used.
