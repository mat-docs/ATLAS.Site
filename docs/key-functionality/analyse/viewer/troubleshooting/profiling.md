# Performance and Memory Profilers

## Overview

From version 11.2.3.460 onwards, ATLAS application now includes Jet Brains dotTrace and dotMemory profilers, which can 
be accessed via the Tools menu. 
This function allows users to take snapshots, which can be shared with the ATLAS development team for debugging purposes. 
Please use this feature only when specifically requested by the development team.

!!! warning
    The profilers capture a large amount of information and will generate a large file. Please limit the amount of time 
    metrics are being captured to minimise the file size.

## Capturing Performance Profile
1. Navigate to `Tools > Performance Profiler > Performance > Start`.
    ![PerformanceToolsMenu.png](assets%2Fprofiling%2FPerformanceToolsMenu.png)
2. Wait for the status bar to display `Performance Profiler Started`.

    ![StartingPerformance.png](assets%2Fprofiling%2FStartingPerformance.png)

    ![StartedPerformance.png](assets%2Fprofiling%2FStartedPerformance.png)

3. Perform the actions that are required to be profiled.
4. Stop the profiler by navigating back through the Tools menu. 
5. Navigate to the snapshot folder via `Tools > Performance Profiler > View Snapshot Folder`.
6. Send the \*.dtp and the \*.dtp.000# to your Motion Applied support representative. 

## Capturing Memory Profile
1. Navigate to `Tools > Performance Profiler > Memory > Start`.
    ![MemoryToolsMenu.png](assets%2Fprofiling%2FMemoryToolsMenu.png)
2. Wait for the status bar to display `Memory Profiler Started`.

    ![StartingMemory.png](assets%2Fprofiling%2FStartingMemory.png)

    ![StartedMemory.png](assets%2Fprofiling%2FStartedMemory.png)

3. Perform the actions that are required to be profiled.
4. Create snapshot as required via `Tools > Performance Profiler > Memory > Snapshot`. 
5. Stop the profiler by navigating back through the Tools menu. 
6. Navigate to the snapshot folder via `Tools > Performance Profiler > View Snapshot Folder`
7. Send the *.dmw to your Motion Applied support representative.