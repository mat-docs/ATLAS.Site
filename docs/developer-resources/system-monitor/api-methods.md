# System Monitor API

## API Methods and Code Examples

#### ActivateEnhancedRowParameters
??? info "ActivateEnhancedRowParameters"
    - **Return Type:** `int32 scalar`
    - **Arguments:**
        - `SystemMonitorAPI.TSysMonApiClass this`

    === "C#"
        ```csharp

        ```

    === "Python"
        ```python

        ```


    === "MATLAB"
        ```matlab

        ```

    ???+ tip 
        Some text here

    ???+ warning 
        Some text here



#### AddApplication

??? info "AddApplication"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszDTVPath`

??? info "AddRemoteParam"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszParamId`
    - `int16 scalar wChannel`
    - `int16 scalar wValue`
    - `int16 scalar wValueType`

??? info "AddRemoteParamEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszParamId`
    - `int16 scalar wChannel`
    - `int32 scalar lValue`
    - `int16 scalar wValueType`

??? info "AddRemoteVirtualParam"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszParamId`
    - `int16 scalar wChannel`
    - `int16 scalar wValue`
    - `int16 scalar wValueType`

??? info "AddRemoteVirtualParamEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszParamId`
    - `int16 scalar wChannel`
    - `int32 scalar dwValue`
    - `int16 scalar wValueType`

??? info "AddVirtualParameterGroup"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szPath`
    - `System.String szName`
    - `System.String szDescription`
    - `logical scalar bParamsReadOnly`

??? info "BurstLoggingSave"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveCopyAs`
    - `System.String szFullPath`
    - `System.String szComment`
    - `System.String szNotes`

??? info "CANBuffersExport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `System.String pszFileName`

??? info "CANBuffersImport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `System.String pszFileName`

??? info "CANConfigLoadEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `System.String pszFileName`
    - `logical scalar bActivate`

??? info "CANConfigSave"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveCopyAs`
    - `System.String szFullPath`
    - `System.String szComment`
    - `System.String szNotes`

??? info "CANConfigUnload"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`

??? info "CANMessagesExport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `System.String pszFileName`

??? info "CANMessagesImport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `System.String pszFileName`
    - `logical scalar bMerge`

??? info "CanConfigLoad"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "ChangeSensorSerialNumber"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `int32 scalar dwSerialNumber`

??? info "ClearDataVersionNotes"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`

??? info "ClearEnhancedRowParameters"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`

??? info "ClearEvents"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "ClearRemoteParams"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `optional<logical scalar> bForceRemovalFromTriggers`

??? info "CloseProject"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "CloseProjectEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wAction`

??? info "CreateFFCFromPGV"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszPGV`

??? info "CreateNewCANConfig"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`
    - `logical scalar bSaveExisting`
    - `logical scalar bOverwrite`

??? info "CreateNewRemoteConfig"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`
    - `logical scalar bSaveExisting`
    - `logical scalar bOverwrite`

??? info "CreateNewVirtualParameters"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`
    - `logical scalar bSaveExisting`
    - `logical scalar bOverwrite`

??? info "CreatePGV"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szLocation`
    - `System.String szASAP2File`
    - `System.String szHexFile`
    - `System.String szControllersFile`
    - `System.String szErrorsFile`
    - `System.String szEventsFile`
    - `System.String szAdjustmentParametersFile`
    - `System.String szSensorsFile`
    - `System.String szSensorInjectorFile`
    - `System.String szSensorEnableFile`
    - `System.String szLiveAutoTuneFile`
    - `System.String szComment`
    - `System.String szNotes`

??? info "CreateProject"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szProject`
    - `System.Object aszApps`
    - `System.String szDesktop`
    - `System.String szVirtuals`
    - `System.String szCAN`
    - `System.String szRemoteConfig`

??? info "DataVersionOpen"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szFullPath`

??? info "DataVersionSave"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szFullPath`
    - `System.String szComments`
    - `System.String szNotes`

??? info "DataVersionSaveCopyAs"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szFullPath`
    - `System.String szComments`
    - `System.String szNotes`

??? info "DataVersionSaveCopyAsEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szFullPath`
    - `System.String szComments`
    - `System.String szNotes`
    - `System.String szConsortium`

??? info "DataVersionSaveIncrement"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wAppId`
    - `System.String szComments`
    - `System.String szNotes`

??? info "DeleteErrors"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "DeleteMinMax"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "DesktopLoad"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "DesktopSave"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveCopyAs`
    - `System.String szFullPath`
    - `System.String szComment`
    - `System.String szNotes`

