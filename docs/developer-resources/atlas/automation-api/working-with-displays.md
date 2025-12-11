## Working with Displays

This guide explains how to interact with **Displays** in a workbook using the provided service clients. You'll learn how to retrieve displays, filter them, and modify their properties such as color.

???+ tip
    Before working with displays, and depending on the needs, ensure you have:

    - A valid **session ID**, a session is loaded in ATLAS.
    - Access to the following service clients:
        - `WorkbookServiceClient`
        - `PageServiceClient`
        - `DisplayServiceClient`
        - `SessionServiceClient`


### Retrieve Pages from the Workbook


=== "C#"
    ```csharp
            var pages = workbookServiceClient.GetPages();
            Console.WriteLine($"Total amount of pages to be processed: {pages.Count}");
    ```

=== "Python"
    ```python
            pages = workbookServiceClient.GetPages()
            print(f"Total amount of pages to be processed: {len(pages)}")
    ```


=== "MATLAB"
    ```matlab
            pages = workbookServiceClient.GetPages();
            fprintf('Total amount of pages to be processed: %d\n', length(pages));
    ```

### Iterate Through Pages and Displays

=== "C#"
    ```csharp
            foreach (var page in pages)
            {
                Console.WriteLine($"Processing Page: {page.Title}");
                var displays = pageServiceClient.GetDisplaysOfPage(page.Id);
            }
    ```
=== "Python"
    ```python
            for page in pages:
                print(f"Processing Page: {page.Title}")
                displays = pageServiceClient.GetDisplaysOfPage(page.Id)
    ```
=== "MATLAB"
    ```matlab
            for i = 1:length(pages)
                page = pages(i);
                fprintf('Processing Page: %s\n', page.Title);
                displays = pageServiceClient.GetDisplaysOfPage(page.Id);
            end
    ```

### Filter and Process Waveform Displays

=== "C#"
    ```csharp
            foreach (var display in displays)
            {
                if (display.Type != "Waveform") continue;
                Console.WriteLine($"Processing Display: {display.Name}");
            }
    ```


=== "Python"
    ```python
            for display in displays:
                if display.Type != "Waveform":
                    continue
                print(f"Processing Display: {display.Name}")
    ```


=== "MATLAB"
    ```matlab
            for j = 1:length(displays)
                display = displays(j);
                if ~strcmp(display.Type, 'Waveform')
                    continue;
                end
                fprintf('Processing Display: %s\n', display.Name);
            end
    ```


### Retrieve Display Parameters

=== "C#"
    ```csharp
            var displayParameters = displayServiceClient.GetDisplayParameters(display.Id);
            foreach (var p in displayParameters)
            {
                Console.WriteLine($"Parameter Name: {p.Name}");
            }
    ```


=== "Python"
    ```python
            displayParameters = displayServiceClient.GetDisplayParameters(display.Id)
            for p in displayParameters:
                print(f"Parameter Name: {p.Name}")
    ```

=== "MATLAB"
    ```matlab
            displayParameters = displayServiceClient.GetDisplayParameters(display.Id);
            for k = 1:length(displayParameters)
                p = displayParameters(k);
                fprintf('Parameter Name: %s\n', p.Name);
            end
    ```

### Modify Display Properties

Check if each parameter is in your dictionary and modify its properties:


??? info "Available Display Parameter Properties"
    These are the standard properties that can be retrieved or modified for each display parameter:

        - AdditionalMarkers
        - ApplicationName
        - BitShift
        - BitShiftDirection
        - ByteOrder
        - ClipTrace
        - Color
        - ConversionFunctionName
        - CriticalMaximum
        - CriticalMinimum
        - DataBitMask
        - DataSource
        - DataType
        - Definition
        - FullDescription
        - DisplayMaximum
        - DisplayMinimum
        - DistributionMinimum
        - DistributionMaximum
        - ErrorBitMask
        - FdlFunctionCode
        - FilterFrequency
        - FilterType
        - FormatString
        - IsFunction
        - Identifier
        - InterpolateBetweenSamples
        - LineStyle
        - Name
        - SampleMode
        - ShowCriticalLimits
        - ShowUnits
        - ShowWarningLimits
        - TraceStyle
        - TraceWidth
        - TrendType
        - Units
        - IsVirtualParameter
        - WarningMaximum
        - WarningMinimum
        - WeightedStatistics
        - YScaleMode


=== "C#"
    ```csharp
            var parameters = new Dictionary<string, Dictionary<string, string>> {
                { "vCar", new Dictionary<string, string> { { "Color", "#0000FF" }, { "TraceWidth", "1" } } },
                { "nEngine", new Dictionary<string, string> { { "Color", "#FF0000" }, { "TraceWidth", "2" } } },
                { "MEngine", new Dictionary<string, string> { { "Color", "#008000" }, { "TraceWidth", "3" } } },
                { "sLap", new Dictionary<string, string> { { "Color", "#FFFF00" }, { "TraceWidth", "8" } } }
            };

            if (parameters.ContainsKey(p.Name))
            {
                var parameter = sessionServiceClient.GetSessionParameter(sessionId, p.Identifier);
                var displayParameterProperties = displayServiceClient.GetDisplayParameterProperties(display.Id, parameter.Identifier);

                foreach (var property in displayParameterProperties)
                {
                    if (property.Name == "Color")
                    {
                        var value = new Value { Data = parameters[p.Name]["Color"] };
                        displayServiceClient.SetDisplayParameterPropertyValue(display.Id, parameter.Identifier, property.Name, value);
                        var color = displayServiceClient.GetDisplayParameterPropertyValue(display.Id, parameter.Identifier, property.Name);
                        Console.WriteLine($"Parameter: {parameter.Identifier} Color set to: {color}");
                    }
                    else if (property.Name == "TraceWidth")
                    {
                        var value = new Value { Data = parameters[p.Name]["TraceWidth"] };
                        displayServiceClient.SetDisplayParameterPropertyValue(display.Id, parameter.Identifier, property.Name, value);
                        var traceWidth = displayServiceClient.GetDisplayParameterPropertyValue(display.Id, parameter.Identifier, property.Name);
                        Console.WriteLine($"Parameter: {parameter.Identifier} TraceWidth set to: {traceWidth}");
                    }
                }
            }
    ```



