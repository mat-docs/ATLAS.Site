
# Options Dialog

To access the options dialog box, go to `Tools > Options` in ATLAS Data Server (ADS).

![Options](assets/options.png)

## Recording Tab

The Recording tab of the Options dialog box contains advanced settings used to configure the Recording system.

| Name | Description | Default | Area |
|---|---|---|---|
| Coverage Minimum Percentage | This option sets the minimum percentage of quads received before the Coverage Cursor moves to its next position. | 98% | Coverage Cursor Settings |
| Coverage Timeout | The maximum time allowed for the Coverage Minimum Percentage to be reached. The Coverage Cursor moves to its next position when the Coverage Timeout is exceeded. | 60s | Coverage Cursor Settings |
| Coverage Cursor Span (%) | Controls how the coverage cursor is calculated on an incomplete block (under construction); not used for completed blocks. See the coverage cursor section for more info. | 50% | Coverage Cursor Settings |
| Quad Sources Excluded From Coverage | Comma-separated list of streams to exclude from the coverage cursor calculation. See the coverage cursor section for more info. | 7 (excludes stream 7 – CBT data stream) | Coverage Cursor Settings |
| Plot Coverage Percentage | Plots coverage cursor % as a green line in the Data Server Statistic Panel; line height = percentage, time = delay. | FALSE | Coverage Cursor Settings |
| Custom Quad Buffer Size in Quads per Source | Buffer size to cover payload when data quads are missing (used for custom data logging units). | 100000 quads per source | Custom Decode DLL Settings |
| Load Decode DLL at Startup | When TRUE, loads the Decode DLL on application startup. | FALSE | Custom Decode DLL Settings |
| Unload Decode DLL after Recording | When TRUE, unloads the Decode DLL after recording. | FALSE | Custom Decode DLL Settings |
| Max Quads Generic Recorder Groups Before Sending | Limits max quads sent in one group so the generic recorder sends more often. | 10 | Custom Decode DLL Settings |
| Data Servers | List of ATLAS Data Server names and corresponding ports in the form `{Server:Port}`. | Empty list | Data Server Settings |
| Wide Band Local Address | Selects which network card is used for sending/receiving data; shows IPs of all NICs present. | ANY | Data Server Settings |
| Data Server Connection Timeout (ms) | Time ATLAS waits for data from a Data Server before stopping recording. | 20000 ms | Data Server Settings |
| Server Auto-Refresh Frequency (ms) [0=disable] | Periodic refresh of current data servers shown in the Record dialog. | 2000 ms | Data Server Settings |
| Server Auto-Refresh Reply Timeout (ms) | Time before a data server is deemed offline when no activity is detected. | 100 ms | Data Server Settings |
| Timeout for Searching for Data Servers (ms) | Time clients search for available Data Servers before timing out. | 3000 ms | Data Server Settings |
| Server Reply Timeout (ms) | Time ATLAS waits for a reply from a Data Server. | 3000 ms | Data Server Settings |
| Data Server Buffer Size Mb | Size of client storage buffer for incoming data; should be large to avoid loss on poor networks. | 20 MB | Data Server Settings |
| Data Server Retries Enabled | When TRUE, client may retry loading data from the network. | FALSE | Data Server Settings |
| Close Record Dialog after Start/Stop Recording | If TRUE, Record dialog closes when Start/Stop clicked; if FALSE, stays open. | TRUE | General Settings |
| Show Record Error Messages | When TRUE disables recording error pop-ups and writes errors to the Data Server log file. | FALSE | General Settings |
| Minimum Disk Space (MB) | If free disk space drops below this value, recording stops (with warnings beforehand). Minimum value is 500MB. | 500 MB | General Settings |
| Enable Record to Disk | When FALSE, data is only multicast to clients; no session is saved. | TRUE | General Settings |
| Wideband Min Lap Time | Rejects lap triggers that occur less than this time apart (>0s). | 10s | General Settings |
| Quad sources excluded from lap trigger | Rejects lap triggers sourced from listed streams (comma-separated). | Blank | General Settings |
| Virtual Memory Block Size (KB) | Virtual memory slot size used by memory mapping in ATLAS. | ATLAS: 5120 KB; ADS: 1024 KB | General Settings |
| Server Settings File | Location of the server workbook (.sbk) holding Data Server configuration settings. | `<Drive>:\Documents and Settings\<user>\My Documents\McLaren Electronic Systems\ATLAS 9\Workbooks\` | General Settings |
| Record Telemetry Data From Start | If TRUE, client session includes data from the start of Data Server recording; if FALSE, only from time recording starts. | FALSE | General Settings |
| Record Only Live Data | If TRUE, recording stops as soon as telemetry has been uploaded (requires Enable Update Progress on clients = TRUE). | FALSE | General Settings |
| Auto Record Connection Check Interval (ms) | Time ATLAS waits before stopping Automatic Recording. | 1000 ms | General Settings |
| Unload Session on Start Recording | When TRUE, previously recorded session is removed from memory when new recording starts. | FALSE | General Settings |
| Unload Unused pgvs on Start Recording | When TRUE, PGVs are removed from the cache when recording starts. | FALSE | General Settings |
| DTV Rename Cached Files | When TRUE, cached DTV files include `_Cached` in the filename; set 'Unload Unused PGVs on Start Recording' if cached file not required. | FALSE | General Settings |
| Auto Increment Run Number | Automatically increments Session Number name (e.g., R1, R2) for sequential recordings. | FALSE | General Settings |
| Save Client Config File to Disk | When TRUE, file is automatically saved to disk; when FALSE, kept in memory only (lost on restart). | FALSE | General Settings |
| Use Only the Highest Rate Continuous Channel in Merging | Uses channel with the highest sample rate when merging parameters. | FALSE | General Settings |
| Hours to Delete Configs (0 = Disabled) | Automatically delete obsolete config files to optimize resources. | 0 (disabled) | General Settings |
| Enable 'Still Processing Parameters' Dialog | Warns that parameter processing from config files is incomplete if recording ends prematurely. | TRUE | General Settings |
| Default disabled 'Still Processing Parameters' to continue | (No description provided.) | Not specified | General Settings |
| Automatic Multicast Address | When TRUE, server derives Multicast IP from last three integers of Local IP bind. | FALSE | General Settings |
| Setup Recorders From Registry | Saves Recorder settings in registry rather than with a Workbook. | FALSE | General Settings |
| Temporary Directory for Recording Files | If set, session files first written to temp directory, then copied to data path on stop; if blank, written directly to data path. | Blank | General Settings |
| Regenerate Merged Channels at the end of a Recording | When TRUE, merged data is regenerated at end of recording. | FALSE | General Settings |
| Transmission Timeslice | Period ADS sends multicast to the network (reducing may even peak load); 10ms should be minimum. | 10 ms | General Settings |
| Delay Wirelink Upload after Recording | Delay (seconds) for data upload from unit at end of recording. | 0s (no delay) | General Settings |
| Auto-Dismiss Config Search Box | When TRUE, config search box auto-closes. | TRUE | General Settings |
| Recording Event Script | User-defined script called in a new process on recording events (LIVE_STARTED, LIVE_STOPPED, OFFLOAD_STARTED, OFFLOAD_STOPPED). | Blank | General Settings |
| DTV Offload Exclusion List | Keywords specifying DTVs to exclude from offload (supports application-level and unit-specific formats). | Blank | General Settings |
| PGV Exclusion List | Keywords specifying PGVs to exclude from processing at start of recording (application-level and unit-specific formats). | Blank | General Settings |
| PGV Inclusion List | Keywords specifying PGVs to include in processing; inclusion list overrides exclusion list. | Blank | General Settings |
| Auto Merge Option | Drop-down: Disabled (sources only from .cfg), Maximum (all sources added), Minimum (one parameter added but merge performed on all sources; not selectable in ADS). | Not specified | General Settings |
| Enable Pre-Record Config Transfer | When TRUE, allows sending config files when not recording. | TRUE | General Settings |
| Pre-Record Config Transfer Boost Time (s) | Duration (seconds) that config send rate increases to boost rate. | 10 | General Settings |
| Pre-Record Config Transfer Boost Rate (KBps) | Raised config send rate used during boost time. | 50 | General Settings |
| Enable New Unique Filter | Enables new unique filter and disables Missing Data Upload; allows Quad ID to wrap while still ensuring uniqueness on network. | FALSE | General Settings |
| Session File Type | Session file format to use when recording (SSN or SSN2); selectable in Record dialog destination. | SSN | General Settings |
| Handshake Minimum Time (ms) | Minimum timeout for handshake message from data server to car. | 100 ms | Handshake Server Settings |
| Handshake Maximum Time (ms) | Maximum timeout for handshake message from data server to car. | 200 ms | Handshake Server Settings |
| Handshake Message Queue Length | Maximum message queue length awaiting transmission. | 2 | Handshake Server Settings |
| Handshake Message Size | Must match message size supported by embedded system. | 640 | Handshake Server Settings |
| Use Low Rate Message | When TRUE, uses compressed handshaking messages. | FALSE | Handshake Server Settings |
| Low Rate Maximum Time (ms) | Maximum time between low-rate handshaking messages. | 2000 ms | Handshake Server Settings |
| Low Rate Maximum Message Size | Maximum size of low-rate handshaking messages. | 18 | Handshake Server Settings |
| Enable Live Data Feed | When TRUE, data can be transferred via live data feed. | FALSE | Live Data Feed (LDF) Settings |
| Live Data Feed Retrieval Path | Location used to store intermediate (LDR) files when using LDF. | `<Drive>:\Documents and Settings\<user>\My Documents\McLaren Electronic Systems\ATLAS 9\LDF\` | Live Data Feed (LDF) Settings |
| PGV Request Timeout (s) | Maximum time to wait for requested PGV files via LDF. | 30s | Live Data Feed (LDF) Settings |
| Log File Folder | Location for log files. | `<Drive>:\Documents and Settings\<user>\My Documents\McLaren Electronic Systems\ATLAS 9\Log` | Logging (Debug) Settings |
| Raw Data Logging | Saves raw telemetry data during recording to .raw and .raw_tm files (for diagnostics). | FALSE | Logging (Debug) Settings |
| Raw Data Root Folder | Location for files created by Raw Data Logging. | Blank | Logging (Debug) Settings |
| Raw Data Logging (VTS) | Saves VTS raw data during recording to .raw and .raw_tm files (for diagnostics). | FALSE | Logging (Debug) Settings |
| Performance Statistics | When TRUE, creates performance log file (developer analysis/debugging). | FALSE | Logging (Debug) Settings |
| Message Log Level | Drop-down of logging options for developer diagnostics. | Not Logging | Logging (Debug) Settings |
| Message Log File Size | ATLAS log file size limit (0MB = infinite; new file created when limit reached). | 5 MB | Logging (Debug) Settings |
| Enable Update Progress on Clients (3 source) | Enables client update progress bar on ADS dialog during data upload. | TRUE | Offload Settings |
| Enable Multicast for Wirelink (3 source) | When TRUE, all three recording sources enabled in ADS Advanced Multi Source setup (may hinder network performance). | TRUE | Offload Settings |
| Exclude Offload Streams | Prevent ADS from offloading specific unit streams (comma-separated list). Overrides may apply with Telemetry Streams setting. | Empty list | Offload Settings |
| Enable Remote Data Server | When TRUE, data can be transferred via the remote data server. | FALSE | Remote Data Server (RDS) Settings |
| Remote Data Server Retrieval Path | Location used to store intermediate (RDR) files when using RDS. | `<Drive>:\Documents and Settings\<user>\My Documents\McLaren Electronic Systems\ATLAS 9\RDS` | Remote Data Server (RDS) Settings |
| RDS Write to Log File | When TRUE, RDS diagnostics written to an RDS log file in the main ATLAS log folder. | TRUE | Remote Data Server (RDS) Settings |
| Auto Delete PARTIAL Sessions | After playback when .ssn is created, delete PARTIAL live session file (when unlocked). | TRUE | Remote Data Server (RDS) Settings |
| Enable RDR Transfer During Live (Master Only) | Enables ADS to transmit RDR data simultaneously with live recording if spare bandwidth available. | FALSE | Remote Data Server (RDS) Settings |
| SQL Race Logging Level | Drop-down of logging options (developer diagnostics). | Errors | SQL Race Settings |
| SQL Race Log File Path | Location of SQL Race log file (for diagnostics). | `<Drive>:\Documents and Settings\<user>\My Documents\McLaren Electronic Systems\SQL Race` | SQL Race Settings |
| SQL Race Logging Period | Frequency that SQL Race log messages/counters are written to file. | 10000 ms | SQL Race Settings |
| Enable SQL Race Perf Counters | Enables SQL Race performance counters (capturable via perfmon). | FALSE | SQL Race Settings |
| Enable SQL Race Perf Counters Log to File | Logs SQL Race performance counters to file at SQL Race Log File Path. | FALSE | SQL Race Settings |
| Enable SQL Race Background Metrics | Enables background metric calculations (e.g., lap metrics); may reduce performance during recording. | FALSE | SQL Race Settings |
| SQL Race Cache Size | Shared cache used by SQL Race to reduce file access; will try to reduce size after data flushes. | 200 MB (minimum 20 MB) | SQL Race Settings |
| Telemetry Guard Time (s) | Reject data if timestamp difference between packets exceeds this value. | 0s | Telemetry Settings |
| Telemetry Guard Filter Length | Telemetry Guard synchronization length. | 10 | Telemetry Settings |
| Telemetry Guard Quad Range Limit (0 = Disabled) | Maximum allowable gap between sequential Quad IDs within a stream. | 0 (Disabled) | Telemetry Settings |
| Live Telemetry Timeout (0 = Disabled) | For Marelli DST Receiver only: time after which ATLAS stops recording if no live data received (overridden by active Ethernet recorders). | 50 | Telemetry Settings |
| Session Completion Timeout (0 = Disabled) | Time (seconds) to stop recording after last data sample; 0 disables. | 0 (Disabled) | Telemetry Settings |
| Enable VTS Session Completion Timeout | Allows VTS Recorder to timeout per Session Completion Timeout; FALSE overrides timeout. If timeout is 0, this has no effect. | TRUE | Telemetry Settings |
| Telemetry Streams to Complete Missing Offload | Streams required for missing telemetry uploads before closing (comma-separated); uploaded first; live record status cleared after last stream completes; overrides Exclude Offload Streams. | Blank | Telemetry Settings |
| Transmitter Status Timeout (0 = Disabled) | Time (seconds) that a status from a CBR600 is valid; after this time, last status ignored until a new one arrives. | 0s (Disabled) | Telemetry Settings |
| Sequence number anti-wrap time (hours) (0 = Disabled) | Threshold delta time where sequence numbers auto-unwrap; applies only to current instance (forwarded data unaffected). | 0 (Disabled) | Telemetry Settings |
| Ethernet Receive Timeout (ms) | Time ATLAS waits before retrying a receive message. | 500 ms | Unit Comms Settings |
| Ethernet Send Timeout (ms) | Time ATLAS waits before retrying a send message. | 500 ms | Unit Comms Settings |
| Ethernet Retries | Number of times ATLAS retries a message before aborting and showing a warning. | 1 | Unit Comms Settings |
| Ethernet Upload Message interval Timeout (ms) | Time before Quad Ethernet Telemetry data is re-requested during an upload (auto-extended if data receipt detected beyond timeout). | 3 ms | Unit Comms Settings |
| Ethernet Upload Message extended Timeout (ms) | Time ATLAS waits before Quad Ethernet Telemetry offload times out. | 500 ms | Unit Comms Settings |
| Ethernet Offload Connection Retries | Number of reconnection attempts during offload if connection is lost. | 10 | Unit Comms Settings |
| Ethernet Minimum UDP Missing Request Command Size Limit | Minimum command size when requesting missing data to avoid IP fragmentation issues (steps down from maximum when timeouts occur). | 512 | Unit Comms Settings |
| Ethernet Maximum UDP Missing Request Command Size Limit | Maximum command size when requesting missing data; may need adjustment if VPN introduces fragmentation. | 1472 | Unit Comms Settings |
| Ethernet Upload Config Unique Response | Setting must match client-specific BIOS configurations. | FALSE | Unit Comms Settings |
| Enable Missing Data Upload | When TRUE, only data found to be missing is uploaded; when FALSE, all data uploaded regardless. | TRUE | Unit Comms Settings |
| Ethernet Buffer Size (MB) | Size of local cache used for Direct Ethernet Wirelink. | 5 MB | Unit Comms Settings |


## Decode DLLs Tab

The Decode DLL tab is used to allocate customer-created DLLs to a data stream. A total of 15 data streams are available.

![decode_DLLs](assets/decode_dll.png)

| Setting | Description |
|---------|-------------|
| Decode DLL Path | Enter the full path and filename of the Decode DLL, or browse to locate it |

## System Monitor Folders Tab

The System Monitor Folders tab controls how ATLAS works with System Monitor Configurations.

| Setting | Description |
|---------|-------------|
| **System Monitor 7 base folder** | Sets the path where System Monitor files are stored. Multiple paths can be separated with a semi-colon |
| **Logging configuration folder** | Sets the path where ATLAS writes Logging configuration files. File structure must be: …ATLAS V8\Config\Logging\AutoConfig |
| **Car definitions file** | Sets the path and file name of the Car definitions file that defines network communication |
| **Ancillary Parameters Folder** | Sets the path where Logging Configurations created in System Monitor are stored |
| **Parameter Unlock List Path** | Sets the path where ATLAS searches for Parameter Unlock Lists |
| **Custom PGV Path** | Sets the path where the ATLAS LDF Recorder stores received PGV files |