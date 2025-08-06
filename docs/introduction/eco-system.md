The ATLAS ecosystem is a comprehensive telemetry and data management platform developed by McLaren Applied, designed to support high-performance motorsport engineering and beyond. It spans a wide array of components, each playing a critical role in the capture, processing, distribution, and visualisation of telemetry data.

## System Monitor: Configuration and Control
At the foundation of the ecosystem is the System Monitor, which serves as the primary interface for configuring ECUs and telemetry units. It uses a multi-platform Configuration API built on gRPC, allowing seamless integration with clients written in various programming languages. The API is designed for speed and security, offering thread-safe access, caching, and OAuth-based authentication. Engineers use System Monitor to define virtual parameters using Function Definition Language (FDL), which are then converted into open formats for downstream use.

## Stream API and Protocol: Real-Time Data Flow
Telemetry data enters the system through the Stream API and Stream Protocol. These components expose engineering-calibrated telemetry in a standardised format using Google Protobuf. The protocol supports conversion rules and transformations, while the API provides interfaces for both data producers and consumers. A Routing Service and Bridge Service further enhance this architecture by decoupling broker technology and converting raw telemetry into usable engineering values.

## Data Distribution and Virtual Parameters
The ATLAS ecosystem uses a Kafka-based message broker to distribute telemetry data reliably and efficiently. This replaces traditional multicast methods and supports cloud deployments. The Virtual Parameter Service calculates derived metrics in real time and publishes them back into the broker, ensuring consistent availability of computed values without requiring downstream recalculation.

## Historical Data Storage: SQL Race and Parquet
Telemetry data is stored in two main formats: SQL Race and Parquet. SQL Race offers a session-based database structure ideal for motorsport workflows, while Parquet provides a columnar format optimised for big data analytics. The system supports conversion between these formats, and Parquet files can be encrypted and exported at configurable intervals. This flexibility allows users to integrate telemetry data with external tools and platforms.

##  ATLAS Data Server: Centralised Ingestion and Distribution
The ATLAS Data Server (ADS) acts as the central hub for telemetry ingestion and distribution. It records live sessions, supports multicast distribution, and enables daisy-chaining across servers. ADS also integrates with FIA and team telemetry endpoints and supports plugin-based extensions for alternative broker technologies. It plays a key role in enabling remote telemetry architecture, allowing distributed teams to access data without compromising performance.

## ATLAS Client: Visualisation and Analysis
The ATLAS Client is the user-facing component of the ecosystem, offering powerful tools for real-time visualisation and analysis. It supports live data streaming, historical playback, and integration with external models. Users can access sessions instantly without running a recorder, thanks to the live cache and broker-based delivery. The client is flexible and performant, supporting a wide range of data formats and authentication providers.
