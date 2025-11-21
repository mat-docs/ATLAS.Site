Sensors and actuators supplied by Motion Applied are tested at multiple points in their operating range to produce a calibration table. This table is saved as an ASCII format file with the `.dat` extension and is shipped with the sensor.

!!! warning
    - Do not amend the sensor calibration database while System Monitor is running
    - Do not edit the contents of `.dat` files

You can also obtain calibration information by connecting to the Motion Applied network using the Get Sensor Data Utility.

## Get Sensor Data Utility

### Access Requirements

To obtain sensor calibration data from the Motion Applied network:

1. Apply for a remote login account
2. You'll receive setup instructions (WPD.TWPD0176) for Dial-up Networking via modem
3. You'll be allocated a username and initial password (which you can change)

### Network Access

You'll have access to:

```
TAGSVR1\SYS:\HOME\username\
```

This path maps to the `F:` drive (if available). Access is restricted to the network supervisor, whether within or outside Motion Applied.

The `gs` (Get Sensor Data) utility retrieves TAG sensor calibration data on a read-only basis and cannot modify database master files.

## Using the Get Sensor Utility

The `gs` utility is located at:

```
TAGSVR1\SYS:\HOME\username\FROMTAG\SENSOR
```

1. Run `gs` to open a DOS window with the prompt:
    ```
    Enter Order Code [TYPE QUIT TO EXIT]:
    ```

2. Enter the full order code (include leading `o` and all spaces; case-insensitive):
    ```
    o 030 330 001 001 <ENTER>
    ```

3. Confirm the sensor type when prompted:
    ```
    The order code you have entered corresponds to: ––– 250 bar Pressure Sensor ––– is this correct? [Y/N]
    ```
    Enter `Y` to accept.

4. Enter the quantity of sensors needed. Precede with `R` for automatic sequential serial numbering.

5. Enter the serial number for each sensor (e.g., `160`).

6. The utility retrieves data and appends it to `SENSOR.DAT` in the current directory. For amplified pressure sensors, a second file `SENSOR2.DAT` is created.

7. Repeat steps 4-6 for each sensor type required.

8. Type `QUIT` at the prompt to exit. The filename and size are displayed.

9. Transfer the `OUTPUT` subdirectory contents to your computer and copy to CD-ROM.

!!! note
    Exit at any time by entering `quit` or `QUIT`. If an order code or serial number isn't recognized, you'll be prompted to re-enter it.

