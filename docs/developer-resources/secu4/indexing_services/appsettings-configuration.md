# AppSettings Configuration Documentation

This document provides comprehensive information about configuration options for both the **MA.DataPlatforms.Indexing.Files** and **MA.DataPlatforms.Indexing.Configs** projects.

## Table of Contents

1. [Overview](#overview)
2. [Files Project Configuration](#files-project-configuration)
3. [Configs Project Configuration](#configs-project-configuration)
4. [Common Configuration](#common-configuration)
5. [Environment Variable Mapping](#environment-variable-mapping)

## Overview

Both projects use ASP.NET Core configuration system with JSON-based appsettings files. The configuration supports:
- File and directory indexing settings
- Database connections (MongoDB and LiteDB)
- Scheduled job configuration (Quartz)
- Logging and monitoring
- API endpoints and networking

## Files Project Configuration

### Core File Indexing Settings

#### `Directories`
- **Type**: Array of strings
- **Description**: List of directories to scan for files
- **Example**:
```json
"Directories": [
  "C:\\Data\\ProjectFiles",
  "D:/Documents/DataFiles",
  "E:/Archive/ConfigFiles",
  "/mnt/storage/telemetry"
]
```
- **Environment Variable**: `Directories_0`, `Directories_1`, etc.

#### `Extensions`
- **Type**: Array of strings
- **Description**: File extensions to include in indexing
- **Example**:
```json
"Extensions": [
  ".pgv",
  ".cfg",
  ".pul"
]
```
- **Environment Variable**: `Extensions_0`, `Extensions_1`, etc.

#### `ExcludedDirectories`
- **Type**: Array of strings
- **Description**: Directories to exclude from scanning
- **Default**: `[]` (empty array)
- **Example**:
```json
"ExcludedDirectories": [
  "C:\\Temp",
  "C:\\Windows"
]
```
- **Environment Variable**: `ExcludedDirectories_0`, `ExcludedDirectories_1`, etc.

#### `AddFileCheckSum`
- **Type**: Boolean
- **Description**: Whether to calculate and store file checksums during indexing
- **Default**: `true`
- **Example**: `"AddFileCheckSum": true`
- **Environment Variable**: `AddFileCheckSum`

### Storage Configuration

#### `StorageType`
- **Type**: Integer (enum)
- **Description**: Database storage type to use
- **Values**:
  - `0`: LiteDB
  - `1`: MongoDB
- **Default**: `1` (MongoDB)
- **Environment Variable**: `StorageType`

#### MongoDB Configuration
```json
"MongoDB": {
  "ConnectionString": "mongodb://your-server:27017",
  "DatabaseName": "YourFileIndexDB",
  "CollectionName": "YourIndexedFiles"
}
```

- **`ConnectionString`**
  - **Type**: String
  - **Description**: MongoDB connection string
  - **Environment Variable**: `MongoDb__ConnectionString`

- **`DatabaseName`**
  - **Type**: String
  - **Description**: MongoDB database name
  - **Environment Variable**: `MongoDb__DataBaseName`

- **`CollectionName`**
  - **Type**: String
  - **Description**: MongoDB collection name for storing file indexes
  - **Environment Variable**: `MongoDb__CollectionName`

#### LiteDB Configuration
```json
"LiteDb": {
  "FileName": "YourFileIndexingDB"
}
```

- **`FileName`**
  - **Type**: String
  - **Description**: LiteDB database file name (without extension)
  - **Environment Variable**: `LiteDb__FileName`

### Scheduling Configuration

#### `QuartzSettings`
```json
"QuartzSettings": {
  "CronExpression": "0 0 8 * * ?"
}
```

- **`CronExpression`**
  - **Type**: String
  - **Description**: Cron expression for scheduled file scanning
  - **Example**: `"0 0 8 * * ?"` (Daily at 8:00 AM)
  - **Environment Variable**: `QuartzSettings__IndexingCronExpression`

## Configs Project Configuration

### File Indexer Endpoints

#### `FileIndexerEndpoints`
```json
"FileIndexerEndpoints": {
  "CfgEndpoint": "http://your-files-service:5000/",
  "PgvEndpoint": "http://your-files-service:5000/"
}
```

- **`CfgEndpoint`**
  - **Type**: String
  - **Description**: Endpoint URL for CFG file indexing service
  - **Example**: `"http://your-files-service:5000/"`
  - **Environment Variable**: `FileIndexerEndpoints__CfgEndpoint`

- **`PgvEndpoint`**
  - **Type**: String
  - **Description**: Endpoint URL for PGV file indexing service
  - **Example**: `"http://your-files-service:5000/"`
  - **Environment Variable**: `FileIndexerEndpoints__PgvEndpoint`

### Storage Configuration

#### `StorageType`
- **Type**: Integer (enum)
- **Description**: Database storage type (same as Files project)
- **Values**:
  - `0`: LiteDB
  - `1`: MongoDB
- **Default**: `1` (MongoDB)
- **Environment Variable**: `StorageType`

#### MongoDB Configuration
```json
"MongoDB": {
  "ConnectionString": "mongodb://your-mongo-server:27017",
  "DatabaseName": "YourConfigIndexDb"
}
```

- **`ConnectionString`**
  - **Type**: String
  - **Description**: MongoDB connection string
  - **Environment Variable**: `MongoDb__ConnectionString`

- **`DatabaseName`**
  - **Type**: String
  - **Description**: Database name for config indexing
  - **Environment Variable**: `MongoDb__DataBaseName`

#### LiteDB Configuration
```json
"LiteDb": {
  "FileName": "YourConfigIndexingDB"
}
```

- **`FileName`**
  - **Type**: String
  - **Description**: LiteDB database file name for config storage
  - **Environment Variable**: `LiteDb__FileName`

### Scheduling Configuration

#### `QuartzSettings`
```json
"QuartzSettings": {
  "CfgCronExpression": "0 30 9 * * ?",
  "PgvCronExpression": "0 45 9 * * ?"
}
```

- **`CfgCronExpression`**
  - **Type**: String
  - **Description**: Cron expression for CFG file scanning
  - **Example**: `"0 59 13 * * ?"` (Daily at 1:59 PM)
  - **Environment Variable**: `QuartzSettings__CfgCronExpression`

- **`PgvCronExpression`**
  - **Type**: String
  - **Description**: Cron expression for PGV file scanning
  - **Example**: `"0 00 14 * * ?"` (Daily at 2:00 PM)
  - **Environment Variable**: `QuartzSettings__PgvCronExpression`

### Notification Configuration

#### `NotificationUrls`
```json
"NotificationUrls": ["http://your-files-service:5000/"]
```

- **Type**: Array of strings
- **Description**: Callback URLs that this service registers with the Files indexer to receive notifications when .cfg and .pgv files are discovered
- **Example**: `["http://your-files-service:5000/api/notification"]`
- **Environment Variable**: `NotificationUrls__0`, `NotificationUrls__1`, etc.
- **Note**: **Important** - To ensure configs are indexed immediately when files are discovered, set this to the Files service URL (e.g., `http://your-files-service:5000/`). Without this configuration, configs will only be indexed when the scheduled Quartz job runs.

## Common Configuration

### Web Server Configuration

#### `Kestrel`
```json
"Kestrel": {
  "Endpoints": {
    "Http": {
      "Url": "http://your-service:5000"  // Files: 5000, Configs: 5050
    }
  }
}
```

- **Files Project**: Default port `5000`
- **Configs Project**: Default port `5050`
- **Environment Variable**: `Kestrel__Endpoints__Http__Url`

#### `AllowedHosts`
- **Type**: String
- **Description**: Allowed host headers for the application
- **Default**: `"*"` (all hosts allowed)
- **Environment Variable**: `AllowedHosts`

### Logging Configuration

#### Standard Logging
```json
"Logging": {
  "LogLevel": {
    "Default": "Information",
    "Microsoft.AspNetCore": "Warning"
  }
}
```

#### Serilog Configuration
```json
"Serilog": {
  "Using": ["Serilog.Sinks.Console", "Serilog.Sinks.File"],
  "WriteTo": [
    {
      "Name": "Console",
      "Args": {
        "outputTemplate": "[{Timestamp:HH:mm:ss.fff} {Level:u3}] {Message:lj}{NewLine}{Exception}"
      }
    },
    {
      "Name": "File",
      "Args": {
        "path": "Logs/log-.txt",
        "rollingInterval": "Day",
        "outputTemplate": "[{Timestamp:yyyy-MM-dd HH:mm:ss.fff} {Level:u3}] {Message:lj}{NewLine}{Exception}"
      }
    }
  ]
}
```

## Environment Variable Mapping

The application supports configuration through environment variables using the standard ASP.NET Core configuration hierarchy:

### Files Project Environment Variables

| Configuration Path | Environment Variable | Example Value |
|-------------------|---------------------|---------------|
| `Directories:0` | `Directories_0` | `"C:\\Data"` |
| `Directories:1` | `Directories_1` | `"D:\\Archive"` |
| `Extensions:0` | `Extensions_0` | `".pgv"` |
| `Extensions:1` | `Extensions_1` | `".cfg"` |
| `ExcludedDirectories:0` | `ExcludedDirectories_0` | `"C:\\Temp"` |
| `StorageType` | `StorageType` | `"1"` |
| `AddFileCheckSum` | `AddFileCheckSum` | `"true"` |
| `MongoDB:ConnectionString` | `MongoDb__ConnectionString` | `"mongodb://your-mongo-server:27017"` |
| `MongoDB:DatabaseName` | `MongoDb__DataBaseName` | `"FileIndexDB"` |
| `MongoDB:CollectionName` | `MongoDb__CollectionName` | `"IndexedFiles"` |
| `LiteDb:FileName` | `LiteDb__FileName` | `"data.db"` |
| `QuartzSettings:CronExpression` | `QuartzSettings__IndexingCronExpression` | `"0 0 * * * ?"` |

### Configs Project Environment Variables

| Configuration Path | Environment Variable | Example Value |
|-------------------|---------------------|---------------|
| `FileIndexerEndpoints:CfgEndpoint` | `FileIndexerEndpoints__CfgEndpoint` | `"http://your-files-service:5000/"` |
| `FileIndexerEndpoints:PgvEndpoint` | `FileIndexerEndpoints__PgvEndpoint` | `"http://your-files-service:5000/"` |
| `StorageType` | `StorageType` | `"1"` |
| `MongoDB:ConnectionString` | `MongoDb__ConnectionString` | `"mongodb://your-mongo-server:27017"` |
| `MongoDB:DatabaseName` | `MongoDb__DataBaseName` | `"ConfigIndexDB"` |
| `LiteDb:FileName` | `LiteDb__FileName` | `"config.db"` |
| `QuartzSettings:CfgCronExpression` | `QuartzSettings__CfgCronExpression` | `"0 30 9 * * ?"` |
| `QuartzSettings:PgvCronExpression` | `QuartzSettings__PgvCronExpression` | `"0 45 9 * * ?"` |
| `NotificationUrls:0` | `NotificationUrls__0` | `"http://your-files-service:5000/"` |

### Common Environment Variables (Both Projects)

| Configuration Path | Environment Variable | Example Value |
|-------------------|---------------------|---------------|
| `AllowedHosts` | `AllowedHosts` | `"*"` |
| `Kestrel:Endpoints:Http:Url` | `Kestrel__Endpoints__Http__Url` | `"http://your-service:5000"` |
| `Logging:LogLevel:Default` | `Logging__LogLevel__Default` | `"Information"` |
| `Logging:LogLevel:Microsoft.AspNetCore` | `Logging__LogLevel__Microsoft.AspNetCore` | `"Warning"` |

## Configuration Examples

### Development Environment
```json
{
  "Directories": ["C:\\Dev\\TestFiles"],
  "Extensions": [".cfg", ".pgv"],
  "StorageType": 0,
  "LiteDb": {
    "FileName": "development.db"
  },
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://your-service:5000"
      }
    }
  }
}
```

### Production Environment
```json
{
  "Directories": [
    "/data/production/configs",
    "/data/production/pgvs"
  ],
  "Extensions": [".cfg", ".pgv", ".pul"],
  "StorageType": 1,
  "MongoDB": {
    "ConnectionString": "mongodb://your-production-cluster:27017",
    "DatabaseName": "ProductionIndexDB"
  },
  "QuartzSettings": {
    "CronExpression": "0 0 2 * * ?"
  }
}
```