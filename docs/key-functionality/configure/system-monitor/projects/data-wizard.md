
# Data Wizard

Data Wizard compares the contents of the Edit Buffer with one or more previously created Data Versions, known as Candidate Data Versions. Using the Merge facility parameters in the current Data Version can be overwritten with those in the Candidate Data Versions.

**Features**

- Compare/Merge Tool
- Candidate Version Window
- Report View Window

### Compare/Merge Tool

The Compare/Merge Tool compares Parameters from one or two Candidate Data Versions with the Merge Buffer, and allows values from a Candidate Version to be Merged into the Merge Buffer and then committed to the Edit Buffer.

#### Merge Values

1. On the top-row drop-down list, select the Applications base to compare.
2. On the Dtv 1 row, browse for a Data Version or select one from the recently compared drop-down list.  
    Note: Dtv1 and Dtv2 Data Versions must share the same Program Version.
3. On the Dtv 2 row, browse for or select a Data Version.
4. Select a display criterion for parameter values from the drop-down list (for example, Value, Delta Value).
5. The main window displays the differences between the Data Versions selected in Dtv 1 and Dtv 2 and the Merge Buffer.
6. To update a parameter value in the Merge Buffer with a value from one of the other Data Versions, click the `>` or `<` column in the appropriate cell. Click the same cell again to undo the change.  

!!! note 
    Merge Buffer values can be edited directly in the Memory column. If the Merge Buffer differs from the Edit Buffer, an asterisk (*) is displayed in the Memory column header.

#### Commit Changed Values

1. To commit all changes in the Merge Buffer to the Edit Buffer, click Commit.  
2. The display is updated to show only those parameters that are still different.

### Map Compare Window

The Map Compare Window displays values for Dtv 1, theCurrent Data Version and Dtv 2. The window mimics the Map Window for theParameter, displaying the relevant number of Breakpoints on all axes.

To open a Map Compare Window, double-click a 1-Axisor 2-Axis Parameter in the Compare/Merge Tool Window.

### Minimum/Maximum Data Versions

If a minimum and/of maximum Data Version file is available in the Program Version folder, it is accessed by System Monitor and used in the Compare Merge Tool to indicated if minimum or maximum values have been exceeded.

Minimum and maximum Data Version files (.dtv) can be used as Dtv1 and Dtv2 Data Versions in the Compare/Merge Tool.

To create a Minimum or Maximum Data Version:

- Edit a Data Version and save it using the filenames
    - <pppp>MIN.dtv for the minimum Data Version
    - <pppp>Max.dtv for the maximum Data Version

where pppp is the Program Version number.

!!! note
    Save the min and max Data Versions in the same folder as the Program Version.

## Candidate Data Versions

The Candidate Data Version is a previously created Data Version that you want to compare with the contents of the Edit Buffer.

Features:

- Individual Candidate Data Version Windows can be printed but are not included if you print a Page.
- Candidate Data Version Windows are not stored as part of the Desktop and are not reloaded if a Project is closed and re-opened.
- More than one Candidate Data Version Window may be opened at once. Merge operations apply to all the open Candidate Data Version Windows.
- The display of Names and Descriptions reflects the setting in the Parameter Explorer.

To open a Candidate Data Version Window:

1. Select: Data Wizard > Open Data Version and select a file *or*

2. Select a Data Version file from the Recent Files list on the Data Wizard Menu. *or*

3. Select File > Open to select the Data Version file. DO NOT open the file. Click Data Wizard.

The Candidate Data Version Window appears on all pages. The full path name of the Data Version file is displayed on the Title bar.

## Report View

The Report View Window shows the parameters in the Edit Buffer. These are compared to the same parameters in the current Data Version using the Different Value Mask and shows shows all changes made to application since data version was opened / last saved. 

The Report Window appears on all pages. The full path name of the Data Version file is displayed on the Title bar. To avoid confusion, it is advisable to use Data Wizard on a blank Page.

To open a Report View Window:

1. Select: Data Wizard > Report View. A Window is opened for each Active Application. *or*
2. Select an Application in the Parameter Explorer, access the Context menu and select: Report View.

!!! note
    Report View Windows are not updated automatically. If you change any parameters in the Edit Buffer and want to force an update, select: Data Wizard > Compare / Compare All.

## Parameter Masking

Filters parameters by type of difference:

- Absent
- Different Definition
- Different Size
- Different Data Type
- Different Conversion
- Different Units
- Different Value
- Equal

## Merge Operations

Merging attempts to overwrite parameters in the Edit Buffer, with the definition of the same parameter in a Candidate Data Version. If a parameter has a Different Definition, the parameter is not merged

1. Select: `Data Wizard > Merge` or `Merge All`.

    - **Merge** - Merges the current Data Version with the Candidate Data Version(s). The Selected Parameters and the Parameter Mask are not changed. Only the parameters displayed in the open Candidate Data Version Window(s) are merged.

    - **Merge All** - Merges the current Data Version with the Candidate Data Version(s). Before the merge operation is carried out, the Selected Parameters and the Parameter Mask are reset to their default values. All parameters are merged whether or not they are displayed in the open Candidate Data Version Window(s).

2. If the difference between the parameters is their value, conversion, or units, the raw bit value (the value before Conversion) is used for the merge.

3. If the difference between the parameters is their data type, the scaled value (the value after Conversion) is used for the merge.

4. If the differences cannot be resolved automatically, the **Resolve Parameter Merge** dialog box opens.

5. Check marks show which differences have been found for the parameter named at the top of the dialog box.

6. Select a method to merge the value by selecting from the available radio buttons. See dialog box.

7. If more than one Candidate Data Version is open, and the same parameter appears in more than one of them, the **Resolve Merge Conflict** dialog box opens.

8. The list shows the full path names of the candidate Data Version files that contain the parameter named at the top of the dialog box.

9. Select the file from which you want to merge the parameter and click OK.

10. If you select Cancel, the parameter is not merged and remains unchanged.

## Viewing Parameters

Data Wizard allows temporary Windows to be opened to display the values of selected Parameters.

## Window Menu

The Data Wizard Window Menu commands control the appearance of a Report View or a Candidate Data Version Window.