# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [Protos/system_monitor_common.proto](#Protos_system_monitor_common-proto)
    - [AppParametersFileRequest](#system_monitor_common-AppParametersFileRequest)
    - [AppParametersRequest](#system_monitor_common-AppParametersRequest)
    - [AppRequest](#system_monitor_common-AppRequest)
    - [ConversionRequest](#system_monitor_common-ConversionRequest)
    - [FileRequest](#system_monitor_common-FileRequest)
    - [ParameterRequest](#system_monitor_common-ParameterRequest)
    - [ParametersFileRequest](#system_monitor_common-ParametersFileRequest)
    - [ParametersRequest](#system_monitor_common-ParametersRequest)
    - [Return](#system_monitor_common-Return)
  
    - [BufferType](#system_monitor_common-BufferType)
    - [ByteOrder](#system_monitor_common-ByteOrder)
    - [ConversionType](#system_monitor_common-ConversionType)
    - [DataType](#system_monitor_common-DataType)
    - [ErrorCode](#system_monitor_common-ErrorCode)
    - [ErrorStatus](#system_monitor_common-ErrorStatus)
    - [EventPriority](#system_monitor_common-EventPriority)
    - [FileType](#system_monitor_common-FileType)
    - [LoggingType](#system_monitor_common-LoggingType)
    - [ParameterType](#system_monitor_common-ParameterType)
    - [Reason](#system_monitor_common-Reason)
    - [TriggerOperator](#system_monitor_common-TriggerOperator)
    - [TriggerType](#system_monitor_common-TriggerType)
  
- [Protos/system_monitor_logging.proto](#Protos_system_monitor_logging-proto)
    - [AddParameterRequest](#system_monitor_logging-AddParameterRequest)
    - [AddVirtualParameterRequest](#system_monitor_logging-AddVirtualParameterRequest)
    - [ChannelProperties](#system_monitor_logging-ChannelProperties)
    - [ChannelPropertiesReply](#system_monitor_logging-ChannelPropertiesReply)
    - [ChannelRequest](#system_monitor_logging-ChannelRequest)
    - [ClearRequest](#system_monitor_logging-ClearRequest)
    - [ConfigReply](#system_monitor_logging-ConfigReply)
    - [DownloadProgressReply](#system_monitor_logging-DownloadProgressReply)
    - [DownloadReply](#system_monitor_logging-DownloadReply)
    - [DownloadRequest](#system_monitor_logging-DownloadRequest)
    - [GetSessionDetailReply](#system_monitor_logging-GetSessionDetailReply)
    - [GetSessionDetailRequest](#system_monitor_logging-GetSessionDetailRequest)
    - [LoggingChannelValue](#system_monitor_logging-LoggingChannelValue)
    - [LoggingDurationReply](#system_monitor_logging-LoggingDurationReply)
    - [LoggingOffsetReply](#system_monitor_logging-LoggingOffsetReply)
    - [LoggingOffsetRequest](#system_monitor_logging-LoggingOffsetRequest)
    - [LoggingParameter](#system_monitor_logging-LoggingParameter)
    - [LoggingParametersReply](#system_monitor_logging-LoggingParametersReply)
    - [SetSessionDetailRequest](#system_monitor_logging-SetSessionDetailRequest)
    - [SlotCountReply](#system_monitor_logging-SlotCountReply)
    - [SlotPercentageReply](#system_monitor_logging-SlotPercentageReply)
    - [Trigger](#system_monitor_logging-Trigger)
    - [TriggerCondition](#system_monitor_logging-TriggerCondition)
    - [TriggerRequest](#system_monitor_logging-TriggerRequest)
    - [TriggersReply](#system_monitor_logging-TriggersReply)
    - [WrapReply](#system_monitor_logging-WrapReply)
    - [WrapRequest](#system_monitor_logging-WrapRequest)
  
    - [SystemMonitorLogging](#system_monitor_logging-SystemMonitorLogging)
  
- [Protos/system_monitor_parameter.proto](#Protos_system_monitor_parameter-proto)
    - [AddressReply](#system_monitor_parameter-AddressReply)
    - [AppArray1dParameterValuesRequest](#system_monitor_parameter-AppArray1dParameterValuesRequest)
    - [AppArray2dParameterValuesRequest](#system_monitor_parameter-AppArray2dParameterValuesRequest)
    - [AppParameterValuesRequest](#system_monitor_parameter-AppParameterValuesRequest)
    - [AppStringParameterValuesRequest](#system_monitor_parameter-AppStringParameterValuesRequest)
    - [AppTypeRequest](#system_monitor_parameter-AppTypeRequest)
    - [Array1dParameterErrorsReply](#system_monitor_parameter-Array1dParameterErrorsReply)
    - [Array1dParameterSetValue](#system_monitor_parameter-Array1dParameterSetValue)
    - [Array1dParameterValue](#system_monitor_parameter-Array1dParameterValue)
    - [Array1dValueReply](#system_monitor_parameter-Array1dValueReply)
    - [Array1dValues](#system_monitor_parameter-Array1dValues)
    - [Array2dParameterErrorsReply](#system_monitor_parameter-Array2dParameterErrorsReply)
    - [Array2dParameterSetValue](#system_monitor_parameter-Array2dParameterSetValue)
    - [Array2dParameterValue](#system_monitor_parameter-Array2dParameterValue)
    - [Array2dValueReply](#system_monitor_parameter-Array2dValueReply)
    - [Array2dValues](#system_monitor_parameter-Array2dValues)
    - [AxisParametersReply](#system_monitor_parameter-AxisParametersReply)
    - [BitMaskReply](#system_monitor_parameter-BitMaskReply)
    - [BitShiftReply](#system_monitor_parameter-BitShiftReply)
    - [ByteOrderReply](#system_monitor_parameter-ByteOrderReply)
    - [CANParameterProperties](#system_monitor_parameter-CANParameterProperties)
    - [CANParameterPropertiesReply](#system_monitor_parameter-CANParameterPropertiesReply)
    - [Conversion](#system_monitor_parameter-Conversion)
    - [ConversionListReply](#system_monitor_parameter-ConversionListReply)
    - [ConversionNoAppRequest](#system_monitor_parameter-ConversionNoAppRequest)
    - [ConversionTypeReply](#system_monitor_parameter-ConversionTypeReply)
    - [ExternalParameterRequest](#system_monitor_parameter-ExternalParameterRequest)
    - [ExternalReply](#system_monitor_parameter-ExternalReply)
    - [ExternalRequest](#system_monitor_parameter-ExternalRequest)
    - [FormulaConversionReply](#system_monitor_parameter-FormulaConversionReply)
    - [FormulaConversionRequest](#system_monitor_parameter-FormulaConversionRequest)
    - [LoggableReply](#system_monitor_parameter-LoggableReply)
    - [MapPropertiesReply](#system_monitor_parameter-MapPropertiesReply)
    - [OffsetReply](#system_monitor_parameter-OffsetReply)
    - [OffsetRequest](#system_monitor_parameter-OffsetRequest)
    - [Parameter](#system_monitor_parameter-Parameter)
    - [ParameterErrorsReply](#system_monitor_parameter-ParameterErrorsReply)
    - [ParameterGroup](#system_monitor_parameter-ParameterGroup)
    - [ParameterGroupsReply](#system_monitor_parameter-ParameterGroupsReply)
    - [ParameterListReply](#system_monitor_parameter-ParameterListReply)
    - [ParameterProperties](#system_monitor_parameter-ParameterProperties)
    - [ParameterPropertiesReply](#system_monitor_parameter-ParameterPropertiesReply)
    - [ParameterSetValue](#system_monitor_parameter-ParameterSetValue)
    - [ParameterTypeRequest](#system_monitor_parameter-ParameterTypeRequest)
    - [ParameterValue](#system_monitor_parameter-ParameterValue)
    - [ParametersReply](#system_monitor_parameter-ParametersReply)
    - [RationalConversionReply](#system_monitor_parameter-RationalConversionReply)
    - [RationalConversionRequest](#system_monitor_parameter-RationalConversionRequest)
    - [RowDetailsReply](#system_monitor_parameter-RowDetailsReply)
    - [RowValues](#system_monitor_parameter-RowValues)
    - [StringParameterErrorsReply](#system_monitor_parameter-StringParameterErrorsReply)
    - [StringParameterSetValue](#system_monitor_parameter-StringParameterSetValue)
    - [StringParameterValue](#system_monitor_parameter-StringParameterValue)
    - [StringValueReply](#system_monitor_parameter-StringValueReply)
    - [TableConversion](#system_monitor_parameter-TableConversion)
    - [TableConversionReply](#system_monitor_parameter-TableConversionReply)
    - [TableConversionRequest](#system_monitor_parameter-TableConversionRequest)
    - [TextConversion](#system_monitor_parameter-TextConversion)
    - [TextConversionReply](#system_monitor_parameter-TextConversionReply)
    - [TextConversionRequest](#system_monitor_parameter-TextConversionRequest)
    - [TypeRequest](#system_monitor_parameter-TypeRequest)
    - [UndoRequest](#system_monitor_parameter-UndoRequest)
    - [ValueReply](#system_monitor_parameter-ValueReply)
    - [WarningLimitsReply](#system_monitor_parameter-WarningLimitsReply)
    - [WarningLimitsRequest](#system_monitor_parameter-WarningLimitsRequest)
  
    - [SystemMonitorParameter](#system_monitor_parameter-SystemMonitorParameter)
  
- [Protos/system_monitor_project.proto](#Protos_system_monitor_project-proto)
    - [ActiveAppReply](#system_monitor_project-ActiveAppReply)
    - [AppFileRequest](#system_monitor_project-AppFileRequest)
    - [AppReply](#system_monitor_project-AppReply)
    - [Application](#system_monitor_project-Application)
    - [CANMergeRequest](#system_monitor_project-CANMergeRequest)
    - [CANRequest](#system_monitor_project-CANRequest)
    - [CompareAppReply](#system_monitor_project-CompareAppReply)
    - [CompareAppRequest](#system_monitor_project-CompareAppRequest)
    - [CompareParameter](#system_monitor_project-CompareParameter)
    - [DTVModifiedReply](#system_monitor_project-DTVModifiedReply)
    - [DTVSaveCopyRequest](#system_monitor_project-DTVSaveCopyRequest)
    - [DTVSaveIncrementRequest](#system_monitor_project-DTVSaveIncrementRequest)
    - [DTVSaveRequest](#system_monitor_project-DTVSaveRequest)
    - [DTVSavedOnReply](#system_monitor_project-DTVSavedOnReply)
    - [DetailsRequest](#system_monitor_project-DetailsRequest)
    - [EnableRequest](#system_monitor_project-EnableRequest)
    - [ErrorDefinition](#system_monitor_project-ErrorDefinition)
    - [ErrorDefinitionsReply](#system_monitor_project-ErrorDefinitionsReply)
    - [ErrorInstance](#system_monitor_project-ErrorInstance)
    - [ErrorReply](#system_monitor_project-ErrorReply)
    - [Event](#system_monitor_project-Event)
    - [EventReply](#system_monitor_project-EventReply)
    - [EventRequest](#system_monitor_project-EventRequest)
    - [EventsReply](#system_monitor_project-EventsReply)
    - [ExistsReply](#system_monitor_project-ExistsReply)
    - [ExistsRequest](#system_monitor_project-ExistsRequest)
    - [FileDetailsReply](#system_monitor_project-FileDetailsReply)
    - [FileNameRequest](#system_monitor_project-FileNameRequest)
    - [FileNewRequest](#system_monitor_project-FileNewRequest)
    - [FileOpenRequest](#system_monitor_project-FileOpenRequest)
    - [FileReply](#system_monitor_project-FileReply)
    - [FileSaveRequest](#system_monitor_project-FileSaveRequest)
    - [GetAppDetailsReply](#system_monitor_project-GetAppDetailsReply)
    - [GetBuildNumberReply](#system_monitor_project-GetBuildNumberReply)
    - [GetVersionNumberReply](#system_monitor_project-GetVersionNumberReply)
    - [MatlabDTVRequest](#system_monitor_project-MatlabDTVRequest)
    - [MatlabRequest](#system_monitor_project-MatlabRequest)
    - [MatlabSelectedRequest](#system_monitor_project-MatlabSelectedRequest)
    - [MultiAppReply](#system_monitor_project-MultiAppReply)
    - [MultiAppRequest](#system_monitor_project-MultiAppRequest)
    - [PGVIDReply](#system_monitor_project-PGVIDReply)
    - [ParameterIdRequest](#system_monitor_project-ParameterIdRequest)
    - [ProjectCloseRequest](#system_monitor_project-ProjectCloseRequest)
    - [ProjectCreateRequest](#system_monitor_project-ProjectCreateRequest)
    - [ProjectExportRequest](#system_monitor_project-ProjectExportRequest)
    - [ProjectImportRequest](#system_monitor_project-ProjectImportRequest)
    - [ProjectSaveAsRequest](#system_monitor_project-ProjectSaveAsRequest)
    - [ProjectSaveRequest](#system_monitor_project-ProjectSaveRequest)
    - [ReasonCode](#system_monitor_project-ReasonCode)
    - [ReprogramRequest](#system_monitor_project-ReprogramRequest)
    - [SensorRequest](#system_monitor_project-SensorRequest)
    - [SlotActiveRequest](#system_monitor_project-SlotActiveRequest)
    - [SlotReply](#system_monitor_project-SlotReply)
    - [SlotRequest](#system_monitor_project-SlotRequest)
    - [SyncedReply](#system_monitor_project-SyncedReply)
  
    - [SystemMonitorProject](#system_monitor_project-SystemMonitorProject)
  
- [Protos/system_monitor_system.proto](#Protos_system_monitor_system-proto)
    - [BatchModeRequest](#system_monitor_system-BatchModeRequest)
    - [CreatePGVReply](#system_monitor_system-CreatePGVReply)
    - [CreatePGVRequest](#system_monitor_system-CreatePGVRequest)
    - [DeviceProperties](#system_monitor_system-DeviceProperties)
    - [DevicePropertiesReply](#system_monitor_system-DevicePropertiesReply)
    - [FolderReply](#system_monitor_system-FolderReply)
    - [LicenceDetailsReply](#system_monitor_system-LicenceDetailsReply)
    - [LiveLoggingReply](#system_monitor_system-LiveLoggingReply)
    - [LiveLoggingRequest](#system_monitor_system-LiveLoggingRequest)
    - [LiveUpdateRequest](#system_monitor_system-LiveUpdateRequest)
    - [MultiApplicationBaseInfo](#system_monitor_system-MultiApplicationBaseInfo)
    - [MultiApplicationBasesReply](#system_monitor_system-MultiApplicationBasesReply)
    - [MultiApplicationBasesRequest](#system_monitor_system-MultiApplicationBasesRequest)
    - [OnlineRequest](#system_monitor_system-OnlineRequest)
    - [SendMessageReply](#system_monitor_system-SendMessageReply)
    - [SendMessageRequest](#system_monitor_system-SendMessageRequest)
    - [StatusReply](#system_monitor_system-StatusReply)
    - [UnitByIndexRequest](#system_monitor_system-UnitByIndexRequest)
    - [UnitByIndexTypeRequest](#system_monitor_system-UnitByIndexTypeRequest)
    - [UnitInfo](#system_monitor_system-UnitInfo)
    - [UnitListReply](#system_monitor_system-UnitListReply)
    - [UnitNameReply](#system_monitor_system-UnitNameReply)
  
    - [LinkStatus](#system_monitor_system-LinkStatus)
  
    - [SystemMonitorSystem](#system_monitor_system-SystemMonitorSystem)
  
- [Protos/system_monitor_virtual.proto](#Protos_system_monitor_virtual-proto)
    - [AddGroupRequest](#system_monitor_virtual-AddGroupRequest)
    - [VirtualExportRequest](#system_monitor_virtual-VirtualExportRequest)
    - [VirtualGroupReply](#system_monitor_virtual-VirtualGroupReply)
    - [VirtualGroupRequest](#system_monitor_virtual-VirtualGroupRequest)
    - [VirtualGroupsReply](#system_monitor_virtual-VirtualGroupsReply)
    - [VirtualParameter](#system_monitor_virtual-VirtualParameter)
    - [VirtualParameterDataTypeRequest](#system_monitor_virtual-VirtualParameterDataTypeRequest)
    - [VirtualParameterProperties](#system_monitor_virtual-VirtualParameterProperties)
    - [VirtualParameterPropertiesReply](#system_monitor_virtual-VirtualParameterPropertiesReply)
    - [VirtualParameterRequest](#system_monitor_virtual-VirtualParameterRequest)
    - [VirtualReply](#system_monitor_virtual-VirtualReply)
    - [VirtualsRequest](#system_monitor_virtual-VirtualsRequest)
  
    - [SystemMonitorVirtual](#system_monitor_virtual-SystemMonitorVirtual)
  
- [Scalar Value Types](#scalar-value-types)



<a name="Protos_system_monitor_common-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## Protos/system_monitor_common.proto



<a name="system_monitor_common-AppParametersFileRequest"></a>

### AppParametersFileRequest
System Monitor Application Parameters File Request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application identifier |
| parameter_ids | [string](#string) | repeated | Parameter identifiers. |
| file_path | [string](#string) |  | File path. |






<a name="system_monitor_common-AppParametersRequest"></a>

### AppParametersRequest
System Monitor Application Parameters Request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application Id. 0 for all applications including Virtual and CAN. |
| parameter_ids | [string](#string) | repeated | Parameter identifiers. |






<a name="system_monitor_common-AppRequest"></a>

### AppRequest
System Monitor App Request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application id. |






<a name="system_monitor_common-ConversionRequest"></a>

### ConversionRequest
System Monitor Conversion Request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application id. |
| conversion_id | [string](#string) |  | Conversion id. |






<a name="system_monitor_common-FileRequest"></a>

### FileRequest
System Monitor File Request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_path | [string](#string) |  | File path. |






<a name="system_monitor_common-ParameterRequest"></a>

### ParameterRequest
System Monitor Parameter Request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application id. |
| parameter_id | [string](#string) |  | Parameter id. |






<a name="system_monitor_common-ParametersFileRequest"></a>

### ParametersFileRequest
System Monitor Parameters File Request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_ids | [string](#string) | repeated | Parameter identifiers. |
| file_path | [string](#string) |  | File path. |






<a name="system_monitor_common-ParametersRequest"></a>

### ParametersRequest
System Monitor Parameters Request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_ids | [string](#string) | repeated | Identifiers of parameters to request |






<a name="system_monitor_common-Return"></a>

### Return
System Monitor Return Message


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| return_code | [ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |





 


<a name="system_monitor_common-BufferType"></a>

### BufferType
System Monitor Buffer Types

| Name | Number | Description |
| ---- | ------ | ----------- |
| unit_buffer | 0 | Data Changes in Unit. |
| edit_buffer | 1 | Data Changes in Edit Buffer. |
| unit_and_edit_buffer | 2 | Data Changes in Unit &amp; Edit Buffer. |



<a name="system_monitor_common-ByteOrder"></a>

### ByteOrder
System Monitor Byte Orders

| Name | Number | Description |
| ---- | ------ | ----------- |
| msb_first | 0 | Most significant bit first |
| msb_last | 1 | Most significant bit last |



<a name="system_monitor_common-ConversionType"></a>

### ConversionType
System Monitor Conversion Types

| Name | Number | Description |
| ---- | ------ | ----------- |
| rational | 0 | Rational conversion |
| table | 1 | Table conversion |
| text | 2 | Text conversion |
| formula | 3 | Formula conversion |



<a name="system_monitor_common-DataType"></a>

### DataType
System Monitor Data Types

| Name | Number | Description |
| ---- | ------ | ----------- |
| ubyte | 0 | Unsigned byte |
| byte | 1 | Signed Byte |
| uword | 2 | Unsigned word |
| word | 3 | Signed word |
| ulong | 4 | Unsigned long |
| long | 5 | Signed long |
| float | 6 | Float |
| unknown | 7 | Unknown |
| qword | 8 | Quad word |
| sqword | 9 | Signed quad word |
| double | 10 | Double |



<a name="system_monitor_common-ErrorCode"></a>

### ErrorCode
System Monitor Error Codes

| Name | Number | Description |
| ---- | ------ | ----------- |
| no_error | 0 | No error, function successful |
| no_project | -1 | No project loaded in SM-V7 |
| no_licence | -2 | No licence for requested function |
| non_specific | -3 | Non-specific error |
| data_version_mismatch | -4 | Data version mismatch |
| no_data_version | -5 | No data version loaded |
| no_program_version | -6 | No program version loaded |
| no_ECU | -7 | No ECU connected |
| invalid_file | -8 | Invalid file specified |
| no_application | -9 | The open project does not cover the specified application |
| application_inactive | -10 | Application must be active in order to support this operation |
| live_updates_on | -11 | Operation not allowed while live updates are on |
| TAGtronic_onlu | -12 | This command only valid for TAGtronic systems. |
| SM_busy | -13 | SM cannot accept API calls at the moment (might be in critical operation). |
| message_argument_mismatch | -20 | Type mismatch in argument of SendMessage , expected array of WORDs passed by reference |
| message_dimension_mismatch | -21 | Array dimension mismatch in argument of SendMessage, expected a 1-dimensional array |
| message_lower_bound_non_zero | -22 | Lower bound of argument of SendMessage call was not 0 |
| bounds_error | -23 | Unexpected error getting bounds of SendMessage argument |
| message_argument_error | -24 | Error in ReplyMessage argument |
| message_argument_invalid | -25 | Error in SendMessage argument |
| fdl_not_parsed | -26 | Virtual Parameter contains invalid FDL. |
| conversion_invalid | -27 | Conversion for Parameter does not exist/is invalid. |
| parameter_invalid | -28 | Parameter name does not exist/is invalid. |
| parameter_override_not_allowed | -29 | Parameter exists and not allowed to override. |
| bad_state | -30 | Request cannot be actioned as incorrect SM state. |
| invalid_command | -31 | Command passed to SM is not valid. |
| no_data_present | -32 | Missing document or similar |
| bad_memory_allocation | -33 | Memory allocation failed |
| partially_complete | -34 | Operation only partially complete. Example: ClearRemoteParams left Parameters used in trigger conditions. |
| document_full | -35 | Indicates the current document (config) is full. |
| parameter_identifier_already_exists | -36 | Parameter Identifier already exists in another application. |
| parameter_read_only | -37 | Parameter is read-only - write access denied. |
| parameter_non_live_tuneable | -38 | Parameter is non-live tuneable - write access denied. |
| group_not_found | -39 | Requested group is not found |
| file_requires_saving | -40 | Previous virtual parameters file has been modified and not saved |
| frequency_overridden | -41 | No customer base found for the project being opened |
| no_customer_base | -42 | Requested parameter not found |
| parameter_not_found | -100 | Specified parameter does not exist in current program version |
| error_read_only | -101 | Tried to set a read only parameter |
| error_limits | -102 | Tried to set a parameter outside its limits |
| error_monotony | -103 | Axis monotony restrictions not adhered to |
| error_axis_pt | -104 | Tried to get or set parameter or axis value at invalid breakpoint |
| error_address | -105 | Parameter had invalid address |
| error_non_num | -106 | String containing non numeric characters supplied to set function |
| error_size | -107 | Exceeded specified size or array or string parameter |
| error_live_tune | -108 | Live tune enabled, failed to update value in ECU |
| error_intp | -109 | Tried to get interpolated value but no input quantity or axis points |
| error_activelayer | -110 | No active live auto tune &#34;layer&#34; (group) |
| error_tolerance | -111 | Operating point is outside breakpoint tolerances (e.g. for live auto tune) |
| error_axis_change | -112 | Number of axis breakpoints has changed between program versions |
| error_no_live_tune | -113 | Parameter is not modifiable in live tune area (warning only, not error) |
| error_validation | -114 | The attempt to validate the value in the unit failed (not the same as the value being invalid) |
| error_live_tune_data_invalid | -115 | The live tune data is invalid |
| error_serial_not_found | -116 | Serial number not found for sensor channel |
| error_unknown | -117 | An unknown error |
| error_cancel | -118 | Attempt to set value cancelled (by user or because of invalid input) |
| error_locked_param | -119 | Access denied, parameter locked by RDA |
| error_value_not_matching_entry | -120 | Value set does not match value in the unit |
| detail_unknown | -200 | Session detail does not exist |
| dump_row_data_failed | -201 | Failed to dump row data |
| live_update_failed | -300 | Failed to enter live tune |
| online_failed | -301 | Failed to go online |
| download_data_failed | -302 | Failed to download data |
| system_not_running | -303 | System monitor is only running in OLE mode, hence can&#39;t perform requested action |
| parameter_locked | -304 | Attempt to access a locked parameter |
| comms_base | -1000 | Communications base error |



<a name="system_monitor_common-ErrorStatus"></a>

### ErrorStatus
System Monitor Error Statuses

| Name | Number | Description |
| ---- | ------ | ----------- |
| status_unknown | 0 | Unknown error status. |
| status_current | 1 | Current error status. |
| status_logged | 2 | Logged error status. |



<a name="system_monitor_common-EventPriority"></a>

### EventPriority
System Monitor Event Priority

| Name | Number | Description |
| ---- | ------ | ----------- |
| event_high | 0 | High priority event. |
| event_medium | 1 | Medium priority event. |
| event_low | 2 | Low priority event. |
| event_debug | 3 | Debug event. |



<a name="system_monitor_common-FileType"></a>

### FileType
System Monitor File Types

| Name | Number | Description |
| ---- | ------ | ----------- |
| Project | 0 | Project file |
| PGV | 1 | Program version file |
| DTV | 2 | Data version file |
| desktop | 3 | Desktop file |
| logging_config | 4 | Logging config file |
| virtuals | 5 | Virtual parameter file |
| CAN | 6 | Can parameter file |
| live_logging | 7 | Live logging configuration file |
| pot_board | 8 | Pot board file |



<a name="system_monitor_common-LoggingType"></a>

### LoggingType
System Monitor Logging Types

| Name | Number | Description |
| ---- | ------ | ----------- |
| frequency | 0 | Frequency value |
| cylinder | 1 | Engine segment (cylinder) |
| cycle | 2 | Cycle (wValue not used). |
| unknown_logging | 3 | Unknown |
| edge | 4 | Edge |



<a name="system_monitor_common-ParameterType"></a>

### ParameterType
System Monitor Parameter Types

| Name | Number | Description |
| ---- | ------ | ----------- |
| undefined | 0 | Undefined parameter type |
| scalar | 1 | Scalar parameter |
| axis_1 | 2 | Axis 1 parameter |
| axis_2 | 4 | Axis 2 parameter |
| array | 16 | Array parameter |
| string | 32 | String parameter |
| ecu | 128 | Ecu parameter |
| can | 256 | Can parameter |
| tsb | 512 | TAG Sensor Bus parameter |
| virtual | 1024 | Virtual parameter |
| axis | 196608 | Axis parameter |
| input | 268435456 | Input parameter |
| measurement | 268437376 | Measurement parameter |



<a name="system_monitor_common-Reason"></a>

### Reason
System Monitor Reasons

| Name | Number | Description |
| ---- | ------ | ----------- |
| none | 0 | No difference. |
| absent | 1 | Not present in program version of the candidate. |
| different | 2 | Major difference that prevents merge. |
| equal | 4 | Same data type, size and value. |
| different_value | 8 | Same data type, size, units, diff value. |
| different_size | 16 | Same data type, different size (maps only). |
| different_conv | 32 | Different display format conversion. |
| different_units | 64 | Different units. |
| different_type | 128 | Different data type. |
| different_comment | 256 | Different comment. |
| different_def_value | 512 | Different default value. |
| absent_master | 1024 | Not present in program version of the edit buffer. |
| locked | 268435456 | Locked. |



<a name="system_monitor_common-TriggerOperator"></a>

### TriggerOperator
System Monitor Trigger Operators

| Name | Number | Description |
| ---- | ------ | ----------- |
| equals | 0 | Equals. |
| less_than | 1 | Less than. |
| greater_than | 2 | Greater than. |
| not_equal_to | 3 | Not equal to. |
| greater_than_or_equal | 4 | Greater than or equal to. |
| less_than_or_equal | 5 | Less than or equal to. |



<a name="system_monitor_common-TriggerType"></a>

### TriggerType
System Monitor Trigger Types

| Name | Number | Description |
| ---- | ------ | ----------- |
| on_data | 0 | On Data (with parameter) |
| driver_push | 1 | Driver push (not supported) |
| ignition_on | 2 | Ignition On |
| lap_trigger | 3 | Lap trigger |
| no_condition | 4 | No condition |
| external_trigger | 5 | External trigger |


 

 

 



<a name="Protos_system_monitor_logging-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## Protos/system_monitor_logging.proto



<a name="system_monitor_logging-AddParameterRequest"></a>

### AddParameterRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application Id |
| parameter_id | [string](#string) |  | Unique parameter identifier |
| logging_rate | [LoggingChannelValue](#system_monitor_logging-LoggingChannelValue) | repeated | Logging channel values |






<a name="system_monitor_logging-AddVirtualParameterRequest"></a>

### AddVirtualParameterRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Unique parameter identifier |
| logging_rate | [LoggingChannelValue](#system_monitor_logging-LoggingChannelValue) | repeated | The logging channel value |






<a name="system_monitor_logging-ChannelProperties"></a>

### ChannelProperties



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  | The __1__ based channel index to modify |
| name | [string](#string) |  | Name of the channel |
| log_logging | [bool](#bool) |  | Retrieves the Log to Unit flag |
| log_telemetry | [bool](#bool) |  | Retrieves the telemetry flag |
| logging_rate | [double](#double) |  | The channel logging rate |
| telemetry_rate | [double](#double) |  | The telemetry logging rate |
| trigger_rearm | [bool](#bool) |  | Trigger re-arms after stop condition |
| slot | [uint32](#uint32) |  | Retrieves the slot position of the configuration defining the channel |






<a name="system_monitor_logging-ChannelPropertiesReply"></a>

### ChannelPropertiesReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| channels | [ChannelProperties](#system_monitor_logging-ChannelProperties) | repeated | The logging channel properties |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_logging-ChannelRequest"></a>

### ChannelRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  | The 0 based channel index to modify |
| name | [string](#string) |  | Name of the channel |
| log_to_unit | [bool](#bool) |  | Retrieves the Log to Unit flag |
| log_telemetry | [bool](#bool) |  | Retrieves the telemetry flag |
| trigger_rearm | [bool](#bool) |  | Trigger re-arms after stop condition |






<a name="system_monitor_logging-ClearRequest"></a>

### ClearRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| remove_triggers | [bool](#bool) |  | Request System Monitor removes all parameters, including those used by triggers |






<a name="system_monitor_logging-ConfigReply"></a>

### ConfigReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| config_name | [string](#string) |  | Name of the ECU logging configuration |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_logging-DownloadProgressReply"></a>

### DownloadProgressReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| in_progress | [bool](#bool) |  | Indicates whether a download is in progress |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_logging-DownloadReply"></a>

### DownloadReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| optional_value | [string](#string) |  | Indicates whether the logging configuration download is complete |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_logging-DownloadRequest"></a>

### DownloadRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| optional_app_id | [uint32](#uint32) |  | Application id |
| optional_parameter_id | [string](#string) |  | Unique identifier of logging configuration parameter |
| optional_delay_ms | [uint32](#uint32) |  | Read delay in ms before retrieving parameter value allowing ECU configuration processing time |






<a name="system_monitor_logging-GetSessionDetailReply"></a>

### GetSessionDetailReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | Name of session detail |
| value | [string](#string) |  | Value of session detail |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_logging-GetSessionDetailRequest"></a>

### GetSessionDetailRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | Name of session detail |






<a name="system_monitor_logging-LoggingChannelValue"></a>

### LoggingChannelValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| channel_id | [uint32](#uint32) |  | Channel id |
| type | [system_monitor_common.LoggingType](#system_monitor_common-LoggingType) |  | Logging type |
| value | [uint32](#uint32) |  | Logging channel value |






<a name="system_monitor_logging-LoggingDurationReply"></a>

### LoggingDurationReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| estimated_time | [google.protobuf.Duration](#google-protobuf-Duration) |  | Estimated time available in recording memory |
| estimated_laps | [double](#double) |  | Estimated laps available in recording memory. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_logging-LoggingOffsetReply"></a>

### LoggingOffsetReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| offset | [uint32](#uint32) |  | The current logging offset |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_logging-LoggingOffsetRequest"></a>

### LoggingOffsetRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| offset | [uint32](#uint32) |  | The logging offset |






<a name="system_monitor_logging-LoggingParameter"></a>

### LoggingParameter



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application id |
| parameter_id | [string](#string) |  | Parameter id |
| parameter_name | [string](#string) |  | Parameter name |
| parameter_description | [string](#string) |  | Parameter description |
| data_size | [uint32](#uint32) |  | Size of data |
| values | [LoggingChannelValue](#system_monitor_logging-LoggingChannelValue) | repeated | Logging channel values |
| slot | [uint32](#uint32) |  | Slot position of configuration defining the parameter |






<a name="system_monitor_logging-LoggingParametersReply"></a>

### LoggingParametersReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [LoggingParameter](#system_monitor_logging-LoggingParameter) | repeated | The logging parameters |
| channel_names | [string](#string) | repeated | The channel names |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_logging-SetSessionDetailRequest"></a>

### SetSessionDetailRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | Name of session detail |
| value | [string](#string) |  | New value for session detail |






<a name="system_monitor_logging-SlotCountReply"></a>

### SlotCountReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slot_count | [uint32](#uint32) |  | Number of available slots |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_logging-SlotPercentageReply"></a>

### SlotPercentageReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application id |
| parameter_id | [string](#string) |  | Parameter id |
| slot_percentage | [double](#double) |  | The current percentage |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_logging-Trigger"></a>

### Trigger



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  | The 0 based channel index to retrieve |
| start_conditions | [TriggerCondition](#system_monitor_logging-TriggerCondition) | repeated | The trigger start conditions |
| stop_conditions | [TriggerCondition](#system_monitor_logging-TriggerCondition) | repeated | The trigger start conditions |
| start_post_trigger | [int32](#int32) |  | Retrieves the delay for the start trigger |
| stop_post_trigger | [int32](#int32) |  | Retrieves the delay for the stop trigger |
| slot | [uint32](#uint32) |  | Retrieves the slot position of the configuration defining the channel |






<a name="system_monitor_logging-TriggerCondition"></a>

### TriggerCondition



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  | Specifies which condition index (0 &lt;= n &lt; 6), where the first 3 are start conditions, and the later, stop conditions |
| type | [system_monitor_common.TriggerType](#system_monitor_common-TriggerType) |  | Retrieves the trigger condition type |
| parameter_id | [string](#string) |  | Retrieves the parameter used in &gt; On Data = condition type. If any |
| app_id | [uint32](#uint32) |  | Retrieves the application ID, that the pszParamName belongs to |
| operator | [system_monitor_common.TriggerOperator](#system_monitor_common-TriggerOperator) |  | Retrieves the condition operator of the &gt; On Data = type |
| threshold | [double](#double) |  | Retrieves the floating point number to compare in condition against specified parameter for type &gt; On Data = |
| repeat_count | [uint32](#uint32) |  | Retrieves the number of times a condition should occur before it is considered true |






<a name="system_monitor_logging-TriggerRequest"></a>

### TriggerRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  | The 0 based channel index to set |
| start_conditions | [TriggerCondition](#system_monitor_logging-TriggerCondition) | repeated | The trigger start conditions |
| stop_conditions | [TriggerCondition](#system_monitor_logging-TriggerCondition) | repeated | The trigger end conditions |
| start_post_trigger | [int32](#int32) |  | The delay for the start trigger |
| stop_post_trigger | [int32](#int32) |  | The delay for the stop trigger |






<a name="system_monitor_logging-TriggersReply"></a>

### TriggersReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| triggers | [Trigger](#system_monitor_logging-Trigger) | repeated | The available triggers |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_logging-WrapReply"></a>

### WrapReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| wrap | [bool](#bool) |  | Required wrapping memory strategy |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_logging-WrapRequest"></a>

### WrapRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| wrap | [bool](#bool) |  | Required wrapping memory strategy |





 

 

 


<a name="system_monitor_logging-SystemMonitorLogging"></a>

### SystemMonitorLogging


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetLoggingChannelProperties | [.google.protobuf.Empty](#google-protobuf-Empty) | [ChannelPropertiesReply](#system_monitor_logging-ChannelPropertiesReply) | Gets the properties of the available logging channels |
| SetLoggingChannelProperties | [ChannelRequest](#system_monitor_logging-ChannelRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Alters the properties of any given Remote Logging channel. (COM: SetRemoteChannelProperties) |
| GetLoggingTriggers | [.google.protobuf.Empty](#google-protobuf-Empty) | [TriggersReply](#system_monitor_logging-TriggersReply) | Retrieves the properties of all channel trigger settings |
| SetLoggingTrigger | [TriggerRequest](#system_monitor_logging-TriggerRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Modify or create a given channel&#39;s trigger condition |
| GetLoggingWrap | [.google.protobuf.Empty](#google-protobuf-Empty) | [WrapReply](#system_monitor_logging-WrapReply) | Gets the remote logging config memory wrapping strategy |
| SetLoggingWrap | [WrapRequest](#system_monitor_logging-WrapRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Sets the remote logging config memory wrapping strategy |
| GetLoggingOffset | [.google.protobuf.Empty](#google-protobuf-Empty) | [LoggingOffsetReply](#system_monitor_logging-LoggingOffsetReply) | Gets the remote logging config offset |
| SetLoggingOffset | [LoggingOffsetRequest](#system_monitor_logging-LoggingOffsetRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Sets the remote logging config offset |
| GetLoggingSessionDetails | [GetSessionDetailRequest](#system_monitor_logging-GetSessionDetailRequest) | [GetSessionDetailReply](#system_monitor_logging-GetSessionDetailReply) | Returns the current value of a specified session detail from the remote logging configuration |
| SetLoggingSessionDetails | [SetSessionDetailRequest](#system_monitor_logging-SetSessionDetailRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Sets a specified session detail in the remote logging configuration |
| GetLoggingDuration | [.google.protobuf.Empty](#google-protobuf-Empty) | [LoggingDurationReply](#system_monitor_logging-LoggingDurationReply) | Get the estimated length in time and number of laps available for recording in the remote logging config |
| GetLoggingParameterDetails | [.google.protobuf.Empty](#google-protobuf-Empty) | [LoggingParametersReply](#system_monitor_logging-LoggingParametersReply) | Gets the remote logging parameter details from the config |
| LoggingConfigDownloadInProgress | [.google.protobuf.Empty](#google-protobuf-Empty) | [DownloadProgressReply](#system_monitor_logging-DownloadProgressReply) | Gets whether a logging config download is in progress |
| LoggingConfigDownload | [DownloadRequest](#system_monitor_logging-DownloadRequest) | [DownloadReply](#system_monitor_logging-DownloadReply) | Downloads the remote logging configuration to the ECU then reads the given measurement value to ensure configuration write is complete |
| LoggingConfigUpload | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) | Uploads the remote logging configuration from the ECU |
| RemoveLoggingParameter | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Remove a parameter from the Remote Logging Configuration |
| ClearAllLoggingParameters | [ClearRequest](#system_monitor_logging-ClearRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Removes all the parameters from the remote logging config except those used by triggers If the caller specifies a forceful removal all parameters will be removed and any &gt;On Data= trigger conditions will be reset |
| GetLoggingSlotsUsed | [.google.protobuf.Empty](#google-protobuf-Empty) | [SlotCountReply](#system_monitor_logging-SlotCountReply) | Gets the number of logging slots |
| GetLoggingSlotPercentage | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [SlotPercentageReply](#system_monitor_logging-SlotPercentageReply) | Gets the percentage of a logging slot used by a parameter |
| GetECULoggingConfig | [.google.protobuf.Empty](#google-protobuf-Empty) | [ConfigReply](#system_monitor_logging-ConfigReply) | Gets the logging configuration from the ECU |
| AddLoggingParameter | [AddParameterRequest](#system_monitor_logging-AddParameterRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Adds a parameter to the Remote Logging Configuration |
| AddVirtualLoggingParameter | [AddVirtualParameterRequest](#system_monitor_logging-AddVirtualParameterRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Adds a virtual parameter to the Remote Logging Configuration |

 



<a name="Protos_system_monitor_parameter-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## Protos/system_monitor_parameter.proto



<a name="system_monitor_parameter-AddressReply"></a>

### AddressReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application. |
| parameter_id | [string](#string) |  | Id of the parameter. |
| address | [uint32](#uint32) |  | Parameter address. |
| ident | [uint32](#uint32) |  | Ident returned. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-AppArray1dParameterValuesRequest"></a>

### AppArray1dParameterValuesRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application. |
| parameters | [Array1dParameterSetValue](#system_monitor_parameter-Array1dParameterSetValue) | repeated | Parameter values to set. |






<a name="system_monitor_parameter-AppArray2dParameterValuesRequest"></a>

### AppArray2dParameterValuesRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application. |
| parameters | [Array2dParameterSetValue](#system_monitor_parameter-Array2dParameterSetValue) | repeated | Parameter values to set. |






<a name="system_monitor_parameter-AppParameterValuesRequest"></a>

### AppParameterValuesRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application. |
| parameters | [ParameterSetValue](#system_monitor_parameter-ParameterSetValue) | repeated | Parameter values to set. |






<a name="system_monitor_parameter-AppStringParameterValuesRequest"></a>

### AppStringParameterValuesRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application. |
| parameters | [StringParameterSetValue](#system_monitor_parameter-StringParameterSetValue) | repeated | Parameter values to set. |






<a name="system_monitor_parameter-AppTypeRequest"></a>

### AppTypeRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application |
| data_type | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) |  | Optional: Use ParameterType.Undefined for ALL |






<a name="system_monitor_parameter-Array1dParameterErrorsReply"></a>

### Array1dParameterErrorsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [Array1dParameterValue](#system_monitor_parameter-Array1dParameterValue) | repeated | Parameter values. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-Array1dParameterSetValue"></a>

### Array1dParameterSetValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Id of the parameter. |
| values | [double](#double) | repeated | Values for the parameter array. |






<a name="system_monitor_parameter-Array1dParameterValue"></a>

### Array1dParameterValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Id of the parameter. |
| values | [double](#double) | repeated | Values for the parameter array. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-Array1dValueReply"></a>

### Array1dValueReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| values | [Array1dValues](#system_monitor_parameter-Array1dValues) | repeated | 1d Array parameter values. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-Array1dValues"></a>

### Array1dValues



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Id of the parameter. |
| values | [double](#double) | repeated | Values for the parameter array. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-Array2dParameterErrorsReply"></a>

### Array2dParameterErrorsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [Array2dParameterValue](#system_monitor_parameter-Array2dParameterValue) | repeated | Parameter values. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-Array2dParameterSetValue"></a>

### Array2dParameterSetValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Id of the parameter. |
| rows | [RowValues](#system_monitor_parameter-RowValues) | repeated | Values for the parameter array. |






<a name="system_monitor_parameter-Array2dParameterValue"></a>

### Array2dParameterValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Id of the parameter. |
| rows | [RowValues](#system_monitor_parameter-RowValues) | repeated | Values for the parameter array. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-Array2dValueReply"></a>

### Array2dValueReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| values | [Array2dValues](#system_monitor_parameter-Array2dValues) | repeated | 2d Array parameter values. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-Array2dValues"></a>

### Array2dValues



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Id of the parameter. |
| rows | [RowValues](#system_monitor_parameter-RowValues) | repeated | Values for the row. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-AxisParametersReply"></a>

### AxisParametersReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_ids | [string](#string) | repeated | Parameter identifiers. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-BitMaskReply"></a>

### BitMaskReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application. |
| parameter_id | [string](#string) |  | Id of the parameter. |
| mask | [int32](#int32) |  | Parameter bit mask. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-BitShiftReply"></a>

### BitShiftReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application. |
| parameter_id | [string](#string) |  | Id of the parameter. |
| shift | [int32](#int32) |  | Parameter bit shift. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-ByteOrderReply"></a>

### ByteOrderReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application. |
| parameter_id | [string](#string) |  | Id of the parameter. |
| byte_order | [system_monitor_common.ByteOrder](#system_monitor_common-ByteOrder) |  | Byte order. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-CANParameterProperties"></a>

### CANParameterProperties



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| Id | [string](#string) |  | The unique identifier of the CAN Parameter |
| name | [string](#string) |  | The display name of the parameter |
| description | [string](#string) |  | The description of the parameter |
| lower_display_limit | [double](#double) |  | The minimum display value |
| upper_display_limit | [double](#double) |  | The maximum display value |
| min_logging_rate | [uint32](#uint32) |  | The minimum logging rate |
| scaling_factor | [uint32](#uint32) |  | The parameter scaling factor (see see EScalingUnit). |
| min_not_defined | [bool](#bool) |  | State of the min/max values. |
| conversion_id | [string](#string) |  | Unique identifier of the conversion rule used in this parameter. |
| rx | [bool](#bool) |  | Flag to indicate Rx / Tx status of the parameter |
| data_type | [system_monitor_common.DataType](#system_monitor_common-DataType) |  | Parameter data type |
| can_bus | [string](#string) |  | CAN Bus name. |
| can_message | [string](#string) |  | CAN Message name. |
| can_start_bit | [uint32](#uint32) |  | CAN parameter start bit. |
| can_bit_length | [uint32](#uint32) |  | CAN parameter bit length. |
| can_gain | [double](#double) |  | CAN parameter gain value. |
| can_offset | [double](#double) |  | CAN parameter offset value. |
| can_mux_id | [string](#string) |  | CAN parameter multiplexer id. Blank if parameter is not in a multiplexed message. |
| can_byte_order | [system_monitor_common.ByteOrder](#system_monitor_common-ByteOrder) |  | CAN parameter byte order. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-CANParameterPropertiesReply"></a>

### CANParameterPropertiesReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [CANParameterProperties](#system_monitor_parameter-CANParameterProperties) | repeated | The CAN parameter properties. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-Conversion"></a>

### Conversion



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Id of the conversion. |
| type | [system_monitor_common.ConversionType](#system_monitor_common-ConversionType) |  | Type of the conversion. |






<a name="system_monitor_parameter-ConversionListReply"></a>

### ConversionListReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversions | [Conversion](#system_monitor_parameter-Conversion) | repeated | The conversions. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-ConversionNoAppRequest"></a>

### ConversionNoAppRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  | Id of the conversion. |






<a name="system_monitor_parameter-ConversionTypeReply"></a>

### ConversionTypeReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  | Id of the conversion. |
| type | [system_monitor_common.ConversionType](#system_monitor_common-ConversionType) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-ExternalParameterRequest"></a>

### ExternalParameterRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Id of the parameter. |






<a name="system_monitor_parameter-ExternalReply"></a>

### ExternalReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Id of the parameter. |
| gain | [double](#double) |  | Gain. |
| offset | [double](#double) |  | Offset. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-ExternalRequest"></a>

### ExternalRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Id of the parameter. |
| gain | [double](#double) |  | Gain. |
| offset | [double](#double) |  | Offset. |






<a name="system_monitor_parameter-FormulaConversionReply"></a>

### FormulaConversionReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  | Unique identifier of conversion. |
| comment | [string](#string) |  | Human readable description. |
| format | [string](#string) |  | Format string (e.g. %1.3f). |
| units | [string](#string) |  | Unit value for output. |
| formula | [string](#string) |  | Formula value. |
| inverse | [string](#string) |  | Inverse value. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-FormulaConversionRequest"></a>

### FormulaConversionRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  | Unique identifier of conversion. |
| comment | [string](#string) |  | Human readable description. |
| format | [string](#string) |  | Format string (e.g. %1.3f). |
| units | [string](#string) |  | Unit value for output. |
| formula | [string](#string) |  | Formula value. |
| inverse | [string](#string) |  | Inverse value. |
| overwrite | [bool](#bool) |  | Specifies to overwrite existing values. |






<a name="system_monitor_parameter-LoggableReply"></a>

### LoggableReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application. |
| parameter_id | [string](#string) |  | Id of the parameter. |
| loggable | [bool](#bool) |  | Whether the parameter is loggable. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-MapPropertiesReply"></a>

### MapPropertiesReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application. |
| parameter_id | [string](#string) |  | Id of the parameter. |
| x_axis_id | [string](#string) |  | Identifier of the x axis parameter |
| y_axis_id | [string](#string) |  | Identifier of the y axis parameter |
| x_points | [uint32](#uint32) |  | Number on breakpoints in the x axis. |
| y_points | [uint32](#uint32) |  | Number on breakpoints in the y axis. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-OffsetReply"></a>

### OffsetReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application. |
| parameter_id | [string](#string) |  | Id of the parameter. |
| offset | [double](#double) |  | Parameter offset. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-OffsetRequest"></a>

### OffsetRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application. |
| parameter_id | [string](#string) |  | Id of the parameter. |
| offset | [double](#double) |  | Parameter offset. |






<a name="system_monitor_parameter-Parameter"></a>

### Parameter



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Id of the parameter. |
| name | [string](#string) |  | Name of the parameter. |






<a name="system_monitor_parameter-ParameterErrorsReply"></a>

### ParameterErrorsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [ParameterValue](#system_monitor_parameter-ParameterValue) | repeated | Parameter values |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-ParameterGroup"></a>

### ParameterGroup



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Id of the parameter group. |
| group | [string](#string) |  | Name of the parameter group. |






<a name="system_monitor_parameter-ParameterGroupsReply"></a>

### ParameterGroupsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [ParameterGroup](#system_monitor_parameter-ParameterGroup) | repeated | The parameter groups. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-ParameterListReply"></a>

### ParameterListReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [Parameter](#system_monitor_parameter-Parameter) | repeated | The parameters. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-ParameterProperties"></a>

### ParameterProperties



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| Id | [string](#string) |  | Id of the parameter |
| name | [string](#string) |  | Name of the parameter. |
| description | [string](#string) |  | Description of the parameter. |
| type | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) |  | Type of the parameter. |
| units | [string](#string) |  | Units of the parameter. |
| format | [string](#string) |  | Format used to display the parameter&#39;s values. |
| conversion_id | [string](#string) |  | Id of the conversion rule for the parameter. |
| groups | [string](#string) | repeated | Names of the groups the parameter belongs to. |
| data_type | [system_monitor_common.DataType](#system_monitor_common-DataType) |  | Data type of the parameter. |
| data_size | [uint32](#uint32) |  | Size of the parameter data. |
| lower_engineering_limit | [double](#double) |  | Lower engineering limit. |
| upper_engineering_limit | [double](#double) |  | Upper engineering limit. |
| max_logging_rate | [uint32](#uint32) |  | Maximum logging rate. |
| prime | [bool](#bool) |  | Whether the parameter is marked as a Prime parameter. |
| read_only | [bool](#bool) |  | Whether the parameter is readonly. |
| tuneable | [bool](#bool) |  | Whether the parameter is tuneable. |
| multiplexed_ids | [string](#string) | repeated | Array of parameter multiplexer ids. Blank if parameter is not in a multiplexed message |






<a name="system_monitor_parameter-ParameterPropertiesReply"></a>

### ParameterPropertiesReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [ParameterProperties](#system_monitor_parameter-ParameterProperties) | repeated | The parameter properties. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-ParameterSetValue"></a>

### ParameterSetValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Id of the parameter. |
| value | [double](#double) |  | Value of the parameter. |






<a name="system_monitor_parameter-ParameterTypeRequest"></a>

### ParameterTypeRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application |
| parameter_id | [string](#string) |  | Id of the parameter. |
| data_type | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) |  | Data type of the parameter. |






<a name="system_monitor_parameter-ParameterValue"></a>

### ParameterValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Id of the parameter. |
| value | [double](#double) |  | Value of the parameter. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-ParametersReply"></a>

### ParametersReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_ids | [string](#string) | repeated | Ids of the parameters. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-RationalConversionReply"></a>

### RationalConversionReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  | Unique identifier of conversion. |
| coefficient1 | [double](#double) |  | Coefficient value 1. |
| coefficient2 | [double](#double) |  | Coefficient value 2. |
| coefficient3 | [double](#double) |  | Coefficient value 3. |
| coefficient4 | [double](#double) |  | Coefficient value 4. |
| coefficient5 | [double](#double) |  | Coefficient value 5. |
| coefficient6 | [double](#double) |  | Coefficient value 6. |
| comment | [string](#string) |  | Human readable description. |
| format | [string](#string) |  | Format string (e.g. %1.3f). |
| units | [string](#string) |  | Unit value for output. |
| default | [string](#string) |  | Default value. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-RationalConversionRequest"></a>

### RationalConversionRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  | Unique identifier of conversion. |
| coefficient1 | [double](#double) |  | Coefficient value 1. |
| coefficient2 | [double](#double) |  | Coefficient value 2. |
| coefficient3 | [double](#double) |  | Coefficient value 3. |
| coefficient4 | [double](#double) |  | Coefficient value 4. |
| coefficient5 | [double](#double) |  | Coefficient value 5. |
| coefficient6 | [double](#double) |  | Coefficient value 6. |
| comment | [string](#string) |  | Human readable description. |
| format | [string](#string) |  | Format string (e.g. %1.3f). |
| units | [string](#string) |  | Unit value for output. |
| default | [string](#string) |  | Default value. |
| overwrite | [bool](#bool) |  | Specifies to overwrite existing values. |






<a name="system_monitor_parameter-RowDetailsReply"></a>

### RowDetailsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| row_id | [uint32](#uint32) |  | Row identifier |
| ident_offset | [int32](#int32) |  | Parameter ident offset |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-RowValues"></a>

### RowValues



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| values | [double](#double) | repeated | Values for the row. |






<a name="system_monitor_parameter-StringParameterErrorsReply"></a>

### StringParameterErrorsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [StringParameterValue](#system_monitor_parameter-StringParameterValue) | repeated | Parameter values. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-StringParameterSetValue"></a>

### StringParameterSetValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Id of the parameter. |
| value | [string](#string) |  | Value of the parameter. |






<a name="system_monitor_parameter-StringParameterValue"></a>

### StringParameterValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Id of the parameter. |
| value | [string](#string) |  | Value of the parameter. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-StringValueReply"></a>

### StringValueReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| values | [StringParameterValue](#system_monitor_parameter-StringParameterValue) | repeated | String parameter values. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-TableConversion"></a>

### TableConversion



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| raw | [double](#double) |  | Raw numeric value. |
| mapped | [double](#double) |  | Mapped numeric value. |






<a name="system_monitor_parameter-TableConversionReply"></a>

### TableConversionReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  | Unique identifier of conversion. |
| comment | [string](#string) |  | Human readable description. |
| format | [string](#string) |  | Format string (e.g. %1.3f). |
| units | [string](#string) |  | Unit value for output. |
| default | [string](#string) |  | Default value. |
| interpolate | [bool](#bool) |  | Specifies interpolation on or off. |
| values | [TableConversion](#system_monitor_parameter-TableConversion) | repeated | Table conversion values. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-TableConversionRequest"></a>

### TableConversionRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  | Unique identifier of conversion. |
| comment | [string](#string) |  | Human readable description. |
| format | [string](#string) |  | Format string (e.g. %1.3f). |
| units | [string](#string) |  | Unit value for output. |
| default | [string](#string) |  | Default value. |
| interpolate | [bool](#bool) |  | Specifies interpolation on or off. |
| values | [TableConversion](#system_monitor_parameter-TableConversion) | repeated |  |
| overwrite | [bool](#bool) |  | Specifies to overwrite existing values. |






<a name="system_monitor_parameter-TextConversion"></a>

### TextConversion



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| raw | [double](#double) |  | Raw numeric value. |
| mapped | [string](#string) |  | Mapped text value. |






<a name="system_monitor_parameter-TextConversionReply"></a>

### TextConversionReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  | Unique identifier of conversion. |
| format | [string](#string) |  | Format string (e.g. %1.3f). |
| units | [string](#string) |  | Unit value for output. |
| default | [string](#string) |  | Default value. |
| values | [TextConversion](#system_monitor_parameter-TextConversion) | repeated | Text conversion values. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-TextConversionRequest"></a>

### TextConversionRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  | Unique identifier of conversion. |
| format | [string](#string) |  | Format string (e.g. %1.3f). |
| units | [string](#string) |  | Unit value for output. |
| default | [string](#string) |  | Default value. |
| values | [TextConversion](#system_monitor_parameter-TextConversion) | repeated | Text conversion values. |
| overwrite | [bool](#bool) |  | Specifies to overwrite existing values. |






<a name="system_monitor_parameter-TypeRequest"></a>

### TypeRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_type | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) |  | Parameter data type. |






<a name="system_monitor_parameter-UndoRequest"></a>

### UndoRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| buffer_type | [system_monitor_common.BufferType](#system_monitor_common-BufferType) |  | Buffer type. |






<a name="system_monitor_parameter-ValueReply"></a>

### ValueReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| values | [ParameterValue](#system_monitor_parameter-ParameterValue) | repeated | Numeric parameter values. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-WarningLimitsReply"></a>

### WarningLimitsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application. |
| parameter_id | [string](#string) |  | Id of the parameter. |
| low | [double](#double) |  | Lower limit. |
| high | [double](#double) |  | Upper limit. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_parameter-WarningLimitsRequest"></a>

### WarningLimitsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Id of the application. |
| parameter_id | [string](#string) |  | Id of the parameter. |
| low | [double](#double) |  | Lower limit. |
| high | [double](#double) |  | Upper limit. |





 

 

 


<a name="system_monitor_parameter-SystemMonitorParameter"></a>

### SystemMonitorParameter


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetParameters | [AppTypeRequest](#system_monitor_parameter-AppTypeRequest) | [ParameterListReply](#system_monitor_parameter-ParameterListReply) | Gets parameters. AppId not required for CAN and Virtual parameters |
| GetConversions | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [ConversionListReply](#system_monitor_parameter-ConversionListReply) | Gets parameter conversion rules. |
| GetParameterAndGroups | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [ParameterGroupsReply](#system_monitor_parameter-ParameterGroupsReply) | Gets parameters and groups |
| GetParameterProperties | [AppTypeRequest](#system_monitor_parameter-AppTypeRequest) | [ParameterPropertiesReply](#system_monitor_parameter-ParameterPropertiesReply) | Gets parameter properties |
| GetCANParameterProperties | [.system_monitor_common.ParametersRequest](#system_monitor_common-ParametersRequest) | [CANParameterPropertiesReply](#system_monitor_parameter-CANParameterPropertiesReply) | Gets CAN Parameter properties. |
| GetMapProperties | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [MapPropertiesReply](#system_monitor_parameter-MapPropertiesReply) | Gets map properties. |
| GetRowDetails | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [RowDetailsReply](#system_monitor_parameter-RowDetailsReply) | Gets row details. |
| GetParameterBitMask | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [BitMaskReply](#system_monitor_parameter-BitMaskReply) | Gets a parameter bit mask. |
| GetParameterBitShift | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [BitShiftReply](#system_monitor_parameter-BitShiftReply) | Gets a parameter bit shift. |
| GetParameterAddress | [ParameterTypeRequest](#system_monitor_parameter-ParameterTypeRequest) | [AddressReply](#system_monitor_parameter-AddressReply) | Gets a parameter address. |
| GetParameterByteOrder | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [ByteOrderReply](#system_monitor_parameter-ByteOrderReply) | Gets a parameter byte order value. |
| ParameterLoggable | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [LoggableReply](#system_monitor_parameter-LoggableReply) | Gets whether a parameter is loggable. |
| GetExternalInputGainOffset | [ExternalParameterRequest](#system_monitor_parameter-ExternalParameterRequest) | [ExternalReply](#system_monitor_parameter-ExternalReply) | Gets an input gain/offset for an external parameter. |
| SetExternalInputGainOffset | [ExternalRequest](#system_monitor_parameter-ExternalRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Sets an input gain/offset for an external parameter. |
| GetModifiedParameters | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [ParameterListReply](#system_monitor_parameter-ParameterListReply) | Gets the modified parameters in a selected application |
| GetParameterWarningLimits | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [WarningLimitsReply](#system_monitor_parameter-WarningLimitsReply) | Gets the warning limits from a parameter. |
| SetParameterWarningLimits | [WarningLimitsRequest](#system_monitor_parameter-WarningLimitsRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Sets the warning limits for a parameter. |
| DeleteMinMax | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) | Deletes min/max values. |
| ExportInputSignals | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Exports input signals to a file. |
| ImportInputSignals | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Imports input signals from a file. |
| RegenerateInputSignalParameters | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) | Regenerate Input Signal parameters from RAW values. |
| UndoDataChanges | [UndoRequest](#system_monitor_parameter-UndoRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Reset all tune buffers on the unit and/or in the edit buffer. |
| RestoreValue | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Restore a parameter value its to original saved value. |
| GetAxisParameterFromMap | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [AxisParametersReply](#system_monitor_parameter-AxisParametersReply) | Retrieves a list of axis parameter(s) used by the map parameter in the application. |
| GetConversionUse | [.system_monitor_common.ConversionRequest](#system_monitor_common-ConversionRequest) | [ParametersReply](#system_monitor_parameter-ParametersReply) | Returns a list of all parameters using the specified conversion in the application. |
| GetConversionType | [ConversionNoAppRequest](#system_monitor_parameter-ConversionNoAppRequest) | [ConversionTypeReply](#system_monitor_parameter-ConversionTypeReply) | Returns the type of the specified conversion rule. |
| GetRationalConversion | [ConversionNoAppRequest](#system_monitor_parameter-ConversionNoAppRequest) | [RationalConversionReply](#system_monitor_parameter-RationalConversionReply) | Retrieves a selected Rational Conversion |
| GetTableConversion | [ConversionNoAppRequest](#system_monitor_parameter-ConversionNoAppRequest) | [TableConversionReply](#system_monitor_parameter-TableConversionReply) | Retrieve a specified Table Conversion rule. |
| GetTextConversion | [ConversionNoAppRequest](#system_monitor_parameter-ConversionNoAppRequest) | [TextConversionReply](#system_monitor_parameter-TextConversionReply) | Retrieves enumeration values and text from conversion parameters. |
| GetFormulaConversion | [ConversionNoAppRequest](#system_monitor_parameter-ConversionNoAppRequest) | [FormulaConversionReply](#system_monitor_parameter-FormulaConversionReply) | Retrieves a selected Formula (Free) Conversion |
| GetAppRationalConversion | [.system_monitor_common.ConversionRequest](#system_monitor_common-ConversionRequest) | [RationalConversionReply](#system_monitor_parameter-RationalConversionReply) | Retrieves the details from a Rational Conversion Rule. |
| GetAppTableConversion | [.system_monitor_common.ConversionRequest](#system_monitor_common-ConversionRequest) | [TableConversionReply](#system_monitor_parameter-TableConversionReply) | Retrieve the details from a Table Conversion rule. |
| SetRationalConversion | [RationalConversionRequest](#system_monitor_parameter-RationalConversionRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Create or modify a Rational Conversion rule. |
| SetTableConversion | [TableConversionRequest](#system_monitor_parameter-TableConversionRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Create or modify a Table Conversion rule. |
| SetTextConversion | [TextConversionRequest](#system_monitor_parameter-TextConversionRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Create or modify a text conversion rule. |
| SetFormulaConversion | [FormulaConversionRequest](#system_monitor_parameter-FormulaConversionRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Create or modify a Formula (Free) Conversion rule. |
| GetValueOffset | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [OffsetReply](#system_monitor_parameter-OffsetReply) | Retrieve the live value offset for a parameter. |
| SetValueOffset | [OffsetRequest](#system_monitor_parameter-OffsetRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Sets the live value offset for a parameter. |
| ZeroLiveValue | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Zero&#39;s the live value by applying an offset to a measurement parameter. |
| GetValueMeasurement | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [ValueReply](#system_monitor_parameter-ValueReply) | Returns the current value of a specified measurement parameter. |
| GetValueScalar | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [ValueReply](#system_monitor_parameter-ValueReply) | Returns the current value of a specified scalar (VALUE) editable parameter. |
| GetValue1AxisMap | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [Array1dValueReply](#system_monitor_parameter-Array1dValueReply) | Returns the current values of a specified 1-axis map (CURVE) editable parameter at all axis points. |
| GetValue2AxisMap | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [Array2dValueReply](#system_monitor_parameter-Array2dValueReply) | Returns the current values of a specified 2-axis map (MAP) editable parameter at all axis points. |
| GetValueAxis | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [Array1dValueReply](#system_monitor_parameter-Array1dValueReply) | Returns the current values of a specified axis (AXIS_PTS) editable parameter at all axis points. |
| GetValueArray | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [Array1dValueReply](#system_monitor_parameter-Array1dValueReply) | Returns the current values of a specified array (VAL_BLK) editable (characteristic) parameter at all index positions. |
| GetValueString | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [StringValueReply](#system_monitor_parameter-StringValueReply) | Returns the current value of a specified string editable parameter |
| GetValueCAN | [.system_monitor_common.ParametersRequest](#system_monitor_common-ParametersRequest) | [ValueReply](#system_monitor_parameter-ValueReply) | Retrieves the value of the specified can parameter. |
| GetValueVirtual | [.system_monitor_common.ParametersRequest](#system_monitor_common-ParametersRequest) | [ValueReply](#system_monitor_parameter-ValueReply) | Retrieve a selected Virtual Parameter. |
| GetDTVValueScalar | [.system_monitor_common.ParametersFileRequest](#system_monitor_common-ParametersFileRequest) | [ValueReply](#system_monitor_parameter-ValueReply) | Returns the value of a specified scalar (VALUE) editable parameter from the supplied DTV. |
| GetDTVValue1AxisMap | [.system_monitor_common.ParametersFileRequest](#system_monitor_common-ParametersFileRequest) | [Array1dValueReply](#system_monitor_parameter-Array1dValueReply) | Returns the values of a specified 1-axis map (CURVE) editable parameter at all axis points from the supplied DTV. |
| GetDTVValue2AxisMap | [.system_monitor_common.ParametersFileRequest](#system_monitor_common-ParametersFileRequest) | [Array2dValueReply](#system_monitor_parameter-Array2dValueReply) | Returns the values of a specified 2-axis map (MAP) editable parameter at all axis points from the supplied DTV. |
| GetDTVValueAxis | [.system_monitor_common.ParametersFileRequest](#system_monitor_common-ParametersFileRequest) | [Array1dValueReply](#system_monitor_parameter-Array1dValueReply) | Returns the values of a specified axis (AXIS_PTS) editable parameter at all axis points from the supplied DTV. |
| GetDTVValueArray | [.system_monitor_common.ParametersFileRequest](#system_monitor_common-ParametersFileRequest) | [Array1dValueReply](#system_monitor_parameter-Array1dValueReply) | Returns the values of a specified array (VAL_BLK) editable (characteristic) parameter at all index positions from the supplied DTV. |
| GetDTVValueString | [.system_monitor_common.ParametersFileRequest](#system_monitor_common-ParametersFileRequest) | [StringValueReply](#system_monitor_parameter-StringValueReply) | Returns the value of a specified string editable parameter from the supplied DTV. |
| SetValueScalar | [AppParameterValuesRequest](#system_monitor_parameter-AppParameterValuesRequest) | [ParameterErrorsReply](#system_monitor_parameter-ParameterErrorsReply) | Sets the current value of a specified scalar (VALUE) editable parameter. |
| SetValue1AxisMap | [AppArray1dParameterValuesRequest](#system_monitor_parameter-AppArray1dParameterValuesRequest) | [Array1dParameterErrorsReply](#system_monitor_parameter-Array1dParameterErrorsReply) | Sets the current value of a specified 1-axis map (CURVE) editable parameter at one or more axis points. |
| SetValue2AxisMap | [AppArray2dParameterValuesRequest](#system_monitor_parameter-AppArray2dParameterValuesRequest) | [Array2dParameterErrorsReply](#system_monitor_parameter-Array2dParameterErrorsReply) | Sets the current value of a specified 2-axis map (MAP) editable parameter at one or more axis points. |
| SetValueAxis | [AppArray1dParameterValuesRequest](#system_monitor_parameter-AppArray1dParameterValuesRequest) | [Array1dParameterErrorsReply](#system_monitor_parameter-Array1dParameterErrorsReply) | Sets the current value of a specified axis (AXIS_PTS) editable parameter at one or more axis points. |
| SetValueArray | [AppArray1dParameterValuesRequest](#system_monitor_parameter-AppArray1dParameterValuesRequest) | [Array1dParameterErrorsReply](#system_monitor_parameter-Array1dParameterErrorsReply) | Sets the current value of a specified array (VAL_BLK) parameter at one or more index positions. |
| SetValueString | [AppStringParameterValuesRequest](#system_monitor_parameter-AppStringParameterValuesRequest) | [StringParameterErrorsReply](#system_monitor_parameter-StringParameterErrorsReply) | Sets the current value of a specified string editable parameter. |

 



<a name="Protos_system_monitor_project-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## Protos/system_monitor_project.proto



<a name="system_monitor_project-ActiveAppReply"></a>

### ActiveAppReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_ids | [uint32](#uint32) | repeated | Application ids |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-AppFileRequest"></a>

### AppFileRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application id. |
| file_path | [string](#string) |  | File path. |






<a name="system_monitor_project-AppReply"></a>

### AppReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| text | [string](#string) |  | Return text value. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-Application"></a>

### Application



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application Id. |
| app_name | [string](#string) |  | Application name. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-CANMergeRequest"></a>

### CANMergeRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  | Bus Index. |
| file_path | [string](#string) |  | Name and path of .csv. |
| merge | [bool](#bool) |  | Merge with existing messages. |






<a name="system_monitor_project-CANRequest"></a>

### CANRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  | Bus Index |
| file_path | [string](#string) |  | Name and path of CAN .csv file. |






<a name="system_monitor_project-CompareAppReply"></a>

### CompareAppReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [CompareParameter](#system_monitor_project-CompareParameter) | repeated | The compared parameter information. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-CompareAppRequest"></a>

### CompareAppRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application id. |
| dtv1_path | [string](#string) |  | Filename and full path of the first DTV to compare against (.dtv). |
| dtv2_path | [string](#string) |  | Filename and full path of the second DTV to compare against (.dtv). |






<a name="system_monitor_project-CompareParameter"></a>

### CompareParameter



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Parameter id. |
| type | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) |  | Parameter type. |
| reason1 | [ReasonCode](#system_monitor_project-ReasonCode) |  | Reason codes for difference between the parameter in the application in memory and the first DTV supplied. |
| reason2 | [ReasonCode](#system_monitor_project-ReasonCode) |  | Reason codes for difference between the parameter in the application in memory and the second DTV supplied. |






<a name="system_monitor_project-DTVModifiedReply"></a>

### DTVModifiedReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| modified | [bool](#bool) |  | Whether the DTV is modified. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-DTVSaveCopyRequest"></a>

### DTVSaveCopyRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application Id. |
| save_path | [string](#string) |  | Filename and full path. |
| comment | [string](#string) |  | Prefix to existing comment. |
| notes | [string](#string) |  | Prefix to existing notes. |
| consortium | [string](#string) |  | Consortium name to save data version to. Consortium Id in the DTV will be saved with the supplied value if licence permissions allow, otherwise error code -2 is returned. Set to &#34;Disabled&#34; to remove team security and unlock file. |






<a name="system_monitor_project-DTVSaveIncrementRequest"></a>

### DTVSaveIncrementRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application Id. |
| comment | [string](#string) |  | Prefix to existing comment. |
| notes | [string](#string) |  | Prefix to existing notes. |






<a name="system_monitor_project-DTVSaveRequest"></a>

### DTVSaveRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application Id. |
| save_path | [string](#string) |  | Filename and full path. |
| comment | [string](#string) |  | Prefix to existing comment. |
| notes | [string](#string) |  | Prefix to existing notes. |






<a name="system_monitor_project-DTVSavedOnReply"></a>

### DTVSavedOnReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| saved_on | [string](#string) |  | Timestamp the DTV was saved at. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-DetailsRequest"></a>

### DetailsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application Id. |
| text | [string](#string) |  | Data Version Notes or Comments |






<a name="system_monitor_project-EnableRequest"></a>

### EnableRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| enable | [bool](#bool) |  | True to enable, false to disable. |






<a name="system_monitor_project-ErrorDefinition"></a>

### ErrorDefinition



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Error definition id. |
| name | [string](#string) |  | Error definition name. |
| description | [string](#string) |  | Error definition description. |
| group | [string](#string) |  | Error definition group. |
| bit_number | [uint32](#uint32) |  | Error definition bit number. |
| current | [string](#string) |  | Error definition current parameter identifier. |
| logged | [string](#string) |  | Error definition logged parameter identifier. |






<a name="system_monitor_project-ErrorDefinitionsReply"></a>

### ErrorDefinitionsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error_definitions | [ErrorDefinition](#system_monitor_project-ErrorDefinition) | repeated | The error definitions. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-ErrorInstance"></a>

### ErrorInstance



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | Error identifier. |
| description | [string](#string) |  | Error description. |
| status | [system_monitor_common.ErrorStatus](#system_monitor_common-ErrorStatus) |  | Error status level. |






<a name="system_monitor_project-ErrorReply"></a>

### ErrorReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error_instances | [ErrorInstance](#system_monitor_project-ErrorInstance) | repeated | The active errors |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-Event"></a>

### Event



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [uint32](#uint32) |  | Event id. |
| name | [string](#string) |  | Event name. |
| priority | [system_monitor_common.EventPriority](#system_monitor_common-EventPriority) |  | Event priority. |






<a name="system_monitor_project-EventReply"></a>

### EventReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| event_id | [uint32](#uint32) |  | Event Id. |
| description | [string](#string) |  | Event description. |
| conversion_id1 | [string](#string) |  | Id of first event conversion. |
| conversion_id2 | [string](#string) |  | Id of second event conversion. |
| conversion_id3 | [string](#string) |  | Id of third event conversion. |
| priority | [system_monitor_common.EventPriority](#system_monitor_common-EventPriority) |  | Event level. ( 0 - High, 1 - Medium, 2 - Low, 3 - Debug ) |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-EventRequest"></a>

### EventRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application id. |
| event_id | [uint32](#uint32) |  | Event id. |






<a name="system_monitor_project-EventsReply"></a>

### EventsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| events | [Event](#system_monitor_project-Event) | repeated | The events. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-ExistsReply"></a>

### ExistsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| exists | [bool](#bool) |  | True if exists, False if not |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-ExistsRequest"></a>

### ExistsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application Id. |
| parameter_id | [string](#string) |  | Parameter Id. |
| data_type | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) |  | Parameter data type. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-FileDetailsReply"></a>

### FileDetailsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| saved_by | [string](#string) |  | Name of the last user to save the file. |
| saved_on | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  | Date time of last file save. |
| comment | [string](#string) |  | File comments. |
| notes | [string](#string) |  | File notes. |
| build | [uint32](#uint32) |  | Build number of System Monitor used when saving file. |
| consortium | [string](#string) |  | Name of the licence consortium used to save the file. Set for supported file types only ( .dtv, .rlc &amp; .dtp ). |
| owner | [string](#string) |  | Name of the licence owner used to create the file. Set for supported file types only ( .dtv, .rlc &amp; .dtp ). |
| rda | [string](#string) |  | RDA unlock list checksum for locked DTV&#39;s.Set for supported file types only ( .dtv ). |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-FileNameRequest"></a>

### FileNameRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_type | [system_monitor_common.FileType](#system_monitor_common-FileType) |  | File type. |
| slot | [uint32](#uint32) |  | Slot index (1-8). Only required for FileType.LoggingConfig and FileType.Can |






<a name="system_monitor_project-FileNewRequest"></a>

### FileNewRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_type | [system_monitor_common.FileType](#system_monitor_common-FileType) |  | Type of file to create. |
| file_path | [string](#string) |  | The path of the file to create. |
| save_existing | [bool](#bool) |  | Whether to save the existing file. |
| overwrite | [bool](#bool) |  | Whether to overwrite an existing file with the same path. |






<a name="system_monitor_project-FileOpenRequest"></a>

### FileOpenRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_type | [system_monitor_common.FileType](#system_monitor_common-FileType) |  | The type of file to open. |
| file_path | [string](#string) |  | The path of the file to open. |
| slot | [uint32](#uint32) |  | Slot index. Only required when loading Logging and CAN configuration (1-8). |
| activate | [bool](#bool) |  | True to set active. Only required when loading Logging and CAN configuration (1-8). |






<a name="system_monitor_project-FileReply"></a>

### FileReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_path | [string](#string) |  | File path including folder. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-FileSaveRequest"></a>

### FileSaveRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_type | [system_monitor_common.FileType](#system_monitor_common-FileType) |  | Type of file to save. |
| file_path | [string](#string) |  | The path of the file to save. |
| comment | [string](#string) |  | File comments. |
| notes | [string](#string) |  | File notes. |
| consortium | [string](#string) |  | Name of the licence consortium used to save the file. Set for supported file types only ( .dtv, .rlc &amp; .dtp ). |
| save_copy_as | [bool](#bool) |  | Whether to save a copy without affecting SM modified status. |






<a name="system_monitor_project-GetAppDetailsReply"></a>

### GetAppDetailsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| apps | [Application](#system_monitor_project-Application) | repeated | Application details. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-GetBuildNumberReply"></a>

### GetBuildNumberReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| build_number | [uint32](#uint32) |  | System Monitor build number. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-GetVersionNumberReply"></a>

### GetVersionNumberReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| major_version | [uint32](#uint32) |  | Major revision. |
| minor_version | [uint32](#uint32) |  | Minor revision. |
| build_version | [uint32](#uint32) |  | Build number. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-MatlabDTVRequest"></a>

### MatlabDTVRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| dtv_path | [string](#string) |  | Filename and full path of DTV file. |
| export_path | [string](#string) |  | Filename and full path of exported file. |
| data_only | [bool](#bool) |  | True if only data is to be exported, false to export data and definitions. |
| data_types | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) | repeated | Data types included in export. |






<a name="system_monitor_project-MatlabRequest"></a>

### MatlabRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application Id. |
| export_path | [string](#string) |  | Filename and full path. |
| data_only | [bool](#bool) |  | True if only data is to be exported, false to export data and definitions. |
| data_types | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) | repeated | Data types included in export. |






<a name="system_monitor_project-MatlabSelectedRequest"></a>

### MatlabSelectedRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application Id. |
| export_path | [string](#string) |  | Filename and full path. |
| data_only | [bool](#bool) |  | True if only data is to be exported, false to export data and definitions. |
| parameter_ids | [string](#string) | repeated | Identifiers of the parameters to be exported |






<a name="system_monitor_project-MultiAppReply"></a>

### MultiAppReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_ids | [uint32](#uint32) | repeated | Applications containing the specified parameter. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-MultiAppRequest"></a>

### MultiAppRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_ids | [uint32](#uint32) | repeated | Application identifiers. |






<a name="system_monitor_project-PGVIDReply"></a>

### PGVIDReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pgv_id | [uint32](#uint32) |  | Result program version ID. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_project-ParameterIdRequest"></a>

### ParameterIdRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  | Parameter identifier. |






<a name="system_monitor_project-ProjectCloseRequest"></a>

### ProjectCloseRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| action | [int32](#int32) |  | Action to perform when unsaved documents encountered on closing project. 0 - Cancel Save. 1 - Save All. 2 - Save None. |






<a name="system_monitor_project-ProjectCreateRequest"></a>

### ProjectCreateRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| project_path | [string](#string) |  | Project name to be created within the current multi-application base. |
| app_paths | [string](#string) | repeated | Array of PGV files to be included. |
| desktop_path | [string](#string) |  | Name of desktop document to be created or included if file already exists. |
| virtuals_path | [string](#string) |  | Optional name of virtual parameters document to be created or included if file already exists. |
| can_path | [string](#string) |  | Optional name of CAN configuration document to be created or included if file already exists. |
| logging_config_path | [string](#string) |  | Optional name of remote logging configuration document to be created or included if file already exists. |






<a name="system_monitor_project-ProjectExportRequest"></a>

### ProjectExportRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| save_modified | [bool](#bool) |  | Flag to indicate if any unsaved files in the project should be saved before exporting. |






<a name="system_monitor_project-ProjectImportRequest"></a>

### ProjectImportRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| project_path | [string](#string) |  | SMX file containing project to be imported. |
| base | [string](#string) |  | Optional Multi-Application base name for import. If blank, the current default base is used. |






<a name="system_monitor_project-ProjectSaveAsRequest"></a>

### ProjectSaveAsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| project_name | [string](#string) |  | Name of renamed project file. |
| save_all | [bool](#bool) |  | If TRUE then all modified files are saved. If FALSE then only the project file is saved. |
| comments | [string](#string) |  | New project comments. |
| notes | [string](#string) |  | New project notes. |






<a name="system_monitor_project-ProjectSaveRequest"></a>

### ProjectSaveRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| save_all | [bool](#bool) |  | If TRUE then all modified files are saved. If FALSE then only the project file is saved. |






<a name="system_monitor_project-ReasonCode"></a>

### ReasonCode



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| reasons | [system_monitor_common.Reason](#system_monitor_common-Reason) | repeated | Reason codes. |






<a name="system_monitor_project-ReprogramRequest"></a>

### ReprogramRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_ids | [uint32](#uint32) | repeated | An array of all app ids to reprogram. |
| force | [bool](#bool) |  | Whether to force a reprogram. |






<a name="system_monitor_project-SensorRequest"></a>

### SensorRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application Id. |
| sensor | [string](#string) |  | Sensor identifier. |
| serial_number | [int32](#int32) |  | Serial number. |






<a name="system_monitor_project-SlotActiveRequest"></a>

### SlotActiveRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slot | [uint32](#uint32) |  | Slot index (1-8). |
| active | [bool](#bool) |  | TRUE to activate the slot. |






<a name="system_monitor_project-SlotReply"></a>

### SlotReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| active | [bool](#bool) |  | Slot is active. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | return code. |






<a name="system_monitor_project-SlotRequest"></a>

### SlotRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slot | [uint32](#uint32) |  | Slot index (1-8). |






<a name="system_monitor_project-SyncedReply"></a>

### SyncedReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| synced | [bool](#bool) |  | TRUE if the edit buffer is in sync with the ECU. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |





 

 

 


<a name="system_monitor_project-SystemMonitorProject"></a>

### SystemMonitorProject


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| ProjectOpen | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Opens a Project. |
| ProjectClose | [ProjectCloseRequest](#system_monitor_project-ProjectCloseRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Closes a Project. |
| ProjectCreate | [ProjectCreateRequest](#system_monitor_project-ProjectCreateRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Create a new project. If full path names are used, the path must lie within the current multi-application base. |
| ProjectSave | [ProjectSaveRequest](#system_monitor_project-ProjectSaveRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Saves the current project. |
| ProjectSaveAs | [ProjectSaveAsRequest](#system_monitor_project-ProjectSaveAsRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Saves the current project as a new project. |
| ProjectImport | [ProjectImportRequest](#system_monitor_project-ProjectImportRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Imports the project from a .smx file. |
| ProjectExport | [ProjectExportRequest](#system_monitor_project-ProjectExportRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Exports the project to a .smx file. |
| Reprogram | [ReprogramRequest](#system_monitor_project-ReprogramRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Reprograms the ECU. |
| DownloadDataChanges | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Causes any modifications made to the System Monitor edit buffer to be downloaded to the ECU. |
| EditBufferSynced | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [SyncedReply](#system_monitor_project-SyncedReply) | Identifies whether the edit buffer is in sync with the ECU. |
| UploadDataVersion | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Uploads specified data version to the edit buffer. |
| GetVersionNumber | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetVersionNumberReply](#system_monitor_project-GetVersionNumberReply) | Gets the version information contained within the System Monitor executable. |
| GetPGVVersion | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [AppReply](#system_monitor_project-AppReply) | Gets the filepath for the .pgv of an application by Application Id. |
| GetPGVID | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [PGVIDReply](#system_monitor_project-PGVIDReply) | Gets the program version ID of the currently loaded program version. |
| GetDTVVersion | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [AppReply](#system_monitor_project-AppReply) | Returns the filename of the data version in the edit buffer. |
| GetEcuDTVVersion | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [AppReply](#system_monitor_project-AppReply) | Returns the filename of the data version on the ECU. |
| GetNextDTVVersion | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [AppReply](#system_monitor_project-AppReply) | Returns the filename of the next data version that will be saved if the user selects, File, Save. If the edit buffer is unmodified, this will be the name of the current data version in the edit buffer. |
| GetDTVModified | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [DTVModifiedReply](#system_monitor_project-DTVModifiedReply) | Gets the modified state associated with the DTV. |
| GetDTVSavedOn | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [DTVSavedOnReply](#system_monitor_project-DTVSavedOnReply) | Gets the contents of the saved on attribute associated with the DTV. |
| GetDTVNotes | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [AppReply](#system_monitor_project-AppReply) | Returns the contents of the notes attribute associated with the DTV. |
| SetDTVNotes | [DetailsRequest](#system_monitor_project-DetailsRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Sets the Data Version notes for the specified application. |
| ClearDTVNotes | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Clears the contents of the notes attribute associated with the DTV. |
| GetDTVComment | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [AppReply](#system_monitor_project-AppReply) | Gets the contents of the comments attribute associated with the DTV. |
| SetDTVComment | [DetailsRequest](#system_monitor_project-DetailsRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Sets the Data Version comment for the specified application. |
| EnableDTVBackup | [EnableRequest](#system_monitor_project-EnableRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Enables/Disables the data version backup during parameter value changes. Adds a message to the log file to indicate when changed. NOTE: Any changes to the data version whilst backups are suspended are not flushed to the backup file when the backups are re- enabled. |
| DTVOpen | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Opens the specified data version file. |
| DTVSave | [DTVSaveRequest](#system_monitor_project-DTVSaveRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Saves the current data version to the specified file. |
| DTVSaveCopy | [DTVSaveCopyRequest](#system_monitor_project-DTVSaveCopyRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Saves the current data version to the specified file, without modifying the data version in the edit buffer. |
| DTVSaveIncrement | [DTVSaveIncrementRequest](#system_monitor_project-DTVSaveIncrementRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Increments the version number of the data version and then performs a save. |
| GetBuildNumber | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetBuildNumberReply](#system_monitor_project-GetBuildNumberReply) | Gets the build number of System Monitor (SM-V7). Client code may be branched on the basis of build number, thereby providing a way by which a single client script can be written which works with releases of SM-V7 which have different ActiveX interfaces. |
| GetAppDetails | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetAppDetailsReply](#system_monitor_project-GetAppDetailsReply) | Gets details of the applications in the current project. |
| GetActiveApps | [.google.protobuf.Empty](#google-protobuf-Empty) | [ActiveAppReply](#system_monitor_project-ActiveAppReply) | Gets details of all the active applications. |
| SetActiveApps | [MultiAppRequest](#system_monitor_project-MultiAppRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Sets the active application when provided with an application ID. |
| AddApp | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Adds the application defined by the given DTV and it&#39;s associated PGV into the project. If the application already exists in the project the error: SMAPI_ERR_INVALID_CMD (-31) will be returned. |
| RemoveApp | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Removes the given application from the project. The requested application cannot be the BIOS. |
| CompareApp | [CompareAppRequest](#system_monitor_project-CompareAppRequest) | [CompareAppReply](#system_monitor_project-CompareAppReply) | Perform a compare between an application loaded in memory and up to two DTV&#39;s. When two DTV&#39;s are used both must have the same PGV version. Returns a list of parameters that contain differences along with the parameter data type and a reason code identifying the difference. |
| GetAppPULFile | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [FileReply](#system_monitor_project-FileReply) | Get the name of the unlock list PUL file for the given application id. |
| SetAppPULFile | [AppFileRequest](#system_monitor_project-AppFileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Set the unlock list PUL file on the given application id. Licence ownership restrictions apply |
| GenerateParamSet | [.system_monitor_common.ParametersFileRequest](#system_monitor_common-ParametersFileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Generate a parameter set file. |
| GeneratePULFile | [.system_monitor_common.AppParametersFileRequest](#system_monitor_common-AppParametersFileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Generate a PUL file for an application for use with Reduced Data Access. NOTE: On creation of PUL file the name will be adjusted from the requested name by including the checksum. This is required to reduce file lookup times. |
| GeneratePULFileFromParamSet | [AppFileRequest](#system_monitor_project-AppFileRequest) | [FileReply](#system_monitor_project-FileReply) | Generate a PUL file for an application for use with Reduced Data Access from a saved Parameter Set file. NOTE: On creation of PUL file the name will be adjusted from the requested name by including the checksum. This is required to reduce file lookup times. The adjusted file name will be returned in pszFileName. |
| ChangeSensorSerialNumber | [SensorRequest](#system_monitor_project-SensorRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Changes the serial number of the specified sensor. |
| FileOpen | [FileOpenRequest](#system_monitor_project-FileOpenRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Opens a file within System Monitor. Supports FileType.Desktop, FileType.LoggingConfig, FileType.Virtuals, FileType.Can. |
| FileSave | [FileSaveRequest](#system_monitor_project-FileSaveRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Saves a file within System Monitor. Supports FileType.Desktop, FileType.LoggingConfig, FileType.Virtuals, FileType.Can. |
| FileNew | [FileNewRequest](#system_monitor_project-FileNewRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Creates a file within System Monitor. Supports FileType.LoggingConfig, FileType.Virtuals, FileType.Can. |
| GetFileName | [FileNameRequest](#system_monitor_project-FileNameRequest) | [FileReply](#system_monitor_project-FileReply) | Gets the name of a file from System Monitor. Supports FileType.Project, FileType.Desktop, FileType.LoggingConfig, FileType.Virtuals, FileType.Can |
| GetFileDetails | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [FileDetailsReply](#system_monitor_project-FileDetailsReply) | Gets the file details for any file type supported by System Monitor. |
| CreateFFCFromPGV | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Create an FFC File from the given PGV. Enable FFC advanced option must be set to &#39;Y&#39; and full path name of PGV is required. FFC file will be created in same location as original PGV. |
| ExportToHexFile | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Exports the selected applications PGV and DTV to a hexfile. |
| GetActiveCANConfig | [SlotRequest](#system_monitor_project-SlotRequest) | [SlotReply](#system_monitor_project-SlotReply) | Gets the active status of the CAN configuration in the given slot. |
| SetActiveCANConfig | [SlotActiveRequest](#system_monitor_project-SlotActiveRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Set the active status of the CAN configuration in the given slot. |
| GetFIACANConfig | [SlotRequest](#system_monitor_project-SlotRequest) | [SlotReply](#system_monitor_project-SlotReply) | Gets the FIA status of the CAN configuration into the given slot. |
| SetFIACANConfig | [SlotActiveRequest](#system_monitor_project-SlotActiveRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Set the FIA status of the CAN configuration into the given slot. |
| CANBuffersExport | [CANRequest](#system_monitor_project-CANRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Exports the CAN Buffer configuration csv from the given CAN Bus index. |
| CANBuffersImport | [CANRequest](#system_monitor_project-CANRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Imports the CAN Buffer configuration csv into the given CAN Bus index. |
| CANMessagesExport | [CANRequest](#system_monitor_project-CANRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Exports the CAN Message configuration csv from the given CAN Bus index. |
| CANMessagesImport | [CANMergeRequest](#system_monitor_project-CANMergeRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Imports the CAN Message configuration csv into the given CAN Bus index. |
| CANConfigUnload | [SlotRequest](#system_monitor_project-SlotRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Unloads the CAN configuration from the given slot. (Slot index should be 2-8). |
| GetActiveLoggingConfig | [SlotRequest](#system_monitor_project-SlotRequest) | [SlotReply](#system_monitor_project-SlotReply) | Get the active status of the remote logging configuration in the given slot. |
| SetActiveLoggingConfig | [SlotActiveRequest](#system_monitor_project-SlotActiveRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Set the active status of the remote logging configuration in the given slot. |
| LoggingConfigUnload | [SlotRequest](#system_monitor_project-SlotRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Unloads the remote logging configuration from the given slot. |
| MatlabImport | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Imports the specified MatLab-M file into System Monitor. |
| MatlabExport | [MatlabRequest](#system_monitor_project-MatlabRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Exports the currently loaded data version to the specified file in MatLab-M format. |
| MatlabExportDTV | [MatlabDTVRequest](#system_monitor_project-MatlabDTVRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Exports the specified data version to the specified file in MatLab-M format. |
| MatlabExportSelected | [MatlabSelectedRequest](#system_monitor_project-MatlabSelectedRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Exports the specified list of editable parameters in Matlab format. |
| AddParametersToUnlockList | [.system_monitor_common.AppParametersFileRequest](#system_monitor_common-AppParametersFileRequest) | [FileReply](#system_monitor_project-FileReply) | Update a PUL file for an application for use with Reduced Data Access by adding the requested parameter identifiers. NOTE: The PUL file name will be adjusted by including the new checksum and returned. |
| RemoveParametersFromUnlockList | [.system_monitor_common.AppParametersFileRequest](#system_monitor_common-AppParametersFileRequest) | [FileReply](#system_monitor_project-FileReply) | Update a PUL file for an application for use with Reduced Data Access by removing the requested parameter identifiers. NOTE: The PUL file the name will be adjusted by including the new checksum and returned. |
| GetAppsHoldingParam | [ParameterIdRequest](#system_monitor_project-ParameterIdRequest) | [MultiAppReply](#system_monitor_project-MultiAppReply) | Gets the applications which contain the specified parameter. |
| GetAppsHoldingMeasurementParam | [ParameterIdRequest](#system_monitor_project-ParameterIdRequest) | [MultiAppReply](#system_monitor_project-MultiAppReply) | Gets the applications which contain the specified measurement parameter. |
| GetAppsHoldingControlParam | [ParameterIdRequest](#system_monitor_project-ParameterIdRequest) | [MultiAppReply](#system_monitor_project-MultiAppReply) | Returns the applications which contain the specified non measurement parameter. |
| ParameterExists | [ExistsRequest](#system_monitor_project-ExistsRequest) | [ExistsReply](#system_monitor_project-ExistsReply) | Identifies if a parameter of the given type exists. |
| RegisterEnhancedRowParameters | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Add parameters from application to the enhanced speed row data list. |
| ClearEnhancedRowParameters | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Clear all parameters for given application from enhanced speed slow row data list. |
| RegisterCANEnhancedRowParameters | [.system_monitor_common.ParametersRequest](#system_monitor_common-ParametersRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Add CAN parameters to the enhanced speed row data list. |
| RegisterVirtualEnhancedRowParameters | [.system_monitor_common.ParametersRequest](#system_monitor_common-ParametersRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Add virtual parameters to the enhanced speed row data list. All parameters referenced by each virtual will be added to the list. |
| ActivateEnhancedRowParameters | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) | Activate current enhanced speed row data list. |
| DumpEvents | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Dumps the contents of the Event window to a specified file. |
| DumpErrors | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Any errors that are currently occurring are dumped to disk. |
| DumpRowData | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Dumps the current values of all acquired measurement parameters to disk. |
| ClearEvents | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) | Clears the event window in SM-V7. |
| GetEvents | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [EventsReply](#system_monitor_project-EventsReply) | Gets the events defined for a given application. |
| GetEventDetails | [EventRequest](#system_monitor_project-EventRequest) | [EventReply](#system_monitor_project-EventReply) | Gets the details for a given event defined in an application. |
| GetErrorDefinitions | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [ErrorDefinitionsReply](#system_monitor_project-ErrorDefinitionsReply) | Gets the error definitions for a given application. |
| GetErrors | [.google.protobuf.Empty](#google-protobuf-Empty) | [ErrorReply](#system_monitor_project-ErrorReply) | Returns list of active errors. |
| DeleteErrors | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) | Clears the active errors. |

 



<a name="Protos_system_monitor_system-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## Protos/system_monitor_system.proto



<a name="system_monitor_system-BatchModeRequest"></a>

### BatchModeRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mode | [bool](#bool) |  | Enter/leave batch mode, true or false respectively. |






<a name="system_monitor_system-CreatePGVReply"></a>

### CreatePGVReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pgv_file_path | [string](#string) |  | Path to created PGV file. |
| dtv_file_path | [string](#string) |  | Path to created DT file. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_system-CreatePGVRequest"></a>

### CreatePGVRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [string](#string) |  | Path to location for output files. |
| asap2_file_path | [string](#string) |  | Path to base ASAP2 project .a2l file. |
| hex_file_path | [string](#string) |  | Path to hex definition .hex file. |
| controllers_file_path | [string](#string) |  | Path to controllers definition .ini file. |
| errors_file_path | [string](#string) |  | Optional path to errors definition .ini file. |
| events_file_path | [string](#string) |  | Optional path to events definition .ini file. |
| adjustment_file_path | [string](#string) |  | Optional path to pot board definition .ini file. |
| sensors_file_path | [string](#string) |  | Optional path to sensors definition .ini file. |
| injector_file_path | [string](#string) |  | Optional path to sensor injector definition .ini file. |
| sensor_enable_file_path | [string](#string) |  | Optional path to sensor enable / disable definition .ini file. |
| live_auto_tune_file_path | [string](#string) |  | Optional path to live auto tune definition .ini file. |
| comments | [string](#string) |  | PGV Comments |
| notes | [string](#string) |  | PGV Notes |






<a name="system_monitor_system-DeviceProperties"></a>

### DeviceProperties



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| comms_path | [string](#string) |  | Device communications path. |
| device_name | [string](#string) |  | Device name. |
| ip_address | [string](#string) |  | Device ip address. |
| serial_number | [int32](#int32) |  | Device serial number. |






<a name="system_monitor_system-DevicePropertiesReply"></a>

### DevicePropertiesReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| devices | [DeviceProperties](#system_monitor_system-DeviceProperties) | repeated | Device information. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_system-FolderReply"></a>

### FolderReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_path | [string](#string) |  | File path |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_system-LicenceDetailsReply"></a>

### LicenceDetailsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| consortium | [string](#string) |  | Licence Consortium. |
| owner | [string](#string) |  | Licence Owner. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_system-LiveLoggingReply"></a>

### LiveLoggingReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| live_logging_state | [bool](#bool) |  | Whether Live Logging is enabled or disabled. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_system-LiveLoggingRequest"></a>

### LiveLoggingRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [bool](#bool) |  | True to turn Live Logging on, false to turn Live Logging off. |






<a name="system_monitor_system-LiveUpdateRequest"></a>

### LiveUpdateRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [bool](#bool) |  | True to enable live updates, false to disable |
| action | [uint32](#uint32) |  | Action performed on data mismatch: 0 - No Action. 1 - Upload data from unit into edit buffer. 2 - Download edit buffer into unit. (Live tunes in unit may be lost). |






<a name="system_monitor_system-MultiApplicationBaseInfo"></a>

### MultiApplicationBaseInfo



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | Name of the multi-application base. |
| path | [string](#string) |  | Path of the multi-application base. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_system-MultiApplicationBasesReply"></a>

### MultiApplicationBasesReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| info | [MultiApplicationBaseInfo](#system_monitor_system-MultiApplicationBaseInfo) | repeated | Multi-application base information. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_system-MultiApplicationBasesRequest"></a>

### MultiApplicationBasesRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| base_name | [string](#string) |  | Name of the multi-application base. |






<a name="system_monitor_system-OnlineRequest"></a>

### OnlineRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [bool](#bool) |  | True to turn the ECU online, false to turn the ECU off-line. |






<a name="system_monitor_system-SendMessageReply"></a>

### SendMessageReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| messages | [int32](#int32) | repeated | Sent messages. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_system-SendMessageRequest"></a>

### SendMessageRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  | Application Id. (indicates ECU in multiple-ECU systems). |
| timeout | [uint32](#uint32) |  | Message time out |
| retries | [uint32](#uint32) |  | How many times to try before returning an error |
| messages | [int32](#int32) | repeated | Messages to send. |






<a name="system_monitor_system-StatusReply"></a>

### StatusReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| link_status | [LinkStatus](#system_monitor_system-LinkStatus) |  | The link status |
| online | [bool](#bool) |  | Whether the unit is online. |
| live_update | [bool](#bool) |  | Whether live updates are enabled. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_system-UnitByIndexRequest"></a>

### UnitByIndexRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  | Index of unit based on the car/unit list (as returned by GetUnitList()) |






<a name="system_monitor_system-UnitByIndexTypeRequest"></a>

### UnitByIndexTypeRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  | Index of unit based on the car/unit list (as returned by GetUnitList()) |
| primary | [bool](#bool) |  | Whether the connection is for the main car or spare car |






<a name="system_monitor_system-UnitInfo"></a>

### UnitInfo



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | Unit name. |
| type | [string](#string) |  | Unit type |
| ip_address | [string](#string) |  | Unit IP Address |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_system-UnitListReply"></a>

### UnitListReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| info | [UnitInfo](#system_monitor_system-UnitInfo) | repeated | Unit information. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_system-UnitNameReply"></a>

### UnitNameReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | Unit name. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |





 


<a name="system_monitor_system-LinkStatus"></a>

### LinkStatus


| Name | Number | Description |
| ---- | ------ | ----------- |
| Link_OK | 0 | Link OK |
| Link_NOK | 1 | Link Not OK |
| Controller_Busy | 2 | Controller busy |
| In_Boot | 3 | Device in boot |
| Zone_1 | 4 | Device in zone one |
| Zone_2 | 5 | Device in zone two |
| Zone_3 | 6 | Device in zone three |
| Bad_Response | 7 | Bad response |
| Invalid_Device | 8 | Invalid device |
| Unknown | 65535 | Unknown status |


 

 


<a name="system_monitor_system-SystemMonitorSystem"></a>

### SystemMonitorSystem


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetStatus | [.google.protobuf.Empty](#google-protobuf-Empty) | [StatusReply](#system_monitor_system-StatusReply) | Gets the combined current status of online, live updates, link status and active app. |
| SetOnline | [OnlineRequest](#system_monitor_system-OnlineRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Turns the ECU on or off-line. |
| SetLiveUpdate | [LiveUpdateRequest](#system_monitor_system-LiveUpdateRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Enables or disables the sending of live-updates to the ECU. |
| GetUnitList | [.google.protobuf.Empty](#google-protobuf-Empty) | [UnitListReply](#system_monitor_system-UnitListReply) | Returns an array of cars/units defined in the carfile.ini (ie. the connections that appear in the connections dialog) |
| GetUnitName | [.google.protobuf.Empty](#google-protobuf-Empty) | [UnitNameReply](#system_monitor_system-UnitNameReply) | Returns the name of the current car/connection. |
| GetUnitByIndex | [UnitByIndexRequest](#system_monitor_system-UnitByIndexRequest) | [UnitInfo](#system_monitor_system-UnitInfo) | Returns the index of the car/unit entry within the car/unit list (as returned by GetCarList()). Obtains connection name, type and IP address. |
| SetUnitByIndex | [UnitByIndexTypeRequest](#system_monitor_system-UnitByIndexTypeRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Sets the car/unit connection based on the car/unit list (as returned by GetCarList()) |
| GetMultiApplicationBases | [.google.protobuf.Empty](#google-protobuf-Empty) | [MultiApplicationBasesReply](#system_monitor_system-MultiApplicationBasesReply) | Gets details of all defined Multi-Application Bases. |
| GetMultiApplicationBase | [.google.protobuf.Empty](#google-protobuf-Empty) | [MultiApplicationBaseInfo](#system_monitor_system-MultiApplicationBaseInfo) | Gets details of a specific Multi-Application Base. |
| SetMultiApplicationBase | [MultiApplicationBasesRequest](#system_monitor_system-MultiApplicationBasesRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Sets details of a specific Multi-Application Base. |
| GetLicenceDetails | [.google.protobuf.Empty](#google-protobuf-Empty) | [LicenceDetailsReply](#system_monitor_system-LicenceDetailsReply) | Get the active consortium name and licence owner. |
| GetDeviceProperties | [.google.protobuf.Empty](#google-protobuf-Empty) | [DevicePropertiesReply](#system_monitor_system-DevicePropertiesReply) | Get the properties of connected devices from the project. |
| GetLiveLogging | [.google.protobuf.Empty](#google-protobuf-Empty) | [LiveLoggingReply](#system_monitor_system-LiveLoggingReply) | Returns whether the Live Logging is currently recording or not. |
| SetLiveLogging | [LiveLoggingRequest](#system_monitor_system-LiveLoggingRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Starts or stops Live Logging. |
| SetBatchMode | [BatchModeRequest](#system_monitor_system-BatchModeRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Call this to enter (or leave) batch mode. This is used when creating virtual parameters; entering batch mode before the creation of multiple Virtual Parameters and leaving batch mode afterwards. Using this method, all created/updated Virtual Parameters will only be available in System Monitor after leaving batch mode. |
| SendMessage | [SendMessageRequest](#system_monitor_system-SendMessageRequest) | [SendMessageReply](#system_monitor_system-SendMessageReply) | Sends a message to the ECU. |
| GetLogFolder | [.google.protobuf.Empty](#google-protobuf-Empty) | [FolderReply](#system_monitor_system-FolderReply) | Get the current log folder location. |
| GetPPOFileName | [.google.protobuf.Empty](#google-protobuf-Empty) | [FolderReply](#system_monitor_system-FolderReply) | Get the name of the PPO file in the project. |
| CreatePGV | [CreatePGVRequest](#system_monitor_system-CreatePGVRequest) | [CreatePGVReply](#system_monitor_system-CreatePGVReply) | Create a new PGV from ASAP2 definitions. |

 



<a name="Protos_system_monitor_virtual-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## Protos/system_monitor_virtual.proto



<a name="system_monitor_virtual-AddGroupRequest"></a>

### AddGroupRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_path | [string](#string) |  | The path where the groups is to be added, e.g. \\TopLevelGroup\\SubGroup |
| name | [string](#string) |  | The display name for the virtual parameter group. |
| description | [string](#string) |  | Description of the virtual parameter group. |
| read_only | [bool](#bool) |  | If set to true, the virtual parameter group will be marked as a Read Only. |






<a name="system_monitor_virtual-VirtualExportRequest"></a>

### VirtualExportRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_path | [string](#string) |  | File path to export parameters into. |
| group | [string](#string) |  | Group name to export. NULL for all virtual parameters. |






<a name="system_monitor_virtual-VirtualGroupReply"></a>

### VirtualGroupReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  | Name of the virtual parameter group. |
| description | [string](#string) |  | Description of the virtual parameter group. |
| read_only | [bool](#bool) |  | Whether the virtual parameter group is Read Only |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_virtual-VirtualGroupRequest"></a>

### VirtualGroupRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group | [string](#string) |  | Identifier of the group. |






<a name="system_monitor_virtual-VirtualGroupsReply"></a>

### VirtualGroupsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ids | [string](#string) | repeated | Identifiers of the virtual parameters. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_virtual-VirtualParameter"></a>

### VirtualParameter



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | Identifier of the virtual parameter. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_virtual-VirtualParameterDataTypeRequest"></a>

### VirtualParameterDataTypeRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| Id | [string](#string) |  | The unique identification of the virtual parameter. |
| data_type | [system_monitor_common.DataType](#system_monitor_common-DataType) |  | The data type. |






<a name="system_monitor_virtual-VirtualParameterProperties"></a>

### VirtualParameterProperties



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| Id | [string](#string) |  | Parameter identifier. |
| name | [string](#string) |  | Parameter display names. |
| description | [string](#string) |  | Parameter description. |
| lower_display_limit | [double](#double) |  | Lower display limit. |
| upper_display_limit | [double](#double) |  | Upper display limit. |
| min_logging_rate | [uint32](#uint32) |  | Minimum logging rate. |
| scaling_factor | [uint32](#uint32) |  | Parameter scaling factor (see EScalingUnit). |
| min_not_defined | [bool](#bool) |  | State of min/max values. |
| expression | [string](#string) |  | Expression used to evaluate the virtual parameter. |
| units | [string](#string) |  | Parameter units. |
| format | [string](#string) |  | Parameter display format. |
| group | [string](#string) |  | Parameter group name. |
| conversion_id | [string](#string) |  | Unique identifier of the parameter conversion rule. |
| data_type | [system_monitor_common.DataType](#system_monitor_common-DataType) |  | Parameter data type. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code. |






<a name="system_monitor_virtual-VirtualParameterPropertiesReply"></a>

### VirtualParameterPropertiesReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [VirtualParameterProperties](#system_monitor_virtual-VirtualParameterProperties) | repeated | The properties of the virtual parameters |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_virtual-VirtualParameterRequest"></a>

### VirtualParameterRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  | The unique identifier of the virtual parameter. |
| name | [string](#string) |  | The display name for the virtual parameter. |
| description | [string](#string) |  | Description of the virtual parameter. |
| min_display | [double](#double) |  | Minimum value for display range. |
| max_display | [double](#double) |  | Maximum value for display range. |
| Min_logging_rate | [int32](#int32) |  | Minimum logging rate. |
| scaling_factor | [int32](#int32) |  | Scaling factor. See EScalingUnit in Enumeration Definitions |
| is_min_not_def | [bool](#bool) |  | If set to true, the virtual parameter will be marked as a Prime Parameter. |
| expression | [string](#string) |  | The expression to evaluate in the virtual parameter. |
| conversion_id | [string](#string) |  | The conversion rule identifier for converting the output value to appropriate unit values. |
| overwrite | [bool](#bool) |  | Overwrites existing data |
| units | [string](#string) |  | Sets the overriding units in which to display the virtual parameter’s value. |
| format_override | [string](#string) |  | Sets the overriding format in which to display the virtual parameter’s value. |
| group | [string](#string) |  | The path of the group in which to add the virtual parameter, e.g. \\TopLevelGroup\\SubGroup |
| data_type | [system_monitor_common.DataType](#system_monitor_common-DataType) |  | The data type. |
| lower_warning | [double](#double) |  | Lower warning limit value. |
| upper_warning | [double](#double) |  | Upper warning limit value. |






<a name="system_monitor_virtual-VirtualReply"></a>

### VirtualReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ids | [VirtualParameter](#system_monitor_virtual-VirtualParameter) | repeated | Identifiers of the virtual parameters. |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  | Return code |






<a name="system_monitor_virtual-VirtualsRequest"></a>

### VirtualsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ids | [string](#string) | repeated | Identifiers of the virtual parameters. |





 

 

 


<a name="system_monitor_virtual-SystemMonitorVirtual"></a>

### SystemMonitorVirtual


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| SetVirtualParameter | [VirtualParameterRequest](#system_monitor_virtual-VirtualParameterRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Modify or Create a Virtual Parameter. |
| GetVirtualParameterProperties | [.system_monitor_common.ParametersRequest](#system_monitor_common-ParametersRequest) | [VirtualParameterPropertiesReply](#system_monitor_virtual-VirtualParameterPropertiesReply) | Gets the properties of the given virtual parameters |
| RemoveVirtualParameters | [VirtualsRequest](#system_monitor_virtual-VirtualsRequest) | [VirtualReply](#system_monitor_virtual-VirtualReply) | Removes virtual parameters. |
| RemoveAllVirtualParameters | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) | Removes all virtual parameters. |
| RemoveVirtualConversions | [VirtualsRequest](#system_monitor_virtual-VirtualsRequest) | [VirtualReply](#system_monitor_virtual-VirtualReply) | Removes virtual parameter conversion rules. |
| RemoveAllVirtualConversions | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) | Removes all virtual parameter conversion rules. |
| GetVirtualParameterGroups | [.google.protobuf.Empty](#google-protobuf-Empty) | [VirtualGroupsReply](#system_monitor_virtual-VirtualGroupsReply) | Gets the virtual parameter groups. |
| GetVirtualParameterGroup | [VirtualGroupRequest](#system_monitor_virtual-VirtualGroupRequest) | [VirtualGroupReply](#system_monitor_virtual-VirtualGroupReply) | Gets a virtual parameter group. |
| GetVirtualParametersInGroup | [VirtualGroupRequest](#system_monitor_virtual-VirtualGroupRequest) | [VirtualGroupsReply](#system_monitor_virtual-VirtualGroupsReply) | Gets the virtual parameters within a group. |
| VirtualParametersExport | [VirtualExportRequest](#system_monitor_virtual-VirtualExportRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Exports virtual parameters. |
| VirtualParametersImport | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Imports virtual parameters. |
| AddVirtualParameterGroup | [AddGroupRequest](#system_monitor_virtual-AddGroupRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Adds a virtual parameter group. |
| RemoveVirtualParameterGroup | [VirtualGroupRequest](#system_monitor_virtual-VirtualGroupRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Removes a virtual parameter group. |
| RemoveAllVirtualParametersFromGroup | [VirtualGroupRequest](#system_monitor_virtual-VirtualGroupRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Removes all virtual parameters from a group. |
| SetVirtualParameterDataType | [VirtualParameterDataTypeRequest](#system_monitor_virtual-VirtualParameterDataTypeRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) | Sets the data type of a virtual parameter. |

 



## Scalar Value Types

| .proto Type | Notes | C++ | Java | Python | Go | C# | PHP | Ruby |
| ----------- | ----- | --- | ---- | ------ | -- | -- | --- | ---- |
| <a name="double" /> double |  | double | double | float | float64 | double | float | Float |
| <a name="float" /> float |  | float | float | float | float32 | float | float | Float |
| <a name="int32" /> int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="int64" /> int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="uint32" /> uint32 | Uses variable-length encoding. | uint32 | int | int/long | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="uint64" /> uint64 | Uses variable-length encoding. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum or Fixnum (as required) |
| <a name="sint32" /> sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sint64" /> sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="fixed32" /> fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="fixed64" /> fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum |
| <a name="sfixed32" /> sfixed32 | Always four bytes. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sfixed64" /> sfixed64 | Always eight bytes. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="bool" /> bool |  | bool | boolean | boolean | bool | bool | boolean | TrueClass/FalseClass |
| <a name="string" /> string | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode | string | string | string | String (UTF-8) |
| <a name="bytes" /> bytes | May contain any arbitrary sequence of bytes. | string | ByteString | str | []byte | ByteString | string | String (ASCII-8BIT) |