??? info "DesktopSaveEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveCopyAs`
    - `System.String szFullPath`
    - `System.String szComment`
    - `System.String szNotes`
    - `System.String szConsortium`

??? info "DownloadBurst"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "DownloadDataChanges"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`

??? info "DownloadExternalInputs"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "DownloadRemote"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "DumpErrors"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "DumpEvents"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "DumpRowData"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "EnableDataVersionBackup"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bEnable`

??? info "Equals"
    **Return Type:** `logical scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.Object obj`

??? info "Equals"
    **Return Type:** `logical scalar`
    **Arguments:**
    - `System.Object objA`
    - `System.Object objB`

??? info "ExportInputSignals"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "ExportProject"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveModified`

??? info "ExportToHexFile"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`

??? info "ForceReprogram"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.Object awAppIds`

??? info "GeneratePULFile"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wAppId`
    - `System.Object aszIdentifiers`
    - `System.String pszPULFile`

??? info "GenerateParamSet"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.Object aszIdentifiers`
    - `System.String pszFile`

??? info "GetHashCode"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "ActivateEnhancedRowParameters"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "AddApplication"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszDTVPath`

??? info "AddRemoteParam"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszParamId`
    - `int16 scalar wChannel`
    - `int16 scalar wValue`
    - `int16 scalar wValueType`

??? info "AddRemoteParamEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszParamId`
    - `int16 scalar wChannel`
    - `int32 scalar lValue`
    - `int16 scalar wValueType`

??? info "AddRemoteVirtualParam"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszParamId`
    - `int16 scalar wChannel`
    - `int16 scalar wValue`
    - `int16 scalar wValueType`

??? info "AddRemoteVirtualParamEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszParamId`
    - `int16 scalar wChannel`
    - `int32 scalar dwValue`
    - `int16 scalar wValueType`

??? info "AddVirtualParameterGroup"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szPath`
    - `System.String szName`
    - `System.String szDescription`
    - `logical scalar bParamsReadOnly`

??? info "BurstLoggingSave"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveCopyAs`
    - `System.String szFullPath`
    - `System.String szComment`
    - `System.String szNotes`

??? info "CANBuffersExport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `System.String pszFileName`

??? info "CANBuffersImport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `System.String pszFileName`

??? info "CANConfigLoadEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `System.String pszFileName`
    - `logical scalar bActivate`

??? info "CANConfigSave"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveCopyAs`
    - `System.String szFullPath`
    - `System.String szComment`
    - `System.String szNotes`

??? info "CANConfigUnload"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`

??? info "CANMessagesExport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `System.String pszFileName`

??? info "CANMessagesImport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `System.String pszFileName`
    - `logical scalar bMerge`

??? info "CanConfigLoad"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "ChangeSensorSerialNumber"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `int32 scalar dwSerialNumber`

??? info "ClearDataVersionNotes"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`

??? info "ClearEnhancedRowParameters"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`

??? info "ClearEvents"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "ClearRemoteParams"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `optional<logical scalar> bForceRemovalFromTriggers`

??? info "CloseProject"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "CloseProjectEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wAction`

??? info "CreateFFCFromPGV"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszPGV`

??? info "CreateNewCANConfig"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`
    - `logical scalar bSaveExisting`
    - `logical scalar bOverwrite`

??? info "CreateNewRemoteConfig"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`
    - `logical scalar bSaveExisting`
    - `logical scalar bOverwrite`

??? info "CreateNewVirtualParameters"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`
    - `logical scalar bSaveExisting`
    - `logical scalar bOverwrite`

??? info "CreateProject"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szProject`
    - `System.Object aszApps`
    - `System.String szDesktop`
    - `System.String szVirtuals`
    - `System.String szCAN`
    - `System.String szRemoteConfig`

??? info "DataVersionOpen"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szFullPath`

??? info "DataVersionSave"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szFullPath`
    - `System.String szComments`
    - `System.String szNotes`

??? info "DataVersionSaveCopyAs"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szFullPath`
    - `System.String szComments`
    - `System.String szNotes`

??? info "DataVersionSaveCopyAsEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szFullPath`
    - `System.String szComments`
    - `System.String szNotes`
    - `System.String szConsortium`

