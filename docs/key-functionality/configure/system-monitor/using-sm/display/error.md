# Error Display

The Error Display shows diagnostic error flags from the ECU. Each error is represented by a special Measurement Parameter.

## Features

- Errors are defined by the Error File included in the Program Version.
- Errors are uploaded live from the ECU (must be Online).
- Errors are listed in order of occurrence.
- Duplicate errors are not shown multiple times.
- Errors can be:
  - **Current**: Actively occurring.
  - **Logged**: Stored in the ECU from past occurrences.
- Logged errors persist until deleted.

## Creating an Error Window

Select: `Desktop > Window > Error`

Each error appears as a row with:

- **Status Icon**:
  - Current error
  - Logged error
- **Name**: From Error File.
- **Description**: Cause or details.
- **Status**: Current or Logged.

## Managing Errors

- **Acknowledge**: `ECU > Acknowledge Errors`
  - Changes colour from Unacknowledged to Foreground.
- **Delete**: `ECU > Delete Errors`
  - Removes logged errors from ECU and display.
- **Masking**:
  - Use the Mask tab in Window Properties.
  - Mask entire groups or individual errors.

## Display Options

- Errors appear on every page by default.
- Window auto-restores if minimised during error occurrence.
- Column widths are adjustable.
- Appearance settings available in Display tab and System Menu.

