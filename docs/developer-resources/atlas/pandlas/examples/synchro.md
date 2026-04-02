# Synchro Data

Synchro (engine-synchronous) channels store one sample per engine event — typically once per revolution or once per firing cycle — rather than at a fixed clock rate.
Because engine speed varies throughout a lap, the time between samples changes continuously, making synchro the correct channel type for crank-angle-domain data.

---

## When to Use Synchro

In ATLAS, **synchro** channels are fundamentally different from time-based (row) channels. They are sampled in the angular domain — one value per engine revolution, per TDC, or per firing event — so the effective sample rate rises and falls with RPM.

This is the standard approach for engine and powertrain signals in motorsport:

| Scenario | Use Synchro? | Reason |
|----------|:---:|--------|
| Cylinder pressure (per-revolution) | :material-check: | One sample per crank revolution — rate tracks RPM |
| Exhaust gas temperature (per-cylinder firing) | :material-check: | Sampled at TDC of each cylinder — irregular in time |
| Lambda / AFR from wideband sensor | :material-check: | Logged once per firing cycle, tied to engine speed |
| Knock intensity per cylinder | :material-check: | One measurement per combustion event |
| Injector pulse width | :material-check: | One value per injection event, rate varies with RPM |
| CAN-triggered gear position | :material-check: | Messages arrive only on gear change — completely aperiodic |
| Chassis accelerometers at fixed 1 kHz | :material-close: | Constant rate — use standard row channels |
| Damper potentiometers at fixed 500 Hz | :material-close: | Constant rate — use standard row channels |

---

## Writing Synchro Engine Data

Provide an explicit timestamp array alongside the data. Pandlas packs the values into variable-length packets and handles the SQLRace synchro protocol automatically.

The example below simulates per-revolution engine data where the gap between samples varies with RPM — short gaps at high revs, longer gaps at low revs:

```python
import numpy as np
import pandas as pd
from pandlas import SQLiteConnection, add_synchro_data

start = pd.Timestamp("2026-04-01 14:00:00")

# Simulate RPM profile: idle → full throttle → braking → idle
# 600 engine revolutions across the segment
n_revs = 600
rpm_profile = np.concatenate([
    np.linspace(4500, 12800, 200),   # acceleration out of corner
    np.full(150, 12800),              # full throttle on straight
    np.linspace(12800, 4200, 150),    # braking into next corner
    np.linspace(4200, 7000, 100),     # mid-corner partial throttle
])

# Convert RPM to time gaps between revolutions: gap = 60 / RPM
rev_gaps_s = 60.0 / rpm_profile
rev_offsets_s = np.cumsum(rev_gaps_s)
timestamps = np.array([start + pd.Timedelta(seconds=s) for s in rev_offsets_s])

# Engine signals — one sample per revolution
cylinder_pressure = 45 + 35 * (rpm_profile / 12800) + np.random.normal(0, 1.5, n_revs)
exhaust_temp      = 650 + 200 * (rpm_profile / 12800) + np.random.normal(0, 8, n_revs)
lambda_afr        = np.where(rpm_profile > 10000, 0.92, 1.0) + np.random.normal(0, 0.01, n_revs)
knock_intensity   = np.clip(np.random.exponential(0.3, n_revs) * (rpm_profile / 12800), 0, 5)

db_path = r"C:\data\engine_synchro.ssndb"

with SQLiteConnection(db_path, "Engine Synchro", mode="w") as session:
    add_synchro_data(
        session,
        timestamps=timestamps,
        data={
            "CylPressure":  cylinder_pressure,
            "ExhaustTemp":  exhaust_temp,
            "Lambda":       lambda_afr,
            "KnockIndex":   knock_intensity,
        },
        app_group="Engine",
        units={
            "CylPressure": "bar",
            "ExhaustTemp":  "degC",
            "Lambda":       "",
            "KnockIndex":   "",
        },
    )
```

In ATLAS, these channels align to the engine angular domain. Zooming in at high RPM shows densely packed samples; at low RPM the samples spread apart — exactly matching the crank events they represent.

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `session` | Session handle | Active Pandlas session |
| `timestamps` | array of `Timestamp` | One timestamp per sample, **must** be monotonically increasing |
| `data` | `dict[str, array]` | Channel name → values; all arrays same length as `timestamps` |
| `app_group` | `str` | Application group name in ATLAS |
| `units` | `dict[str, str]` | Optional units per parameter |

!!! warning "Timestamps Must Be Sorted"

    Synchro timestamps **must** be in ascending order. Pandlas does not sort for you — if your source data is unordered, call `np.sort()` on the timestamps and reindex the data arrays accordingly.

---

## Mixing Time-Based and Synchro Channels

A single session can contain both standard (fixed-rate) and synchro (engine-synchronous) channels.
This is the typical motorsport pattern — chassis sensors run at a fixed clock rate while engine sensors run per revolution:

