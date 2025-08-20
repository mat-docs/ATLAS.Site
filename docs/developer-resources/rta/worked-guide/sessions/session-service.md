
!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.
# Session Service Basics

!!! tip

    Explore the gRPC API using [gRPC UI](../utilities.md#grpc-ui).

    This provides an intuitive web interface to issue API calls and see the responses.

## Opening a Channel

The network connection to a server is called a _channel_ in most gRPC bindings.  
This should be reused across service calls where possible, for efficiency.

The session store service is provided by the Toolkit [Session Service](../../services/rta-sessionsvc/grpc.md) (default port 2652) and [RTA Server](../../services/rta-server/grpc.md) (default port 8082).

```c#
using var sessionChannel = GrpcChannel.ForAddress("http://localhost:2652");
var sessionClient = new SessionStore.SessionStoreClient(sessionChannel);
```

## Creating/Updating a Session

In this example, `CreateIfNotExists` defines the initial properties to set if the session does not already exist, along with `Updates` to be applied in the same transaction.

If the session _does_ exist, only the `Updates` are applied.

=== "C# Sample"

    ```c#
    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "001",
        CreateIfNotExists = new()
        {
            Identifier = "Demo Session",
            Timestamp = "2021-03-14T12:15:30Z",
            State = (int)SessionState.Closed
        }
    });
    ```

=== "JSON"

    ```json
    {
        "identity": "001",
        "state": "closed",
        "timestamp": "2021-03-14T12:15:30Z",
        "identifier": "Demo session"
    }
    ```

Each `SessionUpdate` can only do one operation:

???+ bug "Incorrect"

    In this example, only `SetQuality` is executed:

    ```c#
    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "example",
        Updates =
        {
            new SessionUpdate
            {
                SetType = "type66",
                SetQuality = 0.25
            }
        }
    });
    ```

??? success "Correct"

    In this example, `SetType` and `SetQuality` are executed in a single transaction:

    ```c#
    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "example",
        Updates =
        {
            new SessionUpdate
            {
                SetType = "type66"
            },
            new SessionUpdate
            {
                SetQuality = 0.25
            }
        }
    });
    ```

Updates to collections offer a consistent pattern of operations:

* `Set...` &mdash; overwrites the collection
* `Update...` &mdash; adds and updates items
* `Delete...` &mdash; deletes the specified items

For example, when defining [relationships](relationships.md), these two samples are equivalent:

=== "Using `Update` and `Delete` to modify data"

    ??? example "Starting with `"ref:aaa"`, `"ref:bbb"`, `"ref:ccc"`"

        ```c#
        await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
        {
            Identity = "example",
            Updates =
            {
                new SessionUpdate
                {
                    SetRefAnchors = new()
                    {
                        RefUris =
                        {
                            "ref:aaa",
                            "ref:bbb",
                            "ref:ccc"
                        }
                    }
                }
            }
        });
        ```

    Merge update using `Update` and `Delete`:

    ```c#
    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "example",
        Updates =
        {
            new SessionUpdate
            {
                UpdateRefAnchors = new()
                {
                    RefUris =
                    {
                        "ref:ccc",
                        "ref:ddd"
                    }
                }
            },
            new SessionUpdate
            {
                DeleteRefAnchors = new()
                {
                    RefUris =
                    {
                        "ref:aaa"
                    }
                }
            }
        }
    });
    ```

    Result:

    * `"ref:bbb"`
    * `"ref:ccc"`
    * `"ref:ddd"`

    !!! note

        Notice that the overlap with `"ref:ccc"` is allowed. This is similar to JSON patching.

=== "Using `Set` to overwrite"

    ??? example "Starting with `"ref:aaa"`, `"ref:bbb"`, `"ref:ccc"`"

        ```c#
        await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
        {
            Identity = "example",
            Updates =
            {
                new SessionUpdate
                {
                    SetRefAnchors = new()
                    {
                        RefUris =
                        {
                            "ref:aaa",
                            "ref:bbb",
                            "ref:ccc"
                        }
                    }
                }
            }
        });
        ```

    Overwriting with `Set`:

    ```c#
    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "example",
        Updates =
        {
            new SessionUpdate
            {
                SetRefAnchors = new()
                {
                    RefUris =
                    {
                        "ref:bbb",
                        "ref:ccc",
                        "ref:ddd"
                    }
                }
            }
        }
    });
    ```

    Result:

    * `"ref:bbb"`
    * `"ref:ccc"`
    * `"ref:ddd"`

    !!! note

        Notice that `"ref:aaa"` is removed from the list.

## Fetching and Listing Sessions

The [Session Service API](../../services/rta-sessionsvc/grpc.md) provides the same [query capabilities](queries.md) as the REST API, but with an extended data model covering [Relationships](relationships.md), [Folders](folders.md) and [Data Bindings](data-bindings.md).

These elements are opt-in through the `SessionElements` mask:

```c#
var session = await sessionClient.GetSessionAsync(new GetSessionRequest
{
    Identity = "example",
    Elements = new()
    {
        Json = true,
        Refs = true,
        Folders = true,
        DataBindings = true
    }
});
```

!!! tip

    The _MAT.OCS.RTA.Toolkit.API.GrpcClients_ [NuGet package](../../downloads.md#nuget-binaries) provides a convenience method to retrieve and parse the JSON Session Model:

    ```c#
    var sessionModel = await sessionClient.GetSessionJsonAsync("example");
    ```

Listing sessions works the same way, using the same [query](queries.md) dialect as the REST API:

```c#
var list = await sessionClient.ListSessionsAsync(new ListSessionsRequest
{
    Query = "{\"identifier\": \"Example\"}",
    SessionElements = new()
    {
        Json = true,
        DataBindings = true
    }
});
```

## Sequenced Updates

The `CreateOrUpdateSessionRequest` has an optional `sequence` field, which can help avoid re-applying stale session updates when working with a checkpoint-based system like [Apache Kafka](https://kafka.apache.org/).

If populated, the service will apply the update only if the specified sequence number is greater than previous sequence numbers. As the sequence monotonically increases &mdash; for example, using a Kafka message offset &mdash; it is safe to replay a sequence of updates without causing the session metadata to roll back.

```c#
await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
{
    Identity = "example",
    Sequence = 100,
    Updates =
    {
        new SessionUpdate
        {
            SetType = "aaa"
        }
    }
});

await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
{
    Identity = "example",
    Sequence = 120,
    Updates =
    {
        new SessionUpdate
        {
            SetType = "bbb"
        }
    }
});
```

## Deleting Sessions

Multiple sessions can be deleted in one operation, and deletion completes without error even if a session does not exist:

```c#
await sessionClient.DeleteSessionsAsync(new DeleteSessionsRequest
{
    Identities =
    {
        "example",
        "xxx-does-not-exist-xxx"
    }
});
```
## An Example of Creating Sample Sessions

This section presents an example of how to create few records of RTA sessions in the Postgres DB by utilizing the `OCS.RTA.Toolkit`
which write the sample data into the DB and associated 'data chuncks' files.
The data in question are RTA sessions and its Laps (called 'markers' here)  are linked to each sessions.
They are handled by using `SessionStore` service.
It also creates a session configuration data, which is stored in a Json file.
This is handled by `ConfigStore` service.
Finally, it generates sample 'data chuncks' files to simulates the data which represents session parameters.
This is handeld by the `DataWriter`.

```c#
public static async Task Main(string[] args)
{
    private static readonly string[] Fields = {"alpha", "beta", "gamma"};

    using var channel = GrpcChannel.ForAddress("http://localhost:8082");
    var sessionClient = new SessionStore.SessionStoreClient(channel);
    var configClient = new ConfigStore.ConfigStoreClient(channel);
    var dataClient = new DataWriter.DataWriterClient(channel);

    var timestamp = DateTimeOffset.Now;
    var startNanos = (timestamp.ToUniversalTime() - DateTimeOffset.UnixEpoch).Ticks * 100;
    var durationNanos = TimeSpan.FromMinutes(10).Ticks * 100;
    var intervalNanos = TimeSpan.FromMilliseconds(10).Ticks * 100;

    var configIdentifier = await WriteConfigAsync(configClient, intervalNanos);

    // At this point we create a set of sample sessions:
    // 1) creates 9 sessions (where '9' is an arbitrary constant, good enough for testing purpose);
    // 2) creates 'data chuncks' files assiciated with each session;
    // 3) and links the lap/marker sample data for each session (this is done inside of WriteSessionAsync() call)
    //
    const int sessionInTotal = 9;
    for (int sessionNumber = 1; sessionNumber <= sessionInTotal; sessionNumber++)
    {
        var dataIdentity = Guid.NewGuid().ToString();

        await WriteDataAsync(dataClient, dataIdentity, startNanos, durationNanos, intervalNanos);

        await WriteSessionAsync(sessionClient, dataIdentity, timestamp, startNanos, durationNanos, intervalNanos,
                                configIdentifier, sessionNumber);

        Console.WriteLine(dataIdentity);
    }
}
private static async Task WriteDataAsync(
    DataWriter.DataWriterClient dataClient,
    string dataIdentity,
    long startNanos,
    long durationNanos,
    long intervalNanos)
{
    var rng = new Random();
    var signals = new SignalGenerator[Fields.Length];

    for (var f = 0; f < signals.Length; f++)
    {
        signals[f] = new SignalGenerator(rng);
    }

    const int burstLength = 100;
    var burstSamples = new short[burstLength];

    using var dataStream = dataClient.WriteDataStream();

    var requestStream = dataStream.RequestStream;
    var responseStream = dataStream.ResponseStream;

    await requestStream.WriteAsync
        (new WriteDataStreamMessage
            {
                DataIdentity = dataIdentity
            }
        );

    for (var offset = 0L; offset < durationNanos; offset += burstLength * intervalNanos)
    {
        for (var f = 0; f < signals.Length; f++)
        {
            var signal = signals[f];

            for (var t = 0; t < burstLength; t++)
            {
                var timeOffsetNanos = offset + t * intervalNanos;
                burstSamples[t] = (short)signal[timeOffsetNanos]; // short precision for this demo
            }

            var burst = new PeriodicData
            {
                ChannelId = (uint)f,
                StartTimestamp = startNanos + offset,
                Interval = intervalNanos,
                Samples = burstLength,
                Buffer = ByteString.CopyFrom(MemoryMarshal.AsBytes(burstSamples.AsSpan()))
            };

            await requestStream.WriteAsync
                (new WriteDataStreamMessage
                    {
                        PeriodicData = burst
                    }
                );
        }

        if ((offset % 1_000_000_000L) == 0)
        {
            Console.Write(".");
        }
    }

    // 1. complete request stream
    await requestStream.CompleteAsync();

    // 2. drain response stream (can also be done in a background task, or interleaved)
    // (no responses expected since no flush tokens were sent)
    await foreach (var _ in responseStream.ReadAllAsync());

    Console.WriteLine();
}

private static async Task<string> WriteConfigAsync(
    ConfigStore.ConfigStoreClient configClient,
    long intervalNanos)
{
    var channels = new ChannelBuilder[Fields.Length];
    var parameters = new ParameterBuilder[Fields.Length];

    for (var f = 0; f < Fields.Length; f++)
    {
        channels[f] = new ChannelBuilder((uint)f, intervalNanos, DataType.Signed16Bit, ChannelDataSource.Periodic);

        parameters[f] = new ParameterBuilder($"{Fields[f]}:demo", Fields[f], $"{Fields[f]} field")
        {
            ChannelIds = {(uint)f},
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

    // arbitrary, unique and can be reused as long as the config stays the same
    const string configIdentifier = "6D711DBC-5F0D-47D2-B127-8C9D20BCEC02";

    await configClient.PutConfigAsync(configIdentifier, config, MediaTypes.JsonConfig);

    return configIdentifier;
}

private static async Task WriteSessionAsync(
    SessionStore.SessionStoreClient sessionClient,
    string dataIdentity,
    DateTimeOffset timestamp,
    long startNanos,
    long durationNanos,
    long intervalNanos,
    string configIdentifier,
    int sessionNumber)
{
    var lapChunk = durationNanos / (sessionNumber + 1);            // 1e9 * 60 = 60000000000

    // This part implements how to add Laps/Markers to each session.
    // In this change:
    //  -- each session has an increasing number of markers, i.e. 2, 3, 4, 5, ... etc.
    //  -- each lap/marker has different id and label values correspondingly.
    //  -- the StartTime and EndTime of each marker is calculated in the way that the laps are evenly divided for the whole timeline
    //     (again, this is merely for 'facilitating' testing in A10, when a session is loaded)
    //  -- the markers firstly are generated as a list of them, and then the list is added to the session in question.
    // 
    var newMarkerList = new MarkersList();

    for (int i = 1;  i <= sessionNumber; i++)
    {
        var m1 = new Marker
        {
            Id = i.ToString(),
            Type = "Test",
            Label = "Test Label" + i.ToString(),
            StartTime = startNanos + (i - 1) * lapChunk,
            EndTime = startNanos + i * lapChunk,
            DetailsJson = ""
        };
        newMarkerList.Markers.Add(m1);
    }
    var m2 = new Marker
    {
        Id = (sessionNumber + 1).ToString(),
        Type = "Test",
        Label = "Test Label" + (sessionNumber + 1).ToString(),
        StartTime = startNanos + sessionNumber * lapChunk,
        EndTime = startNanos + (sessionNumber + 1) * lapChunk,
        DetailsJson = ""
    };
    newMarkerList.Markers.Add(m2);

    await sessionClient.CreateOrUpdateSessionAsync
        (
            new CreateOrUpdateSessionRequest
            {
                Identity = dataIdentity,
                CreateIfNotExists = new()
                {
                    Identifier = $"Session {sessionNumber} for Data Service Demo {timestamp:f}",
                    Timestamp = timestamp.ToString("O")
                },
                Updates =
                {
                    new SessionUpdate
                    {
                        SetType = "rta"
                    },
                    new SessionUpdate
                    {
                        // inclusive timestamps
                        SetTimeRange = new()
                        {
                            StartTime = startNanos,
                            EndTime = startNanos + durationNanos - intervalNanos
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
                    },
                    new SessionUpdate
                    {
                        UpdateMarkers = new SessionUpdate.Types.MarkersMap
                        {
                            MarkersByCategory =
                            {
                                ["Laps"] = newMarkerList
                            }
                        }
                    },
                    new SessionUpdate
                    {
                        UpdateDetailsJson = new DetailsJson
                        {
                            Json = "{\"Number\":" + sessionNumber+"}"
                        }
                    }
                },
            }
        );
}
```

## How to Work with PostrgreSQL DB Data

When a sample sessions set is created [see an example above](#an-example-of-creating-sample-sessions), it is easy to run a simple query in PostrgreSQL DB to see and check whether the data created are as expected:
```SQL
SELECT 
	S.identity, S.state, S.tstamp, S.tz_offset, S.start_time, S.end_time, S.identifier, S.type_attr, 
	S.quality_attr, S.group_attr, S.version_attr, S.details, S.schema_version, S.schema_metadata,
	S.heartbeat_utc, S.sequence,
	SM.session_identity, SM.id, SM.category, SM.type, SM.label, SM.description, 
	SM.start_time, SM.end_time, SM.details
FROM
	rta_sessions.session AS S
JOIN
	rta_sessions.session_marker AS SM
ON
	S.identity = SM.session_identity
WHERE
	S.identity = '35811dba-0665-4ce1-a6bd-76337fecf5f7';
```
The query should return some data as shown below:
<object type="image/png" data="../assets/SQL Query Result1.png" class="diagram" title="SQL Query Result - part 1"></object>

<object type="image/png" data="../assets/SQL Query Result2.png" class="diagram" title="SQL Query Result - part 2"></object>

At this point you can make any chages to the data in DB tables by using Postgres 'Edit' capabilities.

