# Enhanced Diagnostic display

A useful way to explore the [features](../../introduction/features.md) of the Display API is to create a diagnostic display to exercise various aspects of the API and log information when interacting with the display and view the results.

!!! note

    The code for this tutorial can be reviewed at [Tutorials/EnhancedDisplayPlugin](https://github.com/mat-docs/Atlas.DisplayAPI.Examples/tree/master/EnhancedDisplayPlugin)

With the ability to log messages, we can start to explore the API by overriding each of the _View Model_ virtual methods and then experiment with the display in ATLAS to see when and in what situations these overridden methods are called.

For state, methods and services we can explore these by adding additional user interface elements to the _View_ to view the results and any side effects of interacting with them.

Start the tutorial by [creating a new display from scratch](createfromscratch.md) named `EnhancedDisplayPlugin`.

## Add logging

Modify the _XAML_ of the _View_ to contain a `TextBox` to view the diagnostic log

```xml hl_lines="9-13"
<UserControl x:Class="EnhancedDisplayPlugin.SampleDisplayView"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             mc:Ignorable="d"
             d:DesignHeight="450" d:DesignWidth="800">
  <Grid>
    <TextBox VerticalScrollBarVisibility="Auto"
             HorizontalScrollBarVisibility="Auto"
             IsReadOnly="True"
             Text="{Binding LogText, Mode=TwoWay}">
    </TextBox>
  </Grid>
</UserControl>
```

Add a `string` property named `LogText` to the _View Model_ (see [Display Properties](../detailed/displayprops.md) for further information)

```c#
[Browsable(false)]
public string LogText
{
    get => this.logText;
    set => this.SetProperty(ref this.logText, value);
}
```

Add the following backers

- `SynchronizationContext` field named `synchronizationContext` to update the `TextBox` on the UI thread
- `List<string>` field named `pendingLogMessages` to hold pending log messages
 - `object` field named `logLock` to prevent multiple threads accessing the log at the same time

```c#
private readonly SynchronizationContext synchronizationContext;
private readonly List<string> pendingLogMessages = new List<string>();
private readonly object logLock = new object();
```

Set the `SynchronizationContext` field in the _View Model_ constructor.

```c# hl_lines="3"
public SampleDisplayViewModel()
{
    this.synchronizationContext = SynchronizationContext.Current;
}
```

!!! attention

    Notification methods and signal result handlers may be called concurrently on separate threads, therefore some form of thread synchronization is required when accessing shared resources.

    User Interface must be updated on the UI thread, the [`SynchronizationContext` class](https://docs.microsoft.com/en-us/dotnet/api/system.threading.synchronizationcontext) is used in this tutorial.

Add a helper method named `LogMessage` to update the log

```c#
private static void LogMessage(
    SynchronizationContext synchronizationContext,
    ICollection<string> pendingMessages,
    object logLock,
    Func<string> readLog,
    Action<string> writeLog,
    string message)
{
    bool firstNewMessage;
    lock (logLock)
    {
        firstNewMessage = !pendingMessages.Any();
        pendingMessages.Add(message);
    }

    if (firstNewMessage)
    {
        synchronizationContext.Post(
            _ =>
            {
                lock (logLock)
                {
                    var stringBuilder = new StringBuilder(readLog());

                    foreach (var pendingMessage in pendingMessages)
                    {
                        stringBuilder.AppendLine(pendingMessage);
                    }
                    pendingMessages.Clear();

                    writeLog(stringBuilder.ToString());
                }
            },
            null);
    }
}
```

Finally add a simplified method named `Log` to log a single message

```c#
private void Log(string message)
{
    LogMessage(
        this.synchronizationContext,
        this.pendingLogMessages,
        this.logLock,
        () => this.LogText,
        v => this.LogText = v,
        message);
}
```

## Exploring state

The API state is the value of any properties exposed by the _View Model_ and any properties obtained from services, e.g. configured parameters or session summary.

To view the API state at any time add a `Button` to the _View XAML_

```xml
<Button Command="{Binding LogPropertiesCommand}">Log Properties</Button>
```

!!! note

    Layout the User Interface using an appropriate WPF panel, such as: `Grid`, `StackPanel` or `WrapPanel`.

Add a _command handler_ named `LogPropertiesCommand` to the _View Model_

```c#
[Browsable(false)]
public ICommand LogPropertiesCommand { get; }
```

Initialise the `LogPropertiesCommand` _command handler_ in the _View Model_ constructor


```c#
this.LogPropertiesCommand = new DelegateCommand(this.OnLogProperties);
```

Implement the _command handler_ by logging appropriate property values

```c#
private void OnLogProperties()
{
    this.Log(nameof(OnLogProperties));
    this.Log($"   IsSelected: {this.IsSelected}");
    this.Log($"   CanRetrieveData: {this.CanRetrieveData}");
    this.Log($"   ScopeIdentity.Identity: {this.ScopeIdentity.Identity}");

    // Log this.ActiveCompositeSessionContainer

    // Log this.displayParameterService.ParameterContainers
```

!!! note

    The code for this tutorial [Tutorials/EnhancedDisplayPlugin](https://github.com/mat-docs/Atlas.DisplayAPI.Examples/tree/master/EnhancedDisplayPlugin) provides a full implementation of `OnLogProperties`. 

    The code also allows you to log the properties periodically, this is useful to demonstrate how the API state changes whilst the display is non-interactive, e.g. covered by another display or a different page is active.

## Exploring notifications

Notification methods are virtual methods exposed from the _View Model_ and are called when specific events occur in ATLAS, e.g. when the active page is changed.

Override notification methods and add log statements to view the value of any arguments, e.g.

```c#
public override void OnActiveDisplayPageChanged(bool isActive)
{
    this.Log(nameof(OnActiveDisplayPageChanged));
    this.Log($"   IsActive: {isActive}");
}
```

Add overrides for all the notification methods as detailed in the following sections

### [Initialization and  state change notifications](../detailed/initialization.md)
- `OnInitialised()`
- `OnActiveDisplayPageChanged()`
- `OnCanRenderDisplayChanged()`

### [Session notifications](../detailed/sessions.md)
- `OnCompositeSessionLoaded()`
- `OnCompositeSessionUnLoaded()`
- `OnCompositeSessionContainerChanged()`

### [Display Parameter notifications](../detailed/parameters.md)
- `OnParameterContainerAdded()`
- `OnParameterContainerRemoved()`
- `OnParameterAdded()`
- `OnParameterRemoved()`

### [Timebase and cursor notifications](../detailed/timebasecursor.md)
- `OnCursorDataPointChanged(ICompositeSession)`
- `OnSessionTimeRangeChanged(ICompositeSession)`

## Exploring timebase/cursor

Using `ISessionCursorService`, it is possible to set the cursor timestamp by calling `MoveCursor()`

To gain access to `ISessionCursorService`, add a _backer_ and inject an instance into the _View Model_ constructor

```c#
private readonly ISessionCursorService sessionCursorService;

public SampleDisplayViewModel(ISessionCursorService sessionCursorService)
{
    this.sessionCursorService = sessionCursorService;
}
```

!!! note

    See [Factories and Services](../detailed/factoriesandservices.md) for an explanation of other services
 
Add a `Button` to the _View XAML_

```xml
<Button Command="{Binding CentreCursorCommand}">Centre Cursor</Button>
```

Add a _command handler_ named `CentreCursorCommand`

```c#
[Browsable(false)]
public ICommand CentreCursorCommand { get; }
```

Initialise the `CentreCursorCommand` _command handler_ in the _View Model_ constructor

```c#
this.CentreCursorCommand = new DelegateCommand(this.OnCentreCursor);
```

Implement the _command handler_ by calculating the timestamp at the centre of the current timebase and passing to `MoveCursor()`

```c#
private void OnCentreCursor()
{
    if (!this.CanRetrieveData ||
        !this.ActiveCompositeSessionContainer.IsPrimaryCompositeSessionAvailable)
    {
        return;
    }

    var primarySession = this.ActiveCompositeSessionContainer.CompositeSessions.FirstOrDefault(c => c.IsPrimary);
    if (primarySession != null)
    {
        var centreTimestamp = (primarySession.TimebaseRange.Start + primarySession.TimebaseRange.End) / 2;

        this.sessionCursorService.MoveCursor(primarySession, centreTimestamp);
    }
}
```

## Exploring data requests

[Data Requests](../detailed/data.md) can be explored by logging the value of parameters when the cursor is changed.

Ensure display parameters are allowed by adding the _DisplayPluginSettings_ attribute to the _View Model_

```c# hl_lines="1"
    [DisplayPluginSettings(ParametersMaxCount = 100)]
    public sealed class SampleDisplayViewModel : DisplayPluginViewModel
```

Add _backers_ for the required services, then inject and initialize

```c#
private readonly ISignalBus signalBus;
private readonly IDataRequestSignalFactory dataRequestSignalFactory;
private IDisplayParameterService displayParameterService;

public SampleDisplayViewModel(
    ISignalBus signalBus,
    IDataRequestSignalFactory dataRequestSignalFactory)
{
    this.signalBus = signalBus;
    this.dataRequestSignalFactory = dataRequestSignalFactory;
}

protected override void OnInitialised()
{
    this.displayParameterService = this.ServiceContext.DisplayParameterService;
}
```

Register with the `SignalBus` a _data result handler_ for sample requests to the _View Model_ constructor

```c#
this.signalBus.Subscribe<SampleResultSignal>(
    this.HandleSampleResultSignal,
    r => r.SourceId == this.ScopeIdentity.Guid)
```

!!! note

    The result from calling `Subscribe` should be properly disposed, the tutorial code demonstrates this.  

Make a _sample data request_ for each _display parameter_ when the cursor changes

```c#
public override void OnCursorDataPointChanged(ICompositeSession compositeSession)
{
    if (!this.CanRetrieveData)
    {
        return;
    }

    foreach (var primaryParameter in this.displayParameterService.PrimaryParameters)
    {
        var signal = this.dataRequestSignalFactory.CreateSampleRequestSignal(
            this.ScopeIdentity.Guid,
            compositeSession.Key,
            primaryParameter,
            compositeSession.CursorPoint + 1,
            1,
            SampleDirection.Previous);

        this.signalBus.Send(signal);
    }
}
```

!!! hint

    Since there may not be an exact sample value at the cursor timestamp, it is best practice to +1 to the timestamp and request the previous sample value.

Log the sample value for the the _display parameter_ if valid

```c#
private void HandleSampleResultSignal(SampleResultSignal signal)
{
    var request = signal.Data.Request;
    var result = signal.Data;

    var parameterValues = result.ParameterValues;
    if (parameterValues.SampleCount == 1)
    {
        this.Log(nameof(HandleSampleResultSignal));
        this.Log($"   Parameter: {request.Parameter.Identifier}, Value: {parameterValues.Data[0]}");
    }
}
```

!!! caution

    Due to reuse of the arrays contained within `ParameterValues`, the `Length` property of those arrays should not be used.

    - Use the `SampleCount` property to determine the extent of the returned values.
    - If you wish to retain a copy of `ParameterValues` you must call `Lock()`, and then `Unlock()` to release the reference when no longer required

### Testing the display

To view the parameter values

- Add a session via the _Session Browser_ to the compare set associated with the display 
- Add some display parameters to the display via the _Parameter Browser_
- Use a _Waveform_ display to change the cursor

## Other API features

The tutorial code also demonstrates the following API features

- [Working with Display Properties](../detailed/displayprops.md)
    - Demonstrates adding and handling properties within the the properties window
- Tracking timebase changes and logging the minimum and maximum values of configured parameters
    - Demonstrates issuing and handling data requests between two timestamps