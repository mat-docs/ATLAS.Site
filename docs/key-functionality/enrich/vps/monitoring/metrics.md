# Metrics & Prometheus

The Virtual Parameter Service exposes operational metrics via a Prometheus-compatible HTTP endpoint, enabling real-time visibility into service health and throughput.

## Metrics Endpoint

| Property | Value |
|---|---|
| **URL** | `http://<HOST_IP>:<METRIC_PORT>/metrics` |
| **Default port** | `10010` |
| **Format** | Prometheus text exposition format |

The port is configurable via the `METRIC_PORT` environment variable (see [Environment Variables](../configuration/environment-variables.md)).


## Available Metrics

All VPS metrics are prefixed with `vps_`.

### Session & Data Source Gauges

| Metric | Type | Description |
|---|---|---|
| `vps_running_gauge_of_data_sources` | Gauge | Number of active data sources configured. |
| `vps_running_gauge_of_connected_sessions` | Gauge | Number of currently connected live sessions. |

### Packet Processing Counters

| Metric | Type | Description |
|---|---|---|
| `vps_packet_dispatcher_counter` | Counter | Number of packets received (see `action` label for handled/unhandled). |
| `vps_data_packet_handler_buffer_counter` | Counter | Number of packets processed through the configuration buffer. |

### Parameter Definition Metrics

| Metric | Type | Description |
|---|---|---|
| `vps_parameter_definition_counter` | Counter | Number of parameter definitions received (see `type` label: `parameter` or `virtual`). |
| `vps_virtual_parameter_definition_built_counter` | Counter | Number of virtual parameter definitions successfully compiled. |
| `vps_virtual_parameter_definition_failed_counter` | Counter | Number of virtual parameter definitions that failed to compile. |
| `vps_virtual_parameter_definition_incomplete_gauge` | Gauge | Number of virtual definitions currently pending (waiting for dependencies). |

### Configuration Packaging Counters

| Metric | Type | Description |
|---|---|---|
| `vps_virtual_configuration_packet_packager_counter` | Counter | Number of configuration packets packaged and sent. |
| `vps_virtual_configuration_parameter_packaged_counter` | Counter | Number of virtual parameters included in configuration packets. |

### Data Processing Counters

| Metric | Type | Description |
|---|---|---|
| `vps_support_library_subscribed_parameter_counter` | Counter | Number of parameters the service has subscribed to. |
| `vps_timestamp_data_buffer_counter` | Counter | Number of timestamp data objects received and buffered. |
| `vps_timestamp_data_buffer_consumer_counter` | Counter | Noteworthy events during timestamp data processing. |

### Output Packaging Counters

| Metric | Type | Description |
|---|---|---|
| `vps_virtual_parameter_packet_info_packager_counter` | Counter | Number of packet infos received for packaging. |
| `vps_virtual_parameter_packet_info_packager_samples_counter` | Counter | Number of individual samples in received packet infos. |
| `vps_virtual_parameter_packet_info_packager_packaged_counter` | Counter | Number of packages actually packaged and written. |

## Metric Labels

Metrics are enriched with labels to allow filtering and drill-down:

| Label | Description | Example Metrics |
|---|---|---|
| `data_source` | The configured data source name. | Most metrics |
| `session_key` | The session key for the active session. | Session-scoped metrics |
| `parameter_identifier` | The identifier of a specific parameter. | Definition and subscription metrics |
| `type` | Context-dependent type. E.g. `parameter` or `virtual` for definitions. | `vps_parameter_definition_counter` |
| `action` | Context-dependent action. E.g. `handled` or `unhandled`. | `vps_packet_dispatcher_counter` |
| `source_identifiers` | The source parameter identifiers that compose a virtual. | Build-related metrics |
| `config_identifier` | The configuration identifier. | Configuration metrics |


## Prometheus Configuration

The provided `prometheus.yml` configures Prometheus to scrape the VPS metrics endpoint:

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 1s
    static_configs:
      - targets: ['YOUR_MACHINE_IP:10010']
```

!!! warning "Replace the target"
    Update `YOUR_MACHINE_IP` with your machine's IPv4 address. Do not use `localhost` when Prometheus runs inside Docker.


## Verifying the Connection

1. Navigate to **Prometheus Targets**: `http://localhost:9000/targets`
2. Confirm the VPS target shows a status of **UP**.
3. Alternatively, browse the raw metrics directly: `http://YOUR_MACHINE_IP:10010/metrics`
4. Search for `vps_` prefixed metrics to confirm VPS data is being scraped.
