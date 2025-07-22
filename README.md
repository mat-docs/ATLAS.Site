# ATLAS Documentation Portal

[Deploy Link](https://applied-atlas-docs.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/68ac14f5-0f35-40f1-8fad-7678f979e1c1/deploy-status)](https://app.netlify.com/projects/applied-atlas-docs/deploys)

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

## Contributing

### User Guides

### Developer Resources

Below outlines the structure that should be followed when contributing to developer resources.

#### When should I create a new section?

Each product should have its own section, containing the API documentation related to that specific product. 

Where a new API has been created and needs to be documented then a new section should be created. It should follow the following structure:

- Main Product
  - APIs
    - Overview of features available with this API and when to use
    - Getting started with this API
    - Endpoint/class references

Role: Get other developers using and integrating quickly. 
