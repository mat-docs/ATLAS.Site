# Relationships

## Children

Child sessions[^1] are additional data sets that can be loaded together with a parent session.  

A common use-case is where telemetry is processed through a simulation &mdash; for example, a vehicle dynamics model &mdash; to produce simulated data. The resulting session is a logical child and extension of the parent, so it makes sense to load both at the same time.

    parent
    |
    +-- child

If multiple models are used, then there should be multiple child sessions to load.  
The `"group"` property discriminates between the models:

    parent
    |
    +-- dynamics
    |   |
    |   +-- child
    |
    +-- thermal
        |
        +-- child

But the models may be updated or reconfigured, so it is common to produce more than one `"version"` of child sessions:

    parent
    |
    +-- dynamics
    |   |
    |   +-- child v1.1 *
    |   +-- child v1.0
    |
    +-- thermal
        |
        +-- child v2.0 *
        +-- child v1.1
        +-- child v1.0

In this case, ATLAS will load the most recent version in each group by default (`*`).  
The user can choose to load different versions or skip some of the child sessions entirely.

The tree can be arbitrary depth &mdash; e.g. bringing together independent sessions from multiple sub-systems, and their models:

    parent
    |
    +-- Sub-system A
    |   |
    |   +-- dynamics
    |   |   |
    |   |   +-- child v1.1 *
    |   |
    |   +-- thermal
    |       |
    |       +-- child v2.0 *
    |
    +-- Sub-system B
        |
        +-- dynamics
        |   |
        |   +-- child v1.1 *
        |
        +-- thermal
            |
            +-- child v2.0 *

!!! tip "Tip: Combine sessions using Data Bindings"

    To simplify a complex scenario like this, consider presenting the sub-systems as a single unified session.

    You can do this in the [Session Service](../../services/rta-sessionsvc/README.md) with [Data Bindings](data-bindings.md).

## Alternates

You can also define alternate versions of sessions, which could vary in:

* quality &mdash; e.g. RF telemetry vs. download
* version &mdash; e.g. original vs. post-processed
* duration or time-range
* parameters
* metadata
* etc.

For example:

    parent
    |
    +-- alternate parent

This has no special semantics &mdash; it is simply another session offered to the user as an alternate to the parent.

Alternates can be used in combination with child sessions:

    parent
    |
    +-- alternate parent
    |   |
    |   +-- child <of alternate parent>
    |
    +-- child <of parent>

ATLAS uses the `"group"` property &mdash; if specified &mdash; to organize these sessions, but does not load them automatically.

## Creating Relationships using the Session Service

Dynamically creating relationships between parents and children can be painful if the sessions are recorded independently.

The two common issues are:

* Ordering &mdash; a child session may arrive before or after the parent;
* Keys &mdash; it can be unclear how to associate sessions;

The [Session Service](../../services/rta-sessionsvc/README.md) handles this by exposing "anchors" &mdash; which are essentially natural keys expressed as a URI &mdash; and references to those anchors to create the relationships. This means that a session is not dependent on creating relationships using a key generated at the time of recording, and the sessions can arrive in any order.

For example:

    Telemetry Session
      +- ref_anchor       = guid:8319B646-D262-47BF-8BD9-85AECC314C50
      +- ref_anchor       = acq:turbo-encabulator-5/2021-05-20T08:44:21+0000

    Downsampled Session
      +- alternate_of_ref = guid:8319B646-D262-47BF-8BD9-85AECC314C50

    Model Session
      +- child_of_ref     = acq:turbo-encabulator-5/2021-05-20T08:44:21+0000

This results in:

    Telemetry Session
    |
    +-- <alternates>
    |    |
    |    +-- Downsampled Session
    |
    +-- <children>
         |
         +-- Model Session

To create these relationships using the [gRPC API](../../services/rta-sessionsvc/grpc.md):

=== "C# Sample"

    Creating each of the three sessions (in any order):

    ```c#
    using var sessionChannel = GrpcChannel.ForAddress("http://localhost:2652");
    var sessionClient = new SessionStore.SessionStoreClient(sessionChannel);

    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "telemetry_session",
        CreateIfNotExists = new()
        {
            Identifier = "Telemetry Session",
            Timestamp = DateTimeOffset.Now.ToString("O")
        },
        Updates =
        {
            new SessionUpdate
            {
                SetRefAnchors = new()
                {
                    RefUris =
                    {
                        "guid:8319B646-D262-47BF-8BD9-85AECC314C50",
                        "acq:turbo-encabulator-5/2021-05-20T08:44:21+0000"
                    }
                }
            }
        }
    });

    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "downsampled_session",
        CreateIfNotExists = new()
        {
            Identifier = "Downsampled Session",
            Timestamp = DateTimeOffset.Now.ToString("O")
        },
        Updates =
        {
            new SessionUpdate
            {
                SetAlternateOfRefs = new()
                {
                    RefUris =
                    {
                        "guid:8319B646-D262-47BF-8BD9-85AECC314C50"
                    }
                }
            }
        }
    });

    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "model_session",
        CreateIfNotExists = new()
        {
            Identifier = "Model Session",
            Timestamp = DateTimeOffset.Now.ToString("O")
        },
        Updates =
        {
            new SessionUpdate
            {
                SetChildOfRefs = new()
                {
                    RefUris =
                    {
                        "acq:turbo-encabulator-5/2021-05-20T08:44:21+0000"
                    }
                }
            }
        }
    });
    ```

    Additional anchors and references can be added or removed at any time.

=== "JSON API Response"

    Listing sessions from the REST API:

    `#!bash curl -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions"`

    ```json
    {
        "sessions": [
            {
                "identity": "telemetry_session",
                "state": "unknown",
                "timestamp": "2021-05-20T10:48:10.072433+01:00",
                "identifier": "Telemetry Session",
                "alternates": [
                    "downsampled_session"
                ],
                "children": [
                    "model_session"
                ]
            }
        ]
    }
    ```

    !!! note

        Notice that the list only returns the top-level session, with references to alternates and children.

        This is the correct behaviour and the only option for the REST API.  
        The Session Service gRPC API does offer an `include_sub_sessions` option to list all sessions.

    The client lazily resolves the relationships by requesting the child or alternate identities:

    `#!bash curl -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions/downsampled_session"`

    ```json
    {
        "identity": "downsampled_session",
        "state": "unknown",
        "timestamp": "2021-05-20T10:48:10.562559+01:00",
        "identifier": "Downsampled Session",
        "alternates": [],
        "children": []
    }
    ```

[^1]: Sometimes called "associated sessions"
