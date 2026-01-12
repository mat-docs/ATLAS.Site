# Data Format Management Service

The Data Format Management Service handles registering and getting data formats for parameter and event packets.

## Overview

This service provides:

- **Data Format Registration** Register new data formats.
- **Get Data Format Definitions** Allows to get data format definitions when needed.

## Key Features

### Manage Data Formats.
- Register new data formats.
- Get defined data formats based on the data format identifier.

## Usage Examples

### Register Data Format
#### Parameter List
```csharp
var formatManager = StreamingApiClient.GetDataFormatManagerClient();

var parameterListFormatRequest = new GetParameterDataFormatIdRequest
{
    DataSource = DataSource,
    Parameters = { "vCar:Chassis", "NGear:Chassis", "NEngine:FIA" }
};

var response = await formatManager.GetParameterDataFormatIdAsync(parameterListFormatRequest);
var dataFormatIdentifier = response.DataFormatIdentifier;
```

#### Event Identifier

```csharp
var formatManager = StreamingApiClient.GetDataFormatManagerClient();

var formatRequest = new GetEventDataFormatIdRequest
{
    DataSource = DataSource,
    Event = "RaceEvent"
};
var response = await formatManager.GetEventDataFormatIdAsync(formatRequest);
var dataFormatIdentifier = response.DataFormatIdentifier;
```

### Get Data Format Definition
#### Parameter List
```csharp
var formatManager = StreamingApiClient.GetDataFormatManagerClient();

var dataFormatIdentifier = 123456UL;
var dataFormatResponse = await formatManager.GetParametersListAsync(new GetParametersListRequest
{
    DataSource = DataSource,
    DataFormatIdentifier = dataFormatIdentifier
});

var parameterList = dataFormatResponse.Parameters;
```

#### Event Identifier
```csharp
var formatManager = StreamingApiClient.GetDataFormatManagerClient();

var dataFormatIdentifier = 123456UL;
var dataFormatResponse = await formatManager.GetEventAsync(new GetEventRequest
{
    DataFormatIdentifier = dataFormatIdentifier,
    DataSource = DataSource
});

var eventIdentifier = dataFormatResponse.Event;
```

## Best Practices

- Cache responses as much as you can. Helps reduce grpc calls.
- Try to reuse as much data formats as you can.

## See Also

- [Packet Writer Service](packet-writer.md)
- [Packet Reader Service](packet-reader.md)
- [Configuration Guide](../configuration/server-config.md)