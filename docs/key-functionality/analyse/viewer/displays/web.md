# Web Browser Display

An embedded browser, useful for live camera feeds, weather, or other web‑based information.

The display uses the Microsoft Edge WebView2 Runtime, so pages render as they do in Microsoft Edge. See [Requirements](#requirements) before you first use it.

![Web Browser Display](assets/web.png)

## Requirements

The Web Browser display needs the Microsoft Edge WebView2 Runtime (x64, Evergreen). Windows 11 includes it, but some Windows 10 computers and some managed computers do not.

!!! note "ATLAS does not install the runtime"
    The ATLAS installer does not install or bundle the WebView2 Runtime. ATLAS installs and runs without it, and only the Web Browser display is affected. The installer's system checks show whether the runtime is present and warn if it is missing; the warning never stops ATLAS installing.

If the runtime is missing, the display tells you what to do. To fix it:

1. Download the Evergreen WebView2 Runtime (x64) from the [Microsoft WebView2 page](https://developer.microsoft.com/microsoft-edge/webview2/). An offline installer is available for computers without internet access.
2. Install it, or ask your IT team to.
3. Click **Retry** in the display. You do not need to restart ATLAS.

The runtime must be version 109.0.1518.78 or later. The Evergreen runtime updates itself, so this only matters if your IT team have pinned an older fixed version.

## Adding a Web Browser Display

To add a Web Browser Display to a Page do one of the following:

- Click the Web Browser Display button  on the Display Toolbar.
- Click `File > New > Display` and select Web Browser Display.
- Press `Ctrl + Q` twice to use the Quick Access Assistant and select New Web Browser Display.

## Using the Web Browser Display

The header bar at the top of the display has **Back**, **Forward**, **Refresh** and **Home** buttons, an address box, **Options** and **Favourites**. Type an address and press `Enter` to go to it. Press `Ctrl+Q` in the address box to search your favourites.

Right-click the display for these options:

- **Set Current Url as Home**: Makes the current page the home page.
- **Snapshot to Image File**: Saves an image of the current page.

## Home page and last visited page

The default home page is `https://docs.atlas.motionapplied.com`. It opens when a new Web Browser display is added, and when you click **Home**.

!!! warning "Existing workbooks"
    A workbook whose Web Browser display never had its home page changed opens the new default page, not the page used by earlier versions of ATLAS. To keep a different page, use **Set Current Url as Home** or set **Default URL** in Display Properties.

You can type a web address with or without `http://`, or a path to a local or network file.

All Web Browser displays share one browser profile, so cookies and logins are kept across displays and between ATLAS sessions. The profile is stored in `%LOCALAPPDATA%\McLaren Applied Technologies\ATLAS 10\WebView2`.

## Display Properties

Press `D` with the display selected to open Display Properties.

| Property | Description | Default |
|---|---|---|
| **Default URL** | The page the display opens at startup, and the page **Home** goes to | `https://docs.atlas.motionapplied.com` |
| **Open Last Visited URL** | Opens the last visited page instead of the default page when the display loads | Off |
| **Show Header Bar** | Shows or hides the header bar | On |
| **Suppress script errors** | When on, the browser's own dialog boxes (such as JavaScript alerts) are not shown | On |

## Troubleshooting

If the display shows an error instead of a web page, or a page does not load, see [Web Browser Troubleshooting](web-troubleshooting.md).
