# Data Server Telemetry Recorder

## Purpose

Connects to a live telemetry stream from an ATLAS Data Server over a network.

## Prerequisites

1. ATLAS Data Server must be running on the source machine.

2. The TAG channel must match between client and server.

3. The ATLAS client must be on the same network or have access to the server.

## Setup Instructions

1. Open Session Browser in ATLAS.

2. Add a Data Server Telemetry Recorder.

3. Configure the following:

    - **Recorder Name**: Friendly name for identification.

    - **Data Server**: Select from {servername}:{Data Stream name}. Servers that are offline are shown with `:(OFFLINE)` after the name.

    - **Refresh**: Click to update the list of available servers.

    - **Session Identifier**: Use tokens or manual entry. Select **Auto Assign** to take the identifier from the server.

    - **Session Colour**: The colour used for Sessions from this Recorder.

    - **Promote to primary when recorder starts**: Makes the recorded Session the primary Session of its Set when recording starts.

4. Click **Start** to begin manual recording, or turn on **Auto Record** for the Recorder in the Session Browser if you want recording to start automatically.

## Notes

The first client to connect sets the TAG channel.

If the server list is outdated, click Refresh or restart ATLAS.

Recording will not start unless the Data Server is running and the TAG channel matches