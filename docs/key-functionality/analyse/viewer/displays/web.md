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

When the browser cannot be used, the display shows **The Web Browser display cannot show web pages**, explains what went wrong, and shows the same problem on the ATLAS status bar. Two buttons are available:

- **Retry** recreates the browser without restarting ATLAS.
- **Copy details** copies the error and diagnostic information to the clipboard. Send this to support. It includes the WebView2 Runtime version, the minimum version needed, the browser data folder, the Windows version and the exception, if there was one.

Find what the display says below.

??? failure "The Microsoft Edge WebView2 Runtime is not installed"

    **Cause:** The ATLAS installer does not install the runtime. Windows 11 includes it, but some Windows 10 computers and some managed computers do not.

    **Fix:** Install the runtime as described in [Requirements](#requirements), then click **Retry**.

    The ATLAS installer's system checks include a Microsoft Edge WebView2 Runtime check. It warns when the runtime is missing and has a **Click for info** button that opens the Microsoft page. It never stops ATLAS installing.

    If your IT team provide a fixed version of the runtime through the `BrowserExecutableFolder` WebView2 policy (for ATLAS as `MAT.ATLAS.Host.exe`, or for all applications with `*`), the installer check recognises it. If the policy points at a folder that does not exist, the check warns and the display will not work until the folder is corrected.

??? failure "This computer has version X of the runtime, but version Y or later is needed"

    **Cause:** The display needs version 109.0.1518.78 or later. The normal Evergreen runtime updates itself, so this usually means your IT team have pinned an older version.

    **Fix:** Ask your IT team to update the runtime, or to remove any policy that keeps it on an older version. Then click **Retry**.

??? failure "WebView2Loader.dll is missing or damaged"

    **Fix:** Repair or reinstall ATLAS, then restart ATLAS.

??? failure "The Web Browser display could not write to its data folder"

    **Cause:** The browser stores its profile (cookies, logins and cache) in `%LOCALAPPDATA%\McLaren Applied Technologies\ATLAS 10\WebView2`, and your Windows account cannot write to the folder shown in the message.

    **Fix:** Check that your Windows account can write to the folder, then click **Retry**.

??? failure "The Microsoft Edge WebView2 Runtime could not start"

    The message ends with an error code.

    **Fix:**

    1. If your organisation restricts WebView2 through policy, ask your IT team to allow it for ATLAS.
    2. Ask your IT team to repair the runtime.
    3. Close ATLAS and delete the browser data folder shown in the message, then start ATLAS again. This clears saved cookies and logins for every Web Browser display.
    4. If the problem continues, click **Copy details** and send the result to support.

??? failure "The browser engine stopped unexpectedly"

    **Fix:** Click **Retry** to restart the browser.

??? failure "The page stopped unexpectedly again soon after it was reloaded"

    **Cause:** When a page stops, ATLAS reloads it once. If it stops again within a minute, ATLAS does not reload it again, so that it does not reload for ever. Pages can do this when they run out of memory or hit a graphics driver problem.

    **Fix:** Click **Retry** to load the page again. If it keeps happening, click **Copy details** and send the result to support.

    Two related messages appear on the status bar only. **The page stopped unexpectedly and is being reloaded** needs no action. For **The page is not responding. Click Refresh to reload it**, click **Refresh** in the header bar.

??? failure "Status bar: the URL was not correctly formed, or a page could not be loaded"

    **Fix:**

    - Check the address. You can type a web address with or without `http://`, or the path to a local or network file. A relative file path does not work.
    - For more detail, see the ATLAS log file. The log folder and level of detail are set in [Options](../system-operation/options.md).

??? failure "Status bar: error generating snapshot image"

    The capture failed, for example because the display is minimised or off screen, or the file is locked. Make the display visible and try again. The log file has the details.
