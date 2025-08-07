## What is a Session?
A Session in ATLAS is a structured collection of data samples recorded from a vehicle. These samples are captured by a data logger and uploaded to ATLAS either:

Live, via telemetry (wireless transmission), or
Offline, via a wirelink (physical connection).
Each Session is automatically created and stored in an SQLRace database as it is recorded. This database replaces the older .ssn file format used in previous versions of ATLAS. However, legacy .ssn files can still be loaded for analysis and comparison.

## Types of Sessions
There are two primary types of Sessions in ATLAS:

**Historic Sessions**

These are Sessions that have already been recorded and stored. They can be loaded at any time for review and analysis.

**Telemetry Sessions**

These are live Sessions that are displayed in real-time as data is received from the vehicle.

!!! warning
    Data visualisation and analysis in ATLAS can only begin once a Session is loaded into a Workbook. A Workbook is the environment where data is displayed using graphs, tables, and other visual tools.

## Why Sessions Matter
Sessions are the foundation of all data analysis in ATLAS. They allow engineers and analysts to:

- Monitor vehicle performance in real time
- Compare data across different runs or configurations
- Identify trends, anomalies, or failures
- Share insights with other team members

Sessions can be combined, compared, and manipulated in various ways to support these goals. The tools used to manage Sessions include:

- Session Browser: The main interface for loading, recording, and editing Sessions.

- Composite Sessions: Merged Sessions that combine multiple data recordings into one.

- Compare Sets: Groups of Sessions loaded together for side-by-side analysis.

### Key Concepts

| Term              | Definition                                                                 |
|-------------------|----------------------------------------------------------------------------|
| Session           | A dataset recorded from a vehicle, stored in an SQLRace database.          |
| Historic Session  | A previously recorded Session.                                             |
| Telemetry Session | A live Session streamed in real time.                                     |
| Workbook          | The environment in ATLAS where Sessions are visualised and analysed.       |
| Session Browser   | The tool used to manage Sessions.                                          |
| Composite Session | A combination of multiple Sessions treated as one.                         |
| Compare Set       | A group of Sessions loaded together for comparison.                        |