??? info "DataVersionSaveIncrement"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wAppId`
    - `System.String szComments`
    - `System.String szNotes`

??? info "DeleteErrors"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "DeleteMinMax"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "DesktopLoad"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "DesktopSave"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveCopyAs`
    - `System.String szFullPath`
    - `System.String szComment`
    - `System.String szNotes`

??? info "DesktopSaveEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveCopyAs`
    - `System.String szFullPath`
    - `System.String szComment`
    - `System.String szNotes`
    - `System.String szConsortium`

??? info "DownloadBurst"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "DownloadDataChanges"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`

??? info "DownloadExternalInputs"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "DownloadRemote"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "DumpErrors"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "DumpEvents"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "DumpRowData"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "EnableDataVersionBackup"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bEnable`

??? info "ExportInputSignals"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "ExportProject"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveModified`

??? info "ExportToHexFile"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`

??? info "ForceReprogram"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.Object awAppIds`

??? info "GeneratePULFile"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wAppId`
    - `System.Object aszIdentifiers`
    - `System.String pszPULFile`

??? info "GenerateParamSet"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.Object aszIdentifiers`
    - `System.String pszFile`

??? info "ImportInputSignals"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "ImportProject"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`
    - `System.String szBase`

??? info "MatLabMExport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szFullPath`
    - `logical scalar bDataOnly`

??? info "MatLabMExportEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szFullPath`
    - `logical scalar bDataOnly`
    - `uint32 scalar dwType`

??? info "MatLabMExportForDTV"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szDTV`
    - `System.String szExport`
    - `logical scalar bDataOnly`
    - `uint32 scalar dwType`

??? info "MatlabExportSelected"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szFullPath`
    - `logical scalar bDataOnly`
    - `System.Object rSelectedParams`

??? info "MatlabImport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "OpenProject"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "RegenerateInputSignalParameters"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "RegisterCANEnhancedRowParameters"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.Object aszIdentifiers`

??? info "RegisterEnhancedRowParameters"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.Object aszIdentifiers`

??? info "RegisterVirtualEnhancedRowParameters"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.Object aszIdentifiers`

??? info "RemoteLoggingLoad"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "RemoteLoggingLoadEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `System.String pszFileName`
    - `logical scalar bActivate`

??? info "RemoteLoggingSave"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveCopyAs`
    - `System.String szFullPath`
    - `System.String szComment`
    - `System.String szNotes`

??? info "RemoteLoggingSaveEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveCopyAs`
    - `System.String szFullPath`
    - `System.String szComment`
    - `System.String szNotes`
    - `System.String szConsortium`

??? info "RemoteLoggingUnload"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`

??? info "RemoveAllConversions"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "RemoveAllVirtualParameters"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "RemoveAllVirtualParametersFromGroup"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String Path`

??? info "RemoveApplication"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wAppId`

??? info "RemoveConversion"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszConvId`

??? info "RemoveRemoteParam"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszParamId`

??? info "RemoveVirtualParameter"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String rszParamId`

??? info "RemoveVirtualParameterGroup"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szPath`

??? info "Reprogram"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`

??? info "ReprogramEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.Object awAppIds`

??? info "SaveProject"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveAll`

??? info "SaveProjectAs"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szNewName`
    - `logical scalar bSaveAll`
    - `System.String szComment`
    - `System.String szNotes`

??? info "SelectCar"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wCar`

??? info "SetActiveApp"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wResult`

??? info "SetActiveAppEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.Object awAppIds`

??? info "SetActiveCANConfig"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `logical scalar bActivate`

??? info "SetActiveRemoteLogging"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `logical scalar bActivate`

??? info "SetAppPULFile"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wAppId`
    - `System.String szFileName`

??? info "SetBatchMode"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bEnter`

??? info "SetBurstSessionDetail"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szName`
    - `System.String szValue`

??? info "SetCarByIndex"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `logical scalar bPrimaryCar`

??? info "SetDataVersionNotes"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szNotes`

??? info "SetExternalInputGainOffset"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszIdentifier`
    - `double scalar dGain`
    - `double scalar dOffset`

??? info "SetFIACANConfig"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`

??? info "SetFIACANConfigEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `logical scalar bActive`

??? info "SetFormulaConv"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszConvId`
    - `System.String szComment`
    - `System.String szFormat`
    - `System.String szUnits`
    - `System.String szFormula`
    - `System.String szInverse`
    - `logical scalar bOverwriteFlag`

??? info "SetLiveLogging"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bState`

