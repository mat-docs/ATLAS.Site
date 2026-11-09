# Automating it

**Course step 9 of 9 · about 10 minutes**

If you are used to scripting your analysis, you can do the same here. ATLAS has several APIs, each for a different job. The important decision is which one, and the table below makes it for you.

## Which API?

| I want to… | Use | Notes |
|---|---|---|
| Read, write or search session data from my own code | **[SQL Race API](../../developer-resources/atlas/sql-race/index.md)** | The most direct and performant route to the data. Works with SQL Race databases, SSN2 and SSN files. C# on .NET. |
| Drive Viewer itself: load sessions, build workbooks, set display properties | **[Automation API](../../developer-resources/atlas/automation-api/index.md)** | Controls the running application. Also provides data access, though SQL Race is more direct. |
| Add a new kind of display to Viewer | **[Display API](../../developer-resources/atlas/display-api/index.md)** | Plug-ins that run natively inside Viewer. |
| Read or publish live data on a broker | **[Stream API](../../developer-resources/secu4/stream_api/index.md)** and **[Support Library](../../developer-resources/secu4/support_library/index.md)** | Open Streaming. The Support Library wraps the Stream API and is recommended for most services. |
| Configure ECUs from code | **[Configuration API](../../developer-resources/system-monitor/configuration_api/index.md)** | Cross-platform gRPC interface. |
| Connect to my own database | **[RTA](../../key-functionality/integrate/rta/index.md)** | Write a data adapter, and ATLAS can read your existing store. |

If you are not sure between SQL Race API and Automation API, ask: *do I need to control Viewer?* If not, use the SQL Race API.

## Common jobs

### "I want my analysis in MATLAB"

Two routes. Export sessions from Viewer with the Export Manager (**MATLAB 1D** and **2D** formats), or write MATLAB or C# functions that Viewer runs directly, so results appear as parameters. See [Channels and calculated parameters](channels-and-calculations.md).

### "I want to batch-process many sessions"

Use the SQL Race API to search for sessions, read their data and laps, and calculate statistics. The [SQL Race code samples](https://github.com/mat-docs/MAT.OCS.SQLRace.Examples) include searching and loading sessions, reading and writing data, and calculating lap statistics.

### "I want to bring my own data in"

Use the SQL Race API to read your files and create sessions, then open them in Viewer like any other. See [Getting your data in](getting-data-in.md).

### "I want to automate Viewer"

Use the Automation API to load sessions, generate workbooks and set display and parameter properties. See the [code samples](https://github.com/mat-docs/Atlas.AutomationAPI.Examples).

### "I want to mark regions of interest automatically"

Add [markers](../../key-functionality/analyse/viewer/handling-data/laps-markers/markers.md) from code with the SQL Race API, for example from a script that finds events. They show up on the Timeline in Viewer.

## Where to go next

- [Developer Resources](../../developer-resources/index.md): all the API areas in one place.
- [NuGet packages](../../developer-resources/atlas/nuget/index.md): how to get the libraries.
- [Developer community](https://github.com/atlas-dev-hub): community examples and projects.

## You have finished the course

You now know the vocabulary, the model, and how to find your way around. For anything specific, use search, or go to the section you need from the navigation:

- **[Viewer user guide](../../key-functionality/analyse/viewer/index.md)** for every display, option and shortcut.
- **[Glossary](../glossary.md)** for any term that is still unfamiliar.
- **[Choosing components](../ecosystem-guide.md)** for decisions about storage, distribution and calculation.
