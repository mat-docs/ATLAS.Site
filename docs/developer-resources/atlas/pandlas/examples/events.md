# Events & Markers

Annotate sessions with discrete events, point markers, range markers, and lap boundaries.
These show up natively in ATLAS alongside your telemetry data.

---

## Events

Events represent discrete occurrences with associated numeric data — brake lockups, flag changes, pit stops, temperature warnings.
Each event type has a priority level and can carry multiple numeric values.

### Writing Events from a DataFrame

Each row in the DataFrame becomes one event. Numeric columns are stored as event values.

```python
import pandas as pd
from pandlas import SQLiteConnection, add_events

events = pd.DataFrame({
    "timestamp": pd.date_range("2026-04-01 14:00", periods=5, freq="30s"),
    "Status":        ["LK-001", "LK-002", "LK-003", "LK-004", "LK-005"],
    "BrakePressure": [32.1, 28.5, 35.0, 30.2, 29.8],
    "WheelSlip":     [0.12, 0.08, 0.15, 0.10, 0.09],
})

with SQLiteConnection(db_path, "Events Demo", mode="w") as session:
    df.atlas.to_atlas_session(session)

    add_events(
        session, events,
        status_column="Status",
        description="Brake Lockup",
        priority="high",
        application_group="BrakeApp",
    )
```

### Priority Levels

| Priority | Use Case | ATLAS Display |
|----------|----------|---------------|
| `"high"` | Safety-critical: lockups, impacts, system failures | :material-alert-circle:{ style="color: red" } Red |
| `"medium"` | Operational: flag changes, pit stops, mode switches | :material-alert:{ style="color: orange" } Amber |
| `"low"` | Informational: temperature shifts, strategy notes | :material-information:{ style="color: blue" } Blue |

### Multiple Event Types

Call `add_events()` once per event category — each gets its own event definition and conversion:

```python
# Brake lockups — HIGH priority
add_events(session, lockup_df,
           status_column="Status", description="Brake Lockup",
           priority="high", application_group="BrakeApp")

# Track flags — MEDIUM priority
add_events(session, flag_df,
           status_column="Status", description="Track Flag",
           priority="medium", application_group="RaceControl")

# Tyre temperature alerts — LOW priority
add_events(session, tyre_df,
           status_column="Status", description="Tyre Alert",
           priority="low", application_group="TyreApp")
```

### The Status Column

The `status_column` parameter controls what appears in the **Status** column of the ATLAS Event display.
Without it, you see raw numeric values. With it, you get human-readable labels like `"LK-001"` or `"PIT-IN"`.

---

## Point Markers

Point markers flag a specific moment in time — a braking point, a gear shift, a notable event.

```python
from pandlas import add_point_marker

add_point_marker(session, pd.Timestamp("2026-04-01 14:00:30"), "Braking Zone")
add_point_marker(session, pd.Timestamp("2026-04-01 14:01:00"), "Apex")
add_point_marker(session, pd.Timestamp("2026-04-01 14:01:15"), "Power On")
```

---

## Range Markers

Range markers highlight a time window — a safety car period, a pitstop window, or a section of interest.

```python
from pandlas import add_range_marker

add_range_marker(
    session,
    pd.Timestamp("2026-04-01 14:02:00"),
    pd.Timestamp("2026-04-01 14:02:30"),
    "Safety Car Period",
)
```

---

## Batch Markers

For large numbers of markers, use `add_markers_batch()` to write them in a single call:

```python
from pandlas import add_markers_batch

markers = [
    {"time": pd.Timestamp("2026-04-01 14:00:10"), "label": "Turn 1 Entry"},
    {"time": pd.Timestamp("2026-04-01 14:00:15"), "label": "Turn 1 Apex"},
    {"start": pd.Timestamp("2026-04-01 14:01:00"),
     "end":   pd.Timestamp("2026-04-01 14:01:10"),
     "label": "DRS Zone"},
]

add_markers_batch(session, markers)
```

---

## Laps

Lap boundaries define the structure of a session. ATLAS uses them for lap statistics, fastest lap tracking, and overlay comparisons.

```python
from pandlas import add_lap, update_lap

# Add lap boundaries
add_lap(session, start + pd.Timedelta(90, "s"), lap_name="Lap 2")
add_lap(session, start + pd.Timedelta(180, "s"), lap_name="Lap 3")

# Update an existing lap
update_lap(session, lap_index=1, new_name="Lap 2 (In-lap)")
```

!!! tip "Lap Ordering"

    Add laps **after** writing data. The lap trigger time must fall within the session's time range.

---

## Putting It All Together

??? example "Complete Session with Events, Markers, and Laps"

    ```python
    import pandas as pd
    import numpy as np
    from pandlas import (
        SQLiteConnection, add_events, add_point_marker,
        add_range_marker, add_lap, set_session_details,
    )

    start = pd.Timestamp("2026-04-01 14:00:00")
    t = np.linspace(0, 120, 12000)

    df = pd.DataFrame(
        {"Speed": 200 + 60 * np.sin(2 * np.pi * 0.05 * t)},
        index=pd.date_range(start, periods=12000, freq="10ms"),
    )
    df.atlas.units = {"Speed": "km/h"}

    events = pd.DataFrame({
        "timestamp": [start + pd.Timedelta(s, "s") for s in [15, 45, 75, 105]],
        "Status": ["LOCKUP-FL", "LOCKUP-FR", "LOCKUP-RL", "LOCKUP-RR"],
        "BrakePressure": [35.0, 28.0, 32.0, 30.0],
    })

    with SQLiteConnection(r"C:\data\full_demo.ssndb", "Full Demo", mode="w") as session:
        df.atlas.to_atlas_session(session)

        set_session_details(session, {"Driver": "Test", "Circuit": "Silverstone"})

        add_lap(session, start + pd.Timedelta(60, "s"), "Lap 2")

        add_point_marker(session, start + pd.Timedelta(30, "s"), "Pit Entry")
        add_range_marker(session, start + pd.Timedelta(50, "s"),
                         start + pd.Timedelta(55, "s"), "Pit Stop")

        add_events(session, events, status_column="Status",
                   description="Brake Lockup", priority="high",
                   application_group="BrakeApp")
    ```
