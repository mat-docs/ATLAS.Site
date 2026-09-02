# Getting Started

This guide walks through deploying the Virtual Parameter Service using Docker (recommended) or running it manually.

## Prerequisites

Before deploying the Virtual Parameter Service, ensure the following dependencies are in place.

### Required Software

| Software | Minimum Version | Purpose |
|---|---|---|
| **ADS (ATLAS Data Server)**, running the [Bridge Service](../../../developer-resources/secu4/bridge_service/index.md) | `9.85.2.183` | The VPS's actual data source — Bridge Service publishes live telemetry to Kafka; ADS is what runs it |
| **Docker** | Latest stable | Container runtime for deploying the service stack |
| **Kafka** | Latest (via Confluent images) | Message broker for the Stream API |


### Bridge Service

The VPS doesn't talk to ADS directly — it consumes live telemetry from Kafka topics published by the **Bridge Service**, which runs alongside ADS. Set up and enable Bridge Service following its own [configuration guide](../../../developer-resources/secu4/bridge_service/index.md); several of its settings need to line up with the VPS's own configuration, or the VPS will be listening in the wrong place:

- **`DataSource`** — the VPS's `DataSource` setting (see [AppConfig Reference](configuration/appconfig-reference.md)) must match the DataSource name Bridge Service publishes under.
- **`BrokerUrl`** — the VPS's `StreamApiConfig.BrokerUrl` must point to the same Kafka broker Bridge Service is configured to publish to.
- **`StreamCreationStrategy`** — the VPS's `StreamApiConfig.StreamCreationStrategy` must match Bridge Service's (`1` = partition-based, `2` = topic-based), since it determines where in Kafka the data actually lands.
- **`PartitionMappings`** — only relevant when `StreamCreationStrategy` is `1` (partition-based); the VPS's `StreamApiConfig.PartitionMappings` must match Bridge Service's mapping so the VPS reads from the same partitions Bridge Service writes to. Not used for topic-based (`2`).

### Docker Access