```python
import numpy as np
import pandas as pd
from pandlas import SQLiteConnection, add_synchro_data

start = pd.Timestamp("2026-04-01 14:00:00")

# ── Fixed-rate chassis data at 500 Hz ──
n_chassis = 30000  # 60 seconds
t = np.linspace(0, 60, n_chassis)
chassis = pd.DataFrame({
    "vCar":      200 + 80 * np.sin(2 * np.pi * 0.03 * t),
    "gLat":      2.5 * np.sin(2 * np.pi * 0.05 * t),
    "gLong":     np.gradient(200 + 80 * np.sin(2 * np.pi * 0.03 * t)) * 10,
    "SteerAngle": 45 * np.sin(2 * np.pi * 0.05 * t),
}, index=pd.date_range(start, periods=n_chassis, freq="2ms"))
chassis.atlas.units = {"vCar": "km/h", "gLat": "G", "gLong": "G", "SteerAngle": "deg"}

# ── Synchro engine data — one sample per revolution ──
rpm_profile = 8000 + 4000 * np.sin(2 * np.pi * 0.03 * np.linspace(0, 60, 800))
rev_gaps = 60.0 / rpm_profile
engine_ts = np.array([start + pd.Timedelta(seconds=s) for s in np.cumsum(rev_gaps)])

db_path = r"C:\data\mixed_session.ssndb"

with SQLiteConnection(db_path, "Silverstone T1-T3", mode="w") as session:
    chassis.atlas.to_atlas_session(session)

    add_synchro_data(
        session,
        timestamps=engine_ts,
        data={
            "CylPressure": 50 + 30 * (rpm_profile / 12000),
            "ExhaustTemp":  700 + 150 * (rpm_profile / 12000),
            "InjPulseWidth": 2.0 + 3.5 * (rpm_profile / 12000),
        },
        app_group="Engine",
        units={"CylPressure": "bar", "ExhaustTemp": "degC", "InjPulseWidth": "ms"},
    )
```

In ATLAS, the 500 Hz chassis channels and the variable-rate engine channels appear side by side.
ATLAS handles interpolation between the two domains automatically when overlaying traces.

---

## Adaptive Packet Splitting

!!! info "Under the Hood"

    SQLRace stores synchro data in variable-length packets. Pandlas automatically splits your data into optimally sized packets based on the number of channels and the timestamp gaps.
    You do not need to manage packet boundaries — just pass the full arrays and Pandlas handles the rest.

---

## Common Patterns

??? example "Per-Cylinder Firing Data"

    Log one value per firing event for each cylinder in a multi-cylinder engine. The timestamp of each sample corresponds to the TDC of that cylinder:

    ```python
    # 4-cylinder engine, 600 firing events per cylinder
    n_fires = 600
    rpm = np.linspace(6000, 11000, n_fires)
    fire_gaps = 60.0 / (rpm * 2)  # 4-stroke: 2 revolutions per firing cycle
    fire_ts = np.array([start + pd.Timedelta(seconds=s) for s in np.cumsum(fire_gaps)])

    add_synchro_data(
        session,
        timestamps=fire_ts,
        data={
            "Cyl1_Pressure": 40 + 30 * (rpm / 11000) + np.random.normal(0, 1, n_fires),
            "Cyl2_Pressure": 40 + 29 * (rpm / 11000) + np.random.normal(0, 1, n_fires),
            "Cyl3_Pressure": 40 + 31 * (rpm / 11000) + np.random.normal(0, 1, n_fires),
            "Cyl4_Pressure": 40 + 30 * (rpm / 11000) + np.random.normal(0, 1, n_fires),
        },
        app_group="Combustion",
        units={f"Cyl{i}_Pressure": "bar" for i in range(1, 5)},
    )
    ```

??? example "Gear Shift Events from CAN"

    Gear position messages arrive only when the driver shifts — completely aperiodic. Store them as synchro so ATLAS holds each value until the next shift:

    ```python
    # Gear changes during a lap — irregular timing
    shift_times = [start + pd.Timedelta(seconds=s)
                   for s in [0.0, 1.8, 3.1, 5.4, 8.2, 12.0, 13.5, 18.1, 22.0, 25.3]]
    gear =    np.array([2, 3, 4, 5, 6, 7, 6, 5, 4, 3], dtype=float)
    clutch =  np.array([0, 1, 1, 1, 1, 1, 1, 1, 1, 1], dtype=float)

    add_synchro_data(
        session,
        timestamps=np.array(shift_times),
        data={"Gear": gear, "ClutchState": clutch},
        app_group="Gearbox",
        units={"Gear": "", "ClutchState": ""},
    )
    ```

