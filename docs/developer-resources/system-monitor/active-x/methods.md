## ECU Control

### **ClearEvents**
**Description:** Clears the event window in SM-V7.  
**Arguments:**  
- None  



### **DownloadDataChanges**
**Description:** Causes any modifications made to the System Monitor edit buffer to be downloaded to the ECU.  
**Arguments:**  
- `unsigned short wAppId` - Application Id  



### **DownloadRemoteInProgress**
**Description:** Returns whether a remote logging is currently in progress.  
**Arguments:**  
- `bool* bResult` - whether a remote logging is currently in progress  



### **EditBufferSynced**
**Description:** Returns true if the edit buffer is in sync with the ECU.  
**Arguments:**  
- `unsigned short wAppId` - Application Id  



### **ForceReprogram**
**Description:** Performs a Force reprogram on the ECU - error code or `SMAPI_ERR_NONE` if function successful. Accepts an array of app ids to reprogram.  
**Arguments:**  
- `VARIANT FAR & awAppIds`  



### **GetCarByIndex**
**Description:** Returns the index of the car/unit entry within the car/unit list (as returned by `GetCarList()`). Obtains connection name, type and IP address.  
**Arguments:**  
- `unsigned short wIndex`  
- `BSTR FAR* pszName`  
- `BSTR FAR* pszType`  
- `BSTR FAR* pszIPAddress`  



### **GetCarList**
**Description:** Returns an array of cars/units defined in the `carfile.ini` (connections that appear in the connections dialog).  
**Arguments:**  
- `VARIANT* pszName`  
- `VARIANT* pszType`  
- `VARIANT* pszIPAddress`  

### **GetCarName**
**Description:** Returns the name of the current car/connection.  
**Arguments:**  
- `BSTR* pszResult` - Car name  

### **GetLinkStatus**
**Description:** Gets the ECU link status. Possible return values:  
```
0  - Link OK
1  - Link Not OK
2  - Controller is Busy
3  - Device is in boot
4  - Device is in Zone 1
5  - Device is in Zone 2
6  - Device is in Zone 3
7  - Bad response
8  - Wrong device connected
-1 - Unknown Status
```  
**Arguments:**  
- `unsigned short wAppId` - Application Id  



### **GetLiveUpdates**
**Description:** Gets the status of Live Update mode from the ECU.  
**Arguments:**  
- `bool* bResult` - state of Live Updates  



### **GetOnline**
**Description:** Returns whether the ECU is online or not.  
**Arguments:**  
- `bool* bResult` - whether the ECU is online or offline  



### **GetStatus**
**Description:** Gets the combined current status of online, live updates, link status and active app.  
**Arguments:**  
- `BOOL* pbOnlineResult` - On or offline  
- `BOOL* pbLiveUpdatesResult` - Live updates on/off  
- `short wLinkStatusAppId` - Application Id to check link status  
- `short* pwLinkStatusResult` – status of link to ECU. Valid values:  
```
0 = Link OK
1 = Link NOK
2 = Controller Busy
3 = Device In Boot
4 = Device In Zone One
5 = Device In Zone Two
6 = Device In Zone Three
7 = Bad Response
8 = Invalid Device
9 = Unknown Status
```  
- `short* pwActiveAppResult` - Mask of active app ids  



### **Reprogram**
**Description:** Reprograms the ECU. Returns long - error code or `SMAPI_ERR_NONE` if successful. Application IDs can be combined to reprogram multiple apps.  
**Arguments:**  
- `unsigned short wAppId` - Application Id  
- `BSTR FAR* pszResult`  



### **ReprogramEx**
**Description:** Accepts an array of all app ids to reprogram.  
**Arguments:**  
- `const VARIANT FAR& awAppIds`  



### **SendMessage**
**Description:** Sends a message to the ECU and returns the reply.  
**Arguments:**  
- `unsigned short wAppId` - Application Id  
- `VARIANT SendMessage` - Message to send  
- `VARIANT* ReplyMessage` – Reply  
- `unsigned short wTimeOut` - Message timeout  



### **SendMessageEx**
**Description:** Sends a message to the ECU and returns the reply. Allows specifying number of tries.  
**Arguments:**  
- `unsigned short wAppId` - Application Id  
- `VARIANT SendMessage` - Message to send  
- `VARIANT* ReplyMessage` - Reply  
- `unsigned short wTimeOut` - Message timeout  
- `unsigned short wTries` - Number of tries before error  



### **SendModemMessage**
**Description:** Sends a message to the ECU (via modem) and returns the reply.  
**Arguments:**  
- `unsigned short wAppId` - Application Id  
- `VARIANT SendMessage` - Message to send  
- `VARIANT* ReplyMessage` - Reply  
- `unsigned short wTimeOut` - Message timeout  



### **SendModemMessageEx**
**Description:** Sends a message to the ECU (via modem) and returns the reply. Allows specifying number of tries.  
**Arguments:**  
- `unsigned short wAppId` - Application Id  
- `VARIANT SendMessage` - Message to send  
- `VARIANT* ReplyMessage` - Reply  
- `unsigned short wTimeOut` - Message timeout  
- `unsigned short wTries` - Number of tries before error  



### **SetCarByIndex**
**Description:** Sets the car/unit connection based on the car/unit list (as returned by `GetCarList()`).  
**Arguments:**  
- `short wIndex`  
- `bool bPrimaryCar` - True if main car, False if spare  



### **SetLiveUpdates**
**Description:** Enables or disables sending of live updates to the ECU.  
**Arguments:**  
- `bool bLiveUpdates` - True to enable, False to disable  



### **SetLiveUpdatesEx**
**Description:** Enables/disables live updates with ability to define default action when data version matches but contains different data.  
**Arguments:**  
- `bool bState` - True to enable, False to disable  
- `WORD wAction` - Action on data mismatch:  
```
0 - No Action
1 - Upload data from unit into edit buffer
2 - Download edit buffer into unit (Live tunes in unit may be lost)
```  



### **SetOnline**
**Description:** Turns the ECU on or off-line.  
**Arguments:**  
- `bool bOnLine` - True to turn online, False to turn offline  



### **UndoDataChanges**
**Description:** Reset all tune buffers on the unit and/or in the edit buffer.  
**Values for reset type:**  
```
1 - Undo Data Changes in Unit
2 - Undo Data Changes in Edit Buffer
3 - Undo Data Changes in Unit & Edit Buffer
```  
**Arguments:**  
- `short wType` - Undo type  

## Project Management

