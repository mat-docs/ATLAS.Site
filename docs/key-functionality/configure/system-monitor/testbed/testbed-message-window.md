# Testbed Message Window

The **Testbed Message Window** displays real-time communication between System Monitor and the PUMA testbed. It provides visibility into commands, parameters, and status messages exchanged during operation.

## Accessing the Message Window

Navigate to:  
`Tools > Testbed > Message Window`  
Or use the shortcut: `CTRL+SHIFT+F7`

## Window Components

### Parameters Bar

Displays the configuration of the current data acquisition block:

- **Params**: Number of parameters in the block
- **Rate**: Frequency at which parameters are requested

> See also: `puma-commands-data-acquisition.md`

### Message Window Sections

- **Commands**: Mnemonics received from the testbed (e.g. `Select Parameters for Acquisition`)
- **Arguments**: Details associated with a command (e.g. `Rate: 1s Params: Speed, Gear, Revs`)
- **Messages**: Mnemonics sent in reply (e.g. `Reply to Acquire Parameters`)
- **Parameter**: Identifiers and values (in engineering units) associated with messages
- **Debug**: When enabled, shows repeated messages and acknowledgements
- **Watchdog**: Displays timeout events:
  - **Byte timeout** (`<bto>`)
  - **Message timeout** (`<mto>`)

## Status Bar Indicators

- **Link**:
  - `enabled`: Link selected, no bytes received
  - `disabled`: Link not selected
  - `active`: Link selected, bytes received
  - `inactive`: Link selected, message timeout occurred

- **Bytes**: Number of bytes since the last `Init` command
- **Message**:
  - `waiting`: Awaiting command
  - `received`: Command received, reply pending
  - `confirmed`: Confirmation sent, reply pending
  - `replied`: Reply sent, awaiting handshake
  - `repeat`: Awaiting command repetition due to byte timeout
- **Last Error**: Displays the most recent error, even if the link has recovered
