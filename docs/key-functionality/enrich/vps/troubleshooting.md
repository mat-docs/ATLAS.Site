
# Troubleshooting & FAQ

Common issues and their solutions when working with the Virtual Parameter Service.


## Common Issues

### VPS container starts but no sessions are detected

??? note "Checklist"

    1. **Is ADS running?** Ensure ADS is active and streaming live data.
    2. **Is the Bridge Service running?** Verify the Bridge Service container is healthy: `docker ps`.
    3. **Is the Bridge Service configured correctly?**
        - `Enable Bridge Service` must be `TRUE` in ADS (Tools > Options > General).
        - `Local Bridge Service` must be `FALSE`.
        - `BridgeServiceConfig.json` must have the correct `BrokerUrl` (your machine IP, not `localhost`).
    4. **Is the `DataSource` correct?** The `DataSource` in `AppConfig.json` must match the data source name in ADS.
    5. **Is Kafka reachable?** The `BrokerUrl` in `AppConfig.json` must point to a valid, running Kafka broker.


### Kafka is not initialised in time before the Bridge Service

This is a **known issue** when starting the full Docker Compose stack. The Bridge Service may start before Kafka is fully ready.

??? success "Solution"
    Restart the `bridge-service` and `virtual-parameter-service` containers manually:

    ```bash
    docker restart bridge-service
    docker restart virtual-parameter-service
    ```

    Alternatively, add health checks and `depends_on` conditions to your `docker-compose.yaml`.


### Prometheus target shows DOWN

??? note "Checklist"

    1. **Is `prometheus.yml` configured correctly?** The target must be your machine's IPv4 address, not `localhost`.
    2. **Is the VPS running and healthy?** Check `docker ps` for the container status.
    3. **Is port 10010 exposed?** Confirm the port mapping with `docker ps` or test with `curl http://YOUR_IP:10010/metrics`.
    4. **Firewall?** Ensure port `10010` is not blocked by a firewall rule.


### Metrics endpoint returns an error when running manually

The Prometheus HTTP listener requires **Administrator privileges** when running outside Docker.

??? success "Solution"
    Run `MA.DataPlatforms.VirtualParameterService.Host.exe` as Administrator.


### Virtual parameter definitions are failing to build

Check the `vps_virtual_parameter_definition_failed_counter` metric for the count of failures.

??? note "Possible causes"

    - **Missing source parameters** — The FDL expression references parameters that are not present in the session.
    - **Invalid FDL expressions** — The expression syntax is incorrect or unsupported.
    - **Dependency resolution failure** — A virtual parameter depends on another virtual that has not yet been defined.

    Check the service logs (set `MinimumLevel` to `Debug` in the Serilog config) for detailed error messages about which definitions failed and why.

### Incomplete virtual parameter definitions (gauge is non-zero)

The `vps_virtual_parameter_definition_incomplete_gauge` indicates virtual definitions waiting for their source dependencies to be defined.

??? note "Explanation"
    This is normal during session startup — virtual parameters that depend on other virtuals may be temporarily incomplete until all definitions are received. The gauge should return to `0` once all configuration packets have been processed.

    If it remains non-zero indefinitely, check that all required source parameter definitions are being published in the session's configuration packets.


### Log file is not being created

??? note "Checklist"

    1. **Does the Serilog config override the path?** The `Serilog` section in `AppConfig.json` takes precedence over `-l` arguments and `LOG_FILE_PATH` environment variables.
    2. **Is the path valid?** The log file must end in `.txt`. If an invalid extension is provided, the service reverts to the default path.
    3. **Does the directory exist?** The directory must exist — the service does not create intermediate directories.
    4. **Permissions?** The service process must have write access to the target directory.


## FAQ

### Can I run multiple VPS instances for different data sources?

Yes. Each VPS instance supports a single `DataSource`. To process multiple data sources, deploy separate instances with different `AppConfig.json` files, each specifying a different `DataSource` value. Ensure each instance uses a unique `StreamApiPort` and `METRIC_PORT`.

### Does the VPS process historical sessions?

No. The VPS only processes **live** sessions. Historical sessions and sessions of type `VirtualSession` are automatically filtered out to avoid reprocessing its own output.


### What happens if the VPS goes down during a live session?

The VPS does not persist state between restarts. If the service restarts, it will detect any active live sessions and begin processing them from that point forward. Data generated during the downtime will not be retroactively computed.

### Can I change the buffering window while the service is running?

No. Configuration is loaded at startup. To change `BufferingWindowLengthInMs` or `SlidingWindowPercentage`, update `AppConfig.json` and restart the service.

### What Kafka topics does the VPS use?

The VPS uses the Stream API to manage topic creation and data flow. Topics are created automatically based on the configured `StreamCreationStrategy`. You do not need to manually create Kafka topics.

### How do I verify that virtual data is being written correctly?

1. **Check metrics** — Ensure `vps_virtual_parameter_packet_info_packager_packaged_counter` is incrementing.
2. **Use Kafka UI** — Navigate to `http://localhost:8080` and inspect the topics for virtual session data.
