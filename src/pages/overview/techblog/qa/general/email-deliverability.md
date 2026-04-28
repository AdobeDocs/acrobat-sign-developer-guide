---
title: Email Deliverability
---
# Email Deliverability

Last update: Apr 06, 2023.

## Sometimes an email does not "bounce" but we find out later (perhaps days) that it was a "bad" (mis-spelling etc.) address. Doesn't Adobe Sign let us know if the email address is bad?

The mail server where the email address lives that you tried to send an agreement to be signed, may or may not be set up to respond with bounce alerts for bad addresses.

This is because of spammers. Spammers will hit an email server with a list of common names `xxxxxxx@domain.com`, `yyyyyy@domain.com`, etc. and then check to see which ones bounced. Whichever ones don't bounce are good and then they start sending junk to the "known good" email addresses.

All the settings on Adobe Sign are set to both alert and email the senders if there is an actual bounce event by default, but in many cases if the mail server is configured to NOT respond to bad addresses, there may never be a bounced response at all.

In the case where the company's email server is configured this way, there is never ANY indication to Adobe Sign that the email did not reach its intended destination and so we have no way to know for sure whether the email got to the right address or not.

In this case, Adobe Sign decides after repeated attempts to deliver the mail (for 5 days), that this must be a "bad" address and finally sends a bounce message to the sender.

There is really no workaround for this, other than to set up "[alerts](https://helpx.adobe.com/sign/help/quick-setup-guide.html)" (under Users > Configure personal events/alerts) in Adobe Sign or check with the recipient by phone or some other means to ask if there could be a problem with their email address and if so to [replace the signer](https://helpx.adobe.com/sign/using/replace-signer.html) via the feature provided for that in the Adobe Sign web UI and/or possibly the API.

<HorizontalLine />
© Copyright 2023, Adobe Inc..  Last update: Apr 06, 2023.
![](../../_static/adobelogo.png)
