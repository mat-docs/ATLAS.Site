# ATLAS Documentation Portal

[Deploy Link](https://atlas.mclarenapplied.com/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/cfd0eb9e-0c60-479f-863a-5b63057c7881/deploy-status)](https://app.netlify.com/projects/mclaren-atlas-docs/deploys)

## Setup

Install Visual Studio Code.

Install Python 3.7 or later, which should come with `pip`.

From the project directory, it is recommended to first create a virtual environment:

    python -m venv .venv

Then install dependencies:

    pip install -r requirements.txt

Preview the docs in a local web browser as follows:

    mkdocs serve

On windows machine, do:

    python -m mkdocs serve

## Contribution Guidelines

As part of the new structure the following guidelines should be considered when adding or amending any of the documentation. 

### User Guides

### Developer Resources

This guide outlines the structure, content expectations, and best practices for contributing to the Developer Documentation for any product. It is designed to ensure consistency, clarity, and ease of use for developers integrating with our systems.

**Your Audience**
- Technical wanting to build on-top of the off the shelf ecosystem
- Using APIs and SDK wants resources to be immediately available to them with clear structured documentation and examples. 
- Is not particularly interested in the pros and cons - is likely already convinced and is trying to figure out how to actually solve their problems. 

Each product should following the following structure:

````
/<ProductName>
│
├── API_1_Name/
│   ├── overview.md
│   ├── integration-guide.md
│   ├── reference.md
│   │       ├── Methods
│   │       ├── Endpoints
│   │       ├── Commands
│   ├── examples.md
│   ├── troubleshooting.md
│   └── best-practices.md
│
├── API_N_Name/
│   └── ...
````

Descriptions of pages:
- overview.md: What this interface is for and when to use it.
- integration-guide.md: Step-by-step instructions for integrating this interface. Setup etc.
- reference.md: Complete technical reference for all operations.

````
# Reference Example Structure

## Overview
- **Interface type**: REST / SDK / CLI / etc.
- **Version**: v1.0
- **Base URL / Entry Point**: `https://api.example.com/v1/`
- **Authentication**: API key / OAuth2 / etc.
- **Error Handling**: Common error codes and retry logic

---

## Operations

### <Operation Name> (e.g. `GetTelemetryData`)
- **Description**: What this does and when to use it.
- **Method**: `GET` / `POST` / `CALL` / `COMMAND`
- **Endpoint / Signature**: `/telemetry/data` or `GetTelemetryData(params)`
- **Parameters**:
  | Name       | Type     | Required | Description                  |
  |------------|----------|----------|------------------------------|
  | `startTime`| `string` | Yes      | ISO 8601 timestamp           |
- **Response**:
  ```json
  {
    "data": [...],
    "nextPageToken": "abc123"
  }
  ```
- **Errors**:
  | Code       | Message     | Meaning | 
  |------------|----------|----------|
  | `401`| `Unauthorized` | Invalid or missing token      |  
- **Examples**:
    ```
    curl -X GET "https://api.example.com/v1/telemetry/data?startTime=..." \
        -H "Authorization: Bearer <token>"
    ```
````

- examples.md: Real-world usage examples, walkthrough sample codes.
- troubleshooting.md: Known issues and how to resolve them.
- best-practices.md: Performance tips, security considerations, maintainability.

#### Writing guidelines

- Use **clear, concise language**.
- Prefer **code examples** over prose.
- Use **headings and tables** for readability.
- Keep **one concept per file**.
- Use **relative links** to connect sections.

#### Checklist Before PR

- [ ] All required files are present.
- [ ] Code examples are tested and accurate.
- [ ] Markdown is linted and renders correctly.
- [ ] File names and headings follow naming conventions.
