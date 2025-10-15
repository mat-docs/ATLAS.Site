# Getting Started with the SQLRace API

## Prerequisites

* Visual Studio 2019 or later (for C#)
* MATLAB 2020b or later (for MATLAB)
* Python 3.7 or later (for Python)
* Python IDE such as PyCharm or Visual Studio Code (for Python)
* .NET 6 or later
* ATLAS 10 installed on your machine
* A valid ATLAS and SQLRace license

!!! tip 
    For more information on licenses, please get in touch with your Motion Applied representative or [contact us](mailto:sales@motionapplied.com).
    
## Environment Setup

Select the programming language you want to use for your project. The SQLRace API supports multiple languages, including C#, Python, and MATLAB. Below are the steps to set up your environment for each language.

=== "C#"

    1. Open Visual Studio
    2. Create a new project
    3. Add the NuGet package: `MAT.OCS.SQLRace.Domain`. For more information on how to add NuGet packages, refer to the [NuGet documentation](../nuget/setup.md).
    4. Create a new C# file in the root of your project and copy the sample code
    5. Or clone the sample code into the root
    6. Change the variables at the top of the script to connect to your database

=== "Python"

    1. Open PyCharm
    3. Create a new project 
    4. Add the package dependency: 'pythonnet' 
    5. Create a new Python file main.py in the root of your project and copy the sample code
    6. Or clone the sample code into the root
    7. Change the variables at the top of the script to connect to your database

=== "MATLAB"

    ***TBC***

## Importing the APIs
### C# NuGet Packages
The SQLRace API is available as a NuGet package to registered users found here: [Motion Applied NuGet Repository](https://github.com/mat-docs/packages).

### Python and MATLAB
For Python and MATLAB, the API DLLs can be directly imported and declared in the code.

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

## Example Code

Several example projects are available to help you get started along with walkthrough explanations. These examples cover a range of functionalities provided by the SQLRace API, including reading and writing data, session management, and using functions. For easy access, the examples are hosted on GitHub in the [MAT.OCS.SQLRace.Examples](https://github.com/mat-docs/MAT.OCS.SQLRace.Examples) repository. Each example is structured to demonstrate specific features of the SQLRace API, making it easier for you to understand how to implement them in your own projects. 
