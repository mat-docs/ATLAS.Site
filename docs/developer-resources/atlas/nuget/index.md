
# NuGet Packages

McLaren NuGet libraries are available from our [GitHub packages feed](https://github.com/orgs/mat-docs/packages?repo_name=packages).  
A free [GitHub](https://github.com/) account is required.

[Setup Packages Feed](setup.md){ .md-button .md-button--primary }

!!! info

    The packages feed includes all dependencies that are not available on [nuget.org](https://nuget.org/).  
    This includes some third-party libraries that have been patched for extended maintenance.

## Data and Recorder APIs

[_Read and Write McLaren Telemetry data_](../sql-race/index.md)

**MESL.SQLRace.API**
:   Data API, for reading and writing telemetry with McLaren SSN2 files and SQL Server databases;  
    Supports .NET Framework 4.8

**MESL.SQLRace.RTA**
:   Adds [RTA](#rta) support for SQL Race (above);  
    Supports .NET Framework 4.8

**MAT.ATLAS.SupportFiles**
:   Adds SSN (read-only) support to SQL Race (above), and provides headless Recorder APIs;  
    Supports .NET Framework 4.8;  
    Requires [Microsoft Visual C++ 2015-19 Redistributable (x64)](https://aka.ms/vs/16/release/vc_redist.x64.exe)

## ATLAS Display API

[_Create custom display plugins for ATLAS_](../display-api/index.md)

**Atlas.DisplayAPI**
:   ATLAS plugin API for creating custom displays;  
    Supports .NET Framework 4.8

## RTA

[_Integrate ATLAS with existing environments using Web Services_](../../rta/downloads.md)

**MAT.OCS.RTA.API**
:   Client API for testing and integration;  
    Supports .NET Standard 2.0 and 2.1

**MAT.OCS.RTA.Services.AspNetCore**
:   By far the quickest way to get a new RTA service off the ground;  
    Supports ASP.NET Core 2.1, 3.1 and 5.0

**MAT.OCS.RTA.Toolkit.API.GrpcClients**
:   Pre-compiled gRPC clients for the RTA Toolkit Services;  
    Supports .NET Standard 2.1 and .NET 5.0

## ATLAS Streaming

**MAT.OCS.Streaming**
:   Streaming telemetry client compatible with the ATLAS technology platform

**MAT.OCS.Streaming.Kafka**
:   Provides an Apache Kafka client for MAT.OCS.Streaming

**MAT.OCS.Streaming.Codecs.Protobuf**
:   Provides a faster, more compact serialization for telemetry data and samples;  
    Prefer this codec when working with large topics