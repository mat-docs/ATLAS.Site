# Parameter Data Access

**ParameterDataAccess objects (PDAs)** are used to defines how parameter values are 
sampled or interpolated via SQL Race.

PDA can be created by the
`Session.CreateParameterDataAccess(parameterIdentifier)`
method and is associated with both the Session and a Parameter. 
More than one PDA can exist within a session as each pda can be used to retrieve values 
from a different parameter.

Methods on the PDA allow you to:

* Move to specific point in time
* Set the sample time
* Read sub-sampled data
* Read interpolated data
* Read the measured sample values

!!! info "Best practice"
    
    * Opening a PDA uses up memory until the session is closed and disposed. It is best to open a PDA for a parameter once and cache it. Then you can reuse it throughout the session. An example of when this is particularly useful is when iterating through laps. It is better to open each PDA once than to open and dispose of them inside the lap iteration.
    * Calls to a PDA is not thread safe. If you are wanting to access data using the same Parameter in different threads, it is better to consider opening a small pool of PDAs for the threads to use. You have to be extra careful when using method that require the PDA's current position to ensure that it is only being used by one thread.

## Samples and Data
Within the context of PDA methods, *samples* refers to the values as logged by the 
datalogger, whereas *data* refers to sub-sampled, or interpolated values at a predefined
fixed frequency.

A parameter can contain several channels logged at different rates, and the two families
of read methods reflect this:

| | `GetNextSamples` / `GetSamplesUntil` | `GetNextData` / `GetData` |
|---|---|---|
| **Returns** | Raw logged **samples** | Resampled **data** on a fixed grid |
| **Timestamps** | Each channel's *native* timestamps | A uniform `SampleTime` grid shared by every channel |
| **`SampleTime`** | Ignored | Defines the grid interval (ns) |
| **Sample mode** | — | `First` / `Minimum` / `Maximum` / `Mean` |
| **Interpolation** | — | Optional linear interpolation when up-sampling |
| **Direction** | `StepDirection.Forward` / `Reverse` | Forward only |
| **Best for** | Maximum fidelity — exactly what was recorded | Aligning channels, plotting, consistent time steps |

!!! note

    `SampleTime` only affects `GetNextData`/`GetData`. It has **no effect** on
    `GetNextSamples`/`GetSamplesUntil`, which always return the raw logged samples.

Toggle the two read styles below. **GetNextSamples** keeps each channel on its own
native timestamps (the highest-rate channel sets the cadence, and the slower channel has
no value in between); **GetNextData** snaps everything onto one uniform `SampleTime`
grid so the channels line up — drag **SampleTime**, change the mode, and toggle
interpolation to see the effect.

<div class="pda-samples-vs-data"></div>

## Choosing the Output Frequency

With `GetNextData` you choose the output rate by setting the PDA's `SampleTime`
(in **nanoseconds**). The returned frequency is `1e9 / SampleTime`:

| `SampleTime` (ns) | Output frequency |
|-------------------|------------------|
| `2,000,000`       | 500 Hz |
| `10,000,000`      | 100 Hz |
| `20,000,000`      | 50 Hz  |

The overlay below compares the true signal against `GetNextSamples` (every logged
sample) and `GetNextData` at 500 Hz and 50 Hz. Drag the slider to request any output
frequency and watch the trade-off: a lower frequency averages each window and loses the
peaks, while a higher frequency can't recover detail beyond the logged rate.

<div class="pda-fidelity"></div>

### `GetNextSamples` — every logged sample

Raw samples at the channel's native timestamps. Not affected by `SampleTime`.

=== "C#"

    ``` csharp
    pda.GoTo(session.StartTime);
    long n = pda.GetSamplesCount(session.StartTime, session.EndTime);

    ParameterValues samples = pda.GetNextSamples((int)n, StepDirection.Forward);
    double[] values = samples.Data;
    ```

=== "Python"

    ``` python
    parameter_pda = session.CreateParameterDataAccess("vCar")
    parameter_pda.GoTo(session.StartTime)
    n_samples = parameter_pda.GetSamplesCount(session.StartTime, session.EndTime)

    samples = parameter_pda.GetNextSamples(n_samples, StepDirection.Forward)
    values = list(samples.Data)
    ```

=== "MATLAB"

    ``` matlab
    pda.GoTo(session.StartTime);
    n = pda.GetSamplesCount(session.StartTime, session.EndTime);

    samples = pda.GetNextSamples(int32(n), StepDirection.Forward);
    values = double(samples.Data);
    ```

### `GetNextData` — resampled at a fixed frequency

Set `SampleTime` to choose the output rate, then read `n` aligned samples
(default mode is `Mean`).

