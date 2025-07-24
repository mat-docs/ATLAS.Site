# Folders

RTA can represent sessions in a virtual folder structure.

These could represent a file system, or could be used creatively to describe:

* Recently acquired data
* Schedule (e.g. sporting events or public transport)
* Sources of data
* Anomalies detected by algorithms
* Saved queries and data sets

!!! info

    ATLAS doesn't yet exploit this feature, but will do so in a future release.

    The specification is stable and ready to be used by web interfaces and surrounding systems.

## Concepts

### What is a Folder?

Folder do not have to represent file system paths. A folder could be a virtual filter for 'recent' data, or for saved queries, or provide alternate ways to organise the data (by source, by location, etc.)

Each folder has an unique identity, which could be a path, or a GUID. ATLAS does not assume any particular naming convention.

### Filtering by Folder Sub-tree

Some of the REST API calls &mdash; such as listing sessions and requesting the metamodel &mdash; accept a `folder` argument.

This provides the root for a recursive search:

* When a `folder` is specified, all session in that folder and sub-folders are in scope;
* If no `folder` is specified, the entire tree is in scope.

## Session Service walk-through

See also: [gRPC API](../../services/rta-sessionsvc/grpc.md)

### Creating a Folder Tree

The root folder always has an empty identity string, and cannot be modified.

The service will accept any folder identity token format. The following example uses a path with `::` separators, but a GUID or some other path format will work as well.

In this example, we create a folder structure like this:

    <root>
    |
    +-- animals "Animals"
    |    |
    |    +-- animals::felines "Felines"
    |
    +-- plants "Plants"

=== "C# Sample"

    Creating the folder structure:

    ```c#
    using var sessionChannel = GrpcChannel.ForAddress("http://localhost:2652");
    var sessionClient = new SessionStore.SessionStoreClient(sessionChannel);

    await sessionClient.PutSessionFolderAsync(new PutSessionFolderRequest
    {
        Identity = "animals",
        Label = "Animals",
        Description = "All creatures great and small"
    });

    await sessionClient.PutSessionFolderAsync(new PutSessionFolderRequest
    {
        Identity = "plants",
        Label = "Plants",
        Description = "Sometimes called 'vegetables'"
    });

    await sessionClient.PutSessionFolderAsync(new PutSessionFolderRequest
    {
        ParentIdentity = "animals",
        Identity = "animals::felines",
        Label = "Felines",
        Description = "Big cats and small cats"
    });
    ```

    !!! tip

        This is an idempotent service call, so it can also be used to:
        
        * rename a folder, by re-defining it with a different label;
        * move a folder, by re-defining its parent identity.

=== "JSON from REST API"

    Reading the children under the root folder:

    `#!bash curl -H "Accept: application/json" "http://localhost:2650/rta/v2/session-folders/"`

    ```json
    [
        {
            "identity": "animals",
            "label": "Animals",
            "description": "All creatures great and small",
            "hasChildren": true
        },
        {
            "identity": "plants",
            "label": "Plants",
            "description": "Sometimes called 'vegetables'",
            "hasChildren": false
        },
    ]
    ```

    Reading the children under `#!json "animals"`:

    `#!bash curl -H "Accept: application/json" "http://localhost:2650/rta/v2/session-folders/animals"`

    ```json
    [
        {
            "identity": "animals::felines",
            "label": "Felines",
            "description": "Big cats and small cats",
            "hasChildren": false
        }
    ]
    ```

### Sessions and Folders

By default, sessions are created in the root folder.

Creating a session in the `animals` folder, and then adding it to the `plants` folder:

=== "C# Sample - Creating in a folder"

    Creating in `animals`:

    ```c#
    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "example",
        CreateIfNotExists = new()
        {
            Identifier = "Example",
            Timestamp = DateTimeOffset.Now.ToString("O")
        },
        Updates =
        {
            new SessionUpdate
            {
                SetFolders = new()
                {
                    Identities =
                    {
                        "animals"
                    }
                }
            }
        }
    });
    ```

    Now this session will appear listings for the root folder or `animals` folder, but not `plants`:

    `#!bash curl -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions?folder=animals"`
    
    ```json
    {
        "sessions": [
            {
                "identity": "example",
                "state": "unknown",
                "timestamp": "2021-05-19T13:10:04+00:00",
                "identifier": "Example"
            }
        ]
    }
    ```

    `#!bash curl -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions?folder=plants"`

    ```json
    {
        "sessions": []
    }
    ```

=== "C# Sample - Adding to another folder"

    Adding to `plants` with a `PutFolders` operation:

    ```c#
    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "example",
        Updates =
        {
            new SessionUpdate
            {
                UpdateFolders = new()
                {
                    Identities =
                    {
                        "plants"
                    }
                }
            }
        }
    });
    ```

    After this call, the session is present in both `animals` and `plants`:

    `#!bash curl -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions?folder=animals"`
    
    ```json
    {
        "sessions": [
            {
                "identity": "example",
                "state": "unknown",
                "timestamp": "2021-05-19T13:10:04+00:00",
                "identifier": "Example"
            }
        ]
    }
    ```

    `#!bash curl -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions?folder=plants"`

    ```json
    {
        "sessions": [
            {
                "identity": "example",
                "state": "unknown",
                "timestamp": "2021-05-19T13:10:04+00:00",
                "identifier": "Example"
            }
        ]
    }
    ```

=== "C# Sample - Removing from a folder"

    Removing from `plants` with a `DeleteFolders` operation:

    ```c#
    await sessionClient.CreateOrUpdateSessionAsync(new CreateOrUpdateSessionRequest
    {
        Identity = "example",
        Updates =
        {
            new SessionUpdate
            {
                DeleteFolders = new()
                {
                    Identities =
                    {
                        "plants"
                    }
                }
            }
        }
    });
    ```

    After this call, the session is only present in `animals` again.

    !!! info

        A session must be in a folder at all times.

        If a session is removed from all folders, the session is re-parented into the root folder.

Folder membership is essentially a symbolic link: a session can appear in multiple folders without being physically copied.

### Deleting folders

This symbolic link approach extends to folder deletion: Deleting folders does not delete sessions.  
If a session would be left without a parent folder, it is re-parented in the root folder &mdash; which cannot be deleted.

=== "C# Sample"

    Deleting the `animals` subtree and `plants` folder:

    ```c#
    await sessionClient.DeleteSessionFoldersAsync(new DeleteSessionFoldersRequest
    {
        Identities =
        {
            "animals",
            "plants"
        }
    });
    ```
