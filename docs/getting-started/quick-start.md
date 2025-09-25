# Getting started

## Launching ATLAS

To start ATLAS, if installed in the default location:

* Click Start > All Programs > McLaren Applied Technologies> ATLAS

A new Workbook is opened with a single empty Page by default.

![ATLAS Workbook](assets/intro.png)

## Adding a Licence

Use the Licence Manager utility to display and modify licence information. Licence codes may be added after ATLAS has been installed.
The default location on the Start menu is: All Programs > McLaren Applied Technologies >  Licence Manager.

![Licence Manager](assets/licence_manager.png)

## Using ATLAS

The Main Window of ATLAS is displayed when you start the program and open a Workbook. It is highly customisable but has a number of key features by default as shown below.

![Main Window](assets/main-window.png)

### [Workbooks and Pages](../key-functionality/visualise/atlas/system-operation/workbook.md) 

Workbooks in ATLAS define the layout and positioning of elements on the screen. Each Workbook contains one or more Pages, and each Page can host multiple Displays. Workbooks are saved as `.wbkx` files, which store the formatting, size, and position of Displays, allowing users to create customized workspaces.

!!! note
    Data files such as Compare Sets, Session data, Bit Config Files, Functions files, Alarm Files, Circuit Display Definition files, SurfaceMap Display Definition files, and PCU Dash Display RAW CAN files are not stored in `.wbkx` files but are automatically opened by the Workbook. If these files are unavailable, Displays will appear empty.

When ATLAS starts or a new Workbook is opened, it includes one Page by default. Users can select only one Page at a time, but multiple Pages can be viewed by floating and arranging them within a Workbook. Each Display on a Page can show data from different Compare Sets.

The Page Bar, located at the top of the Main Window, displays tabs for each Page in the Workbook. If there are too many tabs to fit, horizontal scroll arrows appear. Pages can be selected by clicking on a tab or using the Page Up/Page Down keys.

Right-clicking a Page tab opens a menu with options to:

- **Set:** Switch or remove the Compare Set associated with the Page. Each Set is color-coded.
- **No Association:** Remove the link to the current Compare Set.
- **Lock to Current Association:** Lock the Page to the current Compare Set.
- **Title:** Edit the Page name.
- **Page Colour:** Underline the tab with a selected color.
- **New:** Add a new Page.
- **Paste:** Paste a copied Display to the Page.
- **Import Display:** Import a saved Display to the Page.
- **Duplicate:** Duplicate the Page and its Displays within the Workbook.
- **Export:** Export the Page for use in other Workbooks.
- **Close:** Close the Page tab.
- **Close Others:** Close all other Page tabs.
- **Close Tab Group:** Close all Pages.
- **Float:** Float the Page into a movable window.
- **Float Page Group:** Float the Page Group into a movable window.
- **Pin Tab:** Toggle the pin status of the tab.
- **New Horizontal Tab Group:** Add a horizontal Page tab group.
- **New Vertical Tab Group:** Add a vertical Page tab group.

### [Sessions](../key-functionality/visualise/atlas/handling-data/sessions/index.md)

Use the Session Browser (*CTRL + L*) to record a new session or load an existing one. The Session Browser allows you to define different sets of data to use across the Workbook. Sessions, either Live or Historical, may be combined into a single set using Compare or Append mode.

Add historical data to the set from the Sources tab or directly from files. The preview pane displays detailed session information to help identify the session you need.

Access live data via Recorders. A Recorder streams raw telemetry data, and several types are available depending on the data source, protocol, and system architecture.

![Session Browser](assets/session_browser.png)

### [Displays](../key-functionality/visualise/atlas/displays/index.md)
Once data has been added, begin building your Workbook by adding Displays to Pages. Multiple types of Displays are available, each of which can be customised to meet specific requirements. Displays may be docked in various layouts to optimise visibility across the Workbook.

For detailed information on types of Displays, shortcuts and different display options refer to the embedded documentation: Help > View Help (Preview) (*F1*).

### [Parameters](../key-functionality/visualise/atlas/handling-data/parameters/index.md)
Use the Parameter Browser (*P*) to select one or more parameters to display. Double-click a parameter or drag and drop it onto the Display. To remove a parameter, click on it and press *DELETE*.

Once parameters are visible in the Display, customise the visual presentation using the Display Properties (*D*) panel. Key display options are also available by right-clicking anywhere on the Display.

![Workbook Example](assets/final_workbook.png)