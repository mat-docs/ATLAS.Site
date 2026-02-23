# Ecosystem Guide

Not sure where to start? This guide will help you find the right ATLAS components for what you're trying to do. No prior knowledge of the software needed.

ATLAS is an ecosystem for working with telemetry data - the measurements that come from sensors, controllers, and simulation in high performance engineering environments. 

``` mermaid
graph LR
    A["Configure"] --> B["Stream"]
    B --> C["Store"]
    B --> E["Enrich"]
    E --> B
    B --> D["Analyse"]
```

| Stage     | What Happens    | Example    |
|-----------|-----------------|------------|
| [Configure](../key-functionality/configure/system-monitor/index.md) | Setup hardware so it knows what to measure               | Defining which sensors to log on an ECU                  |
| [Stream](../key-functionality/stream/index.md)    | Move live data from hardware to software                 | Telemetry flowing from a car to the pitwall              |
| [Enrich](../key-functionality/enrich/index.md)     | Run models or calculations on data to create parameters  | Running a Simulink aero model against live telemetry     |
| [Store](../key-functionality/store/index.md)      | Save live data for later use                             | Archiving a race session for post-event review           |
| [Analyse](../key-functionality/analyse/index.md)    | Visualise and explore the data                           | Overlaying two laps to find where time was lost          |

## Storing Data

There are two broad choices: files or databases. They are not mutually exclusive, some teams will use both but at different stages. 

=== "Files"

    Self contained data files on disk. Copy, email, upload, put them on a USB stick. No server required. 

    Pick files when:

        - Portability matters when you're sharing data with someone without access to your internal IT infrastructure
        - You frequently work offline with just a laptop
        - Batch processing is part of your workflow
        - Long time archiving on a network drive or S3 bucket is cheaper than keeping a database running
        - Interoperability

    !!! tip "Which format?"
        - SSN2 is ATLAS-native file with full session fidelity. Use when data is staying in the ATLAS ecosystem. 
        - CSV is the universal fallback, any tool will work with CSV. But it's large and slow for big data sets and some configuration is necessary.
        - MATLAB is best if you frequently run models using Simulink and have control-system workflows.
        - Parquet is best for analytics, data science and cloud pipelines. Some configuration is needed to work with ATLAS.

=== "SQL Race Database"

    A purpose built database layer ontop of SQL Server or SQLite. Manage sessions, configuration and data.

    Pick SQL Race Database when:

        - You are capturing data from sensors in real-time
        - You need to browse, filter and sort sessions by metadata instead of folder structures
        - A team of engineers need concurrent access to the same session

=== "Other Database Structure - RTA"

    RTA is an architectural API layer that sits between ATLAS and any existing data store. 

    Pick RTA when:
    
        - You already have your databases setup, with data and want to avoid a migration
        - You want flexibility of scaling and integration with other Cloud services
        - There are many other tools in your data pipeline that need to query the same data source

## Data Distribution

When you need to get data from physical systems to downstream clients.

=== "ADS + RDS"

    The traditional ATLAS live data path. ADS accepts incoming telemetry (either by wirelink, radio or ethernet) and multicasts to downstream clients on the same local network.

=== "Open Streaming"

    A Kafka-based streaming layer that decodes raw data from ADS and publishes it to defined Kafka topics.

=== "RTA"

    A websocket interface for session data. Data can be buffered through Redis so clients can join at any point.

=== "Local File Share"

    Local files that can be sent manually to team members or uploaded to a network drive.

## Calculated Channels

When you need to compute derived parameters. 

=== "FDL"

    Built in expression language for ATLAS Viewer.

=== "C# .NET Functions"

    Custom functions written in C# can be embedded in XFN or compiled into a DLL.

=== "MATLAB Functions"

Custom functions defined via .XFN that delegates execution to a MATLAB script.

=== "vTAG Server"

    Software application that executes Simulink models against data, producing parameters that appear in ATLAS Viewer. 

=== "Virtual Parameter Service"

    Microservice that can be deployed alongside Open Streaming to move calculations downstream of clients.

## Programmatic Access

When you need to read, write or manipulate your data either from inside or outside of the ATLAS Ecosystem. 

=== "SQL Race API"

    For reading, writing and managing session data.

=== "Automation API"

    For controlling the UI of ATLAS Viewer programmatically.

=== "Display API"

    For creating custom display plugins in ATLAS Viewer.

=== "Stream API"

    For interfacing with the Kafka broker 

    !!! tip "Support Library"
        Support library is recommended to be used instead of the Stream API directly as it provides many helpful wrappers which can be used to simplify the process of interfacing with the broker. 

## Common Architectures

=== "Small Teams/Individuals"



=== "Multi-site Operations"

=== "Cloud Native Teams"