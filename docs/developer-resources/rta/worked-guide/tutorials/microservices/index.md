# Microservices &mdash; Walkthrough

This tutorial converts the [Quick-Start Tutorial](../quick-start/index.md) deployment from [RTA Server](../../../services/rta-server/README.md) into microservices.

At the end, you'll have a production-ready architecture that can be scaled and modified with data adapter services to suit your environment.

In this tutorial, you:

* Deploy the [Session](../../../services/rta-sessionsvc/README.md), [Config](../../../services/rta-configsvc/README.md), [Data](../../../services/rta-datasvc/README.md) and [Gateway Service](../../../services/rta-gatewaysvc/README.md) using [Docker Compose](https://docs.docker.com/compose/)
* Add a [Data Binding](../../sessions/data-bindings.md) to locate the previous tutorial data in the [Data Service](../../../services/rta-datasvc/README.md)
* Modify the data generator to publish new sample sessions
* Test the deployment with ATLAS

!!! tip

    These code samples are in C# for .NET 5.0, and use McLaren [NuGet packages](../../../downloads.md/#nuget-packages) to keep things as simple as possible. 

    We recommend you follow this tutorial even if you are planning to do your integration in another language.  
    The concepts should translate very easily once you have a working example.

## Prerequisites

You'll want to complete the [Quick-Start Walkthrough](../quick-start/index.md) first. This will ensure that your development environment and database are setup and ATLAS is ready to use.

Check out the common tutorial [prerequisites](../prerequisites.md) before you start.

You're going to need:

* [ATLAS](../prerequisites.md#atlas)
* [PostgreSQL](../prerequisites.md#postgresql)
* [Development Environment](../prerequisites.md#development-environment)
* [Docker](../prerequisites.md#recommended-tools)
* [grpcui](../prerequisites.md#recommended-tools)

### Why do I need Docker?

The microservices architecture is designed for a [container orchestrator](https://www.redhat.com/en/topics/containers/what-is-container-orchestration) or similar automated rollout.

Popular choices are:

* [Kubernetes](https://kubernetes.io/) (available on [AWS](https://aws.amazon.com/eks), [Azure](https://azure.microsoft.com/en-gb/services/kubernetes-service/), and [Google Cloud](https://cloud.google.com/kubernetes-engine))
* [AWS ECS (Elastic Container Service / Fargate)](https://aws.amazon.com/ecs/)
* [Docker Swarm](https://docs.docker.com/engine/swarm/)
* [Hashicorp Nomad](https://www.nomadproject.io/)

For this tutorial, we'll use [Docker Compose](https://docs.docker.com/compose/) to download and configure the four services running together.

!!! info "If you can't use Docker"

    We also provide Windows and Linux executables.
    You can start these in separate terminals or using a script.

    In production, you could deploy these as services using automation tools like [Puppet](https://puppet.com/) and [Ansible](https://www.ansible.com/), or [Nomad](https://www.nomadproject.io/) (without containers).

## Step 1: Stop [RTA Server](../../../services/rta-server/README.md)

If you completed the [Quick-Start Tutorial](../quick-start/index.md), you might still have [RTA Server](../../../services/rta-server/README.md) running.
This can run side-by-side with the microservices, but it's best to terminate it to avoid confusion.

[RTA Server](../../../services/rta-server/README.md) will stop if you press ++ctrl+c++.

If you used Docker, use `docker ps` and `docker kill` to make sure the service has stopped.

Verify that it is not running by browsing [http://localhost:8080/](http://localhost:8080/).

## Step 2: Deploy the Toolkit Microservices

Create a directory to hold the Docker Compose file for the tutorials &mdash; e.g. `rta-tutorials`

You'll reuse and extend this script in the other tutorials.

!!! tip

    [Visual Studio Code](https://code.visualstudio.com/) is a great YAML editor.

    *   YAML is whitespace-sensitive.
    *   Indentation as seen below creates a nested object structure; hyphens indicate a list.
    *   Strings can be double-quoted, single-quoted or not quoted at all &mdash; but it's best to use quotes if you want to make absolutely sure your markup is going to be parsed as a string, not a number or a boolean. [Be aware that `yes` and `no` will get parsed as booleans unless quoted as `"yes"` and `"no"`](https://medium.com/@lefloh/lessons-learned-about-yaml-and-norway-13ba26df680).

Save and edit this script into the directory you created, as `docker-compose.yaml`:

=== "Windows"

    ```yaml
    services:
        rta-sessionsvc-init:
            image: mclarenapplied/rta-sessionsvc:latest
            restart: "no"
            environment:
            - RTA_PostgresConnectionString=Host=host.docker.internal; Username=postgres; Password=hunter2;
            entrypoint: ["/app/rta-sessionsvc", "--InitStoreAndExit=true"]

        rta-sessionsvc:
            image: mclarenapplied/rta-sessionsvc:latest
            restart: "always"
            depends_on:
            - rta-sessionsvc-init
            ports:
            - "2650:2650"
            - "2652:2652"
            environment:
            - RTA_PostgresConnectionString=Host=host.docker.internal; Username=postgres; Password=hunter2;

        rta-configsvc:
            image: mclarenapplied/rta-configsvc:latest
            restart: "always"
            ports:
            - "2660:2660"
            - "2662:2662"
            volumes:
            - C:\rta\configs:/data/rta-configs
            environment:
            - RTA_Store=File
            - RTA_FilePath=/data/rta-configs

        rta-datasvc:
            image: mclarenapplied/rta-datasvc:latest
            restart: "always"
            ports:
            - "2670:2670"
            - "2672:2672"
            volumes:
            - C:\rta\data:/data/rta-data
            environment:
            - RTA_Store=File
            - RTA_FilePath=/data/rta-data

        rta-gatewaysvc:
            image: mclarenapplied/rta-gatewaysvc:latest
            restart: "always"
            depends_on:
            - rta-sessionsvc
            - rta-configsvc
            - rta-datasvc
            ports:
            - "8080:80"
            environment:
            - RTA_SessionServiceUri=http://rta-sessionsvc:2650
            - RTA_ConfigServiceUri=http://rta-configsvc:2660
            - RTA_DataServiceUris__rta-datasvc=http://rta-datasvc:2670
    ```

=== "Linux/Mac"

    ```yaml
    services:
        rta-sessionsvc-init:
            image: mclarenapplied/rta-sessionsvc:latest
            restart: "always"
            environment:
            - RTA_PostgresConnectionString=Host=localhost; Username=postgres; Password=hunter2;
            entrypoint: ["/app/rta-sessionsvc", "--InitStoreAndExit=true"]
            restart: "no"

        rta-sessionsvc:
            image: mclarenapplied/rta-sessionsvc:latest
            restart: "always"
            depends_on:
            - rta-sessionsvc-init
            ports:
            - "2650:2650"
            - "2652:2652"
            environment:
            - RTA_PostgresConnectionString=Host=localhost; Username=postgres; Password=hunter2;

        rta-configsvc:
            image: mclarenapplied/rta-configsvc:latest
            restart: "always"
            ports:
            - "2660:2660"
            - "2662:2662"
            volumes:
            - /tmp/rta/configs:/data/rta-configs
            environment:
            - RTA_Store=File
            - RTA_FilePath=/data/rta-configs

        rta-datasvc:
            image: mclarenapplied/rta-datasvc:latest
            restart: "always"
            ports:
            - "2670:2670"
            - "2672:2672"
            volumes:
            - /tmp/rta/data:/data/rta-data
            environment:
            - RTA_Store=File
            - RTA_FilePath=/data/rta-data

        rta-gatewaysvc:
            image: mclarenapplied/rta-gatewaysvc:latest
            restart: "always"
            depends_on:
            - rta-sessionsvc
            - rta-configsvc
            - rta-datasvc
            ports:
            - "8080:80"
            environment:
            - RTA_SessionServiceUri=http://rta-sessionsvc:2650
            - RTA_ConfigServiceUri=http://rta-configsvc:2660
            - RTA_DataServiceUris__rta-datasvc=http://rta-datasvc:2670
    ```

* Update the database username/password (`postgres`/`hunter2`) to match your deployment:
    * [X] `rta-sessionsvc-init`
    * [X] `rta-sessionsvc`
* Update the volume paths if you changed them in the [Quick-Start Tutorial](../quick-start/index.md):
    * [X] `rta-configsvc`
    * [X] `rta-datasvc` 

!!! alert "This script expects PostgreSQL to be running on your host machine"

    If you are running PostgreSQL in Docker, things get a bit more complicated.

    You can either:

    * Add an extra section to the compose file to run Postgres, so the containers can see each other
    * Connect to the database by IP address, [using the bridge network](https://www.tutorialworks.com/container-networking/)  

Start the services from a terminal in the folder where you saved the `docker-compose.yaml` file:

```bash
docker compose up
```

## Step 3: Check the Services

### HTTP

In a web browser, go to [http://localhost:8080](http://localhost:8080)

You should see some text similar to this:

```
Provides a Gateway for RTA Toolkit services 0.0.0.0
Provides RTA Toolkit services as a single deployment
    Grpc: enabled
    DataWriter: enabled

Metrics: /metrics
Health: /health
```

??? notes "Troubleshooting"

    * Is something else running on port 8080?

Also browse to [http://localhost:8080/health](http://localhost:8080/health)

This should report: `Healthy`.  
This will verify that the three other services are reachable.

If the service says it is `Unhealthy`, the console log output should say why.

Perform the same checks on the other three services:

| Service        | HTTP Port |
|----------------|-----------|
| rta-sessionsvc | 2650      |
| rta-configsvc  | 2660      |
| rta-datasvc    | 2670      |

??? notes "Troubleshooting"

    * Can the [Session Service (rta-sessionsvc)](../../../services/rta-sessionsvc/README.md) communicate with PostgreSQL?
        * Is the host correct?
        * Is the username/password correct?

    * Does the [Config Service (rta-configsvc)](../../../services/rta-configsvc/README.md) have the same volume/folder mounted as used for the [Quick-Start Tutorial](../quick-start/index.md)?
    * Does the [Data Service (rta-datasvc)](../../../services/rta-datasvc/README.md) have the same volume/folder mounted as used for the [Quick-Start Tutorial](../quick-start/index.md)?

### gRPC

Using [grpcui](https://github.com/fullstorydev/grpcui/releases) from a terminal:

```
grpcui -plaintext localhost:2652
```

If successful, this will open a web page where you can browse and interact with the [Session Service gRPC API](../../../services/rta-sessionsvc/grpc.md) &mdash; which will be useful later.

Do this for all the services except the Gateway Service (which does not have a gRPC API):

| Service        | gRPC Port | API                                                  |
|----------------|-----------|------------------------------------------------------|
| rta-sessionsvc | 2652      | [gRPC API](../../../services/rta-sessionsvc/grpc.md) |
| rta-configsvc  | 2662      | [gRPC API](../../../services/rta-configsvc/grpc.md)  |
| rta-datasvc    | 2672      | [gRPC API](../../../services/rta-datasvc/grpc.md)    |

??? notes "Troubleshooting"

    * Make sure you ran `grpcui` from a command prompt / terminal
    * Is something else running on these ports?

## Step 4: Add Data Bindings to the Existing Sessions

Using ATLAS, try to browse and load the session(s) you created in the [Quick-Start Tutorial](../quick-start/index.md).

You should find that you can see the session and browse parameters to add to the displays... but no data appears.  
This is because we need to add [Data Bindings](../../sessions/data-bindings.md) so the [Gateway Service](../../../services/rta-gatewaysvc/README.md) can locate the data &mdash; since it's not all managed by a single process anymore.

Let's start by doing an example by hand.

Use [grpcui](https://github.com/fullstorydev/grpcui/releases) to open the [Session Service](../../../services/rta-sessionsvc/grpc.md):

```
grpcui -plaintext localhost:2652
```

Use the `ListSessions` method to find a session, and note down an `identity` &mdash; which will be a GUID.

??? notes "Troubleshooting"

    If you don't see any sessions:

    * Check the [Session Service](../../../services/rta-sessionsvc/grpc.md) REST API by browsing to [http://localhost:2650/rta/v2/sessions/](http://localhost:2650/rta/v2/sessions/)
        * If you get a valid, but empty response (`#!json {"sessions":[]}`) the database is empty or you are talking to the wrong database
        * If you get an error or a blank page in your browser, check the `docker compose` logs in the terminal to see any errors
        
    * Use PgAdmin (or a similar front-end) to have a look at the database and verify:
        * Are you connecting to the right database?
        * Are you using the correct username/password?
        * Does it have any data in it?

    If you're sure you have all the details correct, perhaps there is a network problem between Docker and the database:
    
    * Are you using `host.docker.internal` if you are on Windows?
    * If your database is also running on Docker, have you [set up the bridge network](https://www.tutorialworks.com/container-networking/)?
    * Do you have a firewall on the host that could be blocking access?

    If you have got database connectivity but lost the sessions, just skip onto Step 5.

Select the `CreateOrUpdateSession` method:

* Set `identity` as noted above
* Click the `[+]` next to `updates`, and select `set_data_bindings`
* Click the `[+]` next to `data_bindings`:
    * Set the `key`:
        * `source` = `rta-datasvc` (to match the last line of the `docker-compose.yaml`)
        * `identity` = _as above_
* Scroll to the bottom and click _Invoke_

This should complete successfully:

     Response Data
    +-----------------
    | {}
    |
    
Now try to load this session in ATLAS (make sure it's the right one).

You should see the data you previously created.

??? notes "Troubleshooting"

    If you still don't see any data:

    * Make sure the volume for the [Config Service (rta-configsvc)](../../../services/rta-configsvc/README.md) is correct:  
      On Windows it should look something like:  
        ```yaml
        volumes:
        - C:\rta\configs:/data/rta-configs
        ```  
      The path on the left hand side must be an absolute path to a folder that already contains a file/files from the [Quick-Start Tutorial](../quick-start/index.md).  

    * Make sure the volume for the [Data Service (rta-datasvc)](../../../services/rta-datasvc/README.md) is correct:  
      On Windows it should look something like:  
        ```yaml
        volumes:
        - C:\rta\data:/data/rta-data
        ```  
      The path on the left hand side must be an absolute path to a folder that already contains a file/files from the [Quick-Start Tutorial](../quick-start/index.md).  

    If the volumes weren't setup correctly in the earlier tutorial, you might have written data into the Docker container itself instead of into a folder.  
    You could fix this by running [Quick-Start Tutorial](../quick-start/index.md) Step 4 again after fixing the configuration, or just skip onto Step 5 in this tutorial.

## Step 5: Modify the Demo

### Update the gRPC channels

In the `RTA.Examples.Loader` project, change this code:

```c#
using var channel = GrpcChannel.ForAddress("http://localhost:8082");
var sessionClient = new SessionStore.SessionStoreClient(channel);
var configClient = new ConfigStore.ConfigStoreClient(channel);
var dataClient = new DataWriter.DataWriterClient(channel);
```

to this:

```c#
using var sessionChannel = GrpcChannel.ForAddress("http://localhost:2652");
using var configChannel = GrpcChannel.ForAddress("http://localhost:2662");
using var dataChannel = GrpcChannel.ForAddress("http://localhost:2672");
var sessionClient = new SessionStore.SessionStoreClient(sessionChannel);
var configClient = new ConfigStore.ConfigStoreClient(configChannel);
var dataClient = new DataWriter.DataWriterClient(dataChannel);
```

### Add Data Bindings

As in Step 4, we need to add data bindings.

Add a new `sessionIdentity` variable to make it clearly different to _data identity_:

```c# hl_lines="2 8 9"
var dataIdentity = Guid.NewGuid().ToString();
var sessionIdentity = Guid.NewGuid().ToString();

//...

await WriteSessionAsync(
    sessionClient,
    sessionIdentity,
    dataIdentity,
    timestamp,
    startNanos,
    durationNanos,
    configIdentifier);
```

Add some additional logic to `WriteSessionAsync` to create the data binding along with the session:

```c# hl_lines="3 4 12 41-57"
private static async Task WriteSessionAsync(
    SessionStore.SessionStoreClient sessionClient,
    string sessionIdentity,
    string dataIdentity,
    DateTimeOffset timestamp,
    long startNanos,
    long durationNanos,
    string configIdentifier)
{
    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = sessionIdentity,
        CreateIfNotExists = new()
        {
            Identifier = $"PeriodicData Demo {timestamp:f}",
            Timestamp = timestamp.ToString("O")
        },
        Updates =
        {
            new SessionUpdate
            {
                SetTimeRange = new()
                {
                    StartTime = startNanos,
                    EndTime = startNanos + durationNanos
                }
            },
            new SessionUpdate
            {
                SetConfigBindings = new()
                {
                    ConfigBindings =
                    {
                        new ConfigBinding
                        {
                            Identifier = configIdentifier
                        }
                    }
                }
            },
            new SessionUpdate
            {
                SetDataBindings = new()
                {
                    DataBindings =
                    {
                        new DataBinding
                        {
                            Key = new()
                            {
                                Source = "rta-datasvc",
                                Identity = dataIdentity
                            }
                        }
                    }
                }
            }
        }
    });
}
```

Run the project again from your IDE or the terminal:

``` bash
dotnet run
```

This should create a new example session, but this time the data is stored in the [Data Service (rta-datasvc)](../../../services/rta-datasvc/README.md).

## Step 6: Test the Session

Browse and load the session in ATLAS to make sure it's working.  
You should be able to browse and add parameters to displays, and see the data download.

In the `docker compose` terminal, you will see activity as requests to the [Gateway Service (rta-gatewaysvc)](../../../services/rta-gatewaysvc/README.md) are proxied through to the other services.

## Next Steps

[Review the changes](review.md) to understand how the modifications changed the demo.
