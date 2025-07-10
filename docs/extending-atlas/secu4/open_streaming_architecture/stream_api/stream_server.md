# Stream API Server

## Stream API Local Server
To implement the Server in the same application as the Client, the 
[MA.Streaming.Proto.ServerComponent package](https://github.com/orgs/mat-docs/packages/nuget/package/MA.Streaming.Proto.ServerComponent)
can be used. The RPC channel will be established locally. 

## Stream API Remote Server Container

The image for the Stream API Server is available on [DockerHub](https://hub.docker.com/r/mclarenapplied/streaming-proto-server-host)  as `mclarenapplied/streaming-proto-server-host` 

### Ports
| Port                                            | Protocol | Usage                                |
|-------------------------------------------------|----------|--------------------------------------|
| `13579`, or `StreamApiPort`                     | gRPC     | Communication with Stream API Client |  
| Dependent on `RemoteKeyGeneratorServiceAddress` | gRPC     | Remote Key Generator service         |

### Configuration
| Option        | Value                                                                | Required | Default                   |
|---------------|----------------------------------------------------------------------|----------|---------------------------|
| `CONFIG_PATH` | Path to the [config file](#configuration-file) within the container. | No       | `/Configs/AppConfig.json` |

### Configuration file
Several options on the Stream API Server Container can be configured via a json file. 

| Option                             | Value                                                                                   | Required                                          | Default | DataType              |
|------------------------------------|-----------------------------------------------------------------------------------------|---------------------------------------------------|---------|-----------------------|
| `BrokerUrl`                        | URL(s) to the Kafka broker including port number, separated by commas.                  | Yes                                               |         | string                |
| `StreamCreationStrategy`           | `1` for partition based, or<br/> `2` for topic based                                    | Yes                                               |         | int                   |
| `PartitionMappings`                | An array of Key/Value pairs mapping the stream to a specific partition                  | Only applies when `StreamCreationStrategy` is `1` |         | array\[(string,int)\] |
| `IntegrateSessionManagement`       | True to enable the integrated session management service.                               | No                                                | `true`  | bool                  |
| `IntegrateDataFormatManagement`    | True to enable the data format management service.                                      | No                                                | `true`  | bool                  |
| `UseRemoteKeyGenerator`            | Use a Remote Key Generator within the Data Format Management Service, if used.          | No                                                | `false` | bool                  |
| `RemoteKeyGeneratorServiceAddress` | The address of the service if the remote key generator service is used.                 | Required when `UseRemoteKeyGenerator` is `true`   | `""`    | string                |
| `BatchingResponses`                | Process messages in [batch](index.md/#batching-responses).                              | No                                                | `false` | bool                  |
| `StreamApiPort`                    | Port to be used to establish the gRPC connection                                        | No                                                | `13579` | int                   |

## Stream Creation Strategy

Data can be split into multiple streams to suite your requirements. `StreamCreationStrategy` allows you to partition the
data into streams that corresponds to Kafka topics or partitions. 

### Topic based

When a topic based stream creation strategy is applied, data will be published to a topic named `{DataSource}.{Stream}`. 
For example, data from a Datasource named `Chassis` with Stream named `Driver` will publish to the topic `Chassis.Driver`. 
If the Stream is not defined, it will publish to the "main topic", that is `{DataSource}`. 

### Partition Based
When a partition based stream creation strategy is applied, the data will be published to the main topic `{datasource}`, and 
the corresponding partition based on `PartitionMappings`.
If there are no partition mapping given, the default partition of the main topic will be used.   

!!! note
    The Stream API Server will create the topic with the required number of partitions as configured in 
    `PartitionMappings`. If the topic already exists, the Stream API Server will not be able to change the number of 
    partitions. It is up to the user to configure the Kafka topics with the required number of partitions if the topic 
    already exists.
