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
    * Record telemetry from Motion Applied hardware, simulations, and third-party protocols
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
