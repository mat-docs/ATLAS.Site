# Web Browser Troubleshooting

This page helps you fix problems with the [Web Browser display](web.md) when it shows an error or a page does not load.

When the browser cannot be used, the display shows **The Web Browser display cannot show web pages**, explains what went wrong, and shows the same problem on the ATLAS status bar. Two buttons are available:

- **Retry** recreates the browser without restarting ATLAS.
- **Copy details** copies the error and diagnostic information to the clipboard. Send this to support. It includes the WebView2 Runtime version, the minimum version needed, the browser data folder, the Windows version and the exception, if there was one.

## Find your problem

| What the display says | Go to |
|---|---|
| The Microsoft Edge WebView2 Runtime is not installed | [Runtime not installed](#runtime-not-installed) |
| This computer has version X of the runtime, but version Y or later is needed | [Runtime too old](#runtime-too-old) |
| WebView2Loader.dll is missing or damaged | [WebView2Loader.dll missing or damaged](#webview2loaderdll-missing-or-damaged) |
| Could not write to its data folder | [Cannot write to the data folder](#cannot-write-to-the-data-folder) |
| The runtime could not start | [The runtime could not start](#the-runtime-could-not-start) |
| The browser engine stopped unexpectedly | [The browser engine stopped](#the-browser-engine-stopped) |
| The page keeps stopping unexpectedly | [The page keeps stopping](#the-page-keeps-stopping) |
| Status bar: URL was not correctly formed, or could not load a page | [A page does not load](#a-page-does-not-load) |

## Runtime not installed

**Symptom:** The display says the Microsoft Edge WebView2 Runtime is not installed on this computer.

**Cause:** The ATLAS installer does not install the runtime. Windows 11 includes it, but some Windows 10 computers and some managed computers do not.

**Fix:**

1. Install the Evergreen WebView2 Runtime (x64) from the [Microsoft WebView2 page](https://developer.microsoft.com/microsoft-edge/webview2/), or ask your IT team to install it. An offline installer is available for computers without internet access.
2. Click **Retry**. You do not need to restart ATLAS.

!!! note "Installer warning"
    The ATLAS installer's system checks include a Microsoft Edge WebView2 Runtime check. It warns when the runtime is missing, and has a **Click for info** button that opens the Microsoft page. It never stops ATLAS installing.

!!! tip "Fixed version runtime"
    If your IT team provide a fixed version of the runtime through the `BrowserExecutableFolder` WebView2 policy (for ATLAS as `MAT.ATLAS.Host.exe`, or for all applications with `*`), the installer check recognises it. If the policy points at a folder that does not exist, the check warns and the display will not work until the folder is corrected.

## Runtime too old

**Symptom:** The display says the computer has one version of the runtime but the Web Browser display needs a later one.

**Cause:** The display needs version 109.0.1518.78 or later. The normal Evergreen runtime updates itself, so this usually means your IT team have pinned an older version.

**Fix:** Ask your IT team to update the runtime, or to remove any policy that keeps it on an older version. Then click **Retry**.

## WebView2Loader.dll missing or damaged

**Symptom:** The display says `WebView2Loader.dll` is missing or damaged in the ATLAS installation folder.

**Fix:** Repair or reinstall ATLAS, then restart ATLAS.

## Cannot write to the data folder

**Symptom:** The display says it could not write to its data folder and shows the folder path.

**Cause:** The browser stores its profile (cookies, logins and cache) in `%LOCALAPPDATA%\McLaren Applied Technologies\ATLAS 10\WebView2`, and your Windows account cannot write there.

**Fix:** Check that your Windows account can write to the folder shown, then click **Retry**.

## The runtime could not start

**Symptom:** The display says the Microsoft Edge WebView2 Runtime could not start, followed by an error code.

**Fix:**

1. If your organisation restricts WebView2 through policy, ask your IT team to allow it for ATLAS.
2. Ask your IT team to repair the runtime.
3. Close ATLAS and delete the browser data folder shown in the message, then start ATLAS again. This clears saved cookies and logins for every Web Browser display.
4. If the problem continues, click **Copy details** and send the result to support.

## The browser engine stopped

**Symptom:** The display says the browser engine stopped unexpectedly.

**Fix:** Click **Retry** to restart the browser.

## The page keeps stopping

**Symptom:** The display says the page stopped unexpectedly again soon after it was reloaded.

**Cause:** When a page stops, ATLAS reloads it once. If it stops again within a minute, ATLAS does not reload it again, so that it does not reload for ever. Pages can do this when they run out of memory or hit a graphics driver problem.

**Fix:** Click **Retry** to load the page again. If it keeps happening, click **Copy details** and send the result to support.

Two related messages appear on the status bar only. **The page stopped unexpectedly and is being reloaded** needs no action. For **The page is not responding. Click Refresh to reload it**, click **Refresh** in the header bar.

## A page does not load

**Symptom:** The status bar says **The URL was not correctly formed or could not be found**, or **Could not load** an address followed by a reason.

**Fix:**

- Check the address. You can type a web address with or without `http://`, or the path to a local or network file. A relative file path does not work.
- For more detail, see the ATLAS log file. The log folder and level of detail are set in [Options](../system-operation/options.md).

## Snapshot to image file fails

If the status bar says **Error generating Snapshot Image**, the capture failed, for example because the display is minimised or off screen, or the file is locked. Make the display visible and try again. The log file has the details.
