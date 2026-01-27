ATLAS (Advance Telemetry Linked Acquisition System) is a powerful software platform used to collect, process, and visualise data—especially in high-performance environments like motorsport. But don’t worry: you don’t need to be an engineer to get started. This guide walks you through the essentials.

!!! tip "Tips for New Users"
    - Start with a simple session file and explore the display tools.
    - Don’t worry about acronyms, focus on what you want to see or understand.
    - ATLAS is modular, learn one part at a time.

## Core Concepts

### 1. The Journey of Data

ATLAS is built around the idea that data flows through a journey—from being captured, to being stored, to being visualised. ATLAS provides tools for each step:

- Capture: Collect data from sensors, simulations, or control units.

- Store: Save that data in structured formats for later use.

- Visualise: Display and analyse the data to make decisions.

### 2. Getting Started

When you first open ATLAS, you’ll typically:

- Load a historical session file (often called an .ssn file).

- Build a display to view the data—think of this like setting up your dashboard.

### 3. Distribute and Capture

This part of ATLAS helps you:

- Connect to hardware like ECUs (Electronic Control Units).

- Export and import configuration files.

- Use vTAG, a tool that lets you run virtual models (e.g. from Simulink) and view the results in ATLAS.

### 4. Process and Analyse

ATLAS supports:

- Real-time data streaming.

- Replay of past sessions.

- Integration with tools like MATLAB or Python for deeper analysis.

You can also compare multiple sessions side-by-side to spot trends or issues.

### 5. Store and Share

Data can be stored in:

- SQL Race: A database system for large-scale data storage.

- SSN2 files: Local files for quick access.

You can use SQL Race Management Studio to manage and share data across teams.

### 6. Visualise

ATLAS gives you full control over how data is displayed:

- Drag-and-drop interface to build custom dashboards.

- Zoom, pan, and overlay data from different sources.

- Use colour coding and annotations to highlight key events.

## Tools You’ll Encounter

ATLAS includes a set of tools that work together to help you collect, analyse, and visualise data—each one designed for a specific part of your workflow. Here's a quick guide to what they do and when to use them.

| Tool    | What It Does | When to use it |
| -------- | ------- | ------- |
| [System Monitor](configure/system-monitor/index.md)  | Manages projects and hardware connections | When programming ECUs |
| [ADS](key-functionality/stream/ads/index.md) | Connects ATLAS to live data sources  | When streaming live data from a vehicle or simulator |
| vTAG  | Runs virtual models and integrates results  | When running Simulink models with real-world data |
| [SQL Race](key-functionality/store/sqlrace/index.md)    | Stores and manages large datasets | For persistent storage |
| [ATLAS](key-functionality/analyse/viewer/index.md)    |  Lets you create custom workbooks to visualise data | For visualising data in different displays |