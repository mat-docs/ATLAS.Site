# CAN Configuration Overview

System Monitor includes tools to configure Controller Area Network (CAN) messages for data logging. These messages can be transmitted to external units or received and logged internally using CAN buffers.

## Capabilities

- Configure up to 8 CAN configurations per project.
- Transmit and receive CAN messages.
- Associate CAN messages with ECU parameters.
- Support for multiplexed messages.
- Import/export buffer and message configurations via CSV.

## Accessing the Configuration

To open the CAN Configuration dialog: Logging > CAN Configuration

!!! note
    If the menu option is disabled, create or open a CAN Configuration file first.

## Integration with FIA

In some projects, FIA-supplied CAN configurations may be used. These appear as selectable radio buttons and are included as separate entities in the logging configuration.

## Explorer Structure

The CAN Configuration Explorer displays:

- ECU type and available CAN buses.
- Buffers and messages per bus.
- Message and parameter details.