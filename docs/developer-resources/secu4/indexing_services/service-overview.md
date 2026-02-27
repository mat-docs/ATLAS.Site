# Service Overview

This document provides a brief description of each service in the MA.DataPlatforms.Indexing solution.

## Architecture Overview

The solution consists of two main microservices that work together to provide comprehensive file and configuration indexing capabilities for Motion Applied's data platform.

![Architecture Diagram](images/architecture.svg)

## Services

### 1. MA.DataPlatforms.Indexing.Files Service

**Purpose**: General-purpose file indexing and management service

**Port**: 5000

**Description**: This service provides comprehensive file system indexing capabilities. It scans specified directories for files with configured extensions and maintains a searchable index of file metadata including paths, sizes, modification dates, and optional checksums.

**Key Responsibilities**:

- **File Discovery**: Scans directories recursively for files matching specified extensions
- **Metadata Extraction**: Captures file size, modification dates, and optional checksums
- **Status Tracking**: Monitors file processing states (Exist, Processed, NotFound, Error)
- **Search & Query**: Provides advanced search capabilities with pagination
- **Scheduled Scanning**: Automated scanning using Quartz scheduler
- **Manual Operations**: Add/remove file metadata manually via API
- **Health Monitoring**: Provides heartbeat and status endpoints

**Supported File Types**:

All file types are configurable via appsettings. Common examples include:

  - `.pgv`
  - `.cfg`
  - `.pul`

**Use Cases**:

- File system auditing and monitoring
- Data lake file discovery
- File integrity checking with checksums
- Integration with data processing pipelines
- File availability validation

---

### 2. MA.DataPlatforms.Indexing.Configs Service

**Purpose**: Specialized configuration and parameter file indexing service

**Port**: 5050

**Description**: This service focuses specifically on indexing and processing .cfg and .pgv files. It extracts meaningful metadata from these specialized file formats and provides APIs for retrieving configuration relationships and processing information.

**Key Responsibilities**:

- **CFG File Processing**: Extracts configuration IDs and metadata from .cfg files
- **PGV File Processing**: Extracts application IDs, versions, and header information from .pgv files
- **Relationship Mapping**: Links CFG and PGV files through processing information
- **Specialized Queries**: Provides APIs for config-specific and PGV-specific searches
- **Dual Scanning**: Separate scanning processes for CFG and PGV files
- **Processing Coordination**: Manages the relationship between different file types
- **Integration**: Communicates with the Files service for file discovery

**Specialized Data Extraction**:

- **CFG Files**: Configuration IDs, file relationships
- **PGV Files**: Application IDs, versions, header hash codes
- **Processing Info**: Aggregates related files

**Use Cases**:

- Configuration management and tracking
- Parameter version control
- Application configuration discovery
- Racing data configuration analysis
- Telemetry parameter management

---

## Service Interaction

### Data Flow
1. **Files Service** discovers and indexes files in configured directories
2. **Configs Service** receives notifications about new .cfg and .pgv files
3. **Configs Service** processes the specialized file formats to extract metadata
4. Both services maintain their own databases but can cross-reference data

### Storage Options
Both services support dual storage backends:
- **MongoDB**: For production environments with high volume and performance requirements
- **LiteDB**: For development, testing, or smaller deployments

### Communication
- **REST APIs**: Both services expose comprehensive REST endpoints
- **Notification System**: Services can notify each other about file changes
- **Heartbeat Monitoring**: Health check endpoints for service monitoring

---

## Technology Stack

### Backend Framework
- **ASP.NET Core**: Modern web API framework
- **C# 11+**: Latest language features and performance improvements

### Scheduling
- **Quartz.NET**: Robust job scheduling with cron expressions
- **Background Tasks**: Asynchronous file scanning and processing

### Data Storage
- **MongoDB**: Document database for high-performance scenarios
- **LiteDB**: Embedded database for lightweight deployments

### Logging & Monitoring
- **Serilog**: Structured logging with multiple sinks
- **Health Checks**: Built-in health monitoring endpoints

### Configuration
- **ASP.NET Core Configuration**: JSON-based with environment variable support
- **Dependency Injection**: Built-in IoC container