??? info "SetLiveUpdatesEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bState`
    - `uint16 scalar wAction`

??? info "SetLiveupdates"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bState`

??? info "SetMultiApplicationBase"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szName`

??? info "SetOnline"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bState`

??? info "SetParameterWarningLimits"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wAppId`
    - `System.String pszIdentifier`
    - `double scalar dLow`
    - `double scalar dHigh`

??? info "SetRationalConv"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszConvId`
    - `double scalar dP1`
    - `double scalar dP2`
    - `double scalar dP3`
    - `double scalar dP4`
    - `double scalar dP5`
    - `double scalar dP6`
    - `System.String pszComment`
    - `System.String pszFormat`
    - `System.String pszUnits`
    - `System.String pszDefault`
    - `logical scalar bOverwriteFlag`

??? info "SetRemoteChannelProperties"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wChannel`
    - `System.String strChannelName`
    - `logical scalar bLogToUnit`
    - `logical scalar bTelemetry`
    - `logical scalar bTriggerRearmsAfterStopped`

??? info "SetRemoteOffset"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wOffset`

??? info "SetRemoteSessionDetail"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szName`
    - `System.String szValue`

??? info "SetRemoteTrigger"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wChannel`
    - `int32 scalar nStartPostTriggerMs`
    - `int32 scalar nStopPostTriggerMs`

??? info "SetRemoteTriggerCondition"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wChannel`
    - `int32 scalar nTriggerIndex`
    - `int16 scalar nTriggerType`
    - `System.String pszParamName`
    - `int16 scalar wParamAppId`
    - `int16 scalar nTriggerCondition`
    - `double scalar fTriggerThreshold`
    - `int32 scalar nTriggerCount`

??? info "SetRemoteWrap"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bWrap`

??? info "SetStringValue1AxisMap"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetStringValue2AxisMap"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetStringValueArray"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetStringValueAxis"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetStringValueScalar"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.String pszValue`

??? info "SetTableConv"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszConvId`
    - `System.String pszComment`
    - `System.String pszFormat`
    - `System.String pszUnits`
    - `System.String pszDefault`
    - `logical scalar bInterpolate`
    - `System.Object afRawValues`
    - `System.Object afMappedValues`
    - `logical scalar bOverwriteFlag`

??? info "SetTextConv"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszConversionId`
    - `System.String pszFormat`
    - `System.String pszUnits`
    - `System.String pszDefault`
    - `System.Object afRawInput`
    - `System.Object astrTextMapping`

??? info "SetTextConvEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszConversionId`
    - `System.String pszFormat`
    - `System.String pszUnits`
    - `System.String pszDefault`
    - `System.Object afRawInput`
    - `System.Object astrTextMapping`
    - `logical scalar bOverwriteExisting`

??? info "SetValue1AxisMap"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetValue2AxisMap"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetValueArray"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetValueAxis"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetValueOffset"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szIdentifier`
    - `double scalar dOffset`

??? info "SetValueScalar"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `double scalar pdValue`

??? info "SetValueString"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.String pszValue`

??? info "SetVirtualParameter"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String rszParamId`
    - `System.String rszName`
    - `System.String rszDescription`
    - `double scalar dwMaxDisplay`
    - `double scalar dwMinDisplay`
    - `int32 scalar nMinLoggingRate`
    - `int32 scalar nScalingFactor`
    - `logical scalar bIsMinNotDef`
    - `System.String rszExpression`
    - `System.String rszConvId`
    - `logical scalar bOverwrite`

??? info "SetVirtualParameterDataType"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszParamId`
    - `SystemMonitorAPI.enumDataType eDataType`

??? info "SetVirtualParameterEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String rszParamId`
    - `System.String rszName`
    - `System.String rszDescription`
    - `double scalar dwMaxDisplay`
    - `double scalar dwMinDisplay`
    - `int32 scalar nMinLoggingRate`
    - `int32 scalar nScalingFactor`
    - `logical scalar bIsMinNotDef`
    - `System.String rszExpression`
    - `System.String rszConvId`
    - `logical scalar bOverwrite`
    - `System.String szUnits`
    - `System.String szFormatOverride`

