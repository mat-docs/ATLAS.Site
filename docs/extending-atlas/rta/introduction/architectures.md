# Architecture Patterns

The [RTA API Specification](../api/index.md) does not require any specific architecture or technology stack &mdash; but there are some common patterns.

This page illustrates some architectures supported by [services from our implementation toolkit](../services/index.md).

!!! info "Legend"
    <object type="image/svg+xml" data="../assets/architectures/legend.svg" class="diagram" title="Legend for diagrams"></object>

## Development

### RTA Server

[RTA Server](../services/rta-server/README.md) provides a simple, single-process deployment to experiment to explore the [RTA API Specification](../api/index.md) and gain familiarity with [Sessions](sessions.md), [Configuration](configuration.md) and the data types.

<object type="image/svg+xml" data="../assets/architectures/rta-server.svg" class="diagram" title="Architecture diagram showing data being loaded into RTA Server and connected to ATLAS"></object>

### Microservices

The [Toolkit Services](../services/index.md) are designed be to run as microservices within a [container orchestrator](https://docs.docker.com/get-started/orchestration/), like [Kubernetes](https://kubernetes.io/).

Here is the same capability, split into individual components:

<object type="image/svg+xml" data="../assets/architectures/microservices.svg" class="diagram" title="Architecture diagram showing RTA toolkit microservices"></object>

All these services are horizontally-scalable, facilitating high-availability deployments.

### OAuth 2.0 Security

ATLAS and the [Toolkit Services](../services/index.md) can use [OAuth 2.0](https://oauth.net/2/) with multi-factor authentication:

<object type="image/svg+xml" data="../assets/architectures/microservices-oauth.svg" class="diagram" title="Architecture diagram showing RTA toolkit microservices with an OAuth 2.0 provider"></object>

The [Gateway Service](../services/rta-gatewaysvc/README.md) proxies the authorization bearer token through to the other microservices.

## Data Adapter Service

RTA does not require data format-shifting.

Instead of copying the data with a loader, you can index it in place and deploy a [Data Adapter Service](data-services.md) to read the store:

=== "InfluxDB"

    _McLaren provide an [InfluxDB Data Service](../services/rta-influxdatasvc/README.md) in the implementation toolkit:_

    <object type="image/svg+xml" data="../assets/architectures/data-influx.svg" class="diagram" title="Architecture diagram showing data served from InfluxDB via a data service"></object>

=== "Files"

    _Custom file formats can be served using exactly the same pattern:_

    <object type="image/svg+xml" data="../assets/architectures/data-adapter.svg" class="diagram" title="Architecture diagram showing data served from files via a data adapter service"></object>

=== "Data Federation"

    _Hetrogeneous formats can all be handled in one deployment:_

    <object type="image/svg+xml" data="../assets/architectures/data-multi.svg" class="diagram" title="Architecture diagram showing heterogeneous data served to ATLAS via data services"></object>

## Continuous Ingest and Live Streaming

The diagrams above show data being indexed after it has arrived. But this can be integrated into existing ingest pipelines.

Calls to the [Toolkit Services](../services/index.md) are made using [gRPC](https://grpc.io/), which is supported in a wide range of languages &mdash; so it is easy to publish [configuration](configuration.md) and [session](sessions.md) metadata from an existing framework.

<object type="image/svg+xml" data="../assets/architectures/ingest-pipeline.svg" class="diagram" title="Architecture diagram toolkit services called from an ingest pipeline instead of an indexer"></object>

This is not limited to metadata. You can live-stream data to ATLAS:

=== "Live Streaming"

    _A copy of the data is streamed across to [Redis](https://redis.io/), and connected to clients via [Stream Service](../services/rta-streamsvc/README.md) web sockets:_

    <object type="image/svg+xml" data="../assets/architectures/ingest-pipeline-live.svg" class="diagram" title="Architecture diagram showing live streaming to ATLAS"></object>

=== "Live Streaming with Files"

    _This streaming strategy can provide a fast bypass when the store has high latency &mdash; for example, file storage:_

    <object type="image/svg+xml" data="../assets/architectures/ingest-pipeline-live-files.svg" class="diagram" title="Architecture diagram showing live streaming to ATLAS with file storage"></object>

## Remote Access

The web services are specifically designed for high-latency operation across the WAN or Internet.

=== "Remote Access"

    _Connections are secured with TLS and OAuth 2.0, so users can connect to a data center or cloud deployment without a VPN:_

    <object type="image/svg+xml" data="../assets/architectures/remote.svg" class="diagram" title="Architecture diagram showing remote user access"></object>

=== "Remote Access across Company Boundaries"

    _Many OAuth 2.0 providers offer identity federation, so subsets of data can be shared securely across company boundaries:_

    <object type="image/svg+xml" data="../assets/architectures/remote-partner.svg" class="diagram" title="Architecture diagram showing remote user access from a Technology Partner"></object>
