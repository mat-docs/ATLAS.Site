# Live Streaming Basics

RTA live streaming enables a client to follow the leading edge of a live session without polling.

!!! important

    RTA live streaming is designed for use _downstream_ from storage, rather than as an upstream telemetry distribution protocol.

    The [REST API](../../api/index.md) must be available to provide [Configuration](../configuration/index.md),
    and ATLAS expects to be able to retrieve the [Session](../sessions/index.md) and read any flushed [Data](../data/index.md).

## WebSocket Communication

When a user loads a [Session](../sessions/index.md) from the [REST API](../../api/index.md), the client checks to see if
the session is in the `#!json "open"` state. In that case, if a
[WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) URI has been configured, the client tries
to open a connection using the [Session Identity](../sessions/model.md#required-properties) as part of the URI.

A WebSocket URI uses the `ws://` or `wss://` scheme (equivalent to `http://` and `https://`).

!!! example

    For session identity `abc123`:

        wss://example.com/rta/v2/sessions/abc123/stream

The server immediately starts sending session metadata updates using a [simple protobuf-based protocol](websockets.md),
and clients can send requests to subscribe to events and data. The flow of data is selective and predominantly unidirectional,
so it is both efficient and insensitive to connection latency.

## Redis Communication

The [Stream Service](../../services/rta-streamsvc/README.md) provides a reference implementation of the
[WebSocket protocol](websockets.md) and receives its data for distribution via [Redis](https://redis.io/),
which acts as a broker between the ingest points and the edge services.

<object type="image/svg+xml" data="assets/redis.svg" class="diagram" title="Architecture diagram showing Redis as a buffer"></object>

This decoupling helps ensure that edge services can be scaled and fault-tolerant, and ingest processes can
be short-lived and unaffected by client activity.

Data is carried using a [simple protocol](redis.md) built on [Redis Streams](https://redis.io/topics/streams-intro),
which also provides buffering to cover the gap between flushed data &mdash; which should be available via the
[REST API](../../api/index.md) &mdash; and the leading edge. This gap will vary depending on the storage technology:
it could be milliseconds or hours.

The _MAT.OCS.RTA.StreamBuffer_ [NuGet Package](../../downloads.md#nuget-binaries) (.NET Core) provides an implementation
for ingest processes to send data to Redis, and the [protocol](redis.md) is documented for the benefit of
ingest pipelines written in other languages.

## Complications

The live stream may not originate in the same process that writes data to persistent storage.  
This is likely when integrating with existing infrastucture or using off-the-shelf connectors.

<object type="image/svg+xml" data="assets/complications.svg" class="diagram" title="Architecture diagram showing separate writer and streaming ingest processes"></object>

This raises several complications:

_Difficult to synchronize session metadata_
:   The process writing to persistent storage might have more metadata available
    than the process creating the live data stream.

    The client needs to mitigate this by combining metadata from the REST API and WebSocket using some heuristics,
    and there are some [guidelines to mitigate this issue](redis.md#session-metadata-updates).

_Difficult to track how much data has been flushed_
:   Many storage technologies do not guarantee immediate consistency, and separation between ingest processes can make
    it nearly impossible to determine when data has been flushed with perfect accuracy. If the flush point is not known,
    there cannot generally be a seamless join between the REST API and WebSocket streaming data.

    There are strategies that might mitigate this in specific situations &mdash; such as inserting checkpoints or tracking
    progress based on time &mdash; but in general it is more robust simply to configure the server environment to buffer 
    stream data in Redis for a fixed period based on the known system characteristics.
    
    The client needs to mitigate this by merging data where there is an overlap.
