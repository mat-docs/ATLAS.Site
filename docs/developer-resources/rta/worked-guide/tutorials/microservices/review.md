# Microservices &mdash; Review

!!! info

    Complete the [Walkthrough](index.md) first.

Like the [Quick-Start Tutorial](../quick-start/review.md), this demo project is based around a data loading pattern, where data is format-shifted for use with ATLAS. But in this example, we've split the services up, and we're nearly ready to connect to existing stores using a [Data Service as an adapter](../../../introduction/data-services.md). 

## Docker Compose and Container Orchestration

Compared to the [Quick-Start Tutorial](../quick-start/review.md), you might be thinking:

> There are too many processes!  
> Instead of one `rta-server`, there are four separate services to do the same thing! 😠

In this architecture, each service is doing one small job.

This means each interface is simpler and the services are easier to replicate. This is particularly true for the config and data services, and is essentially an alternative to an in-process plugin architecture.

For example, you could replace the toolkit [Data Service](../../../services/rta-datasvc/README.md) with an in-house data service built in Java to read a custom file format. Or use both services together &mdash; maybe even presenting the data as a single session.

To make this manageable, you really need automation to configure, deploy, scale and restart the services if they fail or need upgrading. [Docker Compose](https://docs.docker.com/compose/) is one of the simpler ways to do this for a developer, but you'll want something more powerful in production. The difference is cluster management: a full [container orchestrator](https://www.redhat.com/en/topics/containers/what-is-container-orchestration) like [Kubernetes](https://kubernetes.io/) will handle all aspects of networking, scaling and fault management across a cluster of machines &mdash; though this comes with some complexity. If you are running on-premises, consider something simpler like [Docker Swarm](https://docs.docker.com/engine/swarm/) or [Nomad](https://www.nomadproject.io/).

For small deployments, you can still use Docker Compose or run the executables directly &mdash; for example, as a set of Windows or Linux services.

## Deploying the Toolkit Microservices

### Initializing the PostgreSQL database

This service is a simple database initializer:

```yaml hl_lines="5"
    rta-sessionsvc-init:
        image: mclarenapplied/rta-sessionsvc:latest
        environment:
        - RTA_PostgresConnectionString=Host=host.docker.internal; Username=postgres; Password=hunter2;
        entrypoint: ["/app/rta-sessionsvc", "--InitStoreAndExit=true"]
        restart: "no"
```

The `--InitStoreAndExit=true` instruction tells the service to initialize or upgrade the database and exit.

!!! warning

    This pattern is not quite robust enough for production.      
    Docker starts `rta-sessionsvc` immediately after `rta-sessionsvc-init`, so it is likely that the database will not be fully-initialized by the time this happens.

    In production, it would be better to have this happen as a scripted step that completes before rolling out the rest of the services.

In this example, it _should_ be unneccessary (but harmless) if the [Quick-Start Tutorial](../quick-start/index.md) has been completed, since [RTA Server](../../../services/rta-server/README.md) will initialize the database on startup by default, as a convenience for developers.

### Mounting Volumes

Mounting volumes ensures that the data is saved outside the container, so it's still there if you restart the stack. You should be able to see the files in the folders.

There are two parts to a volume mount:

```yaml
volumes:
- C:\rta\data:/data/rta-data
```

* The left-hand side is the path to a folder on the host machine. It must be an absolute path.
* The right-hand side is the path _inside_ the container.

In this example, we also specify the path inside the container explicitly:

```yaml
environment:
- RTA_Store=File
- RTA_FilePath=/data/rta-data
```

### Gateway Service URIs

The [Gateway Service](../../../services/rta-gatewaysvc/README.md) is configured to reference the other three services on the Docker network:

```yaml
environment:
- RTA_SessionServiceUri=http://rta-sessionsvc:2650
- RTA_ConfigServiceUri=http://rta-configsvc:2660
- RTA_DataServiceUris__rta-datasvc="http://rta-datasvc:2670"
```

Communication between the services is REST-based. Each service essentially implements a section of the overall [REST API](../../../api/index.md) sections[^1]. The [Gateway Service](../../../services/rta-gatewaysvc/README.md) does not make any gRPC calls.

The network name &mdash; e.g. `rta-sessionsvc` &mdash; is derived from the name of the service in the YAML file.

Visualize `RTA_DataServiceUris` as having this structure:

```json
{
    "RTA_DataServiceUris": {
        "rta-datasvc": "http://rta-datasvc:2670"
    }
}
```

The nested property `rta-datasvc` is part of the [Data Binding](../../sessions/data-bindings.md) key. The value is the URI for the service hosting the data.

!!! info

    `__` indicates the nested configuration: `parent__child`

    `:` can also be used on Windows only: `parent:child`

This token can have any format &mdash; it doesn't need to be a hostname.

To add another service, with source `mycustomsource`, located at `http://example.org:8030`:

```json hl_lines="4"
{
    "RTA_DataServiceUris": {
        "rta-datasvc": "http://rta-datasvc:2670",
        "mycustomsource": "http://example.org:8030"
    }
}
```

or in terms of environment variables:

```yaml hl_lines="5"
environment:
- RTA_SessionServiceUri=http://rta-sessionsvc:2650
- RTA_ConfigServiceUri=http://rta-configsvc:2660
- RTA_DataServiceUris__rta-datasvc="http://rta-datasvc:2670"
- RTA_DataServiceUris__mycustomsource="http://example.org:8030"
```

The [Gateway Service](../../../services/rta-gatewaysvc/README.md) will retrieve the [Data Bindings](../../sessions/data-bindings.md) from the [Session Service](../../../services/rta-sessionsvc/README.md) to determine which service to talk to.

### Data Bindings

[RTA Server](../../../services/rta-server/README.md) does not need [Data Bindings](../../sessions/data-bindings.md), because it handles reading and writing the data in a single process, and simply stores the data using the session identity.

This tutorial adds a simple binding to tell the [Gateway Service](../../../services/rta-gatewaysvc/README.md) where the data is, but bindings offer other capabilities, including:

* Selecting time-ranges to include in a session
* Mixing channels/parameters from different sources
* Applying a time-shift to the data

[^1]: This is a slight over-simplification. For example, the data service interface is similar, but uses different URI routing paths.
