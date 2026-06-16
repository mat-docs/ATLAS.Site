# Summary Display

Lap‑based statistics for selected parameters as a table or as a plot. First columns are fixed: Lap #, Lap Name, Lap Time. For each parameter, you can add stats columns such as Min, Max, Mean, Start, End, Change, Range, Absolute Mean, Geometric Mean, Std Dev, Slope, Slope Intercept, R².

![Summary Display](assets/summary.png)

## Adding a Summary Display

To add a Summary Display to a page, use one of the following methods:

- Click the **Summary Display** button on the Display Toolbar.

- Go to **File > New > Display** and select **Summary Display**.

- Press **Ctrl + Q** twice to open the Quick Access Assistant, then select **New Summary Display**.

Once added, use the **Parameter Browser** to choose parameters and configure the display as needed.

The first three columns—**Lap #**, **Lap Name**, and **Lap Time**—are always shown. For each parameter, you can display one or more statistics over the relevant data range. Available statistics include:

- **Min**: The minimum value recorded for the parameter within the lap.
- **Max**: The maximum value recorded for the parameter within the lap.
- **Mean**: The arithmetic average of all parameter values within the lap.
- **Start**: The parameter value at the beginning of the lap.
- **End**: The parameter value at the end of the lap.
- **Change**: The difference between the end and start values of the parameter for the lap.
- **Range**: The difference between the maximum and minimum values for the parameter within the lap.
- **Absolute Mean**: The mean of the absolute values of the parameter within the lap.
- **Geometric Mean**: The geometric average of the parameter values within the lap.
- **Standard Deviation**: A measure of the variability or dispersion of the parameter values within the lap.
- **Slope**: The rate of change of the parameter values over the lap, calculated using linear regression.
- **Slope Intercept**: The intercept value from the linear regression of the parameter values over the lap.
- **Slope R Squared**: The coefficient of determination (R²) indicating how well the linear regression fits the parameter data within the lap.

You can resize columns individually, or right-click and select **Auto Resize Columns** to automatically adjust all column widths to fit the data.

To switch between table and plot views, right-click the display and select **Show As Plot** or **Show As DataGrid**.
