# .NET6 Upgrade

ATLAS client is now updated to .NET6.

Users will need to consider upgrading any custom plugins or scripts they might have written. 
Provided the custom ATLAS plugin does not use any .NET Framework libraries that are no longer supported in .NET 6, 
they should still work with this release of ATLAS, but this is not something we can guarantee. You may find it necessary
to recompile against .NET 6. 

## C\#

You may wish to determine any initial portability concerns using the Platform Compatibility Analyzer and .NET 
Portability Analyzer. For C# there is also the .NET Upgrade Assistant to upgrade projects, this will:

* Upgrade to new project format
* Replace old style packages.config with project file-based package references
* Update dependencies as required to support at least .NET Standard


There might be instances when certain dependencies may have to be updated/replaced, e.g., if it is no longer supported 
in .NET 6. Useful sites:

* Porting Guides

  [https://docs.microsoft.com/en-us/dotnet/core/porting/](https://pythonnet.github.io/pythonnet/python.html#loading-a-runtime)

  [https://docs.microsoft.com/en-gb/dotnet/core/porting/net-framework-tech-unavailable](https://pythonnet.github.io/pythonnet/python.html#loading-a-runtime)

  [https://docs.microsoft.com/en-us/dotnet/desktop/wpf/migration/convert-project-from-net-framework](https://pythonnet.github.io/pythonnet/python.html#loading-a-runtime)

  [https://docs.microsoft.com/en-us/dotnet/standard/library-guidance/cross-platform-targeting](https://pythonnet.github.io/pythonnet/python.html#loading-a-runtime)

* .NET Upgrade Assistant

  [https://docs.microsoft.com/en-us/dotnet/core/porting/upgrade-assistant-overview](https://pythonnet.github.io/pythonnet/python.html#loading-a-runtime)
* .NET Portability Analyzer

  [https://docs.microsoft.com/en-us/dotnet/standard/analyzers/portability-analyzer](https://pythonnet.github.io/pythonnet/python.html#loading-a-runtime)
* Platform Compatibility Analyzer

  [https://docs.microsoft.com/en-us/dotnet/standard/analyzers/platform-compat-analyzerx](https://pythonnet.github.io/pythonnet/python.html#loading-a-runtime)

## MATLAB

MATLAB versions earlier than 2022b do not support the .NET core runtime.

The default .NET runtime for MATLAB versions 2022b can be configured to .NET Core with the 
following command
```matlab
dotnetenv('core')
```

The runtime configuration file for the .NET runtime can be found
in `matlabroot/bin/win64/dotnetcli_netcore.runtimeconfig.json`.
With this file, MATLAB loads the latest appropriate assemblies compatible with SQLRace API.
An example configuration for the runtime is provided below.
```
{
  "runtimeOptions": {
    "rollForward": "LatestMajor",
    "tfm": "net6.0",
    "frameworks": [
      {
        "name": "Microsoft.NETCore.App",
        "version": "6.0.0"
      },
      {
        "name": "Microsoft.WindowsDesktop.App",
        "version": "6.0.0"
      },
      {
        "name": "Microsoft.AspNetCore.App",
        "version": "6.0.0"
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

## Python

The .NET core runtime can be loaded via calling `pythonnet.load` or configuring the environment variable.

The runtime must be configured __before `clr` is imported__, otherwise the default runtime will be initialized and used. 
Information on the runtime in use can be retrieved using `pythonnet.get_runtime_info()`).

Calling `pythonnet.load`
```python
from pythonnet import load
load("coreclr", runtime_config=r"C:\Program Files\McLaren Applied Technologies\ATLAS 10\MAT.Atlas.Host.runtimeconfig.json")
```
Via Environment Variables
```
PYTHONNET_RUNTIME=coreclr
PYTHONNET_CORECLR_RUNTIME_CONFIG=C:\Program Files\McLaren Applied Technologies\ATLAS 10\MAT.Atlas.Host.runtimeconfig.json
```

More information about calling .NET from Python can be found in the 
[pythonnet documentation](https://pythonnet.github.io/pythonnet/python.html#loading-a-runtime).