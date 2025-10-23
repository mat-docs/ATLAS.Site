# Live Tune
Live Tune enables real-time synchronisation between the **Edit Buffer** and the **ECU RAM**, allowing immediate application of parameter changes.

## Enabling Live Tune

To toggle Live Tune:
- Select `ECU > Live Updates`
- Status is shown on the **Comms Bar**

> Changes affect ECU RAM only. The ECU must be running from RAM for changes to take effect.

## Memory Mode

The ECU memory mode can be selected via:
- `Run from ROM`
- `Run from RAM`

> Live Tune is only available if permitted by the **Customer Base Advanced Settings**.


## Syncing and Reprogramming

When starting Live Updates, if the Data Version in the Edit Buffer differs from the ECU:

### Options
- **Sync SM to Unit**: Opens matching files in System Monitor.
- **Reprogram**: Reprograms ECU and downloads changes.
- **Force Complete Reprogram**: Performs full reprogram and downloads changes.
- **Ignore**: Skips changes for current application.
- **Cancel**: Aborts the process.


## Live Auto Tune

Live Auto Tune supports manual testbed tuning and works with Live Tune and the Adjustment Board.

### Definition File
- Defines a set of **Live Auto Tune Parameters**
- Each parameter includes:
  - A group of 2-axis maps
  - An adjustment parameter

### Typical Parameters
- Ignition
- Injection quantity
- Injection end angle
- Nominal lambda
- Boost pressure (for turbo engines)
- Waste gate control

### Tune Groups
- Maps are grouped by operating conditions:
  - Optimum Power
  - Minimum Consumption
  - Wet Racing

### Z Axis Selection
- Tune Group selection can be based on:
  - ECU calculation
  - Measurement parameter value
  - Driver input via cockpit switch


## Adjustment Application

During a test:
- Indexes and controls select a value on one of the maps.
- The **Adjustment Parameter** is applied to this value.
- If linked to the Adjustment Board, turning the control applies the adjustment.

### Correction Type
- Defined in the **Parameter Properties**

### Breakpoint Tolerances
- Override individual map tolerances
- Defined in the **Live Auto Tune Sheet**


## Saving Adjustments

To save changes:
- Select `ECU > Save Auto Tune Adjustment`
