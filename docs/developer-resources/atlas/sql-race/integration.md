# System Requirements

A valid ATLAS and SQLRace license is required to use the SQLRace API. Coding languages such as C#, MATLAB, Python, and C++ are commonly used. Other languages that are compatible with WCF APIs can be used as well.

## Prerequisites

* Visual Studio 2019 or later
* .NET 6 or later

## Importing the APIs
### C# NuGet Packages
The SQLRace API is available as a NuGet package to registered users found here: [Motion Applied NuGet Repository](https://github.com/mat-docs/packages).

### Python and MATLAB
For Python and MATLAB, the API DLLs can be directly imported and declared in the code. ATLAS installation is required.

=== "Python"

    ``` python
        import os
        from pythonnet import load
        load("coreclr", runtime_config=r"C:\Program Files\McLaren Applied Technologies\ATLAS 10\MAT.Atlas.Host.runtimeconfig.json")
        import clr

        # The path to the main SQL Race DLL. This is the default location when installed with Atlas 10
        sql_race_dll_path = r"C:\Program Files\McLaren Applied Technologies\ATLAS 10\MESL.SqlRace.Domain.dll"

        # Configure Pythonnet and reference the required assemblies for dotnet and SQL Race
        clr.AddReference("System.Collections")
        clr.AddReference("System.Core")
        clr.AddReference("System.IO")

        if not os.path.isfile(sql_race_dll_path):
            raise Exception("Couldn't find SQL Race DLL at " + sql_race_dll_path + " please check that Atlas 10 is installed")

        clr.AddReference(sql_race_dll_path)

        from System.Collections.Generic import *
        from System.Collections.ObjectModel import *
        from System import *

        from MAT.OCS.Core import *
        from MESL.SqlRace.Domain import *
        from MESL.SqlRace.Enumerators import *
        from MESL.SqlRace.Domain.Infrastructure.DataPipeline import *
    ```

=== "MATLAB"

    ``` matlab
        NET.addAssembly('C:\Program Files\McLaren Applied Technologies\ATLAS 10\MAT.OCS.Core.dll');
        NET.addAssembly('C:\Program Files\McLaren Applied Technologies\ATLAS 10\MESL.SqlRace.Domain.dll');
        NET.addAssembly('C:\Program Files\McLaren Applied Technologies\ATLAS 10\MESL.SqlRace.Matlab.dll');
        NET.addAssembly('System.Core');

        import System.Collections.Generic.*
        import System.Collections.ObjectModel.*
        import System.*
        
        import MAT.OCS.Core.*
        import MESL.SqlRace.Matlab.*
        import MESL.SqlRace.Domain.*
        import MESL.SqlRace.Enumerators.*
        import MESL.SqlRace.Domain.Infrastructure.DataPipeline.*
    ```

## Code Samples Index

[MAT.SQLRace.HelloData](https://github.com/mat-docs/MAT.OCS.SQLRace.Examples/tree/master/MAT.SQLRace.HelloData)
:   * Searching and loading sessions
    * Loading a live session recording into a shared database
    * Loading multiple sessions together as a composite
    * Loading SSN files and associate sessions
    * Reading and writing events
    * Reading and writing data
    * Calculating lap statistics
    * Adding and reading [Markers](../../../key-functionality/visualise/atlas/handling-data/laps-markers/markers.md)

[MAT.SqlRace.StandaloneRecorder](https://github.com/mat-docs/MAT.OCS.SQLRace.Examples/tree/master/MAT.SqlRace.StandaloneRecorder)
:   * Embedding the ATLAS Data Server Telemetry (DST) recorder
    * Monitoring live data from the recorder
    * Writing augmented data back into the live session

[MAT.SqlRace.Functions.HelloDotNet](https://github.com/mat-docs/MAT.OCS.SQLRace.Examples/tree/master/MAT.SqlRace.Functions.HelloDotNet)
:   * Writing a [Function DLL](../../../key-functionality/visualise/atlas/functions/using-dlls.md), for use in the API and in ATLAS

[MAT.SQLRace.FileLoaderSample](https://github.com/mat-docs/MAT.OCS.SQLRace.Examples/tree/master/MAT.SQLRace.FileLoaderSample)
:   * Writing a Session Loader DLL to read a third-party file format (CSV example)

[Python](https://github.com/mat-docs/MAT.OCS.SQLRace.Examples/tree/master/Python)
:   * Loading a session
    * Reading events
    * Reading data