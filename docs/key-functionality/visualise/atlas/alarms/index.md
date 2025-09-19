# Overview

Alarms in ATLAS let you define conditions over live or historical data; when a condition is met, ATLAS takes one or more actions (e.g., log, warn, pop‑up, or set a marker). Alarms evaluate on every incoming sample of the parameter(s)/event(s) you specify. 

Alarms can also be defined in the Alarms.xal file

## Key Concepts

Alarm groups contain related alarms, and all alarms in a group can be disabled in one go at the group level. 

An alarm is defined where a condition becomes true. Alarms can be run on:

- Live: Runs continuously as telemetry is received.
- Manual: Runs on-demand over a historic session.
- Load Session: Execute the alarm automatically on session load

!!! note
    Alarms triggered on `load session` will not execute if sessions have been loaded as part of a workbook.

An alarm must be part of an alarm group. 