
!!! danger "Prototype Functionality"
    RTA was released as prototype functionality. As such, the content in these pages is subject to change based on feedback and roadmap changes.
# Publishing to the Toolkit Config Service

The [gRPC API](../../services/rta-configsvc/grpc.md) provides two service calls to publish configuration:

* `PutConfig` &mdash; works for configs up to about 4 MiB
* `PutConfigStream` &mdash; is more complex to use, but works with configs of any size

The _MAT.OCS.RTA.Toolkit.API.GrpcClients_ package has these methods, and also a convenience method which handles the serialization to [JSON](serializing.md#json) or [FFC](serializing.md#ffc) at the same time.

=== "C# Sample: Publish and Serialize"

    ```c#
    using MAT.OCS.Configuration.Builder;
    using MAT.OCS.RTA.Model.Net;
    using MAT.OCS.RTA.Toolkit.API.ConfigService;

    var config = new ConfigurationBuilder
    {
        Applications =
        {
            new ApplicationBuilder("demo")
            {
                // ...
            }
        }
    }.BuildConfiguration();

    var configIdentifier = Guid.NewGuid().ToString();
    using var configChannel = GrpcChannel.ForAddress("http://localhost:2662");
    var client = new ConfigStore.ConfigStoreClient(configChannel);

    // handles FFC serialization automatically
    await configClient.PutConfigAsync(configIdentifier, config);

    // or use this call to explicitly serialize as JSON
    // await configClient.PutConfigAsync(configIdentifier, config, MediaTypes.JsonConfig);
    ```

=== "C# Sample: Publish &lt; 4 MiB"

    ```c#
    using MAT.OCS.Configuration.Builder;
    using MAT.OCS.Configuration.Json;
    using MAT.OCS.RTA.Toolkit.API.ConfigService;
    using Newtonsoft.Json;

    var config = new ConfigurationBuilder
    {
        Applications =
        {
            new ApplicationBuilder("demo")
            {
                // ...
            }
        }
    }.BuildConfiguration();

    // serialize some config to JSON
    var json = JsonConvert.SerializeObject(config, new ConfigurationJsonConverter());

    var configIdentifier = Guid.NewGuid().ToString();
    using var configChannel = GrpcChannel.ForAddress("http://localhost:2662");
    var client = new ConfigStore.ConfigStoreClient(configChannel);

    // suitable for up to a bit less than 4 MiB
    await client.PutConfigAsync(new PutConfigRequest
    {
        Identifier = id,
        ContentType = mediaType,
        Data = ByteString.CopyFromUtf8(json)
    });
    ```

=== "C# Sample: Publish &gt; 4 MiB"

    ```c#
    using MAT.OCS.RTA.Toolkit.API.ConfigService;

    var config = new ConfigurationBuilder
    {
        Applications =
        {
            new ApplicationBuilder("demo")
            {
                // ...
            }
        }
    }.BuildConfiguration();

    // serialize some config to JSON
    var json = JsonConvert.SerializeObject(config, new ConfigurationJsonConverter());
    var ms = new MemoryStream(new UTF8Encoding(false).GetBytes(json)); // no BOM

    // use a new identifier every time if the config is not always the same
    var configIdentifier = Guid.NewGuid().ToString();
    using var configChannel = GrpcChannel.ForAddress("http://localhost:2662");
    var client = new ConfigStore.ConfigStoreClient(configChannel);

    using var call = client.PutConfigStream(new CallOptions());
    var rs = call.RequestStream;

    // publish the identifier as the first message
    await rs.WriteAsync(new ConfigStreamMessage
    {
        Info = new ConfigStreamMessage.Types.ConfigInfo
        {
            Identifier = id,
            ContentType = mediaType
        }
    });

    // publish config a bit at a time - 4 KiB is fine
    var buffer = new byte[4096];
    var r = 0;
    while ((r = ms.Read(buffer, 0, buffer.Length)) > 0)
    {
        var msg = new ConfigStreamMessage
        {
            Piece = ByteString.CopyFrom(buffer, 0, r)
        };

        await rs.WriteAsync(msg);
    }

    await rs.CompleteAsync();
    await call.ResponseAsync;
    ```
