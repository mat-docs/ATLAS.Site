# Overview

This section is a detailed guide to the [Display API](https://mat-docs.github.io/Atlas.DisplayAPI.Documentation/index.html).

!!! tip

    Have you read the [Introduction](../index.md)?
    
    Start there to review the architecture and key concepts.

The Display API is used by third parties to create custom display visualizations.

Custom displays are written in _C#_ using _WPF_ with _MVVM_, see [Required Knowledge](../introduction/prerequisites.md#required-knowledge)

The Display API is published as a [NuGet](https://github.com/mat-docs/packages) package on GitHub.

## Tutorials

A number of tutorials are provided to help explain and demonstrate the [features](../introduction/features.md) of the Display API

- Creating a plugin for a custom display from scratch, see [Tutorial 1](tutorials/createfromscratch.md)
- Diagnostic display to explore Display API features, see [Tutorial 2](tutorials/diagnostic.md)
- Numeric display that supports compare mode, see [Tutorial 3](tutorials/numericcompare.md)
- Graphical display that demonstrates richer, more real world visualizations, see [Tutorial 4](tutorials/graphical.md)
- Quick to create display that visualizes parameter value changes, see [Tutorial 5](tutorials/gauge.md)

### Tutorials Setup

Before completing the tutorials, you'll need to set up a few things.

#### GitHub Account

These tutorials use packages and code hosted on [GitHub](https://github.com/mat-docs).

!!! note

    You'll need a free account to access them.

#### Development Environment

- [Visual Studio](../introduction/prerequisites.md#visual-studio) installed
- [Access to Display API NuGet package](../introduction/prerequisites.md#display-api-nuget-package)
- [ATLAS](../introduction/prerequisites.md#atlas) installed

#### Code Samples

Clone our [Atlas.DisplayAPI.Examples](https://github.com/mat-docs/Atlas.DisplayAPI.Examples) git repo for pre-built versions of the tutorials.

#### Toolbar Icon

Create or find an icon for the custom display.

!!! tip

    A 16x16 pixel PNG file (preferably in non dark colours)

## Detailed explanations of common topics

The following common topics are explained separately to avoid repetition and to allow for easier reference

- [Factories and Services](detailed/factoriesandservices.md)
- [Initialization, state and notifications](detailed/initialization.md)
- [Working with Display Properties](detailed/displayprops.md)
- [Working with Sessions](detailed/sessions.md)
- [Working with Timebase and Cursor](detailed/timebasecursor.md)
- [Working with Display Parameters](detailed/parameters.md)
- [Working with Data](detailed/data.md)
- [Recommendations for creating a well behaved Custom Display](detailed/goodcitizenship.md)
