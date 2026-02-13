# Introduction to vTAGServer

vTAG Server is part of the ATLAS ecosystem and provides a way to run Simulink‑based logic on real data—either live telemetry or historical sessions—without requiring a physical ECU or embedded unit. The aim is to offload computationally expensive or non‑critical logic from hardware and to provide a safe, flexible environment for algorithm development.

Many engineering teams reach a point where:

- The physical unit’s CPU is at capacity.
- Telemetry bandwidth limits how much data can be streamed.
- Testing on real hardware introduces delays or risks.
- They need to interrogate or transform existing session data without modifying the original datasets.

vTAG Server solves these problems by acting as an external computation engine: it replays data, executes your Simulink logic on it, and publishes new derived parameters. This allows engineers to test ideas, optimise algorithms, or shift load off embedded devices.

## Key Features

- **Data Integration**: The complete data stream is displayed in ATLAS as if all data came from the car
- **Network Distribution**: One ATLAS Client typically runs the vTAGServer and supplies processed data (vData) to the VTS Data Recorder in the ADS, which distributes it across the network
- **Session Processing**: In stand-alone historical use, vTAGServer processes data from a session (.ssn) file and creates vTAG data in another vTAG session (.ssv) file

!!! note "What's the difference between vTAG Server and vTAG PC?" 
    Although vTAG Server and vTAG PC use the same build mechanism, they serve different engineering goals:
    
    vTAG Server:

    - Processes real data (historical or live).
    - Acts as an external computation engine.
    - Suitable for validation of logic on production telemetry.
    - Publishes outputs into the ATLAS ecosystem.
    
    vTAG PC:

    - A software‑in‑the‑loop emulator.
    - Runs like an ECU but entirely on your computer.
    - Optimised for debugging and functional testing of embedded code, not replaying data.
    
    Engineers typically use vTAG PC to test behaviour, and vTAG Server to test behaviour against real data.