=== "C#"

    ``` csharp
    pda.SampleTime = 2_000_000;   // 2 ms -> 500 Hz

    long n = pda.GetSamplesCount(lap.StartTime, lap.EndTime);
    ParameterValues data = pda.GetNextData((int)n);
    double[] values500Hz = data.Data;
    ```

=== "Python"

    ``` python
    parameter_pda = session.CreateParameterDataAccess("vCar")

    parameter_pda.SampleTime = 10000000   # 10 ms -> 100 Hz
    n_samples = parameter_pda.GetSamplesCount(lap.StartTime, lap.EndTime)

    getnextdata = parameter_pda.GetNextData(n_samples)
    getnextdata_values_100Hz = list(getnextdata.Data)
    ```

=== "MATLAB"

    ``` matlab
    parameter_pda = session.CreateParameterDataAccess("vCar");

    parameter_pda.SampleTime = 10000000;   % 10 ms -> 100 Hz
    n = parameter_pda.GetSamplesCount(lap.StartTime, lap.EndTime);

    getnextdata = parameter_pda.GetNextData(int32(n));
    values_100Hz = double(getnextdata.Data);
    ```

## Sample Modes
Sample modes define the behaviour when sub-sampling. 

| Sample Mode | Behaviour |
|-------------|-----------|
| First | Return the first sample value in the range. |
| Maximum | Return the maximum sample value in the range. |
| Mean | Return the average sample value across the range. |
| Minimum | Return the minimum sample value in the range. |

The chart below applies all four modes to the same logged signal. Drag
**SampleTime** to widen the sub-sample interval and watch `Maximum` track the
peaks, `Minimum` the troughs, and `Mean` smooth through the middle — the coarser
the interval, the more the modes diverge.

<div class="pda-sample-modes"></div>

## Reading a Specific Channel

By default a PDA reads across **all** channels of a parameter. To read a single channel
(or a subset), pass a list of channel IDs to `CreateParameterDataAccess`. Inspect the
available channels first via `Parameter.Channels`, then build the ID list:

=== "C#"

    ``` csharp
    var vCar = session.GetParameter("vCar");

    // Inspect the channels that make up the parameter
    foreach (var c in vCar.Channels)
    {
        Console.WriteLine($"Name: {c.Name}, Id: {c.Id}, DataSource: {c.DataSource}, " +
            $"DataType: {c.DataType}, Interval: {c.Interval} ns, " +
            $"SampleSize: {c.SampleSizeInBytes} bytes");
    }

    // Build a list containing just the channel(s) you want
    var channelIds = new List<uint> { vCar.Channels[0].Id };

    // Create a PDA scoped to those channels
    using (var pda = session.CreateParameterDataAccess(vCar.Identifier, channelIds))
    {
        pda.GoTo(session.StartTime);
        long nSamples = pda.GetSamplesCount(session.StartTime, session.EndTime);
        var values = pda.GetNextSamples((int)nSamples, StepDirection.Forward);
    }
    ```

=== "Python"

    ``` python
    from System import UInt32
    from System.Collections.Generic import List

    vCar = session.GetParameter("vCar")

    # Inspect the channels that make up the parameter
    for c in vCar.Channels:
        print("Channel Name:", c.Name)
        print("  Id:", c.Id)
        print("  DataSource:", c.DataSource.ToString())
        print("  DataType:", c.DataType.ToString())
        print("  Interval (ns):", c.Interval)
        if c.Interval != 0:
            # nanoseconds -> kHz
            print("  Frequency (kHz):", 1 / (float(c.Interval) * 1e-6))
        print("  Sample Size (bytes):", c.SampleSizeInBytes)

    # Build a List[UInt32] with just the channel id(s) you want
    channel_ids_list = List[UInt32]()
    channel_ids_list.Add(vCar.Channels[0].Id)

    # Create a PDA scoped to those channels
    parameter_pda = session.CreateParameterDataAccess(vCar.Identifier, channel_ids_list)
    parameter_pda.GoTo(session.StartTime)
    n_samples = parameter_pda.GetSamplesCount(session.StartTime, session.EndTime)
    ```

=== "MATLAB"

    ``` matlab
    vCar = session.GetParameter("vCar");

    % Inspect the channels that make up the parameter
    channels = vCar.Channels;
    for i = 1:channels.Count
        c = channels.Item(i - 1);
        fprintf('Name: %s, Id: %d, DataSource: %s, DataType: %s, Interval: %d ns, SampleSize: %d bytes\n', ...
            char(c.Name), c.Id, char(c.DataSource.ToString()), ...
            char(c.DataType.ToString()), c.Interval, c.SampleSizeInBytes);
    end

    % Build a List<uint32> with just the channel id(s) you want
    channelIds = NET.createGeneric('System.Collections.Generic.List', {'System.UInt32'});
    channelIds.Add(uint32(channels.Item(0).Id));

    % Create a PDA scoped to those channels
    pda = session.CreateParameterDataAccess(vCar.Identifier, channelIds);
    pda.GoTo(session.StartTime);
    nSamples = pda.GetSamplesCount(session.StartTime, session.EndTime);
    values = double(pda.GetNextSamples(int32(nSamples), StepDirection.Forward).Data);
    ```

