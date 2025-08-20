
!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.
# rta.model.net.chunks

This IDL is used as part of the protocol for downloading data from the [REST API](../../api/index.md#tag/Data-API).

Each request transfers data in chunks.

Wire format for each chunk (concatenated in a stream):

| Field   | Bytes         | Data type                | Description                                                              |
|---------|---------------|--------------------------|--------------------------------------------------------------------------|
| prefix  | 4             | signed little-endian int | length of header                                                         |
| header  | _prefix_      | protobuf                 | `ChunkTransferHeader` &mdash; including `packed_length` (of the payload) |
| payload | _from header_ | protobuf                 | _data list_                                                              |

`net_chunks.proto`
``` protobuf
--8<--
../protos/API/net_chunks.proto
--8<--
```

The `compression_delta` indicates LZ4=1 on the first chunk if it is used (strongly recommended).
