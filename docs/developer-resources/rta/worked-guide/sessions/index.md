# Session Basics

_Sessions_ are a logical way to organise telemetry &mdash; like a file system.

An RTA Session does not have to be a 1:1 match for a telemetry recording, and there is no prescribed file or database layout. An RTA service can present any bounded subset of telemetry as a session, with associated metadata and descriptors.

=== "JSON"

    The RTA API represents sessions in JSON, like this:

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
                "identifier": "Session Demo 06 May 2021 18:58",
                "details": {
                    "Lab Tech": "Bob Jones",
                    "Run": 17
                },
                "configBindings": [
                    {
                        "identifier": "6d711dbc-5f0d-47d2-b127-8c9d20bcec01",
                        "channelOffset": 0
                    }
                ]
            }
        ]
    }
    ```

    Review the [Session Model](model.md) for more detail.

=== "C# Sample"

    The Toolkit [Session Service](../../services/rta-sessionsvc/grpc.md) provides an API to create and modify sessions using [gRPC](https://grpc.io/).

    This C# sample &mdash; using the _MAT.OCS.RTA.Toolkit.API.GrpcClients_ [NuGet Package](../../downloads.md#nuget-binaries) &mdash; produces an equivalent result:

    ```c#
    // re-use the channel across service calls
    using var sessionChannel = GrpcChannel.ForAddress("http://localhost:2652");
    var sessionClient = new SessionStore.SessionStoreClient(sessionChannel);

    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "f10f4a19-3831-4dd6-a178-faa94931a5b0",
        CreateIfNotExists = new()
        {
            Identifier = "Session Demo 06 May 2021 18:58",
            Timestamp = "2021-05-06T18:58:56.20289+01:00",
            State = (int)SessionState.Closed
        },
        Updates =
        {
            new SessionUpdate
            {
                SetTimeRange = new()
                {
                    StartTime = 1620323936202890000,
                    EndTime = 1620324536202890000
                }
            },
            new SessionUpdate
            {
                SetDetailsJson = new()
                {
                    Json = new JObject
                    {
                        ["Lab Tech"] = "Bob Jones",
                        ["Run"] = 17
                    }.ToString()
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
                            Identifier = "6d711dbc-5f0d-47d2-b127-8c9d20bcec01"
                        }
                    }
                }
            }
        }
    });
    ```
