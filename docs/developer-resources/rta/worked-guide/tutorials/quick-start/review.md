# Quick-Start &mdash; Review

!!! info

    Complete the [Walkthrough](index.md) first.

This demo project illustrates a data loading pattern, where data is format-shifted for use with ATLAS.

This is not the only way to use RTA.
You can also connect to existing stores using a [Data Service as an adapter](../../../introduction/data-services.md). 

## Importing NuGet Packages

The project imports [NuGet Packages](../../../downloads/nuget.md) from the McLaren GitHub feed:

```xml
  <ItemGroup>
    <PackageReference Include="MAT.OCS.RTA.Toolkit.API.GrpcClients" Version="2.0.0" />
  </ItemGroup>
```

This package provides everything needed to write a tool that communicates with the [Toolkit Services](../../../services/index.md).

Pre-compiled gRPC clients are included. You can [compile your own](https://developers.google.com/protocol-buffers) from the gRPC API schemas:

* [Session Service gRPC API](../../../services/rta-sessionsvc/grpc.md)
* [Config Service gRPC API](../../../services/rta-configsvc/grpc.md)
* [Data Service gRPC API](../../../services/rta-datasvc/grpc.md)
* [Schema Mapping Service gRPC API](../../../services/rta-schemamappingsvc/grpc.md)

## Configuring gRPC Clients

A gRPC network connection is called a _Channel_ in most languages:

```c#
using var channel = GrpcChannel.ForAddress("http://localhost:8082");
```

The `using` keyword means the channel will get cleaned up when it goes out of scope.

Creating channels involves setting up a new network connection, so they should be reused.

The clients can share the same channel if the same endpoint is offering multiple gRPC services (like [RTA Server](../../../services/rta-server/grpc.md)):

```c#
var sessionClient = new SessionStore.SessionStoreClient(channel);
var configClient = new ConfigStore.ConfigStoreClient(channel);
var dataClient = new DataWriter.DataWriterClient(channel);
```

!!! tip

    Prior to .NET 5.0, there is an extra step to communicate with a gRPC service without TLS:

    [https://docs.microsoft.com/en-us/aspnet/core/grpc/troubleshoot?view=aspnetcore-5.0#call-insecure-grpc-services-with-net-core-client](https://docs.microsoft.com/en-us/aspnet/core/grpc/troubleshoot?view=aspnetcore-5.0#call-insecure-grpc-services-with-net-core-client)

## Uploading Data

This project demonstrates loading data into the toolkit [Data Service](../../../services/rta-datasvc/grpc.md), using a simple Signal Generator as a source.

Data is uploaded to the service as a stream of messages.

```c#
using var dataStream = dataClient.WriteDataStream();
var requestStream = dataStream.RequestStream;
```

The first message must be the data identity, so the service knows how to store the data:

```c#
await requestStream.WriteAsync(new WriteDataStreamMessage
{
    DataIdentity = dataIdentity
});
```

The data is sent channel-by-channel in short bursts.

In this example, the data is [represented as periodic samples](../../data/index.md#periodic-data) since the timestamps are evenly spaced.

```c#
var burst = new PeriodicData
{
    ChannelId = (uint) f,
    StartTimestamp = startNanos + offset,
    Interval = intervalNanos,
    Samples = burstLength,
    Buffer = ByteString.CopyFrom(MemoryMarshal.AsBytes(burstSamples.AsSpan()))
};

await requestStream.WriteAsync(new WriteDataStreamMessage
{
    PeriodicData = burst
});
```

Finally, complete the stream call:

```c#
await requestStream.CompleteAsync();
```

!!! tip

    Avoid unneccessary memory allocation by reusing data arrays where possible.

    This will have the biggest impact on the performance of your tools and services.

!!! note

    A burst of data should contain up 128 samples.

    Note that a gRPC message cannot exceed 4 MiB unless all clients and services are configured for a higher limit.

## Configuration

The configuration tells ATLAS what data is available, and how to render it.

=== "Sample Code"

    Configuration is defined here using the _MAT.OCS.Configuration_ library, which is brought in as a [NuGet Package](../../../downloads/nuget.md).

    The _Builder_ objects all have constructors indicating the mandatory properties, and the overall `ConfigurationBuilder` is consistency-checked when `BuildConfiguration()` is called.

    The **Equivalent JSON** tab illustrates the configuration you need to create if you are working without this helper library.

    ``` C#
    var channels = new ChannelBuilder[Fields.Length];
    var parameters = new ParameterBuilder[Fields.Length];

    for (var f = 0; f < Fields.Length; f++)
    {
        channels[f] = new ChannelBuilder((uint) f, intervalNanos, DataType.Signed16Bit, ChannelDataSource.Periodic);

        parameters[f] = new ParameterBuilder($"{Fields[f]}:demo", Fields[f], $"{Fields[f]} field")
        {
            ChannelIds = {(uint) f},
            MinimumValue = -1500,
            MaximumValue = +1500
        };
    }

    var config = new ConfigurationBuilder
    {
        Applications =
        {
            new ApplicationBuilder("demo")
            {
                ChildParameters = parameters,
                Channels = channels
            }
        }
    }.BuildConfiguration();
    ```

=== "Equivalent JSON"

    The outermost element is the app name. Configuration can define multiple apps.

    * `"tree"` describes a tree of references to `"parameters"` by `"id"`
    * `"parameters"` is a list of all the parameters in the app, referencing channels by `"id"`
    * `"channels"` is a list of all the channels in the app

    ``` json
    {
        "demo": {
            "tree": {
                "params": [
                    "alpha:demo",
                    "beta:demo",
                    "gamma:demo"
                ]
            },
            "parameters": [
                {
                    "id": "alpha:demo",
                    "name": "alpha",
                    "desc": "alpha field",
                    "min": -1500.0,
                    "max": 1500.0,
                    "conv": "1to1:demo",
                    "channels": [
                        0
                    ]
                },
                {
                    "id": "beta:demo",
                    "name": "beta",
                    "desc": "beta field",
                    "min": -1500.0,
                    "max": 1500.0,
                    "conv": "1to1:demo",
                    "channels": [
                        1
                    ]
                },
                {
                    "id": "gamma:demo",
                    "name": "gamma",
                    "desc": "gamma field",
                    "min": -1500.0,
                    "max": 1500.0,
                    "conv": "1to1:demo",
                    "channels": [
                        2
                    ]
                }
            ],
            "channels": [
                {
                    "id": 0,
                    "source": "periodic",
                    "interval": 10000000,
                    "type": "s16"
                },
                {
                    "id": 1,
                    "source": "periodic",
                    "interval": 10000000,
                    "type": "s16"
                },
                {
                    "id": 2,
                    "source": "periodic",
                    "interval": 10000000,
                    "type": "s16"
                }
            ],
            "conversions": [
                {
                    "name": "1to1:demo",
                    "unit": "",
                    "format": "%5.3f"
                }
            ]
        }
    }
    ```

    Note that there is also a list of `"conversions"`.

    A single 1:1 (input = output) conversion is defined and referenced from each parameter.
    The _MAT.OCS.Configuration_ library does this automatically if you don't specify a Conversion.

Each field is mapped onto both a channel and parameter.

!!! info

    _Channels_ represent data capture and storage, and can be mapped onto multiple parameters.

    _Parameters_ are the data access abstraction, and can merge data from multiple channels.

The channel properties need to match the data:

* `Interval`: spacing between timestamps, in nanoseconds
* `Data Type`: matching the C# samples array (`short[]` in this case)
* `Data Source`: indicating the data representation so ATLAS knows what to request (`Periodic` in this case)

The parameter must have:

* `Identifier` (e.g. `alpha:demo`):
    * globally unique identifier
    * includes the app name as a suffix (`:demo` in this example)

* `Name` (e.g. `alpha`):
    * generally unique (non-strict)
    * displayed to the user in the ATLAS Parameter Browser
    * used as a variable name in functions &mdash; so should not contain spaces or special characters

* `Description` (e.g. `Angle of attack`):
    * displayed to the user as a longer description in the ATLAS Parameter Browser

Parameters have some other optional properties.

In this example, the _MinimumValue_ and _MaximumValue_ indicate the valid data range so that ATLAS can auto-scale the displays.

Configuration is published with a unique identifier and can be reused across multiple sessions **as long as the config is unchanged** (as it will be cached aggressively).

```C#
// arbitrary, unique and can be reused as long as the config stays the same
const string configIdentifier = "6D711DBC-5F0D-47D2-B127-8C9D20BCEC02";

await configClient.PutConfigAsync(configIdentifier, config);
```

The `PutConfigAsync` method is an extension method which abstracts away the serialization.

## Session

The session descriptor is very straightforward.

These properties are mandatory:

* _Identity_ &mdash; a human-readable label
* _Timestamp_ (ISO 8601) &mdash; including a time-zone where applicable

The additional properties reflect the state of the session after adding data:

* _TimeRange_ &mdash; to reflect the actual range of data in the session, in nanoseconds
* _ConfigBindings_ &mdash; associate the session with the published configuration identifier

If not otherwise specified, the initial state of the session is `closed`.

=== "C# Sample"

    ```c#
    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = dataIdentity,
        CreateIfNotExists = new()
        {
            Identifier = $"PeriodicData Demo {timestamp:f}",
            Timestamp = timestamp.ToString("O")
        },
        Updates =
        {
            new SessionUpdate
            {
                SetTimeRange = new()
                {
                    StartTime = startNanos,
                    EndTime = startNanos + durationNanos
                }
            },
            new SessionUpdate
            {
                SetConfigBindings = new()
                {
                    ConfigBindings =
                    {
                        new ConfigBinding
                        {
                            Identifier = configIdentifier
                        }
                    }
                }
            }
        }
    });
    ```

    In this gRPC call:

    * `Identity` specifies the session, and is the same as the `dataIdentity` for RTA Server
    * `CreateIfNotExists` is used only if the session is not already present
    
    Subsequent service calls could be made to update the session metadata.


=== "JSON"

    ``` json
    {
        "sessions": [
            {
                "identity": "f10f4a19-3831-4dd6-a178-faa94931a5b0",
                "state": "closed",
                "timestamp": "2021-05-06T18:58:56.20289+01:00",
                "startTimestamp": "2021-05-06T18:58:56.20289+01:00",
                "endTimestamp": "2021-05-06T19:08:56.20289+01:00",
                "timeRange": {
                    "startTime": 1620323936202890000,
                    "endTime": 1620324536202890000
                },
                "identifier": "PeriodicData Demo 06 May 2021 18:58",
                "details": {},
                "alternates": [],
                "children": [],
                "configBindings": [
                    {
                        "identifier": "6D711DBC-5F0D-47D2-B127-8C9D20BCEC02",
                        "channelOffset": 0
                    }
                ],
                "markers": []
            }
        ]
    }
    ```    

