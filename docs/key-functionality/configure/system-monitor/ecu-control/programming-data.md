# Programming & Data Management

This section covers how System Monitor handles ECU programming, data versioning, and synchronisation between the Edit Buffer and the ECU.

---

## Reprogramming the ECU

The ECU ROM contains:

- **Program**: Controller programs from the Program Version file.
- **Data**: Editable parameters stored in a Data Version file.
- **Configurations**: Includes remote logging, burst logging, sensor calibration, and external inputs.

### Reprogramming Steps

1. Select: `ECU > Reprogram Unit`
2. Choose applications in the dialog box
3. Optionally enable **Merged program sequences**
4. Click **OK** to begin

> ⚠️ **Caution**: Cancelling mid-process may leave the ECU in an inconsistent state.

### Reprogram All

- Reprograms all code and data areas for all applications
- Downloads logging configuration
- One-stop reprogramming facility

---

## Force Complete Reprogram

- Select: `Tools > Force Complete Reprogram`
- Downloads all program code, data, and configurations regardless of changes
- Intended for embedded code diagnostics

---

## Data Changes in the ECU

Changes made during tuning are stored in the **Edit Buffer**.

### Live Tune Modes

- **Live Tune On**: Changes are immediately loaded into RAM
- **Live Tune Off**: Changes are stored in the Edit Buffer and must be downloaded manually

> Note: Changes only affect RAM. ECU must be running from RAM to apply them.

---

## Downloading Data to the ECU

Synchronises RAM with the Edit Buffer.

- Select: `ECU > Download Data Changes`

### If mismatches are detected:

- **Sync SM to Unit**: Load ECU files into System Monitor
- **Reprogram**: Reprogram ECU and download changes
- **Force Complete Reprogram**: Full reprogram and download
- **Ignore**: Skip changes
- **Cancel**: Abort process

---

## Uploading Data from the ECU
- Select: `ECU > Upload Data`
- Loads ECU Data Version into the Edit Buffer
- Prompts user to save as a new Data Version file

---

## Undo Data Changes

Three options available:

- **Undo in Unit**: Reverts changes in ECU only
- **Undo in Unit and Edit Buffer**: Reverts both
- **Undo in Edit Buffer**: Reverts changes in System Monitor only

> Note: Undo only works for changes made since the last save.

---

## Reset ROM

- Overwrites Edit Buffer with original Data Version
- Reprograms ECU with Edit Buffer contents
- Copies Data Version from ROM to RAM

