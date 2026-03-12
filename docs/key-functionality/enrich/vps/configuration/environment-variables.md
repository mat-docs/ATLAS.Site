# Environment Variables

The Virtual Parameter Service supports configuration via environment variables, which are particularly useful when deploying with Docker or Docker Compose.

## Supported Variables

| Variable | Default | Description |
|---|---|---|
| `CONFIG_FILE_PATH` | `Configs/AppConfig.json` | Path to the `AppConfig.json` configuration file. |
| `LOG_FILE_PATH` | `%ProgramData%\Mclaren_Applied_Ltd\VirtualParameterService\Logs\vps-svc-log.txt` | Path to the log file. Must end in `.txt`. If a directory is provided (no `.txt` extension), the default log filename `vps-svc-log.txt` is appended. |
| `METRIC_PORT` | `10010` | The port on which the Prometheus metrics HTTP endpoint is exposed. |

## Precedence Order

Configuration values are resolved in the following order (highest priority first):

1. **`Serilog` section in `AppConfig.json`** — Takes precedence over all other log file settings.
2. **Command-line arguments** (`-c`, `-l`) — Override environment variables.
3. **Environment variables** — Override built-in defaults.
4. **Built-in defaults** — Used when nothing else is specified.

## Usage with Docker Compose

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
    - METRIC_PORT=10010
```


## Usage with Docker Run

```bash
docker run -d \
  --name virtual-parameter-service \
  -p 10010:10010 \
  -e CONFIG_FILE_PATH=/config/AppConfig.json \
  -e LOG_FILE_PATH=/logs/vps-svc-log.txt \
  -e METRIC_PORT=10010 \
  -v C:\path\to\AppConfig.json:/config/AppConfig.json \
  atlasplatformdocker/virtual-parameter-service-host-dev:latest
```

!!! tip "Environment variables vs command arguments"
    When using Docker Compose, environment variables are generally preferred over command arguments (`-c`, `-l`) because only one `command` directive can be specified in the compose file.
