# Unit.Def Files

Unit.Def files are XML-based configuration files that define project options. They replace the legacy Multi-Application and Customer Base structure.

## Configuration
- One Unit.Def file per folder.
- Applied to all projects in that folder.
- Managed via `File > Manage Unit.Def Files…` (only when no project is loaded).

## Applications

Applications can be added manually or auto-configured by scanning PGV files in subfolders.

- Each application requires an ASAP definition name and default folder.
- Applications can be enabled/disabled or deleted.
- One application can be set as the master.

## Options

- Define default locations for project files.
- Override comms path settings.
- Specify a Prime Parameter Override (.ppo) file.

## Saving

Changes are saved when selecting a new Unit.Def file or exiting the dialog.

## Opening Projects

Three methods:

1. `File > Open… Ctrl+O`: Opens from the most recent Unit.Def folder.
2. `File > Open… >`: Browse any folder.
3. Recent Projects list: Quick access to last 10 projects.

System Monitor looks for a matching Unit.Def file in the selected folder.