# Frequently Asked Questions (FAQ)

## Q: Do I need to write my integration in C#?

No &mdash; the [API Specification](../api/index.md) is language-neutral.  
The [Toolkit Services](../services/index.md) communicate via [gRPC](https://grpc.io/), so they are also language-neutral.

However, we do provide [NuGet Packages](../downloads.md/#nuget-packages) that will definitely speed up your development.  
They provide:

* Model classes to help with JSON serialization
* REST API stubs and service interfaces to help write back-end services
* ASP.NET implementations of the network protocol &mdash; e.g. transferring data chunks
* Pre-compiled gRPC clients for the services

## Q: Do I need to use the [Toolkit Services](../services/index.md)?

No &mdash; but they can significantly reduce development work.

The RTA session model can be awkward to retrofit into an existing environment, so you can save a lot of time by dropping-in a self-contained implementation. The [Session Service](../services/rta-sessionsvc/README.md) provides support for all the RTA features, including:

* all session metadata, including extended details
* query support, trans-piling requests to SQL
* filter support, by producing the session metamodel
* describing relationships between sessions
* providing extra indirection to compose data from different services

Adding self-contained microservices and some gRPC integration should be significantly less intrusive for your data pipeline.

You _can_ probably achieve a more seamless integration by implementing the [RTA API Specification](../api/index.md) directly against stores in your data environment, which will reduce data duplication and synchronization logic. We recommend starting out with the implementation toolkit and reviewing after initial integration is complete.

## Q: Can I do data queries using this interface?

No &mdash; only metadata queries (which could include aggregate values).

RTA will happily integate into environments that do have more sophisticated query services.
