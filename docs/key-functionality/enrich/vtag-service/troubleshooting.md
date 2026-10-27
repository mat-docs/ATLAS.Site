# Troubleshooting

Each problem below lists the symptom, the message to look for in the log, and the fix.

vTAG Service logs to its console window and to daily files in `Documents\Motion Applied\vTAG Service\logs` (`vTAG_log-<date>.txt`). If the console window has closed, open the latest log file.

## The service closes immediately after starting

**Log shows:**

```text title="Log (console or file)"
Licence file not found at expected path: "C:\Users\<you>\AppData\Roaming/McLaren Applied Technologies/Licence.lic"
```

or

```text title="Log (console or file)"
Failed to read licence file
```

**Cause:** vTAG Service checks for a licence at startup and stops if it can't find or read one.

**Fix:** open **Licence Manager** from the Start Menu and import a valid `.lic` file that includes vTAG Server. Then start vTAG Service again.

## The model doesn't start: licence check failed

**Symptom:** after programming, the model doesn't run, and System Monitor or the log reports `BIOS-8260: Licence check failed` with code `0004`.

**Log may also show:**

```text title="Log (console or file)"
Could not preload licence libraries from "<folder>": ... The vTAG BIOS licence check will rely on an ATLAS 9 install.
```

**Cause:** older vTAG BIOS builds need `AtlasCoreA.dll`, `SysMonCoreA.dll` and `OCSCoreA.dll` to check the licence. The installer puts these in the installation folder. If they are missing, or `VTagClient.LicenceLibrariesDirectory` points somewhere else, the check fails, even with a valid licence.

**Fix:** remove `LicenceLibrariesDirectory` from `AppConfig.json` (or leave it empty) so the installation folder is used. If the files are missing from `C:\Program Files (x86)\Motion Applied\MA.DataPlatforms.vTAGService`, reinstall vTAG Service.

## The service starts but never subscribes to the broker

**Log shows:**

```text title="Log (console or file)"
vTAG not running at startup (state ...) — deferring discovery until it reaches Running
```

and no `Parameter discovery complete` line follows.

**Cause:** no model has been programmed onto vTAG Service yet, or programming hasn't finished.

**Fix:** program your vTAG application with System Monitor (see [Getting Started](getting-started.md#6-program-your-model-with-system-monitor)). When programming completes, the log shows `Parameter discovery complete` and then `Successfully subscribed to Support Library`.

## System Monitor can't connect to vTAG Service

**Cause:** System Monitor is connecting to a different address from the one in `VTagClient.BindIpAddress`. The default is `127.0.0.1`, which is only reachable from the same PC.

**Fix:** connect System Monitor to the address in `BindIpAddress`. To program from another PC, see [Program vTAG Service from another PC](configuration-guide.md#program-vtag-service-from-another-pc).

## No output session appears

**Symptom:** the log shows `Successfully subscribed to Support Library`, but no vTAG output session appears when you stream data.

Work through these checks:

1. **Data source.** `VTagHost.DataSource` must match the data source your input session is published to. See [Read input data from a different data source](configuration-guide.md#read-input-data-from-a-different-data-source).
2. **Broker settings.** `StreamApiConfig.BrokerUrl`, `Domain` and `StreamCreationStrategy` must match those of the producer that publishes the input data. See [Connect to a broker on another machine](configuration-guide.md#connect-to-a-broker-on-another-machine).
3. **Input parameters.** The input session must contain the parameters that your model reads. vTAG Service matches them by parameter name, whichever application group they are in.
4. **Viewer settings.** If you are viewing the outputs in ATLAS, check that the Stream Recorder's Stream Server Configuration uses the same broker, Domain and Stream Creation Strategy.

If the log shows `Support Library rejected model subscription`, vTAG Service couldn't subscribe the model. Check the lines just before it for the reason, then restart vTAG Service.

## Some model outputs are missing or wrong

| Log message | What it means |
|---|---|
| `Slot <n>: Duplicate output param '"<name>"' at DLL indices ... — using last` | Your application has two outputs with the same name. Only the last one is published. Rename one of them in your model. |
| `Source param '"<name>"' has unsupported sample mode <mode> — defaulting to Mean` | vTAG Service supports only the Minimum, Maximum and Mean sample modes for inputs. Other modes are treated as Mean. Change the sample mode in your model if you need different behaviour. |

## Processing slows down when the window is hidden

**Log shows:**

```text title="Log (console or file)"
Failed to disable execution speed throttling. The vTAG Service may be throttled by Windows.
```

or

```text title="Log (console or file)"
Failed to disable timer-resolution throttling. Stepping may slow down when the window is covered.
```

**Cause:** vTAG Service normally stops Windows from slowing it down when its window is covered or minimised. These messages mean Windows didn't allow this.

**Fix:** keep the vTAG Service console window visible while it is processing data.

## The service stops when I close the window

vTAG Service runs as a console application. Closing its window stops it. Keep the window open, or minimise it, while you need the service.
