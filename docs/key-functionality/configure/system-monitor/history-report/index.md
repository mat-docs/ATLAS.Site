During its operation the ECU generates various statistics about the operation of the vehicle that it is controlling. History Report extracts these statistics and displays them. System Monitor can also control aspects of the way the statistics are collected and stored.

History Report is only available if the relevant Customer Base has permission, as set in Customer Base Advanced Settings.

Before History Reports can be used, a History Report file must be associated with the Project.

Select **Tools > History Report** to access the submenu options.

**Menu Options**

| Option                  | Description                                                                                                                                                                                                 |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Open filename**       | Opens the History Report dialog box for the History Report File currently associated with the project. If there is no History Report file, this command is not available. To open a different History Report file. |
| **Upload**              | Extracts history data from the ECU and opens the History Report dialog box showing that data. The contents of the History Report file associated with the project are overwritten. If there is no History Report file, a new one is created. |
| **Download**            | Sends the history data in the currently opened History Report to the ECU. The previous set of history data in the ECU is deleted. Use this facility if you want to continue gathering data for a vehicle in which you have changed the ECU. This command also sends Setup data to the ECU. <br> **Note:** Only available when a History Report dialog box is open. |
| **Reset Engine Stats**  | Sets the value of all the history data for engines in the ECU to Zero. The previous set of history data for engines is deleted. <br> **Note:** Only available when a History Report dialog box is open. |
| **Reset Chassis Stats** | Sets the value of all the history data for chassis in the ECU to Zero. The previous set of history data for chassis is deleted. <br> **Note:** Only available when a History Report dialog box is open. |

## Selecting a History Report File

An existing History Report File can be selected from the File Type Selection dialog box. When selected the History Report dialog box opens, showing data from the file.
