

The `ParameterDataAccessServiceClient` class is the entry point for accessing parameter data from a session. It provides a variety of methods to retrieve, navigate, and analyze time-series data.

##  Available Methods

###  **Statistics Retrieval**

| Method | Description |
|-------|-------------|
| `GetDataStatistics(SessionId, String, Int64, Int64, StatisticOption)` | Retrieves statistical data over a specified time range. |
| `GetDataStatisticsVba(SessionId, String, Double, Double, StatisticOption)` | VBA-compatible version of `GetDataStatistics`. |
| `GetWeightedDataStatistics(SessionId, String, Int64, Int64, StatisticOption)` | Retrieves weighted statistics over a time range. |
| `GetWeightedDataStatisticsVba(SessionId, String, Double, Double, StatisticOption)` | VBA-compatible version of `GetWeightedDataStatistics`. |


###  **Data Navigation**

| Method | Description |
|--------|-------------|
| `Goto(SessionId, String, Int64)` | Moves the data pointer to a specific timestamp. |
| `GotoVba(SessionId, String, Double)` | VBA-compatible version of `Goto`. |
| `SetSampleIncrement(SessionId, String, Int64)` | Sets the increment between samples. |
| `SetSampleIncrementVba(SessionId, String, Double)` | VBA-compatible version of `SetSampleIncrement`. |


###  **Sample Retrieval**

| Method | Description |
|--------|-------------|
| `GetNextData(SessionId, String, Int64, SampleMode, Boolean)` | Retrieves the next data point(s) using a specific mode. |
| `GetNextDataVba(SessionId, String, Int32, SampleMode, Boolean)` | VBA-compatible version of `GetNextData`. |
| `GetNextSamples(SessionId, String, Int64)` | Retrieves the next N samples. |
| `GetNextSamplesVba(SessionId, String, Int32)` | VBA-compatible version of `GetNextSamples`. |
| `GetNextSamplesToTime(SessionId, String, Int64)` | Retrieves samples up to a specific time. |
| `GetNextSamplesToTimeVba(SessionId, String, Double)` | VBA-compatible version of `GetNextSamplesToTime`. |
| `GetPreviousSamples(SessionId, String, Int64)` | Retrieves the previous N samples. |
| `GetPreviousSamplesVba(SessionId, String, Int32)` | VBA-compatible version of `GetPreviousSamples`. |


###  **Sample Count Estimation**

| Method | Description |
|--------|-------------|
| `GetSamplesCountEstimate(SessionId, String, Int64, Int64)` | Estimates the number of samples in a time range. |
| `GetSamplesCountEstimateVba(SessionId, String, Double, Double)` | VBA-compatible version of `GetSamplesCountEstimate`. |

## Usage Example

### Extracting Data Statistics per Lap

=== "C#"

    ``` csharp
        var sessionId = sessionsList[0].Id;
        var parameterName = "vCar:Chassis";
        var startTime = session.StartTime;
        var endTime = session.EndTime;
        var statisticsOption = StatisticOption.Max;

        // Get overall maximum value
        var statistics = parameterDataAccessServiceClient.GetDataStatistics(
            sessionId, parameterName, startTime, endTime, statisticsOption
        );
        Console.WriteLine($"{parameterName} - Maximum value: {statistics.Maximum}");

        // Get maximum value per lap
        var laps = sessionServiceClient.GetSessionLaps(sessionId);
        foreach (var lap in laps)
        {
            var lapStats = parameterDataAccessServiceClient.GetDataStatistics(
                sessionId, parameterName, lap.StartTime, lap.EndTime, statisticsOption
            );
            Console.WriteLine($"Lap Name: {lap.Name}, Start Time: {lap.StartTime}, End Time: {lap.EndTime}, " +
                            $"{parameterName} - Maximum value: {lapStats.Maximum}");
        }

    ```

=== "Python"

    ``` python
        # Retrieve session and parameter information
        session_id = sessionsList[0].Id
        parameter_name = 'vCar:Chassis'
        start_time = session.StartTime
        end_time = session.EndTime
        statistics_option = StatisticOption.Max

        # Get overall maximum value for the parameter
        statistics = parameterDataAccessServiceClient.GetDataStatistics(
            session_id, parameter_name, start_time, end_time, statistics_option
        )
        print(f'{parameter_name} - Maximum value: {statistics.Maximum}')

        # Get maximum value per lap
        laps = sessionServiceClient.GetSessionLaps(session_id)
        for lap in laps:
            lap_stats = parameterDataAccessServiceClient.GetDataStatistics(
                session_id, parameter_name, lap.StartTime, lap.EndTime, statistics_option
            )
            print(f'Lap Name: {lap.Name}, Start Time: {lap.StartTime}, End Time: {lap.EndTime}, '
                f'{parameter_name} - Maximum value: {lap_stats.Maximum}')

    ```

