# Kafka Security (SASL / SSL)

Configure the Stream API to connect to a secured Kafka broker — SASL authentication, TLS encryption, or both. If your broker accepts unauthenticated plaintext connections, you can skip this page entirely: the server runs without security by default.

## Overview

Kafka credentials are described by a `Security` section on the Stream API configuration. The server resolves it from two sources, merged in this order (later wins):

| Order | Source | Best for |
|-------|--------|----------|
| 1 | `AppConfig.json` — `StreamApiConfig.Security` section | Shared baseline / dev defaults |
| 2 | Environment variables (`StreamApiConfig__Security__*`) | Docker, Kubernetes, CI |

!!! note "When embedding the server in-process"
    Code that hosts `Server` or `StreamingApiClientFactory` directly can instead supply a custom `IKafkaSecurityConfigurationProvider` and bypass both of the sources above.

When no credentials are set, the connection is unsecured — existing deployments are unaffected.

## When is security activated?

Security is applied when **any** of `SaslUsername`, `SslCaLocation`, or `SslCertificateLocation` is non-empty. All other fields are optional refinements. Once activated, unset fields fall back to:

| Field | Default when activated |
|-------|-------------------------|
| `Protocol` | `SaslPlaintext` |
| `Mechanism` | `Plain` |

## Configuration Fields

| Field | Description | Values |
|-------|-------------|--------|
| `SaslUsername` | SASL username — setting this activates security | any string |
| `SaslPassword` | SASL password | any string |
| `Protocol` | Kafka security protocol | `Plaintext`, `Ssl`, `SaslPlaintext`, `SaslSsl` |
| `Mechanism` | SASL mechanism | `Plain`, `ScramSha256`, `ScramSha512` |
| `SslCaLocation` | Path to CA certificate (PEM) for broker verification | file path |
| `SslCertificateLocation` | Path to client certificate (PEM) for mutual TLS | file path |
| `SslKeyLocation` | Path to client private key (PEM) for mutual TLS | file path |
| `SslKeyPassword` | Password for the client private key | any string |

All fields are optional strings — there is no required combination beyond the activation trigger above.

### AppConfig.json

```json title="AppConfig.json" linenums="1"
{
  "StreamApiConfig": {
    "BrokerUrl": "kafka-broker:9094",
    "Security": {
      "SaslUsername": "myuser",
      "SaslPassword": "mypassword",
      "Protocol": "SaslPlaintext",
      "Mechanism": "Plain"
    }
  }
}
```

!!! warning "Avoid committing secrets"
    Don't commit real credentials in `AppConfig.json`. Prefer environment variables for production and keep only non-sensitive defaults in the file.

### Environment Variables

Environment variables use the `StreamApiConfig__Security__` prefix and always override `AppConfig.json`.

| Variable | Description |
|----------|-------------|
| `StreamApiConfig__Security__SaslUsername` | SASL username — activates security when set |
| `StreamApiConfig__Security__SaslPassword` | SASL password |
| `StreamApiConfig__Security__Protocol` | Security protocol |
| `StreamApiConfig__Security__Mechanism` | SASL mechanism |
| `StreamApiConfig__Security__SslCaLocation` | CA certificate path |
| `StreamApiConfig__Security__SslCertificateLocation` | Client certificate path |
| `StreamApiConfig__Security__SslKeyLocation` | Client private key path |
| `StreamApiConfig__Security__SslKeyPassword` | Client private key password |

## Security Scenarios

### SASL/PLAIN

=== "JSON"
    ```json title="AppConfig.json (excerpt)" linenums="1"
    "Security": {
      "SaslUsername": "myuser",
      "SaslPassword": "mypassword",
      "Protocol": "SaslPlaintext",
      "Mechanism": "Plain"
    }
    ```
=== "Environment variables"
    ```bash
    StreamApiConfig__Security__SaslUsername=myuser
    StreamApiConfig__Security__SaslPassword=mypassword
    StreamApiConfig__Security__Protocol=SaslPlaintext
    StreamApiConfig__Security__Mechanism=Plain
    ```

### SASL/SCRAM-SHA-256

```json title="AppConfig.json (excerpt)" linenums="1"
"Security": {
  "SaslUsername": "myuser",
  "SaslPassword": "mypassword",
  "Protocol": "SaslPlaintext",
  "Mechanism": "ScramSha256"
}
```

### SSL — broker verification only (one-way TLS)

```json title="AppConfig.json (excerpt)" linenums="1"
"Security": {
  "Protocol": "Ssl",
  "SslCaLocation": "/certs/ca.pem"
}
```

### SSL — mutual TLS (client certificate)

```json title="AppConfig.json (excerpt)" linenums="1"
"Security": {
  "Protocol": "Ssl",
  "SslCaLocation": "/certs/ca.pem",
  "SslCertificateLocation": "/certs/client-cert.pem",
  "SslKeyLocation": "/certs/client-key.pem",
  "SslKeyPassword": "keypassword"
}
```

### SASL over TLS (SCRAM with SSL transport)

```json title="AppConfig.json (excerpt)" linenums="1"
"Security": {
  "Protocol": "SaslSsl",
  "Mechanism": "ScramSha512",
  "SaslUsername": "myuser",
  "SaslPassword": "mypassword",
  "SslCaLocation": "/certs/ca.pem"
}
```

## Docker

```bash
docker run -p 13579:13579 \
  -e StreamApiConfig__Security__SaslUsername=myuser \
  -e StreamApiConfig__Security__SaslPassword=mypassword \
  -e StreamApiConfig__Security__Protocol=SaslPlaintext \
  -e StreamApiConfig__Security__Mechanism=Plain \
  atlasplatformdocker/streaming-proto-server-host:latest
```

Or in `docker-compose.yml`:

```yaml title="docker-compose.yml" linenums="1"
services:
  stream-api:
    image: atlasplatformdocker/streaming-proto-server-host:latest
    ports:
      - "13579:13579"
    environment:
      StreamApiConfig__Security__SaslUsername: myuser
      StreamApiConfig__Security__SaslPassword: mypassword
      StreamApiConfig__Security__Protocol: SaslPlaintext
      StreamApiConfig__Security__Mechanism: Plain
```

## Troubleshooting

See [Troubleshooting → Kafka SASL/SSL handshake exception during group coordination](../reference/troubleshooting.md#issue-saslssl-handshake-exception-during-group-coordination) if metadata queries against a secured broker throw a handshake or group-coordination error.

## See Also

- [Server Configuration](server-config.md) — full list of non-security config fields
- [Kafka Broker Tuning](kafka-broker-tuning.md) — producer/consumer performance overrides
- [Docker Setup](docker-setup.md) — container deployment guide
