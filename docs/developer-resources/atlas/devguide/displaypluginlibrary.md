# Display Plugin Library

The display plugin library provides base and utility classes that reduce the overall effort needed to create a custom display.

!!! note

    The code for this library can be reviewed at [Tutorials/DisplayPluginLibrary](https://github.com/mat-docs/Atlas.DisplayAPI.Examples/tree/master/DisplayPluginLibrary)

## `TemplateDisplayViewModelBase` _View Model_ base class

`TemplateDisplayViewModelBase` (a substitute for `DisplayPluginViewModel`) provides a template to help follow the [Data request guidelines](../detailed/data.md#data-request-guidelines) properly

- Data requests are throttled to 5Hz by default 
    - Pass a different throttle interval to the constructor if the default is not suitable
- Properties are provided for the following common services
    - `IDataRequestSignalFactory` `DataRequestSignalFactory`
    - `IDisplayParameterService` `DisplayParameterService`
    - `ILogger` `Logger`
    - `ISignalBus` `SignalBus`
- Append additional disposables to the `Disposables` property for automatic cleanup
- Override `OnMakeTimebaseDataRequestsAsync()` to issue data requests in response to changes to the timebase
- Override `OnMakeCursorDataRequestsAsync()` to issue data requests in response to changes to the cursor
- Call `MakeDataRequests()` to initiate data requests for any other reason
- Call the `ExecuteOnUiAsync()` method to execute code on the UI thread
- Observe `IsDisplayVisible` property to determine when appropriate to display UI (by convention display nothing when no set is associated with the display)

!!! attention

    When overriding `DisplayPluginViewModel` notification methods, do not forget to call the base class implementation (i.e. those of `TemplateDisplayViewModelBase`) 

## `ParameterSampleDisplayViewModelBase` _View Model_ base class

`ParameterSampleDisplayViewModelBase<TParameterViewModel>` (a substitute for `TemplateDisplayViewModelBase`) provides automatic retrieval of display parameter sample values

- `TParameterViewModel` must be a class derived from `ParameterSampleViewModelBase`
- `ParameterSampleViewModelBase` base class wraps a display parameter
    - Properties of the display parameter such as `Name` and current `Value`
    - `OnUpdate()` and `OnValueChanged()` notification methods to override
- An implementation of the `OnCreateParameterViewModel()` factory method must be provided to supply a `TParameterViewModel` instance for a display parameter on demand
- When display parameters are added/removed from the display, the `Parameters` collection is updated
    - `OnCreateParameterViewModel()` is called for newly added display parameters
    - `OnUpdateParameters()` is called whenever the `Parameters` collection is modified, and `OnUpdate()` is called on each `TParameterViewModel` instance
- When the cursor timestamp changes, a data request is issued for each member of `Parameters` and the `Value` property of each is updated and `OnValueChanged()` called

## Tracking Operations

The `OperationTracker<TOperation>` class provides support for flow control and throttling of operations such as data or redraw requests

- Pass to the _Constructor_ a 'throttle interval' and 'action' to execute an operation 
    - The 'throttle interval' specifies the minimum time (as a `TimeSpan`) between operations being executed
    - The 'action' is passed an instance of `TOperation` and when finished must call `Complete()`
- Up to two operations can be tracked at any one time
    - The current (or active) operation (will be the first one added)
    - Operations added when there is already one active will become pending
    - A pending operation will always be the last one added (replacing any previous pending operation)
    - The current and pending operation will not overlap
- Call `Add()` to add an operation of type `TOperation`
- Call `Complete()` to indicate that the current operation has finished executing
    - If there is a pending operation it will automatically become active
- Call `GetCurrent()` to get a copy of the current operation (if there is one, the method returns true)
- Call `Abort()` to clear any active/pending operations

## Drawing Graphics

WPF provides a number of ways to draw [graphics](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/graphics-multimedia).

The `VisualLayer` class provides a simple way to add graphics drawn using the low-level and efficient [DrawingContext](https://docs.microsoft.com/en-us/dotnet/api/system.windows.media.drawingcontext) class.


- Add an `IVisual` instance to the _View Model_ class

    ```C#
    [Browsable(false)]
    public IVisual ExampleVisual { get; set; }
    ```

- Add a `VisualLayer` to the XAML

    ```xml hl_lines="10"
    <UserControl x:Class="DisplayPlugin.SampleDisplayView"
                xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
                xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
                xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
                xmlns:displayPluginLibrary="clr-namespace:DisplayPluginLibrary;assembly=DisplayPluginLibrary"
                mc:Ignorable="d"
                d:DesignHeight="450" d:DesignWidth="800">

        <displayPluginLibrary:VisualLayer x:Name="ExampleVisualLayer" />
    </UserControl>
    ```

- In the code behind, associate the `ExampleVisualLayer` _View_ property to the `ExampleVisual` _View Model_ property

    ```c# hl_lines="7"
    public override void OnApplyTemplate()
    {
        base.OnApplyTemplate();

        if (this.DataContext is SampleDisplayViewModel vm)
        {
            vm.ExampleVisual = this.ExampleVisualLayer.Visual;
        }
    }
    ```

- Draw graphics as required in the _View Model_

    ```c# hl_lines="4"
    this.ExampleVisual.Draw(
        dc =>
        {
            dc.DrawLine(examplePen, exampleLine.Start, exampleLine.End);
        });
    ```

!!! attention

    Drawing must be done on the UI thread.

    Make use of [`SynchronizationContext` class](https://docs.microsoft.com/en-us/dotnet/api/system.threading.synchronizationcontext) or call the `TemplateDisplayViewModelBase.ExecuteOnUiAsync()` method.

!!! tip

    To clear the visual layer of all graphics 
    ```c#
    this.TraceVisual.Draw(delegate { });
    ```

## Converters

`ColorToSolidColorBrushValueConverter` is a basic WPF converter that converts a simple colour into a solid colour brush.
