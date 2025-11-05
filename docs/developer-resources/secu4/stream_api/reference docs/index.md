# Motion Applied Stream API

<img src="../images/malogo.png" width="300" align="right" /><br><br><br>

The Stream API is a high-performance component that manages real-time data streaming to and from Kafka brokers as part of the Open Streaming Architecture. It provides a gRPC-based interface that enables any programming language to interact with live data streams efficiently.

!!! info "API Documentation"
    For complete technical documentation, visit the [Open Streaming Architecture Documentation](https://atlas.motionapplied.com/developer-resources/secu4/docs/).

## Overview

The Stream API enables real-time data streaming with the following key features:

- **High-performance streaming**: Optimized for low-latency, high-throughput data transmission
- **Multi-language support**: gRPC-based interface accessible from any programming language
- **Session management**: Create, manage, and monitor data sessions
- **Data format management**: Define and manage parameter and event schemas
- **Connection pooling**: Efficient connection management for multiple clients
- **Flexible deployment**: Self-hosted or Docker-based server deployment

### Key Benefits

- **Real-time processing**: Stream data with minimal latency
- **Scalability**: Handle thousands of concurrent connections
- **Reliability**: Built-in error handling and recovery mechanisms
- **Flexibility**: Support for both partition-based and topic-based routing strategies

## Architecture

### Core Components

The Stream API consists of five main services:

1. **[Session Management Service](services/session-management.md)**: Handles session lifecycle and state management
2. **[Connection Management Service](services/connection-management.md)**: Manages client connections to data streams
3. **[Packet Writer Service](services/packet-writer.md)**: Publishes data and info packets (single or batch)
4. **[Packet Reader Service](services/packet-reader.md)**: Reads all packets, essentials, or filtered data packets
5. **[Data Format Management Service](services/data-format-management.md)**: Manages parameter and event format definitions

### Deployment Models

=== "Local Self-Hosted"

    ```csharp
    // Embed the Stream API server directly in your application
    var streamConfiguration = new StreamingApiConfiguration(
        StreamCreationStrategy.TopicBased,
        "localhost:9092",
        partitionMappings,
        integrateDataFormatManagement: true,
        integrateSessionManagement: true,
        batchingResponses: false);

    StreamingApiClient.Initialise(streamConfiguration, cancellationTokenProvider, 
        brokerChecker, loggingProvider);
    ```

=== "Remote Docker Server"

    ```bash
    # Run the Stream API server in Docker
    docker run -p 13579:13579 -p 10010:10010 \
      -v ./Configs:/app/Configs \
      atlasplatformdocker/streaming-proto-server-host:latest
    ```

## Quick Start

Get started with the Stream API in minutes:

1. **[Install the client](getting-started/installation.md)** for your programming language
2. **[Configure the server](configuration/server-config.md)** or use Docker
3. **[Follow the quick start guide](getting-started/quick-start.md)** for your first integration
4. **[Explore examples](examples/telemetry-example.md)** for real-world scenarios

## Next Steps

- [📚 Getting Started Guide](getting-started/overview.md)
- [🔧 Configuration Options](configuration/server-config.md)
- [📖 API Reference](reference/api-reference.md)
- [� Docker Setup](configuration/docker-setup.md)

---

© 2025 Motion Applied Ltd. All rights reserved.