??? example "Turbo Wastegate Duty — Variable Logging Rate"

    Some ECU strategies log wastegate duty at high rate under boost and low rate at part throttle:

    ```python
    # Part throttle: 10 Hz for 3 seconds
    slow_ts = pd.date_range(start, periods=30, freq="100ms")
    slow_duty = np.full(30, 15.0)  # 15% duty, barely cracked open

    # Full boost: 200 Hz for 2 seconds (wastegate actively controlled)
    boost_start = start + pd.Timedelta(3, "s")
    fast_ts = pd.date_range(boost_start, periods=400, freq="5ms")
    fast_duty = 65 + 20 * np.sin(np.linspace(0, 8 * np.pi, 400))  # oscillating control

    # Coast down: 10 Hz for 3 seconds
    coast_start = boost_start + pd.Timedelta(2, "s")
    coast_ts = pd.date_range(coast_start, periods=30, freq="100ms")
    coast_duty = np.linspace(60, 10, 30)

    all_ts = np.concatenate([slow_ts, fast_ts, coast_ts])
    all_duty = np.concatenate([slow_duty, fast_duty, coast_duty])

    add_synchro_data(
        session,
        timestamps=all_ts,
        data={"WastegateDuty": all_duty},
        app_group="Turbo",
        units={"WastegateDuty": "%"},
    )
    ```

---

## Under the Hood — How Synchro Data Reaches ATLAS

This section details the full sequence of SQLRace API calls that Pandlas executes when you call `add_synchro_data()`.
Understanding these steps is useful for debugging, for writing your own low-level synchro code in C\# or Python, or for extending Pandlas itself.

### Step 1 — Create a Configuration Set

Every parameter in SQLRace belongs to a **Configuration Set** — a collection of channels, conversions, parameter groups, and application groups that defines the structure of the data.

Pandlas creates one configuration set per synchro parameter:

```csharp
// C# equivalent of what Pandlas does via pythonnet
var configMgr = ConfigurationSetManager.CreateConfigurationSetManager();
var config = configMgr.Create(session.ConnectionString, configId, "Synchro config");
```

### Step 2 — Define the Parameter Group and Application Group

A **Parameter Group** is a logical grouping of related parameters (e.g. "CylinderPressures"). An **Application Group** ties one or more parameter groups to an application context (e.g. "Engine") and controls how ATLAS organises parameters in its browser tree.

```csharp
var group = new ParameterGroup("CombustionGroup", "CombustionGroup");
config.AddParameterGroup(group);

var groupIds = new List<string> { group.Identifier };
var app = new ApplicationGroup("Engine", "Engine", null, groupIds);
app.SupportsRda = false;  // synchro channels do not use RDA
config.AddGroup(app);
```

### Step 3 — Add a Rational Conversion

A **Conversion** maps raw channel values to engineering units. For synchro channels carrying `float64` data, a simple 1:1 rational conversion is sufficient — the raw value equals the engineering value.

```csharp
var conversion = RationalConversion.CreateSimple1To1Conversion(
    "CONV_CylPressure:Engine",  // conversion name
    "bar",                       // engineering unit
    "%5.2f"                      // display format string
);
config.AddConversion(conversion);
```

### Step 4 — Create the Synchro Channel

The **Channel** defines the data type and source type. Synchro channels use `ChannelDataSourceType.Synchro` (as opposed to `RowData` for fixed-rate channels) and typically store `Double64Bit` values.

```csharp
uint channelId = session.ReserveNextAvailableRowChannelId() % 2147483647;

var channel = new Channel(
    channelId,
    "CylPressure_SynchroChannel",
    0,                                    // interval (unused for synchro)
    DataType.Double64Bit,
    ChannelDataSourceType.Synchro         // marks this as a synchro channel
);
config.AddChannel(channel);
```

### Step 5 — Create the Parameter

The **Parameter** binds together the channel, the conversion, and the group hierarchy. It also carries display and warning limits that ATLAS uses for scaling traces.

```csharp
var param = new Parameter(
    "CylPressure:Engine",     // identifier (Name:AppGroup)
    "CylPressure",            // display name
    "Peak cylinder pressure", // description
    120.0, 0.0,               // display max, display min
    120.0, 0.0,               // warning max, warning min
    0.0, 0xFFFF, 0,           // offset, mask, shift
    "CONV_CylPressure:Engine",// conversion name
    paramGroupIds,             // list of parameter group identifiers
    channelIds,                // list of channel IDs
    "Engine",                  // application group
    "%5.2f",                   // format string
    "bar"                      // unit
);
config.AddParameter(param);
```

### Step 6 — Commit and Activate the Configuration

The configuration set is committed to the session store and then activated so that subsequent data writes target the correct channels.

```csharp
config.Commit();
session.UseLoggingConfigurationSet(config.Identifier);
```

### Step 7 — Compute Inter-Sample Intervals

