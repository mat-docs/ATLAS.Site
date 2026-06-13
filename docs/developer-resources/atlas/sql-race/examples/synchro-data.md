# Writing Synchro (Variable-Rate) Data

Synchro (engine-synchronous) channels store one sample per engine event &mdash; typically once per revolution or once per firing cycle &mdash; rather than at a fixed clock rate. Because engine speed varies continuously, the time between samples changes from one sample to the next, so the timing of every sample must be carried *in the data itself* rather than implied by a fixed channel interval.

This guide explains how synchro data is modelled and written with the **SQLRace API**: how to create a synchro channel, how the variable timing is encoded (inter-sample intervals, the *delta scale*, and the binary packet format), how to write packets with `AddSynchroChannelData`, and how to do all of this efficiently at scale.

For the general session/configuration lifecycle (initialising SQLRace, creating a session, metadata, laps, finalising), see [Creating an SSN2 Session from Scratch](create-session.md) &mdash; this page focuses only on what is different for synchro channels.

---

## When to Use Synchro

In ATLAS, **synchro** channels are fundamentally different from time-based (**row**/periodic) channels. They are sampled in the *angular* domain &mdash; one value per engine revolution, per TDC, or per firing event &mdash; so the effective sample rate rises and falls with RPM.

| Scenario | Use Synchro? | Reason |
|----------|:---:|--------|
| Cylinder pressure (per-revolution) | :material-check: | One sample per crank revolution &mdash; rate tracks RPM |
| Exhaust gas temperature (per-cylinder firing) | :material-check: | Sampled at TDC of each cylinder &mdash; irregular in time |
| Lambda / AFR from wideband sensor | :material-check: | Logged once per firing cycle, tied to engine speed |
| Knock intensity per cylinder | :material-check: | One measurement per combustion event |
| Injector pulse width | :material-check: | One value per injection event, rate varies with RPM |
| CAN-triggered gear position | :material-check: | Messages arrive only on gear change &mdash; completely aperiodic |
| Chassis accelerometers at fixed 1 kHz | :material-close: | Constant rate &mdash; use a standard row channel |
| Damper potentiometers at fixed 500 Hz | :material-close: | Constant rate &mdash; use a standard row channel |

A single session can freely mix row channels (fixed-rate chassis sensors) and synchro channels (per-revolution engine sensors); ATLAS interpolates between the two domains automatically when overlaying traces.

---

## The Synchro Write Pipeline

Writing a synchro parameter involves two distinct phases:

1. **Configuration** (once per parameter) &mdash; create a configuration set containing a parameter group, application group, conversion, a **synchro** channel, and the parameter, then commit and activate it. This is the same machinery as any other parameter, with one difference: the channel uses `ChannelDataSourceType.Synchro`.
2. **Data** (repeated) &mdash; for each block of samples: difference the timestamps into intervals, compute a *delta scale*, pack samples and scaled intervals into a binary payload, and write it with `AddSynchroChannelData`.

### Step 1 &mdash; Create the configuration set

Every parameter belongs to a configuration set &mdash; a collection of channels, conversions, and groups that describes the structure of the data.

=== "C#"

    ```csharp
    var configMgr = ConfigurationSetManager.CreateConfigurationSetManager();
    var config = configMgr.Create(session.ConnectionString, configId, "Synchro config");
    ```

=== "Python"

    ```python
    config_mgr = ConfigurationSetManager.CreateConfigurationSetManager()
    config = config_mgr.Create(session.ConnectionString, config_id, "Synchro config")
    ```

=== "MATLAB"

    ```matlab
    configMgr = ConfigurationSetManager.CreateConfigurationSetManager();
    config = configMgr.Create(session.ConnectionString, configId, "Synchro config");
    ```

### Step 2 &mdash; Define the parameter group and application group

A **parameter group** is a logical grouping of related parameters (e.g. `CombustionGroup`). An **application group** ties one or more parameter groups to an application context (e.g. `Engine`) and controls how ATLAS organises parameters in its browser tree. Synchro channels do not use RDA, so set `SupportsRda = false`.

