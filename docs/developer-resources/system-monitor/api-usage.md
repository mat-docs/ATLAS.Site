# System Monitor ActiveX Automation API

System Monitor includes an ActiveX/OLE Automation interface, which exposes programmable System Monitor objects to other applications. This allows external applications to control or request information from a running copy of System Monitor.

## Configuring the API for VBA
To use the System Monitor API in VBA, go to Tools>References and check "System Monitor Type Library."

### VBA Code Examples
=== "setRlcDetails"

    ```vb
    Dim SmApi As Object
    Set SmApi = CreateObject("System Monitor API")

    Dim szName As String
    Dim szValue As String
    Dim lErr As Long

    szName = "Car"
    szValue = "Miata"

    lErr = SmApi.SetRemoteSessionDetail(szName, szValue)

    ' Print error code
    Debug.Print "Error code = ";
    Debug.Print lErr

    Set SmApi = Nothing
    ```

=== "getValue1AxisMap"

    ```vb
    Dim SmApi As Object
    Set SmApi = CreateObject("System Monitor API")

    Dim szIdent As String
    Dim adValue As Variant
    Dim lErr As Long

    szIdent = "FMa_IgnStart"

    lErr = SmApi.GetValue1AxisMap(20737, szIdent, adValue)

    ' Print error code
    Debug.Print "Error code = ";
    Debug.Print Hex(lErr)
    
    ' Print 1 Axis Map values
    Debug.Print "Values = "
    For i = 0 To UBound(adValue)
        Debug.Print adValue(i);
        Debug.Print ", ";
    Next i
    Debug.Print

    Set SmApi = Nothing
    ```

=== "getAppDetails"

    ```vb
    Dim SmApi As Object
    Set SmApi = CreateObject("System Monitor API")

    Dim pawAppIds As Variant
    Dim pastrAppNames As Variant
    
    Dim lErr As Long
    lErr = SmApi.getAppDetails(pawAppIds, pastrAppNames)
    
    ' Print error code
    Debug.Print "Error code = ";
    Debug.Print Hex(lErr)
    
    ' Print App IDs
    Debug.Print "App IDs = "
    For i = 0 To UBound(pawAppIds)
        Debug.Print CDec(pawAppIds(i));
        Debug.Print ", ";
    Next i
    
    Debug.Print

    ' Print App Names
    Debug.Print "App Names = "
    For i = 0 To UBound(pastrAppNames)
        Debug.Print pastrAppNames(i);
        Debug.Print ", ";
    Next i

    Set SmApi = Nothing
    ```

=== "SendMessage"

    ```vb
    Dim SmApi As Object
    Set SmApi = CreateObject("System Monitor API")
    
    Dim rSendMessage(2) As Integer
    Dim pReplyMessage As Variant
    Dim wAppId As Integer
    Dim wTimeout As Integer
    
    wAppId = 20737
    wTimeout = 1000 ' ms

    Dim TAG_510_APP1_AP_ID As Integer
    Dim COM_SM_USER_MSG As Integer

    TAG_510_APP1_AP_ID = &H10
    COM_SM_USER_MSG = &HAF
    
    ' Build message 10AF 200D 0063
    ' First word: 10AF = (0x10 * 256) + 0xAF
    rSendMessage(0) = (TAG_510_APP1_AP_ID * 256) + COM_SM_USER_MSG
    ' Second word: 0x200D = Set Lap Number single message
    rSendMessage(1) = &H200D
    ' Third word: 0x0063 == 99
    rSendMessage(2) = &H63
    
    Dim lErr As Long
    lErr = SmApi.SendMessage(wAppId, rSendMessage, pReplyMessage, wTimeout)
    
    ' Print error code
    Debug.Print "Error code = ";
    Debug.Print Hex(lErr)
    
    ' Print contents of response
    Debug.Print "Response = "
    For i = 0 To UBound(pReplyMessage)
        Debug.Print Hex(pReplyMessage(i));
        Debug.Print ", ";
    Next i
    Debug.Print
    
    Set SmApi = Nothing
    ```

