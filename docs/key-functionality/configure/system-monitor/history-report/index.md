# History Report

During its operation, the ECU generates various statistics about the vehicle it controls. The **History Report** extracts these statistics and displays them. The **System Monitor** can also control aspects of how the statistics are collected and stored.

!!! note
    The History Report is only available if the relevant Customer Base has permission, as set in the Customer Base Advanced Settings.

Before using History Reports, a History Report file must be associated with the Project (see **History Report - Files**).

## Accessing History Report

Select: **Tools > History Report** to access the submenu options:

- **Open filename**: Opens the History Report dialog box for the currently associated History Report File. If there is no History Report file, this command is not available. To open a different History Report file, see **Opening Files**.

- **Upload**: Extracts history data from the ECU and opens the History Report dialog box showing that data. The contents of the associated History Report file are overwritten. If there is no History Report file, a new one is created.

- **Download**: Sends the history data in the currently opened History Report to the ECU. The previous set of history data in the ECU is deleted. Use this facility if you want to continue gathering data for a vehicle in which you have changed the ECU. This command also sends Setup data to the ECU.

!!! note
    Only available when a History Report dialog box is open.

- **Reset Engine Stats**: Sets the value of all the history data for engines in the ECU to zero. The previous set of history data for engines is deleted.

!!! note
    Only available when a History Report dialog box is open.

- **Reset Chassis Stats**: Sets the value of all the history data for chassis in the ECU to zero. The previous set of history data for chassis is deleted.

!!! note
    Only available when a History Report dialog box is open.

An existing History Report File can be selected from the **File Type Selection** dialog box. When selected, the History Report dialog box opens, showing data from the file.