!!! tip "Why scope to a channel?"

    A parameter such as `vCar` may aggregate several channels — logged at different rates
    or from different sources. Scoping the PDA to one channel avoids reading data you don't
    need and lets you walk a single source at its native rate.

## Lap Statistics

`GetLapStatistics` computes aggregate statistics for a parameter over a single
[`Lap`](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Lap.html)'s
time range. Pass one or more `StatisticOption` flags to choose what to compute; the
results come back in an `IParameterDataStatistics` object. It takes a
*"show your workings"* approach — requesting `StandardDeviation`, for example, also
returns the sum of values and the mean. Samples with `NaN` values are skipped.

Pick a parameter and toggle the statistics below. Each lap's Min, Max, Mean and ±σ band
are drawn over the trace, and the table mirrors the `IParameterDataStatistics` fields you
would read back per lap.

<div class="pda-lap-stats"></div>

=== "C#"

    ``` csharp
    using var pda = session.CreateParameterDataAccess("vCar:Chassis");

    foreach (var lap in session.LapCollection)
    {
        IParameterDataStatistics stats = pda.GetLapStatistics(
            lap,
            false,   // weightStatistics
            StatisticOption.Min | StatisticOption.Max |
            StatisticOption.Mean | StatisticOption.StandardDeviation);

        Console.WriteLine(
            $"{lap.Name}: min={stats.MinimumValue:F1} max={stats.MaximumValue:F1} " +
            $"mean={stats.MeanValue:F1} sd={stats.StandardDeviation:F2} " +
            $"n={stats.NumberOfSamples}");
    }
    ```

=== "Python"

    ``` python
    pda = session.CreateParameterDataAccess("vCar:Chassis")

    for lap in session.LapCollection:
        stats = pda.GetLapStatistics(
            lap,
            False,   # weightStatistics
            StatisticOption.Min | StatisticOption.Max |
            StatisticOption.Mean | StatisticOption.StandardDeviation)

        print(f"{lap.Name}: min={stats.MinimumValue:.1f} max={stats.MaximumValue:.1f} "
              f"mean={stats.MeanValue:.1f} sd={stats.StandardDeviation:.2f} "
              f"n={stats.NumberOfSamples}")
    ```

=== "MATLAB"

    ``` matlab
    pda = session.CreateParameterDataAccess("vCar:Chassis");

    opts = bitor(int32(StatisticOption.Min), int32(StatisticOption.Max));
    opts = bitor(opts, int32(StatisticOption.Mean));
    opts = bitor(opts, int32(StatisticOption.StandardDeviation));

    laps = session.LapCollection;
    for i = 1:laps.Count
        lap = laps.Item(i - 1);
        stats = pda.GetLapStatistics(lap, false, opts);

        fprintf('%s: min=%.1f max=%.1f mean=%.1f sd=%.2f n=%d\n', ...
            char(lap.Name), stats.MinimumValue, stats.MaximumValue, ...
            stats.MeanValue, stats.StandardDeviation, stats.NumberOfSamples);
    end
    ```

For an arbitrary time range rather than a lap, use
`GetDataStatistics(startTimeNs, durationNs, weightStatistics, statisticOption)` with the
same `StatisticOption` flags.

### Reading more statistics

`StatisticOption` is a flag enum, so a single call can compute many statistics at once.
This example requests the full set and reads back the populated fields:

=== "C#"

    ``` csharp
    var stats = pda.GetLapStatistics(lap, false,
        StatisticOption.Min | StatisticOption.Max | StatisticOption.Mean |
        StatisticOption.StandardDeviation | StatisticOption.AbsoluteMean |
        StatisticOption.GeometricMean | StatisticOption.Delta);

    Console.WriteLine($"start={stats.StartValue:F1}  end={stats.EndValue:F1}  delta={stats.DeltaValue:F1}");
    Console.WriteLine($"min={stats.MinimumValue:F1} @ {stats.MinimumTime} ns ({stats.MinimumStatus})");
    Console.WriteLine($"max={stats.MaximumValue:F1} @ {stats.MaximumTime} ns ({stats.MaximumStatus})");
    Console.WriteLine($"mean={stats.MeanValue:F1}  absMean={stats.AbsoluteMeanValue:F1}  geoMean={stats.GeometricMeanValue:F1}");
    Console.WriteLine($"sd={stats.StandardDeviation:F2}  n={stats.NumberOfSamples}  NaNs={stats.NumberOfNansSkipped}");
    ```

