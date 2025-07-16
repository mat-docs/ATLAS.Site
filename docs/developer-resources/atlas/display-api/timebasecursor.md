# Working with Timebase and Cursor

The _timebase_ is the currently visible timestamp range that determines the extent of parameter values displayed by various standard displays such as _Waveform_, _Scatterplot_, _Histogram_ etc.

The _cursor_ is the currently selected timestamp and determines the parameter values displayed by various standard displays such as _Numeric_, _Bit_, _Circuit_ etc.

Most standard displays are based on either _timebase_ or _cursor_.

A notable exception is the _Summary_ display that is based on laps. 

The _Waveform_ display uses both _timebase_ and _cursor_ and responds as they change. Interacting with the _Waveform_ display changes the value of _timebase_ and/or _cursor_. 

!!! hint

    To maintain consistency, custom displays should match the behaviour of standard displays (unless doing something different like _Summary Display_).

## Timebase and Cursor timestamps

To access the primary session timebase range and/or cursor

- Get the F1 timeline extent for the primary session from `ActiveCompositeSessionContainer.CompositeSessions.First(cs => cs.IsPrimary).TimebaseRange`
- Get the cursor timestamp for the primary session from `ActiveCompositeSessionContainer.First(cs => cs.IsPrimary).CursorPoint`

!!! tip

    Ensure you check `ActiveCompositeSessionContainer.IsPrimaryCompositeSessionAvailable` is `true` before looking for the primary session.

!!! attention

    Do not confuse `TimeRange` (extent of session) and `TimebaseRange` (extent of F1 timeline selection) properties.

!!! note

    A timestamp is the number of nanoseconds since midnight.

    A timestamp can be converted to a `TimeSpan` via

    ```c#
    var timespan = TimeSpan.FromTicks(timestamp / 100);
    ```

The following `DisplayPluginViewModel` overrides are called whenever the timebase or cursor changes for a _composite session_

- `OnCursorDataPointChanged(ICompositeSession)`
    - New timestamp value is obtained from `ICompositeSession.CursorPoint`
- `OnSessionTimeRangeChanged(ICompositeSession)`
    - New timestamp range is obtained from `ICompositeSession.TimebaseRange`

## Cursor Service

Programmatic setting of the the cursor for the active session 

- `ISessionCursorService`
    - Use `MoveCursor()` to change the timestamp of the cursor
