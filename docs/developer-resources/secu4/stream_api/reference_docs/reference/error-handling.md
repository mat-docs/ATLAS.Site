# Error Handling

Guide to handling errors in the Stream API.

## gRPC Status Codes

The Stream API uses standard gRPC status codes:

| Status Code | Name | Description |
|-------------|------|-------------|
| 0 | OK | Success |
| 3 | INVALID_ARGUMENT | Invalid request parameters |
| 5 | NOT_FOUND | Resource not found |
| 6 | ALREADY_EXISTS | Resource already exists |
| 14 | UNAVAILABLE | Service unavailable |

## Error Handling Example

```csharp
try
{
    var connection = await connectionManager.NewConnectionAsync(request);
}
catch (RpcException ex)
{
    switch (ex.StatusCode)
    {
        case StatusCode.InvalidArgument:
            Console.WriteLine("Invalid parameters");
            break;
            
        case StatusCode.NotFound:
            Console.WriteLine("Resource not found");
            break;
            
        case StatusCode.Unavailable:
            Console.WriteLine("Service unavailable");
            break;
    }
}
```

## See Also

- [API Reference](api-reference.md)
- [Troubleshooting](troubleshooting.md)