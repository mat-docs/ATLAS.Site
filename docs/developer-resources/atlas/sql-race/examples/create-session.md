
# Creating an SSN2 Session from Scratch

This guide walks you through the process of creating a new **session file (`.ssn2`)** using the **SQLRace API**. You'll learn how to initialize the environment, create a session, add metadata, generate parameter data, and define laps.


---

???+ tip
    Make sure you have:

    - Installed **.NET 6** and are targeting **x64 architecture**.
    - Added the following NuGet packages:
        - `MESL.SQLRace.API`
    - Configured your NuGet source to include the **McLaren Applied GitHub packages**:
        [https://github.com/mat-docs/packages](https://github.com/mat-docs/packages)

---


## Summary of Steps

1. **Initialize SQLRace**
2. **Create a New Session**
3. **Create Session Configuration**
4. **Add Session Metadata**
5. **Configure Conversions**
6. **Add Channels and Parameters**
7. **Define Event Metadata**
8. **Write Parameter and Event Data**
9. **Add Laps**
10. **Add Constants**
11. **Add CAN Data**
12. **Finalize Session**

---

## Step 1: Initialize SQLRace

This initializes the SQLRace core system required for session handling and directs the initialiser towards the SQLRace License to validate there is a valid license in place. This is a required step and none of your SQLRace API scripts will work without an active SQLRace License. You can check that you have the correct license by opening License Manager from your start menu. 

=== "C#"

    ```csharp
    Core.LicenceProgramName = "SQLRace";
    Core.Initialize();
    ```

=== "Python"

    ```python
    Core.LicenceProgramName = "SQLRace"
    Core.Initialize()
    ```


=== "MATLAB"

    ```matlab
    NET.setStaticProperty('MESL.SqlRace.Domain.Core.LicenceProgramName', 'SQLRace');
    Core.Initialize();
    ```


---

## Step 2: Create a New Session

Creates a unique session at the specified location.

=== "C#"

    ```csharp
    var sessionKey = SessionKey.NewKey();
    var clientSession = SessionManager.CreateSessionManager()
        .CreateSession(connectionString, sessionKey, sessionDescription, DateTime.Now, "TAG-310");
    ```

=== "Python"

    ```python
    session_key = SessionKey.NewKey()
    client_session = SessionManager.CreateSessionManager().CreateSession(connection_string, session_key, session_desc, DateTime.Now, "TAG-310")
    ```


=== "MATLAB"

    ```matlab
    sessionKey = SessionKey.NewKey();
    clientSession = SessionManager.CreateSessionManager().CreateSession(connectionString, sessionKey, sessionDescription, DateTime.Now, "TAG-310");
    ```

[SessionManager.CreateSession()](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_CreateSession_System_String_MAT_OCS_Core_SessionKey_System_String_System_DateTime_System_String_)

!!! info
    Use the following connection strings to create your session, whether it's SSN2, SSNDB, or SQLRace:

        connectionStringSSN2 = r"DbEngine=SQLite;Data Source=C:\Path\To\session.ssn2;"
        connectionStringSSNDB = r"DbEngine=SQLite;Data Source=C:\Path\To\local_db.ssndb;PRAGMA journal_mode=WAL;"
        connectionStringSQLRACE = r"Data Source=MCLA-42765X3\LOCAL;Initial Catalog=SQLRACE01;Integrated Security=True;"



---


## Step 3: Create Session Configuration

Create a configuration set for the session. Configuration will be saved when Commit() is called on this configuration set.

> 💡 **Tip**  
> Configuration can be created independently and shared across multiple sessions (non-session specific) using the `ConfigurationSetManager`.  
> This improves session creation and load time.

> ⚠️ **Deprecated**  
> Configuration can also be added directly to a session using `CreateConfiguration()`.  
> This method is **deprecated** and should **not** be used.

---

???+  "Configuration Set Components"

    A **Configuration Set** is composed of the following entities:

        - Parameters
        - Channels
        - Conversions
            - Rational conversions
            - Table conversions
            - Text conversions
        -  Application Groups
        -  Parameter Groups
        -  Error Definitions
        -  Event Definitions


The following is an example of using the ConfigurationSetManager to add a shared configuration set:

=== "C#"

    ```csharp
    // Define names and IDs
    string parameterName = "myParam";
    string applicationGroupName = "myApp";
    string parameterIdentifier = $"{parameterName}:{applicationGroupName}";
    string conversionFunctionName = $"CONV_{parameterName}:{applicationGroupName}";
    string parameterGroupIdentifier = "myParamGroup";
    string parameterSubGroupIdentifier = "myParamSubGroup";
    uint parameterNameChannelId = 999998;
    int applicationGroupId = 998;

    // Create configuration set
    ConfigurationSetManager configurationSetManager = ConfigurationSetManager.CreateConfigurationSetManager();
    var configurationSet = configurationSetManager.Create(connectionString, "Configuration Set Name", "Configuration Set Description");

    // Create parameter group and add sub group
    var parameterGroup = new ParameterGroup(parameterGroupIdentifier, "Parameter group description");
    parameterGroup.AddSubGroup(new ParameterGroup(parameterSubGroupIdentifier, "Sub group description"));

    // Create application group
    var applicationGroup = new ApplicationGroup(applicationGroupName, "Application group description", applicationGroupId, new List<string> { parameterGroup.Identifier });

    // Add application group and parameter group to configuration set
    configurationSet.AddGroup(applicationGroup);
    configurationSet.AddParameterGroup(parameterGroup);

    // Add a conversion function to the configuration set
    configurationSet.AddConversion(RationalConversion.CreateSimple1To1Conversion(conversionFunctionName, "Units", "5.2f"));

    // Create a frequency for the parameter's channel
    var myParamFrequency = new Frequency(1000, FrequencyUnit.Hz);

    // Create a channel for the parameter
    var myParamChannel = new Channel(parameterNameChannelId, "Parameter channel description", myParamFrequency.ToInterval(), DataType.Double64Bit, ChannelDataSourceType.Periodic);

    // Create the parameter
    var myParam = new Parameter(parameterIdentifier, parameterName, $"{parameterName} Description", 1, -1, 0, 0, 0, 255, 0, conversionFunctionName, new List<string> { parameterSubGroupIdentifier }, myParamChannel.Id, applicationGroupName);

    // Add the channel and parameter to the configuration set
    configurationSet.AddChannel(myParamChannel);
    configurationSet.AddParameter(myParam);

    // Commit the configuration set to the database and handle exception
    try
    {
        configurationSet.Commit();
        Console.WriteLine($"Configuration Set '{configurationSet.Identifier}' committed to database.");
    }
    catch (ConfigurationSetAlreadyExistsException ex)
    {
        Console.WriteLine($"Commit of a Configuration Set '{configurationSet.Identifier}' failed. The config set already exists.");
    }
    ```

=== "Python"

    ```python
    # Define names and IDs
    parameter_name = "myParam"
    application_group_name = "myApp"
    parameter_identifier = f"{parameter_name}:{application_group_name}"
    conversion_function_name = f"CONV_{parameter_name}:{application_group_name}"
    parameter_group_identifier = "myParamGroup"
    parameter_sub_group_identifier = "myParamSubGroup"
    parameter_name_channel_id = 999998  # Unique to each channel
    application_group_id = 998  # Unique to each application group

    # Define .NET Lists
    parameter_group_identifier_list = List[str]()
    parameter_sub_group_identifier_list = List[str]()

    # Add variables to the .NET identifier lists
    parameter_group_identifier_list.Add(parameter_group_identifier)
    parameter_sub_group_identifier_list.Add(parameter_sub_group_identifier)

    # Create configuration set
    configuration_set = configuration_set_manager.Create(connection_string, "Configuration Set Name", "Configuration Set Description")

    # Create parameter group and add sub-group
    parameter_group = ParameterGroup(parameter_group_identifier, "Parameter group description")
    parameter_group.AddSubGroup(ParameterGroup(parameter_sub_group_identifier, "Sub group description"))

    # Create the application group
    appGroup = ApplicationGroup(application_group_name, "Application group description", application_group_id, parameter_group_identifier_list)
    
    # Add the application group and parameter group to the configuration set
    configuration_set.AddGroup(appGroup)
    configuration_set.AddParameterGroup(parameter_group)

    # Add the conversion function to the configuration set
    configuration_set.AddConversion(RationalConversion.CreateSimple1To1Conversion(conversion_function_name, "Unit", "5.2f"))

    # Create a frequency for the parameter's channel
    myParam_frequency = Frequency(1000, FrequencyUnit.Hz)

    # Create a channel for the parameter
    myParam_channel = Channel(parameter_name_channel_id, "Parameter channel description", FrequencyExtensions.ToInterval(myParam_frequency), DataType.Double64Bit, ChannelDataSourceType.Periodic)

    # Create the parameter
    myParam = Parameter(parameter_identifier, parameter_name, f"{parameter_name} Description", 1, -1, 0, 0, 0, 255, 0, conversion_function_name, parameter_sub_group_identifier_list, myParam_channel.Id, application_group_name)

    # Add the channel and parameter to the configuration set
    configuration_set.AddChannel(myParam_channel)
    configuration_set.AddParameter(myParam)

    # Commit the configuration set to the database and handle exception
    try:
        configuration_set.Commit()
        print(f"Configuration Set '{configuration_set.Identifier}' committed to database.")
    except ConfigurationSetAlreadyExistsException as ex:
        print(f"Commit of a Configuration Set '{configuration_set.Identifier}' failed. The config set already exists.")

    ```


=== "MATLAB"

    ```matlab
    %% Create configuration set
    % Define Names and IDs
    parameterName = "myParam";
    applicationGroupName = "myApp";
    parameterIdentifier = sprintf("%s:%s", parameterName, applicationGroupName);
    conversionFunctionName = sprintf("CONV_%s:%s", parameterName, applicationGroupName);
    parameterGroupIdentifier = "myParamGroup";
    parameterSubGroupIdentifier = "MyParamSubGroup";
    parameterNameChannelId = 999998;
    applicationGroupId = 998;

    % Define .NET lists
    parameterGroupIdentifierList = NET.createGeneric('System.Collections.Generic.List', {'System.String'});
    parameterSubGroupIdentifierList = NET.createGeneric('System.Collections.Generic.List', {'System.String'});

    % Add variable to the .NET identifier lists
    parameterGroupIdentifierList.Add(parameterGroupIdentifier);
    parameterSubGroupIdentifierList.Add(parameterSubGroupIdentifier);

    % Create a configuration set
    configurationSetManager = ConfigurationSetManager.CreateConfigurationSetManager();
    configurationSet = configurationSetManager.Create(connectionString, "Configuration Set Name", "Configuration Set Description");

    % Create a parameter group and sub group
    parameterGroup = ParameterGroup(parameterGroupIdentifier, "Parameter group description");
    parameterGroup.AddSubGroup(ParameterGroup(parameterSubGroupIdentifier, "Sub group description"));

    % Create application group
    applicationGroup = ApplicationGroup(applicationGroupName, "Application Group Name", applicationGroupId, parameterGroupIdentifierList);

    % Add application group and parameter group to configuration set
    configurationSet.AddGroup(applicationGroup);
    configurationSet.AddParameterGroup(parameterGroup);

    % Add a conversion function to the configuration set
    configurationSet.AddConversion(RationalConversion.CreateSimple1To1Conversion(conversionFunctionName, "Units", "5.2f"));

    % Create a frequency for the parameter's channel
    myParamFrequency = Frequency(1000, FrequencyUnit.Hz);

    % Create a channel for the parameter
    myParamChannel = Channel(parameterNameChannelId, "Parameter channel description", FrequencyExtensions.ToInterval(myParamFrequency), DataType.Double64Bit, ChannelDataSourceType.Periodic);

    % Create the parameter
    myParam = Parameter(parameterIdentifier, parameterName, sprintf("%s Description", parameterName), 1, -1, 0, 0, 0, 255, 0, conversionFunctionName, parameterSubGroupIdentifierList, myParamChannel.Id, applicationGroupName);

    % Add the channel and parameter to the configuration set
    configurationSet.AddChannel(myParamChannel);
    configurationSet.AddParameter(myParam);

    % Commit the configuration set to the database and handle exception
    try
        configurationSet.Commit();
        fprintf("Configuration Set '%s' committed to database.\n", configurationSet.Identifier);
    catch errorMessage
        fprintf("Encountered an error: %s\n", errorMessage.message);
    end
    ```

[ConfigurationSetManager.Create()](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSetManager.html#MESL_SqlRace_Domain_ConfigurationSetManager_Create_MAT_OCS_Core_SessionKey_System_String_System_String_System_String_System_Boolean_System_Boolean_)

### UseConfigurationSets Method

=== "C#"

    ```csharp
    var metadata = session.UseConfigurationSets(new List<KeyValuePair<string, uint>> { new("Configuration Set Name", configSetOffset) });
    ```

=== "Python"

    ```python
    kvp = List[KeyValuePair[str, UInt32]]()
    kvp.Add(KeyValuePair[str, UInt32]("Configuration Set Name", config_set_offset))

    metadata = session.UseConfigurationSets(kvp)
    ```

=== "MATLAB"

    ```matlab
    kvpType = NET.GenericClass('System.Collections.Generic.KeyValuePair', 'System.String', 'System.UInt32');
    kvpList = NET.createGeneric('System.Collections.Generic.List', {kvpType});

    kvpList.Add(NET.createGeneric('System.Collections.Generic.KeyValuePair', {'System.String', 'System.UInt32'}, "Configuration Set Name", configSetOffset));

    metadata = session.UseConfigurationSets(kvpList);
    ```

[Session.UseConfigurationSets()](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_UseConfigurationSets_System_Collections_Generic_IEnumerable_System_Collections_Generic_KeyValuePair_System_String_System_UInt32___)

## Step 4: Add Session Metadata


Metadata allows tracking of essential session attributes (e.g., driver, event, date, etc.). Session metadata can be configured adding **SessionDataItem** objects into the **session.Items**. 

> 💡 **Tip**  
>The **SessionDataItem** supports the following data types for values:

>- String – For textual data
>- Double – For floating-point numbers
>- Long – For large integer values
>- Boolean – For true/false flags
>- DateTime – For date and time values
>- Byte[] – For binary data


=== "C#"

    ```csharp
    session.Items.Add(new SessionDataItem("Driver Name", "Driver xxxxx"));
    session.Items.Add(new SessionDataItem("Race", "Silverstone GP"));
    session.Items.Add(new SessionDataItem("Date", DateTime.Now.AddDays(7)));
    session.Items.Add(new SessionDataItem("Fuel level in gallons", 56.45));
    ```

=== "Python"

    ```python
    session.Items.Add(SessionDataItem("Driver Name", "Driver xxxxx"))
    session.Items.Add(SessionDataItem("Race", "Silverstone GP"))
    session.Items.Add(SessionDataItem("Date", DateTime.Now.AddDays(7)))
    session.Items.Add(SessionDataItem("Fuel level in gallons", 56.45))
    ```

=== "MATLAB"

    ```matlab
    session.Items.Add(SessionDataItem("Driver Name", "Driver xxxxx"));
    session.Items.Add(SessionDataItem("Race", "Silverstone GP"));
    session.Items.Add(SessionDataItem("Date", DateTime.Now.AddDays(7)));
    session.Items.Add(SessionDataItem("Fuel level in gallons", 56.45));
    ```

[Class SessionDataItemsCollection<T>](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Collections.SessionDataItemsCollection-1.html)

---

## Step 5: Configure Conversions

Add conversion logic (e.g., rational and table conversions) for later use by parameters.


=== "C#"

    ```csharp
    var conversions = new List<ConversionBase>
    {
        new RationalConversion("Rational_conv", "mph", "%5.2f", 0, 1, 0, 0, 0, 1),
        new TableConversion("Table_conv", "mph", "%5.2f", rawValues, calibratedValues, false)
    };
    config.AddConversions(conversions);
    ```

=== "Python"

    ```python
    numvalues = Array[Double]([0.0, 1.0])
    stringvalues = Array[String](['Yes', 'No'])
    textConvertion = TextConversion.Create(ConversionFunctionName, "kph", "%s", [0.0, 1.0], ['Yes', 'No'], "No")

    config.AddConversion(RationalConversion.CreateSimple1To1Conversion(ConversionFunctionName, "kph", "%5.2f"))
    formula = '(floor($fconv_dummy/60))+((($fconv_dummy/60)-(floor($fconv_dummy/60)))*0.6)'
    expresion = IExpressionAdapter
    config.AddConversion(FormulaConversion.Create('CONV_MYCONVERSION_NAME:TAG320BIOS', 'kph', "%s", '%2.2f', formula, IExpressionAdapter))
    ```


=== "MATLAB"

    ```matlab
    configurationSet.AddConversion(
        RationalConversion.CreateSimple1To1Conversion(
            conversionFunctionName, 
            "Units", 
            "5.2f"));
    ```

[ConfigurationSet.AddConversion()](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddConversion_MESL_SqlRace_Domain_ConversionBase_)

[Class ConversionBase](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConversionBase.html)

---

## Step 6: Add Channels and Parameters

Set up channels and map them to parameters that will receive time-series data.

=== "C#"

    ```csharp
    var channel = new Channel(1, 
                              "lowFrequencyPeriodic1", 
                              100_000_000, 
                              DataType.FloatingPoint32Bit, 
                              ChannelDataSourceType.Periodic);

    var parameter = new Parameter("lowFrequency_10Hz", 
                                  "lowFrequency_10Hz",
                                  "Low frequency parameter", 
                                   200, 
                                   0, 
                                   200, 
                                   0, 
                                   0, 
                                   0xffffffff, 
                                   0, 
                                   "Rational_conv", 
                                   new List<string> { "chassis" }, 
                                   channel.Id);

    config.AddChannels(new List<Channel> { channel });
    config.AddParameters(new List<ParameterBase> { parameter });
    ```

=== "Python"

    ```python
    # Create a channel for the parameter
    myParam_channel = Channel(
        parameter_name_channel_id, 
        "Parameter channel description", 
        FrequencyExtensions.ToInterval(myParam_frequency), 
        DataType.Double64Bit, 
        ChannelDataSourceType.Periodic)

    # Create the parameter
    myParam = Parameter(
        parameter_identifier, 
        parameter_name, 
        f"{parameter_name} Description", 
        1, # Max value
        -1, # Min value
        0, # Max Warning value
        0, # Min Warning value
        0, # Offset value
        255, # Data Bit Mask
        0, # Error Bit Mask
        conversion_function_name, 
        parameter_sub_group_identifier_list, 
        myParam_channel.Id, 
        application_group_name)

    # Add the channel and parameter to the configuration set
    configuration_set.AddChannel(myParam_channel)
    configuration_set.AddParameter(myParam)
    ```


=== "MATLAB"

    ```matlab
    % Create a channel for the parameter
    myParamChannel = Channel(
        parameterNameChannelId, 
        "Parameter channel description", 
        FrequencyExtensions.ToInterval(myParamFrequency), 
        DataType.Double64Bit, 
        ChannelDataSourceType.Periodic);

    % Create the parameter
    myParam = Parameter(
        parameterIdentifier, 
        parameterName, 
        sprintf("%s Description", parameterName), 
        1, 
        -1, 
        0, 
        0, 
        0, 
        255, 
        0, 
        conversionFunctionName, 
        parameterSubGroupIdentifierList, 
        myParamChannel.Id, 
        applicationGroupName);

    % Add the channel and parameter to the configuration set
    configurationSet.AddChannel(myParamChannel);
    configurationSet.AddParameter(myParam);
    ```

[Class Channel](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html)

[Class Parameter](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Parameter.html)

[ConfigurationSet.AddChannel()](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddChannel_MESL_SqlRace_Domain_IChannel_)

[ConfigurationSet.AddParameter()](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddParameter_MESL_SqlRace_Domain_ParameterBase_)

??? note "Available Data Types"

    | **Data Type**                 | **Description**                      |
    |------------------------------|--------------------------------------|
    | `Double64Bit`                | Double 64 bits of data.              |
    | `FloatingPoint32Bit`         | Floating point 32 bits of data.      |
    | `Signed16Bit`                | Signed 16 bits of data.              |
    | `Signed32Bit`                | Signed 32 bits of data.              |
    | `Signed8Bit`                 | Signed 8 bits of data.               |
    | `TripleFloatingPoint32Bit`   | Triple Floating point values.        |
    | `Unsigned16Bit`              | Unsigned 16 bits of data.            |
    | `Unsigned32Bit`              | Unsigned 32 bits of data.            |
    | `Unsigned8Bit`               | Unsigned 8 bits of data.             |

---

## Step 7: Define Event Metadata

Events let you log significant occurrences during a session (e.g., start, end, pit stops).


=== "C#"

    ```csharp
    var eventDefinitions = new List<EventDefinition>
    {
        new EventDefinition(1, "FirstEvent", EventPriorityType.High, new List<string> { "Rational_conv" }, "Group1"),
        new EventDefinition(2, "SecondEvent", EventPriorityType.Low, new List<string> { "Rational_conv" }, "Group1"),
        new EventDefinition(3, "LastEvent", EventPriorityType.Medium, new List<string> { "Rational_conv" }, "Group2")
    };
    config.AddEventDefinitions(eventDefinitions);
    ```

=== "Python"

    ```python
    event_definitions = List[EventDefinition]()
    event_definitions.Add(EventDefinition(1, "FirstEvent", EventPriorityType.High, List[String]().Add("Rational_conv"), "Group1"))
    event_definitions.Add(EventDefinition(2, "SecondEvent", EventPriorityType.Medium, List[String]().Add("Rational_conv"), "Group1"))
    event_definitions.Add(EventDefinition(3, "ThirdEvent", EventPriorityType.Low, List[String]().Add("Rational_conv"), "Group2"))
    configuration_set.AddEventDefinitions(event_definitions)
    ```


=== "MATLAB"

    ```matlab
    % Get EventDefinition type
    eventDefinitionType = System.Type.GetType('MESL.SqlRace.Domain.EventDefinition, MESL.SqlRace.Domain');

    % Add EventDefinition as argument for List<EventDefinition>
    listOfEventDefinitionTypeArgs = NET.createArray('System.Type', 1);
    listOfEventDefinitionTypeArgs.Set(0, eventDefinitionType);
    listOfEventDefinitionType = listTypeDef.MakeGenericType(listOfEventDefinitionTypeArgs);

    % Create List<EventDefinition> and List<String>
    eventDefinitions = System.Activator.CreateInstance(listOfEventDefinitionType);
    convFuncNames = System.Activator.CreateInstance(listOfStringType);

    % Add conversion function name to List<String>
    convFuncNames.Add("Rational_conv");

    % Add event definitions to List<EventDefinition>
    eventDefinitions.Add(EventDefinition(1, "FirstEvent", EventPriorityType.High, convFuncNames, "Group1"));
    eventDefinitions.Add(EventDefinition(2, "SecondEvent", EventPriorityType.Medium, convFuncNames, "Group1"));
    eventDefinitions.Add(EventDefinition(3, "ThirdEvent", EventPriorityType.Low, convFuncNames, "Group2"));

    % Add event definitions to configuration set
    configurationSet.AddEventDefinitions(eventDefinitions);

    ```

[Class EventDefinition](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.EventDefinition.html)

[ConfigurationSet.AddEventDefinition()](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddEventDefinition_MESL_SqlRace_Domain_EventDefinition_)

---

## Step 8: Write Parameter and Event Data


Adds time-stamped numeric data to your session’s channels and logs events using IDs and timestamps.


=== "C#"

    ```csharp
    session.AddChannelData(channel.Id, timestamp, sampleCount, doubleDataBytes);
    session.Events.AddEventData(1, "Group1", timestamp, new List<double> { 300, 200, 100 }, true, "Status Text");
    ```

=== "Python"

    ```python
    session.AddChannelData(
        channel.Id,
        timestamp,
        sample_count,
        struct.pack('<d', value) # convert 'value' to bytes <d == little endian double
    )

    event_data = List[System.Double]()
    event_data.Add(300)
    event_data.Add(200)
    event_data.Add(100)
    session.Events.AddEventData(1, "Group1", timestamp, event_data, True, "Status Text")
    ```


=== "MATLAB"

    ```matlab
    session.AddChannelData(channelId, timeStamp, sampleCount, BitConverter.GetBytes(value));

    eventData = NET.createGeneric('System.Collections.Generic.List', {'System.Double'});
    eventData.Add(300);
    eventData.Add(200);
    eventData.Add(100);
    session.Events.AddEventData(1, "Group1", timestamp, eventData, true, "Status Text");
    ```

[Session.AddChannelData()](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_AddChannelData_System_UInt32_System_Int64_System_Int32_System_Byte___)

[Session.Events.AddEventData()](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Collections.EventCollection.html#MESL_SqlRace_Domain_Collections_EventCollection_AddEventData_System_Int32_System_String_System_Int64_System_Collections_Generic_IList_System_Double__)

---

## Step 9: Add Laps

Lap data enrich your session context with performance and environmental data.

=== "C#"

    ```csharp
    session.LapCollection.Add(new Lap(lapTimestamp, 1, 0, "Lap1", true));
    ```

=== "Python"

    ```python
    session.LapCollection.Add(Lap(lap_timestamp, 1, 0, "Lap1", true))
    ```


=== "MATLAB"

    ```matlab
    session.LapCollection.Add(Lap(lapTimestamp, 1, 0, "Lap1", true));
    ```

[Interface ILapCollection](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Collections.ILapCollection.html)

[Class Lap](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Lap.html#MESL_SqlRace_Domain_Lap__ctor_System_Int64_System_Int16_System_Byte_System_String_System_Boolean_)

---


## Step 10: Add Constants

Constants enrich your session context with performance and environmental data.


=== "C#"

    ```csharp
    session.Constants.Add(new Constant("Race Start car weight", 653.92, "Car weight", "kg", "%5.2f"));
    ```

=== "Python"

    ```python
    session.Constants.Add(Constant("Race Start car weight", 653.92, "Car weight", "kg", "5.2f"))
    ```


=== "MATLAB"

    ```matlab
    session.Constants.Add(Constant("Race Start car weight", 653.92, "Car weight", "kg", "5.2f"));
    ```

[Session.Constants - SessionDataItemsCollection<Constant>](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_Constants)

[Class Constant](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Constant.html)

--- 

## Step 11: Add CAN Data

CAN Data can be added thogh the CAN Collection object. CAN Collection only accepts RAW CAN messages.

=== "C#"

    ```csharp
    long timeStamp = 1627845123456;
    byte isReceived = 1;
    ushort busId = 99;
    uint canId = 123456;
    byte[] message = new byte[] { 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08 };
    session.CanData.AddCanData(timeStamp, isReceived, busId, canId, message);
    ```

=== "Python"

    ```python
    timeStamp = Int64(1627845123456)
    isReceived = Byte(1)  # 1 for received, 0 for transmitted
    busId = UInt16(99)
    canId = UInt32(123456)
    message = Array.CreateInstance(Byte, 8)
    message[0] = Byte(0x01)
    message[1] = Byte(0x02)
    message[2] = Byte(0x03)
    message[3] = Byte(0x04)
    message[4] = Byte(0x05)
    message[5] = Byte(0x06)
    message[6] = Byte(0x07)
    message[7] = Byte(0x08)
    session.CanData.AddCanData(timeStamp, isReceived, busId, canId, message)
    ```


=== "MATLAB"

    ```matlab
    timeStamp = int64(1627845123456);
    isReceived = uint8(1);
    busId = uint16(99);
    canId = uint32(123456);
    message = NET.createArray('System.Byte', 8);
    message(1) = uint8(1);
    message(2) = uint8(2);
    message(3) = uint8(3);
    message(4) = uint8(4);
    message(5) = uint8(5);
    message(6) = uint8(6);
    message(7) = uint8(7);
    message(8) = uint8(8);
    session.CanData.AddCanData(timeStamp, isReceived, busId, canId, message);
    ```

[Session.CanData](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_CanData)

[Session.CanData.AddCanData()](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Collections.CanCollection.html#MESL_SqlRace_Domain_Collections_CanCollection_AddCanData_System_Int64_System_Byte_System_UInt16_System_UInt32_System_Byte___)

--- 


!!! warning
    Only SSN2 and SQLRace Sessions support CAN data, SSN sessions do not contain any CAN data.
    

!!! tip
    Sessions generated from a TAG-320 or TAG-700 will only contain CAN data from the PCU-8D or PCU-700.



## Step 12: Finalize Session


Close the session to ensure all data is written and saved to the `.ssn2` file.


=== "C#"

    ```csharp
    session.EndData();
    clientSession.Close();
    ```

=== "Python"

    ```python
    session.EndData()
    client_session.Close()
    ```


=== "MATLAB"

    ```matlab
    session.EndData();
    clientSession.Close();
    ```

[Session.EndData()](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_EndData)

[ClientSession.Close()](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ClientSession.html#MESL_SqlRace_Domain_ClientSession_Close)

!!! warning
    EndData() is needed for the session's state to be properly updated to 'Historical', otherwise it would be stuck as 'LiveNotInServer' or 'Live'.

    Close() or Dispose() is used to free system resources and reduce memory leaks.

---

## ✅ Summary

By following these steps, you can build a comprehensive `.ssn2` session file with:

- Structured metadata
- Parameter/channel setup
- Event definitions and logging
- Sampled and synchronized data
- Lap and constant annotation

Explore further via [SQLRace API documentation](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/index.html).

Additional examples in the GitHub repository [HelloCreateSSN2FromZeroWithParameters](https://github.com/mat-docs/MAT.OCS.SQLRace.Examples/tree/master/MAT.SQLRace.HelloCreateSSN2FromZeroWithParameters) & [SessionCreationExample](https://github.com/mat-docs/MAT.OCS.SQLRace.Examples/blob/master/MESL.SqlRace.Examples.Sessions.CSharp/SessionCreationExample.css).
