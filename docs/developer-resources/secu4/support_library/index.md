## Overview

This library provides a modular architecture for session management, data format handling, packet reading/writing, data buffering, merging, and interpolation.

## 📚 Documentation

**Complete documentation is available in the [docs](docs/) folder.**

### Quick Links

- **[Getting Started Guide](docs/index.md)** - Architecture overview, installation, and quick examples
- **[API Reference](docs/api-reference.md)** - Complete API documentation

### Module Documentation

- [Session Manager Module](docs/session-manager.md) - Session lifecycle management
- [Data Format Manager Module](docs/data-format-manager.md) - Parameter and event format definitions
- [Writer Module](docs/writer-module.md) - Packet writing to Kafka
- [Reader Module](docs/reader-module.md) - Packet reading from Kafka
- [Buffering Module](docs/buffering-module.md) - Data buffering and merging
- [Interpolation Module](docs/interpolation-module.md) - Custom frequency subscriptions

### Additional Resources

- [Documentation Index](docs/README.md) - Full documentation navigation
- [Troubleshooting Guide](docs/README.md#troubleshooting) - Common issues and solutions

## Key Features

- **Session Management**: Create, track, and manage live and historical sessions with metadata
- **Data Format Management**: Define and manage parameter and event data formats
- **Packet Reading/Writing**: Stream packets to and from Kafka brokers
- **Buffering & Merging**: Buffer incoming data packets and merge them into time-aligned samples
- **Interpolation**: Subscribe to parameters at custom frequencies with automatic interpolation
- **Event-Driven Architecture**: Rich event system for tracking session lifecycle and data processing
- **Kafka Integration**: Built-in support for Kafka-based streaming
- **Prometheus Metrics**: Built-in monitoring and metrics support

## Getting Started

### Prerequisites

- .NET 8.0 SDK or later
- Kafka broker (configured and accessible)
- Visual Studio 2022 or later / VS Code with C# extension

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd MA.DataPlatforms.Streaming.Support.Library

# Restore dependencies
dotnet restore

# Build the solution
dotnet build
```

### Quick Example

```csharp
using MA.DataPlatforms.Streaming.Support.Lib.Core.Abstractions;
using MA.DataPlatforms.Streaming.Support.Lib.Core.Contracts;
using MA.Streaming.Core.Configs;

// Initialize the library
var streamApiConfig = new StreamingApiConfiguration(
    StreamCreationStrategy.PartitionBased,
    "localhost:9094",
    new string[] { });

var supportLibApi = new SupportLibApiFactory().Create(
    logger,
    streamApiConfig,
    new RetryPolicy(10, TimeSpan.FromSeconds(5), RetryMode.Finite));

await supportLibApi.InitialiseAsync(cancellationToken);
supportLibApi.Start();

// Create a session
var sessionApi = supportLibApi.GetSessionManagerApi();
var sessionService = sessionApi.CreateService().Data;
sessionService.Initialise();
sessionService.Start();

var session = sessionService.CreateNewSession(
    new SessionCreationDto(dataSource: "MyDataSource"));
```

See the [Getting Started Guide](docs/index.md) for complete examples.

## Build and Test

### Build the Solution

```bash
# Build all projects
dotnet build

# Build specific project
dotnet build MA.DataPlatforms.Streaming.Support.Lib.Core/MA.DataPlatforms.Streaming.Support.Lib.Core.csproj
```

### Run Tests

```bash
# Run all tests
dotnet test

# Run specific test project
dotnet test MA.DataPlatforms.Streaming.Support.Lib.UnitTests/MA.DataPlatforms.Streaming.Support.Lib.UnitTests.csproj

# Run integration tests
dotnet test MA.DataPlatforms.Streaming.Support.Lib.IntegrationTests/MA.DataPlatforms.Streaming.Support.Lib.IntegrationTests.csproj
```

### Run E2E Samples

```bash
cd MA.DataPlatforms.Streaming.Support.Lib.UsageSample
dotnet run
```

## Project Structure

```
MA.DataPlatforms.Streaming.Support.Library/
├── MA.DataPlatforms.Streaming.Support.Lib.Core/          # Core library
├── MA.DataPlatforms.Streaming.Support.Lib.Protocol/      # Protocol definitions
├── MA.DataPlatforms.Streaming.Support.Lib.Helper/        # Helper utilities
├── MA.DataPlatforms.Streaming.Support.Lib.UnitTests/     # Unit tests
├── MA.DataPlatforms.Streaming.Support.Lib.IntegrationTests/  # Integration tests
├── MA.DataPlatforms.Streaming.Support.Lib.Telemetry.UnitTests/  # Telemetry tests
├── MA.DataPlatforms.Streaming.Support.Lib.E2E.Samples/   # End-to-end samples
├── MA.DataPlatforms.Streaming.Support.Lib.UsageSample/   # Usage examples
├── MA.DataPlatforms.Streaming.Support.Lib.ExternalAPI/   # External API samples
└── docs/                                                  # Documentation
```

## Architecture

The library follows a modular, pipeline-based architecture:

```
Support Library API
├── Session Manager (Core Module)
├── Data Format Manager (Core Module)
├── Writer Module
└── Reader Module → Buffering Module → Interpolation Module
```

### Module Overview

- **Session Manager**: Manage session lifecycle, metadata, and associations
- **Data Format Manager**: Define parameter and event formats with automatic ID generation
- **Writer Module**: Write packets to Kafka broker
- **Reader Module**: Read packets from Kafka (live or historical)
- **Buffering Module**: Buffer and merge packets into time-aligned samples
- **Interpolation Module**: Subscribe to data at custom frequencies with interpolation

See [Architecture Documentation](docs/index.md#architecture) for details.

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow C# coding conventions
- Write unit tests for new features
- Update documentation for API changes
- Ensure all tests pass before submitting PR

## License

Copyright (c) Motion Applied Ltd.

## Support

For issues, questions, or feature requests:
- 📖 Check the [Documentation](docs/README.md)
- 🔍 Review [API Reference](docs/api-reference.md)
- 🚀 See [Getting Started Guide](docs/index.md)
- 💡 Browse [Troubleshooting Guide](docs/README.md#troubleshooting)
- 📧 Contact the development team

---

**Version**: 1.0  
**Last Updated**: October 2025
