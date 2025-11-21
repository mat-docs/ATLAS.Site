# Getting Values From a 1-Axis Map, Axis, Array and 2-Axis Map

```
Dim SmApi As Object

Sub Main
    Set SmApi = CreateObject("System Monitor API")
    Dim szIdent As String
    Dim lErr As Long

    'Array to hold values must be declared with ReDim SM V7 will dynamically
    'alloc to match number of axis points. Size used here is ignored, so can be 0
    Dim adValue As Variant

    'Get current values of 1 axis map
    szIdent = "EC_1147"
    lErr = SmApi.GetValue1AxisMap(0, szIdent, adValue)
    PrintIdent(szIdent, lErr)
    PrintArray(adValue)

    'Get current values of axis
    szIdent = "EC_1145"
    lErr = SmApi.GetValueAxis(0, szIdent, adValue)
    PrintIdent(szIdent, lErr)
    PrintArray(adValue)

    'Get current values of array
    szIdent = "EG_26006"
    lErr = SmApi.GetValueArray(0, szIdent, adValue)
    PrintIdent(szIdent, lErr)
    PrintArray(adValue)

    ' 2 d Array to hold values must be declared with ReDim SM V7 will dynamically
    'alloc To match number of axis points. Size used here Is ignored, so can be 0
    Dim adValue2d As Variant

    'Get current values of 2 axis map
    szIdent = "EI_24704"
    lErr = SmApi.GetValue2AxisMap(0, szIdent, adValue2d)
    PrintIdent(szIdent, lErr)
    For i = 0 To UBound(adValue2d, 2) 'First dimension
        For j = 0 To UBound(adValue2d, 1) 'Second dimension
            Debug.Print adValue2d(j,i);
            Debug.Print " ";
        Next j
        Debug.Print
    Next i

    Wait 100
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
    Debug.Print"ID = "; 'New line
    Debug.Print szIdent; 'Parameter Identifier
    Debug.Print ", Error = ";
    Debug.Print lErr
End Function
```

### Sample Output

```
ID = EC\_1147, Error = 0

5.00435660800002 4.00458547200003 3.30144972800002 2.00504319999999 1.005272064 5.50092800000357E-03 -1.99404134399998 -3.99358361600002

ID = EC\_1145, Error = 0

-5 20 44 60 80 100 110 120

ID = EG\_26006, Error = 0

0 16000 17000 18000 19380

ID = EI\_24704, Error = 0

```

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 |
| 0 | 0 | 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 |
| 0 | 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 |
| 0 | 0.5 | 1.1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 |
| 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 |
| 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 |
| 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 |
| 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 |
| 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 |
| 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10 |