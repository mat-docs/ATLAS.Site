# Troubleshooting

## The recorder exits straight away

**Symptom:** the console logs `Invalid AppConfig.json configuration: ...` followed by `AppConfig.json contains invalid configuration. See the log for details. The application will not start.`

**Cause:** a [validation rule](configuration-reference.md#validation-rules) failed. Each message names the setting, for example:

- `SqlRaceConfig section is missing from AppConfig.json.`
- `WritingConfig.RecordingFolder must be set when WritingConfig.SessionFormat is SSN2.`
- `SqlRaceConfig.ConnectionString must be set when WritingConfig.SessionFormat is Database.`
- `SqlRaceConfig.DbEngine must be either 'SQLite' or 'SQLServer'.`
- `MetricsConfig.Port must be between 1 and 65535.`
- `GroupId must only contain alphanumeric characters, underscores, or hyphens.`

**Fix:** correct the named setting and restart. Keep `"$schema": "./AppConfig.schema.json"` at the top of the file to get editor warnings before you run.

## "Server Listener will NOT be started"

**Symptom:** the log contains `Failed to parse ServerListenerAddress '...'. Server Listener will NOT be started.`

**Cause:** `SqlRaceConfig.ServerListenerAddress` is empty or is not a valid IP address and port.

**Fix:** use an IP address and port, for example `127.0.0.1:7300`.

## No Prometheus metrics

**Symptom:** the log says `Need Administrator privilege to run Prometheus. continue without Prometheus`.

**Cause:** Windows denied the recorder permission to listen on the metrics port.

**Fix:** run the recorder as Administrator, or do without metrics.

## Nothing is recorded

Check that the recorder matches the producer:

- `StreamApiConfig.BrokerUrl` and `StreamCreationStrategy` are the same as the producer's.
- `StreamReadingConfig.DataSource` is the producer's data source name.
- `StreamReadingConfig.SessionIdentifierPattern` matches the session identifier (`*` matches everything).
- For VPS sessions, `RecordVpsSessions` is `true`.

The log file (`logs/standalone-stream-recorder-<date>.txt` by default) shows what the recorder is doing.
