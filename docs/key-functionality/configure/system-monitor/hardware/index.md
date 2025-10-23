## PC requirements

| Component | Minimum | Recommended |
|---|---|---|
| **Processor** | Intel Core Duo, 2 GHz | Intel Core i7 |
| **Memory** | 1 GB | 8 GB or more |
| **Disk space** | HDD with 200 GB free | High-capacity SSD (512 GB+) |
| **Operating system** | Windows 10 | Windows 10 |
| **Installation / data transfer** | CD‑ROM drive, FTP site | CD‑ROM drive, FTP site |
| **Power supply** | Rapid battery recharge recommended (not trickle charge) while applications are running | Rapid battery recharge recommended (not trickle charge) while applications are running |

## Adjustment board

The Adjustment Board is a box with four high‑precision rotary switches. System Monitor can map each switch to a Measurement Parameter (used as an Index Parameter in a 1‑axis or 2‑axis map) or to a scalar editable parameter. This lets operators adjust control values by feel while watching System Monitor and other instruments.

All controls operate the same; the knobs differ in size to aid identification. Turning clockwise increases the assigned parameter; turning counter‑clockwise decreases it.

### Configuration

To configure the Adjustment Board:

1. Open the **Pot Board Configuration** dialog:
   - Navigate to `Tools > Pot Board > Configure`
   - Shortcut: `CTRL + SHIFT + F1`

2. Assign parameters to controls:
   - Drag parameters from the **Parameter Explorer** to the corresponding row in the configuration window.
   - Each row corresponds to a labelled control on the board.

3. Remove assignments:
   - Right-click a parameter in the configuration window and select **Remove**.

4. Assign a control to the **Maths Bar**:
   - Right-click a row and select **Maths Bar**.
   - Turning the assigned control adjusts the selected editable parameter.

### Adjustment Groups

Parameters are assigned in groups of four, matching the four physical controls on the board. These groups are defined in the `Pot.ini` file used during program version creation.

- The active group is selected in the **Adjustment Board Configuration** dialog.
- Group names and assignments can be edited in the **Adjustment Board Groups** dialog.

### Supported Parameter Types
- **Scalar Editable Parameters**: Turning a knob is equivalent to changing the parameter value manually.
- Each parameter includes an **Adjustment Properties** tab to define:
  - **Step size**
  - **Zero value**

### Keyboard Operation

The keyboard can replicate Adjustment Board functionality:

- **Increase value**:
  - Hold `CTRL` and press a number key (1–4)
- **Decrease value**:
  - Hold `CTRL + SHIFT` and press a number key (1–4)

> Use the number keys on the main keyboard, not the number pad.

Step size is defined in the **Adjustment Sheet** of the Parameter Properties.

### Pot Board Properties

To configure the connection between System Monitor and the Adjustment Board:

1. Open the **Window Properties** dialog:
   - Shortcut: `ALT + Enter`
2. Navigate to the **Pot Board** tab.
3. Select connection type:
   - **CA Card**
   - **Serial Port** (COM1 or COM2)

> The serial port is configured automatically to suit the board, regardless of Windows settings.

### Adjustment Board Menu Commands

Located under `Tools > Pot Board`:

- **Configure**: Opens the configuration dialog (`CTRL + SHIFT + F1`)
- **Enable**: Activates the controls (`CTRL + SHIFT + F2`)
- **Reset Adjustments**: Function depends on parameter type (`CTRL + SHIFT + F3`)
- **Recent Files**: Lists recently opened configuration files

### Available types

#### VE‑80
- Passive device using dedicated connections on the CA‑card.
- Connection details are in the CA‑card product specification.
- No separate power supply required.
- In the Adjustment Board Configuration dialog, select **CA Card** on the Link panel.

#### VE‑81
- Active device connected via an RS‑232 serial port.
- Connect the VE‑81 to an RS‑232 port on the PC using the supplied cable.
- Connect the provided power supply to the VE‑81 and a suitable AC outlet. The rear LED flashes once per second when the unit is powered and transmitting.
- In the Adjustment Board Configuration dialog, select **Serial Port** on the Link panel and choose the COM port (e.g., COM1 or COM2).

!!! note
    The Adjustment Board is often called a "Pot" or "Potentiometer Board." This is not strictly accurate: a potentiometer gives an absolute output for a given position, whereas the rotary switches on the Adjustment Board produce a pulse train and direction. Switch position has no absolute value.

## CAN link

CAN (Controller Area Network) is a serial data protocol originally developed for automotive use and now common in industrial applications. The protocol is defined in ISO 11898.

Key characteristics:

- Access is controlled by non‑destructive, bit‑wise arbitration.
- Messages are compact (up to eight data bytes) and include a checksum.
- Messages carry numeric identifiers rather than explicit addresses; the identifier determines priority and can indicate message content.
- Robust error handling retransmits messages if necessary.
- Faults are isolated and faulty nodes are removed from the bus.

System Monitor can be used to configure an ECU or data logger to interpret sensor data on a CAN link.
