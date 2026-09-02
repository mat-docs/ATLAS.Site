# Configuration Guide

Task-by-task guidance for the changes you're most likely to make to `AppConfig.json`. For the
full field-by-field list, defaults, and validation rules, see the
[Configuration Reference](configuration-reference.md).

## I want to add a downstream Bridge target

**Situation**: you want Broadcast Service to forward the feed on to another Bridge
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
any cached session-control history, then forwards live records over gRPC. If the
target's queue fills (it's capped at `QueueCapacity`, default `100000`), Broadcast Service
blocks and waits rather than dropping records for a Bridge target — the target must catch up on
its own.

**When to use**: any time the downstream is itself a Bridge consumer.

## I want to run more than one target

**Situation**: fan-out replication — for example, two Bridge targets at different sites.

Add multiple entries to `BridgeConfigs`. Every target needs a unique `Name` (case-insensitive);
startup fails otherwise. `Host`/`Port` aren't part of the effective name, so give each target a
distinct `Name` explicitly even if they point at different hosts.

```json title="AppConfig.json" linenums="1"
{
  "BroadcastConfig": {
    "Targets": {
      "BridgeConfigs": [
        { "Name": "site-a-bridge", "Host": "site-a.internal", "Port": 9697 },
        { "Name": "site-b-bridge", "Host": "site-b.internal", "Port": 9697 }
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
