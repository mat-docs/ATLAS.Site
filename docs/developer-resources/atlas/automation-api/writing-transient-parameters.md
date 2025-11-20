# Adding a Transient Parameter to ATLAS

This guide demonstrates how to add a transient parameter to an ATLAS session, retrieve data from an existing parameter, perform a transformation, and write the result to the new transient parameter.

## Overview

1. Create a transient parameter.
2. Retrieve the time base and source parameter (`vCar`).
3. Estimate the number of samples.
4. Read the data and apply a transformation (`vCar * 2`).
5. Write the transformed data to the transient parameter.

## Parameters

- **DemoDisplayName**: `"Demo Waveform"`
- **ParameterName**: `"vCar:Chassis"`
- **TransientParameterName**: `"vCar2 Demo"`
- **Range**: `0` to `800`

---

## Define Transient Parameter Metadata

This section sets up the necessary metadata for the transient parameter. It includes the display name, identifier, description, value range, and grouping information. These values are used to register the parameter in the ATLAS session and define how it will appear and behave.


=== "C#"
    ``` csharp
        string demoDisplayName = "Demo Waveform";
        string parameterName = "vCar:Chassis";
        string transientParameterDescription = "vCar2 Demo";
        string transientParameterGroups = "";
        string transientParameterIdentifier = "vCar2 Demo";
        double transientParameterMaximum = 800;
        double transientParameterMinimum = 0;
        string transientParameterName = "vCar2 Demo";

    ```

=== "Python"
    ``` python
        DemoDisplayName = "Demo Waveform"
        ParameterName = "vCar:Chassis"
        TransientParameterDescription = "vCar2 Demo"
        TransientParameterGroups = ""
        TransientParameterIdentifier = "vCar2 Demo"
        TransientParameterMaximum = 800
        TransientParameterMinimum = 0
        TransientParameterName = "vCar2 Demo"

    ```

=== "MATLAB"
    ``` matlab
        demoDisplayName = 'Demo Waveform';
        parameterName = 'vCar:Chassis';
        transientParameterDescription = 'vCar2 Demo';
        transientParameterGroups = '';
        transientParameterIdentifier = 'vCar2 Demo';
        transientParameterMaximum = 800;
        transientParameterMinimum = 0;
        transientParameterName = 'vCar2 Demo';

    ```

## Create Transient Parameter

The transient parameter is created and registered within the current ATLAS session. A transient parameter is temporary and used to store calculated or transformed data during the session. This step ensures the system is ready to receive new data.



=== "C#"
    ``` csharp
        var transientParameter = sessionServiceClient.AddTransientParameter(
        sessionId,
        transientParameterIdentifier,
        demoDisplayName,
        transientParameterDescription,
        transientParameterGroups.Split(';'),
        transientParameterMinimum,
        transientParameterMaximum
    );

    ```

=== "Python"
    ``` python
        transient_parameter = sessionServiceClient.AddTransientParameter(
        sessionId,
        TransientParameterIdentifier,
        DemoDisplayName,
        TransientParameterDescription,
        TransientParameterGroups.split(";"),
        TransientParameterMinimum,
        TransientParameterMaximum
    )

    ```
=== "MATLAB"
    ``` matlab
        transientParameter = sessionServiceClient.AddTransientParameter( ...
        sessionId, ...
        transientParameterIdentifier, ...
        demoDisplayName, ...
        transientParameterDescription, ...
        strsplit(transientParameterGroups, ';'), ...
        transientParameterMinimum, ...
        transientParameterMaximum);

    ```

    

!!! tip
    A **transient parameter** is **temporary**—it exists **only while the session is active** in ATLAS.

    Once the session is **closed or disposed**, the transient parameter and its data are **permanently lost**.

    ✅ Use transient parameters for:

    - Intermediate calculations
    - Temporary visualizations
    - Session-specific data transformations

    ❌ Do **not** use them for storing data that needs to persist beyond the session.


##  Retrieve Time Base and Source Parameter

This step retrieves two critical pieces of information:

The time base, which defines the start and end times for the session data.
The source parameter (vCar), which contains the original data that will be transformed.
These are needed to align the new data with the existing session timeline and to access the correct input values.


=== "C#"
    ``` csharp
        var timebase = sessionServiceClient.GetSessionTimeBase(sessionId);
        var parameter = sessionServiceClient.GetSessionParameter(sessionId, "vCar");

    ```

