
!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.
# Data Bindings

When deploying [Microservices](../tutorials/microservices/index.md), you need to create a binding linking sessions to data.

Deployments can have more than one data service for different backends. A request for data needs to hit the correct data service, and use a meaningful identifier &mdash; for example a file path, or query expression.
This binding is captured in the [Session Service](../../services/rta-sessionsvc/README.md) and the [Gateway Service](../../services/rta-gatewaysvc/README.md) uses it to proxy incoming requests.

!!! info

    Data Bindings are not needed for [RTA Server](../../services/rta-server/README.md).

## Request Flow

Typical ATLAS request flow:

1. Fetch the session model &mdash; `/rta/v2/sessions/<identity>`
2. Fetch the configs bound to the session &mdash; `/rta/v2/configs/<config_identifier>`
3. Fetch samples and events based on the configs &mdash; `/rta/v2/sessions/<identity>/data/<type>/<channels>`

For [RTA Server](../../services/rta-server/README.md), these activities are all handled by a single process, so no data binding is needed.  
But for a microservices deployment, ATLAS talks to the [Gateway Service](../../services/rta-gatewaysvc/README.md) which:

1. Fetches the session model from the [Session Service](../../services/rta-sessionsvc/README.md)
2. Fetches the configs from the [Config Service](../../services/rta-configsvc/README.md)
3. Fetches the data from a data service (e.g. [Toolkit Data Service](../../services/rta-datasvc/README.md), or [Influx Data Service](../../services/rta-influxdatasvc/README.md), or another data adapter):
    1. Gets the session data bindings from the [Session Service](../../services/rta-sessionsvc/README.md)
    2. Requests data for a _data identity_ from a _data source_
    3. Streams the data back to the client &mdash; with transformations if indicated by the data binding

So each data binding must at least specify:

* The _data source_ &mdash; which tells the [Gateway Service](../../services/rta-gatewaysvc/README.md) which data service to talk to;
* The _data identity_ &mdash; which is passed to the data service;  

!!! info

    The _data source_ and _data identity_ are private: the [Gateway Service](../../services/rta-gatewaysvc/README.md) does not expose them via the REST API.

    * _data source_ is just a token &mdash; e.g. `influx`;
    * _data identity_ could be a file path, guid, query &mdash; or something else meaningful to the data service.

## Creating Data Bindings

Use the [Session Service gRPC API](../../services/rta-sessionsvc/grpc.md) to `CreateOrUpdateSession` and populate `data_bindings`:

=== "C# Sample &mdash; Simple"

    This minimal binding will need a configured data service for the `influx01` _data source_ &mdash; e.g. [Influx Data Service](../../services/rta-influxdatasvc/README.md) &mdash; and will use the specified _data identity_ as a filter expression to select data for the session:

    ```c#
    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "example",
        Updates =
        {
            new SessionUpdate
            {
                SetDataBindings = new()
                {
                    DataBindings =
                    {
                        new DataBinding
                        {
                            Key = new()
                            {
                                Source = "influx01",
                                Identity = "someField='abc123'"
                            }
                        }
                    }
                }
            }
        }
    });
    ```

=== "Time Ranges"

    This pair of bindings captures discontinuous time ranges from the same _data source_ and _data identity_:

    ```c# hl_lines="20 21 31 32"
    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "example",
        Updates =
        {
            new SessionUpdate
            {
                SetDataBindings = new()
                {
                    DataBindings =
                    {
                        new DataBinding
                        {
                            Key = new()
                            {
                                TimeRef = startTime,
                                Source = "influx01",
                                Identity = "someField='abc123'"
                            },
                            SessionStartTime = startTime,
                            SessionEndTime = startTime + 599_999_999L
                        },
                        new DataBinding
                        {
                            Key = new()
                            {
                                TimeRef = startTime + 900_000_000L,
                                Source = "influx01",
                                Identity = "someField='abc123'"
                            },
                            SessionStartTime = startTime + 900_000_000L,
                            SessionEndTime = startTime + 999_999_999L
                        }
                    }
                }
            }
        }
    });
    ```
   
    !!! note

        In this case, a `time_ref` is added to the `key` to make it unique.
        
        The value of this additional key element is arbitrary: in this example it is matched to the data time range.

    !!! important

        As a result, the [Gateway Service](../../services/rta-gatewaysvc/README.md) will need to inspect and potentially re-write data as it is streamed to the client to clip the data strictly to the specified bounds.

        This is required because the RTA specification allows (and encourages) data services to serve data beyond the specified time-bounds so this clipping does not need to be performed on all requests, and so that data chunks have predictable cache coordinates.

        Data transformation can impact data transfer throughput, so avoid using time bounds like this unless it is necessary.        

