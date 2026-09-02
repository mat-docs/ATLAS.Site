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

!!! tip "Running the local Docker stack"
    If you're using the `docker-compose.yaml` stack below for local testing, Bridge Service runs in its own container — use your machine's IPv4 address (from `ipconfig`) for `BrokerUrl`, not `localhost` or `127.0.0.1`, since containers can't reach the host machine that way.

### Docker Access

The VPS Docker image is public, hosted on Docker Hub as [`atlasplatformdocker/virtual-parameter-service-host`](https://hub.docker.com/repository/docker/atlasplatformdocker/virtual-parameter-service-host/general). No special access is required — `docker login` is only needed to avoid Docker Hub's anonymous pull rate limits.

!!! note "Can't reach Docker Hub?"
    If your environment can't pull from Docker Hub at all (e.g. an offline/air-gapped machine), you can load the image from a `.tar` file provided as a build artifact. See [Offline Install](setup-guide.md#offline-install) below.

### Network Requirements

| Port | Service | Description |
|---|---|---|
| `9094` | Kafka | Broker listener for external clients |
| `10010` | VPS Metrics | Prometheus metrics endpoint |
| `13579` | Stream API | Default Stream API port (configurable) |
| `9000` | Prometheus | Prometheus web UI |
| `3000` | Grafana | Grafana web UI |
| `8080` | Kafka UI | Kafka management UI |

!!! tip
    All ports are configurable. The above are the defaults provided in the `docker-compose.yaml`.

## Docker Deployment (Recommended)

1. **Choose a working directory** (e.g. `C:\dev\vps`).

2. **Download the `Run.zip`** from the build pipeline artifacts and extract it into your working directory. This contains:

    - `docker-compose.yaml` — Full-stack orchestration
    - `virtual-parameter-service/AppConfig.json` — VPS configuration
    - `bridge-service/` — Bridge Service configuration
    - `prometheus/prometheus.yml` — Prometheus scrape config
    - `Virtual Parameter Service Dashboard.json` — Grafana dashboard
    - `reset-docker.bat` — Docker reset script

3. **Configure Prometheus** — Edit `prometheus/prometheus.yml` and replace the target with your machine's IPv4 address:

    ```yaml
    static_configs:
      - targets: ['YOUR_MACHINE_IP:10010']
    ```

    !!! warning
        Docker containers cannot reach `localhost` on the host machine. Use your IPv4 address from `ipconfig`.

4. **Configure the VPS** — Edit `virtual-parameter-service/AppConfig.json`:

    - Set `DataSource` to match the DataSource name Bridge Service publishes under.
    - Set `BrokerUrl` to point to your Kafka instance (e.g. `YOUR_MACHINE_IP:9094`).

    See the [AppConfig Reference](configuration/appconfig-reference.md) for the full schema.

5. **Start the stack** — Run the `reset-docker.bat` script:

    ```batch
    cd C:\dev\vps
    reset-docker.bat
    ```

    !!! danger "This script removes ALL Docker containers, networks, images and volumes"
        Only use this in a development environment. Review the script before running.

    Alternatively, start the stack directly:

    ```bash
    docker compose up -d
    ```

6. **Verify** — Check that all containers are running:

    ```bash
    docker ps
    ```

    You should see containers for: `zookeeper`, `kafka`, `kafka-ui`, `bridge-service`, `virtual-parameter-service`, `prometheus`, and `grafana`.


### Offline Install

If your environment can't reach Docker Hub at all (e.g. an offline/air-gapped machine):

1. Follow steps 1–4 above.

2. **Remove the `virtual-parameter-service` service** from `docker-compose.yaml`.

3. **Run the remaining stack**:

    ```bash
    docker compose up -d
    ```

4. **Load the VPS image from a `.tar` file** (available as a pipeline build artifact):

    ```bash
    docker load --input path-to-image.tar
    ```

5. **Run the VPS container manually**:

    ```bash
    docker run -d \
      --name virtual-parameter-service \
      -p 10010:10010 \
      -v C:\path\to\AppConfig.json:/config/AppConfig.json \
      atlasplatformdocker/virtual-parameter-service-host:TAG \
      -c /config/AppConfig.json \
      -l /logs/vps-svc-log.txt
    ```

    Replace `TAG` with the specific version from the `.tar` filename.


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

2. **Check Prometheus targets** — Navigate to `http://localhost:9000/targets` and confirm the VPS target is `UP`.

3. **Look for the data source gauge** — Search for `vps_running_gauge_of_data_sources` in the metrics output. Its value should match the number of data sources you configured.

4. **Check Grafana** — Navigate to `http://localhost:3000` and import the provided dashboard. See the [Grafana Dashboards](monitoring/grafana.md) guide for setup instructions.