??? info "SetVirtualParameterExtended"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String rszParamId`
    - `System.String rszName`
    - `System.String rszDescription`
    - `double scalar dwMaxDisplay`
    - `double scalar dwMinDisplay`
    - `int32 scalar nMinLoggingRate`
    - `int32 scalar nScalingFactor`
    - `logical scalar bIsMinNotDef`
    - `System.String rszExpression`
    - `System.String rszConvId`
    - `logical scalar bOverwrite`
    - `System.String szUnits`
    - `System.String szFormatOverride`
    - `System.String szGroupPath`
    - `SystemMonitorAPI.enumDataType eDataType`
    - `double scalar dwUpperWarningLimit`
    - `double scalar dwLowerWarningLimit`

??? info "SetVirtualParameterToGroup"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String rszParamId`
    - `System.String rszName`
    - `System.String rszDescription`
    - `double scalar dwMaxDisplay`
    - `double scalar dwMinDisplay`
    - `int32 scalar nMinLoggingRate`
    - `int32 scalar nScalingFactor`
    - `logical scalar bIsMinNotDef`
    - `System.String rszExpression`
    - `System.String rszConvId`
    - `logical scalar bOverwrite`
    - `System.String szUnits`
    - `System.String szFormatOverride`
    - `System.String szGroupPath`

??? info "SetVirtualParameterToGroupWithDataType"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String rszParamId`
    - `System.String rszName`
    - `System.String rszDescription`
    - `double scalar dwMaxDisplay`
    - `double scalar dwMinDisplay`
    - `int32 scalar nMinLoggingRate`
    - `int32 scalar nScalingFactor`
    - `logical scalar bIsMinNotDef`
    - `System.String rszExpression`
    - `System.String rszConvId`
    - `logical scalar bOverwrite`
    - `System.String szUnits`
    - `System.String szFormatOverride`
    - `System.String szGroupPath`
    - `SystemMonitorAPI.enumDataType eDataType`

??? info "UndoDataChanges"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wType`

??? info "UploadBurst"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "UploadDataVersion"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`

??? info "UploadRemote"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "VirtualParametersExport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szName`
    - `System.String szGroup`

??? info "VirtualParametersImport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szName`

??? info "VirtualParametersLoad"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "VirtualParametersLoadNoSave"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "VirtualParametersSave"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveCopyAs`
    - `System.String szFullPath`
    - `System.String szComment`
    - `System.String szNotes`

??? info "ZeroLiveValue"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szIdentifier`

??? info "ImportInputSignals"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "ImportProject"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`
    - `System.String szBase`

??? info "MatLabMExport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szFullPath`
    - `logical scalar bDataOnly`

??? info "MatLabMExportEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szFullPath`
    - `logical scalar bDataOnly`
    - `uint32 scalar dwType`

??? info "MatLabMExportForDTV"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szDTV`
    - `System.String szExport`
    - `logical scalar bDataOnly`
    - `uint32 scalar dwType`

??? info "MatlabExportSelected"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szFullPath`
    - `logical scalar bDataOnly`
    - `System.Object rSelectedParams`

??? info "MatlabImport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "OpenProject"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "ReferenceEquals"
    **Return Type:** `logical scalar`
    **Arguments:**
    - `System.Object objA`
    - `System.Object objB`

??? info "RegenerateInputSignalParameters"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "RegisterCANEnhancedRowParameters"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.Object aszIdentifiers`

??? info "RegisterEnhancedRowParameters"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.Object aszIdentifiers`

??? info "RegisterVirtualEnhancedRowParameters"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.Object aszIdentifiers`

??? info "RemoteLoggingLoad"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "RemoteLoggingLoadEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `System.String pszFileName`
    - `logical scalar bActivate`

??? info "RemoteLoggingSave"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveCopyAs`
    - `System.String szFullPath`
    - `System.String szComment`
    - `System.String szNotes`

??? info "RemoteLoggingSaveEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveCopyAs`
    - `System.String szFullPath`
    - `System.String szComment`
    - `System.String szNotes`
    - `System.String szConsortium`

??? info "RemoteLoggingUnload"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`

??? info "RemoveAllConversions"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "RemoveAllVirtualParameters"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "RemoveAllVirtualParametersFromGroup"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szPath`

??? info "RemoveApplication"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wAppId`

??? info "RemoveConversion"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszConvId`

??? info "RemoveRemoteParam"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszParamId`

??? info "RemoveVirtualParameter"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String rszParamId`

??? info "RemoveVirtualParameterGroup"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szPath`

??? info "Reprogram"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`

??? info "ReprogramEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.Object awAppIds`

??? info "RestoreValue"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wAppId`
    - `System.String szIdentifier`

??? info "RestoreValue"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szIdentifier`

