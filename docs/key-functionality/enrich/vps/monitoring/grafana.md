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

The provided dashboard includes panels for key operational metrics:

| Panel | What It Shows |
|---|---|
| **Data Sources** | Number of active data sources (`vps_running_gauge_of_data_sources`). |
| **Connected Sessions** | Number of live sessions being processed (`vps_running_gauge_of_connected_sessions`). |
| **Parameter Definitions** | Counters for total, built, failed, and incomplete virtual parameter definitions. |
| **Packet Processing** | Rates of packets received, dispatched, and packaged. |
| **Sample Throughput** | Volume of timestamp data received and virtual samples produced. |

## Useful PromQL Queries

You can create custom panels or explore metrics using these queries:

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
