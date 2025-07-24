# Parameter Groups &mdash; Making a Parameter Tree

Parameters can be arranged in a tree.

Apps are the top-level parameter groups. By convention, these typically represent independent sub-systems or simulation models. Parameter groups have child parameters, but can also contain child parameter groups, forming a tree.

=== "C# Sample"

    Like parameters, group identifiers have the same app name suffix to ensure uniqueness.

    ```c#
        var config = new ConfigurationBuilder
        {
            Applications =
            {
                new ApplicationBuilder("hydro")
                {
                    Description = "Hydraulics",
                    ChildParameterGroups =
                    {
                        new ParameterGroupBuilder("rat:hydro", "RAM Air Turbine")
                        {
                            ChildParameters =
                            {
                                new ParameterBuilder("ratDeployed:hydro", "ratDeployed", "RAT deployed")
                            }
                        },
                        new ParameterGroupBuilder("ptu:hydro", "Power Transfer Unit")
                        {
                            // ..
                        }
                    }
                }
            }
        }.BuildConfiguration();
    ```

    !!! tip

        In the C# API, the `Application` and `ParameterGroup` classes &mdash; after building configuration &mdash; both implement `IParameterTreeGroup`.  
        This interface provides description and tree-traversal abstractions.

=== "JSON"

    Parameters are serialized as a flat list, and referenced from the `"tree"` by identifier.

    ```json
    {
        "hydro": {
            "desc": "Hydraulics",
            "tree": {
                "groups": [
                    {
                        "id": "rat:hydro",
                        "desc": "RAM Air Turbine",
                        "params": [
                            "ratDeployed:hydro"
                        ]
                    },
                    {
                        "id": "ptu:hydro",
                        "desc": "Power Transfer Unit"
                    }
                ]
            },
            "parameters": [
                {
                    "id": "ratDeployed:hydro",
                    "name": "ratDeployed",
                    "desc": "RAT deployed"
                }
            ]
        }
    }
    ```

!!! info
    Parameters can be added into more than one parameter group, so that they appear in the tree in multiple places.
    
    This can be useful where a parameter could fit into more than one logical category.
