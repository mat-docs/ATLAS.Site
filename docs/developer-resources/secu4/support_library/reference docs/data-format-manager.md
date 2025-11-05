# Data Format Manager Module

## Overview

The Data Format Manager Module is the second independent core module in the Support Library. It manages data format definitions for parameters and events, automatically generating and caching unique format IDs. This module is essential for defining the structure of data before it can be streamed.

## Key Features

- **Parameter Format Management**: Define parameter groups with automatic ID generation
- **Event Format Management**: Define event types with unique IDs
- **Automatic ID Generation**: Consistent, deterministic ID generation based on content
- **Format Caching**: Efficient retrieval of previously defined formats
- **Data Source Isolation**: Separate format spaces per data source
- **Real-time Notifications**: Events when new formats are detected
- **Format Querying**: Retrieve all formats for a data source or specific format details

## API Access

### Get the Data Format Manager API

```csharp
var dataFormatApi = supportLibApi.GetDataFormatManagerApi();

```

### Create a Service Instance

```csharp
var serviceResult = dataFormatApi.CreateService();

if (serviceResult.Success && serviceResult.Data != null)
{
    var dataFormatService = serviceResult.Data;
    
    // Initialize and start the service
    dataFormatService.Initialise();
    dataFormatService.Start();
}

```

## Core Concepts

### Data Format Types

The module manages two types of data formats:

1. **Parameters**: Groups of parameters (e.g., `["Param1", "Param2", "Param3"]`)
2. **Events**: Single event identifiers (e.g., `"EventA"`, `"EventB"`)

### Data Format Information

Each format definition contains:

- **DataFormatId**: Unique identifier (ulong) for the format
- **DataSource**: The data source this format belongs to
- **Key**: Derived identifier string
- **Identifiers**: List of parameter names or event name
- **DataFormatInfoType**: Type (Parameters or Event)

### Format ID Generation

Format IDs are generated deterministically based on:
- Data source name
- Parameter names (for parameters)
- Format type (parameter group vs. event)

This ensures the same format always gets the same ID, enabling efficient caching and lookup.

## Methods

### GetParameterDataFormatId

Gets or creates a parameter format definition for a group of parameters.

```csharp
public ApiResult<ParameterDataFormatInfo?> GetParameterDataFormatId(
    string dataSource,
    IReadOnlyList<string> parameterList)

```

**Parameters:**
- `dataSource`: The data source identifier
- `parameterList`: List of parameter names in the group

**Returns:**
- `ParameterDataFormatInfo` containing:
  - `DataFormatId`: Unique ID for this parameter group
  - `ParameterList`: The list of parameters

**Example:**

```csharp
var result = dataFormatService.GetParameterDataFormatId(
    "DataSourceA",
    new[] { "Param1", "Param2", "Param3", "Param4" });

if (result.Success && result.Data != null)
{
    var formatId = result.Data.DataFormatId;
    var parameters = result.Data.ParameterList;
    
    Console.WriteLine($"Parameter Format ID: {formatId}");
    Console.WriteLine($"Parameters: {string.Join(", ", parameters)}");
}

```

**Note**: The parameter order in the input list doesn't matter; the same parameters in any order will produce the same format ID.

### GetParametersList

Retrieves the parameter list for a given format ID.

```csharp
public ApiResult<ParameterDataFormatInfo?> GetParametersList(
    string dataSource,
    ulong dataFormatId)

```

**Example:**

```csharp
var result = dataFormatService.GetParametersList("DataSourceA", formatId);

if (result.Success && result.Data != null)
{
    Console.WriteLine($"Parameters in format {formatId}:");
    foreach (var param in result.Data.ParameterList)
    {
        Console.WriteLine($"  - {param}");
    }
}

```

### GetEventDataFormatId

Gets or creates an event format definition.

```csharp
public ApiResult<EventDataFormatInfo?> GetEventDataFormatId(
    string dataSource,
    string eventName)

```

**Parameters:**
- `dataSource`: The data source identifier
- `eventName`: The event identifier/name

**Returns:**
- `EventDataFormatInfo` containing:
  - `DataFormatId`: Unique ID for this event
  - `EventName`: The event name

**Example:**

