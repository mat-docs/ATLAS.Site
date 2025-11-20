
## `TimeBaseServiceClient` Class

The `TimeBaseServiceClient` class is  used to interact with time-based automation services. It provides a rich set of methods for manipulating time bases and cursors in ATLAS. Both the cursor and the TimeBase can be adjusted, set and retrieved. 

!!! info "Understanding the TimeBase in ATLAS"
    The **TimeBase** defines the time range that ATLAS will display on screen. 

    You can adjust the TimeBase to:
    - **Zoom in** on a specific time range
    - **Zoom out** to view a broader segment
    - **Display a complete lap** or the entire session

    To set the full session TimeBase, use `Session.StartTime` and `Session.EndTime` with the `SetTimeBase` method.



### Time Base Manipulation

<figure markdown="span">
  ![Image title](TimeBase.png){ width="800" }
  <figcaption>ATLAS TimeBase</figcaption>
</figure>


- **`SetTimeBase(ObjectId, Int64, Int64)`**  
  Sets the time base using start and end ticks.

- **`SetTimeBaseByLap(ObjectId, Int16)`**  
  Sets the time base to a specific lap.

- **`SetTimeBaseByLaps(ObjectId, Int16, Int16)`**  
  Sets the time base between two laps.

- **`SetTimeBaseFastestLap(ObjectId)`**  
  Sets the time base to the fastest lap.

- **`SetTimeBaseVba(ObjectId, Double, Double)`**  
  Sets the time base using VBA (Virtual Best Average) values.

### Cursor Control

- **`SetCursor(ObjectId, Int64)`**  
  Sets the cursor to a specific tick.

- **`SetCursorToDistance(ObjectId, Double)`**  
  Sets the cursor to a specific distance.

- **`SetCursorToDistanceIntoLap(ObjectId, Double, Int16)`**  
  Sets the cursor to a distance into a specific lap.

- **`SetCursorVba(ObjectId, Double)`**  
  Sets the cursor using a VBA value.

### Time Base Retrieval

- **`GetTimeBase(ObjectId)`**  
  Retrieves the current time base for the specified object.

## Usage Example

### Setting ATLAS Cursor Point
The ATLAS cursor point can be set to a specific timestamp or Distance using the methods below.

=== "C#"

    ``` csharp
        var timebase = sessionServiceClient.GetSessionTimeBase(session.Id);
        var timebaseService = new TimeBaseServiceClient(timebase.Id);

        timebaseService.SetCursor(timebase.Id, session.StartTime);
        timebaseService.SetCursorToDistance(timebase.Id, 1500.5);
        timebaseService.SetCursorToDistanceIntoLap(timebase.Id, 300.0, 2);
        timebaseService.SetCursorVba(timebase.Id, 12.5);
    ```

=== "Python"

    ``` python
        timebase = sessionServiceClient.GetSessionTimeBase(session.Id)
        timebaseService = TimeBaseServiceClient(timebase.Id)

        timebaseService.SetCursor(timebase.Id, session.StartTime)
        timebaseService.SetCursorToDistance(timebase.Id, 1500.5)
        timebaseService.SetCursorToDistanceIntoLap(timebase.Id, 300.0, 2)
        timebaseService.SetCursorVba(timebase.Id, 12.5)

    ```

=== "MATLAB"

    ``` matlab
        timebase = GetSessionTimeBase(session.Id);
        timebaseService = TimeBaseServiceClient(timebase.Id);

        SetCursor(timebase.Id, session.StartTime);
        SetCursorToDistance(timebase.Id, 1500.5);
        SetCursorToDistanceIntoLap(timebase.Id, 300.0, 2);
        SetCursorVba(timebase.Id, 12.5);

    ```

### Setting ATLAS TimeBase

ATLAS TimeBase can be adjusted using the methods below.


=== "C#"

    ``` csharp
        var timebase = sessionServiceClient.GetSessionTimeBase(session.Id);
        var timebaseService = new TimeBaseServiceClient(timebase.Id);

        timebaseService.SetTimeBase(timebase.Id, 1000000, 2000000);
        timebaseService.SetTimeBaseByLap(timebase.Id, 3);
        timebaseService.SetTimeBaseByLaps(timebase.Id, 2, 5);
        timebaseService.SetTimeBaseFastestLap(timebase.Id);
        timebaseService.SetTimeBaseVba(timebase.Id, 12.5, 45.3);

    ```

=== "Python"

    ``` python
        timebase = sessionServiceClient.GetSessionTimeBase(session.Id)
        timebaseService = TimeBaseServiceClient(timebase.Id)

        timebaseService.SetTimeBase(timebase.Id, 1000000, 2000000)
        timebaseService.SetTimeBaseByLap(timebase.Id, 3)
        timebaseService.SetTimeBaseByLaps(timebase.Id, 2, 5)
        timebaseService.SetTimeBaseFastestLap(timebase.Id)
        timebaseService.SetTimeBaseVba(timebase.Id, 12.5, 45.3)


    ```

=== "MATLAB"

    ``` matlab
        timebase = GetSessionTimeBase(session.Id);
        timebaseService = TimeBaseServiceClient(timebase.Id);

        SetTimeBase(timebase.Id, 1000000, 2000000);
        SetTimeBaseByLap(timebase.Id, 3);
        SetTimeBaseByLaps(timebase.Id, 2, 5);
        SetTimeBaseFastestLap(timebase.Id);
        SetTimeBaseVba(timebase.Id, 12.5, 45.3);

    ```