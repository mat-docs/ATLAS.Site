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

    - You already have your databases setup, with data and want to avoid a migration to SQL Server
    - You want flexibility of scaling and integration with other Cloud services
    - There are many other tools in your data pipeline that need to query the same data source

## Data Distribution

When you need to get data from physical systems to downstream clients.

=== "ADS + RDS"

    The traditional ATLAS live data path. ADS accepts incoming telemetry (either by wirelink, radio or ethernet) and multicasts to downstream clients on the same local network.

    Pick when:

    - You need low-latency live data on a local network
    - Data is coming directly from physical systems or vehicles
    - Downstream consumers are on the same LAN
    - You want a simple, proven live telemetry path
    - You do not need cloud distribution or long-term buffering
    - Consumers are expected to be online at the same time as the data source

=== "Open Streaming"

    A Kafka-based streaming layer that decodes raw data from ADS and publishes it to defined Kafka topics.

    Pick when:
    
    - You need to read or write data on Kafka
    - You want to decouple producers and consumers
    - Data needs to be consumed by multiple independent downstream systems
    - You are building event-driven, scalable, or cloud-based architectures
    - You need replayability or durable streams
    - Consumers may be remote, offline, or join later
    - You want to ingest third party data sources

=== "RTA"

    A websocket interface for session data. Data can be buffered through Redis so clients can join at any point.

    Pick when:

    - You need to distribute session-based data in near real time
    - Clients need to join late and still receive buffered data
    - You want a browser- or UI-friendly interface (WebSockets)
    - You are supporting visualisation tools or dashboards
    - Kafka is not required, but live-ish access is
    - You want controlled fan-out without full streaming infrastructure

=== "Local File Share"

    Local files that can be sent manually to team members or uploaded to a network drive.

    Pick when:
    
    - Data volumes are small or manageable
    - Real-time access is not required
    - You need manual review or ad-hoc sharing
    - Consumers are humans, not systems
    - You want the simplest possible distribution mechanism
    - The workflow is offline, asynchronous, or low frequency

## Calculated Channels

When you need to compute derived parameters. 

=== "FDL"

    Built in expression language for ATLAS Viewer.

    Pick when:

    - Your calculations are simple and can be achieved with standard mathematical operations. 

=== "C# .NET Functions"

    Custom functions written in C# can be embedded in XFN or compiled into a DLL.

    Pick when:

    - You have existing C# functions you wish to reuse without rewriting
    - You need advanced Object Oriented Programming functionality 
    - You require multiple function outputs

=== "MATLAB Functions"

    Custom functions defined via .XFN that delegates execution to a MATLAB script.

    Pick when:

    - You have existing MATLAB functions you wish to reuse without rewriting into FDL
    - You want to use native MATLAB functionality to process complicated mathematical equations.

=== "vTAG Server"

    Software application that executes Simulink models against data, producing parameters that appear in ATLAS Viewer. 

    Pick when:
    
    - You have Simulink models that you want to run 
    - You have hardware running physically and you wish to augment by adding software modelling ontop
    - You wish to standardise models and ensure all downstream clients have the same virtual outputs
    - You are running an ADS setup

=== "Virtual Parameter Service"

    Microservice that can be deployed alongside Open Streaming to move calculations downstream of clients.

    Pick when:

    - You want to co-ordinate consistency with virtuals from a centralised location separate from each client
    - You need to monitor the throughput of virtual processing
    - You require performant calculation of virtual parameters separate from the load of downstream clients
    - You are running the Open Streaming Architecture

## Programmatic Access

When you need to read, write or manipulate your data either from inside or outside of the ATLAS Ecosystem. 

=== "SQL Race API"

    For reading, writing and managing session data.

    Pick when:

    - You do NOT need to automate ATLAS interactions.
    - You need to extract session data, regardless of session type
    - You do NOT need to load the session into ATLAS.
    - You want a direct, simpler integration focused on SQLRace session handling without UI or automation complexity.

    !!! tip "Supported session formats"
        - SSN
        - SSN2
        - SQL Race Session

=== "Automation API"

    For controlling the UI of ATLAS Viewer programmatically.

    Pick when:

    - You need to automate ATLAS interactions.
    - You need to load session data into ATLAS.
    - The workflow involves programmatic control of ATLAS actions, such as loading or manipulating sessions.

    !!! tip "Supported session formats"
        - SSN
        - SSN2
        - SQL Race Session

=== "Display API"

    For creating custom display plugins in ATLAS Viewer.

    Pick when:

    - You need to automate ATLAS interactions and
    - You want to add custom displays (visualization or UI enhancements).

=== "Stream API"

    For interfacing with the Kafka broker.

    Pick when:

    - You are using Kafka
    - You need live or continuous data streams
    - You need to consume data from Kafka topics
    - You need to publish data into Kafka topics
    - You are building event-driven or real-time systems

    !!! tip "Support Library"
        Support library is recommended to be used instead of the Stream API directly as it provides many helpful wrappers which can be used to simplify the process of interfacing with the broker. 