=== "C#"

    ```csharp
    var group = new ParameterGroup("CombustionGroup", "CombustionGroup");
    config.AddParameterGroup(group);

    var groupIds = new List<string> { group.Identifier };
    var app = new ApplicationGroup("Engine", "Engine", null, groupIds) { SupportsRda = false };
    config.AddGroup(app);
    ```

=== "Python"

    ```python
    group = ParameterGroup("CombustionGroup", "CombustionGroup")
    config.AddParameterGroup(group)

    group_ids = List[String]()
    group_ids.Add(group.Identifier)
    app = ApplicationGroup("Engine", "Engine", None, group_ids)
    app.SupportsRda = False  # synchro channels do not use RDA
    config.AddGroup(app)
    ```

=== "MATLAB"

    ```matlab
    group = ParameterGroup("CombustionGroup", "CombustionGroup");
    config.AddParameterGroup(group);

    groupIds = NET.createGeneric('System.Collections.Generic.List', {'System.String'});
    groupIds.Add(group.Identifier);
    app = ApplicationGroup("Engine", "Engine", [], groupIds);
    app.SupportsRda = false;   % synchro channels do not use RDA
    config.AddGroup(app);
    ```

### Step 3 &mdash; Add a conversion

A **conversion** maps raw channel values to engineering units. For synchro channels carrying `float64` data, a simple 1:1 rational conversion is sufficient &mdash; the raw value equals the engineering value. The conversion also carries the display format and unit.

=== "C#"

    ```csharp
    var conversion = RationalConversion.CreateSimple1To1Conversion(
        "CONV_CylPressure:Engine",  // conversion name
        "bar",                      // engineering unit
        "%5.2f");                   // display format string
    config.AddConversion(conversion);
    ```

=== "Python"

    ```python
    conversion = RationalConversion.CreateSimple1To1Conversion(
        "CONV_CylPressure:Engine",  # conversion name
        "bar",                      # engineering unit
        "%5.2f")                    # display format string
    config.AddConversion(conversion)
    ```

=== "MATLAB"

    ```matlab
    conversion = RationalConversion.CreateSimple1To1Conversion( ...
        "CONV_CylPressure:Engine", ...  % conversion name
        "bar", ...                      % engineering unit
        "%5.2f");                       % display format string
    config.AddConversion(conversion);
    ```

### Step 4 &mdash; Create the synchro channel

This is the one step unique to synchro data. The channel is created with **`ChannelDataSourceType.Synchro`** (rather than `Periodic`/`RowData`). The interval argument is unused for synchro channels &mdash; pass `0`. Synchro channels typically store `Double64Bit` values.

=== "C#"

    ```csharp
    uint channelId = session.ReserveNextAvailableRowChannelId();

    var channel = new Channel(
        channelId,
        "CylPressure_SynchroChannel",
        0,                              // interval — unused for synchro
        DataType.Double64Bit,
        ChannelDataSourceType.Synchro); // marks this as a synchro channel
    config.AddChannel(channel);
    ```

=== "Python"

    ```python
    channel_id = session.ReserveNextAvailableRowChannelId()

    channel = Channel(
        channel_id,
        "CylPressure_SynchroChannel",
        0,                               # interval — unused for synchro
        DataType.Double64Bit,
        ChannelDataSourceType.Synchro)   # marks this as a synchro channel
    config.AddChannel(channel)
    ```

=== "MATLAB"

    ```matlab
    channelId = session.ReserveNextAvailableRowChannelId();

    channel = Channel( ...
        channelId, ...
        "CylPressure_SynchroChannel", ...
        0, ...                               % interval — unused for synchro
        DataType.Double64Bit, ...
        ChannelDataSourceType.Synchro);      % marks this as a synchro channel
    config.AddChannel(channel);
    ```

### Step 5 &mdash; Create the parameter

The **parameter** binds the channel, the conversion, and the group hierarchy together, and carries the display/warning limits ATLAS uses for scaling traces.

=== "C#"

    ```csharp
    var parameter = new Parameter(
        "CylPressure:Engine",       // identifier (Name:AppGroup)
        "CylPressure",              // display name
        "Peak cylinder pressure",   // description
        120, 0,                     // display max, display min
        120, 0,                     // warning max, warning min
        0,                          // offset
        0xffffffff,                 // data bit mask
        0,                          // error bit mask
        "CONV_CylPressure:Engine",  // conversion name
        new List<string> { "CombustionGroup" },
        channelId);
    config.AddParameter(parameter);
    ```