This is where synchro diverges from fixed-rate data. With row data, the interval is constant and declared once on the channel — 1 ms for 1 kHz, 2 ms for 500 Hz. With synchro data, every gap between consecutive samples can be different, and that timing information must be encoded into the payload itself.

Pandlas computes the intervals by differencing the timestamp array:

```python
# timestamps_ns: absolute nanosecond timestamps, one per sample
# e.g. [1000000000, 1005000000, 1009500000, 1015200000, ...]
intervals_ns = np.diff(timestamps_ns)
# result: [5000000, 4500000, 5700000, ...]  — the gaps in nanoseconds
```

**Concrete example** — five engine revolutions during acceleration from 6 000 to 10 000 RPM:

| Revolution | RPM | Period (60/RPM) | Timestamp (ns) | Interval to next (ns) |
|:---:|:---:|:---:|:---:|:---:|
| 0 | 6 000 | 10.00 ms | 0 | 9 000 000 |
| 1 | 6 667 | 9.00 ms | 9 000 000 | 8 000 000 |
| 2 | 7 500 | 8.00 ms | 17 000 000 | 7 000 000 |
| 3 | 8 571 | 7.00 ms | 24 000 000 | 6 000 000 |
| 4 | 10 000 | 6.00 ms | 30 000 000 | — |

The `intervals_ns` array for this packet is `[9000000, 8000000, 7000000, 6000000]`.

### Step 8 — Split Into Packets

SQLRace does not accept a single monolithic block of synchro data. It expects the data to be delivered in **packets** — self-contained chunks, each with its own base timestamp and a byte payload of interleaved samples and intervals.

There are two constraints that force packet boundaries:

**Size constraint** — Pandlas defaults to a maximum of 24 000 samples per packet (~234 KB for float64 data). The SQL Race API accepts payloads up to approximately 1 MB; above that, data is silently discarded on flush.

**Encoding constraint** — Within each packet, intervals are stored as `uint16` values (0–65 535) after dividing by a common scale factor (the delta scale, Step 9). If the ratio `max_interval / gcd_of_all_intervals` exceeds 65 535 for any packet, that packet cannot be encoded. Pandlas handles this automatically by recursively halving oversized packets until every packet satisfies the constraint.

**When does the encoding constraint matter?** In practice, it triggers when a single packet spans a wide RPM range — for example, if your data covers both idle at 800 RPM (75 ms per revolution) and redline at 15 000 RPM (4 ms per revolution). The ratio 75 000 000 / gcd(75 000 000, 4 000 000) = 75 000 000 / 1 000 000 = 75, which is well within `uint16`. But if you had a stall event (RPM drops to near zero, producing a multi-second gap) mixed with high-RPM data, the ratio could blow past 65 535 — and Pandlas would split the packet at that boundary.

**What the splitting algorithm does:**

```
1. Divide all N samples into chunks of ≤ packet_size (default 24 000)
2. For each chunk:
   a. Compute the intervals within the chunk
   b. Check: can every interval be encoded as uint16 after GCD scaling?
   c. YES → emit the chunk as a packet
   d. NO  → split the chunk in half, push both halves back onto the stack
3. Repeat until every chunk passes
```

### Step 9 — Compute the Delta Scale

The **delta scale** is the key to fitting variable-width nanosecond intervals into 2-byte integers. It is the greatest common divisor (GCD) of all intervals within a single packet.

Continuing the example from Step 7:

```
intervals_ns = [9 000 000, 8 000 000, 7 000 000, 6 000 000]

delta_scale  = gcd(9000000, 8000000, 7000000, 6000000) = 1 000 000

scaled_intervals = intervals_ns / delta_scale
               = [9, 8, 7, 6]   ← these fit comfortably in uint16
```

SQLRace receives the `delta_scale` value alongside the packet. To reconstruct the original timing, it multiplies each stored interval by the delta scale: `9 × 1 000 000 = 9 000 000 ns`.

**Three scenarios to understand how the delta scale behaves:**

=== "Constant RPM"

    At steady 8 000 RPM, every revolution takes exactly 7 500 000 ns:

    ```
    intervals = [7500000, 7500000, 7500000, 7500000]
    delta_scale = 7 500 000
    scaled      = [1, 1, 1, 1]
    ```

    Maximum compression — each interval is stored as the value `1`.

=== "Smoothly Varying RPM"

    Acceleration from 6 000 to 10 000 RPM, as in our running example:

    ```
    intervals   = [9000000, 8000000, 7000000, 6000000]
    delta_scale = 1 000 000
    scaled      = [9, 8, 7, 6]
    ```

    The GCD captures the common million-nanosecond granularity.

=== "Highly Irregular (e.g. Misfire)"

    A misfire causes one abnormally long interval:

    ```
    intervals   = [7500000, 7500000, 22173000, 7500000]
    delta_scale = gcd(7500000, 7500000, 22173000, 7500000) = 3000
    scaled      = [2500, 2500, 7391, 2500]
    ```

    The GCD drops to 3 000 because the misfire interval (22 173 000) shares only a small common factor with the regular intervals. The scaled values are larger but still well within `uint16` range (max 65 535).

