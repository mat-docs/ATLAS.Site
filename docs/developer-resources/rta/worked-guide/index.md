
!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.
# Overview

This section is a detailed guide to the [RTA API](../api/index.md), [Toolkit Services](../services/index.md) and their [gRPC](https://grpc.io/) APIs.

!!! tip

    Have you read the [Introduction](../../index.md)?
    
    Start there to review the archictecture and key concepts.

The [RTA API](../api/index.md) is the external-facing API consumed by ATLAS.
This is designed to be an interface on the edge of your data environment &mdash; so you can exploit ATLAS capabilities without copying your data or making big changes to your data pipeline.

The [Toolkit Services](../services/index.md) provide implementations of the API, in either a [single-process](../../../extending-atlas/rta/introduction/architectures.md#rta-server) or [microservices](../../../extending-atlas/rta/introduction/architectures.md#microservices) architecture.
They expose [GPRC](https://grpc.io/) APIs to read, write and manage their data stores &mdash; but these are specific to these services and not part of the [RTA API Specification](../api/index.md).

This means the [services](../services/index.md) in the implementation toolkit are entirely optional, and a seamless integration should be achievable in any convenient framework by implementing only the necessary parts of the [RTA API](../api/index.md).

[Quick-Start](tutorials/quick-start/index.md){ .md-button .md-button--primary }