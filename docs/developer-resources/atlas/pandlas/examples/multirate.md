# Multi-Rate Sessions

Write parameters at different sample rates into a single ATLAS session. Each DataFrame write automatically detects the sample interval from the index and creates the appropriate channel configuration.

---

## Concept

In telemetry, not all parameters need the same sample rate.
High-bandwidth signals like suspension travel may need 1 kHz, while strategy parameters like fuel load only change once per second.
Pandlas handles this by writing each DataFrame independently — the sample rate is inferred from the `DatetimeIndex` spacing.

```
Session
├── 1 kHz:   DamperFL, DamperFR, DamperRL, DamperRR
├── 100 Hz:  SteeringAngle, BrakePressure, ThrottlePos
├── 10 Hz:   OilTemp, WaterTemp, OilPressure
└── 1 Hz:    FuelRemaining, TyreStrategy, LapDelta
```

---

## Example

```python
import pandas as pd
import numpy as np
from pandlas import SQLiteConnection, add_lap, set_session_details

db_path = r"C:\McLaren Applied\pandlas\MultiRate.ssndb"
start = pd.Timestamp("2026-04-01 14:00:00")
duration_s = 60

with SQLiteConnection(db_path, "Multi-Rate Demo", mode="w") as session:

    set_session_details(session, {
        "Driver": "Test Driver",
        "Circuit": "Silverstone",
        "Vehicle": "Dev Car 01",
    })

    # ── 1 kHz: Suspension ─────────────────────────────────────
    n_1khz = duration_s * 1000
    t = np.linspace(0, duration_s, n_1khz)
    df_1khz = pd.DataFrame(
        {
            "Chassis/DamperFL": 2.0 * np.sin(2 * np.pi * 3.0 * t),
            "Chassis/DamperFR": 2.0 * np.sin(2 * np.pi * 3.0 * t + 0.3),
            "Chassis/DamperRL": 1.8 * np.sin(2 * np.pi * 2.8 * t),
            "Chassis/DamperRR": 1.8 * np.sin(2 * np.pi * 2.8 * t + 0.3),
        },
        index=pd.date_range(start, periods=n_1khz, freq="1ms"),
    )
    df_1khz.atlas.parameter_group_separator = "/"
    df_1khz.atlas.units = {
        "Chassis/DamperFL": "mm", "Chassis/DamperFR": "mm",
        "Chassis/DamperRL": "mm", "Chassis/DamperRR": "mm",
    }
    df_1khz.atlas.to_atlas_session(session)

    # ── 100 Hz: Driver Inputs ─────────────────────────────────
    n_100hz = duration_s * 100
    t = np.linspace(0, duration_s, n_100hz)
    df_100hz = pd.DataFrame(
        {
            "Driver/SteeringAngle": 45 * np.sin(2 * np.pi * 0.5 * t),
            "Driver/BrakePressure": np.maximum(0, 80 * np.sin(2 * np.pi * 0.2 * t)),
            "Driver/ThrottlePos": np.maximum(0, 100 * np.cos(2 * np.pi * 0.2 * t)),
        },
        index=pd.date_range(start, periods=n_100hz, freq="10ms"),
    )
    df_100hz.atlas.parameter_group_separator = "/"
    df_100hz.atlas.units = {
        "Driver/SteeringAngle": "deg",
        "Driver/BrakePressure": "bar",
        "Driver/ThrottlePos": "%",
    }
    df_100hz.atlas.to_atlas_session(session)

    # ── 10 Hz: Temperatures ───────────────────────────────────
    n_10hz = duration_s * 10
    t = np.linspace(0, duration_s, n_10hz)
    df_10hz = pd.DataFrame(
        {
            "Powertrain/OilTemp": 95 + 5 * np.sin(2 * np.pi * 0.05 * t),
            "Powertrain/WaterTemp": 88 + 3 * np.sin(2 * np.pi * 0.03 * t),
        },
        index=pd.date_range(start, periods=n_10hz, freq="100ms"),
    )
    df_10hz.atlas.parameter_group_separator = "/"
    df_10hz.atlas.units = {
        "Powertrain/OilTemp": "degC",
        "Powertrain/WaterTemp": "degC",
    }
    df_10hz.atlas.to_atlas_session(session)

    # ── 1 Hz: Strategy ────────────────────────────────────────
    n_1hz = duration_s
    df_1hz = pd.DataFrame(
        {
            "Strategy/FuelRemaining": np.linspace(105, 100, n_1hz),
        },
        index=pd.date_range(start, periods=n_1hz, freq="s"),
    )
    df_1hz.atlas.parameter_group_separator = "/"
    df_1hz.atlas.units = {"Strategy/FuelRemaining": "kg"}
    df_1hz.atlas.to_atlas_session(session)

    # ── Laps ──────────────────────────────────────────────────
    add_lap(session, start + pd.Timedelta(30, "s"), lap_name="Lap 2")

print("Done — open in ATLAS to see 4 rate bands in one session.")
```

---

## What Happens in ATLAS

When you open this session, the Parameter Tree shows parameters organised by group:

- **Chassis** — 4 damper channels at 1 kHz
- **Driver** — 3 input channels at 100 Hz
- **Powertrain** — 2 temperature channels at 10 Hz
- **Strategy** — 1 fuel channel at 1 Hz

Each parameter automatically uses the correct sample interval.
Zoom in on the high-rate suspension data, or zoom out to see the full picture — ATLAS handles the interpolation and display.

!!! tip "Performance Tip"

    Write the highest-rate data first. The session configuration is created on the first `to_atlas_session()` call, and subsequent writes reuse the existing config set.