=== "Python"

    ```python
    parameter = Parameter(
        "CylPressure:Engine",       # identifier (Name:AppGroup)
        "CylPressure",              # display name
        "Peak cylinder pressure",   # description
        120, 0,                     # display max, display min
        120, 0,                     # warning max, warning min
        0,                          # offset
        0xffffffff,                 # data bit mask
        0,                          # error bit mask
        "CONV_CylPressure:Engine",  # conversion name
        group_ids,                  # parameter group identifiers
        channel_id)
    config.AddParameter(parameter)
    ```

=== "MATLAB"

    ```matlab
    parameter = Parameter( ...
        "CylPressure:Engine", ...       % identifier (Name:AppGroup)
        "CylPressure", ...              % display name
        "Peak cylinder pressure", ...   % description
        120, 0, ...                     % display max, display min
        120, 0, ...                     % warning max, warning min
        0, ...                          % offset
        uint32(hex2dec('ffffffff')), ...% data bit mask
        0, ...                          % error bit mask
        "CONV_CylPressure:Engine", ...  % conversion name
        groupIds, ...
        channelId);
    config.AddParameter(parameter);
    ```

### Step 6 &mdash; Commit and activate

Commit the configuration set to the session store, then activate it so subsequent data writes target the correct channels.

=== "C#"

    ```csharp
    config.Commit();
    session.UseLoggingConfigurationSet(config.Identifier);
    ```

=== "Python"

    ```python
    config.Commit()
    session.UseLoggingConfigurationSet(config.Identifier)
    ```

=== "MATLAB"

    ```matlab
    config.Commit();
    session.UseLoggingConfigurationSet(config.Identifier);
    ```

[Class Channel](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html) &middot; [Class Parameter](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Parameter.html) &middot; [ConfigurationSetManager](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSetManager.html)

---

## Encoding the Timing

With row data, the interval is constant and declared once on the channel &mdash; 1 ms for 1 kHz, 2 ms for 500 Hz. With synchro data, every gap between consecutive samples can differ, and that timing must be encoded into the payload.

The chart below makes this concrete. Each sample is drawn as a **stem**, with a **Δt ruler** measuring the gap between consecutive samples. Switch between the **time domain** and the **per-rev (event) domain**, and try the different RPM profiles: in time the stems **bunch together as RPM rises** and spread out as it falls, while in the per-rev domain they stay perfectly uniform. The inter-sample intervals and the per-packet **delta scale** (both covered below) update live.

<div class="synchro-timing"></div>

### Inter-sample intervals

Difference the absolute timestamp array to obtain the gap (in nanoseconds) between each pair of consecutive samples. For `N` samples there are `N − 1` intervals.

=== "C#"

    ```csharp
    // timestampsNs: absolute nanosecond timestamps, one per sample
    long[] intervalsNs = new long[timestampsNs.Length - 1];
    for (int i = 0; i < intervalsNs.Length; i++)
        intervalsNs[i] = timestampsNs[i + 1] - timestampsNs[i];
    ```

=== "Python"

    ```python
    # timestamps_ns: absolute nanosecond timestamps, one per sample
    intervals_ns = np.diff(timestamps_ns)
    ```

=== "MATLAB"

    ```matlab
    % timestampsNs: absolute nanosecond timestamps, one per sample
    intervalsNs = diff(timestampsNs);
    ```

**Concrete example** &mdash; five engine revolutions during acceleration from 6 000 to 10 000 RPM:

| Revolution | RPM | Period (60/RPM) | Timestamp (ns) | Interval to next (ns) |
|:---:|:---:|:---:|:---:|:---:|
| 0 | 6 000 | 10.00 ms | 0 | 9 000 000 |
| 1 | 6 667 | 9.00 ms | 9 000 000 | 8 000 000 |
| 2 | 7 500 | 8.00 ms | 17 000 000 | 7 000 000 |
| 3 | 8 571 | 7.00 ms | 24 000 000 | 6 000 000 |
| 4 | 10 000 | 6.00 ms | 30 000 000 | — |

