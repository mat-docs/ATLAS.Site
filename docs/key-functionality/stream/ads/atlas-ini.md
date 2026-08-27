# ATLAS.ini File

`ATLAS.ini` is a plain text file that sets ATLAS Data Server (ADS) configuration without using the
GUI. Any setting normally changed in `Tools > Options` can be written into this file instead, which is what makes a scripted or automated ADS deployment possible. Values supplied by the file also become read-only in the interface, so a configuration can be applied consistently and left locked.

!!! note "Version note"

    Keys, defaults and behaviour on this page reflect ADS 9.87.x. If you are running an older
    version, a default may differ from what is shown here.

## Why use ATLAS.ini

Configuring ADS through the GUI is fine for a single machine, but it does not scale and it cannot be scripted. `ATLAS.ini` solves three problems:

- **Repeatable deployment.** One file, copied to each machine, replaces a long click-through of the Options dialog.
- **Locked-down settings.** A setting that comes from `ATLAS.ini` is displayed greyed out and cannot be edited or overwritten from the interface. This is useful for values that must not be changed.
- **Multi-user and service accounts.** The ADS installer writes its default settings under
  `HKEY_CURRENT_USER` for the installing user only. If ADS runs under a different account, those
  defaults never materialise. 

## Where ATLAS.ini lives

By default ADS looks for the file at:

```
McLaren Electronic Systems\ATLAS 9\Atlas.ini
```

Two things about this path:

- **It is per-user.** The file must be in the Documents folder of the account ADS runs under, not the account that installed it.
- **Folder redirection applies.** If Documents is redirected — most commonly by OneDrive Known Folder
  Move — the path follows the redirect, for example
  `C:\Users\...\McLaren Electronic Systems\ATLAS 9\Atlas.ini`.

This PowerShell snippet writes the file to the correct location for the current user:

```powershell
$dir = Join-Path ([Environment]::GetFolderPath('MyDocuments')) 'McLaren Electronic Systems\ATLAS 9'
New-Item -ItemType Directory -Force $dir | Out-Null
@'
[ADSAdvancedSettings]
EnableRemoteDataFeed = 1
'@ | Out-File (Join-Path $dir 'Atlas.ini') -Encoding ascii
```

### Moving the file

The location can be changed with a registry value that holds the full path **including the file
name**:

| Registry key | Value | Type |
|---|---|---|
| `HKEY_CURRENT_USER\Software\McLaren Electronic Systems\ATLAS\9.0\Preferences` | `ATLASIniFile` | String |

In the ATLAS Viewer this is exposed as `Tools > Options > Standard`. ADS has no equivalent control, so set it in the registry directly.

!!! warning "Two limits on relocating the file"

    `ATLASIniFile` is read from the registry only — it cannot be set from inside `ATLAS.ini`, because the file has not been located at the point it is needed.

    A small number of settings are read very early during start-up, before the relocation is applied
    — including `RemoteDataFeedEndpoint` and the Bridge Service log path. If you relocate
    `ATLAS.ini`, those two are still taken from the default location. Unless you have a reason to move the file, leave it at the default path; if you must move it, set the Bridge Service values in the registry instead.

Unlike the ATLAS Viewer, **ADS does not accept an `.ini` path on the command line**. The default
location and `ATLASIniFile` are the only two options.

## How overrides are applied

### Precedence

For every setting ADS reads, the order is:

1. **`ATLAS.ini`** — if the section and key are present, this value is used.
2. **Registry** — otherwise the value under the ADS registry key is used.
3. **Built-in default** — otherwise the shipped default is used, and is written into the registry.

A value that comes from `ATLAS.ini` is never copied into the registry, and ADS never writes back to`ATLAS.ini`.

### Settings from the file are read-only

When a setting is supplied by `ATLAS.ini`, ADS marks it read-only. In `Tools > Options` it appears
greyed out, and attempts to change it are discarded. This is the quickest way to confirm a key has
been picked up.

### Changes require a restart

`ATLAS.ini` is read once per process and cached until ADS exits. **Editing the file while ADS is
running has no effect** — restart ADS to apply changes.

Separately, many individual settings are themselves flagged as requiring a restart; these are marked in the [Options reference](options.md).

## File syntax

`ATLAS.ini` is a standard Windows INI file, read with the Win32 private profile functions. The rules follow from that.

### Sections and keys

