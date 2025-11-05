# Docker Setup

Deploy the Stream API using Docker containers for development and production environments.

## Quick Start with Docker Compose

### Complete Stack

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  kafka:
    image: apache/kafka:latest 
    hostname: kafka 
    container_name: kafka-broker
    ports:
      - "9092:9092"
    environment:
      CLUSTER_ID: 'stream-api-cluster' 
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: 'broker,controller'
      KAFKA_CONTROLLER_QUORUM_VOTERS: '1@kafka:9093' 
      KAFKA_LISTENERS: 'PLAINTEXT://:9092,CONTROLLER://:9093'
      KAFKA_ADVERTISED_LISTENERS: 'PLAINTEXT://localhost:9092'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: 'CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT'
      KAFKA_INTER_BROKER_LISTENER_NAME: 'PLAINTEXT'
      KAFKA_CONTROLLER_LISTENER_NAMES: 'CONTROLLER'
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0 
      KAFKA_LOG_DIRS: '/tmp/kraft-kafka-logs'
    volumes:
      - kafka-data:/tmp/kraft-kafka-logs

  stream-api:
    image: atlasplatformdocker/streaming-proto-server-host:latest
    depends_on:
      - kafka
    ports:
      - "13579:13579"
      - "10010:10010"
    environment:
      CONFIG_PATH: /app/Configs/AppConfig.json
      AUTO_START: true
    volumes:
      - ./configs:/app/Configs
    restart: unless-stopped

volumes:
  kafka-data:
```

### Configuration

Create `configs/AppConfig.json`:

```json
{
  "StreamCreationStrategy": 2,
  "BrokerUrl": "kafka:9092",
  "StreamApiPort": 13579,
  "IntegrateSessionManagement": true,
  "IntegrateDataFormatManagement": true,
  "BatchingResponses": false,
  "PrometheusMetricPort": 10010,
  "PartitionMappings": []
}
```

### Start the Stack

```bash
# Create config directory
mkdir -p configs

# Start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f stream-api
```

## Production Deployment

### Multi-Node Kafka Cluster

```yaml
version: '3.8'

services:
  kafka-1:
    image: apache/kafka:latest
    hostname: kafka-1
    container_name: kafka-broker-1
    ports:
      - "9092:9092"
    environment:
      CLUSTER_ID: 'stream-api-prod-cluster'
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: 'broker,controller'
      KAFKA_CONTROLLER_QUORUM_VOTERS: '1@kafka-1:9093,2@kafka-2:9093,3@kafka-3:9093'
      KAFKA_LISTENERS: 'PLAINTEXT://:9092,CONTROLLER://:9093'
      KAFKA_ADVERTISED_LISTENERS: 'PLAINTEXT://kafka-1:9092'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: 'CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT'
      KAFKA_INTER_BROKER_LISTENER_NAME: 'PLAINTEXT'
      KAFKA_CONTROLLER_LISTENER_NAMES: 'CONTROLLER'
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 3
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 3
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 2
      KAFKA_LOG_DIRS: '/tmp/kraft-kafka-logs'
    volumes:
      - kafka-1-data:/tmp/kraft-kafka-logs

  kafka-2:
    image: apache/kafka:latest
    hostname: kafka-2
    container_name: kafka-broker-2
    ports:
      - "9192:9092"
    environment:
      CLUSTER_ID: 'stream-api-prod-cluster'
      KAFKA_NODE_ID: 2
      KAFKA_PROCESS_ROLES: 'broker,controller'
      KAFKA_CONTROLLER_QUORUM_VOTERS: '1@kafka-1:9093,2@kafka-2:9093,3@kafka-3:9093'
      KAFKA_LISTENERS: 'PLAINTEXT://:9092,CONTROLLER://:9093'
      KAFKA_ADVERTISED_LISTENERS: 'PLAINTEXT://kafka-2:9092'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: 'CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT'
      KAFKA_INTER_BROKER_LISTENER_NAME: 'PLAINTEXT'
      KAFKA_CONTROLLER_LISTENER_NAMES: 'CONTROLLER'
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 3
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 3
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 2
      KAFKA_LOG_DIRS: '/tmp/kraft-kafka-logs'
    volumes:
      - kafka-2-data:/tmp/kraft-kafka-logs

  kafka-3:
    image: apache/kafka:latest
    hostname: kafka-3
    container_name: kafka-broker-3
    ports:
      - "9292:9092"
    environment:
      CLUSTER_ID: 'stream-api-prod-cluster'
      KAFKA_NODE_ID: 3
      KAFKA_PROCESS_ROLES: 'broker,controller'
      KAFKA_CONTROLLER_QUORUM_VOTERS: '1@kafka-1:9093,2@kafka-2:9093,3@kafka-3:9093'
      KAFKA_LISTENERS: 'PLAINTEXT://:9092,CONTROLLER://:9093'
      KAFKA_ADVERTISED_LISTENERS: 'PLAINTEXT://kafka-3:9092'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: 'CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT'
      KAFKA_INTER_BROKER_LISTENER_NAME: 'PLAINTEXT'
      KAFKA_CONTROLLER_LISTENER_NAMES: 'CONTROLLER'
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 3
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 3
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 2
      KAFKA_LOG_DIRS: '/tmp/kraft-kafka-logs'
    volumes:
      - kafka-3-data:/tmp/kraft-kafka-logs

  stream-api-1:
    image: atlasplatformdocker/streaming-proto-server-host:latest
    environment:
      CONFIG_PATH: /app/Configs/AppConfig.json
      INSTANCE_ID: stream-api-1
    volumes:
      - ./configs:/app/Configs
    depends_on:
      - kafka-1
      - kafka-2
      - kafka-3