=== "Time Shifts"

    This binding indicates that the session time is 300 milliseconds later than the data time:

    ```c# hl_lines="19 19"
    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "example",
        Updates =
        {
            new SessionUpdate
            {
                SetDataBindings = new()
                {
                    DataBindings =
                    {
                        new DataBinding
                        {
                            Key = new()
                            {
                                Source = "influx01",
                                Identity = "someField='abc123'"
                            },
                            SessionTimeOffset = 300_000_000L
                        }
                    }
                }
            }
        }
    });
    ```

    As a result, the [Gateway Service](../../services/rta-gatewaysvc/README.md) will need to re-write data as it is streamed to the client to add 300 milliseconds to all timestamps.

    This is the main difference between this service and a conventional reverse proxy: it has some purpose-built data transformations.

    !!! important

        Data transformation can substantially impact data transfer throughput.  
        It is better to apply corrections upstream where possible.

=== "Multiple Sources"

    This binding is a composite of data from two separate data services:

    ```c# hl_lines="16 16 33 33"
    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "example",
        Updates =
        {
            new SessionUpdate
            {
                SetDataBindings = new()
                {
                    DataBindings =
                    {
                        new DataBinding
                        {
                            Key = new()
                            {
                                Source = "influx01",
                                Identity = "someField='abc123'"
                            },
                            DataChannelBindings =
                            {
                                new DataChannelBinding
                                {
                                    FirstDataChannel = 0,
                                    FirstSessionChannel = 0,
                                    LastSessionChannel = 49
                                }
                            }
                        },
                        new DataBinding
                        {
                            Key = new()
                            {
                                Source = "influx07",
                                Identity = "someOtherField='xxxyyyzzz'"
                            },
                            DataChannelBindings =
                            {
                                new DataChannelBinding
                                {
                                    FirstDataChannel = 0,
                                    FirstSessionChannel = 50,
                                    LastSessionChannel = 59
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    ```

    This also involves a transformation: data from the second binding is channel-shifted so that it is in the range `#!json 50`-`#!json 59`.

    Data from the first binding can be proxied unchanged.

    !!! important

        Session time-range and configuration must reflect the result after transformation.

        In this example, a session might have _two_ configuration bindings &mdash; one for each underlying data source &mdash; and use a channel offset of `#!json 50` on the second binding.
        This would mean that ATLAS requests channels in the range `#!json 0`-`#!json 59` and the requests are proxied accordingly by the [Gateway Service](../../services/rta-gatewaysvc/README.md).

## Fetching Data Bindings

The [Gateway Service](../../services/rta-gatewaysvc/README.md) needs to be able to request data bindings from the [Session Service](../../services/rta-sessionsvc/README.md):

```bash
curl -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions/example/data-bindings"
```

```json
[
    {
        "key": {
            "source": "influx01",
            "identity": "someField='abc123'",
            "timeRef": 0
        },
        "sessionStartTime": null,
        "sessionEndTime": null,
        "sessionTimeOffset": 0,
        "dataChannelBindings": [
            {
                "firstDataChannel": 0,
                "firstSessionChannel": 0,
                "lastSessionChannel": 49
            }
        ]
    },
    {
        "key": {
            "source": "influx07",
            "identity": "someOtherField='xxxyyyzzz'",
            "timeRef": 0
        },
        "sessionStartTime": null,
        "sessionEndTime": null,
        "sessionTimeOffset": 0,
        "dataChannelBindings": [
            {
                "firstDataChannel": 0,
                "firstSessionChannel": 50,
                "lastSessionChannel": 59
            }
        ]
    }
]
```

This REST call is only used between these two services.  
It is never called by ATLAS and should not be exposed in the public API since data bindings might contain sensitive information.