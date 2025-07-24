# WebSocket Protocol

The ATLAS client opens a dedicated [WebSocket](https://datatracker.ietf.org/doc/html/rfc6455) connection for each [Session](../sessions/index.md) in the `#!json "open"` state.

All messages are binary payloads, with the content serialized according to the [net_stream.proto](../protobuf/net_stream.md) file.

As soon as the client connects, the server sends the current [Session JSON](../sessions/index.md), and then the current session time-range and any subsequent updates.
No events or data are sent until the client subscribes to them.

The client can send a subscription request at any time, specifying channel numbers for selective data delivery. This widens any existing subscription.
The server immediately starts following the leading edge of the session, but should also send data to backfill between the data that is available from the
[REST API](../../api/index.md) up to the leading edge. The duration of this back-scan is configured server-side &mdash; and since it's unlikely to be a
precise join, the client should deal with some overlap.

Streamed data is not necessarily in time order: the data may arrive out of order at the ingest point, and back-fill will send data behind the leading edge.

## Connecting

The URI structure is:

    wss://example.com/rta/v2/sessions/{identity}/stream

The client must request this [sub-protocol](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#subprotocols):

    mat.ocs.rta.stream-lz4

??? info "HTTP Headers"

    ```
    GET /rta/v2/sessions/{identity}/stream HTTP/1.1
    Host: example.com:443
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
    Sec-WebSocket-Version: 13
    Sec-WebSocket-Protocol: mat.ocs.rta.stream-lz4
    ```

    Almost all servers and clients only support WebSockets over HTTP/1.1

Error Responses:

`400 Bad Request`
:   If the request is not a WebSocket connection upgrade.

`406 Not Acceptable`
:   If the request does not specify the `mat.ocs.rta.stream-lz4` sub-protocol.

The initial handshake should complete successfully even if there is no session to stream.

## Initial Server Response

The first message from the server must contain only the current Session JSON.

If the session is not available to stream, the server cannot send the Session JSON and
initiates a normal [WebSocket close handshake](https://datatracker.ietf.org/doc/html/rfc6455#section-7.1.2)
without sending any other messages. The client should back-off and retry after confirming the session is still
open by polling the [REST API](../../api/index.md).

## Server Messages 

Server messages are all `StreamDataBurst`:

```protobuf
message StreamDataBurst {
    repeated StreamData data = 1;
}
```

Each burst contains one or more `StreamData` messages, carrying:

* Session metadata updates
* Session time-range updates
* Events and sample data

```protobuf
// Base message for all stream data.
message StreamData {

    reserved 1;

    oneof data {

        // Session JSON update. The format must match the web service specification.
        // This is the first message downloaded by a new web socket connection, so it is not possible
        // to establish a stream session until at least one Session JSON update has been streamed.
        // If collections of details, laps, config bindings etc are null - not empty - it is assumed
        // they are unavailable and they will be merged in from the Session JSON downloaded from the service.
        string session_json = 2;

        // Time range update.
        // This needs to be sent regularly so that the data viewer can pan smoothly to show
        // activity, even if no data subscription has been applied.
        // The overall session time range is expanded to cover this update.
        StreamTimeRange time_range = 3;

        // Timestamped Data
        rta.model.data.TimestampedData timestamped_data = 4;

        // Periodic Data
        rta.model.data.PeriodicData periodic_data = 5;

        // Row Data
        rta.model.data.RowData row_data = 6;

        // Event
        rta.model.data.Event event = 7;

    }
}

// Updates the session time range.
message StreamTimeRange {

    // Start time (inclusive) in nanoseconds relative to the Unix epoch.
    sfixed64 start_time = 1;

    // End time (inclusive) in nanoseconds relative to the Unix epoch.
    sfixed64 end_time = 2;
}

```

`SessionTimeRange` updates are sent at fairly high frequency (typically up to 10 Hz) to ensure the client can smoothly scroll
displays to reflect live activity, even if the user is displaying data that is not updated that often.

The serialized `StreamDataBurst` is compressed in a block using [LZ4](https://github.com/lz4/lz4).

This burst representation is important for network efficiency, as the individual `StreamData` messages may be quite small
and there may be significant opportunity for compression across a series of messages. The server will size the bursts
to be about 64 KiB (before compression) without introducing significant latency.

## Client Messages

Client messages are all `StreamRequest`:

```protobuf
message StreamRequest {

    reserved 1;

    oneof option {
        // Widens the subscription.
        StreamSubscription subscribe = 2;
    }
}
```

The `oneof option` makes the request extensible, but currently only defines a subscription request:

```protobuf
message StreamSubscription {
    // Events mask.
    bool all_events = 1;
    // All data channels mask.
    bool all_data_channels = 2;
    // Specific data channels mask.
    repeated uint32 data_channel_ids = 3;
}
```

Client messages are not compressed.

## Closing the Connection

The WebSocket protocol defines a [close handshake](https://datatracker.ietf.org/doc/html/rfc6455#section-7) that must be followed.

In practice, this means that the client requests closure and should continue to read messages until the server sends a corresponding
close message &mdash; and the server may initiate closure at any time.
