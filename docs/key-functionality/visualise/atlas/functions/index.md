## What Are Functions in ATLAS?

**Functions** in ATLAS are user-defined calculations that transform raw telemetry data into meaningful, derived parameters. They are written in a scripting language called **Function Definition Language (FDL)** and can be used just like any other parameter in displays, dashboards, and analysis workflows.

Functions are ideal for:
- Creating custom metrics (e.g. converting speed from m/s to km/h).
- Filtering or smoothing noisy data.
- Performing conditional logic or statistical analysis.
- Integrating external logic via DLLs or MATLAB.

---

## Why Use Functions?

| Use Case | Example |
|----------|---------|
| **Data Transformation** | Convert raw sensor data into engineering units. |
| **Derived Metrics** | Calculate lap averages, deltas, or performance indicators. |
| **Real-Time Analysis** | Apply logic to live telemetry streams. |
| **Custom Logic** | Implement domain-specific calculations without external tools. |

---

## Anatomy of a Function

- **Parameters**: Referenced using `$`, e.g. `$RPM`.
- **Constants**: Global values defined outside the function.
- **Processors**: Built-in compiled functions for math, filtering, etc.
- **Statements**: Control flow like `if`, `for`, `while`.
- **Return**: Every function must return a value.

---

## Function Properties Explained

### General Properties

| Property | Purpose |
|----------|---------|
| **Name** | Unique identifier for the function. |
| **Description** | Optional metadata for documentation. |
| **Format** | Display format (e.g. `%5.2f`). |
| **Units** | Engineering units (e.g. `kph`, `°C`). |
| **Display Min/Max** | Axis scaling for visualisation. |

### Function Properties

| Property                     | Description                                                                 | When to Use                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|------------------------------------------------------------------------------|
| **Function Mode**           | Determines how the function is evaluated over time.                        | Use `Instantaneous` for real-time; `Coverage Cursor` for historical review. |
| **Calculation Mode**        | Controls how often the function is evaluated.                              | Use `Fixed frequency` for filters and time-based logic.                     |
| **Calculation Frequency**   | Sets the rate of evaluation in Hz.                                         | Match this to your data rate or filter requirements.                        |
| **Interpolate Between Samples** | Fills in values between samples.                                       | Enable for smoother curves or aligning parameters with different rates.     |
| **Join Gaps Around Null**   | Prevents gaps in live data.                                                | Useful for real-time dashboards where continuity is important.              |

---

## Using the Function Parameter Browser

This panel lets you search and insert:

- **Parameters** from loaded sessions.
- **Constants** (global or session-specific).
- **Other Functions**.
- **Processors**.

### Adding Parameters

- Type `$` then press `Ctrl + Space` to auto-complete.
- Or double-click from the Parameter Browser.

---

## Built-in Processors

Processors are pre-compiled functions that run faster than interpreted FDL code.

### Categories

| Type | Examples |
|------|----------|
| **Math** | `abs()`, `sqrt()`, `log()`, `exp()` |
| **Trigonometry** | `sin()`, `cos()`, `atan2()` |
| **Filtering** | `Filter()`, `MedianFilter9()` |
| **Interpolation** | `LinearInterpolate()`, `BiLinearInterpolate()` |
| **Special** | `LapMax()`, `SessionMean()`, `SetMarker()` |