The intervals for this packet are `[9000000, 8000000, 7000000, 6000000]`.

### The delta scale

Within a packet, intervals are stored as **`uint16`** values (0–65 535) to keep the payload compact. To fit nanosecond intervals into two bytes, each interval is divided by a per-packet **delta scale** &mdash; the *greatest common divisor* (GCD) of all intervals in that packet.

```
intervals_ns = [9 000 000, 8 000 000, 7 000 000, 6 000 000]
delta_scale  = gcd(9000000, 8000000, 7000000, 6000000) = 1 000 000
scaled       = intervals_ns / delta_scale = [9, 8, 7, 6]   ← fit easily in uint16
```

SQLRace receives the `delta_scale` alongside the packet and reconstructs the original timing by multiplying each stored interval back up: `9 × 1 000 000 = 9 000 000 ns`. Every packet is self-describing &mdash; **each packet has its own delta scale.**

=== "C#"

    ```csharp
    static long Gcd(long a, long b) { while (b != 0) { (a, b) = (b, a % b); } return a; }

    long deltaScale = intervalsNs[0];
    foreach (long v in intervalsNs) deltaScale = Gcd(deltaScale, v);
    if (deltaScale == 0) deltaScale = 1;
    ```

=== "Python"

    ```python
    # np.gcd.reduce is a vectorised C-level reduction (far faster than a Python loop)
    delta_scale = int(np.gcd.reduce(intervals_ns))
    if delta_scale == 0:
        delta_scale = 1
    ```

=== "MATLAB"

    ```matlab
    deltaScale = intervalsNs(1);
    for v = intervalsNs, deltaScale = gcd(deltaScale, v); end
    if deltaScale == 0, deltaScale = 1; end
    ```

**Three scenarios that show how the delta scale behaves:**

=== "Constant RPM"

    At steady 8 000 RPM, every revolution takes exactly 7 500 000 ns:

    ```
    intervals   = [7500000, 7500000, 7500000, 7500000]
    delta_scale = 7 500 000
    scaled      = [1, 1, 1, 1]      ← maximum compression
    ```

=== "Smoothly varying RPM"

    Acceleration from 6 000 to 10 000 RPM (the running example):

    ```
    intervals   = [9000000, 8000000, 7000000, 6000000]
    delta_scale = 1 000 000
    scaled      = [9, 8, 7, 6]
    ```

=== "Highly irregular (misfire)"

    A misfire causes one abnormally long interval:

    ```
    intervals   = [7500000, 7500000, 22173000, 7500000]
    delta_scale = gcd(...) = 3000
    scaled      = [2500, 2500, 7391, 2500]   ← larger, but still < 65 535
    ```

!!! warning "When the delta scale collapses to 1"

    If the GCD of a packet's intervals is 1 nanosecond (the intervals share no common factor), then `delta_scale = 1` and the scaled intervals equal the raw nanosecond values &mdash; which will almost certainly exceed 65 535 and make the packet impossible to encode. This is common with timestamps derived from floating-point arithmetic (e.g. `60e9 / rpm`). **Quantise intervals to microsecond resolution before computing the GCD** to restore a healthy common factor (see [Interval quantisation](#interval-quantisation) below).

### Splitting into packets

SQLRace does not accept a single monolithic block of synchro data &mdash; it expects **packets**, each with its own base timestamp, delta scale, and byte payload. Two constraints force packet boundaries:

