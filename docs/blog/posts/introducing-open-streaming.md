---
date:
  created: 2026-06-02
categories:
  - Blog
tags:
  - Stream API
---

# Introducing Open Streaming: real-time telemetry, opened up

For decades, getting live engineering telemetry out of a car and into the tools that make sense of it has meant working inside closed, proprietary formats. Open Streaming changes that. It is a broker-based, API-first architecture for moving telemetry in real time over documented standards, so the data is yours to route, store, and build on however you like. This post is an introduction to the idea, why we built it the way we did, and what it can unlock.

<!-- more -->

## First, what do we mean by "streaming"?

In motorsport and engineering more broadly, data tends to arrive in one of two ways. The first is *historical*: a session ends, a file is produced, and you load that file to analyse it after the fact. The second is *live*: data flows continuously, sample by sample, while the event is still happening, and your tools react to it live - this is streaming.

Both matter. But streaming is what lets an engineer watch a tyre temperature climb mid-stint, catch a sensor misbehaving on the out-lap, or make a strategy call while there is still time to act on it. (We wrote more about that live-versus-historical split in [How data moves in motorsport](how-data-moves-in-motorsport.md).)

The hard part has never really been the *idea* of streaming. It is the plumbing. How do you get hundreds of channels, sampling hundreds or thousands of times a second, from a source into every tool that needs them, reliably, in order, and without locking yourself into a single vendor's box? That is the problem Open Streaming is built to solve.

## The architecture

Open Streaming is a **message broker pattern**. It runs on two technologies most developers will already know:

- **Apache Kafka** as the broker, the backbone that carries telemetry from producers to consumers, durably and in order.
- **Protocol Buffers (Protobuf)** over **gRPC** as the contract, a compact, strongly-typed, language-neutral description of every packet that flows through the system.

```
 Source  →  Stream API (gRPC)  →  Kafka topics  →  ATLAS / your tools
(a car,        sessions,           durable,          live or
 a sim,        config,             ordered            recorded
 a rig)        routing             transport          analysis
```

Because Kafka and gRPC are open standards with mature client libraries in almost every language, *any* platform that speaks them can join the pipeline, as a producer of data, a consumer of it, or both. The system is split into a handful of focused services, each doing one job:

| Component | What it does |
|-----------|--------------|
| **[Stream API](../../developer-resources/secu4/stream_api/index.md)** | The gRPC server that manages sessions, connections, and routes packets onto Kafka |
| **Key Generator** | Hands out unique identifiers for configuration packets |
| **[Support Library](../../developer-resources/secu4/support_library/index.md)** | A .NET/Python wrapper offering higher-level, managed pipelines |
| **[Bridge Service](../../developer-resources/secu4/bridge_service/index.md)** | Translates existing data streams (e.g. from an MA ECU) into the Open Streaming protocol |

You do not need all of them to start. For many use cases the Stream API and a Kafka broker are enough.

## API-first, so developers stay in control

Open Streaming is designed API-first. Every capability is exposed through a documented gRPC interface, which means developers build against the API rather than against a fixed UI, a proprietary file format, or a single supported workflow. 

What that buys anyone is flexibility. You decide which sources to bring in, and they do not have to be the ones anyone anticipated. A car, a sim, a test rig, a weather feed, a GPS unit, a bespoke sensor someone built last week: if it can produce timestamped samples and talk to the API, it can become a data source.

The payoff comes at the point of analysis. Because every source flows through the same protocol and lands in the same system, all of those streams line up on **the same timeline, in the same workbook**. An engineer can overlay data that originated in completely different places and correlate it directly. The flexibility is at the edges, where the data comes from, while the experience stays unified.

## Why we built it this way

The shape of a system is a set of choices, and these are the ones we made deliberately.

**It is a microservices architecture.** Each piece, session management, key generation, bridging, the broker itself, is an independent service with a clear responsibility. 

**It is easier to maintain.** Small, focused services are easier to reason about, update, and test in isolation than a single monolith. A change to how sessions are tracked does not risk the code that routes data packets, because they are not the same moving part.

**It is built to scale and harden.** Following the microservices model opens the door to the same resiliency and scaling patterns proven across modern distributed systems, and growing those options is an active area of investment for us.

**It frees you from fixed physical infrastructure.** Traditional telemetry pipelines often lean on dedicated on-site servers and purpose-built machines. That hardware is expensive to buy, awkward to scale, a maintenance burden, and a single point of failure when it sits in one place. 

## What being "open" unlocks

When the format and transport are open it means:

- **You can build your own tools.** Dashboards, alerting, custom visualisations: anything that consumes a Kafka topic can consume your telemetry, in whatever language you already work in.
- **You can feed your own models.** Want to run live anomaly detection, or train a model on historical sessions? The data is in a clean, structured, machine-readable form from the moment it leaves the source, with no brittle export step in the middle.
- **You can bring your own sources.** Anything that produces time-series data with timestamps can become a producer. A test rig, a different sensor suite, or a racing sim.

That last one is not hypothetical. We have already wired live iRacing telemetry straight into ATLAS through the Stream API. The write-up, [How I got iRacing telemetry streaming into ATLAS](blog-post-iracing-bridge-service.md), is a great look at what the architecture enables.

## The bigger picture: an ecosystem, not a feature

It is worth stepping back from any single integration and looking at the shape of the whole thing, because that is where the real potential sits.

An open, API-first, broker-based pipeline is not really a telemetry feature. It is a substrate. Once data moves over open standards and any service can produce or consume it, the interesting work stops being "how do we get the data out" and starts being "what do we build on top of it." 

Inside motorsport, that looks like a growing library of bridges for different hardware, community-built consumers and dashboards, live machine-learning pipelines running alongside the human engineers, and digital-twin or simulation workloads fed by the same live stream the garage is watching. Each new producer makes the network more useful to every consumer.

Outside motorsport, the same architecture travels surprisingly far. High-frequency, time-series telemetry is the daily reality of automotive R&D, aerospace, marine, energy, robotics, and industrial IoT, and the analysis problem in those fields is fundamentally the same one: many sources, sampling fast, that need to align on a single timeline so people can reason about them together. 

That is the broader bet behind Open Streaming. Closed systems optimise for one workflow and stop there. Open ones compound, because every tool, model, and source that someone else adds is one you can build on next.

## See it for yourself

We have published working examples so you can go from reading about Open Streaming to running it. Both spin up the full backend, Kafka, the Stream API, and the Key Generator, in Docker, so there is no SDK to install before you can watch data flow:

- **[example-stream-api-kafka-setup](https://github.com/atlas-dev-hub/example-stream-api-kafka-setup)** is a Kafka playground with a Python/Jupyter notebook for producing and inspecting stream data. The most open and explorable starting point.
- **[example-stream-api-kafka-setup-csharp](https://github.com/atlas-dev-hub/example-stream-api-kafka-setup-csharp)** is a .NET console producer that streams live waveform data into ATLAS, if C# is your home turf.

When you are ready to go deeper, the [Open Streaming Getting Started guide](../../developer-resources/secu4/getting-started.md) walks through the setup and the session protocol step by step.

## Where this is heading

Open Streaming is a new way of thinking about engineering telemetry. It is less a closed pipeline you plug into, and more a foundation you build on. We are continuing to invest in its resiliency and scaling, and we want to see what the wider community does with open, real-time data.

If you build something with it, we would love to hear about it in the [Developer Community](https://github.com/atlas-dev-hub/).
