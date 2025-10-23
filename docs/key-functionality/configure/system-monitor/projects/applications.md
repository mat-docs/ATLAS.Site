# Application Management

## Applications

Applications represent functional areas of the ECU system, such as:

- **BIOS** – core control system
- **Chassis** – vehicle chassis control
- **Engine** – engine control

Each application is linked to a Customer Base and can be set as Active or Read Only.

## Active Applications
Only Active Applications are affected by operations such as tuning and reprogramming.

### Managing Active Status

- Use `File > Active Application` or right-click in the Parameter Explorer.
- Shortcut: `ALT+A`
  - In Parameter Explorer or ECU Bar: toggles active status.
  - In Main Window: cycles through applications if only one is active.

**Note**: Changes can only be made when the ECU is Off-Line and Live Updates are disabled.

## Read Only Applications
Applications can be set to Read Only via the File Menu or Context Menu. An application that is both Active and Read Only cannot be edited but is included in operations like reprogramming.

## Application Properties

Accessible via `File > Properties > Application`.

Tabs include:

- **Program Version** – shows file details and source files.
- **Data Version** – shows current data file and metadata.
- **Memory Layout** – displays memory usage.
- **Unlock List Management** – controls access to parameters.

## Unlock List Management

Used to restrict editing of parameters within an application.

- Unlock lists are managed per team.
- Parameters can be added or removed via the Select Parameters dialog.
- Once locked, an application cannot be unlocked. Backups should be created beforehand.
