# Session Loading

The SQLRace API can load sessions either locally, from an SSNDB, or from an SQLRace database. (Expand on this)

!!! info "SSN File Loading"
    SSN files are read-only.

## Session States
Session States are used to identify whether a session is currently live and having data recorded to it or historical where data is loaded from the database. 

| Session State | Description |
|-------------|-----------|
| Created | The session has been indexed and exists within the database. However, it is not available yet to be loaded either live or historical. This is a temporary state and should not be used to find and load sessions. |
| Exporting | The (SQLite) session is exporting. |
| Historical | The session is historical. |
| Indexed | The session has been added to the database waiting to be indexed. |
| Live | Indicates a session which is live and available within an SQLRace server. |
| LiveNotInServer | Indicates a session which is live, but not available within an SQLRace server. |

!!! warning "LiveNotInServer"
    Sessions with this session state should not be loaded until its state has changed to historic. This is due to the data in the database not being up-to-date until the recording has ended and all data has been flushed.

## Examples
### Loading a Local SSN File
=== "C#"

    ``` csharp
    const string pathToFile = @"C:\Path\To\Session\File.ssn";
    var fileSessionManager = FileSessionManager.CreateFileSessionManager();
    var clientSession = fileSessionManager.Load(pathToFile);
    ```

=== "Python"

    ``` python
    path_to_file = r"C:\Path\To\Session\File.ssn"
    file_session_manager = FileSessionManager.CreateFileSessionManager()
    client_session = file_session_manager.Load(path_to_file)
    ```

=== "MATLAB"

    ``` matlab
    pathToFile = sprintf("C:\\Path\\To\\Session\\File.ssn);
    fileSessionManager = FileSessionManager.CreateFileSessionManager();
    clientSession = fileSessionManager.Load(pathToFile);
    ```

### Loading a Local SSN2 File
=== "C#"

    ``` csharp
    const string pathToFile = @"C:\Path\To\Session\File.ssn2";
    var connectionString = $@"DbEngine=SQLite;Data Source={pathToFile}";
    var sessionManager = SessionManager.CreateSessionManager();
    var sessionSummaries = sessionManager.FindBySessionState(SessionState.Historical, connectionString);
    var sessionKey = sessionSummaries.get_Item(0).Key.ToString();
    var clientSession = sessionManager.Load(sessionKey, connectionString);
    ```

=== "Python"

    ``` python
    path_to_file = r"C:\Path\To\File.ssn2"
    connection_string = f"DbEngine=SQLite;Data Source={path_to_file}"
    session_manager = SessionManager.CreateSessionManager()
    session_summaries = session_manager.FindBySessionState(SessionState.Historical, connection_string)
    session_key = session_summaries.get_Item(0).Key.ToString()
    client_session = session_manager.Load(session_key, connection_string)
    ```

=== "MATLAB"

    ``` matlab
    pathToFile = sprintf("C:\\Path\\To\\Session\\File.ssn2");
    connectionString = sprintf("DbEngine=SQLite;Data Source=%s", pathToFile);
    sessionManager = SessionManager.CreateSessionManager();
    sessionSummaries = sessionManager.FindBySessionState(SessionState.Historical, connectionString);
    sessionKey = sessionSummaries.Item(0).Key;
    clientSession = sessionManager.Load(sessionKey, connectionString);
    ```

### Loading a Session From an SSNDB
=== "C#"

    ``` csharp
    const string pathToFile = @"C:\Path\To\Session\File.ssndb";
    var connectionString = $@"DbEngine=SQLite;Data Source={pathToFile}";
    var sessionManager = SessionManager.CreateSessionManager();
    var sessionSummaries = sessionManager.FindBySessionState(SessionState.Historical, connectionString);
    var sessionKey = sessionSummaries.get_Item(0).Key.ToString();
    var clientSession = sessionManager.Load(sessionKey, connectionString);
    ```

=== "Python"

    ``` python
    path_to_file = r"C:\Path\To\File.ssndb"
    connection_string = f"DbEngine=SQLite;Data Source={path_to_file}"
    session_manager = SessionManager.CreateSessionManager()
    session_summaries = session_manager.FindBySessionState(SessionState.Historical, connection_string)
    session_key = session_summaries.get_Item(0).Key.ToString()
    client_session = session_manager.Load(session_key, connection_string)
    ```

