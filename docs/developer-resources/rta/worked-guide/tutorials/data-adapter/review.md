# Creating a Custom Data Adapter &mdash; Review

!!! info

    Complete the [Walkthrough](index.md) first.

This demo project is another example of the data adapter pattern, where data is served to ATLAS without copying and format-shiting.

The initial [indexing step](index.md#step-2-generate-and-index-custom-data-files) is essentially the same for any data adapter.

## Generating Sample SQLite Files

The data generator writes files to the working directory:

* When running from Visual Studio, this will be the bin directory
* When running from the terminal, this will be the current directory

Each file contains three tables:

* `properties` has the session timestamp, identifier, and details
* `samples_100` has three channels of 100Hz data, with Unix timestamps
* `samples_50` has three channels of 50Hz data, with Unix timestamps

The timestamps are all at millisecond precision, with perfect spacing &mdash; so they can easily be represented with [Periodic Data](../../data/index.md#periodic-data).

!!! tip

    You can open [SQLite](https://www.sqlite.org/) files using a database browser, such as:

    * [DB Browser for SQLite](https://sqlitebrowser.org/)
    * [SQLite Expert](http://www.sqliteexpert.com/)

Each file contains 1 hour of data:

| Field     | Frequency | Samples | Running Total |
|-----------|----------:|--------:|--------------:|
| alpha     | 100Hz     | 360,000 |   360,000     |
| beta      | 100Hz     | 360,000 |   720,000     |
| gamma     | 100Hz     | 360,000 | 1,080,000     |
| delta     | 50Hz      | 180,000 | 1,260,000     |
| epsilon   | 50Hz      | 180,000 | 1,440,000     |
| zeta      | 50Hz      | 180,000 | 1,620,000     |

## Indexing the SQLite Files

The indexing process is completely independent of data generation.  
In this example, it could be taking place after an ETL pipeline run, or after detecting new files, or integrating ATLAS with existing data for the first time.

### Configuration

The [Configuration](../../configuration/index.md) should look familiar from the other tutorials.

Channels are described as Periodic, with an interval of 10ms or 20ms (100Hz and 50Hz).

### Schema Mappings

[Schema Mappings](../../data/schema-mappings.md) contain the information needed by a Data Adapter to handle requests.

In this case, each field has an extra property to map it onto one of the two tables.

??? example

    ```json
    {
        "properties": {},
        "field_mappings": [
            {
                "source_field": "alpha",
                "target_channel": 0,
                "properties": {
                    "table": "samples_100"
                }
            },
            {
                "source_field": "beta",
                "target_channel": 1,
                "properties": {
                    "table": "samples_100"
                }
            },
            {
                "source_field": "gamma",
                "target_channel": 2,
                "properties": {
                    "table": "samples_100"
                }
            },
            {
                "source_field": "delta",
                "target_channel": 3,
                "properties": {
                    "table": "samples_50"
                }
            },
            {
                "source_field": "epsilon",
                "target_channel": 4,
                "properties": {
                    "table": "samples_50"
                }
            },
            {
                "source_field": "zeta",
                "target_channel": 5,
                "properties": {
                    "table": "samples_50"
                }
            }
        ],
        "event_mappings": []
    }
    ```

### Sessions

Sessions are published as follows:

* [`identity`](../../sessions/model.md#required-properties) is just the filename (e.g. `001.sqlite`)
* [`identifier`](../../sessions/model.md#required-properties), [`timestamp`](../../sessions/model.md#required-properties) and [`details`](../../sessions/model.md#details-and-extended-details) are taken from the `properties` table in each SQLite file
* [configuration binding](../../sessions/model.md#configuration-bindings) to the shared configuration
* [data binding](../../sessions/data-bindings.md):
    * data source is `sqlite` to match the [Gateway Service](../../../services/rta-gatewaysvc/README.md) configuration
    * data identity is the full path to the file

!!! important

    It's bad practise to expose internal details like file paths through the public API.

    The [Data Bindings](../../sessions/data-bindings.md) are not available via the [Gateway Service](../../../services/rta-gatewaysvc/README.md), and are treated as both trusted and private.

## Data Adapter Service

This service is based on the **ASP.NET Core Web Application** template in Visual Studio 2019, using the McLaren _MAT.OCS.RTA.Services.AspNetCore_ [NuGet Package](../../../downloads.md#nuget-binaries) to provide common functionality. This library is also used in all the [Toolkit Services](../../../services/index.md).

The key modifications are:

* [`Controllers\DemoDataController.cs`](#controller) &mdash; handles the incoming API requests
* [`DemoSampleDataStore.cs`](#sample-data-store) &mdash; reads data from SQLite and returns it in Chunks
* [`Startup.cs`](#startup) &mdash; ties it all together

### Controller

The _MAT.OCS.RTA.Services.AspNetCore_ package provides a controller base class: `BaseDataServiceControllerV2`.

This just needs sub-classing and annotating as shown:

```c#
    [Route("rta/v2")]
    [ApiController]
    public class DemoDataController : BaseDataServiceControllerV2
    {
        public DemoDataController(IEventStore eventStore, ISampleDataStore sampleDataStore) :
            base(eventStore, sampleDataStore)
        {
        }
    }
```

!!! info

    There are two sets of Controller base classes.

    *   `MAT.OCS.RTA.Services.AspNetCore.Controllers.API` provides controllers for the [RTA public API](../../../api/index.md), like the [Gateway Service](../../../services/rta-gatewaysvc/README.md).
    *   `MAT.OCS.RTA.Services.AspNetCore.Controllers.Services` provides controllers for microservices like this data adapter.

    There are small differences. For example the request route for data requests:

    *   RTA Public API: `/rta/v2/sessions/{sessionIdentity}/data/{type}/{channels}`
    *   Data microservice: `/rta/v2/data/{dataIdentity}/{type}/{channels}`

    This emphasizes the difference between the _session identity_ &mdash; which is public &mdash; and the _data identity_ &mdash; which is private and might be bound to multiple sessions.

The base controller class depends on services implementing `IEventStore` and `ISampleDataStore` (defined in the _MAT.OCS.RTA.Services_ package).

### Sample Data Store

#### Interface

The `ISampleDataStore` interface works with the _MAT.OCS.RTA.Services.AspNetCore_ to handle the [REST API](../../../api/index.md) responses.

The library also provides a `DefaultSampleDataStore` with a no-op implementation of this interface, so the demo extends this class and adds just one method, handling [Periodic Data](../../data/index.md#periodic-data):

```c# 
public class DemoSampleDataStore : DefaultSampleDataStore
{

    public override async Task<ChunkedResult> GetPeriodicDataChunksAsync(
        string dataIdentity,
        long? startTime,
        long? endTime,
        ChannelRangeSet channels,
        RequestContext context,
        CancellationToken cancellationToken)
    {
        // ...

        return new ChunkedResult(/*...*/);
    }

}
```

`ChunkedResult` wraps an `IEnumerable<Chunk>` or `IAsyncEnumerable<Chunk>` on more recent versions of .NET.

The NuGet package provides formatters which recognise and handle this response automatically.

#### Calling the Schema Mapping Service

We'll need an instance of `SchemaMappingStoreClient` to retrieve the Schema Mapping.

In ASP.NET Core, this is done by "injecting" the dependency in the constructor.  
The framework will instantiate `DemoSampleDataStore` and automatically pass in the client.

```c# hl_lines="4 6-9"
public class DemoSampleDataStore : DefaultSampleDataStore
{

    private readonly SchemaMappingStore.SchemaMappingStoreClient schemaMappingClient;

    public DemoSampleDataStore(SchemaMappingStore.SchemaMappingStoreClient schemaMappingClient)
    {
        this.schemaMappingClient = schemaMappingClient;
    }

    // ...

}
```

Once injected, the first step in handling a request is to _query_ the [Schema Mapping Service](../../../services/rta-schemamappingsvc/grpc.md):

```c#
SchemaMapping sm;
try
{
    sm = await schemaMappingClient.QuerySchemaMappingAsync(
        new QuerySchemaMappingRequest
        {
            DataSource = DataSource,
            DataIdentity = dataIdentity,
            SelectChannels = channels.ToString()
        },
        new CallOptions(cancellationToken: cancellationToken));
}
catch (RpcException ex)
{
    if (ex.StatusCode == StatusCode.NotFound)
        return ChunkedResult.Empty();

    throw;
}
```

A query request (vs. _get_ request) filters the `SchemaMapping` using the specified [Channels](../../configuration/channels-parameters.md#channels), so the result is ready for use.

In this demo, the data is split between two tables:

* `samples_100` &mdash; 100Hz
* `samples_50` &mdash; 50Hz

Each `FieldMapping` has a `table` property, so we can apply a little more business logic to query each of the tables using only the relevant fields:

```c#
schemaMapping.FieldMappings.Where(field => field.Properties["table"] == table)
```

These fields are then put together into a simple SQL query.

#### Encoding Chunks

Encoding [Chunks](../../data/chunks.md) involves:

1.  Widening the time bounds to achieve [stable chunk boundaries](../../data/chunks.md#stable-chunks):

    ```c#
    var (startChunkTime, endChunkTime) = ChunkTime.FromSessionTimeRange(startTime, endTime);
    ```

2.  Buffering the [row-oriented database records into column-oriented chunk data](../../data/chunks.md#column-oriented-data):

    This is done in the `ChunkingBuffer` class, following a [time-based chunking strategy](../../data/chunks.md#time-based-chunking), in two steps.

    First, collating the samples into [`PeriodicData`](../../data/index.md#periodic-data) results:

    ```c#
    for (var i = 0; i < buffers.Length; i++)
    {
        var result = new PeriodicData
        {
            ChannelId = fields[i].TargetChannel,
            Samples = sampleCount,
            Interval = intervalNanos,
            StartTimestamp = bufferStartTime,
            Buffer = ByteString.CopyFrom(MemoryMarshal.AsBytes(buffers[i].AsSpan(0, sampleCount)))
        };
    
        results[i].Add(result);
    }
    ```

    Second, [encoding the results](../../data/chunks.md#using-the-api) into chunks:

    ```c#
    var chunks = new Chunk[fields.Count];
    for (var i = 0; i < chunks.Length; i++)
    {
        // each Chunk contains a compressed PeriodicDataList
        var data = new PeriodicDataList
        {
            PeriodicData =
            {
                results[i]
            }
        };

        // one periodic channel per chunk
        var chId = fields[i].TargetChannel;
        var chunkData = ChunkData.EncodePooled(ChunkDataMemoryPool.Shared, data, new[] {chId});
        var chunk = new Chunk(unflushedStartTime, unflushedEndTime, chunkData);
        chunks[i] = chunk;

        results[i].Clear();
    }
    ```

    The steps are triggered based on the chunk [size limits](../../data/chunks.md#size-limits) and known maximum data frequency.
    
## Startup

The `Startup.cs` script is where ASP.NET services handle configuration, and setup "services" which handle internal functionality.

### Schema Mapping Service

Setting up the connection to the [Schema Mapping Service](../../../services/rta-schemamappingsvc/README.md):

```c#
services.AddSingleton<ChannelBase>(_ => GrpcChannel.ForAddress("http://localhost:2682"));
services.AddSingleton<SchemaMappingStore.SchemaMappingStoreClient>();
```

### Registering Services

Registering [Sample Data Store](#sample-data-store):

```c#
services.AddTransient<IEventStore, DefaultEventStore>();
services.AddTransient<ISampleDataStore, DemoSampleDataStore>();
```

Boiler-plate to enable RTA library support:

```c#
services.AddRTA();
```

### Respond to `GET /`

Add a response for a top-level GET request, so that the [Gateway Service](../../../services/rta-gatewaysvc/README.md) can see that the Data Adapter is reachable:

```c# hl_lines="4-9"
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapGet("/",
        async context =>
        {
            context.Response.ContentType = "text/plain";
            await context.Response.WriteAsync("RTA.Examples.DataAdapter.Service");
        });
});
```

### Improvements

Writing Data Adapter services in C# and ASP.NET Core shortens development using the RTA [NuGet packages](../../../downloads.md#nuget-binaries) &mdash; and even without this advantage, ASP.NET Core is a mature, powerful, cross-platform framework, with a rich ecosystem.

The package ecosystem offers some really useful packages to bring the service up to production standard:

* Configure the service with the [ASP.NET Configuration](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-5.0) framework
* Add `/health` endpoint with the [_AspNetCore.HealthChecks_](https://www.nuget.org/packages/AspNetCore.HealthChecks/) NuGet package
* Add `/metrics` endpoint with the [_prometheus-net.AspNetCore_](https://www.nuget.org/packages/prometheus-net.AspNetCore/) NuGet package
* Add structured logging with the [_Serilog.AspNetCore_](https://www.nuget.org/packages/Serilog.AspNetCore) NuGet package
