# Live Usage vTAGServer

When the car goes out, ATLAS's Data recorder will start recording automatically, and so should the VTS Recorder. You will see the data appearing on your screen, together with the virtual data from your model.

## Wire Link Upload (Historic Usage)

Telemetry coverage issues mean that not all the data will be available in real-time, and so there may be gaps. Unlike the parameter data, the vTAGServer cannot go backwards in time to fill in missing data as and when it is made available, resulting in gaps in the simulated data. After the wirelink upload has occurred at the end of the session, all of the missing actual data is available.

At this point, the system automatically enters Historic mode, and the vTAGServer will proceed to playback the session again over a configurable time period to create a complete set of simulated data.

The use of the vTAG Server is the same as during the live modes.

If ATLAS receives a missing data offload at the end of a live recording, the models may optionally be re-run over the whole session to take account of new or higher frequency data. The output data will be written to the same place as the live vTAG data was written but with an incremented iteration number.

You can also run dedicated models that use more parameters on the vTAGServer and monitor the car's performance and do off-board diagnostics using a complete .ssn file from your data storage.

## Stand Alone (Historic Usage) vTAGServer

For the stand-alone historic usage, you can just use a complete session while doing the following:

1. Open ATLAS
2. Load the session you want to analyze
3. Select the layer vTAGServer to get data from
4. Link it to the right ECU; You have to choose your IP address [tab OPTIONS, choose, click button apply]
5. Define the time span; You can choose the Time period [tab DATA SOURCE, drop-down menu Session, Current Lap, Fastest Lap, All timed laps, Current time base] and choose start
6. Start the simulation. ATLAS will display data.

## Session File Names

The VTSRecorder retrieves a session name or path from the active recorder.

The VTSRecorder session name will be amended as follows:

- If the active recorder base name is `xxx.ssn`, then the VTSRecorder session will be called `xxx.vvv.nnn.ssv` where `nnn` is a version number starting at 001.
- The Session FileName entry on the VTSRecorder dialog is used to form the `xxx` component of the ultimate filename.
- The `vvv` component will be set from any remaining characters, the default being VTS.

In the stand-alone mode, you can enter a session name into the Name edit box.

Each time the Historical playback is run, a new session file will be produced with an incremented version number.

## Opening Multiple Sessions

In [ATLAS Viewer Session Browser](../../visualise/atlas/handling-data/sessions/browser.md), you can open both the actual and simulated data together into a single layer. A column for each unique `vvv` identifier in the `ssv` file format structure is present.

The session files containing the actual data will be listed in a column as is currently the case. If the new simulated columns have been selected for display, ATLAS will find all versions of the simulated session files for each of the actual session files that exist.

All the versions of the simulated session names are added to the list box with the highest version being initially selected. You can then easily change to an older version if required.
