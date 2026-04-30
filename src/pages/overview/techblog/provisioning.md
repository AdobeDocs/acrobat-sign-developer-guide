---
title: Provisioning Acrobat Sign
---
# Provisioning Acrobat Sign

Last update: Apr 06, 2023.

## ISV (reference) partners VS "embedded" partners

When working with Adobe as a partner who needs an integration to Sign functionality there are a couple of typical paradigms. We refer to partners who just want to build an integration that their customers can use with their own existing Sign account as "ISV" or "reference" type partners. However some partners want to "re-sell" Sign transactions. These partners are providing Acrobat Sign as the main or only eSignature solution for their app/platform. We refer to this type of contract as an "Embedded" partner. In this latter case there are currently a couple of things to consider.

- Your customer may already have their own Adobe Sign account using their current "corporate" email address.
- Sign currently has a limitation that there can't be 2 users in different Sign accounts with the same email address so with Sign, email address is a unique identifier on the system as a whole.
- For reasons of info-security/privacy you don't want your platform to access agreements that were not sent from/by your platform's workflows.

## Implications for you and your customers

"Embedded" partners need to provide e-sign functionality from their platform, but only in the context of agreements initiated by your software, not a general account that can be used for any e-sign process. Since you as the partner are paying for the transactions, you probably don't want to pay for all transactions sent by your customer outside of the use-cases you allow in your platform's workflows.

This means you will need to provide this functionality in a different way. Typically we recommend provisioning a new Sign account for each of your customers that is a "service-account". You will need to use your own email domain for the "senders", or use another domain you create/control, and then create the users in this newly provisioned account as something like `client-user-35231@your-domain.com` or `client-user-35231@yourdomain-esign.com`. This allows for a couple of different things to occur.

- You won't conflict with an Adobe Sign account your customer may already have.
- Your customers will only be able to use this/these sender/s and the associated account in the context of your platform workflows.
- Your platform will NOT have access to this customer's entire Adobe Sign account including things NOT sent from your software/platform/integration.

You will still need to create a new Account containing one or more initiators for each of your customer's platform instances that need to leverage the Sign integration. As a best practice, we recommend that you create individual users inside that account for each person with that customer on your platform who need to be Sign transaction initiators ("senders").

This does incur more development debt which you'll need to consider as part of the process but it ensures less conflict with possible existing e-sign accounts as well as separation of the access to agreements sent from your platform for data security and privacy (think HIPPA, FIRPA, GDPR, etc.).

<HorizontalLine />
© Copyright 2023, Adobe Inc..  Last update: Apr 06, 2023.
![](../_static/adobelogo.png)
