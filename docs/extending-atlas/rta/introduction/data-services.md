# Data Services

Data Services read samples and events from a telemetry store, and serve them to ATLAS.

The telemetry store could be a database, or a data lake, or an object store, or a set of files...

The service itself can be a simple read-only _data adapter_. It can extend an existing application, or it could be a standalone service sharing the existing data store. For high performance, it should access the data store as directly as possible rather than proxying a web service.

[Services from the toolkit](../../../developer-resources/rta/services/index.md) can cover the other key requirements, which are:

* Data management &mdash; _[Sessions](sessions.md)_
* Describing the data model &mdash; _[Configuration](configuration.md)_

_Example deployment, with supporting [Gateway Service](../../../developer-resources/rta/services/rta-gatewaysvc/README.md) (proxy) and [Schema Mapping Service](../../../developer-resources/rta/services/rta-schemamappingsvc/README.md):_

<object type="image/svg+xml" data="../assets/data-services/data-adapter.svg" class="diagram" title="Architecture diagram showing a data adapter service"></object>

The [Developer Guide](../../../developer-resources/rta/worked-guide/index.md) includes a walkthrough demonstrating the process of [writing a Data Adapter Service](../../../developer-resources/rta/worked-guide/tutorials/data-adapter/index.md), which can be written from scratch in any framework using the [API Specification](../../../developer-resources/r../../../developer-resources/rta/api/index.md), or built in [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core) taking advantage of McLaren's [library support](../../../developer-resources/rta/downloads.md).

Development time can be as little as a few hours for a prototype, up to a few weeks for an efficient, production-grade service.

## Toolkit Services

McLaren currently provide two data services in the [services toolkit](../../../developer-resources/rta/services/index.md):

[RTA Data Service](../../../developer-resources/rta/services/rta-datasvc/README.md)
: Read/write storage optimized for RTA, backed by either a file system, or [Amazon S3](https://aws.amazon.com/s3/) and [DynamoDB](https://aws.amazon.com/dynamodb/).  
  Cost-efficient and very fast &mdash; but provides no data query or summarization capabilities.

[Influx Data Service](../../../developer-resources/rta/services/rta-influxdatasvc/README.md)
: Data Adapter Service for [InfluxDB](https://www.influxdata.com/products/influxdb/).  
