# Broadcast Service Configuration Reference

Field-by-field reference for the `BroadcastConfig` section of `AppConfig.json`. For task-based
how-tos (adding a target, tuning WAL compaction, and so on), see the
[Configuration Guide](configuration-guide.md).

## Structure

```json title="AppConfig.json" linenums="1"
{
  "BroadcastConfig": {
    "FeedPort": 9697,
    "MetricPort": 10010,
    "Wal": { ... },
    "Targets": {
      "BridgeConfigs": [ ... ]
    }
  }
}
```

| Property | Type | Default | Notes |
|---|---|---|---|
| `FeedPort` | int | `9697` | Inbound `RemoteDataFeed` gRPC server port. Validated 1-65535. |
| `MetricPort` | int | `10010` | Prometheus metrics port. Not validated; a bind failure is caught and logged as a warning at startup — the service continues without metrics. |
| `Wal` | object | — | Write-ahead log settings. See [Wal](#wal). |
| `Targets` | object | — | Downstream Bridge targets. See [Targets](#targets). |

## Wal

`BroadcastConfig.Wal`.

| Property | Type | Default | Notes |
|---|---|---|---|
| `Directory` | string | `"./wal"` | Data WAL root. The control WAL is written to `{Directory}/control`; per-target cursor offsets are persisted to `{Directory}/offsets.json`. |
| `FsyncOnFlush` | bool | `true` | Applies to both the data and control WAL. |
| `CompactionEnabled` | bool | `true` | If `false`, no WAL segment trimming occurs. |
| `CompactionIntervalMs` | int | `5000` | Validated minimum `100`, only enforced when `CompactionEnabled` is `true`. |
| `SegmentRollBytes` | long | `10485760` (10 MiB) | Validated minimum `1024`. |
| `OffsetFlushIntervalMs` | int | `1000` | Validated minimum `50`. Controls how often per-target cursor offsets are flushed to disk. |

!!! warning
    `FsyncOnFlush` is mission-critical for durability. Do not disable it in production —
    doing so trades data-loss protection for throughput.

## Targets

`BroadcastConfig.Targets`.

| Property | Type | Default | Notes |
|---|---|---|---|
| `BridgeConfigs` | array of bridge target objects | `[]` | Downstream targets reached over `RemoteDataFeed` gRPC. See [Bridge targets](#bridge-targets). |

At least one entry must be configured in `BridgeConfigs`.

### Shared target fields

Every entry in `BridgeConfigs` accepts these fields in addition to its own type-specific fields
below:

| Property | Type | Default | Notes |
|---|---|---|---|
| `Name` | string | `""` | Display/tracking name for the target. |
| `QueueCapacity` | int | `100000` | Validated minimum `1`. |
| `OffloadProcessing` | bool | `false` | When `false`, offload (bulk historical) telemetry is dropped for this target and its cursor still advances; session control records are always forwarded regardless of this setting. |
| `Retry` | object | — | Reconnect/backoff behavior. See [Retry](#retry). |

The effective name used for uniqueness checks (see [Validation](#validation)) is `Name`.

### Bridge targets

Additional fields for entries in `Targets.BridgeConfigs`:

| Property | Type | Default | Notes |
|---|---|---|---|
| `Host` | string | `""` | Required — an empty host fails validation. |
| `Port` | int | `9697` | Validated 1-65535. |

The target address is built as `http://{Host}:{Port}`.

```json title="AppConfig.json" linenums="1"
{
  "Name": "DownstreamBridge01",
  "Host": "bridge01.internal",
  "Port": 9697,
  "QueueCapacity": 500000,
  "OffloadProcessing": false,
  "Retry": {
    "InitialDelayMs": 500,
    "MaxDelayMs": 30000,
    "JitterMs": 250
  }
}
```

## Retry

Each target's `Retry` object (`RetryConfig`).

| Property | Type | Default |
|---|---|---|
| `InitialDelayMs` | int | `500` |
| `MaxDelayMs` | int | `30000` |
| `JitterMs` | int | `250` |

Reconnect backoff is calculated as:

`delay = min(InitialDelayMs * 2^attempt, MaxDelayMs) + random(0, JitterMs)`

The attempt exponent is capped at 30. Retries are unbounded — a target can remain down
indefinitely without affecting the other targets. `InitialDelayMs` and `JitterMs` must each be
`>= 0`, and `MaxDelayMs` must be `>= InitialDelayMs`.

## Validation

Broadcast Service validates `BroadcastConfig` at startup. If any of the following rules are
violated, the service fails to start with an exception of the form
`Invalid broadcast configuration: <error 1>; <error 2>; ...` (all violated rules are joined by
`; ` into a single message):

- `FeedPort` must be between 1 and 65535.
- At least one target must be configured in `Targets.BridgeConfigs`.
- If `Wal.CompactionEnabled` is `true`, `Wal.CompactionIntervalMs` must be `>= 100`.
- `Wal.OffsetFlushIntervalMs` must be `>= 50` (checked regardless of `CompactionEnabled`).
- `Wal.SegmentRollBytes` must be `>= 1024`.
- Every target must have a non-empty `Name`, and names must be unique case-insensitively across
  all targets.
- Every target's `QueueCapacity` must be `>= 1`.
- Every target's `Host` must be non-empty, and `Port` must be between 1 and 65535.

## Environment variable overrides

Broadcast Service loads `AppConfig.json` first, then applies environment variables on top —
environment variables win over values in the JSON file. Address nested keys with a double
underscore (`__`) between each segment, for example:

```
BroadcastConfig__FeedPort=9697
BroadcastConfig__Wal__Directory=/data/wal
```
