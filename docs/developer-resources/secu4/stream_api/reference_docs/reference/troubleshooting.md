# Troubleshooting

Common issues, diagnostic steps, and solutions for the Stream API.

## Quick Diagnostics

### Check Metrics

```bash
# Check metrics endpoint (if Prometheus is enabled)
curl http://localhost:10010/metrics | grep stream_api
```

### Service Status

```bash
# Docker deployment
docker-compose ps
docker-compose logs -f stream-api

# Local deployment
ps aux | grep StreamApi
netstat -tlnp | grep 13579
```

## Monitoring (Optional)

### Key Metrics to Monitor

If Prometheus metrics are enabled with admin privileges:

```bash
# Write metrics
stream_api_data_packets_published_total
stream_api_info_packets_published_total
stream_api_data_packets_routed_total
stream_api_data_packets_routed_bytes_total
stream_api_info_packets_routed_total
stream_api_info_packets_routed_bytes_total

# Read metrics
stream_api_data_packets_read_total
stream_api_data_packets_delivered_total
stream_api_essential_packets_read_total
stream_api_essential_packets_delivered_total
stream_api_router_messages_received_total
stream_api_router_messages_received_bytes_total

# Connection and session metrics
stream_api_connections_total
stream_api_sessions_total
stream_api_data_formats_total
```

### Alerting Rules

Example Prometheus alert rules (if using Prometheus):

```yaml
# Prometheus alert rules
groups:
- name: stream-api-alerts
  rules:
  - alert: StreamApiDown
    expr: up{job="stream-api"} == 0
    for: 30s
    
  - alert: NoPacketsDelivered
    expr: rate(stream_api_data_packets_delivered_total[5m]) == 0
    for: 2m
    
  - alert: HighPacketReadLatency
    expr: stream_api_data_packets_read_total - stream_api_data_packets_delivered_total > 1000
    for: 5m
```

## Common Issues

### Connection Problems

#### Issue: "Connection refused" 

**Symptoms:**
- Client cannot connect to server
- Error: `UNAVAILABLE: Connection refused`

**Diagnosis:**
```bash
# Check if server is running
curl http://localhost:13579

# Check port availability
netstat -an | grep 13579

# Check firewall
sudo ufw status
```

**Solutions:**
1. Start the server: `docker-compose up -d`
2. Check port configuration in `AppConfig.json`
3. Verify firewall rules allow port 13579
4. Ensure correct server address in client

#### Issue: "Session not found"

**Symptoms:**
- Error: `NOT_FOUND: Session key 'xyz' not found`
- Connection creation fails

**Diagnosis:**
```csharp
// Check available sessions
var sessionManager = StreamingApiClient.GetSessionManagerClient();
var sessions = await sessionManager.ListActiveSessionsAsync(new ListActiveSessionsRequest());
```

**Solutions:**
1. Create session before creating connections
2. Verify session key spelling
3. Check session hasn't expired
4. Ensure session management is enabled

### Performance Issues

#### Issue: High latency

**Symptoms:**
- Slow packet writing/reading
- Timeouts on operations

**Diagnosis:**
```bash
# Check system resources
top
free -h
iostat -x 1

# Check network
ping kafka-broker
iperf3 -c kafka-broker

# Check metrics (if Prometheus is enabled)
curl http://localhost:10010/metrics | grep duration
```

**Solutions:**
1. Increase batch sizes for bulk operations
2. Optimize network configuration
3. Scale up resources (CPU/memory)
4. Use connection pooling
5. Enable response batching

#### Issue: Memory leaks

**Symptoms:**
- Increasing memory usage over time
- Out of memory errors

**Diagnosis:**
```bash
# Monitor memory usage
docker stats stream-api

# Check GC metrics (if Prometheus is enabled)
curl http://localhost:10010/metrics | grep gc
```

**Solutions:**
1. Close connections properly
2. Dispose of clients when done
3. Implement connection pooling
4. Review packet sizes
5. Tune GC settings

### Data Issues

#### Issue: Packet loss

**Symptoms:**
- Missing data packets
- Gaps in sequence numbers

**Diagnosis:**
```bash
# Check Kafka lag
docker exec kafka kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --all-groups

# Check error rates (if Prometheus is enabled)
curl http://localhost:10010/metrics | grep error
```

**Solutions:**
1. Check Kafka configuration
2. Verify network stability
3. Implement retry mechanisms
4. Use essential packets for critical data
5. Monitor consumer lag

#### Issue: Data corruption

**Symptoms:**
- Invalid packet content
- Deserialization errors

**Diagnosis:**
```csharp
// Validate packet content using Protocol Buffers
try 
{
    // Attempt to parse as known protobuf message type
    var periodicData = PeriodicDataPacket.Parser.ParseFrom(packet.Content);
    Console.WriteLine($"Successfully parsed PeriodicData with {periodicData.Columns.Count} columns");
}
catch (InvalidProtocolBufferException ex)
{
    // Content is not valid protobuf or wrong message type
    Console.WriteLine($"Failed to parse packet: {ex.Message}");
    
    // Try other message types
    try
    {
        var eventData = EventPacket.Parser.ParseFrom(packet.Content);
        Console.WriteLine($"Successfully parsed Event: {eventData.DataFormat}");
    }
    catch (InvalidProtocolBufferException)
    {
        Console.WriteLine("Packet content is not a recognized protobuf message");
    }
}
```

