# Listing and Queries

The RTA API provides paginated session listing, with sorting and filtering.

This functionality is combined with the [Session Metamodel](metamodel.md) to drive the ATLAS session browser and provide rich functionality for web applications and integrations in the environment.

To request a basic sessions list:

=== "GET"

    ```bash
    curl -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions"
    ```

=== "POST"

    ```bash
    curl -X POST -d "" -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions"
    ```

```json
{
    "sessions": [
        {
            "identity": "example",
            "state": "closed",
            "timestamp": "2021-05-22T14:30:08.244956+01:00",
            "identifier": "Example",
            "details": {}
        }
        // ...
    ]
}
```

This returns a page of sessions in descending order by `"timestamp"` (i.e. most-recent first) by default.


???+ info "GET or POST?"

    POST requests are required for `query` and `prop` to avoid issues with excessive URI lengths.

    | Argument    | GET | POST |
    |-------------|-----|------|
    | `pageSize`  | ✔️  | ✔️  |
    | `pageIndex` | ✔️  | ✔️  |
    | `folder`    | ✔️  | ✔️  |
    | `sort`      | ✔️  | ✔️  |
    | `query`     | ❌  | ✔️  |
    | `prop`      | ❌  | ✔️  |

## Pagination

`pageSize` specifies the page size, in sessions. The default size is implementation-dependent.

`pageIndex` specifies the 0-based page number.

=== "GET"

    ```bash
    curl -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions?pageSize=50&pageIndex=0"
    ```

=== "POST"

    ```bash
    curl -X POST -d "pageSize=50&pageIndex=0" -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions"
    ```

## Folders

To limit results to sessions in a [virtual folder](folders.md) subtree (e.g. `#!json "animals/felines"`):

=== "GET"

    ```bash
    curl -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions?folder=animals%2Ffelines"
    ```

=== "POST"

    ```bash
    curl -X POST -d "folder=animals%2Ffelines" -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions"
    ```

## Sorting

The `sort` argument requests a sort, using a property key with `:asc` or `:desc` suffix:

* `timestamp:asc`
* `quality:desc`
* `details.Engineer:asc`
* `extDetails.CarSetup.TyrePressure:asc`

For example:

=== "GET"

    ```bash
    curl -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions?sort=timestamp:asc&quality:desc"
    ```

=== "POST"

    ```bash
    curl -X POST -d "sort=timestamp:asc&quality:desc" -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions"
    ```

Multiple sorts can be specified as shown above, from highest priority to lowest. The Toolkit [Session Service](../../services/rta-sessionsvc/README.md) supports multi-property sorts, but other implementations may not.

??? important "Specification Guidance"

    * Implementations MUST sort in descending order by timestamp, by default
    * Implementations SHOULD support user-specified sorting &mdash; it is expected by users
    * Implementations MAY support sorting on multiple properties, from highest- to lowest-priority
    * Sorting SHOULD use the appropriate data type &mdash; i.e. not simply string comparison
    * Sorting on date-time fields (specifically including `"timestamp"`, `"startTimestamp"` and `"endTimestamp"`) SHOULD handle the time-zone correctly &mdash; which in practice tends to require storing the timezone offset separately
    * Sorting support MUST match the metamodel, if one is provided
    * Sort requests for fields that do not exist or are declared as non-sortable in the metamodel MUST be accepted gracefully &mdash; do not assume the client has checked the metamodel

## Query

The ATLAS 10 session browser can construct a query from the free-text search field (top), and from structured filters (lower-left panel) &mdash; which are populated using the [metamodel](metamodel.md).

A typical query using these fields might translate to:

```sql
(identifier CONTAINS '-20200313-') AND
((details.driver = 'SAI') OR (details.driver = 'RIC'))
```

Properties in the session are referenced in typical JSON-path style (e.g. `"identifier"` or `"details.foo"`).

