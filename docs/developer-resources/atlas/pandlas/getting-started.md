# Getting Started

This guide walks through environment setup and your first session write — from an empty Python project to data visible in ATLAS.

---

## 1. Environment Setup

### Install ATLAS 10

Pandlas relies on the SQL Race API DLLs shipped with ATLAS 10. Ensure you have a working ATLAS installation with the SQLRace licence option enabled.

!!! note "Default Install Path"

    ```
    C:\Program Files\McLaren Applied Technologies\ATLAS 10
    ```

### Create a Python Project

=== "PyCharm"

    1. Create a new project with a virtual environment (Python 3.9–3.11)
    2. Open the terminal and install dependencies:

        ```bash
        pip install "git+https://github.com/Software-Products/pandlas.git"
        ```

=== "VS Code"

    1. Create a project folder and a virtual environment:

        ```bash
        python -m venv .venv
        .venv\Scripts\activate
        pip install "git+https://github.com/Software-Products/pandlas.git"
        ```

=== "Command Line"

    ```bash
    mkdir my-atlas-project && cd my-atlas-project
    python -m venv .venv
    .venv\Scripts\activate
    pip install "git+https://github.com/Software-Products/pandlas.git"
    ```

### Configure the .NET Runtime

The .NET Core runtime must be loaded **before** any `clr` import. Pandlas handles this automatically, but if you need to customise the runtime config:

```python
from pythonnet import load

load(
    "coreclr",
    runtime_config=r"C:\Program Files\McLaren Applied Technologies\ATLAS 10\MAT.Atlas.Host.runtimeconfig.json",
)
```

!!! warning "Runtime Initialisation Order"

    This call must happen **before** `import clr` or any Pandlas import. Once the runtime is initialised, it cannot be changed.

---

## 2. Write Your First Session

Create a file called `first_session.py`:

```python
import pandas as pd
import numpy as np
from pandlas import SQLiteConnection

# Generate sample data — 10 seconds at 100 Hz
start = pd.Timestamp("2026-04-01 14:00:00")
t = np.linspace(0, 10, 1000)

df = pd.DataFrame(
    {
        "Speed": 200 + 50 * np.sin(2 * np.pi * 0.2 * t),
        "Throttle": 50 + 50 * np.sin(2 * np.pi * 0.2 * t + 0.5),
        "BrakePressure": np.maximum(0, -80 * np.sin(2 * np.pi * 0.2 * t + 1.0)),
    },
    index=pd.date_range(start, periods=1000, freq="10ms"),
)

# Set metadata
df.atlas.units = {
    "Speed": "km/h",
    "Throttle": "%",
    "BrakePressure": "bar",
}

# Write to a local SQLite session
db_path = r"C:\McLaren Applied\pandlas\FirstSession.ssndb"

with SQLiteConnection(db_path, "First Session", mode="w") as session:
    df.atlas.to_atlas_session(session)

print("Session written — open it in ATLAS!")
```

Run it:

```bash
python first_session.py
```

Then open the `.ssndb` file in ATLAS to see your data.

---

## 3. Add Laps, Markers and Details

Extend the script to enrich the session with metadata:

```python
from pandlas import add_lap, add_point_marker, add_range_marker, set_session_details

with SQLiteConnection(db_path, "First Session", mode="w") as session:
    df.atlas.to_atlas_session(session)

    # Session metadata
    set_session_details(session, {
        "Driver": "Test Driver",
        "Circuit": "Silverstone",
        "Vehicle": "Dev Car 01",
    })

    # Laps
    add_lap(session, start + pd.Timedelta(5, "s"), lap_name="Lap 2")

    # Markers
    add_point_marker(session, start + pd.Timedelta(2, "s"), "Braking Zone")
    add_range_marker(
        session,
        start + pd.Timedelta(3, "s"),
        start + pd.Timedelta(4, "s"),
        "Cornering Phase",
    )
```

---

## 4. Use Parameter Groups

Organise parameters into logical groups by including a separator in column names:

```python
df = pd.DataFrame(
    {
        "Chassis/DamperFL": np.random.randn(1000),
        "Chassis/DamperFR": np.random.randn(1000),
        "Engine/RPM": 8000 + 500 * np.sin(2 * np.pi * 0.5 * t),
        "Engine/OilTemp": 90 + 5 * np.sin(2 * np.pi * 0.1 * t),
    },
    index=pd.date_range(start, periods=1000, freq="10ms"),
)

df.atlas.parameter_group_separator = "/"
df.atlas.to_atlas_session(session)
```

In ATLAS, you will see the parameters nested under their respective groups: `Chassis` and `Engine`.

---

## 5. Go Live

Stream data into ATLAS in real time by enabling the recorder:

```python
import time

with SQLiteConnection(db_path, "Live Demo", mode="w", recorder=True) as session:
    set_session_details(session, {"Source": "Live Streaming Demo"})

    for i in range(300):  # 5 minutes at 1 Hz
        now = pd.Timestamp.now()
        row = pd.DataFrame(
            {"Temperature": [20 + i * 0.1]},
            index=pd.DatetimeIndex([now]),
        )
        row.atlas.units = {"Temperature": "degC"}
        row.atlas.to_atlas_session(session, show_progress_bar=False)
        time.sleep(1)
```

Open the session in ATLAS while the script is running — the data scrolls in real time.

---

## Next Steps

<div class="grid cards" markdown>

-   :material-code-braces:{ .lg .middle } **API Reference**

    ---

    Full reference for every public function and class in Pandlas.

    [:octicons-arrow-right-24: API Reference](api-reference.md)

-   :material-television-play:{ .lg .middle } **Examples**

    ---

    Complete worked examples from multi-rate sessions to live streaming.

    [:octicons-arrow-right-24: Multi-Rate Sessions](examples/multirate.md)

-   :material-access-point:{ .lg .middle } **Live Streaming**

    ---

    Stream data from APIs, sensors, and simulations directly into ATLAS.

    [:octicons-arrow-right-24: Live Streaming](examples/live-streaming.md)

-   :material-alert-circle:{ .lg .middle } **Events & Markers**

    ---

    Add discrete events, laps, and markers to annotate your sessions.

    [:octicons-arrow-right-24: Events & Markers](examples/events.md)

</div>