=== "Python"
    ```python
            parameters = {
                "vCar": {
                    "Color": "#0000FF",       # Blue
                    "TraceWidth": 1
                },
                "nEngine": {
                    "Color": "#FF0000",       # Red
                    "TraceWidth": 2
                },
                "MEngine": {
                    "Color": "#008000",       # Green
                    "TraceWidth": 3
                },
                "sLap": {
                    "Color": "#FFFF00",       # Yellow
                    "TraceWidth": 8
                }
            }

            if p.Name in parameters:
                parameter = sessionServiceClient.GetSessionParameter(sessionId, p.Identifier)
                displayParameterProperties = displayServiceClient.GetDisplayParameterProperties(display.Id, parameter.Identifier)

                for property in displayParameterProperties:
                    if property.Name == "Color":
                        value = Value()
                        value.Data = parameters[p.Name]["Color"]
                        displayServiceClient.SetDisplayParameterPropertyValue(display.Id, parameter.Identifier, property.Name, value)
                        color = displayServiceClient.GetDisplayParameterPropertyValue(display.Id, parameter.Identifier, property.Name)
                        print(f"Parameter: {parameter.Identifier} Color set to: {color}")

                    elif property.Name == "TraceWidth":
                        value = Value()
                        value.Data = str(parameters[p.Name]["TraceWidth"])
                        displayServiceClient.SetDisplayParameterPropertyValue(display.Id, parameter.Identifier, property.Name, value)
                        trace_width = displayServiceClient.GetDisplayParameterPropertyValue(display.Id, parameter.Identifier, property.Name)
                        print(f"Parameter: {parameter.Identifier} TraceWidth set to: {trace_width}")
    ```


=== "MATLAB"
    ```matlab
            parameters = struct( ...
                'vCar', struct('Color', '#0000FF', 'TraceWidth', 1), ...
                'nEngine', struct('Color', '#FF0000', 'TraceWidth', 2), ...
                'MEngine', struct('Color', '#008000', 'TraceWidth', 3), ...
                'sLap', struct('Color', '#FFFF00', 'TraceWidth', 8) ...
            );

            if isfield(parameters, p.Name)
                parameter = sessionServiceClient.GetSessionParameter(sessionId, p.Identifier);
                displayParameterProperties = displayServiceClient.GetDisplayParameterProperties(display.Id, parameter.Identifier);

                for i = 1:length(displayParameterProperties)
                    property = displayParameterProperties(i);

                    if strcmp(property.Name, 'Color')
                        value = Value();
                        value.Data = parameters.(p.Name).Color;
                        displayServiceClient.SetDisplayParameterPropertyValue(display.Id, parameter.Identifier, property.Name, value);
                        color = displayServiceClient.GetDisplayParameterPropertyValue(display.Id, parameter.Identifier, property.Name);
                        fprintf('Parameter: %s Color set to: %s\n', parameter.Identifier, color);
                    elseif strcmp(property.Name, 'TraceWidth')
                        value = Value();
                        value.Data = num2str(parameters.(p.Name).TraceWidth);
                        displayServiceClient.SetDisplayParameterPropertyValue(display.Id, parameter.Identifier, property.Name, value);
                        traceWidth = displayServiceClient.GetDisplayParameterPropertyValue(display.Id, parameter.Identifier, property.Name);
                        fprintf('Parameter: %s TraceWidth set to: %s\n', parameter.Identifier, traceWidth);
                    end
                end
            end
    ```


??? tip "Other Display Properties"

    These properties apply to the display as a whole and control layout, appearance, and behavior:

        - AlignGridYScale
        - AllowHistoricReplay
        - BackgroundColor
        - CircuitDefinition
        - CursorMinimumPrecision
        - CursorMode
        - DrawLeftToRight
        - LegendFontSize
        - LeftToRightGapPercentage
        - HighlightAlpha
        - HighlightMode
        - BackgroundImageOffsetLeft
        - BackgroundImagePath
        - BackgroundImageOffsetTop
        - LeftToRightOverlay
        - MaskEventsAll
        - MaskEventsHigh
        - MaskEventsLow
        - MaskEventsMedium
        - LegendPosition
        - ReferenceCursorUses
        - ShowCircuitStripeLabels
        - CircuitStripeSource
        - HeaderVisible
        - ShowDateMarkers
        - ShowEventIndicators
        - LegendShowGrid
        - GridDisplayMode
        - ShowBackgroundImage
        - ShowLapMarkers
        - LegendVisible
        - ShowStatistics
        - ShowTimeAs
        - TimeDiffVisible
        - TitleBarVisible
        - LegendShowUnits
        - LegendShowWarningIndicators
        - TimeDiffStart
        - Statistics
        - Title
        - UseGlobalCircuitDefinition
        - LegendValueAlignment
        - ParameterZOrder

