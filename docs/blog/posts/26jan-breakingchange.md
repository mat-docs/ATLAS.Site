---
date:
  created: 2026-01-23
categories:
  - Announcement
tags:
  - ATLAS Viewer
  - Virtual Parameter Service
  - Support Library
  - Stream Protocol
  - Stream API
  - Bridge Service
---

# ATLAS Release – WK04 2026: Compatibility Update for Streaming Architecture

We’re pleased to announce the **WK04** release, covering:

- **ATLAS Viewer** **v11.4.4.681** (WK04)
- **ATLAS Streaming Platform** component updates (Stream API, Stream Protocol, Bridge Service, VPS, Support Library)

This post provides a single place to find **all artefacts**, **release notes**, and **documentation** for the release.

<!-- more -->

A major update to the Stream API introduces a breaking change affecting all components that interact with the Streaming Architecture. The new Stream API includes updated Kafka topic naming, revised lifecycle behaviour, and enhanced session‑level tracking. **If you plan to adopt the updated Streaming Architecture, a full‑stack upgrade is required for compatibility.**

Existing configurations will continue to work *only if you remain on the previous Streaming Architecture*. Upgrading a single component alone will not be compatible with the new Stream API behaviour. ATLAS can also be upgraded independently as long as you are not using the Stream Recorder.

## Downloads

For detailed changes to each component and guidance on updating between versions, **please see the individual component release notes and the migration guides**.

| Component | Download Link | Github/Docker | Documentation | Release Notes |
|-----------|---------------|----------------|----------------|---------------|
| ATLAS Viewer | [Download installer](https://portal.mclarenapplied.com/portal/Downloads/ATLAS10/ATLAS%2011.4.4.691/MAT.ATLAS.ToolsInstaller.exe) | NA |[View Documentation](../../key-functionality/visualise/atlas/index.md) | [Release Notes](../posts/viewer/11.4.4.691-W04.md) |
| Bridge Service | [Download Binary](https://portal.mclarenapplied.com/portal/Downloads/ATLAS%20Streaming%20Platform%20-%20Bridge%20Service/Bridge%20Service%202.1.1.21/MA.DataPlatforms.Bridge.Host.zip) | [Container image](https://hub.docker.com/repository/docker/atlasplatformdocker/bridge-service-host/general) | [View Documentation](../../developer-resources/secu4/bridge_service/index.md) | [Release Notes](../posts/bridge-service/26jan-bridgeservice.md) |
| Virtual Parameter Service | [Download Binary](https://portal.mclarenapplied.com/portal/Downloads/ATLAS%20Streaming%20Platform%20-%20Virtual%20Parameter%20Service/VPS%202.1.1.7/MA.DataPlatforms.VirtualParameterService.Host.zip) | [Container image](https://hub.docker.com/repository/docker/atlasplatformdocker/virtual-parameter-service-host/general) |[View Documentation](../../key-functionality/process/secu4/vps.md) | [Release Notes](../posts/vps/26jan-vps.md) |
| Support Library | NA | - [Support Library NuGet](https://github.com/mat-docs/packages/pkgs/nuget/MA.DataPlatforms.Streaming.Support.Lib.Core)<br>- [Repository](https://github.com/Software-Products/MA.DataPlatforms.Streaming.Support.Library)| [View Documentation](../../developer-resources/secu4/support_library/index.md) | [Release Notes](../posts/support-library/26jan-supportlibrary.md) |
| Stream API | NA | - [Repository](https://github.com/Software-Products/MA.DataPlatforms.StreamApi)<br>- [Stream API NuGet](https://github.com/orgs/mat-docs/packages?q=&q=MA.Streaming.) | [View Documentation](../../developer-resources/secu4/stream_api/index.md) | [Release Notes](../posts/stream-api/26jan-streamapi.md) |
| Stream Protocol | NA | - [Repository](https://github.com/Software-Products/MA.DataPlatforms.Protocol)<br>- [Stream Protocol NuGet](https://github.com/mat-docs/packages/pkgs/nuget/MA.Streaming.Proto.Client.Local) | [View Documentation](../../developer-resources/secu4/docs) | [Release Notes](../posts/stream-protocol/26jan-streamprotocol.md) |

## Support

If you have any questions about this release or need assistance with 
migration, please contact the Support via [Zendesk](https://mclarenappliedtechnologies.zendesk.com/hc/en-us).
