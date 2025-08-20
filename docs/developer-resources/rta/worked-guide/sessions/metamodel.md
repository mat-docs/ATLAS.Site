
!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.
# Session Metamodel

The metamodel[^1] enables the service to describe what session properties are available and what values they can take.

!!! info

    The [Session Service](../../services/rta-sessionsvc/README.md) generates a metamodel from session properties.

    There is scope for still-deeper integration for implementations that manage complex simulation models or perform federated queries into other systems.

For example:

`#!bash curl -H "Accept: application/json" "http://localhost:2650/rta/v2/session-metamodel"` 

```json
{
    "details": {
        "label": "Details",
        "properties": {
            "Engineer": {
                "type": "string",
                "constraints": {
                    "values": [
                        "Joe",
                        "Robert"
                    ]
                },
                "capabilities": {
                    "filter": true,
                    "sort": true
                }
            }
            // ...
        }
    }
}
```

ATLAS uses this summary to drive the Session Browser filters, so that [queries](queries.md) can run server-side.

In addition to constraints, the metamodel can include formatting rules for display and indicate whether the server supports _filtering_ or _sorting_ for a property.

## Capabilities

The session model already defines some properties &mdash; such as `"state"`, `"timestamp"` and `"type"`.

For each of these properties, the server can declare its capabilities:

```json
{
    "state": {
        "filter": true,
        "sort": true
    },
    "timestamp": {
        "edit": true,
        "filter": true,
        "sort": true
    }
}
```

## Constraints

The metamodel can also describe the aggregate values a property has, or can take:

```json
{
    "type": {
        "capabilities": {
            "filter": true,
            "sort": true
        },
        "constraints": {
            "values": [
                "Stream",
                "Model"
            ],
            "minLength": 1,
            "maxLength": 32
        }
    }
}
```

In this example, the `type` property:

* is valid for sorting
* is valid for filtering, and the client can offer `#!json "Stream"` and `#!json "Model"` as pre-set values
* is valid for editing, but must take a value of `#!json 1`-`#!json 32` characters in length

!!! info

    ATLAS uses `"values"` but currently does not use the other constraints.

    Greater support will be added in future releases.

## Display 

Pre-defined properties have an established description and display convention.

However, the server can define arbitrary properties within `"details"` and `"extDetails"`, and describe them in the metamodel:

```json
{
    "details": {
        "size": {
            "label": "Size",
            "description": "Size of the vehicle",
            "type": "string",
            "capabilities": {
                "filter": true,
                "sort": true
            },
            "constraints": {
                "values": [
                    "small",
                    "medium",
                    "large"
                ],
                "onlyValues": true
            }
        },
        "weight": {
            "label": "Weight",
            "description": "Just how heavy is this thing?",
            "type": "number",
            "capabilities": {
                "filter": true,
                "sort": true
            },
            "display": {
                "unit": "kg",
                "format": "%.2f"
            },
            "constraints": {
                "minimumExclusive": 0.0
            }
        }
    }
}
```

!!! info

    ATLAS currently does not use the display rules, but may do so in future releases.

!!! warning

    The [Session Service](../../services/rta-sessionsvc/README.md) does not currently provide a way to describe display rules.

## Discovery

`details` and in particular `extDetails` can represent very large meta-models &mdash; such as a detailed hardware and software setup parameters.

The service may choose not to expose some properties to the client by default, but still make them available for discovery.  
Querying the metamodel produces results like this:

`#!bash curl -H "Accept: application/json" "http://localhost:2650/rta/v2/session-metamodel/properties?query=details."`

```json
[
    {
        "id": "details.appearance",
        "label": "Appearance"
    },
    {
        "id": "details.taste",
        "label": "Taste"
    },
    {
        "id": "details.size",
        "label": "Size",
        "description": "Size of the vehicle"
    },
    {
        "id": "details.weight",
        "label": "weight",
        "description": "Just how heavy is this thing?"
    }
]
```

[^1]: "model of the model"
