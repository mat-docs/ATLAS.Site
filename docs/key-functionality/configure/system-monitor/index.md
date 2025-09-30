# System Monitor User Guide

System Monitor is a software application for interfacing with Electronic Control Units (ECUs) and related systems. It supports trackside support, unit optimisation, dyno testing, development, and production. The application is optimised for TAGtronic systems but can be adapted for third-party controllers with hardware modifications.

## Key Features

- **ECU Program Management**
    - Upload and download ECU program files.
    - Ensure the latest program versions are available.

- **Tuning**
    - View and modify editable ECU parameters.
    - Apply changes instantly (Live Tune) or offline.
    - Supports automatic tuning with a Testbed.

- **Parameter Information Display**
    - Monitor measurement parameters for live feedback.
    - Access real-time data for diagnostics.

- **Data Logging Configuration**
    - Set up and manage data logging on TAGtronic ECUs.
    - Customise logging for specific needs.

- **Sensor Configuration**
    - Calibrate sensors and actuators connected to the ECU.
    - Configure the DATALab system for advanced sensor management.

!!! note
    Some features may require hardware modifications for third-party controllers.

## Getting Started

Follow these steps to start using System Monitor:

**1. Install System Monitor**

Insert the Installation CD-ROM and run `Setup.exe`. If the installer does not start automatically, use Windows Explorer to locate and run the setup file.

**2. Insert Your CA-Card or Licence Dongle**

Licensing via dongle or network card enables System Monitor activities without an ECU connected.

**3. Load ECU and Project Management Files**

**4. Connect Your ECU**

**5. Start System Monitor**

**6. Select a Multi-Application Base or Configure a Unit.Def File**

Customer bases control file access to prevent incorrect ECU programming. Associate customer bases with a project using a Multi-Application base.

- Select **File > Select Base**.
- Choose a Multi-Application Base and click **OK**.

**7. Create a New Program Version for Each Customer Base**

Define Program and Data Version files for each Application in the Multi-Application Base.

- Select **File > New**.
- In the dialog, select **Program Version** and click **OK**.
- Choose files to include in the Program Version.

**8. Create a Project**

A Project links all files needed to work on an ECU.

- Select **File > New**.
- Choose **Project** and click **OK**.
- Complete the sequence of dialog boxes to define the Project, connection method, Desktop filename, and Program Version for each Customer Base.

**9. Use Your Desktop to Tune and Configure Your ECU**

Some tasks may be completed by your ECU manufacturer, who can supply the necessary files.

## Installation

Three installation types are available:

- **Typical:** Installs all files for supported ECUs.
- **Custom:** Choose which components to install.
- **Complete:** Installs all files.

System requirements are checked during installation (memory, disk space, processor). Default install directory:  
`C:\Program Files\McLaren Electronic Systems\System Monitor 8`

System Monitor icons are added to the default program folder: `\System Monitor\`

You may be prompted to restart your computer after installation.

### Custom Installation

Custom Installation lets you select components to install. Default settings match Typical Installation for first-time installs. Changed settings are remembered for future installations.

Available options:

- **Program Files:** System Monitor, CA-Card embedded code, TAGASAP conversion utility, SaxBasic.
- **Help Files:** Install help system.
- **Registry:** Modify Windows® Registry for licences and bases.
- **Device Drivers:** Install drivers for hardware devices (e.g., CA-Card).
- **DESKey Dongle Drivers:** Install drivers for DK2 USB, Parallel, and Network dongles.
- **VE-82 Drivers:** Install drivers for VE-82 Pot Board (run `USBDriverInstaller.exe` manually after installation).

## PC System Requirements

| Component         | Minimum                        | Recommended                   |
|-------------------|-------------------------------|-------------------------------|
| **Processor**     | Intel Core Duo 2 GHz           | Intel Core i7 Processor       |
| **Memory**        | 1 GB                           | 8 GB or higher                |
| **Disk Space**    | HDD with 200 GB free space     | High capacity SSD 512 GB+     |
| **Operating System** | Windows 10                  | Windows 10                    |
| **Installation/Data Transfer** | CD-ROM drive, FTP site | CD-ROM drive, FTP site    |
| **Power Supply**  | Rapid battery recharge recommended (not trickle charge) while applications are running | Rapid battery recharge recommended (not trickle charge) while applications are running |

## Licensing

System Monitor can be licensed by:

- Communications adapter card (CA-card)
- Dongle
- Network card address

Licensing via dongle or network card allows activities without an ECU connected. Dongles are available in USB format.

Licences purchased from Motion Applied are tied to a specific dongle, CA card, or network card serial number. The licence determines available functions and supported ECU types.

You may need a Custom Installation to configure your computer for licences.

Licence codes control feature access. All features are present, but only licensed modules are unlocked. New licences unlock additional features.

### Licence Checking

System Monitor checks licences when commands are selected. If a command is not licensed, you are prompted to add a licence or cancel. Adding a licence rechecks and executes the command if licensed.

### Adding a Licence

Open the Add Licence dialog via **Help > Add Licence** or **Add Licence** in the Licence Required dialog.

!!! note
    Later versions use a Licence File stored locally, defining teams and options. Licences are managed online at [Motion Applied Portal](https://portal.motionapplied.com/)

The window lists added devices (type and serial number). Select a device to view its licence profile.

- **Add New:** Browse for Licence Files.
- **Remove:** Remove selected licence.
- **Export:** Export the licence file.
- **Devices:** List connected devices.
- **Detect:** Search for accessible devices.
- **Active Team:** Select from the drop-down list.
- **Licence Details:** View licence profile summary.

Applications listed under a team are unrestricted for that team.