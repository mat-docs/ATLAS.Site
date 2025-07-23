# Data Basics

RTA supports four data representations:

| Representation                        | Columnar[^1] | Variable Rate | Text Support       |
|---------------------------------------|--------------|---------------|--------------------|
| [Timestamped Data](#timestamped-data) | yes          | yes           | enum only          |
| [Periodic Data](#periodic-data)       | yes          | no            | enum only          |
| [Row Data](#row-data)                 | no           | yes           | enum only          |
| [Event](#event)                       | yes          | yes           | enums or free-text |

[^1]: i.e. one parameter/channel at a time

These are all defined in the [rta.model.data](../protobuf/model_data.md) protobuf schema. Pre-compiled classes are available for .NET in our [NuGet packages](../../downloads/nuget.md), or you can use the [protobuf compiler](https://github.com/protocolbuffers/protobuf/releases) to generate idiomatic code from the schema in a range of languages.

All RTA data timestamps are measured in nanoseconds since the Unix Epoch (1970-01-01 00:00:00Z).

!!! important

    Since data timestamps are an offset from **UTC**, you must subtract the timezone offset from local timestamps &mdash; or use a library function that handles timezones.

    For example, these ISO 8601 timestamps are all the same offset (`1609502400000000000`):

    * 2021-01-01T13:00:00+01:00
    * 2021-01-01T12:00:00Z
    * 2021-01-01T04:00:00-08:00

!!! info
    
    * 1 second = 1,000,000,000 nanoseconds
    * 1 millisecond = 1,000,000 nanoseconds
    * 1 tick (Windows) = 100 nanoseconds

=== "C# Timestamps Example"

    ``` C#
    var ts = DateTimeOffset.Parse("2021-01-01T13:00:00+01:00");
    var nanos = (ts - DateTimeOffset.UnixEpoch).Ticks * 100;
    Console.WriteLine("Timestamp: " + nanos);
    ```

    ```
    Timestamp: 1609502400000000000
    ```

## Timestamped Data

This representation encodes short bursts of samples, at a variable rate, for one channel.

### Schema

``` protobuf
message TimestampedData {
    // Channel Id.
    uint32 channel_id = 1;

    // Start timestamp, in nanoseconds relative to the Unix epoch.
    sfixed64 start_timestamp = 2;

    // Multiplier (ns) to apply to timestamp deltas.
    int64 timestamp_deltas_scale = 3;

    // Timestamp deltas (ns / multiplier) for each sample relative to the previous one.
    // The first delta is always zero.
    // If the interval is constant, all subsequent deltas should be identical.
    // If the multiplier were set to the interval, the subsequent deltas would all be 1.
    // This scheme allows for efficient variable-length encoding.
    repeated int64 timestamp_deltas = 4;

    // Buffer of samples. Every sample must be encoded to alike and to the same width
    // so the buffer is splittable; the rest of the encoding is defined in config.
    bytes buffer = 5;
}
```

Combining the delta-encoding scheme with protobuf variable-length integer encoding results in a compact, compressible message.

??? example "Worked Example"

    _Input data:_
    
    | Timestamp            | Channel 16 (`double`) |
    |----------------------|-----------------------|
    | 2021-05-04T11:50:55Z | 12.7                  |
    | 2021-05-04T11:50:59Z | 14.9                  |
    | 2021-05-04T11:51:04Z | 21.2                  |

    _Encoded:_

    | Field                    | Value                 | Note                                                         |
    |--------------------------|-----------------------|--------------------------------------------------------------|
    | `channel_id`             | `16`                  | Can only represent a single channel at a time.               |
    | `start_timestamp`        | `1620129055000000000` | Nanoseconds since Unix epoch (UTC).                          |
    | `timestamp_deltas_scale` | `1000000000`          | Input data has timestamps at 1 second resolution.            |
    | `timestamp_deltas`       | `[0, 4, 5]`           | Note that the deltas are relative to each other.             |
    | `buffer`                 | `0x 6666666666662940 CDCCCCCCCCCC2D40 3333333333333540` | Little-endian bytes (hex). |

!!! important

    Bursts of data must never overlap each other.

Data is served from the [REST API](../../api/#operation/get-timestamped-data) in chunks using this list type:

```protobuf
message TimestampedDataList {
    // Zero or more timestamped data items.
    repeated TimestampedData timestamped_data = 1;
}
```

### Code Samples

=== "C# Sample &mdash; `double` values"

    Using _MAT.OCS.RTA.API_ to encode `double`-precision data:

    ``` C#
    static TimestampedData Encode(uint channelId, long[] timestamps, double[] samples)
    {
        var burst = new TimestampedData { ChannelId = channelId };
        burst.SetTimestamps(timestamps);
        burst.Buffer = ByteString.CopyFrom(MemoryMarshal.AsBytes(samples.AsSpan()));
        return burst;
    }
    ```

    !!! notes

        * `SetTimestamps` is an extension method, setting the `start_timestamp`, `timestamp_deltas_scale` and `timestamp_deltas`.  
          The scale is calculated from the [Greatest Common Divisor](https://www.freecodecamp.org/news/euclidian-gcd-algorithm-greatest-common-divisor/). This has a neligible peformance impact.  
          There is a corresponding `FillTimestamps` method to unpack timestamps into an array.
        * [`MemoryMarshal.AsBytes(...)`](https://docs.microsoft.com/en-us/dotnet/api/system.runtime.interopservices.memorymarshal.asbytes?view=net-5.0) is the most efficient way to cast values to a buffer. [`Buffer.BlockCopy`](https://docs.microsoft.com/en-us/dotnet/api/system.buffer.blockcopy?view=net-5.0) is the .NET Framework alternative but involves an extra array and copy operation.
        * Memory allocation is the biggest performance bottleback. Both `SetTimestamps` and `ByteString.CopyFrom` allocate on the heap and this cannot be avoided using the C# generated protobuf classes, but try to reuse the `timestamps` and `samples` arrays or rent them from an [ArrayPool](https://docs.microsoft.com/en-us/dotnet/api/system.buffers.arraypool-1?view=net-5.0).

    The configuration should look like this:

    ``` C#
    new ChannelBuilder(channelId, 0L, DataType.Double64Bit, ChannelDataSource.Timestamped)
    ```

    !!! info

        * The `Interval` should always be `0` for Timestamped Data
        * The `DataType` must match the values array type (`double[]` in this sample)
        * The `DataSource` must be `ChannelDataSource.Timestamped` 
        * The `ByteOrder` should be little-endian &mdash; but this is already the default

=== "C# Sample &mdash; `ushort` values"

    Representing `ushort` (unsigned 16-bit) values is almost exactly the same:

    ``` C#
    static TimestampedData Encode(uint channelId, long[] timestamps, ushort[] samples)
    {
        var burst = new TimestampedData { ChannelId = channelId };
        burst.SetTimestamps(timestamps);
        burst.Buffer = ByteString.CopyFrom(MemoryMarshal.AsBytes(samples.AsSpan()));
        return burst;
    }
    ```

    But the configuration does need to be updated for ATLAS:

    ``` C#
    new ChannelBuilder(channelId, 0L, DataType.Unsigned16Bit, ChannelDataSource.Timestamped)
    ```

=== "C# Sample &mdash; reading `TimestampedDataList`"

    ```c#
    private static void DecodeList<T>(TimestampedDataList dataList) where T : struct
    {
        foreach (var data in dataList.TimestampedData)
        {
            var sampleCount = data.TimestampDeltas.Count;
            var timestamps = ArrayPool<long>.Shared.Rent(sampleCount);
            try
            {
                data.FillTimestamps(timestamps); // valid up to sampleCount
                var samples = MemoryMarshal.Cast<byte, T>(data.Buffer.Span);

                // consume timestamps and samples ...
            }
            finally
            {
                ArrayPool<long>.Shared.Return(timestamps);
            }
        }
    }
    ```

## Periodic Data

This representation encodes short bursts of data sampled at regular intervals, for one channel.

### Schema

```protobuf
message PeriodicData {
	// Channel Id.
	uint32 channel_id = 1;

	// Start timestamp, in nanoseconds relative to the Unix epoch.
	sfixed64 start_timestamp = 2;

	// Interval between samples (ns).
	int64 interval = 3;
	
	// Number of samples in the buffer.
	int32 samples = 4;

	// Buffer of samples. Every sample must be encoded to alike and to the same width
	// so the buffer is splittable; the rest of the encoding is defined in configuration.
	bytes buffer = 5;
}
```

This schema can be significantly more efficient than [Timestamped Data](#timestamped-data) because it does not need to represent timestamps for each value.
It is also a bit easier to encode.

The `interval` field enables a burst to be split by timestamp without reference to configuration. 

!!! tip

    This representation is ideal for samples from hardware or software with an accurate schedule.  
    Clock-drift and other timing discontinuities can be handled by starting a new burst.

??? example "Worked Example"

    _Input data:_
    
    | Timestamp            | Channel 16 (`double`) |
    |----------------------|-----------------------|
    | 2021-05-04T11:50:55Z | 12.7                  |
    | 2021-05-04T11:50:60Z | 14.9                  |
    | 2021-05-04T11:51:10Z | 21.2                  |

    _Encoded:_

    There is a timing discontinuity (skipped sample), so the data must be split into two bursts:

    | Field             | Value                 | Note                                           |
    |-------------------|-----------------------|------------------------------------------------|
    | `channel_id`      | `16`                  | Can only represent a single channel at a time. |
    | `start_timestamp` | `1620129055000000000` | Nanoseconds since Unix epoch (UTC).            |
    | `interval`        | `5000000000`          | Timestamps at 5 second intervals.              |
    | `samples`         | `2`                   | Number of samples.                             |
    | `buffer`          | `0x 6666666666662940 CDCCCCCCCCCC2D40` | Little-endian bytes (hex).    |

    | Field             | Value                 | Note                                           |
    |-------------------|-----------------------|------------------------------------------------|
    | `channel_id`      | `16`                  | Can only represent a single channel at a time. |
    | `start_timestamp` | `1620129070000000000` | Nanoseconds since Unix epoch (UTC).            |
    | `interval`        | `5000000000`          | Timestamps at 5 second intervals.              |
    | `samples`         | `1`                   | Number of samples.                             |
    | `buffer`          | `0x 3333333333333540` | Little-endian bytes (hex).                     |

!!! important

    Bursts of data must never overlap each other.

Data is served from the [REST API](../../api/#operation/get-periodic-data) in chunks using this list type:

```protobuf
message PeriodicDataList {
    // Zero or more periodic data items.
    repeated PeriodicData periodic_data = 1;
}
```

### Code Samples

=== "C# Sample &mdash; `double` values"

    Using _MAT.OCS.RTA.API_ to encode `double`-precision data:

    ``` C#
    static PeriodicData Encode(uint channelId, long startTimestamp, long interval, double[] samples)
    {
        return new PeriodicData
        {
            ChannelId = channelId,
            StartTimestamp = startTimestamp,
            Interval = interval,
            Samples = samples.Length,
            Buffer = ByteString.CopyFrom(MemoryMarshal.AsBytes(samples.AsSpan()))
        };
    }
    ```

    !!! notes

        * [`MemoryMarshal.AsBytes(...)`](https://docs.microsoft.com/en-us/dotnet/api/system.runtime.interopservices.memorymarshal.asbytes?view=net-5.0) is the most efficient way to cast values to a buffer. [`Buffer.BlockCopy`](https://docs.microsoft.com/en-us/dotnet/api/system.buffer.blockcopy?view=net-5.0) is the .NET Framework alternative but involves an extra array and copy operation.
        * Memory allocation is the biggest performance bottleback. `ByteString.CopyFrom` allocates on the heap and this cannot be avoided using the C# generated protobuf classes, but try to reuse `samples` array or rent it from an [ArrayPool](https://docs.microsoft.com/en-us/dotnet/api/system.buffers.arraypool-1?view=net-5.0).

    The configuration should look like this:

    ``` C#
    new ChannelBuilder(channelId, interval, DataType.Double64Bit, ChannelDataSource.Periodic)
    ```

    !!! info

        * The `Interval` should always match the interval in the `PeriodicData` messages
        * The `DataType` must match the values array type (`double[]` in this sample)
        * The `DataSource` must be `ChannelDataSource.Periodic` 
        * The `ByteOrder` should be little-endian &mdash; but this is already the default

=== "C# Sample &mdash; `ushort` values"

    Representing `ushort` (unsigned 16-bit) values is almost exactly the same:

    ``` C#
    static PeriodicData Encode(uint channelId, long startTimestamp, long interval, ushort[] samples)
    {
        return new PeriodicData
        {
            ChannelId = channelId,
            StartTimestamp = startTimestamp,
            Interval = interval,
            Samples = samples.Length,
            Buffer = ByteString.CopyFrom(MemoryMarshal.AsBytes(samples.AsSpan()))
        };
    }
    ```

    But the configuration does need to be updated for ATLAS:

    ``` C#
    new ChannelBuilder(channelId, interval, DataType.Unsigned16Bit, ChannelDataSource.Periodic)
    ```

=== "C# Sample &mdash; reading `PeriodicDataList`"

    ```c#
    private static void DecodeList<T>(PeriodicDataList dataList) where T : struct
    {
        foreach (var data in dataList.PeriodicData)
        {
            var startTimestamp = data.StartTimestamp;
            var samples = MemoryMarshal.Cast<byte, T>(data.Buffer.Span);

            // ...
        }
    }
    ```

## Row Data

This representation encodes packed buffers covering multiple channels.

### Schema

```protobuf
message RowData {
	// Channel Ids, in the order they are present in the buffer.
	repeated uint32 channel_ids = 1;

	// Timestamp, in nanoseconds relative to the Unix epoch.
	sfixed64 timestamp = 2;

	// Buffer of samples.
	// The encoding may vary by channel, as defined in configuration.
	bytes buffer = 3;
}
```

This encoding cannot be parsed without reference to configuration.

??? example "Worked Example"

    _Input data:_
    
    | Timestamp            | Channel 16 (`double`) | Channel 17 (`ushort`) | Channel 18 (`float`) |
    |----------------------|-----------------------|-----------------------|----------------------|
    | 2021-05-04T11:50:55Z | 12.7                  | 234                   | 0.7                  |

    _Encoded:_

    | Field                    | Value                 | Note                                       |
    |--------------------------|-----------------------|--------------------------------------------|
    | `channel_ids`            | `[16, 17, 18]`        | Can represent multiple channels at a time. |
    | `timestamp`              | `1620129055000000000` | Nanoseconds since Unix epoch (UTC).        |
    | `buffer`                 | `0x 6666666666662940 EA00 3333333F` | Little-endian bytes (hex).   |

!!! important

    Channels need to be consistently grouped together &mdash; for example, channels `[16, 17, 18]` above must be the same in all bursts.

Data is served from the [REST API](../../api/#operation/get-row-data) in chunks using this list type:

```protobuf
message RowDataList {
    // Zero or more row data items.
    repeated RowData row_data = 1;
}
```

### Code Samples

=== "C# Sample"

    Using _MAT.OCS.RTA.API_ to encode data as in _Worked Example_ above:

    ``` C#
    static RowData Encode(long timestamp, uint[] channelIds, double x, ushort y, float z)
    {
        const int xOffset = 0, xLength = sizeof(double);
        const int yOffset = xOffset + xLength, yLength = sizeof(ushort);
        const int zOffset = yOffset + yLength, zLength = sizeof(float);

        Span<byte> bytes = stackalloc byte[xLength + yLength + zLength];
        BitConverter.TryWriteBytes(bytes.Slice(xOffset, xLength), x);
        BitConverter.TryWriteBytes(bytes.Slice(yOffset, yLength), y);
        BitConverter.TryWriteBytes(bytes.Slice(zOffset, zLength), z);

        return new RowData
        {
            ChannelIds = {channelIds},
            Timestamp = timestamp,
            Buffer = ByteString.CopyFrom(bytes)
        };
    }
    ```

    The configuration should look like this:

    ``` C#
    var xCh = new ChannelBuilder(16, 0L, DataType.Double64Bit, ChannelDataSource.RowData);
    var yCh = new ChannelBuilder(17, 0L, DataType.Unsigned16Bit, ChannelDataSource.RowData);
    var zCh = new ChannelBuilder(18, 0L, DataType.FloatingPoint32Bit, ChannelDataSource.RowData);
    ```

    !!! info

        * The `Interval` should always be 0, since the data is non-periodic
        * The `DataType` must match the values array type (`double[]` in this sample)
        * The `DataSource` must be `ChannelDataSource.Periodic` 
        * The `ByteOrder` should be little-endian &mdash; but this is already the default

=== "C# Sample &mdash; reading `RowDataList`"

    ```c#
    private static void DecodeList(RowDataList dataList)
    {
        foreach (var data in dataList.RowData)
        {
            var timestamp = data.Timestamp;
            var packedSamples = data.Buffer.Span;

            // ...
        }
    }
    ```

## Event

This representation is a moment in time with some associated data.  
For example, this could represent a switch being toggled.

ATLAS treats events quite differently to sampled data:

* dedicated display for listing and filtering
* rendered on the waveform timeline, rather than the plot area
* can capture the event multiple times in the same instant

Events can carry status text &mdash; or up to three values which are then formatted to text.

### Schema

``` protobuf
message Event {
	// Unique event definition id.
	// This should correspond to an Event Definition in configuration.
	int32 event_definition_id = 1;

	// App name/identifier as a qualifier in case there is ambiguity.
	string app_name = 2;

	// Timestamp, in nanoseconds relative to the session epoch.
	sfixed64 timestamp = 3;

	// Text representation of the event (may be empty).
	// If empty, this will be substituted for formatted raw_data
	string status_text = 4;

	// Raw data values associated with the event.
	// The corresponding Event Definition specifies conversions
	// to be applied to this data to produce formatted status_text (if needed).
	repeated double raw_data = 5;
}
```

Events are described in configuration, by `event_definition_id` (located in an app with the corresponding `app_name`).

!!! important

    We recommend that event definition ids are globally-unique, to avoid tool compatibility issues.

Data is served from the [REST API](../../api/#operation/get-events) in chunks using this list type:

```protobuf
message EventsList {
    // Zero or more events.
    repeated Event events = 1;
}
```

### Code Samples

=== "C# Sample with Text"

    ``` C#
    static Event EncodeWithText(int eventDefinitionId, string appName, long timestamp, string text)
    {
        return new Event
        {
            EventDefinitionId = eventDefinitionId,
            AppName = appName,
            Timestamp = timestamp,
            StatusText = text
        };
    }
    ```

    The configuration should look like this:

    ``` C#
    new ApplicationBuilder(appName)
    {
        EventDefinitions =
        {
            new EventDefinitionBuilder(eventDefinitionId,
                $"{eventDefinitionId:X4}:{appName} This is an example event")
            {
                Priority = EventPriority.Medium
            }
        }
    };
    ```

    !!! important

        Format the event definition description to include the `Id` and `AppName` as a prefix, as shown:

        * Event Definition Id as four-digit hex
        * ':' separator
        * App name

        This avoids a known issue with ATLAS event filtering and may become unnecessary in future.

=== "C# Sample with Values"

    ``` C#
    static Event EncodeWithValues(int eventDefinitionId, string appName, long timestamp, double[] values)
    {
        return new Event
        {
            EventDefinitionId = eventDefinitionId,
            AppName = appName,
            Timestamp = timestamp,
            RawData = { values }
        };
    }
    ```

    The configuration is unchanged:

    ``` C#
    new ApplicationBuilder(appName)
    {
        EventDefinitions =
        {
            new EventDefinitionBuilder(eventDefinitionId,
                $"{eventDefinitionId:X4}:{appName} This is an example event")
            {
                Priority = EventPriority.Medium
            }
        }
    };
    ```

    To change the default formatting of the event data, add ==Text Conversions==.
