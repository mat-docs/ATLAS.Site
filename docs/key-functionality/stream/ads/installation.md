# Getting Started

This guide walks you through installing and configuring the ATLAS Data Server (ADS) to manage and store telemetry data.

## Installation Steps

1. **Download the Installer**  
    Get the latest ATLAS Data Server installer from the [Motion Applied Portal](https://portal.motionapplied.com/portal/Downloads/Software#Standalone%20ADS).

2. **Run the Installer**  
    Launch the installer and follow the on-screen instructions.

3. **Configure the Server**  
    After installation, open the Standalone ADS application: `Start > All > McLaren Applied Technologies > Data Server`.

    To add a SQLRace Database as a data source: `Tools > SQLRace > Connection Manager` and click **Add** to enter your SQL Server instance details.

!!! note
    If you use ADS with SQLRace, install and configure SQLRace first. See the [SQLRace setup guide](../sqlrace/installation.md).

## Data Server Setup

### Server Settings File

The Server Settings file contains all of the setup information for ATLAS Data Server. It's important to spend time configuring these settings so that you don't need to repeat the process every time you open ATLAS Data Server.

1. Create a Server Settings File by creating a new file `AtlasServer.sbk` and saving it to a known location.

2. Go to `Tools > Options`

3. Under `Recording > General` find `Server Settings File` and enter the path to your `AtlasServer.sbk` file.

### Log File

The ATLAS Data Server creates a log file to record all events during operation. This log file is essential for troubleshooting and monitoring the server's performance. 

1. Under `Recording > Logging (Debug)` find Log File Folder.

2. By default the log file is created here : `C:\Documents\McLaren Electronic Systems\ATLAS 9\Log `, to update the location change the path.

### Setting up IP addresses

1. Go to `Tools > Options > Data Server`

2. Find `Wide Band local address` and copy your IP address

3. Click OK to save and close the Options window.

### System Monitor Paths

Setting up the System Monitor paths allows ATLAS Data Server to locate the necessary configuration and data files for proper processing. 

1. Go to `Tools > Options > System Monitor Folders`

2. In the System Monitor Base Folder field enter the path to the System Monitor project (.pgv).

3. In the Logging Configuration Folder field enter the path to the logging configuration folder (LogCfgs) inside of the System Monitor project.

4. Click OK to save and close the Options window.