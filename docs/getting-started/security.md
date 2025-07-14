# Restricted Data Access

One of the key mechanisms used to protect customer data is RDA (Restricted Data Access). This system ensures that sensitive telemetry and operational data is only accessible to authorised users, maintaining confidentiality and compliance across all environments.

## What is RDA?
RDA is a security layer within ATLAS that governs access to protected data streams. It acts as a gatekeeper, filtering telemetry and system data based on user permissions. If a user or team does not have the appropriate access rights, the data is automatically discarded before it reaches them—ensuring that sensitive information remains secure and unseen.

## How RDA Protects You

**Access Control:** RDA enforces strict access policies, allowing only authorised personnel to view or interact with protected data.

**Data Filtering:** Data streams are filtered in real-time by ATLAS bridge services. Any data tagged with RDA protection is excluded from delivery to unauthorised endpoints.

**Third-Party Encryption Support:** RDA can be extended to support encryption from external sources, adding an additional layer of protection for integrated systems.

**Automated Testing:** RDA functionality is continuously validated through automated regression testing, ensuring reliability and compliance with evolving security standards 1.

## Why It Matters

Whether you're monitoring system performance, analysing telemetry, or integrating with external platforms, RDA ensures that your data remains protected. It’s part of our commitment to delivering secure, scalable, and trustworthy solutions for every customer.