## Configuring the API for Python
1. You will need to use the `pywin32` and `pythoncom` packages.
2. Navigate to the makepy.py program. Depending on where your Python interpreter is installed, the path should be similar to: PythonVERSION_NUMBER\Lib\site-packages\win32com\client\makepy.py
3. Run the makepy.py program and a GUI will appear. Scroll down until you see "System Monitor Type Library." This is the same library referenced in VBA.
    - In the command prompt, change the directory to where makepy.py is located and enter "python makepy.py"
    - You can also open the makepy.py file itself in an IDE and run the code from there.
4. Click OK and a Python wrapper will be generated. If you're executing in a command prompt, you will see where this wrapper was saved. Typically like so: "C:\Users\USER_NAME\AppData\Local\Temp\gen_py\3.12\86E60CC0-516A-11D2-BE2C-00004B405F8Ex0x1x0.py"
5. You don't necessarily need to open the wrapper, but it may be useful to review.
6. The ProgID "System Monitor API" will be used to reference the API.

### Inspecting the Wrapper
If you inspect the wrapper, you'll see methods defined as such:
```python
def SendMessage(self, wAppId=defaultNamedNotOptArg, rSendMessage=defaultNamedNotOptArg, pReplyMessage=defaultNamedNotOptArg, wTimeout=defaultNamedNotOptArg):
    return self._oleobj_.InvokeTypes(1, LCID, 1, (3, 0), ((2, 0), (12, 0), (16396, 0), (2, 0)),wAppId
        , rSendMessage, pReplyMessage, wTimeout)
```

In the example above, pay attention to `((2, 0), (12, 0), (16396, 0), (2, 0))`. This describes the data types for the arguments.

!!! warning
    While the wrapper can be useful to determine the arguments' types, it is not always accurate. See rSendMessage below.

* (2, 0) -> wAppId
* (12, 0) -> rSendMessage
!!! info "rSendMessage Data Type"
    This argument is not actually '12' or type VT_VARIANT. This is actually '8194' which is VT_ARRAY | VT_I2.
* (16396, 0) -> pReplyMessage
* (2, 0) -> wTimeout

| Value (Decimal) | Value (Hex) | Data Type | Info |
|-------------|-----------|-----------|-----------|
| 2 | 0x0002 | VT_I2 | Short |
| 12 | 0x000C | VT_VARIANT | Variant |
| 8194 | 0x2002 | VT_ARRAY VT_I2 | 0x2000 = VT_ARRAY and 0x0002 = VT_I2 |
| 16396 | 0x400C | VT_VARIANT VT_BYREF | 0x4000 = VT_BYREF and 0x000C = VT_VARIANT |


