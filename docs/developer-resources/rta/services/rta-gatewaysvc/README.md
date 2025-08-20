
!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.
# RTA Gateway Service

This service is part of the RTA Toolkit Services suite.

It is a reverse proxy, and would typically be deployed in front of:

* **Session Service** &mdash; handling session management, browsing and filtering
* **Config Service** &mdash; handling configuration storage and retrieval
* **Data Service** &mdash; or storage-specific service, handling retrieval of data samples and events

This microservices-style deployment is very flexible, allowing you to independently scale components and add in your own implementations.
For example, if you want to use multiple data storage technologies, you can deploy multiple data services behind the **Gateway Service**.
      
As an alternative, the **Server** package provides most of this functionality in one convenient executable for development use.

The service exposes the outward-facing REST interface to _ATLAS_ users. There is no gRPC interface.

It is available as a binary for Windows and Linux, and as a Docker image.

## Usage

### Docker

```
docker run --rm \
  -e RTA_SessionServiceUri=http://myhost:2650/ \
  -e RTA_ConfigServiceUri=http://myhost:2660/ \
  -e RTA_DataServiceUris__mydata=http://myhost:2670/ \
  -p 80:80 -p 443:443 \
  mclarenapplied/rta-gatewaysvc
```

### Command Line

```
rta-gatewaysvc --SessionServiceUri "http://myhost:2650/" --ConfigServiceUri "http://myhost:2660/" --DataServiceUris:mydata "http://myhost:2670/"
```

## Ports

| Port | Protocol   | Usage                                      |
|------|------------|--------------------------------------------|
| 80   | HTTP       | Expose to ATLAS via a TLS-enabled ingress  |
| 443  | HTTPS      | Expose to ATLAS directly or via an ingress |

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

The service must be configured with URIs to the **Session Service**, **Config Service** and typically one or more data services.

The RTA Toolkit provides drop-in implementations, but you can substitute your own as long as it implements the service interface.

Options can be set using both environment variables and command line arguments, or by the provided `appsettings.config` JSON configuration file.

Environment variables are all prefixed with `RTA_`, and can be written in `ALLCAPS` or `MixedCase`.  
For example, `SessionServiceUri` is `RTA_SESSIONSERVICEURI` or `RTA_SessionServiceUri`.

For Linux and on _Kubernetes_, also replace `:` with `__`.  
For example, `Category:Item` is `RTA_CATEGORY__ITEM`.

| Option                      | Value                                                                                      | Required     |
|-----------------------------|--------------------------------------------------------------------------------------------|--------------|
| `SessionServiceUri`         | URI to **Session Service** or customer implementation                                      | yes          |      
| `ConfigServiceUri`          | URI to **Config Service** or customer implementation                                       | yes          |      
| `DataServiceUris:<source>`  | URIs to **Data Service** deployments or customer implementations, identified by `<source>` | zero or more |

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

Bearer tokens are forwarded to the configured services.

| Option               | Value                       | Required             |
|----------------------|-----------------------------|----------------------|
| `EnableAuth`         | `true` or `false`           | no                   |
| `Auth:Authority`     | OAuth2 authorization server | if `EnableAuth=​true` |
| `Auth:Audience`      | OAuth2 audience             | if `EnableAuth=​true` |
