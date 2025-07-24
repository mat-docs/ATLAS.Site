# RTA Config Service

This service is part of the RTA Toolkit Services suite.

It provides a repository for _configuration_ describing telemetry parameters, channels, events, etc. 
These are downloaded by _McLaren ATLAS_ as part of loading a session.

It exposes a gRPC interface to define and manage sessions from your environment, and an outward-facing REST interface to be exposed to users via the **Gateway Service**.

This service is available as a binary for Windows and Linux, and as a Docker image.

## Usage

### Docker

_Storing configuration on the file system:_
```
docker run --rm \
  -v /path/to/store:/configs \
  -e RTA_Store=File \
  -e RTA_FilePath=/configs \
  -p 2660:2660 -p 2661:2661 -p 2662:2662 \
  mclarenapplied/rta-configsvc
```

_Storing configuration on AWS S3:_
```
docker run --rm \
  -e RTA_Store=Aws \
  -e RTA_AwsS3Bucket=my-config-bucket \
  -p 2660:2660 -p 2661:2661 -p 2662:2662 \
  mclarenapplied/rta-configsvc
```

### Command Line

_Storing configuration on the file system:_
```
rta-configsvc --Store File --FilePath /configs 
```

_Storing configuration on AWS S3:_
```
rta-configsvc --Store Aws --AwsS3Bucket my-config-bucket
```

## Ports

| Port | Protocol   | Usage                               |
|------|------------|-------------------------------------|
| 2660 | HTTP       | Expose to ATLAS via Gateway Service |
| 2661 | HTTPS      | Expose to ATLAS via Gateway Service |
| 2662 | gRPC       | Expose within local environment     |

## Monitoring

HTTP `GET /`
: Returns `200 OK` and reports the software version.
  In _Kubernetes_, use this for _liveness_ probes.

HTTP `GET /health`
: Returns `200 OK` if the service is up and the file system path or AWS S3 bucket is accessible.  
  In _Kubernetes_, use this for _readiness_ probes.

HTTP `GET /metrics`
: [Prometheus](https://prometheus.io/) metrics, including the health check status.

## Configuration

The service can be configured to store data either on the file system, or on AWS S3.

Options can be set using both environment variables and command line arguments, or by the provided `appsettings.config` JSON configuration file.

Environment variables are all prefixed with `RTA_`, and can be written in `ALLCAPS` or `MixedCase`.  
For example, `FilePath` is `RTA_FILEPATH` or `RTA_FilePath`.

For Linux and on _Kubernetes_, also replace `:` with `__`.  
For example, `Category:Item` is `RTA_CATEGORY__ITEM`.


| Option               | Value                       | Required        |
|----------------------|-----------------------------|-----------------|
| `Store`              | `File` or `Aws`             | yes             |             
| `FilePath`           | Path to config volume       | if `Store=File` |
| `AwsS3Bucket`        | S3 bucket name              | if `Store=Aws`  |

### Init Store

`InitStoreAndExit=true` will cause the service to initialize the store and exit immediately.
This enables the service to be used to setup or upgrade the environment.

| Option               | Value                       |Required              | Default |
|----------------------|-----------------------------|----------------------|---------|
| `InitStoreAndExit`   | `true` or `false`           | no                   | `false` |

### Authentication and Authorization

These options enable OAuth 2.0 support.
This service is intended to run within a private network, behind the **Gateway Service**, which will forward the Bearer token if present. 

| Option               | Value                       | Required             |
|----------------------|-----------------------------|----------------------|
| `EnableAuth`         | `true` or `false`           | no                   |
| `Auth:Authority`     | OAuth2 authorization server | if `EnableAuth=true` |
| `Auth:Audience`      | OAuth2 audience             | if `EnableAuth=true` |
