# Reduced Data Access

The Reduced Data Access feature of System Monitor lets teams restrict sharing of data and setups between engine and chassis applications. Access is determined by the team's licence and can be one of three states:

- `FullAccess`
- `RestrictedAccess`
- `NoAccess`

If a team has restricted access to an application, parameters within that application are locked unless they appear on the Parameter Unlock List (PUL). Locked parameters remain stored in session data so users with full access can still view them; they are either visible or invisible. Teams with restricted access cannot add a locked parameter to the Desktop or view/edit its Properties.

## Licensing

Access to data is controlled by the licence management scheme. Each licence is a licence file stored on the local machine. Application qualifiers inside the licence file determine which applications a team has:

- Full access to
- Restricted access to
- No access to (shown by prefixing the application name with `Locked:`)

Note: New licences are requested and generated online at https://www.mclarenelectronics.com/portal. Authorised users can request System Monitor and ATLAS licences, select a licence profile (teams, application access, ActiveX, etc.) and download the generated licence file. 

## Parameter Unlock List (PUL)

Each application has an associated Parameter Unlock List (PUL) containing parameters that teams with Restricted Access may access. Teams with Full Access can edit the PUL to add or remove parameters. PUL access is provided from the Unlock List Management tab of the Application Properties dialog.

See also: Edit the Parameter Unlock List; About the Parameter Unlock List.

## On loading a .dtv

When a DTV is saved, a checksum of the PUL is stored in the file header. On loading a `.dtv` the stored checksum is compared with the checksum of the PUL on disk:

- If the user is not authorised for Full Access:
    - If the checksums match: the appropriate parameters are unlocked.
    - If the checksums do not match: the user is prompted to locate an alternative PUL.
    - If no PUL file is found: all parameters for that application remain locked.
- If the user is authorised for Full Access: no checks are made and all parameters are unlocked.

## Locked Parameters

Teams with Restricted Access see parameter icons with a locked symbol superimposed (for example, a locked Measurement Parameter in the Explorer).

Locked parameters are not removed from display windows they were previously added to — they are simply invisible. In a display window a locked icon appears in the status column and `-` is shown in the value column.