### **AddApplication**
**Description:** Adds the application defined by the given DTV and it's associated PGV into the project. If the application already exists in the project the error: SMAPI_ERR_INVALID_CMD (-31) will be returned.  
**Arguments:**  
- `BSTR szDTVPath - Filename of the DTV to load.`  
### **AddParametersToUnlockList**
**Description:** Update a PUL file for an application for use with Reduced Data Access by adding the requested parameter identifiers.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `VARIANT aszIdentifiers – Safe Array (string) of parameter identifiers to be added to the PUL file.`  
- `BSTR* pszFileName - Returns the updated PUL file name.`  
### **CANConfigGet**
**Description:** Get the name of the CAN configuration from the given slot.  
**Arguments:**  
- `short wIndex - slot index (1-8)`  
- `BSTR* pszFileName - Name and path of the config file.`  
### **CANConfigLoad**
**Description:** Loads the specified CAN configuration file  
**Arguments:**  
- `BSTR szIdentifier - Filename and full path of the CAN Config file (.clc).`  
### **CANConfigLoadEx**
**Description:** Loads the specified CAN configuration file into the given slot and sets active if required.  
**Arguments:**  
- `short wIndex - Slot index (1-8).`  
- `BSTR szIdentifier - Filename and full path of the CAN Config file (.clc).`  
- `bool bActive - True to set active.`  
### **CANConfigSave**
**Description:** Saves the current CAN configuration to the specified file.  
**Arguments:**  
- `bool  bSaveCopyAs - Save copy without affecting SM modified status.`  
- `BSTR szFullPath - File path to save.`  
- `BSTR szComment - Comment.`  
- `BSTR szNotes - Notes.`  
### **CANConfigUnload**
**Description:** Unloads the CAN configuration from the given slot.  
**Arguments:**  
- `short wIndex - Slot index (2-8).`  
### **ClearDataVersionNotes**
**Description:** Clears the contents of the notes attribute associated with the DTV.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
### **CloseProject**
**Description:** Closes the Project.  
**Arguments:**  
- `None`  
### **CloseProjectEx**
**Description:** Closes the Project.  
**Arguments:**  
- `unsigned short wAction - Action to perform when unsaved documents encountered on closing project.`  
- `0 - Cancel Save.1 - Save All.2 - Save None.`  
### **CompareApp**
**Description:** Perform a compare between an application loaded in memory and up to two DTV's. When two DTV's are used both must have the same PGV version. Returns a list of parameters that contain differences along with the parameter data type and a reason code identifying the difference.  
**Arguments:**  
- `short wAppId – Application Id.`  
- `BSTR szDTV1- Filename and full path of the first DTV to compare against (.dtv).`  
- `BSTR szDTV2 - Filename and full path of the second DTV to compare against (.dtv).`  
- `VARIANT* str1xArrParamIds - Array of unique parameter identifiers.`  
- `VARIANT* str1xParamType - Array of parameter types.`  
- `VARIANT* w1xArrReason1 - Array of reason codes for difference between the parameter in the application in memory and the first DTV supplied.`  
- `VARIANT* w1xArrReason2 - Array of reason codes for difference between the parameter in the application in memory and the first DTV supplied.`  
- `Reason Codes (combination of one or more of):`  
- `0x0001 -EQUATE_ABSENT              - Not present in program version of the candidate.0x0002 -EQUATE_DIFFERENT           - Major difference that prevents merge.0x0004 -EQUATE_EQUAL               - Same data type, size and value.0x0008 -EQUATE_DIFF_VALUE          - Same data type, size, units, diff value.0x0010 -EQUATE_DIFF_SIZE           - Same data type, different size (maps only).0x0020 -EQUATE_DIFF_CONV           - Different display format conversion.0x0040 -EQUATE_DIFF_UNITS          - Different units.0x0080 -EQUATE_DIFF_DATA_TYPE      - Different data type.0x0100 -EQUATE_DIFF_COMMENT        - Different comment.0x0200 -EQUATE_DIFF_DEFAULT_VALUE  - Different default value.0x0400 -EQUATE_ABSENT_MASTER       - Not present in program version of the edit buffer.`  
### **CreateNewCANConfig**
**Description:** Create a new CAN configuration file.  
**Arguments:**  
- `BSTR szIdentifier - Filename and full path of the Config file (.clc).`  
- `bool bSaveExisting - Save current configuration before load.`  
- `bool bOverwrite - Overwrite file if exists.`  
### **CreateNewRemoteConfig**
**Description:** Create a new remote logging configuration file.  
**Arguments:**  
- `BSTR szIdentifier - Filename and full path of the Config file (.rlc).`  
- `bool bSaveExisting - Save current configuration before load.`  
- `bool bOverwrite - Overwrite file if exists.`  
### **CreateNewVirtualParameters**
**Description:** Create a new virtual parameters file.  
**Arguments:**  
- `BSTR szIdentifier - Filename and full path of the virtual parameter file (.vpm).`  
- `bool bSaveExisting - Save current configuration before load.`  
- `bool bOverwrite - Overwrite file if exists.`  
### **CreatePGV**
**Description:** Create a new PGV from ASAP2 definitions.  
**Arguments:**  
- `BSTR szLocation - Path to location for output files.`  
- `BSTR szASAP2File - Path to base ASAP2 project .a2l file.`  
- `BSTR szHexFile - Path to hex definition .hex file.`  
- `BSTR szControllersFile - Path to controllers definition .ini file.`  
- `BSTR szErrorsFile - Optional path to errors definition .ini file.`  
- `BSTR szEventsFile - Optional path to events definition .ini file.`  
- `BSTR szAdjustmentParametersFile - Optional path to pot board definition .ini file.`  
- `BSTR szSensorsFile - Optional path to sensors definition .ini file.`  
- `BSTR szSensorInjectorFile - Optional path to sensor injector definition .ini file.`  
- `BSTR szSensorEnableFile - Optional path to sensor enable / disable definition .ini file.`  
- `BSTR szLiveAutoTuneFile - Optional path to live auto tunedefinition .ini file.`  
- `BSTR szComment - PGV Comments.`  
- `BSTR szNotes - PGV Notes.`  
- `BSTR* pszPGV - Path to created PGV file.`  
- `BSTR* pszDTV - Path to created DTV file.`  
### **CreateProject**
**Description:** Create a new project.  
**Arguments:**  
- `BSTR szProject - Project name to be created within the current multi-application base.`  
- `VARIANT aszApps - Safe Array (string) of PGV files to be included.`  
- `BSTR szDesktop - Name of desktop document to be created or included if file already exists.`  
- `BSTR szVirtuals - Optional name of virtual parameters document to be created or included if file already exists.`  
- `BSTR szCAN - Optional name of CAN configuration document to be created or included if file already exists.`  
- `BSTR szRemoteConfig - Optional name of remote logging configuration document to be created or included if file already exists.`  
### **CreateFFCFromPGV**
**Description:** Create an FFC File from the given PGV.  
**Arguments:**  
- `BSTR szPGV - PGV filename to be processed into FFC.`  
### **DataVersionModified**
**Description:** Returns the modified state associated with the DTV.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `bool* pbResult`  
### **DataVersionOpen**
**Description:** Opens the specified data version.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Filename and full path of data version.`  
### **DataVersionSave**
**Description:** Saves the current data version to the specified file.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Filename and full path.`  
- `BSTR szComments - Prefix to existing comment.`  
- `BSTR szNotes - Prefix to existing notes.`  
### **DataVersionSaveCopyAs**
**Description:** Saves the current data version to the specified file, without modifying the data version in the edit buffer.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Filename and full path.`  
- `BSTR szComments - Prefix to existing comment.`  
- `BSTR szNotes - Prefix to existing notes.`  
### **DataVersionSaveCopyAsEx**
**Description:** Saves the current data version to the specified file, without modifying the data version in the edit buffer.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Filename and full path.`  
- `BSTR szComments - Prefix to existing comment.`  
- `BSTR szNotes - Prefix to existing notes.`  
- `BSTR szConsortium - Consortium name to save data version to.`  
### **DataVersionSaveIncrement**
**Description:** Increments the version number of the data version and then performs a save.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szComments - Prefix to existing comment.`  
- `BSTR szNotes - Prefix to existing notes.`  
### **DesktopLoad**
**Description:** Loads the specified System Monitor desktop file  
**Arguments:**  
- `BSTR szIdentifier - Filename and full path of the Desktop file (.dtp).`  
### **DesktopSave**
**Description:** Saves the current desktop to the specified file.  
**Arguments:**  
- `bool  bSaveCopyAs - Save copy without affecting SM modified status.`  
- `LPCTSTR szFullPath - File path to save.`  
- `LPCTSTR szComment - Comment.`  
- `LPCTSTR szNotes - Notes.`  
### **DesktopSaveEx**
**Description:** Saves the current desktop to the specified file.  
**Arguments:**  
- `bool  bSaveCopyAs - Save copy without affecting SM modified status.`  
- `BSTR szFullPath - File path to save.`  
- `BSTR szComment -Comment.`  
- `BSTR szNotes - Notes.`  
- `BSTR szConsortium - Consortium name to save data version to. OR "Disabled" to unlock.`  
### **EnableDataVersionBackup**
**Description:** Enables/Disables the data version backup during parameter value changes. Adds a message to the log file to indicate when changed.  
**Arguments:**  
- `boolean - True to enable,false to disable.`  
### **ExportInputSignals**
**Description:** Exports the Input Signal configuration in XML format.  
**Arguments:**  
- `BSTR szFullPath - Filename and full path.`  
### **ExportToHexFile**
**Description:** Exports the selected applications PGV and DTV to a hexfile.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
### **ExportProject**
**Description:** Exports the project to a .smx file.  
**Arguments:**  
- `bool bSaveModified - Flag to indicate if any unsaved files in the project should be saved before exporting.`  
### **GenerateParamSet**
**Description:** Generates a Parameter Set (.pms file) and writes it to the specified path. Contains two arguments, first being an array of strings of Parameters being sourced from your current open project and the second being a string defining file path. 
**Arguments:**  
- `VARIANT aszIdentifiers – Safe Array (string) of parameter identifiers to be included.`  
- `BSTR pszFileName - Full path name of the parameter set (.pms) file.`  
### **GeneratePULFile**
**Description:** Generate a PUL file for an application for use with Reduced Data Access.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `VARIANT aszIdentifiers – Safe Array (string) of parameter identifiers to be included.`  
- `BSTR pszFileName - Full path name of the PUL (.pul) file.`  
### **GeneratePULFileFromParamSet**
**Description:** Generate a PUL file for an application for use with Reduced Data Access from a saved Parameter Set file.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR pszPMSFile - Full path name of the Parameter Set (.pms) file.`  
- `BSTR* pszFileName - Full path name of the PUL (.pul) file. On sucessful creating of PUL file this variable returns the new full PUL file name.`  
### **GetActiveApp**
**Description:** Returns bitwise OR of the application IDs of all the active applications.  
**Arguments:**  
- `unsigned short* pwResult - result bitwise OR of application Ids.`  
### **GetActiveAppEx**
**Description:** Returns a Variant WORD array containing the id's all active apps.  
**Arguments:**  
- `VARIANT FAR * pawAppIds`  
### **GetActiveCANConfig**
**Description:** Get the active status of the CAN configuration in the given slot.  
**Arguments:**  
- `short wSlotId - Slot index (1-8).`  
- `bool* pbActive - Active state.`  
### **GetActiveRemoteLogging**
**Description:** Get the active status of the remote logging configuration in the given slot.  
**Arguments:**  
- `short wSlotId - Slot index (1-8).`  
- `bool* pbActive - Active state.`  
### **GetAppDetails**
**Description:** Retrieves the ID and name for the applications in the current project.  
**Arguments:**  
- `VARIANT FAR * pawAppIds - Array of Application Ids.`  
- `VARIANT FAR * pastrAppNames - Array of Names.`  
### **GetAppPULFileName**
**Description:** Get the name of the unlock list PUL file for the given application id.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR* pszFileName - Name of the PUL file, if set.`  
### **GetBuildNumber**
**Description:** Returns the build number of SM-V7. Client code may be branched on the basis of build number, thereby providing a way by which a single client script can be written which works with releases of SM-V7 which have different ActiveX interfaces.  
**Arguments:**  
- `unsigned short* pwResult - Build number.`  
### **GetDataVersion**
**Description:** Returns the filename of the data version in the edit buffer.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR* pszResult`  
### **GetDataVersionComment**
**Description:** Returns the contents of the comments attribute associated with the DTV.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR* pszComment`  
### **GetDataVersionNotes**
**Description:** Returns the contents of the notes attribute associated with the DTV.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR* pszResult`  
### **GetDataVersionSavedOn**
**Description:** Returns the contents of the saved on attribute associated with the DTV.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR* pszResult`  
### **GetDesktopFileName**
**Description:** Get the name of the desktop file from the project.  
**Arguments:**  
- `BSTR* pszFileName - Name and path of the file.`  
### **GetDeviceProperties**
**Description:** Get the properties of connected devices from the project.  
**Arguments:**  
- `VARIANT* strw1xArrCommsPath - String array of device comms paths.`  
- `VARIANT* str1xArrDeviceName - String array of device names.`  
- `VARIANT* dw1xArrSerialNumber - Integer array of device serial numbers.`  
- `VARIANT* str1xArrAddress - String array of device addresses.`  
### **GetEcuDataVersion**
**Description:** Returns the filename of the data version on the ECU.  
**Arguments:**  
- `short wIndex - Slot index (1-8).`  
- `bool bActivate - Active state.`  
### **GetErrors**
**Description:** Returns list of active errors.  
**Arguments:**  
- `VARIANT* str1xError - Safe Array of error identifiers.`  
- `VARIANT* str1xDescription - Safe Array of error descriptions.`  
- `VARIANT* w1xStatus - Safe Array of error status levels. ( 0 - Unknown, 1 - Current, 2 - Logged )`  
### **GetEvents**
**Description:** Returns variant string arrays of defined events for a given application..  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `unsigned short* pwCount - Number of events defined in the application.`  
- `VARIANT* pwEventIds - Safe Array of event identifiers.`  
- `VARIANT* pszEvents - Safe Array of event descriptions.`  
- `VARIANT* pwLevels - Safe Array of event levels. ( 0 - High, 1 - Medium, 2 - Low, 3 - Debug )`  
### **GetEventDetails**
**Description:** Returns the details for a given event definition in an application..  
**Arguments:**  
- `unsigned short wEventId - Event Id.`  
- `unsigned short wAppId - Application Id.`  
- `BSTR* pszDescription - Event description.`  
- `BSTR* pszConv1 - Id of first event conversion.`  
- `BSTR* pszConv2 - Id of second event conversion.`  
- `BSTR* pszConv3 - Id of third event conversion.`  
- `unsigned short*  pwLevels - Event level. ( 0 - High, 1 - Medium, 2 - Low, 3 - Debug )`  
### **GetFIACANConfig**
**Description:** Get the active status of the FIA CAN configuration in the given slot.  
**Arguments:**  
- `short wSlotId - Slot index (1-8).`  
- `bool* pbActive - Active state.`  
### **GetFileDetails**
**Description:** Get the file details for any file type supported by System Monitorr.  
**Arguments:**  
- `BSTR  szFileName - Full pathname of file to interrogate for file details.`  
- `BSTR* pszSavedBy - Name of the last user to save the file.`  
- `DATE* pdtSavedOn - Date time of last file save.`  
- `BSTR* pszNotes - File notes.`  
- `BSTR* pszComments - File comments.`  
- `WORD* pwBuild - Build number of System Monitor used when saving file.`  
- `BSTR* pszConsortium - Name of the licence consortium used to save the file. Set for supported file types only ( .dtv, .rlc & .dtp ).`  
- `BSTR* pszOwner - Name of the licence owner used to create the file. Set for supported file types only ( .dtv, .rlc & .dtp ).`  
- `BSTR* pszRDA - RDA unlock list checksum for locked DTV's.Set for supported file types only ( .dtv ).`  
### **GetLicenceDetails**
**Description:** Get the active consortium name and licence owner.  
**Arguments:**  
- `BSTR* pszConsortium - Name of the active consortium set in the licence.`  
- `BSTR* pszOwner - Name of the owner of the licence.`  
### **GetLogFolder**
**Description:** Get the current log folder location.  
**Arguments:**  
- `BSTR* pszFolder- Path of the log folder.`  
### **GetMultiApplicationBase**
**Description:** Returns strings containing the name and path of the active Multi-Application Base.  
**Arguments:**  
- `BSTR* pszName`  
- `BSTR* pszPath`  
### **GetMultiApplicationBases**
**Description:** Returns variant string arrays containing the name and paths of all defined Multi-Application Bases.  
**Arguments:**  
- `VARIANT FAR* paNames`  
- `VARIANT FAR* paPaths`  
### **GetNextDataVersion**
**Description:** Returns the filename of the next data version that will be saved if the user selects, File, Save. If the edit buffer is unmodified, this will be the name of the current data version in the edit buffer.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR* pszResult`  
### **GetPPOFileName**
**Description:** Get the name of the PPO file in the project.  
**Arguments:**  
- `BSTR* pszFileName - Name and path of the PPO file.`  
### **GetProgramVersionID**
**Description:** Returns the program version ID of the currently loaded program version.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `short* pwResult - Result program version ID.`  
### **GetProgramVersionIDEx**
**Description:** Returns the program version ID of the currently loaded program version.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `unsigned short* pwResult - Result program version ID.`  
### **GetProjectFileName**
**Description:** Get the name of the project file.  
**Arguments:**  
- `BSTR* pszFileName - Name and path of the project.`  
### **GetRemoteLoggingDuration**
**Description:** Get the estimated length in time and number of laps available for recording in the remote logging config.  
**Arguments:**  
- `DATETIME* pdtEstimatedLoggingTime - Estimated time available in recording memory.`  
- `long* pdEstimatedLoggingLaps - Estimated laps available in recording memory..`  
### **GetRemoteLoggingRates**
**Description:** Get the Logging and Telemetry rates of all channels in the remote logging config.  
**Arguments:**  
- `VARIANT* pafLogging - Array of doubles holding channel logging rates.`  
- `VARIANT* pafTelemetry - Array of doubles holding channel telemetry rates.`  
### **GetRemoteSlotCount**
**Description:** Get the number of logging slots used in the remote logging config.  
**Arguments:**  
- `short* wSlotCount - Total slots used.`  
### **GetVersionNumber**
**Description:** Returns the version information contained within the System Monitor executable.  
**Arguments:**  
- `short* pwMajorVersion – Major revision.`  
- `short* pwMinorVersion – Minor revision.`  
- `short* pwBuildNumber – Build number.`  
### **GetVirtualParametersFileName**
**Description:** Get the name of the virtual parameters file from the project.  
**Arguments:**  
- `BSTR* pszFileName - Name and path of the file.`  
### **ImportInputSignals**
**Description:** Imports the Input Signal configuration from a XML file.  
**Arguments:**  
- `BSTR szFullPath - Filename and full path.`  
### **ImportProject**
**Description:** Imports the project from a .smx file.  
**Arguments:**  
- `BSTR szFullPath - SMX file containing project to be imported.`  
- `BSTR szBase - Optional Multi-Application base name for import. If blank, the current default base is used.`  
### **MatLabExportSelected**
**Description:** Exports the specified list of editable parameters in Matlab format.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Filename and full path.`  
- `bool bDataOnly - True if only data is to be exported, false to export data and definitions.`  
- `VARIANT* SelectedParams – array of parameter identifiers for the parameters to be exported`  
### **MatlabImport**
**Description:** Inports the specified MatLab-M file into System Monitor.  
**Arguments:**  
- `BSTR szFullPath - Full path to the MatLab-M file.`  
### **MatLabMExport**
**Description:** Exports the currently loaded data version to the specified file in MatLab-M format.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Filename and full path.`  
- `bool bDataOnly - True if only data is to be exported, false to export data and definitions.`  
### **MatLabMExportEx**
**Description:** Exports the currently loaded data version to the specified file in MatLab-M format.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Filename and full path.`  
- `bool bDataOnly - True if only data is to be exported, false to export data and definitions.`  
- `unsigned int dwType - Data types included in export.`  
- `OB_TYPE_SCALAR        = 0x00000001`  
- `OB_TYPE_1_AXIS_MAP = 0x00000002`  
- `OB_TYPE_2_AXIS_MAP = 0x00000004`  
- `OB_TYPE_ARRAY          = 0x00000010`  
- `OB_TYPE_STRING          = 0x00000020`  
- `OB_TYPE_ECU                = 0x00000080`  
- `OB_TYPE_ANY_AXIS     = 0x00030000`  
### **MatLabMExportForDTV**
**Description:** Exports the specified data version to the specified file in MatLab-M format.  
**Arguments:**  
- `BSTR szDTV - Filename and full path of DTV file.`  
- `BSTR szIdentifier - Filename and full path of exported file.`  
- `bool bDataOnly - True if only data is to be exported, false to export data and definitions.`  
- `unsigned int dwType - Data types included in export.`  
- `OB_TYPE_SCALAR        = 0x00000001`  
- `OB_TYPE_1_AXIS_MAP = 0x00000002`  
- `OB_TYPE_2_AXIS_MAP = 0x00000004`  
- `OB_TYPE_ARRAY          = 0x00000010`  
- `OB_TYPE_STRING          = 0x00000020`  
- `OB_TYPE_ECU                = 0x00000080`  
- `OB_TYPE_ANY_AXIS     = 0x00030000`  
### **OpenProject**
**Description:** Opens a Project.  
**Arguments:**  
- `String szFullPath - The file location to open the project from.`  
### **RemoteGet**
**Description:** Get the name of the remote logging configuration from the given slot.  
**Arguments:**  
- `short wIndex - Slot index (1-8).`  
- `BSTR* pszFileName - Name and path of the config file.`  
### **RemoteGetAll**
**Description:** Get the name of the remote logging configuration from the given slot.  
**Arguments:**  
- `str1xArrFileNames - Safe Array of names and paths of all loaded config files.`  
### **RemoteLoggingLoad**
**Description:** Loads the specified remote logging configuration.  
**Arguments:**  
- `BSTR szFullPath - File path to load.`  
### **RemoteLoggingLoadEx**
**Description:** Loads the specified remote logging configuration file into the given slot and sets active if required.  
**Arguments:**  
- `short wIndex - Slot index (1-8).`  
- `BSTR szIdentifier - Filename and full path of the Config file (.rlc).`  
- `bool bActive - True to set active.`  
### **RemoteLoggingSave**
**Description:** Saves the current remote logging configuration to the specified file.  
**Arguments:**  
- `bool  bSaveCopyAs - Save copy without affecting SM modified status.`  
- `BSTR szFullPath - File path to save.`  
- `BSTR szComment -Comment.`  
- `BSTR szNotes - Notes.`  
### **RemoteLoggingSaveEx**
**Description:** Saves the current remote logging configuration to the specified file.  
**Arguments:**  
- `bool  bSaveCopyAs - Save copy without affecting SM modified status.`  
- `BSTR szFullPath - File path to save.`  
- `BSTR szComment -Comment.`  
- `BSTR szNotes - Notes.`  
- `BSTR szConsortium - Consortium name to save data version to. OR "Disabled" to unlock.`  
### **RemoteLoggingUnload**
**Description:** Unloads the remote logging configuration from the given slot.  
**Arguments:**  
- `short wIndex - Slot index (2-8).`  
### **RemoveApplication**
**Description:** Removes the given application from the project. The requested application cannot be the BIOS.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
### **RemoveParametersFromUnlockList**
**Description:** Update a PUL file for an application for use with Reduced Data Access by removing the requested parameter identifiers.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `VARIANT aszIdentifiers – Safe Array (string) of parameter identifiers to be removed from the PUL file.`  
- `BSTR* pszFileName - Returns the updated PUL file name.`  
### **SaveProject**
**Description:** Saves the current project.  
**Arguments:**  
- `bool bSaveAll - If TRUE then all modified files are saved. If FALSE then only the project file is saved.`  
### **SaveProjectAs**
**Description:** Saves the current project.  
**Arguments:**  
- `LPCTSTR pszNewName - Name of renamed project file.`  
- `bool bSaveAll - If TRUE then all modified files are saved. If FALSE then only the project file is saved.`  
- `LPCTSTR pszComment - New project comments.`  
- `LPCTSTR pszNotes - New project notes.`  
### **SetActiveApp**
**Description:** Sets the active application when provided with an application ID.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
### **SetActiveAppEx**
**Description:** This accepts an array of all app ids to make active. Any apps not in the array are made inactive.  
**Arguments:**  
- `const VARIANT FAR& awAppIds`  
### **SetActiveCANConfig**
**Description:** Set the active status of the CAN configuration in the given slot.  
**Arguments:**  
- `short wIndex - Slot index (1-8).`  
- `bool bActivate - Active state.`  
### **SetActiveRemoteLogging**
**Description:** Set the active status of the remote logging configuration in the given slot.  
**Arguments:**  
- `short wIndex - Slot index (1-8).`  
- `bool bActivate - Active state.`  
### **SetAppPULFile**
**Description:** Set the unlock list PUL file on the given application id. Licence ownership restrictions apply  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR pszFileName - Name of the PUL file.`  
- `Error messages:SMAPI_ERR_DATAVER_NONE (-5) if application id not valid.SMAPI_ERR_NOLICENCE (-2) if licence not valid to lock the application.SMAPI_ERR_FILE (-8) if PUL file invalid.`  
### **SetDataVersionComment**
**Description:** Sets the Data Version comment for the specified application.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `LPCTSTR pszComment - Data Version Comment.`  
### **SetDataVersionNotes**
**Description:** Sets the Data Version notes for the specified application.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `LPCTSTR pszNotes - Data Version Notes.`  
### **SetFIACANConfig**
**Description:** Set the FIA status of the CAN configuration into the given slot.  
**Arguments:**  
- `short wIndex - Slot index (2-8).`  
### **SetMultiApplicationBase**
**Description:** Sets the current Multi-Application Base.  
**Arguments:**  
- `LPCTSTR pszBase - Base name.`  
### **UploadDataVersion**
**Description:** Uploads specified data version to the edit buffer.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
### **VirtualParametersExport**
**Description:** Export virtual parameters in XML format. If supplied, the group name specifies the sub-tree to include in export. All virtual parameter dependants of exported parameters will also be included.  
**Arguments:**  
- `LPCTSTR szName - Fiile path to export parameters into.`  
- `LPCTSTR szGroup - Group name to export. NULL for all virtual parameters.`  
### **VirtualParametersImport**
**Description:** Import and merge the specified virtual parameter file.  
**Arguments:**  
- `LPCTSTR szName - File path to import.`  
### **VirtualParametersLoad**
**Description:** Loads the specified virtual parameter file (long)  
**Arguments:**  
- `LPCTSTR szFullPath - File path to load.`  
### **VirtualParametersLoadNoSave**
**Description:** Loads the specified virtual parameter file without saving current file (long)  
**Arguments:**  
- `LPCTSTR szFullPath - File path to load.`  
### **VirtualParametersSave**
**Description:** Saves the current virtual parameters as long to the specified file.  
**Arguments:**  
- `bool  bSaveCopyAs - Save copy without affecting SM modified status.`  
- `LPCTSTR szFullPath - File path to save.`  
- `LPCTSTR szComment - Comment.`  
- `LPCTSTR szNotes - Notes.`  

## Data Acquisition

### **DownloadExternalInputs**
**Description:** Downloads the external inputs configuration to the ECU.
**Arguments:**
- None

### **DumpErrors**
**Description:** Any errors that are currently occurring are dumped to disk.
**Arguments:**
- `BSTR szIdentifier - Filename and full path.`

### **DumpEvents**
**Description:** Dumps the contents of the Event window to a specified file.
**Arguments:**
- `BSTR szIdentifier - Filename and full path.`

### **DumpRowData**
**Description:** Dumps the current values of all acquired measurement parameters to disk.
**Arguments:**
- `BSTR szIdentifier - Filename and full path.`

### **GetErrorDefinitions**
**Description:** Gets the error definitions for a given application.
**Arguments:**
- `short wAppId - Application Id to get the defintions for.`
- `pCount - Total number of error defintions in application.`
- `paszNames - Array of error defintion names.`
- `paszIdentifiers - Array of error defintion identifiers.`
- `paszDescriptions - Array of error defintion descriptions.`
- `paszGroup - Array of error defintion groups.`
- `pawBitNumber - Array of error defintion bit numbers.`
- `paszCurrent - Array of error defintion current parameter identifiers.`
- `paszLogged - Array of error defintion logged paramer identifiers.`

### **GetLiveLogging**
**Description:** Returns whether the Live Logging is currently recording or not.
**Arguments:**
- `bool* bResult - whether Live Logging is enabled or disabled.`

### **GetProgramVersionPath**
**Description:** Gets the filepath for the .pgv of an application by Application Id.
**Arguments:**
- `short wAppId - Application Id to get the PGV for.`
- `BSTR FAR* pszResult - PGV filepath.`

### **SelectCar**
**Description:** Select car to which any following API functions will apply.
**Arguments:**
- `short wCar - Car number 1 (main) or 2 (spare).`

### **SetLiveLogging**
**Description:** Starts or stops Live Logging.
**Arguments:**
- `bool bOnLine - True to turn Live Logging on, false to turn Live Logging off.`

### **BurstLoggingSave**
**Description:** Sends the current burst logging configuration to the specified file.
**Arguments:**
- `bool bSaveCopyAs - Save copy without affecting SM modified status.`
- `BSTR szFullPath - File path to save.`
- `BSTR szComment - Comment.`
- `BSTR szNotes - Notes.`

### **DownloadBurst**
**Description:** Downloads the burst logging configuration to the ECU.
**Arguments:**
- None

### **GetBurstSessionDetail**
**Description:** Returns the current value of a specified session detail from the burst logging configuration. Note that this and other session detail functions will operate on the logging configuration loaded in SM-V7, which does not necessarily match the ECU configuration.
**Arguments:**
- `BSTR szName - Name of session detail.`
- `BSTR* pszValue - Returned value for session detail.`

### **SetBurstSessionDetail**
**Description:** Sets a specified session detail in the burst logging configuration.
**Arguments:**
- `BSTR szName - Name of session detail.`
- `BSTR szValue - New value for session detail.`

### **UploadBurst**
**Description:** Uploads the burst logging configuration from the ECU.
**Arguments:**
- None

### **AddRemoteParam**
**Description:** Adds a parameter to the Remote Logging Configuration.
**Arguments:**
- `short wAppId – Application Id.`
- `LPCTSTR pszParamId – Unique parameter identifier`
- `short wChannel – 0 indexed channel to set value for. I.e. Channel 1 = 0.`
- `short wValue – The frequency or engine segment value.`
- `short wValueType (see ETypeFreqValue):`

### **AddRemoteParamEx**
**Description:** Adds a parameter to the Remote Logging Configuration.
**Arguments:**
- `short wAppId – Application Id.`
- `LPCTSTR pszParamId – Unique parameter identifier`
- `short wChannel – 0 indexed channel to set value for. I.e. Channel 1 = 0.`
- `long wValue – The frequency or engine segment value.`
- `short wValueType (see ETypeFreqValue):`

### **AddRemoteVirtualParam**
**Description:** Adds a parameter to the Remote Logging Configuration.
**Arguments:**
- `LPCTSTR pszParamId – Unique parameter identifier`
- `short wChannel – 0 indexed channel to set value for. I.e. Channel 1 = 0.`
- `short wValue – The frequency or engine segment value.`
- `short wValueType (see ETypeFreqValue):`

### **AddRemoteVirtualParamEx**
**Description:** Adds a parameter to the Remote Logging Configuration.
**Arguments:**
- `LPCTSTR pszParamId – Unique parameter identifier`
- `short wChannel – 0 indexed channel to set value for. I.e. Channel 1 = 0.`
- `long dwValue – The frequency or engine segment value.`
- `short wValueType (see ETypeFreqValue):`

### **ClearRemoteParams**
**Description:** Removes all the parameters from the remote logging config except those used by triggers. If the caller specifies a forceful removal all parameters will be removed and any >On Data= trigger conditions will be reset.
**Arguments:**
- `boolean bForceRemovalFromTriggers - Request System Monitor removes all parameters, including those used by triggers.`

### **DownloadRemote**
**Description:** Downloads the remote logging configuration to the ECU.
**Arguments:**
- None

### **DownloadRemoteEx**
**Description:** Downloads the remote logging configuration to the ECU the reads the given measurement value to ensure configuration write is complete.
**Arguments:**
- `short wAppId – Application Id.`
- `LPCTSTR pszParamId – Unique identifier of logging configuration parameter.`
- `short wReadDelay – Read delay in ms before retrieving parameter value allowing ECU configuration processing time.`
- `BSTR* pszValue - Parameters current value.`

### **GetRemoteChannelCount**
**Description:** Retrieves the number of channels in current Remote Logging configuration.
**Arguments:**
- `pnChannelCount - Output parameter to receive the current channel count.`

### **GetRemoteChannelNames**
**Description:** Retrieves an array of strings containing the channel names.
**Arguments:**
- `str1xArrChannelNames - SAFEARRAY contained array of strings.`

### **GetRemoteChannelNamesAll**
**Description:** Retrieves an array of strings containing the channel names.
**Arguments:**
- `str1xArrChannelNames - SAFEARRAY contained array of strings.`
- `w1xSlots - Safe Array of matching slot position of configuration defining the channel.`

### **GetRemoteChannelProperties**
**Description:** Retrieves the properties of any given Remote Logging channel.
**Arguments:**
- `short wChannel - The 0 based channel index to modify.`
- `BSTR* pstrChannelName - Name of the channel.`
- `boolean* pbLogToUnit - Retrieves the Log to Unit flag.`
- `boolean* pbTelemetry - Retrieves the telemetry flag.`
- `boolean* pbTriggerRearmsAfterStopped - Trigger re-arms after stop condition.`

### **GetRemoteChannelPropertiesAll**
**Description:** Retrieves the properties of any given Remote Logging channel.
**Arguments:**
- `short wChannel - The 0 based channel index to modify.`
- `BSTR* pstrChannelName - Name of the channel.`
- `boolean* pbLogToUnit - Retrieves the Log to Unit flag.`
- `boolean* pbTelemetry - Retrieves the telemetry flag.`
- `boolean* pbTriggerRearmsAfterStopped - Trigger re-arms after stop condition.`
- `short* - Retrieves the slot position of the configuration defining the channel.`

### **GetRemoteOffset**
**Description:** Gets the remote logging config offset.
**Arguments:**
- `pwOffset- Output parameter to receive the current logging offset.`
- `Error messages:SMAPI_ERR_BAD_STATE (-30) if logging config document not present.`
- `SMAPI_ERR_INVALID_CMD (-31) if Logging offset adjustment not allowed.`


### **GetRemoteParams**
**Description:** Gets the remote logging parameter details from the config.
**Arguments:**
- `w1xArrAppIds - Safe Array of matching application identifiers.`
- `str1xArrParamNames - Safe Array of matching parameter identifiers.`
- `str1xArrParamDescriptions - Safe Array of parameter descriptions`
- `str1xArrChannelNames - Safe Names of each of the channels.`
- `w1xArrParamSizes - Safe Array of matching sizes.`
- `w2xArrParamValues - Safe Array of matching values.`
- `w2xArrParamLogTypes - Safe Array of matching log types.`
- `long* nParamCount - Number of parameters retrieved.`
- `long* nChannelCount - Number of channels in config.`

### **GetRemoteParamsAll**
**Description:** Gets the remote logging parameter details from the config.
**Arguments:**
- `w1xArrAppIds - Safe Array of matching application identifiers.`
- `str1xArrParamNames - Safe Array of matching parameter identifiers.`
- `str1xArrParamDescriptions - Safe Array of parameter descriptions`
- `str1xArrChannelNames - Safe Names of each of the channels.`
- `w1xArrParamSizes - Safe Array of matching sizes.`
- `w2xArrParamValues - Safe Array of matching values.`
- `w2xArrParamLogTypes - Safe Array of matching log types.`
- `long* nParamCount - Number of parameters retrieved.`
- `long* nChannelCount - Number of channels in config.`
- `w1xSlots - Safe Array of matching slot position of configuration defining the parameter.`

### **GetRemoteParamsEx**
**Description:** Gets the remote logging parameter details from the config.
**Arguments:**
- `w1xArrAppIds - Safe Array of matching application identifiers.`
- `str1xArrParamNames - Safe Array of matching parameter identifiers.`
- `str1xArrParamDescriptions - Safe Array of parameter descriptions`
- `str1xArrChannelNames - Safe Names of each of the channels.`
- `w1xArrParamSizes - Safe Array of matching sizes.`
- `w4xArrParamValues - Safe Array of matching values.`
- `w2xArrParamLogTypes - Safe Array of matching log types.`
- `long* nParamCount - Number of parameters retrieved.`
- `long* nChannelCount - Number of channels in config.`

### **GetRemoteParamsExAll**
**Description:** Gets the remote logging parameter details from the config.
**Arguments:**
- `w1xArrAppIds - Safe Array of matching application identifiers.`
- `str1xArrParamNames - Safe Array of matching parameter Identifiers.`
- `str1xArrParamDescriptions - Safe Array of parameter descriptions`
- `str1xArrChannelNames - Safe Names of each of the channels.`
- `w1xArrParamSizes - Safe Array of matching sizes.`
- `w4xArrParamValues - Safe Array of matching values.`
- `w2xArrParamLogTypes - Safe Array of matching log types.`
- `long* nParamCount - Number of parameters retrieved.`
- `long* nChannelCount - Number of channels in config.`
- `w1xSlots - Safe Array of matching slot position of configuration defining the parameter.`

### **GetRemoteParamDetails**
**Description:** Gets the remote logging parameter details from the config.
**Arguments:**
- `awAppIds - Array of matching application identifiers. (Unsigned Short)`
- `aszParamIdss - Array of matching parameter names.`
- `aszParamNames - Array of matching parameter names.`
- `aszParamDescriptions - Array of parameter descriptions`
- `aszChannelNames - Names of each of the channels.`
- `awParamSizes - Array of matching sizes. (Unsigned Short)`
- `a2dwParamValues - Array of matching values. (Array of Unsigned Long)`
- `a2wParamLogTypes - Array of matching log types. (Array of Unsigned Short)`
- `long* pnParamCount - Number of parameters retrieved.`
- `long* pnChannelCount - Number of channels in config.`
- `awSlots - Array of matching slot position of configuration defining the parameter. (Unsigned Short).`

### **GetRemoteSessionDetail**
**Description:** Returns the current value of a specified session detail from the remote logging configuration.
**Arguments:**
- `BSTR szName - Name of session detail.`
- `BSTR* pszValue - Returned value for session detail.`

### **GetRemoteTrigger**
**Description:** Retrieves the properties of a given channel's trigger settings.
**Arguments:**
- `short wChannel - The 0 based channel index to retrieve.`
- `long* pnStartPostTriggerMs - Retrieves the delay for the start trigger.`
- `long* pnStopPostTriggerMs - Retrieves the delay for the stop trigger.`

### **GetRemoteTriggerAll**
**Description:** Retrieves the properties of a given channel's trigger settings.
**Arguments:**
- `short wChannel - The 0 based channel index to retrieve.`
- `long* pnStartPostTriggerMs - Retrieves the delay for the start trigger.`
- `long* pnStopPostTriggerMs - Retrieves the delay for the stop trigger.`
- `short* - Retrieves the slot position of the configuration defining the channel.`

### **GetRemoteTriggerCondition**
**Description:** Retrieve a given channel's trigger condition.
**Arguments:**
- `short wChannel - The 0 based channel index to retrieve.`
- `long nTriggerIndex - Specifies which condition  index (0 <= n < 6), where the first 3 are start conditions, and the later, stop conditions.`
- `long* pnTriggerType - Retrieves the trigger condition type (see ECONDITONTYPE):`
- `BSTR* pszParamName - Retrieves the parameter used in > On Data = condition type. If any.`
- `short pwParamAppId - Retrieves the application ID, that the pszParamName belongs to.`
- `long nTriggerCondition - Retrieves the condition operator of the > On Data = type. (See ECOMPARISON) Where:`
- `double* pfTriggerThreshold - Retrieves the floating point number to compare in condition against specified parameter for type > On Data =.`
- `long* pnTriggerCount - Retrieves the number of times a condition should occur before it is considered true.`

### **GetRemoteTriggerConditionAll**
**Description:** Retrieve a given channel's trigger condition.
**Arguments:**
- `short wChannel - The 0 based channel index to retrieve.`
- `long nTriggerIndex - Specifies which condition  index (0 <= n < 6), where the first 3 are start conditions, and the later, stop conditions.`
- `long* pnTriggerType - Retrieves the trigger condition type (see ECONDITONTYPE):`
- `BSTR* pszParamName - Retrieves the parameter used in > On Data = condition type. If any.`
- `short pwParamAppId - Retrieves the application ID, that the pszParamName belongs to.`
- `long nTriggerCondition - Retrieves the condition operator of the > On Data = type. (See ECOMPARISON) Where:`
- `double* pfTriggerThreshold - Retrieves the floating point number to compare in condition against specified parameter for type > On Data =.`
- `long* pnTriggerCount - Retrieves the number of times a condition should occur before it is considered true.`
- `short* - Retrieves the slot position of the configuration defining the channel.`

### **GetRemoteWrap**
**Description:** Gets the remote logging config memory wrapping strategy.
**Arguments:**
- `pbWrap- Output parameter to receive the current logging memory wrapping strategy.`
- `Error messages:SMAPI_ERR_BAD_STATE (-30) if logging config document not present.`

### **GetSlotPercentage**
**Description:** Gets the percentage of a logging slot used by a parameter (As Long)
**Arguments:**
- `INT wAppId - Application Id.`
- `STRING szIdentifier - Filename and full path.`
- `DOUBLE pdPercentage - Output parameter to receive the current percentage`

### **RemoveRemoteParam**
**Description:** Remove a parameter from the Remote Logging Configuration.
**Arguments:**
- `short wAppId – Application Id.`
- `LPCTSTR pszParamId – Unique parameter identifier`

### **SetRemoteChannelProperties**
**Description:** Alters the properties of any given Remote Logging channel.
**Arguments:**
- `short wChannel - The 0 based channel index to modify.`
- `BSTR strChannelName - New name of the channel.`
- `boolean bLogToUnit - Alters the Log to Unit flag.`
- `boolean bTelemetry - Alters the telemetry flag.`
- `boolean bTriggerRearmsAfterStopped - Trigger re-arms after stop condition.`

### **SetRemoteOffset**
**Description:** Sets the remote logging config offset.
**Arguments:**
- `wOffset- Required logging offset.`
- `Error messages:SMAPI_ERR_BAD_STATE (-30) if logging config document not present.`
- `SMAPI_ERR_INVALID_CMD (-31) if Logging offset adjustment not allowed.`

### **SetRemoteSessionDetail**
**Description:** Sets a specified session detail in the remote logging configuration.
**Arguments:**
- `BSTR szName - Name of session detail.`
- `BSTR szValue - New value for session detail.`

### **SetRemoteTrigger**
**Description:** Alters the properties of a given channel's trigger settings..
**Arguments:**
- `short wChannel - The 0 based channel index to modify.`
- `long nStartPostTriggerMs - Set the delay for the start trigger.`
- `long nStopPostTriggerMs - Set the delay for the stop trigger.`

### **SetRemoteTriggerCondition**
**Description:** Modify or create a given channel's trigger condition.
**Arguments:**
- `short wChannel - The 0 based channel index to set.`
- `long nTriggerIndex - Specifies which condition  index (0 <= n < 6), where the first 3 are start conditions, and the later, stop conditions.`
- `long nTriggerType - Sets the trigger condition type (see ECONDITONTYPE):`
- `BSTR pszParamName - Sets the parameter used in >On Data= condition type.`
- `short wParamAppId - Sets the Application Id, that the pszParamName belongs to.`
- `long nTriggerCondition - Sets the condition operator of the >On Data= type (see ECOMPARISON), where:`
- `double fTriggerThreshold - Sets the floating point number to compare in condition against specified parameter for type > On Data =.`
- `long nTriggerCount - Sets the number of times a condition should occur before it is considered true.`

### **SetRemoteWrap**
**Description:** Sets the remote logging config memory wrapping strategy.
**Arguments:**
- `bWrap- Required wrapping memory stategy.`
- `Error messages:SMAPI_ERR_BAD_STATE (-30) if logging config document not present.`

### **UploadRemote**
**Description:** Uploads the remote logging configuration from the ECU.
**Arguments:**
- None

## Parameters

### **CANBuffersExport**
**Description:** Exports the CAN Buffer configuration csv from the given CAN Bus index.  
**Arguments:**  
- `short wIndex - Bus Index.`  
- `BSTR pszFilename - Name and path of .csv to create.`  

### **CANBuffersImport**
**Description:** Imports the CAN Buffer configuration csv into the given CAN Bus index.  
**Arguments:**  
- `short wIndex - Bus Index.`  
- `BSTR pszFilename - Name and path of .csv to import.`  

### **CANMessagesExport**
**Description:** Exports the CAN Message configuration csv from the given CAN Bus index.  
**Arguments:**  
- `short wIndex - Bus Index.`  
- `BSTR pszFilename - Name and path of .csv to create.`  

### **CANMessagesImport**
**Description:** Imports the CAN Message configuration csv into the given CAN Bus index.  
**Arguments:**  
- `short wIndex - Bus Index.`  
- `BSTR pszFilename - Name and path of .csv.`  
- `bool bMerge - Merge with existing messages.`  

### **GetCANParameter**
**Description:** Retrieve a selected CAN Parameter.  
**Arguments:**  
- `BSTR rszParamId - The unique identifier of the CAN Parameter to receive.`  
- `BSTR *rszName - Receives the display name of the parameter.`  
- `BSTR *rszDescription - Receives the description of the parameter.`  
- `double * pdwMaxDisplay - Receives the maximum value.`  
- `double * pdwMinDisplay - Receives the minimum value.`  
- `int * pnMinLoggingRate - Receives the minimum logging rate.`  
- `int * pnScalingFactor - Receives the scalling factor (see EScalingUnit).`  
- `boolean * pbIsMinNotDef - Receives state of min/max values.`  
- `BSTR * rszConvId - Receives the unique identifier of the conversion rule used in this parameter.`  
- `boolean * pbIsRx - Receives a flag to indicate Rx / Tx status of the parameter.`  

### **GetCANParameterBatch**
**Description:** Retrieve CAN parameter details for the given list of parameters.  
**Arguments:**  
- `VARIANT aszIdentifiers – Array (string) of CAN parameter identifiers.`  
- `VARIANT* azNames -  Array of parameter display names.`  
- `VARIANT* astrDescriptions - Array of parameter descriptions.`  
- `VARIANT* adMaxDisplays - Array of parameter maximum values ( doubles ).`  
- `VARIANT* adMinDisplays - Array of parameter minimum values ( doubles ).`  
- `VARIANT* adwMinLoggingRates - Array of parameter minimum logging rates ( unsigned integers ).`  
- `VARIANT* awScalingFactor - Array of parameter scaling factors ( unsigned shorts, see EScalingUnit ).`  
- `VARIANT* abIsMinNotDefs - Array of parameter state of min/max values ( boolean ).`  
- `VARIANT* astrConvId - Array of parameter unique identifiers of the conversion rules.`  
- `VARIANT* pbIsRxs - Array of parameter flags to indicate Rx / Tx status ( boolean ).`  
- `VARIANT* aszDataTypes - Array of parameter data types.`  
- `VARIANT* pszCANBus - Array of parameter CAN Bus names.`  
- `VARIANT* pszCANMsg - Array of parameter CAN Message names.`  
- `VARIANT* pwStartBit - Array of CAN parameter start bits ( unsigned integers ).`  
- `VARIANT* pwBitLength - Array of CAN parameter bit lengths ( unsogned integers ).`  
- `VARIANT* pdGain - Array of CAN parameter gain values (doubles ).`  
- `VARIANT* pdOffset - Array of CAN parameter offset values (doubles ).`  
- `VARIANT* pwByteOrder - Array of CAN parameter byte orders (unsigned shorts ).`  
- `VARIANT* pszMuxId -  Array of CAN parameter multiplexer ids. Blank if parameter is not in a multiplexed message..`  
- `VARIANT* palErrorCodes - Array of error codes ( integers ).`  

### **GetCANParameterEx**
**Description:** Retrieve a selected CAN Parameter.  
**Arguments:**  
- `BSTR szParamId - The unique identifier of the CAN Parameter to receive.`  
- `BSTR* pszName - Receives the display name of the parameter.`  
- `BSTR* pszDescription - Receives the description of the parameter.`  
- `double* pdwMaxDisplay - Receives the maximum value.`  
- `double* pdwMinDisplay - Receives the minimum value.`  
- `unsigned int* pdwMinLoggingRate - Receives the minimum logging rate.`  
- `unsigned short* pwScalingFactor - Receives the scalling factor (see EScalingUnit).`  
- `boolean* pbIsMinNotDef - Receives state of min/max values.`  
- `BSTR* pszConvId - Receives the unique identifier of the conversion rule used in this parameter.`  
- `boolean* pbIsRx - Receives a flag to indicate Rx / Tx status of the parameter.`  
- `BSTR* pszDataType - Receives the data type of the parameter.`  
- `BSTR* pszCANBus - Receives the CAN Bus name containing the parameter.`  
- `BSTR* pszCANMsg - Receives the CAN Message name containing the parameter.`  
- `unsigned short* pwStartBit - Receives the start bit of the parameter within the message.`  
- `unsigned short* pwBitLength - Receives the bit length of the CAN parameter.`  
- `double* pdGain - Receives the gain of the CAN parameter.`  
- `double* pdOffset - Receives the offset of the CAN parameter.`  
- `unsigned short* pwByteOrder - Receives the byte order  of the CAN parameter.`  
- `BSTR* pszMuxId -  Receives the multiplexer id of the CAN parameter. Blank if parameter is not in a multiplexed message..`  

### **GetCANParameterList**
**Description:** Return a list of identifiers for all CAN parameters.  
**Arguments:**  
- `VARIANT FAR* paParams - Variant array of parameter identifiers.`  

### **GetCANParameterListEx**
**Description:** Return a list of CAN Parameter identifiers, names and count in the current project.  
**Arguments:**  
- `paParameterIds`  
- `paParameterNames`  
- `pnParameterCount As Long`  

### **GetValueCAN**
**Description:** Retrieves the value of the specified can parameter.  
**Arguments:**  
- `BSTR szIdentifier - Parameter identifier.`  
- `double FAR* pdResult - Value of the CAN parameter.`  

### **RegenerateInputSignalParameters**
**Description:** Regenerate Input Signal parameters from RAW values.  
**Arguments:**  
- `None.`  
- `.`  

### **ChangeSensorSerialNumber**
**Description:** Changes the serial number of the specified sensor.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR pszIdentifier - Sensor identifier.`  
- `LONG dwSerialNumber - Serial number.`  

