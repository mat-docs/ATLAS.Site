
## Error Codes

The following error codes are returned by API functions. Use the macros `SMAPI_SUCCEEDED(Status)` to check if a return code indicates success (>= 0), or `SMAPI_FAILED(Status)` to check for failure (< 0).

### General Errors

| Code | Constant | Description |
|------|----------|-------------|
| 0 | `SMAPI_ERR_NONE` | No error |
| -1 | `SMAPI_ERR_NOPROJECT` | No project loaded |
| -2 | `SMAPI_ERR_NOLICENCE` | No licence for requested function |
| -3 | `SMAPI_ERR_NONE_SPECIFIC` | Non-specific error |
| -4 | `SMAPI_ERR_DATAVER_MISMATCH` | Data version mismatch |
| -5 | `SMAPI_ERR_DATAVER_NONE` | No data version |
| -6 | `SMAPI_ERR_PROGVER_NONE` | No program version |
| -7 | `SMAPI_ERR_NOECU` | No ECU |
| -8 | `SMAPI_ERR_FILE` | Invalid file specified |
| -9 | `SMAPI_ERR_NOAPP` | The open project does not cover the given application |
| -10 | `SMAPI_ERR_APP_INACTIVE` | Application must be active in order to support this operation |
| -11 | `SMAPI_ERR_LIVEUPDATESON` | Operation not allowed while live updates are on |
| -12 | `SMAPI_ERR_TAGONLY` | This command only valid for TAG systems |
| -13 | `SMAPI_ERR_SM_BUSY` | SM cannot accept API calls at the moment (might be in a critical operation) |

### Message Argument Errors

| Code | Constant | Description |
|------|----------|-------------|
| -20 | `SMAPI_ERR_MSGARGMISMATCH` | Type mismatch in argument of SendMessage. Pass a word array by reference |
| -21 | `SMAPI_ERR_MSGARGDIM` | Array dimension mismatch in argument of SendMessage. Pass a 1-d array |
| -22 | `SMAPI_ERR_MSGLOWERBOUND` | Lower bound of SendMessage argument was not 0 |
| -23 | `SMAPI_ERR_BOUNDERROR` | Unexpected error getting array bounds of SendMessage argument |
| -24 | `SMAPI_ERR_MSGREPLYARG` | Error in ReplyMessage argument |
| -25 | `SMAPI_ERR_MSGSENDARG` | Error in SendMessage argument |

### Parameter and State Errors

| Code | Constant | Description |
|------|----------|-------------|
| -26 | `SMAPI_ERR_FDL_NOT_PARSED` | Virtual parameter contains invalid FDL |
| -27 | `SMAPI_ERR_CONV_NOT_VALID` | Conversion for parameter does not exist/is invalid |
| -28 | `SMAPI_ERR_PARAM_NOT_VALID` | Parameter name does not exist/is invalid |
| -29 | `SMAPI_ERR_PARAM_EXISTS` | Parameter exists and not allowed to override |
| -30 | `SMAPI_ERR_BAD_STATE` | Request cannot be actioned as incorrect SM state  |
| -31 | `SMAPI_ERR_INVALID_CMD` | Command passed to SM is not valid |
| -32 | `SMAPI_ERR_NO_DATA_PRESENT` | Missing document or similar |
| -33 | `SMAPI_ERR_BAD_MEM_ALLOC` | Memory allocation failed |
| -34 | `SMAPI_ERR_PARTIALCOMPLETE` | Could not fully complete operation |
| -35 | `SMAPI_ERR_DOCUMENTFULL` | Indicates the current document (config) is full |
| -36 | `SMAPI_ERR_IDENT_EXISTS` | Parameter Identifier already exists in another application |
| -37 | `SMAPI_ERR_READ_ONLY` | Parameter read only - write access denied |
| -38 | `SMAPI_ERR_NON_LIVE_TUNEABLE` | Parameter non-livetuneable - write access denied |
| -39 | `SMAPI_ERR_GROUP_NOTFOUND` | Requested group not found |
| -40 | `SMAPI_ERR_FILE_NEEDS_SAVING` | Previous file needs saving before new one is opened |
| -41 | `SMAPI_ERR_FREQ_OVERRIDDEN` | The frequency set was overridden to the minimum frequency of the prime parameter |
| -42 | `SMAPI_ERR_NO_CUSTOMER_BASE` | No customer base found for the project being opened |
| -100 | `SMAPI_ERR_PARAMNOTFOUND` | Requested parameter not found |

### Editable Parameter Errors

| Code | Description |
|------|-------------|
| -100 | Specified parameter does not exist in current program version |
| -101 | Tried to set a read-only parameter |
| -102 | Tried to set a parameter outside its limits |
| -103 | Axis monotony restrictions not adhered to |
| -104 | Tried to get or set parameter or axis value at invalid breakpoint |
| -105 | Parameter had invalid address |
| -106 | String containing non-numeric characters supplied to set function |
| -107 | Exceeded specified size of array or string parameter |
| -108 | Live tune enabled, failed to update value in ECU |
| -109 | Tried to get interpolated value but no input quantity or axis points |
| -110 | No active live autotune "layer" (group) |
| -111 | Operating point is outside breakpoint tolerances (e.g. for live auto tune) |
| -112 | Number of axis breakpoints has changed between program versions |
| -113 | Parameter is not modifiable in live tune area (warning only, not error) |
| -114 | The attempt to validate the value in the unit failed (not the same as the value being invalid) |
| -116 | Serial number not found for sensor channel |
| -117 | An unknown error |
| -118 | Attempt to set value cancelled (by user or because of invalid input) |
| -119 | Access denied, parameter locked by RDA |
| -120 | Value set does not match value in the unit |

### Data Acquisition Errors

| Code | Constant | Description |
|------|----------|-------------|
| -200 | `SMAPI_ERR_DETAIL_UNKNOWN` | Session detail does not exist |
| -201 | `SMAPI_ERR_DUMPROW` | Failed to dump row data |

### ECU Control Errors

| Code | Constant | Description |
|------|----------|-------------|
| -300 | `SMAPI_ERR_LIVEUPDATE` | Failed to enter live tune |
| -301 | `SMAPI_ERR_ONLINE` | Failed to go online |
| -302 | `SMAPI_ERR_DOWNLOAD_DATA` | Failed to download data |

### OLE Errors

| Code | Constant | Description |
|------|----------|-------------|
| -303 | `SMAPI_ERR_SYSMONNOTRUNNING` | System monitor is only running in OLE mode, hence can't perform requested action |
| -304 | `SMAPI_ERR_PARAMETER_LOCKED` | Parameter locked |

### Communications Errors

| Code | Description |
|------|-------------|
| -5096 | There is a communication problem that is unknown |
| -5097 | General timeout during communications |
| -5098 | Link to ECU not OK |
| -5099 | CA-Card code failed to load |
| -5100 | Failed to open the CA-Card device driver |
| -5101 | Failed to close the CA-Card device driver |
| -5102 | DPC area is blank - CA-Card code is not running |
| -5103 | DPR CaPc buffer is full - incoming messages have been lost |
| -5104 | Driver Kernel buffer is full - incoming messages have been lost |
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
