# Kafka Configuration

The Support Library connects to Kafka through the embedded Stream API. From release 2.1.4 (July 2026), `StreamingApiConfiguration` lets you do two things that previously required changes on the broker side or custom builds:

- **Connect to a secured broker** — supply SASL and/or SSL credentials through the `Security` property.
- **Tune the Kafka producer and consumer** — point the library at JSON override files that adjust librdkafka settings without any code change.

Both are optional: with no security and no override files, the library behaves exactly as in earlier releases.

## Connecting to a secured broker

Credentials are carried by the `KafkaSecurityConfiguration` object on the `Security` property of `StreamingApiConfiguration`:

```csharp
namespace MA.Streaming.Abstraction;

public class KafkaSecurityConfiguration
{
    public string? SaslUsername { get; set; }
    public string? SaslPassword { get; set; }
    public string? Protocol { get; set; }               // "Plaintext" | "Ssl" | "SaslPlaintext" | "SaslSsl"
    public string? Mechanism { get; set; }              // "Plain" | "ScramSha256" | "ScramSha512"
    public string? SslCaLocation { get; set; }          // Path to CA certificate (PEM)
    public string? SslCertificateLocation { get; set; } // Path to client certificate (PEM)
    public string? SslKeyLocation { get; set; }         // Path to client private key (PEM)
    public string? SslKeyPassword { get; set; }         // Password for the private key
}
```

All fields are plain strings, so the object binds directly from `IConfiguration` (JSON files and environment variables) without custom converters. Protocol and mechanism values are parsed case-insensitively.

!!! info "When is security applied?"
    Security is applied only when at least one of `SaslUsername`, `SslCaLocation`, or `SslCertificateLocation` is set. Otherwise — including when `Security` is `null` — the library connects without security, so existing unsecured deployments are unaffected.

    When security is applied and `Protocol` or `Mechanism` is empty or unrecognised, they default to `SaslPlaintext` and `Plain` respectively.

### SASL username/password

=== "C#"

    ```csharp
    var config = new StreamingApiConfiguration(
        streamCreationStrategy: StreamCreationStrategy.TopicBased,
        brokerUrl: "kafka-broker:9094",
        partitionMappings: [],
        security: new KafkaSecurityConfiguration
        {
            Protocol = "SaslPlaintext",
            Mechanism = "Plain",          // or "ScramSha256" / "ScramSha512"
            SaslUsername = "myuser",
            SaslPassword = "mypassword",
        });
    ```

=== "JSON (IConfiguration)"

    ```json title="appsettings.json (Security section)" linenums="1"
    {
      "StreamApiConfig": {
        "BrokerUrl": "kafka-broker:9094",
        "Security": {
          "Protocol": "SaslPlaintext",
          "Mechanism": "Plain",
          "SaslUsername": "myuser",
          "SaslPassword": "mypassword"
        }
      }
    }
    ```

=== "Environment variables"

    ```
    StreamApiConfig__Security__Protocol=SaslPlaintext
    StreamApiConfig__Security__Mechanism=Plain
    StreamApiConfig__Security__SaslUsername=myuser
    StreamApiConfig__Security__SaslPassword=mypassword
    ```

### SSL (one-way TLS)

The broker presents a certificate that the client verifies against your CA certificate:

```csharp
security: new KafkaSecurityConfiguration
{
    Protocol = "Ssl",
    SslCaLocation = "/certs/ca.pem",
}
```

### Mutual TLS (client certificate)

```csharp
security: new KafkaSecurityConfiguration
{
    Protocol = "Ssl",
    SslCaLocation = "/certs/ca.pem",
    SslCertificateLocation = "/certs/client-cert.pem",
    SslKeyLocation = "/certs/client-key.pem",
    SslKeyPassword = "keypassword",
}
```

Combine SASL credentials with `Protocol = "SaslSsl"` and `SslCaLocation` for SASL over an encrypted connection.

