# Key Generator Service

Keys are used to uniquely identify objects such as Session, and Data Format within the Stream API.

The image for the Key Generation Service is available on 
[DockerHub](https://hub.docker.com/r/mclarenapplied/keygenerator-proto-server)  as `mclarenapplied/keygenerator-proto-server` 

### Ports
| Port               | Protocol | Usage                                |
|--------------------|----------|--------------------------------------|
| `15379`, or `PORT` | gRPC     | Server connection for Key Generation | 


### Configuration
| Option | Value                                               | Required | Default |
|--------|-----------------------------------------------------|----------|---------|
| `PORT` | Port for gRPC communication as Key Generator server | No       | `15379` |


