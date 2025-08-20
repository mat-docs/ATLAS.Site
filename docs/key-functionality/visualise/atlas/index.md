# ATLAS

The ATLAS client is a core component of the ATLAS ecosystem, designed for the visualisation and analysis of telemetry data. It enables users to interact with both live and historical data streams, offering real-time insights and deep analytical capabilities tailored for motorsport and other telemetry-intensive applications.

Key features include:

- **Live Telemetry Access**: Monitor performance data in real time, whether trackside or remotely.

- **Customised Analysis**: Analyse data specific to individual vehicles or subsystems.

- **Historical Replay**: Revisit and study past sessions using stored telemetry files.

- **Flexible Integration**: Supports a wide range of data formats including proprietary (.ssn2), SQL Race databases, CSV, MATLAB, and Parquet.

- **Automation Support**: Through the ATLAS Automation API, users can automate session loading, display configuration, and parameter management using .NET-compatible languages like C#, and MATLAB.

The client operates as a plugin-based composite application, allowing extensibility and integration with custom display modules. It is optimised for performance and supports service-oriented architecture principles to streamline user workflows. For more information on how to create your own plugins read the [Display API Documentation](../../../developer-resources/atlas/display-api/index.md)