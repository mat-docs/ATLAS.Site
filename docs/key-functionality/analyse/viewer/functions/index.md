# Functions

Functions in ATLAS are user-defined calculations that operate on Session data. They allow users to extend the capabilities of ATLAS by performing custom computations, automating data processing, and enhancing data visualization.

**Key Features:**

- **Custom Calculations:** Functions enable users to create tailored calculations beyond built-in parameters.

- **Flexible Data Analysis:** By using functions, users can manipulate and analyze data according to specific requirements.

- **Integration:** Functions can be used in Displays, similar to Parameters, and support Parameter Properties for dynamic data representation.

- **C# and MATLAB Functions** As well as functions written in FDL, it's possible to use existing C# and MAT functions without translation.

## How do functions work? 
- Functions are written in the Function Definition Language (FDL) using the Function Editor.
- They are stored in SQLRace for persistence and reuse.
- Functions can incorporate expressions, statements, processors (pre-defined functions), DLLs (external code), constants, and comments for documentation.

## Why use functions?

- To automate repetitive calculations.

- To implement complex logic and data transformations.

- To integrate external code via DLLs for advanced functionality.

- To improve clarity and maintainability of data processing workflows.