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



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_ids | [string](#string) | repeated |  |
| file_path | [string](#string) |  |  |






<a name="system_monitor_common-AppParametersRequest"></a>

### AppParametersRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_ids | [string](#string) | repeated |  |






<a name="system_monitor_common-AppRequest"></a>

### AppRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |






<a name="system_monitor_common-ConversionRequest"></a>

### ConversionRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| conversion_id | [string](#string) |  |  |






<a name="system_monitor_common-FileRequest"></a>

### FileRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_path | [string](#string) |  |  |






<a name="system_monitor_common-ParameterRequest"></a>

### ParameterRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |






<a name="system_monitor_common-ParametersFileRequest"></a>

### ParametersFileRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_ids | [string](#string) | repeated |  |
| file_path | [string](#string) |  |  |






<a name="system_monitor_common-ParametersRequest"></a>

### ParametersRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_ids | [string](#string) | repeated |  |






<a name="system_monitor_common-Return"></a>

### Return



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| return_code | [ErrorCode](#system_monitor_common-ErrorCode) |  |  |





 


<a name="system_monitor_common-BufferType"></a>

### BufferType


| Name | Number | Description |
| ---- | ------ | ----------- |
| unit_buffer | 0 |  |
| edit_buffer | 1 |  |
| unit_and_edit_buffer | 2 |  |



<a name="system_monitor_common-ByteOrder"></a>

### ByteOrder


| Name | Number | Description |
| ---- | ------ | ----------- |
| msb_first | 0 |  |
| msb_last | 1 |  |



<a name="system_monitor_common-ConversionType"></a>

### ConversionType


| Name | Number | Description |
| ---- | ------ | ----------- |
| rational | 0 |  |
| table | 1 |  |
| text | 2 |  |
| formula | 3 |  |



<a name="system_monitor_common-DataType"></a>

### DataType


| Name | Number | Description |
| ---- | ------ | ----------- |
| ubyte | 0 |  |
| byte | 1 |  |
| uword | 2 |  |
| word | 3 |  |
| ulong | 4 |  |
| long | 5 |  |
| float | 6 |  |
| unknown | 7 |  |
| qword | 8 |  |
| sqword | 9 |  |
| double | 10 |  |



<a name="system_monitor_common-ErrorCode"></a>

### ErrorCode


| Name | Number | Description |
| ---- | ------ | ----------- |
| no_error | 0 |  |
| no_project | -1 |  |
| no_licence | -2 |  |
| non_specific | -3 |  |
| data_version_mismatch | -4 |  |
| no_data_version | -5 |  |
| no_program_version | -6 |  |
| no_ECU | -7 |  |
| invalid_file | -8 |  |
| no_appliction | -9 |  |
| application_inactive | -10 |  |
| live_updates_on | -11 |  |
| TAGtronic_onlu | -12 |  |
| SM_busy | -13 |  |
| message_argument_mismatch | -20 |  |
| message_dimension_mismatch | -21 |  |
| message_lower_bound_non_zero | -22 |  |
| bounds_error | -23 |  |
| message_argument_error | -24 |  |
| message_argument_invalid | -25 |  |
| fdl_not_parsed | -26 |  |
| conversion_invalid | -27 |  |
| parameter_invalid | -28 |  |
| parameter_override_not_allowed | -29 |  |
| bad_state | -30 |  |
| invalid_command | -31 |  |
| no_data_present | -32 |  |
| bad_memory_allocation | -33 |  |
| partially_complete | -34 |  |
| document_full | -35 |  |
| parameter_identifier_already_exists | -36 |  |
| parameter_read_only | -37 |  |
| parameter_non_live_tuneable | -38 |  |
| group_not_found | -39 |  |
| file_requires_saving | -40 |  |
| frequency_overridden | -41 |  |
| no_customer_base | -42 |  |
| parameter_not_found | -100 |  |
| error_read_only | -101 |  |
| error_limits | -102 |  |
| error_monotony | -103 |  |
| error_axis_pt | -104 |  |
| error_address | -105 |  |
| error_non_num | -106 |  |
| error_size | -107 |  |
| error_live_tune | -108 |  |
| error_intp | -109 |  |
| error_activelayer | -110 |  |
| error_tolerance | -111 |  |
| error_axis_change | -112 |  |
| error_no_live_tune | -113 |  |
| error_validation | -114 |  |
| error_live_tune_data_invalid | -115 |  |
| error_serial_not_found | -116 |  |
| error_unknown | -117 |  |
| error_cancel | -118 |  |
| error_locked_param | -119 |  |
| error_value_not_matching_entry | -120 |  |
| detail_unknown | -200 |  |
| dump_row_data_failed | -201 |  |
| live_update_failed | -300 |  |
| online_failed | -301 |  |
| download_data_failed | -302 |  |
| system_not_runnning | -303 |  |
| parameter_locked | -304 |  |
| comms_base | -1000 |  |



<a name="system_monitor_common-ErrorStatus"></a>

### ErrorStatus


| Name | Number | Description |
| ---- | ------ | ----------- |
| status_unknown | 0 |  |
| status_curent | 1 |  |
| status_logged | 2 |  |



<a name="system_monitor_common-EventPriority"></a>

### EventPriority


| Name | Number | Description |
| ---- | ------ | ----------- |
| event_high | 0 |  |
| event_medium | 1 |  |
| event_low | 2 |  |
| event_debug | 3 |  |



<a name="system_monitor_common-FileType"></a>

### FileType


| Name | Number | Description |
| ---- | ------ | ----------- |
| Project | 0 |  |
| PGV | 1 |  |
| DTV | 2 |  |
| desktop | 3 |  |
| logging_cofig | 4 |  |
| virtuals | 5 |  |
| CAN | 6 |  |
| live_logging | 7 |  |
| pot_board | 8 |  |



<a name="system_monitor_common-LoggingType"></a>

### LoggingType


| Name | Number | Description |
| ---- | ------ | ----------- |
| frequency | 0 |  |
| cylinder | 1 |  |
| cycle | 2 |  |
| unknown_logging | 3 |  |
| edge | 4 |  |



<a name="system_monitor_common-ParameterType"></a>

### ParameterType


| Name | Number | Description |
| ---- | ------ | ----------- |
| undefined | 0 |  |
| scalar | 1 |  |
| axis_1 | 2 |  |
| axis_2 | 4 |  |
| array | 16 |  |
| string | 32 |  |
| ecu | 128 |  |
| can | 256 |  |
| tsb | 512 |  |
| virtual | 1024 |  |
| axis | 196608 |  |
| input | 268435456 |  |
| measurement | 268437376 |  |



<a name="system_monitor_common-Reason"></a>

### Reason


| Name | Number | Description |
| ---- | ------ | ----------- |
| none | 0 |  |
| absent | 1 |  |
| different | 2 |  |
| equal | 4 |  |
| different_value | 8 |  |
| different_size | 16 |  |
| different_conv | 32 |  |
| different_units | 64 |  |
| different_type | 128 |  |
| different_comment | 256 |  |
| different_def_value | 512 |  |
| absent_master | 1024 |  |
| locked | 268435456 |  |



<a name="system_monitor_common-TriggerOperator"></a>

### TriggerOperator


| Name | Number | Description |
| ---- | ------ | ----------- |
| equals | 0 |  |
| less_than | 1 |  |
| greater_than | 2 |  |
| not_equal_to | 3 |  |
| greater_than_or_equal | 4 |  |
| less_than_or_equal | 5 |  |



<a name="system_monitor_common-TriggerType"></a>

### TriggerType


| Name | Number | Description |
| ---- | ------ | ----------- |
| on_data | 0 |  |
| driver_push | 1 |  |
| ignition_on | 2 |  |
| lap_trigger | 3 |  |
| no_condition | 4 |  |
| external_trigger | 5 |  |


 

 

 



<a name="Protos_system_monitor_logging-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## Protos/system_monitor_logging.proto



<a name="system_monitor_logging-AddParameterRequest"></a>

### AddParameterRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |
| logging_rate | [LoggingChannelValue](#system_monitor_logging-LoggingChannelValue) | repeated |  |






<a name="system_monitor_logging-AddVirtualParameterRequest"></a>

### AddVirtualParameterRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |
| logging_rate | [LoggingChannelValue](#system_monitor_logging-LoggingChannelValue) | repeated |  |






<a name="system_monitor_logging-ChannelProperties"></a>

### ChannelProperties



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  |  |
| name | [string](#string) |  |  |
| log_logging | [bool](#bool) |  |  |
| log_telemetry | [bool](#bool) |  |  |
| logging_rate | [double](#double) |  |  |
| telemetry_rate | [double](#double) |  |  |
| trigger_rearm | [bool](#bool) |  |  |
| slot | [uint32](#uint32) |  |  |






<a name="system_monitor_logging-ChannelPropertiesReply"></a>

### ChannelPropertiesReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| channels | [ChannelProperties](#system_monitor_logging-ChannelProperties) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_logging-ChannelRequest"></a>

### ChannelRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  |  |
| name | [string](#string) |  |  |
| log_to_unit | [bool](#bool) |  |  |
| log_telemetry | [bool](#bool) |  |  |
| trigger_rearm | [bool](#bool) |  |  |






<a name="system_monitor_logging-ClearRequest"></a>

### ClearRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| remove_triggers | [bool](#bool) |  |  |






<a name="system_monitor_logging-ConfigReply"></a>

### ConfigReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| config_name | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_logging-DownloadProgressReply"></a>

### DownloadProgressReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| in_progress | [bool](#bool) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_logging-DownloadReply"></a>

### DownloadReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| optional_value | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_logging-DownloadRequest"></a>

### DownloadRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| optional_app_id | [uint32](#uint32) |  |  |
| optional_parameter_id | [string](#string) |  |  |
| optional_delay_ms | [uint32](#uint32) |  |  |






<a name="system_monitor_logging-GetSessionDetailReply"></a>

### GetSessionDetailReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |
| value | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_logging-GetSessionDetailRequest"></a>

### GetSessionDetailRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |






<a name="system_monitor_logging-LoggingChannelValue"></a>

### LoggingChannelValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| channel_id | [uint32](#uint32) |  |  |
| type | [system_monitor_common.LoggingType](#system_monitor_common-LoggingType) |  |  |
| value | [uint32](#uint32) |  |  |






<a name="system_monitor_logging-LoggingDurationReply"></a>

### LoggingDurationReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| estimated_time | [google.protobuf.Duration](#google-protobuf-Duration) |  |  |
| estimated_laps | [double](#double) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_logging-LoggingOffsetReply"></a>

### LoggingOffsetReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| offset | [uint32](#uint32) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_logging-LoggingOffsetRequest"></a>

### LoggingOffsetRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| offset | [uint32](#uint32) |  |  |






<a name="system_monitor_logging-LoggingParameter"></a>

### LoggingParameter



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |
| parameter_name | [string](#string) |  |  |
| parameter_description | [string](#string) |  |  |
| data_size | [uint32](#uint32) |  |  |
| values | [LoggingChannelValue](#system_monitor_logging-LoggingChannelValue) | repeated |  |
| slot | [uint32](#uint32) |  |  |






<a name="system_monitor_logging-LoggingParametersReply"></a>

### LoggingParametersReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [LoggingParameter](#system_monitor_logging-LoggingParameter) | repeated |  |
| channel_names | [string](#string) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_logging-SetSessionDetailRequest"></a>

### SetSessionDetailRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="system_monitor_logging-SlotCountReply"></a>

### SlotCountReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slot_count | [uint32](#uint32) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_logging-SlotPercentageReply"></a>

### SlotPercentageReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |
| slot_percentage | [double](#double) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_logging-Trigger"></a>

### Trigger



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  |  |
| start_conditions | [TriggerCondition](#system_monitor_logging-TriggerCondition) | repeated |  |
| stop_conditions | [TriggerCondition](#system_monitor_logging-TriggerCondition) | repeated |  |
| start_post_trigger | [int32](#int32) |  |  |
| stop_post_trigger | [int32](#int32) |  |  |
| slot | [uint32](#uint32) |  |  |






<a name="system_monitor_logging-TriggerCondition"></a>

### TriggerCondition



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  |  |
| type | [system_monitor_common.TriggerType](#system_monitor_common-TriggerType) |  |  |
| parameter_id | [string](#string) |  |  |
| app_id | [uint32](#uint32) |  |  |
| operator | [system_monitor_common.TriggerOperator](#system_monitor_common-TriggerOperator) |  |  |
| threshold | [double](#double) |  |  |
| repeat_count | [uint32](#uint32) |  |  |






<a name="system_monitor_logging-TriggerRequest"></a>

### TriggerRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  |  |
| start_conditions | [TriggerCondition](#system_monitor_logging-TriggerCondition) | repeated |  |
| stop_conditions | [TriggerCondition](#system_monitor_logging-TriggerCondition) | repeated |  |
| start_post_trigger | [int32](#int32) |  |  |
| stop_post_trigger | [int32](#int32) |  |  |






<a name="system_monitor_logging-TriggersReply"></a>

### TriggersReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| triggers | [Trigger](#system_monitor_logging-Trigger) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_logging-WrapReply"></a>

### WrapReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| wrap | [bool](#bool) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_logging-WrapRequest"></a>

### WrapRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| wrap | [bool](#bool) |  |  |





 

 

 


<a name="system_monitor_logging-SystemMonitorLogging"></a>

### SystemMonitorLogging


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetLoggingChannelProperties | [.google.protobuf.Empty](#google-protobuf-Empty) | [ChannelPropertiesReply](#system_monitor_logging-ChannelPropertiesReply) |  |
| SetLoggingChannelProperties | [ChannelRequest](#system_monitor_logging-ChannelRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetLoggingTriggers | [.google.protobuf.Empty](#google-protobuf-Empty) | [TriggersReply](#system_monitor_logging-TriggersReply) |  |
| SetLoggingTrigger | [TriggerRequest](#system_monitor_logging-TriggerRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetLoggingWrap | [.google.protobuf.Empty](#google-protobuf-Empty) | [WrapReply](#system_monitor_logging-WrapReply) |  |
| SetLoggingWrap | [WrapRequest](#system_monitor_logging-WrapRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetLoggingOffset | [.google.protobuf.Empty](#google-protobuf-Empty) | [LoggingOffsetReply](#system_monitor_logging-LoggingOffsetReply) |  |
| SetLoggingOffset | [LoggingOffsetRequest](#system_monitor_logging-LoggingOffsetRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetLoggingSessionDetails | [GetSessionDetailRequest](#system_monitor_logging-GetSessionDetailRequest) | [GetSessionDetailReply](#system_monitor_logging-GetSessionDetailReply) |  |
| SetLoggingSessionDetails | [SetSessionDetailRequest](#system_monitor_logging-SetSessionDetailRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetLoggingDuration | [.google.protobuf.Empty](#google-protobuf-Empty) | [LoggingDurationReply](#system_monitor_logging-LoggingDurationReply) |  |
| GetLoggingParameterDetails | [.google.protobuf.Empty](#google-protobuf-Empty) | [LoggingParametersReply](#system_monitor_logging-LoggingParametersReply) |  |
| LoggingConfigDownloadInProgress | [.google.protobuf.Empty](#google-protobuf-Empty) | [DownloadProgressReply](#system_monitor_logging-DownloadProgressReply) |  |
| LoggingConfigDownload | [DownloadRequest](#system_monitor_logging-DownloadRequest) | [DownloadReply](#system_monitor_logging-DownloadReply) |  |
| LoggingConfigUpload | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| RemoveLoggingParameter | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| ClearAllLoggingParameters | [ClearRequest](#system_monitor_logging-ClearRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetLoggingSlotsUsed | [.google.protobuf.Empty](#google-protobuf-Empty) | [SlotCountReply](#system_monitor_logging-SlotCountReply) |  |
| GetLoggingSlotPercentage | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [SlotPercentageReply](#system_monitor_logging-SlotPercentageReply) |  |
| GetECULoggingConfig | [.google.protobuf.Empty](#google-protobuf-Empty) | [ConfigReply](#system_monitor_logging-ConfigReply) |  |
| AddLoggingParameter | [AddParameterRequest](#system_monitor_logging-AddParameterRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| AddVirtualLoggingParameter | [AddVirtualParameterRequest](#system_monitor_logging-AddVirtualParameterRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |

 



<a name="Protos_system_monitor_parameter-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## Protos/system_monitor_parameter.proto



<a name="system_monitor_parameter-AddressReply"></a>

### AddressReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |
| address | [uint32](#uint32) |  |  |
| ident | [uint32](#uint32) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-AppArray1dParameterValuesRequest"></a>

### AppArray1dParameterValuesRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameters | [Array1dParameterSetValue](#system_monitor_parameter-Array1dParameterSetValue) | repeated |  |






<a name="system_monitor_parameter-AppArray2dParameterValuesRequest"></a>

### AppArray2dParameterValuesRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameters | [Array2dParameterSetValue](#system_monitor_parameter-Array2dParameterSetValue) | repeated |  |






<a name="system_monitor_parameter-AppParameterValuesRequest"></a>

### AppParameterValuesRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameters | [ParameterSetValue](#system_monitor_parameter-ParameterSetValue) | repeated |  |






<a name="system_monitor_parameter-AppStringParameterValuesRequest"></a>

### AppStringParameterValuesRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameters | [StringParameterSetValue](#system_monitor_parameter-StringParameterSetValue) | repeated |  |






<a name="system_monitor_parameter-AppTypeRequest"></a>

### AppTypeRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| data_type | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) |  | Optional: Use ParameterType.Undefined for ALL |






<a name="system_monitor_parameter-Array1dParameterErrorsReply"></a>

### Array1dParameterErrorsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [Array1dParameterValue](#system_monitor_parameter-Array1dParameterValue) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-Array1dParameterSetValue"></a>

### Array1dParameterSetValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |
| values | [double](#double) | repeated |  |






<a name="system_monitor_parameter-Array1dParameterValue"></a>

### Array1dParameterValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |
| values | [double](#double) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-Array1dValueReply"></a>

### Array1dValueReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| values | [Array1dValues](#system_monitor_parameter-Array1dValues) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-Array1dValues"></a>

### Array1dValues



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |
| values | [double](#double) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-Array2dParameterErrorsReply"></a>

### Array2dParameterErrorsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [Array2dParameterValue](#system_monitor_parameter-Array2dParameterValue) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-Array2dParameterSetValue"></a>

### Array2dParameterSetValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |
| rows | [RowValues](#system_monitor_parameter-RowValues) | repeated |  |






<a name="system_monitor_parameter-Array2dParameterValue"></a>

### Array2dParameterValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |
| rows | [RowValues](#system_monitor_parameter-RowValues) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-Array2dValueReply"></a>

### Array2dValueReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| values | [Array2dValues](#system_monitor_parameter-Array2dValues) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-Array2dValues"></a>

### Array2dValues



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |
| rows | [RowValues](#system_monitor_parameter-RowValues) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-AxisParametersReply"></a>

### AxisParametersReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_ids | [string](#string) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-BitMaskReply"></a>

### BitMaskReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |
| mask | [int32](#int32) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-BitShiftReply"></a>

### BitShiftReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |
| shift | [int32](#int32) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-ByteOrderReply"></a>

### ByteOrderReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |
| byte_order | [system_monitor_common.ByteOrder](#system_monitor_common-ByteOrder) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-CANParameterProperties"></a>

### CANParameterProperties



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| Id | [string](#string) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| lower_display_limit | [double](#double) |  |  |
| upper_display_limit | [double](#double) |  |  |
| min_logging_rate | [uint32](#uint32) |  |  |
| scaling_factor | [uint32](#uint32) |  |  |
| min_not_defined | [bool](#bool) |  |  |
| conversion_id | [string](#string) |  |  |
| rx | [bool](#bool) |  |  |
| data_type | [system_monitor_common.DataType](#system_monitor_common-DataType) |  |  |
| can_bus | [string](#string) |  |  |
| can_message | [string](#string) |  |  |
| can_start_bit | [uint32](#uint32) |  |  |
| can_bit_length | [uint32](#uint32) |  |  |
| can_gain | [double](#double) |  |  |
| can_offset | [double](#double) |  |  |
| can_mux_id | [string](#string) |  |  |
| can_byte_order | [system_monitor_common.ByteOrder](#system_monitor_common-ByteOrder) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-CANParameterPropertiesReply"></a>

### CANParameterPropertiesReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [CANParameterProperties](#system_monitor_parameter-CANParameterProperties) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-Conversion"></a>

### Conversion



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| type | [system_monitor_common.ConversionType](#system_monitor_common-ConversionType) |  |  |






<a name="system_monitor_parameter-ConversionListReply"></a>

### ConversionListReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversions | [Conversion](#system_monitor_parameter-Conversion) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-ConversionNoAppRequest"></a>

### ConversionNoAppRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  |  |






<a name="system_monitor_parameter-ConversionTypeReply"></a>

### ConversionTypeReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  |  |
| type | [system_monitor_common.ConversionType](#system_monitor_common-ConversionType) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-ExternalParameterRequest"></a>

### ExternalParameterRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |






<a name="system_monitor_parameter-ExternalReply"></a>

### ExternalReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |
| gain | [double](#double) |  |  |
| offset | [double](#double) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-ExternalRequest"></a>

### ExternalRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |
| gain | [double](#double) |  |  |
| offset | [double](#double) |  |  |






<a name="system_monitor_parameter-FormulaConversionReply"></a>

### FormulaConversionReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  |  |
| comment | [string](#string) |  |  |
| format | [string](#string) |  |  |
| units | [string](#string) |  |  |
| formula | [string](#string) |  |  |
| inverse | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-FormulaConversionRequest"></a>

### FormulaConversionRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  |  |
| comment | [string](#string) |  |  |
| format | [string](#string) |  |  |
| units | [string](#string) |  |  |
| formula | [string](#string) |  |  |
| inverse | [string](#string) |  |  |
| overwrite | [bool](#bool) |  |  |






<a name="system_monitor_parameter-LoggableReply"></a>

### LoggableReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |
| loggable | [bool](#bool) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-MapPropertiesReply"></a>

### MapPropertiesReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |
| x_axis_id | [string](#string) |  |  |
| y_axis_id | [string](#string) |  |  |
| x_points | [uint32](#uint32) |  |  |
| y_points | [uint32](#uint32) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-OffsetReply"></a>

### OffsetReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |
| offset | [double](#double) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-OffsetRequest"></a>

### OffsetRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |
| offset | [double](#double) |  |  |






<a name="system_monitor_parameter-Parameter"></a>

### Parameter



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| name | [string](#string) |  |  |






<a name="system_monitor_parameter-ParameterErrorsReply"></a>

### ParameterErrorsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [ParameterValue](#system_monitor_parameter-ParameterValue) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-ParameterGroup"></a>

### ParameterGroup



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| group | [string](#string) |  |  |






<a name="system_monitor_parameter-ParameterGroupsReply"></a>

### ParameterGroupsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [ParameterGroup](#system_monitor_parameter-ParameterGroup) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-ParameterListReply"></a>

### ParameterListReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [Parameter](#system_monitor_parameter-Parameter) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-ParameterProperties"></a>

### ParameterProperties



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| Id | [string](#string) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| type | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) |  |  |
| units | [string](#string) |  |  |
| format | [string](#string) |  |  |
| conversion_id | [string](#string) |  |  |
| groups | [string](#string) | repeated |  |
| data_type | [system_monitor_common.DataType](#system_monitor_common-DataType) |  |  |
| data_size | [uint32](#uint32) |  |  |
| lower_engineering_limit | [double](#double) |  |  |
| upper_engineering_limit | [double](#double) |  |  |
| max_logging_rate | [uint32](#uint32) |  |  |
| prime | [bool](#bool) |  |  |
| read_only | [bool](#bool) |  |  |
| tuneable | [bool](#bool) |  |  |
| multiplexed_ids | [string](#string) | repeated |  |






<a name="system_monitor_parameter-ParameterPropertiesReply"></a>

### ParameterPropertiesReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [ParameterProperties](#system_monitor_parameter-ParameterProperties) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-ParameterSetValue"></a>

### ParameterSetValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |
| value | [double](#double) |  |  |






<a name="system_monitor_parameter-ParameterTypeRequest"></a>

### ParameterTypeRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |
| data_type | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) |  |  |






<a name="system_monitor_parameter-ParameterValue"></a>

### ParameterValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |
| value | [double](#double) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-ParametersReply"></a>

### ParametersReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_ids | [string](#string) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-RationalConversionReply"></a>

### RationalConversionReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  |  |
| coefficient1 | [double](#double) |  |  |
| coefficient2 | [double](#double) |  |  |
| coefficient3 | [double](#double) |  |  |
| coefficient4 | [double](#double) |  |  |
| coefficient5 | [double](#double) |  |  |
| coefficient6 | [double](#double) |  |  |
| comment | [string](#string) |  |  |
| format | [string](#string) |  |  |
| units | [string](#string) |  |  |
| default | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-RationalConversionRequest"></a>

### RationalConversionRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  |  |
| coefficient1 | [double](#double) |  |  |
| coefficient2 | [double](#double) |  |  |
| coefficient3 | [double](#double) |  |  |
| coefficient4 | [double](#double) |  |  |
| coefficient5 | [double](#double) |  |  |
| coefficient6 | [double](#double) |  |  |
| comment | [string](#string) |  |  |
| format | [string](#string) |  |  |
| units | [string](#string) |  |  |
| default | [string](#string) |  |  |
| overwrite | [bool](#bool) |  |  |






<a name="system_monitor_parameter-RowDetailsReply"></a>

### RowDetailsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| row_id | [uint32](#uint32) |  |  |
| ident_offset | [int32](#int32) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-RowValues"></a>

### RowValues



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| values | [double](#double) | repeated |  |






<a name="system_monitor_parameter-StringParameterErrorsReply"></a>

### StringParameterErrorsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [StringParameterValue](#system_monitor_parameter-StringParameterValue) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-StringParameterSetValue"></a>

### StringParameterSetValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="system_monitor_parameter-StringParameterValue"></a>

### StringParameterValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |
| value | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-StringValueReply"></a>

### StringValueReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| values | [StringParameterValue](#system_monitor_parameter-StringParameterValue) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-TableConversion"></a>

### TableConversion



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| raw | [double](#double) |  |  |
| mapped | [double](#double) |  |  |






<a name="system_monitor_parameter-TableConversionReply"></a>

### TableConversionReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  |  |
| comment | [string](#string) |  |  |
| format | [string](#string) |  |  |
| units | [string](#string) |  |  |
| default | [string](#string) |  |  |
| interpolate | [bool](#bool) |  |  |
| values | [TableConversion](#system_monitor_parameter-TableConversion) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-TableConversionRequest"></a>

### TableConversionRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  |  |
| comment | [string](#string) |  |  |
| format | [string](#string) |  |  |
| units | [string](#string) |  |  |
| default | [string](#string) |  |  |
| interpolate | [bool](#bool) |  |  |
| values | [TableConversion](#system_monitor_parameter-TableConversion) | repeated |  |
| overwrite | [bool](#bool) |  |  |






<a name="system_monitor_parameter-TextConversion"></a>

### TextConversion



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| raw | [double](#double) |  |  |
| mapped | [string](#string) |  |  |






<a name="system_monitor_parameter-TextConversionReply"></a>

### TextConversionReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  |  |
| format | [string](#string) |  |  |
| units | [string](#string) |  |  |
| default | [string](#string) |  |  |
| values | [TextConversion](#system_monitor_parameter-TextConversion) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-TextConversionRequest"></a>

### TextConversionRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| conversion_id | [string](#string) |  |  |
| format | [string](#string) |  |  |
| units | [string](#string) |  |  |
| default | [string](#string) |  |  |
| values | [TextConversion](#system_monitor_parameter-TextConversion) | repeated |  |
| overwrite | [bool](#bool) |  |  |






<a name="system_monitor_parameter-TypeRequest"></a>

### TypeRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| data_type | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) |  |  |






<a name="system_monitor_parameter-UndoRequest"></a>

### UndoRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| buffer_type | [system_monitor_common.BufferType](#system_monitor_common-BufferType) |  |  |






<a name="system_monitor_parameter-ValueReply"></a>

### ValueReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| values | [ParameterValue](#system_monitor_parameter-ParameterValue) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-WarningLimitsReply"></a>

### WarningLimitsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |
| low | [double](#double) |  |  |
| high | [double](#double) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_parameter-WarningLimitsRequest"></a>

### WarningLimitsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |
| low | [double](#double) |  |  |
| high | [double](#double) |  |  |





 

 

 


<a name="system_monitor_parameter-SystemMonitorParameter"></a>

### SystemMonitorParameter


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetParameters | [AppTypeRequest](#system_monitor_parameter-AppTypeRequest) | [ParameterListReply](#system_monitor_parameter-ParameterListReply) |  |
| GetConversions | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [ConversionListReply](#system_monitor_parameter-ConversionListReply) |  |
| GetParameterAndGroups | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [ParameterGroupsReply](#system_monitor_parameter-ParameterGroupsReply) |  |
| GetParameterProperties | [AppTypeRequest](#system_monitor_parameter-AppTypeRequest) | [ParameterPropertiesReply](#system_monitor_parameter-ParameterPropertiesReply) |  |
| GetCANParameterProperties | [.system_monitor_common.ParametersRequest](#system_monitor_common-ParametersRequest) | [CANParameterPropertiesReply](#system_monitor_parameter-CANParameterPropertiesReply) |  |
| GetMapProperties | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [MapPropertiesReply](#system_monitor_parameter-MapPropertiesReply) |  |
| GetRowDetails | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [RowDetailsReply](#system_monitor_parameter-RowDetailsReply) |  |
| GetParameterBitMask | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [BitMaskReply](#system_monitor_parameter-BitMaskReply) |  |
| GetParameterBitShift | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [BitShiftReply](#system_monitor_parameter-BitShiftReply) |  |
| GetParameterAddress | [ParameterTypeRequest](#system_monitor_parameter-ParameterTypeRequest) | [AddressReply](#system_monitor_parameter-AddressReply) |  |
| GetParameterByteOrder | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [ByteOrderReply](#system_monitor_parameter-ByteOrderReply) |  |
| ParameterLoggable | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [LoggableReply](#system_monitor_parameter-LoggableReply) |  |
| GetExternalInputGainOffset | [ExternalParameterRequest](#system_monitor_parameter-ExternalParameterRequest) | [ExternalReply](#system_monitor_parameter-ExternalReply) |  |
| SetExternalInputGainOffset | [ExternalRequest](#system_monitor_parameter-ExternalRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetModifiedParameters | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [ParameterListReply](#system_monitor_parameter-ParameterListReply) |  |
| GetParameterWarningLimits | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [WarningLimitsReply](#system_monitor_parameter-WarningLimitsReply) |  |
| SetParameterWarningLimits | [WarningLimitsRequest](#system_monitor_parameter-WarningLimitsRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| DeleteMinMax | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| ExportInputSignals | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| ImportInputSignals | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| RegenerateInputSignalParameters | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| UndoDataChanges | [UndoRequest](#system_monitor_parameter-UndoRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| RestoreValue | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetAxisParameterFromMap | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [AxisParametersReply](#system_monitor_parameter-AxisParametersReply) |  |
| GetConversionUse | [.system_monitor_common.ConversionRequest](#system_monitor_common-ConversionRequest) | [ParametersReply](#system_monitor_parameter-ParametersReply) |  |
| GetConversionType | [ConversionNoAppRequest](#system_monitor_parameter-ConversionNoAppRequest) | [ConversionTypeReply](#system_monitor_parameter-ConversionTypeReply) |  |
| GetRationalConversion | [ConversionNoAppRequest](#system_monitor_parameter-ConversionNoAppRequest) | [RationalConversionReply](#system_monitor_parameter-RationalConversionReply) |  |
| GetTableConversion | [ConversionNoAppRequest](#system_monitor_parameter-ConversionNoAppRequest) | [TableConversionReply](#system_monitor_parameter-TableConversionReply) |  |
| GetTextConversion | [ConversionNoAppRequest](#system_monitor_parameter-ConversionNoAppRequest) | [TextConversionReply](#system_monitor_parameter-TextConversionReply) |  |
| GetFormulaConversion | [ConversionNoAppRequest](#system_monitor_parameter-ConversionNoAppRequest) | [FormulaConversionReply](#system_monitor_parameter-FormulaConversionReply) |  |
| GetAppRationalConversion | [.system_monitor_common.ConversionRequest](#system_monitor_common-ConversionRequest) | [RationalConversionReply](#system_monitor_parameter-RationalConversionReply) |  |
| GetAppTableConversion | [.system_monitor_common.ConversionRequest](#system_monitor_common-ConversionRequest) | [TableConversionReply](#system_monitor_parameter-TableConversionReply) |  |
| SetRationalConversion | [RationalConversionRequest](#system_monitor_parameter-RationalConversionRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| SetTableConversion | [TableConversionRequest](#system_monitor_parameter-TableConversionRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| SetTextConversion | [TextConversionRequest](#system_monitor_parameter-TextConversionRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| SetFormulaConversion | [FormulaConversionRequest](#system_monitor_parameter-FormulaConversionRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetValueOffset | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [OffsetReply](#system_monitor_parameter-OffsetReply) |  |
| SetValueOffset | [OffsetRequest](#system_monitor_parameter-OffsetRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| ZeroLiveValue | [.system_monitor_common.ParameterRequest](#system_monitor_common-ParameterRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetValueMeasurement | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [ValueReply](#system_monitor_parameter-ValueReply) |  |
| GetValueScalar | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [ValueReply](#system_monitor_parameter-ValueReply) |  |
| GetValue1AxisMap | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [Array1dValueReply](#system_monitor_parameter-Array1dValueReply) |  |
| GetValue2AxisMap | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [Array2dValueReply](#system_monitor_parameter-Array2dValueReply) |  |
| GetValueAxis | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [Array1dValueReply](#system_monitor_parameter-Array1dValueReply) |  |
| GetValueArray | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [Array1dValueReply](#system_monitor_parameter-Array1dValueReply) |  |
| GetValueString | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [StringValueReply](#system_monitor_parameter-StringValueReply) |  |
| GetValueCAN | [.system_monitor_common.ParametersRequest](#system_monitor_common-ParametersRequest) | [ValueReply](#system_monitor_parameter-ValueReply) |  |
| GetValueVirtual | [.system_monitor_common.ParametersRequest](#system_monitor_common-ParametersRequest) | [ValueReply](#system_monitor_parameter-ValueReply) |  |
| GetDTVValueScalar | [.system_monitor_common.ParametersFileRequest](#system_monitor_common-ParametersFileRequest) | [ValueReply](#system_monitor_parameter-ValueReply) |  |
| GetDTVValue1AxisMap | [.system_monitor_common.ParametersFileRequest](#system_monitor_common-ParametersFileRequest) | [Array1dValueReply](#system_monitor_parameter-Array1dValueReply) |  |
| GetDTVValue2AxisMap | [.system_monitor_common.ParametersFileRequest](#system_monitor_common-ParametersFileRequest) | [Array2dValueReply](#system_monitor_parameter-Array2dValueReply) |  |
| GetDTVValueAxis | [.system_monitor_common.ParametersFileRequest](#system_monitor_common-ParametersFileRequest) | [Array1dValueReply](#system_monitor_parameter-Array1dValueReply) |  |
| GetDTVValueArray | [.system_monitor_common.ParametersFileRequest](#system_monitor_common-ParametersFileRequest) | [Array1dValueReply](#system_monitor_parameter-Array1dValueReply) |  |
| GetDTVValueString | [.system_monitor_common.ParametersFileRequest](#system_monitor_common-ParametersFileRequest) | [StringValueReply](#system_monitor_parameter-StringValueReply) |  |
| SetValueScalar | [AppParameterValuesRequest](#system_monitor_parameter-AppParameterValuesRequest) | [ParameterErrorsReply](#system_monitor_parameter-ParameterErrorsReply) |  |
| SetValue1AxisMap | [AppArray1dParameterValuesRequest](#system_monitor_parameter-AppArray1dParameterValuesRequest) | [Array1dParameterErrorsReply](#system_monitor_parameter-Array1dParameterErrorsReply) |  |
| SetValue2AxisMap | [AppArray2dParameterValuesRequest](#system_monitor_parameter-AppArray2dParameterValuesRequest) | [Array2dParameterErrorsReply](#system_monitor_parameter-Array2dParameterErrorsReply) |  |
| SetValueAxis | [AppArray1dParameterValuesRequest](#system_monitor_parameter-AppArray1dParameterValuesRequest) | [Array1dParameterErrorsReply](#system_monitor_parameter-Array1dParameterErrorsReply) |  |
| SetValueArray | [AppArray1dParameterValuesRequest](#system_monitor_parameter-AppArray1dParameterValuesRequest) | [Array1dParameterErrorsReply](#system_monitor_parameter-Array1dParameterErrorsReply) |  |
| SetValueString | [AppStringParameterValuesRequest](#system_monitor_parameter-AppStringParameterValuesRequest) | [StringParameterErrorsReply](#system_monitor_parameter-StringParameterErrorsReply) |  |

 



<a name="Protos_system_monitor_project-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## Protos/system_monitor_project.proto



<a name="system_monitor_project-ActiveAppReply"></a>

### ActiveAppReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_ids | [uint32](#uint32) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-AppFileRequest"></a>

### AppFileRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| file_path | [string](#string) |  |  |






<a name="system_monitor_project-AppReply"></a>

### AppReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| text | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-Application"></a>

### Application



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| app_name | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-CANMergeRequest"></a>

### CANMergeRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  |  |
| file_path | [string](#string) |  |  |
| merge | [bool](#bool) |  |  |






<a name="system_monitor_project-CANRequest"></a>

### CANRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  |  |
| file_path | [string](#string) |  |  |






<a name="system_monitor_project-CompareAppReply"></a>

### CompareAppReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [CompareParameter](#system_monitor_project-CompareParameter) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-CompareAppRequest"></a>

### CompareAppRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| dtv1_path | [string](#string) |  |  |
| dtv2_path | [string](#string) |  |  |






<a name="system_monitor_project-CompareParameter"></a>

### CompareParameter



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |
| type | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) |  |  |
| reason1 | [ReasonCode](#system_monitor_project-ReasonCode) |  |  |
| reason2 | [ReasonCode](#system_monitor_project-ReasonCode) |  |  |






<a name="system_monitor_project-DTVModifiedReply"></a>

### DTVModifiedReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| modified | [bool](#bool) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-DTVSaveCopyRequest"></a>

### DTVSaveCopyRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| save_path | [string](#string) |  |  |
| comment | [string](#string) |  |  |
| notes | [string](#string) |  |  |
| consortium | [string](#string) |  |  |






<a name="system_monitor_project-DTVSaveIncrementRequest"></a>

### DTVSaveIncrementRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| comment | [string](#string) |  |  |
| notes | [string](#string) |  |  |






<a name="system_monitor_project-DTVSaveRequest"></a>

### DTVSaveRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| save_path | [string](#string) |  |  |
| comment | [string](#string) |  |  |
| notes | [string](#string) |  |  |






<a name="system_monitor_project-DTVSavedOnReply"></a>

### DTVSavedOnReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| saved_on | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-DetailsRequest"></a>

### DetailsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| text | [string](#string) |  |  |






<a name="system_monitor_project-EnableRequest"></a>

### EnableRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| enable | [bool](#bool) |  |  |






<a name="system_monitor_project-ErrorDefinition"></a>

### ErrorDefinition



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| group | [string](#string) |  |  |
| bit_number | [uint32](#uint32) |  |  |
| current | [string](#string) |  |  |
| logged | [string](#string) |  |  |






<a name="system_monitor_project-ErrorDefinitionsReply"></a>

### ErrorDefinitionsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error_definitions | [ErrorDefinition](#system_monitor_project-ErrorDefinition) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-ErrorInstance"></a>

### ErrorInstance



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| status | [system_monitor_common.ErrorStatus](#system_monitor_common-ErrorStatus) |  |  |






<a name="system_monitor_project-ErrorReply"></a>

### ErrorReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error_instances | [ErrorInstance](#system_monitor_project-ErrorInstance) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-Event"></a>

### Event



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [uint32](#uint32) |  |  |
| name | [string](#string) |  |  |
| priority | [system_monitor_common.EventPriority](#system_monitor_common-EventPriority) |  |  |






<a name="system_monitor_project-EventReply"></a>

### EventReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| event_id | [uint32](#uint32) |  |  |
| description | [string](#string) |  |  |
| conversion_id1 | [string](#string) |  |  |
| conversion_id2 | [string](#string) |  |  |
| conversion_id3 | [string](#string) |  |  |
| priority | [system_monitor_common.EventPriority](#system_monitor_common-EventPriority) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-EventRequest"></a>

### EventRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| event_id | [uint32](#uint32) |  |  |






<a name="system_monitor_project-EventsReply"></a>

### EventsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| events | [Event](#system_monitor_project-Event) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-ExistsReply"></a>

### ExistsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| exists | [bool](#bool) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-ExistsRequest"></a>

### ExistsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| parameter_id | [string](#string) |  |  |
| data_type | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-FileDetailsReply"></a>

### FileDetailsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| saved_by | [string](#string) |  |  |
| saved_on | [google.protobuf.Timestamp](#google-protobuf-Timestamp) |  |  |
| comment | [string](#string) |  |  |
| notes | [string](#string) |  |  |
| build | [uint32](#uint32) |  |  |
| consortium | [string](#string) |  |  |
| owner | [string](#string) |  |  |
| rda | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-FileNameRequest"></a>

### FileNameRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_type | [system_monitor_common.FileType](#system_monitor_common-FileType) |  |  |
| slot | [uint32](#uint32) |  |  |






<a name="system_monitor_project-FileNewRequest"></a>

### FileNewRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_type | [system_monitor_common.FileType](#system_monitor_common-FileType) |  |  |
| file_path | [string](#string) |  |  |
| save_existing | [bool](#bool) |  |  |
| overwrite | [bool](#bool) |  |  |






<a name="system_monitor_project-FileOpenRequest"></a>

### FileOpenRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_type | [system_monitor_common.FileType](#system_monitor_common-FileType) |  |  |
| file_path | [string](#string) |  |  |
| slot | [uint32](#uint32) |  |  |
| activate | [bool](#bool) |  |  |






<a name="system_monitor_project-FileReply"></a>

### FileReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_path | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-FileSaveRequest"></a>

### FileSaveRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_type | [system_monitor_common.FileType](#system_monitor_common-FileType) |  |  |
| file_path | [string](#string) |  |  |
| comment | [string](#string) |  |  |
| notes | [string](#string) |  |  |
| consortium | [string](#string) |  |  |
| save_copy_as | [bool](#bool) |  |  |






<a name="system_monitor_project-GetAppDetailsReply"></a>

### GetAppDetailsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| apps | [Application](#system_monitor_project-Application) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-GetBuildNumberReply"></a>

### GetBuildNumberReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| build_number | [uint32](#uint32) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-GetVersionNumberReply"></a>

### GetVersionNumberReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| major_version | [uint32](#uint32) |  |  |
| minor_version | [uint32](#uint32) |  |  |
| build_version | [uint32](#uint32) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-MatlabDTVRequest"></a>

### MatlabDTVRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| dtv_path | [string](#string) |  |  |
| export_path | [string](#string) |  |  |
| data_only | [bool](#bool) |  |  |
| data_types | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) | repeated |  |






<a name="system_monitor_project-MatlabRequest"></a>

### MatlabRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| export_path | [string](#string) |  |  |
| data_only | [bool](#bool) |  |  |
| data_types | [system_monitor_common.ParameterType](#system_monitor_common-ParameterType) | repeated |  |






<a name="system_monitor_project-MatlabSelectedRequest"></a>

### MatlabSelectedRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| export_path | [string](#string) |  |  |
| data_only | [bool](#bool) |  |  |
| parameter_ids | [string](#string) | repeated |  |






<a name="system_monitor_project-MultiAppReply"></a>

### MultiAppReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_ids | [uint32](#uint32) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-MultiAppRequest"></a>

### MultiAppRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_ids | [uint32](#uint32) | repeated |  |






<a name="system_monitor_project-PGVIDReply"></a>

### PGVIDReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pgv_id | [uint32](#uint32) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-ParameterIdRequest"></a>

### ParameterIdRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameter_id | [string](#string) |  |  |






<a name="system_monitor_project-ProjectCloseRequest"></a>

### ProjectCloseRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| action | [int32](#int32) |  |  |






<a name="system_monitor_project-ProjectCreateRequest"></a>

### ProjectCreateRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| project_path | [string](#string) |  |  |
| app_paths | [string](#string) | repeated |  |
| desktop_path | [string](#string) |  |  |
| virtuals_path | [string](#string) |  |  |
| can_path | [string](#string) |  |  |
| logging_config_path | [string](#string) |  |  |






<a name="system_monitor_project-ProjectExportRequest"></a>

### ProjectExportRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| save_modified | [bool](#bool) |  |  |






<a name="system_monitor_project-ProjectImportRequest"></a>

### ProjectImportRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| project_path | [string](#string) |  |  |
| base | [string](#string) |  |  |






<a name="system_monitor_project-ProjectSaveAsRequest"></a>

### ProjectSaveAsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| project_name | [string](#string) |  |  |
| save_all | [bool](#bool) |  |  |
| comments | [string](#string) |  |  |
| notes | [string](#string) |  |  |






<a name="system_monitor_project-ProjectSaveRequest"></a>

### ProjectSaveRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| save_all | [bool](#bool) |  |  |






<a name="system_monitor_project-ReasonCode"></a>

### ReasonCode



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| reasons | [system_monitor_common.Reason](#system_monitor_common-Reason) | repeated |  |






<a name="system_monitor_project-ReprogramRequest"></a>

### ReprogramRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_ids | [uint32](#uint32) | repeated |  |
| force | [bool](#bool) |  |  |






<a name="system_monitor_project-SensorRequest"></a>

### SensorRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| sensor | [string](#string) |  |  |
| serial_number | [int32](#int32) |  |  |






<a name="system_monitor_project-SlotActiveRequest"></a>

### SlotActiveRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slot | [uint32](#uint32) |  |  |
| active | [bool](#bool) |  |  |






<a name="system_monitor_project-SlotReply"></a>

### SlotReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| active | [bool](#bool) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_project-SlotRequest"></a>

### SlotRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| slot | [uint32](#uint32) |  |  |






<a name="system_monitor_project-SyncedReply"></a>

### SyncedReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| synced | [bool](#bool) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |





 

 

 


<a name="system_monitor_project-SystemMonitorProject"></a>

### SystemMonitorProject


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| ProjectOpen | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| ProjectClose | [ProjectCloseRequest](#system_monitor_project-ProjectCloseRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| ProjectCreate | [ProjectCreateRequest](#system_monitor_project-ProjectCreateRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| ProjectSave | [ProjectSaveRequest](#system_monitor_project-ProjectSaveRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| ProjectSaveAs | [ProjectSaveAsRequest](#system_monitor_project-ProjectSaveAsRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| ProjectImport | [ProjectImportRequest](#system_monitor_project-ProjectImportRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| ProjectExport | [ProjectExportRequest](#system_monitor_project-ProjectExportRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| Reprogram | [ReprogramRequest](#system_monitor_project-ReprogramRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| DownloadDataChanges | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| EditBufferSynced | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [SyncedReply](#system_monitor_project-SyncedReply) |  |
| UploadDataVersion | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetVersionNumber | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetVersionNumberReply](#system_monitor_project-GetVersionNumberReply) |  |
| GetPGVVersion | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [AppReply](#system_monitor_project-AppReply) |  |
| GetPGVID | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [PGVIDReply](#system_monitor_project-PGVIDReply) |  |
| GetDTVVersion | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [AppReply](#system_monitor_project-AppReply) |  |
| GetEcuDTVVersion | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [AppReply](#system_monitor_project-AppReply) |  |
| GetNextDTVVersion | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [AppReply](#system_monitor_project-AppReply) |  |
| GetDTVModified | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [DTVModifiedReply](#system_monitor_project-DTVModifiedReply) |  |
| GetDTVSavedOn | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [DTVSavedOnReply](#system_monitor_project-DTVSavedOnReply) |  |
| GetDTVNotes | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [AppReply](#system_monitor_project-AppReply) |  |
| SetDTVNotes | [DetailsRequest](#system_monitor_project-DetailsRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| ClearDTVNotes | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetDTVComment | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [AppReply](#system_monitor_project-AppReply) |  |
| SetDTVComment | [DetailsRequest](#system_monitor_project-DetailsRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| EnableDTVBackup | [EnableRequest](#system_monitor_project-EnableRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| DTVOpen | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| DTVSave | [DTVSaveRequest](#system_monitor_project-DTVSaveRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| DTVSaveCopy | [DTVSaveCopyRequest](#system_monitor_project-DTVSaveCopyRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| DTVSaveIncrement | [DTVSaveIncrementRequest](#system_monitor_project-DTVSaveIncrementRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetBuildNumber | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetBuildNumberReply](#system_monitor_project-GetBuildNumberReply) |  |
| GetAppDetails | [.google.protobuf.Empty](#google-protobuf-Empty) | [GetAppDetailsReply](#system_monitor_project-GetAppDetailsReply) |  |
| GetActiveApps | [.google.protobuf.Empty](#google-protobuf-Empty) | [ActiveAppReply](#system_monitor_project-ActiveAppReply) |  |
| SetActiveApps | [MultiAppRequest](#system_monitor_project-MultiAppRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| AddApp | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| RemoveApp | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| CompareApp | [CompareAppRequest](#system_monitor_project-CompareAppRequest) | [CompareAppReply](#system_monitor_project-CompareAppReply) |  |
| GetAppPULFile | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [FileReply](#system_monitor_project-FileReply) |  |
| SetAppPULFile | [AppFileRequest](#system_monitor_project-AppFileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GenerateParamSet | [.system_monitor_common.ParametersFileRequest](#system_monitor_common-ParametersFileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GeneratePULFile | [.system_monitor_common.AppParametersFileRequest](#system_monitor_common-AppParametersFileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GeneratePULFileFromParamSet | [AppFileRequest](#system_monitor_project-AppFileRequest) | [FileReply](#system_monitor_project-FileReply) |  |
| ChangeSensorSerialNumber | [SensorRequest](#system_monitor_project-SensorRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| FileOpen | [FileOpenRequest](#system_monitor_project-FileOpenRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| FileSave | [FileSaveRequest](#system_monitor_project-FileSaveRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| FileNew | [FileNewRequest](#system_monitor_project-FileNewRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetFileName | [FileNameRequest](#system_monitor_project-FileNameRequest) | [FileReply](#system_monitor_project-FileReply) |  |
| GetFileDetails | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [FileDetailsReply](#system_monitor_project-FileDetailsReply) |  |
| CreateFFCFromPGV | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| ExportToHexFile | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetActiveCANConfig | [SlotRequest](#system_monitor_project-SlotRequest) | [SlotReply](#system_monitor_project-SlotReply) |  |
| SetActiveCANConfig | [SlotActiveRequest](#system_monitor_project-SlotActiveRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetFIACANConfig | [SlotRequest](#system_monitor_project-SlotRequest) | [SlotReply](#system_monitor_project-SlotReply) |  |
| SetFIACANConfig | [SlotActiveRequest](#system_monitor_project-SlotActiveRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| CANBuffersExport | [CANRequest](#system_monitor_project-CANRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| CANBuffersImport | [CANRequest](#system_monitor_project-CANRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| CANMessagesExport | [CANRequest](#system_monitor_project-CANRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| CANMessagesImport | [CANMergeRequest](#system_monitor_project-CANMergeRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| CANConfigUnload | [SlotRequest](#system_monitor_project-SlotRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetActiveLoggingConfig | [SlotRequest](#system_monitor_project-SlotRequest) | [SlotReply](#system_monitor_project-SlotReply) |  |
| SetActiveLoggingConfig | [SlotActiveRequest](#system_monitor_project-SlotActiveRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| LoggingConfigUnload | [SlotRequest](#system_monitor_project-SlotRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| MatlabImport | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| MatlabExport | [MatlabRequest](#system_monitor_project-MatlabRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| MatlabExportDTV | [MatlabDTVRequest](#system_monitor_project-MatlabDTVRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| MatlabExportSelected | [MatlabSelectedRequest](#system_monitor_project-MatlabSelectedRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| AddParametersToUnlockList | [.system_monitor_common.AppParametersFileRequest](#system_monitor_common-AppParametersFileRequest) | [FileReply](#system_monitor_project-FileReply) |  |
| RemoveParametersFromUnlockList | [.system_monitor_common.AppParametersFileRequest](#system_monitor_common-AppParametersFileRequest) | [FileReply](#system_monitor_project-FileReply) |  |
| GetAppsHoldingParam | [ParameterIdRequest](#system_monitor_project-ParameterIdRequest) | [MultiAppReply](#system_monitor_project-MultiAppReply) |  |
| GetAppsHoldingMeasurementParam | [ParameterIdRequest](#system_monitor_project-ParameterIdRequest) | [MultiAppReply](#system_monitor_project-MultiAppReply) |  |
| GetAppsHoldingControlParam | [ParameterIdRequest](#system_monitor_project-ParameterIdRequest) | [MultiAppReply](#system_monitor_project-MultiAppReply) |  |
| ParameterExists | [ExistsRequest](#system_monitor_project-ExistsRequest) | [ExistsReply](#system_monitor_project-ExistsReply) |  |
| RegisterEnhancedRowParameters | [.system_monitor_common.AppParametersRequest](#system_monitor_common-AppParametersRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| ClearEnhancedRowParameters | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| RegisterCANEnhancedRowParameters | [.system_monitor_common.ParametersRequest](#system_monitor_common-ParametersRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| RegisterVirtualEnhancedRowParameters | [.system_monitor_common.ParametersRequest](#system_monitor_common-ParametersRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| ActivateEnhancedRowParameters | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| DumpEvents | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| DumpErrors | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| DumpRowData | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| ClearEvents | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetEvents | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [EventsReply](#system_monitor_project-EventsReply) |  |
| GetEventDetails | [EventRequest](#system_monitor_project-EventRequest) | [EventReply](#system_monitor_project-EventReply) |  |
| GetErrorDefinitions | [.system_monitor_common.AppRequest](#system_monitor_common-AppRequest) | [ErrorDefinitionsReply](#system_monitor_project-ErrorDefinitionsReply) |  |
| GetErrors | [.google.protobuf.Empty](#google-protobuf-Empty) | [ErrorReply](#system_monitor_project-ErrorReply) |  |
| DeleteErrors | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |

 



<a name="Protos_system_monitor_system-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## Protos/system_monitor_system.proto



<a name="system_monitor_system-BatchModeRequest"></a>

### BatchModeRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| mode | [bool](#bool) |  |  |






<a name="system_monitor_system-CreatePGVReply"></a>

### CreatePGVReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pgv_file_path | [string](#string) |  |  |
| dtv_file_path | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_system-CreatePGVRequest"></a>

### CreatePGVRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| location | [string](#string) |  |  |
| asap2_file_path | [string](#string) |  |  |
| hex_file_path | [string](#string) |  |  |
| controllers_file_path | [string](#string) |  |  |
| errors_file_path | [string](#string) |  |  |
| events_file_path | [string](#string) |  |  |
| adjustment_file_path | [string](#string) |  |  |
| sensors_file_path | [string](#string) |  |  |
| injector_file_path | [string](#string) |  |  |
| sensor_enable_file_path | [string](#string) |  |  |
| live_auto_tune_file_path | [string](#string) |  |  |
| comments | [string](#string) |  |  |
| notes | [string](#string) |  |  |






<a name="system_monitor_system-DeviceProperties"></a>

### DeviceProperties



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| comms_path | [string](#string) |  |  |
| device_name | [string](#string) |  |  |
| ip_address | [string](#string) |  |  |
| serial_number | [int32](#int32) |  |  |






<a name="system_monitor_system-DevicePropertiesReply"></a>

### DevicePropertiesReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| devices | [DeviceProperties](#system_monitor_system-DeviceProperties) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_system-FolderReply"></a>

### FolderReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_path | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_system-LicenceDetailsReply"></a>

### LicenceDetailsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| consortium | [string](#string) |  |  |
| owner | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_system-LiveLoggingReply"></a>

### LiveLoggingReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| live_logging_state | [bool](#bool) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_system-LiveLoggingRequest"></a>

### LiveLoggingRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [bool](#bool) |  |  |






<a name="system_monitor_system-LiveUpdateRequest"></a>

### LiveUpdateRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [bool](#bool) |  |  |
| action | [uint32](#uint32) |  |  |






<a name="system_monitor_system-MultiApplicationBaseInfo"></a>

### MultiApplicationBaseInfo



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |
| path | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_system-MultiApplicationBasesReply"></a>

### MultiApplicationBasesReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| info | [MultiApplicationBaseInfo](#system_monitor_system-MultiApplicationBaseInfo) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_system-MultiApplicationBasesRequest"></a>

### MultiApplicationBasesRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| base_name | [string](#string) |  |  |






<a name="system_monitor_system-OnlineRequest"></a>

### OnlineRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| state | [bool](#bool) |  |  |






<a name="system_monitor_system-SendMessageReply"></a>

### SendMessageReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| messages | [int32](#int32) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_system-SendMessageRequest"></a>

### SendMessageRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| app_id | [uint32](#uint32) |  |  |
| timeout | [uint32](#uint32) |  |  |
| retries | [uint32](#uint32) |  |  |
| messages | [int32](#int32) | repeated |  |






<a name="system_monitor_system-StatusReply"></a>

### StatusReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| link_status | [LinkStatus](#system_monitor_system-LinkStatus) |  |  |
| online | [bool](#bool) |  |  |
| live_update | [bool](#bool) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_system-UnitByIndexRequest"></a>

### UnitByIndexRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  |  |






<a name="system_monitor_system-UnitByIndexTypeRequest"></a>

### UnitByIndexTypeRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint32](#uint32) |  |  |
| primary | [bool](#bool) |  |  |






<a name="system_monitor_system-UnitInfo"></a>

### UnitInfo



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |
| type | [string](#string) |  |  |
| ip_address | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_system-UnitListReply"></a>

### UnitListReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| info | [UnitInfo](#system_monitor_system-UnitInfo) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_system-UnitNameReply"></a>

### UnitNameReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |





 


<a name="system_monitor_system-LinkStatus"></a>

### LinkStatus


| Name | Number | Description |
| ---- | ------ | ----------- |
| Link_OK | 0 |  |
| Link_NOK | 1 |  |
| Controller_Busy | 2 |  |
| In_Boot | 3 |  |
| Zone_1 | 4 |  |
| Zone_2 | 5 |  |
| Zone_3 | 6 |  |
| Bad_Response | 7 |  |
| Invalid_Device | 8 |  |
| Unknown | 65535 |  |


 

 


<a name="system_monitor_system-SystemMonitorSystem"></a>

### SystemMonitorSystem


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetStatus | [.google.protobuf.Empty](#google-protobuf-Empty) | [StatusReply](#system_monitor_system-StatusReply) |  |
| SetOnline | [OnlineRequest](#system_monitor_system-OnlineRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| SetLiveUpdate | [LiveUpdateRequest](#system_monitor_system-LiveUpdateRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetUnitList | [.google.protobuf.Empty](#google-protobuf-Empty) | [UnitListReply](#system_monitor_system-UnitListReply) |  |
| GetUnitName | [.google.protobuf.Empty](#google-protobuf-Empty) | [UnitNameReply](#system_monitor_system-UnitNameReply) |  |
| GetUnitByIndex | [UnitByIndexRequest](#system_monitor_system-UnitByIndexRequest) | [UnitInfo](#system_monitor_system-UnitInfo) |  |
| SetUnitByIndex | [UnitByIndexTypeRequest](#system_monitor_system-UnitByIndexTypeRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetMultiApplicationBases | [.google.protobuf.Empty](#google-protobuf-Empty) | [MultiApplicationBasesReply](#system_monitor_system-MultiApplicationBasesReply) |  |
| GetMultiApplicationBase | [.google.protobuf.Empty](#google-protobuf-Empty) | [MultiApplicationBaseInfo](#system_monitor_system-MultiApplicationBaseInfo) |  |
| SetMultiApplicationBase | [MultiApplicationBasesRequest](#system_monitor_system-MultiApplicationBasesRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetLicenceDetails | [.google.protobuf.Empty](#google-protobuf-Empty) | [LicenceDetailsReply](#system_monitor_system-LicenceDetailsReply) |  |
| GetDeviceProperties | [.google.protobuf.Empty](#google-protobuf-Empty) | [DevicePropertiesReply](#system_monitor_system-DevicePropertiesReply) |  |
| GetLiveLogging | [.google.protobuf.Empty](#google-protobuf-Empty) | [LiveLoggingReply](#system_monitor_system-LiveLoggingReply) |  |
| SetLiveLogging | [LiveLoggingRequest](#system_monitor_system-LiveLoggingRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| SetBatchMode | [BatchModeRequest](#system_monitor_system-BatchModeRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| SendMessage | [SendMessageRequest](#system_monitor_system-SendMessageRequest) | [SendMessageReply](#system_monitor_system-SendMessageReply) |  |
| GetLogFolder | [.google.protobuf.Empty](#google-protobuf-Empty) | [FolderReply](#system_monitor_system-FolderReply) |  |
| GetPPOFileName | [.google.protobuf.Empty](#google-protobuf-Empty) | [FolderReply](#system_monitor_system-FolderReply) |  |
| CreatePGV | [CreatePGVRequest](#system_monitor_system-CreatePGVRequest) | [CreatePGVReply](#system_monitor_system-CreatePGVReply) |  |

 



<a name="Protos_system_monitor_virtual-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## Protos/system_monitor_virtual.proto



<a name="system_monitor_virtual-AddGroupRequest"></a>

### AddGroupRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group_path | [string](#string) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| read_only | [bool](#bool) |  |  |






<a name="system_monitor_virtual-VirtualExportRequest"></a>

### VirtualExportRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| file_path | [string](#string) |  |  |
| group | [string](#string) |  |  |






<a name="system_monitor_virtual-VirtualGroupReply"></a>

### VirtualGroupReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| read_only | [bool](#bool) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_virtual-VirtualGroupRequest"></a>

### VirtualGroupRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| group | [string](#string) |  |  |






<a name="system_monitor_virtual-VirtualGroupsReply"></a>

### VirtualGroupsReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ids | [string](#string) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_virtual-VirtualParameter"></a>

### VirtualParameter



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_virtual-VirtualParameterDataTypeRequest"></a>

### VirtualParameterDataTypeRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| Id | [string](#string) |  |  |
| data_type | [system_monitor_common.DataType](#system_monitor_common-DataType) |  |  |






<a name="system_monitor_virtual-VirtualParameterProperties"></a>

### VirtualParameterProperties



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| Id | [string](#string) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| lower_display_limit | [double](#double) |  |  |
| upper_display_limit | [double](#double) |  |  |
| min_logging_rate | [uint32](#uint32) |  |  |
| scaling_factor | [uint32](#uint32) |  |  |
| min_not_defined | [bool](#bool) |  |  |
| expression | [string](#string) |  |  |
| units | [string](#string) |  |  |
| format | [string](#string) |  |  |
| group | [string](#string) |  |  |
| conversion_id | [string](#string) |  |  |
| data_type | [system_monitor_common.DataType](#system_monitor_common-DataType) |  |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_virtual-VirtualParameterPropertiesReply"></a>

### VirtualParameterPropertiesReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| parameters | [VirtualParameterProperties](#system_monitor_virtual-VirtualParameterProperties) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_virtual-VirtualParameterRequest"></a>

### VirtualParameterRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| id | [string](#string) |  |  |
| name | [string](#string) |  |  |
| description | [string](#string) |  |  |
| min_display | [double](#double) |  |  |
| max_display | [double](#double) |  |  |
| Min_logging_rate | [int32](#int32) |  |  |
| scaling_factor | [int32](#int32) |  |  |
| is_min_not_def | [bool](#bool) |  |  |
| expression | [string](#string) |  |  |
| conversion_id | [string](#string) |  |  |
| overwrite | [bool](#bool) |  |  |
| units | [string](#string) |  |  |
| format_override | [string](#string) |  |  |
| group | [string](#string) |  |  |
| data_type | [system_monitor_common.DataType](#system_monitor_common-DataType) |  |  |
| lower_warning | [double](#double) |  |  |
| upper_warning | [double](#double) |  |  |






<a name="system_monitor_virtual-VirtualReply"></a>

### VirtualReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ids | [VirtualParameter](#system_monitor_virtual-VirtualParameter) | repeated |  |
| return_code | [system_monitor_common.ErrorCode](#system_monitor_common-ErrorCode) |  |  |






<a name="system_monitor_virtual-VirtualsRequest"></a>

### VirtualsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ids | [string](#string) | repeated |  |





 

 

 


<a name="system_monitor_virtual-SystemMonitorVirtual"></a>

### SystemMonitorVirtual


| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| SetVirtualParameter | [VirtualParameterRequest](#system_monitor_virtual-VirtualParameterRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetVirtualParameterProperties | [.system_monitor_common.ParametersRequest](#system_monitor_common-ParametersRequest) | [VirtualParameterPropertiesReply](#system_monitor_virtual-VirtualParameterPropertiesReply) |  |
| RemoveVirtualParameters | [VirtualsRequest](#system_monitor_virtual-VirtualsRequest) | [VirtualReply](#system_monitor_virtual-VirtualReply) |  |
| RemoveAllVirtualParameters | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| RemoveVirtualConversions | [VirtualsRequest](#system_monitor_virtual-VirtualsRequest) | [VirtualReply](#system_monitor_virtual-VirtualReply) |  |
| RemoveAllVirtualConvertions | [.google.protobuf.Empty](#google-protobuf-Empty) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| GetVirtualParameterGroups | [.google.protobuf.Empty](#google-protobuf-Empty) | [VirtualGroupsReply](#system_monitor_virtual-VirtualGroupsReply) |  |
| GetVirtualParameterGroup | [VirtualGroupRequest](#system_monitor_virtual-VirtualGroupRequest) | [VirtualGroupReply](#system_monitor_virtual-VirtualGroupReply) |  |
| GetVirtualParametersInGroup | [VirtualGroupRequest](#system_monitor_virtual-VirtualGroupRequest) | [VirtualGroupsReply](#system_monitor_virtual-VirtualGroupsReply) |  |
| VirtualParametersExport | [VirtualExportRequest](#system_monitor_virtual-VirtualExportRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| VirtualParametersImport | [.system_monitor_common.FileRequest](#system_monitor_common-FileRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| AddVirtualParameterGroup | [AddGroupRequest](#system_monitor_virtual-AddGroupRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| RemoveVirtualParameterGroup | [VirtualGroupRequest](#system_monitor_virtual-VirtualGroupRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| RemoveAllVirtualParametersFromGroup | [VirtualGroupRequest](#system_monitor_virtual-VirtualGroupRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |
| SetVirtualParameterDataType | [VirtualParameterDataTypeRequest](#system_monitor_virtual-VirtualParameterDataTypeRequest) | [.system_monitor_common.Return](#system_monitor_common-Return) |  |

 



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