### **GetAppsHoldingControlParameter**
**Description:** Returns the application(s) which contain the specified non measurement parameter.  
**Arguments:**  
- `BSTR szParamIdent - Parameter identifier.`  
- `VARIANT FAR * pawAppIds - Applications containing the specified parameter.`  

### **GetAppsHolding**
**Description:** Returns the application(s) which contain the specified measurement parameter.  
**Arguments:**  
- `BSTR szParamIdent - Parameter identifier.`  
- `VARIANT FAR * pawAppIds - Applications containing the specified parameter.`  

### **GetAppsHoldingParam**
**Description:** Returns the application(s) which contain the specified parameter.  
**Arguments:**  
- `BSTR szParamIdent - Parameter identifier.`  
- `short* pwAppsMask - Applications containing the specified parameter.`  

### **GetAppsHoldingParamEx**
**Description:** Returns the application(s) which contain the specified parameter.  
**Arguments:**  
- `BSTR szParamIdent - Parameter identifier.`  
- `VARIANT FAR * pawAppIds - Applications containing the specified parameter.`  

### **GetAxisAddress**
**Description:** Retrieves the address of the parameter.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `LPCTSTR pszIdentifier - Parameter identifier.`  
- `long* plAddress - Address returned`  

### **GetAxisParameterFromMap**
**Description:** Retrieves a list of axis parameter(s) used by the map parameter in the application.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `LPCTSTR pszIdentifier - Map parameter identifier.`  
- `VARIANT* str1xParameters - Safe Array of axis parameter(s) used by the map parameter.`  

