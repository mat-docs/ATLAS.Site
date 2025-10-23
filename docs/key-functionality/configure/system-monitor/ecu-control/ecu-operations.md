# ECU Operations

## Applications

An Application in System Monitor corresponds to a set of ECU memory locations. Most ECU Control commands operate on the **Active Applications**.

- Some commands (e.g. setting time/date, ECU properties, ECU search) operate on **one application at a time**.
- Others (e.g. reprogramming, uploading sensor sets) can operate on **multiple applications**.

### Selecting Applications

- When a command requires a single application, a dialog box prompts the user to select one.
- For multi-application commands, checkboxes allow selection of multiple applications. By default, all active applications are selected.

---

## Online & Offline Modes

The ECU must be **On-Line** to:

- Display or log measurement parameters
- Respond to live tuning changes
- Operate with a testbed

### Going Online

- Select: `ECU > On-line`
- If the link is not OK, the ECU will go online once the link is detected.
- Link status is shown in the **Comms Bar**.

### ECU On-Line Behaviour

- Comms Bar shows “Monitor ON”
- Program stamps are read from ROM
- If mismatched, a message box offers:
  - **Reprogram**
  - **Ignore**
  - **Cancel**

Advanced Settings can suppress this warning.

### ECU Off-Line Behaviour

- Comms Bar shows “Monitor OFF”
- Data acquisition and logging stop
- Testbed link is disabled

---

## Kill Engine

Stops the engine or prevents it from starting.

- Select: `Tools > Kill Engine` (Shortcut: `ALT+K`)
- Sends a continuous message (0x01a) every 200ms
- Acknowledgement status:
  - **Red**: acknowledged
  - **Yellow**: no acknowledgement for 2s

To re-enable the engine: click **Enable**, or press `ENTER` or `ESC`.

---

## Cursor Control & Trace

Used in 1-axis or 2-axis maps during tuning.

- **Cursor Control**: Automatically selects the active cell for editing.
- **Trace**: Outlines all cells that have been active since Trace was enabled.

Only available when the ECU is On-Line.

---

## Single Message

Allows sending a single message to the ECU and viewing the response.

### How to Use

- Select: `Tools > Single Message`
- Enter message as hexadecimal word values
- Configure:
  - **Comms Path**
  - **Timeout**
  - **Repeat settings** (interval, number)

### Response Panel

- Displays response content, word count, and status:
  - **OK**: response received
  - **Link NOK**: ECU not connected
  - **Timeout**: no response

Optionally display all responses or only those for System Monitor.
