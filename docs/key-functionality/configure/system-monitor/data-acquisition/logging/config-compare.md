# Logging Configuration Files

System Monitor uses configuration files to manage logging setups for Live, Remote, and Burst logging.

## File Management

- **Create New**: `File > New`
- **Open Existing**: `File > Open`
- **Save Changes**: Prompted on close or via `File > Save`
- **Save As**: Preserve old configurations under new names

## Project Structure

- Each logging type has its own directory.
- Only one configuration of each type can be loaded per project.

## Upload/Download

- **Upload**: ECU → System Monitor
- **Download**: System Monitor → ECU
- Manual operation via menu commands.

!!! warning
    Parameters not defined in the current system description are discarded during upload.

## Remote Configuration Compare

System Monitor allows comparison and merging of Remote Logging configurations. Select `Logging > Remote Configuration Compare`

### Features

- Load/unload secondary configuration
- View differences in logging slots and parameters
- Merge options:
  - Channel title/type
  - Row (parameter)
  - Channel (all parameters)
  - Cell (individual values)

### Tabs

#### Config Tab

- Highlights differences in sampling rates
- Colour-coded for clarity
- Context menu for merging

#### Triggers Tab
- Displays trigger differences
- Merge options:
    - `<<` to merge
    - `X` to undo
    - `Next` / `Prev` to cycle