!!! info "More Info on Data Types"
    [Microsoft Article on Variant Type Constants](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-oaut/3fe7db9f-5803-4dc4-9d14-5425d3f5461f)

    [Wiki on Variant Types for COM](https://en.wikipedia.org/wiki/Variant_type_(COM))

### Python Code Examples
=== "Main"

    ```python
    def main():
        SmApi = wincl.DispatchEx("System Monitor API")

        # setRlcDetails(SmApi)
        # getValue1AxisMap(SmApi)
        # getAppDetails(SmApi)
        SendMessage(SmApi)

        SmApi = None
    ```

=== "setRlcDetails"

    ```python
    def setRlcDetails(SmApi):
        data = {
            "Car": "Miata",
            "Driver": "Zack",
            "Circuit": "Suzuka",
            "Race/Test": "Race",
            "Weather": "Splendid",
            "Notes": "Zoom Zoom",
        }

        for key, value in data.items():
            lErr = SmApi.SetRemoteSessionDetail(key, value)
            print(f"Error code: {lErr}")
    ```

=== "getValue1AxisMap"

    ```python
    def getValue1AxisMap(SmApi):
        szIdent = "FMa_IgnStart"
        adValue = wincl.VARIANT(pythoncom.VT_VARIANT | pythoncom.VT_BYREF, [])

        wAppId = 20737
        lErr = SmApi.GetValue1AxisMap(wAppId, szIdent, adValue)

        if lErr == 0:
            print(f"adValue = {adValue}")  # Ex: win32com.client.VARIANT(16396, (15.0, 15.0, 15.0, 15.0, 18.0))
            print(adValue.value)  # Ex: (15.0, 15.0, 15.0, 15.0, 18.0)
            print(adValue.value[0])  # Ex: 15.0
        else:
            print(f"Error code: {lErr}")
    ```

=== "getAppDetails"

    ```python
    def getAppDetails(SmApi):
        pawAppIds = wincl.VARIANT(pythoncom.VT_VARIANT | pythoncom.VT_BYREF, [])
        pastrAppNames = wincl.VARIANT(pythoncom.VT_VARIANT | pythoncom.VT_BYREF, [])
        lErr = SmApi.GetAPPDetails(pawAppIds, pastrAppNames)

        if lErr == 0:
            print(f"App IDs: {pawAppIds.value}")  # Ex: (20737, 20738, 20736)
            print(f"App Names: {pastrAppNames.value}")  # Ex: ('TAG510App1', 'TAG510App2', 'TAG510BIOS')
        else:
            print(f"Error code: {lErr}")
    ```

=== "SendMessage"

    ```python
    def SendMessage(SmApi):
        TAG510_APP1_AP_ID = 0x10
        COM_SM_USER_MSG = 0xAF

        # Build message 10AF 200D 0063
        message_in_words = [
            (TAG510_APP1_AP_ID << 8) + COM_SM_USER_MSG,  # 0x10AF | (high_byte << 8) + low_byte
            0x200D,  # Set Lap Number single message
            0x0063  # Value to set, 0x0063 == 99
        ]

        wAppId = 20737  # TAG-510 App1 ID
        rSendMessage = wincl.VARIANT(pythoncom.VT_ARRAY | VT_I2, message_in_words)
        pReplyMessage = wincl.VARIANT(pythoncom.VT_VARIANT | pythoncom.VT_BYREF, [])
        wTimeout = 1000  # ms

        lErr = SmApi.SendMessage(wAppId, rSendMessage, pReplyMessage, wTimeout)

        if lErr == 0:
            print(f"Reply Message: {pReplyMessage.value}")
        else:
            print(f"Error code: {lErr}")
        
    ```

## Error Codes
All functions return a signed short error code; 0 indicating success and negative values indicating error codes.

| Error Code | Description |
|-------------|-----------|
| 0 | No error, function successful |
| -1 | No project loaded in SM-V7 |
| -2 | No licence for requested function |
| -3 | Non-specific error |
| -4 | Data version mismatch |
| -5 | No data version loaded |
| -6 | No program version loaded |
| -7 | No ECU connected |
| -8 | Invalid file specified |
| -9 | The open project does not cover the specified application |
| -10 | Application must be active in order to support this operation |
| -11 | Operation not allowed while live updates are on |
| -12 | This command only valid for TAGtronic systems. |
| -13 | SM cannot accept APIcalls at the moment (might be in critical operation). |
 
!!! info
    Note: The range -20 to -36 is reserved for errors in the variant arguments supplied to the SendMessage call.
 
| Error Code | Description |
|-------------|-----------|
| -20 | Type mismatch in argument of SendMessage, expected array of WORDs passed by reference |
| -21 | Array dimension mismatchin argument of SendMessage, expected a 1-dimensional array |
| -22 | Lower bound of argument of SendMessage call was not 0 |
| -23 | Unexpected error getting bounds of SendMessage argument |
| -24 | Error in ReplyMessage argument |
| -25 | Error in SendMessage argument |
| -26 | Virtual Parameter contains invalid FDL. |
| -27 | Conversion for Parameter does not exist/is invalid. |
| -28 | Parameter name does not exist/is invalid. |
| -29 | Parameter exists and not allowed to override. |
| -30 | Request cannot be actioned as incorrect SM state. |
| -31 | Command passed to SM is not valid. |
| -32 | Missing document or similar |
| -33 | Memory allocation failed |
| -34 | Operation only partially complete. Example: ClearRemoteParams left Parameters used in trigger conditions. |
| -35 | Indicates the current document (config) is full. |
| -36 | Parameter Identifier already exists in another application. |
| -37 | Parameter is read-only- write access denied. |
| -38 | Parameter is non-live tuneable- write access denied. |
| -39 | Requested group is not found |
| -40 | Previous virtual parameters file has been modified and not saved |
| -41 | No customer base found for the project being opened |
| -42 | Requested parameter not found |
 
!!! info
    Note: The range -100 to -199 is reserved for errors returned by parameter get/set value functions.
 
| Error Code | Description |
|-------------|-----------|
| -100 | Specified parameter does not exist in current program version |
| -101 | Tried to set a read-only parameter  |
| -102 | Tried to set a parameter outside its limits |
| -103 | Axis monotony restrictions not adhered to |
| -104 | Tried to get or set parameter or axis value at invalid breakpoint |
| -105 | Parameter had invalid address |
| -106 | String containing non-numeric characters supplied to set function |
| -107 | Exceeded specified size or array or string parameter |
| -108 | Live tune enabled, failed to update value in ECU |
| -109 | Tried to get interpolated value but no input quantity or axis points |
| -110 | No active live autotune "layer" (group) |
| -111 | Operating point isoutside breakpoint tolerances (e.g. for live auto tune) |
| -112 | Number of axis breakpoints has changed between program versions |
| -113 | Parameter is not modifiable in live tune area (warning only, not error) |
| -114 | The attempt to validate the value in the unit failed (not the same as the value being invalid) |
| -116 | Serial number not found for sensor channel |
| -117 | An unknown error |
| -118 | Attempt to set value cancelled (by user or because of invalid input) |
| -119 | Access denied, parameter locked by RDA |
| -120 | Value set does notmatch value in the unit |
| -200 | Session detail does not exist |
| -201 | Failed to dump row data |
| -300 | Failed to enter live tune |
| -301 | Failed to go online |
| -302 | Failed to download data |
| -303 | System monitor is only running in OLE mode, hence can't perform requested action |
| -304 | Attempt to access alocked parameter |
 
!!! info 
    Note: The range -10000 to -1000 is reserved for System Monitor comms, internal CA-Card, Ethernet or ECU errors which may be returned by a SendMessage call.
 
| Error Code | Description |
|-------------|-----------|
| -5096 | There is a communication problem that is unknown |
| -5097 | General timeout during communications |
| -5098 | Link to ECU not OK |
| -5099 | CA-Card code failed to load |
| -5100 | Failed to open the CA-Card device driver |
| -5101 | Failed to close the CA_Card device driver |
| -5102 | DPC area is blank -CA-Card code is not running |
| -5103 | DPR CaPc buffer is full - incoming messages have been lost |
| -5104 | Driver Kernel buffe ris full - incoming messages have been lost |
| -5105 | The driver has timed out waiting for some data |
| -5106 | There is no card in the machine |
| -5107 | Receive buffer to DeviceIoControl is too small |
| -5108 | The CA-Card code has been loaded but has crashed |
| -5109 | IOCTL_CA125_CASEND not enough data returned |
| -5110 | IOCTL_CA125_CAREAD not enough data returned |
| -5111 | Attempt to send more data than the CA-Card said it can accept |
| -5112 | The CA-Card has given more data than it said it would |
| -5113 | Error response to MESSAGE_ID_SETUP_SESSION message |
| -5114 | Error response to MESSAGE_ID_OPEN_SESSION message |
| -5115 | Error response to MESSAGE_ID_CLOSE_SESSION message |
| -5116 | Error response to MESSAGE_ID_SEND_SESSION message |
| -5117 | Error response to MESSAGE_ID_RECEIVE_SESSION message |
| -5121 | CA-Session in use |
| -5123 | Failed to resolve the address for the session |
| -5124 | User cancelled the operation |
| -5125 | Data on the unit is not as expected |