!!! warning "When delta scale = 1"

    If the GCD of all intervals in a packet is 1 nanosecond (intervals share no common factor), then `delta_scale = 1` and the scaled intervals equal the raw nanosecond values — which will almost certainly exceed 65 535. This forces the packet to split. This scenario is rare with real engine data but can occur with synthetic timestamps that have floating-point rounding artefacts. Always generate timestamps from integer arithmetic when possible.

### Step 10 — Pack the Binary Payload

Each packet is serialised into a contiguous byte buffer. The format interleaves sample values and scaled intervals in strict alternation:

```
Byte offset  Content                          Size
──────────── ──────────────────────────────── ────
0            sample₀    (float64, little-endian)   8 bytes
8            interval₀  (uint16, little-endian)    2 bytes
10           sample₁    (float64, little-endian)   8 bytes
18           interval₁  (uint16, little-endian)    2 bytes
...
(N-2)×10     sampleₙ₋₂  (float64, little-endian)  8 bytes
(N-2)×10+8   intervalₙ₋₂ (uint16, little-endian)  2 bytes
(N-1)×10-2   sampleₙ₋₁  (float64, little-endian)  8 bytes  ← LAST sample, NO interval
```

The last sample has no trailing interval because there is no "next" sample to measure a gap to.

**Total payload size** for N samples: `(N - 1) × 10 + 8` bytes.

**Worked byte-level example** with our 5-revolution data (cylinder pressures `[45.2, 52.1, 58.7, 63.4, 70.0]`, scaled intervals `[9, 8, 7, 6]`):

```
Bytes 0–7:    45.2  as float64 LE  → 9A 99 99 99 99 99 46 40
Bytes 8–9:    9     as uint16 LE   → 09 00
Bytes 10–17:  52.1  as float64 LE  → CD CC CC CC CC 0C 4A 40
Bytes 18–19:  8     as uint16 LE   → 08 00
Bytes 20–27:  58.7  as float64 LE  → 66 66 66 66 66 56 4D 40
Bytes 28–29:  7     as uint16 LE   → 07 00
Bytes 30–37:  63.4  as float64 LE  → CD CC CC CC CC CC 4F 40
Bytes 38–39:  6     as uint16 LE   → 06 00
Bytes 40–47:  70.0  as float64 LE  → 00 00 00 00 00 80 51 40
Total: 48 bytes  (5 samples × 10 - 2 = 48)
```

In Python, Pandlas builds this without any per-sample loop using a NumPy structured array:

```python
paired_dtype = np.dtype([("sample", "<f8"), ("interval", "<u2")])  # (1)
paired = np.empty(len(intervals), dtype=paired_dtype)  # (2)
paired["sample"] = samples[:-1]        # (3)
paired["interval"] = scaled_intervals  # (4)

# Concatenate the paired block with the final sample
payload = paired.tobytes() + samples[-1:].astype(np.float64).tobytes()  # (5)
```

1. Define a structured dtype: each element is a 8-byte float64 sample followed by a 2-byte uint16 interval — exactly matching the SQLRace binary layout.
2. Allocate a single contiguous block for N-1 sample-interval pairs. No Python list, no per-element allocation.
3. Assign all samples except the last into the `"sample"` field. NumPy copies the data in a single `memcpy`-level operation.
4. Assign the GCD-scaled intervals into the `"interval"` field. These must already be `uint16`-safe (0–65 535).
5. The final sample has no trailing interval — append it separately. `.tobytes()` on the structured array produces the exact interleaved byte sequence SQLRace expects.

!!! warning "Do NOT pack with a Python loop"

    A naive `struct.pack` loop over thousands of samples is orders of magnitude slower:

    ```python
    # ❌ WRONG — this works but is extremely slow for large packets
    import struct
    buf = bytearray()
    for i in range(len(samples) - 1):
        buf += struct.pack("<d", samples[i])
        buf += struct.pack("<H", scaled_intervals[i])
    buf += struct.pack("<d", samples[-1])
    ```

    The vectorised NumPy approach processes 8 000 samples in microseconds. The loop version takes milliseconds — a 100× penalty that compounds when writing hundreds of packets.

### Step 11 — Write the Packet to SQLRace

Each assembled packet is delivered to SQLRace via a single API call:

```csharp
session.AddSynchroChannelData(
    packetTimestamp,   // (1)
    channelId,         // (2)
    sequenceNumber,    // (3)
    deltaScale,        // (4)
    packetBytes        // (5)
);
```

