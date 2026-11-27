# vTAG Server BIOS and SM Messages

This page lists the System Monitor (SM) messages that the vTAG Server virtual ECU (vECU) responds to, and describes the interface between the vTAG BIOS and the applications (models) it runs. Use it when you need to control a vTAG application from System Monitor, or when you write an application that handles its own SM messages.

## How SM messages reach vTAG Server

The vTAG Server vECU contains a BIOS (application 0) and up to 15 applications. System Monitor talks to it the same way it talks to a physical unit:

- **Word 0 of a request** is `<controller><message ID>`. The high byte is the controller ident, the low byte is the message ID. The BIOS is controller `0x10`; applications use `0x11` onwards (`0x10` + application number). `0xFF` addresses all controllers.
- **Word 0 of a reply** is `07F0`. When the message is handled by an application, the low byte is that application's response ID instead of `F0`.
- **Word 1 of a reply** is `<status><message ID>` — the status code (see [Reply status codes](#reply-status-codes)) followed by an echo of the message ID.

A message ID that the BIOS does not support is rejected with status `01` (not OK), and the BIOS logs event `0x1000` with the rejected message ID. A message with the wrong length is rejected with status `09`.

## Supported SM messages

The vTAG BIOS handles the following SM messages when an application is running.

| ID | Message | What it does |
|---|---|---|
| `0x00` | Enter programming mode | Switches the vECU to programming (boot) mode, for example when System Monitor reprograms the unit. |
| `0x01` | Leave programming mode | Leaves programming mode. |
| `0x10` | Read memory | Reads a memory area. |
| `0x14` | Read error | Reads an 8-word error block. |
| `0x20` | Copy ROM to RAM | Copies configuration data from ROM to RAM. |
| `0x2F` | Data logger transfer | Data logger upload (transfer) message. |
| `0x31` | Write RAM | Writes to RAM. |
| `0x32` | Write text | Write text command. |
| `0x35` | Write configuration data (word) | Writes configuration (tune) data. |
| `0x36` | Write configuration data (block) | Writes configuration (tune) data. |
| `0x37` | Read configuration data (word) | Reads configuration data. |
| `0x38` | Read configuration data (block) | Reads configuration data. |
| `0x41` | Delete errors | Clears error values. The application's `pfnClearErrors` callback is called. |
| `0x42` | Delete min/max | Clears min and max values. The application's `pfnClearMinMax` callback is called. |
| `0x45` | Select tune | Selects a tune. |
| `0x48` | Data log | Erases logging memory. |
| `0x49` | Transfer mode | Heartbeat message. |
| `0x56` | Data acquisition control | Sets logging start/stop triggers. Only sub-code `0` is supported: word 2 is a channel bitmask, where a set bit sets that channel's start trigger and a clear bit sets its stop trigger. Any other sub-code is rejected with status `01`. |
| `0x60` | Transmit acquisition configuration | Sends the acquisition (logging) configuration. |
| `0x6F` | Identify | SM identify. |
| `0xAF` | Customer message 1 | Passed to an application. See [Custom messages](#custom-messages). |
| `0xB0` | Customer message 2 | Passed to an application. See [Custom messages](#custom-messages). |
| `0xB1` | Get address | Get address message. |
| `0xB2` | Resource lock | Resource lock message. |
| `0xB5` | ATLAS Ethernet telemetry | ATLAS Ethernet telemetry command. |
| `0xB8` | Extended read memory | Extended read memory command. |
| `0xB9` | Extended read configuration data block | Extended read configuration data command. |

### Programming mode messages

While the vECU is in programming (boot) mode, only these messages are accepted: `0x00`, `0x01`, `0x10`, `0x12` (programming block size), `0x31`, `0x32`, `0x6F`, `0xB2` and `0xB3` (program block). Any other message is rejected with status `07` (not recognised in boot mode).

### Messages not supported on vTAG Server

Any SM message that is not in the tables above is rejected. This includes messages that physical units support but that have no meaning on a virtual ECU, for example:

| ID | Message |
|---|---|
| `0x18` | Hardware test |
| `0x1E` | CBT test |
| `0x4B` | Set clock |
| `0x7E` | FIA address |
| `0x90` | Track tune |
| `0x91` | Tune button |
| `0xA4` | MII test |

### Reply status codes

| Status | Meaning |
|---|---|
| `00` | OK — task successfully finished |
| `01` | Not OK |
| `02` | Task in progress |
| `05` | Request rejected |
| `07` | Command not recognised in boot (programming) mode |
| `09` | Command length not correct |
| `0B` | Address not within valid range |
| `0C` | Command ident invalid |
| `0D` | Timeout on message response |
| `42` | RAM tune currently inoperable |
| `44` | Attempt to access an invalid slot |

## Custom messages

Custom messages let System Monitor (or anything that sends SM messages) talk directly to your own application. The message can be any length after word 0.

- Message ID `0xAF` (customer message 1) is passed to application 1.
- Message ID `0xB0` (customer message 2) is passed to application 2.

The BIOS sets up the reply header and an OK status first, then calls the application's `pfnSMMsg` callback with the received buffer and the reply buffer. If the application does not provide `pfnSMMsg`, the BIOS still replies OK. See [Handling a custom message in your application](#handling-a-custom-message-in-your-application).

### vTAG Server control messages

vTAG Server itself responds to the following BIOS custom messages, which you can send from System Monitor to control processing:

| Message | Response | Function |
|---|---|---|
| `10AF 0000` | `07F0 00AF` | Start processing |
| `10AF 0001` | `07F0 00AF` | Stop processing |
| `10AF 0002` | `07F0 00AF xxxx` | Rerun process percentage, where `xxxx` is the percentage complete in hex (for example `07F0 00AF 000C` = 12%) |
| `10AF 0003` | `07F0 00AF` | Reset the vECU |

Any other value in word 1 is ignored and the reply is OK.

## BIOS–application interface

A vTAG application is a DLL that the BIOS loads and runs. The interface is defined in `BIOSEntry.h` (interface version `BIOS_ENTRY_VER` 2), which is supplied with the vTAG build tools.

### What the application DLL exports

| Export | Type | Purpose |
|---|---|---|
| `dllInit` | `void dllInit(void)` | Called first, when the BIOS loads the DLL. |
| `stAppInfo` | `stAppInfo_t` | Describes the application and holds the callbacks the BIOS calls. |
| `pstBIOSAPI` | `stBIOSAPI_t *` | The BIOS writes a pointer to its API here before it initialises the applications. |

The BIOS only accepts the application if `stAppInfo.wCtrlID` is a valid application controller ident (`0x10` onwards). The application number is `wCtrlID - 0x10`.

### Application identity and data (`stAppInfo_t`)

| Field | Type | Description |
|---|---|---|
| `dwAppInfoVersion` | `dword` | Version of this structure. |
| `wCtrlID` | `word` | SM controller ident of the application (`0x10` + application number). |
| `wRespID` | `word` | SM response ID. Used as the low byte of word 0 in replies from this application. |
| `wRowMsgID` | `word` | Row data message ID. |
| `szModelName` | `char[256]` | Model name. |
| `dfModelStep` | `double` | Step period of the model, in seconds. The BIOS calls `pfnModelStep` at this rate. |
| `pstMasterCfgBlk`, `pstCodeCfgBlk`, `pstDataCfgBlk` | pointers | Configuration (tune) data areas, accessed by the configuration data SM messages. |
| `pwRowDataStart`, `pwNVRowDataStart` | `word *` | Row data areas. |
| `dwNumSourceParameters`, `pstSingleSharedData` | `dword`, `stSingleSharedData_t *` | Input parameters supplied from ATLAS. |
| `dwNumOutputParameters`, `pstOutputData` | `dword`, `stOutputData_t *` | Output parameters the application publishes. See [Output parameters](#output-parameters-stoutputdata_t). |
| `pstBIOSStatus` | `stBIOSStatus_t *` | BIOS status: memory allocated, memory used, logging bytes per second, logging state. |
| `qwCurrentSeqNo` | `qword` | Current sequence number (time). |
| `eATLASDataSource` | `eATLASDataSource_t` | Whether the data source is live, historical or has no data. |

### Callbacks the BIOS calls in your application

Set these in `stAppInfo`. Any you leave `NULL` are not called.

| Callback | Called when |
|---|---|
| `void (*pfnModelInitialise)(void)` | The application is initialised. |
| `void (*pfnModelStep)(void)` | Every model step, at the rate set by `dfModelStep`, while the application is running. Applications are stepped before the BIOS so that logging is correct. |
| `void (*pfnModelTerminate)(void)` | The application is stopped. |
| `void (*pfnStatusOutput)(char *pszStatus)` | The BIOS outputs a status message. |
| `void (*pfnvWriteToCfgDataCallback)(dword dwAddress, dword dwNBytes)` | System Monitor has written configuration (tune) data. `dwAddress` and `dwNBytes` give the area that changed. |
| `void (*pfnClearErrors)(word wFlags)` | System Monitor sends Delete errors (`0x41`). |
| `void (*pfnClearMinMax)(word wFlags)` | System Monitor sends Delete min/max (`0x42`). |
| `void (*pfnBackground)(void)` | Any application calls `pfnTriggerBackground`. |
| `void (*pfnSynchro)(void)` | Any application calls `pfnTriggerSynchro`. |
| `void (*pfnSMMsg)(DataBuffer_t *pstRxBuffer, DataBuffer_t *pstTxBuffer)` | A custom message (`0xAF` or `0xB0`) arrives for this application. |

The remaining function pointers in `stAppInfo_t` (`pfnBIOSInit`, `pfnBIOSStep`, `pfnBIOSComms`, `pfnBIOSTerminate`, `pfnBIOSControl`) are used only by the BIOS itself. `pfnLapTrigger` is reserved. Leave these `NULL` in your application.

### Functions the BIOS provides to your application (`stBIOSAPI_t`)

Call these through the `pstBIOSAPI` pointer.

| Function | Description |
|---|---|
| `void (*pfnLogEvent)(const word wEventNumber, const word wData1, const word wData2, const word wData3)` | Logs an event in the BIOS event log. |
| `void (*pfnTriggerSynchro)(void)` | Calls `pfnSynchro` in every application. |
| `void (*pfnTriggerBackground)(void)` | Calls `pfnBackground` in every application. |

`pfnStatusOutput` and `pfnFindImportData` are present in the structure but are not provided by the vTAG Server BIOS (they are `NULL`). The `pfnSpare` entries are reserved.

### Handling a custom message in your application

When `pfnSMMsg` is called:

- `pstRxBuffer->pstDataBuffer->auMsgData` holds the received message. Word 0 is the message (for example `xxAF`), word 1 onwards is your data.
- The BIOS has already filled reply word 0 (`07` + your `wRespID`) and word 1 (`00` OK status + message ID), and set the reply length to 4 bytes.
- To return data, write it into the reply buffer from word 2 onwards and set `pstTxBuffer->wLength` to the total reply length in bytes. For example, one word of data gives a length of 6.

### Output parameters (`stOutputData_t`)

Each entry in `pstOutputData` describes one parameter your application publishes:

| Field | Description |
|---|---|
| `szParamName` (`char[64]`) | Parameter name. |
| `szUnits` (`char[20]`) | Display units. |
| `szFormat` (`char[20]`) | Display format. |
| `dfRate` | Model sink rate, in seconds. |
| `dwControlFlags` | Control flags. `OP_DATA_CONTROL_ENABLED` (`0x00000001`) enables the parameter. |
| `dfDisplayMin`, `dfDisplayMax` | Display limits. |
| `dfGain`, `dfOffset` | Scaling. |
| `dwMask` | Mask applied to non-float values before scaling. |
| `pvSignal` | Pointer to the source data. |
| `eDataType` | Data type of the samples. |

The other fields are set by the BIOS at run time.

## Related pages

- [Operating vTAG Server](operating-vtag.md)
- [Getting Started with vTAG Server](getting-started.md)
- [System Monitor](../../configure/system-monitor/getting-started/index.md)
