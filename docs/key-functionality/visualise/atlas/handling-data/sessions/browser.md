# Navigating the Session Browser

## Purpose of the Session Browser

The Session Browser is the primary interface in ATLAS for managing telemetry data Sessions. It allows users to:

- Load previously recorded (Historic) Sessions
- Record new (Live) Sessions
- Configure and manage data Recorders
- Combine multiple Sessions into Composite Sessions
- Group Sessions into Compare Sets for analysis
- View and edit Session metadata
- Connect to various data sources (e.g. databases, folders, services)

This tool is essential for any user working with telemetry data in ATLAS, whether for real-time monitoring or post-session analysis.

## How to Open the Session Browser

You can open the Session Browser in one of the following ways:

**Toolbar Icon** 

Click the Session Browser icon on the ATLAS toolbar.

**Menu Bar**

Navigate to `View > Session Browser`.

**Keyboard Shortcut**

Press `Ctrl + L` on your keyboard.

Once opened, the Session Browser will appear within the ATLAS interface.

## Layout of the Session Browser

The Session Browser is divided into six main panels, each serving a specific function:

### 1. Session Sources
This panel allows you to define where ATLAS should look for Sessions. Supported sources include:

- Folders on your local machine or network
- SQL Race databases
- RTA service connections (requires an RTA licence)

To add a new source:

1. Click the Add Data Source button or right-click the Sources panel.
2. Choose one of the following:
    - Connection Manager: For SQL Race databases
    - Folder Manager: For local or network folders
    - Service Connection Manager: For RTA hosts

Once added, ATLAS will index the source and display available Sessions in the Session List.

### 2. Session Filters
Filters help you narrow down the Sessions displayed in the Session List. By default, filters include:

- Circuit
- Driver
- Run Type

You can customise filters by:

1. Right-clicking the Filters title to see all available categories
2. Selecting or deselecting filter options
3. Saving filter combinations as Favourites for quick reuse

### 3. Session Recorders

This panel is used to configure and manage data Recorders for capturing live telemetry. Supported Recorder types include:

- Data Server Telemetry
- Ethernet Telemetry
- File Telemetry
- Ethernet Multi-session Offload Data Recorder
- TCP Listener Recorder
- NASCAR Recorder (requires NASCAR licence)

#### Recorder Modes

When adding a Recorder to a Set, you can define its behaviour:

- Create: Each new recording creates a new Session.
- Replace: Each new recording replaces the previous Session in the Set.
- Append: New recordings are appended to existing Sessions, forming a Composite Session.

!!! note
    Starting a Recorder does not automatically load the Session into a Set. You must manually add it using the Session List or drag the Recorder into a Set.

### 4. Session List

This panel displays all Sessions available from the selected source. Each entry includes metadata such as:

- Session type (Historic or Live)
- State
- Driver
- Circuit
- Number of laps

You can:

- Search for Sessions using the search box
- Right-click to add Sessions to new or existing Sets
- Drag Sessions into Sets or onto other Sessions to create Composite Sessions
- Select multiple Sessions using `Shift + Click` or `Ctrl + Click`

### 5. Compare Sets List

Also known as the Set List, this panel shows which Sessions and Recorders are currently loaded into each Set. 

Features include:

- Viewing Sessions within each Set
- Expanding Composite Sessions to see individual components
- Removing Sessions from Sets
- Customising columns (changes apply to both this panel and the Session List)

The active Set is highlighted with a coloured outline.

### 6. [Session Properties](properties.md)

This panel displays detailed metadata for the selected Session. Properties are colour-coded:

- White fields: Editable
- Grey fields: Read-only

Editable properties include:

- Session Name and Number
- Driver, Car, Engine, Circuit
- Weather, Notes, and other descriptive fields
- Lap Trigger Offset (used to align data across Sessions)