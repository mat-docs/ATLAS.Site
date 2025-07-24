# gRPC APIs

`rta-server` packages up three capabilities into a single process:

* [Session Service](../rta-sessionsvc/README.md)
* [Config Service](../rta-configsvc/README.md)
* [Data Service](../rta-datasvc/README.md)

gRPC interfaces are enabled by the `EnableGprc` option (default: `true`) and present the same API as the individual toolkit services.

=== "Session Service API"

    _See also: [Session Service gRPC API](../rta-sessionsvc/grpc.md)_

    ``` protobuf
    --8<--
    ../protos/Toolkit/session_service.proto
    --8<--
    ```

=== "Config Service API"

    _See also: [Config Service gRPC API](../rta-configsvc/grpc.md)_

    ``` protobuf
    --8<--
    ../protos/Toolkit/config_service.proto
    --8<--
    ```

=== "Data Service API"

    _See also: [Data Service gRPC API](../rta-datasvc/grpc.md)_

    The `DataWriter` service is enabled by the `EnableDataWriter` service option (default: `true`).

    ``` protobuf
    --8<--
    ../protos/Toolkit/data_service.proto
    --8<--
    ```
