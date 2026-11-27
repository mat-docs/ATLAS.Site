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
| `0x41` | Delete errors | Clears error values. Your application's Clear errors handler is called. |
| `0x42` | Delete min/max | Clears min and max values. Your application's Clear min/max handler is called. |
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

Custom messages let System Monitor (or anything that sends SM messages) talk directly to your own application. Use message ID `0xAF` (customer message 1) or `0xB0` (customer message 2); the message can be any length after word 0.

The BIOS replies OK and passes the message to your application's custom message handler, which can add data to the reply. If your application has no handler, the BIOS still replies OK.

### vTAG Server control messages

vTAG Server itself responds to the following custom messages, which you can send from System Monitor to control processing:

| Message | Response | Function |
|---|---|---|
| `10AF 0000` | `07F0 00AF` | Start processing |
| `10AF 0001` | `07F0 00AF` | Stop processing |
| `10AF 0002` | `07F0 00AF xxxx` | Rerun process percentage, where `xxxx` is the percentage complete in hex (for example `07F0 00AF 000C` = 12%) |
| `10AF 0003` | `07F0 00AF` | Reset the vECU |

## BIOS–application interface

The BIOS loads each vTAG application, calls it at its model step rate, and passes it the SM messages that concern it. Your application can provide the following handlers; any it does not provide are simply not called.

| Handler | Called when |
|---|---|
| Initialise | The application is started. |
| Step | Every model step, at the application's step rate, while it is running. Applications are stepped before the BIOS so that logging is correct. |
| Terminate | The application is stopped. |
| Configuration data written | System Monitor has written configuration (tune) data. The handler is given the address and number of bytes that changed. |
| Clear errors | System Monitor sends Delete errors (`0x41`). |
| Clear min/max | System Monitor sends Delete min/max (`0x42`). |
| Custom message | A custom message (`0xAF` or `0xB0`) arrives. |
| Background, Synchro | Any application asks the BIOS to trigger background or synchro processing. |

The BIOS provides these functions to your application:

| Function | Description |
|---|---|
| Log event | Logs an event in the BIOS event log. |
| Trigger synchro | Calls the Synchro handler in every application. |
| Trigger background | Calls the Background handler in every application. |

### Replying to a custom message

When your custom message handler is called, the BIOS has already filled in the first two reply words (`07` + your response ID, then OK status + message ID). To return data, write it into the reply from word 2 onwards and set the reply length in bytes; for example, one word of data gives a length of 6.

## Related pages

- [Operating vTAG Server](operating-vtag.md)
- [Getting Started with vTAG Server](getting-started.md)
- [System Monitor](../../configure/system-monitor/getting-started/index.md)
