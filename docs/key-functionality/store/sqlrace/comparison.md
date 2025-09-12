# SQLite vs SQLRace Comparison

This document provides a clear comparison between SQLRace Database and embedded SQLite, focusing on their roles within motorsport telemetry and general data management.

## SQLRace

**Purpose-built for motorsport telemetry and session data:**  
SQLRace is a proprietary database system developed by Motion Applied, designed to handle high-frequency, structured telemetry data from motorsport environments.

**Server-based architecture:**  
Runs on Microsoft SQL Server and supports advanced features such as session synchronisation, composite session management, and statistical operations via the SQLRace API.

**Integration with ATLAS ecosystem:**  
Tightly integrated with ATLAS tools for live session recording, data analysis, and visualisation. Supports exporting to formats like Parquet and is optimised for large-scale, multi-session environments.

**API-driven development:**  
Provides a NuGet package for programmatic access, supporting languages like Python, C#, and MATLAB.

## SQLite

**Lightweight and file-based:**  
SQLite is an embedded database used for simpler, local data storage needs. It does not require a separate server process.

**Limitations in concurrency and performance:**  
While convenient, SQLite may experience performance issues under concurrent access or large data volumes.

## Comparison: SQLRace vs SQLite

| Feature            | SQLRace                                                | SQLite (Embedded RDBMS)             |
|--------------------|--------------------------------------------------------|-------------------------------------|
| Definition         | Proprietary, server-based telemetry DB                 | Lightweight, file-based SQL DB      |
| Architecture       | Runs on Microsoft SQL Server                           | Serverless, self-contained          |
| Use Case           | High-frequency telemetry, session analytics            | Mobile, embedded, local storage     |
| Performance        | Optimized for large, concurrent workloads              | Fast for single-user, low concurrency|
| Setup              | Needs infrastructure, ATLAS integration                | Zero-config, portable               |
| Stored Procedures  | Supported (via SQL Server)                             | Not supported                       |
| Concurrency        | High, multi-session                                    | Limited (single-writer, multi-reader)|
| Scalability        | High, multi-session, large datasets                    | Limited by file size and memory     |

## Choosing the Right Tool

### SQLRace

**Choose SQLRace if:**

- You need real-time session data handling and live telemetry streams.

- You need robust performance, scalability, and reliability for large workloads.

**Benefit:**  
Purpose-built for complex, high-frequency data workflows—ideal for motorsport engineering and analytics.

### SQLite

**Choose SQLite if:**

- You need a quick, portable, serverless solution.

- You work solo or with low concurrency requirements.

- You want simplicity without managing server infrastructure.

**Benefit:**  
Fast, simple, and perfect for prototyping, testing, or lightweight applications.

## Feature Summary

| Feature        | SQLRace                                 | SQLite                                 |
|----------------|-----------------------------------------|----------------------------------------|
| Best For       | High-performance telemetry & analytics  | Lightweight local storage & prototyping|
| Architecture   | Server-based (SQL Server)               | Embedded, file-based                   |
| Concurrency    | High                                    | Limited                                |
| Integration    | ATLAS tools, telemetry APIs             | Standalone apps, embedded systems      |
| Setup          | Requires infrastructure                 | Zero-configuration                     |
| Use Case       | Production-grade analytics              | Development, testing, small tools      |