- **Payload size** &mdash; keep each payload comfortably under ~1 MB (see the [silent-discard warning](#performance-at-scale)). A good target is 16 000–48 000 samples per packet.
- **Encoding** &mdash; within a packet, `max_interval / delta_scale` must be ≤ 65 535. If a packet spans an extreme RPM range (e.g. a multi-second stall mixed with high-RPM data), this can overflow; split that packet until every one satisfies the constraint.

A simple, robust algorithm:

```
1. Divide all N samples into chunks of ≤ packet_size (e.g. 32 000)
2. For each chunk:
   a. Compute its intervals and their GCD (delta scale)
   b. If max_interval / delta_scale ≤ 65 535  → emit as a packet
   c. Otherwise                               → split the chunk in half and re-check both halves
3. Repeat until every chunk passes
```

---

## The Binary Payload Format

Each packet is serialised into a contiguous byte buffer that **interleaves** sample values and scaled intervals in strict alternation. The final sample has no trailing interval (there is no "next" sample to measure a gap to).

```
Byte offset  Content                            Size
──────────── ────────────────────────────────  ────
0            sample₀     (float64, little-endian)  8 bytes
8            interval₀   (uint16,  little-endian)  2 bytes
10           sample₁     (float64, little-endian)  8 bytes
18           interval₁   (uint16,  little-endian)  2 bytes
...
(N-1)×10     sampleₙ₋₁   (float64, little-endian)  8 bytes  ← LAST sample, NO interval
```

**Total payload size** for `N` samples: `(N − 1) × 10 + 8` bytes.

**Worked byte-level example** with the 5-revolution data (pressures `[45.2, 52.1, 58.7, 63.4, 70.0]`, scaled intervals `[9, 8, 7, 6]`):

```
Bytes 0–7:    45.2  float64 LE  → 9A 99 99 99 99 99 46 40
Bytes 8–9:    9     uint16  LE  → 09 00
Bytes 10–17:  52.1  float64 LE  → CD CC CC CC CC 0C 4A 40
Bytes 18–19:  8     uint16  LE  → 08 00
Bytes 20–27:  58.7  float64 LE  → 66 66 66 66 66 56 4D 40
Bytes 28–29:  7     uint16  LE  → 07 00
Bytes 30–37:  63.4  float64 LE  → CD CC CC CC CC CC 4F 40
Bytes 38–39:  6     uint16  LE  → 06 00
Bytes 40–47:  70.0  float64 LE  → 00 00 00 00 00 80 51 40
Total: 48 bytes  (5 samples × 10 − 2 = 48)
```

Building the payload:

=== "C#"

    ```csharp
    // samples: double[N], scaled: ushort[N-1]
    using var ms = new MemoryStream((samples.Length - 1) * 10 + 8);
    using var bw = new BinaryWriter(ms);          // BinaryWriter is little-endian
    for (int i = 0; i < samples.Length - 1; i++)
    {
        bw.Write(samples[i]);                     // 8-byte float64
        bw.Write(scaled[i]);                      // 2-byte uint16
    }
    bw.Write(samples[^1]);                        // final sample, no interval
    byte[] payload = ms.ToArray();
    ```

=== "Python"

    ```python
    # Vectorised packing with a NumPy structured array — no per-sample loop.
    paired_dtype = np.dtype([("sample", "<f8"), ("interval", "<u2")])
    paired = np.empty(len(intervals_ns), dtype=paired_dtype)
    paired["sample"] = samples[:-1]
    paired["interval"] = scaled            # must already be uint16-safe (0–65 535)
    payload = paired.tobytes() + samples[-1:].astype("<f8").tobytes()
    ```

=== "MATLAB"

    ```matlab
    % samples: 1xN double, scaled: 1x(N-1) uint16 (assumes a little-endian host)
    buf = zeros(1, (numel(samples)-1)*10 + 8, 'uint8');
    pos = 1;
    for i = 1:numel(samples)-1
        buf(pos:pos+7)   = typecast(samples(i), 'uint8');   % float64 LE
        buf(pos+8:pos+9) = typecast(scaled(i),  'uint8');   % uint16 LE
        pos = pos + 10;
    end
    buf(pos:pos+7) = typecast(samples(end), 'uint8');       % final sample
    payload = buf;
    ```

!!! tip "Avoid per-sample loops in hot paths"

    In Python, the vectorised NumPy structured-array approach packs tens of thousands of samples in microseconds; a `struct.pack` loop is ~100× slower. In C#, a single `BinaryWriter` pass over a pre-sized `MemoryStream` is fine. In MATLAB, prefer a vectorised `typecast`/`reshape` over an element loop for large packets.

---

## Writing the Packet

Each assembled packet is delivered to SQLRace with a single call:

=== "C#"

    ```csharp
    session.AddSynchroChannelData(
        packetTimestamp,   // (1)
        channelId,         // (2)
        sequenceNumber,    // (3)
        deltaScale,        // (4)
        payload);          // (5)
    ```

=== "Python"

    ```python
    session.AddSynchroChannelData(
        packet_timestamp,        # (1)
        channel_id,              # (2)
        Byte(seq % 256),         # (3)
        delta_scale,             # (4)
        payload)                 # (5)
    ```

=== "MATLAB"

    ```matlab
    session.AddSynchroChannelData( ...
        packetTimestamp, ...     % (1)
        channelId, ...           % (2)
        uint8(mod(seq, 256)), ...% (3)
        deltaScale, ...          % (4)
        payload);                % (5)
    ```

1. **`packetTimestamp`** (`long`) &mdash; absolute timestamp in nanoseconds of the **first sample** in this packet. SQLRace reconstructs subsequent timestamps by adding `scaled_interval × deltaScale` cumulatively from this base.
2. **`channelId`** (`uint`) &mdash; the channel created in Step 4. It **must** be a `ChannelDataSourceType.Synchro` channel; passing a row-data channel ID throws an exception.
3. **`sequenceNumber`** (`byte`) &mdash; a per-channel packet counter that increments per packet and wraps at 256 (`seq % 256`). SQLRace uses it to order packets and detect gaps.
4. **`deltaScale`** (`uint`) &mdash; the GCD computed for **this specific packet**. Different packets on the same channel may use different delta scales.
5. **`payload`** (`byte[]`) &mdash; the interleaved buffer from the previous section.

For the 5-revolution single packet (`deltaScale = 1 000 000`, first timestamp `0`), SQLRace unpacks the payload as:

```
Sample 0: value=45.2, timestamp = 0
Sample 1: value=52.1, timestamp = 0        + 9 × 1 000 000 =  9 000 000
Sample 2: value=58.7, timestamp = 9 000 000 + 8 × 1 000 000 = 17 000 000
Sample 3: value=63.4, timestamp = 17 000 000 + 7 × 1 000 000 = 24 000 000
Sample 4: value=70.0, timestamp = 24 000 000 + 6 × 1 000 000 = 30 000 000
```

When the data is split across multiple packets, each call carries its own base timestamp, incremented sequence number, and (potentially) its own delta scale:

=== "C#"

    ```csharp
    // Packet 0: revolutions 0–N
    session.AddSynchroChannelData(tsRev0,   channelId, 0, deltaScalePkt0, bytesPkt0);
    // Packet 1: revolutions N+1–M
    session.AddSynchroChannelData(tsRevNp1, channelId, 1, deltaScalePkt1, bytesPkt1);
    ```

=== "Python"

    ```python
    # Packet 0
    session.AddSynchroChannelData(ts_rev0,   channel_id, Byte(0), delta_scale_0, bytes_0)
    # Packet 1
    session.AddSynchroChannelData(ts_rev_np1, channel_id, Byte(1), delta_scale_1, bytes_1)
    ```

=== "MATLAB"

    ```matlab
    % Packet 0
    session.AddSynchroChannelData(tsRev0,   channelId, uint8(0), deltaScale0, bytesPkt0);
    % Packet 1
    session.AddSynchroChannelData(tsRevNp1, channelId, uint8(1), deltaScale1, bytesPkt1);
    ```

[AddSynchroChannelData](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html)

---

## Reading Synchro Data Back

Synchro channels are read like any other parameter, through a `ParameterDataAccess` (PDA). See [Parameter Data Access](parameter-data-access.md) for the general pattern. Two synchro-specific points:

!!! warning "Reading multiple synchro channels reliably"

    - **Reopen the session per parameter.** Reading several synchro channels from a *single* loaded session is unreliable: the **first** read of a freshly-loaded session always succeeds, but a subsequent `CreateParameterDataAccess` can throw a `NullReferenceException` inside the reader's range logic. Disposing each `ParameterDataAccess` (shown below) is good practice and reduces leaks, but in testing it did **not** fully eliminate the failure &mdash; the robust pattern is to load the session once per parameter so every read is a "first read".
    - **Read over the session's own time range** (`session.StartTime` / `session.EndTime`). Requesting an arbitrary sub-range on a synchro channel can throw inside the reader's range-rounding logic; query the full range and slice in your own code if needed.

=== "C#"

    ```csharp
    using (var pda = session.CreateParameterDataAccess("CylPressure:Engine"))
    {
        int count = pda.GetSamplesCount(session.StartTime, session.EndTime);
        pda.GoTo(session.StartTime);
        var values = pda.GetNextSamples(count);
        // values.Data, values.Timestamp, values.DataStatus
    }
    ```

=== "Python"

    ```python
    pda = session.CreateParameterDataAccess("CylPressure:Engine")
    try:
        count = pda.GetSamplesCount(session.StartTime, session.EndTime)
        pda.GoTo(session.StartTime)
        values = pda.GetNextSamples(count)
    finally:
        pda.Dispose()   # required — see warning above
    ```

=== "MATLAB"

    ```matlab
    pda = session.CreateParameterDataAccess("CylPressure:Engine");
    count = pda.GetSamplesCount(session.StartTime, session.EndTime);
    pda.GoTo(session.StartTime);
    values = pda.GetNextSamples(count);
    pda.Dispose();   % required — see warning above
    ```

---

## Performance at Scale

When you move from thousands of revolutions to hundreds of millions of samples &mdash; a mapping run, a multi-cylinder test-bed log, a full race distance &mdash; small inefficiencies compound. Throughput on a local SQL Server settles around **1.2–1.6 million samples/second** for a single channel once configuration overhead is amortised, with the higher end at the 32k–48k packet sweet spot.

!!! danger "Maximum payload size — silent data loss above ~1 MB"

    The maximum byte payload accepted by `AddSynchroChannelData` is approximately **1 MB** (~100 000 `float64` samples). Larger payloads are accepted into the in-memory buffer **without error**, but the data is **silently discarded** when SQLRace flushes to the database &mdash; no exception, and the channel simply appears empty in ATLAS.

    | Payload size | Samples (float64) | Persisted? |
    |:---:|:---:|:---:|
    | ≤ ~312 KB | ≤ 32 000 | :material-check: Yes |
    | ~312 KB – ~977 KB | 32 000 – 100 000 | :material-check: Yes |
    | > ~1 MB | > ~100 000 | :material-close: **Silently dropped** |

    Keep packets at 16 000–48 000 samples to stay well clear of this threshold.

### Optimise packet size

Each `AddSynchroChannelData` call carries fixed .NET interop overhead, so fewer, larger packets mean higher throughput &mdash; up to a point. Measured on a local SQL Server, single channel, 10 M `float64` samples:

| Packet size | Payload | Packets (10 M) | Throughput (measured) |
|:---:|:---:|:---:|:---:|
| 16 000 | ~156 KB | 625 | ~1.2 M/s |
| **32 000** | **~312 KB** | **313** | **~1.5 M/s** |
| 48 000 | ~469 KB | 209 | ~1.5 M/s |
| 64 000 | ~625 KB | 157 | ~1.35 M/s |
| 96 000 | ~938 KB | 105 | **~0.55 M/s** (near the 1 MB cliff) |

The sweet spot is **32 000–48 000 samples**. Going larger gives no benefit and degrades sharply as the payload approaches 1 MB &mdash; the 96 000-sample case measured roughly **2–2.5× slower** than the sweet spot across runs.

### Interval quantisation (critical)

!!! warning "Quantise float-derived intervals or throughput collapses"

    When timestamps come from floating-point arithmetic (`60e9 / rpm`), the nanosecond intervals often share no common factor, giving `delta_scale = 1`. That forces the splitter to halve every packet down to 2–3 samples &mdash; millions of tiny packets, throughput dropping to ~90–100 k samples/s. Round intervals to microsecond resolution **before** computing the delta scale:

    === "C#"

        ```csharp
        for (int i = 0; i < intervalsNs.Length; i++)
            intervalsNs[i] = Math.Max((intervalsNs[i] / 1000) * 1000, 1000);
        ```

    === "Python"

        ```python
        intervals_ns = np.maximum((intervals_ns // 1000) * 1000, 1000)
        ```

    === "MATLAB"

        ```matlab
        intervalsNs = max(floor(intervalsNs / 1000) * 1000, 1000);
        ```

    For a 10 M-sample write this is the difference between ~108 s (≈3.9 M tiny packets) and ~9 s (≈1 250 packets) &mdash; a **12× improvement**.

### Flush periodically on large sessions

On small sessions SQLRace buffers everything and writes on close. On very large sessions the buffer can exhaust memory and the close may fail **silently**. Call `Flush()` every few hundred packets, and `EndData()` before closing.

=== "C#"

    ```csharp
    int sinceFlush = 0;
    foreach (var pkt in packets)
    {
        session.AddSynchroChannelData(/* ... */);
        if (++sinceFlush >= 500) { session.Flush(); sinceFlush = 0; }
    }
    session.EndData();
    ```

=== "Python"

    ```python
    since_flush = 0
    for pkt in packets:
        session.AddSynchroChannelData(...)
        since_flush += 1
        if since_flush >= 500:
            session.Flush()
            since_flush = 0
    session.EndData()
    ```

=== "MATLAB"

    ```matlab
    sinceFlush = 0;
    for k = 1:numel(packets)
        session.AddSynchroChannelData( ... );
        sinceFlush = sinceFlush + 1;
        if sinceFlush >= 500, session.Flush(); sinceFlush = 0; end
    end
    session.EndData();
    ```

### Where the time goes

At production scale the `.NET` write call dominates &mdash; it is ~95% of the total. A representative split for a 1 M-sample single-channel write:

| Phase | Share |
|-------|:---:|
| `AddSynchroChannelData` (the DB write) | **~95%** |
| One-time configuration commit | ~3% |
| Interval diff + GCD + binary packing | ~1–2% |
| `EndData` flush / close | <1% |

The practical consequences: minimise the number of calls (right-size packets), don't micro-optimise the packing once it is vectorised, and create each parameter's configuration **once** &mdash; check whether the parameter already exists (`session.ContainsParameter`) before rebuilding its config.

### Parallelise across channels

The write is latency-bound on the database round-trip, not CPU-bound. Both the .NET runtime and pythonnet **release the GIL/thread during the `AddSynchroChannelData` call**, so writing **different channels** from a small thread pool overlaps their round-trips:

- **Threads across channels** &mdash; benchmarked at roughly **2× throughput** with 4 worker threads writing distinct channels into one session. The gain is sub-linear because the database is the shared ceiling.
- **Within a single channel, use one writer.** A channel's packet sequence numbers must be emitted in order, so never split one channel across threads.
- **Multiple processes** scale further still &mdash; each writes its own session, and you overlay them in ATLAS.

!!! note "Create configuration serially, then fan out"

    Configuration commits mutate session state and are not thread-safe. Create all channel configurations on one thread first, then write the data for different channels concurrently.

### SQL Server vs SQLite

For bulk ingestion prefer a (local) SQL Server instance over SQLite: SQLite is single-writer and flushes on every transaction, so it is measurably slower for sustained high-throughput synchro writes.

!!! note "First-connection timeout"

    Some network configurations cause the *first* SQLRace connection to a remote SQL Server to take ~35 s. If you hit this, retry &mdash; the second attempt usually connects immediately. It is a known initialisation behaviour, not a fault.

---

## Common Mistakes

!!! danger "Pitfalls to avoid"

    - **Using `ChannelDataSourceType.Periodic`/`RowData` for synchro data** &mdash; `AddSynchroChannelData` throws if the channel was not created as `Synchro`. The channel type must match the write method.
    - **Packing absolute timestamps instead of scaled intervals** &mdash; the payload carries *scaled intervals*, not timestamps. Packing raw timestamps makes ATLAS interpret enormous gaps and the trace looks completely wrong.
    - **One delta scale for the whole dataset** &mdash; the delta scale is **per packet**. A single global GCD can leave some packets with intervals that overflow `uint16`. Compute the GCD per packet.
    - **Non-monotonic timestamps** &mdash; SQLRace assumes timestamps are sorted ascending. Unsorted input produces garbled data with no error at write time; sort before writing.
    - **Skipping `Flush()`/`EndData()` on huge sessions** &mdash; the most common "data disappeared" report. Flush periodically and call `EndData()` before close.
    - **Reading many synchro channels from one loaded session** &mdash; the second read onward can throw a `NullReferenceException`. Read each parameter in its own freshly-loaded session; disposing the PDA alone is good practice but not fully reliable (see [Reading Synchro Data Back](#reading-synchro-data-back)).
