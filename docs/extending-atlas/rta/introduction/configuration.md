# Configuration

ATLAS is data-driven: it uses _Configuration_ to describe the telemetry.

The core data types are:

* _Parameters_ &mdash; representing sampled data points, each with a time and value
* _Events_ &mdash; representing a moment in time, with associated text or values

Most time-series databases can do these, too &mdash; but ATLAS has some additional capabilities built from its heritage in Engineering, rather than infrastructure monitoring.

## Designed for Scale

ATLAS is designed for large sets of parameters, and many samples.

A typical session from a [McLaren TAG-320B ECU](https://www.mclaren.com/applied/catalogue/item/electronic-control-unit-tag-320B/) on a Formula One car contains 50,000 - 60,000 parameters. Of these, around 4,000 are sampled at up to 1 KHz, with the remainder being densely-packed snapshots of embedded memory captured every few seconds.

A race-length session contains about 2,000,000,000 samples.

## Apps and Parameter Trees

ATLAS is designed so that a stream of telemetry might contain data from multiple devices and models, assembled by different teams &mdash; so configuration is divided into _Apps_.

Each App can have 10,000+ parameters, so they are organised into a tree, which users can browse and search:

<img src="../assets/parameter-browser.png" alt="ATLAS Parameter Browser">

Parameters aren't just a name &mdash; they have descriptions, units, formatting and expected ranges.

## Calibration and Conversions

ATLAS can apply gain and offset calculations to correct parameter data.

This is useful when working with electronics and embedded systems.
The list of parameters and their valid ranges will be known when software is flashed onto a unit, but it may be necessary to zero some sensor readings after startup.

## Dense Data

ATLAS and RTA can handle data efficiently, by preserving the data width &mdash; from single-byte to double-precision.

There is also a facility to take a buffer &mdash; representing a section of memory from an embedded controller &mdash; and pick it apart into parameters. This is called _Row Data_ in the [API Specification](../api/index.md).

## Text

As in [Grafana](https://grafana.com/), parameters that represent enumerations can be mapped onto text.

Events can also carry text &mdash; or values that can then be formatted to text.

!!! note

    ATLAS is not a logging platform: it is designed primarily for numerical telemetry.

    Think [Prometheus](https://prometheus.io/), not [Fluentd](https://www.fluentd.org/).
