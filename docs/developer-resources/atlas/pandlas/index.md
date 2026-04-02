# Pandlas — From Pandas DataFrames to ATLAS

Pandlas extends [Pandas](https://pandas.pydata.org/) with a `.atlas` accessor that turns any DataFrame into an ATLAS session.
Write telemetry, read it back, stream it live — all from Python, with no boilerplate.

[Get Started](getting-started.md){ .md-button .md-button--primary }
[API Reference](api-reference.md){ .md-button }

---

## Why Pandlas?

The SQL Race API is powerful, but writing data requires managing configuration sets, conversions, channels, parameters, and byte-level sample packing.
Pandlas collapses all of that into a single line:

```python
df.atlas.to_atlas_session(session)
```

Under the hood, it handles vectorised serialisation, automatic config creation, multi-rate channel management, and all the .NET interop through [pythonnet](https://github.com/pythonnet/pythonnet).

## Capabilities at a Glance

| Feature | Description |
|---------|-------------|
| **Data Writing** | Write Pandas DataFrames to ATLAS sessions (SQLite, SSN2, SQL Server) |
| **Multi-rate** | Mix parameters at different sample rates in the same session |
| **Synchro Data** | Write engine-synchronous (variable-rate) channels with automatic packet management |
| **Text Channels** | Write enumerated/string parameters via `TextConversion` lookup tables |
| **Live Sessions** | Stream data into live sessions visible in ATLAS via the Server Listener |
| **Parameter Metadata** | Custom units, descriptions, format, display limits, and warning limits |
| **Parameter Grouping** | Auto-create groups from column naming (e.g. `Chassis/DamperFL`) |
| **Session Details** | Attach session-level metadata: Driver, Circuit, Vehicle, Event |
| **Laps & Markers** | Add, update laps, point markers, and range markers |
| **Events** | Write discrete events with priority levels and status labels |
| **Data Reading** | Read parameter samples back from historic sessions |
| **Automation** | Helpers for the ATLAS Automation API |

## Architecture

Pandlas operates as a three-layer stack, bridging the gap between the Python data ecosystem and the ATLAS platform.

**Application Layer** — Your Python code builds Pandas DataFrames, NumPy arrays, event tables, and marker definitions using familiar tools. The `.atlas` accessor on any DataFrame provides the entry point for writing channel data, while standalone functions (`add_events`, `add_lap`, `add_point_marker`, `add_range_marker`, `add_synchro_data`) handle discrete annotations and variable-rate channels.

**Translation Layer** — The Pandlas core engine converts Python-native types into the binary formats SQLRace expects. Timestamps are mapped from `DatetimeIndex` to 64-bit nanosecond offsets. Sample values are serialised in bulk via vectorised NumPy operations — no Python-level loops on the hot path. Configuration objects (parameters, conversions, application groups, event definitions) are created once per session and cached for reuse.

**Storage Layer** — Pandlas calls the SQL Race .NET API through [pythonnet](https://pythonnet.github.io/), the CPython↔CLR interop bridge. SQL Race manages all persistence, supporting three storage backends:

- **SQLite** (`.ssndb`) — single-file sessions, portable, no server required
- **SQL Server** — networked database for multi-user, multi-session workflows
- **SQL Server with Recorder** — live sessions that appear in ATLAS in real time as data is written

## Performance

Data serialisation uses vectorised NumPy operations for both sample bytes and timestamp arrays, avoiding Python-level loops on the hot path.

| Data Type | Metric | Typical Value |
|-----------|--------|---------------|
| **Row data** | Config creation (first write) | ~2–5 s |
| **Row data** | Streaming write rate | ~40 000–50 000 samples/s |
| **Synchro** | Write rate (benchmarked, SQL Server) | ~1 000 000 samples/s |
| **Synchro** | 200M samples end-to-end | ~3.2 min |

## Session Backends

=== "SQLite / SSN2"

    ```python
    from pandlas import SQLiteConnection

    with SQLiteConnection(r"C:\data\demo.ssndb", "MySession", mode="w") as session:
        df.atlas.to_atlas_session(session)
    ```

    File-based sessions, ideal for local development and sharing.

=== "SQL Server"

    ```python
    from pandlas import SQLRaceDBConnection

    with SQLRaceDBConnection(r"SERVER\INSTANCE", "DATABASE", "MySession", mode="w") as session:
        df.atlas.to_atlas_session(session)
    ```

    Shared database sessions for team environments and live streaming.

=== "SSN2 (Read-only)"

    ```python
    from pandlas import Ssn2Session, get_samples

    with Ssn2Session(r"C:\data\session.ssn2") as session:
        data, timestamps = get_samples(session, "vCar:Chassis")
    ```

    Read data directly from `.ssn2` files.

## Requirements

!!! info "Prerequisites"

    - **ATLAS 10** installed with a valid licence (SQLRace option enabled)
    - **Python 3.9 – 3.11**
    - **pythonnet** ≥ 3.0.1

## Quick Install

```bash
pip install "git+https://github.com/Software-Products/pandlas.git"
```

!!! tip "Development Install"

    For active development, clone the repository and install in editable mode:

    ```bash
    git clone https://github.com/Software-Products/pandlas.git
    cd pandlas
    pip install -e .
    ```
