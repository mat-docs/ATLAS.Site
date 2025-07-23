# Creating a Custom Data Adapter &mdash; Walkthrough

This tutorial demonstrates creating a Data Adapter service, to support a custom data source.

At the end, you'll have ATLAS connected to the custom data adapter, via the [Gateway Service](../../../services/rta-gatewaysvc/README.md).

In this tutorial you:

* Run an "indexing" script to create [Sessions](../../sessions/index.md) and [Configuration](../../configuration/index.md)
* Run a sample custom adapter service
* Configure the [Gateway Service](../../../services/rta-gatewaysvc/README.md) to use this service
* Test the sample data adapter with ATLAS

!!! tip

    These code samples are in C# for .NET 5.0, and use McLaren [NuGet packages](../../../downloads/nuget.md) to keep things as simple as possible. 

    We recommend you follow this tutorial even if you are planning to do your integration in another language.  
    The concepts should translate very easily once you have a working example.

## Prerequisites

You can do this tutorial directly after the [Influx Data Adapter](../influx/index.md) or [Live Streaming](../live/index.md) tutorials.

This will ensure that you have a Docker Compose project with all the required services.

## Step 1: Check your Docker Compose stack

Make sure Docker Compose is running from the previous tutorial.

Using a web browser, make sure all these health endpoints are reporting `Healthy`:

| Service                                        | /health link                                                     |
|------------------------------------------------|------------------------------------------------------------------|
| [rta-gatewaysvc](http://localhost:8080/)       | [http://localhost:8080/health](http://localhost:8080/health)     |
| [rta-sessionsvc](http://localhost:2650/)       | [http://localhost:2650/health](http://localhost:2650/health)     |
| [rta-configsvc](http://localhost:2660/)        | [http://localhost:2660/health](http://localhost:2660/health)     |
| [rta-schemamappingsvc](http://localhost:2680/) | [http://localhost:2680/health](http://localhost:2680/health)     |

If a service says it is `Unhealthy`, the console log output should say why.

## Step 2: Generate and Index Custom Data Files 

Open the tutorial solution in your development environment (e.g. Visual Studio Code).

This time, you will be running `RTA.Examples.DataAdapter.GeneratorIndexer`.

From the terminal, navigate to this sub-directory, and then:

``` bash
dotnet run
```

```
Generating data (8 files)
  000.sqlite
  001.sqlite
  002.sqlite
  003.sqlite
  004.sqlite
  005.sqlite
  006.sqlite
  007.sqlite

Indexing files
  000.sqlite
  001.sqlite
  002.sqlite
  003.sqlite
  004.sqlite
  005.sqlite
  006.sqlite
  007.sqlite
```

As the output suggests, this:

1. Generates sample [SQLite](https://www.sqlite.org/) files, containing:
    * 3x 100Hz samples (1 hour)
    * 3x 50Hz samples (1 hour)
    * a small amount of metadata

2. Indexes the sample data by:
    * publishing [Configuration](../../configuration/index.md)
    * publishing [Schema Mappings](../../data/schema-mappings.md)
    * publishing [Sessions](../../sessions/index.md)

The files are written to the working directory:

* When running from Visual Studio, this will be `RTA.Examples.DataAdapter.GeneratorIndexer\bin\Debug\net5.0\`
* When running from the terminal, this will be the current directory

!!! tip

    You may find it helpful to inspect the sample data using a [SQLite](https://www.sqlite.org/) database browser, such as:

    * [DB Browser for SQLite](https://sqlitebrowser.org/)
    * [SQLite Expert](http://www.sqliteexpert.com/)

The code structure is very similar to the [InfluxDB Data Adapter](../influx/review.md#sample-code-structure).

## Step 3: Run the Demo Data Adapter Service

Switch to running the `RTA.Examples.DataAdapter.Service`.

From the terminal, navigate to this sub-directory, and then:

``` bash
dotnet run -c Release
```

!!! tip

    Release mode can be significantly faster in some projects.

    When tuning a Data Adapter, make sure you are running with the Release configuration and without a debugger attached.

!!! note

    The service will run on port 5000 by default.

    If you need to change this port, you'll also need to modify the port in the next step.

## Step 4: Edit the Docker Compose deployment

### Stop your existing Docker stack

Hit ++ctrl+c++ to stop your Docker Compose stack.

### Update Gateway Service

Modify the [Gateway Service](../../../services/rta-gatewaysvc/README.md) environment to include the URI for the demo Data Adapter Service.

This sets the data adapter up as a data source on the host machine, named simply `sqlite` to match the data binding setup by the indexing process:

=== "Windows"

    ```yaml hl_lines="16"
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
        - RTA_DataServiceUris__sqlite=http://host.docker.internal:5000
    ```

=== "Linux/Mac"

    ```yaml hl_lines="16"
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
        - RTA_DataServiceUris__sqlite=http://localhost:5000
    ```

### Start the Stack

Start the services from a terminal in the folder where you saved the `docker-compose.yaml` file:

    docker compose up

## Step 5: Check the Services

### HTTP

Using a web browser, make sure all these health endpoints are reporting `Healthy`:

| Service                                        | /health link                                                     |
|------------------------------------------------|------------------------------------------------------------------|
| [rta-gatewaysvc](http://localhost:8080/)       | [http://localhost:8080/health](http://localhost:8080/health)     |
| [rta-sessionsvc](http://localhost:2650/)       | [http://localhost:2650/health](http://localhost:2650/health)     |
| [rta-configsvc](http://localhost:2660/)        | [http://localhost:2660/health](http://localhost:2660/health)     |
| [rta-schemamappingsvc](http://localhost:2680/) | [http://localhost:2680/health](http://localhost:2680/health)     |

If a service says it is `Unhealthy`, the console log output should say why.

!!! tip

    The [Gateway Service](http://localhost:8080/health) will be `Healthy` only if all the configured URIs are responding with `HTTP 200 OK`.

    This is a quick and easy sanity check that all your services &mdash; including the demo Data Adapter Service &mdash; are running and reachable.

## Step 6: Test the Sessions

Browse the sessions in ATLAS and identify the SQLite sessions.

Load a SQLite session in ATLAS to make sure it's working.  
You should be able to browse and add parameters to displays, and see the data download.

As before, in the `docker compose` terminal, you will see activity as requests to the [Gateway Service (rta-gatewaysvc)](../../../services/rta-gatewaysvc/README.md) are proxied through to the other services. You should also see activity in the demo Data Adapter Service terminal.

## Next Steps

[Review the sample projects](review.md) to understand how the Indexer and Data Adapter Service work.