The VPS Docker image is public, hosted on Docker Hub as [`atlasplatformdocker/virtual-parameter-service-host`](https://hub.docker.com/repository/docker/atlasplatformdocker/virtual-parameter-service-host/general). No special access is required — `docker login` is only needed to avoid Docker Hub's anonymous pull rate limits.

!!! note "Can't reach Docker Hub?"
    If your environment can't pull from Docker Hub at all (e.g. an offline/air-gapped machine), see [Offline Install](setup-guide.md#offline-install) below.

### Network Requirements

| Port | Service | Description |
|---|---|---|
| `9094` | Kafka | Broker listener for external clients |
| `10010` | VPS Metrics | Prometheus metrics endpoint |
| `13579` | Stream API | Default Stream API port (configurable) |

!!! tip
    All ports are configurable. The above are the conventional defaults if you set up this stack yourself, matching the `AppConfig.json`/image defaults documented elsewhere on this page.

## Docker Deployment (Recommended)

1. **Create a working directory** (e.g. `C:\dev\vps`) and an `AppConfig.json` inside it. See the [AppConfig Reference](configuration/appconfig-reference.md) for the full schema — at minimum, set:

    - `DataSource` to match the DataSource name Bridge Service publishes under.
    - `StreamApiConfig.BrokerUrl` to point to the Kafka broker Bridge Service publishes to (e.g. `YOUR_MACHINE_IP:9094` — use your machine's IPv4 address, not `localhost`, if Kafka runs in Docker).

2. **Pull and run the image**:

    ```bash
    docker run -d \
      --name virtual-parameter-service \
      -p 10010:10010 \
      -v C:\dev\vps\AppConfig.json:/config/AppConfig.json \
      atlasplatformdocker/virtual-parameter-service-host:latest \
      -c /config/AppConfig.json
    ```

    See [Docker Run Command Explained](#docker-run-command-explained) below for what each flag does, or [Docker Compose Environment Variables](#docker-compose-environment-variables) if you're running it from your own `docker-compose.yaml` alongside Kafka and Bridge Service.

3. **Verify** — check the container is running:

    ```bash
    docker ps
    ```


### Offline Install

If your environment can't reach Docker Hub at all (e.g. an offline/air-gapped machine), export the image on a machine that can reach Docker Hub, then transfer and load it on the offline machine:

```bash
# on a machine with Docker Hub access
docker pull atlasplatformdocker/virtual-parameter-service-host:latest
docker save atlasplatformdocker/virtual-parameter-service-host:latest -o vps-image.tar

# transfer vps-image.tar to the offline machine, then:
docker load --input vps-image.tar
```

Then run the container as in step 2 above.


### Docker Run Command Explained

```bash
docker run -d \
  --name virtual-parameter-service \
  -p 10010:10010 \
  -v C:\AppConfig.json:/config/AppConfig.json \
  atlasplatformdocker/virtual-parameter-service-host:latest \
  -c /config/AppConfig.json \
  -l /logs/vps-svc-log.txt
```

| Flag | Purpose |
|---|---|
| `-d` | Run in detached (background) mode |
| `--name` | Assign a container name for easier management |
| `-p 10010:10010` | Expose the Prometheus metrics port |
| `-v ...:/config/AppConfig.json` | Mount your local config file into the container |
| `-c /config/AppConfig.json` | Tell the service where to find its configuration |
| `-l /logs/vps-svc-log.txt` | Specify the log file path inside the container |


### Docker Compose Environment Variables

Instead of command-line arguments, you can use environment variables in `docker-compose.yaml`:

```yaml
virtual-parameter-service:
  image: atlasplatformdocker/virtual-parameter-service-host:latest
  ports:
    - "10010:10010"
  volumes:
    - ./virtual-parameter-service/AppConfig.json:/config/AppConfig.json
  environment:
    - CONFIG_FILE_PATH=/config/AppConfig.json
    - LOG_FILE_PATH=/logs/vps-svc-log.txt
```

See the [Environment Variables](configuration/environment-variables.md) reference for all supported variables.

## Manual Deployment

For running the service outside of Docker:

1. **Build or download** the `MA.DataPlatforms.VirtualParameterService.Host` binaries.

2. **Place `AppConfig.json`** in a `Configs` folder alongside the executable:

    ```
    MA.DataPlatforms.VirtualParameterService.Host.exe
    Configs/
      └── AppConfig.json
    ```

    Or specify a custom path at startup with `-c`:

    ```bash
    MA.DataPlatforms.VirtualParameterService.Host.exe -c C:\path\to\AppConfig.json
    ```

3. **Run the executable**:

    ```bash
    MA.DataPlatforms.VirtualParameterService.Host.exe
    ```

    !!! warning "Administrator privileges required"
        The Prometheus HTTP listener requires the application to run with elevated (Administrator) privileges.

4. **Optional: specify the log file path**:

    ```bash
    MA.DataPlatforms.VirtualParameterService.Host.exe -c C:\config\AppConfig.json -l C:\logs\vps.txt
    ```

    If no log path is specified, logs are written to:

    ```
    %ProgramData%\Mclaren_Applied_Ltd\VirtualParameterService\Logs\vps-svc-log.txt
    ```

## Verifying the Deployment

Once the service is running:

1. **Check the metrics endpoint** — Navigate to `http://YOUR_MACHINE_IP:10010/metrics` in a browser. You should see Prometheus-formatted metrics.

3. **Look for the data source gauge** — Search for `vps_running_gauge_of_data_sources` in the metrics output. Its value should match the number of data sources you configured.

4. **Optional: Prometheus and Grafana** — if you've set up your own Prometheus/Grafana instances against the VPS metrics endpoint, confirm the VPS target shows `UP` in Prometheus and query the metrics from Grafana. See the [Metrics & Prometheus](monitoring/metrics.md) and [Grafana Dashboards](monitoring/grafana.md) guides.