=== "MATLAB"

    ``` matlab
        sessionId = sessionsList(1).Id;
        parameterName = 'vCar:Chassis';
        startTime = session.StartTime;
        endTime = session.EndTime;
        statisticsOption = StatisticOption.Max;

        % Get overall maximum value
        statistics = parameterDataAccessServiceClient.GetDataStatistics( ...
            sessionId, parameterName, startTime, endTime, statisticsOption);
        fprintf('%s - Maximum value: %f\n', parameterName, statistics.Maximum);

        % Get maximum value per lap
        laps = sessionServiceClient.GetSessionLaps(sessionId);
        for i = 1:length(laps)
            lap = laps(i);
            lapStats = parameterDataAccessServiceClient.GetDataStatistics( ...
                sessionId, parameterName, lap.StartTime, lap.EndTime, statisticsOption);
            fprintf('Lap Name: %s, Start Time: %f, End Time: %f, %s - Maximum value: %f\n', ...
                lap.Name, lap.StartTime, lap.EndTime, parameterName, lapStats.Maximum);
        end

    ```



### Extracting Time Series Data for the Fastest Lap

This example demonstrates how to extract time series data for the parameter `vCar` during the **fastest lap** of a session. It involves the following steps:

1. **Identifying the fastest lap**  
   Use the session service to retrieve the fastest lap of the session.

2. **Moving the data pointer to the start of that lap**  
   Position the data access service at the start time of the fastest lap using the `Goto` method.

3. **Estimating how many samples are available in that time range**  
   Use `GetSamplesCountEstimate` to determine how many data points exist between the start and end of the lap.

4. **Retrieving the corresponding data and timestamps**  
   Use `GetNextSamples` to extract the actual time series data and timestamps for the parameter during the lap.

=== "C#"

    ``` csharp
        // Get the fastest lap of the session
        var fastestLap = sessionServiceClient.GetSessionFastestLap(session.Id);

        // Define the parameter to extract
        string parameter = "vCar";

        // Retrieve parameter metadata (optional)
        var parameterInfo = sessionServiceClient.GetSessionParameter(session.Id, parameter);

        // Move to the start of the fastest lap
        parameterDataAccessServiceClient.Goto(session.Id, parameter, fastestLap.StartTime);

        // Estimate the number of samples in the lap
        long sampleCount = parameterDataAccessServiceClient.GetSamplesCountEstimate(
            session.Id, parameter, fastestLap.StartTime, fastestLap.EndTime
        );

        // Retrieve the time series data
        var parameterValues = parameterDataAccessServiceClient.GetNextSamples(session.Id, parameter, sampleCount);
        var values = parameterValues.Data.ToList();
        var times = parameterValues.Time.ToList();


    ```

=== "Python"

    ``` python
        # Get the fastest lap of the session
        fastest_lap = sessionServiceClient.GetSessionFastestLap(session.Id)

        # Define the parameter to extract
        parameter = 'vCar'

        # Retrieve parameter metadata (optional)
        parameter_info = sessionServiceClient.GetSessionParameter(session.Id, parameter)

        # Move to the start of the fastest lap
        parameterDataAccessServiceClient.Goto(session.Id, parameter, fastest_lap.StartTime)

        # Estimate the number of samples in the lap
        sample_count = parameterDataAccessServiceClient.GetSamplesCountEstimate(
            session.Id, parameter, fastest_lap.StartTime, fastest_lap.EndTime
        )

        # Retrieve the time series data
        parameter_values = parameterDataAccessServiceClient.GetNextSamples(session.Id, parameter, sample_count)
        values = list(parameter_values.Data)
        times = list(parameter_values.Time)


    ```

=== "MATLAB"

    ``` matlab
        % Get the fastest lap of the session
        fastestLap = sessionServiceClient.GetSessionFastestLap(session.Id);

        % Define the parameter to extract
        parameter = 'vCar';

        % Retrieve parameter metadata (optional)
        parameterInfo = sessionServiceClient.GetSessionParameter(session.Id, parameter);

        % Move to the start of the fastest lap
        parameterDataAccessServiceClient.Goto(session.Id, parameter, fastestLap.StartTime);

        % Estimate the number of samples in the lap
        sampleCount = parameterDataAccessServiceClient.GetSamplesCountEstimate( ...
            session.Id, parameter, fastestLap.StartTime, fastestLap.EndTime);

        % Retrieve the time series data
        parameterValues = parameterDataAccessServiceClient.GetNextSamples(session.Id, parameter, sampleCount);
        values = parameterValues.Data;
        times = parameterValues.Time;


    ```