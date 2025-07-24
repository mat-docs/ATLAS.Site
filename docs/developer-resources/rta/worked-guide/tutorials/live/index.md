# Live Streaming &mdash; Walkthrough

This tutorial demonstrates live streaming to ATLAS, using [InfluxDB](https://www.influxdata.com/products/influxdb/), and building on the architecture from [Tutorial 03](../influx/index.md).

At the end, you'll have ATLAS connected to a popular off-the-shelf timeseries database, showing live updates.

In this tutorial you:

* Update the [Influx Data Adapter demo](../influx/index.md) to add [Redis](https://redis.io/) and the RTA [Stream Service](../../../services/rta-streamsvc/README.md)
* Generate and ingest data into [InfluxDB](https://www.influxdata.com/products/influxdb/) in real-time, while also publishing live updates [Redis](https://redis.io/)
* Test the deployment with ATLAS

!!! tip

    These code samples are in C# for .NET 5.0, and use McLaren [NuGet packages](../../../downloads.md#nuget-packages) to keep things as simple as possible. 

    We recommend you follow this tutorial even if you are planning to do your integration in another language.  
    The concepts should translate very easily once you have a working example.

## Prerequisites

You'll want to complete the [Influx Data Adapter Tutorial](../influx/index.md) first.

This should get you setup with everything you need.

## Step 1: Stop your existing Docker stack

Hit ++ctrl+c++ to stop your Docker Compose stack from the [previous tutorial](../influx/index.md).

## Step 2: Edit the Docker Compose deployment

Make sure you're working from the deployment for the [Influx Tutorial](../influx/index.md#edit-the-docker-compose-deployment).

### Redis

Modify the `docker-compose.yaml` to add [Redis](https://hub.docker.com/_/redis) as an extra service:

```yaml hl_lines="2-6"
services:
    redis:
        image: redis:6.2
        restart: always
        ports:
        - "6379:6379"

    # ...
```

### Stream Service

Modify the `docker-compose.yaml` to add the [Stream Service](https://hub.docker.com/r/mclarenapplied/rta-streamsvc):

```yaml hl_lines="8-14"
services:
    redis:
        image: redis:6.2
        restart: always
        ports:
        - "6379:6379"

    rta-streamsvc:
        image: mclarenapplied/rta-streamsvc:latest
        restart: "always"
        ports:
        - "8180:80"
        environment:
        - RTA_RedisConnectionString=redis

    # ...
```

### Start the Stack

Start the services from a terminal in the folder where you saved the `docker-compose.yaml` file:

```bash
docker compose up
```

## Step 3: Check the Services

### HTTP

Using a web browser, make sure all these health endpoints are reporting `Healthy`:

| Service                                        | /health link                                                     |
|------------------------------------------------|------------------------------------------------------------------|
| [rta-gatewaysvc](http://localhost:8080/)       | [http://localhost:8080/health](http://localhost:8080/health)     |
| ==[rta-streamsvc](http://localhost:8180/)==    | ==[http://localhost:8180/health](http://localhost:8180/health)== |
| [rta-sessionsvc](http://localhost:2650/)       | [http://localhost:2650/health](http://localhost:2650/health)     |
| [rta-configsvc](http://localhost:2660/)        | [http://localhost:2660/health](http://localhost:2660/health)     |
| [rta-datasvc](http://localhost:2670/)          | [http://localhost:2670/health](http://localhost:2670/health)     |
| [rta-schemamappingsvc](http://localhost:2680/) | [http://localhost:2680/health](http://localhost:2680/health)     |
| [rta-influxdatasvc](http://localhost:2690/)    | [http://localhost:2690/health](http://localhost:2690/health)     |

If a service says it is `Unhealthy`, the console log output should say why.

### gRPC

The [Stream Service](../../../services/rta-streamsvc/README.md) does not introduce any new gRPC interfaces to check.

## Step 4: Run the Demo

Open the tutorial solution in your development environment (e.g. Visual Studio Code).

This time, you will be running `RTA.Examples.InfluxLive`.

From the terminal, navigate to this sub-directory, and then:

``` bash
dotnet run
```

If the service has been setup correctly, this will live-stream data into InfluxDB and Redis, where it can be served to ATLAS.

By default, the demo will create a series of five-minute sessions.

## Step 5: Setup ATLAS Live Connections

### Setup the live connection

Open the ATLAS Session Browser.

Right-click on **Sources** and select **Service Connections...**

Select the service connection you previously defined, and click **Properties** to open a dialog.

Fill in the  **Web Socket URI**: `ws://localhost:8180/`

Close the dialogs, and right-click **Sources** and select **Refresh**.

Un-tick and re-tick the _localhost_ source to make sure it picks up the new settings, and press the **Refresh** button on the right-hand-side of the dialog. You should see your existing sessions, and a live session at the top of the list.

??? notes "Troubleshooting"

    If you don't see a live session:

    * Double-check the **Web Socket URI** is correct
    * Open the URI in a web browser the the 'http://' scheme and make sure you are communicating with the [Stream Service](../../../services/rta-streamsvc/README.md)
    * Restart ATLAS and try again
    * Check the ATLAS log file (**Tools** &gt; **View Log Folder**), which may explain what the problem is

    If you _only_ see live data, with no back-fill to the start of the live session, this means that data is not loading from InfluxDB.

### Test the session

Double-click to load a live session.

Add a Waveform display, and press `P` to add parameters using the _Parameter Browser_.  
You should see waveform traces updating in real time.

If you unload and reload the session, you should see that all the data is still visible.

!!! info

    You may notice a small discontinuity where the data from the [Gateway Service](../../../services/rta-gatewaysvc/README.md) joins the data from the [Stream Service](../../../services/rta-streamsvc/README.md).

    This is a temporary limitation in the Stream Service implementation that will be fixed in a future release.  
    Redis should contain enough streamed data to seamlessly cover this gap.

    You may also notice that the time-range in the displays extends back beyond the start of the session.  
    This appears to be a time-zone issue, which will be looked at and fixed in a future development release.

## Next Steps

[Review the changes and the sample project](review.md) to understand how the live stream is fed from the demo process to ATLAS.