The RTA query dialect (defined by [JSON Schema](../../api/query.schema.json)) is essentially a small subset of the [MongoDB Query Syntax](https://docs.mongodb.com/manual/reference/operator/query/). This is sufficient to meet all current and likely future requirements for basic session browsing and search, and is easy to parse and transpile to other query languages, such as SQL. 

```json
{
    "identifier": {"$contains":"-20200313-"},
    "details.driver": {"$in": ["SAI", "RIC"]}
}
```

=== "POST"

    ```bash
    curl -X POST -d "query=%7B%22identifier%22%3A%7B%22%24contains%22%3A%22-20200313-%22%7D%2C%22details.driver%22%3A%7B%22%24in%22%3A%5B%22SAI%22%2C%22RIC%22%5D%7D%7D" -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions"
    ```

??? important "Specification Guidance"

    * The query language is specified by a [JSON schema](../../api/query.schema.json)
    * Library support is provided in the _MAT.OCS.RTA.Model_ [NuGet Package](../../downloads.md#nuget-binaries)
    * ATLAS does not currently use all aspects of this dialect, but it MUST be supported in its entirety
    * Queries SHOULD be supported on as many session model properties as possible &mdash; including `"details"`

### Conditions

#### Comparisons

The simplest condition is a key-value pair representing an equality:

```json
{"type": "aaa"}
```

This can also be encoded with a relational comparison operator:

```json
{"type": {"$eq": "aaa"}}

```

| Operator | Meaning                  |
|----------|--------------------------|
| $eq      | Equal to                 |
| $gt      | Greater than             |
| $gte     | Greater than or equal to |
| $lt      | Less than                |
| $lte     | Less than or equal to    |
| $neq     | Not equal to             |

These work on all the data types. `null` comparisons are allowed but should be limited to `$eq` and `$neq`.

#### Text Matches

Text matches have the same structure, but only work on strings:

```json
{"identifier": {"$contains": " 2021-"}}
```

| Operator    | Meaning     |
|-------------|-------------|
| $startsWith | Starts with |
| $endsWith   | Ends with   |
| $contains   | Contains    |

!!! note

    The text match operators diverge from MongoDB syntax.

    There is no regular expression operator.

#### Aggregation

Aggregate operators `$in` and `$nin` accept arrays of values:

```json
{"details.driver": {"$in": ["SAI", "NOR"]}}
```

| Operator    | Meaning     |
|-------------|-------------|
| $in         | In list     |
| $nin        | Not in list |

#### Negation

There is also a negation operator &mdash; `$not` &mdash; which operates on filter conditions.

```json
{"$not": {"type": "test"}}
```

### Criteria

Conditions can be assembled into a list of criteria.

A single equality comparison is the simplest case, but multiple equality matches are implicitly a logical AND:

```json
{"type": "foo", "details.thang": "bar"}
```

This can also be written with an explicit logical operator, operating on a list of criteria:

```json
{"$and": [{"type": "foo"}, {"details.thang": "bar"}]}
```

| Operator    | Meaning                         |
|-------------|---------------------------------|
| $and        | All of the criteria must match  |
| $or         | Any of the criteria must match  |
| $nor        | None of the crtieria must match |

## Extra Properties

The service may have an extended data model offering more properties beyond those provided by default.

Additional properties can be discovered by [querying the metamodel](metamodel.md#discovery).

!!! example

    The Toolkit [Session Service](../../services/rta-sessionsvc/README.md) does not send properties under `extDetails` unless requested by the client.

To request additional properties (e.g. `#!json "extDetails.CarSetup.RideHeightFront"` and `#!json "extDetails.CarSetup.RideHeightRear"`):

=== "POST"

    ```bash
    curl -X POST -d "prop=extDetails.CarSetup.RideHeightFront&prop=extDetails.CarSetup.RideHeightRear" -H "Accept: application/json" "http://localhost:2650/rta/v2/sessions"
    ```
