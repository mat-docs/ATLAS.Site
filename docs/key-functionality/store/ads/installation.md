# Getting Started

This guide walks you through installing and configuring the ATLAS Data Server (ADS) to manage and store telemetry data.

## Prerequisites

| Requirement      | Minimum Supported                | Recommended                   |
|------------------|----------------------------------|-------------------------------|
| Operating System | Windows 11                       | Windows 11                    |
| Memory           | 1 GB                             | 8 GB or higher                |
| Processor        | Intel Core Duo 2GHz              | Intel Core i7 Processor       |
| Disk Space       | HDD with 200 GB free disk space  | SSD with 512 GB or more       |

## Installation Steps

1. **Download the Installer**  
    Get the latest ATLAS Data Server installer from the [Motion Applied Portal](https://portal.motionapplied.com/portal/Downloads/Software#Standalone%20ADS).

2. **Run the Installer**  
    Launch the installer and follow the on-screen instructions.

3. **Configure the Server**  
    After installation, open the ATLAS Data Server configuration tool to set server parameters, such as data storage locations.

    To add a SQLRace Database as a data source: `Tools > SQLRace > Connection Manager` and click **Add** to enter your SQL Server instance details.

!!! note
    If you use ADS with SQLRace, install and configure SQLRace first. See the [SQLRace setup guide](../sqlrace/installation.md).

4. **Add a Recorder**  
    To start recording data, go to `Setup > Add` and select the recorder type. Follow the prompts to configure recorder settings.

## Using ATLAS Data Server

- Install ATLAS with the ATLAS Data Server option selected in Custom Installation.
- Your ATLAS license must include Wide Band Telemetry permissions.

### System Requirements

- **Server PC:**  
  - Must run ATLAS Data Server (ATLAS itself is optional on the server).
- **Client PCs:**  
  - Must run ATLAS.
  - Set the data source to **Data Server Wirelink** or **Data Server Telemetry** in the Record dialog.

> Multiple Server PCs can operate on the same network. Each car transmitting simultaneously requires a separate Server.

## ATLAS Data Server Setup

- Use the **Setup** button in the ATLAS Data Server dialog to open the Record dialog for managing session recordings.
- Settings are saved for the Data Server only and do not affect ATLAS settings.
- The settings file location is set as **Server Settings File** in the Options dialog (Recording Tab).

> **Tip:**  
> The Record dialog is also used in ATLAS. Many commands are shared. See the ATLAS Help for details.

## Record Dialog Tabs

- **General:**  
  ATLAS Data Server only. Configure general recording options.
- **All:**  
  Shared by ATLAS and ATLAS Data Server. Change settings for all configured data sources at once.
- **Data Sources:**  
  Add new data sources using the **Add** button. See the Interface Settings folder for details.

> **Note:**  
> The Remote Data Server recorder is specific to Remote Data Server functionality. See Interface Settings - Remote Data Server for more information.

