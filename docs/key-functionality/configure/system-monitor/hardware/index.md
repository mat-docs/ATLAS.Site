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
