# ActiveX Automation

System Monitor includes an ActiveX/OLE Automation interface, which exposes programmable System Monitor objects to other applications. This allows external applications to control or request information from a running copy of System Monitor.

External applications may be written in any language that supports ActiveX Automation interfaces (see ActiveX Client Languages).

ActiveX applications, or Scripts, may be run from a menu command in System Monitor by Custom Menus.

We take all possible steps to ensure that any Automation Client code will be compatible with future versions of System Monitor. However, the Automation Interface may change in future releases, both in terms of the functions provided, and the arguments supplied to these functions. We cannot respond to these changes until they occur.

!!! note
    ActiveX scripts compiled in VS2003 and earlier will need to be re-compiled in VS2008 before they can be used with System Monitor 8.0 and later. Please note that this is a Microsoft requirement/compatibility issue and not one that has been introduced by MESL.

## Accessing ActiveX Functions

In order to gain access to System Monitor, a function must be called to create an instance of the System Monitor Automation Server. The exact syntax of this function varies depending on the client programming language, but it is typically called `CreateObject`. The argument supplied to this function should be `'System Monitor API’`. Please refer to the documentation for your language for further details.

The call to `CreateObject` will fail unless System Monitor is already running. System Monitor cannot be started by an ActiveX function call.

The instance of the System Monitor Automation Server created by `CreateObject` must be released once the client script has finished executing. Failing to release the Automation Server will prevent other clients from accessing the server. The syntax of the call to release the server is language specific but is typically achieved by setting the returned instance to `Nothing`.

!!! note
    Only one Automation Client can have access to System Monitor at any one time. Once a client has called `CreateObject`, any other calls to `CreateObject` will be rejected until the instance has been released.

All functions require a project to be loaded in System Monitor.

System Monitor Version 7 Automation supports Methods. Microsoft’s Object Description Language (ODL) is used to describe function arguments.

Some functions take an argument (`wAppID`) which indicates the application in a multiple-ASAP environment (System, Chassis or Engine). The embedded code Release Notes should be referred to for this information.

All functions return a signed integer `ErrorCode`, where `0` indicates success, and negative values indicate error codes.

The contents of messages and responses are described in the System Monitor Message Descriptions document.

## Supported Languages for Client Scripts

Any language that supports ActiveX automation may be used to write client scripts for System Monitor.

=== "SM Script"

    System Monitor includes its own proprietary scripting language and script development environment based on Sax Basic. The SM Script Interactive Development Environment (IDE) is distributed with System Monitor. It is installed, in the same location as System Monitor, as part of a Custom Installation. This version of SM Script is only licensed for use with System Monitor and must not be redistributed.

    To open the SM Script Editor from the Start menus select: **All Programs > System Monitor V7 > SM Script Editor**.

    SM Script is similar to Microsoft Visual Basic for Applications, and therefore does not support pointer types. An ActiveX function that receives a pointer argument may be supplied with a non-pointer variable of the correct type.

    !!! note 
        There are some differences between SM Script and Microsoft Visual Basic for Applications - refer to the SM Script help for further details.

    This help includes several example programs written in SM Script functions.

    The System Monitor type library can be accessed from SM Script. This allows the ActiveX automation methods available in System Monitor to be viewed and selected.

    **Configure SM Script to recognize the System Monitor Type Library:**

    1. Select: **Edit > References**
        - The Reference dialog box opens.
    2. Select: **System Monitor Type Library** and click **OK**.

    **View or select System Monitor methods and data types:**

    1. Select: **Debug > Browse**.
    2. In the ActiveX Automation Members dialog box select **SystemMonitor** from the Library drop-down list.

=== "Visual C++"

    System Monitor includes a type library, which is installed in the same directory as System Monitor. This type library may be imported into Visual C++ projects to automatically generate a C++ wrapper class for the System Monitor ActiveX interface.

    For example:

    ```cpp
    #import "C:\\Program Files\\Mclaren Electronic Systems\\System Monitor V7\\SystemMonitor.tlb" rename("SendMessage", "SmSendMessage") named_guids
    ```

    !!! note The 'rename' statement prevents any conflict with the SendMessage API included in `<windows.h>`.

    This generates a class which can then be declared and used as follows:

    ```cpp
    HRESULT hr = S_OK;

    // ITSysMonApiPtr is the same as a _com_ptr_t<ITSysMonApi>
    SystemMonitor::ITSysMonApiDualPtr pSmApi;

    // Create instance if system monitor is running
    if (SUCCEEDED(hr) && IsSysMonRunning()) {
        hr = pSmApi.CreateInstance(SystemMonitor::CLSID_TSysMonApi);
    }
    ```

=== "Visual Basic"

    Visual Basic does not support pointer types. An ActiveX function that receives a pointer argument may be supplied with a non-pointer variable of the correct type.

    The System Monitor type library can be accessed from Visual Basic. This allows the ActiveX automation methods available in System Monitor to be viewed and selected.

    **Configure Visual Basic Script to recognize the System Monitor Type Library:**

    1. Select: **Project > References**.
    2. In the References dialog box check **System Monitor Type Library** and click **OK**.

    Visual Basic lists available ActiveX function calls when entering code (the Auto List Methods feature).
