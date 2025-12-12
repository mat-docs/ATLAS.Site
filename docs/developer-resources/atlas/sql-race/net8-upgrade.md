# .NET 8 Upgrade

The ATLAS client (`11.4.4.349-W47`) and SQL RACE (`2.1.25308.1-ci`) is now updated to .NET 8,.

Users will need to consider upgrading any custom plugins or scripts they might have written to this framework.

Provided the custom ATLAS plugin does not use any .NET libraries that are no longer supported in .NET 8, 
they should still work with this release of ATLAS, but this is not something we can guarantee. You may find it necessary
to recompile against .NET 8. 

## C\#

You may wish to determine any initial portability concerns using the  [Platform Compatibility Analyzer](https://docs.microsoft.com/en-us/dotnet/standard/analyzers/platform-compat-analyzer) and [.NET 
Portability Analyzer](https://docs.microsoft.com/en-us/dotnet/standard/analyzers/portability-analyzer). For C# there is also the [.NET Upgrade Assistant](https://docs.microsoft.com/en-us/dotnet/core/porting/upgrade-assistant-overview) to upgrade projects, this will:

* Upgrade to new project format
* Replace old style packages.config with project file-based package references
* Update dependencies as required to support at least .NET Standard

There might be instances when certain dependencies may have to be updated/replaced, e.g. if it is no longer supported 
in .NET 8. Useful sites:

### Porting Guides

[https://docs.microsoft.com/en-us/dotnet/core/porting/](https://docs.microsoft.com/en-us/dotnet/core/porting/)

[https://docs.microsoft.com/en-gb/dotnet/core/porting/net-framework-tech-unavailable](https://docs.microsoft.com/en-gb/dotnet/core/porting/net-framework-tech-unavailable)

[https://docs.microsoft.com/en-us/dotnet/standard/library-guidance/cross-platform-targeting](https://docs.microsoft.com/en-us/dotnet/standard/library-guidance/cross-platform-targeting)

[https://learn.microsoft.com/en-us/dotnet/desktop/wpf/migration/](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/migration/)


### .NET Upgrade Assistant

[https://docs.microsoft.com/en-us/dotnet/core/porting/upgrade-assistant-overview](https://docs.microsoft.com/en-us/dotnet/core/porting/upgrade-assistant-overview)

### .NET Portability Analyzer

[https://docs.microsoft.com/en-us/dotnet/standard/analyzers/portability-analyzer](https://docs.microsoft.com/en-us/dotnet/standard/analyzers/portability-analyzer)

### Platform Compatibility Analyzer

[https://docs.microsoft.com/en-us/dotnet/standard/analyzers/platform-compat-analyzer](https://docs.microsoft.com/en-us/dotnet/standard/analyzers/platform-compat-analyzer)

## MATLAB

For compatability with .NET 8, you will beed to run R2023a or higher as this will support .NET 6 or higher.

The default .NET runtime for MATLAB can be configured to .NET Core with the following command, where it will choose the latest installed version.
```matlab
dotnetenv('core')
```

If you have newer .NET runtime environments (> .NET 8) then it is advised to state the version.
```matlab
dotnetenv("core",Version="8");
```

The runtime configuration file for the .NET runtime can be found
in `matlabroot/bin/win64/dotnetcli_netcore.runtimeconfig.json`.
With this file, MATLAB loads the latest appropriate assemblies compatible with SQLRace API.

An example configuration for the runtime is provided below.
```
{
  "runtimeOptions": {
    "rollForward": "Minor",
    "tfm": "net8.0",
    "frameworks": [
      {
        "name": "Microsoft.NETCore.App",
        "version": "8.0.0"
      },
      {
        "name": "Microsoft.WindowsDesktop.App",
        "version": "8.0.0"
      },
      {
        "name": "Microsoft.AspNetCore.App",
        "version": "8.0.0"
      }
    ],
    "configProperties": {
      "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": true
    }
  }
}
```

More information about calling .NET from MATLAB can be found in the 
[MATLAB documentation](https://mathworks.com/help/matlab/call-net-from-matlab.html).

!!! hint

    Information on the runtime in use can be retrieved using:
    ```matlab
    e = dotnetenv;
    disp(e)
    ```

## Python

In order to run .NET in Python you need to use [pythonnet](https://github.com/pythonnet), currently this only supports python `3.7` - `3.13` with `3.14` and newer not [yet](https://github.com/pythonnet/pythonnet/issues/2610) supported.

The runtime must be configured __before `clr` is imported__, otherwise the default runtime will be initialized and used.

The .NET Core runtime can be loaded in code by calling `pythonnet.load` or configuring the environment variable.

**In Code**
```python
from pythonnet import load

load("coreclr", runtime_config=r"C:\Program Files\McLaren Applied Technologies\ATLAS 10\MAT.Atlas.Host.runtimeconfig.json")
```

**Environment Variable**
```
PYTHONNET_RUNTIME=coreclr
PYTHONNET_CORECLR_RUNTIME_CONFIG=C:\Program Files\McLaren Applied Technologies\ATLAS 10\MAT.Atlas.Host.runtimeconfig.json
```

More information about calling .NET from Python can be found in the 
[pythonnet documentation](https://pythonnet.github.io/pythonnet/python.html#loading-a-runtime).

!!! hint

    Information on the runtime in use can be retrieved using `pythonnet.get_runtime_info()`).