??? info "SaveProject"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveAll`

??? info "SaveProjectAs"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szNewName`
    - `logical scalar bSaveAll`
    - `System.String szComment`
    - `System.String szNotes`

??? info "SelectCar"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wCar`

??? info "SetActiveApp"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wResult`

??? info "SetActiveAppEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.Object awAppIds`

??? info "SetActiveCANConfig"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `logical scalar bActivate`

??? info "SetActiveRemoteLogging"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `logical scalar bActivate`

??? info "SetAppPULFile"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wAppId`
    - `System.String szFileName`

??? info "SetBatchMode"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bEnter`

??? info "SetBurstSessionDetail"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szName`
    - `System.String szValue`

??? info "SetCarByIndex"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `logical scalar bPrimaryCar`

??? info "SetDataVersionComment"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szComment`

??? info "SetDataVersionComment"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wAppId`
    - `System.String szComment`

??? info "SetDataVersionNotes"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szNotes`

??? info "SetExternalInputGainOffset"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszIdentifier`
    - `double scalar dGain`
    - `double scalar dOffset`

??? info "SetFIACANConfig"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`

??? info "SetFIACANConfigEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wIndex`
    - `logical scalar bActive`

??? info "SetFormulaConv"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszConvId`
    - `System.String szComment`
    - `System.String szFormat`
    - `System.String szUnits`
    - `System.String szFormula`
    - `System.String szInverse`
    - `logical scalar bOverwriteFlag`

??? info "SetLiveLogging"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bState`

??? info "SetLiveUpdatesEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bState`
    - `uint16 scalar wAction`

??? info "SetLiveupdates"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bState`

??? info "SetMultiApplicationBase"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szBase`

??? info "SetOnline"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bState`

??? info "SetParameterWarningLimits"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wAppId`
    - `System.String pszIdentifier`
    - `double scalar dLow`
    - `double scalar dHigh`

??? info "SetRationalConv"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszConvId`
    - `double scalar dP1`
    - `double scalar dP2`
    - `double scalar dP3`
    - `double scalar dP4`
    - `double scalar dP5`
    - `double scalar dP6`
    - `System.String pszComment`
    - `System.String pszFormat`
    - `System.String pszUnits`
    - `System.String pszDefault`
    - `logical scalar bOverwriteFlag`

??? info "SetRemoteChannelProperties"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wChannel`
    - `System.String strChannelName`
    - `logical scalar bLogToUnit`
    - `logical scalar bTelemetry`
    - `logical scalar bTriggerRearmsAfterStopped`

??? info "SetRemoteOffset"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `uint16 scalar wOffset`

??? info "SetRemoteSessionDetail"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szName`
    - `System.String szValue`

??? info "SetRemoteTrigger"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wChannel`
    - `int32 scalar nStartPostTriggerMs`
    - `int32 scalar nStopPostTriggerMs`

??? info "SetRemoteTriggerCondition"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wChannel`
    - `int32 scalar nTriggerIndex`
    - `int16 scalar nTriggerType`
    - `System.String pszParamName`
    - `int16 scalar wParamAppId`
    - `int16 scalar nTriggerCondition`
    - `double scalar fTriggerThreshold`
    - `int32 scalar nTriggerCount`

??? info "SetRemoteWrap"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bWrap`

??? info "SetStringValue1AxisMap"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetStringValue2AxisMap"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetStringValueArray"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetStringValueAxis"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetStringValueScalar"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.String pszValue`

??? info "SetTableConv"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszConvId`
    - `System.String pszComment`
    - `System.String pszFormat`
    - `System.String pszUnits`
    - `System.String pszDefault`
    - `logical scalar bInterpolate`
    - `System.Object anRawValues`
    - `System.Object afMappedValues`
    - `logical scalar bOverwriteFlag`

??? info "SetTextConv"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszConversionId`
    - `System.String pszFormat`
    - `System.String pszUnits`
    - `System.String pszDefault`
    - `System.Object afRawInput`
    - `System.Object astrTextMapping`

??? info "SetTextConvEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszConversionId`
    - `System.String pszFormat`
    - `System.String pszUnits`
    - `System.String pszDefault`
    - `System.Object afRawInput`
    - `System.Object astrTextMapping`
    - `logical scalar bOverwriteExisting`

??? info "SetValue1AxisMap"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetValue2AxisMap"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetValueArray"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetValueAxis"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.Object rValue`

