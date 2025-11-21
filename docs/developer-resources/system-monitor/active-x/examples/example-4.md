# Manipulating the Values in a 1-Axis Map

```
'Declare globally available SM API.
Dim SmApi As Object

Sub Main
    'Get access to System Monitor API
    Set SmApi = CreateObject("System Monitor API")
    'Param to retrieve
    Dim szIdent As String
    'Error return code
    Dim lErr As Long
    'Variables which are to receive map values must be declared as Variants.
    'This is because SM needs to dynamically allocate and dimension the array.
    Dim adValue As Variant

    'Get current values of 1-axis map
    szIdent = "EC_1147"
    lErr = SmApi.GetValue1AxisMap(0, szIdent, adValue)
    PrintIdent(szIdent, lErr)
    PrintArray(adValue)

    'Declare array to be passed into SM-V7 to set map value.
    'These must be declared as arrays in order that SM-V7 can extract array dimensions, values, etc
    Dim adValueSet() As Double

    'Copy returned values to values we're going to set, and add 10% to all breakpoints
    'excluding the first, second and last
    adValueSet = adValue
    For i = 2 To (UBound(adValueSet) - 1)
        adValueSet(i) = adValue(i) + adValue(i) / 10
    Next i

    'Set map values
    lErr = SmApi.SetValue1AxisMap(0, szIdent, adValueSet)

    'Get current values of 1-axis map and print
    lErr = SmApi.GetValue1AxisMap(0, szIdent, adValue)
    PrintIdent(szIdent, lErr)
    PrintArray(adValue)

    'Pause to let user see result
    Wait 100

    'You must free the SM Api before running another script
    Set SmApi = Nothing
End Sub

Function PrintArray(adValue)
    'Print out current values. You can use UBound to find number of axis points
    For i = 0 To UBound(adValue)
        Debug.Print adValue(i);
        Debug.Print " ";
    Next i
    Debug.Print 'New line
End Function

Function PrintIdent(szIdent, lErr)
    Debug.Print "ID = "; 'New line
    Debug.Print szIdent; 'Parameter Identifier
    Debug.Print ", Error = ";
    Debug.Print lErr
End Function
```

### Sample Output
```
ID = EC_1147, Error = 0
5.00435660800002 4.00458547200003 3.63104460800002 2.20280012799998 1.10415052799999 5.50092800000357E 03 2.19179827199997 3.99358361600002

ID = EC_1147, Error = 0
5.00435660800002 4.00458547200003 3.99359897599999 2.422530048 1.21401548800003 5.50092800000357E 03 2.41152819199999 3.99358361600002
```