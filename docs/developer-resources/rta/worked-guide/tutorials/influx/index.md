# InfluxDB Data Adapter &mdash; Walkthrough

This tutorial stores and serves data directly from [InfluxDB](https://www.influxdata.com/products/influxdb/), using the [microservices architecture](../../../introduction/architectures#microservices) introduced in [Tutorial 02](../microservices/index.md).

At the end, you'll have ATLAS connected to a popular off-the-shelf timeseries database.

In this tutorial you:

* Update the [Microservices demo](../microservices/index.md) to add [InfluxDB](https://www.influxdata.com/products/influxdb/) with the RTA [Influx Data Service](../../../services/rta-influxdatasvc/README.md) and supporting [Schema Mapping Service](../../../services/rta-schemamappingsvc/README.md)
* Ingest some sample data into [InfluxDB](https://www.influxdata.com/products/influxdb/)
* Call the other services using gRPC to describe sessions
* Test the deployment with ATLAS

!!! tip

    These code samples are in C# for .NET 5.0, and use McLaren [NuGet packages](../../../downloads/nuget.md) to keep things as simple as possible. 

    We recommend you follow this tutorial even if you are planning to do your integration in another language.  
    The concepts should translate very easily once you have a working example.

## Prerequisites

You'll want to complete the [Quick-Start](../quick-start/index.md) and [Microservices](../microservices/index.md) tutorials first.

This should get you setup with everything you need.

## Step 1: Stop your existing Docker stack

Hit ++ctrl+c++ to stop your Docker Compose stack from the [previous tutorial](../microservices/index.md).

## Step 2: Edit the Docker Compose deployment

!!! info

    If you already have InfluxDB running in your development environment, you could skip this step and use the existing deployment when you configure the RTA [Influx Data Service](../../../services/rta-influxdatasvc/README.md).

    Watch out for port clashes if you run them side-by-side. Remember that you can [remap ports in Docker](https://docs.docker.com/config/containers/container-networking/).

### InfluxDB

Modify the `docker-compose.yaml` to add [InfluxDB](https://hub.docker.com/_/influxdb) as an extra service:

=== "Windows"

    Create a directory for the `InfluxDB` volume.

    For example:

    ```powershell
    mkdir C:\rta\influxdb
    ```

    Add [InfluxDB](https://hub.docker.com/_/influxdb) with the volume mount:

    ```yaml hl_lines="2-12"
    services:
        influxdb:
            image: influxdb:1.8
            restart: always
            ports:
            - "8086:8086"
            volumes:
            - C:\rta\influxdb:/var/lib/influxdb
            environment:
                INFLUXDB_DB: "rtademo"
                INFLUXDB_ADMIN_USER: "admin"
                INFLUXDB_ADMIN_PASSWORD: "admin"

        # ...
    ```

=== "Linux/Mac"

    Create a directory for the `InfluxDB` volume.

    For example:

    ```bash
    mkdir -p /tmp/rta/influxdb
    ```

    Add [InfluxDB](https://hub.docker.com/_/influxdb) with the volume mount:

    ```yaml hl_lines="2-12"
    services:
        influxdb:
            image: influxdb:1.8
            restart: always
            ports:
            - "8086:8086"
            volumes:
            - /tmp/rta/influxdb:/var/lib/influxdb
            environment:
                INFLUXDB_DB: "rtademo"
                INFLUXDB_ADMIN_USER: "admin"
                INFLUXDB_ADMIN_PASSWORD: "admin"

        # ...
    ```

### Schema Mapping Service and Influx Data Service

Modify the `docker-compose.yaml` to add these two extra services:

=== "Windows"

    Create a directory to hold files for the [Schema Mapping Service (rta-schemamappingsvc)](../../../services/rta-schemamappingsvc/README.md).

    For example:

    ```powershell
    mkdir C:\rta\schema-mappings
    ```

    Add the [Schema Mapping Service (rta-schemamappingsvc)](https://hub.docker.com/r/mclarenapplied/rta-schemamappingsvc) and [Influx Data Service (rta-influxdatasvc)](https://hub.docker.com/r/mclarenapplied/rta-influxdatasvc) &mdash; which will be the data adapter for InfluxDB:

    ```yaml hl_lines="14-24 26-37"
    services:
        influxdb:
            image: influxdb:1.8
            restart: always
            ports:
            - "8086:8086"
            volumes:
            - C:\rta\influxdb:/var/lib/influxdb
            environment:
                INFLUXDB_DB: "rtademo"
                INFLUXDB_ADMIN_USER: "admin"
                INFLUXDB_ADMIN_PASSWORD: "admin"

        rta-schemamappingsvc:
            image: mclarenapplied/rta-schemamappingsvc:latest
            restart: always
            ports:
            - "2680:2680"
            - "2682:2682"
            volumes:
            - C:\rta\schema-mappings:/data/rta-schema-mappings
            environment:
            - RTA_Store=File
            - RTA_FilePath=/data/rta-schema-mappings

        rta-influxdatasvc:
            image: mclarenapplied/rta-influxdatasvc:latest
            restart: always
            depends_on:
            - rta-schemamappingsvc
            - influxdb
            ports:
            - "2690:2690"
            environment:
            - RTA_DataSource=rta-influxdatasvc
            - RTA_SchemaMappingGrpcUri=http://rta-schemamappingsvc:2682/
            - RTA_InfluxUri=http://influxdb:8086/

        # ...
    ```

=== "Linux/Mac"

    Create a directory to hold files for the [Schema Mapping Service (rta-schemamappingsvc)](../../../services/rta-schemamappingsvc/README.md).

    For example:

    ```bash
    mkdir -p /tmp/rta/schema-mappings
    ```

    Add the [Schema Mapping Service (rta-schemamappingsvc)](https://hub.docker.com/r/mclarenapplied/rta-schemamappingsvc) and [Influx Data Service (rta-influxdatasvc)](https://hub.docker.com/r/mclarenapplied/rta-influxdatasvc) &mdash; which will be the data adapter for InfluxDB:

    ```yaml hl_lines="14-24 26-37"
    services:
        influxdb:
            image: influxdb:1.8
            restart: always
            ports:
            - "8086:8086"
            volumes:
            - /tmp/rta/influxdb:/var/lib/influxdb
            environment:
                INFLUXDB_DB: "rtademo"
                INFLUXDB_ADMIN_USER: "admin"
                INFLUXDB_ADMIN_PASSWORD: "admin"

        rta-schemamappingsvc:
            image: mclarenapplied/rta-schemamappingsvc:latest
            restart: always
            ports:
            - "2680:2680"
            - "2682:2682"
            volumes:
            - /tmp/rta/schema-mappings:/data/rta-schema-mappings
            environment:
            - RTA_Store=File
            - RTA_FilePath=/data/rta-schema-mappings

        rta-influxdatasvc:
            image: mclarenapplied/rta-influxdatasvc:latest
            restart: always
            depends_on:
            - rta-schemamappingsvc
            - influxdb
            ports:
            - "2690:2690"
            environment:
            - RTA_DataSource=rta-influxdatasvc
            - RTA_SchemaMappingGrpcUri=http://rta-schemamappingsvc:2682/
            - RTA_InfluxUri=http://influxdb:8086/

        # ...
    ```

!!! note

    You should still have the other services:

    * `rta-sessionsvc`
    * `rta-configsvc`
    * `rta-datasvc` (optional for this tutorial)
    * `rta-gatewaysvc`

### Update Gateway Service

Modify the [Gateway Service](../../../services/rta-gatewaysvc/README.md) environment to include the URI for the [Influx Data Service](../../../services/rta-influxdatasvc/README.md).

This sets the data adapter up as a data source, which we will name `rta-influxdatasvc` to keep the naming consistent:

```yaml hl_lines="8 15"
rta-gatewaysvc:
    image: mclarenapplied/rta-gatewaysvc:latest
    restart: always
    depends_on:
    - rta-sessionsvc
    - rta-configsvc
    - rta-datasvc
    - rta-influxdatasvc
    ports:
    - "8080:80"
    environment:
    - RTA_SessionServiceUri=http://rta-sessionsvc:2650
    - RTA_ConfigServiceUri=http://rta-configsvc:2660
    - RTA_DataServiceUris__rta-datasvc=http://rta-datasvc:2670
    - RTA_DataServiceUris__rta-influxdatasvc=http://rta-influxdatasvc:2690
```

!!! note

    The [Gateway Service](../../../services/rta-gatewaysvc/README.md) is configured to talk to the data adapter service (RTA [Influx Data Service](../../../services/rta-influxdatasvc/README.md)), not directly to [InfluxDB](https://www.influxdata.com/products/influxdb/).

### Start the Stack

Start the services from a terminal in the folder where you saved the `docker-compose.yaml` file:

    docker compose up

## Step 3: Check the Services

### HTTP

Using a web browser, make sure all these health endpoints are reporting `Healthy`:

| Service                                        | /health link                                                 |
|------------------------------------------------|--------------------------------------------------------------|
| [rta-gatewaysvc](http://localhost:8080/)       | [http://localhost:8080/health](http://localhost:8080/health) |
| [rta-sessionsvc](http://localhost:2650/)       | [http://localhost:2650/health](http://localhost:2650/health) |
| [rta-configsvc](http://localhost:2660/)        | [http://localhost:2660/health](http://localhost:2660/health) |
| [rta-datasvc](http://localhost:2670/)          | [http://localhost:2670/health](http://localhost:2670/health) |
| [rta-schemamappingsvc](http://localhost:2680/) | [http://localhost:2680/health](http://localhost:2680/health) |
| [rta-influxdatasvc](http://localhost:2690/)    | [http://localhost:2690/health](http://localhost:2690/health) |

If a service says it is `Unhealthy`, the console log output should say why.

### gRPC

Using [grpcui](https://github.com/fullstorydev/grpcui/releases) from a terminal:

```
grpcui -plaintext localhost:2682
```

This will check that the [Schema Mapping Service gRPC API](../../../services/rta-schemamappingsvc/grpc.md) is available.

## Step 4: Run the Demo

Open the tutorial solution in your development environment (e.g. Visual Studio Code).

This time, you will be running `RTA.Examples.Influx`.

From the terminal, navigate to this sub-directory, and then:

``` bash
dotnet run
```

If the service has been setup correctly, this will load some sample data into InfluxDB and create an example session.

You can create more sessions by running it again.

## Step 5: Test the Session

Browse the sessions in ATLAS and identify the InfluxDB session.

!!! info

    If you followed the previous tutorials, you should have some other sessions.
    
    The [Data Service](../../../services/rta-datasvc/README.md) is still running, so these other sessions should still load and display data.

Load an InfluxDB session in ATLAS to make sure it's working.  
You should be able to browse and add parameters to displays, and see the data download.

As before, in the `docker compose` terminal, you will see activity as requests to the [Gateway Service (rta-gatewaysvc)](../../../services/rta-gatewaysvc/README.md) are proxied through to the other services.

## Next Steps

[Review the changes and the sample project](review.md) to understand how the services are working together.
