# Open Streaming Architecture
A standard, open set of rules and services for streaming telemetry data over a broker. Includes full definition of 
the Protobuf schema for transmitting messages, along with documentation describing the 
messages.

!!! tip "New to Open Streaming?"
    See the [Getting Started Guide](../../../developer-resources/secu4/getting-started.md) to get data flowing in 30 minutes using the Docker-based quick start, or explore the [example repository](https://github.com/atlas-dev-hub/example-stream-api-kafka-setup) for a hands-on walkthrough.

![open streaming architecture](assets/open_streaming_light.png#only-light)
![open streaming architecture](assets/open_streaming_dark.png#only-dark)

## Components

### [Stream API](../../../developer-resources/secu4/stream_api/index.md)
A standard API to expose streaming data from SECU units and abstract away proprietary 
implementation details. Consumers of this API will be able to write software that 
interfaces with any viewer, network protocol, or storage technology of their choice. 
All the data from the SECU unit (after RDA filtering) will be available on the stream. 
This will be integrated with a protocol for streaming engineering (calibrated) 
telemetry, interoperating with ATLAS clients and the surrounding data processing 
ecosystem.

### [Bridge Service](../../../developer-resources/secu4/bridge_service/index.md)
Standalone service that decodes a raw stream of quads from an ADS, converting the data 
to engineering values then into the Stream Protocol via the Stream API. Will include 
components to manage sessions, configuration, metadata etc. All RDA protected data will 
be filtered out at this point, based on the active team license, so any downstream 
components will only receive data available to the team.

!!! note "In plain terms"
    A running car streams out a constant flood of raw electronic readings — thousands of numbers a
    second, in a compact machine format that nothing can read directly. Bridge Service is the
    **translator and broadcaster** that sits in the middle:

    - **It translates** the raw readings into real engineering values — engine RPM, temperatures,
      pressures, and so on — in their proper units.
    - **It broadcasts live** onto a shared stream (the broker) so that many tools and people can
      read the same feed at once, instead of each one needing its own direct link to the car.
    - **It respects permissions** — only the data your team is licensed to see passes through;
      restricted parameters are filtered out before they leave.

    In short: it turns a car's raw data into **readable, shareable, live telemetry** that the rest
    of your tools can use.

### Virtual Parameter Service
Virtual parameters are defined as simple FDL functions in the ECU logging config, and 
are traditionally calculated on demand by clients rather than the values being persisted
like other parameters. However, this requires knowledge of the proprietary FDL grammar, 
so a service will be developed as part of the Motion Applied Bridge Service to 
calculate virtual parameters in real time and written to the broker, eliminating the 
need for downstream clients to recalculate them.

### Multicaster Service
An optional service to reduce network bandwidth in situations where a large number of 
clients are reading the same set of data from the same broker. Can be configured to 
consume specific streams of data from the broker, and forward all the packets over 
multicast to listening clients.

## Historical Data Storage (Parquet)
In addition to the ATLAS session formats, a Parquet format will be supported for storing
open engineering data directly from the stream or as an export from ATLAS.
Parquet is an open-source file format for storing large datasets in an optimized way. 
Columnar storage allows for fast data processing and good compression rates. Parquet 
files can be easily accessed using a variety of programming languages and APIs, to allow
teams to access their data independent of ATLAS.