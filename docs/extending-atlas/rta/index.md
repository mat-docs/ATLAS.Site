# Introduction to RTA

ATLAS _Remote Telemetry Architecture_ (RTA) defines web services to let you load telemetry directly from your existing storage:

<object type="image/svg+xml" data="introduction/assets/intro.svg" class="diagram" title="Simple integration with ATLAS"></object>

This can work with a wide range of technologies, such as:

* [InfluxDB](https://www.influxdata.com/products/influxdb/), [TimescaleDB](https://www.timescale.com/) and other time-series stores
* [MongoDB](https://www.mongodb.com/), [Couchbase](https://www.couchbase.com/) and other document databases
* [Parquet](https://parquet.apache.org/), [HDF5](https://www.hdfgroup.org/solutions/hdf5/) and other file formats
* [SQL Server](https://www.microsoft.com/en-gb/sql-server), [PostgreSQL](https://www.postgresql.org/), [MySQL](https://www.mysql.com/)...

## Live Monitoring

The RTA specification includes [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) streaming for live telemetry monitoring.

Our reference architecture recommends implementing this by taking a feed from your acquisition pipeline, and buffering it through [Redis](https://redis.io/) &mdash; which decouples the client activity and allows users to join the session at any point.

<object type="image/svg+xml" data="introduction/assets/intro-live.svg" class="diagram" title="Live integration with ATLAS"></object>

This enables ATLAS to display data in real-time even if your acquisition pipeline cannot write to storage in real-time, or if the storage is not available until acquisition is complete &mdash; common with file formats.

When users open live sessions, ATLAS selectively subscribes to the parameters on display using a [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) connection, and the [Redis](https://redis.io/) buffer covers the gap until data is flushed to storage. Users can get a complete and real-time view of the data even when joining hours into a session.

## Toolkit Services

The [RTA API Specification](../../developer-resources/rta/api/index.md) provides all the nececessary information to create a slick integration between ATLAS and your data infrastructure, with detail including:

* [OpenAPI schema](https://www.openapis.org/faq) describing the REST API
* [JSON schemas](https://json-schema.org/) for the data model and query dialect 
* [Protobuf schemas](https://developers.google.com/protocol-buffers) for low-level data transport

However, you can save a lot of development effort by deploying [services](../../developer-resources/rta/services/index.md) from our implementation toolkit.

By using these services to cover all the data management functionality, you won't need to implement any of the browsing, search or configuration management features. All you'll need to write is a simple hook into your ingest pipeline, and a [Data Adapter Service](introduction/data-services.md):

<object type="image/svg+xml" data="introduction/assets/intro-data-adapter.svg" class="diagram" title="Data Adapter with Toolkit Services"></object>

These Toolkit Services provide [gRPC](https://grpc.io/) services for integration with the rest of your data infrastructure.

[gRPC](https://grpc.io/) is a modern, high performance framework for making service calls. It supports all popular programming languages, and the services are fully-described with schemas &mdash; so you get a high-quality client library that will work with your existing software stack, and high-quality developer tools to guide use of the API.

You can deploy these services on [Windows](../../developer-resources/rta/downloads.md#binaries) or [Linux](../../developer-resources/rta/downloads.md#binaries), and on-premises or in the Cloud using our [Docker images](../../developer-resources/rta/downloads.md#docker). Our services are specifically designed to work well with [Kubernetes](https://kubernetes.io/) and [AWS](https://aws.amazon.com/).

## Standalone Options

If you do not have any central telemetry database or file archive, RTA may not be the right architecture for you &mdash; but ATLAS is also very capable operating standalone:

* ATLAS can browse and mount files directly.  
  This is a great option if your use case involves a lot of travel and in-field laptops.

* ATLAS can display and record live telemetry directly from equipment &mdash; e.g. CAN bus &mdash; or the local network.  
  This option is popular in motorsport and eSports.

Some plugin development will be required for both these capabilities.  
[Contact us](https://www.mclaren.com/applied/contact/) for a more in-depth technical discussion.
