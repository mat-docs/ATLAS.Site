# Troubleshooting

Common problems with verified causes and fixes. For configuration field details see the
[Configuration Reference](configuration-reference.md).

---

## Can't connect to the Kafka broker

**Symptoms:** Bridge Service starts but immediately logs a connection error; no data arrives
on any topic or partition.

**Diagnosis:** Check the `BrokerUrl` value in your config:

=== "Bundled with ADS"

    ```
    …/Documents/McLaren Electronic Systems/ATLAS9/BridgeService/BridgeServiceConfig.json
    ```

    ```json
    "StreamApiConfig": {
      "BrokerUrl": "localhost:9094"
    }
    ```

=== "Standalone / Container"

    ```
    Configs/AppConfig.json  (or the path passed with -c)
    ```

    ```json
    "StreamApiConfig": {
      "BrokerUrl": "localhost:9094"
    }
    ```

**Fixes:**

1. Confirm Kafka is running and listening on the address in `BrokerUrl`.
2. Check there is no firewall rule blocking the port from the Bridge Service host.
3. If running in Docker, `localhost` inside the container refers to the container itself —
   use the service name (`kafka`) or the host IP instead.
4. Check the log file for the exact error message (see [Log file locations](#log-file-locations)
   below).

---

## No data flowing — ADS (Bundled) mode

**Symptoms:** Bridge Service starts, Kafka is reachable, but no packets arrive.

**Fixes — work through in order:**

1. **"Enable remote data feed" is off.**
   In ADS go to **Tools → Options → Recording → General** and set
   **Enable remote data feed** to **True**.

   ![Enable remote data feed](../assets/enable_remote_data_feed.png)

2. **ADS was not restarted after enabling the setting.**
   Close ADS completely and reopen it. Bridge Service will restart in a new command prompt.

3. **No active session in ADS.**
   Bridge Service only publishes data during an active session. Start a session in ADS and
   check Kafka again.

4. **Wrong BrokerUrl.**
   Verify the `BrokerUrl` in `BridgeServiceConfig.json` points at your actual Kafka broker.

---

## No data flowing — Standalone mode

**Symptoms:** Host executable is running, Kafka is reachable, but nothing arrives.

**Fixes:**

1. **Data source not connected.**
   Check whether the ADS (or other data source) is sending its stream to the Bridge Service
   feed port. The default port is controlled by `FeedPort` in `BridgeConfig` (or `-p` on the
   command line). Confirm the source is configured to target the correct host and port.

2. **Wrong config file path.**
   If you use `-c`, double-check the path exists and the file is valid JSON. A missing or
   malformed config causes the host to exit immediately — check stdout/stderr output.

3. **EssentialsConfig paths are wrong.**
   If CFG or PGV directories are incorrect, Bridge Service cannot decode parameters and
   produces no output. See [Point at CFG/PGV/PUL files](configuration.md#point-at-cfg-pgv-and-pul-files-standalone-only).

---

## Confused about which config file to use

See [Which deployment do I have?](index.md#which-deployment-do-i-have) for the config file and
required sections per mode.

---

## Data is being dropped

**Symptoms:** Some data packets are missing; throughput is high; gaps appear in parameter
time-series.

**Cause:** When `ProcessFlow` is set to `DropOldest`, Bridge Service intentionally drops the
oldest queued packet when the processing buffer fills. This is expected behaviour under sustained
high-frequency load — it trades completeness for freshness.

**Fixes:**

1. **If dropping is acceptable:** no action required — `DropOldest` is working as designed.

2. **To stop dropping:** change `ProcessFlow` to `SequentialAll` in `BridgeConfig`:

    ```json title="BridgeConfig — no dropping" linenums="1"
    "BridgeConfig": {
      "ProcessFlow": "SequentialAll"
    }
    ```

    Note: under very high load `SequentialAll` will increase latency rather than drop data.

3. **To reduce dropping while keeping `DropOldest`:** raise the concurrency factors:

    ```json title="BridgeConfig — raise concurrency" linenums="1"
    "BridgeConfig": {
      "ProcessFlow": "DropOldest",
      "LiveConcurrencyFactor": 12,
      "OffloadConcurrencyFactor": 24
    }
    ```

    These fields exist only in standalone `AppConfig.json`.

!!! warning "Field names in 2.1.2 and earlier"
    On versions 2.1.2 or earlier, the concurrency fields were `NumberProcessingUnit` and
    `NumberWritingUnit`. If your config has those names, you are on an old version — update to
    2.1.3 and rename them to `LiveConcurrencyFactor` / `OffloadConcurrencyFactor`.

---

## Session stops too early or too late

**Symptoms:** Bridge Service closes the Kafka session before the ADS session has actually ended,
or keeps a session open for too long after data stops arriving.

**Cause:** `AdsTimeoutInSeconds` controls how long Bridge Service waits after the last received
data packet before it considers the session stopped. The default is **720 seconds** (12 minutes).

**Fix:** Adjust `AdsTimeoutInSeconds` in `BridgeConfig`:

```json title="BridgeConfig — shorter session timeout" linenums="1"
"BridgeConfig": {
  "AdsTimeoutInSeconds": 300
}
```

Reduce this value if sessions are being kept alive too long after data stops.
Increase it if sessions are being closed prematurely during brief gaps in telemetry.

This field applies to the standalone `AppConfig.json` only. In bundled ADS mode the session-stop
timing is governed by ADS, not by a Bridge config field.

---

## Log file locations { #log-file-locations }

=== "Bundled with ADS"

    Log files are written to:

    ```
    …/Documents/McLaren Electronic Systems/ATLAS9/log/BridgeLogYYYYMMDD.txt
    ```

    A new file is created each day. Check the file dated today for current errors.

=== "Standalone / Container"

    Log output goes to the console by default. To write to a file, either:

    - Pass `-l <path>` on the command line:

        ```bash
        ./MA.DataPlatforms.Bridge.Host -c AppConfig.json -l /logs/bridge.log
        ```

    - Set the `LOG_FILE_PATH` environment variable.

    - Configure a file sink in the `Serilog` section of `AppConfig.json` (see
      [Configure logging](configuration.md#configure-logging-standalone)).

---

## See also

- [Getting Started](getting-started.md) — setup steps for each mode.
- [Configuration Guide](configuration.md) — task-based config changes.
- [Configuration Reference](configuration-reference.md) — all fields with types and defaults.
