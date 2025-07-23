# Virtual Parameter Service

Virtual parameters are defined as simple FDL functions in the ECU logging config, and 
are traditionally calculated on demand by clients rather than the values being persisted
like other parameters. However, this requires knowledge of the proprietary FDL grammar, 
so a service will be developed as part of the McLaren Applied Bridge Service to 
calculate virtual parameters in real time and written to the broker, eliminating the 
need for downstream clients to recalculate them.