=== "Python"

    ``` python
    stats = pda.GetLapStatistics(lap, False,
        StatisticOption.Min | StatisticOption.Max | StatisticOption.Mean |
        StatisticOption.StandardDeviation | StatisticOption.AbsoluteMean |
        StatisticOption.GeometricMean | StatisticOption.Delta)

    print(f"start={stats.StartValue:.1f} end={stats.EndValue:.1f} delta={stats.DeltaValue:.1f}")
    print(f"min={stats.MinimumValue:.1f} @ {stats.MinimumTime} ns ({stats.MinimumStatus})")
    print(f"max={stats.MaximumValue:.1f} @ {stats.MaximumTime} ns ({stats.MaximumStatus})")
    print(f"mean={stats.MeanValue:.1f} absMean={stats.AbsoluteMeanValue:.1f} geoMean={stats.GeometricMeanValue:.1f}")
    print(f"sd={stats.StandardDeviation:.2f} n={stats.NumberOfSamples} NaNs={stats.NumberOfNansSkipped}")
    ```

=== "MATLAB"

    ``` matlab
    opts = int32(StatisticOption.Min);
    opts = bitor(opts, int32(StatisticOption.Max));
    opts = bitor(opts, int32(StatisticOption.Mean));
    opts = bitor(opts, int32(StatisticOption.StandardDeviation));
    opts = bitor(opts, int32(StatisticOption.AbsoluteMean));
    opts = bitor(opts, int32(StatisticOption.GeometricMean));
    opts = bitor(opts, int32(StatisticOption.Delta));

    stats = pda.GetLapStatistics(lap, false, opts);

    fprintf('start=%.1f  end=%.1f  delta=%.1f\n', ...
        stats.StartValue, stats.EndValue, stats.DeltaValue);
    fprintf('min=%.1f @ %d ns (%s)\n', stats.MinimumValue, stats.MinimumTime, ...
        char(stats.MinimumStatus.ToString()));
    fprintf('max=%.1f @ %d ns (%s)\n', stats.MaximumValue, stats.MaximumTime, ...
        char(stats.MaximumStatus.ToString()));
    fprintf('mean=%.1f  absMean=%.1f  geoMean=%.1f\n', ...
        stats.MeanValue, stats.AbsoluteMeanValue, stats.GeometricMeanValue);
    fprintf('sd=%.2f  n=%d  NaNs=%d\n', ...
        stats.StandardDeviation, stats.NumberOfSamples, stats.NumberOfNansSkipped);
    ```

**Trend (linear regression).** `SlopeIntercept` and `SlopeRSquared` fit a line to the lap's
samples, where *X* is the sample number (1, 2, 3, …) and *Y* is the sample value — useful for
spotting drift, e.g. brake or tyre temperature creeping up over a lap. Toggle **Trend (slope)**
in the chart above to see the fitted line per lap.

=== "C#"

    ``` csharp
    var stats = pda.GetLapStatistics(lap, false,
        StatisticOption.SlopeIntercept | StatisticOption.SlopeRSquared);

    Console.WriteLine($"slope={stats.RegressionSlopeValue:F4} per sample, " +
        $"intercept={stats.RegressionInterceptValue:F2}, R2={stats.RegressionRSquaredValue:F3}");
    ```

=== "Python"

    ``` python
    stats = pda.GetLapStatistics(lap, False,
        StatisticOption.SlopeIntercept | StatisticOption.SlopeRSquared)

    print(f"slope={stats.RegressionSlopeValue:.4f} per sample, "
          f"intercept={stats.RegressionInterceptValue:.2f}, R2={stats.RegressionRSquaredValue:.3f}")
    ```

=== "MATLAB"

    ``` matlab
    opts = bitor(int32(StatisticOption.SlopeIntercept), int32(StatisticOption.SlopeRSquared));

    stats = pda.GetLapStatistics(lap, false, opts);

    fprintf('slope=%.4f per sample, intercept=%.2f, R2=%.3f\n', ...
        stats.RegressionSlopeValue, stats.RegressionInterceptValue, stats.RegressionRSquaredValue);
    ```

**Weighted statistics.** Set `weightStatistics = true` to weight the mean, absolute mean and
standard deviation by each sample's interval — important for variable-rate (synchro) data
where samples are not evenly spaced in time:

=== "C#"

    ``` csharp
    var weighted = pda.GetLapStatistics(lap, true,
        StatisticOption.Mean | StatisticOption.StandardDeviation);
    ```

