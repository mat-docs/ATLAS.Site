# Logging

The Virtual Parameter Service uses [Serilog](https://serilog.net/) for structured logging and the standard ASP.NET Core logging framework for host-level messages.


## Application Logging (Serilog)

Application logs capture the operational activity of the VPS — session lifecycle events, parameter processing, errors, and diagnostics.

### Configuration

Serilog is configured via the `Serilog` section in `AppConfig.json`. See the [AppConfig Reference](appconfig-reference.md#serilog) for the full schema.

### Log Levels

| Level | When to Use |
|---|---|
| `Verbose` | Very detailed tracing information. Use only for deep debugging. |
| `Debug` | Internal system events useful for diagnosing problems. |
| `Information` | General operational events (session started, session ended). |
| `Warning` | Unexpected but recoverable situations. |
| `Error` | Failures that prevent part of the system from functioning. |
| `Fatal` | Critical failures that cause the service to stop. |

!!! tip "Recommended production level"
    Use `Information` for production deployments. Switch to `Debug` when investigating issues.

### Default Log File Location

When no log path is configured, logs are written to:

=== "Windows"

    ```
    C:\ProgramData\Mclaren_Applied_Ltd\VirtualParameterService\Logs\vps-svc-log.txt
    ```

=== "Docker"

    Specify explicitly via environment variable or command argument:
    ```
    /logs/vps-svc-log.txt
    ```

## Host Logging (ASP.NET Core)

The underlying .NET host produces its own log messages (startup diagnostics, hosting lifecycle events). These are configured separately via `appsettings.json`.

### Reducing Host Log Noise

By default, `appsettings.json` is configured to minimise host log output:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.Hosting.Lifetime": "Warning",
      "Microsoft.AspNetCore.Hosting.Diagnostics": "None"
    }
  }
}
```

This prevents the host framework from flooding the console with startup and request-handling messages, keeping the output focused on VPS-specific logs.

!!! info
    `appsettings.json` is located in the root directory alongside the executable. It is separate from `AppConfig.json`.
