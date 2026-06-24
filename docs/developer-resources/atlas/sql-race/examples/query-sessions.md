# Querying Sessions

## Query Manager
The SQLRace API Query Manager provides a unified, high-level mechanism for discovering and filtering essions. It allows client applications to construct expressive queries (for example, filtering by vehicle attributes, session state, or metadata values) without directly interacting with the underlying database schema.

The Query Manager is useful for building scalable tools and workflows that need to search, enumerate, and select sessions programmatically. It is commonly used in automation, data export pipelines, analysis tools, and custom ATLAS-integrated applications where flexible session discovery is required.

### Filters

Filter criteria for sessions. 

| Filter | Description |
| ------- | ------- |
| FilesFilter | Used to create files filter query for finding and filtering Sessions based on a folder path. Will find all Session within folder and create metadata in the database for each file. |
| FolderFilter | Used to create folder filter query for finding and filtering Session based on a folder path. Will find all Session within folder and create metadata in the database for each file. |
| ParameterDataFilter | Used to create a parameter data filter query for finding and filtering Sessions based on a parameter's data. |
| ScalarFilter | Used to describe match criteria for a query. |
| CompositeFilter | Used to aggregate multiple filters for a query. |

### Matching Rules

Types by which two items can be compared. 

| Rule | Description |
| ------- | ------- |
| Between | Inclusive Data is GreaterThanOrEqual to Value AND LessThanOrEqual to UpperValue. |
| Contains | Matches items containing the specified value. |
| DoesNotContain | Matches items that do not contain the specified value. |
| EqualTo | Matches items that equal the specified value. |
| GreaterThan | Matches items that are greater than the specified value. |
| GreaterThanOrEquals | Matches items that are greater than or equal to the specified value. |
| IsEmpty | Matches items that are empty. |
| IsNotEmpty | Matches items that are not empty. |
| LessThan | Matches items that are less than the specified value. |
| LessThanOrEquals | Matches items that are less than or equal to the specified value. |
| NotBetween | NotBetween - Data is LowerThan Value OR GreatherThan UpperValue. |
| NotEqualTo | Matches items that do not equal the specified value. |
| RegularExpression | Matches items based on a regular expression match. |

### Search Options

| Option | Description |
| ------- | ------- |
| None | No options set. |
| RetrieveAssociateSessionSummaries | Retrieve the session summary for the associated sessions |
| RetrieveSessionDetails | Retrieve the session details for the session summeries |

### Session Field Identifiers

| Field | Description |
| ------- | ------- |
| CreateDateTime | The date and time the session was created |
| EndTime | The end time |
| FastestLapTime | The fastest lap time |
| LapCount | The lap count |
| SessionIdentifier | The session identifier |
| SessionKey | The session key |
| SessionStartDateTime | The session start date time. This is Time of Recording |
| SessionState | The session state |
| SessionType | The session type |
| StartTime | The start time |


## Examples

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