A section name is the **registry sub-key**, relative to `HKEY_CURRENT_USER\Software\McLaren Electronic Systems\ATLAS\9.0`. A key name is the **registry value name**. So this file:

```ini
[ADSAdvancedSettings]
LogFileFolder = D:\ATLASLogs
```

sets the same thing as the registry value `LogFileFolder` under `HKCU\Software\McLaren Electronic Systems\ATLAS\9.0\ADSAdvancedSettings`.

- Section and key names are case-insensitive.
- Nested registry keys use a backslash in the section name, for example
  `[ADSAdvancedSettings\RecorderSettings]`.
- A section header may appear only once per file. Repeating it means the later block is ignored.
- Comments start with a semicolon (`;`). A hash (`#`) is **not** a comment character and will be
  read as part of a value.
- Whitespace around `=` is trimmed, and surrounding double quotes are stripped.

### Value types

| Type | How to write it |
|---|---|
| String | Verbatim text, up to 1024 characters. Do not quote paths. |
| Number | Decimal only. Hexadecimal (`0x…`) and digit separators are not accepted. |
| Boolean | `1` or `0`. |

!!! warning "`true` and `false` do not work"

    Boolean settings must be written as `1` or `0`. The interface displays them as True/False, but
    the file is parsed numerically — `true` is read as `0`, silently giving you the opposite of what you intended.

Save the file as **ANSI/ASCII**, not UTF-16. In PowerShell use `-Encoding ascii`; `Out-File` and `>` default to UTF-8, and `Set-Content` defaults to the system code page.

### Values that cannot be set from the file

- **`-1` and `-2`.** These two values are indistinguishable from "key not present", so a setting
  written as `-1` is ignored and the registry or default value is used instead. Where a setting
  needs to be disabled, use the documented disable value (usually `0`).
- **Multi-string values.** The function library lists under `ADSLibrary` (`Defaults`, `Order`,
  `DefaultsAttrib`) are `REG_MULTI_SZ` and have no INI representation. Set them in the registry.
