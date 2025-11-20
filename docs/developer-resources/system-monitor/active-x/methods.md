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

## Data Acquisition

## Parameters

### CANBuffersExport

**Description:** Exports the CAN Buffer configuration csv from the given CAN Bus index.
**Arguments:**
- short wIndex - Bus Index.
- BSTR pszFilename - Name and path of .csv to create.
 

### CANBuffersImport

**Description:** Imports the CAN Buffer configuration csv into the given CAN Bus index.
**Arguments:**
- short wIndex - Bus Index.
- BSTR pszFilename - Name and path of .csv to import.
 

### CANMessagesExport

**Description:** Exports the CAN Message configuration csv from the given CAN Bus index.
**Arguments:**
- short wIndex - Bus Index.
- BSTR pszFilename - Name and path of .csv to create.

### CANMessagesImport

**Description:** Imports the CAN Message configuration csv into the given CAN Bus index.
**Arguments:**
- short wIndex - Bus Index.
- BSTR pszFilename - Name and path of .csv.
- bool bMerge - Merge with existing messages.

### GetCANParameter

**Description:** Retrieve a selected CAN Parameter.
**Arguments:**
-BSTR rszParamId - The unique identifier of the CAN Parameter to receive.
- BSTR *rszName - Receives the display name of the parameter.
- BSTR *rszDescription - Receives the description of the parameter.
- double * pdwMaxDisplay - Receives the maximum value.
- double * pdwMinDisplay - Receives the minimum value.
- int * pnMinLoggingRate - Receives the minimum logging rate.
- int * pnScalingFactor - Receives the scalling factor (see EScalingUnit).
- boolean * pbIsMinNotDef - Receives state of min/max values.
- BSTR * rszConvId - Receives the unique identifier of the conversion rule used in this parameter.
- boolean * pbIsRx - Receives a flag to indicate Rx / Tx status of the parameter.

### GetCANParameterBatch

**Description:** Retrieve CAN parameter details for the given list of parameters.
**Arguments:**
- VARIANT aszIdentifiers – Array (string) of CAN parameter identifiers.
- VARIANT* azNames -  Array of parameter display names.
- VARIANT* astrDescriptions - Array of parameter descriptions.
- VARIANT* adMaxDisplays - Array of parameter maximum values ( doubles ).
- VARIANT* adMinDisplays - Array of parameter minimum values ( doubles ).
- VARIANT* adwMinLoggingRates - Array of parameter minimum logging rates ( unsigned integers ).
- VARIANT* awScalingFactor - Array of parameter scaling factors ( unsigned shorts, see EScalingUnit ).
- VARIANT* abIsMinNotDefs - Array of parameter state of min/max values ( boolean ).
- VARIANT* astrConvId - Array of parameter unique identifiers of the conversion rules.
- VARIANT* pbIsRxs - Array of parameter flags to indicate Rx / Tx status ( boolean ).
- VARIANT* aszDataTypes - Array of parameter data types.
- VARIANT* pszCANBus - Array of parameter CAN Bus names.
- VARIANT* pszCANMsg - Array of parameter CAN Message names.
- VARIANT* pwStartBit - Array of CAN parameter start bits ( unsigned integers ).
- VARIANT* pwBitLength - Array of CAN parameter bit lengths ( unsogned integers ).
- VARIANT* pdGain - Array of CAN parameter gain values (doubles ).
- VARIANT* pdOffset - Array of CAN parameter offset values (doubles ).
- VARIANT* pwByteOrder - Array of CAN parameter byte orders (unsigned shorts ).
- VARIANT* pszMuxId -  Array of CAN parameter multiplexer ids. Blank if parameter is not in a multiplexed message..
- VARIANT* palErrorCodes - Array of error codes ( integers ).

### GetCANParameterEx

**Description:** Retrieve a selected CAN Parameter.
**Arguments:**
- BSTR szParamId - The unique identifier of the CAN Parameter to receive.
- BSTR* pszName - Receives the display name of the parameter.
- BSTR* pszDescription - Receives the description of the parameter.
- double* pdwMaxDisplay - Receives the maximum value.
- double* pdwMinDisplay - Receives the minimum value.
- unsigned int* pdwMinLoggingRate - Receives the minimum logging rate.
- unsigned short* pwScalingFactor - Receives the scalling factor (see EScalingUnit).
- boolean* pbIsMinNotDef - Receives state of min/max values.
- BSTR* pszConvId - Receives the unique identifier of the conversion rule used in this parameter.
- boolean* pbIsRx - Receives a flag to indicate Rx / Tx status of the parameter.
- BSTR* pszDataType - Receives the data type of the parameter.
- BSTR* pszCANBus - Receives the CAN Bus name containing the parameter.
- BSTR* pszCANMsg - Receives the CAN Message name containing the parameter.
- unsigned short* pwStartBit - Receives the start bit of the parameter within the message.
- unsigned short* pwBitLength - Receives the bit length of the CAN parameter.
- double* pdGain - Receives the gain of the CAN parameter.
- double* pdOffset - Receives the offset of the CAN parameter.
- unsigned short* pwByteOrder - Receives the byte order  of the CAN parameter.
- BSTR* pszMuxId -  Receives the multiplexer id of the CAN parameter. Blank if parameter is not in a multiplexed message..

### GetCANParameterList

**Description:** Return a list of identifiers for all CAN parameters.
**Arguments:**
- VARIANT FAR* paParams - Variant array of parameter identifiers.
 

### GetCANParameterListEx

**Description:** Return a list of CAN Parameter identifiers, names and count in the current project.
**Arguments:**
- paParameterIds
- paParameterNames
- pnParameterCount As Long

### GetValueCAN

**Description:** Retrieves the value of the specified can parameter.
**Arguments:**
- BSTR szIdentifier - Parameter identifier.
- double FAR* pdResult - Value of the CAN parameter.

### RegenerateInputSignalParameters

**Description:** Regenerate Input Signal parameters from RAW values.
**Arguments:**
- None.

### ChangeSensorSerialNumber

**Description:** Changes the serial number of the specified sensor.
**Arguments:**
- unsigned short wAppId - Application Id.
- BSTR pszIdentifier - Sensor identifier.
- LONG dwSerialNumber - Serial number.
 
### GetAppsHoldingControlParameter

**Description:** Returns the application(s) which contain the specified non measurement parameter.
**Arguments:**
- BSTR szParamIdent - Parameter identifier.
- VARIANT FAR * pawAppIds - Applications containing the specified parameter.
 
