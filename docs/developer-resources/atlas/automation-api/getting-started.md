# ATLAS Automation API

One of the fundamental operations in the ATLAS Automation API is retrieving an already loaded session from ATLAS. 

### The example below demonstrates how to:
- Obtain a list of Sets
- Select a specific Set
- Extract all sessions loaded into that Set

This will return a list of sessions. In the example, basic information such as `Session.Name` and `Session.Id` is extracted from each session.


## Examples

### Getting Sessions From ATLAS
=== "C#"

    ``` csharp
        // Retrieve the list of sets from the workbook service
        var setsList = workbookServiceClient.GetSets();

        // Get the ID of the first set
        var firstSetId = setsList[0].Id;

        // Retrieve the list of composite sessions for the first set
        var sessionsList = setServiceClient.GetCompositeSessions(firstSetId);

        // Print the name and ID of each session
        foreach (var session in sessionsList)
        {
            Console.WriteLine($"Session name: {session.Name}, Session ID: {session.Id}");
        }

    ```

=== "Python"

    ``` python
        # Retrieve the list of sets from the workbook service
        sets_list = workbookServiceClient.GetSets()

        # Get the ID of the first set
        first_set_id = sets_list[0].Id

        # Retrieve the list of composite sessions for the first set
        sessions_list = setServiceClient.GetCompositeSessions(first_set_id)

        # Print the name and ID of each session
        for session in sessions_list:
            print("Session name:", session.Name, "Session ID:", session.Id)

    ```

=== "MATLAB"

    ``` matlab
        % Retrieve the list of sets from the workbook service
        setsList = workbookServiceClient.GetSets();

        % Get the ID of the first set
        firstSetId = setsList(1).Id;

        % Retrieve the list of composite sessions for the first set
        sessionsList = setServiceClient.GetCompositeSessions(firstSetId);

        % Print the name and ID of each session
        for i = 1:length(sessionsList)
            fprintf('Session name: %s, Session ID: %s\n', sessionsList(i).Name, sessionsList(i).Id);
        end

    ```