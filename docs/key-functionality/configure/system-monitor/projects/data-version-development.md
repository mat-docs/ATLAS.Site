# Data Version Development

When a project is Created a Base Data Version is allocated to each Application in the project. The Base Data Version contains a full set of Editable Parameters with values that should enable the vehicle to operate, if not at its optimum.

As the ECU is tuned to optimize the performance of the vehicle, the values of the Editable Parameters are changed. The changes are stored by System Monitor in the Edit Buffer. If the ECU is On-Line, the contents of the Edit Buffer can be sent to the ECU either immediately (using Live Tune) or on demand.

**Features**

- The Data Version in the ECU can be uploaded to the Edit Buffer.
- Only Active Applications can be tuned. Ensure that the applications that you want to tune are set as active and are not read only.
- The contents of the Edit Buffer can be saved at any time, to create a new Data Version File. If the contents of the Edit Buffer are different from the currently loaded Data Version, you will be prompted to save the new Data Version when the ECU is taken Off-Line or the project is closed. Data Versions are saved in the Customer Base directory of the Active Application.
- A Backup of the Edit buffer is stored as: \MultiAppName\CustBaseName\version\version000xxx.dvb
where: xxx is the user name of the person who is currently logged on. See Project Files for a description of the file structure. The location can be overridden by an entry in Tools > Advanced Settings.

## Using Data Version Files

To load a different Data Version:

1. Select the Active Application.
2. `File > Open > Data Version (.dtv)`
3. Browse and select the file.

Changes to the Edit Buffer prompt a save when the ECU is taken Off-Line or the project is closed.

## Saving Data Versions

- File name format: `versionnnn.dtv`
- `nnn` is a three-digit hex number incremented with each new version.
- Comments and notes can be edited before saving.
- Old versions are retained unless overwritten manually.

!!! note
    - File names and location may be changed but the location can only be within the Multi-Application Base directory.
    - Comment and Notes in the Data Version panel can be edited before the file is saved.
    - Old Data Version files are not overwritten except to change the Comment and Notes.

## Export to MATLAB

The MATLAB export creates one or more MATLAB script files (*.m) from the Data Version currently in the Edit Buffer. These files can be used for analysis in MATLAB or produced by MATLAB for re-import into System Monitor (directly or via Hex files).

Export options:

- Definition and Data  
    Includes Property settings and the value(s) for each Editable Parameter.
- Data only  
    Includes only the value(s) for each Editable Parameter.

How to export

1. Select the Active Application.
2. Choose: Tools > Export to MATLAB > Definition and Data or Data only.
3. In the Save As dialog, confirm the Save as type is "MATLAB Script Files (*.m)". A separate .m file is created for each Active Application.
4. Choose a folder and file name, then save.
    - Default file name: progversiondataversion.m  
        - progversion: Program Version number used by the Application  
        - dataversion: Data Version number used by the Application (including its sequential number)
    - The Save As dialog opens at the default path (the location of the currently loaded Data Version). You may store the file anywhere you have write access.

!!! tip
    - Use "Definition and Data" when you need parameter metadata (units, conversions, properties).  
    - Use "Data only" for a compact export of values for numerical analysis or scripting.
    - Confirm Active Applications are the ones you intend to export; only Active Applications produce files.
    - Ensure you have write permissions for the chosen export folder.

## Importing Hex Files

System Monitor creates Data Versions from the information in Hex files (see Program and Data versions and ECU Files). This is normally done as part of the process of Creating a Program Version. However, it is possible to import a Hex file into an existing Project to create a new Data Version. To do this select: **File > Import Hex File** to browse for a Hex file.

If the Hex file is compatible with the project, a new Data Version is created. This facility can be used to incorporate development data from other applications such as MATLAB into System Monitor.