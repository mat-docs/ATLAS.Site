# Stream API

The Stream API is responsible for publishing and consuming data from the Kafka broker. Created under the 
[gRPC framework](https://grpc.io/), it allows clients to communicate to a server which handles the Kafka communication.

The server and the client can be deployed locally within the same application or the server can be deployed remotely 
with the docker image provided.

Four components are currently available for evaluation:

1. Stream API Remote Server as [docker image](https://hub.docker.com/r/mclarenapplied/streaming-proto-server-host) 
2. Stream API Remote Client as [NuGet package](https://github.com/orgs/mat-docs/packages/nuget/package/MA.Streaming.Proto.Client.Remote)
3. Stream API Local Server as [NuGet package](https://github.com/orgs/mat-docs/packages/nuget/package/MA.Streaming.Proto.ServerComponent)
4. Stream API Local Client as [NuGet package](https://github.com/orgs/mat-docs/packages/nuget/package/MA.Streaming.Proto.Client.Local)

## Batching Responses

When a high amount of messages is processed at the same time, the overhead can be significant and the bandwidth can be 
more efficiently utilised by batching the responses. 

The configuration on the server side corresponds to the behaviour when consuming off the broker, whereas 
the configuration on the client side corresponds to the behaviour when producing to the broker.

## Compression

The Stream API Server handles the message compression, with `zstd` compression applied as 
the producer compression type.
The recommended compression setting on the broker is `producer`.

## Sample Implementation

### Simple stream produce consumer
In this scenario, a custom data producer can publish data onto the broker via the
Stream API Client and the Stream API Server. 

The Stream API Client is an in-process API, so in this implementation, the producer and the
Stream API Client can be in the same application. The Stream API Client will establish a 
gRPC channel with the Server to transfer the data to be published to the broker. 

The same combination of Stream API Server and Stream API Client can be used to 
retrieve the same data from the broker.

![Architecture of simple stream producer consumer](../assets/stream_architecture_light.png#only-light)
![Architecture of simple stream producer consumer](../assets/stream_architecture_dark.png#only-dark)
