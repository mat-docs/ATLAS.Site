# File Operations

System Monitor uses various file types for ECU configuration, logging, and tuning.

## Create a Project

1. Select `File > New`. The File New dialog box opens.  
2. In the Document list, select **Project** and click **OK**. The Project dialog box opens.  
4. Enter a filename in the **Filename** text box, or browse for a path or an existing project filename (browsing is limited to the Multi‑Application Base directory).  
5. Enter a **Comment** and **Notes**, if required.  
6. Click **Next** to continue. The Connection dialog box opens — see *New Project - Connections* for further instructions.

## Opening Files

Use `File > Open` to access:

- Data Version (.dtv)
- Program Version (.pgv)
- Desktop (.dtp)
- Logging Configurations
- Sensor Sets
- History Reports
- Virtual Parameters
- CAN Config
- Project (.prj)

If no project is open, only `.prj` files can be selected.

## Saving Files

### Save

- Saves changes under the original name.
- Overwrites the existing file without warning.

### Save As

- Saves under a new name.
- Allows editing of comments and notes.
- For Data Versions, prompts for a new name unless only comments were changed.

### Save Copy As
- Saves a copy under a new name.
- Original file remains unchanged.

### Save All

- Saves all modified files under their original names.

### Save All As

- Saves the entire project and all associated files under a new name.

## File Type Selection
Appears when using New, Open, Save, or Save As commands. Lists available file types for the selected operation.

## Exporting and importing files

Use Export and Import to copy Project, Program and Data Version files (.pgv, .dtv, etc.) between Multi‑Application Bases. The export format is .smx, which can only be read by System Monitor’s Import facility.

### Exporting files 
1.  Open: File → Export → "Export Files from Customer Base" dialog.
2.  The **Active Multi‑Application Base** panel shows read‑only info about the current Base.
3.  In **Export to file**, enter or browse for the destination path and filename (use the .smx extension).
4.  The **Files to export** list shows files that will be included.
5.  Click **Add** to open a File Open dialog and select files from the Multi‑Application Base. If you add a project .pgv file, all files associated with that project are included.
6.  To remove an item, select it and click **Remove**.
7.  Click **Export** to create the .smx file and close the dialog.

Note: Exported .smx files can only be read by System Monitor’s Import command.

### Export Project 
- Creates a snapshot of the current project containing all files in the project.
- The file is named after the project with the .smx extension and is placed in the project’s directory.
- No dialog is shown and there are no options.

### Importing files 
1.  Open: File → Import → "Import Files into Customer Base" dialog.
2.  The **Active Multi‑Application Base** panel shows read‑only info about the current Base.
3.  In **Import from file**, enter or browse to the .smx file to import.
4.  The **Files to import** list displays the contents of the .smx file. Select files by checking their boxes, or highlight files and use **Include** / **Exclude**.
5.  Click **Import** to extract the selected Program and Data Version files into the current Base directory and close the dialog.
6.  Confirm or resolve any overwrite prompts as required by the application.
