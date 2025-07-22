# API Limitations

The Display API currently has the following limitations

- Missing events
    - Not notified when composite session becomes primary  
    - Not notified when compare mode settings change
    - Not notified when parameter order changes
    - Not notified when parameter properties change
- Missing UI helpers
    - No access to custom converters (e.g. AtlasColorToSolidBrush)
    - No access to custom property editors (e.g. AtlasColor property editor)
    - No access to common context menu (e.g. Parameter Browser, Properties)
    - No support for drag and drop of parameters
- No assistance with flow control
    - Event driven only
        - Update loop not supported
    - No inflight data request handling (nor throttling)

!!! tip

    Some of these limitations (especially around flow control) are overcome within the _View Model_ base classes provided by the [Display Plugin Library](devguide/displaypluginlibrary.md) 