1. **`packetTimestamp`** (`long`) — The absolute timestamp in nanoseconds since the session epoch of the **first sample** in this packet. SQLRace reconstructs subsequent timestamps by adding `scaled_interval × deltaScale` cumulatively from this base.
2. **`channelId`** (`uint`) — The channel identifier assigned in Step 4. Must match a channel created with `ChannelDataSourceType.Synchro`. Passing a row-data channel ID here causes a runtime exception.
3. **`sequenceNumber`** (`byte`) — Monotonically increasing counter (0, 1, 2, … 255, 0, 1, …). SQLRace uses this to detect missing or out-of-order packets. Pandlas tracks this as `seq % 256`.
4. **`deltaScale`** (`int`) — The GCD computed in Step 9 for **this specific packet**. Different packets in the same channel can have different delta scales — each packet is self-describing.
5. **`packetBytes`** (`byte[]`) — The binary payload from Step 10. SQLRace parses it using the interleaved format and the delta scale to reconstruct all sample values and their timestamps.

**Sequence of calls for our 5-revolution example (single packet):**

```csharp
// Python equivalent via pythonnet:
session.AddSynchroChannelData(
    0,              // first timestamp: 0 ns (start of session)
    channelId,      // e.g. 42
    0,              // sequence number: 0 (first packet)
    1000000,        // delta scale: 1 000 000 ns (1 ms)
    packetBytes     // 48 bytes: the interleaved payload
);
```

SQLRace unpacks this as:

```
Sample 0: value=45.2, timestamp = 0
Sample 1: value=52.1, timestamp = 0 + 9 × 1000000 = 9 000 000
Sample 2: value=58.7, timestamp = 9000000 + 8 × 1000000 = 17 000 000
Sample 3: value=63.4, timestamp = 17000000 + 7 × 1000000 = 24 000 000
Sample 4: value=70.0, timestamp = 24000000 + 6 × 1000000 = 30 000 000
```

**Multiple packets — what changes:**

If the data is split into two packets (e.g. 400 revolutions each), the calls look like:

```csharp
// Packet 0: revolutions 0–399
session.AddSynchroChannelData(timestamp_of_rev_0, channelId, 0, deltaScale_pkt0, bytes_pkt0);

// Packet 1: revolutions 400–799
session.AddSynchroChannelData(timestamp_of_rev_400, channelId, 1, deltaScale_pkt1, bytes_pkt1);
```

Each packet carries its own `deltaScale` because the RPM range (and therefore the GCD of intervals) may differ between the two halves of the data.

### Performance at Scale — Ingesting 200M+ Synchro Samples

When you move from thousands of engine revolutions to hundreds of millions of samples — a mapping run, a multi-cylinder test-bed log, or a full race distance of combustion data — every inefficiency in the pipeline compounds. A typical mapping run can produce 200 million samples. At a naive 300k samples/second, that is over 10 minutes of ingestion time. This section covers the practical engineering required to bring that down to minutes or less.

!!! danger "Maximum Packet Payload Size"

    The maximum byte array payload accepted by `AddSynchroChannelData` is approximately **1 MB** (~100 000 samples for `float64` data). Payloads above this threshold are accepted into the in-memory buffer without error, but the data is **silently discarded** when SQLRace flushes to the database. No exception is raised — the session simply appears empty in ATLAS.

    The following table summarises the tested behaviour:

    | Payload size | Samples (float64) | Write speed | Data persisted? |
    |:---:|:---:|:---:|:---:|
    | ≤ ~312 KB | ≤ 32 000 | ~1.0–1.2M/s | ✅ Yes |
    | ~312 KB – ~977 KB | 32 000 – 100 000 | ~1.0–1.2M/s | ✅ Yes |
    | > ~1 MB | > ~100 000 | Appears fast | ❌ **Silent data loss** |

    Pandlas defaults to `packet_size=24000` (~234 KB per packet), which sits comfortably in the safe zone while minimising API call overhead.

#### 1. Call `Flush()` periodically on large sessions

This is the single most important lesson for large data ingestion and the source of most "data disappeared silently" reports.

On small sessions (a few thousand samples), SQLRace buffers everything in memory and writes to the database when the session closes. On large sessions, the internal buffer can exceed available memory, and the session close may fail silently — no exception, no error message, but no data in ATLAS either.

The fix is to call `session.Flush()` periodically during ingestion:

```python
# ✅ CORRECT — flush every N packets to prevent silent data loss
packets_since_flush = 0
for pkt in packets:
    session.AddSynchroChannelData(...)
    packets_since_flush += 1

    if packets_since_flush >= 200:  # flush every ~4.8M samples (200 × 24000)
        session.Flush()  # (1)
        packets_since_flush = 0
```

1. `Flush()` forces SQLRace to write buffered data to the database. Without this, large sessions fail silently when the internal buffer is exhausted. Call it every few hundred packets — the exact interval depends on available memory, but every 500 packets is a safe default.

