# Overview

This section is a detailed guide to the [Display API](https://mat-docs.github.io/Atlas.DisplayAPI.Documentation/index.html).

!!! tip

    Have you read the [Introduction](index.md)?
    
    Start there to review the architecture and key concepts.

The Display API is used by third parties to create custom display visualizations.

Custom displays are written in _C#_ using _WPF_ with _MVVM_, see [Required Knowledge](prerequisites.md#required-knowledge)

The Display API is published as a [NuGet](https://github.com/mat-docs/packages) package on GitHub.

## Tutorials

A number of tutorials are provided to help explain and demonstrate the [features](index.md#display-api-features) of the Display API

- Creating a plugin for a custom display from scratch, see [Tutorial 1](devguide/createfromscratch.md)
- Diagnostic display to explore Display API features, see [Tutorial 2](devguide/diagnostic.md)
- Numeric display that supports compare mode, see [Tutorial 3](devguide/numericcompare.md)
- Graphical display that demonstrates richer, more real world visualizations, see [Tutorial 4](devguide/graphical.md)
- Quick to create display that visualizes parameter value changes, see [Tutorial 5](devguide/gauge.md)

### Tutorials Setup

Before completing the tutorials, you'll need to set up a few things.

#### GitHub Account

These tutorials use packages and code hosted on [GitHub](https://github.com/mat-docs).

!!! note

    You'll need a free account to access them.

#### Development Environment

- Visual Studioinstalled
- Access to Display API NuGet package
- ATLAS installed

#### Code Samples

Clone our [Atlas.DisplayAPI.Examples](https://github.com/mat-docs/Atlas.DisplayAPI.Examples) git repo for pre-built versions of the tutorials.

#### Toolbar Icon

Create or find an icon for the custom display.

!!! tip

    A 16x16 pixel PNG file (preferably in non dark colours)

## Detailed explanations of common topics

The following common topics are explained separately to avoid repetition and to allow for easier reference

- [Factories and Services](factoriesandservices.md)
- [Initialization, state and notifications](initialization.md)
- [Working with Display Properties](displayprops.md)
- [Working with Sessions](sessions.md)
- [Working with Timebase and Cursor](timebasecursor.md)
- [Working with Display Parameters](parameters.md)
- [Working with Data](data.md)
- [Recommendations for creating a well behaved Custom Display](goodcitizenship.md)
