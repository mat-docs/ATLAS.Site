# Developer Functions

System Monitor includes various features available for experienced operators. These come under the following categories:

- **Diagnostics** — Provides information for embedded software developers and can be useful for troubleshooting the operation of the ECU and of System Monitor itself.
- **System Log** — Files of errors and events that occur during the operation of System Monitor.
- **Productivity Tools** — Allows repetitive processes to be automated and provides links with other applications.
- **Settings** — Changes various System Monitor configuration settings.
- **FIA Upload** — A utility for verifying that the code in the ECU meets FIA requirements.

## Diagnostics

Diagnostics provides information for embedded software developers and can be useful for troubleshooting the operation of the ECU and of System Monitor itself.

The Diagnostics tools are accessed from the Tools menu.

The following tools are available:

- **Read RAM** — Opens a window that displays the content of the memory for a particular controller in the attached ECU. (Shortcut: `ALT+R`)
- **Single Message** — Allows messages to be sent to the ECU and to view the response. (Shortcut: `ALT+M`)
- **Force Complete Reprogram** — Downloads all the data and code for the ECU whether it has changed or not. (Shortcut: `ALT+C`)

Only available when an ECU is connected.

## System Log

System Monitor creates files of errors and events that are caused by its own operation. (These are not the same as the Errors and Events which are due to the operation of the ECU.)

The contents of the files typically correspond to the on-screen messages but with much more detail.

The following files are created:

- `Pgv_xxx.txt` — log of messages generated when Creating Program Versions.
- `Cmd_xxx.txt` — log of commands issued from Menu commands or ActiveX.
- `Warn_xxx.txt` — log of warnings, in particular Parameters dropped from configurations, etc.
- `Unit_xxx.txt` — log of communications with the unit.

Where `xxx` is the username of the person logged onto the computer running System Monitor.

The directory for log files is defined in Advanced Settings. If no location is defined, the files are not created.

### Message Logs

A further level of detail is available in a Message Log which is used for debugging.

To create a Message Log:

1. Enable logging by selecting a log level in the **Message log level (for debugging)** Advanced Setting. This is normally set to Not Logging.
2. Write the log to the directory by clicking the Log IP Transaction button on the Standard Tool Bar.

The following file is created:

- `SM_Msgs_xxx.txt`

All log files are in ASCII format and can be read by any text editor.

### Error Messages During Operation

The messages linked to this topic should not occur during normal operation. They indicate that there may be a problem with your System Monitor installation or with your ASAP or Hex files.

## Productivity Tools

Productivity Tools allow repetitive processes to be automated and also provide links with other applications. The following tools are available:

- **Custom Menus** — Run applications other than System Monitor from menu commands in System Monitor.
- **Macros** — Record and play back sequences of keystrokes.

### Custom Menus

System Monitor includes a facility to run external applications.

Custom Menus creates additional entries in the Tools menu, which run executable files. The Custom Menu facility can be used for scripts and the McLaren Applied support team may use this facility to provide you with special functions in System Monitor.

Custom Menus are stored in the Windows Registry as part of the System Monitor application and are available to all Projects.

To open the Custom Menus dialog box, select: Tools > Customize.

Create a new custom menu entry:

1. Click `image\Custom_Menu_new_icon.gif`.
2. Enter the text that you want to appear in the Tools menu and press ENTER to accept it.
3. In the Command text box enter or browse for the name of the executable file that you want to be run by the menu entry.
4. Enter Arguments or Working Directory, if required.
5. Click Close to accept the menu entries.

Existing entries can be edited if required. When an entry is selected in the Menu Contents list, its Command, Arguments and Working Directory text boxes can be edited. To rename an entry, select it in the Menu Contents list, then click on it.

- `image\Custom_Menu_delete_icon.gif` — Deletes the selected entry.

The menu entries appear in the Tools menu in the same order as they appear in the Menu Contents list.

- `image\Custom_Menu_up_icon.gif` — Moves the selected entry one place up the list.
- `image\Custom_Menu_down_icon.gif` — Moves the selected entry one place down the list.

### Macros

System Monitor includes a facility to record keystrokes and to replay them as Macros. Macros are stored in the Windows Registry as part of the System Monitor application and are available to all Projects.

!!! note
    Mouse movements are not recorded.

To open the Macros dialog box, select: Tools > Macros.

Record a new macro:

1. Click Record to open the Record New Macro dialog box.
2. Enter a Description.
3. Enter a Shortcut key sequence. The shortcut consists of one or more control keys (`CTRL`, `ALT` or `SHIFT`) and a function key or any letter or number.
4. Select the number of times you want the Macro to repeat on playback. The default is `0`. Check Repeat Forever if you want the Macro to continue to repeat until you press `CTRL+ESC`.
5. Select the Playback Speed that you want the Macro to run at. The default is `x1`.
6. Click OK. The dialog boxes close and all keystrokes are recorded until you press `F2`.

The Description, Shortcut, Repetition and Playback Speed of the selected macro can be edited in the Macro dialog box.

To delete a macro, select it from the Macros list and click Delete.

To play or stop a macro:

- To play a macro, select it from the Macros list and click Play. Alternatively, you can play a macro by pressing the shortcut key sequence; the Macro dialog box must be closed.
- To stop a macro that is playing, press `CTRL+ESC`.

## FIA Upload

System Monitor includes a utility for verifying that the code in the ECU meets FIA requirements. The utility is a separate program that runs outside System Monitor. It is installed with System Monitor in the same location as the System Monitor files.

For more information on using the FIA Upload utility, please contact Technical Support and ask for the Working Practice Document “Uploading Code and Data for FIA Software Checks” TWPD0066.