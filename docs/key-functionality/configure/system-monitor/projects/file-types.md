# Project File Structure

System Monitor stores project files in a structured directory layout under the Multi-Application Base.

## Directory Layout

```
\MultiAppName\
├── CustBaseName\
│   └── version\
│       ├── version.pgv
│       └── version000.dtv
├── Desktops\
│   └── ProjectName.dtp
├── LogCfgs\
├── Sessions\
├── Virtuals\
├── Work\
├── SenSets\
├── HistReps\
└── ProjectName.prj
```

### Description

- **MultiAppName**: Top-level directory for the Multi-Application Base
- **CustBaseName**: Sub-directory for each Application
- **version**: Contains Program and Data Version files
- **Desktops**: Stores Desktop files
- **LogCfgs**: Default location for logging configurations
- **Sessions**: Stores session logs from Live Logging
- **Virtuals**: Stores virtual parameter files
- **Work**: Stores event logs
- **SenSets**: Stores sensor and actuator configurations
- **HistReps**: Stores history report files
- **ProjectName.prj**: Main project file

Each new project creates its own `.prj` file and associated subdirectories.