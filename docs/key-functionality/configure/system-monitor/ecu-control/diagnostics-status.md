# Diagnostics & Status

This section covers tools and views that help users inspect ECU status, synchronise files, and verify program and data versions.

---

## Unit Status

The **Unit Status** dialog shows which files are loaded into the Edit Buffer, the main ECU unit, and the spare unit (if configured).

- Open via: `Tools > Unit Status`
- Columns: Project, ECU, Spare
- Rows: Data Versions, Sensor Sets, Configurations, History

### Cell Colours

- **White**: Unit matches System Monitor
- **Red**: Different program or data version
- **Orange**: Same version, different Live Tunes
- **Blue**: Different configuration
- **Yellow**: Selected cell

### Symbols
- `*`: Data modified but not saved
- `?`: Info unavailable from ECU
- `(L)`, `(L2)`: DTV locked with standard/enhanced RDA

### Controls

- **Refresh**: Updates display
- **<<Sync SM**: Sync System Monitor to ECU/Spare
- **<<Upload**: Upload ECU/Spare data to Edit Buffer
- **Download>>**: Send Project data to ECU
- **Sync Unit>>**: Sync ECU with Edit Buffer
- **All Sync Unit>>**: Sync all ECU files with Edit Buffer
- **Spare>>**, **Sync Spare>>**, **All Sync Spare>>**: Same as above, for Spare unit

---

## ECU Search

Provides detailed information about Program and Data Versions stored in the ECU.

- Select: `ECU > Search for Versions`
- Opens after selecting an Application

### Tabs

- **Program Version on ECU**: Filename, Saved By, Saved On, Comments, Notes
- **Data Version in Flash-RAM**: Same metadata for Data Version

### Search Behaviour

- System Monitor uses stored IDs to locate files
- Search triggered when:
  - Project is loaded
  - ECU memory changes
  - ECU reconnects
- Manual search: `Query Versions` command

> If the Reference Controller is faulty or disabled, Program Version cannot be located.

### Search Order for Data Version Files

1. Directory of current project data version
2. Directories linked to detected program version
3. Entire Customer Base directory (can be disabled via Advanced Settings)

---

## ECU Properties

Displays hardware and controller information for the connected ECU.

- Select: `ECU > Properties`

### Tabs

- **Controllers**:
  - View and enable/disable controllers
  - Checkbox indicates connection status
  - Greyed checkbox: partially connected application

- **Devices**:
  - Shows ECU type (as specified and detected)
  - Serial number
  - IP address (from Unit Definition)

## Advanced Settings

Advanced Settings allow users to customise System Monitor behaviour.

### Key Options

- **Timeout before link lost**  
  Sets the duration System Monitor waits before declaring the ECU link lost.

- **Go online when opening project**  
  Set to `Y` to automatically put the ECU On-Line when a project is opened.

- **Warn if Program Versions do not match**  
  Set to `N` to suppress the ECU On-Line mismatch warning and assume "Ignore".

- **Search base for versions**  
  Set to `N` to prevent System Monitor from searching the entire Customer Base directory during ECU Search. This speeds up response time.

!!! note
    - These settings are typically accessed via the Advanced Settings dialog box.
    - Changes to these options can affect how System Monitor interacts with the ECU, especially during startup and version checks.
