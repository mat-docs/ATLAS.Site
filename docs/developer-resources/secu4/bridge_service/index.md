# Bridge Service

Bridge Service reads a raw quad stream from an ATLAS Data Server (ADS), decodes it to engineering
values, and republishes those values as Stream Protocol packets to Kafka via the Stream API.
Any data protected by RDA licensing is filtered out at this stage — downstream consumers only
receive parameters that the active team licence permits.

---

## Which deployment do I have?

There are two ways Bridge Service is deployed. Pick the one that matches your setup — the config
file, file location, and setup steps differ between them.

=== "Bundled with ADS (Windows)"

    Bridge Service is shipped as part of the ADS installer and starts automatically when ADS
    launches.

    | | |
    |---|---|
    | **Config file** | `BridgeServiceConfig.json` |
    | **Location** | `…/Documents/McLaren Electronic Systems/ATLAS9/BridgeService/` |
    | **Data source name** | Set in ADS → Setup → General → General Network Settings → **Name** |
    | **Enabled via** | ADS → Tools → Options → Recording → **Enable remote data feed** = True, then restart ADS |
    | **Logs** | `…/Documents/McLaren Electronic Systems/ATLAS9/log/BridgeLogYYYYMMDD.txt` |

    The bundled config only needs `StreamApiConfig` and `StreamSelectionConfig` — ADS supplies
    CFG, PGV, and PUL files automatically.

    → [Get set up (Bundled with ADS)](getting-started.md#bundled-with-ads)

=== "Standalone / Container (Linux or Windows)"

    Bridge Service runs as an independent .NET 8 console application, typically in Docker or as
    a Windows service.

    | | |
    |---|---|
    | **Config file** | `AppConfig.json` |
    | **Default location** | `Configs/AppConfig.json` next to the host executable |
    | **Override path** | Pass `-c <path>` on the command line, or set `CONFIG_FILE_PATH` |
    | **Log override** | Pass `-l <path>` on the command line, or set `LOG_FILE_PATH` |

    The standalone config requires all six sections including `EssentialsConfig` and `RdaConfig`
    so Bridge Service can locate CFG/PGV/PUL files itself.

    → [Get set up (Standalone)](getting-started.md#standalone--container)

---

## The 3 things you must configure

Whichever mode you use, these three settings drive everything else:

1. **Broker URL** — where your Kafka broker is listening (`BrokerUrl` in `StreamApiConfig`).
2. **Data source name** *(standalone only)* — the identifier Bridge Service uses when publishing
   sessions (`DataSource` in `BridgeConfig`). In bundled ADS mode you do **not** set this — it is
   inherited automatically from the ADS instance name.
3. **Stream strategy** — whether streams map to Kafka topics (strategy 2) or partitions
   (strategy 1) and how app groups map to stream names (`StreamCreationStrategy` in
   `StreamApiConfig`, and `StreamSelectionConfig`).

---

## Data timestamps

Bridge converts ECU timestamps to UNIX UTC — see
[Data timestamps](configuration-reference.md#data-timestamps).

---

## Next steps

| I want to… | Go to… |
|---|---|
| Install and run Bridge Service for the first time | [Getting Started](getting-started.md) |
| Understand every config field | [Configuration Reference](configuration-reference.md) |
| Tune or adjust an existing setup | [Configuration Guide](configuration.md) |
| Fix a problem | [Troubleshooting](troubleshooting.md) |
