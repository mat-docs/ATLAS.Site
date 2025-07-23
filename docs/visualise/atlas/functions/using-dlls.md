## 🧩 Advanced: Using DLLs

For complex logic, you can write functions in **.NET languages** like C# and import them as DLLs.

### Key Requirements

- Implement `IDotNetFunction` interface.
- Place DLLs in:  
  `%USERPROFILE%\Documents\McLaren Electronic Systems\SQL Race\Functions`
- Restart ATLAS to register.

---

## 🧷 Constants

Constants are reusable values defined outside functions.

- Stored in `default_constants.txt`
- Managed via the **Constants Editor**
- Types: **Default (global)** and **Session-specific**

Use them to avoid hardcoding values like gear ratios, thresholds, or vehicle dimensions.

---

## 🧪 Testing & Debugging

### Building Functions

- Press `F6` or click **Build Function**.
- Errors appear in the **Build Output** panel.

### Refreshing Calculated Parameters

- Go to `Tools > Refresh Calculated Parameters`.
- Choose **Workbook** or **Page** scope.
- ⚠️ Avoid full refreshes on live data to reduce CPU load.

---

## 🧠 Best Practices

- Use **Fixed Frequency** mode for digital filters.
- Use **comments** (`/* ... */`) to document logic.
- Use **SessionMean()**, **LapMax()**, etc. for performance analytics.
- Avoid overloading live sessions with too many functions.

---

## 📎 Related Tools

### How Functions Integrate with the ATLAS Suite

| Feature               | Integration                                                                 |
|----------------------|------------------------------------------------------------------------------|
| **Parameter Browser**| Functions appear as parameters and can be added to displays.                |
| **System Monitor**   | Use to monitor performance impact of complex or high-frequency functions.   |
| **vTAG**             | Tag function outputs for tracking across sessions.                          |
| **Constants Editor** | Define constants used in functions globally or per session.                 |
| **Refresh Calculated Parameters** | Re-evaluates functions across the workbook or page. Avoid full refreshes on live data to reduce CPU load. |