```csharp
var result = dataFormatService.GetEventDataFormatId("DataSourceA", "EventTypeA");

if (result.Success && result.Data != null)
{
    var eventFormatId = result.Data.DataFormatId;
    var eventName = result.Data.EventName;
    
    Console.WriteLine($"Event '{eventName}' has ID: {eventFormatId}");
}

```

### GetEvent

Retrieves event information for a given format ID.

```csharp
public ApiResult<EventDataFormatInfo?> GetEvent(
    string dataSource,
    ulong dataFormatId)

```

**Example:**

```csharp
var result = dataFormatService.GetEvent("DataSourceA", eventFormatId);

if (result.Success && result.Data != null)
{
    Console.WriteLine($"Event format {dataFormatId}: {result.Data.EventName}");
}

```

### GetDataSourceDataFormatInfo

Retrieves all data format definitions for a data source.

```csharp
public ApiResult<IReadOnlyList<DataFormatInfo>?> GetDataSourceDataFormatInfo(
    string dataSource)

```

**Example:**

```csharp
var result = dataFormatService.GetDataSourceDataFormatInfo("DataSourceA");

if (result.Success && result.Data != null)
{
    Console.WriteLine($"Found {result.Data.Count} data formats for DataSourceA:");
    
    foreach (var format in result.Data)
    {
        Console.WriteLine($"  Format IDs: {string.Join(",",format.DataFormats)}");
        Console.WriteLine($"  Type: {format.DataFormatInfoType}");
        Console.WriteLine($"  Identifiers: {string.Join(", ", format.Identifiers)}");
    }
}

```

## Events

### DataFormatInfoUpdated

Fired when a new data format is created or an existing format is detected.

```csharp
dataFormatService.DataFormatInfoUpdated += (sender, dataFormatInfo) =>
{
    Console.WriteLine($"Data format updated:");
    Console.WriteLine($"  Data Source: {dataFormatInfo.DataSource}");
    Console.WriteLine($"  Format IDs: {string.Join(",", dataFormatInfo.DataFormats)}");
    Console.WriteLine($"  Type: {dataFormatInfo.DataFormatInfoType}");
    Console.WriteLine($"  Identifiers: {string.Join(", ", dataFormatInfo.Identifiers)}");
};

```

**Event Data (`DataFormatInfo`):**
- `DataSource`: The data source identifier
- `DataFormatId`: The unique format ID
- `Key`: The format key
- `Identifiers`: List of parameter names or event name
- `DataFormatInfoType`: Either `DataFormatInfoType.Parameters` or `DataFormatInfoType.Event`

## Complete Example

```csharp
public class DataFormatManagerExample
{
    private readonly IDataFormatManagementService dataFormatService;

    public DataFormatManagerExample(ISupportLibApi supportLibApi)
    {
        var dataFormatApi = supportLibApi.GetDataFormatManagerApi();
        this.dataFormatService = dataFormatApi.CreateService().Data;

        // Subscribe to events
        this.dataFormatService.DataFormatInfoUpdated += OnDataFormatUpdated;

        // Initialize and start
        this.dataFormatService.Initialise();
        this.dataFormatService.Start();


    }

    public void DefineDataFormats()
    {
        const string DataSource = "DataSourceX";

        // Define first parameter group
        var group1Params = dataFormatService.GetParameterDataFormatId(
            DataSource,
            new[] { "Param1", "Param2", "Param3", "Param4" });

        if (group1Params.Success && group1Params.Data != null)
        {
            Console.WriteLine($"Group 1 parameters format ID: {group1Params.Data.DataFormatId}");
        }

        // Define second parameter group
        var group2Params = dataFormatService.GetParameterDataFormatId(
            DataSource,
            new[] { "Param5", "Param6", "Param7" });

        if (group2Params.Success && group2Params.Data != null)
        {
            Console.WriteLine($"Group 2 parameters format ID: {group2Params.Data.DataFormatId}");
        }

        // Define individual parameter (single parameter is still a list)
        var singleParam = dataFormatService.GetParameterDataFormatId(
            DataSource,
            new[] { "Param8" });

        // Define events
        var event1 = dataFormatService.GetEventDataFormatId(DataSource, "EventA");
        var event2 = dataFormatService.GetEventDataFormatId(DataSource, "EventB");
        var event3 = dataFormatService.GetEventDataFormatId(DataSource, "EventC");

        // Retrieve all formats
        var allFormats = dataFormatService.GetDataSourceDataFormatInfo(DataSource);

        if (allFormats.Success && allFormats.Data != null)
        {
            Console.WriteLine($"\nTotal formats defined: {allFormats.Data.Count}");

            var paramFormats = allFormats.Data.Where(f => f.DataFormatInfoType == DataFormatInfoType.Parameters);
            var eventFormats = allFormats.Data.Where(f => f.DataFormatInfoType == DataFormatInfoType.Event);

            Console.WriteLine($"Parameter formats: {paramFormats.Count()}");
            Console.WriteLine($"Event formats: {eventFormats.Count()}");
        }
    }

    public void LookupFormats()
    {
        const string DataSource = "DataSourceX";

        // Create a format
        var createResult = dataFormatService.GetParameterDataFormatId(
            DataSource,
            new[] { "Param1", "Param2" });

        if (!createResult.Success || createResult.Data == null)
        {
            return;
        }

        var formatId = createResult.Data.DataFormatId;

        // Later, look up what parameters this format contains
        var lookupResult = dataFormatService.GetParametersList(DataSource, formatId);

        if (lookupResult.Success && lookupResult.Data != null)
        {
            Console.WriteLine($"Format {formatId} contains:");
            foreach (var param in lookupResult.Data.ParameterList)
            {
                Console.WriteLine($"  - {param}");
            }
        }
    }

    private void OnDataFormatUpdated(object sender, DataFormatInfo formatInfo)
    {
        Console.WriteLine($"[Event] Data formats updated: {string.Join(",",formatInfo.DataFormats)}");
        Console.WriteLine($"  Type: {formatInfo.DataFormatInfoType}");
        Console.WriteLine($"  Identifiers: {string.Join(", ", formatInfo.Identifiers)}");
    }
}

```