### **GetDTVValue1AxisMap**
**Description:** Returns the values of a specified 1-axis map (CURVE) editable parameter at all axis points from the supplied DTV.  
**Arguments:**  
- `BSTR szIdentifier - Parameter identifier.`  
- `BSTR szDTV- Filename and full path of the DTV to retrieve value from.`  
- `VARIANT* Value - 1-d array of doubles holding current values.`  

### **GetDTVValue1AxisMapBatch**
**Description:** Returns a list of values from a specified list of  1-axis maps (CURVE) editable parameters at all axis points from the supplied DTV.  
**Arguments:**  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `BSTR szDTV- Filename and full path of the DTV to retrieve value from.`  
- `VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                               Note: The first value in each list contains the number of values in the list.`  

### **GetDTVValue2AxisMap**
**Description:** Returns the values of a specified 2-axis map (MAP) editable parameter at all axis points from the supplied DTV.  
**Arguments:**  
- `BSTR szIdentifier - Parameter identifier.`  
- `BSTR szDTV- Filename and full path of the DTV to retrieve value from.`  
- `VARIANT* Value - 2-d array of doubles holding current values.`  

### **GetDTVValue2AxisMapBatch**
**Description:** Returns a list of values from a specified list of  2-axis maps (MAP) editable parameters at all axis points from the supplied DTV.  
**Arguments:**  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `BSTR szDTV- Filename and full path of the DTV to retrieve value from.`  
- `VARIANT* Value - 2-d array of doubles holding current values.`  
- `VARIANT* pafValues - 3-d array of doubles holding lists of parameters arrays.
                                              Note: The first value in each row and column contains the number of values in the list.`  

