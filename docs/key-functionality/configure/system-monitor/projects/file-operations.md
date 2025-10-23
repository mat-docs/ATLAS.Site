# File Operations

System Monitor uses various file types for ECU configuration, logging, and tuning.

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

## Exporting Files

### Export Files

1. `File > Export`
2. Select `.smx` file path.
3. Add files to export list.
4. Click `Export`.

### Export Project
- Creates a snapshot of the current project.
- Saves all files in a single `.smx` file.

## Importing Files

1. `File > Import`
2. Select `.smx` file.
3. Choose files to include.
4. Click `Import`.

## File Type Selection
Appears when using New, Open, Save, or Save As commands. Lists available file types for the selected operation.