# SQL Race Object Model

The SQL Race API is organised around a **`Session`** &mdash; the container for time-series
data, its configuration, and the structure (laps, markers, events) layered on top. The
interactive map below shows the key classes and, crucially, **the actual methods and
properties that connect them**, so you can see how a typical workflow flows from one class
to the next.

!!! tip "How to use the map"

    * **Click a class** to see what it does, its key members, and links to the API
      reference and a worked example.
    * **Hover** a class to highlight its connections.
    * Use the **legend** to highlight a stage &mdash; Connect, Configure, Structure or Read.
    * Arrow colours: **navigation** (a property), **write** (adds data), and plain
      **method call**.

<div class="sqlrace-model-map"></div>

> The map is generated from the official
> [SQL Race API reference](https://mat-docs.github.io/Atlas.SQLRaceAPI.Documentation/api/index.html)
> (the DocFX `xrefmap`), so every class and every connecting member maps to a real,
> current API type and method.

## The four stages

A typical end-to-end workflow moves through four stages, which map to the colours in the
graph:

1. **Connect** &mdash; `SessionManager.CreateSession(...)` or `Load(...)` returns an
   `IClientSession`; its `.Session` property gives you the `Session`.
2. **Configure** (writing) &mdash; build a `ConfigurationSet` (via
   `Session.CreateConfiguration()` or `ConfigurationSetManager`), add `Channel`s,
   `Parameter`s, `Conversion`s and groups, then commit it.
3. **Structure** &mdash; a `Session` organises data into `Lap`s, `Marker`s and `Event`s,
   each with their own time ranges.
4. **Read** &mdash; open a `ParameterDataAccess` with
   `Session.CreateParameterDataAccess(...)`, then call `GetNextSamples`, `GetNextData` or
   `GetLapStatistics` to get `ParameterValues` / statistics back.

## Where to go next

| Stage | Worked example |
|-------|----------------|
| Connect | [Session Loading](session-loading.md) |
| Configure | [Create Session](create-session.md) &middot; [Synchro Data](synchro-data.md) |
| Read | [Parameter Data Access](parameter-data-access.md) |
| Export | [Session Export](session-export.md) |
| Calculated channels | [Functions](functions.md) |
