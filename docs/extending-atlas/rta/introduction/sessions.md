# Sessions

_Sessions_ are a logical way to organise telemetry &mdash; like a file system.

Each session is labelled with user-defined metadata, including:

* unique identity &mdash; GUID, database key, or query string
* human-readable name and properties
* timestamp and start/end time of the data
* relationships to other sessions

## Browse and Search

ATLAS leverages this metadata to make sessions easy to browse, filter and sort.

<img src="../assets/session-browser.png" alt="ATLAS Session Browser">

This system provides excellent scalability and can be tightly integrated with the existing data environment.

## Modelling and Simulation

ATLAS provides traceability and version control features to support _Virtual Product Development_ through models and simulations.

!!! example
    Models are used extensively in _Formula One_ development. For example, an aerodynamics model predicts the air-flow over the car as it races around a track, depending on hundreds of variables &mdash; such as the ride height, wing angle and cooling setup.

    On-track, air-pressure sensors and pitot tubes measure real downforce, and engineers use ATLAS to compare this telemetry with predicated parameters to find the correlation with the model. Both the telemetry and models may go through multiple versions to cleanup the data &mdash; for example, removing pressure traces from sensors that are contaminated with debris.

Simulated telemetry sessions are often used to add new parameters based on a physics model, signal processing pipeline, or machine learning algorithm. RTA can describe the relationship between the parent telemetry and child models &mdash; and ATLAS will leverage this to keep the data together.

<object type="image/svg+xml" data="../assets/sessions/parent-child.svg" class="diagram" title="Parent-child relationships"></object>

## Alternate Versions

You can also offer users multiple versions of data.

For example, data collected during a test session might need some trimming and cleanup. ATLAS lets you switch out the original data for the clean version &mdash; yet keep the original available for easy reference.

<object type="image/svg+xml" data="../assets/sessions/alternates.svg" class="diagram" title="Alternate sessions"></object>

## Applying this concept to your environment

Sessions typically represent a source of data &mdash; such as a set of equipment &mdash; and cover a bounded time period:

* If you are using ATLAS to monitor hardware and embedded systems, this may naturally encompass a test session.

* If you are integrating with a continuously-stored time series, you'll need to find a logical split.  
  For example, if you were collecting vehicle telemetry, you might define a session for each vehicle and journey.

You can build this catalogue in real-time, or as a batch process.

Here are a few example scenarios:

=== "Files"

    _If you have an existing collection of telemetry files:_

    * Map each file to a session, using the file name and metadata

    * If several files belong together, you can treat them as one session &mdash; or use a parent-child relationship

    <!-- TODO diagram -->

=== "Databases"

    _If you are using a time-series database like [InfluxDB](https://www.influxdata.com/products/influxdb/) or [TimescaleDB](https://www.timescale.com/):_

    * Use the database tagging and query facilities

    * Split the sessions are points of interest, or by schedule

    <!-- TODO diagram -->

=== "UDP Stream"

    _If you are acquiring data from a real-time UDP stream:_

    * You can open a session even before data starts flowing

    * Metadata can be updated as you go &mdash; or later, to reflect test results

    <!-- TODO diagram -->

=== "Models"

    _If you are processing each telemetry session through models:_

    * You can associate the sessions in ATLAS so the data is loaded together

    * Use the _type_, _quality_, _group_ and _version_ metadata to organise the model output

    <!-- TODO diagram -->
