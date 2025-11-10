# Installation

This guide covers installing the Stream API client libraries and setting up your development environment.

## Client Libraries

### .NET / C#

Install the NuGet package:

```bash
dotnet add package MA.Streaming.Proto.Client.Local
```

Or add to your `.csproj` file:

```xml
<PackageReference Include="MA.Streaming.Proto.Client.Local" Version="latest" />
```

### Other Languages

For other programming languages, download the Protocol Buffer definitions from our [Protocol Repository](https://github.com/Software-Products/MA.DataPlatforms.Protocol) and generate client code using the protoc compiler.

Example for Python:
```bash
# Install required packages
pip install grpcio grpcio-tools

# Clone the protocol repository
git clone https://github.com/Software-Products/MA.DataPlatforms.Protocol.git
cd MA.DataPlatforms.Protocol

# Generate Python client code
python -m grpc_tools.protoc --python_out=. --grpc_python_out=. --proto_path=. *.proto
```

## Server Setup

### Docker Deployment (Recommended)

The easiest way to run the Stream API server is using Docker:

```bash
docker pull atlasplatformdocker/streaming-proto-server-host:latest
```

### Self-Hosted Deployment

Download the server binaries from our releases page or build from source:

```bash
git clone https://github.com/Software-Products/MA.DataPlatforms.StreamApi.git
cd MA.DataPlatforms.StreamApi/MA.Streaming
dotnet build -c Release
```

### Embedded Deployment

If you're embedding the Stream API server directly into your application, you don't need to host the server separately on Docker or as a standalone service. Simply reference the server components in your project and initialize them within your application code.

```xml
<PackageReference Include="MA.Streaming.Proto.ServerComponent" Version="latest" />
```

When embedding the server, the Stream API runs as part of your application process, eliminating the need for external server deployment.

## Verification

Verify your installation by running a simple test:

```csharp
using MA.Streaming.Proto.Client.Remote;

var configuration = new StreamingApiConfiguration(StreamCreationStrategy.TopicBased, "localhost:9092", []);
StreamingApiClient.Initialise(
    configuration,
    new CancellationTokenSourceProvider(),
    new KafkaBrokerAvailabilityChecker(),
    new LoggingDirectoryProvider(@"C:\Temp"));

var connectionManager = StreamingApiClient.GetConnectionManagerClient();
// Test basic connectivity
var connections = await connectionManager.GetConnection();
```

## Next Steps

- [Quick Start Guide](quick-start.md): Build your first application
- [Server Configuration](../configuration/server-config.md): Configure the server
- [Docker Setup](../configuration/docker-setup.md): Docker deployment guide