## Best Practices

1. **Define Formats Early**: Define all data formats at the beginning of your session before streaming data.

2. **Group Related Parameters**: Group parameters that are logically related and will be sent together in packets.

3. **Consistent Naming**: Use consistent parameter and event naming conventions across your application.

4. **Cache Format IDs**: Store format IDs after creation to avoid repeated lookups.

5. **Check Return Values**: Always validate the `ApiResult` success and data before using format IDs.

6. **Per-Source Isolation**: Remember that formats are isolated per data source - the same parameter names in different data sources will have different format IDs.

## Data Source Organization

```csharp
public class MultiSourceFormats
{
    private readonly IDataFormatManagementService formatService;
    
    public void DefineFormatsForMultipleSources()
    {
        var sources = new[] { "DataSourceA", "DataSourceB", "DataSourceC" };
        var parameters = new[] { "Param1", "Param2", "Param3" };
        
        foreach (var source in sources)
        {
            // Each source gets its own format space
            var result = formatService.GetParameterDataFormatId(source, parameters);
            
            if (result.Success && result.Data != null)
            {
                Console.WriteLine($"{source} format ID: {result.Data.DataFormatId}");
                // Different IDs for each source even with same parameters
            }
        }
    }
}

```

## Error Handling

```csharp
var result = dataFormatService.GetParameterDataFormatId(dataSource, parameterList);

if (!result.Success)
{
    Console.WriteLine($"Error creating parameter format: {result.Message}");
    // Handle the error
    return;
}

if (result.Data == null)
{
    Console.WriteLine("Error: No data returned despite success");
    return;
}

// Use the format ID
var formatId = result.Data.DataFormatId;

```

## Integration with Other Modules

### With Writer Module

```csharp
// Define the format
var formatResult = dataFormatService.GetParameterDataFormatId(
    dataSource,
    new[] { "Speed", "RPM" });

// Use the format ID when writing packets
if (formatResult.Success && formatResult.Data != null)
{
    var formatId = formatResult.Data.DataFormatId;
    // Create packet with this format ID and write using Writer Module
}

```

### With Session Manager

```csharp
// Create a session
var sessionResult = sessionService.CreateNewSession(
    new SessionCreationDto(dataSource: "CarA"));

// Define formats for this session's data
var formatResult = dataFormatService.GetParameterDataFormatId(
    "CarA",
    new[] { "Speed", "RPM", "Throttle" });

```

## See Also

- [Session Manager Module](session-manager.md)
- [Writer Module](writer-module.md)
- [Reader Module](reader-module.md)
- [API Reference](api-reference.md)
