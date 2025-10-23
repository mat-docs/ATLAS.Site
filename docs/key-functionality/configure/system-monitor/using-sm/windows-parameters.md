## Windows

System Monitor supports multiple window types for displaying and interacting with parameters.

### Editable Windows
Used to view and modify calibration parameters. These windows display parameter names, current values, units, and status indicators. Changes can be made directly in the value fields.

### Measurement Windows

Used to monitor real-time data from sensors and ECUs. These windows can display values numerically or graphically (e.g. strip charts, bar graphs).

### Creating Windows

New windows can be created via the Desktop menu. Users can choose the window type and assign parameters during creation.

### Window Properties

Each window has configurable properties:
- **Title**: Custom name for the window
- **Colours**: Background and text colour settings
- **Axis Settings**: For graphical windows, axis ranges and labels can be defined
- **Update Rate**: Determines how frequently data is refreshed

### Window Types

- **Numeric Display**: Shows parameter values in a grid
- **Strip Chart**: Plots values over time
- **Bar Graph**: Displays values as vertical bars
- **Gauge**: Simulates analogue gauge behaviour
- **Status Indicator**: Shows boolean or state-based parameters

## Parameters
Parameters are central to System Monitor’s functionality. They are either editable (calibration) or measurement (read-only).

### Editable Parameters

Editable parameters can be modified and sent to the ECU. They include:
- **Name**
- **Current Value**
- **Units**
- **Limits**
- **Status** (e.g. locked/unlocked)

Changes are made in editable windows and transmitted via the ECU menu.

### Measurement Parameters
These are read-only values received from the ECU or sensors. They are used for monitoring system behaviour and performance.

### Parameter Properties
Each parameter includes metadata:
- **Data Type**: Integer, float, boolean, etc.
- **Units**
- **Conversion**: Raw to engineering units
- **Update Rate**
- **Display Format**

### Virtual Parameters
Users can define virtual parameters using mathematical expressions. These are useful for derived metrics or combining multiple inputs.

### Parameter Explorer

A tool for browsing all available parameters. Supports filtering by name, type, and source. Parameters can be dragged into windows for display or editing.
