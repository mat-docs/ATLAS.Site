# Broadcast Service

Broadcast Service gives your live telemetry feed highly-available replication to multiple
downstream consumers, so a downstream restart, network blip, or slow consumer never costs you
data — every downstream tracks its own place in the stream and catches up independently once it
reconnects.

It sits between an upstream source and one or more downstream consumers. Towards its upstream
source, it exposes the same RemoteDataFeed gRPC contract a Bridge/ADS source expects, so from the
source's point of view it looks like an ordinary downstream. Towards its own downstreams, it acts
as the upstream — replaying that same RemoteDataFeed contract, or writing directly into a Kafka
stream — so each downstream can consume, fall behind, and recover without affecting the others.

!!! note "Not the same as Bridge Service"
    Broadcast Service is a separate product from [the ADS-integrated Bridge Service](../bridge_service/index.md),
    which decodes ATLAS quads from an ADS into Stream API packets. Broadcast Service does not
    decode anything — it replicates an already-running RemoteDataFeed stream (which may originate
    from a Bridge Service, an ADS, or another Broadcast Service) to more places, with durable
    replay if a downstream falls behind. If you're looking for quad decoding, see the Bridge
    Service docs instead.

## Before you start

At minimum, every deployment needs:

- **An inbound feed port** — the port Broadcast Service listens on for the upstream
  RemoteDataFeed source (`FeedPort`).
- **At least one downstream target** — a Bridge target, a Kafka broker target, or both.
  Broadcast Service refuses to start if no targets are configured.
- **A write-ahead log (WAL) directory** — where incoming records are durably persisted so
  targets can replay them (`Wal.Directory`).
- **Enough disk for the WAL** — durability comes from disk. Plan capacity around your WAL
  segment size and how far behind your slowest target is allowed to fall before it's caught up
  again.

## At a glance

| | |
|---|---|
| **Default feed port** | `9697` |
| **Default metrics port** | `10010` |
| **Default WAL directory** | `./wal` |
| **Config file** | `AppConfig.json` (override the path with the `CONFIG_FILE_PATH` environment variable) |

## Two ways to run it

The same binary runs either way — there's no separate "standalone" build versus an "integrated"
one:

- **`dotnet run`** — run the host project (or published binaries) directly. It reads
  `Configs/AppConfig.json` next to the executable by default.
- **Docker** — the shipped `Dockerfile` exposes the feed port (9697) and metrics port (10010).
  Supply configuration via a mounted config file plus `CONFIG_FILE_PATH`, or via
  `BroadcastConfig__...` environment variables.

See [Getting Started](getting-started.md) for step-by-step instructions for both.

## Next steps

- [Getting Started](getting-started.md) — run your first instance and confirm it's forwarding data.
- [Configuration Guide](configuration-guide.md) — task-by-task guidance for adding targets,
  tuning the WAL, and overriding config with environment variables.
- [Configuration Reference](configuration-reference.md) — the full field-by-field reference for
  `AppConfig.json`.
- [Troubleshooting](troubleshooting.md) — diagnosing startup failures, unhealthy targets, and
  disk growth.
