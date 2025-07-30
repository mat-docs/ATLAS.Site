
Sessions can be exported to local SSN2 files using the **SQLRace API** and the `SessionManager` object.

For instance, a SQLRace Session stored in a SQLRace Database can generate a local SSN2 or SSNDB session file.

---

### **SessionManager**

The `SessionManager` class provides functionality to export sessions into local **SSN2** or **SSNDB** files using the SQLRace API.

#### **Export Process Overview**

1. The session is first exported into a `MESL.SqlRace.Common.FragmentedMemoryStream` object using the `ExportSession` method.
2. This `FragmentedMemoryStream` contains all the necessary configuration and data required to reconstruct the session.
3. The resulting stream can then be used with the `ImportSession` method to generate and populate the session in its final form.

#### **Key Methods**

- `sessionManager.ExportSession(sessionKey, connectionString)`  
  Exports the session and returns a `FragmentedMemoryStream` containing the session data.

- `sessionManager.ImportSession(fragmentedMemoryStream)`  
  Uses the exported stream to recreate the session with all relevant data and configuration.

---


!!! Failure "Important: Do not use ExportSession alone to create a session file"

    Calling `SessionManager.ExportSession` with a file path will generate an SSN2 session file, 
    but this file will be unreadable by ATLAS and ignored by the SQLRace API.

    ##### To create a valid and usable session file:
    1. Export the session into a `FragmentedMemoryStream` using `ExportSession`.
    2. Then use `ImportSession` to properly populate and finalize the session file.

    
### **SessionManager.ExportSession Method**

#### **Declaration**
=== "C#"
    ```csharp
    public FragmentedMemoryStream ExportSession(SessionKey sessionKey, string connectionString)
    ```

#### **Parameters**

| Type                          | Name              | Description           |
|-------------------------------|-------------------|-----------------------|
| `MAT.OCS.Core.SessionKey`     | `sessionKey`      | The session key.      |
| `System.String`               | `connectionString`| The connection string.|

#### **Returns**

| Type                                         | Description                                |
|----------------------------------------------|--------------------------------------------|
| `MESL.SqlRace.Common.FragmentedMemoryStream` | The `FragmentedMemoryStream` containing the exported session. |

### Example SQLRace Session to SSN2

Basic example that shows how to export to SSN2 from a SQLRace Database session.

Load a session from a SQLRace Database:


=== "C#"

    ``` csharp
    class Program
    {
        static void Main()
        {
            string connectionStringSQLRACE = @"Data Source=SERVER_NAME\LOCAL;Initial Catalog=SQLRACE01;Integrated Security=True";

            SessionManager sessionManager = SessionManager.CreateSessionManager();

            SessionState sessionState = SessionState.Historical;

            var clientSessions = sessionManager.FindBySessionState(sessionState, connectionStringSQLRACE);
            var session = clientSessions[5];

            var clientSession = sessionManager.Load(session.Key, connectionStringSQLRACE);
            var loadedSession = clientSession.Session;

            loadedSession.LoadConfiguration();

            Console.WriteLine($"Session loaded: {loadedSession.Identifier}");

            clientSession.Close();
            clientSession.Dispose();
        }
    }


    ```

=== "Python"

    ``` python
        connectionStringSQLRACE = f"Data Source=SERVER_NAME\LOCAL;Initial Catalog=SQLRACE01;Integrated Security=True"
        sessionManager = SessionManager.CreateSessionManager()
        available_states = {"Created": SessionState.Created,
                            "Exporting": SessionState.Exporting,
                            "Historical": SessionState.Historical,
                            "Live": SessionState.Live,
                            "LiveNotInServer": SessionState.LiveNotInServer,
                            "Indexed": SessionState.Indexed}

        sessionState = available_states["Historical"]
        clientSession_filter_state = sessionManager.FindBySessionState(sessionState, connectionStringSQLRACE)
        session = clientSession_filter_state[5]
        clientSession = sessionManager.Load(session.Key, connectionStringSQLRACE)
        session = clientSession.Session
        session.LoadConfiguration()
        print(f"Session loaded: {session.Identifier}")
        clientSession.Close()
        clientSession.Dispose()

    ```

