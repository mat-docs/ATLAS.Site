# Serializing Configuration

RTA provides two configuration formats:

* JSON (`application/vnd.mat.config+json`)
* FFC (`application/vnd.mat.config+ffc`)

## JSON

The JSON format is defined in the [JSON schema](../../api/config.schema.json).

??? info "JSON Conventions"

    * Properties can be omitted if they are `#!json null` or empty arrays/maps
    * Properties are _camelCase_ &mdash; e.g. `"timeRange"` instead of `"TimeRange"`
    * Enumerations are expressed as _camelCase_ string constants &mdash; e.g. `#!json "closed"` instead of `#!json "Closed"`

For .NET, library support is provided via McLaren's [NuGet packages](../../downloads/nuget.md).

To convert configuration to JSON, add a package reference for _MAT.OCS.Configuration.Json_ and use the serializer like this:

```c#
using MAT.OCS.Configuration.Json;
using Newtonsoft.Json;

var json = JsonConvert.SerializeObject(config, Formatting.Indented, new ConfigurationJsonConverter());
```

When publshing to the [Config Service](../../services/rta-configsvc/grpc.md), the _MAT.OCS.RTA.Toolkit.API.GrpcClients_ package [handles JSON serialization automatically](publishing.md):

```c#
using MAT.OCS.RTA.Toolkit.API.ConfigService;

// handles serialization automatically
await configClient.PutConfigAsync(configIdentifier, config, MediaTypes.JsonConfig);
```

## FFC

FFC is a McLaren proprietary binary format with support for internal indexing and selective parsing.

It is supported in C#, F#, C++ VB.NET for .NET Core and .NET Framework, via McLaren's [NuGet packages](../../downloads/nuget.md).  
If you are using another language, serialize configuration as JSON.

!!! info

    This is the default format when publishing to the [Config Service](../../services/rta-configsvc/README.md) using the _MAT.OCS.RTA.Toolkit.API.GrpcClients_ package.

To serialize to FFC explicitly, add a package reference for _MAT.OCS.FFC.ConfigSerializer_ and use the serializer like this:

```c#
using MAT.OCS.FFC.ConfigSerializer;

await using var ms = new MemoryStream();
FastConfigSerializer.Serialize(config, "RTA", identifier).ToStream(ms);
var ffc = ms.ToArray();
```

When publshing to the [Config Service](../../services/rta-configsvc/grpc.md), the _MAT.OCS.RTA.Toolkit.API.GrpcClients_ package [handles FFC serialization automatically](publishing.md)::

```c#
using MAT.OCS.RTA.Toolkit.API.ConfigService;

// handles serialization automatically
await configClient.PutConfigAsync(configIdentifier, config);
```