### Python

The Python package mirrors the same shape with snake_case names:

```python
from ma_dataplatforms_streaming_support_library.contracts.shared.kafka_security_configuration import KafkaSecurityConfiguration
from ma_dataplatforms_streaming_support_library.contracts.shared.stream_api_configuration import StreamingApiConfiguration

config = StreamingApiConfiguration(
    broker_url="kafka-broker:9094",
    security=KafkaSecurityConfiguration(
        protocol="SaslPlaintext",
        mechanism="Plain",
        sasl_username="myuser",
        sasl_password="mypassword",
    ),
)
```

## Tuning the Kafka producer and consumer

Three optional parameters on `StreamingApiConfiguration` point at JSON files that override the built-in librdkafka settings:

| Constructor parameter | Property | Resolved default |
|---|---|---|
| `kafkaBrokerPublishingConfigFilePath` | `KafkaBrokerPublishingConfigFilePath` | `kafka-publisher-broker.json` |
| `kafkaBrokerConsumingConfigFilePath` | `KafkaBrokerConsumingConfigFilePath` | `kafka-consumer-broker.json` |
| `kafkaBrokerConfigWhitelistFilePath` | `KafkaBrokerConfigWhitelistFilePath` | `kafka-broker-whitelist.json` |

Paths may be absolute or relative to the host application's working directory. A value without a `json` extension gets `.json` appended automatically. If a file does not exist, the built-in Stream API defaults are used — so leaving everything at its default with no files present changes nothing.

### Override file format

Override files map **librdkafka dot-separated property names** to string values:

```json title="kafka-publisher-broker.json" linenums="1"
{
  "compression.type": "lz4",
  "linger.ms": "50",
  "batch.size": "8388608"
}
```

!!! warning "Use librdkafka key names"
    Keys must use the librdkafka dot format (`linger.ms`, `compression.type`) — the Confluent C# PascalCase names (`LingerMs`) are not recognised. See the [librdkafka configuration reference](https://github.com/confluentinc/librdkafka/blob/master/CONFIGURATION.md) for the full list of valid keys.

Some keys are managed by the library and ignored if present in an override file: `bootstrap.servers` is always taken from `BrokerUrl`, and the consumer `group.id` is assigned internally.

### Whitelist file

The whitelist file is an optional filter deciding which override-file keys actually take effect — useful when the override files are edited by people who should only touch an approved set of settings. It contains a rule list per direction; rules are evaluated first-match-wins and `*` is a wildcard:

```json title="kafka-broker-whitelist.json" linenums="1"
{
  "Publish": [
    { "Pattern": "compression.type", "Allow": true },
    { "Pattern": "linger.ms", "Allow": true },
    { "Pattern": "*", "Allow": false }
  ],
  "Consume": [
    { "Pattern": "session.timeout.ms", "Allow": true },
    { "Pattern": "*", "Allow": false }
  ]
}
```

When no whitelist file exists, every key from the override files is applied unfiltered.

### Python and FFI

The same three settings are available from the Python package (and the underlying FFI contract) as `kafka_broker_publishing_config_file_path`, `kafka_broker_consuming_config_file_path`, and `kafka_broker_config_whitelist_file_path`:

```python
config = StreamingApiConfiguration(
    broker_url="kafka-broker:9092",
    kafka_broker_publishing_config_file_path="kafka-publisher-broker.json",
    kafka_broker_consuming_config_file_path="kafka-consumer-broker.json",
    kafka_broker_config_whitelist_file_path="kafka-broker-whitelist.json",
)
```

An empty string (the Python default) means "use the default file path".

## See Also

- [API Reference](api-reference.md#streamingapiconfiguration) — full `StreamingApiConfiguration` signature
- [Overview](index.md)
- [librdkafka configuration reference](https://github.com/confluentinc/librdkafka/blob/master/CONFIGURATION.md)
