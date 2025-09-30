
---
date: 2025-09-30
---

# MESL.SQLRace.API 2.1.25251.6-dev

**For use with the ATLASSessionToParquet converter only.**

## Fixes

- **#88326 – SSN2 Performance Issue**  
  Reinstated SSN2 caching when using `Read Only=True` in the connection string. This will speed up reads.

- **#88521 – Virtual Function Compiler Failure**  
  Fixed issue where the compiler fails when substituting with different suffixes.  
  This occurred when:
  - There was no group name for virtual functions.
  - Virtual parameter names differed only by suffixes.
