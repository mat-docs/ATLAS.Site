# Factories and Services

The following are the factories and services provided by the Display API

- `ISignalBus`
       - Defines a signal bus for application-wide communication
- `IDataRequestSignalFactory`
    - Used for creating a data request signal for posting onto the signal bus
- `ISessionService`
    - Enumerate parameters within a session
- `ISessionSummaryService`
    - Obtain summary information for a session
- `IDisplayParameterService`
    - Service to manipulate display parameters
- `ISessionCursorService`
    - Programmatic setting of the cursor timestamp for the active session

!!! note

    These factories and services (except `IDisplayParameterService`) are registered with _Autofac_ (_IoC container_)

    To obtain an instance, inject as a parameter into the _View Model_ constructor 

    `IDisplayParameterService` is a display specific service (accessible via `DisplayPluginViewModel.ServiceContext` property)

The following sections provide further information regarding usage of each.