- **Binary values.** Recorder session details are stored as a binary blob (see
  [Recorder settings](#adsadvancedsettingsrecordersettings)).
- **Root-level values.** A handful of values live directly under the `ATLAS\9.0` key rather than in a sub-key, and cannot be reached from the file because a section name is required.
- **`HomeFolder`.** Read from the registry only.
- **Environment variables.** There is **no** expansion of `%USERPROFILE%` or any other variable —
  write literal absolute paths. Older sample files that use `%USERPROFILE%` are incorrect.

## Sections reference

ADS reads four sections. 

| Section | Contains | Gate |
|---|---|---|
| `[Preferences]` | Folder and file paths | — |
| `[ADSAdvancedSettings]` | Everything in `Tools > Options` | — |
| `[AtlasDataServer]` | `Setup > Configure Interfaces` network settings | `InitializeFromRegistry = 1` |
| `[ADSAdvancedSettings\RecorderSettings]` | Recorder definitions | `SetupRecordersFromRegistry = 1` |

### [Preferences]

Paths used across ADS. These correspond to `Tools > Options > Recorder Folders` and to folders the
installer seeds.

| Key | Purpose |
|---|---|
| `DataFolder` | Root folder for recorded session data. |
| `LocalFolder` | Temporary/working folder. |
| `WorkbookFolder` | Workbook folder. Also supplies the default location of the server settings file, `<WorkbookFolder>\AtlasServer.sbk`. |
| `ConfigFolder` | Logging configuration folder. |
| `CircuitsFolder` | Circuit files. |
| `BitmapsFolder` | Bitmap files. |
| `CustomDisplaysFolder` | Custom display definitions. |
| `FunctionLibraryFolder` | Function library. |
| `FunctionDataFolder` | Function data. |
| `FunctionDLLFolder` | Function DLLs. |
| `ExportJobFolder` | Export job definitions. |
| `DefaultConstantsFile` | Default constants file. |
| `SystemMonitor7BaseFolder` | System Monitor base folder. Multiple paths may be separated with semicolons. |
| `AncilliaryParametersFolders` | Ancillary parameter folders, semicolon-separated. Note the spelling of this key — it contains a doubled `l`. |
| `ParameterUnlockListDir` | Parameter unlock list folder. Also passed to SQL Race as its unlock list search path. |
| `CustomPGVFolder` | Folder where the LDF recorder stores received PGV files. |
| `DefaultSqlRaceConnection` | Default SQL Race connection. |
| `ATLASIniFile` | Location of this file. **Registry only** — cannot be set here. |

!!! note

    `HomeFolder` is deliberately excluded — it is read from the registry only and ignores this file.

### [ADSAdvancedSettings]

This is the main section and covers every setting on the `Tools > Options` tabs. Because there are
roughly 200 of them, they are documented with their descriptions and defaults in the
**[Options reference](options.md)**, which lists the `ATLAS.ini` key for each setting alongside its label in the interface.

### [AtlasDataServer]

The network interface settings from `Setup > Configure Interfaces > General`.

!!! warning "Only read when `InitializeFromRegistry` is set"

    ADS normally loads these from the server settings workbook (`.sbk`). This section is ignored
    entirely unless `InitializeFromRegistry = 1`. There are also no built-in defaults here: a key you leave out is read as zero or empty, not as a sensible default. Set the whole group together.

| Key | Type | Purpose |
|---|---|---|
| `InitializeFromRegistry` | Boolean | Must be `1` for the rest of this section to be read. |
| `Stream` | String | Data server name, as seen by clients. |
| `Port` | Number | Network port. The multicast port is implicitly `Port + 1`. |
| `StatusPort` | Number | Status port. |
| `LocalIPBind` | String | IP address of the network adapter to bind to. |
| `MulticastIP` | Number | Multicast address, stored as a packed number. See below. |
| `TelemTTL` | Number | Telemetry time to live, 0–10. |
| `TelemMaxDataRate` | Number | Telemetry maximum data rate in KB/s, 0–15000. |
| `TelemBuffer` | Number | Telemetry buffer in MB, 1–1024. |
| `WireTTL` | Number | Wirelink time to live. |
| `WireMaxDataRate` | Number | Wirelink maximum data rate in KB/s. |
| `SendSessionConstantsToClients` | Boolean | Corresponds to `Use Server Constants` on the Library tab. |

`MulticastIP` is stored as a packed number rather than dotted-quad text, and the first octet must be in the range 224–239. Rather than calculating it, set it once in `Setup > Configure Interfaces` and read the stored value back — see [Capturing a configuration](#capturing-a-configuration-from-a-configured-machine).

!!! note

    `WireBuffer` exists as a registry value and is written when settings are saved, but the wirelink buffer is fixed at 1 MB when read. Setting it has no effect.

### [ADSAdvancedSettings\RecorderSettings]

Recorder definitions, so that a machine comes up with its recorders already configured.

!!! warning "Only read when `SetupRecordersFromRegistry` is set"

    Put `SetupRecordersFromRegistry = 1` in `[ADSAdvancedSettings]` first, otherwise recorders are
    loaded from the workbook and this section is ignored.

    With this enabled, ADS also *saves* recorders back to the registry when settings are saved. Any recorder in `ATLAS.ini` is re-applied on the next start, so recorders added through the interface will appear to be lost.

| Key | Purpose |
|---|---|
| `RecorderCount` | Number of recorders to create. |
| `Recorder<N>Type` | Recorder type, `N` starting at 1. Must exactly match one of the strings below. |
| `Recorder_<N>_NumberOfSettings` | Number of sources this recorder has. See the warning below. |
| `Recorder_<N>_0_<Property>` | Per-recorder properties, for example `Recorder_1_0_SessionDirectory`. |

Commonly used properties include `AutoRecord`, `SessionDirectory`, `SessionName`,
`SessionDestination`, `DataStream`, `DataSource`, `AppendSession`, `RecordOnlyToMemory`,
`DetailsComeFrom`, `CarName`, `UnitName`, `SqlRaceConnectionIdentifier`,
`RemoteDataServerIPAddress` and `RemoteDataServerPort`.

`SessionName` supports the same substitutions as the Record dialog, such as `%y%m%d%H%M%S` for a
timestamp or `$vCar$` for a parameter value.

!!! warning "`NumberOfSettings` must match the recorder"

    `Recorder_<N>_NumberOfSettings` must equal the number of sources the recorder type actually has — `1` for a single-source recorder. If it does not match, the **entire** `Recorder_<N>_0_*` block is silently ignored and the recorder is created with default settings. Session detail blobs are also stored in binary form and cannot be expressed in the file, so drive naming through `SessionName`, `SessionDirectory` and `DetailsComeFrom` instead.

    If in doubt, configure one recorder in the interface and read the values back, as described
    below.

#### Valid recorder type strings

`Recorder<N>Type` is matched against the recorder types registered by ADS, exactly and including
spaces and capitalisation. Several are only registered if the corresponding licence option is
present; if the string does not match, the recorder is skipped and `Recorder Type: <name>, not found` is written to the log.

| `Recorder<N>Type` | Licence option required |
|---|---|
| `File Telemetry` | — |
| `Generic Recorder` | — |
| `Remote Data Server` | — |
| `Remote Data Server Playback` | — |
| `Ethernet Multi-Session Offload` | — |
| `Data Server Telemetry` | — |
| `VTSRecorder` | vTAG Server Recorder |
| `DST Multi Source Recorder` | Wide Band |
| `Generic SQLRace Recorder` | SQLRace read |
| `Advanced Data Feed Recorder` | Advanced Data Feed Recorder |
| `TLM-Px Multi Source Recorder` | TLM-Px Recorder |

!!! note

    `CBR610 Multi Source Recorder` and `PiDB Multi Source Recorder` are valid strings elsewhere in
    ATLAS but are **not** registered as ADS recorder types.

## Worked examples

### Enable the Bridge Service

The minimum file to turn on the Bridge Service and have ADS manage the process itself:

```ini
; <Documents>\McLaren Electronic Systems\ATLAS 9\Atlas.ini
[ADSAdvancedSettings]
EnableRemoteDataFeed   = 1
LocalRemoteDataFeed    = 1
RemoteDataFeedEndpoint = [::1]:9697
```

To connect to a Bridge Service running on another machine instead, point the endpoint at it and let that machine own the process:

```ini
[ADSAdvancedSettings]
EnableRemoteDataFeed   = 1
LocalRemoteDataFeed    = 0
RemoteDataFeedEndpoint = bridge-host.example.com:9697
```

### Relocate data and log folders

Moving recording and diagnostic output onto a dedicated data volume:

```ini
[Preferences]
DataFolder     = D:\ATLASData
WorkbookFolder = D:\ATLASData\Workbooks
ConfigFolder   = D:\ATLASData\Config

[ADSAdvancedSettings]
LogFileFolder             = E:\ATLASLogs
SettingsFile              = D:\ATLASData\Workbooks\AtlasServer.sbk
MinimumDiskSpace          = 2000
TempRecordingDirectory    = D:\ATLASData\Temp
MaxLogFileSizeMB          = 50
```

### A complete unattended configuration

Network interfaces, one auto-starting recorder and the Bridge Service, all applied on first start:

```ini
; ADS configuration - applied at start-up, read-only in Tools > Options.
; Restart ADS after editing. Save as ANSI, not UTF-16.

[Preferences]
DataFolder     = D:\ATLASData
WorkbookFolder = D:\ATLASData\Workbooks

[ADSAdvancedSettings]
; --- diagnostics ---
LogFileFolder              = E:\ATLASLogs
MaxLogFileSizeMB           = 50
; --- Bridge Service ---
EnableRemoteDataFeed       = 1
LocalRemoteDataFeed        = 1
RemoteDataFeedEndpoint     = [::1]:9697
; --- gates for the two sections below ---
SetupRecordersFromRegistry = 1

[AtlasDataServer]
InitializeFromRegistry = 1
Stream                 = TrackADS1
Port                   = 5000
StatusPort             = 5002
LocalIPBind            = 10.20.0.5
MulticastIP            = 4009754848
TelemTTL               = 1
TelemMaxDataRate       = 500
TelemBuffer            = 20
WireTTL                = 1
WireMaxDataRate        = 500

[ADSAdvancedSettings\RecorderSettings]
RecorderCount                  = 1
Recorder1Type                  = Data Server Telemetry
Recorder_1_NumberOfSettings    = 1
Recorder_1_0_AutoRecord        = 1
Recorder_1_0_SessionDirectory  = D:\ATLASData\Telemetry
Recorder_1_0_SessionName       = %y%m%d%H%M%S
Recorder_1_0_SessionDestination = 0
Recorder_1_0_DetailsComeFrom   = 0
```

!!! tip

    Take the `MulticastIP` value from a machine you have already configured rather than computing it. The value above is an example and will not be correct for your network.

## Capturing a configuration from a configured machine

The most reliable way to build an `ATLAS.ini` — particularly for recorders and `MulticastIP` — is to configure one machine through the interface, then read the values back and transcribe them.

Configure ADS as required, close it so that settings are flushed, then export:

```powershell
reg export "HKCU\Software\McLaren Electronic Systems\ATLAS\9.0\ADSAdvancedSettings" ads-settings.reg
```

Or list a section's values to read them directly:

```powershell
reg query "HKCU\Software\McLaren Electronic Systems\ATLAS\9.0\AtlasDataServer"
```

Each value name becomes a key in the matching `ATLAS.ini` section, and each sub-key becomes a section with a backslash in its name. Remember that multi-string and binary values cannot be transcribed.

## Checking that your file was read

ADS logs whether it found the file each time it starts. Look in `ATLASWideLog.txt` in the folder
given by `LogFileFolder`:

```
ATLAS ini file found; C:\Users\jsmith\Documents\McLaren Electronic Systems\ATLAS 9\Atlas.ini
```

If the file was not located, the same line reports `ATLAS ini file is not found` with the path that was tried — which tells you where ADS expected it.

Then confirm individual settings: open `Tools > Options` and check that the settings you supplied are greyed out. A setting that is still editable did not come from the file.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Nothing changed at all | ADS was not restarted, or the file is in a different account's Documents folder. Check the log line above. |
| Log says the file was not found | Wrong path, wrong file name, or Documents is redirected. The logged path is the one ADS tried. |
| A boolean behaves as if disabled | Written as `true`/`false` instead of `1`/`0`. |
| A setting is still editable in Options | The section or key name does not match, or the value was rejected. Section names are the registry sub-key, key names the registry value name. |
| A whole section is ignored | Missing gate: `InitializeFromRegistry` for `[AtlasDataServer]`, `SetupRecordersFromRegistry` for recorders. |
| A section appears partly applied | The section header is duplicated in the file; only the first block is read. |
| A recorder was not created | `Recorder<N>Type` does not exactly match a registered type, or its licence option is absent. The log records `Recorder Type: <name>, not found`. |
| A recorder has default settings | `Recorder_<N>_NumberOfSettings` does not match the recorder's source count, so the property block was skipped. |
| Values look garbled | The file was saved as UTF-16. Save as ANSI. |
| Bridge Service uses the wrong endpoint | `ATLAS.ini` was relocated with `ATLASIniFile`. Set `RemoteDataFeedEndpoint` in the registry, or move the file back to the default path. |

## Setting values in the registry instead

Every key described here is a registry value under
`HKEY_CURRENT_USER\Software\McLaren Electronic Systems\ATLAS\9.0`, so a deployment script can write the registry directly:

```powershell
$key = 'HKCU:\Software\McLaren Electronic Systems\ATLAS\9.0\ADSAdvancedSettings'
New-Item -Path $key -Force | Out-Null
Set-ItemProperty -Path $key -Name 'EnableRemoteDataFeed'   -Value 1 -Type DWord
Set-ItemProperty -Path $key -Name 'LocalRemoteDataFeed'    -Value 1 -Type DWord
Set-ItemProperty -Path $key -Name 'RemoteDataFeedEndpoint' -Value '[::1]:9697' -Type String
```

Use booleans and numbers as `DWord` and text as `String`.

Choose between the two approaches on this basis:

| | `ATLAS.ini` | Registry |
|---|---|---|
| Settings remain editable in the interface | No — greyed out | Yes |
| Multi-string and binary values | Not supported | Supported |
| Applies per user | Yes, via that user's Documents folder | Yes, via that user's hive |
| Easy to copy between machines | Yes, one file | Requires a `.reg` export or script |

Because it locks values and travels as a single file, `ATLAS.ini` is the better fit for deployment. Use the registry for the few things the file cannot express, and where operators still need to be able to change a setting.

!!! note "The installer does not configure ADS"

    The ADS installer cannot apply configuration. It is a bootstrapper that installs prerequisites
    and then the ADS package, and it declares no variables that would let it pass settings through — so only the standard silent-install switches (`/quiet`, `/passive`, `/log`) apply, and none of them configure ADS.

    Treat configuration as a separate step: install ADS, then write `ATLAS.ini` or the registry
    values, then start ADS.

## See also

- [Options reference](options.md) — every ADS setting with its `ATLAS.ini` key, default and description
- [Getting Started](installation.md) — installing and first-run setup
- [Recorders](recorders.md) — what each recorder type does
- [RDS](rds.md) — Remote Data Server configuration