### **GetDTVValueArray**
**Description:** Returns the values of a specified array (VAL_BLK) editable (characteristic) parameter at all index positions from the supplied DTV.  
**Arguments:**  
- `BSTR szIdentifier - Parameter identifier.`  
- `BSTR szDTV- Filename and full path of the DTV to retrieve value from.`  
- `VARIANT* Value - 1-d array of doubles holding current values.`  

### **GetDTVValueArrayBatch**
**Description:** Returns a list of values from a specified list of arrays (VAL_BLK) editable parameters at all index positions from the supplied DTV.  
**Arguments:**  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `BSTR szDTV- Filename and full path of the DTV to retrieve value from.`  
- `VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                               Note: The first value in each list contains the number of values in the list.`  

### **GetDTVValueAxis**
**Description:** Returns the values of a specified axis (AXIS_PTS) editable parameter at all axis points from the supplied DTV.  
**Arguments:**  
- `BSTR szIdentifier - Parameter identifier.`  
- `BSTR szDTV- Filename and full path of the DTV to retrieve value from.`  
- `VARIANT* Value - 2-d array of doubles holding current values.`  

### **GetDTVValueAxisBatch**
**Description:** Returns a list of values from a specified list of axis (AXIS_PTS editable parameters at all axis points from the supplied DTV.  
**Arguments:**  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `BSTR szDTV- Filename and full path of the DTV to retrieve value from.`  
- `VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                               Note: The first value in each list contains the number of values in the list.`  

### **GetDTVValueScalar**
**Description:** Returns the value of a specified scalar (VALUE) editable parameter from the supplied DTV.  
**Arguments:**  
- `BSTR szIdentifier - Parameter identifier.`  
- `BSTR szDTV- Filename and full path of the DTV to retrieve value from.`  
- `double* pdResult - Parameters current value.`  

### **GetDTVValueScalarBatch**
**Description:** Returns a list of values from a specified list of scalar (VALUE) editable parameters from the supplied DTV.  
**Arguments:**  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `BSTR szDTV- Filename and full path of the DTV to retrieve value from.`  
- `VARIANT* pafValues - List of parameters values.`  

### **GetDTVValueString**
**Description:** Returns the value of a specified string editable parameter from the supplied DTV.  
**Arguments:**  
- `BSTR szIdentifier - Parameter identifier.`  
- `BSTR szDTV- Filename and full path of the DTV to retrieve value from.`  
- `BSTR FAR* pszValue - Returned value.`  

### **GetDTVValueStringBatch**
**Description:** Returns a list of values from a specified list of string editable parameters from the supplied DTV.  
**Arguments:**  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `BSTR szDTV- Filename and full path of the DTV to retrieve value from.`  
- `VARIANT* paszValues - List of parameters strings.`  

### **GetECUMeasurementAddress**
**Description:** Retrieves the address of the parameter.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `LPCTSTR pszIdentifier - Parameter identifier.`  
- `long* plAddress - Address returned`  
- `BYTE* plIdent - Ident returned`  

### **GetExternalInputGainOffset**
**Description:** Gets the Gain & Offset of an External Input parameter.  
**Arguments:**  
- `BSTR pszParamId - The unique identifier of the External Input parameter.`  
- `double *pdGain - Receives the value of the parameter gain.`  
- `double *pdOffset - Receives the value of the parameter offset.`  

### **GetMapProperties**
**Description:** Return common attributes of a given map parameter.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `LPCTSTR pszIdentifier - parameter identifier.`  
- `LPBSTR pszXAxisId - Identifier of the x axis parameter.`  
- `LPBSTR pszYAxisId - Identifier of the y axis parameter.`  
- `short* psXAxisPts - Number on breakpoints in the x axis.`  
- `short* psYAxisPts - Number on breakpoints in the y axis.`  

### **GetModifiedParametersList**
**Description:** Return a list of string IDs and names for the modified parameters in a selected application.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `VARIANT* str1xArrParameterIds - Variant wrapped SAFEARRAY of strings containing the unique parameter identifiers.`  
- `VARIANT* str1xArrParameterNames - Variant wrapped SAFEARRAY of strings containing the matching parameter names.`  
- `long* pnParameterCount - Returns the number of parameters in the returned SAFEARRAYS.`  

### **GetParameterBitMask**
**Description:** Retrieves a bit mask of a given parameter.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR pszIdentifier - Unique parameter identifier.`  
- `long* plBitMask - Receives the parameter bit mask.`  

### **GetParameterBitShift**
**Description:** Retrieves a bit shift of a given parameter.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR pszIdentifier - Unique parameter identifier.`  
- `int* plBitShift - Receives the parameter bit shift.`  

### **GetParameterByteOrder**
**Description:** Retrieves a bit shift of a given parameter.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR pszIdentifier - Unique parameter identifier.`  
- `int* plByteOrder - Receives the parameter byte order.`  
- `0: MSB First
              1: MSB Last
              2: Undefined`  

### **GetParameterList**
**Description:** Return a list of string IDs and names for the parameters in a selected application.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR* pszAppName - String representation of the selected application.`  
- `VARIANT* str1xArrParameterIds - Variant wrapped SAFEARRAY of strings containing the unique parameter identifiers.`  
- `VARIANT* str1xArrParameterNames - Variant wrapped SAFEARRAY of strings containing the matching parameter names.`  
- `long* pnParameterCount - Returns the number of parameters in the returned SAFEARRAYS.`  

### **GetParameterListByType**
**Description:** Return a list of string IDs and names of the parameters in a selected application for a specific parameter type.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR* pszParamType - Type of parameters to return.  Valid inputs are MEAS, SCALAR, AXIS, 1AXIS, 2AXIS, ARRAY, STRING.`  
- `BSTR* pszAppName - String representation of the selected application.`  
- `VARIANT* str1xArrParameterIds - Variant wrapped SAFEARRAY of strings containing the unique parameter identifiers.`  
- `VARIANT* str1xArrParameterNames - Variant wrapped SAFEARRAY of strings containing the matching parameter names.`  
- `long* pnParameterCount - Returns the number of parameters in the returned SAFEARRAYS.`  

### **GetParameterProperties**
**Description:** Return common attributes of a given parameter.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR pszIdentifier - Unique parameter identifier.`  
- `BSTR* pszUnits - Receives the parameters units.`  
- `double* pdLowerEngLimit - Receives the lower engineering limit of the parameter.`  
- `double* pdUpperEngLimit - Receives the upper engineering limit of the parameter.`  
- `BSTR* pszFormat - Receives the display format of the parameter.`  
- `BSTR* pszConversionId - Receives the conversion id of the parameter (if available).`  
- `BSTR* pszDescription - Receives the readable description/comment of the parameter`  

### **GetParameterPropertiesByApp**
**Description:** Return common attributes of all parameters in the specified application.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `VARIANT* aszIdentifier - Array of unique parameter identifiers.`  
- `VARIANT* aszName - Array of parameter names.`  
- `VARIANT* aszDescription - Array of parameter descriptions.`  
- `VARIANT* aszParamType - Array of parameter types.`  
- `VARIANT* aszUnits - Array of units.`  
- `VARIANT* aszFormats - Array of parameter formats.`  
- `VARIANT* aszConversionId - Array of conversion Ids.`  
- `VARIANT* aszGroups - Array of parameter group arrays.`  
- `VARIANT* aszDataType - Array of parameter data types.`  
- `VARIANT* avwDataSize - Array of parameter data sizes.`  
- `VARIANT* avdLowerEngLimit - Array of lower engineering limits.`  
- `VARIANT* avdUpperEngLimit - Array of upper engineering limits.`  
- `VARIANT* avdwMaxLoggingRate - Array of maximum logging rates.`  
- `VARIANT* avbPrime - Array of prime flags.`  
- `VARIANT* avbReadOnly - Array of read only flags.`  
- `VARIANT* avbLiveTuneable - Array of live tuneable flags.`  

### **GetParameterPropertiesByAppandType**
**Description:** Return common attributes of all parameters of a specified type in the specified application .  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR pszParamType - Type of parameters to return.  Valid inputs are MEAS, SCALAR, AXIS, 1AXIS, 2AXIS, ARRAY, STRING.`  
- `VARIANT* aszIdentifier - Array of unique parameter identifiers.`  
- `VARIANT* aszName - Array of parameter names.`  
- `VARIANT* aszDescription - Array of parameter descriptions.`  
- `VARIANT* aszUnits - Array of units`  
- `VARIANT* aszFormats - Array of parameter formats`  
- `VARIANT* aszConversionId - Array of conversion IDs`  
- `VARIANT* aszGroups - Array of parameter group arrays`  
- `VARIANT* aszDataType - Array of parameter data types`  
- `VARIANT* avwDataSize - Array of parameter data sizes`  
- `VARIANT* avdLowerEngLimit - Array of lower engineering limits`  
- `VARIANT* avdUpperEngLimit - Array of upper engineering limits`  
- `VARIANT* avdwMaxLoggingRate - Array of maximum logging rates`  
- `VARIANT* avbPrime - Array of prime flags`  
- `VARIANT* avbReadOnly - Array of read only flags`  
- `VARIANT* avbLiveTuneable - Array of live tuneable flags`  

### **GetParameterPropertiesByType**
**Description:** Return common attributes of a given parameter of a specified type.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR pszIdentifier - Unique parameter identifier.`  
- `BSTR pszParamType - Type of parameters to return.  Valid inputs are MEAS, SCALAR, AXIS, 1AXIS, 2AXIS, ARRAY, STRING.`  
- `BSTR* pszUnits - Receives the parameters units.`  
- `double* pdLowerEngLimit - Receives the lower engineering limit of the parameter.`  
- `double* pdUpperEngLimit Receives the upper engineering limit of the parameter.`  
- `BSTR* pszFormat - Receives the display format of the parameter.`  
- `BSTR* pszConversionId - Receives the conversion id of the parameter (if available).`  
- `BSTR* pszDescription - Receives the readable description/comment of the parameter`  

### **GetParameterPropertiesEx**
**Description:** Get method for retrieving extended parameter properties.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `LPCTSTR pszIdentifier - Parameter identifier.`  
- `LPBSTR pszName`  
- `LPBSTR pszParamType - SCALAR, MEAS etc.`  
- `VARIANT* pszGroups - Array of group name strings.`  
- `LPBSTR pszDataType`  
- `short* psDataSize`  
- `long* plMaxLoggingRate`  
- `VARIANT_BOOL FAR* pbPrime`  
- `VARIANT_BOOL FAR* pbReadOnly`  
- `VARIANT_BOOL FAR* pbLiveTuneable`  

### **GetParameterPropertiesExByType**
**Description:** Get method for retrieving extended parameter properties based on a specific parameter type.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `LPCTSTR pszIdentifier - Parameter identifier.`  
- `LPBSTR pszParamType - Type of parameters to return.  Valid inputs are:
                MEAS,
                SCALAR,
                AXIS,
                1AXIS,
                2AXIS,
                ARRAY,
                STRING.`  
- `LPBSTR pszName`  
- `LPBSTR pszParamType - SCALAR, MEAS etc.`  
- `VARIANT* pszGroups - Array of group name strings.`  
- `LPBSTR pszDataType`  
- `short* psDataSize`  
- `long* plMaxLoggingRate`  
- `VARIANT_BOOL FAR* pbPrime`  
- `VARIANT_BOOL FAR* pbReadOnly`  
- `VARIANT_BOOL FAR* pbLiveTuneable`  

### **GetParametersAndGroups**
**Description:** Returns a list of all parameters and the group descriptions in the application.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT* str1xIdentifiers - Safe Array of parameter identifiers.`  
- `VARIANT* str1xGroups - Safe Array of group descriptions for each parameter.`  

### **GetParameterWarningLimits**
**Description:** Gets the warning limits from a parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `double* pdLow - Lower display warning limit.`  
- `double* pdHigh - Upper display warning limit.`  

### **GetRowDetails**
**Description:** Retrieves the row detailsof a given parmeter.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR pszIdentifier - Unique parameter identifier.`  
- `short* pnId - Receives the parameter Id.`  
- `long* plIdentOffset - Receives the parameter ident offset.`  

### **GetScalarAddress**
**Description:** Retrieves the address of the parameter.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `LPCTSTR pszIdentifier - Parameter identifier.`  
- `long* plAddress - Address returned`  

### **GetStringValue1AxisMap**
**Description:** Returns the current values of a specified 1-axis map (CURVE) Editable Parameter at all axis points as formatted strings  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT* Value - 1-d array of BSTRSs holding current values.`  

### **GetStringValue2AxisMap**
**Description:** Returns the current values of a specified 2-axis map (MAP) Editable Parameter at all axis points as formatted strings.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT* Value - 2-d array of BSTRSs holding current values.`  

### **GetStringValueArray**
**Description:** Returns the current values of a specified array (VAL_BLK) Editable (characteristic) Parameter at all index positions as formatted text values  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT* Value - 1-d array of BSTRs holding current values.`  

### **GetStringValueAxis**
**Description:** Returns the current values of a specified axis (AXIS_PTS) Editable Parameter at all axis points as formatted text values.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT* Value - 1-d array of BSTRs holding current values.`  

### **GetStringValueMeasurement**
**Description:** Returns the current value of a specified measurement parameter as a formatted string.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `BSTR* pszResult - Parameters current value.`  

### **GetValue1AxisMap**
**Description:** Returns the current values of a specified 1-axis map (CURVE) editable parameter at all axis points.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT* Value - 1-d array of doubles holding current values.`  

### **GetValue1AxisMapBatch**
**Description:** Returns the current values of a specified  list of 1-axis map (CURVE) editable parameters at all axis points.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                               Note: The first value in each list contains the number of values in the list.`  

### **GetValue1AxisMapBatchEx**
**Description:** Returns the current values of a specified  list of 1-axis map (CURVE) editable parameters at all axis points with an error code for each parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                               Note: The first value in each list contains the number of values in the list.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **GetValue2AxisMap**
**Description:** Returns the current values of a specified 2-axis map (MAP) editable parameter at all axis points.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT* Value - 2-d array of doubles holding current values.`  

### **GetValue2AxisMapBatch**
**Description:** Returns the current values of a specified  list of 2-axis map (MAP) editable parameters at all axis points.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT* pafValues - 3-d array of doubles holding lists of parameters arrays.
                                              Note: The first value in each row and column contains the number of values in the list.`  

### **GetValue2AxisMapBatchEx**
**Description:** Returns the current values of a specified  list of 2-axis map (MAP) editable parameters at all axis points with an error code for each parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT* pafValues - 3-d array of doubles holding lists of parameters arrays.
                                              Note: The first value in each row and column contains the number of values in the list.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **GetValueArray**
**Description:** Returns the current values of a specified array (VAL_BLK) editable (characteristic) parameter at all index positions.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT* Value - 1-d array of doubles holding current values.`  

### **GetValueArrayBatch**
**Description:** Returns the current values of a specified  list of array (VAL_BLK) editable (characteristic) parameters at all index positions.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                               Note: The first value in each list contains the number of values in the list.`  

### **GetValueArrayBatchEx**
**Description:** Returns the current values of a specified  list of array (VAL_BLK) editable (characteristic) parameters at all index positions with an error code for each parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                               Note: The first value in each list contains the number of values in the list.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **GetValueAxis**
**Description:** Returns the current values of a specified axis (AXIS_PTS) editable parameter at all axis points.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT* Value - 1-d array of doubles holding current values.`  

### **GetValueAxisBatch**
**Description:** Returns the current values of a specified  list of axis (AXIS_PTS) editable parameters at all axis points.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                               Note: The first value in each list contains the number of values in the list.`  

### **GetValueAxisBatchEx**
**Description:** Returns the current values of a specified  list of axis (AXIS_PTS) editable parameters at all axis points with an error code for each parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                               Note: The first value in each list contains the number of values in the list.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **GetValueCANBatch**
**Description:** Returns the current value of a specified  list of CAN parameters with an error code for each parameter.  
**Arguments:**  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT* pafValues - List of parameters values.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **GetValueMeasurement**
**Description:** Returns the current value of a specified measurement parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `long* bAddToDaq - (UNUSED PARAM).`  
- `double* pdResult - Parameters current value.`  

### **GetValueMeasurementBatch**
**Description:** Returns the current value of a specified  list of measurement parameters.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT* pafValues - List of parameters values.`  

### **GetValueMeasurementBatchEx**
**Description:** Returns the current value of a specified  list of measurement parameters with an error code for each parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT* pafValues - List of parameters values.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **GetValueOffset**
**Description:** Retrieve the live value offset for a parameter.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR szParamIdent - Parameter identifier.`  
- `double* pdOffset - Live offset value`  

### **GetValueScalar**
**Description:** Returns the current value of a specified scalar (VALUE) editable parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `double* pdResult - Parameters current value.`  

### **GetValueScalarBatch**
**Description:** Returns a list of values from a specified list of scalar (VALUE) editable parameters.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT* pafValues - List of parameters values.`  

### **GetValueScalarBatchEx**
**Description:** Returns a list of values from a specified list of scalar (VALUE) editable parameters with an error code for each parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT* pafValues - List of parameters values.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **GetValueString**
**Description:** Returns the current value of a specified string editable parameter  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `BSTR FAR* pszValue - Returned value.`  

### **GetValueStringBatch**
**Description:** Returns a list of values from a specified list of string editable parameters.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT* paszValues - List of parameters strings.`  

### **GetValueStringBatchEx**
**Description:** Returns a list of values from a specified list of string editable parameters with an error code for each parameter..  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT* paszValues - List of parameters strings.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **GetValueVirtualBatch**
**Description:** Returns the current value of a specified  list of virtual parameters with an error code for each parameter.  
**Arguments:**  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT* pafValues - List of parameters values.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **IsParameterLoggable**
**Description:** Returns the loggable property of a measurement parameter  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `BOOL FAR* pbResult - Returned value.`  

### **ParameterExists**
**Description:** Identifies if a given parameter exists.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR pszIdentifier - Unique parameter identifier.`  
- `bool* pbResult`  

### **ParameterExistsEx**
**Description:** Identifies if a parameter of the given type exists.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR pszIdentifier - Unique parameter identifier.`  
- `BSTR pszParamType - One of 'MEAS', 'SCALAR', 1AXIS', '2AXIS', 'ARRAY', 'STRING', 'VIRTUAL' or 'CAN'`  
- `bool* pbResult`  

### **RestoreValue**
**Description:** Restore the parameter value to original saved value.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  

### **SetBatchMode**
**Description:** Call this to enter (or leave) batch mode. This is used when creating virtual parameters; entering batch mode before the creation of multiple Virtual Parameters and leaving batch mode afterwards. Using this method, all created/updated Virtual Parameters will only be available in System Monitor after leaving batch mode.  
**Arguments:**  
- `boolean bEnter - Enter/leave batch mode, true or false respectively.`  

### **SetExternalInputGainOffset**
**Description:** Sets the Gain & Offset of an External Input parameter.  
**Arguments:**  
- `BSTR pszParamId - The unique identifier of the External Input parameter.`  
- `double dGain - The value to set the Gain.`  
- `double dOffset - The value to set the Offset.`  

### **SetParameterWarningLimits**
**Description:** Sets the warning limits on a parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `double dLow - Lower display warning limit.`  
- `double dHigh - Upper display warning limit.`  

### **SetStringValue1AxisMap**
**Description:** Sets the current value of a specified 1-axis map (CURVE) Editable Parameter at one or more axis points from an array of string values  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT Value - 1-d array of BSTRs holding new values.`  

### **SetStringValue2AxisMap**
**Description:** Sets the current value of a specified 2-axis map (MAP) Editable Parameter at one or more axis points from an array of formatted strings.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT Value - 2-d array of BSTRs holding new values.`  

### **SetStringValueArray**
**Description:** Sets the current value of a specified array (VAL_BLK) Parameter at one or more index positions from an array of strings.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT Value - 1-d array of BSTRs holding new values.`  

### **SetStringValueAxis**
**Description:** Sets the current value of a specified axis (AXIS_PTS) Editable Parameter at one or more axis points from an array of strings.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT Value - 1-d array of BSTRs holding new values.`  

### **SetStringValueScalar**
**Description:** Sets the current value of a specified scalar (VALUE) Editable Parameter from a string.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `BSTR szValue - New value.`  

### **SetValueScalarBatch**
**Description:** Set values for a specified list of scalar (VALUE) editable parameters with an error code for each parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT afValues - List of parameters values.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **SetValue1AxisMapBatch**
**Description:** Set values for a specified list of 1-axis map (CURVE) editable parameters at all axis points with an error code for each parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT afValues - 2-d array of doubles holding lists of parameters values.
                                            Note: The first value in each list should contain the number of values in the list.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **SetValue2AxisMapBatch**
**Description:** Set values for a specified list of 2-axis map (MAP) editable parameters at all axis points with an error code for each parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT afValues - 3-d array of doubles holding lists of parameters arrays.
                                            Note: The first value in each row and column should contain the number of values in row/column.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **SetValueArrayBatch**
**Description:** Set values for a specified list of  array (VAL_BLK) editable (characteristic) parameters at all index positions with an error code for each parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT afValues - 2-d array of doubles holding lists of parameters values.
                                               Note: The first value in each list should contain the number of values in the list.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **SetValueAxisBatch**
**Description:** Set values for a specified list of axis (AXIS_PTS) editable parameters at all axis points with an error code for each parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT afValues - 2-d array of doubles holding lists of parameters values.
                                               Note: The first value in each list should contain the number of values in the list.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **SetValueStringBatch**
**Description:** Set values for a specified list of string editable parameters with an error code for each parameter..  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `VARIANT aszIdentifiers - List of parameter identifiers.`  
- `VARIANT aszValues - List of parameters strings.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **SetValue1AxisMap**
**Description:** Sets the current value of a specified 1-axis map (CURVE) editable parameter at one or more axis points.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT Value - 1-d array of doubles holding new values.`  

### **SetValue2AxisMap**
**Description:** Sets the current value of a specified 2-axis map (MAP) editable parameter at one or more axis points.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT Value - 2-d array of doubles holding new values.`  

### **SetValueArray**
**Description:** Sets the current value of a specified array (VAL_BLK) parameter at one or more index positions.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT Value - 1-d array of doubles holding new values.`  

### **SetValueAxis**
**Description:** Sets the current value of a specified axis (AXIS_PTS) editable parameter at one or more axis points.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `VARIANT Value - 1-d array of doubles holding new values.`  

### **SetValueOffset**
**Description:** Sets the live value offset for a parameter.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR szParamIdent - Parameter identifier.`  
- `double pdOffset - Live offset value.`  

### **SetValueScalar**
**Description:** Sets the current value of a specified scalar (VALUE) editable parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `double dValue - New value.`  

### **SetValueString**
**Description:** Sets the current value of a specified string editable parameter.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `BSTR szIdentifier - Parameter identifier.`  
- `LPCTSTR pszValue - New value.`  

### **ZeroLiveValue**
**Description:** Zero's the live value by applying an offset to a measurement parameter.  
**Arguments:**  
- `short wAppId - Application Id.`  
- `BSTR szParamIdent - Parameter identifier.`  

### **AddVirtualParameterGroup**
**Description:** Adds a Virtual Parameter Group  
**Arguments:**  
- `LPCTSTR szPath - The path where the groups is to be added, e.g. \\TopLevelGroup\\SubGroup.`  
- `LPCTSTR szName - The display name for the virtual parameter .`  
- `LPCTSTR szDescription - Description of the virtual parameter.`  
- `BOOL bParamsReadOnly - If set to true, the virtual parameter group will be marked as a Read Only.`  

### **GetValueVirtual**
**Description:** Retrieve a selected Virtual Parameter.  
**Arguments:**  
- `BSTR pszIdentifier - Virtual parameter identifier`  
- `double* pdResult - Value of the virtual parameter`  

### **GetVirtualParamCount**
**Description:** Retrieve the number of Virtual Parameters in the current project.  
**Arguments:**  
- `long* pnParamCount - The number of virtual parameters in the active project.`  

### **GetVirtualParamCountGroup**
**Description:** Retrieves the number of virtual parameters in a group.  
**Arguments:**  
- `LPCTSTR szPath -  The path of group that contains the parameters, e.g. \\TopLevelGroup\\SubGroup.`  
- `long* pnParamCount - The number of virtual parameters in the group.`  

### **GetVirtualParameter**
**Description:** Retrieve a selected Virtual Parameter.  
**Arguments:**  
- `BSTR rszParamId - The unique identifier of the Virtual Parameter to receive.`  
- `BSTR *rszName - Receives the display name of the parameter.`  
- `BSTR *rszDescription - Receives the description of the parameter.`  
- `double * pdwMaxDisplay - Receives the maximum value.`  
- `double * pdwMinDisplay - Receives the minimum value.`  
- `int * pnMinLoggingRate - Receives the minimum logging rate.`  
- `int * pnScalingFactor - Receives the scalling factor (see EScalingUnit).`  
- `boolean * pbIsMinNotDef - Receives state of min/max values.`  
- `BSTR * rszExpression - Receives the expression used to evaluate the virtual parameter.`  
- `BSTR * rszConvId - Receives the unique identifier of the conversion rule used in this parameter.`  

### **GetVirtualParameterBatch**
**Description:** Retrieve virtual parameter details for the given list of parameters.  
**Arguments:**  
- `VARIANT aszIdentifiers – Safe Array (string) of virtual parameter identifiers.`  
- `VARIANT* astrNames - Safe Array of parameter display names.`  
- `VARIANT* astrDescription - Safe Array of parameter descriptions.`  
- `VARIANT* afMaxDisplay - Safe Array of parameter maximum values ( doubles ).`  
- `VARIANT* afMinDisplay - Safe Array of parameter minimum values ( doubles ).`  
- `VARIANT* anMinLoggingRate - Safe Array of parameter minimum logging rates ( unsigned integers ).`  
- `VARIANT* anScalingFactor - Safe Array of parameter scaling factors (see EScalingUnit).`  
- `VARIANT* abIsMinNotDef - Safe Array of parameter state of min/max values ( boolean ).`  
- `VARIANT* astrExpression - Safe Array of parameter expressions used to evaluate the virtual parameters.`  
- `VARIANT* astrConvId - Safe Array of parameter unique identifiers of the conversion rules.`  
- `VARIANT* astrUnits - Safe Array of parameter units.`  
- `VARIANT* astrFormat - Safe Array of parameter display formats.`  
- `VARIANT* astrGroup - Safe Array of parameter group names.`  

### **GetVirtualParameterBatchEx**
**Description:** Retrieve virtual parameter details for the given list of parameters.  
**Arguments:**  
- `VARIANT aszIdentifiers - Array (string) of virtual parameter identifiers.`  
- `VARIANT* aszNames - Array of parameter display names.`  
- `VARIANT* aszDescriptions - Array of parameter descriptions.`  
- `VARIANT* adMaxDisplays - Array of parameter maximum values ( doubles ).`  
- `VARIANT* adMinDisplays - Array of parameter minimum values ( doubles ).`  
- `VARIANT* adwMinLoggingRates - Array of parameter minimum logging rates ( unsigned integers ).`  
- `VARIANT* awScalingFactors - Array of parameter scaling factors ( unsigned shorts, see EScalingUnit ).`  
- `VARIANT* abIsMinNotDefs - Array of parameter state of min/max values ( boolean ).`  
- `VARIANT* aszExpressions - Array of parameter expressions used to evaluate the virtual parameters.`  
- `VARIANT* aszConvIds - Array of parameter unique identifiers of the conversion rules.`  
- `VARIANT* aszUnits - Array of parameter units.`  
- `VARIANT* aszFormat - Array of parameter display formats.`  
- `VARIANT* aszGroup - Array of parameter group names.`  
- `VARIANT* szDataTypes - Array of parameter data types.`  
- `VARIANT* palErrorCodes - List of error codes.`  

### **GetVirtualParameterEx**
**Description:** Retrieve a selected Virtual Parameter.  
**Arguments:**  
- `BSTR rszParamId - The unique identifier of the Virtual Parameter to receive.`  
- `BSTR *rszName - Receives the display name of the parameter.`  
- `BSTR *rszDescription - Receives the description of the parameter.`  
- `double * pdwMaxDisplay - Receives the maximum value.`  
- `double * pdwMinDisplay - Receives the minimum value.`  
- `int * pnMinLoggingRate - Receives the minimum logging rate.`  
- `int * pnScalingFactor - Receives the scalling factor (see EScalingUnit).`  
- `boolean * pbIsMinNotDef - Receives state of min/max values.`  
- `BSTR * rszExpression - Receives the expression used to evaluate the virtual parameter.`  
- `BSTR * rszConvId - Receives the unique identifier of the conversion rule used in this parameter.`  
- `BSTR * rszUnits - Receives the units of this parameter.`  
- `BSTR * rszFormat - Receives the display format used for this parameter.`  
- `BSTR * rszGroup - Receives the group name containing this parameter.`  

### **GetVirtualParameterEx2**
**Description:** Retrieve a selected Virtual Parameter.  
**Arguments:**  
- `BSTR szParamId - The unique identifier of the Virtual Parameter to receive.`  
- `BSTR* pszName - Receives the display name of the parameter.`  
- `BSTR* pszDescription - Receives the description of the parameter.`  
- `double* pdMaxDisplay - Receives the maximum value.`  
- `double* pdMinDisplay - Receives the minimum value.`  
- `unsigned int* pdwMinLoggingRate - Receives the minimum logging rate.`  
- `unsigned short* pwScalingFactor - Receives the scalling factor (see EScalingUnit).`  
- `boolean* pbIsMinNotDef - Receives state of min/max values.`  
- `BSTR* prszExpression - Receives the expression used to evaluate the virtual parameter.`  
- `BSTR* prszConvId - Receives the unique identifier of the conversion rule used in this parameter.`  
- `BSTR* prszUnits - Receives the units of this parameter.`  
- `BSTR* prszFormat - Receives the display format used for this parameter.`  
- `BSTR* prszGroup - Receives the group name containing this parameter.`  
- `BSTR* pszDataType - Receives the data type of this parameter.`  

### **GetVirtualParameterGroup**
**Description:** Get Virtual Parameter Group details  
**Arguments:**  
- `LPCTSTR szGroup - The identifier of the group to lookup.`  
- `BSTR* pszName - Receives the display name for the virtual parameter .`  
- `BSTR* pszDescription - Receives the description of the virtual parameter.`  
- `BOOL* pbParamsReadOnly - Receives the read only statusof the group.`  

### **GetVirtualParameterGroupList**
**Description:** Return a list of Virtual Parameter groups in the current project.  
**Arguments:**  
- `VARIANT FAR* paGroupPaths - Receives a list of paths of the groups, e.g. \\TopLevelGroup\\SubGroup.`  
- `Long* pnGroupCount  - Receives the total number of groups.`  

### **GetVirtualParameterList**
**Description:** Retrieve a list of the virtual parameters in the current project.  
**Arguments:**  
- `VARIANT FAR* paParams - VARIANT contained safe-array of string names.`  

### **GetVirtualParameterListEx**
**Description:** Return a list of Virtual Parameter identifiers, names and count in the current project.  
**Arguments:**  
- `VARIANT FAR* paParameterIds`  
- `VARIANT FAR* paParameterNames`  
- `Long* pnParameterCount`  

### **GetVirtualParameterListGroup**
**Description:** Retrieves a list of the virtual parameters in the group.  
**Arguments:**  
- `LPCTSTR szPath -  The path of group that contains the parameters, e.g. \\TopLevelGroup\\SubGroup.`  
- `paParams - VARIANT contains safe-array of parameter Identifiers.`  

### **RemoveAllVirtualParameters**
**Description:** Removes/deletes all Virtual Parameters in the active project.  
**Arguments:**  

### **RemoveVirtualParameter**
**Description:** Removes a selected Virtual Parameter  
**Arguments:**  
- `BSTR rszParamId - The unique identifier of the Virtual Parameter to remove.`  

### **SetVirtualParameter**
**Description:** Modify or Create a Virtual Parameter.  
**Arguments:**  
- `BSTR rszParamId - The unique identification of the virtual parameter.`  
- `BSTR rszName - The display name for the virtual parameter.`  
- `BSTR rszDescription - Description of the virtual parameter.`  
- `double dwMaxDisplay  - Maximum value.`  
- `double dwMinDisplay  - Minimum value.`  
- `int nMinLoggingRate - Minimum logging rate.`  
- `int nScalingFactor - See EScalingUnit in Enumeration Definitions.`  
- `boolean bIsMinNotDef - If set to true, the Virtual Parameter will be marked as a Prime Parameter.`  
- `BSTR rszExpression - The expression to evaluate in the Virtual Parameter.`  
- `BSTR rszConvId - The conversion rule identifier for converting the output value to appropriate unit values.`  
- `boolean bOverwrite - Overwrite existing data.`  

### **SetVirtualParameterDataType**
**Description:** Set the data type of the Virtual Parameter.  
**Arguments:**  
- `BSTR rszParamId - The unique identification of the virtual parameter.`  
- `enumDataType eDataType - The data type.`  

### **SetVirtualParameterEx**
**Description:** Set groups, units and formatting  for Virtual Parameters  
**Arguments:**  
- `LPCTSTR pszParamId - The unique identification of the virtual parameter.`  
- `LPCTSTR rszName - The display name for the virtual parameter.`  
- `LPCTSTR pszDescription - Description of the virtual parameter.`  
- `double dwMaxDisplay  - Maximum value.`  
- `double dwMinDisplay  - Minimum value.`  
- `int nMinLoggingRate - Minimum logging rate.`  
- `int nScalingFactor - See EScalingUnit in Enumeration Definitions.`  
- `boolean bIsMinNotDef - If set to true, the Virtual Parameter will be marked as a Prime Parameter.`  
- `LPCTSTR rszExpression - The expression to evaluate in the Virtual Parameter.`  
- `LPCTSTR pszConvId - The conversion rule identifier for converting the output value to appropriate unit values.`  
- `boolean bOverwrite - Overwrite existing data.`  
- `LPCTSTR szUnits - Sets the overriding units in which to display the virtual parameter’s value`  
- `LPCTSTR szFormatOverride - Sets the overriding format in which to display the virtual parameter’s value`  

### **SetVirtualParameterExtended**
**Description:** Adds a virtual parameter with all options.  
**Arguments:**  
- `LPCTSTR pszParamId - The unique identification of the virtual parameter.`  
- `LPCTSTR rszName - The display name for the virtual parameter.`  
- `LPCTSTR pszDescription - Description of the virtual parameter.`  
- `double dwMaxDisplay - Maximum value.`  
- `double dwMinDisplay - Minimum value.`  
- `int nMinLoggingRate - Minimum logging rate.`  
- `int nScalingFactor - See EScalingUnit in Enumeration Definitions`  
- `boolean bIsMinNotDef - If set to true, the virtual parameter will be marked as a Prime Parameter.`  
- `LPCTSTR rszExpression - The expression to evaluate in the virtual parameter.`  
- `LPCTSTR pszConvId - The conversion rule identifier for converting the output value to appropriate unit values.`  
- `boolean bOverwrite - Overwrites existing data.`  
- `LPCTSTR szUnits - Sets the overriding units in which to display the virtual parameter’s value`  
- `LPCTSTR szFormatOverride - Sets the overriding format in which to display the virtual parameter’s value`  
- `LPCTSTR szGroupPath - The path of the group in which to add the virtual parameter, e.g. \\TopLevelGroup\\SubGroup.`  
- `enumDataType eDataType - The data type.`  
- `double dwUpperWarningLimit - Upper warning limit value.`  
- `double dwLowerWarningLimit - Lower warning limit value.`  

### **RegisterEnhancedRowParameters**
**Description:** Add parameters from application to the enhanced speed row data list.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `const VARIANT FAR& aszIdentifiers - List of parameters to add to enhanced row data list.`  

### **RegisterCANEnhancedRowParameters**
**Description:** Add CAN parameters to the enhanced speed row data list.  
**Arguments:**  
- `const VARIANT FAR& aszIdentifiers - List of CAN paramteres to add to enhanced row data list.`  

### **RegisterVirtualEnhancedRowParameters**
**Description:** Add virtual parameters to the enhanced speed row data list.  
**Arguments:**  
- `All parameters referenced by each virtual will be added to the list.`  
- `const VARIANT FAR& aszIdentifiers - List of virtual parameters to add to enhanced row data list..`  

### **ClearEnhancedRowParameters**
**Description:** Clar all parameters for given application from enhanced speed slow row data list.  
**Arguments:**  
- `unsigned short wAppId - Application Id.`  
- `NULL (0x0000) to clear all Parameters.`  

### **ActivateEnhancedRowParameters**
**Description:** Activate current enhanced speed row data list.  
**Arguments:**  
- `None.`  

## Conversion Rules

### **GetConversions**
**Description:** Returns a list of all conversions and the types defined in the application.  
**Arguments:**  
- `unsigned short wAppId - Application Id. NULL - (0x0000) for Virtual and CAN conversions.`  
- `VARIANT* str1xIdentifiers - Safe Array of conversion identifiers.  `
- `VARIANT* str1xType - Safe Array of conversion types.  `

### **GetConversionType**
**Description:** Returns the type of the specified conversion rule.  
**Arguments:**  
- `BSTR pszConversionID - Conversion identifier.  `
- `BSTR* pszConversionType - Type of conversion.  `

### **GetConversionUse**
**Description:** Returns a list of all parameters using the specified conversion in the application.  
**Arguments:**  
- `unsigned short wAppId - Application Id. NULL - (0x0000) for all applications including Virtual and CAN.  `
- `BSTR pszConversionID - Conversion identifier.  `
- `VARIANT* str1xIdentifiers - Safe Array of parameter identifiers.  `

### **GetFormulaConv**
**Description:** Retrieves a selected Formula (Free) Conversion  
**Arguments:**  
- `BSTR pszConvId – Unique identifier of conversion.  `
- `BSTR * pszComment – Human readable description.  `
- `BSTR * pszFormat – Format string (e.g. “%1.3f”).  `
- `BSTR * pszUnits – Unit value for output.  `
- `BSTR * pszFormula – Formula value.  `
- `BSTR * pszInverse – Inverse value.  `

### **GetRationalConv**
**Description:** Retrieves a selected Rational Conversion  
**Arguments:**  
- `BSTR pszConvId – Unique identifier of conversion.  `
- `double * pdPar1 – Coefficient value 1.  `
- `double * pdPar2 – Coefficient value 2.  `
- `double * pdPar3 – Coefficient value 3.  `
- `double * pdPar4 – Coefficient value 4.  `
- `double * pdPar5 – Coefficient value 5.  `
- `double * pdPar6 – Coefficient value 6.  `
- `BSTR * pszComment – Human readable description.  `
- `BSTR * pszFormat – Format string (e.g. “%1.3f”).  `
- `BSTR * pszUnits – Unit value for output.  `
- `BSTR * pszDefault – Default value.  `

## Error Codes

| Code   | Description                                                                                                                                      |
|--------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| 0      | No error, function successful                                                                                                                    |
| -1     | No project loaded in SM-V7                                                                                                                      |
| -2     | No licence for requested function                                                                                                                |
| -3     | Non-specific error                                                                                                                              |
| -4     | Data version mismatch                                                                                                                           |
| -5     | No data version loaded                                                                                                                          |
| -6     | No program version loaded                                                                                                                       |
| -7     | No ECU connected                                                                                                                                |
| -8     | Invalid file specified                                                                                                                          |
| -9     | The open project does not cover the specified application                                                                                       |
| -10    | Application must be active in order to support this operation                                                                                   |
| -11    | Operation not allowed while live updates are on                                                                                                |
| -12    | This command only valid for TAGtronic systems.                                                                                                  |
| -13    | SM cannot accept API calls at the moment (might be in critical operation).                                                                      |
| Note   | The range -20 to -36 is reserved for errors in the variant arguments supplied to the SendMessage call.                                          |
| -20    | Type mismatch in argument of SendMessage, expected array of WORDs passed by reference                                                           |
| -21    | Array dimension mismatch in argument of SendMessage, expected a 1-dimensional array                                                             |
| -22    | Lower bound of argument of SendMessage call was not 0                                                                                           |
| -23    | Unexpected error getting bounds of SendMessage argument                                                                                          |
| -24    | Error in ReplyMessage argument                                                                                                                   |
| -25    | Error in SendMessage argument                                                                                                                    |
| -26    | Virtual Parameter contains invalid FDL.                                                                                                         |
| -27    | Conversion for Parameter does not exist/is invalid.                                                                                              |
| -28    | Parameter name does not exist/is invalid.                                                                                                        |
| -29    | Parameter exists and not allowed to override.                                                                                                    |
| -30    | Request cannot be actioned as incorrect SM state.                                                                                                |
| -31    | Command passed to SM is not valid.                                                                                                               |
| -32    | Missing document or similar                                                                                                                      |
| -33    | Memory allocation failed                                                                                                                         |
| -34    | Operation only partially complete. Example: ClearRemoteParams left Parameters used in trigger conditions.                                       |
| -35    | Indicates the current document (config) is full.                                                                                                 |
| -36    | Parameter Identifier already exists in another application.                                                                                      |
| -37    | Parameter is read-only - write access denied.                                                                                                    |
| -38    | Parameter is non-live tuneable - write access denied.                                                                                            |
| -39    | Requested group is not found                                                                                                                     |
| -40    | Previous virtual parameters file has been modified and not saved                                                                                 |
| -41    | No customer base found for the project being opened                                                                                              |
| -42    | Requested parameter not found                                                                                                                    |
| Note   | The range -100 to -199 is reserved for errors returned by parameter get/set value functions.                                                     |
| -100   | Specified parameter does not exist in current program version                                                                                    |
| -101   | Tried to set a read-only parameter                                                                                                                |
| -102   | Tried to set a parameter outside its limits                                                                                                       |
| -103   | Axis monotony restrictions not adhered to                                                                                                         |
| -104   | Tried to get or set parameter or axis value at invalid breakpoint                                                                                 |
| -105   | Parameter had invalid address                                                                                                                     |
| -106   | String containing non-numeric characters supplied to set function                                                                                 |
| -107   | Exceeded specified size or array or string parameter                                                                                              |
| -108   | Live tune enabled, failed to update value in ECU                                                                                                  |
| -109   | Tried to get interpolated value but no input quantity or axis points                                                                              |
| -110   | No active live autotune "layer" (group)                                                                                                           |
| -111   | Operating point is outside breakpoint tolerances (e.g. for live auto tune)                                                                        |
| -112   | Number of axis breakpoints has changed between program versions                                                                                    |
| -113   | Parameter is not modifiable in live tune area (warning only, not error)                                                                            |
| -114   | The attempt to validate the value in the unit failed (not the same as the value being invalid)                                                     |
| -116   | Serial number not found for sensor channel                                                                                                           |
| -117   | An unknown error                                                                                                                                      |
| -118   | Attempt to set value cancelled (by user or because of invalid input)                                                                                 |
| -119   | Access denied, parameter locked by RDA                                                                                                               |
| -120   | Value set does not match value in the unit                                                                                                            |
| -200   | Session detail does not exist                                                                                                                          |
| -201   | Failed to dump row data                                                                                                                                |
| -300   | Failed to enter live tune                                                                                                                              |
| -301   | Failed to go online                                                                                                                                     |
| -302   | Failed to download data                                                                                                                                  |
| -303   | System monitor is only running in OLE mode, hence can't perform requested action                                                                        |
| -304   | Attempt to access a locked parameter                                                                                                                      |
| Note   | The range -10000 to -1000 is reserved for System Monitor comms, internal CA-Card, Ethernet or ECU errors which may be returned by a SendMessage call. |
| -5096  | There is a communication problem that is unknown                                                                                                          |
| -5097  | General timeout during communications                                                                                                                     |
| -5098  | Link to ECU not OK                                                                                                                                         |
| -5099  | CA-Card code failed to load                                                                                                                                 |
| -5100  | Failed to open the CA-Card device driver                                                                                                                    |
| -5101  | Failed to close the CA_Card device driver                                                                                                                   |
| -5102  | DPC area is blank - CA-Card code is not running                                                                                                             |
| -5103  | DPR CaPc buffer is full - incoming messages have been lost                                                                                                   |
| -5104  | Driver Kernel buffer is full - incoming messages have been lost                                                                                              |
| -5105  | The driver has timed out waiting for some data                                                                                                               |
| -5106  | There is no card in the machine                                                                                                                              |
| -5107  | Receive buffer to DeviceIoControl is too small                                                                                                               |
| -5108  | The CA-Card code has been loaded but has crashed                                                                                                              |
| -5109  | IOCTL_CA125_CASEND not enough data returned                                                                                                                   |
| -5110  | IOCTL_CA125_CAREAD not enough data returned                                                                                                                   |
| -5111  | Attempt to send more data than the CA-Card said it can accept                                                                                                   |
| -5112  | The CA-Card has given more data than it said it would                                                                                                           |
| -5113  | Error response to MESSAGE_ID_SETUP_SESSION message                                                                                                              |
| -5114  | Error response to MESSAGE_ID_OPEN_SESSION message                                                                                                               |
| -5115  | Error response to MESSAGE_ID_CLOSE_SESSION message                                                                                                              |
| -5116  | Error response to MESSAGE_ID_SEND_SESSION message                                                                                                               |
| -5117  | Error response to MESSAGE_ID_RECEIVE_SESSION message                                                                                                            |
| -5121  | CA-Session in use                                                                                                                                                                                    |
| -5123  | Failed to resolve the address for the session                                                                                                                                                        |
| -5124  | User cancelled the operation                                                                                                                                                                          |