=== "MATLAB"

    ``` matlab
        connectionStringSQLRACE = 'Data Source=MCLA-525Q374\LOCAL;Initial Catalog=SQLRACE01;Integrated Security=True';

        sessionManager = NET.invokeGenericMethod('MESL.SqlRace.Domain.SessionManager', 'CreateSessionManager', {});

        % Define session state
        sessionState = MESL.SqlRace.Domain.SessionState.Historical;

        % Find sessions by state
        clientSessions = sessionManager.FindBySessionState(sessionState, connectionStringSQLRACE);

        % Select the 6th session (MATLAB is 1-based)
        session = clientSessions.Get(6);

        % Load the session
        clientSession = sessionManager.Load(session.Key, connectionStringSQLRACE);
        loadedSession = clientSession.Session;

        % Load configuration
        loadedSession.LoadConfiguration();

        % Display session identifier
        disp(['Session loaded: ', char(loadedSession.Identifier)]);

        % Close and dispose
        clientSession.Close();
        clientSession.Dispose();

    ```



Use the **SessionManager** to store the session into memory and then import the session into a local file using the ImportSession method.

=== "C#"

    ``` csharp
        // Session key from the original session
        var sessionkey = session.Key;
        // Create the connection string to the SSN2 
        var localSsn2ConncetionString = $"DbEngine=SQLite;Data Source={ssn2FileName}";

        // Export/store session from memory stream
        memoryStream = sessionManager.ExportSession(sessionKey, connectionString);
        //  Import session from memory stream
        sessionManager.ImportSession(localSsn2ConncetionString, memoryStream, sessionKey);

    ```

=== "Python"

    ``` python
        # Session key from the original session
        sessionkey = session.Key

        # Define file path where to export the session
        filePath = r"C:\ssn2\ExportSession.ssn2"
        # Create the connection string to the SSN2
        localSsn2ConncetionString = f"DbEngine=SQLite;Data Source={filePath}"

        # Export/store session from memory stream
        memoryStream = sessionManager.ExportSession(sessionkey, connectionStringSQLRACE)
        # Import session from memory stream
        sessionManager.ImportSession(localSsn2ConncetionString, memoryStream, SessionKey.NewKey())
    ```

=== "MATLAB"

    ``` matlab
        % Session key from the original session
        sessionkey = session.Key;

        % Define file path where to export the session
        filePath = 'C:\ssn2\ExportSession.ssn2';

        % Create local connection string
        localSsn2ConnectionString = sprintf('DbEngine=SQLite;Data Source=%s', filePath);

        % Export/store session to memory stream
        memoryStream = sessionManager.ExportSession(sessionkey, connectionStringSQLRACE);

        % Import session from memory stream
        sessionManager.ImportSession(localSsn2ConnectionString, memoryStream, SessionKey.NewKey());

    ```
## Exporting Sessions Using the Ssn2Splitter DLL

### Examples
=== "C#"

    ``` csharp
    const string pathToFile = @"C:\Path\To\Session\File.ssndb";
    var connectionString = $@"DbEngine=SQLite;Data Source={pathToFile}";
    var exportPath = @"C:\Desired\Export\Folder";

    var sessionManager = SessionManager.CreateSessionManager();
    var sessions = sessionManager.FindBySessionState(SessionState.Historical, connectionString);

    var exporter = new Ssn2SessionExporter();

    foreach (var session in sessions)
    {
        Console.WriteLine($"Processing: {session.Identifier}");
        exporter.Export(session.Key.ToString(), pathToFile, exportPath);
    }
    ```

=== "Python"

    ``` python
    path_to_file = r"C:\Path\To\Session\File.ssndb"
    connection_string = rf"DbEngine=SQLite;Data Source={path_to_file};Version=3;"
    export_path = r"C:\Desired\Export\Folder"
    
    session_manager = SessionManager.CreateSessionManager()
    sessions = session_manager.FindBySessionState(SessionState.Historical, connection_string)

    exporter = Ssn2SessionExporter()

    for session in sessions:
        print(f"Processing: {session.Identifier}")
        exporter.Export(session.Key.ToString(), data_source, export_path)
    ```

=== "MATLAB"

    ``` matlab
    pathToFile = sprintf("C:\\Path\\To\\Session\\File.ssndb");
    connectionString = sprintf("DbEngine=SQLite;Data Source=%s;Version=3;", pathToFile);
    exportPath = sprintf("C:\\Desired\\Export\\Folder");

    sessionManager = SessionManager.CreateSessionManager();
    sessions = sessionManager.FindBySessionState(SessionState.Historical, connectionString);

    exporter = Ssn2SessionExporter();

    for i=0:(sessions.Count - 1)
        fprintf("Processing: %s\n", sessions.Item(i).Identifier);
        exporter.Export(sessions.Item(i).Key.ToString(), dataSource, exportPath);
    end
    ```

