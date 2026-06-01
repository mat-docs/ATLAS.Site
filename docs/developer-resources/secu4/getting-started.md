# Getting Started with Open Streaming

This guide walks you through getting ATLAS Open Streaming data flowing from source to screen. Whether you are writing telemetry from your own systems into Kafka, or reading live sessions inside the ATLAS client, start here.

## What is the Open Streaming Architecture?

The Open Streaming Architecture is a broker-based system for streaming engineering telemetry data in real time. Data is published and consumed via [Apache Kafka](https://kafka.apache.org/) using a defined [Protobuf protocol](../secu4/docs.md), so any language or platform that can talk to Kafka can participate.

```
Your Data Source ──► Stream API (gRPC) ──► Kafka Broker ──► ATLAS Client
                                              │                  │
                                              ▼                  ▼
                                        Other consumers     Stream Recorder
                                        (dashboards,        (live display &
                                         logging, etc.)      recording)
```

This architecture is data-source agnostic. It works with ECU telemetry, sim racing data, kart loggers, test rigs, cycling power meters — anything that produces time-series data. For a real-world worked example, see [How I Got iRacing Telemetry Streaming into ATLAS Viewer](../../blog/2026/04/21/how-i-got-iracing-telemetry-streaming-into-atlas-viewer/).

## Architecture at a Glance

| Component | What it does | When you need it |
|-----------|-------------|-----------------|
| **[Stream API](stream_api/index.md)** | gRPC server that manages sessions, connections, data formats, and packet routing to/from Kafka. Runs as a Docker container or embedded in your app. | Always. Every producer and consumer talks through the Stream API. |
| **[Key Generator](stream_api/index.md)** | Generates unique identifiers required by `ConfigurationPacket`. Runs alongside the Stream API. | Always, when sending configuration packets. |
| **[Support Library](support_library/reference_docs/index.md)** | .NET convenience library that wraps the Stream API into a higher-level pipeline (session management, buffering, interpolation). | When building a .NET application and you want managed read/write pipelines without handling gRPC directly. |
| **[Bridge Service](bridge_service/index.md)** | Standalone service that bridges a raw ADS data stream into the Open Streaming protocol. | When your data source is an ADS (SECU unit) and you need it converted automatically. |
| **[Indexing Services](indexing_services/index.md)** | Session indexing and search across historical streaming data. | When you need to query and retrieve past sessions. |

### Stream API vs Support Library

This is the most common source of confusion. Here is the distinction:

- The **Stream API** is the underlying gRPC service. It is language-agnostic: any language with gRPC support (Python, C++, Java, Go, etc.) can use it directly via the [proto definitions](https://github.com/Software-Products/MA.DataPlatforms.Protocol).
- The **Support Library** is available as a **.NET NuGet package** and a **Python package** (via FFI). It wraps the Stream API into higher-level abstractions (automatic buffering, interpolation, session lifecycle).

**Choose the Stream API directly** if you need fine-grained control, are using a language other than C#/Python, or want to match the approach used in the example repositories.

**Choose the Support Library** if you want the managed pipeline experience with built-in buffering and interpolation. Available in both C# ([NuGet](https://github.com/mat-docs/packages)) and Python ([PyPI package](https://github.com/Software-Products/MA.DataPlatforms.Streaming.Support.Library/releases)).

!!! note "Which approach do the examples use?"
    The [example-stream-api-kafka-setup](https://github.com/atlas-dev-hub/example-stream-api-kafka-setup) and [iRacing bridge](https://github.com/atlas-dev-hub/example-bridge-service-iracing) use **raw gRPC calls to the Stream API**. The [Support Library sample code](https://github.com/mat-docs/MA.DataPlatforms.Streaming.Support.Library.SampleUsage) uses the **Support Library wrapper**. These are two different layers over the same protocol — if translating between them, be aware the API surfaces differ.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Engine 20+)
- A Kafka broker (the quick-start below provides one via Docker)
- For .NET development: .NET 8.0+ SDK and the [Motion Applied NuGet feed](https://github.com/mat-docs/packages)
- For Python/other languages: protobuf compiler and gRPC tools for your language

## Quick Start: Data Flowing in 30 Minutes

The fastest way to get a working environment is the [example repository](https://github.com/atlas-dev-hub/example-stream-api-kafka-setup), which spins up Kafka, the Stream API server, and a Key Generator — all via Docker Compose.

### 1. Clone the Example Repository

```bash
git clone https://github.com/atlas-dev-hub/example-stream-api-kafka-setup.git
cd example-stream-api-kafka-setup
```

### 2. Start the Docker Stack

```bash
docker compose up -d
```

This starts four containers:

| Container | Port | Purpose |
|-----------|------|---------|
| `atlas-kafka` | 9092 | Kafka message broker (KRaft mode, no Zookeeper) |
| `atlas-kafka-ui` | 8080 | Web UI for inspecting Kafka topics and messages |
| `atlas-stream-api` | 13579, 10010 | Stream API gRPC server + Prometheus metrics |
| `atlas-key-generator` | 15379 | Unique key generation for configuration packets |

### 3. Verify the Stack

```bash
docker compose ps
```

All four containers should show as healthy/running. Open [http://localhost:8080](http://localhost:8080) to access the Kafka UI — watching messages flow through topics is the fastest way to debug integration issues.

### 4. Explore with the Notebook

Open `atlas_kafka_streaming.ipynb` in VS Code (with the [Jupyter extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)) to walk through producing and consuming streaming data interactively.

### 5. Connect ATLAS Client

To view streaming data in the ATLAS client:

1. Open ATLAS and go to **Tools > Options > Recorders > Stream Recorder**
2. Configure the Stream Server URL (e.g. `localhost:13579`)
3. Open the **Session Browser** and add a **Stream Recorder**
4. Set the **Data Source** to match the `dataSource` value used when creating sessions
5. Choose **Live** or **Live with Catchup** mode
6. Click **Start** — ATLAS will display data as it arrives

See [Stream Recorder](../../key-functionality/analyse/viewer/handling-data/recorders/stream-recorder.md) for full configuration details.

## The Protocol: Five Steps, Exact Order

The session lifecycle has a specific sequence, and the order matters more than you might expect. Getting this wrong is the most common integration issue — most debugging time is spent discovering these invariants.

```
1. Create the session
2. Announce the session (NewSessionPacket to BOTH streams)
3. Send the ConfigurationPacket (to BOTH streams)
4. Register data formats (get format IDs for your parameters)
5. Stream data (PeriodicDataPacket / RowDataPacket / EventPacket)
```

### Step 1: Create the Session

=== "Stream API (gRPC)"

    ```python
    resp = session_stub.CreateSession(
        api_pb2.CreateSessionRequest(
            data_source="Default",
            identifier="Spa - McLaren 720S - 2026-03-27 14:30",
            type="Session",
            version=1,
        )
    )
    session_key = resp.session_key
    ```

=== "Stream API (C#)"

    ```csharp
    var sessionManager = streamingApiClient.GetSessionManagementClient();
    var response = await sessionManager.CreateSessionAsync(new CreateSessionRequest
    {
        DataSource = "Default",
        Type = "Session",
        Version = 1,
        Identifier = "TestRun_001",
        Details = { { "Driver", "DriverName" }, { "Track", "TrackName" } }
    });
    var sessionKey = response.SessionKey;
    ```

=== "Support Library (.NET)"

    ```csharp
    var sessionResult = sessionService.CreateNewSession(
        new SessionCreationDto(
            dataSource: "Default",
            identifier: "TestRun_001",
            type: "Session",
            details: [
                new SessionDetailDto("Driver", "DriverName"),
                new SessionDetailDto("Track", "TrackName")
            ]));
    var sessionKey = sessionResult.Data.SessionKey;
    ```

The `identifier` shows up in the ATLAS session browser. Use something descriptive — track, car, timestamp.

### Step 2: Announce the Session

Send a `NewSessionPacket` to **both** your data stream and the main stream (`""`). This is how ATLAS discovers a session exists.

=== "Python"

    ```python
    new_sess = open_data_pb2.NewSessionPacket(data_source="Default")
    write_packet(new_sess, stream="Stream1")  # data stream
    write_packet(new_sess, stream="")          # main stream
    ```

=== "C#"

    ```csharp
    var newSession = new NewSessionPacket { DataSource = "Default" };
    var packet = new Packet
    {
        SessionKey = sessionKey,
        Content = newSession.ToByteString(),
        Id = packetId++,
        Type = "NewSession",
        IsEssential = false
    };
    // Send to BOTH streams
    writerService.WriteData("Default", "Stream1", sessionKey, packet);
    writerService.WriteData("Default", "", sessionKey, packet);
    ```

### Step 3: Send the ConfigurationPacket

!!! warning "This is the step most integrators miss"
    The `ConfigurationPacket` declares every parameter you will stream. ATLAS will not interpret any data without it. Your session will appear with zero parameters if this is missing.

The ConfigurationPacket defines parameter metadata (name, units, min/max, frequency, groups), event definitions, and the group hierarchy.

=== "Python"

    ```python
    # Generate a unique config_id via the Key Generator service
    config_id = keygen_stub.GenerateUniqueKey(
        key_generator_pb2.GenerateUniqueKeyRequest(
            type=key_generator_pb2.KEY_TYPE_STRING
        )
    ).string_key

    config_pkt = open_data_pb2.ConfigurationPacket(
        config_id=config_id,
        parameter_definitions=[
            open_data_pb2.ParameterDefinition(
                identifier="Engine.Rpm",
                name="Engine RPM",
                application_name="VehicleTelemetry",
                description="Engine revolutions per minute",
                units="RPM",
                data_type=open_data_pb2.DATA_TYPE_FLOAT64,
                format_string="%5.0f",
                min_value=0.0,
                max_value=12000.0,
                warning_min_value=0.0,
                warning_max_value=12000.0,
                groups=["Engine"],
                frequencies=[10.0],
            ),
            # ... more parameters
        ],
        group_definitions=[
            open_data_pb2.GroupDefinition(
                identifier="VehicleTelemetry",
                application_name="VehicleTelemetry",
                name="Vehicle Telemetry",
                description="Vehicle telemetry data",
            )
        ],
    )

    # Send to BOTH streams
    write_packet(config_pkt, stream="", essential=True)
    write_packet(config_pkt, stream="Stream1", essential=True)
    ```

=== "C# (Stream API)"

    ```csharp
    var telemetryConfig = new ConfigurationPacket
    {
        ConfigId = "vehicle-telemetry-v1",  // use Key Generator in production
        ParameterDefinitions =
        {
            new ParameterDefinition
            {
                Identifier = "Engine.Rpm",
                Name = "Engine RPM",
                ApplicationName = "VehicleTelemetry",
                Description = "Engine revolutions per minute",
                Units = "RPM",
                DataType = DataType.Float64,
                FormatString = "%5.0f",
                MinValue = 0.0,
                MaxValue = 12000.0,
                WarningMinValue = 0.0,
                WarningMaxValue = 12000.0,
                Groups = { "Engine" },
                Frequencies = { 10.0 },
            },
            new ParameterDefinition
            {
                Identifier = "Engine.Temperature",
                Name = "Engine Temperature",
                ApplicationName = "VehicleTelemetry",
                Description = "Engine coolant temperature",
                Units = "°C",
                DataType = DataType.Float64,
                FormatString = "%5.1f",
                MinValue = -40.0,
                MaxValue = 150.0,
                WarningMinValue = -20.0,
                WarningMaxValue = 130.0,
                Groups = { "Engine" },
                Frequencies = { 1.0 },
            },
        },
        GroupDefinitions =
        {
            new GroupDefinition
            {
                Identifier = "VehicleTelemetry",
                ApplicationName = "VehicleTelemetry",
                Name = "Vehicle Telemetry",
                Description = "Vehicle telemetry data",
            }
        }
    };

    // Send to BOTH streams
    await packetWriter.WriteDataPacketAsync(new WriteDataPacketRequest
    {
        Detail = new DataPacketDetails
        {
            DataSource = "Default",
            SessionKey = sessionKey,
            Stream = "",  // main stream
            Message = new Packet
            {
                Content = telemetryConfig.ToByteString(),
                Type = "Configuration",
                IsEssential = true,
                SessionKey = sessionKey
            }
        }
    });
    // Repeat for "Stream1"
    ```

**Critical rules for ConfigurationPacket:**

| Rule | Why |
|------|-----|
| **Exactly ONE `GroupDefinition`** per ConfigurationPacket | Multiple groups cause zero parameters and `FlushSlotsAsRequired - slots flushed 0` in logs. The group is a session-level container; parameter organisation happens through naming and `application_name`. |
| **`config_id` should be unique** | The [Support Library sample](https://github.com/mat-docs/MA.DataPlatforms.Streaming.Support.Library.SampleUsage) uses a hardcoded string (`"ConfigPacket"`) which works for single-session scenarios. For production use with multiple sessions, use the Key Generator service (`localhost:15379`) to generate unique IDs. |
| **Send to BOTH streams** | SQLRace processes each Kafka topic independently. Without config on the data stream, markers and data on that stream are silently discarded. Note: the Support Library sample sends config to `""` only — this works for basic data streaming but will cause markers on the data stream to be dropped. Send to both `""` and your data stream (e.g. `"Stream1"`). |

### Step 4: Register Data Formats

Each parameter group needs a data format identifier. This links your parameter definitions to the data packets.

=== "Python"

    ```python
    resp = dfmt_stub.GetParameterDataFormatId(
        api_pb2.GetParameterDataFormatIdRequest(
            data_source="Default",
            parameters=["Engine.Rpm", "Engine.Temperature"],
        )
    )
    format_id = resp.data_format_identifier
    ```

=== "C# (Stream API)"

    ```csharp
    var formatResponse = await dataFormatManager.GetParameterDataFormatIdAsync(
        new GetParameterDataFormatIdRequest
        {
            DataSource = "Default",
            Parameters = { "Engine.Rpm", "Engine.Temperature" }
        });
    var formatId = formatResponse.DataFormatIdentifier;
    ```

### Step 5: Stream Data

Send data as `PeriodicDataPacket` (fixed-frequency), `RowDataPacket` (timestamped rows), or `EventPacket`.

=== "Python"

    ```python
    data_pkt = open_data_pb2.PeriodicDataPacket(
        data_format=open_data_pb2.SampleDataFormat(
            data_format_identifier=format_id
        ),
        start_time=timestamp_ns,
        interval=16666666,  # 60 Hz = 16.67ms in nanoseconds
        columns=[col],
    )
    write_packet(data_pkt, stream="Stream1")
    ```

=== "C# (Stream API)"

    ```csharp
    var engineData = new PeriodicDataPacket
    {
        DataFormat = new SampleDataFormat
        {
            DataFormatIdentifier = formatId
        },
        StartTime = (ulong)DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() * 1000000,
        Interval = 100000000,  // 100ms in nanoseconds (10 Hz)
        Columns =
        {
            new SampleColumn
            {
                DoubleSamples = new DoubleSampleList
                {
                    Samples =
                    {
                        new DoubleSample { Value = 8500.0, Status = DataStatus.Valid }
                    }
                }
            }
        }
    };

    await packetWriter.WriteDataPacketAsync(new WriteDataPacketRequest
    {
        Detail = new DataPacketDetails
        {
            DataSource = "Default",
            Stream = "Stream1",
            SessionKey = sessionKey,
            Message = new Packet
            {
                Content = engineData.ToByteString(),
                Type = "PeriodicData",
                IsEssential = false,
                SessionKey = sessionKey
            }
        }
    });
    ```

!!! note "All timestamps are nanoseconds"
    Every timestamp field in the protocol (`StartTime`, `Interval`, `Timestamp`) uses **nanoseconds since UNIX epoch** (1 Jan 1970, UTC). Common intervals: 60 Hz = `16666666` ns, 100 Hz = `10000000` ns, 1 kHz = `1000000` ns. Convert from milliseconds: `ms * 1000000`.

## Packet Routing Reference

Different packets go to different streams. Get this wrong and ATLAS either does not see the session or does not see the data:

| Packet | Stream | Essential | Notes |
|--------|--------|-----------|-------|
| `NewSessionPacket` | Both (`Stream1` + `""`) | No | How ATLAS discovers the session |
| `ConfigurationPacket` | Both (`Stream1` + `""`) | Yes | Must precede data on every stream |
| `PeriodicDataPacket` | Data stream (`Stream1`) | No | Telemetry samples |
| `RowDataPacket` | Data stream (`Stream1`) | No | Timestamped rows |
| `EventPacket` | Data stream (`Stream1`) | No | Events |
| `MarkerPacket` | Both (`Stream1` + `""`) | Yes | Lap markers, pit stops |
| `EndOfSessionPacket` | Both (`Stream1` + `""`) | No | Session end signal |

## Making Traces Smooth

If your traces appear jittery or discontinuous in ATLAS, the issue is almost always timestamp handling. The key insight: ATLAS needs each `PeriodicDataPacket` to contain contiguous samples with an exact interval.

**Do:**

- Collect multiple samples into a batch, then send as a single `PeriodicDataPacket`
- Advance `start_time` arithmetically: `start_time += interval * sample_count`
- Use incrementing packet IDs on every `Packet` wrapper

**Don't:**

- Send one sample per packet (ATLAS has to infer continuity across packets)
- Use wall-clock timestamps per batch (OS scheduling jitter causes gaps)

```python
# Collect one second of samples at 60 Hz, paced in real-time
for _ in range(batch_size):
    sample = read_telemetry()
    batch.append(sample)
    time.sleep(interval_seconds)

# Send as one packet, advance timestamp arithmetically
send_periodic_data(batch, start_time_ns, interval_ns)
start_time_ns += interval_ns * batch_size
```

For the full worked example including production considerations (per-sample timestamps, non-blocking gRPC sends, clock drift prevention), see the [iRacing bridge blog post](../../blog/2026/04/21/how-i-got-iracing-telemetry-streaming-into-atlas-viewer/).

## Troubleshooting

### Session appears but parameters are missing

1. **Check `ConfigurationPacket` was sent** — this is the most common cause
2. **Check for exactly ONE `GroupDefinition`** — multiple groups silently produce zero parameters
3. **Check `config_id` is unique** — use the Key Generator service, not a hardcoded string
4. **Check config was sent to BOTH streams** — SQLRace needs config on every stream where data flows

Look for `FlushSlotsAsRequired - slots flushed 0` in the Stream API logs — this confirms a config issue.

### Data is being written but ATLAS shows nothing

1. **Stream API reachable?** Can the ATLAS machine reach `<server-ip>:13579`?
2. **Topics exist?** Check Kafka UI at [http://localhost:8080](http://localhost:8080)
3. **Data Source matches?** The name in your writer must match the Stream Recorder config
4. **NewSessionPacket sent to both streams?** ATLAS discovers sessions via the main stream (`""`)

### Lap markers not appearing

Markers require the `ConfigurationPacket` on the same stream. If config only went to `""` but markers go to `Stream1`, SQLRace silently drops them. Also ensure marker timestamps fall within the range of your `PeriodicDataPacket` timestamps — markers outside any data packet's time range are discarded.

### Error tracing

The Stream API server logs to the `logs/` directory when running via Docker:

```bash
docker compose logs -f stream-api
```

Enable debug logging in `AppConfig.json`:

```json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Debug",
      "Override": {
        "MA.Streaming": "Debug"
      }
    }
  }
}
```

### Stream Recorder config breaks ATLAS

If a Stream Recorder configuration references a server that no longer exists, ATLAS may fail to start. To recover, delete the Stream Recorder configuration file from the ATLAS config directory and restart.

## Common Pitfalls

| Pitfall | Solution |
|---------|----------|
| Missing `ConfigurationPacket` | Always send after session creation, before any data, to **both** streams |
| Multiple `GroupDefinition` entries | Exactly one group per `ConfigurationPacket`. Organise parameters via naming, not multiple groups |
| Hardcoded `config_id` | Use the Key Generator service (`localhost:15379`) to generate unique IDs |
| Wrong timestamp units | All timestamps are **nanoseconds**, not microseconds or milliseconds |
| Config sent to one stream only | Send to both data stream (`Stream1`) and main stream (`""`) |
| One sample per packet | Batch samples into a single `PeriodicDataPacket` for smooth traces |
| Wall-clock batch timestamps | Advance `start_time` arithmetically, not from `time.time_ns()` |
| Wrong order of operations | Session > NewSession > Config > DataFormats > Data > EndSession |

## Example Repositories

| Repository | Language | What it demonstrates |
|------------|----------|---------------------|
| [example-stream-api-kafka-setup](https://github.com/atlas-dev-hub/example-stream-api-kafka-setup) | Python / Jupyter | Docker stack + interactive notebook for exploring the Stream API |
| [example-bridge-service-iracing](https://github.com/atlas-dev-hub/example-bridge-service-iracing) | Python | Complete bridge service: iRacing telemetry > Stream API > Kafka > ATLAS |
| [MA.Streaming.Api.UsageSample](https://github.com/mat-docs/MA.Streaming.Api.UsageSample) | C# + Python | Sample code for both languages using the Stream API directly |
| [Support Library Sample Usage](https://github.com/mat-docs/MA.DataPlatforms.Streaming.Support.Library.SampleUsage) | C# + Python | Sample code using the Support Library wrapper (includes buffering/interpolation examples) |
| [Support Library Source](https://dev.azure.com/MAT-OCS/MA.DataPlatforms/_git/MA.DataPlatforms.Streaming.Support.Library) | C# + Python FFI | Support Library source code with E2E samples and unit tests (requires Azure DevOps access) |

## Reference Documentation

- **[Stream API](stream_api/index.md)** — Full gRPC service documentation with Docker Compose examples
- **[Support Library](support_library/reference_docs/index.md)** — .NET library module reference
- **[Protocol Documentation](docs.md)** — Complete Protobuf schema (all packet types, fields, and message structures)
- **[Bridge Service](bridge_service/index.md)** — ADS-to-Stream bridge configuration
- **[Telemetry Example](stream_api/reference_docs/examples/telemetry-example.md)** — Complete C# producer/consumer with ConfigurationPacket
- **[Stream Recorder](../../key-functionality/analyse/viewer/handling-data/recorders/stream-recorder.md)** — ATLAS client-side recording setup

