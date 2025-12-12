
Sessions can be programmatically loaded and unloaded into ATLAS, including associate sessions. Additional sessions can be appended. 

!!! warning 
    
    SSN2 and SQLRace Sessions can be loaded to ATLAS using the method `LoadSqlRaceSessions()` from the ApplicationServiceClient Class. 
    The session key is required and the only way to extract this is using the SQLRace API.

        SQLRace API
            ssn2_path = r'C:\\Users\\...\\my_session_file.ssn2'
            connection_string = rf"DbEngine=SQLite;Data Source={ssn2_path};"
            sessions = sessionManager.FindBySessionState(SessionState.Historical, connection_string)
            session = sessions[0]
            key = session.Key.ToString()

    
        Automation API
            applicationServiceClient.LoadSqlRaceSessions(mySetId, [key], [connection_string])


## Usage Example

### Load SSN Session to ATLAS

Basic example that shows how to load a single session into ATLAS.

=== "C#"

    ``` csharp
        // Get the list of sets from the workbook service
        var setsList = workbookServiceClient.GetSets();

        // Select a specific set by index
        var mySet = setsList[set];
        var mySetId = mySet.Id;

        // Load a session file into the selected set
        applicationServiceClient.LoadFileSessions(setsList[set].Id, new[] { filePath });

        // Alternatively, load a session file using a direct path
        string ssnPath = @"C:\\Users\\...\\my_session_file.ssn";
        applicationServiceClient.LoadFileSessions(mySetId, new[] { ssnPath });

    ```

=== "Python"

    ``` python
        # Get the list of sets from the workbook service
        sets_list = workbookServiceClient.GetSets()

        # Select a specific set by index
        my_set = sets_list[set]
        my_set_id = my_set.Id

        # Load a session file into the selected set
        applicationServiceClient.LoadFileSessions(sets_list[set].Id, [file_path])

        # Alternatively, load a session file using a direct path
        ssn_path = r'C:\\Users\\...\\my_session_file.ssn'
        applicationServiceClient.LoadFileSessions(my_set_id, [ssn_path])

    ```

=== "MATLAB"

    ``` matlab
        % Get the list of sets from the workbook service
        setsList = workbookServiceClient.GetSets();

        % Select a specific set by index
        mySet = setsList(set);
        mySetId = mySet.Id;

        % Load a session file into the selected set
        applicationServiceClient.LoadFileSessions(setsList(set).Id, {file_path});

        % Alternatively, load a session file using a direct path
        ssn_path = 'C:\\Users\\...\\my_session_file.ssn';
        applicationServiceClient.LoadFileSessions(mySetId, {ssn_path});


    ```



!!! information "Improve Session Loading with Events"
        When working with session files in ATLAS, it's important to know **when a session is fully loaded**. Instead of relying on manual checks or delays, you can use the **`OnSessionLoaded` event** provided by the `ApplicationServiceClient`.
 
                // Subscribe to the event
                applicationServiceClient.OnSessionLoaded += SessionLoaded;

                // Define the event handler
                private void SessionLoaded(object sender, SessionEventArgs e)
                {
                    Console.WriteLine($"Session loaded: {e.SessionId}");
                    // You can now safely interact with the loaded session
                }




### Load SSN Session To ATLAS With Associates

Basic example that shows how to load a single session into ATLAS and then append additional associate sessions.


=== "C#"

    ``` csharp
        // Get the list of sets from the workbook service
        var setsList = workbookServiceClient.GetSets();

        // Select a specific set by index
        var mySet = setsList[set];
        var mySetId = mySet.Id;

        // Load a session file (.ssn) into the selected set
        applicationServiceClient.LoadFileSessions(setsList[set].Id, new[] { filePath });

        // Define paths to session files
        string ssnPath = @"C:\\Users\\...\\my_session_file.ssn";
        string ssvPath = @"C:\\Users\\...\\my_session_file.VTS.001.ssv";

        // Load the .ssn session file
        applicationServiceClient.LoadFileSessions(mySetId, new[] { ssnPath });

        // Retrieve the list of sessions in the set
        var sessions = setServiceClient.GetCompositeSessions(mySetId);

        // Append an associated .ssv session file to the first session
        sessionServiceClient.AppendSessionsWithAssociates(sessions[0].Id, new[] { ssvPath }, new[] { 1 });


    ```

=== "Python"

    ``` python
        # Get the list of sets from the workbook service
        sets_list = workbookServiceClient.GetSets()

        # Select a specific set by index
        my_set = sets_list[set]
        my_set_id = my_set.Id

        # Load a session file (.ssn) into the selected set
        applicationServiceClient.LoadFileSessions(sets_list[set].Id, [file_path])

        # Define paths to session files
        ssn_path = r'C:\\Users\\...\\my_session_file.ssn'
        ssv_path = r'C:\\Users\\...\\my_session_file.VTS.001.ssv'

        # Load the .ssn session file
        applicationServiceClient.LoadFileSessions(my_set_id, [ssn_path])

        # Retrieve the list of sessions in the set
        sessions = setServiceClient.GetCompositeSessions(my_set_id)

        # Append an associated .ssv session file to the first session
        sessionServiceClient.AppendSessionsWithAssociates(sessions[0].Id, [ssv_path], [1])

    ```

=== "MATLAB"

    ``` matlab
        % Get the list of sets from the workbook service
        setsList = workbookServiceClient.GetSets();

        % Select a specific set by index
        mySet = setsList(set);
        mySetId = mySet.Id;

        % Load a session file (.ssn) into the selected set
        applicationServiceClient.LoadFileSessions(setsList(set).Id, {file_path});

        % Define paths to session files
        ssn_path = 'C:\\Users\\...\\my_session_file.ssn';
        ssv_path = 'C:\\Users\\...\\my_session_file.VTS.001.ssv';

        % Load the .ssn session file
        applicationServiceClient.LoadFileSessions(mySetId, {ssn_path});

        % Retrieve the list of sessions in the set
        sessions = setServiceClient.GetCompositeSessions(mySetId);

        % Append an associated .ssv session file to the first session
        sessionServiceClient.AppendSessionsWithAssociates(sessions(1).Id, {ssv_path}, {1});


    ```


### Unload All Sessions From Set

Basic example that shows how to unload all the sessions from the selected Set.


=== "C#"

    ``` csharp
        // Get the list of sets from the workbook service
        var sets = workbookServiceClient.GetSets();

        // Get the list of sessions in the selected set
        var sessionsList = setServiceClient.GetCompositeSessions(sets[set].Id);

        // Remove each session in the list
        foreach (var session in sessionsList)
        {
            applicationServiceClient.RemoveSession(session.Id);
        }

    ```

=== "Python"

    ``` python
        # Get the list of sets from the workbook service
        sets = workbookServiceClient.GetSets()

        # Get the list of sessions in the selected set
        sessions_list = setServiceClient.GetCompositeSessions(sets[set].Id)

        # Remove each session in the list
        for session in sessions_list:
            applicationServiceClient.RemoveSession(session.Id)

    ```

=== "MATLAB"

    ``` matlab
        % Get the list of sets from the workbook service
        sets = workbookServiceClient.GetSets();

        % Get the list of sessions in the selected set
        sessionsList = setServiceClient.GetCompositeSessions(sets(set).Id);

        % Remove each session in the list
        for i = 1:length(sessionsList)
            applicationServiceClient.RemoveSession(sessionsList(i).Id);
        end


    ```


