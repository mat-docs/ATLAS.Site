# Project Management

System Monitor has various safeguards to ensure that only the correct data and programs are transferred to an ECU. This is done either by using the Customer Base, which links the ASAP project to the file directories used by System Monitor or Unit.DefManagement.

Each control system has associated ASAP and Hex files, which should be supplied by the ECU manufacturer. System Monitor generates Program and Data Version files from these ASAP and Hex files and only accepts ASAP files from the ASAP project specified in the Customer Base. The Program and Data version files are placed in the Customer Base directory.

A System Monitor Project links the Program and Data version files for an ECU with the Desktop that you use to configure the ECU. When Customer Bases are used, each project is associated with a Multi-Application Base that contains one or more Applications. The Project files are placed in the Multi-Application Base Directory. When Unit.Def support is used, the project file location is used as the base directory.

The Customer Bases and the Multi-Application Base are set up as part of your software package. If you have Free User status, you can create new Multi-Application Bases.

Whenever any Editable Parameters are changed, a new Data Version file is created. The old Data versions are retained so you can go back to them if you need to (see Developing Data Versions).

The System Monitor Data Wizard allows current Data versions and previous Data Versions to be compared and, if required, merged.

The Project also contains other settings for the ECU such as Logging and Sensor configurations.

## Applications

Applications help different engineering development teams to work together. A typical set of applications would be:

- **Bios** - the operation of the control system itself,
- **Chassis** - the operation of the vehicle chassis,
- **Engine** - the operation of the vehicle engine.

Whenever a development team changes any Editable Parameters, a new Data Version is created. The changes made in an application are filed in its customer base directory and do not affect the other applications (see Developing Data Versions).

If Customer bases are used, each Project is associated with a Multi-Application Base which contains one or more Applications. Each application is associated with one Customer Base.

For Unit.Def support, the project is associated with the Unit.Def file.

When a Project is open, one or more of the applications are set as the Active Applications.

## Active Application

A Project contains one or more Applications. System Monitor controls which applications are affected by various operations, especially those involved in Developing Data Versions.

The applications that are affected are called the Active Applications.

The Active Applications are shown in bold in the Parameter Explorer and the ECU Bar.

### Make an Application Active/Inactive:

1. Select an Application in the Parameter Explorer
2. Select File > Active Application or right-click and select Active Application from the Context Menu.

!!! note
    You can only change the status of an Application when the ECU is Off-Line and Live Updates is Off.

The shortcut key `ALT+A` is used to select Active Applications. Its action depends on where it is used:

- In Parameter Explorer or ECU bar - `ALT+A` toggles the Active status of the selected application. If no application is selected, `ALT+A` has no effect.
- In the Main Window - If only one application is Active, `ALT+A` cycles through the applications making each one Active in turn. If more than one application is Active, `ALT+A` has no effect.

Applications can also be set to Read Only using commands in the File Menu and the Parameter Explorer Context Menu. An Application that is Active AND Read Only cannot be edited but is included in functions that operate on Active Applications such as Reprogramming.
