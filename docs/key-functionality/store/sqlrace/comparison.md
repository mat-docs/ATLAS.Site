# SQLite, SQL Race DB & SSN2

This document provides a clear comparison between SQL Race Database, SQLite and SSN2, focusing on their roles within motorsport telemetry and general data management.

## SQL Race Database

SQL Race is a proprietary database access layer developed by Motion Applied, designed to handle high-frequency, structured telemetry data from motorsport environments. SQL Race sits on top of Microsoft SQL Server and provides a structured way to interact with telemetry and session data via SQL Race Database.

**Key Features:**

- Facilitates high-performance access to telemetry data stored in SQL Server.
- Supports multi-session synchronisation, composite session management, and statistical operations.
- Provides an API  for programmatic access in Python, C#, MATLAB.
- Optimised for large datasets and high concurrency.

**Best For:**

- Trackside and engineering teams needing robust performance and analytics at scale.
- Scenarios requiring live telemetry and complex queries.

## SQLite

SQLite is a SQL database used for simpler, local data storage needs embedded within ATLAS. It does not require a separate server process. The only way to create SQLite session (SSNDB) is using an ATLAS Recorder (`Database Engine = SQLite`) or directly through SRMS (SQL Race Management Studio). 

!!! tip
    ATLAS uses SQLite cache for storing telemetry or recorded data as local (temporary) cache. Users can move the data from local cache (SQLite) to SSN2 or SQL Race Database (using SRMS) if the data needs to be persisted. 

**Key Features:**

- Zero configuration – no server setup required.
- Portable and easy to integrate into standalone tools.
- Limited concurrency (single-writer, multi-reader).

**Best For:**

- Testing, or small-scale tools.
- Solo workflows or low-concurrency environments.

## SSN2 

SSN2 is an ATLAS session file format that bundles session metadata and data streams together for portability.

**Key Features:**

- Stores session data in a single file.
- Ideal for sharing and archiving sessions.
- No separate filestream (unlike SQLite and SQL Race).

**Best For:**

- Offline workflows and data exchange between teams.
- Quick review of sessions without database infrastructure.

## Feature Summary

| Feature             | **SQL Race Database**                     | **SQLite**                              | **SSN2**                          |
|---------------------|-----------------------------------------------|----------------------------------------|-----------------------------------|
| **Type**           | SQL Race ontop of SQL Server              | SQL Race ontop of SQL Server                     | File-based session format        |
| **Concurrency**    | High (multi-session, multi-user)            | Limited (single-writer, multi-reader) | Single-user                      |
| **Performance**    | Optimised for large, concurrent workloads   | Good for small/local workloads        | Basic (file read/write)          |
| **Setup**          | Requires SQL Server infrastructure          | None (Embedded in ATLAS Client)                           | None                             |
| **Use Case**       | Production-grade analytics, live telemetry  | Lightweight local storage, prototyping| Sharing and archiving sessions   |
| **File Stream**    | Yes                                         | Yes                                   | No                               |
