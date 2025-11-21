The output of many sensors is inherently non-linear (the output is not proportional to the input). A linear output is often achieved by limiting the sensor range and adding complex compensation circuitry. This reduces sensor usefulness and increases cost.

An alternative is to accept the non-linear output and use the ECU's computing power to compensate by referring to a lookup table. This is known as Software Calibration and is supported by all TAGtronic control systems and sensors. This method lets you use simple, robust, and relatively low-cost sensors while obtaining the best possible accuracy.

## Calibration Files

When the project is created, the Sensor PRM file is read and the latest ASCII (.dat) Sensor Calibration data is converted to a binary calibration file by Sbinary.exe. Sbinary is a conversion utility that runs in DOS. The name and location of the Sensor.prm file is defined in the Advanced Settings dialog box.

**Features**

- The binary calibration file is stored in the Multi-Application Base root directory and has the same name as the .prm file but with the .bcf extension.
- When data is downloaded to the ECU, a sensor configuration created from the .bcf file is also downloaded.
- If the .prm file or any .dat files are newer than the most recent .bcf file, Sbinary runs to update the .bcf file when Sensors & Actuators is opened.
    - **Note:** You can also run Sbinary.exe using the Force Prm Check command for the Sensors & Actuators Tool.
- Sbinary is supplied with sensor calibration data obtained from McLaren Applied. To install Sbinary, run Install.bat from the calibration data disk.
    - **Note:** Ensure the Location of sensor calibration files in Advanced Settings matches the Sbinary installation location.
- Sbinary requires the following file structure:
    - Sbinary.exe must be in the same directory as the Sensor PRM file.
    - You must have write access to the directory containing Sbinary.exe to allow it to create temporary files.
    - The .dat calibration files are placed in subdirectories below the directory containing Sbinary.exe and the Sensor PRM file.
    - The names of .dat files and their containing directories must conform to DOS 8-character naming rules. Long names must not be used.

## Sensor Calibration Tool

The Sensor Calibration tool allows sensor calibration curves to be viewed and edited. To open the Sensor Calibration dialog, select: **Sensors > Live Calibration**. If the ECU is online, the Select Live Calibration Parameter dialog appears first. If not required, click **Cancel** to open the Sensor Calibration dialog.

The dialog box has three panes:

- **Left pane:** Contains a list of sensors from the .prm file. Only sensors with calibration data are shown. Click `+` to show serial numbers of individual sensor types. If `+` is unavailable, the default calibration is used. The selected Sensor Type and Sensor Number also appear in the text boxes at the bottom.
- **Centre pane:** Shows the calibration data for the selected sensor from the .dat file:
    - **Voltage:** The sensor output in volts. Only 0-5 volt output sensors are supported; other sensors require an interface amplifier.
    - **Value:** The quantity in engineering units associated with the sensor output. For example, a pressure sensor with a 0-10 bar range may have a value of 10 at 5 volts, 5 at 2.5 volts, and 0 at 0 volts.
- **Right pane:** Displays calibration data as a graph. The graph also appears for selected sensors in External Inputs - Configuration.

## Live Calibration

Live Calibration allows you to calibrate a sensor using real input.

1. Set up a connection to the sensor using External Inputs Configuration. Ensure the configuration is downloaded to the ECU.
2. Prepare to apply known engineering loads to the sensor.
3. Put the ECU online.
4. Select: **Sensors > Live Calibration** to open the Select Live Calibration Parameter dialog.
5. Select the parameter associated with the sensor you want to calibrate.
6. Click **OK** to open the Sensor Calibration dialog.
7. On the Sensor Calibration dialog, click **Live Cal** to start the calibration wizard. The current voltage output from the sensor appears in the Voltage text box and under Breakpoint in the centre pane.
8. In the Engineering text box, enter the value in engineering units corresponding to the current load on the sensor. Click **Next**.
9. Change the sensor load so the Voltage value increases and repeat step 8.
10. Continue until you have entered all calibration points. Click **Finish** to stop the calibration.
11. Click **OK** to accept the calibration. The .dat file associated with the sensor is updated.