volumes:
  kafka-1-data:
  kafka-2-data:
  kafka-3-data:
```

## Container Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `CONFIG_PATH` | Path to configuration file | /app/Configs/AppConfig.json |
| `AUTO_START` | Auto-start server on container start | true |
| `LOG_LEVEL` | Logging level | Information |
| `METRICS_PORT` | Prometheus metrics port (requires admin privileges) | 10010 |

### Volume Mounts

```yaml
volumes:
  # Configuration files
  - ./configs:/app/Configs:ro
  
  # Logs
  - ./logs:/app/logs
```

## Development Setup

### Local Development

```yaml
version: '3.8'

services:
  kafka:
    image: apache/kafka:latest
    hostname: kafka
    container_name: kafka-dev
    ports:
      - "9092:9092"
    environment:
      CLUSTER_ID: 'dev-cluster'
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: 'broker,controller'
      KAFKA_CONTROLLER_QUORUM_VOTERS: '1@kafka:9093'
      KAFKA_LISTENERS: 'PLAINTEXT://:9092,CONTROLLER://:9093'
      KAFKA_ADVERTISED_LISTENERS: 'PLAINTEXT://localhost:9092'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: 'CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT'
      KAFKA_INTER_BROKER_LISTENER_NAME: 'PLAINTEXT'
      KAFKA_CONTROLLER_LISTENER_NAMES: 'CONTROLLER'
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_LOG_DIRS: '/tmp/kraft-kafka-logs'

  stream-api-dev:
    build: 
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "13579:13579"
      - "10010:10010"
    volumes:
      - .:/app
      - /app/bin
      - /app/obj
    environment:
      ASPNETCORE_ENVIRONMENT: Development
      CONFIG_PATH: /app/Configs/AppConfig.Development.json
    depends_on:
      - kafka
```

### Development Dockerfile

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dev

WORKDIR /app
COPY . .

# Install development tools
RUN dotnet tool install --global dotnet-ef
RUN dotnet restore

# Development configuration
EXPOSE 13579 10010

ENTRYPOINT ["dotnet", "watch", "run", "--project", "MA.Streaming.Proto.ServerComponent.Host"]
```

## Container Monitoring (Optional)

### Prometheus Configuration

If using Prometheus with admin privileges for monitoring:

```yaml
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
```

`prometheus.yml`:
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'stream-api'
    static_configs:
      - targets: ['stream-api:10010']
```

### Grafana Dashboard

```yaml
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./grafana/datasources:/etc/grafana/provisioning/datasources
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 9092, 13579, and 10010 are available
2. **Memory issues**: Increase Docker memory allocation for Kafka
3. **Network connectivity**: Verify container networking configuration
4. **Kafka startup**: Kafka may take 20-30 seconds to fully initialize

### Debugging

```bash
# Check container logs
docker-compose logs -f stream-api

# Execute shell in container
docker-compose exec stream-api bash

# Check container resource usage
docker stats

# Inspect container configuration
docker inspect stream-api_stream-api_1
```

## See Also

- [Server Configuration](server-config.md)
- [Monitoring](../reference/troubleshooting.md)