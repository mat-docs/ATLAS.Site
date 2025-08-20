
!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.
# rta.model.net.stream

This IDL is used in [WebSocket](https://en.wikipedia.org/wiki/WebSocket) communications for live streaming data from the [Stream Service](../../services/rta-streamsvc/README.md).

When the client initially connects, the server begins sending `StreamDataBurst` (_binary_) messages.  
These intially include only `session_json` and `time_range` updates, but the client can widen its subscription to include data by sending `StreamRequest` messages.

``` protobuf
--8<--
../protos/API/net_stream.proto
--8<--
```