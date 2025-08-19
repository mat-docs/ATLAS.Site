# ATLAS Eco-System Overview  

The **ATLAS ecosystem** is Motion Applied’s advanced telemetry and data management platform, purpose-built for high-performance motorsport engineering and adaptable to wider industries. It brings together powerful components for **hardware configuration, data distribution, storage, and visualisation**, ensuring that engineers can capture, process, and analyse telemetry data at speed and scale.  

---

## System Monitor – ECU Configuration and Calibration  

At the foundation of the ecosystem is **System Monitor**, the primary tool for configuring and calibrating ECUs (Electronic Control Units).  

- Provides a multi-platform [Configuration API](../developer-resources/secu4/configuration_api/index.md),that enables seamless integration with client applications in various programming languages.  
- Supports the creation of **virtual parameters**, which are translated into open formats for downstream use.  
- Offers a secure and efficient environment for hardware configuration, serving as the **gateway between physical ECUs and the ATLAS data ecosystem**.  

System Monitor ensures that hardware is correctly defined and calibrated before data is distributed, making it the cornerstone of telemetry workflows in motorsport and other high-performance applications.  

---

## Distribution – ATLAS Data Server, Bridge Service, and Stream API  

Telemetry flows through ATLAS using a set of tightly integrated services:  

- **ATLAS Data Server (ADS)**  
  Acts as the central hub for telemetry ingestion and distribution. ADS records live sessions, manages multicast delivery, and supports daisy-chaining across servers. This enables **remote telemetry architectures**, where distributed teams can access live data with no loss of performance.  

- **Bridge Service**  
  Real-time data is processed and distributed using modern broker technology (e.g., Kafka), replacing legacy multicast methods. This service ensures reliable, scalable delivery and supports cloud deployments. Engineers can also create calculated signals derived in real time—that are published back into the stream for consistent downstream use.  

- **Stream API**  
  Exposes telemetry in a standardised, engineering-calibrated format using Google Protobuf. The API provides interfaces for both data producers and consumers, enabling seamless integration with external tools and workflows. The **Bridge Service** further enhances this by converting raw telemetry into usable engineering values while decoupling broker technology.  

---

## Data Storage – SQL Race Sessions and Parquet Sessions  

ATLAS supports flexible storage of telemetry data in two complementary formats:  

- **SQL Race**  
  A session-based database optimised for motorsport workflows. SQL Race enables rapid querying and analysis of session data, making it a proven choice for race engineering environments.  

- **Parquet**  
  A modern, columnar format optimised for **big data analytics**. Parquet sessions are well-suited for integration with external platforms, cloud pipelines, and long-term storage. Files can be exported at configurable intervals, with optional encryption for secure distribution.  

Together, these formats allow users to work within established motorsport practices while also taking advantage of scalable, analytics-driven workflows.  

---

## Visualisation – ATLAS Viewer  

At the user-facing end of the ecosystem, the **ATLAS Viewer** provides powerful tools for **real-time visualisation and post-session analysis**:  

- Live streaming of telemetry alongside historical playback  
- Flexible plotting, overlays, and comparisons across multiple sessions  
- Integration with external models and simulation data  
- Support for multiple data formats  

This combination of **performance, flexibility, and usability** makes ATLAS Viewer the engineer’s primary workspace for turning raw telemetry into actionable insight.  