### GetAppsHoldingMeasurementParameterMeasurementParameter

**Description:** Returns the application(s) which contain the specified measurement parameter.
**Arguments:**
- BSTR szParamIdent - Parameter identifier.
- VARIANT FAR * pawAppIds - Applications containing the specified parameter.
 
### GetAppsHoldingParam

**Description:** Returns the application(s) which contain the specified parameter.
**Arguments:**
- BSTR szParamIdent - Parameter identifier.
- short* pwAppsMask - Applications containing the specified parameter.
 
### GetAppsHoldingParamEx

**Description:** Returns the application(s) which contain the specified parameter.
**Arguments:**
- BSTR szParamIdent - Parameter identifier.
- VARIANT FAR * pawAppIds - Applications containing the specified parameter.
 

### GetAxisAddress

**Description:** Retrieves the address of the parameter.
**Arguments:**
- short wAppId - Application Id.
- LPCTSTR pszIdentifier - Parameter identifier.
- long* plAddress - Address returned

### GetAxisParameterFromMap

**Description:** Retrieves a list of axis parameter(s) used by the map parameter in the application.
**Arguments:**
- short wAppId - Application Id.
- LPCTSTR pszIdentifier - Map parameter identifier.
- VARIANT* str1xParameters - Safe Array of axis parameter(s) used by the map parameter.
 

### GetDTVValue1AxisMap

**Description:** Returns the values of a specified 1-axis map (CURVE) editable parameter at all axis points from the supplied DTV.
**Arguments:**
- BSTR szIdentifier - Parameter identifier.
- BSTR szDTV- Filename and full path of the DTV to retrieve value from.
- VARIANT* Value - 1-d array of doubles holding current values.
 
### GetDTVValue1AxisMapBatch

**Description:** Returns a list of values from a specified list of  1-axis maps (CURVE) editable parameters at all axis points from the supplied DTV.
**Arguments:**
- VARIANT aszIdentifiers - List of parameter identifiers.
- BSTR szDTV- Filename and full path of the DTV to retrieve value from.
- VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                 Note: The first value in each list contains the number of values in the list.
 

### GetDTVValue2AxisMap

**Description:** Returns the values of a specified 2-axis map (MAP) editable parameter at all axis points from the supplied DTV.
**Arguments:**
- BSTR szIdentifier - Parameter identifier.
- BSTR szDTV- Filename and full path of the DTV to retrieve value from.
- VARIANT* Value - 2-d array of doubles holding current values.
 

### GetDTVValue2AxisMapBatch

**Description:** Returns a list of values from a specified list of  2-axis maps (MAP) editable parameters at all axis points from the supplied DTV.
**Arguments:**
- VARIANT aszIdentifiers - List of parameter identifiers.
- BSTR szDTV- Filename and full path of the DTV to retrieve value from.
- VARIANT* Value - 2-d array of doubles holding current values.
- VARIANT* pafValues - 3-d array of doubles holding lists of parameters arrays.
                                Note: The first value in each row and column contains the number of values in the list.
 

### GetDTVValueArray

**Description:** Returns the values of a specified array (VAL_BLK) editable (characteristic) parameter at all index positions from the supplied DTV.
**Arguments:**
- BSTR szIdentifier - Parameter identifier.
- BSTR szDTV- Filename and full path of the DTV to retrieve value from.
- VARIANT* Value - 1-d array of doubles holding current values.

### GetDTVValueArrayBatch

**Description:** Returns a list of values from a specified list of arrays (VAL_BLK) editable parameters at all index positions from the supplied DTV.
**Arguments:**
- VARIANT aszIdentifiers - List of parameter identifiers.
- BSTR szDTV- Filename and full path of the DTV to retrieve value from.
- VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                 Note: The first value in each list contains the number of values in the list.
 

### GetDTVValueAxis

**Description:** Returns the values of a specified axis (AXIS_PTS) editable parameter at all axis points from the supplied DTV.
**Arguments:**
- BSTR szIdentifier - Parameter identifier.
- BSTR szDTV- Filename and full path of the DTV to retrieve value from.
- VARIANT* Value - 2-d array of doubles holding current values.
 
### GetDTVValueAxisBatch

