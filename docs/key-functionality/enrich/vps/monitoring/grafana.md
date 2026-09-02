# Grafana Dashboards

Grafana provides visual dashboards for monitoring the Virtual Parameter Service in real time. A pre-built dashboard JSON is included with the service.

## Setting Up Grafana

### 1. Connect Grafana to Prometheus

1. Open Grafana at `http://localhost:3000`.
2. Navigate to **Connections > Data sources > Add new data source**.
3. Select **Prometheus**.
4. Under **Connection**, enter:

    ```
    http://prometheus:9090
    ```

    !!! info
        Use the Docker service name `prometheus` (not `localhost`) since both Grafana and Prometheus run inside the same Docker network.

5. Click **Save & Test** to verify the connection.

### 2. Import the Dashboard

A pre-built dashboard is provided as `Virtual Parameter Service Dashboard.json` (included in `Run.zip`).

1. Navigate to **Dashboards > New > Import**.
2. Upload or paste the contents of `Virtual Parameter Service Dashboard.json`.
3. Select the **Prometheus** data source you configured in step 1.
4. Click **Import**.

The dashboard will appear under **Dashboards** in the left sidebar.

## Dashboard Panels

The provided `Virtual Parameter Service Dashboard.json` ships with two panels, both built from the session/data-source gauges:

| Panel type | Metrics plotted |
|---|---|
| **Time series** | `vps_running_gauge_of_data_sources`, `vps_running_gauge_of_connected_sessions` |
| **Stat** | `vps_running_gauge_of_data_sources` |

!!! note "Extend the dashboard yourself"
    This is a minimal starting point — it doesn't include panels for parameter definitions, packet processing, or sample throughput. Use the PromQL queries below to add your own panels for those.

## Useful PromQL Queries

Add custom panels or explore metrics using these queries:

### Active sessions per data source

```promql
vps_running_gauge_of_connected_sessions
```

### Virtual parameter build success rate

```promql
rate(vps_virtual_parameter_definition_built_counter[5m])
```

### Virtual parameter build failure rate

```promql
rate(vps_virtual_parameter_definition_failed_counter[5m])
```

### Packet dispatch rate (handled vs unhandled)

```promql
rate(vps_packet_dispatcher_counter[5m])
```

### Output samples packaged per second

```promql
rate(vps_virtual_parameter_packet_info_packager_samples_counter[5m])
```

## Quick Health Check

After setup, you should see a non-zero value for `vps_running_gauge_of_data_sources` on the dashboard. This confirms:

- The VPS is running and connected to Kafka.
- Prometheus is successfully scraping the VPS metrics endpoint.
- Grafana is successfully querying Prometheus.
