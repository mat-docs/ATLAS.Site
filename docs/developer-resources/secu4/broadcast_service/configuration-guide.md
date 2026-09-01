# Configuration Guide

Task-by-task guidance for the changes you're most likely to make to `AppConfig.json`. For the
full field-by-field list, defaults, and validation rules, see the
[Configuration Reference](configuration-reference.md).

## I want to add a downstream Bridge target

**Situation**: you want Broadcast Service to forward the feed on to another Bridge/RemoteDataFeed
endpoint — replicating bridge-to-bridge.

Add an entry to `Targets.BridgeConfigs`:

```json title="AppConfig.json" linenums="1"
{
  "BroadcastConfig": {
    "Targets": {
      "BridgeConfigs": [
        {
          "Name": "site-b-bridge",
          "Host": "site-b-bridge.internal",
          "Port": 9697
        }
      ]
    }
  }
}
```

`Host` is required — the target won't validate without one. `Port` defaults to `9697` if
omitted. Broadcast Service connects to this target at `http://{Host}:{Port}`.

**Result**: on connect, this target performs a licence handshake with the downstream and replays
any cached session-control history, then forwards live records over RemoteDataFeed. If the
target's queue fills (it's capped at `QueueCapacity`, default `100000`), Broadcast Service
blocks and waits rather than dropping records for a Bridge target — the target must catch up on
its own.

**When to use**: any time the downstream is itself a Bridge/RemoteDataFeed consumer, rather than
something reading directly from Kafka.

## I want to add a Kafka broker target

**Situation**: you want records written directly into a Kafka stream (via the Stream API), rather
than forwarded to another RemoteDataFeed endpoint.

Add an entry to `Targets.BrokerConfigs`:

```json title="AppConfig.json" linenums="1"
{
  "BroadcastConfig": {
    "Targets": {
      "BrokerConfigs": [
        {
          "Name": "kafka-primary",
          "BrokerUrl": "localhost:9094",
          "Domain": "",
          "Stream": "broadcast-live"
        }
      ]
    }
  }
}
```

`BrokerUrl` and `Stream` are both required. Every packet sent to this target goes to the single
`Stream` you name — there's no per-message stream routing. Internally, the stream is always
written using the Stream API's partition-based strategy, mapped to partition 1 (partition 0 is
reserved by the Stream API for session data); this isn't user-configurable.

**Result**: unlike a Bridge target, a broker target doesn't perform a licence handshake or replay
session-control history — Kafka already holds durable session state. If its queue fills (capped
at `QueueCapacity`, default `100000`), Broadcast Service drops the oldest queued records for that
target rather than blocking.

**When to use**: when the consumer reads via the Stream API / Kafka directly, instead of speaking
RemoteDataFeed.

## I want to run more than one target of each kind

**Situation**: fan-out replication — for example, two Bridge targets at different sites, or two
broker targets pointing at different streams.

Add multiple entries to `BridgeConfigs` and/or `BrokerConfigs`. Every target — bridge or broker,
mixed together — needs a unique effective name (case-insensitive); startup fails otherwise.

- For a **Bridge target**, the effective name is always `Name`. If you add two Bridge targets,
  give each a distinct `Name` explicitly — `Host`/`Port` aren't part of the effective name.
- For a **broker target**, the effective name is `Name` if you set one, otherwise it falls back
  to `BrokerUrl`. Two broker targets that share the same `BrokerUrl` (writing to different
  streams on the same broker) need distinct explicit `Name` values, or they'll collide.

```json title="AppConfig.json" linenums="1"
{
  "BroadcastConfig": {
    "Targets": {
      "BridgeConfigs": [
        { "Name": "site-a-bridge", "Host": "site-a.internal", "Port": 9697 },
        { "Name": "site-b-bridge", "Host": "site-b.internal", "Port": 9697 }
      ],
      "BrokerConfigs": [
        { "Name": "kafka-live", "BrokerUrl": "localhost:9094", "Stream": "live" },
        { "Name": "kafka-backup", "BrokerUrl": "localhost:9094", "Stream": "backup" }
      ]
    }
  }
}
```

**When to use**: whenever you need the same feed replicated to more than one place — each target
maintains its own replay cursor, so a slow or disconnected target never affects the others.

## I want to control whether a target receives offload (bulk historical) data

**Situation**: some downstreams should only see live telemetry, not the bulk historical data a
source sends during an offload.

Set `OffloadProcessing` on the target:

```json title="AppConfig.json" linenums="1"
{
  "BroadcastConfig": {
    "Targets": {
      "BridgeConfigs": [
        {
          "Name": "live-only-bridge",
          "Host": "site-c.internal",
          "Port": 9697,
          "OffloadProcessing": false
        }
      ]
    }
  }
}
```

`OffloadProcessing` defaults to `false` on every target. With it `false`, offload records are
not forwarded to that target — by design, not as a failure — though the target's replay cursor
still advances past them. Session-control records are always forwarded regardless of this
setting. Set it to `true` if that target should also receive the bulk historical data.

**When to use**: set to `true` for targets that need the full historical record (for example, an
archive), and leave `false` (the default) for targets that only care about live data.

## I want to tune WAL segment size or compaction behavior

**Situation**: you're seeing more disk usage on the WAL directory than expected, or want to
change how often compaction runs.

```json title="AppConfig.json" linenums="1"
{
  "BroadcastConfig": {
    "Wal": {
      "Directory": "./wal",
      "CompactionEnabled": true,
      "CompactionIntervalMs": 5000,
      "SegmentRollBytes": 10485760
    }
  }
}
```

- `SegmentRollBytes` (default `10485760`, i.e. 10 MiB, minimum `1024`) controls how large each
  WAL segment file grows before a new one is started.
- `CompactionEnabled` (default `true`) turns segment trimming on or off. If disabled, no
  segments are ever removed.
- `CompactionIntervalMs` (default `5000`, minimum `100`, only checked when compaction is
  enabled) controls how often compaction runs.

Compaction only removes a sealed segment once **every** target's replay cursor has passed it —
see [Disk usage growing unexpectedly](troubleshooting.md#disk-usage-growing-unexpectedly-on-the-wal-directory)
for what happens when one target lags behind. The full field list, including `FsyncOnFlush` and
`OffsetFlushIntervalMs`, is in the [Configuration Reference](configuration-reference.md).

**When to use**: increase `SegmentRollBytes` to reduce the number of segment files under
high-throughput feeds; tighten `CompactionIntervalMs` if you need disk space reclaimed sooner
after targets catch up.

## I want to override config with environment variables instead of editing AppConfig.json

**Situation**: you don't want a value (or don't want to redeploy a file) to change
`AppConfig.json` directly — for example, per-environment overrides in a deployment pipeline.

Broadcast Service loads `AppConfig.json` first, then applies matching environment variables on
top — environment variables win. Address nested keys with a double underscore (`__`) between
each segment:

```bash
BroadcastConfig__FeedPort=9697
BroadcastConfig__Wal__Directory=/data/wal
```

This is standard .NET configuration layering (`AddJsonFile` then `AddEnvironmentVariables`), so
it applies to any nested object in the config — not just the examples above.

!!! tip
    Environment variables are read once at startup. Restart the service after changing one.

**When to use**: containerized or pipeline-driven deployments where you want to keep
`AppConfig.json` generic and inject environment-specific values (like the WAL path or feed port)
at deploy time.
