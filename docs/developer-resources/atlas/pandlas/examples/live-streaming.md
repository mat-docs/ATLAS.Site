# Live Streaming

Stream real-time data from external sources — APIs, sensors, simulations — directly into ATLAS live sessions.
The data appears immediately in ATLAS and scrolls forward as new samples arrive.

---

## How Live Sessions Work

Setting `recorder=True` on any connection activates the ATLAS Server Listener.
ATLAS detects the session automatically and displays it as a live recording.

```python
from pandlas import SQLiteConnection

with SQLiteConnection(db_path, "Live Demo", mode="w", recorder=True) as session:
    # Session is now visible in ATLAS as live
    # Write data in a loop — ATLAS scrolls in real time
    ...
```

Every live example follows the same three-stage pipeline:

1. **Data Source** — an external API, hardware sensor, or network stream produces readings at its own cadence (seconds for REST APIs, milliseconds for IMU sensors).
2. **Python Loop** — a tight polling loop fetches the latest values and writes a single-row DataFrame to the session on each iteration, typically at 100 Hz. Between source updates, the last known values are repeated to maintain a smooth, continuous signal.
3. **ATLAS (Live)** — the SQL Race recorder publishes each write to the ATLAS Server Listener. ATLAS picks up the session automatically and scrolls the display forward as new samples arrive.

!!! tip "Smooth Scrolling"

    Poll external APIs every few seconds, but write to ATLAS at a higher rate (e.g. 100 Hz).
    Repeat the last known values between polls — this gives ATLAS a smooth, continuous data stream.

---

## Example: ISS Live Tracker

A minimal starting point for live streaming. This example polls the [Where the ISS at?](https://wheretheiss.at/) public API once per second and writes the station's position, altitude, and velocity into ATLAS as a live session.

It demonstrates the core pattern with the least amount of code — no event logic, no multi-rate complexity, just a polling loop and a DataFrame write:

```python
"""Track the International Space Station in ATLAS — live."""

import time
import logging
import requests
import pandas as pd
from pandlas import SQLiteConnection

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

WTIA_ENDPOINT = "https://api.wheretheiss.at/v1/satellites/25544"
db_path = r"C:\McLaren Applied\pandlas\LiveISS.ssndb"

with SQLiteConnection(db_path, "Live ISS Demo", mode="w", recorder=True) as session:
    while True:
        response = requests.get(WTIA_ENDPOINT, timeout=5)
        if response.status_code == 200:
            data = response.json()
            df = pd.DataFrame([data])
            df.index = pd.to_datetime(df["timestamp"], unit="s")
            df.drop(columns=["visibility", "name", "units"], inplace=True)
            df.atlas.to_atlas_session(session, show_progress_bar=False)
            logger.info("ISS at %.2f, %.2f — alt %.0f km",
                        data["latitude"], data["longitude"], data["altitude"])
        else:
            logger.warning("API returned %d", response.status_code)
        time.sleep(1)
```

**Parameters streamed:** latitude, longitude, altitude, velocity, footprint, daynum, solar_lat, solar_lon, timestamp.

The session appears in ATLAS immediately. Open the Parameter Browser, add any of the channels to a display, and watch the ISS orbit update in real time.

See [`example/where_the_iss_at.py`](https://github.com/Software-Products/pandlas/blob/main/example/where_the_iss_at.py) for the repository version.

---

## Example: Live Weather Station

Stream weather data from the [Open-Meteo API](https://open-meteo.com) (free, no key required) into ATLAS.

??? example "Full Source — `live_weather.py`"

    ```python
    import time
    import pandas as pd
    import requests
    from pandlas import SQLiteConnection, add_point_marker, add_events, set_session_details

    API_URL = (
        "https://api.open-meteo.com/v1/forecast"
        "?latitude=52.0705&longitude=-1.0165"
        "&current=temperature_2m,wind_speed_10m,wind_gusts_10m,"
        "precipitation,surface_pressure,cloud_cover"
        "&timezone=Europe%2FLondon"
    )

    POLL_S = 10        # API poll interval
    STREAM_S = 0.01    # 100 Hz to ATLAS
    DURATION_S = 120   # 2 minutes

    db_path = r"C:\McLaren Applied\pandlas\LiveWeather.ssndb"

    with SQLiteConnection(db_path, "Weather Silverstone", mode="w", recorder=True) as session:
        set_session_details(session, {"Location": "Silverstone", "Source": "Open-Meteo"})

        last_row = None
        t_start = time.time()
        next_poll = t_start

        while (time.time() - t_start) < DURATION_S:
            # Poll API at configured interval
            if time.time() >= next_poll:
                resp = requests.get(API_URL, timeout=5)
                if resp.status_code == 200:
                    data = resp.json()["current"]
                    last_row = {
                        "Temperature": float(data["temperature_2m"]),
                        "WindSpeed": float(data["wind_speed_10m"]),
                        "WindGusts": float(data["wind_gusts_10m"]),
                        "Precipitation": float(data["precipitation"]),
                        "Pressure": float(data["surface_pressure"]),
                        "CloudCover": float(data["cloud_cover"]),
                    }
                next_poll = time.time() + POLL_S

            # Stream at 100 Hz
            if last_row:
                now = pd.Timestamp.now()
                df = pd.DataFrame([last_row], index=pd.DatetimeIndex([now]))
                df.atlas.units = {
                    "Temperature": "degC", "WindSpeed": "km/h",
                    "WindGusts": "km/h", "Precipitation": "mm",
                    "Pressure": "hPa", "CloudCover": "%",
                }
                df.atlas.to_atlas_session(session, show_progress_bar=False)

            time.sleep(STREAM_S)
    ```

**Sensors captured:** temperature, wind speed, gusts, precipitation, pressure, cloud cover.

**Events generated:** wind gust alerts, rain onset/cessation, temperature shifts.

---

## Building Your Own Live Source

The pattern is straightforward — any data source that produces numeric readings can be streamed into ATLAS:

```python
import time
import pandas as pd
from pandlas import SQLiteConnection, set_session_details

def fetch_data():
    """Replace with your data source — API call, serial port read, etc."""
    return {"SensorA": 42.0, "SensorB": 3.14}

with SQLiteConnection(db_path, "My Live Session", mode="w", recorder=True) as session:
    set_session_details(session, {"Source": "Custom Sensor"})

    for _ in range(6000):  # 1 minute at 100 Hz
        now = pd.Timestamp.now()
        row = pd.DataFrame([fetch_data()], index=pd.DatetimeIndex([now]))
        row.atlas.to_atlas_session(session, show_progress_bar=False)
        time.sleep(0.01)
```

Wrap your data source in the `fetch_data()` function and the rest is handled by Pandlas.