**Description:** Returns a list of values from a specified list of axis (AXIS_PTS editable parameters at all axis points from the supplied DTV.
**Arguments:**
- VARIANT aszIdentifiers - List of parameter identifiers.
- BSTR szDTV- Filename and full path of the DTV to retrieve value from.
- VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                 Note: The first value in each list contains the number of values in the list.
 

### GetDTVValueScalar

**Description:** Returns the value of a specified scalar (VALUE) editable parameter from the supplied DTV.
**Arguments:**
- BSTR szIdentifier - Parameter identifier.
- BSTR szDTV- Filename and full path of the DTV to retrieve value from.
- double* pdResult - Parameters current value.
 
### GetDTVValueScalarBatch

**Description:** Returns a list of values from a specified list of scalar (VALUE) editable parameters from the supplied DTV.
**Arguments:**
- VARIANT aszIdentifiers - List of parameter identifiers.
- BSTR szDTV- Filename and full path of the DTV to retrieve value from.
- VARIANT* pafValues - List of parameters values.

### GetDTVValueString

**Description:** Returns the value of a specified string editable parameter from the supplied DTV.
**Arguments:**
 BSTR szIdentifier - Parameter identifier.

BSTR szDTV- Filename and full path of the DTV to retrieve value from.

BSTR FAR* pszValue - Returned value.
 

GetDTVValueStringBatch

**Description:** Returns a list of values from a specified list of string editable parameters from the supplied DTV.
**Arguments:**
 VARIANT aszIdentifiers - List of parameter identifiers.

BSTR szDTV- Filename and full path of the DTV to retrieve value from.

VARIANT* paszValues - List of parameters strings.
 

GetECUMeasurementAddress

Retrieves the address of the parameter.
**Arguments:**
 short wAppId - Application Id.

LPCTSTR pszIdentifier - Parameter identifier.

long* plAddress - Address returned

BYTE* plIdent - Ident returned
 

GetExternalInputGainOffset

Gets the Gain & Offset of an External Input parameter.
**Arguments:**
 BSTR pszParamId - The unique identifier of the External Input parameter.

double *pdGain - Receives the value of the parameter gain.

double *pdOffset - Receives the value of the parameter offset.
 

GetMapProperties

Return common attributes of a given map parameter.
**Arguments:**
 short wAppId - Application Id.

LPCTSTR pszIdentifier - parameter identifier.

LPBSTR pszXAxisId - Identifier of the x axis parameter.

LPBSTR pszYAxisId - Identifier of the y axis parameter.

short* psXAxisPts - Number on breakpoints in the x axis.

short* psYAxisPts - Number on breakpoints in the y axis.
 

GetModifiedParametersList

Return a list of string IDs and names for the modified parameters in a selected application.
**Arguments:**
 short wAppId - Application Id.

VARIANT* str1xArrParameterIds - Variant wrapped SAFEARRAY of strings containing the unique parameter identifiers.

VARIANT* str1xArrParameterNames - Variant wrapped SAFEARRAY of strings containing the matching parameter names.

long* pnParameterCount - Returns the number of parameters in the returned SAFEARRAYS.
 

GetParameterBitMask

Retrieves a bit mask of a given parameter.
**Arguments:**
 short wAppId - Application Id.

BSTR pszIdentifier - Unique parameter identifier.

long* plBitMask - Receives the parameter bit mask.
 

GetParameterBitShift

Retrieves a bit shift of a given parameter.
**Arguments:**
 short wAppId - Application Id.

BSTR pszIdentifier - Unique parameter identifier.

int* plBitShift - Receives the parameter bit shift.
 

GetParameterByteOrder

Retrieves a bit shift of a given parameter.
**Arguments:**
- short wAppId - Application Id.
- BSTR pszIdentifier - Unique parameter identifier.
- int* plByteOrder - Receives the parameter byte order.
    0: MSB First
    1: MSB Last
    2: Undefined
 
### GetParameterList

**Description:** Return a list of string IDs and names for the parameters in a selected application.
**Arguments:**
 short wAppId - Application Id.

BSTR* pszAppName - String representation of the selected application.

VARIANT* str1xArrParameterIds - Variant wrapped SAFEARRAY of strings containing the unique parameter identifiers.

VARIANT* str1xArrParameterNames - Variant wrapped SAFEARRAY of strings containing the matching parameter names.

long* pnParameterCount - Returns the number of parameters in the returned SAFEARRAYS.
 

### GetParameterListByType

**Description:** Return a list of string IDs and names of the parameters in a selected application for a specific parameter type.
**Arguments:**
 short wAppId - Application Id.

BSTR* pszParamType - Type of parameters to return.  Valid inputs are MEAS, SCALAR, AXIS, 1AXIS, 2AXIS, ARRAY, STRING.

BSTR* pszAppName - String representation of the selected application.

VARIANT* str1xArrParameterIds - Variant wrapped SAFEARRAY of strings containing the unique parameter identifiers.

VARIANT* str1xArrParameterNames - Variant wrapped SAFEARRAY of strings containing the matching parameter names.

long* pnParameterCount - Returns the number of parameters in the returned SAFEARRAYS.
 

### GetParameterProperties

**Description:** Return common attributes of a given parameter.
**Arguments:**
 short wAppId - Application Id.

BSTR pszIdentifier - Unique parameter identifier.

BSTR* pszUnits - Receives the parameters units.

double* pdLowerEngLimit - Receives the lower engineering limit of the parameter.

double* pdUpperEngLimit - Receives the upper engineering limit of the parameter.

BSTR* pszFormat - Receives the display format of the parameter.

BSTR* pszConversionId - Receives the conversion id of the parameter (if available).

BSTR* pszDescription - Receives the readable description/comment of the parameter
 

### GetParameterPropertiesByApp

**Description:** Return common attributes of all parameters in the specified application.
**Arguments:**
 short wAppId - Application Id.

VARIANT* aszIdentifier - Array of unique parameter identifiers.

VARIANT* aszName - Array of parameter names.

VARIANT* aszDescription - Array of parameter descriptions.

VARIANT* aszParamType - Array of parameter types.

VARIANT* aszUnits - Array of units.

VARIANT* aszFormats - Array of parameter formats.

VARIANT* aszConversionId - Array of conversion Ids.

VARIANT* aszGroups - Array of parameter group arrays.

VARIANT* aszDataType - Array of parameter data types.

VARIANT* avwDataSize - Array of parameter data sizes.

VARIANT* avdLowerEngLimit - Array of lower engineering limits.

VARIANT* avdUpperEngLimit - Array of upper engineering limits.

VARIANT* avdwMaxLoggingRate - Array of maximum logging rates.

VARIANT* avbPrime - Array of prime flags.

VARIANT* avbReadOnly - Array of read only flags.

VARIANT* avbLiveTuneable - Array of live tuneable flags.
 

### GetParameterPropertiesByAppandType

**Description:** Return common attributes of all parameters of a specified type in the specified application .
**Arguments:**
 short wAppId - Application Id.

BSTR pszParamType - Type of parameters to return.  Valid inputs are MEAS, SCALAR, AXIS, 1AXIS, 2AXIS, ARRAY, STRING.

VARIANT* aszIdentifier - Array of unique parameter identifiers.

VARIANT* aszName - Array of parameter names.

VARIANT* aszDescription - Array of parameter descriptions.

VARIANT* aszUnits - Array of units

VARIANT* aszFormats - Array of parameter formats

VARIANT* aszConversionId - Array of conversion IDs

VARIANT* aszGroups - Array of parameter group arrays

VARIANT* aszDataType - Array of parameter data types

VARIANT* avwDataSize - Array of parameter data sizes

VARIANT* avdLowerEngLimit - Array of lower engineering limits

VARIANT* avdUpperEngLimit - Array of upper engineering limits

VARIANT* avdwMaxLoggingRate - Array of maximum logging rates

VARIANT* avbPrime - Array of prime flags

VARIANT* avbReadOnly - Array of read only flags

VARIANT* avbLiveTuneable - Array of live tuneable flags
 

### GetParameterPropertiesByType

**Description:** Return common attributes of a given parameter of a specified type.
**Arguments:**
 short wAppId - Application Id.

BSTR pszIdentifier - Unique parameter identifier.

BSTR pszParamType - Type of parameters to return.  Valid inputs are MEAS, SCALAR, AXIS, 1AXIS, 2AXIS, ARRAY, STRING.

BSTR* pszUnits - Receives the parameters units.

double* pdLowerEngLimit - Receives the lower engineering limit of the parameter.

double* pdUpperEngLimit Receives the upper engineering limit of the parameter.

BSTR* pszFormat - Receives the display format of the parameter.

BSTR* pszConversionId - Receives the conversion id of the parameter (if available).

BSTR* pszDescription - Receives the readable description/comment of the parameter
 

### GetParameterPropertiesEx

Get method for retrieving extended parameter properties.
**Arguments:**
 short wAppId - Application Id.

LPCTSTR pszIdentifier - Parameter identifier.

LPBSTR pszName

LPBSTR pszParamType - SCALAR, MEAS etc.

VARIANT* pszGroups - Array of group name strings.

LPBSTR pszDataType

short* psDataSize

long* plMaxLoggingRate

VARIANT_BOOL FAR* pbPrime

VARIANT_BOOL FAR* pbReadOnly

VARIANT_BOOL FAR* pbLiveTuneable
 

### GetParameterPropertiesExByType

Get method for retrieving extended parameter properties based on a specific parameter type.
**Arguments:**
-short wAppId - Application Id.
-LPCTSTR pszIdentifier - Parameter identifier.
- LPBSTR pszParamType - Type of parameters to return.  Valid inputs are:
    MEAS,
    SCALAR,
    AXIS,
    1AXIS,
    2AXIS,
    ARRAY,
    STRING.
-LPBSTR pszName

LPBSTR pszParamType - SCALAR, MEAS etc.

VARIANT* pszGroups - Array of group name strings.

LPBSTR pszDataType

short* psDataSize

long* plMaxLoggingRate

VARIANT_BOOL FAR* pbPrime

VARIANT_BOOL FAR* pbReadOnly

VARIANT_BOOL FAR* pbLiveTuneable
 

### GetParametersAndGroups

Returns a list of all parameters and the group descriptions in the application.
**Arguments:**
 unsigned short wAppId - Application Id.

VARIANT* str1xIdentifiers - Safe Array of parameter identifiers.

VARIANT* str1xGroups - Safe Array of group descriptions for each parameter.
 

### GetParameterWarningLimits

Gets the warning limits from a parameter.
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

double* pdLow - Lower display warning limit.

double* pdHigh - Upper display warning limit.
 

### GetRowDetails

Retrieves the row detailsof a given parmeter.
**Arguments:**
 short wAppId - Application Id.

BSTR pszIdentifier - Unique parameter identifier.

short* pnId - Receives the parameter Id.

long* plIdentOffset - Receives the parameter ident offset.
 

### GetScalarAddress

Retrieves the address of the parameter.
**Arguments:**
 short wAppId - Application Id.

LPCTSTR pszIdentifier - Parameter identifier.

long* plAddress - Address returned
 

### GetStringValue1AxisMap

Returns the current values of a specified 1-axis map (CURVE) Editable Parameter at all axis points as formatted strings
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT* Value - 1-d array of BSTRSs holding current values.
 

### GetStringValue2AxisMap

Returns the current values of a specified 2-axis map (MAP) Editable Parameter at all axis points as formatted strings.
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT* Value - 2-d array of BSTRSs holding current values.
 

### GetStringValueArray

Returns the current values of a specified array (VAL_BLK) Editable (characteristic) Parameter at all index positions as formatted text values
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT* Value - 1-d array of BSTRs holding current values.
 

### GetStringValueAxis

Returns the current values of a specified axis (AXIS_PTS) Editable Parameter at all axis points as formatted text values.
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT* Value - 1-d array of BSTRs holding current values.  
 

### GetStringValueMeasurement

Returns the current value of a specified measurement parameter as a formatted string.
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

BSTR* pszResult - Parameters current value.
 

### GetStringValueScalar

Returns the current value of a specified Scalar (VALUE) Editable Parameter as a string.
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

BSTR* pszResult - Parameters current value.
 

### GetValue1AxisMap

Returns the current values of a specified 1-axis map (CURVE) editable parameter at all axis points.
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT* Value - 1-d array of doubles holding current values.
 

### GetValue1AxisMapBatch

Returns the current values of a specified  list of 1-axis map (CURVE) editable parameters at all axis points.
**Arguments:**
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                 Note: The first value in each list contains the number of values in the list.
 

### GetValue1AxisMapBatchEx

Returns the current values of a specified  list of 1-axis map (CURVE) editable parameters at all axis points with an error code for each parameter.
**Arguments:**
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                 Note: The first value in each list contains the number of values in the list.

VARIANT* palErrorCodes - List of error codes.
 

### GetValue2AxisMap

Returns the current values of a specified 2-axis map (MAP) editable parameter at all axis points.
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT* Value - 2-d array of doubles holding current values.
 

### GetValue2AxisMapBatch

Returns the current values of a specified  list of 2-axis map (MAP) editable parameters at all axis points.
**Arguments:**
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT* pafValues - 3-d array of doubles holding lists of parameters arrays.
                                Note: The first value in each row and column contains the number of values in the list.
 

### GetValue2AxisMapBatchEx

Returns the current values of a specified  list of 2-axis map (MAP) editable parameters at all axis points with an error code for each parameter.
**Arguments:**
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT* pafValues - 3-d array of doubles holding lists of parameters arrays.
                                Note: The first value in each row and column contains the number of values in the list.

VARIANT* palErrorCodes - List of error codes.
 

### GetValueArray

Returns the current values of a specified array (VAL_BLK) editable (characteristic) parameter at all index positions.
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT* Value - 1-d array of doubles holding current values.
 

### GetValueArrayBatch

Returns the current values of a specified  list of array (VAL_BLK) editable (characteristic) parameters at all index positions.
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                 Note: The first value in each list contains the number of values in the list.
 

### GetValueArrayBatchEx

Returns the current values of a specified  list of array (VAL_BLK) editable (characteristic) parameters at all index positions with an error code for each parameter.
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                 Note: The first value in each list contains the number of values in the list.

VARIANT* palErrorCodes - List of error codes.
 

### GetValueAxis

Returns the current values of a specified axis (AXIS_PTS) editable parameter at all axis points.
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT* Value - 1-d array of doubles holding current values.
 

### GetValueAxisBatch

Returns the current values of a specified  list of axis (AXIS_PTS) editable parameters at all axis points.
**Arguments:**
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                 Note: The first value in each list contains the number of values in the list.
 

### GetValueAxisBatchEx

Returns the current values of a specified  list of axis (AXIS_PTS) editable parameters at all axis points with an error code for each parameter.
**Arguments:**
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT* pafValues - 2-d array of doubles holding lists of parameters values.
                                 Note: The first value in each list contains the number of values in the list.

VARIANT* palErrorCodes - List of error codes.
 

### GetValueCANBatch

Returns the current value of a specified  list of CAN parameters with an error code for each parameter.
**Arguments:**
 VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT* pafValues - List of parameters values.

VARIANT* palErrorCodes - List of error codes.
 

### GetValueMeasurement

Returns the current value of a specified measurement parameter.
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

long* bAddToDaq - (UNUSED PARAM).

double* pdResult - Parameters current value.
 

### GetValueMeasurementBatch

Returns the current value of a specified  list of measurement parameters.
**Arguments:**
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT* pafValues - List of parameters values.
 

### GetValueMeasurementBatchEx

Returns the current value of a specified  list of measurement parameters with an error code for each parameter.
**Arguments:**
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT* pafValues - List of parameters values.

VARIANT* palErrorCodes - List of error codes.
 

### GetValueOffset

Retrieve the live value offset for a parameter.
**Arguments:**
 short wAppId - Application Id.

BSTR szParamIdent - Parameter identifier.

double* pdOffset - Live offset value
 

### GetValueScalar

Returns the current value of a specified scalar (VALUE) editable parameter.
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

double* pdResult - Parameters current value.
 

### GetValueScalarBatch

Returns a list of values from a specified list of scalar (VALUE) editable parameters.
**Arguments:**
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT* pafValues - List of parameters values.
 

### GetValueScalarBatchEx

Returns a list of values from a specified list of scalar (VALUE) editable parameters with an error code for each parameter.
**Arguments:**
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT* pafValues - List of parameters values.

VARIANT* palErrorCodes - List of error codes.
 

### GetValueString

Returns the current value of a specified string editable parameter
**Arguments:**
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

BSTR FAR* pszValue - Returned value.
 

### GetValueStringBatch

Returns a list of values from a specified list of string editable parameters.
**Arguments:**
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT* paszValues - List of parameters strings.
 

GetValueStringBatchEx

**Description:** Returns a list of values from a specified list of string editable parameters with an error code for each parameter..

Arguments:
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT* paszValues - List of parameters strings.

VARIANT* palErrorCodes - List of error codes.
 

GetValueVirtualBatch

**Description:** Returns the current value of a specified  list of virtual parameters with an error code for each parameter.

Arguments:
 VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT* pafValues - List of parameters values.

VARIANT* palErrorCodes - List of error codes.
 

IsParameterLoggable

**Description:** Returns the loggable property of a measurement parameter

Arguments:
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

BOOL FAR* pbResult - Returned value.
 

ParameterExists

Identifies if a given parameter exists.

Arguments:
 short wAppId - Application Id.

BSTR pszIdentifier - Unique parameter identifier.

bool* pbResult
 

ParameterExistsEx

Identifies if a parameter of the given type exists.

Arguments:
 short wAppId - Application Id.

BSTR pszIdentifier - Unique parameter identifier.

BSTR pszParamType - One of 'MEAS', 'SCALAR', 1AXIS', '2AXIS', 'ARRAY', 'STRING', 'VIRTUAL' or 'CAN'

bool* pbResult
 

RestoreValue

Restore the parameter value to original saved value.

Arguments:
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.
 

SetBatchMode

Call this to enter (or leave) batch mode. This is used when creating virtual parameters; entering batch mode before the creation of multiple Virtual Parameters and leaving batch mode afterwards. Using this method, all created/updated Virtual Parameters will only be available in System Monitor after leaving batch mode.

Arguments:
 boolean bEnter - Enter/leave batch mode, true or false respectively.
 

SetExternalInputGainOffset

Sets the Gain & Offset of an External Input parameter.

Arguments:
 BSTR pszParamId - The unique identifier of the External Input parameter.

double dGain - The value to set the Gain.

double dOffset - The value to set the Offset.
 

SetParameterWarningLimits

Sets the warning limits on a parameter.

Arguments:
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

double dLow - Lower display warning limit.

double dHigh - Upper display warning limit.
 

SetStringValue1AxisMap

Sets the current value of a specified 1-axis map (CURVE) Editable Parameter at one or more axis points from an array of string values

Arguments:
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT Value - 1-d array of BSTRs holding new values.
 

SetStringValue2AxisMap

Sets the current value of a specified 2-axis map (MAP) Editable Parameter at one or more axis points from an array of formatted strings.

Arguments:
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT Value - 2-d array of BSTRs holding new values.
 

SetStringValueArray

Sets the current value of a specified array (VAL_BLK) Parameter at one or more index positions from an array of strings.

Arguments:
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT Value - 1-d array of BSTRs holding new values.
 

SetStringValueAxis

Sets the current value of a specified axis (AXIS_PTS) Editable Parameter at one or more axis points from an array of strings.

Arguments:
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT Value - 1-d array of BSTRs holding new values.
 

SetStringValueScalar

Sets the current value of a specified scalar (VALUE) Editable Parameter from a string.

Arguments:
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

BSTR szValue - New value.
 

SetValueScalarBatch

Set values for a specified list of scalar (VALUE) editable parameters with an error code for each parameter.

Arguments:
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT afValues - List of parameters values.

VARIANT* palErrorCodes - List of error codes.
 

SetValue1AxisMapBatch

Set values for a specified list of 1-axis map (CURVE) editable parameters at all axis points with an error code for each parameter.

Arguments:
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT afValues - 2-d array of doubles holding lists of parameters values.
                              Note: The first value in each list should contain the number of values in the list.

VARIANT* palErrorCodes - List of error codes.
 

SetValue2AxisMapBatch

Set values for a specified list of 2-axis map (MAP) editable parameters at all axis points with an error code for each parameter.

Arguments:
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT afValues - 3-d array of doubles holding lists of parameters arrays.
                              Note: The first value in each row and column should contain the number of values in row/column.

VARIANT* palErrorCodes - List of error codes.
 

SetValueArrayBatch

Set values for a specified list of  array (VAL_BLK) editable (characteristic) parameters at all index positions with an error code for each parameter.

Arguments:
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT afValues - 2-d array of doubles holding lists of parameters values.
                                 Note: The first value in each list should contain the number of values in the list.

VARIANT* palErrorCodes - List of error codes.
 

SetValueAxisBatch

Set values for a specified list of axis (AXIS_PTS) editable parameters at all axis points with an error code for each parameter.

Arguments:
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT afValues - 2-d array of doubles holding lists of parameters values.
                                 Note: The first value in each list should contain the number of values in the list.

VARIANT* palErrorCodes - List of error codes.
 

SetValueStringBatch

Set values for a specified list of string editable parameters with an error code for each parameter..

Arguments:
 unsigned short wAppId - Application Id.

VARIANT aszIdentifiers - List of parameter identifiers.

VARIANT aszValues - List of parameters strings.

VARIANT* palErrorCodes - List of error codes.
 

SetValue1AxisMap

Sets the current value of a specified 1-axis map (CURVE) editable parameter at one or more axis points.

Arguments:
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT Value - 1-d array of doubles holding new values.
 

SetValue2AxisMap

Sets the current value of a specified 2-axis map (MAP) editable parameter at one or more axis points.

Arguments:
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT Value - 2-d array of doubles holding new values.
 

SetValueArray

Sets the current value of a specified array (VAL_BLK) parameter at one or more index positions.

Arguments:
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT Value - 1-d array of doubles holding new values.
 

SetValueAxis

Sets the current value of a specified axis (AXIS_PTS) editable parameter at one or more axis points.

Arguments:
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

VARIANT Value - 1-d array of doubles holding new values.
 

SetValueOffset

Sets the live value offset for a parameter.

Arguments:
 short wAppId - Application Id.

BSTR szParamIdent - Parameter identifier.

double pdOffset - Live offset value.
 

SetValueScalar

Sets the current value of a specified scalar (VALUE) editable parameter.

Arguments:
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

double dValue - New value.
 

SetValueString

Sets the current value of a specified string editable parameter.

Arguments:
 unsigned short wAppId - Application Id.

BSTR szIdentifier - Parameter identifier.

LPCTSTR pszValue - New value.
 

ZeroLiveValue

Zero's the live value by applying an offset to a measurement parameter.

Arguments:
 short wAppId - Application Id.

BSTR szParamIdent - Parameter identifier.
 

Functions - Virtual Parameters
AddVirtualParameterGroup

Adds a Virtual Parameter Group

Arguments:
 LPCTSTR szPath - The path where the groups is to be added, e.g. \\TopLevelGroup\\SubGroup.

LPCTSTR szName - The display name for the virtual parameter .

LPCTSTR szDescription - Description of the virtual parameter.

BOOL bParamsReadOnly - If set to true, the virtual parameter group will be marked as a Read Only.
 

GetValueVirtual

Retrieve a selected Virtual Parameter.

Arguments:
 BSTR pszIdentifier - Virtual parameter identifier

double* pdResult - Value of the virtual parameter
 

GetVirtualParamCount

Retrieve the number of Virtual Parameters in the current project.

Arguments:
 long* pnParamCount - The number of virtual parameters in the active project.
 

GetVirtualParamCountGroup

Retrieves the number of virtual parameters in a group.

Arguments:
 LPCTSTR szPath -  The path of group that contains the parameters, e.g. \\TopLevelGroup\\SubGroup.

long* pnParamCount - The number of virtual parameters in the group.
 

GetVirtualParameter

Retrieve a selected Virtual Parameter.

Arguments:
 BSTR rszParamId - The unique identifier of the Virtual Parameter to receive.

BSTR *rszName - Receives the display name of the parameter.

BSTR *rszDescription - Receives the description of the parameter.

double * pdwMaxDisplay - Receives the maximum value.

double * pdwMinDisplay - Receives the minimum value.

int * pnMinLoggingRate - Receives the minimum logging rate.

int * pnScalingFactor - Receives the scalling factor (see EScalingUnit).

boolean * pbIsMinNotDef - Receives state of min/max values.

BSTR * rszExpression - Receives the expression used to evaluate the virtual parameter.

BSTR * rszConvId - Receives the unique identifier of the conversion rule used in this parameter.
 

GetVirtualParameterBatch

Retrieve virtual parameter details for the given list of parameters.

Arguments:
 VARIANT aszIdentifiers – Safe Array (string) of virtual parameter identifiers.

VARIANT* astrNames - Safe Array of parameter display names.

VARIANT* astrDescription - Safe Array of parameter descriptions.

VARIANT* afMaxDisplay - Safe Array of parameter maximum values ( doubles ).

VARIANT* afMinDisplay - Safe Array of parameter minimum values ( doubles ).

VARIANT* anMinLoggingRate - Safe Array of parameter minimum logging rates ( unsigned integers ).

VARIANT* anScalingFactor - Safe Array of parameter scaling factors (see EScalingUnit).

VARIANT* abIsMinNotDef - Safe Array of parameter state of min/max values ( boolean ).

VARIANT* astrExpression - Safe Array of parameter expressions used to evaluate the virtual parameters.

VARIANT* astrConvId - Safe Array of parameter unique identifiers of the conversion rules.

VARIANT* astrUnits - Safe Array of parameter units.

VARIANT* astrFormat - Safe Array of parameter display formats.

VARIANT* astrGroup - Safe Array of parameter group names.
 

GetVirtualParameterBatchEx

Retrieve virtual parameter details for the given list of parameters.

Arguments:
 VARIANT aszIdentifiers - Array (string) of virtual parameter identifiers.

VARIANT* aszNames - Array of parameter display names.

VARIANT* aszDescriptions - Array of parameter descriptions.

VARIANT* adMaxDisplays - Array of parameter maximum values ( doubles ).

VARIANT* adMinDisplays - Array of parameter minimum values ( doubles ).

VARIANT* adwMinLoggingRates - Array of parameter minimum logging rates ( unsigned integers ).

VARIANT* awScalingFactors - Array of parameter scaling factors ( unsigned shorts, see EScalingUnit ).

VARIANT* abIsMinNotDefs - Array of parameter state of min/max values ( boolean ).

VARIANT* aszExpressions - Array of parameter expressions used to evaluate the virtual parameters.

VARIANT* aszConvIds - Array of parameter unique identifiers of the conversion rules.

VARIANT* aszUnits - Array of parameter units.

VARIANT* aszFormat - Array of parameter display formats.

VARIANT* aszGroup - Array of parameter group names.

VARIANT* szDataTypes - Array of parameter data types.

VARIANT* palErrorCodes - List of error codes.
 

GetVirtualParameterEx

Retrieve a selected Virtual Parameter.

Arguments:
 BSTR rszParamId - The unique identifier of the Virtual Parameter to receive.

BSTR *rszName - Receives the display name of the parameter.

BSTR *rszDescription - Receives the description of the parameter.

double * pdwMaxDisplay - Receives the maximum value.

double * pdwMinDisplay - Receives the minimum value.

int * pnMinLoggingRate - Receives the minimum logging rate.

int * pnScalingFactor - Receives the scalling factor (see EScalingUnit).

boolean * pbIsMinNotDef - Receives state of min/max values.

BSTR * rszExpression - Receives the expression used to evaluate the virtual parameter.

BSTR * rszConvId - Receives the unique identifier of the conversion rule used in this parameter.

BSTR * rszUnits - Receives the units of this parameter.

BSTR * rszFormat - Receives the display format used for this parameter.

BSTR * rszGroup - Receives the group name containing this parameter.
 

GetVirtualParameterEx2

Retrieve a selected Virtual Parameter.

Arguments:
 BSTR szParamId - The unique identifier of the Virtual Parameter to receive.

BSTR* pszName - Receives the display name of the parameter.

BSTR* pszDescription - Receives the description of the parameter.

double* pdMaxDisplay - Receives the maximum value.

double* pdMinDisplay - Receives the minimum value.

unsigned int* pdwMinLoggingRate - Receives the minimum logging rate.

unsigned short* pwScalingFactor - Receives the scalling factor (see EScalingUnit).

boolean* pbIsMinNotDef - Receives state of min/max values.

BSTR* prszExpression - Receives the expression used to evaluate the virtual parameter.

BSTR* prszConvId - Receives the unique identifier of the conversion rule used in this parameter.

BSTR* prszUnits - Receives the units of this parameter.

BSTR* prszFormat - Receives the display format used for this parameter.

BSTR* prszGroup - Receives the group name containing this parameter.
 
 
 BSTR* pszDataType - Receives the data type of this parameter.
 

GetVirtualParameterGroup

Get Virtual Parameter Group details

Arguments:
 LPCTSTR szGroup - The identifier of the group to lookup.

BSTR* pszName - Receives the display name for the virtual parameter .

BSTR* pszDescription - Receives the description of the virtual parameter.

BOOL* pbParamsReadOnly - Receives the read only statusof the group.
 

GetVirtualParameterGroupList

**Description:** Return a list of Virtual Parameter groups in the current project.

 

Arguments:
 VARIANT FAR* paGroupPaths - Receives a list of paths of the groups, e.g. \\TopLevelGroup\\SubGroup.

Long* pnGroupCount  - Receives the total number of groups.
 

GetVirtualParameterList

Retrieve a list of the virtual parameters in the current project.

Arguments:
 VARIANT FAR* paParams - VARIANT contained safe-array of string names.
 

GetVirtualParameterListEx

**Description:** Return a list of Virtual Parameter identifiers, names and count in the current project.

 

Arguments:
 VARIANT FAR* paParameterIds

VARIANT FAR* paParameterNames

Long* pnParameterCount  
 

GetVirtualParameterListGroup

Retrieves a list of the virtual parameters in the group.

Arguments:
 LPCTSTR szPath -  The path of group that contains the parameters, e.g. \\TopLevelGroup\\SubGroup.

paParams - VARIANT contains safe-array of parameter Identifiers.
 

RemoveAllVirtualParameters

Removes/deletes all Virtual Parameters in the active project.

Arguments:
 None
 

RemoveAllVirtualParametersFromGroup

Removes/deletes all virtual parameters from a group.

Arguments:
 LPCTSTR szPath  - The path of the group which is to be removed, e.g. \\TopLevelGroup\\SubGroup.
 

RemoveVirtualParameter

Removes a selected Virtual Parameter

Arguments:
 BSTR rszParamId - The unique identifier of the Virtual Parameter to remove.
 

RemoveVirtualParameterGroup

Removes the Virtual Parameter Group.

Arguments:
 LPCTSTR szPath - The path of the group which is to be removed, e.g. \\TopLevelGroup\\SubGroup.
 

SetVirtualParameter

Modify or Create a Virtual Parameter.

Arguments:
 BSTR rszParamId - The unique identification of the virtual parameter.

BSTR rszName - The display name for the virtual parameter.

BSTR rszDescription - Description of the virtual parameter.

double dwMaxDisplay  - Maximum value.

double dwMinDisplay  - Minimum value.

int nMinLoggingRate - Minimum logging rate.

int nScalingFactor - See EScalingUnit in Enumeration Definitions.

boolean bIsMinNotDef - If set to true, the Virtual Parameter will be marked as a Prime Parameter.

BSTR rszExpression - The expression to evaluate in the Virtual Parameter.

BSTR rszConvId - The conversion rule identifier for converting the output value to appropriate unit values.

boolean bOverwrite - Overwrite existing data.
 

SetVirtualParameterDataType

Set the data type of the Virtual Parameter.

Arguments:
 BSTR rszParamId - The unique identification of the virtual parameter.

enumDataType eDataType - The data type.
 

SetVirtualParameterEx

Set groups, units and formatting  for Virtual Parameters

Arguments:
 LPCTSTR pszParamId - The unique identification of the virtual parameter.

LPCTSTR rszName - The display name for the virtual parameter.

LPCTSTR pszDescription - Description of the virtual parameter.

double dwMaxDisplay  - Maximum value.

double dwMinDisplay  - Minimum value.

int nMinLoggingRate - Minimum logging rate.

int nScalingFactor - See EScalingUnit in Enumeration Definitions.

boolean bIsMinNotDef - If set to true, the Virtual Parameter will be marked as a Prime Parameter.

LPCTSTR rszExpression - The expression to evaluate in the Virtual Parameter.

LPCTSTR pszConvId - The conversion rule identifier for converting the output value to appropriate unit values.

boolean bOverwrite - Overwrite existing data.

LPCTSTR szUnits - Sets the overriding units in which to display the virtual parameter’s value

LPCTSTR szFormatOverride - Sets the overriding format in which to display the virtual parameter’s value

 
 

SetVirtualParameterExtended

Adds a virtual parameter with all options.

Arguments:
 LPCTSTR pszParamId - The unique identification of the virtual parameter.

LPCTSTR rszName - The display name for the virtual parameter.

LPCTSTR pszDescription - Description of the virtual parameter.

double dwMaxDisplay - Maximum value.

double dwMinDisplay - Minimum value.

int nMinLoggingRate - Minimum logging rate.

int nScalingFactor - See EScalingUnit in Enumeration Definitions

boolean bIsMinNotDef - If set to true, the virtual parameter will be marked as a Prime Parameter.

LPCTSTR rszExpression - The expression to evaluate in the virtual parameter.

LPCTSTR pszConvId - The conversion rule identifier for converting the output value to appropriate unit values.

boolean bOverwrite - Overwrites existing data.

LPCTSTR szUnits - Sets the overriding units in which to display the virtual parameter’s value

LPCTSTR szFormatOverride - Sets the overriding format in which to display the virtual parameter’s value

LPCTSTR szGroupPath - The path of the group in which to add the virtual parameter, e.g. \\TopLevelGroup\\SubGroup.

enumDataType eDataType - The data type.

double dwUpperWarningLimit - Upper warning limit value.

double dwLowerWarningLimit - Lower warning limit value.
 

SetVirtualParameterToGroup

Adds a virtual parameter to an existing group

Arguments:
 LPCTSTR pszParamId - The unique identification of the virtual parameter.

LPCTSTR rszName - The display name for the virtual parameter.

LPCTSTR pszDescription - Description of the virtual parameter.

double dwMaxDisplay - Maximum value.

double dwMinDisplay - Minimum value.

int nMinLoggingRate - Minimum logging rate.

int nScalingFactor - See EScalingUnit in Enumeration Definitions

boolean bIsMinNotDef - If set to true, the virtual parameter will be marked as a Prime Parameter.

LPCTSTR rszExpression - The expression to evaluate in the virtual parameter.

LPCTSTR pszConvId - The conversion rule identifier for converting the output value to appropriate unit values.

boolean bOverwrite - Overwrites existing data.

LPCTSTR szUnits - Sets the overriding units in which to display the virtual parameter’s value

LPCTSTR szFormatOverride - Sets the overriding format in which to display the virtual parameter’s value

LPCTSTR szGroupPath - The path of the group in which to add the virtual parameter, e.g. \\TopLevelGroup\\SubGroup.
 

SetVirtualParameterToGroupWithDataType

Adds a virtual parameter with a Data Type defined to an existing group.

Arguments:
 LPCTSTR pszParamId - The unique identification of the virtual parameter.

LPCTSTR rszName - The display name for the virtual parameter.

LPCTSTR pszDescription - Description of the virtual parameter.

double dwMaxDisplay - Maximum value.

double dwMinDisplay - Minimum value.

int nMinLoggingRate - Minimum logging rate.

int nScalingFactor - See EScalingUnit in Enumeration Definitions

boolean bIsMinNotDef - If set to true, the virtual parameter will be marked as a Prime Parameter.

LPCTSTR rszExpression - The expression to evaluate in the virtual parameter.

LPCTSTR pszConvId - The conversion rule identifier for converting the output value to appropriate unit values.

boolean bOverwrite - Overwrites existing data.

LPCTSTR szUnits - Sets the overriding units in which to display the virtual parameter’s value

LPCTSTR szFormatOverride - Sets the overriding format in which to display the virtual parameter’s value

LPCTSTR szGroupPath - The path of the group in which to add the virtual parameter, e.g. \\TopLevelGroup\\SubGroup.

enumDataType eDataType - The data type.
 

Enhanced Rate Row Parameters
RegisterEnhancedRowParameters

Add parameters from application to the enhanced speed row data list.

Arguments:
 unsigned short wAppId - Application Id.

const VARIANT FAR& aszIdentifiers - List of parameters to add to enhanced row data list.
 

RegisterCANEnhancedRowParameters

Add CAN parameters to the enhanced speed row data list.

Arguments:
 const VARIANT FAR& aszIdentifiers - List of CAN paramteres to add to enhanced row data list.
 

RegisterVirtualEnhancedRowParameters

Add virtual parameters to the enhanced speed row data list.

All parameters referenced by each virtual will be added to the list.

Arguments:
 const VARIANT FAR& aszIdentifiers - List of virtual parameters to add to enhanced row data list..
 

ClearEnhancedRowParameters

Clar all parameters for given application from enhanced speed slow row data list.

Arguments:
 unsigned short wAppId - Application Id.

NULL (0x0000) to clear all Parameters.
 

ActivateEnhancedRowParameters

Activate current enhanced speed row data list.

Arguments:
 None.
 


## Conversion Rules

### **GetConversions**
**Description:** Returns a list of all conversions and the types defined in the application.  
**Arguments:**  
- unsigned short wAppId - Application Id. NULL - (0x0000) for Virtual and CAN conversions.  
- VARIANT* str1xIdentifiers - Safe Array of conversion identifiers.  
- VARIANT* str1xType - Safe Array of conversion types.  

### **GetConversionType**
**Description:** Returns the type of the specified conversion rule.  
**Arguments:**  
- BSTR pszConversionID - Conversion identifier.  
- BSTR* pszConversionType - Type of conversion.  

### **GetConversionUse**
**Description:** Returns a list of all parameters using the specified conversion in the application.  
**Arguments:**  
- unsigned short wAppId - Application Id. NULL - (0x0000) for all applications including Virtual and CAN.  
- BSTR pszConversionID - Conversion identifier.  
- VARIANT* str1xIdentifiers - Safe Array of parameter identifiers.  

### **GetFormulaConv**
**Description:** Retrieves a selected Formula (Free) Conversion  
**Arguments:**  
- BSTR pszConvId – Unique identifier of conversion.  
- BSTR * pszComment – Human readable description.  
- BSTR * pszFormat – Format string (e.g. “%1.3f”).  
- BSTR * pszUnits – Unit value for output.  
- BSTR * pszFormula – Formula value.  
- BSTR * pszInverse – Inverse value.  

### **GetRationalConv**
**Description:** Retrieves a selected Rational Conversion  
**Arguments:**  
- BSTR pszConvId – Unique identifier of conversion.  
- double * pdPar1 – Coefficient value 1.  
- double * pdPar2 – Coefficient value 2.  
- double * pdPar3 – Coefficient value 3.  
- double * pdPar4 – Coefficient value 4.  
- double * pdPar5 – Coefficient value 5.  
- double * pdPar6 – Coefficient value 6.  
- BSTR * pszComment – Human readable description.  
- BSTR * pszFormat – Format string (e.g. “%1.3f”).  
- BSTR * pszUnits – Unit value for output.  
- BSTR * pszDefault – Default value.  

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