=== "MATLAB"

    ``` matlab
    pathToFile = sprintf("C:\\Path\\To\\Session\\File.ssndb");
    connectionString = sprintf("DbEngine=SQLite;Data Source=%s", pathToFile);
    sessionManager = SessionManager.CreateSessionManager();
    sessionSummaries = sessionManager.FindBySessionState(SessionState.Historical, connectionString);
    sessionKey = sessionSummaries.Item(0).Key;
    clientSession = sessionManager.Load(sessionKey, connectionString);
    ```

### Loading a Session From an SQLRaceDB
=== "C#"

    ``` csharp
    var serverName = @"SQLServer\InstanceName";
    var databaseName = "DatabaseName";
    var connectionString = $@"server={serverName};Initial Catalog={databaseName};Trusted_Connection=True";
    var sessionManager = SessionManager.CreateSessionManager();
    var sessionSummaries = sessionManager.FindBySessionState(SessionState.Historical, connectionString);
    var sessionKey = sessionSummaries.get_Item(0).Key.ToString();
    var clientSession = sessionManager.Load(sessionKey, connectionString);
    ```

=== "Python"

    ``` python
    server_name = r"SQLServer\InstanceName"
    database_name = "DatabaseName"
    connection_string = f"server={serverName};Initial Catalog={databaseName};Trusted_Connection=True"
    session_manager = SessionManager.CreateSessionManager()
    session_summaries = session_manager.FindBySessionState(SessionState.Historical, connection_string)
    session_key = session_summaries.get_Item(0).Key.ToString()
    client_session = session_manager.Load(session_key, connection_string)
    ```

=== "MATLAB"

    ``` matlab
    serverName = "SQLServer\InstanceName";
    databaseName = "DatabaseName";
    connectionString = sprintf("server=%s;Initial Catalog=%s;Trusted_Connection=True", serverName, databaseName);
    sessionManager = SessionManager.CreateSessionManager();
    sessionSummaries = sessionManager.FindBySessionState(SessionState.Historical, connectionString);
    sessionKey = sessionSummaries.Item(0).Key;
    clientSession = sessionManager.Load(sessionKey, connectionString);
    ```

### Loading a Session via GUID
=== "C#"

    ``` csharp
    const string serverName = @"SQLServer\InstanceName";
    const string dbName = "DatabaseName";
    const string connectionString = $@"server={serverName};Initial Catalog={dbName};Trusted_Connection=True";
    string sessionKeyGUID = "c5668a15-a996-444b-8cd4-0895e0bd11b3";
    var sessionManager = SessionManager.CreateSessionManager();
    clientSession = sessionManager.Load(SessionKey.Parse(sessionKeyGUID), connectionString);
    ```

=== "Python"

    ``` python
    server_name = r"SQLServer\InstanceName"
    db_name = "DatabaseName"
    connection_string = rf"server={serverName};Initial Catalog={dbName};Trusted_Connection=True"
    session_key_guid = "c5668a15-a996-444b-8cd4-0895e0bd11b3"
    session_manager = SessionManager.CreateSessionManager()
    client_session = sessionManager.Load(SessionKey.Parse(session_key_guid), connectionString)
    ```

=== "MATLAB"

    ``` matlab
    serverName = "SQLServer\InstanceName";
    databaseName = "DatabaseName";
    connectionString = sprintf("server=%s;Initial Catalog=%s;Trusted_Connection=True", serverName, databaseName);
    sessionKeyGUID = "c5668a15-a996-444b-8cd4-0895e0bd11b3";
    sessionManager = SessionManager.CreateSessionManager();
    clientSession = sessionManager.Load(SessionKey.Parse(sessionKeyGUID), connectionString);
    ```

### Filter Sessions with QueryManager and Load
=== "C#"

    ``` csharp
    const string serverName = @"SQLServer\InstanceName";
    const string dbName = "DatabaseName";
    const string connectionString = $@"server={serverName};Initial Catalog={dbName};Trusted_Connection=True";

    var filter = new ScalarFilter("Car", MatchingRule.EqualTo, "1", true);

    var compositeFilter = new CompositeFilter(CombineType.AND);
    compositeFilter.Add(new ScalarFilter(SessionFieldIdentifiers.SessionStartDateTime, MatchingRule.GreaterThanOrEquals, "2025-07-14 00:00:00.000", true));
    compositeFilter.Add(new ScalarFilter(SessionFieldIdentifiers.SessionStartDateTime, MatchingRule.LessThan, "2025-07-18 23:00:00.000", true));

    var qm = QueryManager.CreateQueryManager(connectionString);
    qm.Filter = filter;
    var queryResult = qm.ExecuteQuery();

    var sessionManager = SessionManager.CreateSessionManager();

    foreach (var sessionSummary in queryResult)
    {
        var clientSession = sessionManager.Load(sessionSummary.Key, connectionString);
    }
    ```

