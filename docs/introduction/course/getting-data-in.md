# Getting your data in

**Course step 7 of 9 · about 15 minutes**

So far you have opened sessions someone else prepared. This page covers where sessions come from, how to bring your own data into Viewer, and how to get it back out.

## Where is your data?

| Your data is… | Route into Viewer | Learn more |
|---|---|---|
| Already in a SQL Race database | Add the database as a source in the Session Browser with **Connection Manager...** | [Database Connection Manager](../../key-functionality/analyse/viewer/handling-data/sessions/database-connection.md) |
| In `.ssn2` or legacy `.ssn` files | Add the folder as a source with **Folder Manager...** | [Session Browser](../../key-functionality/analyse/viewer/handling-data/sessions/browser.md) |
| In CSV or TXT files | Import as delimited text (needs the **CSV/ASCII Import** licence option) | [Delimited text](#delimited-text-csv-and-txt) below |
| Arriving live from hardware or a server | Add a **recorder** | [Live data](#live-data-with-recorders) below |
| In an existing database that you want to keep | **RTA** service connection (needs an RTA licence) | [Integrate](../../key-functionality/integrate/index.md) |
| In another format | Read it with the SQL Race API and write it into a session | [Automating it](automating.md) |

## Delimited text (CSV and TXT)

Text files need a **format definition** that tells Viewer where the headers, parameter names, units and time column are. Set one up in **Tools > Options > General > Text Session Format**.

For each file extension you define:

- how many header lines the file has, and which line holds parameter names, group names and units,
- the time format (`DateTime`, `Milliseconds`, `Seconds` or `Time`), and
- the delimiter (tab, space, comma or semicolon).

There is one definition per extension, so a `csv` definition covers all your `.csv` files. See [Importing CSV and TXT files](../../key-functionality/analyse/viewer/handling-data/sessions/csv-txt-import.md) for every field.

## Live data with recorders

A **recorder** captures live data and writes it into a session. You add one from the **Session Recorders** panel of the Session Browser. The types match the route the data takes:

| Recorder | Use it for |
|---|---|
| [Data Server Telemetry](../../key-functionality/analyse/viewer/handling-data/recorders/data-server.md) | A live stream from an ATLAS Data Server on your network |
| [Stream Recorder](../../key-functionality/analyse/viewer/handling-data/recorders/stream-recorder.md) | Live telemetry from a Kafka broker (Open Streaming) |
| [Ethernet Telemetry](../../key-functionality/analyse/viewer/handling-data/recorders/ethernet-file.md) | Recording telemetry directly from a car's units over Ethernet |
| [File Telemetry](../../key-functionality/analyse/viewer/handling-data/recorders/file-telemetry.md) | Replaying a previously recorded raw telemetry file (`.raw_tm`) |
| [Ethernet Offload](../../key-functionality/analyse/viewer/handling-data/recorders/ethernet-offload.md) | Offloading the most recent session from an Ethernet-connected ECU |
| [Ethernet Multi Session Offload](../../key-functionality/analyse/viewer/handling-data/recorders/ethernet-mso.md) | Offloading several stored sessions from ECUs that support multi-session memory |
| [USB Recorder](../../key-functionality/analyse/viewer/handling-data/recorders/usb-logger.md) | Data collected by a Motion Applied USB Logger |

Some recorder types appear only if your licence includes them.

When you add a recorder to a set, you choose a **mode**:

| Mode | Each new recording… | Good for |
|---|---|---|
| **Create** | creates a new, separate session | Independent runs |
| **Replace** | replaces the previous session in the set | Iterative work where only the latest matters |
| **Append** | is appended to the existing sessions, forming a composite session | Continuous collection across phases |

!!! warning "Starting a recorder does not load the session"
    Add the new session to a set yourself, or you will not see it.

If you want to record without keeping Viewer open, the [Standalone Stream Recorder](../../key-functionality/analyse/standalone-stream-recorder/index.md) records Stream API telemetry to SSN2 files or a SQL Race database.

## Choosing a storage format

Files and databases are not exclusive. Many teams use both, at different stages.

| | Files | SQL Race database |
|---|---|---|
| **Good when** | You need to move data without shared infrastructure, work offline, or archive cheaply | Several people need the same sessions, and you want to browse and filter by metadata |
| **Formats** | **SSN2** (ATLAS-native, full fidelity), CSV (universal, large), MATLAB (for model work), Parquet (for analytics pipelines) | SQL Server or SQLite behind SQL Race |

The details and the "pick this when" lists are in [Choosing components](../ecosystem-guide.md#storing-data).

## Getting data out

Right-click a session in the Session Browser and choose **Export Session** to write a complete session to SSN2 (the session must not be loaded in a set).

For more control, use the **Export Manager** (**Tools > Export Data** or `Ctrl+E`, needs the **CSV/ASCII Export** licence option). You can choose which parameters and laps to export, and the format: **Text**, **MATLAB 1D or 2D**, **SSN2** or **SQL Race Database**. Save configurations and re-run them. See [Export Manager](../../key-functionality/analyse/viewer/handling-data/export/export-manager.md).

To share your *set-up* (functions, constants, alarms, settings) rather than data, use a configuration bundle (`.acgx`) from **Tools > Import/Export Configuration**.

## Next

[Beyond Viewer](beyond-viewer.md) lifts the lid on the rest of the ecosystem, so you know what the people around you are running.
