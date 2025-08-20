
!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.
# RTA Server

This service is part of the RTA Toolkit Services suite.

It bundles together functionality from the **Session Service**, **Config Service**, **Data Service** and **Stream Service** for development convenience.
We recommend against using this service in production except for small private deployments.

The service exposes internal gRPC interfaces to manage sessions, configuration and data, and an outward-facing REST interface to be exposed to _ATLAS_ users.

It is available as a binary for Windows and Linux, and as a Docker image.

## Usage

### Docker

_Storing configuration and data on the file system:_
```
docker run --rm \
  -v /path/to/store/configs:/data/rta-configs \
  -v /path/to/store/data:/data/rta-data \
  -e "RTA_PostgresConnectionString=Server=mydbhost;Port=5432;Database=postgres;User Id=postgres;Password=hunter2;" \
  -e RTA_PostgresSchema=rta_sessions \
  -e RTA_Store=File \
  -p 8080:8080 -p 8081:8081 -p 8082:8082 \
  mclarenapplied/rta-server
```

_Storing configuration and data on AWS:_
```
docker run --rm \
  -e "RTA_PostgresConnectionString=Server=mydbhost;Port=5432;Database=postgres;User Id=postgres;Password=hunter2;" \
  -e RTA_PostgresSchema=rta_sessions \
  -e RTA_Store=Aws \
  -e RTA_AwsS3ConfigsBucket=myconfigsbucket \
  -e RTA_AwsS3DataBucket=mydatabucket \
  -e RTA_AwsDynamoDataTable=mydatatable \
  -p 8080:8080 -p 8081:8081 -p 8082:8082 \
  mclarenapplied/rta-server
```

### Command Line

_Storing configuration and data on the file system:_
```
rta-server --PostgresConnectionString "Server=mydbhost;Port=5432;Database=postgres;User Id=postgres;Password=hunter2;" --PostgresSchema rta_sessions --Store File --FileConfigsPath /configs --FileDataPath /data
```

_Storing configuration and data on AWS:_
```
rta-server --PostgresConnectionString "Server=mydbhost;Port=5432;Database=postgres;User Id=postgres;Password=hunter2;" --PostgresSchema rta_sessions --Store Aws --AwsS3ConfigsBucket myconfigsbucket --AwsS3DataBucket mydatabucket --AwsDynamoDataTable mydatatable
```

## Ports

| Port | Protocol | Usage                                                                         |
|------|----------|-------------------------------------------------------------------------------|
| 8080 | HTTP     | Expose to ATLAS via a TLS-enabled ingress unless using for local development  |
| 8081 | HTTPS    | Expose to ATLAS directly or via an ingress unless using for local development |
| 8082 | gRPC     | Expose within local environment                                               |

## Monitoring

HTTP `GET /`
: Returns `200 OK` and reports the software version.
  In _Kubernetes_, use this for _liveness_ probes.

HTTP `GET /health`
: Returns `200 OK` if the service is up and all configured service URIs are accessible at their root path.  
  In _Kubernetes_, use this for _readiness_ probes.

HTTP `GET /metrics`
: [Prometheus](https://prometheus.io/) metrics, including the health check status.

## Configuration

Options can be set using both environment variables and command line arguments, or by the provided `appsettings.config` JSON configuration file.

Environment variables are all prefixed with `RTA_`, and can be written in `ALLCAPS` or `MixedCase`.  
For example, `PostgresSchema` is `RTA_POSTGRESSCHEMA` or `RTA_PostgresSchema`.

For Linux and on _Kubernetes_, also replace `:` with `__`.  
For example, `Category:Item` is `RTA_CATEGORY__ITEM`.

| Option                      | Value                                                                        | Required        | Default        |
|-----------------------------|------------------------------------------------------------------------------|-----------------|----------------|
| `Postgres​ConnectionString`  | Database connection string                                                   | yes             |                |
| `Postgres​Schema`            | Database schema name                                                         | no              | `rta_sessions` |
| `Postgres​Connection​Timeout` | Time (ms) to wait for a connection                                           | no              | `60000`        |
| `Store`                     | `File` or `Aws`                                                              | no              | `file`         |
| `FileConfigsPath`           | Path to config volume                                                        | if `Store=​File` |                |
| `FileDataPath`              | Path to data volume                                                          | if `Store=​File` |                |
| `AwsS3​ConfigsBucket`        | S3 bucket name for configs                                                   | if `Store=​Aws`  |                |
| `AwsS3​DataBucket`           | S3 bucket name for data                                                      | if `Store=​Aws`  |                |
| `Aws​DynamoDataTable`        | DynamoDB table name for data indexes                                         | if `Store=​Aws`  |                |
| `EnableDataWriter`          | Enables the service for data _write_ access via gRPC; `true` or `false`      | no              | `true`         |
| `EnableGrpc`                | Enables gRPC services to manage sessions, config and data; `true` or `false` | no              | `true`         |     

Memory Management options are also available. Refer to the **Data Service** README for details.

### Init Store

`InitStore=true` will cause the service to initialize the database and stores on startup.
This enables the service to be used to setup or upgrade the environment.

| Option      | Value             |Required | Default |
|-------------|-------------------|---------|---------|
| `InitStore` | `true` or `false` | no      | `true`  |

### Service Info

ATLAS will poll `/rta/v2/info` to check whether authentication is required, and retrieve a label and description to display to the user.

These are configurable.
This is particularly useful in an environment where users be using multiple services, perhaps hosted at different locations.

| Option                      | Value                      | Required | Default                     |
|-----------------------------|----------------------------|----------|-----------------------------|
| `ServiceInfo:​Label`         | Human-readable short label | no       | Text including the hostname |
| `ServiceInfo:Description`   | Human-readable description | no       |                             |

### Authentication and Authorization

These options enable OAuth 2.0 support.

| Option               | Value                       | Required             |
|----------------------|-----------------------------|----------------------|
| `EnableAuth`         | `true` or `false`           | no                   |
| `Auth:Authority`     | OAuth2 authorization server | if `EnableAuth=​true` |
| `Auth:Audience`      | OAuth2 audience             | if `EnableAuth=​true` |
