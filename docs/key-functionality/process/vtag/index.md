# Introduction to vTAGServer

ATLAS's vTAGServer is a control that enables you to run MATLAB Simulink simulations within ATLAS. It executes on a dedicated machine and works with an ATLAS Data Server (ADS) to supply multiple ATLAS clients with simulated data computed from the car's telemetry. The ADS creates separate actual and simulated sessions.

## Key Features

- **Data Integration**: The complete data stream is displayed in ATLAS as if all data came from the car
- **Network Distribution**: One ATLAS Client typically runs the vTAGServer and supplies processed data (vData) to the VTS Data Recorder in the ADS, which distributes it across the network
- **Session Processing**: In stand-alone historic use, vTAGServer processes data from a session (.ssn) file and creates vTAG data in another vTAG session (.ssv) file

## Operating Modes

vTAGServer supports two modes:

- **Live mode**: Active during live recording from the car for the whole system
- **Historic mode**: Stand-alone operation

## Integration with System Monitor and ATLAS

Simulink simulations connect to System Monitor and ATLAS using blocks provided in MCT. This enables:

- Real-time monitoring and tuning through System Monitor
- Live data analysis in ATLAS during model execution
- Reduced model development time through live parameter tuning
- Compiled executable programs for faster execution of larger models
- Data replay from pre-recorded or live telemetry streams
- Automatic channel creation through vTAG Server recorder functionality