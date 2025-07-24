# Chunks

The [RTA API](../../api/index.md) streams data to the client in _Chunks_.

Each chunk represents one[^1] [Channel](../configuration/channels-parameters.md#channels), and covers a contiguous span of records.

A chunk is the minimum unit of data returned by a request.  
Given the [Constraints](#constraints) listed below, clients must expect that a response will over-fetch beyond requested time-bounds.

## Column-Oriented Data

This is an example of _column-oriented data_.

Some databases and file formats work this way natively, such as [Apache Parquet](https://parquet.apache.org/).  
Many stores are _row-oriented_ &mdash; including most relational databases.

??? example

    <a id="example"></a>Imagine a database table with a time column and three data columns:

    | Time     | alpha | beta  | gamma |
    |----------|-------|-------|-------|
    | 12:10:05 | `A01` | `B01` | `C01` |
    | 12:10:15 | `A02` | `B02` | `C02` |
    | 12:10:25 | `A03` | `B03` | `C03` |
    | 12:10:35 | `A04` | `B04` | `C04` |
    | 12:10:45 | `A05` | `B05` | `C05` |
    | 12:10:55 | `A06` | `B06` | `C06` |
    | 12:11:05 | `A07` | `B07` | `C07` |
    | 12:11:15 | `A08` | `B08` | `C08` |
    | 12:11:25 | `A09` | `B09` | `C09` |
    | 12:11:35 | `A10` | `B10` | `C10` |
    | 12:11:45 | `A11` | `B11` | `C11` |
    | 12:11:55 | `A12` | `B12` | `C12` |
    | 12:12:05 | `A13` | `B13` | `C13` |
    | 12:12:15 | `A14` | `B14` | `C14` |

    If we started collating records together into [Periodic Data](index.md#periodic-data), a single result might look like this:

    | Channel | Start Time | Samples | Result Buffer  |
    |---------|------------|---------|----------------|
    | alpha   | 12:10:05   | 3       |`[A01 A02 A03]` |

    A chunk is based on list types ([`PeriodicData` ➔ `PeriodicDataList`](index.md#periodic-data)), so each would contain multiple results.

    If each chunk covered one minute, requesting the _alpha_ channel could look like this:

    | Channel | Start Time | End Time | Results                         |
    |---------|------------|----------|---------------------------------|
    | alpha   | 12:10:05   | 12:10:55 | `[A01 A02 A03]` `[A04 A05 A06]` |
    | alpha   | 12:11:05   | 12:11:55 | `[A07 A08 A09]` `[A10 A11 A12]` |
    | alpha   | 12:12:05   | 12:12:15 | `[A13 A14]`                     |

To turn most row-oriented data into chunks:

1. Collate samples into [`PeriodicData`](index.md#periodic-data) or [`TimestampedData`](index.md#timestamped-data) results;
2. Collate results into Lists (e.g. [`PeriodicData` ➔ `PeriodicDataList`](index.md#periodic-data)) and [encode to chunks](#using-the-api) as shown below.

## Using the API

The _MAT.OCS.RTA.Model_ [NuGet Package](../../downloads.md#nuget-binaries) has a `Chunk` class that holds the data in serialized and compressed form.

For example:

```c#
var data = new PeriodicDataList
{
    PeriodicData =
    {
        // ... add results here
    }
};

var chunkData = ChunkData.EncodePooled(ChunkDataMemoryPool.Shared, data, new[] {channelId});
var chunk = new Chunk(dataStartTime, dataEndTime, chunkData);
```

This applies fast LZ4 compression by default and uses a Memory Pool for low-overhead buffer reuse.

!!! info "Compression"

    [Protobuf](https://developers.google.com/protocol-buffers) is already a compact binary serialization.

    Some parts of the data schema &mdash; such as [`TimestampedData`](index.md#timestamped-data) &mdash; use delta-compression so that protobuf [variable length encoding](https://developers.google.com/protocol-buffers/docs/encoding) produces a more compact output with more repeating byte sequences. These repeating sequences are then further compressed with LZ4, which is a very fast algorithm that typically achieves 2:1 compression on this data with no noticeable loss of throughput.

Make sure you respect the [Constraints](#constraints) listed below.

The _MAT.OCS.RTA.Services.AspNetCore_ [NuGet Package](../../downloads.md#nuget-binaries) provides formatters to send a `ChunkedResult` (wrapping a `Chunk` stream) back to the client as the [`application/vnd.mat.protobuf+chunked` wire-format](../protobuf/net_chunks.md).

## Constraints

This section describes some important constraints, using RFC&nbsp;2119 language (MUST, SHOULD, etc).

These are important if you are implementing a [Data Service](../../../../extending-atlas/rta/introduction/data-services.md).

### Size Limits

To ensure performance and reliability in all components:

* Each result (e.g. [`PeriodicData`](index.md#periodic-data)) SHOULD contain up to 128 samples and MUST NOT exceed 10,000 samples.
* Each list SHOULD serialize to no more than 64 KiB before compression and MUST NOT exceed 4 MiB.
* Each list SHOULD cover 1-100 seconds and MUST NOT exceed 1000 seconds.

### Time Ordering

Data MUST be returned in time order:

* Samples MUST be ordered within results
* Results MUST be ordered within chunks
* Chunks MUST be ordered within channels

The ordering of channels with respect to each other does not matter.  
For example, if returning data for _alpha_ and _beta_ in the [example above](#example), all of these orderings are valid:

=== "Example 1"

    | Channel | Start Time | End Time | Results                         |
    |---------|------------|----------|---------------------------------|
    | alpha   | 12:10:05   | 12:10:55 | `[A01 A02 A03]` `[A04 A05 A06]` |
    | alpha   | 12:11:05   | 12:11:55 | `[A07 A08 A09]` `[A10 A11 A12]` |
    | alpha   | 12:12:05   | 12:12:15 | `[A13 A14]`                     |
    | beta    | 12:10:05   | 12:10:55 | `[B01 B02 B03]` `[B04 B05 B06]` |
    | beta    | 12:11:05   | 12:11:55 | `[B07 B08 B09]` `[B10 B11 B12]` |
    | beta    | 12:12:05   | 12:12:15 | `[B13 B14]`                     |

=== "Example 2"

    | Channel | Start Time | End Time | Results                         |
    |---------|------------|----------|---------------------------------|
    | alpha   | 12:10:05   | 12:10:55 | `[A01 A02 A03]` `[A04 A05 A06]` |
    | beta    | 12:10:05   | 12:10:55 | `[B01 B02 B03]` `[B04 B05 B06]` |
    | alpha   | 12:11:05   | 12:11:55 | `[A07 A08 A09]` `[A10 A11 A12]` |
    | beta    | 12:11:05   | 12:11:55 | `[B07 B08 B09]` `[B10 B11 B12]` |
    | alpha   | 12:12:05   | 12:12:15 | `[A13 A14]`                     |
    | beta    | 12:12:05   | 12:12:15 | `[B13 B14]`                     | 

=== "Example 3"

    | Channel | Start Time | End Time | Results                         |
    |---------|------------|----------|---------------------------------|
    | beta    | 12:10:05   | 12:10:55 | `[B01 B02 B03]` `[B04 B05 B06]` |
    | beta    | 12:11:05   | 12:11:55 | `[B07 B08 B09]` `[B10 B11 B12]` |
    | alpha   | 12:10:05   | 12:10:55 | `[A01 A02 A03]` `[A04 A05 A06]` |
    | beta    | 12:12:05   | 12:12:15 | `[B13 B14]`                     | 
    | alpha   | 12:11:05   | 12:11:55 | `[A07 A08 A09]` `[A10 A11 A12]` |
    | alpha   | 12:12:05   | 12:12:15 | `[A13 A14]`                     |

This constraint enables a client to resume an interrupted download, since it can track progress through a request.

### No Overlaps

When a session has reached a `closed` state:

* Each result (e.g. [`PeriodicData`](index.md#periodic-data)) MUST NOT overlap any other result.
* Each chunk MUST NOT overlap any other chunk.

These constraints do not apply while a session is still `open`, since it may be difficult to maintain consistency between the [REST API](../../api/index.md) and [Live Streaming Data](../live/index.md), and new data may force re-chunking to maintain the [Size Limits](#size-limits) constraint.

### Stable Chunks

Chunks MUST have stable boundaries once the session has closed.

This means that if a sample is included in request, it always appears in the same chunk with the same start and end time.

Using the [example above](#example):

| Channel | Start Time | End Time | Results                         |
|---------|------------|----------|---------------------------------|
| alpha   | 12:10:05   | 12:10:55 | `[A01 A02 A03]` `[A04 A05 A06]` |
| alpha   | 12:11:05   | 12:11:55 | `[A07 A08 A09]` `[A10 A11 A12]` |
| alpha   | 12:12:05   | 12:12:15 | `[A13 A14]`                     |

If the request bounds are _start: 12:10:10.00_, _end: 12:11:05.00_, the response is:

| Channel | Start Time | End Time | Results                         |
|---------|------------|----------|---------------------------------|
| alpha   | 12:10:05   | 12:10:55 | `[A01 A02 A03]` `[A04 A05 A06]` |
| alpha   | 12:11:05   | 12:11:55 | `[A07 A08 A09]` `[A10 A11 A12]` |

This response includes samples outside the request bounds:

* `A01` (12:10:05) is included because the unbounded response chunk boundary is 12:10:05
* `A08`-`A12` (12:11:15 - 12:11:55) are included because `A07` is inside the (inclusive) request bounds so the whole chunk is returned

There are two main approaches to implement this:

<a id="time-based-chunking">time-based chunking:</a>
:   Round the request time-bounds (if any) outwards &mdash; generally just by dropping precision.  
    The _MAT.OCS.RTA.Services_ [NuGet Package](../../downloads.md#nuget-binaries) provides a `ChunkTime` utility to help with this.

    This is easy to implement but requires some knowledge of the expected data rate so the chunks are neither too small nor exceed the [Size Limits](#size-limits). Data rates could be communicated by convention, configuration or the [Schema Mapping Service](../../services/rta-schemamappingsvc/README.md).

    !!! important

        The chunk start and end time must still reflect the data contained inside the chunk, rather than the expanded time bounds.

        This is important so that clients can accurately assess what data they have, particularly at the leading edge of a live streaming session.

        Consecutive chunks should appear to have gaps between them if placed on a timeline.

<a id="storage-based-chunking">storage-based chunking:</a>
:   Split the request based on storage pages: for example, pages within a memory-mapped file.

    This can be more flexible when data rates vary signficantly, but typically needs the data to be stored by time so the [Time Ordering](#time-ordering) constraint is not broken.

!!! info

    This constraint is annoying to fulfil, and _may_ be dropped in future if it can be shown that it does not impact caching.

    For now, assume that this requirement is mandatory.

[^1]: Except for [Row Data](index.md#row-data), which represents a set of [channels](../configuration/channels-parameters.md#channels) encoded into a packed buffer