=== "Python"

    ``` python
    weighted = pda.GetLapStatistics(lap, True,
        StatisticOption.Mean | StatisticOption.StandardDeviation)
    ```

=== "MATLAB"

    ``` matlab
    opts = bitor(int32(StatisticOption.Mean), int32(StatisticOption.StandardDeviation));

    weighted = pda.GetLapStatistics(lap, true, opts);
    ```

### Statistic options

`StatisticOption` is a flag enum — combine options with `|` to compute several in a
single call. Each option populates specific result fields:

| `StatisticOption` | Populates |
|-------------------|-----------|
| `Min` | `MinimumValue`, `MinimumTime`, `MinimumStatus` |
| `Max` | `MaximumValue`, `MaximumTime`, `MaximumStatus` |
| `Mean` | `MeanValue`, `SumOfSampleValues` |
| `StandardDeviation` | `StandardDeviation`, `MeanValue`, `SumOfSampleValues`, `SumOfSquaredSampleValues` |
| `AbsoluteMean` | `AbsoluteMeanValue`, `SumOfAbsoluteSampleValues` |
| `GeometricMean` | `GeometricMeanValue` (positive values only) |
| `Delta` | `DeltaValue` (last − first sample) |
| `SlopeIntercept` / `SlopeRSquared` | `RegressionSlopeValue`, `RegressionInterceptValue`, `RegressionRSquaredValue` |

`StartValue`, `EndValue`, `NumberOfSamples`, `NumberOfNansSkipped` and `TimeRange` are
always populated; the default (`None`) returns only start/end values.

!!! note

    * Statistics are **cached** per lap for fast repeat access.
    * The lap must have an end time and a start ≥ 0, otherwise `ArgumentNullException` /
      `ArgumentException` is thrown.
    * If the lap's range falls outside the available data, `NumberOfSamples` is `0`.
    * Set `weightStatistics = true` to weight the mean, absolute mean and standard
      deviation by each sample's interval.
    * `StatisticOption` lives in `MESL.SqlRace.Domain.Infrastructure.DataPipeline`.

## Data Status
`ParameterValues.DataStatus` provides additional information about the values returned 
in `ParameterValues.Data`.

When retrieving values via a PDA, the arrays within `ParameterValues` will always be the
length of the requested sample size, regardless of the number of values requested. 

As an example, when there are only 100 samples left between the cursor and the end of 
the session, and the sample size requested is larger than 100. The first 100 
data status will be `Sample`, and the remaining `DataStatus` will be `AfterEnd`.


The property `ParameterValues.SampleCount` can be used to check the number of valid 
samples within the returned array.

* Samples that represents values as measured by the data logger will have data status `Sample`.
* Data that are interpolated will have data status `Interpolated`.



| **DataStatusType** | **Description** |
|--------------------|-----------------|
| `Missing`          | No sample is available. *(Should be excluded from processing)* |
| `Sample`           | A valid sample exists within the current sample period. *(Recommended for processing)* |
| `Default`          | The sensor failed and the ECU returned a default value. |
| `BeforeStart`      | Data was requested before the first available sample. |
| `AfterEnd`         | Data was requested after the last available sample. |
| `Incomplete`       | The sample interval includes missing samples. |
| `Interpolated`     | The sample has been interpolated. |
| `Pending`          | The sample is being processed by a function processor. |
| `Gap`              | There is a gap in the data (e.g., in repeating lap compare mode). |



!!! warning 
    
    The length of `ParameterValues.Data` is not an indication of the amount of valid 
    sample returned. Use `ParameterValues.SampleCount` to get the number of valid samples.

## Examples

### Getting Samples from a Historical Session

`GetNextSamples` is **stateful**: `GoTo` positions a cursor, then each call returns the
next `count` samples and advances the cursor — so repeated calls walk the session in
order until the data runs out (the trailing values come back with `DataStatus = AfterEnd`).

=== "C#"

    ``` csharp
    // Local database connection string and session key for data already recorded
    string connectionString = @"DbEngine=SQLite;Data Source=C:\session01.ssndb;Pooling=false;";
    SessionKey sessionKey = SessionKey.Parse("7DD05707-EAA2-4A36-BB8A-E2327AA52BFC");

    // Initialise SQLRace API
    Core.Initialize();
    var sessionManager = SessionManager.CreateSessionManager();

    // Load existing session
    using (var clientSession = sessionManager.Load(sessionKey, connectionString))
    {
        // Obtain the session
        var session = clientSession.Session;
        
        // Use PDA to get logged data across all channels in parameter vCar
        using (ParameterDataAccessBase pda = session.CreateParameterDataAccess("vCar:Chassis"))
        {
            // Go to the start of the session
            pda.GoTo(session.StartTime);

            // Get 10 samples
            var parameterValues = pda.GetNextSamples(10, StepDirection.Forward);

            // Print data and status to console window
            for (int i = 0; i < 10; i++)
            {
                Console.WriteLine($"Data: {parameterValues.Data[i]}, Timestamp: {parameterValues.Timestamp[i]}, Status: {parameterValues.DataStatus[i]}");            }
            }
        }
    }
    ```

