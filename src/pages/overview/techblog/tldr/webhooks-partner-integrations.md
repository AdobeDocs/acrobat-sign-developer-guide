---
title: Webhooks for Partner Integrations
---
# Webhooks for Partner Integrations

Last update: Apr 06, 2023.

While [customers can create webhooks in the web UI](https://helpx.adobe.com/sign/using/adobe-sign-webhooks-api.html), partners should set up webhooks via API as resource-level (per-agreement) webhooks. There are a few reasons for this.

- Webhooks set up in the UI will fire for ALL agreements created by ANY means for that user, all users in the group, or all agreements for ALL users in the entire account. You would then have to determine a way to distinguish between incoming webhooks for agreements created by your integrated platform and any other agreements going through that user's account. In some cases where the account is ONLY used for the partner's integrated platform this may be OK, but is still not a best practice.
- With a single webhook subscription, if there is an issue causing the webhook to fail, the entire webhook "train" stops until the failing event can go through. The 72-hour "retry" process starts but all the agreements created after that failure continue to "back up" behind that failed instance under that single 72-hour clock. If using the best practice of creating per-agreement webhooks, each agreement has its own 72-hour clock that starts on the 1st failure. This means that if there is some issue causing webhooks to start failing, there will be less data loss if the failure is long enough to cause a webhook to get disabled.
- If using this "per-agreement" process, your system will immediately detect that there is a webhook creation issue. You will not have to wait until customers complain about their agreements not updating.

## Polling as a "backup" update method

It is also recommended to set up a polling mechanism and some way to re-create these per-agreement webhooks if the creation step has failed and the agreements are still in some non-terminal state. It's also recommended to configure monitoring and alerting on the integrated platform side to let you know if the webhook process is failing. If you're using the per-agreement process, it would also be a good idea to automatically start the "polling" process for those agreements when the webhook creation failure is detected.

## Resource (per-agreement) webhook cleanup

The webhooks created by API will be visible in the UI if folks are logging into the website, but they can't be deleted from there. If you are using resource-level webhooks, there will be a post-terminal cleanup that you should perform to remove API-initiated webhooks for agreements that have completed workflows. If you do not, the UI will have hundreds or thousands of useless webhooks piling up for old agreements. Once the agreements are in a terminal state, they can be cleaned up using the [DELETE /webhooks/\{webhookID\}](https://secure.echosign.com/public/docs/restapi/v6#!/webhooks/deleteWebhook) API call.

## Update Agreement Status "manual" option

An additional best practice is to add an "update agreement status" button or trigger in your interface that polls Adobe Sign for a single agreement so that if there is an issue happening, the user can manually update a particularly critical agreement to get their status and/or a copy of the completed file/s immediately. Adobe does this in all integrations that it builds.

<HorizontalLine />
© Copyright 2023, Adobe Inc..  Last update: Apr 06, 2023.
![](../../_static/adobelogo.png)
