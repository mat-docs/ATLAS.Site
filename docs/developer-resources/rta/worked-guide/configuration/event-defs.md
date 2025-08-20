
!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.
# Event Definitions

Instantaneous changes are captured using Events.

ATLAS has a dedicated display for events, and renders them in the waveform timeline alongside sampled data.

==picture?==

!!! info "How are events different from sampled data?"

    _Sampled data_ is generally a measure of a value varying continuously within a time interval, whereas an _event_ is generated at a precise moment.

    For example: an _event_ can capture a switch position change at the moment it happens, together with a value indicating the new position; _sampled data_ would typically check the switch position at intervals and record the current state as a value.

Events are parameterized &mdash; they can have associated values or text.

Like parameters for sampled data, events have an _Event Definition_ in configuration, which provides extra description and formatting rules for the data.

## Properties

`Id` _(integer)_:
:   Unique id. This should be unique amongst all apps &mdash; which can be awkward, but is really necessary for ATLAS to work correctly in all scenarios, including hardware logging where only the ID is present in the data stream.

`Id Code` _(text)_:
:   Alternate id for display and filtering. Not currently used by ATLAS &mdash; see note below.

`Description` _(text)_:
:   Human-readable description of the event.  
    By convention, this is a short title. The event itself can carry further text when raised.

    This should include the Id Code at the start &mdash see note below.

`Priority` _(enum)_:
:   Priority (severity), which can then be used for filtering.

    Can be one of: `Debug`, `Low`, `Medium`, `High`.

`Conversions`:
:   [Conversion](conversions.md) names &mdash; in order &mdash; to format the data associated with events when they are raised.

    Events can contain values or text. If there is no text, the values (if present) are formatted and concatenated to status text using the conversions &mdash; commonly using [Text Conversions](conversions.md#text-conversions).
    If text is present in the event, ATLAS will render that instead.

    The number and order of conversions must match the data. ATLAS is currently limited to handling up to three data values in each event.

!!! important

    `Id Code` is currently not used by ATLAS.
    
    To get the expected result, we recommend formatting the `Description` to include the `Id` and app name as a prefix:

    * `Id` as four-digit hex
    * `:` separator
    * App name
    * space
    * Description text

    For example: `#!json "01AF:app Some event"`


=== "C# Sample"

    ```c#
    var config = new ConfigurationBuilder
    {
        Applications =
        {
            new ApplicationBuilder("demo")
            {
                EventDefinitions =
                {
                    new EventDefinitionBuilder(1, "Turbine State Changed")
                    {
                        Priority = EventPriority.High,
                        ConversionNames =
                        {
                            "turbineBool:demo"
                        }
                    }
                },
                Conversions =
                {
                    new TextConversionBuilder("turbineBool:demo")
                    {
                        Table =
                        {
                            [0] = "false",
                            [1] = "true"
                        },
                        DefaultValue = "?",
                        Format = "Deployed: %s"
                    }
                }
            }
        }
    }.BuildConfiguration();
    ```

=== "JSON"

    ```json
    {
        "demo": {
            "events": [
                {
                    "id": 1,
                    "code": "0001:demo",
                    "desc": "Turbine State Changed",
                    "pri": "high",
                    "convs": [
                        "turbineBool:demo"
                    ]
                }
            ],
            "conversions": [
                {
                    "name": "turbineBool:demo",
                    "unit": "",
                    "format": "Deployed: %s",
                    "text": {
                        "keys": [
                            0.0,
                            1.0
                        ],
                        "values": [
                            "false",
                            "true"
                        ],
                        "default": "?"
                    }
                }
            ]
        }
    }
    ```
