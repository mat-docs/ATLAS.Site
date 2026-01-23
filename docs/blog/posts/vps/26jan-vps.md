---
date:
  created: 2026-01-23
categories:
  - Releases
tags:
  - Virtual Parameter Service
---

# Virtual Parameter Service Release: v2.1.1.7

This release brings improvements to the Virtual Parameter Service with updated streaming capabilities and enhanced logging features.
<!-- more -->

## Downloads

- **Docker:** [Container image](https://hub.docker.com/repository/docker/atlasplatformdocker/virtual-parameter-service-host/general)
- **Windows Binary:** [Download]({{URL_VPS_WIN_BINARY}})
- **Documentation:** [Read docs](../../../key-functionality/process/secu4/vps.md)

## Key Improvements

### Enhanced Streaming Functionality

**Updated streaming infrastructure** for better performance and reliability

- Improved handling of data streams with clearer naming conventions
- More consistent stream lifecycle management
- Better integration with the latest Stream API (v2.1.1.48)

**Benefits**

- **Better Performance**: Faster data processing and reduced latency
- **Improved Reliability**: More robust error handling and recovery
- **Clearer Organization**: Consistent topic naming makes monitoring easier

!!! tip "Stream Naming"
    Topics now follow the consistent naming convention with domain support:
    
    - System topics: `{Domain}.Sys.SessionInfo`
    - Data topics: `{Domain}.Data.VirtualParameters`
    - Essential topics: `{Domain}.Essential.CriticalParams`

### Better Logging

Enhanced logging capabilities to help you track and troubleshoot issues more effectively.

**What's Improved**

- **More detailed information** about service operations
- **Structured logging** using Serilog for better analysis
- **Configurable log levels** for different environments
- **Better error messages** with more context

**Example Log Output**

```
[14:23:45 INF] Virtual Parameter Service started
[14:23:46 INF] Connected to Stream API at Production.Data.VirtualParameters
[14:23:47 INF] Processing parameter calculation for session ABC-123
[14:23:48 INF] Stream Production.Data.VirtualParameters started
```

!!! success "Improved Debugging"
    Enhanced logging makes it much easier to diagnose issues and understand service behavior in production environments.

## Technical Details

**Configuration Updates**

No breaking configuration changes. Optionally, you can now specify a domain:

```json
{
  "StreamApiConfig": {
    "Domain": "Production",
    "BrokerUrl": "kafka-broker.company.com:9092"
  }
}
```

## Compatibility

**Backward Compatibility**

✅ Fully backward compatible with previous configurations  
✅ Existing parameter definitions continue to work  
✅ No changes required to virtual parameter calculations  

**Required Updates**

To use this release, you must update:

- Stream API to v2.1.1.48 or later
- Protocol to v2.1.1.10 or later

## Migration Guide

### Upgrading from Previous Version

1. **Stop the Virtual Parameter Service**
   ```bash
   stop-service VirtualParameterService
   ```

2. **Update the service package**
   - Install the January 2026 release

3. **Update configuration (optional)**
   - Add domain configuration if desired
   - Review logging settings

4. **Restart the service**
   ```bash
   start-service VirtualParameterService
   ```

5. **Verify operation**
   - Check logs for successful startup
   - Verify virtual parameters are calculated correctly
   - Confirm streams are active

### Optional Configuration Enhancements

**Add domain for better topic organization:**
```json
{
  "StreamApiConfig": {
    "Domain": "Production"
  }
}
```

**Configure Serilog logging:**
```json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Information"
    },
    "WriteTo": [
      {
        "Name": "Console"
      },
      {
        "Name": "File",
        "Args": {
          "path": "logs/vps-.log",
          "rollingInterval": "Day"
        }
      }
    ]
  }
}
```

## Support

If you have any questions about this release or need assistance with 
migration, please contact the Support via [Zendesk](https://mclarenappliedtechnologies.zendesk.com/hc/en-us).