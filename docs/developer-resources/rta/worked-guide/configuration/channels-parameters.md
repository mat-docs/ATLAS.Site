# Channels and Parameters

_Parameters_ are the abstraction for accessing sampled data.

Each parameter can actually be an aggregate of multiple channels &mdash; for example, sampled periodically at multiple rates.

!!! example

    McLaren hardware loggers can capture data at multiple rates, using triggers to define conditions for high-rate collection.

    For example, when logging twisting forces within a gearbox, high-rate sampling is only required when changing gear, and can be triggered for a period by the gear-change event.
    
    This makes optimal use of bandwidth and storage in the logging hardware and telemetry uplink.

Each channel can also be presented with multiple parameters.

## Channels

Channel properties are:

`Id` _(unsigned 32-bit integer)_:
:   Unique id within a configuration, numbered contiguously from `#!json 0` or `#!json 1`.

    Each parameter should reference one or more channels by id.

`Interval` _(signed 64-bit integer)_:
:   Interval in nanoseconds between samples, or `#!json 0` if the channel is not periodically sampled.

`Data Type` _(enum)_:
:   Data type/precision.

    Signed/Unsigned integers for 8-bit, 16-bit, and 32-bit; Floating point at 32-bit and 64-bit precision.

`Data Source` _(enum)_:
:   Data source, which for RTA should be one of `Timestamped`, `Periodic` or `RowData`.

    * [Timestamped Data](../data/index.md#timestamped-data) is variable-rate and has a delta-encoded timestamp for each sample;
    * [Periodic Data](../data/index.md#periodic-data) is sampled at a fixed rate &mdash; though sampling may not be continuous;
    * [Row Data](../data/index.md/#row-data) encodes sections of memory &mdash; usually from an embedded controller;

Channels can also be assigned a `Name` &mdash; sometimes used to indicate a memory address.

!!! note

    The Configuration API and JSON schema permit some additional values for the `Data Type` and `Data Source`.  
    These have specialized uses and are not supported with RTA at this time.

## Parameters

`Identifier`:
:   Globally-unique identifier, which should be qualified with the app name:

    `someParameter:myapp`

    The prefix (name-part) should follow the same rules as variables in C-like languages:
    * Use a-z, A-Z, 0-9 and underscore
    * Don't start with a number

    This ensures that the parameter can be used in functions in all situations without problems.

`Name`:
:   Human-readable name. Usually the same as the `Identifier`, minus the app name qualifier.

    ATLAS will show this name in the Parameter Browser.

    As with `Identifier`, we recommend using only C-like variable names to ensure compatibility with functions.

`Description`:
:   Human-readable description.

    ATLAS will show this description in the Parameter Browser.

### Channel Ids

Each parameter should reference one (or more) channels, by Id.  
The channels must belong to the same app.

=== "C# Sample"

    ```c#
    var config = new ConfigurationBuilder
    {
        Applications =
        {
            new ApplicationBuilder("demo")
            {
                ChildParameters =
                {
                    new ParameterBuilder("param:demo", "param", "Example Parameter")
                    {
                        ChannelIds =
                        {
                            1u
                        }
                    }
                },
                Channels =
                {
                    new ChannelBuilder(1u, 0, DataType.Double64Bit, ChannelDataSource.Timestamped)
                }
            }
        }
    }.BuildConfiguration();
    ```

=== "JSON"

    ```json
    {
        "demo": {
            "tree": {
                "params": [
                    "param:demo"
                ]
            },
            "parameters": [
                {
                    "id": "param:demo",
                    "name": "param",
                    "desc": "Example Parameter",
                    "conv": "1to1:demo",
                    "channels": [
                        1
                    ]
                }
            ],
            "channels": [
                {
                    "id": 1,
                    "source": "timestamped"
                }
            ],
            "conversions": [
                {
                    "name": "1to1:demo",
                    "unit": "",
                    "format": "%5.3f"
                }
            ]
        }
    }
    ```

### Conversion

Every parameter must reference a [Conversion](conversions.md), and the Configuration API will check that it is in the same app. But, for convenience, the Configuration API will automatically add a 1:1 [Rational Conversion](conversions.md#rational-conversions) if no conversion is specified, as shown in this example:

=== "C# Sample"

    ```c#
    var config = new ConfigurationBuilder
    {
        Applications =
        {
            new ApplicationBuilder("demo")
            {
                ChildParameters =
                {
                    new ParameterBuilder("param1:demo", "param1", "Example Parameter 1"),
                    new ParameterBuilder("param2:demo", "param2", "Example Parameter 2")
                    {
                        ConversionName = "exampleConv:demo"
                    }
                },
                Conversions =
                {
                    new TextConversionBuilder("exampleConv:demo")
                    {
                        Table =
                        {
                            [0] = "false",
                            [1] = "true"
                        },
                        DefaultValue = "file not found",
                        Format = "%s"
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
            "tree": {
                "params": [
                    "param1:demo",
                    "param2:demo"
                ]
            },
            "parameters": [
                {
                    "id": "param1:demo",
                    "name": "param1",
                    "desc": "Example Parameter 1",
                    "conv": "1to1:demo"
                },
                {
                    "id": "param2:demo",
                    "name": "param2",
                    "desc": "Example Parameter 2",
                    "conv": "exampleConv:demo"
                }
            ],
            "conversions": [
                {
                    "name": "exampleConv:demo",
                    "unit": "",
                    "format": "%s",
                    "text": {
                        "keys": [
                            0.0,
                            1.0
                        ],
                        "values": [
                            "false",
                            "true"
                        ],
                        "default": "file not found"
                    }
                },
                {
                    "name": "1to1:demo",
                    "unit": "",
                    "format": "%5.3f"
                }
            ]
        }
    }
    ```

### Range (Min/Max)

It is quite important to specify the valid data range, as this will enable ATLAS to auto-scale displays.

There are two ranges:

* `Minimum Value` and `Maximum Value` represent the minimum and maximum expected physical range (defaulting to `#!json 0.0`);  
  (`"min"`/`"max"` in JSON) 
* `Warning Minimum Value` and `Warning Maximum Value` represent the minimum and maximum outside which a warning should be triggered &mdash; defaulting to the physical range if not specified;  
  (`"warnMin"`/`"warnMax"` in JSON) 

=== "C# Sample"

    ```c#
    var config = new ConfigurationBuilder
    {
        Applications =
        {
            new ApplicationBuilder("demo")
            {
                ChildParameters =
                {
                    new ParameterBuilder("param:demo", "param", "Example Parameter")
                    {
                        MinimumValue = -1500.0,
                        MaximumValue = +1500.0,
                        WarningMinimumValue = -1000.0,
                        WarningMaximumValue = +1000.0
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
            "tree": {
                "params": [
                    "param:demo"
                ]
            },
            "parameters": [
                {
                    "id": "param:demo",
                    "name": "param",
                    "desc": "Example Parameter",
                    "min": -1500.0,
                    "max": 1500.0,
                    "warnMin": -1000.0,
                    "warnMax": 1000.0,
                    "conv": "1to1:demo"
                }
            ],
            "conversions": [
                {
                    "name": "1to1:demo",
                    "unit": "",
                    "format": "%5.3f"
                }
            ]
        }
    }
    ```

### Format
Parameter values are formatted using simple C-style format strings &mdash; for example, `"%5.3f"`

??? info "Supported Format Types"

    | type | description                                     |
    |------|-------------------------------------------------|
    | `i`  | signed decimal integer                          |
    | `d`  | signed decimal integer                          |
    | `u`  | unsigned decimal integer                        |
    | `f`  | signed decimal floating point                   |
    | `g`  | shortest representation (%e or %f)              |
    | `G`  | shortest representation (%E or %F)              |
    | `e`  | scientific notation &mdash; lower-case          |
    | `E`  | scientific notation &mdash; upper-case          |
    | `o`  | unsigned octal integer                          |
    | `x`  | unsigned hexadecimal integer &mdash; lower-case |
    | `X`  | unsigned hexadecimal integer &mdash; upper-case |
    | `c`  | character                                       |
    | `s`  | string                                          |

=== "C# Sample"

    ```c#
    var config = new ConfigurationBuilder
    {
        Applications =
        {
            new ApplicationBuilder("demo")
            {
                ChildParameters =
                {
                    new ParameterBuilder("p1:demo", "p1", "Parameter 1")
                    {
                        ConversionName = "myconv:demo"
                    },
                    new ParameterBuilder("p2:demo", "p2", "Parameter 2")
                    {
                        ConversionName = "myconv:demo",
                        FormatOverride = "%2.1f"
                    }
                },
                Conversions =
                {
                    new RationalConversionBuilder("myconv:demo")
                    {
                        Format = "%8.2f"
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
            "tree": {
                "params": [
                    "p1:demo"
                ]
            },
            "parameters": [
                {
                    "id": "p1:demo",
                    "name": "p1",
                    "desc": "Parameter 1",
                    "conv": "myconv:demo"
                },
                {
                    "id": "p2:demo",
                    "name": "p2",
                    "desc": "Parameter 2",
                    "format": "%2.1f",
                    "conv": "myconv:demo"
                }
            ],
            "conversions": [
                {
                    "name": "myconv:demo",
                    "unit": "",
                    "format": "%8.2f"
                }
            ]
        }
    }
    ```

### Unit

Like the format, parameter units (of measure) are defined in the [Conversion](conversions.md) rule, but can also be overridden in the parameter definition.

In this example, parameters 1 and 2 units are `"rad"` and `"deg"`, respectively:

=== "C# Sample"

    ```c#
    var config = new ConfigurationBuilder
    {
        Applications =
        {
            new ApplicationBuilder("demo")
            {
                ChildParameters =
                {
                    new ParameterBuilder("p1:demo", "p1", "Parameter 1")
                    {
                        ConversionName = "myconv:demo"
                    },
                    new ParameterBuilder("p2:demo", "p2", "Parameter 2")
                    {
                        ConversionName = "myconv:demo",
                        UnitOverride = "deg"
                    }
                },
                Conversions =
                {
                    new RationalConversionBuilder("myconv:demo")
                    {
                        Unit = "rad"
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
            "tree": {
                "params": [
                    "p1:demo",
                    "p2:demo"
                ]
            },
            "parameters": [
                {
                    "id": "p1:demo",
                    "name": "p1",
                    "desc": "Parameter 1",
                    "conv": "myconv:demo"
                },
                {
                    "id": "p2:demo",
                    "name": "p2",
                    "desc": "Parameter 2",
                    "unit": "deg",
                    "conv": "myconv:demo"
                }
            ],
            "conversions": [
                {
                    "name": "myconv:demo",
                    "unit": "rad"
                }
            ]
        }
    }
    ```

### Offset

An `Offset` can be applied to the parameter value &mdash; for example, to set a zero point.

The offset is applied _after_ conversions.

=== "C# Sample"

    ```c#
    var config = new ConfigurationBuilder
    {
        Applications =
        {
            new ApplicationBuilder("demo")
            {
                ChildParameters =
                {
                    new ParameterBuilder("param:demo", "param", "Example Parameter")
                    {
                        OffsetValue = +18.6
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
            "tree": {
                "params": [
                    "param:demo"
                ]
            },
            "parameters": [
                {
                    "id": "param:demo",
                    "name": "param",
                    "desc": "Example Parameter",
                    "offset": 18.6,
                    "conv": "1to1:demo"
                }
            ],
            "conversions": [
                {
                    "name": "1to1:demo",
                    "unit": "",
                    "format": "%5.3f"
                }
            ]
        }
    }
    ```

### Shifting and Masking

A `Bit Shift` and `Data Bit Mask` can be applied to select specific bits from a channel.

* +ve shift is a right-shift
* -ve shift is a left-shift
* the mask is applied after shift, but before conversions

This can be used to extract many boolean values or flags from a packed section of telemetry.

!!! info 

    Shifting and Masking can only be applied to integer channels.

???+ example "Worked Example"

    Bit Shift: `4`  
    Data Bit Mask: `0x1`  
    Channel value (u16): `7638`

    ```
    value bits:    0001 1101 1101 0110    (0x1DD6)
    shifted value: 0000 0001 1101 1101
    mask:          0000 0000 0000 0001    (0x0001)
    result value:  0000 0000 0000 0001    (0x0001)
    ```

=== "C# Sample"

    ```c#
    var config = new ConfigurationBuilder
    {
        Applications =
        {
            new ApplicationBuilder("demo")
            {
                ChildParameters =
                {
                    new ParameterBuilder("param:demo", "param", "Example Parameter")
                    {
                        ChannelIds = {1u},
                        BitShift = 4,
                        DataBitMask = 0x1
                    }
                },
                Channels =
                {
                    new ChannelBuilder(1u, 0L, DataType.Unsigned16Bit, ChannelDataSource.RowData)
                }
            }
        }
    }.BuildConfiguration();
    ```

=== "JSON"

    ```json
    {
        "demo": {
            "tree": {
                "params": [
                    "param:demo"
                ]
            },
            "parameters": [
                {
                    "id": "param:demo",
                    "name": "param",
                    "desc": "Example Parameter",
                    "mask": "1",
                    "shift": 4,
                    "conv": "1to1:demo",
                    "channels": [
                        1
                    ]
                }
            ],
            "channels": [
                {
                    "id": 1,
                    "type": "u16"
                }
            ],
            "conversions": [
                {
                    "name": "1to1:demo",
                    "unit": "",
                    "format": "%5.3f"
                }
            ]
        }
    }
    ```

    !!! note

        The `"mask"` is serialized in hexadecimal.
