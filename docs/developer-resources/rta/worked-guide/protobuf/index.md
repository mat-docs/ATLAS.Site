# Protobuf Schemas

RTA models size/performance-sensitive data in [Google Protocol Buffers](https://developers.google.com/protocol-buffers).

??? info "Why not _X?_"

    Some alternative frameworks are starting to gain traction, including:

    * [cap'n'proto](https://capnproto.org/)
    * [FlatBuffers](https://google.github.io/flatbuffers/)
    * [Apache Arrow](https://arrow.apache.org/)

    These achieve even better performance than Protobuf by using zero-copy data structures instead of techniques like variable-length integer compression. The principle is that the data serialization is larger, but still amenable to fast compression (e.g. with [LZ4](https://github.com/lz4/lz4)).

    Protobuf was chosen because it has a great mix of features, maturity, usability, RPC support, language support, and adoption &mdash; combined with good performance. Microsoft's investment in making gRPC a first-class citizen in Visual Studio and ASP.NET Core has been a major deciding factor.

    Memory allocation _is_ still a noticeable factor on a profiler &mdash; but typically only when all other sources of allocation and inefficiency have been eliminated.

These schemas are pre-compiled in the _MAT.OCS.RTA.Model_ library, which is available via the Motion Applied [NuGet Packages](../../downloads.md#nuget-binaries).

If you need to compile them yourself for your preferred language, create this directory structure:

* `protos/`
    * `API/`
        * [`model_data.proto`](model_data.md)
        * [`net_chunks.proto`](net_chunks.md)
        * [`net_stream.proto`](net_stream.md)

Refer to the [protobuf documentation](https://developers.google.com/protocol-buffers/docs/overview#generating) for `protoc` instructions. 
