# Start here

ATLAS (Advanced Telemetry Linked Acquisition System) is a modular data ecosystem for capturing, distributing, storing and analysing high-frequency time-series data. It is used across Formula 1, Formula E, IndyCar, NASCAR and wider high-performance engineering.

!!! note "Two words, two meanings"
    In these docs, **ATLAS** means the whole ecosystem: hardware configuration, streaming, calculation services, storage and analysis. **ATLAS Viewer** (or just **Viewer**) is the desktop application used to analyse data. People will often say "ATLAS" and mean Viewer. The docs try to say which one they mean, and the [glossary](glossary.md) defines both.

## How ATLAS is organised

ATLAS covers an entire data chain: a unit on the car, a link to the pit, servers, a shared database, calculation services, and a room full of engineers analysing the same data at once. Viewer sits at the end of that chain, and its vocabulary (sessions, sets, recorders, application groups) follows from where the data comes from.

You do not need the whole chain to start. A few ideas, taken in order, are enough, and the course below introduces them in that order.

## Choose your route

<div class="grid cards" markdown>

-   :material-chart-line: __I analyse data__

    ---

    You were given sessions and want to look at them, compare runs and find answers.

    Take steps 1 to 7 of the course. About 2 hours in total, with a working Viewer.

    [:octicons-arrow-right-24: Start with step 1](course/other-tools.md)

-   :material-server-network: __I run or support the systems__

    ---

    You set up hardware, servers, databases or recorders for other people.

    Skim steps 1 to 4, then take steps 7 and 8. Then use [Install and set up](../getting-started/quick-start.md).

    [:octicons-arrow-right-24: The five stages](course/five-stages.md)

-   :material-code-braces: __I build on top of ATLAS__

    ---

    You write code, scripts or services against sessions, Viewer or the stream.

    Read steps 1, 2 and 4, then go straight to step 9.

    [:octicons-arrow-right-24: Automating it](course/automating.md)

</div>

## The course: ATLAS from zero

Nine short pages, each linking to the full reference for the detail. You can read them in order, or jump to the one you need.

| Step | Page | You will learn | Time |
|---|---|---|---|
| 1 | [Coming from another analysis tool](course/other-tools.md) | What is different about ATLAS, and a concept map from other tools | 10 min |
| 2 | [The five stages](course/five-stages.md) | Where Viewer sits in the ecosystem, and what you can ignore | 10 min |
| 3 | [Your first hour in Viewer](course/first-hour.md) | Load a session, plot parameters, overlay two runs, save a workbook | 30 to 60 min |
| 4 | [How Viewer is organised](course/viewer-model.md) | Sessions, sets, workbooks, pages, displays and parameters, and how they connect | 10 min |
| 5 | [Laps, markers and comparing runs](course/laps-and-comparison.md) | The core analysis loop | 15 min |
| 6 | [Channels and calculated parameters](course/channels-and-calculations.md) | Find signals fast, and create new ones | 15 min |
| 7 | [Getting your data in](course/getting-data-in.md) | Where sessions come from, and how to bring your own data | 15 min |
| 8 | [Beyond Viewer](course/beyond-viewer.md) | The rest of the ecosystem, one paragraph per component | 15 min |
| 9 | [Automating it](course/automating.md) | Which API to use to script, extend or integrate | 10 min |

Alongside the course: the [Glossary](glossary.md) for any term you have not met, and [Choosing components](ecosystem-guide.md) for decisions about storage, distribution and calculation.

## What you need

- **A Windows 11 PC** (64-bit). See [system requirements](../getting-started/sysreqs.md).
- **ATLAS Viewer and a licence.** Versions are available from the [Motion Applied Portal](https://portal.motionapplied.com/).
- **A session to look at.** A `.ssn2` file or a shared SQL Race database from your team.

## Why ATLAS is built this way

<div class="grid cards" markdown>

-    __Open by Design__

    ---

    ATLAS offers an open, API-first architecture that integrates with existing tools and workflows.

-    __Built for Performance__

    ---

    Fast startup, high-frequency data capture, and visualisation tools trusted by elite motorsport teams.

-    __Flexible Deployment__

    ---

    Local, cloud and hybrid set-ups, with scalable storage and licensing options to fit any team size or budget.

</div>

!!! tip "Interested in how you can use ATLAS?"
    If you're interested in how Motion Applied can advance your data systems, contact [sales@motionapplied.com](mailto:sales@motionapplied.com).
