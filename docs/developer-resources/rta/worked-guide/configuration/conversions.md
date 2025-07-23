# Conversions

Conversions are rules for transforming raw data into calibrated engineering data.

For some systems, these are the same thing; for other systems, some correction is needed.

The three key conversion types are:

* [Rational Conversions](#rational-conversions) &mdash; which apply a correction function
* [Table Conversions](#table-conversions) &mdash; which provide a lookup table
* [Text Conversions](#text-conversions) &mdash; which convert discrete enumerated values to text

They have some common properties:

`Name`:
:   Identifies the conversion so it can be referenced from a Parameter or Event Definition.  
    Should have the app name (e.g. `#!json "someConversion:myapp"`) as a suffix to ensure uniqueness.

`Format`:
:   C-style format string (e.g. `#!json "%5.2f"` or `#!json "Turbine activated: %s"`).

`Unit`:
:   Unit of measure (e.g. `#!json "deg"` or `#!json "°"`).

Parameters inherit the `Format` and `Unit` from their conversion rule, though they can override it.

## Rational Conversions  

Use Rational Conversions to apply simple corrections raw values, such as gain or offset.

Raw data are mapped onto engineering values using six coefficients in a standard formula:

`eng = (c1 * raw^2 + c2 * raw + c3) / (c4 * raw^2 + c5 * raw + c6)`

A 1:1 conversion therefore has coefficients `[0,1,0, 0,1,0]`.
This is the default conversion if none is specified.

This example applies a `+5.0` offset:

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

                    new ParameterBuilder("offsetExample:demo", "offsetExample", "Offset example")
                    {
                        ConversionName = "offsetExample:demo"
                    }
                },
                Conversions =
                {
                    new RationalConversionBuilder("offsetExample:demo")
                    {
                        C1 = 0, C2 = 1, C3 = +5.0, C4 = 0, C5 = 1, C6 = 0
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
                    "offsetExample:demo"
                ]
            },
            "parameters": [
                {
                    "id": "offsetExample:demo",
                    "name": "offsetExample",
                    "desc": "Offset example",
                    "conv": "offsetExample:demo"
                }
            ],
            "conversions": [
                {
                    "name": "offsetExample:demo",
                    "unit": "",
                    "format": "%5.3f",
                    "rational": {
                        "coeffs": [
                            0.0,
                            1.0,
                            5.0,
                            0.0,
                            1.0,
                            0.0
                        ]
                    }
                }
            ]
        }
    }
    ```

## Table Conversions

Use Table Conversions to map raw data onto engineering values using lookups. 
This is useful when there is no simple mathematical relationship between the raw values and the corresponding engineering values.

Linear interpolation can be indicated if the raw values are not discrete.

=== "C# Sample"

    ```c#
    var config = new ConfigurationBuilder
    {
        Applications =
        {
            new ApplicationBuilder("demo")
            {
                Conversions =
                {
                    new TableConversionBuilder("tableExample:demo")
                    {
                        Table = Tuple.Create(
                            new double[]{1, 2, 3},
                            new double[]{1, 20, 40}
                        ),
                        Interpolated = false
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
            "conversions": [
                {
                    "name": "tableExample:demo",
                    "table": {
                        "raw": [
                            1.0,
                            2.0,
                            3.0
                        ],
                        "calibrated": [
                            1.0,
                            20.0,
                            40.0
                        ],
                        "interpolated": false
                    }
                }
            ]
        }
    }
    ```

## Text Conversions

Use Text Conversions to map discrete numerical values to text &mdash; aka _"enumerations"_.

=== "C# Sample"

    ```c#
    var config = new ConfigurationBuilder
    {
        Applications =
        {
            new ApplicationBuilder("demo")
            {
                Conversions =
                {
                    new TextConversionBuilder("textExample:demo")
                    {
                        Table =
                        {
                            [1] = "one",
                            [2] = "two",
                            [3] = "three"
                        },
                        DefaultValue = "?",
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
            "conversions": [
                {
                    "name": "textExample:demo",
                    "format": "%s",
                    "text": {
                        "keys": [
                            1.0,
                            2.0,
                            3.0
                        ],
                        "values": [
                            "one",
                            "two",
                            "three"
                        ],
                        "default": "?"
                    }
                }
            ]
        }
    }
    ```


