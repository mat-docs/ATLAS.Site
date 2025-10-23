# Data Version Development
## Edit Buffer

The Edit Buffer stores changes to editable parameters during tuning.

- Changes can be sent to the ECU immediately (Live Tune) or on demand.
- Only Active Applications can be tuned.
- Changes are saved as new Data Versions.

### Backup

Edit Buffer backups are stored as:

```
\MultiAppName\CustBaseName\version\version000xxx.dvb
```
Where `xxx` is the current user name.

## Using Data Version Files

To load a different Data Version:

1. Select the Active Application.
2. `File > Open > Data Version (.dtv)`
3. Browse and select the file.

Changes to the Edit Buffer prompt a save when the ECU is taken Off-Line or the project is closed.

## Saving Data Versions

- File name format: `versionnnn.dtv`
- `nnn` is a three-digit hex number incremented with each new version.
- Comments and notes can be edited before saving.
- Old versions are retained unless overwritten manually.

## Export to MATLAB

Data can be exported for analysis:

- `Tools > Export to MATLAB > Definition and Data` or `Data only`
- Output format: `.m` script files
- One file per Active Application

## Importing Hex Files

Hex files can be imported to create new Data Versions:

- `File > Import Hex File`
- Compatible files generate a new Data Version

## Data Wizard

Used to compare and merge Data Versions.

### Features

- Compare/Merge Tool
- Candidate Version Window
- Report View Window

### Compare/Merge Tool

- Compares up to two candidate versions with the Edit Buffer.
- Merge Buffer stores temporary changes.
- Changes can be committed to the Edit Buffer.

### Map Compare Window

- Displays 1-Axis and 2-Axis maps.
- Highlights differences and allows direct editing of current values.

### Context Menu Options

- Copy/paste between Dtv1, Dtv2, Memory, and clipboard.

### Minimum/Maximum Data Versions

- Saved as `<pppp>MIN.dtv` and `<pppp>MAX.dtv`
- Used to validate parameter ranges.

## Candidate Data Versions

- Open via `Data Wizard > Open Data Version`
- Display differences using icons and masks

## Report View

- Shows changes made since the last save
- Updated manually via `Compare` or `Compare All`

## Parameter Masking

Filters parameters by type of difference:

- Absent
- Different Definition
- Different Size
- Different Data Type
- Different Conversion
- Different Units
- Different Value
- Equal

## Merge Operations

- `Merge` – merges displayed parameters
- `Merge All` – merges all parameters
- Conflicts resolved via dialog boxes

## Viewing Parameters

Context menu options:

- View Edit Buffer
- View Candidate Data Version
- View Both
- View Differences

## Window Menu

Controls display settings:

- Equal / Different Value
- Groups / Flat List
- Parameter Mask options