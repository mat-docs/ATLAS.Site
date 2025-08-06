# Reading, Writing and Recording Data with the SQL Race API

The ATLAS Data layer is provided by the SQL Race API, which provides:

=== "Data Model"

    * Session metadata management &mdash; including search
    * Configuration model &mdash; which describes available data
    * Data samples, events, errors and lap markers
    * Composite Session management
    
=== "I/O"

    * Read ATLAS SSN files
    * Read and Write SSN2 files and shared MS SQL Server telemetry databases
    * Record telemetry from McLaren hardware, simulations, and third-party protocols
        * Monitor and extract the live telemetry
        * Augment the recording with additional data
    * Read data from third-party files
    * Pull data from RTA web services

=== "Compute"

    * Resampling and Interpolation
    * Statistics
    * Virtual Parameters
    * Functions (C# and FDL, including [processor routines](../../../key-functionality/visualise/atlas/functions/processing.md))

!!! note

    The ATLAS Automation API also provides data access, but the SQL Race API is more direct and will yield better performance.

[Code Samples](https://github.com/mat-docs/MAT.OCS.SQLRace.Examples){ .md-button } [API Reference](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/){ .md-button }

## Prerequisites

* Visual Studio 2019 or later
* .NET 6 or later

## Code Samples Index

[MAT.SQLRace.HelloData](https://github.com/mat-docs/MAT.OCS.SQLRace.Examples/tree/master/MAT.SQLRace.HelloData)
:   * Searching and loading sessions
    * Loading a live session recording into a shared database
    * Loading multiple sessions together as a composite
    * Loading SSN files and associate sessions
    * Reading and writing events
    * Reading and writing data
    * Calculating lap statistics
    * Adding and reading [Markers](../../../key-functionality/visualise/atlas/handling-data/laps-markers/markers.md)

[MAT.SqlRace.StandaloneRecorder](https://github.com/mat-docs/MAT.OCS.SQLRace.Examples/tree/master/MAT.SqlRace.StandaloneRecorder)
:   * Embedding the ATLAS Data Server Telemetry (DST) recorder
    * Monitoring live data from the recorder
    * Writing augmented data back into the live session

[MAT.SqlRace.Functions.HelloDotNet](https://github.com/mat-docs/MAT.OCS.SQLRace.Examples/tree/master/MAT.SqlRace.Functions.HelloDotNet)
:   * Writing a [Function DLL](../../../key-functionality/visualise/atlas/functions/using-dlls.md), for use in the API and in ATLAS

[MAT.SQLRace.FileLoaderSample](https://github.com/mat-docs/MAT.OCS.SQLRace.Examples/tree/master/MAT.SQLRace.FileLoaderSample)
:   * Writing a Session Loader DLL to read a third-party file format (CSV example)

[Python](https://github.com/mat-docs/MAT.OCS.SQLRace.Examples/tree/master/Python)
:   * Loading a session
    * Reading events
    * Reading data
