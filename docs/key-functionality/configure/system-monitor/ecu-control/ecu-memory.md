# ECU Memory

Electronic Control Units (ECUs) used in motorsport contain one or more controllers with access to two types of memory:

## RAM (Random Access Memory)

- **Volatile**: Requires power to retain data.
- **Editable**: Individual memory locations can be modified quickly.
- **Used for**: Live tuning and temporary data storage during tests.
- **Application RAM**: The portion of RAM System Monitor can modify, containing the Data Version.

### RAM Modification Methods

- Copying ROM to RAM
- Resetting ROM
- Downloading data to the ECU
- Live Tune

---

## ROM (Read Only Memory)

- **Non-volatile**: Data persists without power.
- **Programmable**: Can only be changed when ECU is Off-Line.
- **Used for**: Permanent storage of program code, configurations, and data versions.

### ROM Structure

Each controller’s ROM is divided into:

- **Program**: ECU controller programs
- **Data**: Editable parameters
- **Configurations**: Logging setups, sensor calibration, external inputs

---

## Switching Memory Modes

Most ECUs can operate from either RAM or ROM.

### Run from ROM

- Select: `ECU > Run from ROM`
- Applies to Active Applications only
- ECU Bar shows memory mode per application

### Run from RAM

- Select: `ECU > Run from RAM`
- Applies to Active Applications only
- Required for applying live tuning changes

---

## Copy ROM to RAM

Copies the Data Version from ROM to RAM.

- Select: `ECU > Copy ROM to RAM`
- Applies to Active Applications only
- ECU Bar shows software versions per application

---

## Reset ROM

Resets ECU data to match the ROM contents.

Steps:

1. Overwrites Edit Buffer with the original Data Version
2. Reprograms the ECU with the Edit Buffer contents
3. Copies Data Version from ROM to RAM

Applies to Active Applications only.

---

## Read RAM

Displays the contents of RAM for a selected controller.

- Select: `Tools > Read RAM`
- Multiple Read RAM windows can be opened

### Features

- Display formats: Hexadecimal, Decimal, Binary
- Status bar shows connection and logging status
- Data can be copied to clipboard or logged to file
- If ECU is Off-Line, values are frozen or shown as “?”

### Read RAM Properties

- **Comms Path**: Select if multiple ECUs share a network
- **Controller**: Choose which controller’s RAM to view
- **Start Address**: Must be hexadecimal and word-aligned
- **Format**: Hex, Decimal, Binary, Floating Point
- **Swap Bytes**: Reverses byte order
- **Data Only**: Hides address column
- **Logging**: Enable file logging and set filename

---

## Min/Max Statistics

Some Measurement Parameters store min/max values.

- Select: `ECU > Delete Min/Max`
- Resets these values to zero
- Applies to Active Applications only
- Requires permission from Customer Base Advanced Settings

