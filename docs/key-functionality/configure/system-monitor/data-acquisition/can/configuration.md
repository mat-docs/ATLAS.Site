# CAN Configuration

## Buffers
Each CAN bus can have multiple buffers. Buffers group messages and define how they are handled.

### Buffer Settings
- **Mode:** Not Configured, Receive, Transmit
- **Receive Mask:** Filters incoming messages by ID
- **Rate:** Transmission interval in milliseconds
- **Message Count:** Number of messages assigned to the buffer

### Managing Messages
- **Add:** Assign a CAN message to a buffer
- **Delete:** Remove a message from a buffer

> **Note:** Each message can only be assigned to one buffer.

## Messages
Messages are the core units of CAN communication. Each message has a unique ID and can contain multiple parameters.

### Message Details
- **Message ID:** Unique identifier (11-bit or 29-bit)
- **Description:** Optional short description
- **Length:** Message length in bytes
- **Buffer:** Read-only field showing assigned buffer
- **Mode:** Transmit / Receive / Not Configured
- **Parameter Count:** Number of associated parameters

## Parameters
Parameters define the data content of a CAN message.

### Parameter Settings
- **Name:** Identifier used in System Monitor and ATLAS
- **Start Bit:** Bit position where the parameter begins
- **Bit Length:** Up to 32 bits
- **Value Type:** Signed, Unsigned, or Floating Point
- **Byte Order:** MSB First or MSB Last
- **Scaling:**
    - Gain
    - Offset
    - Formula: Raw Value = Gain × Scaled Value + Offset

## Multiplexing
Multiplexed messages allow more parameters to be packed into a single CAN message.

### Multiplexing Settings
- **Enabled:** Tick to enable multiplexing
- **Byte Order:** MSB First or MSB Last
- **Start Bit:** Bit position of the multiplexer value
- **Bit Length:** Up to 16 bits
- **Multiplexer ID:** Defines which messages include the parameter
- **Mask:** Specifies which bits to ignore when matching multiplexer values

> **Example:** A parameter in all even multiplexed messages would use ID XXXXXXXXXX0.

## Import/Export
System Monitor supports importing and exporting buffer and message configurations via CSV.

### Buffer CSV Format
| Column | Description |
|--------|-------------|
| Buffer | Buffer number |
| Direction | TX / RX / blank |
| RX Mask | Receive mask value |
| Rate [ms] | Transmission interval |
| Messages | Comma-separated list of message IDs |

### Message CSV Format (v2)
| Column | Description |
|--------|-------------|
| CAN ID | Message ID (11-bit or 29-bit) |
| Message Length | Length in bytes |
| Multiplexer Start | Bit position of multiplexer value |
| Multiplexer Length | Length in bits |
| Multiplexer Order | Byte order of multiplexer |
| Parameter Name | Name of associated parameter |
| Start Bit | Bit position of parameter |
| Length | Bit length of parameter |
| Multiplexer ID | Multiplexer ID for parameter |
| Signed | YES / NO |
| Floating Point | YES / NO |
| Byte Order | MSB First / MSB Last |
| Scaling Gain | Gain value |
| Scaling Offset | Offset value |
| Description | Parameter description |
| Display Format | Format for display |
| Units | Engineering units |
| Limits | Lower/Upper value and display limits |
| Identifier | Unique parameter ID |

!!! note
    v2 format uses logical bit positions for MSB Last parameters.
