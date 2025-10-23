# History Report

## History Report Files
History Report files are stored in the `\HistReps\` subdirectory of the Multi-Application Base.

The default filename format is: `XXXXXnnn.hrs`, where:
- `XXXXX` - First five characters of the first Application Name in the project
- `nnn` - Three digit hex number starting with 001, incremented for each new History file

The History Report File name appears in the titlebar.

### Saving Files
- Files are automatically saved when closing if changes were made
- Use File > Save As to save with a different name
- New files are created with next sequential number when using Tools > History Report > Upload

## History Report Dialog
The dialog opens when:
- Opening existing files via File > Open
- Using Tools > History Report > Upload
- Creating new files via File > New

### Dialog Tabs
1. **Summary Tab**
    - Shows statistics totals for all Chassis and Engines
    - Provides access to detailed reports
    
2. **Setup Tab**
    - Configures history data collection settings

## Summary View
Displays statistics for Chassis and Engine variants defined in the ASAP file.

### Chassis Panel
Contains columns for:
- Active status (checkbox)
- Number
- Chassis details
- Driver information  
- Notes
- Distance traveled
- Operating time

### Engine Panel
Contains columns for:
- Active status (checkbox)
- Engine details
- Notes
- Distance
- Time
- Cycles (engine rotations)

### Accessing Details
- Chassis: Select row and press Enter or double-click Active column
- Engine: Select row and press Enter or double-click Active column

### Saving Changes
Use Tools > History Report > Download to send changes to the ECU.

## Related Topics
- History Report Summary
- Multi-Application Base
- Project File Configuration

## Detailed Views

### Chassis Details
Shows read-only statistics including:
- Chassis identification
- Date range (From/To)
- Total distance and time
- Time spent in each gear

### Engine Details
Contains three tabs:

1. **Time Tab**
    - Time breakdown by engine speed and throttle position
    - Percentage calculations
    - Configurable breakpoints

2. **Cycles Tab**  
    - Cycle counts by engine speed/throttle combinations
    - Percentage distributions
    - Customizable breakpoints

3. **Auxiliary Tab**
    - Diagnostic data
    - Battery/alternator measurements
    - Operating conditions monitoring
    - Statistics on rev limits

## Setup Configuration
Allows customization of:
- Rev breakpoints (up to 16)
- Throttle breakpoints (fixed at 5)
- Operating condition thresholds
- Rev limit monitoring parameters

Changes are applied via Tools > History Report > Download.
