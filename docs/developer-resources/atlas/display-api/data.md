# Working with Data

## Making Data Requests

The following services are required to retrieve parameter data

- `ISignalBus`
- `IDataRequestSignalFactory`

!!! hint

    These services are obtained from _Autofac_ by injecting into the _View Model_ constructor as parameters, e.g.

    ```c#
    public ViewModelConstructor(ISignalBus signalBus, IDataRequestSignalFactory dataRequestSignalFactory)
    {
        // Use now, or store for use later...
    }
    ```

A _data request_ is made via a data request signal (obtained from `IDataRequestSignalFactory`).

In order to match _results_ to _requests_ made by the display, a `sourceId` needs to be specified; an appropriate value is `this.ScopeIdentity.Guid` as this uniquely identifies the display.

!!! hint

    An optional `requestId` can be specified to distinguish between multiple requests of the same data request signal type.

The _signal bus_ is used to initiate the _data request_ by calling `ISignalBus.Send()`.

The result is asynchronously sent back via the _signal bus_ and therefore an appropriate handler needs to be registered in the _View Model_ constructor using `ISignal.Subscribe<resultSignalType>`passing a suitable handler.

!!! note

    The _result signal type_ much match the _request signal type_, [see list here](#data-request-and-result-signals)


!!! hint

    It is highly recommended to specify a filter checking that `resultSignal.SourceId` matches `this.ScopeIdentity.Guid`, avoiding the need to check in the handler.

!!! warning

    Remember to match the `SourceId` property of result signal, not `SignalId` property.

!!! attention

    The signal handler is ran by default on the Task pool.

    If modifying the UI, dispatch to the UI thread as appropriate via `SynchronizationContext`.

### Data Request and Results Reply Sequence

<object type="image/svg+xml" data="../devguide/assets/diagrams/DataRequestLifetime.svg" class="diagram" title="Lifetime of a data request"></object>

## Data Request Properties

- _Data_ vs _Samples_ requests
    - Requests for _Samples_ retrieve the actual stored values
    - Requests for _Data_ retrieve stored values re-sampled at a specified interval
- _Single_ vs _Composite_ session requests
    - _Single_ session requests return results for a single _composite session_
    - _Composite_ session requests return results for all _composite sessions_ within a _composite session container_ (primary and secondary) 
- Request properties
    - _Source Id_/_Request Id_
        - Used to match a _result_ to a _request_ as explained above.
    - _Composite Session key_ (or _Container Session Container key_ for _composite_ requests)
        - Usually obtained from `ActiveCompositeSessionContainer` or from arguments passed to notification methods
    - _Parameter_ (or _Parameter Container_ for _composite_ requests)
    - _Extent_ of data request
        - Requests for _Samples_
            - _Start Time_ and _Sample Count_, or
            - _Time Range_ 
        - Requests for _Data_
            - _Time Range_ and _Sample Count_ (_interval_ is calculated)
    - _Sample Direction_
        - Retrieve forwards (_Next_) or backwards (_Previous_) through the stored values
    - _Sample Mode_ (only applicable for requests for _Data_)
        - How the stored values are re-sampled (_First Value_, _Minimum_, _Maximum_, _Mean_ etc)
    - _Sample Count_ (see _Extent_ above)
        - Maximum number of samples to fetch (requests for _Samples_)
        - Used to calculate sample interval (requests for _Data_)
    - _Lap_, _Statistics Level_, _Statistics Option_
        - What statistics to calculate and over what time range

## Data request and result signals

Handle the matching result signal type for each request signal type used

- `DataRequestSignal`
    - Re-sampled values for a single _composite session_
    - Handle `DataResultSignal` to process result
- `SampleRequestSignal`
    - Actual values for a single _composite session_
    - Handle `SampleResultSignal` to process result
- `CompositeDataRequestSignal`
    - Re-sampled values for _composite session container_ (_compare set_)
    - Handle `CompositeDataResultSignal` to process result
- `CompositeSampleRequestSignal`
    - Actual values for _composite session container_ (_compare set_)
    - Handle `CompositeSampleResultSignal` to process result
- `DataStatisticsRequestSignal`
    - Statistic values
    - Handle `DataStatisticsResultSignal` to process result

## Data Results

Results are accessed via the matching results signal

- `IResult`
    - `ParameterValues` property, [see below](#parametervalues-properties)
        - Result of data request obtained from SQL Race
        - Remember to call `Lock()`/`Unlock()` if retaining a reference 
    - `IRequest` property (original request)
- `ICompositeResult`
    - `Results` property (`IDictionary<CompositeSessionKey, IResult>`)
        - `IResult` for each _composite session_
    - `ICompositeRequest` property (original request)
- `IStatisticsResult`
    - No results property (bug, see below)
    - `IRequest` property (original request)

!!! attention

    Currently data statistics requests are broken because the statistics result does not actually expose the retrieved data

### ParameterValues properties

Values retrieved by SQL Race are passed back in a `ParameterValues` instance

- `SampleCount`
    - Actual number of values returned from data request
- `TimeStamp`
    - The timestamp of each value
- `DataStatus`
    - The status of each value (e.g. _Missing_ if no meaningful value)
- `Data`
    - Each value (for _sample_ requests and for _mean data_ requests)
- `DataFirst`
    - Each first value (for first data requests)
- `DataMin`
    - Each minimum value (for minimum data requests)
- `DataMax`
    - Each maximum value (for maximum data requests)

!!! attention

    Due to the use of array pooling, the length of the arrays may be greater then the retrieved data quantity

    Always refer to _SampleCount_ and not array length

## Data request guidelines

- Only attempt a data request when `CanRetrieveData` is `true`
- Handle the following situations and make data requests to ensure the custom display is up to date (observing `CanRetrieveData` as per above)
    - Page switch and display visibility changes (stacked displays)
        - Override `OnCanRenderDisplayChanged()`
    - Sessions loaded/unloaded
        - Override `OnCompositeSessionLoaded()` and `OnCompositeSessionUnLoaded()`
    - Session association changes
        - Override `OnCompositeSessionContainerChanged()`
    - Copy/Paste displays
        - Override `OnInitialised()`
    - Parameters added/removed
        - Override `OnParameterAdded()` and `OnParameterRemoved()`
