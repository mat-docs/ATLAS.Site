# NuGet Packages Feed Setup

First, [Create a Personal Access Token (PAT)](https://github.com/settings/tokens/new) including the _read:packages_ scope.  
You'll need a free [GitHub account](https://github.com/signup).

Copy the token for reference. It will look something like:

    ghp_yLKCoOLozKbaErgl4mCLDtkEKFw6Uq4D3Yyx

=== "Visual Studio"

    Select _Tools &gt; NuGet Package Manager &gt; Package Manager Settings &gt; Package Sources_
    
    Click the <span style="border: 1px solid #777; padding: 2px">➕</span> icon, and fill in:

    _Name:_ McLaren Applied GitHub Packages  
    _Source:_ https://nuget.pkg.github.com/mat-docs/index.json

    ![NuGet Sources dialog](assets/vs-nuget-sources.png)

    Click _Update_ to save the changes.

    When prompted for credentials, enter your GitHub username and PAT:

    ![Credentials dialog](assets/credentials-dialog.png){ style="background-color: white; border: 1px solid #282829; padding-top: 4px" }

=== "Command Line"

    From the terminal, replacing `"your_username"` and `"your_pat"`:

        nuget sources Add -Name "McLaren Applied GitHub Packages" -Username "your_username" -Password "your_pat" -Source "https://nuget.pkg.github.com/mat-docs/index.json" 

    or:

        dotnet nuget add source --name "McLaren Applied GitHub Packages" --username "your_username" --password "your_pat" "https://nuget.pkg.github.com/mat-docs/index.json"

=== "Adding to NuGet.Config"

    In scripted environments, it can be convenient to add the PAT to a _NuGet.Config_ file.

    !!! caution
    
        Do not commit credentials into source control.

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <configuration>
    <packageSources>
        <add key="McLarenApplied" value="https://nuget.pkg.github.com/mat-docs/index.json" />
        <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
    </packageSources>
    <!-- DO NOT ADD THIS INTO SOURCE CONTROL -->
    <packageSourceCredentials>
        <McLarenApplied>
            <add key="Username" value="your_username" />
            <add key="ClearTextPassword" value="your_pat" />
        </MAT>
    </packageSourceCredentials>
    </configuration>
    ```

    To add this `#!xml <packageSourceCredentials>` section from an _Azure DevOps_ YAML build:

    ```yaml
    steps:
    - task: NuGetToolInstaller@1
        inputs:
        versionSpec: "5.8.0"
    - task: DotNetCoreCLI@2
        displayName: "dotnet nuget update source (authenticate)"
        inputs:
        command: custom
        custom: nuget
        arguments: update source McLarenApplied --username "your_username" --password "your_pat" --store-password-in-clear-text --configfile NuGet.Config
        verbosity: "Normal"
    ```
