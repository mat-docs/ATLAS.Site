# API Documentation

This document provides comprehensive API documentation for both the **MA.DataPlatforms.Indexing.Files** and **MA.DataPlatforms.Indexing.Configs** projects.

## Table of Contents

1. [Overview](#overview)
2. [Files Project APIs](#files-project-apis)
3. [Configs Project APIs](#configs-project-apis)
4. [Data Models](#data-models)
5. [Error Handling](#error-handling)

## Overview

Both projects expose RESTful APIs for file and configuration indexing operations. The APIs support:
- File scanning and indexing
- Data retrieval with pagination
- Real-time status monitoring
- Configuration management

**Base URLs:**
- Files Project: `http://your-files-service:5000`
- Configs Project: `http://your-configs-service:5050`

## Files Project APIs

### Reader Controller (`/api/read`)

#### Get All Files
```http
GET /api/read/files/all
```

**Description**: Retrieves all indexed files with pagination support.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `pageSize` | integer | No | 200 | Number of items per page |
| `pageNumber` | integer | No | 1 | Page number (1-based) |
| `sortAscending` | boolean | No | false | Sort order by file path |

**Response:**
```json
{
  "items": [
    {
      "id": "unique-file-id",
      "fileName": "example.cfg",
      "filePath": "C:\\Data\\example.cfg",
      "directoryPath": "C:\\Data",
      "searchRootDirectory": "C:\\Data",
      "fileSize": 1024,
      "lastModifiedTimeTick": 637849536000000000,
      "status": 1,
      "updateDates": ["2023-01-01T00:00:00Z"],
      "lastUpdateTime": "2023-01-01T00:00:00Z",
      "fileChecksum": "abc123def456"
    }
  ],
  "pageNumber": 1,
  "pageSize": 200,
  "totalPages": 5,
  "totalItems": 1000
}
```

#### Get Files by Status
```http
GET /api/read/files/status/{status}
```

**Description**: Retrieves files filtered by their processing status.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | Yes | File status (e.g., "Exist", "Processed", "NotFound") |

**Query Parameters:** Same as "Get All Files"

**Response:** Same as "Get All Files"

#### Find Files by Substring
```http
GET /api/read/files/name/substring/{substr}
```

**Description**: Finds files whose names contain the specified substring.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `substr` | string | Yes | Substring to search for in file names |

**Query Parameters:** Same as "Get All Files"

**Response:** Same as "Get All Files"

#### Find Files by Exact Name
```http
GET /api/read/files/name/is/{fileName}
```

**Description**: Finds files with exact file name match.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileName` | string | Yes | Exact file name to search for |

**Query Parameters:** Same as "Get All Files"

**Response:** Same as "Get All Files"

#### Query Files with Multiple Filters
```http
GET /api/read/filter/query/all
```

**Description**: Advanced file search with multiple filter criteria.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fileName` | string | No | null | Filter by file name |
| `filePath` | string | No | null | Filter by full file path |
| `directoryPath` | string | No | null | Filter by directory path |
| `status` | string | No | null | Filter by file status |
| `pageSize` | integer | No | 200 | Number of items per page |
| `pageNumber` | integer | No | 1 | Page number |
| `sortAscending` | boolean | No | false | Sort order |

**Response:** Same as "Get All Files"

#### Get File by Path
```http
GET /api/read/files/path?filePath={filePath}
```

**Description**: Retrieves file information by exact file path.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | string | Yes | Complete file path |

**Response:**
```json
[
  {
    "id": "unique-file-id",
    "fileName": "example.cfg",
    "filePath": "C:\\Data\\example.cfg",
    // ... other FileInfoModel properties
  }
]
```

### Scanner Controller (`/api/scanner`)

#### Start Scanning (Default Configuration)
```http
GET /api/scanner/start
```

**Description**: Starts file scanning using directories and extensions from appsettings.

**Response:**
```json
{
  "message": "Scan service started. id:abc123def456",
  "scanId": "abc123def456"
}
```

**Error Response (already running):**
```json
{
  "message": "Scanning service already running",
  "scanId": ""
}
```

#### Start Custom Scanning
```http
POST /api/scanner/scan
```

**Description**: Starts file scanning with custom directories and extensions.

**Request Body:**
```json
{
  "directories": [
    "C:\\CustomPath1",
    "C:\\CustomPath2"
  ],
  "extensions": [
    ".cfg",
    ".pgv"
  ]
}
```

**Response:** Same as "Start Scanning"

#### Stop Scanning
```http
GET /api/scanner/stop
```

**Description**: Stops the currently running scan operation.

**Response:**
```json
{
  "message": "The service will stop",
  "isStopping": true
}
```

**Error Response (not running):**
```json
{
  "message": "No scan service running to stop",
  "isStopping": false
}
```

#### Get Scanner Status
```http
GET /api/scanner/status
```

**Description**: Returns the current status of the scanning service.

**Response:**
```json
{
  "message": "The service is running",
  "isRunning": true
}
```

### Writer Controller (`/api/writer`)

#### Add File
```http
POST /api/writer/add?filePath={filePath}
```

**Description**: Manually adds a file to the index.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | string | Yes | Full path to the file to add |

**Response:**
```json
{
  "message": "File added successfully",
  "isSuccess": true
}
```

#### Delete File
```http
POST /api/writer/delete?filePath={filePath}&force={force}
```

**Description**: Removes a file from the index.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `filePath` | string | Yes | - | Full path to the file to delete |
| `force` | boolean | No | false | Force deletion even if file exists |

**Response:**
```json
{
  "message": "File deleted successfully",
  "isSuccess": true
}
```

### Update Controller (`/api/update`)

#### Prune Database
```http
POST /api/update/prune
```

**Description**: Removes entries for files that no longer exist on disk.

**Response:** `200 OK` (empty body)

#### Mark File as Processed
```http
POST /api/update/process?filePath={filePath}
```

**Description**: Updates a file's status to "Processed".

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | string | Yes | Full path to the file |

**Response:** `200 OK` (empty body)

### Config Controller (`/api/config`)

#### Get Environment Variables Info
```http
GET /api/config/vars
```

**Description**: Returns information about supported environment variables.

**Response:**
```json
{
  "directories": {
    "name": "Directories_0 .. *",
    "example": "C:\\Data"
  },
  "extensions": {
    "name": "Extensions_0 .. *",
    "example": ".txt"
  },
  // ... other configuration options
}
```

### Heartbeat Controller (`/api/heartbeat`)

#### Health Check
```http
GET /api/heartbeat
```

**Description**: Simple health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

## Configs Project APIs

### CFG Read Controller (`/api/read/cfg`)

#### Get CFG Files by Config ID
```http
GET /api/read/cfg/{configId}
```

**Description**: Retrieves CFG files associated with a specific configuration ID.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `configId` | ulong | Yes | Configuration identifier |

**Response:**
```json
[
  {
    "configId": 12345,
    "filePath": "C:\\Configs\\config1.cfg"
  },
  {
    "configId": 12345,
    "filePath": "C:\\Configs\\config2.cfg"
  }
]
```

#### Get All CFG Files
```http
GET /api/read/cfg/files/all
```

**Description**: Retrieves all indexed CFG files with pagination.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `pageSize` | integer | No | 200 | Number of items per page |
| `pageNumber` | integer | No | 1 | Page number |
| `sortAscending` | boolean | No | false | Sort order |

**Response:**
```json
{
  "items": [
    {
      "configId": 12345,
      "filePath": "C:\\Configs\\example.cfg"
    }
  ],
  "pageNumber": 1,
  "pageSize": 200,
  "totalPages": 3,
  "totalItems": 500
}
```

#### Get All Config IDs
```http
GET /api/read/cfg/ids/all
```

**Description**: Retrieves all unique configuration IDs.

**Response:**
```json
[12345, 12346, 12347, 12348]
```

### PGV Read Controller (`/api/read/pgv`)

#### Get PGV Files by App ID
```http
GET /api/read/pgv/{appId}
```

**Description**: Retrieves PGV files for a specific application ID.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appId` | ushort | Yes | Application identifier |

**Response:**
```json
[
  {
    "appId": 100,
    "appVersion": 1,
    "filePath": "C:\\PGVs\\app100_v1.pgv"
  },
  {
    "appId": 100,
    "appVersion": 2,
    "filePath": "C:\\PGVs\\app100_v2.pgv"
  }
]
```

#### Get PGV Files by App ID and Version
```http
GET /api/read/pgv/{appId}/versions/{appVersion}
```

**Description**: Retrieves PGV files for specific application ID and version.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appId` | ushort | Yes | Application identifier |
| `appVersion` | ushort | Yes | Application version |

**Response:**
```json
[
  {
    "appId": 100,
    "appVersion": 1,
    "filePath": "C:\\PGVs\\app100_v1.pgv"
  }
]
```

#### Get All PGV Files
```http
GET /api/read/pgv/files/all
```

**Description**: Retrieves all indexed PGV files with pagination.

**Query Parameters:** Same as CFG files

**Response:** Similar to CFG files but with PGV structure

### CFG Scanner Controller (`/api/scanner/cfg`)

#### Start CFG Scanning
```http
POST /api/scanner/cfg/start
```

**Description**: Starts CFG file scanning and indexing process.

**Response:**
```json
{
  "message": "CFG scan Service started. id:abc123def456",
  "scanId": "abc123def456"
}
```

#### Stop CFG Scanning
```http
POST /api/scanner/cfg/stop
```

**Description**: Stops the CFG scanning process.

**Response:**
```json
{
  "message": "The service will stop",
  "isStopping": true
}
```

#### Get CFG Scanner Status
```http
GET /api/scanner/cfg/status
```

**Description**: Returns CFG scanner status.

**Response:**
```json
{
  "message": "The service is running",
  "isRunning": true
}
```

### PGV Scanner Controller (`/api/scanner/pgv`)

#### Start PGV Scanning
```http
POST /api/scanner/pgv/start
```

**Description**: Starts PGV file scanning and indexing process.

**Response:**
```json
{
  "message": "Pgv Scan Service started. id:abc123def456",
  "scanId": "abc123def456"
}
```

#### Stop PGV Scanning
```http
POST /api/scanner/pgv/stop
```

**Description**: Stops the PGV scanning process.

**Response:** Similar to CFG scanner stop

#### Get PGV Scanner Status
```http
GET /api/scanner/pgv/status
```

**Description**: Returns PGV scanner status.

**Response:** Similar to CFG scanner status

### Processing Info Controller (`/api/processing`)

#### Get Processing Information
```http
GET /api/processing/info?configId={configId}
```

**Description**: Retrieves processing information for a configuration.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `configId` | ulong | Yes | Configuration identifier |

**Response:**
```json
{
  "aggregate": {
    // Processing aggregate information
  },
  "foundCfgInfos": [
    {
      "configId": 12345,
      "filePath": "C:\\Configs\\config.cfg"
    }
  ],
  "foundPgvInfos": [
    {
      "appId": 100,
      "appVersion": 1,
      "filePath": "C:\\PGVs\\app.pgv"
    }
  ]
}
```

#### Get CFG Files for Config
```http
GET /api/processing/files/cfg?configId={configId}
```

**Description**: Retrieves all CFG files for a specific configuration.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `configId` | ulong | Yes | Configuration identifier |

**Response:**
```json
[
  {
    "configId": 12345,
    "filePath": "C:\\Configs\\config1.cfg"
  }
]
```

#### Get PGV Files for App
```http
GET /api/processing/files/pgv?appId={appId}&appVersion={appVersion}
```

**Description**: Retrieves all PGV files for a specific application and version.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appId` | ushort | Yes | Application identifier |
| `appVersion` | ushort | Yes | Application version |

**Response:**
```json
[
  {
    "appId": 100,
    "appVersion": 1,
    "filePath": "C:\\PGVs\\app.pgv"
  }
]
```

### Indexing Controller (`/api/indexing`)

#### Index File
```http
POST /api/indexing/index?filePath={filePath}
```

**Description**: Manually indexes a specific CFG or PGV file.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | string | Yes | Full path to the file (.cfg or .pgv) |

**Response:**
```json
"File example.cfg processed successfully."
```

**Error Responses:**
- `404 Not Found`: "File not found."
- `400 Bad Request`: "the file extension is not valid"

### Heartbeat Controller (`/api/heartbeat`)

#### Health Check
```http
GET /api/heartbeat
```

**Description**: Health check endpoint for the configs service.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

## Data Models

### FileInfoModel
```typescript
interface FileInfoModel {
  id: string;                    // Unique identifier
  fileName: string;              // File name without path
  filePath: string;              // Complete file path
  directoryPath: string;         // Directory containing the file
  searchRootDirectory: string;   // Root search directory
  fileSize: number;              // File size in bytes
  lastModifiedTimeTick: number;  // Last modified time (ticks)
  status: FileStatus;            // Processing status
  updateDates: Date[];           // History of update dates
  lastUpdateTime: Date;          // Most recent update
  fileChecksum: string;          // File checksum (if enabled)
}
```

### FileStatus Enum
```typescript
enum FileStatus {
  Exist = 0,
  Processed = 1,
  NotFound = 2,
  Error = 3
}
```

### CfgFileDto
```typescript
interface CfgFileDto {
  configId: number;    // Configuration identifier (ulong)
  filePath: string;    // Full path to CFG file
}
```

### PgvFileDto
```typescript
interface PgvFileDto {
  appId: number;       // Application identifier (ushort)
  appVersion: number;  // Application version (ushort)
  filePath: string;    // Full path to PGV file
}
```

### ProcessingInfoDto
```typescript
interface ProcessingInfoDto {
  aggregate?: ProcessingAggregateInfoDto;
  foundCfgInfos: CfgFileDto[];
  foundPgvInfos: PgvFileDto[];
}
```

### PageSet<T>
```typescript
interface PageSet<T> {
  items: T[];          // Current page items
  pageNumber: number;  // Current page number (1-based)
  pageSize: number;    // Items per page
  totalPages: number;  // Total number of pages
  totalItems: number;  // Total number of items across all pages
}
```

### ScanInfo
```typescript
interface ScanInfo {
  directories: string[];  // List of directories to scan
  extensions: string[];   // List of file extensions to include
}
```

## Error Handling

### Standard Error Response
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.6.1",
  "title": "Unable to retrieve all files. Check server logs for details.",
  "status": 500,
  "traceId": "0HMVD1234567890"
}
```

### Common HTTP Status Codes

| Code | Description | When Used |
|------|-------------|-----------|
| 200 | OK | Successful operation |
| 400 | Bad Request | Invalid parameters or request format |
| 404 | Not Found | Resource not found or scanner not running |
| 500 | Internal Server Error | Server-side exceptions |

### Error Scenarios

1. **Scanner Already Running**: When trying to start a scan while one is already active
2. **Scanner Not Running**: When trying to stop a scanner that isn't running
3. **File Not Found**: When trying to index a file that doesn't exist
4. **Invalid File Extension**: When trying to index unsupported file types
5. **Database Errors**: Connection issues or query failures

## Rate Limiting and Performance

- **Pagination**: All list endpoints support pagination to handle large datasets
- **Default Page Size**: 200 items per page
- **Maximum Page Size**: Not explicitly limited (consider implementing based on needs)
- **Concurrent Operations**: Scanner operations run asynchronously to avoid blocking

## Authentication and Security

Currently, the APIs do not implement authentication. Consider adding:
- API key authentication
- JWT token validation
- IP whitelisting
- HTTPS enforcement for production use