# ATLAS Enrich

Tooling to add upon existing raw data to augment and enrich for more advanced simulation

## [vTAG Server](vtag/index.md)

vTAG Server is a computation engine that runs Simulink‑based logic on live or historical telemetry to generate new derived data without relying on physical hardware.

### Key Functionality

- Live & historical data processing: Replays telemetry streams or session files and executes Simulink‑compiled algorithms on them to produce new computed channels.
- External computation offload: Shifts non‑critical or CPU‑heavy logic away from on‑car ECUs, reducing hardware load and enabling safer experimentation.
- Data publishing into ATLAS: Outputs vData back into the ATLAS ecosystem so processed signals appear as native channels for analysis, distribution, and recording.

<!-- ## [Virtual Parameter Service](vps/index.md)

The Virtual Parameter Service calculates FDL-defined virtual parameters in real time and publishes them back to the broker, eliminating client-side recalculation.

### Key Functionality

- Real-time computation: Computes virtual parameters as live telemetry arrives and outputs them as virtual sessions.
- Stream & lifecycle management: Integrates with Kafka to read source sessions, create/manage virtual sessions, and handle their full lifecycle.
- Operational observability & control: Provides Prometheus metrics, auditing via a CLI tool, and configurable buffering to balance latency and throughput. -->