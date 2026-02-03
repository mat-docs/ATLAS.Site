# Live & Historic Usage

vTAG Server can operate in two ways depending on the data source:

- **Live Mode** – processes parameters from an active ADS telemetry stream.
- **Historic Replay Mode** – replays a previously recorded session file (SSN or SQL Race).

The behaviour of your vTAG model is the same in both modes: it reads parameters via Atlas 10 Source blocks, executes the Simulink logic, and publishes outputs via Measurement Write.

## Live Usage (ADS Telemetry)

When a live telemetry stream is active in ADS, the vTAG Server instance connected via VTS Recorder will begin producing output parameters in real time.

### What you will see

- ATLAS will display live parameters from the telemetry stream.
- Additional derived parameters from your vTAG Server model appear alongside them.
- If ADS is configured with Auto‑Record, both the actual telemetry and the VTS Recorder output are recorded continuously.

!!! note
    - vTAG Server processes samples as they arrive.
    - If live telemetry contains coverage gaps (network dropouts), vTAG Server cannot backfill the missing samples later.
    - The output during live operation will therefore include any gaps present in the incoming signal.

## Wire‑Link Upload (End‑of‑Session Offload)

When telemetry coverage is imperfect, some data is only available after the wire‑link offload at the end of a run.

After offload, once the complete session is available:

- The system can automatically switch to Historic Replay Mode.
- vTAG Server can replay the session from start to finish using the full, gap‑free dataset.
- It regenerates the entire set of derived parameters using the higher‑quality data.

This ensures that the simulated parameters are based on the complete dataset, not just what was available live.

If ATLAS detects that additional data has arrived after live recording:

- The vTAG model may be re-run over the full session with the improved dataset.
- The newly generated outputs are written to the same directory as the original VTS data.
- The version number (iteration counter) increments automatically to distinguish reprocessed files.

## Stand‑Alone Historic Usage (Full Session Replay)

If you have access to a complete SSN or SQL Race session, you can perform a stand‑alone vTAG replay directly inside ATLAS.

To run a historic replay:

1. Open ATLAS.
2. Load the session you want to analyse.
3. Select the vTAG Server layer as the data source.
4. Choose the correct vTAG Server instance (IP address under Options → Choose).
5. Define the time span if required (Current Lap, Fastest Lap, Entire Session, etc.).
6. Start playback — ATLAS will display the derived parameters from vTAG Server.

This allows you to run diagnostic or engineering models using complete, offline session data without ADS or live telemetry.

## Session File Naming (VTS Recorder)

The VTS Recorder generates output session files containing the vTAG‑derived parameters. If the active recorder outputs a base session name `xxx.ssn`, the VTS Recorder produces:

```
xxx.VTS.001.ssv
xxx.VTS.002.ssv
xxx.VTS.003.ssv
...
```

Where:

- `xxx` = base session name (taken from the active recorder or the name entered in VTS Recorder).
- `VTS` = the identifier for the vTAG source (configurable).
- `nnn` = iteration number (starting at 001).

Each time the vTAG Server performs a fresh playback (live or historic), the version number increments.

When running a replay without ADS you can enter the base session name manually. Each new playback produces a new version automatically.

## Opening Multiple Sessions in ATLAS

ATLAS can display actual data and vTAG‑generated data together.

### How ATLAS handles simulated session versions

- ATLAS shows one column for each unique vTAG identifier (the VTS part of the filename).
- It automatically finds all versions of simulated output files created for the same base session.
- The highest version is selected by default.
- Users can switch to earlier iterations if needed.

This allows easy comparison of re‑processed sessions (e.g., live vs. offloaded vs. "clean" full replay).

!!! note "Session Persistence"
    - vTAG Server does not remember state between sessions.
    - If you need multi‑session continuity (e.g., cumulative metrics), you must:
        - Create a synthetic "start block" (short session containing required initial values).
        - Stitch sessions together using SQL Race APIs.

    This is necessary because vTAG Server always starts a replay from zero state.