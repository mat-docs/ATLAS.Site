# Configuration API

The configuration API is a new multi-platform API for ECU programming and monitoring, 
which makes it easier to handle multiple units, and to integrate across the network 
with clients written in languages including C#, C++, Python, Java or Go. The 
Configuration Service provides a modern, cross-platform [gRPC](https://grpc.io/) 
interface, and mediates access to the units – via System Monitor – across the network 
from multiple clients. 

![Diagram of the configuration API](assets/ConfigAPI_light.png#only-light)
![Diagram of the configuration API](assets/ConfigAPI_dark.png#only-dark)

All information available via the COM API will be available via the Configuration 
Service.

All calls to the API are managed on a single threaded basis and any subsequent calls are
blocked until previous requests are completed.

Measurement values are cached within the API server to provide the fastest possible 
response time to requests, these calls are not blocked due to other actions. The rate of
cache update is configurable.

A .NET Standard [client NuGet package](https://github.com/mat-docs/packages/pkgs/nuget/SystemMonitorConfigurationAPI)
and [interface definitions](https://github.com/mat-docs/System.Monitor.Configuration.API.Client.Sample/tree/cf34ad478c086dc43d2863b74f5516946049eaca/Protos)
are provided to make it easy to create interoperable tools using any mainstream language or platform.

This feature is available from System Monitor version 8.85 onwards.

## Migrated Methods Tracker

<iframe width="700" height="900" frameborder="0" scrolling="no" src="https://futureapplied.sharepoint.com/sites/ATLAS/_layouts/15/Doc.aspx?sourcedoc={db6cb843-b4cf-4bd8-ab24-7f20b2841e32}&action=embedview&wdAllowInteractivity=False&Item='Proposed%20gRPC%20API'!A1%3AE216&wdHideGridlines=True&wdInConfigurator=True&wdInConfigurator=True"></iframe>