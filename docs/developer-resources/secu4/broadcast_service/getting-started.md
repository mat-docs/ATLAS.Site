# Getting Started

This walks through running a first Broadcast Service instance with the smallest config that
starts successfully, and confirming it's forwarding data.

Pick the tab for how you want to run it — each one is self-contained.

=== "dotnet run"

    **Prerequisites**

    - .NET 8.0 runtime available on the machine.
    - At least one reachable downstream Bridge endpoint.
    - An upstream source such as ADS or another Broadcast Service to
      point at the feed port once Broadcast Service is running.

    **Minimal config**

    Save this next to the host executable as `Configs/AppConfig.json` (or point
    `CONFIG_FILE_PATH` at it):

    ```json title="AppConfig.json" linenums="1"
    {
      "BroadcastConfig": {
        "FeedPort": 9697,
        "MetricPort": 10010,
        "Wal": {
          "Directory": "./wal"
        },
        "Targets": {
          "BridgeConfigs": [
            {
              "Name": "downstream-bridge",
              "Host": "downstream-host",
              "Port": 9697
            }
          ]
        }
      }
    }
    ```

    This configures the inbound feed port, the metrics port, the WAL directory, and a single
    Bridge target to forward to. `Targets.BridgeConfigs` needs at least one entry — Broadcast
    Service won't start with zero targets configured.

    **Start it**

    ```bash
    dotnet run MA.DataPlatforms.Bridge.Broadcast.Host.exe
    ```

    **Confirm it's working**

    Open `http://localhost:10010/metrics` (using the `MetricPort` from your config) and look for
    the `broadcast_target_up` gauge with a `target` label matching your target's name — it reads
    `1` once that target has connected successfully. Point your upstream source at the feed port
    (`9697` by default) and confirm `broadcast_ingest_total` is increasing as records arrive.

    **First-run problems**

    - **Startup fails with `Invalid broadcast configuration: ...`** — configuration validation
      failed. The message lists every problem found, joined together. Common causes: `FeedPort`
      outside 1-65535, no targets configured, two targets with the same name, or a target missing
      `Host`.
    - **Feed port already in use** — if another process (including a second Broadcast Service
      instance) is already bound to `FeedPort`, startup fails. Pick a different `FeedPort` or
      stop the conflicting process.
    - **WAL directory not writable** — if the process account can't create or write files under
      `Wal.Directory`, the service can't persist incoming records. Check the path exists and is
      writable by whichever account is running the process.

=== "Docker"

    **Prerequisites**

    - Docker (or a compatible container runtime).
    - At least one reachable downstream Bridge endpoint.
    - An upstream source such as ADS or another Broadcast Service to
      point at the feed port once Broadcast Service is running.

    **Minimal config**

    No config file is baked into the image. Mount one in, or supply the same values as
    environment variables. As a file, mounted at (for example) `/config/AppConfig.json`:

    ```json title="AppConfig.json" linenums="1"
    {
      "BroadcastConfig": {
        "FeedPort": 9697,
        "MetricPort": 10010,
        "Wal": {
          "Directory": "/data/wal"
        },
        "Targets": {
          "BridgeConfigs": [
            {
              "Name": "downstream-bridge",
              "Host": "downstream-host",
              "Port": 9697
            }
          ]
        }
      }
    }
    ```

    !!! warning "Mount a volume for the WAL directory"
        Mount a volume at whatever path you set `Wal.Directory` to — `/data/wal` in the example
        above. If that path isn't backed by a mounted volume, the WAL — and everything not yet
        replayed to every target — is lost when the container is recreated.

    **Start it**

    ```bash
    docker run \
      -p 9697:9697 -p 10010:10010 \
      -e CONFIG_FILE_PATH=/config/AppConfig.json \
      -v /host/path/config:/config \
      -v /host/path/wal:/data/wal \
      atlasplatformdocker/broadcast-service-host:latest
    ```

    **Confirm it's working**

    Open `http://localhost:10010/metrics` on the host (mapped from the container's `MetricPort`)
    and look for the `broadcast_target_up` gauge with a `target` label matching your target's
    name — it reads `1` once that target has connected successfully.

    **First-run problems**

    - **Startup fails with `Invalid broadcast configuration: ...`** — same validation as above:
      check `FeedPort` range, that at least one target is configured, target names are unique,
      and required target fields (`Host`/`Port`) are set.
    - **Feed port already in use** — make sure the host port you mapped to 9697 isn't already
      taken by another container or process.
    - **WAL directory not writable / disappears on restart** — if `/data/wal` (or wherever
      `Wal.Directory` points) isn't backed by a mounted volume, or the mount isn't writable by
      the container's process, the service can't persist records, or loses everything on
      container recreation.
