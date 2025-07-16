# Initialization, state and notifications

The following methods and properties of _DisplayPluginViewModel_ provide display initialization, state and notifications

- Display initialization
    - `OnInitialised()`
        - Called when display is first initialized (programmatic parameters should ideally be added within this override)
- Display state properties
    - `ActiveCompositeSessionContainer`
        - Access to compare set associated with display (can be `null` if no association)
    - `ServiceContext`
        - Access to per display services
    - `IsSelected`
        - True when page is active and display is shown, false when display is overlaid by another display
    - `CanRetrieveData`
        - False when display is inactive or no session is associated and therefore display should not retrieve data
    - `ScopeIdentity`
        - Unique identity of display (mainly used to associate results of a data request to a display)
- Display change notifications
    - `OnActiveDisplayPageChanged(bool isActive)`
        - Called whenever page is switched (`isActive` is true when the active page contains the display)
    - `OnCanRenderDisplayChanged(bool canRender)`
        - Called whenever display visibility changes (`canRender` is true when display is visible)

!!! important

    `CanRetrieveData` should be used exclusively for deciding whether it is necessary to make data requests.


!!! attention

    Do NOT access `ActiveCompositeSessionContainer` when `CanRetrieveData` is false, as an unexpected exception may be raised
