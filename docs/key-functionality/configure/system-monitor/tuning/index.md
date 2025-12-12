# Tuning Overview

Tuning is the process of optimising vehicle performance by adjusting the values of **Editable Parameters** within the ECU (Engine Control Unit). These adjustments can be made in several modes depending on the setup and workflow.

## Tuning Modes
### Off-line Tuning
- Changes are saved in a **New Data Version**.
- The ECU does **not** need to be connected during editing.
- Changes are downloaded to the ECU at a later time.

### On-line Tuning
- The ECU is connected to **System Monitor** during editing.
- Changes can be sent immediately using **Live Tune** or on demand.

### Automatic Tuning
- System Monitor can operate with an automatic **Testbed**.
- Supports the **AVL PUMA** protocol for unattended engine tuning.

## [Adjustment Board](../hardware/index.md/#adjustment-board)

To simplify value adjustments, an **Adjustment Board** can be connected to System Monitor. This allows physical control over parameter changes using potentiometers. 