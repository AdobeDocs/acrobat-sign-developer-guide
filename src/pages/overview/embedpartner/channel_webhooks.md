# Channel Webhooks User Guide

<InlineAlert slots="text" />

Your feedback is valuable and is vital in improving our product and documentation. Send suggestions to [acrobatsignembed@adobe.com](mailto:acrobatsignembed%40adobe.com).

Embed 2.0 Partners can set up a webhook for their channel and listen to all the asset notifications from each of their individual customer accounts. Channel Webhooks created in the Partner’s home environment are replicated in all other Acrobat Sign environments.

- The **accountId** attribute exists for all notification payloads, so you can cross-reference the notification with the respective customer account under the channel. This attribute is populated in all payloads.

- The **webhooksNotificationApplicableUsers** attribute is not populated for Channel webhook payloads.

- OAuth2.0 features are not supported for Channel webhooks.

- Channel-level webhooks support Rate limiting. The following are the limits for concurrent requests: 
  - Webhook API: A maximum of 10 concurrent Create Channel webhook API requests are permitted.
  - Webhook Notifications: A maximum of 50 concurrent webhook notifications can be sent out to the channel webhook.

- The maximum number of Channel webhooks that can be created for any channel is 10.

## Configuring Channel Webhooks

<InlineAlert slots="text" />

This feature is available for Embed 2.0 Partners only.

### Prerequisites

**Channel setup**

Enable this setting WEBHOOK_PROBLEM_NOTIFICATION_EMAILS_ENABLED for the channel to be able to provide emails during webhook creation to receive warning and auto-disablement email notifications if there is an issue with the webhook. This is the only way to get email notifications when there is an issue with the webhook. Please contact CSM/Support to enable this setting.

**Security setup**

If the webhook URL supports two-way SSL, then the client certificate has to be uploaded to the technical account. The technical account user must be an account admin to upload the SSL certificate. Assign the Account admin role to the Technical Account user who will be used to create the webhook.

After the account setup is done, generate the embedded view for the technical account admin user. From the embedded view, via the account Security Settings page, upload an identifying certificate, which the Acrobat Sign webhooks system uses to identify itself when making webhook calls to your webhook servers. More details about webhook security can be found here: [https://developer.adobe.com/acrobat-sign/acrobat_sign_events/index.md#webhook-security](../acrobat_sign_events/index.md#webhook-security)

Detailed step-by-step guide for uploading an SSL certificate can be found here: [https://helpx.adobe.com/sign/developer/webhook/two-way-ssl.html](https://helpx.adobe.com/sign/developer/webhook/two-way-ssl.html)

**De-deplucation**

If Channel webhooks and webhooks in each customer account use the same webhook URL, the same event will be sent to your webhook multiple times.

If your use cases don’t permit interruption for webhook delivery between deactivating existing customer account webhooks and setting up Channel webhooks, then your system must handle duplicate events for the above-stated reasons.

**Deactivate exisitng webhooks**

Once the channel-level webhook is set up and you are successfully receiving events, webhooks in each customer account should be deactivated to avoid performance issues with your webhook URL.

### Configure a webhook and subscribe to events

Since Embed 2.0 partners already have access tokens to call Acrobat Sign APIs, Channel webhooks can be created by calling the POST /webhooks and subscribing to all the asset notifications required. The only configuration changes are the webhook scope, which would be CHANNEL, and the webhook resource ID, which should not be provided.

More about configuring webhooks can be found here: [https://developer.adobe.com/acrobat-sign/acrobat_sign_events/index.md#configure-a-webhook-and-subscribe-to-events](../acrobat_sign_events/index.md#configure-a-webhook-and-subscribe-to-events)

*Sample create webhook request JSON body*

```json
{
"webhookUrlInfo" : {
    "url" : "<webhook_url>"
},
"webhookConditionalParams" : {
    "webhookAgreementEvents" : {
    "includeDetailedInfo" : true,
    "includeParticipantsInfo" : true,
    "includeSignedDocuments" : false,
    "includeDocumentsInfo" : false
    }
},
"webhookSubscriptionEvents" : [ "AGREEMENT_CREATED" ],
"scope" : "CHANNEL",
"name" : "channel level webhook",
"state" : "ACTIVE"
}
```

*Sample create webhook request with problem notification emails JSON body*

```json
{
"webhookUrlInfo" : {
    "url" : "<webhook_url>"
},
"webhookConditionalParams" : {
    "webhookAgreementEvents" : {
    "includeDetailedInfo" : true,
    "includeParticipantsInfo" : true,
    "includeSignedDocuments" : false,
    "includeDocumentsInfo" : false
    }
},
"webhookSubscriptionEvents" : [ "AGREEMENT_CREATED" ],
"scope" : "CHANNEL",
"name" : "channel level webhook",
"problemNotificationEmails":[{"email":"testemail@gmail.com"},{"email":"testemail2@gmail.com"}],
"state" : "ACTIVE"
}
```

**Managing Webhooks**

Details about managing webhooks can be found here:

- [https://developer.adobe.com/acrobat-sign/acrobat_sign_events/index.md#managing-webhooks-and-subscriptions](../acrobat_sign_events/index.md#managing-webhooks-and-subscriptions)
- [https://developer.adobe.com/acrobat-sign/developer_guide/webhookapis.md](../developer_guide/webhookapis.md)

**Best practices**

Best practices for setting up webhooks can be found here:

- [https://developer.adobe.com/acrobat-sign/acrobat_sign_events/index.html#best-practices](../acrobat_sign_events/index.md#best-practices)
