# Overview

SQLRace is the session database engine used by ATLAS to manage telemetry data. It provides a structured way to store, retrieve and manipulate session data, supporting both real-time and historical analysis. SQLRace integrates tightly with the tools in the ATLAS product suite, enabling efficient data handling. 

SQLRace is a custom SQL Server implementation specific for data store. It supports MS SQL Replication where replication of data is required over multiple sites. 

## Core Capabilities

1. Session Management: Handles creation, loading and association of sessions, including composite sessions for comparitive analysis. 
2. Data Access Layer: Provides APIs for reading, and writing data. Including parameters, events and session summaries. 
3. Filestream integration: Uses SQL Server with filestreams for efficient storage of large binary data such as channel and event logs.

<div class="grid cards" markdown>

-   __Setup with SQL Race__

    ---

    Learn how to install SQL Server and SQLRace Database.

    [→ Getting started](installation.md)

-    __Start using the SQLRace API__

    ---

    Automate access to sessions, parameters and events.

    [→ API Guide](../../../developer-resources/atlas/sql-race/index.md)

</div>