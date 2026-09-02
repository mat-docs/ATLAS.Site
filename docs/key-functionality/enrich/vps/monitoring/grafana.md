# Grafana Dashboards

Grafana provides visual dashboards for monitoring the Virtual Parameter Service in real time. The VPS doesn't ship a pre-built dashboard — build your own panels from the metrics below.

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

### 2. Build a Dashboard

Create a new dashboard (**Dashboards > New > New Dashboard**) and add panels against the Prometheus data source you just configured, using the metrics from [Metrics & Prometheus](metrics.md) and the example queries below.

## Useful PromQL Queries

Use these as a starting point for your own panels:

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

After setup, `vps_running_gauge_of_data_sources` should return a non-zero value in Grafana (or directly in Prometheus's own Graph view). This confirms:

- The VPS is running and connected to Kafka.
- Prometheus is successfully scraping the VPS metrics endpoint.
- Grafana is successfully querying Prometheus.
