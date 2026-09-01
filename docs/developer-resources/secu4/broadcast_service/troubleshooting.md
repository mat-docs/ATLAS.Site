# Troubleshooting

## Service fails to start with "Invalid broadcast configuration: ..."

**Symptom**: the process exits at startup with an error beginning `Invalid broadcast
configuration:`, followed by one or more problems joined together.

**Cause**: configuration validation runs before anything else starts, and rejects the whole
config if it finds a problem — an out-of-range `FeedPort`, zero targets configured, two targets
with the same effective name, a Bridge target missing `Host`/`Port`, a broker target missing
`BrokerUrl`/`Stream`, or a WAL setting below its minimum. See
[Validation](configuration-reference.md#validation) in the Configuration Reference for the
complete, exact list of rules and valid ranges.

**Fix**: read every problem listed in the error message (they're all reported together, joined
by `; `) and correct each one in `AppConfig.json` or your environment variable overrides against
the rules linked above.

## Metrics endpoint not reachable

**Symptom**: `http://localhost:<MetricPort>/metrics` doesn't respond, but the service otherwise
appears to be running and forwarding data.

**Cause**: `MetricPort` isn't validated at startup, and a failure to bind the metrics endpoint
(for example, the port is already in use) is caught and logged as a warning rather than crashing
the process. The service keeps running — and keeps replicating — without a working metrics
endpoint.

**Fix**: check the service's logs for the bind warning to see why the metrics port failed to
bind (commonly, something else is already listening on it), free up the port or change
`MetricPort`, and restart. This is not a sign the replication path itself is broken — check
`broadcast_target_up` and `broadcast_ingest_total` are what you actually care about once metrics
are reachable again.

## A target never goes healthy / `broadcast_target_up` stays 0

**Symptom**: the `broadcast_target_up` gauge for a given `target` label stays at `0` and never
flips to `1`.

**Cause**: the target's connection attempts are failing (unreachable host/port for a Bridge
target, or an unreachable broker for a broker target). Retries for a target are unbounded — a
target can be down indefinitely without affecting any other target — and back off exponentially:
each retry waits `min(InitialDelayMs * 2^attempt, MaxDelayMs)` plus a small random jitter (up to
`JitterMs`), so retries get progressively less frequent up to `MaxDelayMs` (default `30000` ms).

**Fix**: check the service's logs for connection/reconnection errors for that target's name, and
confirm the target endpoint (Bridge `Host`/`Port`, or broker `BrokerUrl`) is actually reachable
from where Broadcast Service is running. Once the target does connect, `broadcast_target_up`
flips to `1` and `broadcast_reconnect_total` records how many reconnect attempts it took.

## Offload (bulk historical) data isn't reaching a target

**Symptom**: live telemetry arrives at a target fine, but the bulk historical data sent during an
offload never shows up there.

**Cause**: this is expected, not a bug, if that target has `OffloadProcessing: false` (the
default). With `OffloadProcessing` set to `false`, offload records are deliberately not
forwarded to that target — its replay cursor still advances past them as if they'd been sent, so
it won't try to re-fetch them later. Session-control records are unaffected and are always
forwarded.

**Fix**: set `OffloadProcessing: true` on that target if it should also receive offload data. See
[I want to control whether a target receives offload data](configuration-guide.md#i-want-to-control-whether-a-target-receives-offload-bulk-historical-data)
in the Configuration Guide.

## Disk usage growing unexpectedly on the WAL directory

**Symptom**: the WAL directory keeps growing and doesn't shrink, even with compaction enabled.

**Cause**: compaction only removes a sealed WAL segment once **every** configured target's
replay cursor has advanced past it. A single stalled, disconnected, or very slow target holds
compaction back for every other target too — the WAL has to keep everything that target might
still need to replay.

**Fix**: check `broadcast_target_up` and `broadcast_cursor_gsn` per target to find which one is
lagging or down, and fix or remove that target (see [A target never goes healthy](#a-target-never-goes-healthy-broadcast_target_up-stays-0)
above). If a target is permanently gone and won't come back, removing it from
`Targets.BridgeConfigs`/`Targets.BrokerConfigs` lets compaction proceed for the ones that remain.
Confirm `Wal.CompactionEnabled` is `true` and `Wal.CompactionIntervalMs` is set to a reasonable
value — if `CompactionEnabled` is `false`, no segments are ever removed regardless of target
state.
