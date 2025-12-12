# Automating ATLAS 10 Interaction Using the Automation API

The Automation API is a WCF-based interface that enables seamless interaction with ATLAS and its data ecosystem. It supports reading and writing data, updating session metadata, and automating the creation of Workbooks, Pages, Displays, and Layouts.

It also allows automated loading and unloading of data into ATLAS.

ATLAS (Advanced Telemetry Linked Acquisition System) is a sophisticated software package developed by Motion Applied to capture, distribute, display, and analyze data from control systems—especially in motorsport and automotive applications.

## Capabilities

=== "Read"

    - Session metadata  
    - Parameter metadata  
    - Lap information  
    - Timeseries data  
    - Events and markers

=== "Write"

    - Session metadata  
    - Transient data  
    - Lap information  
    - Timeseries data  
    - Events and markers

=== "Automate"

    - Session loading  
    - Workbook generation  
    - Display properties  
    - Parameter properties  
    - Sets management

!!! note

    While the SQL Race API offers more direct and performant access to telemetry data, the Automation API is ideal for automating ATLAS workflows.


[Code Samples](https://github.com/mat-docs/Atlas.AutomationAPI.Examples){ .md-button } [API Reference](https://mat-docs.github.io/Atlas.DisplayAPI.Documentation/api/index.html){ .md-button }

## Classes and Methods

The ATLAS Automation API is composed of several service clients, each responsible for a specific area of functionality such as session management, workbook automation, telemetry recording, and data access. These classes expose methods that allow developers to programmatically control and interact with the ATLAS environment, enabling powerful automation and integration scenarios.

!!! tip inline end "Classes and Methods"

    This is a subsample of all the classes and methods available in the Automation API.
    
    [API Reference](https://mat-docs.github.io/Atlas.DisplayAPI.Documentation/api/index.html){ .md-button }


??? info "ATLAS Automation API – Classes and Methods"

    ### ApplicationServiceClient
    - Connect()
    - Disconnect()

    ### WorkbookServiceClient
    - LoadFromWorkbook()
    - GetRecorders()
    - CreateSet()
    - GetSets()
    - AssociateSetToWorkbook()

    ### RecorderServiceClient
    - GetRecorder()
    - StartRecorder()
    - StopRecorder()

    ### SetServiceClient
    - RemoveSet()
    - RenameSet()
    - GetList()
    - Disconnect()

    ### PageServiceClient
    - ActivatePage()
    - DuplicatePage()
    - NewPage()
    - RenamePage()

    ### DisplayServiceClient
    - GetDisplay()
    - AssociateControlToDisplay()
    - GetDisplaysProperties()

    ### SessionServiceClient
    - AppendSessions()
    - RemoveSessions()
    - TransferData()

    ### ParameterDataAccessServiceClient
    - GetNextSamples()
    - GetSamples()

    ### TimeBaseServiceClient
    - Connect()
    - Disconnect()
