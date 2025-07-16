# Numeric Compare display

This tutorial demonstrates the use of [Composite Data Requests](../detailed/data.md#data-request-properties) for [Compare Sets](../detailed/sessions.md#sessions-object-model).

The existing Numeric display within ATLAS only displays values for the primary session, therefore a useful way to explore compare mode is to create a numeric like display to view the value of each display parameter for each session within a compare set.

!!! note

    The code for this tutorial can be reviewed at [Tutorials/NumericCompareDisplayPlugin](https://github.com/mat-docs/Atlas.DisplayAPI.Examples/tree/master/NumericCompareDisplayPlugin)

Start the tutorial by [creating a new display from scratch](createfromscratch.md) named `NumericCompareDisplayPlugin`.

The user interface should consist of a grid of display parameters vs sessions, where each cell is the display parameter value for that session.

- The first column should be the display parameter name.

## Update the _View_ class

Configure the user interface as follows

- Use an `ItemsControl` to display a collection of cell values
    - Bind `ItemsSource` attribute to the _View Model_ `CellValues` property
- By default items are displayed as a vertical list, set the `ItemsPanel` element to a `UniformGrid` instead
    - Bind the `Rows` attribute to the _View Model_ `RowCount` property
    - Bind the `Columns` attribute to the _View Model_ `ColumnCount` property
- Set the `ItemTemplate` element to a `DataTemplate` containing a uniform `ViewBox` containing a white `TextBlock` displaying a cell value
    - Bind the `Text` attribute to the  _Cell View Model_ `Value` property

```xml
<ItemsControl ItemsSource="{Binding CellValues}" SnapsToDevicePixels="True" UseLayoutRounding="True">
    <ItemsControl.ItemsPanel>
        <ItemsPanelTemplate>
            <UniformGrid Rows="{Binding RowCount}" Columns="{Binding ColumnCount}" />
        </ItemsPanelTemplate>
    </ItemsControl.ItemsPanel>
    <ItemsControl.ItemTemplate>
        <DataTemplate>
            <Viewbox Stretch="Uniform">
                <TextBlock Padding="5" Foreground="White" Text="{Binding Value}" TextOptions.TextFormattingMode="Ideal" />
            </Viewbox>
        </DataTemplate>
    </ItemsControl.ItemTemplate>
</ItemsControl>
```

## Add _Cell View Model_ class

Add a simple _View Model_ class to represent a generic cell value

```c#
public sealed class CellViewModel : BindableBase
{
    private object obj;

    public CellViewModel(object obj)
    {
        this.obj = obj;
    }

    public object Value
    {
        get => this.obj;
        set => SetProperty(ref this.obj, value);
    }
}
```

!!! note

    `BindableBase` provides an implementation of [INotifyPropertyChanged](https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.inotifypropertychanged)

    Since the `Value` property setter calls the `SetProperty()` method, the User Interface is automatically refreshed when a new value is set.

## Update the _View Model_ class

Derive from [TemplateDisplayViewModelBase](displaypluginlibrary.md#templatedisplayviewmodelbase-view-model-base-class) and allow display parameters by specifying the [`DisplayPluginSettings`](../detailed/parameters.md) attribute

```c#
    [DisplayPluginSettings(ParametersMaxCount = 100)]
    public sealed class SampleDisplayViewModel : TemplateDisplayViewModelBase
```

Add the following backers

- `object` field named `parameterLock` to prevent multiple threads accessing the display parameters at the same time
- `List<CompositeSessionKey>` field named `compositeSessionKeys` to hold the collection of configured composite session keys 
- `List<Guid>` field named `parameterIdentifiers` to hold the collection of configured parameter identifiers 
- `int` field named `rowCount` as backer for the `RowCount` property
- `int` field named `columnCount` as backer for the `ColumnCount` property

```c#
private readonly object parameterLock = new object();
private List<CompositeSessionKey> compositeSessionKeys = new List<CompositeSessionKey>();
private List<Guid> parameterIdentifiers = new List<Guid>();
private int rowCount;
private int columnCount;
```

Inject the `ISignalBus`, `IDataRequestSignalFactory` and `ILogger` services into the _View Model_ constructor and pass to the base constructor

```c#
public SampleDisplayViewModel(
    ISignalBus signalBus,
    IDataRequestSignalFactory dataRequestSignalFactory,
    ILogger logger) :
        base(signalBus, dataRequestSignalFactory, logger)
```

Add the following properties

- `int` property named `ColumnCount` to specify the number of columns (composite sessions count + 1 for display parameter name)
- `int` property named `RowCount` to specify the number of rows (display parameters count)
- `ObservableCollection<CellViewModel>` property named `CellValues` to hold display parameter properties

```c#
[Browsable(false)]
public int ColumnCount
{
    get => this.columnCount;
    set => SetProperty(ref this.columnCount, value);
}

[Browsable(false)]
public int RowCount
{
    get => this.rowCount;
    set => SetProperty(ref this.rowCount, value);
}

[Browsable(false)]
public ObservableCollection<CellViewModel> CellValues { get; } = new ObservableCollection<CellViewModel>();
```

Subscribe to `CompositeSampleResultSignal` in the _View Model_ constructor to handle the result of a _composite sample data request_

```c#
this.Disposables.Add(
    this.SignalBus.Subscribe<CompositeSampleResultSignal>
        this.HandleCompositeSampleResultSignal,
        r => r.SourceId == this.ScopeIdentity.Guid));
```

!!! note

    The _subscription instance_ is added to the `Disposables` property for automatic cleanup on dispose.

Override the `OnMakeCursorDataRequestsAsync()` method to issue a _composite sample data request_ per display parameter when the cursor timestamp changes

```c#
protected override async Task OnMakeCursorDataRequestsAsync(ICompositeSession compositeSession)
{
    await this.ExecuteOnUiAsync(this.SyncParameters);

    foreach (var parameterContainer in DisplayParameterService.ParameterContainers)
    {
        var signal = this.DataRequestSignalFactory.CreateCompositeSampleRequestSignal(
            this.ScopeIdentity.Guid,
            this.ActiveCompositeSessionContainer.Key,
            parameterContainer,
            compositeSession.CursorPoint + 1,
            1,
            SampleDirection.Previous);


        this.SignalBus.Send(signal);
    }
}
```

!!! note

    The `CellValues` property is first updated by calling the `SyncParameters()` method on the UI thread

Add the `SyncParameters()` method to synchronize the `CellValues` property with configured composite sessions and display parameters

```c#
private void SyncParameters()
{
    lock (this.parameterLock)
    {
        var compositeSessions = this.ActiveCompositeSessionContainer?.CompositeSessions?.ToList();
        var parameterContainers = this.DisplayParameterService.ParameterContainers.ToList();
        if ((compositeSessions?.Count ?? 0) == 0 ||
            parameterContainers.Count == 0)
        {
            this.compositeSessionKeys.Clear();
            this.parameterIdentifiers.Clear();

            this.RowCount = 0;
            this.ColumnCount = 0;
            this.CellValues.Clear();
            return;
        }

        var newCompositeSessionKeys = compositeSessions.Select(cs => cs.Key).ToList();
        var newParameterIdentifiers = new List<Guid>();
        var newCellValues = new List<CellViewModel>();

        foreach (var parameterContainer in parameterContainers)
        {
            newParameterIdentifiers.Add(parameterContainer.InstanceIdentifier);

            newCellValues.Add(new CellViewModel(parameterContainer.Name));

            var oldParameterIndex = this.parameterIdentifiers.IndexOf(parameterContainer.InstanceIdentifier);
            foreach (var newCompositeSessionKey in newCompositeSessionKeys)
            {
                var oldCompositeSessionIndex = this.compositeSessionKeys.IndexOf(newCompositeSessionKey);
                if (oldParameterIndex < 0 || oldCompositeSessionIndex < 0)
                {
                    newCellValues.Add(new CellViewModel(string.Empty));
                    continue;
                }

                var parameterValueIndex = GetCellIndex(oldParameterIndex, oldCompositeSessionIndex);
                var oldParameterValue = this.CellValues[parameterValueIndex];
                newCellValues.Add(oldParameterValue);
            }
        }

        this.compositeSessionKeys = newCompositeSessionKeys;
        this.parameterIdentifiers = newParameterIdentifiers;

        this.RowCount = this.parameterIdentifiers.Count;
        this.ColumnCount = this.compositeSessionKeys.Count + 1;
        this.CellValues.Clear();
        foreach (var newCellValue in newCellValues)
        {
            this.CellValues.Add(newCellValue);
        }
    }

    this.MakeDataRequests(true, false);
}
```

Add the `HandleCompositeSampleResultSignal()` method to update the appropriate cell values with the results of the _composite sample data request_

```c#
private void HandleCompositeSampleResultSignal(CompositeSampleResultSignal signal)
{
    lock (parameterLock)
    {
        var request = signal.Data.Request;

        var parameterIndex = this.parameterIdentifiers.IndexOf(request.ParameterContainer.InstanceIdentifier);
        if (parameterIndex < 0)
        {
            return;
        }

        var result = signal.Data;

        foreach (var kvp in result.Results)
        {
            var compositeSessionIndex = this.compositeSessionKeys.IndexOf(kvp.Key);
            if (compositeSessionIndex < 0)
            {
                continue;
            }

            var parameterValues = kvp.Value.ParameterValues;
            if (parameterValues.SampleCount == 0)
            {
                continue;
            }

            parameterValues.Lock();

            try
            {
                var cellIndex = this.GetCellIndex(parameterIndex, compositeSessionIndex);
                this.CellValues[cellIndex].Value = parameterValues.Data[0];
            }
            finally
            {
                parameterValues.Unlock();
            }
        }
    }
}
```

Add the `GetCellIndex()` method to convert a display parameter and session grid coordinate into a cell index

```c#
private int GetCellIndex(int parameterIndex, int compositeSessionIndex)
{
    var parameterValueIndex = parameterIndex * (this.compositeSessionKeys.Count + 1) + 1 + compositeSessionIndex;
    return parameterValueIndex;
}
```

## Testing the display

To view the display parameter values

- Add at least two sessions via the _Session Browser_ to the compare set associated with the display 
- Add some display parameters to the display via the _Parameter Browser_
- Use a _Waveform_ display to change the cursor
