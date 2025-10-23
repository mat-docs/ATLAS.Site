# Input Signal Configuration

The Input Signal Configuration tool allows users to configure analogue and digital input signals from MESL units. It supports manual setup, scaling, and export/import of signal configurations.

## Overview

This tool enables:

- Manual configuration of analogue and digital inputs.
- Sampling of signal/sensor transfer functions.
- Export/import of input configurations.
- Offset recalculation.
- Overview of all input setups.
- Management of scaling, hardware, and filtering.

## Interface
The dialog consists of:

- A tree control (left): Lists channels.
- Output window (top right): Displays signal data.
- Tab controls (bottom): Configure each signal input.

> Options and scaling methods vary depending on the signal type and ECU capabilities.

## Supported Scaling Methods

- Interpolation Table
- Lookup Table
- Gain and Offset
- High and Low Sample Points
- Extrapolation
- Rotational
- Wheel Speed (Metric)
- Wheel Speed (US)

## Saving Changes

When the OK button is pressed:

- Modifications are written to the data version file.
- The file must be downloaded to the unit for changes to take effect.
- If signals were re-sampled, the logging configuration file must also be downloaded.

> File status can be viewed in the ECU Bar Display.

## Integration with ATLAS

All scaled measurement parameters appear in:

- A top-level menu called "Input Signals" in System Monitor.
- An "Input Signals" group within ATLAS logged data.

## Context Menu Options

Right-clicking a group or individual signal in the explorer tree provides:

- **Import Signal**: Load signal properties from a CSV file.
- **Export Signal**: Save signal properties to a CSV file.
- **Clear Signal**: Reset all values to zero.

> If you right-click a group header (e.g. AN01–AN12), the selected action applies to all signals in that group.