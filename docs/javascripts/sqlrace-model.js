/* AUTO-GENERATED from xrefmap.yml by tools/gen_sqlrace_model.py - do not edit by hand. */
window.SQLRACE_MODEL = {
  "nodes": [
    {
      "id": "SessionManager",
      "uid": "MESL.SqlRace.Domain.SessionManager",
      "category": "connect",
      "blurb": "Entry point - create, load, query, export and compose sessions.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html",
      "example": "/developer-resources/atlas/sql-race/examples/session-loading/",
      "methods": [
        {
          "name": "Append",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_Append_MESL_SqlRace_Domain_ConnectionInformationBase_MAT_OCS_Core_SessionKey_System_String_System_DateTime_System_String_",
          "edge": false
        },
        {
          "name": "CleanupZombieLiveSessions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_CleanupZombieLiveSessions",
          "edge": false
        },
        {
          "name": "ClearAuditEntries",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_ClearAuditEntries_System_String_",
          "edge": false
        },
        {
          "name": "Close",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_Close_MESL_SqlRace_Domain_IClientSession_",
          "edge": false
        },
        {
          "name": "CreateAndSubscribeClient",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_CreateAndSubscribeClient_MESL_SqlRace_Domain_Session_",
          "edge": false
        },
        {
          "name": "CreateCompositeSession",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_CreateCompositeSession_System_String_",
          "edge": true
        },
        {
          "name": "CreateSession",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_CreateSession_MESL_SqlRace_Domain_ConnectionInformationBase_MAT_OCS_Core_SessionKey_System_String_System_DateTime_System_String_",
          "edge": true
        },
        {
          "name": "CreateSessionGeneratingTeamId",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_CreateSessionGeneratingTeamId_System_String_MAT_OCS_Core_SessionKey_System_String_System_DateTime_System_String_System_String_System_String_",
          "edge": false
        },
        {
          "name": "CreateSessionManager",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_CreateSessionManager",
          "edge": false
        },
        {
          "name": "CreateSessionWithTeamId",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_CreateSessionWithTeamId_MESL_SqlRace_Domain_ConnectionInformationBase_MAT_OCS_Core_SessionKey_System_String_System_DateTime_System_UInt32_System_String_",
          "edge": false
        },
        {
          "name": "Delete",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_Delete_MAT_OCS_Core_SessionKey_MESL_SqlRace_Domain_ConnectionInformationBase_",
          "edge": false
        },
        {
          "name": "ExportSession",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_ExportSession_MAT_OCS_Core_SessionKey_System_String_",
          "edge": false
        },
        {
          "name": "ExportSessionWithCustomTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_ExportSessionWithCustomTime_System_String_MAT_OCS_Core_SessionKey_System_String_System_Collections_Generic_IReadOnlyList_System_String__System_Collections_Generic_IReadOnlyList_System_Int32__System_Nullable_System_Int64__System_Nullable_System_Int64__System_Boolean_System_Boolean_System_Boolean_System_Boolean_System_Boolean_System_String_",
          "edge": false
        },
        {
          "name": "ExportSessionWithNullTeamId",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_ExportSessionWithNullTeamId_System_String_MAT_OCS_Core_SessionKey_",
          "edge": false
        },
        {
          "name": "Find",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_Find_System_String_System_Nullable_System_Int32__System_Collections_Generic_IList_MESL_SqlRace_Domain_SessionState__System_Nullable_System_Boolean__",
          "edge": false
        },
        {
          "name": "FindBySessionItems",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_FindBySessionItems_System_Collections_Generic_IList_MESL_SqlRace_Domain_SessionDataItem__MESL_SqlRace_Domain_ConnectionInformationBase_",
          "edge": false
        },
        {
          "name": "FindBySessionState",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_FindBySessionState_MESL_SqlRace_Domain_SessionState_MESL_SqlRace_Domain_ConnectionInformationBase_",
          "edge": false
        },
        {
          "name": "FindDeletedSessions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_FindDeletedSessions_MESL_SqlRace_Domain_ConnectionInformationBase_",
          "edge": false
        },
        {
          "name": "FindSummaryBy",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_FindSummaryBy_MAT_OCS_Core_SessionKey_System_String_",
          "edge": false
        },
        {
          "name": "GetActiveSessions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_GetActiveSessions_System_Predicate_MESL_SqlRace_Domain_Session__",
          "edge": false
        },
        {
          "name": "GetApplicationVersion",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_GetApplicationVersion",
          "edge": false
        },
        {
          "name": "GetAuditEntries",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_GetAuditEntries_System_String_",
          "edge": false
        },
        {
          "name": "GetDatabaseVersion",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_GetDatabaseVersion_System_String_",
          "edge": false
        },
        {
          "name": "GetItemNamesAndValues",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_GetItemNamesAndValues_System_String_",
          "edge": false
        },
        {
          "name": "GetServerEndPoint",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_GetServerEndPoint_MESL_SqlRace_Domain_ConnectionContextBase_",
          "edge": false
        },
        {
          "name": "GetSessionDataItemDefinitions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_GetSessionDataItemDefinitions_MESL_SqlRace_Domain_ConnectionInformationBase_",
          "edge": false
        },
        {
          "name": "GetSessionDataItemNames",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_GetSessionDataItemNames_MESL_SqlRace_Domain_ConnectionInformationBase_",
          "edge": false
        },
        {
          "name": "ImportSession",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_ImportSession_System_String_System_IO_Stream_",
          "edge": false
        },
        {
          "name": "IsAvailable",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_IsAvailable_MESL_SqlRace_Domain_ConnectionInformationBase_",
          "edge": false
        },
        {
          "name": "IsDatabaseLocal",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_IsDatabaseLocal_System_String_",
          "edge": false
        },
        {
          "name": "Load",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_Load_MAT_OCS_Core_SessionKey_MESL_SqlRace_Domain_ConnectionInformationBase_",
          "edge": true
        },
        {
          "name": "LoadAssociatesForSession",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_LoadAssociatesForSession_MAT_OCS_Core_SessionKey_MESL_SqlRace_Domain_ConnectionInformationBase_",
          "edge": false
        },
        {
          "name": "LoadCompositeSession",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_LoadCompositeSession_MAT_OCS_Core_SessionKey_MESL_SqlRace_Domain_ConnectionInformationBase_System_Collections_Generic_IEnumerable_MAT_OCS_Core_SessionKey__System_String_",
          "edge": false
        },
        {
          "name": "LoadLightweight",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_LoadLightweight_MAT_OCS_Core_SessionKey_MESL_SqlRace_Domain_ConnectionInformationBase_",
          "edge": false
        },
        {
          "name": "MESL#SqlRace#Domain#IApplicationInformationService#GetApplicationVersion",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_MESL_SqlRace_Domain_IApplicationInformationService_GetApplicationVersion",
          "edge": false
        },
        {
          "name": "MESL#SqlRace#Domain#IApplicationInformationService#GetDatabaseVersion",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_MESL_SqlRace_Domain_IApplicationInformationService_GetDatabaseVersion_System_String_",
          "edge": false
        },
        {
          "name": "MountSession",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_MountSession_MESL_SqlRace_Domain_MountedSessions_MountedSession_MAT_OCS_Core_SessionKey_",
          "edge": false
        },
        {
          "name": "Poll",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_Poll_System_String_System_Collections_Generic_IList_MESL_SqlRace_Domain_SessionState__System_Nullable_System_Boolean__System_Threading_CancellationToken_",
          "edge": false
        },
        {
          "name": "ReindexFolder",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_ReindexFolder_System_String_System_String_System_Threading_CancellationToken_",
          "edge": false
        },
        {
          "name": "Remove",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_Remove_MAT_OCS_Core_SessionKey_MESL_SqlRace_Domain_ConnectionInformationBase_",
          "edge": false
        },
        {
          "name": "SessionExists",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_SessionExists_MAT_OCS_Core_SessionKey_MESL_SqlRace_Domain_ConnectionInformationBase_",
          "edge": false
        },
        {
          "name": "SetDefaultDistance",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_SetDefaultDistance_System_String_",
          "edge": false
        },
        {
          "name": "Undelete",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_Undelete_MAT_OCS_Core_SessionKey_MESL_SqlRace_Domain_ConnectionInformationBase_",
          "edge": false
        }
      ],
      "properties": [
        {
          "name": "ServerListener",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.SessionManager.html#MESL_SqlRace_Domain_SessionManager_ServerListener",
          "edge": false
        }
      ]
    },
    {
      "id": "IClientSession",
      "uid": "MESL.SqlRace.Domain.IClientSession",
      "category": "connect",
      "blurb": "Handle to an open session; exposes the Session and its lifecycle.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.IClientSession.html",
      "example": "/developer-resources/atlas/sql-race/examples/session-loading/",
      "methods": [
        {
          "name": "Close",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.IClientSession.html#MESL_SqlRace_Domain_IClientSession_Close",
          "edge": false
        }
      ],
      "properties": [
        {
          "name": "ClientSubscriberId",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.IClientSession.html#MESL_SqlRace_Domain_IClientSession_ClientSubscriberId",
          "edge": false
        },
        {
          "name": "Session",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.IClientSession.html#MESL_SqlRace_Domain_IClientSession_Session",
          "edge": true
        }
      ]
    },
    {
      "id": "SessionKey",
      "uid": "MAT.OCS.Core.SessionKey",
      "category": "connect",
      "blurb": "GUID that uniquely identifies a session.",
      "doc": null,
      "example": "/developer-resources/atlas/sql-race/examples/session-loading/",
      "methods": [],
      "properties": []
    },
    {
      "id": "Session",
      "uid": "MESL.SqlRace.Domain.Session",
      "category": "structure",
      "blurb": "The session itself: data, configuration, laps, markers and events.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html",
      "example": "/developer-resources/atlas/sql-race/examples/session-loading/",
      "methods": [
        {
          "name": "AddChannelData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_AddChannelData_System_UInt32_System_Int64_System_Int32_System_Byte___",
          "edge": true
        },
        {
          "name": "AddRowData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_AddRowData_System_Int64_System_Collections_Generic_IList_System_UInt32__System_Byte___",
          "edge": false
        },
        {
          "name": "AddScalarData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_AddScalarData_System_UInt32_System_Byte___",
          "edge": false
        },
        {
          "name": "AddSynchroChannelData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_AddSynchroChannelData_System_Int64_System_UInt32_System_Byte_System_UInt32_System_Byte___",
          "edge": true
        },
        {
          "name": "AssociateWithChild",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_AssociateWithChild_MAT_OCS_Core_SessionKey_System_String_System_String_System_Int32_",
          "edge": false
        },
        {
          "name": "AssociateWithParent",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_AssociateWithParent_MAT_OCS_Core_SessionKey_",
          "edge": false
        },
        {
          "name": "CombineSessionConfiguration",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_CombineSessionConfiguration_MESL_SqlRace_Domain_Session_",
          "edge": false
        },
        {
          "name": "ContainsParameter",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_ContainsParameter_System_String_",
          "edge": false
        },
        {
          "name": "CreateConfiguration",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_CreateConfiguration",
          "edge": true
        },
        {
          "name": "CreateConstantParameterDataAccess",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_CreateConstantParameterDataAccess_System_String_",
          "edge": false
        },
        {
          "name": "CreateParameterDataAccess",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_CreateParameterDataAccess_System_String_",
          "edge": true
        },
        {
          "name": "CreateTransientConfiguration",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_CreateTransientConfiguration",
          "edge": false
        },
        {
          "name": "EndData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_EndData",
          "edge": false
        },
        {
          "name": "EndDataAsync",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_EndDataAsync",
          "edge": false
        },
        {
          "name": "EndDataSynchronous",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_EndDataSynchronous",
          "edge": false
        },
        {
          "name": "Flush",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_Flush",
          "edge": false
        },
        {
          "name": "GetConversion",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetConversion_System_String_",
          "edge": false
        },
        {
          "name": "GetErrorData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetErrorData_System_Int64_System_Int64_",
          "edge": false
        },
        {
          "name": "GetErrorDataForApplicationGroups",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetErrorDataForApplicationGroups_System_Int64_System_Int64_System_Collections_Generic_IEnumerable_System_String__",
          "edge": false
        },
        {
          "name": "GetErrorDataForIdentifiers",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetErrorDataForIdentifiers_System_Int64_System_Int64_System_Collections_Generic_IEnumerable_System_String__",
          "edge": false
        },
        {
          "name": "GetErrorDefinitionForParameter",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetErrorDefinitionForParameter_System_String_",
          "edge": false
        },
        {
          "name": "GetEventData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetEventData_System_Int64_System_Int64_",
          "edge": false
        },
        {
          "name": "GetEventDefinition",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetEventDefinition_System_String_",
          "edge": false
        },
        {
          "name": "GetLapsInRange",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetLapsInRange_System_Int64_System_Int64_",
          "edge": false
        },
        {
          "name": "GetLoadedAssociates",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetLoadedAssociates",
          "edge": false
        },
        {
          "name": "GetMappedTimestamps",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetMappedTimestamps_System_String_System_Double___",
          "edge": false
        },
        {
          "name": "GetMappedValues",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetMappedValues_System_String_System_Int64___",
          "edge": false
        },
        {
          "name": "GetNextUniqueFunctionId",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetNextUniqueFunctionId_System_String_",
          "edge": false
        },
        {
          "name": "GetParameter",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetParameter_System_String_",
          "edge": false
        },
        {
          "name": "GetParameterOrDefault",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetParameterOrDefault_System_String_",
          "edge": false
        },
        {
          "name": "GetParameterWithFallbackStrategy",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetParameterWithFallbackStrategy_System_String_",
          "edge": false
        },
        {
          "name": "GetParametersForGroup",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetParametersForGroup_System_String_",
          "edge": false
        },
        {
          "name": "GetParentSessions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetParentSessions",
          "edge": false
        },
        {
          "name": "GetSessionTransientState",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_GetSessionTransientState",
          "edge": false
        },
        {
          "name": "IsInError",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_IsInError_System_String_System_Int64_",
          "edge": false
        },
        {
          "name": "LoadConfiguration",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_LoadConfiguration",
          "edge": false
        },
        {
          "name": "LoadParameters",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_LoadParameters_System_Collections_Generic_IEnumerable_System_String__",
          "edge": false
        },
        {
          "name": "LoadRemainingParameters",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_LoadRemainingParameters",
          "edge": false
        },
        {
          "name": "MarkSessionAsTransient",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_MarkSessionAsTransient_System_Boolean_",
          "edge": false
        },
        {
          "name": "RecalculateParameters",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_RecalculateParameters",
          "edge": false
        },
        {
          "name": "RemoveFilter",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_RemoveFilter_System_String_",
          "edge": false
        },
        {
          "name": "RemoveInMemoryParameter",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_RemoveInMemoryParameter_System_String_",
          "edge": false
        },
        {
          "name": "ReserveNextAvailableRowChannelId",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_ReserveNextAvailableRowChannelId",
          "edge": false
        },
        {
          "name": "ReserveNextAvailableRowChannelIdRange",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_ReserveNextAvailableRowChannelIdRange_System_UInt32_",
          "edge": false
        },
        {
          "name": "ResetRowData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_ResetRowData_System_UInt32_",
          "edge": false
        },
        {
          "name": "ResolveString",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_ResolveString_System_String_",
          "edge": false
        },
        {
          "name": "SetCoverageCursor",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_SetCoverageCursor_System_Int64_",
          "edge": false
        },
        {
          "name": "SetEndTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_SetEndTime_System_Int64_",
          "edge": false
        },
        {
          "name": "SetSessionTimerange",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_SetSessionTimerange_System_Int64_System_Int64_",
          "edge": false
        },
        {
          "name": "SetStartTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_SetStartTime_System_Int64_",
          "edge": false
        },
        {
          "name": "TryCreateParameterDataAccess",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_TryCreateParameterDataAccess_System_String_MESL_SqlRace_Domain_ParameterDataAccessBase__",
          "edge": false
        },
        {
          "name": "UpdateIdentifier",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_UpdateIdentifier_System_String_",
          "edge": false
        },
        {
          "name": "UpdateSessionStatus",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_UpdateSessionStatus_MESL_SqlRace_Domain_SessionState_",
          "edge": false
        },
        {
          "name": "UpdateSessionStatusAsync",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_UpdateSessionStatusAsync_MESL_SqlRace_Domain_SessionState_",
          "edge": false
        },
        {
          "name": "UpdateUnformattedSessionDetail",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_UpdateUnformattedSessionDetail_System_String_System_String_",
          "edge": false
        },
        {
          "name": "UseConfigurationSets",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_UseConfigurationSets_System_Collections_Generic_IEnumerable_System_Collections_Generic_KeyValuePair_System_String_System_UInt32___",
          "edge": false
        },
        {
          "name": "UseLoggingConfigurationSet",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_UseLoggingConfigurationSet_System_String_",
          "edge": false
        },
        {
          "name": "UseLoggingConfigurationSets",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_UseLoggingConfigurationSets_System_Collections_Generic_Dictionary_System_String_System_UInt32__",
          "edge": false
        },
        {
          "name": "UseRowConfigurationSet",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_UseRowConfigurationSet_System_String_",
          "edge": false
        }
      ],
      "properties": [
        {
          "name": "ApplicationGroupNames",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_ApplicationGroupNames",
          "edge": false
        },
        {
          "name": "ApplicationGroups",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_ApplicationGroups",
          "edge": false
        },
        {
          "name": "Associates",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_Associates",
          "edge": false
        },
        {
          "name": "CanData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_CanData",
          "edge": false
        },
        {
          "name": "ConnectionString",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_ConnectionString",
          "edge": false
        },
        {
          "name": "Constants",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_Constants",
          "edge": false
        },
        {
          "name": "Conversions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_Conversions",
          "edge": false
        },
        {
          "name": "CurrentConfigurationSets",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_CurrentConfigurationSets",
          "edge": false
        },
        {
          "name": "EndTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_EndTime",
          "edge": false
        },
        {
          "name": "ErrorDefinitions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_ErrorDefinitions",
          "edge": false
        },
        {
          "name": "Errors",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_Errors",
          "edge": false
        },
        {
          "name": "EventDefinitions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_EventDefinitions",
          "edge": true
        },
        {
          "name": "Events",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_Events",
          "edge": true
        },
        {
          "name": "ExtendedAssociates",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_ExtendedAssociates",
          "edge": false
        },
        {
          "name": "FileSessionPath",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_FileSessionPath",
          "edge": false
        },
        {
          "name": "FriendlyName",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_FriendlyName",
          "edge": false
        },
        {
          "name": "InstanceIdentifier",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_InstanceIdentifier",
          "edge": false
        },
        {
          "name": "IsRemote",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_IsRemote",
          "edge": false
        },
        {
          "name": "IsStartTimeValid",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_IsStartTimeValid",
          "edge": false
        },
        {
          "name": "Items",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_Items",
          "edge": false
        },
        {
          "name": "LapCollection",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_LapCollection",
          "edge": true
        },
        {
          "name": "Laps",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_Laps",
          "edge": false
        },
        {
          "name": "LocalTimeOfRecording",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_LocalTimeOfRecording",
          "edge": false
        },
        {
          "name": "Maps",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_Maps",
          "edge": false
        },
        {
          "name": "Markers",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_Markers",
          "edge": true
        },
        {
          "name": "MarkersAndLaps",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_MarkersAndLaps",
          "edge": false
        },
        {
          "name": "Parameters",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_Parameters",
          "edge": true
        },
        {
          "name": "RootPathGuid",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_RootPathGuid",
          "edge": false
        },
        {
          "name": "StartTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_StartTime",
          "edge": false
        },
        {
          "name": "SummaryInformation",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_SummaryInformation",
          "edge": false
        },
        {
          "name": "TelemetryDataStreamStarted",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_TelemetryDataStreamStarted",
          "edge": false
        },
        {
          "name": "TimeZone",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Session.html#MESL_SqlRace_Domain_Session_TimeZone",
          "edge": false
        }
      ]
    },
    {
      "id": "CompositeSession",
      "uid": "MESL.SqlRace.Domain.CompositeSession",
      "category": "structure",
      "blurb": "A read-only session overlaying several sessions (lap / session compare).",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html",
      "example": "/developer-resources/atlas/sql-race/examples/session-loading/",
      "methods": [
        {
          "name": "Add",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_Add_MESL_SqlRace_Domain_IClientSession_",
          "edge": false
        },
        {
          "name": "ContainsParameter",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_ContainsParameter_System_String_",
          "edge": false
        },
        {
          "name": "CreateParameterDataAccess",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_CreateParameterDataAccess_System_String_",
          "edge": false
        },
        {
          "name": "DisableUnderlyingSession",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_DisableUnderlyingSession_MAT_OCS_Core_SessionKey_",
          "edge": false
        },
        {
          "name": "Dispose",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_Dispose",
          "edge": false
        },
        {
          "name": "EnableUnderlyingSession",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_EnableUnderlyingSession_MAT_OCS_Core_SessionKey_",
          "edge": false
        },
        {
          "name": "GetErrorData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_GetErrorData_System_Int64_System_Int64_",
          "edge": false
        },
        {
          "name": "GetErrorDataForApplicationGroups",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_GetErrorDataForApplicationGroups_System_Int64_System_Int64_System_Collections_Generic_IEnumerable_System_String__",
          "edge": false
        },
        {
          "name": "GetErrorDataForIdentifiers",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_GetErrorDataForIdentifiers_System_Int64_System_Int64_System_Collections_Generic_IEnumerable_System_String__",
          "edge": false
        },
        {
          "name": "GetEvents",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_GetEvents_System_Int64_System_Int64_",
          "edge": false
        },
        {
          "name": "GetFastestLap",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_GetFastestLap",
          "edge": false
        },
        {
          "name": "GetLapBasedOnTimestamp",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_GetLapBasedOnTimestamp_System_Int64_",
          "edge": false
        },
        {
          "name": "GetLaps",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_GetLaps_System_Int64_System_Int64_",
          "edge": false
        },
        {
          "name": "GetParametersForGroup",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_GetParametersForGroup_System_String_",
          "edge": false
        },
        {
          "name": "GetSessionContainingFastestLap",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_GetSessionContainingFastestLap",
          "edge": false
        },
        {
          "name": "GetSessionUnderTimestampOrNext",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_GetSessionUnderTimestampOrNext_System_Int64_",
          "edge": false
        },
        {
          "name": "GetSessionUnderTimestampOrPrevious",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_GetSessionUnderTimestampOrPrevious_System_Int64_",
          "edge": false
        },
        {
          "name": "IsInError",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_IsInError_System_String_System_Int64_",
          "edge": false
        },
        {
          "name": "LoadAndAdd",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_LoadAndAdd_MAT_OCS_Core_SessionKey_System_String_",
          "edge": false
        },
        {
          "name": "LoadConfiguration",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_LoadConfiguration_MAT_OCS_Core_SessionKey_",
          "edge": false
        },
        {
          "name": "LoadParameters",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_LoadParameters_System_Collections_Generic_IEnumerable_System_String__",
          "edge": false
        },
        {
          "name": "PromoteToPrimary",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_PromoteToPrimary_MAT_OCS_Core_SessionKey_",
          "edge": false
        },
        {
          "name": "Remove",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_Remove_MAT_OCS_Core_SessionKey_",
          "edge": false
        },
        {
          "name": "SetAutoFit",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_SetAutoFit_System_Boolean_",
          "edge": false
        },
        {
          "name": "SetAutoFitLimit",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_SetAutoFitLimit_System_Double_",
          "edge": false
        },
        {
          "name": "SetDefaultSessionStartTimeOffset",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_SetDefaultSessionStartTimeOffset_System_Int64_",
          "edge": false
        },
        {
          "name": "SetEnabled",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_SetEnabled_System_Boolean_",
          "edge": false
        },
        {
          "name": "SetOffsetValue",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_SetOffsetValue_System_Double_",
          "edge": false
        },
        {
          "name": "SetXAxisParameter",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_SetXAxisParameter_System_String_",
          "edge": false
        }
      ],
      "properties": [
        {
          "name": "AutoFitLaps",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_AutoFitLaps",
          "edge": false
        },
        {
          "name": "AutoFitLimit",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_AutoFitLimit",
          "edge": false
        },
        {
          "name": "CompareSessionMode",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_CompareSessionMode",
          "edge": false
        },
        {
          "name": "CompareSessionTimeOffset",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_CompareSessionTimeOffset",
          "edge": false
        },
        {
          "name": "Conversions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_Conversions",
          "edge": false
        },
        {
          "name": "CurrentOffset",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_CurrentOffset",
          "edge": false
        },
        {
          "name": "DefaultSessionOffset",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_DefaultSessionOffset",
          "edge": false
        },
        {
          "name": "Disposed",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_Disposed",
          "edge": false
        },
        {
          "name": "Enabled",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_Enabled",
          "edge": false
        },
        {
          "name": "EndTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_EndTime",
          "edge": false
        },
        {
          "name": "ErrorDefinitions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_ErrorDefinitions",
          "edge": false
        },
        {
          "name": "EventDefinitions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_EventDefinitions",
          "edge": false
        },
        {
          "name": "Events",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_Events",
          "edge": false
        },
        {
          "name": "Identifier",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_Identifier",
          "edge": false
        },
        {
          "name": "Items",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_Items",
          "edge": false
        },
        {
          "name": "Key",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_Key",
          "edge": false
        },
        {
          "name": "Laps",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_Laps",
          "edge": false
        },
        {
          "name": "Mode",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_Mode",
          "edge": false
        },
        {
          "name": "Parameters",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_Parameters",
          "edge": false
        },
        {
          "name": "PrimarySession",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_PrimarySession",
          "edge": false
        },
        {
          "name": "SessionEpochDate",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_SessionEpochDate",
          "edge": false
        },
        {
          "name": "Sessions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_Sessions",
          "edge": false
        },
        {
          "name": "StartTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_StartTime",
          "edge": false
        },
        {
          "name": "State",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_State",
          "edge": false
        },
        {
          "name": "TimeRange",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_TimeRange",
          "edge": false
        },
        {
          "name": "XAxisParameter",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.CompositeSession.html#MESL_SqlRace_Domain_CompositeSession_XAxisParameter",
          "edge": false
        }
      ]
    },
    {
      "id": "Lap",
      "uid": "MESL.SqlRace.Domain.Lap",
      "category": "structure",
      "blurb": "A lap / segment with a start-end time range.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Lap.html",
      "example": "/developer-resources/atlas/sql-race/examples/parameter-data-access/#lap-statistics",
      "methods": [],
      "properties": [
        {
          "name": "CountForFastestLap",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Lap.html#MESL_SqlRace_Domain_Lap_CountForFastestLap",
          "edge": false
        },
        {
          "name": "EndTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Lap.html#MESL_SqlRace_Domain_Lap_EndTime",
          "edge": false
        },
        {
          "name": "EndTimeUnbounded",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Lap.html#MESL_SqlRace_Domain_Lap_EndTimeUnbounded",
          "edge": false
        },
        {
          "name": "LapId",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Lap.html#MESL_SqlRace_Domain_Lap_LapId",
          "edge": false
        },
        {
          "name": "LapTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Lap.html#MESL_SqlRace_Domain_Lap_LapTime",
          "edge": false
        },
        {
          "name": "Name",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Lap.html#MESL_SqlRace_Domain_Lap_Name",
          "edge": false
        },
        {
          "name": "Number",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Lap.html#MESL_SqlRace_Domain_Lap_Number",
          "edge": false
        },
        {
          "name": "SessionKey",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Lap.html#MESL_SqlRace_Domain_Lap_SessionKey",
          "edge": false
        },
        {
          "name": "StartTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Lap.html#MESL_SqlRace_Domain_Lap_StartTime",
          "edge": false
        },
        {
          "name": "TimeRange",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Lap.html#MESL_SqlRace_Domain_Lap_TimeRange",
          "edge": false
        },
        {
          "name": "TriggerSource",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Lap.html#MESL_SqlRace_Domain_Lap_TriggerSource",
          "edge": false
        }
      ]
    },
    {
      "id": "Marker",
      "uid": "MESL.SqlRace.Domain.Marker",
      "category": "structure",
      "blurb": "An annotated time range (region of interest) on the session.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Marker.html",
      "example": "/developer-resources/atlas/sql-race/examples/session-loading/",
      "methods": [
        {
          "name": "AddLabel",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Marker.html#MESL_SqlRace_Domain_Marker_AddLabel_MESL_SqlRace_Domain_MarkerLabel_",
          "edge": false
        },
        {
          "name": "CreateTransientMarker",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Marker.html#MESL_SqlRace_Domain_Marker_CreateTransientMarker_System_Nullable_System_Int64__System_Nullable_System_Int64__System_String_System_String_System_String_System_String_",
          "edge": false
        },
        {
          "name": "ToStringWithTransient",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Marker.html#MESL_SqlRace_Domain_Marker_ToStringWithTransient",
          "edge": false
        }
      ],
      "properties": [
        {
          "name": "Description",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Marker.html#MESL_SqlRace_Domain_Marker_Description",
          "edge": false
        },
        {
          "name": "EndTimestamp",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Marker.html#MESL_SqlRace_Domain_Marker_EndTimestamp",
          "edge": false
        },
        {
          "name": "IsTransient",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Marker.html#MESL_SqlRace_Domain_Marker_IsTransient",
          "edge": false
        },
        {
          "name": "Label",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Marker.html#MESL_SqlRace_Domain_Marker_Label",
          "edge": false
        },
        {
          "name": "MarkerGuid",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Marker.html#MESL_SqlRace_Domain_Marker_MarkerGuid",
          "edge": false
        },
        {
          "name": "MarkerType",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Marker.html#MESL_SqlRace_Domain_Marker_MarkerType",
          "edge": false
        },
        {
          "name": "Properties",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Marker.html#MESL_SqlRace_Domain_Marker_Properties",
          "edge": false
        },
        {
          "name": "StartTimestamp",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Marker.html#MESL_SqlRace_Domain_Marker_StartTimestamp",
          "edge": false
        }
      ]
    },
    {
      "id": "Event",
      "uid": "MESL.SqlRace.Domain.Event",
      "category": "structure",
      "blurb": "A logged event instance at a point in time.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Event.html",
      "example": "/developer-resources/atlas/sql-race/examples/session-loading/",
      "methods": [
        {
          "name": "Dispose",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Event.html#MESL_SqlRace_Domain_Event_Dispose",
          "edge": false
        },
        {
          "name": "GetConvertedData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Event.html#MESL_SqlRace_Domain_Event_GetConvertedData_System_Int32_",
          "edge": false
        }
      ],
      "properties": [
        {
          "name": "ConvertedData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Event.html#MESL_SqlRace_Domain_Event_ConvertedData",
          "edge": false
        },
        {
          "name": "EventDefinitionKey",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Event.html#MESL_SqlRace_Domain_Event_EventDefinitionKey",
          "edge": false
        },
        {
          "name": "GroupName",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Event.html#MESL_SqlRace_Domain_Event_GroupName",
          "edge": false
        },
        {
          "name": "IsEditable",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Event.html#MESL_SqlRace_Domain_Event_IsEditable",
          "edge": false
        },
        {
          "name": "Key",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Event.html#MESL_SqlRace_Domain_Event_Key",
          "edge": false
        },
        {
          "name": "RawData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Event.html#MESL_SqlRace_Domain_Event_RawData",
          "edge": false
        },
        {
          "name": "StatusText",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Event.html#MESL_SqlRace_Domain_Event_StatusText",
          "edge": false
        },
        {
          "name": "TimeStamp",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Event.html#MESL_SqlRace_Domain_Event_TimeStamp",
          "edge": false
        },
        {
          "name": "UniqueEventKey",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Event.html#MESL_SqlRace_Domain_Event_UniqueEventKey",
          "edge": false
        }
      ]
    },
    {
      "id": "EventDefinition",
      "uid": "MESL.SqlRace.Domain.EventDefinition",
      "category": "structure",
      "blurb": "Defines an event type - its priority and group.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.EventDefinition.html",
      "example": "/developer-resources/atlas/sql-race/examples/session-loading/",
      "methods": [],
      "properties": [
        {
          "name": "ConversionFunctionNames",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.EventDefinition.html#MESL_SqlRace_Domain_EventDefinition_ConversionFunctionNames",
          "edge": false
        },
        {
          "name": "Description",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.EventDefinition.html#MESL_SqlRace_Domain_EventDefinition_Description",
          "edge": false
        },
        {
          "name": "EventDefinitionId",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.EventDefinition.html#MESL_SqlRace_Domain_EventDefinition_EventDefinitionId",
          "edge": false
        },
        {
          "name": "GroupName",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.EventDefinition.html#MESL_SqlRace_Domain_EventDefinition_GroupName",
          "edge": false
        },
        {
          "name": "Key",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.EventDefinition.html#MESL_SqlRace_Domain_EventDefinition_Key",
          "edge": false
        },
        {
          "name": "Priority",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.EventDefinition.html#MESL_SqlRace_Domain_EventDefinition_Priority",
          "edge": false
        }
      ]
    },
    {
      "id": "ConfigurationSet",
      "uid": "MESL.SqlRace.Domain.ConfigurationSet",
      "category": "configure",
      "blurb": "Describes the data: channels, parameters, conversions and groups.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html",
      "example": "/developer-resources/atlas/sql-race/examples/create-session/",
      "methods": [
        {
          "name": "AddChannel",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddChannel_MESL_SqlRace_Domain_IChannel_",
          "edge": true
        },
        {
          "name": "AddChannels",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddChannels_System_Collections_Generic_IEnumerable_MESL_SqlRace_Domain_IChannel__",
          "edge": false
        },
        {
          "name": "AddConversion",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddConversion_MESL_SqlRace_Domain_ConversionBase_",
          "edge": true
        },
        {
          "name": "AddConversions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddConversions_System_Collections_Generic_IEnumerable_MESL_SqlRace_Domain_ConversionBase__",
          "edge": false
        },
        {
          "name": "AddErrorDefinition",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddErrorDefinition_MESL_SqlRace_Domain_ErrorDefinition_",
          "edge": false
        },
        {
          "name": "AddErrorDefinitions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddErrorDefinitions_System_Collections_Generic_IEnumerable_MESL_SqlRace_Domain_ErrorDefinition__",
          "edge": false
        },
        {
          "name": "AddEventDefinition",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddEventDefinition_MESL_SqlRace_Domain_EventDefinition_",
          "edge": false
        },
        {
          "name": "AddEventDefinitions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddEventDefinitions_System_Collections_Generic_IEnumerable_MESL_SqlRace_Domain_EventDefinition__",
          "edge": false
        },
        {
          "name": "AddGroup",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddGroup_MESL_SqlRace_Domain_ApplicationGroup_",
          "edge": true
        },
        {
          "name": "AddGroups",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddGroups_System_Collections_Generic_IEnumerable_MESL_SqlRace_Domain_ApplicationGroup__",
          "edge": false
        },
        {
          "name": "AddParameter",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddParameter_MESL_SqlRace_Domain_ParameterBase_",
          "edge": true
        },
        {
          "name": "AddParameterGroup",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddParameterGroup_MESL_SqlRace_Domain_ParameterGroup_",
          "edge": true
        },
        {
          "name": "AddParameterGroups",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddParameterGroups_System_Collections_Generic_IEnumerable_MESL_SqlRace_Domain_ParameterGroup__",
          "edge": false
        },
        {
          "name": "AddParameters",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_AddParameters_System_Collections_Generic_IEnumerable_MESL_SqlRace_Domain_ParameterBase__",
          "edge": false
        },
        {
          "name": "Commit",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_Commit_MESL_SqlRace_Domain_Repositories_Configuration_ParameterChannelGroupMapper_",
          "edge": false
        },
        {
          "name": "Dispose",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_Dispose",
          "edge": false
        },
        {
          "name": "GetChannelsForParameter",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_GetChannelsForParameter_MESL_SqlRace_Domain_ChannelBasedParameter_System_Linq_ILookup_System_String_MESL_SqlRace_Domain_IChannel__",
          "edge": false
        }
      ],
      "properties": [
        {
          "name": "ChannelsToLoad",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_ChannelsToLoad",
          "edge": false
        },
        {
          "name": "Description",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_Description",
          "edge": false
        },
        {
          "name": "Identifier",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_Identifier",
          "edge": false
        },
        {
          "name": "IsCommitted",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_IsCommitted",
          "edge": false
        },
        {
          "name": "IsTransient",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_IsTransient",
          "edge": false
        },
        {
          "name": "Metadata",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_Metadata",
          "edge": false
        },
        {
          "name": "OwnerId",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_OwnerId",
          "edge": false
        },
        {
          "name": "ParametersToLoad",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSet.html#MESL_SqlRace_Domain_ConfigurationSet_ParametersToLoad",
          "edge": false
        }
      ]
    },
    {
      "id": "ConfigurationSetManager",
      "uid": "MESL.SqlRace.Domain.ConfigurationSetManager",
      "category": "configure",
      "blurb": "Creates and manages configuration sets.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSetManager.html",
      "example": "/developer-resources/atlas/sql-race/examples/create-session/",
      "methods": [
        {
          "name": "AddFastConfiguration",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSetManager.html#MESL_SqlRace_Domain_ConfigurationSetManager_AddFastConfiguration_MESL_SqlRace_Domain_ConnectionInformationBase_System_String_MAT_OCS_FFC_Configuration_Format_FastConfigFlags_System_Byte___",
          "edge": false
        },
        {
          "name": "AddFastConfigurationSet",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSetManager.html#MESL_SqlRace_Domain_ConfigurationSetManager_AddFastConfigurationSet_MESL_SqlRace_Domain_ConnectionInformationBase_System_String_System_String_System_UInt32_MESL_SqlRace_Domain_FastConfigurationSetAttributes_System_Byte___System_Boolean__",
          "edge": false
        },
        {
          "name": "Create",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSetManager.html#MESL_SqlRace_Domain_ConfigurationSetManager_Create_MAT_OCS_Core_SessionKey_MESL_SqlRace_Domain_ConnectionInformationBase_System_String_System_String_System_Boolean_System_Boolean_",
          "edge": true
        },
        {
          "name": "CreateConfigurationSetManager",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSetManager.html#MESL_SqlRace_Domain_ConfigurationSetManager_CreateConfigurationSetManager",
          "edge": false
        },
        {
          "name": "Delete",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSetManager.html#MESL_SqlRace_Domain_ConfigurationSetManager_Delete_MESL_SqlRace_Domain_ConnectionInformationBase_System_String_",
          "edge": false
        },
        {
          "name": "Exists",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSetManager.html#MESL_SqlRace_Domain_ConfigurationSetManager_Exists_MESL_SqlRace_Domain_ConnectionInformationBase_System_String_",
          "edge": false
        },
        {
          "name": "GetFastConfiguration",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSetManager.html#MESL_SqlRace_Domain_ConfigurationSetManager_GetFastConfiguration_MESL_SqlRace_Domain_ConnectionInformationBase_System_String_",
          "edge": false
        },
        {
          "name": "Purge",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSetManager.html#MESL_SqlRace_Domain_ConfigurationSetManager_Purge_System_String_",
          "edge": false
        },
        {
          "name": "SupportsFastConfiguration",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSetManager.html#MESL_SqlRace_Domain_ConfigurationSetManager_SupportsFastConfiguration_MESL_SqlRace_Domain_ConnectionInformationBase_",
          "edge": false
        },
        {
          "name": "UpgradeConfigurationSet",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSetManager.html#MESL_SqlRace_Domain_ConfigurationSetManager_UpgradeConfigurationSet_MESL_SqlRace_Domain_ConnectionInformationBase_System_Int32_System_String_",
          "edge": false
        }
      ],
      "properties": [
        {
          "name": "SessionId",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ConfigurationSetManager.html#MESL_SqlRace_Domain_ConfigurationSetManager_SessionId",
          "edge": false
        }
      ]
    },
    {
      "id": "Channel",
      "uid": "MESL.SqlRace.Domain.Channel",
      "category": "configure",
      "blurb": "A raw data stream - periodic, row or synchro.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html",
      "example": "/developer-resources/atlas/sql-race/examples/create-session/",
      "methods": [
        {
          "name": "CreateCopy",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html#MESL_SqlRace_Domain_Channel_CreateCopy_System_UInt32_",
          "edge": false
        },
        {
          "name": "CreatePeriodic",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html#MESL_SqlRace_Domain_Channel_CreatePeriodic_MESL_SqlRace_Enumerators_DataType_System_Int32_",
          "edge": false
        },
        {
          "name": "CreateSlowRow",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html#MESL_SqlRace_Domain_Channel_CreateSlowRow_MESL_SqlRace_Enumerators_DataType_",
          "edge": false
        },
        {
          "name": "CreateSynchro",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html#MESL_SqlRace_Domain_Channel_CreateSynchro_MESL_SqlRace_Enumerators_DataType_",
          "edge": false
        }
      ],
      "properties": [
        {
          "name": "DataSource",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html#MESL_SqlRace_Domain_Channel_DataSource",
          "edge": false
        },
        {
          "name": "DataType",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html#MESL_SqlRace_Domain_Channel_DataType",
          "edge": false
        },
        {
          "name": "Id",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html#MESL_SqlRace_Domain_Channel_Id",
          "edge": false
        },
        {
          "name": "InMemory",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html#MESL_SqlRace_Domain_Channel_InMemory",
          "edge": false
        },
        {
          "name": "Interval",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html#MESL_SqlRace_Domain_Channel_Interval",
          "edge": false
        },
        {
          "name": "Name",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html#MESL_SqlRace_Domain_Channel_Name",
          "edge": false
        },
        {
          "name": "ParameterChannelKey",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html#MESL_SqlRace_Domain_Channel_ParameterChannelKey",
          "edge": false
        },
        {
          "name": "ReadOnly",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html#MESL_SqlRace_Domain_Channel_ReadOnly",
          "edge": false
        },
        {
          "name": "SampleSizeInBytes",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Channel.html#MESL_SqlRace_Domain_Channel_SampleSizeInBytes",
          "edge": false
        }
      ]
    },
    {
      "id": "Parameter",
      "uid": "MESL.SqlRace.Domain.Parameter",
      "category": "configure",
      "blurb": "A named signal bound to a channel and a conversion.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Parameter.html",
      "example": "/developer-resources/atlas/sql-race/examples/create-session/",
      "methods": [],
      "properties": [
        {
          "name": "ParameterType",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Parameter.html#MESL_SqlRace_Domain_Parameter_ParameterType",
          "edge": false
        }
      ]
    },
    {
      "id": "RationalConversion",
      "uid": "MESL.SqlRace.Domain.RationalConversion",
      "category": "configure",
      "blurb": "Maps raw channel values to engineering units.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.RationalConversion.html",
      "example": "/developer-resources/atlas/sql-race/examples/create-session/",
      "methods": [
        {
          "name": "CreateSimple1To1Conversion",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.RationalConversion.html#MESL_SqlRace_Domain_RationalConversion_CreateSimple1To1Conversion_System_String_System_String_System_String_",
          "edge": false
        }
      ],
      "properties": [
        {
          "name": "Coefficient1",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.RationalConversion.html#MESL_SqlRace_Domain_RationalConversion_Coefficient1",
          "edge": false
        },
        {
          "name": "Coefficient2",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.RationalConversion.html#MESL_SqlRace_Domain_RationalConversion_Coefficient2",
          "edge": false
        },
        {
          "name": "Coefficient3",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.RationalConversion.html#MESL_SqlRace_Domain_RationalConversion_Coefficient3",
          "edge": false
        },
        {
          "name": "Coefficient4",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.RationalConversion.html#MESL_SqlRace_Domain_RationalConversion_Coefficient4",
          "edge": false
        },
        {
          "name": "Coefficient5",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.RationalConversion.html#MESL_SqlRace_Domain_RationalConversion_Coefficient5",
          "edge": false
        },
        {
          "name": "Coefficient6",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.RationalConversion.html#MESL_SqlRace_Domain_RationalConversion_Coefficient6",
          "edge": false
        }
      ]
    },
    {
      "id": "ParameterGroup",
      "uid": "MESL.SqlRace.Domain.ParameterGroup",
      "category": "configure",
      "blurb": "A logical grouping of related parameters.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterGroup.html",
      "example": "/developer-resources/atlas/sql-race/examples/create-session/",
      "methods": [
        {
          "name": "AddSubGroup",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterGroup.html#MESL_SqlRace_Domain_ParameterGroup_AddSubGroup_MESL_SqlRace_Domain_ParameterGroup_",
          "edge": false
        }
      ],
      "properties": [
        {
          "name": "Description",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterGroup.html#MESL_SqlRace_Domain_ParameterGroup_Description",
          "edge": false
        },
        {
          "name": "Identifier",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterGroup.html#MESL_SqlRace_Domain_ParameterGroup_Identifier",
          "edge": false
        },
        {
          "name": "SubGroups",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterGroup.html#MESL_SqlRace_Domain_ParameterGroup_SubGroups",
          "edge": false
        }
      ]
    },
    {
      "id": "ApplicationGroup",
      "uid": "MESL.SqlRace.Domain.ApplicationGroup",
      "category": "configure",
      "blurb": "Application context that organises parameter groups.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ApplicationGroup.html",
      "example": "/developer-resources/atlas/sql-race/examples/create-session/",
      "methods": [],
      "properties": [
        {
          "name": "ApplicationId",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ApplicationGroup.html#MESL_SqlRace_Domain_ApplicationGroup_ApplicationId",
          "edge": false
        },
        {
          "name": "Name",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ApplicationGroup.html#MESL_SqlRace_Domain_ApplicationGroup_Name",
          "edge": false
        },
        {
          "name": "ParentOwnerID",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ApplicationGroup.html#MESL_SqlRace_Domain_ApplicationGroup_ParentOwnerID",
          "edge": false
        },
        {
          "name": "SupportsRda",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ApplicationGroup.html#MESL_SqlRace_Domain_ApplicationGroup_SupportsRda",
          "edge": false
        }
      ]
    },
    {
      "id": "ParameterDataAccess",
      "uid": "MESL.SqlRace.Domain.ParameterDataAccessBase",
      "category": "read",
      "blurb": "Reads samples and resampled data; positions a read cursor.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html",
      "example": "/developer-resources/atlas/sql-race/examples/parameter-data-access/",
      "methods": [
        {
          "name": "AssignErrorDefinition",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_AssignErrorDefinition_MESL_SqlRace_Domain_ErrorDefinition_",
          "edge": false
        },
        {
          "name": "CancelSearch",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_CancelSearch",
          "edge": false
        },
        {
          "name": "Contains",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_Contains_System_Int64_System_Int64_MESL_SqlRace_Domain_Query_MatchingRule_System_Double_System_Nullable_System_Double__System_Nullable_System_Int32__",
          "edge": false
        },
        {
          "name": "Dispose",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_Dispose",
          "edge": false
        },
        {
          "name": "GetData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetData_System_Int64___MESL_SqlRace_Enumerators_SampleModeType_System_Boolean_MAT_OCS_Core_ParameterValuesTemplate_",
          "edge": false
        },
        {
          "name": "GetDataStatistics",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetDataStatistics_System_Int64_System_Int64_System_Boolean_MESL_SqlRace_Domain_Infrastructure_DataPipeline_StatisticOption_MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_",
          "edge": false
        },
        {
          "name": "GetEndTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetEndTime",
          "edge": false
        },
        {
          "name": "GetLapStatistics",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetLapStatistics_MESL_SqlRace_Domain_Lap_System_Boolean_MESL_SqlRace_Domain_Infrastructure_DataPipeline_StatisticOption_MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_",
          "edge": true
        },
        {
          "name": "GetMaximumFrequency",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetMaximumFrequency",
          "edge": false
        },
        {
          "name": "GetMaximumSampleInterval",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetMaximumSampleInterval_System_Int64_System_Boolean_",
          "edge": false
        },
        {
          "name": "GetMaximumSampleRate",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetMaximumSampleRate",
          "edge": false
        },
        {
          "name": "GetMinimumFrequency",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetMinimumFrequency",
          "edge": false
        },
        {
          "name": "GetMinimumSampleInterval",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetMinimumSampleInterval_System_Int64_System_Boolean_",
          "edge": false
        },
        {
          "name": "GetNextData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetNextData_System_Int32_MESL_SqlRace_Enumerators_SampleModeType_System_Boolean_MAT_OCS_Core_ParameterValuesTemplate_",
          "edge": true
        },
        {
          "name": "GetNextSamples",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetNextSamples_System_Int32_MESL_SqlRace_Domain_Infrastructure_Enumerators_StepDirection_MAT_OCS_Core_ParameterValuesTemplate_",
          "edge": true
        },
        {
          "name": "GetSamplesBetween",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetSamplesBetween_System_Int64_System_Int64_System_Int32_",
          "edge": false
        },
        {
          "name": "GetSamplesCount",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetSamplesCount_System_Int64_System_Int64_",
          "edge": false
        },
        {
          "name": "GetSamplesCountEstimate",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetSamplesCountEstimate_System_Int64_System_Int64_",
          "edge": false
        },
        {
          "name": "GetSamplesUntil",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetSamplesUntil_System_Int64_System_Int32_",
          "edge": false
        },
        {
          "name": "GetStartTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetStartTime",
          "edge": false
        },
        {
          "name": "GetTimeRange",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GetTimeRange",
          "edge": false
        },
        {
          "name": "GoTo",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GoTo_System_Double_",
          "edge": false
        },
        {
          "name": "GuardAgainstInvocationWhenInvalidated",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_GuardAgainstInvocationWhenInvalidated",
          "edge": false
        },
        {
          "name": "OnInvalidated",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_OnInvalidated",
          "edge": false
        },
        {
          "name": "Search",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_Search_System_Int64_System_Int64_MESL_SqlRace_Domain_Query_MatchingRule_System_Double_System_Nullable_System_Double__System_Nullable_System_Int32__",
          "edge": false
        },
        {
          "name": "SetMapper",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_SetMapper_System_String_",
          "edge": false
        },
        {
          "name": "SetSampleIncrement",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_SetSampleIncrement_System_Double_",
          "edge": false
        },
        {
          "name": "ValidateArguments",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_ValidateArguments__2_System_Int32___0_____1___",
          "edge": false
        },
        {
          "name": "ValidateSampleTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_ValidateSampleTime",
          "edge": false
        },
        {
          "name": "ValidateStartAndEndTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_ValidateStartAndEndTime_System_Int64_System_Int64_",
          "edge": false
        },
        {
          "name": "ValidateStartPositionOfPda",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_ValidateStartPositionOfPda",
          "edge": false
        }
      ],
      "properties": [
        {
          "name": "CoverageCursor",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_CoverageCursor",
          "edge": false
        },
        {
          "name": "CurrentTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_CurrentTime",
          "edge": false
        },
        {
          "name": "DataChangedCounter",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_DataChangedCounter",
          "edge": false
        },
        {
          "name": "DemandTimerange",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_DemandTimerange",
          "edge": false
        },
        {
          "name": "ErrorDefinition",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_ErrorDefinition",
          "edge": false
        },
        {
          "name": "Invalid",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_Invalid",
          "edge": false
        },
        {
          "name": "ParameterIdentifier",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_ParameterIdentifier",
          "edge": false
        },
        {
          "name": "SampleTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_SampleTime",
          "edge": false
        },
        {
          "name": "Session",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_Session",
          "edge": false
        },
        {
          "name": "UseSubSampledChannels",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.ParameterDataAccessBase.html#MESL_SqlRace_Domain_ParameterDataAccessBase_UseSubSampledChannels",
          "edge": false
        }
      ]
    },
    {
      "id": "ParameterValues",
      "uid": "MAT.OCS.Core.ParameterValues",
      "category": "read",
      "blurb": "The returned data: values, timestamps and data status.",
      "doc": null,
      "example": "/developer-resources/atlas/sql-race/examples/parameter-data-access/#data-status",
      "methods": [],
      "properties": []
    },
    {
      "id": "Statistics",
      "uid": "MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics",
      "category": "read",
      "blurb": "Aggregate statistics: min, max, mean, std-dev, regression.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html",
      "example": "/developer-resources/atlas/sql-race/examples/parameter-data-access/#lap-statistics",
      "methods": [
        {
          "name": "AppendData",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_AppendData_MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_",
          "edge": false
        }
      ],
      "properties": [
        {
          "name": "AbsoluteMeanValue",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_AbsoluteMeanValue",
          "edge": false
        },
        {
          "name": "DeltaValue",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_DeltaValue",
          "edge": false
        },
        {
          "name": "EndValue",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_EndValue",
          "edge": false
        },
        {
          "name": "GeometricMeanValue",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_GeometricMeanValue",
          "edge": false
        },
        {
          "name": "Lap",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_Lap",
          "edge": false
        },
        {
          "name": "MaximumStatus",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_MaximumStatus",
          "edge": false
        },
        {
          "name": "MaximumTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_MaximumTime",
          "edge": false
        },
        {
          "name": "MaximumValue",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_MaximumValue",
          "edge": false
        },
        {
          "name": "MeanValue",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_MeanValue",
          "edge": false
        },
        {
          "name": "MinimumStatus",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_MinimumStatus",
          "edge": false
        },
        {
          "name": "MinimumTime",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_MinimumTime",
          "edge": false
        },
        {
          "name": "MinimumValue",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_MinimumValue",
          "edge": false
        },
        {
          "name": "NumberOfNansSkipped",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_NumberOfNansSkipped",
          "edge": false
        },
        {
          "name": "NumberOfSamples",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_NumberOfSamples",
          "edge": false
        },
        {
          "name": "RegressionInterceptValue",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_RegressionInterceptValue",
          "edge": false
        },
        {
          "name": "RegressionRSquaredValue",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_RegressionRSquaredValue",
          "edge": false
        },
        {
          "name": "RegressionSlopeValue",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_RegressionSlopeValue",
          "edge": false
        },
        {
          "name": "SessionKey",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_SessionKey",
          "edge": false
        },
        {
          "name": "StandardDeviation",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_StandardDeviation",
          "edge": false
        },
        {
          "name": "StartValue",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_StartValue",
          "edge": false
        },
        {
          "name": "SumOfAbsoluteSampleValues",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_SumOfAbsoluteSampleValues",
          "edge": false
        },
        {
          "name": "SumOfSampleValues",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_SumOfSampleValues",
          "edge": false
        },
        {
          "name": "SumOfSquaredSampleValues",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_SumOfSquaredSampleValues",
          "edge": false
        },
        {
          "name": "TimeRange",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_TimeRange",
          "edge": false
        },
        {
          "name": "WeightedCount",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Infrastructure.Interfaces.IParameterDataStatistics.html#MESL_SqlRace_Domain_Infrastructure_Interfaces_IParameterDataStatistics_WeightedCount",
          "edge": false
        }
      ]
    },
    {
      "id": "FunctionManagerFactory",
      "uid": "MESL.SqlRace.Domain.Functions.FunctionManagerFactory",
      "category": "functions",
      "blurb": "Creates a function (calculated-channel) manager.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.FunctionManagerFactory.html",
      "example": "/developer-resources/atlas/sql-race/examples/functions/",
      "methods": [
        {
          "name": "Create",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.FunctionManagerFactory.html#MESL_SqlRace_Domain_Functions_FunctionManagerFactory_Create",
          "edge": true
        }
      ],
      "properties": []
    },
    {
      "id": "FunctionManager",
      "uid": "MESL.SqlRace.Domain.Functions.IFunctionManager",
      "category": "functions",
      "blurb": "Defines, builds and manages calculated-channel functions.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionManager.html",
      "example": "/developer-resources/atlas/sql-race/examples/functions/",
      "methods": [
        {
          "name": "AddConstantDefinition",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionManager.html#MESL_SqlRace_Domain_Functions_IFunctionManager_AddConstantDefinition_MESL_SqlRace_Domain_Functions_IConstantDefinition_",
          "edge": false
        },
        {
          "name": "Build",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionManager.html#MESL_SqlRace_Domain_Functions_IFunctionManager_Build_MESL_SqlRace_Domain_Functions_IFunctionDefinition_",
          "edge": false
        },
        {
          "name": "CreateFunctionDefinition",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionManager.html#MESL_SqlRace_Domain_Functions_IFunctionManager_CreateFunctionDefinition_System_Guid_",
          "edge": true
        },
        {
          "name": "GetFunctionDefinition",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionManager.html#MESL_SqlRace_Domain_Functions_IFunctionManager_GetFunctionDefinition_System_Guid_",
          "edge": false
        },
        {
          "name": "Remove",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionManager.html#MESL_SqlRace_Domain_Functions_IFunctionManager_Remove_MESL_SqlRace_Domain_Functions_IFunctionDefinition_",
          "edge": false
        },
        {
          "name": "RemoveConstantDefinition",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionManager.html#MESL_SqlRace_Domain_Functions_IFunctionManager_RemoveConstantDefinition_System_String_",
          "edge": false
        },
        {
          "name": "Save",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionManager.html#MESL_SqlRace_Domain_Functions_IFunctionManager_Save_MESL_SqlRace_Domain_Functions_IFunctionDefinition_",
          "edge": false
        },
        {
          "name": "Validate",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionManager.html#MESL_SqlRace_Domain_Functions_IFunctionManager_Validate_MESL_SqlRace_Domain_Functions_IFunctionDefinition_",
          "edge": false
        }
      ],
      "properties": [
        {
          "name": "ConstantDefinitions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionManager.html#MESL_SqlRace_Domain_Functions_IFunctionManager_ConstantDefinitions",
          "edge": false
        },
        {
          "name": "FunctionDefinitions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionManager.html#MESL_SqlRace_Domain_Functions_IFunctionManager_FunctionDefinitions",
          "edge": false
        }
      ]
    },
    {
      "id": "FunctionDefinition",
      "uid": "MESL.SqlRace.Domain.Functions.IFunctionDefinition",
      "category": "functions",
      "blurb": "A calculated channel's definition: code, inputs and output.",
      "doc": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html",
      "example": "/developer-resources/atlas/sql-race/examples/functions/",
      "methods": [
        {
          "name": "SetInstanceIdentifier",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_SetInstanceIdentifier_System_Guid_",
          "edge": false
        }
      ],
      "properties": [
        {
          "name": "CalculateOverWholeSession",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_CalculateOverWholeSession",
          "edge": false
        },
        {
          "name": "CalculationModeInfoDefinition",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_CalculationModeInfoDefinition",
          "edge": false
        },
        {
          "name": "ExecutionStrategyDefinition",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_ExecutionStrategyDefinition",
          "edge": false
        },
        {
          "name": "FullFilePath",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_FullFilePath",
          "edge": false
        },
        {
          "name": "FunctionFolder",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_FunctionFolder",
          "edge": false
        },
        {
          "name": "FunctionMode",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_FunctionMode",
          "edge": false
        },
        {
          "name": "ImplementationDefinition",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_ImplementationDefinition",
          "edge": false
        },
        {
          "name": "InputParameterIdentifiers",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_InputParameterIdentifiers",
          "edge": false
        },
        {
          "name": "InstanceIdentifier",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_InstanceIdentifier",
          "edge": false
        },
        {
          "name": "InterpolateBetweenSamples",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_InterpolateBetweenSamples",
          "edge": false
        },
        {
          "name": "JoinGapsAroundNull",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_JoinGapsAroundNull",
          "edge": false
        },
        {
          "name": "Name",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_Name",
          "edge": false
        },
        {
          "name": "OutputParameterDefinitions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_OutputParameterDefinitions",
          "edge": false
        },
        {
          "name": "ProcessorInstanceDefinitions",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_ProcessorInstanceDefinitions",
          "edge": false
        },
        {
          "name": "RelativePath",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_RelativePath",
          "edge": false
        },
        {
          "name": "ShouldHide",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_ShouldHide",
          "edge": false
        },
        {
          "name": "ShouldPersist",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_ShouldPersist",
          "edge": false
        },
        {
          "name": "StoreInSession",
          "href": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/MESL.SqlRace.Domain.Functions.IFunctionDefinition.html#MESL_SqlRace_Domain_Functions_IFunctionDefinition_StoreInSession",
          "edge": false
        }
      ]
    }
  ],
  "edges": [
    {
      "source": "SessionManager",
      "target": "IClientSession",
      "label": "CreateSession",
      "kind": "call"
    },
    {
      "source": "SessionManager",
      "target": "IClientSession",
      "label": "Load",
      "kind": "call"
    },
    {
      "source": "SessionManager",
      "target": "CompositeSession",
      "label": "CreateCompositeSession",
      "kind": "call"
    },
    {
      "source": "SessionManager",
      "target": "SessionKey",
      "label": "CreateSession",
      "kind": "uses"
    },
    {
      "source": "IClientSession",
      "target": "Session",
      "label": "Session",
      "kind": "nav"
    },
    {
      "source": "Session",
      "target": "ConfigurationSet",
      "label": "CreateConfiguration",
      "kind": "call"
    },
    {
      "source": "ConfigurationSetManager",
      "target": "ConfigurationSet",
      "label": "Create",
      "kind": "call"
    },
    {
      "source": "ConfigurationSet",
      "target": "Channel",
      "label": "AddChannel",
      "kind": "call"
    },
    {
      "source": "ConfigurationSet",
      "target": "Parameter",
      "label": "AddParameter",
      "kind": "call"
    },
    {
      "source": "ConfigurationSet",
      "target": "RationalConversion",
      "label": "AddConversion",
      "kind": "call"
    },
    {
      "source": "ConfigurationSet",
      "target": "ParameterGroup",
      "label": "AddParameterGroup",
      "kind": "call"
    },
    {
      "source": "ConfigurationSet",
      "target": "ApplicationGroup",
      "label": "AddGroup",
      "kind": "call"
    },
    {
      "source": "Session",
      "target": "ParameterDataAccess",
      "label": "CreateParameterDataAccess",
      "kind": "call"
    },
    {
      "source": "Session",
      "target": "Lap",
      "label": "LapCollection",
      "kind": "nav"
    },
    {
      "source": "Session",
      "target": "Marker",
      "label": "Markers",
      "kind": "nav"
    },
    {
      "source": "Session",
      "target": "Event",
      "label": "Events",
      "kind": "nav"
    },
    {
      "source": "Session",
      "target": "EventDefinition",
      "label": "EventDefinitions",
      "kind": "nav"
    },
    {
      "source": "Session",
      "target": "Parameter",
      "label": "Parameters",
      "kind": "nav"
    },
    {
      "source": "Session",
      "target": "Channel",
      "label": "AddChannelData",
      "kind": "write"
    },
    {
      "source": "Session",
      "target": "Channel",
      "label": "AddSynchroChannelData",
      "kind": "write"
    },
    {
      "source": "ParameterDataAccess",
      "target": "ParameterValues",
      "label": "GetNextData",
      "kind": "call"
    },
    {
      "source": "ParameterDataAccess",
      "target": "ParameterValues",
      "label": "GetNextSamples",
      "kind": "call"
    },
    {
      "source": "ParameterDataAccess",
      "target": "Statistics",
      "label": "GetLapStatistics",
      "kind": "call"
    },
    {
      "source": "FunctionManagerFactory",
      "target": "FunctionManager",
      "label": "Create",
      "kind": "call"
    },
    {
      "source": "FunctionManager",
      "target": "FunctionDefinition",
      "label": "CreateFunctionDefinition",
      "kind": "call"
    }
  ],
  "docBase": "https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/"
};
