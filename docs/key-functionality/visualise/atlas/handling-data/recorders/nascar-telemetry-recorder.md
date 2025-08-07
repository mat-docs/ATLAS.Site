# ATLAS for NASCAR Telemetry

ATLAS can be used for receiving and visualising Telemetric data from NASCAR’s Event Racing Data Platform. It is designed to connect to the data feed delivered live via JSON messages published from NATS.io message broker. The integration provides complete ATLAS data analysis functionality for use with the data from NASCAR. ATLAS currently supports all of the information collected to the CAN bus from Motion Applied Applied’s TAG-400N.

## Prerequisites
* Access to live NATS data feed from NASCAR. Request Subscriber Access from NASCAR by emailing [data.engineering@nascar.com](mailto:data.engineering@nascar.com)
* ATLAS v11.3.1.540 or higher, which can be downloaded via our Motion Applied Portal [https://portal.mclarenapplied.com/](https://portal.mclarenapplied.com/)
* ATLAS Licence with NASCAR Telemetry Recorder add-on. Please contact [sales@mclarenapplied.com](mailto:sales@mclarenapplied.com)

## Setup
Once ATLAS has been installed and licensed:

**Configure NASCAR Server connections**

* Open ATLAS and click Tools | Options | Recorders | NASCAR Telemetry Recorder 
* Edit and configure Integration (Replay), Trackside and Cloud NASCAR Server connections
![nascar-server-connections.png](assets%2Fnascar-telemetry-recorder%2Fnascar-server-connections.png)

!!! note
    * You will receive two sets of credentials from NASCAR:
        * Production - add these to your Trackside and Cloud server connection settings
        * Integration - add these to your Integration (Replay) server connection settings

* Update the credentials / ca-file / cert-file / key-file paths so that they point to the subscriber credentials from NASCAR
![nascar-server-connection.png](assets%2Fnascar-telemetry-recorder%2Fnascar-server-connection.png)

* Click OK on the NASCAR Server connection

**Configure Wideband minimum lap time**

* In the Recording option (Tools | Options | Recorders | Recording | General) set Wideband minimum lap time (secs) = **1** second
![wideband-minimum-lap-time.png](assets%2Fnascar-telemetry-recorder%2Fwideband-minimum-lap-time.png)
* Click OK to save and close the Options screen

**Add a NASCAR Telemetry Recorder**

* In Session Browser, add a NASCAR Telemetry Recorder
![ntr-session-browser.png](assets%2Fnascar-telemetry-recorder%2Fntr-session-browser.png)

* Configure the NTR Recorder Editor dialog  
![ntr-recorder-editor.png](assets%2Fnascar-telemetry-recorder%2Fntr-recorder-editor.png)
!!! info
    * Recorder Name - can be any friendly name e.g. Car 6
    * Server:
        * Trackside - for use at track (recommended hard-wired)
        > Wi-Fi can be very spotty; if data has dropouts, then wired connection will be necessary. Dropouts have not been seen in remote recordings of data.
        * Cloud - for use at factory or other non-track locations
        * Integration (Replay) - for use after event, replays constant stream of data for testing purposes
        * File Telemetry - for replaying JSON files from previous events. These can be then be saved to an SSNDB or as SSN2 files.
    * Session Identifier - name of the session can be configured using tokens and information from the data, e.g. $SeriesId$_$RunType$_$RaceId$_$VehicleId$_%y%m%d%H%M%S
    * Car Number - Select a vehicle ID to get the relevant data for that car
    * Database engine - Select SQLite for storing data in a local cache. SQLServer option can be selected if there is a SQL Race database set up.
    * Database path - If SQLite option is selected, user can set a local path, folder and name the .ssndb for the local cache. For SQLServer option, a connection string for the database will be needed.
    > Do not use a folder location which is being used to sync the content of the folder to OneDrive. This doesn't work well with the Recorders as ATLAS has to constantly write and read from this location.
    * Auto Export SSN2 - If you check this box an SSN2 export for every recording will be saved such that it creates a file per start/stop of the recorder.
* Select Close and add the recorder to a SET, then click start. If the NATS server is streaming data, the NTR recorder box will begin to flash red if a connection is achieved. If parameters are not present it is possible the car is not streaming.
> If the recorder is not working, this might be down to a Firewall issue, so please check with your IT department
!!! note
    * You can also access the previously recorded JSON files from [https://teamcontent.nascar.com/](https://teamcontent.nascar.com/)  These file can be downloaded and played back into ATLAS and recorded as SSN2 files.
    > The JSON files must be copied into: C:\NASCAR\race_data

## Hints and Tips 
!!! tip
    * ATLAS performance is dependent on the hardware it is being run on and scales based on the processors and RAM available to the ATLAS application. We recommend using i7 or higher processor for running multiple recorders i.e. for streaming data from multiple cars.
    * Queue Size - we have included a diagnostic parameter called Queue Size, which tells how many packets are in the queue still to be processed. Low number (10's) denotes that the application is keeping up with the live stream, if not please check the recommended hardware requirements for ATLAS.
    * Numeric Displays and some parameters will need parameter Display Min and Max set. By default, they are way out of range and will load in very tiny text. Max 100 and Min 0 is a good starting point.
    * The provided Workbook has a Diagnostic Bit display. The APPStatus and BIOSStatus appear to be correct in the messages sent from server. The NLEDFlashFaults appear to be wrong, and NASCAR is aware.
    * Alarms and Functions will work with NTR data, but ATLAS cannot handle parameter names with spaces. So “Engine Speed” will not work in a function or alarm. NASCAR is aware of this, and we will investigate either getting the parameter names changed or updating ATLAS to accept name spacing.
    * All sessions by default will record into a SQLite database on your hard drive and export to SSN2 if you choose. SRMS (SQL Race Management Studio) can be used to edit or delete sessions from your SQLite databases after a weekend if they are not required. Please contact an FAE for further guidance on using SRMS.

## Known Limitations
!!! warning
    * Data stream is UTC time and at 23:59.59 (7pm EST) ATLAS will stop recording. Restarting recorders will be necessary. This is known and our ATLAS team is looking at this.
    * Recorders - There is a known issue with ATLAS Telemetry Recorders (NTR included). If a recorder is added to a set and then removed, the recorder will disappear when ATLAS is restarted. This can be very inconvenient, so we recommend assigning a recorder to a set and leaving it. You can have up to 20 sets in a workbook and probably won’t have more than 20 recorders running at once.