
!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.
# RTA Influx Data Service

This service is part of the RTA Toolkit Services suite.

It provides a data adapter for _InfluxDB_, to be exposed to users via the **Gateway Service**.

This service is intended to be used alongside the **Session Service**, **Config Service**, **Stream Service** (if live updates are required) and **Gateway Service** as a reverse proxy to bring the capabilties together.
The **Schema Mapping Service** is also required as a support service, to describe the mapping between the _InfluxDB_ domain model (measurements, fields) and the RTA domain model.

It is available as a binary for Windows and Linux, and as a Docker image.

!!! info
    This version only supports InfluxQL, not Flux.

## Schema

### Data Identity and Filter Expressions

The data identity is passed to the service in the URI:

`http://myhost:2670/rta/v2/data/<identity>/timestamped/-`

For this service, the data identity is an _InfluxDB_ filter expression, in InfluxQL:

> if the data identity (filter expression) is: `someData='50835ebe-a7f6-453b-9efd-c956e6da09f4'`  
> the resulting query will include: `... WHERE (someData='50835ebe-a7f6-453b-9efd-c956e6da09f4') ...`  
> the URI will look like: `http://myhost:2670/rta/v2/data/streamId='50835ebe-a7f6-453b-9efd-c956e6da09f4'/timestamped/-`

This expression is merged into the data retrieval query and must therefore come from a trusted source.
Do not compose this filter expression directly from user data.

The expression is automatically wrapped in brackets in the query.
You can use complex boolean expressions with relational comparisons.

### Publishing Schema Mappings

You must publish a _Schema Mapping_ to the **Schema Mapping Service**.

You must define:

