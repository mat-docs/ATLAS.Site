# Environment Variables

The Virtual Parameter Service supports configuration via environment variables, which are particularly useful when deploying with Docker or Docker Compose.

## Supported Variables

| Variable | Default | Description |
|---|---|---|
| `CONFIG_FILE_PATH` | `Configs/AppConfig.json` | Path to the `AppConfig.json` configuration file. |
| `LOG_FILE_PATH` | `%ProgramData%\Mclaren_Applied_Ltd\VirtualParameterService\Logs\vps-svc-log.txt` | Path to the log file. Must be a full file path ending in `.txt`. |
| `METRIC_PORT` | `10010` | The port on which the Prometheus metrics HTTP endpoint is exposed. |

!!! warning "LOG_FILE_PATH must include a filename ending in .txt"
    If the path doesn't end in `.txt`, the service does **not** treat it as a target directory and append `vps-svc-log.txt` inside it. Instead:

    - A path with no `.txt` extension but with a parent directory (e.g. `/logs/output` or `/logs`) has its last segment dropped, and `vps-svc-log.txt` is written into what's left of the path (e.g. `/logs/output` → `/logs/vps-svc-log.txt`; `/logs` → the filesystem root).
    - A path with no `.txt` extension and no parent directory at all (a bare name like `logs`, relative to the working directory) is treated as a subfolder, with `vps-svc-log.txt` appended inside it.
    - A path with some other extension (e.g. `.log`) is rejected outright — the service logs a console warning and reverts to the default path.

    Always set `LOG_FILE_PATH` to a full path that ends in a `.txt` filename, e.g. `/logs/vps-svc-log.txt`.

## Precedence Order

- **`CONFIG_FILE_PATH` / `LOG_FILE_PATH`:** the `-c` / `-l` command-line arguments set these environment variables for the process before they're read, so a command-line argument always wins over a manually-set environment variable, which in turn wins over the built-in default. If a `Serilog` section is present in `AppConfig.json`, it takes over logging configuration entirely and `LOG_FILE_PATH` (env var or `-l`) is ignored — see [Logging](logging.md).
- **`METRIC_PORT`:** unlike the two settings above, this also has an `AppConfig.json` equivalent — `VirtualParameterServiceConfig.MetricPort` (see [AppConfig Reference](appconfig-reference.md#virtualparameterserviceconfig)). If `METRIC_PORT` is set, it overrides the `MetricPort` value from `AppConfig.json`.

## Usage with Docker Compose

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
  atlasplatformdocker/virtual-parameter-service-host:latest
```

!!! tip "Environment variables vs command arguments"
    When using Docker Compose, environment variables are generally preferred over command arguments (`-c`, `-l`) because only one `command` directive can be specified in the compose file.