!!! warning "Silent Failure Mode"

    If you write 200 million samples without calling `Flush()`, the session will appear to complete successfully. No exception is raised. But when you open it in ATLAS, some or all channels will be empty. This is the most common support issue with large synchro sessions. Always flush.

    If you encounter this behaviour after adding `Flush()` calls, try calling `session.EndData()` before closing the session — this forces a final flush of any remaining buffered data.

#### 2. Pre-compute timestamps as integer nanoseconds

The single most expensive mistake is passing `pd.Timestamp` objects or `datetime64` arrays that force repeated Python-level conversions. Compute your timestamps once as a raw `int64` NumPy array in nanosecond resolution and keep them in that form throughout:

```python
# ✅ FAST — integer arithmetic, no Python objects
rpm_profile = np.array(...)  # your RPM array, length 200_000_000
rev_gaps_ns = (60_000_000_000 / rpm_profile).astype(np.int64)  # ns per revolution
timestamps_ns = np.cumsum(rev_gaps_ns)  # monotonic int64 array
```

```python
# ❌ SLOW — creates 200M pd.Timestamp objects, then converts back to int64
timestamps = np.array([start + pd.Timedelta(ns=ns) for ns in cumulative_ns])
```

At 200M samples, the slow version takes hours. The fast version takes seconds.

#### 3. Optimise packet size for throughput

Each `AddSynchroChannelData` call carries fixed overhead from .NET interop marshalling. Fewer, larger packets mean fewer boundary crossings and higher throughput. The optimal range is **16 000–32 000 samples per packet** (~156–312 KB for float64 data):

| Packet size | Payload | Packets for 50M samples | Throughput (benchmarked) |
|:---:|:---:|:---:|:---:|
| 8 000 | ~78 KB | 6 250 | ~400k/s |
| 16 000 | ~156 KB | 3 125 | ~1.07M/s |
| 24 000 | ~234 KB | 2 084 | ~1.2M/s |
| 32 000 | ~312 KB | 1 563 | ~1.17M/s |

Pandlas defaults to `packet_size=24000`. Going much beyond 32 000 provides diminishing returns, and exceeding ~100 000 samples per packet (~1 MB payload) causes silent data loss.

#### 4. The `sequenceNumber` parameter

The `sequenceNumber` argument to `AddSynchroChannelData` is a `System.Byte` (0–255). It is a **packet sequence counter** — increment it for each packet written to a given channel. The counter wraps naturally at 256, which is expected behaviour.

In practice, the sequence number has **minimal observable effect** on data correctness. Setting it to `Byte(0)` for every packet does not cause data loss or reordering. However, the recommended approach is to increment it per packet (`seq % 256`) for correctness and forward compatibility:

```python
# Safe approach — increment and wrap
for i, pkt in enumerate(packets):
    session.AddSynchroChannelData(
        pkt_timestamp, channel_id,
        Byte(i % 256),   # wraps at 256 — this is fine
        delta_scale, pkt_bytes,
    )
```

If you have more than 255 packets (which you almost certainly do with 200M samples), the counter wraps. This is expected and does not cause issues.

#### 5. Keep arrays contiguous in memory

NumPy's structured array packing in Step 10 relies on C-contiguous memory layout. If your sample array is a slice of a larger array, a Fortran-order array, or a non-contiguous view, the packing step silently copies the data — doubling memory usage and halving throughput:

```python
# ✅ FAST — contiguous float64 array
samples = np.ascontiguousarray(raw_data, dtype=np.float64)

# ❌ SLOW — strided view forces a copy inside pack_synchro_packet
samples = big_matrix[:, 3]  # column slice → non-contiguous
```

For 200M samples at float64, the array is ~1.6 GB. An unnecessary copy means 3.2 GB peak memory.

#### 6. Profile the bottleneck: packing vs. writing

At production scale, measure where time is actually spent. The .NET interop call dominates:

| Operation | Typical time (50M samples) | Bottleneck? |
|-----------|:---:|:---:|
| `np.diff` + quantisation | ~0.2 s | No |
| `split_into_packets` | ~0.5 s | No |
| `compute_delta_scale` per packet | ~0.1 ms × 2 084 packets | No |
| `pack_synchro_packet` (NumPy) | ~5 s total | No |
| `AddSynchroChannelData` (.NET) | **~35 s total** | **Yes — always** |
| `Flush()` calls | ~1–3 s total | No |
| Config creation | ~2–5 s per parameter | One-time |

The `AddSynchroChannelData` call accounts for 80–90% of total ingestion time. Every optimisation that reduces the number of calls (larger packets, fewer channels) has a direct impact. Optimisations that speed up the Python-side packing make little difference at this scale.

**Benchmarked throughput (SQL Server, single channel, `packet_size=24000`):**

