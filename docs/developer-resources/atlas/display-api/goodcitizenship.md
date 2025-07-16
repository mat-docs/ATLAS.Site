# Good Citizenship

A custom display should be written to look, behave and act just like the standard displays shipped with ATLAS.

!!! attention

    As custom displays are executed directly within ATLAS, an improperly written custom display has the potential to affect ATLAS reliability and performance

In order to be a good citizen within the ATLAS ecosystem, a custom display should

- Follow [MVVM](../../introduction/mvvm.md)
- Not use unsupported [private APIs](../../index.md#direct-use-of-platform-and-presentation-apis) whenever possible
- Not do processing on the UI thread
    - Use _TaskPool_ for processing and dispatch UI updates via `SynchronizationContext` instead
- Throttle data requests
    - Do not overlap requests
    - Do not just respond to raised events (choose an appropriate refresh rate)
- Obey `CanRetrieveData`
    - Handle appropriate events to ensure display is kept up to date
        - As explained in [Data request guidelines](data.md#data-request-guidelines)

!!! tip

    The [Display Plugin Library](../tutorials/displaypluginlibrary.md) demonstrates how to make a custom display a good citizen

    Using the provided _View Model_ base classes in your own custom displays will help to ensure you follow these guidelines