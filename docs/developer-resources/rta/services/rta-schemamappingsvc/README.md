# RTA Schema Mapping Service

This service is part of the RTA Toolkit Services suite.

It provides a repository to describe a mapping between a source schema in your data store, and the RTA domain model.

RTA makes data requests using channel numbers using descriptions downloaded from the Config Service.
When integrating a new data source, these requests need to be mapped to something meaningful to the source schema, which likely represents data as named fields in files, tables or documents.
This service provides a simple, standard way to store that _Schema Mapping_ and perform lookups as required.

!!! info
    The _Config Service_ is similar, but only describes the RTA domain model.  
    The _Schema Mapping Service_ describes the relationship with the source schema, which is specific to the data storage technology.

It exposes a gRPC interface to define and query the _Schema Mappings_.
Aside from metrics and health checks, there is no outward-facing REST interface, and this service is strictly optional.

This service is available as a binary for Windows and Linux, and as a Docker image.

## Usage

### Docker

_Storing schema mappings on the file system:_
```
docker run --rm \
  -v /path/to/store:/data/rta-schema-mappings \
  -e RTA_Store=File \
  -e RTA_FilePath=/data/rta-schema-mappings \
  -p 2680:2680 -p 2682:2682 \
  mclarenapplied/rta-schemamappingsvc
```

_Storing schema mappings on AWS S3:_
```
docker run --rm \
  -e RTA_Store=Aws \
  -e RTA_AwsS3Bucket=my-schema-mappings-bucket \
  -p 2680:2680 -p 2682:2682 \
  mclarenapplied/rta-schemamappingsvc
```

### Command Line

_Storing schema mappings on the file system:_
```
rta-schemamappingsvc --Store File --FilePath /data/rta-schema-mappings
```

_Storing schema mappings on AWS S3:_
```
rta-schemamappingsvc --Store Aws --AwsS3Bucket my-schema-mappings-bucket
```

## Ports

| Port | Protocol   | Usage                                                              |
|------|------------|--------------------------------------------------------------------|
| 2680 | HTTP       | Expose within local environment for health checks and metrics only |
| 2682 | gRPC       | Expose within local environment                                    |

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

| Option               | Value                       | Required        |
|----------------------|-----------------------------|-----------------|
| `Store`              | `File` or `Aws`             | yes             |             
| `FilePath`           | Path to config volume       | if `Store=File` |
| `AwsS3Bucket`        | S3 bucket name              | if `Store=Aws`  |

### Init Store

`InitStoreAndExit=true` will cause the service to initialize the store and exit immediately.
This enables the service to be used to setup or upgrade the environment.

| Option               | Value                       |Required | Default |
|----------------------|-----------------------------|---------|---------|
| `InitStoreAndExit`   | `true` or `false`           | no      | `false` |
