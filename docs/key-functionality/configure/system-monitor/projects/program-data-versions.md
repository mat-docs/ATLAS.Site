# Program and Data Versions

Each ECU controller requires programming before use. System Monitor generates Program and Data Version files from ASAP and Hex files.

## File Types

- **Program Version (.pgv)**: Contains ASAP content, program code, and configuration.
- **Data Version (.dtv)**: Contains editable parameters and memory layout.

## Creating Program Versions

1. Start System Monitor.
2. `File > New > Program Version`.
3. Select required files:
   - ASAP2 (required)
   - Hex (required)
   - Controllers (required)
   - Optional: Errors, Events, Sensors, etc.
4. Enter comments and notes.
5. Click OK to generate `.pgv` and `.dtv`.

## Command Line Creation
Syntax:

```
SMv7U /newpgv /asap2 "pathasap2"/hex "pathhex " /controller"pathcontroller" /error"patherror" /event"pathevent" /sensor"pathsensor" /endis"pathendis" /injector"pathinjector" /prm"pathprm" [/customer basename] [/location folder]  [/encrypt encryptionmode]
```

- Encryption mode: `0` (none) or `1` (encrypt).
- Returns codes: `0` success, `1` licence error, `2` invalid command, `3` command failed.

## File Structure

- `MultiAppName/`
  - `CustBaseName/`
    - `version/`
      - `version.pgv`
      - `version000.dtv`