# Live Streaming &mdash; Review

!!! info

    Complete the [Walkthrough](index.md) first.

The demo project illustrates a pattern where live data is fed to ATLAS around the side of the main data store.

The live stream is buffered through [Redis](https://redis.io/), and then selectively distributed to clients using [WebSockets](https://en.wikipedia.org/wiki/WebSocket). This means that clients are never directly interacting with the ingest process, and the write-latency of the data store becomes less important.

## Service Calls

### Call Ordering

Users can't browse and load the session until it is published to the [Session Service](../../../services/rta-sessionsvc/README.md), so the service call ordering is different:

=== "This tutorial"

    1. Describe the fields as [Configuration](../../configuration/index.md);
    2. Describe how the database fields will map onto [Timestamped Data requests](../../../../api/#operation/get-timestamped-data);
    3. Publish the [Session](../../sessions/index.md) in the `open` state;
    4. Write data to [InfluxDB](https://www.influxdata.com/products/influxdb/);
    5. Update the [Session](../../sessions/index.md) state to `closed`;

    _Other orderings are allowed &mdash; e.g. adding [Configuration](../../configuration/index.md) after the session has started._

=== "Previous tutorial"

    1. Write data to [InfluxDB](https://www.influxdata.com/products/influxdb/);
    2. Describe how the database fields will map onto [Timestamped Data requests](../../../../api/#operation/get-timestamped-data);
    3. Describe the fields as [Configuration](../../configuration/index.md);
    4. Publish the [Session](../../sessions/index.md);

### Session State Transitions

Publishing the session before the data is written requires greater attention to session state:

* Start in the `open` state so the client is aware that the session is live;
* Transition to:
    * `closed` when all data is written
    * `truncated` if the session was cut short (e.g. ++ctrl+c++)
    * `failed` if the session was cut short due to an exception

!!! info

    Sessions can also start in the `waiting` state if there will be a preparation period before data is available.

    Always transition to `open` before data starts streaming.

## Streaming to InfluxDB

Compared to the [previous tutorial](../influx/index.md), the writes to [InfluxDB](https://www.influxdata.com/products/influxdb/) need to be broken up. This ensures that data is flushed and visible in the database.

In this example, this is done at the same time as [Session Model Updates](#session-model-updates).

## Streaming to Redis

Live data is both written to [InfluxDB](https://www.influxdata.com/products/influxdb/) and buffered to [Redis Streams](https://redis.io/topics/streams-intro) &mdash; similar in design to [Apache Kafka](https://kafka.apache.org/).

The [Redis](http://redis.io/) data flow follows a [simple protocol](../../live/redis.md), where the stream is a copy of all session model updates, and data:

* Beginning with a [Session JSON](../../sessions/model.md#serializing-to-json) update
* Buffering data so bursts are sent at around 10 Hz
* Updating the session time-range often, and the session model if any metadata changes
* Ending with a transition to the `closed`, `truncated` or `failed` state

Each message is `StreamData`, but sent in bursts as `StreamDataBurst` to improve network efficiency.

The streams are typically buffered in Redis long enough to cover the time taken for data to flush to the main store &mdash; which could be seconds or hours, depending on the storage technology. The Redis instance needs to be sized appropriately. The [Stream Service](../../../services/rta-streamsvc/README.md) includes an automatic trimmer to limit retention.

### Library Support

[The protocol](../../live/redis.md) is implemented by the _MAT.OCS.RTA.StreamBuffer_ [NuGet Package](../../../downloads/nuget.md).

To connect to Redis:

```c#
using var redisBuffer = new RedisStreamBuffer(hostname, db);
var streamBuffer = await redisBuffer.InitStreamSessionAsync(sessionIdentity, streamName);
```

* `hostname` can include the port &mdash; e.g. `localhost:8389` &mdash; if the default Redis port (`6379`) is not used 
* `db` number should be `0` unless the Redis instance has multiple databases (essentially namespaces)
* `streamName` collates messages into a named [Redis Streams](https://redis.io/topics/streams-intro) &mdash; a similar concept to a Kafka topic, which aids message trimming

There is a single method to send the bursts:

```c# hl_lines="9"
var burst = new StreamDataBurst
{
    Data =
    {
        // ...
    }
}

await streamBuffer.WriteAsync(burst);
```

Serializing and sending the [Session Model](../../sessions/model.md#serializing-to-json) as JSON is a bit long-winded, so an extension method is provided:

=== "With extension method"

    ```c#
    await streamBuffer.WriteSessionJsonAsync(session);
    ```

=== "Without extension method"

    ```c#
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    // setup Session Model conventions
    private static readonly JsonSerializerSettings JsonSettings = new JsonSerializerSettings
    {
        ContractResolver = new DefaultContractResolver
        {
            NamingStrategy = new CamelCaseNamingStrategy(false, false)
        },
        DateParseHandling = DateParseHandling.DateTimeOffset
    };

    // ...

    await streamBuffer.WriteAsync(new StreamDataBurst
    {
        Data =
        {
            new StreamData
            {
                SessionJson = JsonConvert.SerializeObject(session, JsonSettings)
            }
        }
    });
    ```

### Session Model Updates

The [Session](../../sessions/index.md) needs to be available from both the REST API and the WebSocket.

!!! important

    These session models _should_ be the same, but sometimes this is difficult:

    * The REST API might expose metadata that isn't available in the ETL pipeline
    * The pipeline might have separate processes writing to Redis and writing to storage, making coordination difficult

    The client compensates by using the session metadata that appears to be most recent based on time-range, and by copying any collections (e.g. [Configuration Bindings](../../sessions/model.md#configuration-bindings)) that are available from one source but undefined in another.

The first and last messages streamed to Redis should be a Session JSON update. Further updates can be sent if any other metadata changes &mdash; e.g. adding configuration, or updating the identifier or details.

The session model does _not_ need to be streamed to update the session time-range, as there is a dedicated operation for this high-frequency operation, as seen in #4 below.

### Buffering and Streaming Data

Data arriving sample-by-sample needs to be buffered for efficient transfer.

In this code sample, the data is arriving/generated in rows, so the code structure looks like this (excluding the InfluxDB writes):

1. Set up a timestamps buffer, and a values buffer for each field/column:  
    ```c#
    var sampleCount = 0;
    var timestampsBuffer = new long[SamplesPerBurst];
    var valuesBuffers = new double[Fields.Length][];
    ```

2. Push timestamps and values into the buffers:  
    ```c#
    for (var f = 0; f < Fields.Length; f++)
    {
        valuesBuffers[f][sampleCount] = values[f];
    }

    timestampsBuffer[sampleCount] = timestamp;
    sampleCount++;
    ```

3. When the buffers are full, create a `StreamDataBurst`:  
```c#
if (sampleCount == SamplesPerBurst)
{
    var burst = new StreamDataBurst();

    for (var f = 0; f < valuesBuffers.Length; f++)
    {
        var tData = new TimestampedData
        {
            ChannelId = (uint)f,
            Buffer = ByteString.CopyFrom(MemoryMarshal.AsBytes<double>(valuesBuffers[f].AsSpan(0, sampleCount)))
        };
        tData.SetTimestamps(timestampsBuffer);

        burst.Data.Add(new StreamData
        {
            TimestampedData = tData
        });
    }

    // ...
}
```

4. Include a time range update &mdash; typically in every burst:  
    ```c#
        burst.Data.Add(new StreamData
        {
            TimeRange = new StreamTimeRange
            {
                StartTime = startTime,
                EndTime = endTime
            }
        });
    ```

5. Send the burst to Redis &mdash; ideally with overlapped I/O to minimise performance overhead:  
    ```c#
        await lastBurst;
        lastBurst = streamBuffer.WriteAsync(burst);
    ```