**Solutions:**
1. Implement protobuf message validation
2. Use proper message types from open_data.proto
3. Check message serialization using ToByteString()
4. Verify packet type matches content structure
5. Use protobuf reflection to inspect unknown messages

## Kafka-Specific Issues

### Issue: Kafka connection failed

**Symptoms:**
- Stream API can't connect to Kafka
- Error: `Connection to kafka:9092 failed`

**Diagnosis:**
```bash
# Test Kafka connectivity
docker exec stream-api ping kafka

# Check Kafka logs
docker-compose logs kafka

# Test Kafka directly
docker exec kafka kafka-topics.sh --bootstrap-server localhost:9092 --list
```

**Solutions:**
1. Verify Kafka is running
2. Check network connectivity
3. Verify broker URLs in configuration
4. Check Kafka authentication settings

### Issue: Topic not found

**Symptoms:**
- Error: `Topic 'stream-name' does not exist`

**Diagnosis:**
```bash
# List available topics
docker exec kafka kafka-topics.sh --bootstrap-server localhost:9092 --list

# Check topic configuration
docker exec kafka kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic stream-name
```

**Solutions:**
1. Enable auto-topic creation
2. Create topics manually
3. Check topic naming conventions
4. Verify topic permissions

## Configuration Issues

### Issue: Invalid configuration

**Symptoms:**
- Server startup fails
- Configuration validation errors

**Diagnosis:**
```bash
# Validate configuration
./StreamApiServer --validate-config --config AppConfig.json

# Check JSON syntax
python -m json.tool AppConfig.json
```

**Solutions:**
1. Fix JSON syntax errors
2. Verify all required settings
3. Check file permissions
4. Validate configuration values

### Issue: Port conflicts

**Symptoms:**
- Server fails to start
- Error: `Address already in use`

**Diagnosis:**
```bash
# Check what's using the port
lsof -i :13579
netstat -tlnp | grep 13579
```

**Solutions:**
1. Stop conflicting services
2. Change port configuration
3. Use different port mapping in Docker

## Debug Mode

### Enable Debug Logging

```json
// AppConfig.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "MA.Streaming": "Trace"
    }
  }
}
```

### Capture Network Traffic

```bash
# Capture gRPC traffic
tcpdump -i any -s 0 -w stream-api.pcap port 13579

# Analyze with Wireshark
wireshark stream-api.pcap
```

### Enable gRPC Logging

```csharp
// Client-side logging
Environment.SetEnvironmentVariable("GRPC_VERBOSITY", "DEBUG");
Environment.SetEnvironmentVariable("GRPC_TRACE", "all");
```

## Performance Tuning

### Server Optimization

```json
{
  "PerformanceSettings": {
    "MaxConcurrentConnections": 5000,
    "ThreadPoolSize": 50,
    "BatchSize": 1000,
    "FlushIntervalMs": 50,
    "MaxMemoryUsageMB": 4096
  }
}
```

### Client Optimization

```csharp
var channelOptions = new ChannelOption[]
{
    new ChannelOption(ChannelOptions.MaxReceiveMessageLength, 64 * 1024 * 1024),
    new ChannelOption(ChannelOptions.MaxSendMessageLength, 64 * 1024 * 1024),
    new ChannelOption("grpc.keepalive_time_ms", 30000),
    new ChannelOption("grpc.max_connection_idle_ms", 300000)
};
```

### Kafka Tuning

```properties
# server.properties
num.network.threads=8
num.io.threads=16
socket.send.buffer.bytes=102400
socket.receive.buffer.bytes=102400
socket.request.max.bytes=104857600
```

## Recovery Procedures

### Service Recovery

```bash
# Restart services
docker-compose restart stream-api

# Full reset (loses data)
docker-compose down -v
docker-compose up -d
```

### Data Recovery

```bash
# Restore from backup
docker-compose down
docker volume rm $(docker volume ls -q)
tar -xzf backup.tar.gz
docker-compose up -d
```

## Support Information

### Log Collection

```bash
#!/bin/bash
# collect-logs.sh

DATE=$(date +%Y%m%d_%H%M%S)
LOG_DIR="support-logs-$DATE"

mkdir -p $LOG_DIR

# Collect application logs
docker-compose logs --no-color > $LOG_DIR/docker-compose.log
docker-compose logs stream-api --no-color > $LOG_DIR/stream-api.log
docker-compose logs kafka --no-color > $LOG_DIR/kafka.log

# Collect system information
docker version > $LOG_DIR/docker-version.txt
docker-compose version > $LOG_DIR/compose-version.txt
docker stats --no-stream > $LOG_DIR/container-stats.txt
docker ps -a > $LOG_DIR/containers.txt

# Collect configuration
cp -r ./configs $LOG_DIR/
cp docker-compose.yml $LOG_DIR/

# Create archive
tar -czf $LOG_DIR.tar.gz $LOG_DIR
rm -rf $LOG_DIR

echo "Support logs collected: $LOG_DIR.tar.gz"
```

### Contact Information

For additional support:
- Documentation: [Stream API Docs](https://atlas.motionapplied.com/stream-api/)
- Issues: [GitHub Issues](https://github.com/Software-Products/MA.DataPlatforms.StreamApi/issues)
- Support: atlas10@motionapplied.com

## See Also

- [Error Handling](error-handling.md)
- [API Reference](api-reference.md)
- [Performance Tuning](../configuration/server-config.md)