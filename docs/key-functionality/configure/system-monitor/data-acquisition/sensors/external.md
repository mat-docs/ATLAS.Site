# External Inputs Configuration

The External Inputs Configuration tool is used to configure sensor inputs that are not defined in the Program Version. It also supports sensors connected via communication links such as TAG Sensor Bus or CAN.

## Access

To open the tool:

1. Navigate to: Sensors > External Inputs Configuration
2. If unavailable, create a new External Inputs Configuration file via File > New

## Configuration Workflow

To configure a DATALab system, follow these steps:

### 1. Select Input Source

Choose one of the following:

* TAG Sensor Bus
* CAN Link
* Unit Sensors

### 2. Select Bus

1. Expand the TAG Sensor Bus item
2. Choose the bus or loom
3. Select sensor node type:
    * None
    * SN-6
    * SN-32
4. Click Apply

### 3. Select Node

1. Choose a node from the tree
2. Enter its serial number (hardware-defined)
3. Select node type
4. Set timer resolution (default: 400ns)
5. Click Apply

### 4. Add Sensors

1. Expand the node or Unit Sensors
2. Select a location
3. Choose sensor type (filtered by location compatibility)
4. Assign serial number (for software-calibrated sensors)
5. Enter parameter name and description
6. Configure properties as needed
7. Click OK to confirm

!!! note
    A Measurement Parameter is created for each sensor added.

## SN-6 Interface Cards

Before adding sensors to an SN-6 node, an interface card must be selected:

1. Expand the node and interface card
2. Configure Input 1 and optionally Input 2
3. Sensor type must be compatible with the card
4. System Monitor applies restrictions based on card type

## Drag and Drop

After initial setup, items can be rearranged using drag-and-drop:

* Nodes
* Interface Cards
* Individual Sensors

Items can be dropped into the Spare Items Pool for temporary storage or alternative configurations.

## Speed Sensor Scaling

Speed sensors (Hall effect or inductive) require scaling to convert pulse signals into meaningful values.

### Access

Click Advanced when adding a speed sensor to open the Revs Scaling dialog.

### Configuration Options

#### Output Units

* MPH (default)
* KPH
* RPM
* Hz
* µSecs

#### Wheel Radius / Circumference

* Enter one to auto-calculate the other
* Required for MPH, KPH, RPM

#### Number of Teeth

* Required for all units except Hz and µSecs

#### Edge Trigger

* Positive Edge (default)
* Negative Edge

#### Timer

* Select from available timers (default: Timer 0)

#### Max Speed

* Optional nominal value

#### Accuracy and Cut-Off

* Calculated automatically if Max Speed is set