=== "Python"

    ``` python
    server_name = r"SQLServer\InstanceName"
    db_name = "DatabaseName"
    connection_string = rf"server={serverName};Initial Catalog={dbName};Trusted_Connection=True"
    
    # filter by session data item
    item_filter = ScalarFilter("Car", MatchingRule.EqualTo, "1", True)

    # Using a composite filter
    composite_filter = CompositeFilter(CombineType.AND)
    composite_filter.Add(ScalarFilter(SessionFieldIdentifiers.SessionStartDateTime, MatchingRule.GreaterThanOrEquals, "2025-07-14 00:00:00.000", True))
    composite_filter.Add(ScalarFilter(SessionFieldIdentifiers.SessionStartDateTime, MatchingRule.LessThan, "2025-07-18 23:00:00.000", True))

    qm = QueryManager.CreateQueryManager(connection_string)
    qm.Filter = item_filter
    queryResult = qm.ExecuteQuery()  # Returns a list of Session Summaries

    session_manager = SessionManager.CreateSessionManager()

    for session_summary in queryResult:
        client_session = session_manager.Load(session_summary.Key, connection_string)
    
    ```

=== "MATLAB"
  
    ``` matlab
    serverName = "SQLServer\InstanceName";
    dbName = "DatabaseName";
    connectionString = sprintf('server=%s;Initial Catalog=%s;Trusted_Connection=True;', serverName, dbName);

    filter = ScalarFilter("Car", MatchingRule.EqualTo, "1", true);

    compositeFilter = CompositeFilter(CombineType.AND);
    compositeFilter.Add(ScalarFilter(SessionFieldIdentifiers.SessionStartDateTime, MatchingRule.GreaterThanOrEquals, "2025-07-14 00:00:00.000", true));
    compositeFilter.Add(ScalarFilter(SessionFieldIdentifiers.SessionStartDateTime, MatchingRule.LessThan, "2025-07-18 23:00:00.000", true));

    qm = QueryManager.CreateQueryManager(connectionString);
    qm.Filter = filter;
    queryResult = qm.ExecuteQuery();

    % Get IEnumerable.GetEnumerator() via reflection and invoke it
    t = queryResult.GetType();
    ienumIface = t.GetInterface('System.Collections.IEnumerable'); % the non-generic interface
    assert(~isempty(ienumIface), 'Object does not implement System.Collections.IEnumerable');

    miGetEnum = ienumIface.GetMethod('GetEnumerator'); % MethodInfo
    emptyArgs = NET.createArray('System.Object', 0);
    en = miGetEnum.Invoke(queryResult, emptyArgs); % returns an IEnumerator (explicit impl)

    % Prepare reflection handles for IEnumerator.MoveNext and IEnumerator.Current
    ienumeratorT = System.Type.GetType('System.Collections.IEnumerator');
    miMoveNext = ienumeratorT.GetMethod('MoveNext'); % MethodInfo for bool MoveNext()
    propCurrent = ienumeratorT.GetProperty('Current'); % PropertyInfo for object Current {get;}
    miGetCurrent = propCurrent.GetGetMethod(); % MethodInfo for getter

    % Walk the sequence using interface methods
    summaries = {}; % MATLAB cell array to collect MESL.SqlRace.Domain.SessionSummary objects

    while miMoveNext.Invoke(en, emptyArgs) % calls IEnumerator.MoveNext()
        curr = miGetCurrent.Invoke(en, emptyArgs); % calls IEnumerator.get_Current()
        summaries{end+1} = curr;
    end

    sessionManager = SessionManager.CreateSessionManager();

    for j = 1:numel(summaries)
        ss = summaries{j};  % MESL.SqlRace.Domain.SessionSummary
        clientSession = sessionManager.Load(ss.Key, connectionString);
    end
    ```