| Path                                          | Value                                                                                                          | Required | Default               |
|-----------------------------------------------|----------------------------------------------------------------------------------------------------------------|----------|-----------------------|
| `data_source`                                 | Namespace for Schema Mappings. Must match the `DataSource` service configuration option.                       | yes      |                       |
| `data_identity`                               | Query filter expression (see above).                                                                           | yes      |                       |
| `schema_mapping.properties​[dialect]`          | Query dialect. Only `influxql` is currently supported, but `flux` will be supported in future versions.        | no       | _from service config_ |
| `schema_mapping.properties​[database]`         | InfluxQL [database](https://docs.influxdata.com/influxdb/v1.8/concepts/glossary/#database).                    | no       | _from service config_ |
| `schema_mapping.properties​[retention_policy]` | InfluxQL [retention policy](https://docs.influxdata.com/influxdb/v1.8/concepts/glossary/#retention-policy-rp). | no       | _from service config_ |
| `schema_mapping.properties​[measurement]`      | InfluxQL [measurement](https://docs.influxdata.com/influxdb/v1.8/concepts/glossary/#measurement).              | no       | _from service config_ |
| `schema_mapping.field_mappings`               | Mapping from database fields to RTA channel numbers &mdash; see below.                                         | no       |                       |
| `schema_mapping.event_mappings`               | Mapping from event data to RTA event Ids &mdash; see below.                                                    | no       |                       |

The `field_mappings` enable the service to select fields matching the incoming RTA channel-based request.

Each `FieldMapping` looks like this:

| Path                                            | Value                                               | Required |
|-------------------------------------------------|-----------------------------------------------------|----------|
| `source_field`                                  | Database field name.                                | yes      |
| `target_channel`                                | RTA channel number.                                 | yes      |
| `source_field_data_type`                        | _currently unused: all fields are double-precision_ | no       |
| `target_channel_data_type`                      | _currently unused, but may be used in future_       | no       |
| `properties`                                    | _currently unused for this service_                 | no       |

#### Sample

_In JSON format:_

``` json
{
  "dataSource": "mydata",
  "dataIdentity": "someData='50835ebe-a7f6-453b-9efd-c956e6da09f4'",
  "schemaMapping": {
    "properties": {
      "dialect": "influxql",
      "database": "mydb",
      "measurement": "mydata"
    },
    "fieldMappings": [
      {
        "sourceField": "aaa",
        "targetChannel": 0
      },
      {
        "sourceField": "bbb",
        "targetChannel": 1
      },
      {
        "sourceField": "ccc",
        "targetChannel": 2
      }
    ],
    "eventMappings": []
  }
}
```

In this example, an RTA request for channels `1,2` would translate to an InfluxQL query like this:

`SELECT "bbb", "ccc" FROM "mydb"."autogen"."mydata" WHERE (someData='50835ebe-a7f6-453b-9efd-c956e6da09f4')`

## Usage

### Docker

_InfluxDB 1.8+:_
```
docker run --rm \
  -e RTA_DataSource=mydata \
  -e RTA_SchemaMappingGrpcUri=http://myhost:2682/ \
  -e RTA_InfluxUri=http://myhost:8086/ \
  -e RTA_MaxFrequency=100 \
  -p 2690:2690 -p 2691:2691 \
  mclarenapplied/rta-influxdatasvc
```

_Earlier versions:_
```
docker run --rm \
  -e RTA_DataSource=mydata \
  -e RTA_SchemaMappingGrpcUri=http://myhost:2682/ \
  -e RTA_InfluxUri=http://myhost:8086/ \
  -e RTA_InfluxHealthCheckPath=/ping \
  -e RTA_MaxFrequency=100 \
  -p 2690:2690 -p 2691:2691 \
  mclarenapplied/rta-influxdatasvc
```

### Command Line

```
rta-influxdatasvc --DataSource mydata --SchemaMappingGrpcUri "http://myhost:2682/" --InfluxUri "http://myhost:8086/" --MaxFrequency 100
```

## Ports

| Port | Protocol   | Usage                               |
|------|------------|-------------------------------------|
| 2690 | HTTP       | Expose to ATLAS via Gateway Service |
| 2691 | HTTPS      | Expose to ATLAS via Gateway Service |

There is no gRPC interface, and you cannot write data using this service.

## Monitoring

HTTP `GET /`
: Returns `200 OK` and reports the software version.
  In _Kubernetes_, use this for _liveness_ probes.

HTTP `GET /health`
: Returns `200 OK` if the service is up and both _InfluxDB_ and the **Schema Mapping Service** are reachable and healthy.  
  In _Kubernetes_, use this for _readiness_ probes.

HTTP `GET /metrics`
: [Prometheus](https://prometheus.io/) metrics, including the health check status.

## Configuration

The service must be configured with URIs to _InfluxDB_ and the **Schema Mapping Service**.

Options can be set using both environment variables and command line arguments, or by the provided `appsettings.config` JSON configuration file.

Environment variables are all prefixed with `RTA_`, and can be written in `ALLCAPS` or `MixedCase`.  
For example, `DataSource` is `RTA_DATASOURCE` or `RTA_DataSource`.

For Linux and on Kubernetes, also replace `:` with `__`.  
For example, `Category:Item` is `RTA_CATEGORY__ITEM`.

| Option                      | Value                                                                                                                                       | Required     | Default   |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|--------------|-----------|
| `DataSource`                | Namespace for lookups to the **Schema Mapping Service**.\ Should match the token used with the **Session Service** and **Gateway Service**. | yes          |           |
| `SchemaMappingGrpcUri`      | URI to the **Schema Mapping Service** gRPC interface &mdash; e.g. `http://localhost:2682/`                                                  | yes          |           |
| `InfluxUri`                 | URI to _InfluxDB_ &mdash; e.g. `http://localhost:8086/`                                                                                     | yes          |           |
| `InfluxHealthCheckPath`     | Path to use for health checks against _InfluxDB_. For versions prior than 1.8, use `/ping`.                                                 | no           | `/health` |
| `MaxFrequency`              | Approximate maximum frequency of data, for performance optimization.                                                                        | no           | `100`     |

### Authentication and Authorization

These options enable OAuth 2.0 support.

Bearer tokens are forwarded to the configured services.

| Option               | Value                       | Required             |
|----------------------|-----------------------------|----------------------|
| `EnableAuth`         | `true` or `false`           | no                   |
| `Auth:​Authority`     | OAuth2 authorization server | if `EnableAuth=​true` |
| `Auth:​Audience`      | OAuth2 audience             | if `EnableAuth=​true` |

### Schema Mapping Defaults

These options specify default Schema Mapping properties if not specified via the **Schema Mapping Service**.

| Option                                           | Value                                                                                                          | Required     | Default    |
|--------------------------------------------------|----------------------------------------------------------------------------------------------------------------|--------------|------------|
| `SchemaMappingDefaults:Dialect`                  | Query dialect to use for lookups. Currently only supports `influxql`, but will also support `flux` in future.  | no           | `influxql` |
| `SchemaMappingDefaults:​InfluxQL:​Database`        | InfluxQL [database](https://docs.influxdata.com/influxdb/v1.8/concepts/glossary/#database).                    | no           |            |
| `SchemaMappingDefaults:​InfluxQL:​RetentionPolicy` | InfluxQL [retention policy](https://docs.influxdata.com/influxdb/v1.8/concepts/glossary/#retention-policy-rp). | no           | `autogen`  |
| `SchemaMappingDefaults:​InfluxQL:Measurement`     | InfluxQL [measurement](https://docs.influxdata.com/influxdb/v1.8/concepts/glossary/#measurement).              | no           |            |
