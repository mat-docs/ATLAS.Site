# Getting Started with vTAG Service

This guide takes you from a fresh PC to a vTAG model producing outputs from a Kafka stream.

A **Kafka broker** is the message server that carries telemetry between applications. A **producer** is any application that publishes telemetry to it, and a **consumer**, such as ATLAS, reads it. vTAG Service is both: it reads your model's inputs from the broker and publishes the model's outputs back to it.

## 1. Check the prerequisites

**You need**

- A Kafka broker that vTAG Service can reach. If you don't have one yet, [Getting Started with Open Streaming](../../../developer-resources/secu4/getting-started.md) shows how to run one in Docker.
- A producer publishing telemetry to that broker using the [Open Streaming Architecture](../../stream/open_streaming_architecture/index.md): for example ADS with the [Bridge Service](../../../developer-resources/secu4/bridge_service/index.md), or your own application built on the Stream API. The session must contain the parameters your model reads.
- **System Monitor**, to program your model onto vTAG Service.
- A built vTAG application: the `.pgv` file, plus the `.cfg` (logging configuration) and, if your application uses them, `.pul` files that go with it. You build these the same way as for vTAG Server; see [Create Your First vTAG Server Model](../vtag/getting-started.md#2-create-your-first-vtag-server-model) and [Build the Application](../vtag/getting-started.md#3-build-the-application-pgv). Note the folders they are in: you'll need them in step 4.
- A Motion Applied licence file (`.lic`) with the **vTAG Server** feature. vTAG Service uses the same licence feature, but you don't need vTAG Server installed.

!!! note
    You don't need vTAG Server, ATLAS 9 or ADS installed. You also don't need to install .NET separately, because vTAG Service ships with its own runtime.

## 2. Install vTAG Service

1. Download the vTAG Service installer, `MA.DataPlatforms.vTAGService.Setup.exe`, from the [Motion Applied Portal](https://portal.mclarenapplied.com/portal/Downloads/Software).
2. Run it and follow the wizard.

The installer:

- installs **Licence Manager** if it isn't already installed, or if your copy is older than the one in the installer;
- installs vTAG Service to `C:\Program Files (x86)\Motion Applied\MA.DataPlatforms.vTAGService`;
- adds **vTAG Service** shortcuts to the Start Menu (under **Motion Applied**) and the desktop;
- creates your configuration file, `Documents\Motion Applied\vTAG Service\AppConfig.json`, if you don't already have one.

## 3. Import your licence

Open **Licence Manager** from the Start Menu and import your `.lic` file.

vTAG Service reads the licence from `%APPDATA%\McLaren Applied Technologies\Licence.lic` when it starts. If that file isn't there, the service stops straight away (see [Troubleshooting](troubleshooting.md#the-service-closes-immediately-after-starting)).

## 4. Point vTAG Service at your broker and files

`AppConfig.json` is a text file that holds vTAG Service's settings. Open `Documents\Motion Applied\vTAG Service\AppConfig.json` in a text editor such as Notepad. The installer creates it with defaults; change the highlighted values to suit your setup:

```json title="AppConfig.json (values to check)" linenums="1" hl_lines="3 7 12 15 18"
{
  "StreamApiConfig": {
    "BrokerUrl": "localhost:9094",
    ...
  },
  "VTagHost": {
    "DataSource": "Default",
    ...
  },
  "EssentialsConfig": {
    "PgvPaths": [
      "C:\\McLaren Applied"
    ],
    "CfgPaths": [
      "C:\\McLaren Applied"
    ],
    "PulFilePaths": [
      "C:\\McLaren Applied"
    ]
  }
}
```

!!! note "Edit only these values; leave the rest of the file as it is"
    `...` marks settings that are left out of this example. Don't delete them from your file.

- **`StreamApiConfig.BrokerUrl`**: the `host:port` of your Kafka broker. Use `localhost:9094` if the broker runs on this PC with the default port.
- **`VTagHost.DataSource`**: the name of the data source your producer publishes telemetry under. vTAG Service reads its inputs from it. For the Bridge Service, it's the `DataSource` value in the Bridge Service's configuration file. If you're not sure, ask whoever set up the stream; many setups use `Default`.
- **`EssentialsConfig` paths**: the folders that hold the `.pgv`, `.cfg` and `.pul` files for the model you'll program. In JSON, write each backslash twice (`\\`).

Save the file. vTAG Service reads it only when it starts. If it's already running, close its console window and start it again. For every setting, see the [Configuration Reference](configuration-reference.md).

## 5. Start vTAG Service

Start **vTAG Service** from the Start Menu or the desktop shortcut. A console window opens and shows the service's log. Keep this window open: closing it stops the service.

When it starts successfully, you'll see lines like these. The **Support Library** is the component vTAG Service uses to connect to the broker.

```text title="Log (console or file)"
Support Library started (broker: "localhost:9094")
vTAG not running at startup (state ...) — deferring discovery until it reaches Running
```

The second line is expected on a new installation: no model has been programmed onto vTAG Service's built-in virtual vTAG unit yet.

## 6. Program your model with System Monitor

Program your vTAG application onto vTAG Service the same way you would for vTAG Server (see [Reprogram the vECU](../vtag/getting-started.md#4-reprogram-the-vecu)), with one difference: connect System Monitor to the IP address in `VTagClient.BindIpAddress`. The default is `127.0.0.1`, so System Monitor must run on the same PC.

When programming finishes, vTAG Service reads the model's parameters and subscribes to the broker:

```text title="Log (console or file)"
vTAG reached Running from ... — (re)discovering
vTAG reached Running — resetting state and rediscovering parameters
Parameter discovery complete: 1 slot(s), 4 inputs, 12 outputs
Subscribing vTAG model to Support Library (frequency: 1000 Hz, batchSize: 100)
Successfully subscribed to Support Library. SubscriptionId: "..."
```

The numbers depend on your model: `slot(s)` is the number of applications programmed onto the unit, and the frequency is the rate your model runs at (its base step). Once you see `Successfully subscribed`, vTAG Service is ready for data.

## 7. Stream a session and check the outputs

Start streaming a session that contains your model's input parameters to the broker, on the data source you configured. vTAG Service runs the model as the data arrives. It writes the outputs to an **associated session**: a new session on the same broker, linked to your input session, with the session type `vTAG`.

To see the outputs in ATLAS:

1. Add a [Stream Recorder](../../analyse/viewer/handling-data/recorders/stream-recorder.md) whose Stream Server Configuration points at the same broker. Its Domain and Stream Creation Strategy must match `StreamApiConfig`; if you haven't changed them, leave the Domain empty and choose **Topic Based**.
2. Start the recorder.

You'll know it's working when the vTAG output session appears alongside your input session and your model's output parameters show values. To save the outputs without ATLAS, use the [Standalone Stream Recorder](../../analyse/standalone-stream-recorder/index.md).

## If something doesn't work

- The console window closes as soon as it opens: check your licence. See [The service closes immediately after starting](troubleshooting.md#the-service-closes-immediately-after-starting).
- The model was programmed, but no outputs appear: see [No output session appears](troubleshooting.md#no-output-session-appears).
- Next, the [Configuration Guide](configuration-guide.md) covers common changes, such as naming the output session.
