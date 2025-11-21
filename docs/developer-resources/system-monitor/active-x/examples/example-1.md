# Using SendMessage() to send a Read RAM message to the ECU.

```
'Declare globally available SM API.
Dim SmApi As Object

Sub Main
    'Get access to System Monitor API
    Set SmApi = CreateObject("System Monitor API")
    
    'Send Message must be fixed length array, size must match desired message length
    Dim aSend(2) As Integer
    'Contents of message to send
    aSend(0) = &H0010 'COM_SM_READ_MEMORY and destination
    aSend(1) = 0      'Start address low
    aSend(2) = 0      'Start address high

    'Reply message must be declared with ReDim – SM-V7 will dynamically allocate
    'to match response size. Size used here is ignored, so can be 0

    Dim aReply(0) As Integer
    Dim vaiantReply As Variant
    variantReply = aReply
    
    'Timeout
    Dim Timeout As Integer
    Timeout = 400
    
    'Retries
    Dim wTries As Integer
    wTries = 3
    
    'Send the message
    Dim Err As Long
    Err = SmApi.SendMessageEx(App, aSend, variantReply, Timeout, wTries)

    'Print error code
    Debug.Print "Error code = ";
    Debug.Print Hex(Err)

    'Print contents of response. You can use UBound() to find size of response
    Debug.Print "Response = ";
    For i = 0 To UBound(aReply)
        Debug.Print Hex(aReply(i));
        Debug.Print ", ";
    Next i

    'Newline
    Debug.Print

    'Pause to let user see response
    Wait 10

    'You must free the SM Api before running another script
    Set SmApi = Nothing
End Sub
```