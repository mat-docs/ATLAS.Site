# ATLAS Quick Start

This page contains quick access to getting started with different component in the ATLAS ecosystem. 

## Software Installation Guides

| Component    | Description |  
|--------------|-------------|
| [ATLAS Viewer](../key-functionality/analyse/viewer/quick-start.md) | Visualise an analyse telemetry data. Open session files, build custom workbooks and compare runs. |  
| [vTAG Server](../key-functionality/enrich/vtag/getting-started.md)  | Run Simulink models against live or historical telemetry. Derive new parameters without hardware changes. | 
| [ATLAS Data Server](../key-functionality/stream/ads/installation.md) | Distribute live telemetry across your network. Connects hardware to ATLAS clients over Ethernet or Wi-Fi. | 
| [System Monitor](../key-functionality/configure/system-monitor/getting-started/index.md) | Configure, calibrate and tune Motion Applied ECYs. Program units, setup logging and manage sensors. | 
| [SQL Race Management Studio](../key-functionality/store/sqlrace/installation.md) | Store and manage telemetry session in a central database. Bulk import, organise and share data across your team. | 

## Developer Guides

| Component    | Description |  
|--------------|-------------|
| [SQL Race API](../developer-resources/atlas/sql-race/integration.md) | Read and write telemetry sessions, parameters, events and laps directly |  
| [Display API](../developer-resources/atlas/display-api/initialization.md) | Build custom display plugins that run natively in side ATLAS Viewer | 
| [Automation API](../developer-resources/atlas/automation-api/getting-started.md) | Control ATLAS Viewer programmatically - load sessions, navigate displays and extract data. |   
| [Stream API](../developer-resources/secu4/stream_api/reference_docs/getting-started/installation.md) | Read and write to the live telemetry stream over gRPC and Protbuf. |  
| [Support Library](../developer-resources/secu4/support_library/index.md) | Helper library built ontop of the Stream API for building services. |  
| [Configuration API](../developer-resources/system-monitor/configuration_api/index.md) | Configure ECUs programmatically via a cross-platform gRPC interface. |
| [Remote Telemetry Architecture](../developer-resources/rta/downloads.md) | Connect ATLAS to any existing database. Write a light weight data adapter and serve telemetry over REST. |