=== "Python"

    ``` python
    # Local database connection string and session key for data already recorded
    connection_string = r"DbEngine=SQLite;Data Source=C:\session01.ssndb;Pooling=false;"
    session_key = SessionKey.Parse("7DD05707-EAA2-4A36-BB8A-E2327AA52BFC")
    
    # Initialise SQLRace API
    Core.Initialize()
    session_manager = SessionManager.CreateSessionManager()
    
    # Load existing session
    client_session = session_manager.Load(session_key, connection_string)
    
    # Obtain the session
    session = client_session.Session
    
    # Create a PDA to get logged data across all channels in parameter vCar
    pda = session.CreateParameterDataAccess("vCar:Chassis")
    
    # Go to the start of the session
    pda.GoTo(session.StartTime)

    # Get 10 samples
    parameter_values = pda.GetNextSamples(10, StepDirection.Forward)
        
    # Print data and status to console window
    for i in range(10):
        print(f"Data: {parameter_values.Data[i]}, TimeStamp: {parameter_values.Timestamp[i]} Status: {parameter_values.DataStatus[i]}")
        
    # Dispose objects once we are finish with it
    pda.Dispose()
    client_session.Close()
    ```

=== "MATLAB"

    ``` matlab
    % Local database connection string and session key for data already recorded
    connectionString = "DbEngine=SQLite;Data Source=C:\session01.ssndb;Pooling=false;";
    sessionKey = SessionKey.Parse("7DD05707-EAA2-4A36-BB8A-E2327AA52BFC");
    
    % Initialise SQLRace API
    Core.Initialize()
    sessionManager = SessionManager.CreateSessionManager();
    
    % Load existing session
    clientSession = sessionManager.Load(sessionKey, connectionString);
    
    % Obtain the session
    session = clientSession.Session;
    
    % Create a PDA to get logged data across all channels in parameter vCar
    pda = session.CreateParameterDataAccess("vCar:Chassis");
    
    %  Go to the start of the session
    pda.GoTo(session.StartTime);
    
    % Get 10 samples
    parameterValues = pda.GetNextSamples(10, StepDirection.Forward);
    
    % Print data and status to console window
    for i=1:10
        fprintf("Data: %f, Timestamp: %i, Status: %s\n",parameterValues.Data(i),parameterValues.Timestamp(i),parameterValues.DataStatus(i))
    end

    % Dispose objects once we are finish with it
    pda.Dispose()
    clientSession.Close()
    ```

### Getting Samples from a Live Session
PDA contains the property `CurrentTime`, which keeps track of the
location of the cursor. 
This cursor is specific to each instance of PDA and can be used in combination with 
`GetNextSamples` to get new samples on the leading edge during a live session.
After the samples have been retrieved, the `CurrentTime` gets updated to 1ns after the
timestamp of the last sample retrieved.


=== "C#"

    ``` csharp
    string connectionString = @"DbEngine=SQLite;Data Source=C:\session01.ssndb;Pooling=false;";
    
    // Initialise SQLRace API
    Core.Initialize();
    var sessionManager = SessionManager.CreateSessionManager();
        
    // Find the latest live session
    var sessionSummaries = sessionManager.FindBySessionState(SessionState.Live, connectionString);
    var liveSessionSummary = sessionSummaries.OrderBy(x => x.TimeOfRecording).Last();
    
    // Load the live session
    using (var clientSession = sessionManager.Load(liveSessionSummary.Key, liveSessionSummary.GetConnectionString()))
    {
        // Obtain the session
        var session = clientSession.Session;
    
        // Use PDA to get logged data across all channels in parameter vCar
        using (ParameterDataAccessBase pda = session.CreateParameterDataAccess("vCar:Chassis"))
        {
            // Go to the start of the session
            pda.GoTo(session.StartTime);
            while (session.State == SessionState.Live)
            {
                // Get 10 samples
                var parameterValues = pda.GetNextSamples(10, StepDirection.Forward);
    
                // Print data and status to console window
                for (int i = 0; i < parameterValues.SampleCount; i++)
                {
                Console.WriteLine($"Data: {parameterValues.Data[i]}, Timestamp: {parameterValues.Timestamp[i]}, Status: {parameterValues.DataStatus[i]}");                }
                Console.WriteLine($"New Cursor Position: {pda.CurrentTime}");
    
                // Wait for a second
                Thread.Sleep(1000);
                }
            }
        }
    }

    ```

