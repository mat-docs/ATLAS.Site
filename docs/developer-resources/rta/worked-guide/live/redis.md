# Streaming to Redis

[Redis Streams](https://redis.io/topics/streams-intro) provides a buffer between telemetry ingest
and the [Stream Service](../../services/rta-streamsvc/README.md) implementing the [WebSocket protocol](websockets.md).

???+ info "Why Redis?"

    [Redis Streams](https://redis.io/topics/streams-intro) is a similar design to [Apache Kafka](https://kafka.apache.org/).

    [Redis](https://redis.io/) was chosen because:

    * it's generally considered to be easier to deploy and manage, with few configuration options
    * it's easier to implement lookups for the current [Session JSON](../sessions/index.md) and time-range
    * it's then also available for caching data from the [REST API](../../api/index.md) (likely to be needed at some point)

    [Redis](https://redis.io/) can be run on Windows using [Docker](https://hub.docker.com/_/redis).

[Redis](https://redis.io/) provides the communication layer, and this page defines a protocol layered over the top.

!!! info

    This protocol is implemented by the _MAT.OCS.RTA.StreamBuffer_ [NuGet Package](../../downloads/nuget.md) (.NET Core).

## Stream Management

Messages are sent to named [Redis Streams](https://redis.io/topics/streams-intro).

As a guideline, create a new stream for each source of data, and sub-divide further as needed.

You can have as few or as many named streams as you like, but:

_Streams need to be trimmed so the buffer doesn't grow indefinitely_
:   This is done automatically by the [Stream Service](../../services/rta-streamsvc/README.md),
    but doesn't work effectively if new streams are being constantly created.  
    They should be persistent.

_Streams can't be read selectively_
:   The [Stream Service](../../services/rta-streamsvc/README.md) will need to consume all data from a stream
    &mdash; even if it has a single client subscribed to a single session.  
    If there are too many concurrent sessions, this becomes inefficient.

As an example, if the source of the data is [Kafka](https://kafka.apache.org/), consider creating a stream for
each topic partition.

## Session Metadata Updates

ATLAS will not show a [Session](../sessions/index.md) in the Session Browser until it is available from the REST API,
along with [Configuration](../configuration/index.md). The session needs to be in the `#!json "open"` state and
have [configuration bindings](../sessions/model.md#configuration-bindings).

The [WebSocket protocol](websockets.md) also requires the Session JSON to be available before any data can be streamed
to a client, which means that the Session needs to be published _both_ via the REST API and via Redis and the WebSocket protocol.

It might be difficult to keep these consistent &mdash; particularly if the ingest pipeline is split into different processes.

Here are some guidelines:

1. Make sure your ingest process will publish the Session via the REST API promptly.  
   If it's a slow-starting batch process, consider publishing a record (e.g. to the [Session Service](../../services/rta-sessionsvc/grpc.md))
   at the start of live streaming &mdash; which can then be updated.

2. The [Session JSON model](../sessions/model.md) can leave the [details](../sessions/model.md#details-and-extended-details)
   and [configuration bindings](../sessions/model.md#configuration-bindings) set to `#!json null` in the stream message
   to ensure the client uses the version in the REST API &mdash; or vice versa.

3. The [Session time-range](../sessions/model.md/#time-range) does not need to be updated in the JSON at high frequency
   since there is a dedicated stream protocol message for this aspect. But it should ideally be updated in the REST API
   every 5-30 seconds so progress is indicated in the ATLAS Session Browser.

4. Make sure the Session state is updated to `#!json "closed"` in the stream and ultimately in the REST API.
   The WebSocket protocol is designed so that it doesn't matter if the two are slightly out of sync.

## Protocol

There are three Redis data structures to update:

* `stream:*` keys are [Streams](https://redis.io/topics/streams-intro) carrying compressed `StreamDataBurst` messages
* `streams` is a [Set](https://redis.io/topics/data-types#sets) listing all the Streams
* `sessions` is a [Hash](https://redis.io/topics/data-types#hashes) locating each Session and containing the latest JSON model and time-range

### Streams

Follow a naming convention where each Redis Stream is named with the `stream:` prefix.  
For example: `rocket-engine` becomes `stream:rocket-engine`

A Redis Message is made up of name-value pairs. For this protocol, they are:

* [`"id"`](#message-id) &mdash; distinguishing the session
* [`"data"`](#message-data) &mdash; LZ4-compressed protobuf payload

The [`XADD` command](https://redis.io/commands/xadd) appends a message to a stream.

#### Message `"id"`

A Redis Stream can carry multiple concurrent [Sessions](../sessions/index.md), so each message has an `"id"` field
specifying a stream session ID.

This is a simple number. It should be tracked in a key named `lastStreamSessionId` and atomically polled and incremented
using the [`INCRBY` command](https://redis.io/commands/incrby).

#### Message `"data"`

The core message payload in the `"data"` field is an [LZ4](https://github.com/lz4/lz4)-compressed [`StreamDataBurst`](../protobuf/net_stream.md),
as described for the [WebSocket protocol](websockets.md#server-messages).

!!! important

    Aim for messages that are roughly 64 KiB (before compression), and do not exceed 1 MiB.

    This ensures that the messages contain enough data that the protocol overhead is insignificant,
    but are small enough that the [Stream Service](../../services/rta-streamsvc/README.md) can process data
    efficiently by reusing memory buffers.

### Streams Set

Maintain a `streams` [Set](https://redis.io/topics/data-types#sets) containing all stream names (without the `stream:` prefix).

This enables the [Stream Service](../../services/rta-streamsvc/README.md) to discover all streams (for trimming)
without scanning for keys &mdash; which is discouraged for clustered deployments.

The [`SADD` command](https://redis.io/commands/sadd) adds an entry to a Set.

### Sessions Hash

Maintain a `sessions` [Hash](https://redis.io/topics/data-types#hashes) containing a description of all sessions.

Each entry should use the [Session Identity](../sessions/model.md#required-properties) as the key, and must define the following value fields:

`"streamSessionId"`
:   * Corresponds to the `"id"` field in each stream message
    * Enables the [Stream Service](../../services/rta-streamsvc/README.md) to filter for the correct session

`"streamName"`
:   * Corresponds to the stream name containing the session (without the `stream:` prefix)
    * Enables the [Stream Service](../../services/rta-streamsvc/README.md) to subscribe to the correct stream

`"streamPosition"`
:   * Current stream position when the first stream message was appended, or `0-0` if the stream is new
    * Enables the [Stream Service](../../services/rta-streamsvc/README.md) to scan fewer messages when catching up to the leading edge

`"lastUpdated"`
:   * Time (milliseconds since Unix epoch) this Hash was last updated
    * Enables a cleanup job to identify streams and sessions that haven't updated in a long time

Every time a message is streamed to update the Session JSON, this field must be added or updated:

`"json"`
:   * Session JSON
    * Enables the [Stream Service](../../services/rta-streamsvc/README.md) to give the client the latest Session model when it connects

Every time a message is streamed to update the Session time-range, these fields must be added or updated as a pair:

`"tStart"`
:   * Earliest timestamp in the Session, in nanoseconds since the Unix epoch

`"tEnd"`
:   * Latest timestamp in the Session, in nanoseconds since the Unix epoch

!!! important

    A Session is not ready to be streamed via the [WebSocket protocol](websockets.md) until the `"json"` field is available.

    It is not necessary to keep the time-range up to date in the JSON since this is covered by `"tStart"` and `"tEnd"`,
    but the JSON should be updated periodically in the REST API so users can see an indication of activity in the ATLAS Session Browser.

The [`HMSET` command](https://redis.io/commands/hmset) updates the fields for a Hash entry.

Entries in the `sessions` hash should be set to expire automatically after a reasonable interval.
