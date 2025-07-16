# Working with Display Parameters

By default, display parameters cannot be added to the display.

- Decorate the _View Model_ class with the `[DisplayPluginSettings(ParametersMaxCount=n)]` attribute to set an appropriate maximum number of display parameters allowed 
    - 100 is the recommended maximum

Display parameters can be configured by

- The _user_ with the _Parameter Browser_	
- Programmatically via `IDisplayParameterService`

Each display parameter consists of a _parameter container_ with a _parameter_ per composite session.

Override the following `DisplayPluginViewModel` notifications as appropriate

- `OnParameterContainerAdded()`
    - Called when parameter is first added.
- `OnParameterContainerRemoved()`
    - Called when parameter is removed
- `OnParameterAdded()`
    - Called for each _composite session_ when a parameter is added
- `OnParameterRemoved()`
    - Called for each _composite session_ when a parameter is removed

!!! note

    `OnParameterContainerAdded` will be called, followed by `OnParameterAdded` for each _composite session_

    `OnParameterRemoved` is called for each _composite session_, followed by `OnParameterContainerRemoved`

!!! note

    Use `OnParameterAdded()` and `OnParameterRemoved()` for compare set aware custom displays

## Display Parameter Service

The `IDisplayParameterService` is used to access and manipulate display parameters

- `ParameterContainers` collection property
    - One per display parameter
    - `Parameters` collection property
        - One per _composite session_
- `PrimaryParameters` collection property
    - One per display parameter
    - Parameters from the _primary composite session_ only
- `AddParameterContainer()`
    - Programmatically add a display parameter (usually done in `OnInitialised()`)
- `RemoveParameterContainer()`
    - Programmatically remove a display parameter
