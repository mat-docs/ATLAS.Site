# Ethernet Telemetry Recorder

## Purpose

Records telemetry from the units of a car over an Ethernet connection into a SQL Race session.

## Prerequisites

- The **Ethernet Recorder** licence option is available. Without it, the Ethernet Telemetry recorder does not appear in the list of recorder types.

- At least one car is defined, with the IP address of each of its units. See [Define cars and units](#define-cars-and-units).

- The units are connected to the PC over Ethernet.

- A SQL Race database setting is configured. The recorder cannot be used without one.

## Setup Instructions

1. Open Session Browser.

2. Add an **Ethernet Telemetry** recorder.

3. Configure:

    - **Recorder Name**

    - **Car**: Select the car to record. Click **...** to open the **Unit Definition** window and add or edit cars.

    - **Unit**: Shows the units of the selected car. You cannot change it here. When the car has more than one unit, **All Units** is added to the list, and ATLAS selects it whenever you change car.

    - **Data Versions**: Enable to upload DTVs at start.

    - **Export Config As text**

    - **Export M files**

    - **SQLRace database setting**: Choose the **Database engine**, complete the settings for that engine, then set the **Export folder**.

    - **Session Identifier**

    - **Session Details**: See [Session details](#session-details).

    Options that the connected units do not support are disabled.

4. Click Start to begin recording.

!!! note
    The **Car** list is locked while the recorder is recording or while auto record is on.

## Define cars and units

A car is a named group of units, each with an IP address. You define cars in the **Unit Definition** window.

1. In the recorder, click **...** next to **Car**.

2. To add a car, click **Add**. ATLAS creates a car called `Unknown` (`Unknown 2`, `Unknown 3` and so on if the name is taken), with the system type `Custom Unit` and the IP address `Undefined`.

3. Enter the car's **Name**. You can only change the name while you are adding a new car.

4. Choose the **System Type**. A system type that contains `/` creates one row in the grid for each type. Changing the system type resets every IP address to `Undefined`.

5. In the grid, type the **IP Address** of each unit. The **Unit** column is read-only.

6. Click **Save**.

To edit an existing car, select it from the list at the top of the window, change its system type or IP addresses, and click **Save**. To delete a car, select it and click **Remove**.

The available system types come from the recorder, so they depend on your installation.

## Session details

The **Session Details** panel holds the name and value pairs stored with the session. Choose the source from the drop-down: **Data Server**, **Logging Config** or **Manual Entry**.

With **Manual Entry**, click **New Detail** to add a row, then fill in its **Name** and **Value**. Select a row and click **Delete** to remove it.

## Notes

Ideal for continuous data streaming during track sessions.
