# RTA Data Service

This service is part of the RTA Toolkit Services suite.

It provides compact, high-performance telemetry storage, backed by either a file system or [Amazon S3](https://aws.amazon.com/s3/) and [DynamoDB](https://aws.amazon.com/dynamodb/). It handles backfill (late samples and channels) and copes with sample rates from 0.001 Hz to 1 MHz with stable memory use and back-pressure control.

It exposes a gRPC interface to write or read data from your environment, and an outward-facing REST interface to be exposed to users via the **Gateway Service**.

This service is intended to be used alongside the **Session Service**, **Config Service**, **Stream Service** (if live updates are required) and **Gateway Service** as a reverse proxy to bring the capabilties together.

It is available as a binary for Windows and Linux, and as a Docker image.

## Performance

Expected throughput on an AWS EC2 m5.xlarge Linux instance, per thread:

| Operation             | Local file system            | Amazon S3 + DynamoDB        |
|-----------------------|------------------------------|-----------------------------|
| Write                 | 30-60 million samples/sec    | 15-30 million samples/sec   |
| Read (slow path[^1]) | 150-180 million samples/sec   | 90-110 million samples/sec  |
| Read (fast path[^2]) | 500-1500 million samples/sec  | 270-300 million samples/sec |

For comparison, a well-tuned [InfluxDB](https://www.influxdata.com/products/influxdb/) facade can expect to read at 2-3 million samples/sec on equivalent hardware.


## When should you use this service?

This service does not offer any search or analytical capabilities &mdash; only high-performance sample storage and retrieval, optimized for RTA.

Other options to consider first:

_Can you access data in its existing format?_
: If you have a significant amount of data in an existing format, it might be better to implement the data service interface to access this data in place. If the format is slow &mdash; such as CSV &mdash; you could cache data aggressively to compensate.

_Can you use a time-series database, such as [InfluxDB](https://www.influxdata.com/products/influxdb/) or [TimescaleDB](https://www.timescale.com/)?_
: Much slower to ingest and query, and much more expensive to run: check your data rates to see what your running costs would be. However, in return you get powerful query and aggregation capabilities which &mdash; while not used by _ATLAS_ &mdash; can be really useful for dashboarding sofware like [Grafana](https://grafana.com/).

_Can you use a columnar file format, like [Parquet](http://parquet.apache.org/)?_
: Slow to ingest and query, and will likely require some specialized ingest tooling to buffer and organize the data before it is written. But if you don't have strict ingest latency or query latency requirements, you can have the flexibility to use the same data storage with _ATLAS_ and Big Data tools like [Apache Spark](http://spark.apache.org/) or [Amazon Athena](http://spark.apache.org/).

If Motion Applied don't provide a service for your existing format, perhaps we can help you build one?
Refer to our developer documentation for more information.

You might prefer this **Data Service** if you need:

* High speed and efficiency
* Bulk access to subsets of data &mdash; without resampling or aggregation
* Reasonably compact, inexpensive storage (expect around 1.2 bytes/sample)
* To store data as it arrives without a slow finalization stage
* To work with minimal supporting infrastructure
* Support for more data types than double-precision
* Motion Applied ECU-specific channel types, such as slow-row data

## Usage

### Docker

_Storing data on the file system:_
```
docker run --rm \
  -v /path/to/store:/data \
  -e RTA_Store=File \
  -e RTA_FilePath=/data \
  -p 2670:2670 -p 2671:2671 -p 2672:2672 \
  mclarenapplied/rta-datasvc
```

_Storing data in AWS:_
```
docker run --rm \
  -e RTA_Store=Aws \
  -e RTA_AwsS3Bucket=mydatabucket \
  -e RTA_AwsDynamoTable=mydatatable \
  -p 2670:2670 -p 2671:2671 -p 2672:2672 \
  mclarenapplied/rta-datasvc
```

### Command Line

_Storing data on the file system:_
```
rta-datasvc --Store File --FilePath /data
```

_Storing data in AWS:_
```
rta-datasvc --Store Aws --AwsS3Bucket mydatabucket --AwsDynamoTable mydatatable
```

## Ports

| Port | Protocol   | Usage                               |
|------|------------|-------------------------------------|
| 2670 | HTTP       | Expose to ATLAS via Gateway Service |
| 2671 | HTTPS      | Expose to ATLAS via Gateway Service |
| 2672 | gRPC       | Expose within local environment     |

## Monitoring

HTTP `GET /`
: Returns `200 OK` and reports the software version.
  In _Kubernetes_, use this for _liveness_ probes.

HTTP `GET /health`
: Returns `200 OK` if the service is up and the file system path or AWS S3 bucket and DynamoDB table are accessible.  
  In _Kubernetes_, use this for _readiness_ probes.

HTTP `GET /metrics`
: [Prometheus](https://prometheus.io/) metrics, including the health check status.

## Configuration

The service can be configured to store data either on the file system, or on AWS using [S3](https://aws.amazon.com/s3/) for the data and [DynamoDB](https://aws.amazon.com/dynamodb/) for indexes.

Options can be set using both environment variables and command line arguments, or by the provided `appsettings.config` JSON configuration file.

Environment variables are all prefixed with `RTA_`, and can be written in `ALLCAPS` or `MixedCase`.  
For example, `FilePath` is `RTA_FILEPATH` or `RTA_FilePath`.

For Linux and on _Kubernetes_, also replace `:` with `__`.  
For example, `Category:Item` is `RTA_CATEGORY__ITEM`.

| Option           | Value                                                                                | Required        | Default |
|------------------|--------------------------------------------------------------------------------------|-----------------|---------|
| `EnableRead`     | Enables the service for _read_ access via gRPC or REST; `true` or `false`            | no              | `true`  |      
| `EnableWrite`    | Enables the service for _write_ access via gRPC; `true` or `false`                   | no              | `true`  |     
| `Store`          | `File` or `Aws`                                                                      | yes             |         |      
| `FilePath`       | Path to data volume                                                                  | if `Store=​File` |         |      
| `AwsS3Bucket`    | S3 bucket name where the data is stored                                              | if `Store=​Aws`  |         |
| `AwsDynamoTable` | DynamoDB table name where the indexes are stored                                     | if `Store=​Aws`  |         |

We recommend that separate instances are run in _either_ the _read_ or _write_ roles.
This helps balance resource use and allows the _write_ service to run with different permissions and network security rules.

### Init Store

`InitStoreAndExit=true` will cause the service to initialize the store and exit immediately.
This enables the service to be used to setup or upgrade the environment.

| Option               | Value                       |Required              | Default |
|----------------------|-----------------------------|----------------------|---------|
| `InitStoreAndExit`   | `true` or `false`           | no                   | `false` |

### Memory Management

These options manage the memory pool when writing data &mdash; and so are relevant only when `EnableWrite=true`.

* _Write buffers_ are used to accumulate incoming data;
* _Flush buffers_ are used to collate and hold data while is it being flushed to storage;
* The _high threshold_ determines when data is transferred from _write buffers_ to _flush buffers_;
* The _low threshold_ determines how much data should remain in the _write buffers_ to be merged with back-fill.

The default options are quite aggressive, consuming 256 MiB (write) + 128 MiB (flush), beginning a flush at 50% write buffer usage and flushing down to 10%. You probably don't need to change these settings unless you want to raise or lower the memory requirement.

| Option                                     | Value                                                            |Required | Default |
|--------------------------------------------|------------------------------------------------------------------|---------|---------|
| `DataWriteMemory:​WriteBuffers`             | Number of write buffers                                          | no      | `128`   |
| `DataWriteMemory:​FlushBuffers`             | Number of flush buffer                                           | no      | `16`    |
| `DataWriteMemory:​WriteBufferSize`          | Write buffer size (MiB)                                          | no      | `2`     |
| `DataWriteMemory:​FlushBufferSize`          | Flush buffer size (MiB)                                          | no      | `8`     |
| `DataWriteMemory:​WriteBufferHighThreshold` | Proportion of write buffers to start flushing at (`0.0` - `1.0`) | no      | `0.5`   |
| `DataWriteMemory:​WriteBufferLowThreshold`  | Proportion of write buffers to flush down to (`0.0` - `1.0`)     | no      | `0.1`   |
| `DataWriteMemory:​Preallocate`              | Pre-allocate memory; `true` or `false`                           | no      | `false` |

These are soft limits: additional memory is required to merge late data (back-fill), and run the .NET Core Garbage Collector.

Pre-allocation helps ensure that the process is stable when under load in a resource-constrained environment &mdash; such as Kubernetes.

When tuning for maximum throughput, aim for a write:flush ratio of about 2:1 to balance the buffers after allowing for data compression.
Set the flush buffer size so that a full flush will span 4-16 buffers for increased I/O parallelism.

### Authentication and Authorization

These options enable OAuth 2.0 support.

This service is intended to run within a private network, behind the **Gateway Service**, which will forward the Bearer token if present. 

| Option              | Value                       | Required             |
|---------------------|-----------------------------|----------------------|
| `EnableAuth`        | `true` or `false`           | no                   |
| `Auth:​Authority`    | OAuth2 authorization server | if `EnableAuth=​true` |
| `Auth:​Audience`     | OAuth2 audience             | if `EnableAuth=​true` |

[^1]: Slow-path access happens when the data needs to be decoded before it can be served to the user &mdash; for example, to apply a time-shift.

[^2]: Fast-path access happens when no decoding is required and data can be routed directly from storage to _ATLAS_ with minimal intermediate processing.