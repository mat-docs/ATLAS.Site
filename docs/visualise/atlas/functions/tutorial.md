
## 📈 Example Use Cases

| Scenario | Function |
|----------|----------|
| **Throttle Delta** | `return($Throttle - $ThrottleRef)` |
| **Lap Time Marker** | `if ($Speed < 5) SetMarker("Lap Start")` |
| **Filtered RPM** | `return(Filter($RPM, 5))` |
| **Interpolated Map** | `return(BiLinearInterpolate("map.3d", $X, $Y))` |

### 🧪 Worked Tutorial: Filtering Noisy RPM Data

#### Objective
Smooth out high-frequency noise in the RPM signal using a low-pass filter. This is useful for improving the readability of engine speed data and reducing transient spikes that may obscure trends.

#### Step-by-Step

1. **Open the Function Editor**
   - Navigate to `View > Function Editor` or click the Function Editor icon on the toolbar.

2. **Create a New Function**
   - Use `File > New` or press `Ctrl + N`.

3. **Configure General Properties**
   - **Name**: `FilteredRPM`
   - **Units**: `rpm`
   - **Format**: `%5.0f`
   - **Display Min/Max**: `0` to `10000` (adjust based on expected RPM range)

4. **Configure Function Properties**
   - **Function Mode**: `Instantaneous`
   - **Calculation Mode**: `Fixed frequency`
   - **Calculation Frequency (Hz)**: `100`  
     > 📝 *TODO: Confirm optimal frequency for RPM filtering based on your data sampling rate.*
   - **Interpolate Between Samples**: Enabled
   - **Join Gaps Around Null**: Enabled

5. **Write the Function Code**

```fdl
return(Filter($RPM, 5))
```
6. **Build and Test**
    - Press F6 to build the function.
    - Add it to a display and verify the output is smoother than the raw $RPM.