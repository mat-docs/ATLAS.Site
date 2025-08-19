
!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.
# Session Model

This page describes all the properties on the RTA JSON Session model.  
This is the representation in the [OpenAPI specification](../../api/index.md) and consumed by ATLAS.

## Conventions
* Dates are ISO 8601 with a timezone, and at the highest available precision
* Session times are expressed as 64 bit signed integers, as an offset from the Unix Epoch, in nanoseconds
* Properties can be omitted if they are `#!json null` or empty arrays/maps
* Properties are _camelCase_ &mdash; e.g. `"timeRange"` instead of `"TimeRange"`
* Enumerations are expressed as _camelCase_ string constants &mdash; e.g. `#!json "closed"` instead of `#!json "Closed"`

??? warning ".NET Pascal Case issues"

    Watch out for the _camelCase_ naming scheme when working with .NET &mdash; libraries tend to default to _PascalCase_.

    For the _Newtonsoft.Json_ library, set the serializer up like this:

    ``` C#
    new JsonSerializerSettings
    {
        ContractResolver = new DefaultContractResolver
        {
            // avoids mangling casing of dictionaries
            NamingStrategy = new CamelCaseNamingStrategy(false, false)
        },
        DateFormatHandling = DateFormatHandling.IsoDateFormat,
        DateParseHandling = DateParseHandling.DateTimeOffset
    }
    ```

    This also ensures that properties in `#!json "details"` and other dictionaries are not changed.

## Required Properties

`#!json "identity": "f10f4a19-3831-4dd6-a178-faa94931a5b0"`
:   Unique identity &mdash; which can be any format that is convenient for the server.
    
    Good security practise for public identity strings suggests it should be something unpredictable, rather than a file path or database sequence number.
    
`#!json "state": "closed"`
:   Indicates whether the session is expected to receive more data.

    ??? info "Valid States"

        | State                | Numeric | Description                                                                                      |
        |----------------------|---------|--------------------------------------------------------------------------------------------------|
        | `#!json "unknown"`   | 0       | Should be ignored by clients                                                                     |
        | `#!json "waiting"`   | 1       | Acquisition is starting, or temporarily paused                                                   |
        | `#!json "open"`      | 2       | Receiving data, and there may be more data to follow even if the session appears idle            |
        | `#!json "closed"`    | 4       | No more data should be received, but metadata may be changed                                     |
        | `#!json "truncated"` | 12      | _Closed_ without receiving all data                                                              |
        | `#!json "failed"`    | 28      | _Closed_ without receiving all data as the result of a fault                                     |
        | `#!json "abandoned"` | 44      | _Closed_ manually or by a watchdog after being left idle too long (e.g. due to an upstream crash)|

        The numeric values are part of the RTA specification. They are not used in JSON but are seen in the gRPC API.  
        Values are chosen so that all closed states are &gt;= `#!json "closed"` or &gt;= 4 &mdash; and bitwise comparison is also supported.

`#!json "timestamp": "2021-05-06T18:58:56.20289+01:00"`
:   Official session timestamp in ISO 8601, with time-zone offset if required &mdash; which ATLAS uses to cue session time rendering.

    This timestamp does _not_ have to match the actual data in the session: it could represent a time-tabled service, for example.

`#!json "identifier": "Turbo Encabulator experiment 5 - Joe Bloggs"`
:   Human-readable name.

    This is quite similar to a filename &mdash; but is not required to be unique.

    Can be modified while the session is open and long after it has been closed.

    It is common practise to include some of the session details into the identifier for ease of reading.

## Time Range

`#!json "startTimestamp": "2021-05-06T18:58:56.20289+01:00"`
:   Start of the telemetry (inclusive) in ISO 8601, or `null` if the session contains no data.

    This property (and `"endTimestamp"`) are present primarily to make sure that the session descriptor is fully usable from web applications, since the 64-bit nanosecond timestamps fall outside the numeric range reliably handled by double-precision variables.

`#!json "endTimestamp": "2021-05-06T19:08:56.20289+01:00"`
:   End of the telemetry (inclusive) in ISO 8601, or `null` if the session contains no data.

    Must be present if `"startTimestamp"` is present.

`#!json "timeRange": {"startTime": 1620323936202890000, "endTime": 1620324536202890000}`
:   Describes the valid time range (inclusive) in the session at nanosecond precision, measured from the Unix Epoch (1970-01-01T00:00:00Z) &mdash; and therefore always in UTC.

    Must be present when there is data in the session and be approximately the same as `"startTimestamp"` and `"endTimestamp"` after timezone correction. 

## Details and Extended Details

`#!json "details": {"Lab Tech": "Bob Jones", "Run": 17}`
:   Session metadata, which the client may use for filtering and display.

    Like the `"identifier"`, these details can be modified while a session is open and long after it has been closed.

    Can be a _string_, _number_, _integer_, _boolean_ or _dateTime_ &mdash; the latter being parsed from ISO 8601.  
    Cannot contain any nesting or `null` values.

