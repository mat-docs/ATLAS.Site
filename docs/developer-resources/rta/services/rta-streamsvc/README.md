
!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.
# RTA Stream Service

This service is part of the RTA Toolkit Services suite.

It provides a WebSocket for streaming session updates so that Motion Applied ATLAS can display live data.

It reads data from [Redis](https://redis.io/). There is no gRPC interface, and the outward-facing WebSocket interface should be exposed to users either directly or via the **Gateway Service**.

This service is available as a binary for Windows and Linux, and as a Docker image.

## Usage

### Docker

```
docker run --rm \
  -e RTA_RedisConnectionString=myredishost \
  -p 80:80 -p 443:443 \
  mclarenapplied/rta-streamsvc
```

### Command Line

```
rta-streamsvc --RedisConnectionString myredishost
```

## Ports

| Port | Protocol   | Usage                                                                   |
|------|------------|-------------------------------------------------------------------------|
| 80   | HTTP       | Expose to ATLAS via the Gateway Service or TLS-enabled ingress          |
| 443  | HTTPS      | Expose to ATLAS directly, or via Gateway Service or TLS-enabled ingress |

## Monitoring

HTTP `GET /`
: Returns `200 OK` and reports the software version.
  In _Kubernetes_, use this for _liveness_ probes.

HTTP `GET /health`
: Returns `200 OK` if the service is up and _Redis_ is accessible.  
  In _Kubernetes_, use this for _readiness_ probes.

HTTP `GET /metrics`
: [Prometheus](https://prometheus.io/) metrics, including the health check status.

## Configuration

Options can be set using both environment variables and command line arguments, or by the provided `appsettings.config` JSON configuration file.

Environment variables are all prefixed with `RTA_`, and can be written in `ALLCAPS` or `MixedCase`.  
For example, `Redis​ConnectionString` is `RTA_REDIS​CONNECTIONSTRING` or `RTA_Redis​ConnectionString`.

For Linux and on _Kubernetes_, also replace `:` with `__`.  
For example, `Category:Item` is `RTA_CATEGORY__ITEM`.

| Option                        | Value                                         | Required       | Default        |
|-------------------------------|-----------------------------------------------|----------------|----------------|
| `Redis​ConnectionString`       | Redis connection string                       | yes            |                |
| `RedisDb`                     | Redis database id                             | no             | `0`            |

### Trimmer

The _trimmer_ caps the length of _Redis_ streams to limit memory consumption.
The `TargetStreamLength` should be set according to the data rate, data source, Redis instance size, and how long it takes for data to be flushed to storage in the deployment.

| Option                       | Value                                         | Required       | Default        |
|------------------------------|-----------------------------------------------|----------------|----------------|
| `EnableTrimmer`              | `true` or `false`                             | no             | `true`         |
| `Trimmer:​TargetStreamLength` | Target number of entries in each Redis stream | no             | `10000`        |
| `Trimmer:​Interval`           | Interval (sec) between stream trimming        | no             | `30`           |
| `Trimmer:​ApproxLength`       | Approx trimming (`true` or `false`)           | no             | `false`        |

### Authentication and Authorization

These options enable OAuth 2.0 support.

| Option               | Value                       | Required             |
|----------------------|-----------------------------|----------------------|
| `EnableAuth`         | `true` or `false`           | no                   |
| `Auth:Authority`     | OAuth2 authorization server | if `EnableAuth=​true` |
| `Auth:Audience`      | OAuth2 audience             | if `EnableAuth=​true` |