| Samples | Write Time | Throughput |
|--------:|:---:|:---:|
| 100 000 | ~0.6 s | ~170k/s *(config overhead dominates)* |
| 1 000 000 | ~1.4 s | ~700k/s |
| 10 000 000 | ~8.4 s | ~1.19M/s |
| 50 000 000 | ~41 s | ~1.21M/s |
| 200 000 000 | ~193 s (~3.2 min) | ~1.04M/s |

Throughput stabilises at approximately **1.0–1.2 million samples per second** once configuration overhead becomes negligible.

!!! warning "Interval Quantisation — Critical for Performance"

    When timestamps are derived from floating-point arithmetic (e.g. `60e9 / rpm`), the resulting nanosecond intervals can share no common factor, producing a GCD of 1. This forces the packet splitter to recursively halve every packet down to 2–3 samples — creating millions of tiny packets and reducing throughput to ~90–100k samples/s.

    Pandlas quantises intervals to microsecond resolution (1 000 ns) by default, which restores healthy GCDs and keeps packets at their configured size. If you are writing raw SQLRace code, round your intervals before computing the delta scale:

    ```python
    # Quantise to 1 µs — eliminates pathological GCD = 1
    intervals_ns = (intervals_ns // 1000) * 1000
    intervals_ns = np.maximum(intervals_ns, 1000)
    ```

    Without this fix, a 10M sample write takes **108 seconds** (3.87M packets). With it: **9 seconds** (1 250 packets). A 12× improvement.

#### 7. Use SQL Server for bulk ingestion, not SQLite

SQLite is single-writer and flushes to disk on every transaction. For 200M+ samples, SQL Server with a local instance is significantly faster — particularly when combined with periodic `Flush()` calls:

```python
# ✅ For bulk ingestion
with SQLRaceDBConnection(r"SERVER\LOCAL", "SQLRACE02", "BulkEngine", mode="w") as session:
    ...

# ❌ SQLite struggles with sustained high-throughput writes
with SQLiteConnection(r"C:\data\huge.ssndb", "BulkEngine", mode="w") as session:
    ...
```

!!! note "SQL Server Connection Timeouts"

    Some network configurations cause the first SQLRace connection to a remote SQL Server to time out (~35 seconds). If you experience this, implement a retry strategy — the second attempt typically succeeds immediately. This is a known behaviour related to how SQLRace initialises the connection, not a network fault.

#### 8. Parallelise across channels (advanced)

In-process concurrency (threading) does not help with SQLRace writes. The pythonnet bridge serialises all CLR calls through a single thread, and the GIL prevents true parallelism within a single Python process.

The effective approach is **multi-process parallelism** — each process writes to its own session, and you overlay all sessions in ATLAS for analysis:

```
Process 1: CylPressure, ExhaustTemp, Lambda      → Session "Engine-A"
Process 2: KnockIndex, InjPulseWidth, SparkAdv   → Session "Engine-B"
Process 3: TurboPressure, WastegateDuty, EGR     → Session "Engine-C"
```

Each process runs its own CLR runtime via pythonnet. ATLAS can overlay all three sessions. This approach scales linearly with the number of processes — 3 processes ≈ 3× throughput.

#### 9. Avoid recomputing the configuration

Configuration creation (Steps 1–6) takes 2–3 seconds per parameter. For 20 engine parameters, that is 40–60 seconds before any data is written. Pandlas checks `session.ContainsParameter()` automatically and skips config creation if the parameter already exists. If you are writing raw SQLRace code, always perform this check yourself.


### Common Mistakes

!!! danger "Pitfalls to Avoid"

    **Using `ChannelDataSourceType.RowData` for synchro data** — If you create the channel with `RowData` instead of `Synchro`, `AddSynchroChannelData` will throw an exception. The channel type must match the write method.

    **Passing absolute timestamps instead of intervals in the payload** — The byte payload contains *scaled intervals*, not absolute timestamps. If you accidentally pack raw timestamps, SQLRace will interpret them as enormous gaps and the data will appear completely wrong in ATLAS.

    **Forgetting to increment the sequence number** — SQLRace uses the sequence byte to order packets. If every packet has sequence 0, ATLAS may display samples out of order or drop packets it considers duplicates.

    **Using the same delta scale for all packets** — The delta scale is per-packet. If you compute a single GCD across the entire dataset and apply it to every packet, some packets may have intervals that overflow `uint16`. Always compute the GCD per packet.

    **Timestamps not monotonically increasing** — SQLRace assumes timestamps are sorted. Unsorted timestamps will produce garbled data in ATLAS with no error at write time — the corruption only becomes visible when you try to display the channel.

!!! tip "Performance Note"

    The most expensive step is configuration creation (Steps 1–6), which takes roughly 2–3 seconds due to .NET object instantiation. The actual data packing and writing (Steps 7–11) is fast — typically 50 000–200 000 samples per second — because the hot path is pure NumPy with no Python loops.
