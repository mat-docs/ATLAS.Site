# API Reference

Complete reference for every public function, class, and accessor in Pandlas.

---

## Session Connections

### `SQLiteConnection`

Opens or creates a local SQLite-backed ATLAS session.

```python
SQLiteConnection(db_location, identifier, mode="w", recorder=False, session_key=None)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `db_location` | `str` | Path to the `.ssndb` file |
| `identifier` | `str` | Human-readable session name |
| `mode` | `str` | `"w"` for write, `"r"` for read |
| `recorder` | `bool` | Enable live session mode (Server Listener) |
| `session_key` | `str` | Load an existing session by key (read mode) |

!!! example "Usage"

    ```python
    with SQLiteConnection(r"C:\data\demo.ssndb", "Demo", mode="w") as session:
        df.atlas.to_atlas_session(session)
    ```

---

### `SQLRaceDBConnection`

Opens or creates a session in a shared SQL Server database.

```python
SQLRaceDBConnection(server, database, identifier, mode="w", recorder=False, session_key=None)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | `str` | SQL Server instance (e.g. `r"SERVER\LOCAL"`) |
| `database` | `str` | Database name (e.g. `"SQLRACE02"`) |
| `identifier` | `str` | Human-readable session name |
| `mode` | `str` | `"w"` for write, `"r"` for read |
| `recorder` | `bool` | Enable live session mode |
| `session_key` | `str` | Load an existing session by key (read mode) |

---

### `Ssn2Session`

Read-only access to `.ssn2` files.

```python
Ssn2Session(file_path)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_path` | `str` | Path to the `.ssn2` file |

---

## DataFrame Accessor: `.atlas`

The `.atlas` accessor is available on any `pd.DataFrame` after importing Pandlas.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `ApplicationGroupName` | `str` | Application group for all parameters (default: `"ApplicationGroup"`) |
| `ParameterGroupIdentifier` | `str` | Default parameter group name |
| `parameter_group_separator` | `str` | Column name separator for auto-grouping (e.g. `"/"`) |
| `units` | `dict` | Map of `column → unit string` |
| `descriptions` | `dict` | Map of `column → description` |
| `display_format` | `dict` | Map of `column → format string` (e.g. `"%6.2f"`) |
| `display_limits` | `dict` | Map of `column → (min, max)` |
| `warning_limits` | `dict` | Map of `column → (min, max)` |

### `to_atlas_session()`

Write the DataFrame into an ATLAS session.

```python
df.atlas.to_atlas_session(session, show_progress_bar=True)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `session` | Connection | An open session connection (context manager) |
| `show_progress_bar` | `bool` | Display a `tqdm` progress bar during write |

!!! note "Index Requirements"

    The DataFrame index **must** be a `DatetimeIndex`. The sample rate is inferred automatically from the index frequency.

---

## Data Reading

### `get_samples()`

Read parameter samples from a session.

```python
get_samples(session, parameter_identifier)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `session` | Connection | An open session connection |
| `parameter_identifier` | `str` | Parameter ID in the form `"name:AppGroup"` |

**Returns:** `(samples: np.ndarray, timestamps: np.ndarray)`

=== "SQLite"

    ```python
    with SQLiteConnection(db_path, session_key="<key>", mode="r") as session:
        data, timestamps = get_samples(session, "Speed:MyApp")
    ```

=== "SQL Server"

    ```python
    with SQLRaceDBConnection(server, db, session_key="<key>", mode="r") as session:
        data, timestamps = get_samples(session, "Speed:MyApp")
    ```

---

## Laps & Markers

### `add_lap()`

Add a new lap boundary to the session.

```python
add_lap(session, trigger_time, lap_name="", count_for_fastest=True)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `session` | Connection | An open session connection |
| `trigger_time` | `pd.Timestamp` | Lap trigger timestamp |
| `lap_name` | `str` | Display name for the lap |
| `count_for_fastest` | `bool` | Include in fastest-lap calculations |

### `update_lap()`

Rename an existing lap or change its fastest-lap flag.

```python
update_lap(session, lap_index, new_name=None, new_count_for_fastest=None)
```

### `add_point_marker()`

Add a point marker at a specific time.

```python
add_point_marker(session, timestamp, label)
```

### `add_range_marker()`

Add a range marker spanning a time window.

```python
add_range_marker(session, start_time, end_time, label)
```

### `add_markers_batch()`

Add multiple markers in a single call.

```python
add_markers_batch(session, markers)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `markers` | `list[dict]` | Each dict: `{"time": timestamp, "label": str}` for point markers, or `{"start": ts, "end": ts, "label": str}` for range markers |

---

## Session Details

### `set_session_details()`

Set session-level metadata visible in ATLAS session properties.

```python
set_session_details(session, details)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `session` | Connection | An open session connection |
| `details` | `dict` | Map of `key → value` strings |

!!! example "Common Detail Keys"

    ```python
    set_session_details(session, {
        "Driver":  "Lando Norris",
        "Circuit": "Silverstone",
        "Vehicle": "MCL60",
        "Event":   "British GP 2026",
        "Source":  "Pandlas Live Stream",
    })
    ```

---

## Synchro (Variable-Rate) Data

### `add_synchro_data()`

Write engine-synchronous or variable-rate channel data with automatic byte packing and packet management.

```python
add_synchro_data(
    session,
    parameter_name,
    app_group,
    samples,
    timestamps,
    unit="",
    description="",
)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `session` | Connection | An open session connection |
| `parameter_name` | `str` | Channel name |
| `app_group` | `str` | Application group |
| `samples` | `np.ndarray` | Float64 sample values |
| `timestamps` | `np.ndarray` | Int64 nanosecond offsets from session start |
| `unit` | `str` | Engineering unit |
| `description` | `str` | Parameter description |

!!! info "Automatic Packet Splitting"

    Synchro data packets are limited to 65 535 samples. Pandlas automatically splits larger arrays into compliant packets with correct sequence numbering.

---

## Text Channels

### `add_text_channel()`

Write a parameter that displays as string labels in ATLAS (e.g. gear position, tyre compound, driver mode).

```python
add_text_channel(
    session,
    parameter_name,
    values,
    timestamps,
    application_group="ApplicationGroup",
)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `session` | Connection | An open session connection |
| `parameter_name` | `str` | Channel name |
| `values` | `list[str]` | String values at each timestamp |
| `timestamps` | `pd.DatetimeIndex` | Timestamps for each value |
| `application_group` | `str` | Application group |

---

## Events

### `add_events()`

Write discrete events from a DataFrame. Each row becomes one ATLAS event.

```python
add_events(
    session,
    events_df,
    status_column=None,
    description="Event",
    priority="medium",
    application_group="ApplicationGroup",
)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `session` | Connection | An open session connection |
| `events_df` | `pd.DataFrame` | Must contain a `"timestamp"` column. Numeric columns become event values. |
| `status_column` | `str` | Column name whose values appear in the ATLAS Status column |
| `description` | `str` | Event type description |
| `priority` | `str` | `"low"`, `"medium"`, or `"high"` |
| `application_group` | `str` | Application group for event definitions |

**Returns:** `int` — the number of events written.

??? example "Multiple Event Types"

    Call `add_events()` once per event category:

    ```python
    add_events(session, lockup_df, status_column="Status",
               description="Brake Lockup", priority="high",
               application_group="BrakeApp")

    add_events(session, flag_df, status_column="Status",
               description="Track Flag", priority="medium",
               application_group="RaceControl")
    ```
