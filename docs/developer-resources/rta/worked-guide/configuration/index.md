
!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.
# Configuration Basics

ATLAS/RTA _Configuration_ is a rich schema decribing the telemetry.

ATLAS is designed so that a stream of telemetry might contain data from multiple devices and models, assembled by different teams &mdash; so configuration is divided into _Apps_.

In the Configuration API (from the _MAT.OCS.Configuration_ [NuGet Package](../../downloads.md#nuget-binaries)), you can define one or more apps at a time, containing:

* [Channels and Parameters](channels-parameters.md) &mdash; describing sampled data
* [Parameter Groups](parameter-groups.md) &mdash; forming a parameter tree
* [Conversions](conversions.md) &mdash; transforming and formatting data for display
* [Event Definitions](event-defs.md) &mdash; describing events

Here is a simple `#!json "demo"` app, published to the Toolkit [Config Service](../../services/rta-configsvc/grpc.md):

=== "C# Sample"

    All the code samples use the _MAT.OCS.Configuration_ [NuGet Package](../../downloads.md#nuget-binaries).

    A JSON example is provided with each sample for reference if you are working in another language.

    ```c#
    using Grpc.Net.Client;
    using MAT.OCS.Configuration;
    using MAT.OCS.Configuration.Builder;
    using MAT.OCS.RTA.Model.Net;
    using MAT.OCS.RTA.Toolkit.API.ConfigService;

    // leave this channel open across service calls so it can be reused
    using var configChannel = GrpcChannel.ForAddress("http://localhost:2662");
    var configClient = new ConfigStore.ConfigStoreClient(configChannel);

    var config = new ConfigurationBuilder
    {
        Applications =
        {
            new ApplicationBuilder("demo")
            {
                Channels =
                {
                    new ChannelBuilder(0u, 0L, DataType.Double64Bit, ChannelDataSource.Timestamped)
                },
                ChildParameters =
                {
                    new ParameterBuilder("param:demo", "param", "Example Parameter")
                    {
                        MinimumValue = -1500.0,
                        MaximumValue = +1500.0,
                        WarningMinimumValue = -1000.0,
                        WarningMaximumValue = +1000.0,
                        ChannelIds = {0u}
                    }
                },
                EventDefinitions =
                {
                    new EventDefinitionBuilder(8, "0008:demo Example Event")
                    {
                        Priority = EventPriority.High
                    }
                }
            }
        }
    }.BuildConfiguration();

    // identifier can be reused as long as config does not change
    const string configIdentifier = "17115312-F294-43E4-8027-4BE5823923A9";

    // serialize and publish (as FFC, by default)
    await configClient.PutConfigAsync(configIdentifier, config);

    // alternatively, as JSON
    // await configClient.PutConfigAsync(configIdentifier, config, MediaTypes.JsonConfig);
    ```

=== "JSON"

    Configuration can be published as [JSON](serializing.md#json), which is described by a [JSON schema](../../api/config.schema.json).

    ```json
    {
        "demo": {
            "tree": {
                "params": [
                    "param:demo"
                ]
            },
            "parameters": [
                {
                    "id": "param:demo",
                    "name": "param",
                    "desc": "Example Parameter",
                    "min": -1500.0,
                    "max": 1500.0,
                    "warnMin": -1000.0,
                    "warnMax": 1000.0,
                    "conv": "1to1:demo",
                    "channels": [
                        1
                    ]
                }
            ],
            "channels": [
                {
                    "id": 1,
                    "source": "timestamped"
                }
            ],
            "conversions": [
                {
                    "name": "1to1:demo",
                    "unit": "",
                    "format": "%5.3f"
                }
            ],
            "events": [
                {
                    "id": 8,
                    "code": "0008",
                    "desc": "0008:demo Example Event",
                    "pri": "high",
                    "convs": []
                }
            ]
        }
    }
    ```
