# Overview

Welcome to the Motion Applied Stream API getting started guide. This section provides everything you need to begin working with our high-performance streaming platform.

## What You'll Learn

- How to set up your development environment
- Installing client libraries for your preferred language
- Configuring the Stream API server
- Creating your first streaming application

## Prerequisites

Before getting started, ensure you have:

- A supported development environment (.NET 8.0+, Python 3.8+, Node.js 16+, etc.)
- Docker and Docker Compose for server deployment
- Access to a Kafka broker (or use our Docker Compose setup)
- Basic understanding of streaming data concepts

## Quick Navigation

- **[Installation Guide](installation.md)**: Set up client libraries and dependencies
- **[Quick Start](quick-start.md)**: Build your first streaming application
- **[Server Configuration](../configuration/server-config.md)**: Configure the Stream API server
- **[Examples](../examples/telemetry-example.md)**: Explore real-world examples

## Architecture Overview

The Stream API provides five core services:

1. **Session Management**: Handle data session lifecycle
2. **Connection Management**: Manage client connections
3. **Packet Writer**: Publish data to streams
4. **Packet Reader**: Consume data from streams  
5. **Data Format Management**: Define and manage schemas

## Next Steps

Ready to get started? Follow our [installation guide](installation.md) to set up your development environment, then jump into the [quick start tutorial](quick-start.md) to build your first application.