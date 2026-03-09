# Getting Started

This guide walks through deploying the Virtual Parameter Service using Docker (recommended) or running it manually.

## Prerequisites

Before deploying the Virtual Parameter Service, ensure the following dependencies are in place.

### Required Software

| Software | Minimum Version | Purpose |
|---|---|---|
| **ADS (ATLAS Data Server)** | `9.85.2.183` | Source of live telemetry sessions |
| **Docker** | Latest stable | Container runtime for deploying the service stack |
| **Kafka** | Latest (via Confluent images) | Message broker for the Stream API |


### ADS Configuration

The Bridge Service must be enabled in ADS to bridge telemetry data into Kafka.

1. Open ADS and navigate to **Tools > Options > General**.
2. Set **Enable Bridge Service** to `TRUE`.
3. Set **Local Bridge Service** to `FALSE`.
4. Locate `BridgeServiceConfig.json` (by default in `Documents\McLaren Electronic Systems\ATLAS 9\BridgeService\`).
5. Set the `BrokerUrl` to your machine's IP address (not `localhost`).

!!! warning "Use your machine IP"
    The Bridge Service runs inside Docker — you must use your machine's IPv4 address (from `ipconfig`), not `localhost` or `127.0.0.1`.

### Docker Access

The VPS Docker image is hosted on Docker Hub under the [ATLAS Platform Docker](https://hub.docker.com/repository/docker/atlasplatformdocker/virtual-parameter-service-host-dev/general) organisation.

- Ensure you have **access** to the Docker Hub repository.
- Ensure you are **logged in** to Docker (`docker login`).

!!! note "No Docker Hub access?"
    If you do not have access to the Docker Hub repository, you can load the image from a `.tar` file provided as a build artifact. See the [Setup Guide](setup-guide.md#without-docker-hub-access) for details.

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

### With Docker Hub Access

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

    - Set `DataSource` to match your ADS data source.
    - Set `BrokerUrl` to point to your Kafka instance (e.g. `YOUR_MACHINE_IP:9094`).

    See the [AppConfig Reference](../configuration/appconfig-reference.md) for the full schema.

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


### Without Docker Hub Access

If you do not have access to the Docker Hub repository:

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
      atlasplatformdocker/virtual-parameter-service-host-dev:TAG \
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
  atlasplatformdocker/virtual-parameter-service-host-dev:0.0.1.82-dev \
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
  image: atlasplatformdocker/virtual-parameter-service-host-dev:latest
  ports:
    - "10010:10010"
  volumes:
    - ./virtual-parameter-service/AppConfig.json:/config/AppConfig.json
  environment:
    - CONFIG_FILE_PATH=/config/AppConfig.json
    - LOG_FILE_PATH=/logs/vps-svc-log.txt
```

See the [Environment Variables](../configuration/environment-variables.md) reference for all supported variables.

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

4. **Check Grafana** — Navigate to `http://localhost:3000` and import the provided dashboard. See the [Grafana Dashboards](../monitoring/grafana.md) guide for setup instructions.
