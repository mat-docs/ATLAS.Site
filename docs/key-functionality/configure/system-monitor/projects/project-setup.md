# Project Setup

## Customer Base

A Customer Base links an ASAP project to the file directories used by System Monitor. It ensures that only files associated with the specified ECU are used.

- Each Customer Base defines an Application within a Project.
- Customer Bases are associated with Projects via a Multi-Application Base.
- Editable via the Select Active Multi-Application Base dialog.

### Adding or Editing a Customer Base

Use the Enter Customer Base Details dialog:

- **Customer Base**: Unique name.
- **ASAP Project**: Must match the project name embedded in the ASAP file.
- **Base Directory**: Must be a sub-directory of the Multi-Application Base directory.

Overwriting or removing a Customer Base that is part of a Multi-Application Base will break access to its data.

## Multi-Application Base

Controls access to files and prevents incorrect ECU programming.

- Contains one or more Customer Bases.
- Typically set up by the control system supplier.
- Can be added or removed by Free Users.

### Selecting a Multi-Application Base

1. Go to `File > Select Base`.
2. Choose from available bases in the dialog.

### Prime Parameter Override File (.ppo)

Used to configure prime parameters in logging setups. Format:

`App id, parameter identifier, minimum frequency1,vCar,200 1,tTotalShiftTime,500`

- No header line.
- Minimum frequency of 0 removes the prime property.
- Requires "Enforce Prime Parameter Requirements" to be enabled.

## Free User Status

Free Users can:

- Create and remove Multi-Application Bases.
- Load any ASAP file without restriction.
- Access any directory under the Free User Base Directory.
