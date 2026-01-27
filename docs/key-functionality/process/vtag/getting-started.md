# Setting Up vTAGServer

## Server Configuration

To use the vTAGServer in a live situation, follow these steps on the machine running vTAGServer:

- Add a VTS Recorder to the DataServer and set the recording configurations 
- Create a System Monitor Project and check or configure the logging settings

## Client Configuration

Other ATLAS clients record data from the ADS as normal. To receive vTAG data, they must:

- Select the layer where vTAGServer should get data from
- Add an InPlace Display and add the vTAGSrv.ocx control via the 'add control' button