??? info "SetValueOffset"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szIdentifier`
    - `double scalar dOffset`

??? info "SetValueScalar"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `double scalar pdValue`

??? info "SetValueString"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String pszIdentifier`
    - `System.String pszValue`

??? info "SetVirtualParameter"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String rszParamId`
    - `System.String rszName`
    - `System.String rszDescription`
    - `double scalar dwMaxDisplay`
    - `double scalar dwMinDisplay`
    - `int32 scalar nMinLoggingRate`
    - `int32 scalar nScalingFactor`
    - `logical scalar bIsMinNotDef`
    - `System.String rszExpression`
    - `System.String rszConvId`
    - `logical scalar bOverwrite`

??? info "SetVirtualParameterDataType"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String pszParamId`
    - `SystemMonitorAPI.enumDataType eDataType`

??? info "SetVirtualParameterEx"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String rszParamId`
    - `System.String rszName`
    - `System.String rszDescription`
    - `double scalar dwMaxDisplay`
    - `double scalar dwMinDisplay`
    - `int32 scalar nMinLoggingRate`
    - `int32 scalar nScalingFactor`
    - `logical scalar bIsMinNotDef`
    - `System.String rszExpression`
    - `System.String rszConvId`
    - `logical scalar bOverwrite`
    - `System.String szUnits`
    - `System.String szFormatOverride`

??? info "SetVirtualParameterExtended"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String rszParamId`
    - `System.String rszName`
    - `System.String rszDescription`
    - `double scalar dwMaxDisplay`
    - `double scalar dwMinDisplay`
    - `int32 scalar nMinLoggingRate`
    - `int32 scalar nScalingFactor`
    - `logical scalar bIsMinNotDef`
    - `System.String rszExpression`
    - `System.String rszConvId`
    - `logical scalar bOverwrite`
    - `System.String szUnits`
    - `System.String szFormatOverride`
    - `System.String szGroupPath`
    - `SystemMonitorAPI.enumDataType eDataType`
    - `double scalar dwUpperWarningLimit`
    - `double scalar dwLowerWarningLimit`

??? info "SetVirtualParameterToGroup"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String rszParamId`
    - `System.String rszName`
    - `System.String rszDescription`
    - `double scalar dwMaxDisplay`
    - `double scalar dwMinDisplay`
    - `int32 scalar nMinLoggingRate`
    - `int32 scalar nScalingFactor`
    - `logical scalar bIsMinNotDef`
    - `System.String rszExpression`
    - `System.String rszConvId`
    - `logical scalar bOverwrite`
    - `System.String szUnits`
    - `System.String szFormatOverride`
    - `System.String szGroupPath`

??? info "SetVirtualParameterToGroupWithDataType"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String rszParamId`
    - `System.String rszName`
    - `System.String rszDescription`
    - `double scalar dwMaxDisplay`
    - `double scalar dwMinDisplay`
    - `int32 scalar nMinLoggingRate`
    - `int32 scalar nScalingFactor`
    - `logical scalar bIsMinNotDef`
    - `System.String rszExpression`
    - `System.String rszConvId`
    - `logical scalar bOverwrite`
    - `System.String szUnits`
    - `System.String szFormatOverride`
    - `System.String szGroupPath`
    - `SystemMonitorAPI.enumDataType eDataType`

??? info "UndoDataChanges"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wType`

??? info "UploadBurst"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`

??? info "UploadDataVersion"
    - **Return Type:** `int32 scalar`
    - **Arguments:**
        - `SystemMonitorAPI.TSysMonApiClass this`
        - `int16 scalar wAppId`

??? info "UploadRemote"
    - **Return Type:** `int32 scalar`
    - **Arguments:**
        - `SystemMonitorAPI.TSysMonApiClass this`

??? info "VirtualParametersExport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szName`
    - `System.String szGroup`

??? info "VirtualParametersImport"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szName`

??? info "VirtualParametersLoad"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "VirtualParametersLoadNoSave"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `System.String szFullPath`

??? info "VirtualParametersSave"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `logical scalar bSaveCopyAs`
    - `System.String szFullPath`
    - `System.String szComment`
    - `System.String szNotes`

??? info "ZeroLiveValue"
    **Return Type:** `int32 scalar`
    **Arguments:**
    - `SystemMonitorAPI.TSysMonApiClass this`
    - `int16 scalar wAppId`
    - `System.String szIdentifier`