=== "Python"

    ```python
    connection_string = r"DbEngine=SQLite;Data Source=C:\session01.ssndb;Pooling=false;"

    # Initialise SQLRace API
    Core.Initialize()
    session_manager = SessionManager.CreateSessionManager()
    
    # Find the latest live session
    session_summaries = session_manager.FindBySessionState(SessionState.Live, connection_string)
    latest_live_session = max(session_summaries, key=lambda x: x.TimeOfRecording)
    client_session = session_manager.Load(latest_live_session.Key, latest_live_session.GetConnectionString())
    session = client_session.Session
    
    # Create a PDA to get logged data across all channels in parameter vCar
    pda = session.CreateParameterDataAccess("vCar:Chassis")
    
    # Go to the start of the session
    pda.GoTo(session.StartTime)
    
    while session.State == SessionState.Live:
        # Get 10 samples
        parameter_values = pda.GetNextSamples(10, StepDirection.Forward)
    
        # Print data and status to console window
        for i in range(parameter_values.SampleCount):
            print(
                f"Data: {parameter_values.Data[i]}, TimeStamp: {parameter_values.Timestamp[i]} Status: {parameter_values.DataStatus[i]}")
        print(f"New Cursor Position: {pda.CurrentTime}")
    
        # Wait for a second
        time.sleep(1)
    
    # Dispose objects once we are finish with it
    pda.Dispose()
    client_session.Close()
    ```

=== "MATLAB"

    ```matlab
    connectionString = "DbEngine=SQLite;Data Source=C:\session01.ssndb;Pooling=false;";
    
    % Initialise SQLRace API
    Core.Initialize()
    sessionManager = SessionManager.CreateSessionManager();
    
    % Find the latest live session
    sessionSummaries = sessionManager.FindBySessionState(SessionState.Live, connectionString);
    latestLiveSession = sessionSummaries.Item(0);
    %  Array formation and indexing are not allowed on .NET objects in MATLAB
    for i = 0:sessionSummaries.Count-1 
        disp(sessionSummaries.Item(i).Key.ToString())
        if (sessionSummaries.Item(i).TimeOfRecording > latestLiveSession.TimeOfRecording)
            latestLiveSession = sessionSummaries.Item(i);
        end
    end
    
    clientSession = sessionManager.Load(latestLiveSession.Key, latestLiveSession.GetConnectionString());
    
    % Obtain the session
    session = clientSession.Session;
    
    % Create a PDA to get subampled data across all channels in parameter vCar
    pda = session.CreateParameterDataAccess("vCar:Chassis");
    
    %  Go to the start of the session
    pda.GoTo(session.StartTime);
    
    while (session.State == SessionState.Live)
        % Get 10 samples
        parameterValues = pda.GetNextSamples(10, StepDirection.Forward);
        
        % Print data and status to console window
        for i=1:10
            fprintf("Data: %f, Timestamp: %i, Status: %s\n",parameterValues.Data(i),parameterValues.Timestamp(i),parameterValues.DataStatus(i))
        end
        fprintf("New Cursor Position: %i\n", pda.CurrentTime.Value)
    
        % Wait for a second
        pause(1)
    end
    
    % Dispose objects once we are finish with it
    pda.Dispose()
    clientSession.Close()
    ```


### Caching PDA to Improve Efficiency
It is advisable to reuse PDAs regardless of whether multiple parameters are in use. 
A dictionary with the parameter identifier can be used to achieve this. 

=== "C#"

    ``` csharp
    // Local database connection string and session key for data already recorded
    string connectionString = @"DbEngine=SQLite;Data Source=C:\session01.ssndb;Pooling=false;";
    SessionKey sessionKey = SessionKey.Parse("7DD05707-EAA2-4A36-BB8A-E2327AA52BFC");
    
    // List of parameter identifiers to obtain samples from
    List<string> parameterIdentifiers = new List<string> { "vCar:Chassis", "nEngine:FIA" };
    
    // Initialise SQLRace API
    Core.Initialize();
    var sessionManager = SessionManager.CreateSessionManager();
    
    // Load existing session
    using (var clientSession = sessionManager.Load(sessionKey, connectionString))
    {
        // Create the pda cache
        Dictionary<string, ParameterDataAccessBase> pdaCache = new Dictionary<string, ParameterDataAccessBase>();
        
        // Obtain the session
        var session = clientSession.Session;
        
        foreach (var lap in session.LapCollection)
        {
            foreach (var parameterIdentifier in parameterIdentifiers)
            {
                // Open and cache PDA
                ParameterDataAccessBase pda;
                if (pdaCache.ContainsKey(parameterIdentifier))
                {
                    pda = pdaCache[parameterIdentifier];
                }
                else
                {
                    pda = session.CreateParameterDataAccess(parameterIdentifier);
                    pdaCache[parameterIdentifier] = pda;
                }

                // Go to the start of the lap
                pda.GoTo(lap.StartTime);

                // Get 10 samples
                var parameterValues = pda.GetNextSamples(10, StepDirection.Forward);
                Console.WriteLine($"Parameter: {parameterIdentifier}");
                // Print data and status to console window
                for (int i = 0; i < 10; i++)
                {
                    Console.WriteLine($"Data: {parameterValues.Data[i]}, Timestamp: {parameterValues.Timestamp[i]}, Status: {parameterValues.DataStatus[i]}");
                }

            }
        }
    
        // Dispose the PDAs afterwards
        foreach (var parameterDataAccessBase in pdaCache)
        {
            parameterDataAccessBase.Value.Dispose();
        }
    }
    ```

