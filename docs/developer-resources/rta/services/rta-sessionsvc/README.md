
!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.
# RTA Session Service

This service is part of the RTA Toolkit Services suite.

It manages a [PostgreSQL](https://www.postgresql.org/) database of _sessions_, which are data sets &mdash; like files &mdash; that can be opened in _McLaren ATLAS_.

It exposes a gRPC interface to define and manage sessions from your environment, and an outward-facing REST interface to be exposed to users via the **Gateway Service**.

This service is available as a binary for Windows and Linux, and as a Docker image.

## Usage

### Docker

```
docker run --rm \
  -e "RTA_PostgresConnectionString=Server=mydbhost;Port=5432;Database=postgres;User Id=postgres;Password=hunter2;" \
  -e RTA_PostgresSchema=rta_sessions \
  -p 2650:2650 -p 2651:2651 -p 2652:2652 \
  mclarenapplied/rta-sessionsvc
```

### Command Line

```
rta-sessionsvc --PostgresConnectionString "Server=mydbhost;Port=5432;Database=postgres;User Id=postgres;Password=hunter2" --PostgresSchema rta_sessions
```

## Setup

Unlike RTA Server (`rta-server`), this service will not automatically create or upgrade the database schema.
This ensures that any upgrade is applied in controlled circumstances, and with different credentials if desired.

To configure the database, launch the service with the `--InitStoreAndExit=true` command line argument in addition to the other arguments or environment variables.
The service will run and exit.

!!! tip
	This can also be accomplished from Docker by opening a shell on the container and running:

	`/app/rta-server --InitStoreAndExit=true`

	assuming that the other configuration is present in environment variables.

Restart any running services after applying the change.

## Ports

| Port | Protocol   | Usage                               |
|------|------------|-------------------------------------|
| 2650 | HTTP       | Expose to ATLAS via Gateway Service |
| 2651 | HTTPS      | Expose to ATLAS via Gateway Service |
| 2652 | gRPC       | Expose within local environment     |

## Monitoring

HTTP `GET /`
: Returns `200 OK` and reports the software version.
  In _Kubernetes_, use this for _liveness_ probes.

HTTP `GET /health`
: Returns `200 OK` if the service is up and _PostgreSQL_ is accessible.  
  In _Kubernetes_, use this for _readiness_ probes.

HTTP `GET /metrics`
: [Prometheus](https://prometheus.io/) metrics, including the health check status.

## Configuration

Options can be set using both environment variables and command line arguments, or by the provided `appsettings.config` JSON configuration file.

Environment variables are all prefixed with `RTA_`, and can be written in `ALLCAPS` or `MixedCase`.  
For example, `PostgresSchema` is `RTA_POSTGRESSCHEMA` or `RTA_PostgresSchema`.

For Linux and on _Kubernetes_, also replace `:` with `__`.  
For example, `Category:Item` is `RTA_CATEGORY__ITEM`.

| Option                      | Value                              | Required       | Default        |
|-----------------------------|------------------------------------|----------------|----------------|
| `PostgresConnectionString`  | Database connection string         | yes            |                |
| `PostgresSchema`            | Database schema name               | no             | `rta_sessions` |
| `PostgresConnectionTimeout` | Time (ms) to wait for a connection | no             | `60000`        |

### Init Store

`InitStoreAndExit=true` will cause the service to initialize PostgreSQL and exit immediately.
This enables the service to be used to setup or upgrade the environment.

| Option               | Value                       | Required             |
|----------------------|-----------------------------|----------------------|
| `InitStoreAndExit`   | `true` or `false`           | no                   |

See Setup notes, above.

### Authentication and Authorization

These options enable OAuth 2.0 support.
This service is intended to run within a private network, behind the **Gateway Service**, which will forward the Bearer token if present. 

| Option               | Value                       | Required             |
|----------------------|-----------------------------|----------------------|
| `EnableAuth`         | `true` or `false`           | no                   |
| `Auth:Authority`     | OAuth2 authorization server | if `EnableAuth=​true` |
| `Auth:Audience`      | OAuth2 audience             | if `EnableAuth=​true` |