`#!json "extDetails": {"Car Setup": {"rideHeightFront": 32, "rideHeightRear": 78}}`
:   Extended session metadata, which the client may use for filtering and display. Behaves like groups of `"details"`.

    Could be used to represent technical or large-scale metadata that users may not need to see by default.

    Extended details are still available for search and can be requested by the client, but are typically not shown to users by default &mdash; though this is entirely down to the server implementation.

    !!! info

        ATLAS does not currently exploit this feature, but may do so in future.

## Data Management

`#!json "type": "DDS"`
:   Type classifier, indicating the origin or content of the session.

`#!json "quality": 0.8`
:   Quality indicator in the range `0.0` - `1.0` (worst - best).

    Can indicate the measured or expected completeness of the data, especially when acquired from a lossy source.

`#!json "group": "Aero"`
:   Enables the client to organize the session into groups amongst peers.  
    Applicable when listed amongst `"alternates"` or `"children"`. 

    If the session derived from a parent as a result of model processing, the group conventionally indicates the model (e.g. `#!json "aero"`) that was used, and the `"version"` indicates subsequent iterations of the model.

    ATLAS uses this grouping for visual clarity and as part of the loading heuristic when selecting `"children"` to load automatically with the parent &mdash; where it should select the latest `"version"` within each group by default.

`#!json "version": "1.2.0"`
:   _SemVer_-style version number.

    The client displays this version number if specified and uses it with `"group"` as part of the loading heuristic for selecting `"children"` to load automatically.

    When loading `"children"`, ATLAS will automatically load the latest child session in each `"group"` (where specified). The latest session is determined by comparing `"version"` using _SemVer_ semantics, falling back to alphanumerical comparison. If no version number is present, a child session will always be loaded by default.

## Children and Alternates

`#!json "children": []`
:   References the identities of child sessions, which may be loaded together with the parent session. These are usually derived from their parent as a result of model processing, but may also simply be additional optional data sets.

    ATLAS organizes these children using their `"group"` property as a label, and their `"version"` to indicate loading priority within each group, with the latest version (by _SemVer_) being preferred. The `"group"` is conventionally used to name the model (e.g. `#!json "aero"`) where children are the result of model processing, so that the `"version"` indicates subsequent iterations of the model.

    Each child session can itself have child sessions, forming a tree.

`#!json "alternates": []`
:   References the identities of alternate sessions, which may be loaded instead of this session.

    Alternates may be at a different quality, or have different metadata, or even different content.

    ATLAS organizes these alternates using their `"group"` property as a label. They may have a different `"version"` but this is not required.

!!! seealso "See also..."

    The RTA Session model presents sessions like a tree, with references from parent to child.  
    During data acquisition, relationships are frequently captured the other way around, with a reference from child model to parent telemetry.

    Refer to [Relationships](relationships.md) to read about setting up relationships using the Toolkit [Session Service](../../services/rta-sessionsvc/README.md).

## Configuration Bindings

`#!json "configBindings": [{"identifier": "foo", "channelOffset": 1000}]`
:   Binds one or more sets of [Configuration](../configuration/index.md) onto a session.

    Each binding has:

    `#!json "identifier": "foo"`
    :   References a configuration that can be read from RTA.

        The same configuration can be published once and referenced across multiple sessions.

    `#!json "channelOffset": 1000`
    :   Tells the client to apply an offset to every channel in the configuration descriptor (&gt;= 0).

        For example, if the configuration specifies channel `#!json 50`, and the `"channelOffset"` is `#!json 1000`, then ATLAS will request data from the service using channel `#!json 1050`.

        This is done so that sessions can contain configuration from multiple independently-compiled "apps", and shared across sessions. This turns out to be important for [scalability](../../../../extending-atlas/rta/introduction/configuration.md#designed-for-scale) when sessions have 10s of thousands of parameters.

        Many deployments will use a single configuration binding with no offset.

    !!! important

        It is important for channels to be numbered contiguously from `#!json 0` or `#!json 1` to enable this offset.  
        If a server assigns channels randomly or using a hash, the channel namespace is effectively consumed and configurations cannot be stacked. Channel offsets are also used by ATLAS when loading child sessions.

        It is important that configurations are not modified after they are published.  
        ATLAS assumes that configurations may be shared and cached for improved performance reduced database size.            
        If there is any possibility that a configuration might be modified after publication, use a hash or a GUID for naming.

## Serializing to JSON

Using the _Newtonsoft_ library and following the [conventions](#conventions) above:

```c#
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

// ...

private static readonly JsonSerializerSettings JsonSettings = new JsonSerializerSettings
{
    ContractResolver = new DefaultContractResolver
    {
        // avoids mangling dictionary keys
        NamingStrategy = new CamelCaseNamingStrategy(false, false)
    },
    DateParseHandling = DateParseHandling.DateTimeOffset
};

// ...

var session = new Session("001", SessionState.Closed, DateTimeOffset.Now, "example");

var json = JsonConvert.SerializeObject(session, JsonSettings);
```