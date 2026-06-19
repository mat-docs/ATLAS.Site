# CSV and TXT Import in ATLAS

## Prerequisites

- Your licence must include **CSV/ASCII Import**.
- The source file must use a supported extension, such as `csv` or `txt`.
- The file must be in a delimited text format that ATLAS can describe with the available settings.

## Configure a CSV or TXT format

Open the ATLAS configuration/settings area and go to:

**General > Text Session Format**

This page maintains the text-file definitions, which is saved to:

`%LOCALAPPDATA%\McLaren Applied Technologies\ATLAS 10\SQL Race\DataProviders.xml`

### Add a new file type

1. Click **New**.
2. Enter the file extension **without the leading dot**.  
   Example: use `csv`, not `.csv`.
3. Fill in the format details for that file type.
4. Click **Set Definition** to save the definition.

ATLAS only allows one definition per extension, so `csv` and `CSV` are treated as the same extension.

## Meaning of each format field

| Field | Meaning |
| --- | --- |
| **Extension** | File extension to match, for example `csv` or `txt`. |
| **Total Header Lines** | Total number of non-data lines at the top of the file. |
| **Parameter Line** | Line number containing parameter/channel names. |
| **Group Line** | Line number containing group names. Use `0` if the file does not have one. |
| **Date Exists** | Whether the file includes date information. |
| **Time Format** | One of `DateTime`, `Milliseconds`, `Seconds`, or `Time`. |
| **Delimiter** | One of `Tab`, `Space`, `Comma`, or `Semicolon`. |
| **Unit** | Line number containing units. Use `0` if units are not present. |
| **Lap Marker** | Marker text used for lap markers in the file. |

## Load the file in ATLAS

After the format definition is in place:

1. Open **Session Browser**.
2. Switch to the **Files** tab.
3. Navigate to the folder that contains the CSV or TXT file.
4. Double-click the file/session name to load it.

If you use the same location frequently, you can add the folder to indexed sources or shortcuts from the **Files** tab context menu.

## Typical example

For a comma-separated file with two header rows:

| Field | Example value |
| --- | --- |
| Extension | `csv` |
| Total Header Lines | `2` |
| Parameter Line | `1` |
| Group Line | `0` |
| Date Exists | `True` or `False`, depending on the file |
| Time Format | `Milliseconds` |
| Delimiter | `Comma` |
| Unit | `2` if units are on the second header row, otherwise `0` |
| Lap Marker | `%` or whatever marker your file uses |

??? question "Troubleshooting"

    **The file does not appear or does not load**

    1. **Is the licence correct?** Confirm that **CSV/ASCII Import** is included in your licence.
    2. **Does the extension match?** The file extension must exactly match a definition in **Text Session Format**.
    3. **Was the dot omitted?** The extension must be entered without a leading dot — `csv`, not `.csv`.
    4. **Are you in the right tab?** The folder must be opened from **Session Browser > Files**.

    ---

    **Channels, units, or groups are wrong**

    1. **Are the header line numbers correct?** Re-check **Total Header Lines**, **Parameter Line**, and **Group Line**.
    2. **Is the delimiter right?** Confirm the delimiter matches the one used in your file.
    3. **Is the time format right?** Confirm the chosen **Time Format** matches the data.
    4. **Are optional lines set to zero?** Use `0` for any header line that does not exist in the file.

    ---

    **Save fails in Text Session Format**

    Each extension can only have one definition. Remove or rename any duplicate entries in the list before saving.
