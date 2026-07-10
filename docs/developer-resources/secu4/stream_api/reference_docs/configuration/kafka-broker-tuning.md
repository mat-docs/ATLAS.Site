# Kafka Broker Tuning

Optional JSON files let you tune the underlying Kafka producer and consumer the Stream API uses, without touching code. Most deployments never need this page — the built-in defaults below are sensible for typical telemetry workloads.

For Kafka security and credentials, see [Kafka Security](kafka-security.md).

## File Locations

Three optional files, resolved relative to the server's working directory:

| Setting | Default filename |
|---------|-------------------|
| `KafkaBrokerPublishingConfigFilePath` | `kafka-publisher-broker.json` |
| `KafkaBrokerConsumingConfigFilePath` | `kafka-consumer-broker.json` |
| `KafkaBrokerConfigWhitelistFilePath` | `kafka-broker-whitelist.json` |

Each is set via `StreamApiConfig` in `AppConfig.json` (or the equivalent constructor argument when embedding the server). If a file doesn't exist, its section of this page simply doesn't apply — the server falls back to the defaults below.

## File Format

Broker override files are a flat JSON object of raw **librdkafka property names** — dot-separated lowercase strings as documented by the [librdkafka configuration reference](https://github.com/confluentinc/librdkafka/blob/master/CONFIGURATION.md). Values are always strings (quote numbers).

```json title="kafka-publisher-broker.json" linenums="1"
{
  "compression.type": "lz4",
  "linger.ms": "50",
  "batch.size": "8388608"
}
```

Only the keys present in the file override the built-in default; everything else keeps the Stream API default (and ultimately the Confluent/librdkafka default where the Stream API has no opinion).

## Stream API Defaults

### Publisher

| librdkafka key | Default |
|---------------|---------|
| `compression.type` | `zstd` |
| `linger.ms` | `20` |
| `batch.size` | `4194304` |
| `queue.buffering.max.messages` | `2000000` |
| `queue.buffering.max.kbytes` | `2097152` |
| `message.max.bytes` | `4194304` |
| `message.timeout.ms` | `600000` |
| `acks` | `1` |
| `max.in.flight.requests.per.connection` | `1000000` |
| `enable.idempotence` | `false` |

### Consumer

| librdkafka key | Default |
|---------------|---------|
| `session.timeout.ms` | `45000` (Confluent default is `30000`) |

All other consumer settings use the Confluent/librdkafka default unless set in the override file.

!!! warning "Delivery-semantics keys — override with care"
    `acks`, `enable.idempotence`, and `max.in.flight.requests.per.connection` can be changed via the override file, but they're not independently validated at startup. Changing one without the others can produce an invalid or contradictory producer configuration (for example, `acks=all` combined with `enable.idempotence=false` is a common misconfiguration). Change these only if you understand the interaction between them.

## Always-Excluded Keys

A small set of keys are always taken from Stream API's own routing configuration, never from the override file, regardless of what the file contains:

| File | Excluded key | Reason |
|------|-------------|--------|
| Publisher | `bootstrap.servers` | Always from `BrokerUrl` |
| Consumer | `bootstrap.servers` | Always from `BrokerUrl` |
| Consumer | `group.id` | Always managed internally |
| Consumer | `auto.offset.reset` | Set by the consuming code |

Any other key present in the file is applied, subject to the whitelist below.

## Whitelist File

The whitelist file (`kafka-broker-whitelist.json` by default) is an optional second gate that controls which of the remaining keys in a broker override file are actually applied.

### File Structure

```json title="kafka-broker-whitelist.json" linenums="1"
{
  "Publish": [
    { "Pattern": "linger.ms",        "Allow": true  },
    { "Pattern": "compression.type", "Allow": true  },
    { "Pattern": "*",                "Allow": false }
  ],
  "Consume": [
    { "Pattern": "session.timeout.ms", "Allow": true },
    { "Pattern": "*",                  "Allow": false }
  ]
}
```

- `Publish` rules gate the publisher broker override file; `Consume` rules gate the consumer broker override file.
- Rules are evaluated **in order — first match wins**.
- `Pattern` supports `*` (any sequence of characters) and `?` (single character), matched case-insensitively.

!!! warning "Unmatched keys are denied once a section has rules"
    - If the whitelist file doesn't exist, **no filtering is applied** — every key in the override file takes effect (subject only to the always-excluded keys above). This is the default, and is identical to the behavior before whitelisting existed.
    - If the whitelist file exists and a section (`Publish` or `Consume`) has an **empty** rule list, that section is also unrestricted.
    - If a section has **one or more rules**, any key that matches none of them is **denied** — you need an explicit catch-all (`{ "Pattern": "*", "Allow": true }`) if you want everything else to pass through.

### Explicit allow-all

To make the open-by-default behavior explicit without restricting anything:

```json title="kafka-broker-whitelist.json" linenums="1"
{
  "Publish": [
    { "Pattern": "*", "Allow": true }
  ],
  "Consume": [
    { "Pattern": "*", "Allow": true }
  ]
}
```

### Strict whitelist example

Allow only a handful of throughput-related keys; deny everything else:

```json title="kafka-broker-whitelist.json" linenums="1"
{
  "Publish": [
    { "Pattern": "linger.ms",                    "Allow": true },
    { "Pattern": "batch.size",                   "Allow": true },
    { "Pattern": "compression.type",              "Allow": true },
    { "Pattern": "queue.buffering.max.messages", "Allow": true },
    { "Pattern": "queue.buffering.max.kbytes",   "Allow": true },
    { "Pattern": "*",                            "Allow": false }
  ],
  "Consume": [
    { "Pattern": "fetch.min.bytes",   "Allow": true },
    { "Pattern": "fetch.wait.max.ms", "Allow": true },
    { "Pattern": "*",                 "Allow": false }
  ]
}
```

!!! note "Docker image ships a strict default"
    The `streaming-proto-server-host` container image bundles a `kafka-broker-whitelist.json` at its default location, and it is a **strict** list (only `compression.type`, `linger.ms`, `batch.size`, `queue.buffering.max.messages`, `queue.buffering.max.kbytes`, `message.max.bytes`, `message.timeout.ms` on publish, and `session.timeout.ms` on consume — everything else denied). If you deploy the image as-is and drop in your own broker override file, keys outside that list are silently ignored unless you replace or extend the whitelist file.

## Tuning Guidance

- **Throughput vs latency** — raise `fetch.min.bytes` together with `fetch.wait.max.ms` to let the broker batch more data per fetch; improves consumer throughput at the cost of latency. Lower both for latency-sensitive reads.
- **Producer batching** — `linger.ms` (how long the producer waits before sending a batch) and `batch.size` (max bytes per batch) work together; larger values improve throughput, smaller values reduce end-to-end latency.
- **Compression** — defaults to `zstd` for best ratio. Use `lz4` for lower CPU cost at the expense of slightly larger messages, or `none` to disable.
- **Diagnostics** — `statistics.interval.ms` is not part of the Stream API defaults above; it's driven separately by the router metrics toggles (see [Server Configuration → Router Metrics](server-config.md#router-metrics)).

## See Also

- [Kafka Security](kafka-security.md) — Kafka security model, credentials, and deployment patterns
- [Server Configuration](server-config.md) — full list of non-security config fields
- [Docker Setup](docker-setup.md) — container deployment guide
- [librdkafka Configuration Reference](https://github.com/confluentinc/librdkafka/blob/master/CONFIGURATION.md) — authoritative list of all valid librdkafka keys
