# Working with Display Properties

Display properties can be edited within the properties window and/or persisted to the workbook.

## Adding a display property to the _View Model_

Add a private backer

```c#
private Type propertyName;
```

!!! note

    For properties persisted to the workbook, `Type` must be serializable to JSON.

Add a public Property (with getter and setter) to update property backer

```c#
public Type PropertyName
{
    get => this.propertyName;
    set => this.SetProperty(ref this.propertyName, value);
}
```
!!! note

    If there are additional side effects when a property value has changed, e.g. to indicate that calculated properties may need updating, modify setter accordingly

    ```c#
    set
    {
        if (this.SetProperty(ref this.propertyName, value))
        {
            this.OnPropertyChanged(nameof(this.OtherPropertyName);
        }
    }
    ```
    
    Use `OnPropertyChanged` to inform WPF that a property may have changed (make sure to use `nameof()` as a safe way to specify a property name).
    
## Expose _View Model_ properties so they can be edited within the properties window

Public properties will by default appear within the properties window.

!!! attention

    It is important to always review the properties window after significant changes to the _View Model_ to ensure only required properties are visible.
    
    Decorate properties with `[Browsable(false)]` to exclude unwanted properties from the properties Window, see [below](#optional-display-property-attributes).

## Persist display properties to and from the workbook

Update the getter to read the property value from the Workbook (passing an appropriate default for new workbooks)

```c#
get => this.propertyName = this.ReadProperty(defaultValue);
```

Update the setter to save the property to the workbook when the property value has changed

```c#
set
{
   if (this.SetProperty(ref this.propertyName, value))
   {
      this.SaveProperty(value);
   }
}
```
## Optional Display Property Attributes

Decorate display properties with _Attributes_ to configure how they are displayed within the properties window

- `[Category(title)]`
    - To specify a category to group similar properties together
- `[DisplayName(name)]`
    - To specify the display name of the property (otherwise the C# property name is used)
- `[Description(description)]`
    - To specific the property description that appears in the section at the bottom of the properties window
- `[Display(Order=n)]`
    - To specify the order of properties (lowest value are first)
- `[Browsable(state)]`
    - To specify whether a public property should be included within the properties window (`true` – implicit default) or excluded (`false` – set explicitly) from the properties window

!!! note

    Add a reference to `System.ComponentModel.DataAnnotations` as required
