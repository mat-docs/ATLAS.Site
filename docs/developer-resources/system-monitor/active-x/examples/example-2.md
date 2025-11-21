# Getting and Setting the Value of a Scalar Editable Parameter

```
'Declare globally available SM API.
Dim SmApi As Object

Sub Main
    'Get access to System Monitor API
    Set SmApi = CreateObject("System Monitor API")
    
    'Param to retrieve
    Dim szIdent As String
    szIdent = "BiosAC_Hiside1ScaledUpper"
    
    'Current value
    Dim dValue As Double
    
    'Error return code
    Dim lErr As Long
    
    'Get current value of param
    lErr = SmApi.GetValueScalar(0, szIdent, dValue)
    Debug.Print szIdent
    Debug.Print " = "
    Debug.Print dValue
    
    'Add on 10% and set value
    dValue = dValue + (dValue / 10)
    Debug.Print "Adding 10% to "
    Debug.Print szIdent
    lErr = SmApi.SetValueScalar(0, szIdent, dValue)
    
    'Get current value
    lErr = SmApi.GetValueScalar(0, szIdent, dValue)
    Debug.Print szIdent
    Debug.Print " = "
    Debug.Print dValue
    
    'Pause to let user see result
    Wait 10
    
    'You must free the SM Api before running another script
    Set SmApi = Nothing
End Sub
```

### Sample Output

```
BiosAC_Hiside1ScaledUpper = 2.64
Adding 10% to BiosAC_Hiside1ScaledUpper
BiosAC_Hiside1ScaledUpper = 2.904
```