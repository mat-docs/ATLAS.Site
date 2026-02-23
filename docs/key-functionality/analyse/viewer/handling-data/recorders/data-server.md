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

    - Recorder Name: Friendly name for identification.

    - Data Server: Select from {servername}:{Data Stream name}.

    - Refresh: Click to update the list of available servers.

    - Session Identifier: Use tokens or manual entry.

    - Auto Record: Enable if you want recording to start automatically.

4. Click Start to begin manual recording.

## Notes

The first client to connect sets the TAG channel.

If the server list is outdated, click Refresh or restart ATLAS.

Recording will not start unless the Data Server is running and the TAG channel matches