=== "Python"

    ```python
    # Local database connection string and session key for data already recorded
    connection_string = r"DbEngine=SQLite;Data Source=C:\session01.ssndb;Pooling=false;"
    session_key = SessionKey.Parse("7DD05707-EAA2-4A36-BB8A-E2327AA52BFC")

    # List of parameter identifiers to obtain samples from
    parameter_identifiers = ["vCar:Chassis", "nEngine:FIA"]
    
    # Initialise SQLRace API
    Core.Initialize()
    session_manager = SessionManager.CreateSessionManager()

    # Load existing session
    client_session = session_manager.Load(session_key, connection_string)
    
    # Create the pda cache
    pda_cache = {}

    # Obtain the session
    session = client_session.Session

    for lap in session.LapCollection:
        for parameter_identifier in parameter_identifiers:
            # Open and cache PDA
            if parameter_identifier in pda_cache:
                pda = pda_cache[parameter_identifier]
            else:
                pda = session.CreateParameterDataAccess(parameter_identifier)
                pda_cache[parameter_identifier] = pda
        
            # Go to the start of the session
            pda.GoTo(lap.StartTime)
        
            # Get 10 samples
            parameter_values = pda.GetNextSamples(10, StepDirection.Forward)
        
            # Print data and status to console window
            print(f"Parameter: {parameterIdentifier}")
            for i in range(10):
                print(
                    f"Data: {parameter_values.Data[i]}, TimeStamp: {parameter_values.Timestamp[i]} Status: {parameter_values.DataStatus[i]}")
        
    for pda in pda_cache.values():
        pda.Dispose()
    
    # Dispose objects once we are finish with it
    pda.Dispose()
    client_session.Close()
    ```
=== "MATLAB"
    
    ```matlab
    % Local database connection string and session key for data already recorded
    connectionString = "DbEngine=SQLite;Data Source=C:\session01.ssndb;Pooling=false;";
    sessionKey = SessionKey.Parse("7DD05707-EAA2-4A36-BB8A-E2327AA52BFC");
    
    % List of parameter identifiers to obtain samples from
    parameterIdentifiers = ["vCar:Chassis", "nEngine:FIA"];
    
    % Initialise SQLRace API
    Core.Initialize()
    sessionManager = SessionManager.CreateSessionManager();
    
    % Load existing session
    clientSession = sessionManager.Load(sessionKey, connection_string);
    
    % Create the pda cache
    pdaCache = configureDictionary("string","MESL.SqlRace.Domain.ParameterDataAccess");
    
    % Obtain the session
    session = clientSession.Session;
    
    for i=0:session.LapCollection.Count()-1
        for parameterIdentifier = parameterIdentifiers
            % Open and cache PDA
            if isKey(pdaCache,parameterIdentifier)
                pda = pdaCache(parameterIdentifier);
            else
                pda = session.CreateParameterDataAccess(parameterIdentifier);
                pdaCache(parameterIdentifier) = pda;
            end
        
            %  Go to the start of the session
            pda.GoTo(session.LapCollection.Item(i).StartTime);
            
            % Get 10 samples
            parameterValues = pda.GetNextSamples(10, StepDirection.Forward);
            
            % Print data and status to console window
            fprintf("Parameter: %s",parameterIdentifier)
            for j=1:10
                fprintf("Data: %f, Timestamp: %i, Status: %s\n",parameterValues.Data(j),parameterValues.Timestamp(j),parameterValues.DataStatus(j))
            end
        end
    end

    % Dispose objects once we are finish with it
    pdas = values(pdaCache,"cell");
    for i = 1:length(pdas)
        pdas{i}.Dispose()
    end
    clientSession.Close()
    ```

<!-- Getting Interpolated Data example pending fix (ADO:85594); draft preserved in git history. -->
