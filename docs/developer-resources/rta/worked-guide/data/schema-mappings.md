# Schema Mappings

Schema Mappings describe transformations from a data store schema to the RTA domain model.

ATLAS does not know anything about how the data is stored. [Configuration](../configuration/index.md) downloaded from the [Config Service](../../services/rta-configsvc/README.md) provides the client with a catalog of parameters and all the information it needs to make requests to the [REST API](../../api/index.md#tag/Data-API) &mdash; but it doesn't contain any information about  database tables and fields, or file paths and offsets.

## Data Adapters

The Toolkit [Data Service](../../services/rta-datasvc/README.md) uses the RTA domain model natively, so no mapping is required.

Implementing a Data Adapter service &mdash; such as the Toolkit [Influx Data Service](../../services/rta-influxdatasvc/README.md) &mdash; do typically need a mapping.

When the data adapter receives a request, it is expressed in terms of:

* data identity
* channels
* time range (optional)

The adapter must map this onto the data source schema to retrieve the data.  

Schema Mappings published to the [Schema Mapping Service](../../services/rta-schemamappingsvc/README.md) provide a generalizable way to do this.

## Example

This example is from the [InfluxDB Data Adapter Tutorial](../tutorials/influx/review.md#defining-the-schema-mapping):

=== "C# Sample"

    ```c#
    var schemaMapping = new SchemaMapping
    {
        Properties =
        {
            ["dialect"] = "influxql",
            ["database"] = "somedb",
            ["measurement"] = "somedata"
        },
        FieldMappings =
        {
            new FieldMapping {SourceField = "alpha", TargetChannel = 0u},
            new FieldMapping {SourceField = "beta", TargetChannel = 1u},
            new FieldMapping {SourceField = "gamma", TargetChannel = 2u}
        }
    };
    ```

=== "Schema Mapping (as JSON)"

    ```json
    {
        "properties": {
            "database": "rtademo",
            "dialect": "influxql",
            "measurement": "data"
        },
        "field_mappings": [
            {
                "source_field": "alpha",
                "target_channel": 0,
                "properties": {},
                "source_field_data_type": "",
                "target_channel_data_type": "TARGET_CHANNEL_DATA_TYPE_UNSPECIFIED"
            },
            {
                "source_field": "beta",
                "target_channel": 1,
                "properties": {},
                "source_field_data_type": "",
                "target_channel_data_type": "TARGET_CHANNEL_DATA_TYPE_UNSPECIFIED"
            },
            {
                "source_field": "gamma",
                "target_channel": 2,
                "properties": {},
                "source_field_data_type": "",
                "target_channel_data_type": "TARGET_CHANNEL_DATA_TYPE_UNSPECIFIED"
            }
        ],
        "event_mappings": []
    }
    ```

### Properties

The `properties` can convey information that applies to all fields and events.

In this example, the `"database"` and `"measurement"` are needed as part of the InfluxDB query.

### Field Mappings

Fields are primarily described by the mapping from `source_field` to `target_channel`.

`properties` can be present on each field, too.  
In the [Custom Data Adapter Tutorial](../tutorials/data-adapter/review.md#schema-mappings), each field has a `"table"` property.

`source_field_data_type` and `target_channel_data_type` are optional.  
A data adapter might need to perform type conversion when it supports data types that are not in the RTA specification.  
These fields are pre-defined to make it easier to create general-purpose type-conversion library code.

### Event Mappings

Events are primarily described by the mapping from `source_event` to `target_event_app` and `target_event_id`.

Like the Field Mappings, `properties` can be present on each Event Mapping.

`source_event_data_fields` is optional but pre-defined to help bind event data.

## Using the Schema Mapping Service

Schema Mappings are identified by two elements:

* `data_source` &mdash; identifying the data service (effectively a namespace)
* `data_identity` &mdash; identifying the data at the data service

These must be synchronized between the data ingest scripts or pipelines &mdash; where the Schema Mapping is published &mdash; and the data service &mdash; where it is retrieved.

These two elements are also used in the [Data Bindings](../sessions/data-bindings.md), where they need to be synchronized across the data ingest and [Gateway Service](../../services/rta-gatewaysvc/README.md). To avoid confusion, you should use the same _data source_ and _data identity_ pair in both places.

!!! info

    Refer to the [Schema Mapping Service gRPC API](../../services/rta-schemamappingsvc/grpc.md) for all the available methods.

Publishing a Schema Mapping:

=== "C# Sample"

    ```c#
    await schemaMappingClient.PutSchemaMappingAsync(new PutSchemaMappingRequest
    {
        DataSource = dataSource,
        DataIdentity = dataIdentity,
        SchemaMapping = schemaMapping
    });
    ```

!!! info

    It is safe to update Schema Mappings.      
    They are not shared, and the service caching strategy is designed to allow updates.


The service offers both `Get` and `Query` operations.  
Queries filter the Schema Mapping so that the response only includes selected Field Mappings, and optionally Event Mappings:

=== "C# Sample"

    ```c#
    var channels = ChannelRangeSet.Parse("1,A-F");

    var schemaMapping = await schemaMappingClient.QuerySchemaMappingAsync(new QuerySchemaMappingRequest
    {
        DataSource = dataSource,
        DataIdentity = dataIdentity,
        SelectChannels = channels.ToString(),
        SelectEvents = true
    });
    ```
