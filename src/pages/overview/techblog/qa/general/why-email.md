---
title: Signer Identity and Email Address in the Documented Signing Process
---
# Signer Identity and Email Address in the Documented Signing Process

Last update: Apr 06, 2023.

Electronic signatures can't be thought of in quite the same way as other IT-related functions. It really is a documented "process."

An electronic signature does (at a high level) 3 things:

1. Captures the "intent to sign."
2. Identifies the "signers" (or other possible "participants") in some way.
3. Captures the date and time the signature took place. Additionally (but not necessarily required for legality), it captures the "location" the signing took place.

Point #2 is where the email address becomes an issue — almost all e-signature platforms rely on email as the most basic way to identify the participants in the documentation of the "process". This documentation is what we call an "audit trail."

Without having an email address, you really need to provide some other means of identifying those participants either on the "agreement" (the article that represents a transaction between parties) or in the audit info.

We do "require" an email address to represent those participants, and it's possible from a technical perspective to use some generic address like `esigner@yourdomain.com` as representing the participant, but this is not best practice or recommended since it then negates that identification in the documentation (audit trail) of those participants.

In some cases, there are things in the agreement (other than the signature itself) that ID the participant, like a social, driver's license, or other PII, but even then, you have really lost the metadata about the process and lost some of the credibility on the way.

## Why Email makes sense

An email address is usually associated with a person, it usually does not change once in place, and it's usually ok that it's "public"-ish.

- We could use a physical address, but what happens when you move?
- We could use a phone number, but those also change and can be shared (landlines).
- We could use a social security number or other government ID, but those are extremely sensitive and not appropriate to share in an audit trail.

Email provides a reasonable balance of stability, uniqueness, and public acceptability that makes it the practical standard for e-signature participant identification.

<HorizontalLine />
© Copyright 2023, Adobe Inc..  Last update: Apr 06, 2023.
![](../../../../_static/adobelogo.png)
