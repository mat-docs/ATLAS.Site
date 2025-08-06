ATLAS APIs are designed with an API-first strategy, enabling seamless integration with third-party tools and cloud-native platforms. ATLAS APIs are a suite of extensibility interfaces designed to integrate, automate, and extend the capabilities of the ATLAS telemetry and data analytics platform. They support real-time and historical data workflows across motorsport, automotive, aerospace, and simulation environments.

## Key APIs and Usage

#### [SQLRace API](../developer-resources/atlas/sql-race/index.md)

Provides direct access to telemetry databases. Used for in-process data extraction and session creation.

#### [Display API](../developer-resources/atlas/display-api/index.md)

Enables creation of custom visualisations with native ATLAS look and feel.

#### [Automation API](../developer-resources/atlas/automation.md)
 
Enables programmatic control of ATLAS via WCF services. Allows automation of session loading, display creation, parameter manipulation, and transient data injection.

#### [Stream API](../developer-resources/secu4/stream_api/index.md)

Built on gRPC and Protobuf for real-time telemetry streaming. Supports both reading and writing of telemetry packets.