# Application Management

## Applications

Applications represent functional areas of the ECU system, such as:

- **BIOS** – core control system
- **Chassis** – vehicle chassis control
- **Engine** – engine control

Each application is linked to a Customer Base and can be set as Active or Read Only.

## Active Applications

A Project contains one or more Applications. System Monitor controls which applications are affected by various operations, especially those involved in Developing Data Versions. The applications that are affected are called the Active Applications.
The Active Applications are shown bold in the Parameter Explorer and the ECU Bar.

### Managing Active Status

- Use `File > Active Application` or right-click in the Parameter Explorer.
- Shortcut: `ALT+A`
  - In Parameter Explorer or ECU Bar: toggles active status.
  - In Main Window: cycles through applications if only one is active.

!!! note
    Changes can only be made when the ECU is Off-Line and Live Updates are disabled.

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

The Unlock List Management tab allows teams to Manage the Unlock Lists associated with the Application. Unlock lists are managed on a per Application basis, if the user is authorised for full access to that application.

- Unlock lists are managed per team.
- Parameters can be added or removed via the Select Parameters dialog.
- Once locked, an application cannot be unlocked. Backups should be created beforehand.

!!! note
    Before locking an application, you should ensure that a backup of the unlocked application is created, as you cannot unlock an application once it is locked.  Due to the unlocked state of this application, you should store it in a secure location.
