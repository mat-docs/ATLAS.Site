# Downloads

## Toolkit Services

These [services](../services/index.md) provide an implementation toolkit covering some or all of the functionality in the [RTA API Specification](api/index.md).

Combined with the [libraries](nuget.md) to support [Data Service](../../extending-atlas/rta/introduction/data-services.md) development, this can significantly reduce integration work.

### Docker

Images are available from [Docker Hub](https://hub.docker.com/u/mclarenapplied):

* [RTA Server](https://hub.docker.com/r/mclarenapplied/rta-server) &mdash; `mclarenapplied/rta-server`
* [RTA Session Service](https://hub.docker.com/r/mclarenapplied/rta-sessionsvc) &mdash; `mclarenapplied/rta-sessionsvc`
* [RTA Config Service](https://hub.docker.com/r/mclarenapplied/rta-configsvc) &mdash; `mclarenapplied/rta-configsvc`
* [RTA Data Service](https://hub.docker.com/r/mclarenapplied/rta-datasvc) &mdash; `mclarenapplied/rta-datasvc`
* [RTA Gateway Service](https://hub.docker.com/r/mclarenapplied/rta-gatewaysvc) &mdash; `mclarenapplied/rta-gatewaysvc`
* [RTA Stream Service](https://hub.docker.com/r/mclarenapplied/rta-streamsvc) &mdash; `mclarenapplied/rta-streamsvc`
* [RTA Schema Mapping Service](https://hub.docker.com/r/mclarenapplied/rta-schemamappingsvc) &mdash; `mclarenapplied/rta-schemamappingsvc`
* [RTA Influx Data Service](https://hub.docker.com/r/mclarenapplied/rta-influxdatasvc) &mdash; `mclarenapplied/rta-influxdatasvc`

### Binaries

* v2.0.0 &mdash; [Windows (64-bit)](https://github.com/mat-docs/RTA.Releases/releases/download/v2.0.0/toolkit-win-x64.zip) / [Linux (64-bit)](https://github.com/mat-docs/RTA.Releases/releases/download/v2.0.0/toolkit-linux-x64.zip)

## Code Samples

Clone the sample project from [RTA.Examples](https://github.com/mat-docs/RTA.Examples) on GitHub.

You will need a free GitHub account.

## NuGet Packages

These .NET libraries reduce development effort to build and test an RTA service:

MAT.OCS.RTA.API
: Client API for testing and integration;  
  Supports .NET Standard 2.0 and 2.1

MAT.OCS.RTA.Services.AspNetCore
: By far the quickest way to get a new RTA service off the ground;  
  Supports ASP.NET Core 2.1, 3.1 and 5.0

MAT.OCS.RTA.Toolkit.API.GrpcClients
: Pre-compiled gRPC clients for the [Toolkit Services](../reference/services);  
  Supports .NET Standard 2.1 and .NET 5.0

Refer to the [Developer Guide](worked-guide/index.md) for more details.

These libraries are all available from our [GitHub packages feed](https://github.com/mat-docs/packages).  
A free [GitHub](https://github.com/) account is required.

=== "RTA Libraries"

    | Package                             | Description                                                                |
    |-------------------------------------|----------------------------------------------------------------------------|
    | MAT.OCS.RTA.API                     | RTA client library, supporting the RTA REST API and WebSocket interface.  |
    | MAT.OCS.RTA.Model                   | RTA data model, including classes modelling the API responses.             |
    | MAT.OCS.RTA.Services                | Service interfaces to be implemented by customer-specific backends.        |
    | MAT.OCS.RTA.Services.AspNetCore     | ASP.NET API Controllers and Formatters implementing the RTA specification. |
    | MAT.OCS.RTA.Toolkit.API.GrpcClients | Pre-compiled gRPC clients for use from services or utilities.              |
    | MAT.OCS.RTA.Toolkit.API.GrpcServers | Pre-compiled gRPC servers/clients for use from services only.              |
    | MAT.OCS.RTA.StreamBuffer            | RTA stream buffering via Redis.                                            |

=== "Supporting Libraries"

    | Package                             | Description                                                                |
    |-------------------------------------|----------------------------------------------------------------------------|
    | MAT.OCS.Configuration               | ATLAS configuration model, including a builder API.                        |
    | MAT.OCS.Configuration.Json          | Binds the configuration model to JSON.                                     |
    | MAT.OCS.FFC                         | Fast Configuration API - a binary configuration format (FFC).              |
    | MAT.OCS.FFC.Configuration.Format    | Fast Configuration implementation.                                         |
    | MAT.OCS.FFC.Configuration           | Reads Fast Configuration (FFC) resources as MAT.OCS.Configuration.         |
    | MAT.OCS.FFC.ConfigSerializer        | Serializes MAT.OCS.Configuration models as Fast Configuration (FFC).       |

