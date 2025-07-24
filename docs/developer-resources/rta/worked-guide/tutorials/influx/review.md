# InfluxDB Data Adapter  &mdash; Review

!!! info

    Complete the [Walkthrough](index.md) first.

This demo project illustrates the data adapter pattern, where data is served to ATLAS without copying and format-shifting. In this tutorial, the store is [InfluxDB](https://www.influxdata.com/products/influxdb/) &mdash; but since the data retrieval mechanics are quite simple, it could be any of a wide range of technologies.

## Sample Code Structure

The sample project has four key steps:

```c# linenums="1"
var dataIdentity = await WriteDataAsync(influxUri, sessionTag, startNanos, durationNanos, intervalNanos);
await WriteSchemaMappingAsync(schemaMappingClient, dataIdentity);
var configIdentifier = await WriteConfigAsync(configClient);
await WriteSessionAsync(sessionClient, sessionIdentity, dataIdentity, timestamp, startNanos, durationNanos, configIdentifier);
```

These steps are:

1. Write data to [InfluxDB](https://www.influxdata.com/products/influxdb/);  
   _This step is just providing example data, and really has nothing RTA-specific at all._
2. Describe how the database fields will map onto [Timestamped Data requests](../../../api/index.md#operation/get-timestamped-data);  
   _The data adapter ([Influx Data Service](../../../services/rta-influxdatasvc/README.md)) will use this to handle the requests._
3. Describe the fields as [Configuration](../../configuration/index.md);  
   _ATLAS will use this to show the user can see what parameters (fields) are available._
4. Publish the [Session](../../sessions/index.md);  
   _ATLAS will use this to provide data browsing and search._

## Writing Data to InfluxDB

The first stage is just creating sample data.

The data adapter pattern only cares about _reading_ data: it does not consider how the data arrives in storage.

In this demo, the sample project writes data using the [InfluxDB line protocol](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_tutorial/), but it could just as easily be [batch-loaded from a CSV file](https://www.influxdata.com/blog/how-to-write-points-from-csv-to-influxdb/), or [streamed from a broker](https://www.influxdata.com/blog/influxdb-and-kafka-how-companies-are-integrating-the-two/).

## Defining the Schema Mapping

ATLAS does not know anything about how the data is stored. [Configuration](../../configuration/index.md) provides the client with a catalog of parameters and all the information it needs to make requests to the [REST API](../../../api/index.md#operation/get-timestamped-data) &mdash; but it doesn't contain any information about  database tables and fields, or file paths and offsets.

When the data adapter receives a request, it is expressed in terms of:

* data identity
* channels
* time range (optional)

The adapter must map this onto the data source schema to retrieve the data.  
[Schema Mappings](../../data/schema-mappings.md) provide a generalizable way to do this.

=== "C# Sample"

    In this demo, the sample code defines and publishes a schema mapping like this:

    ```c#
    var schemaMapping = new SchemaMapping
    {
        Properties =
        {
            ["dialect"] = "influxql",
            ["database"] = Database,
            ["measurement"] = Measurement
        },
        FieldMappings =
        {
            Fields.Select((field, f) => new FieldMapping
            {
                SourceField = field,
                TargetChannel = (uint) f
            })
        }
    };

    await schemaMappingClient.PutSchemaMappingAsync(new PutSchemaMappingRequest
    {
        DataSource = DataBindingSource,
        DataIdentity = dataIdentity,
        SchemaMapping = schemaMapping
    });
    ```

=== "C# Sample &mdash; Unrolled"

    Here is the demo schema mapping with the `Fields`, `DataSource` and `DataIdentity` unrolled:

    ```c#
    var schemaMapping = new SchemaMapping
    {
        Properties =
        {
            ["dialect"] = "influxql",
            ["database"] = Database,
            ["measurement"] = Measurement
        },
        FieldMappings =
        {
            new FieldMapping {SourceField = "alpha", TargetChannel = 0u},
            new FieldMapping {SourceField = "beta", TargetChannel = 1u},
            new FieldMapping {SourceField = "gamma", TargetChannel = 2u}
        }
    };

    await schemaMappingClient.PutSchemaMappingAsync(new PutSchemaMappingRequest
    {
        DataSource = "rta-influxdatasvc",
        DataIdentity = "session=<guid>",
        SchemaMapping = schemaMapping
    });
    ```

The _data source_ needs to match the [Gateway Service configuration](../../../services/rta-gatewaysvc/README.md#configuration) and the [Data Binding](../../sessions/data-bindings.md) written to the [Session Service](../../../services/rta-sessionsvc/README.md).

The _data identity_ and schema mapping properties are specific to the data adapter.

The [Influx Data Service README](../../../services/rta-influxdatasvc/README.md#publishing-schema-mappings) describes its requirements:

* The _data identity_ must be a filter expression to select data that belongs to the session  
  e.g. `car_reg='EA04 LFG' AND trip_id='cd15a409'`
* The properties indicate:
    * `dialect` &mdash; because a future version will support [flux](https://docs.influxdata.com/influxdb/v2.0/query-data/) as well as [influxql](https://docs.influxdata.com/influxdb/v2.0/query-data/influxql/)
    * [`database`](https://docs.influxdata.com/influxdb/v1.8/concepts/glossary/#database), [`retention_policy`](https://docs.influxdata.com/influxdb/v1.8/concepts/glossary/#retention-policy-rp) (default "autogen") and [`measurement`](https://docs.influxdata.com/influxdb/v1.8/concepts/glossary/#measurement) (equivalent to a table)

!!! warning "Security Note"

    Take care to avoid query injection vulnerabilities with this data identity.

    Un-escaped user-supplied data could allow attackers to manipulate the data retrieval query.

## Configuration and Session

The sample project also publishes the [Configuration](../../configuration/index.md) and [Session](../../sessions/index.md) &mdash; which will look familiar if you completed the [Quick-Start Tutorial](../quick-start/index.md).

## Data Pipeline Integration

Now we have an example where ATLAS can connect to existing data, it's worth thinking about data pipeline integration.

The schema mapping, configuration and session could be published at any stage, including:

* As the data is being written
* At the end of each ingest job
* From a script, to index existing data

These are all very similar &mdash; but the first option enables live-streaming to ATLAS.

To see a live-stream version of this InfluxDB setup, check out the [next tutorial](../live/index.md).