=== "Python"
    ``` python
        timebase = sessionServiceClient.GetSessionTimeBase(sessionId)
        parameter = sessionServiceClient.GetSessionParameter(sessionId, 'vCar')

    ```
=== "MATLAB"
    ``` matlab
        timebase = sessionServiceClient.GetSessionTimeBase(sessionId);
        parameter = sessionServiceClient.GetSessionParameter(sessionId, 'vCar');

    ```

## Estimate Sample Count and Navigate to Start

Before reading data, we estimate how many samples exist for the selected parameter within the time base. This helps optimize memory and performance. We also move the internal cursor to the start of the time base to ensure data is read from the beginning.


=== "C#"
    ``` csharp
        int sampleCount = parameterDataAccessServiceClient.GetSamplesCountEstimate(
        sessionId,
        parameter.Identifier,
        timebase.StartTime,
        timebase.EndTime
        );

        parameterDataAccessServiceClient.Goto(sessionId, parameter.Identifier, timebase.StartTime);

    ```

=== "Python"
    ``` python
        sample_count = parameterDataAccessServiceClient.GetSamplesCountEstimate(
        sessionId,
        parameter.Identifier,
        timebase.StartTime,
        timebase.EndTime
        )

        parameterDataAccessServiceClient.Goto(sessionId, parameter.Identifier, timebase.StartTime)

    ```
=== "MATLAB"
    ``` matlab
        sampleCount = parameterDataAccessServiceClient.GetSamplesCountEstimate( ...
        sessionId, ...
        parameter.Identifier, ...
        timebase.StartTime, ...
        timebase.EndTime);

        parameterDataAccessServiceClient.Goto(sessionId, parameter.Identifier, timebase.StartTime);

    ```

## Retrieve and Transform Data

In this step, the original data samples are retrieved from the source parameter. Each sample is checked for validity, and a transformation is applied—in this case, multiplying each value by 2. The transformed values and their corresponding timestamps are stored for later use.


=== "C#"
    ``` csharp
        var timestamps2 = new List<DateTime>();
        var values2 = new List<double>();

        var values = parameterDataAccessServiceClient.GetNextSamples(sessionId, parameter.Identifier, sampleCount);

        for (int i = 0; i < values.Data.Length; i++)
        {
            if (values.DataStatus[i] == DataStatusType.Sample)
            {
                timestamps2.Add(values.Time[i]);
                values2.Add(values.Data[i] * 2);
            }
        }

    ```

=== "Python"
    ``` python
        timestamps2 = []
        values2 = []

        values = parameterDataAccessServiceClient.GetNextSamples(sessionId, parameter.Identifier, sample_count)

        for status, data, time in zip(values.DataStatus, values.Data, values.Time):
            if status == DataStatusType.Sample:
                timestamps2.append(time)
                values2.append(data * 2)

    ```
=== "MATLAB"
    ``` matlab
        timestamps2 = [];
        values2 = [];

        values = parameterDataAccessServiceClient.GetNextSamples(sessionId, parameter.Identifier, sampleCount);

        for i = 1:length(values.Data)
            if values.DataStatus(i) == DataStatusType.Sample
                timestamps2(end+1) = values.Time(i);
                values2(end+1) = values.Data(i) * 2;
            end
        end

    ```

## Write Transformed Data to Transient Parameter

Finally, the transformed data is written to the transient parameter. This makes the new data available within the session for visualization, analysis, or further processing. The timestamps ensure the data aligns correctly with the session timeline.


=== "C#"
    ``` csharp
        sessionServiceClient.AddTimeDataToTransientParameter(
        sessionId,
        transientParameter.Identifier,
        timestamps2.ToArray(),
        values2.ToArray()
    );

    ```

=== "Python"
    ``` python
        sessionServiceClient.AddTimeDataToTransientParameter(
        sessionId,
        transient_parameter.Identifier,
        timestamps2,
        values2
    )

    ```
=== "MATLAB"
    ``` matlab
        sessionServiceClient.AddTimeDataToTransientParameter( ...
        sessionId, ...
        transientParameter.Identifier, ...
        timestamps2, ...
        values2);

    ```

<figure markdown="span">
  ![Image title](Transient.png){ width="1200" }
  <figcaption>ATLAS Transient Parameter</figcaption>
</figure>


