# Toolkit Services

These services provide turn-key implementations for RTA functionality.

Typical use cases:

* Reduce the work needed to support a custom store, by providing all the session and config management;
* Provide everything needed to serve data from popular stores like [InfluxDB](https://www.influxdata.com/products/influxdb/);
* Off-the-shelf acquisition for high-rate data with low storage costs;

The services are [Kubernetes](https://kubernetes.io/)-ready and include specific support for AWS.  
They can also be deployed as Windows or Linux binaries on a server or laptop.


[RTA Server](rta-server/README.md)
: Bundles together functionality from the **Session Service**, **Config Service**, and **Data Service** for development and simple deployments.

[RTA Session Service](rta-sessionsvc/README.md)
: Manages a PostgreSQL database of sessions and provides all the necessary browsing and query interfaces.

[RTA Config Service](rta-configsvc/README.md)
: Manages RTA configuration and provides the necessary retrieval interfaces.

[RTA Data Service](rta-datasvc/README.md)
: Provides compact, high-performance telmetry storage with sample rates from 0.001 Hz to 1 MHz.

[RTA Gateway Service](rta-gatewaysvc/README.md)
: Reverse proxy, typically used in front of the **Session Service**, **Config Service**, and **Data Services**.

[RTA Stream Service](rta-streamsvc/README.md)
: WebSocket server for streaming live session updates.

[RTA Schema Mapping Service](rta-schemamappingsvc/README.md)
: Repository for mappings between a source schema and the RTA domain model.

[RTA Influx Data Service](rta-influxdatasvc/README.md)
: Data adapter for [InfluxDB](https://www.influxdata.com/products/influxdb/).

[Docker Images and Downloads](../downloads/services.md){ .md-button .md-button--primary }
