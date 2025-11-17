---
title: Webhook Event Payload Overview — Acrobat Sign Webhook Guide
---
# Webhook Event Payload Overview

Last update: Aug 10, 2025.

## Payload info

Webhook notification payloads are delivered using the `application/json` content type. The payload object contains all the relevant information about what just happened, including the type of event and the data associated with that event. Acrobat Sign then sends the payload object, via an HTTP POST request, to any endpoint URLs that you have defined as webhook URLs.

## Payload size and truncation

The payload size is restricted to 10 MB. If an event generates a larger payload, a webhook is triggered but the conditional parameters attributes, if they’re in the request, will be removed to reduce the size of the payload. Also, a **conditionalParametersTrimmed** array object will be included in the response for this case to tell the client which conditionalParameters info is removed. The truncation occurs in the following order:

+ **includeSignedDocuments**
+ **includeParticipantsInfo**
+ **includeDocumentsInfo**
+ **includeDetailedInfo**

The truncation order is as follows:

+ Signed documents in a base 64 encoded format
+ Participant info
+ Document info
+ Detailed info

Truncation may happen, for example, on an agreement completion event if it includes a signed document in a base 64 encoded format as well or for an agreement with multiple form fields.

## Basic webhook payload

All events include the following common payload attributes. Additional parameters returned along with specific event payload objects for particular keys are defined in the payload specifications for each event.

| Parameter name                       | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Possible values                                                                                                                                                                                         |
|--------------------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `webhookId`                          | String    | Webhook identifier of the webhook for which the notification sent                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                         |
| `webhookname`                        | String    | Name of the webhook which was provided while creating a webhook                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                         |
| `webhookNotificationId`              | String    | The unique identifier of the webhook notification. This will be helpful in identifying duplicate notifications, if any.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |                                                                                                                                                                                                         |
| `webhookNotificationApplicableUsers` | Object    | An array of the details of the users for which this notification is delivered. For example: Say User A and User B are in a Group G1. Say User C is in Group G2, and both these groups and all 3 users are in Account A. Assume, group level “webhook W1” is registered on Group G1 and group level “webhook W2” is registered on Group G2. Now an agreement is sent by User A and to User B. And User B delegates the signing to User C. In the above case, the sign will generate only two notifications (corresponding to W1 and W2) for the delegation event. The current field for W1 notification will be an array of details of User A and User B. The current field for W2 notification will be an array of details of User C. |                                                                                                                                                                                                         |
| `webhookUrlInfo`                     | Object    | URL on which this HTTPS POST notification triggers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                         |
| `webhookScope`                       | String    | Scope of the webhook                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ACCOUNT, GROUP, USER, RESOURCE                                                                                                                                                                          |
| `event`                              | String    | Event for which the webhook notification triggers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | AGREEMENT_CREATED                                                                                                                                                                                       |
| `eventDate`                          | String    | Event timestamp                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Example value: 2018-08-09T12:01:00Z                                                                                                                                                                     |
| `eventResourceParentType`            | enum      | For agreements, it is possible that the agreement is created by signing a widget or while creating a megasign/bulk signing action. This field informs about such cases. _Only_ _added_ for payloads of agreement type resources_.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | WIDGET, MEGASIGN                                                                                                                                                                                        |
| `eventResourceParentId`              | String    | Unique identifier of the widget or megasign action from which this agreement is created. _Only added for payloads of agreement type resources_.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                         |
| `subEvent`                           | String    | Sub-event for which the webhook notification triggers. _This field is event specific and returned with only a few events. See the individual event for details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                         |
| `eventResourceType`                  | String    | The resource type on which the event triggers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | AGREEMENT, WIDGET, MEGASIGN                                                                                                                                                                             |
| `participantRole`                    | String    | Role assumed by all participants in the participant set to which the participant belongs (signer, approver etc.). This is the role of the `participantUser`. This key returns only for the following events: AGREEMENT_WORKFLOW_COMPLETED, AGREEMENT_ACTION_COMPLETED, AGREEMENT_ACTION_DELEGATED, AGREEMENT_ACTION_REQUESTED                                                                                                                                                                                                                                                                                                                                                                                                         | SENDER, SIGNER, DELEGATE_TO_SIGNER, APPROVER, DELEGATE_TO_APPROVER, ACCEPTOR, DELEGATE_TO_ACCEPTOR, FORM_FILLER, DELEGATE_TO_FORM_FILLER, CERTIFIED_RECIPIENT, DELEGATE_TO_CERTIFIED_RECIPIENT or SHARE |
| `actionType`                         | String    | This key is returned for only AGREEMENT_ACTION_COMPLETED.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                         |
| `participantUserId`                  | String    | This field is Event-specific payload attributes; see the individual event for details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                         |
| `participantUserEmail`               | String    | This field is Event-specific payload attributes; see the individual event for details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                         |
| `actingUserId`                       | String    | This field is Event-specific payload attributes; see the individual event for details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                         |
| `actingUserEmail`                    | String    | This field is Event-specific payload attributes; see the individual event for details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                         |
| `initiatingUserId`                   | String    | This field is Event-specific payload attributes; see the individual event for details. `initiatingUserId` and `initiatingUserEmail`: Accounts on Webhooks 2.0 will populate the `initiatingUserId` and `initiatingUserEmail` fields in the notification payload. Accounts that remain on the classic webhooks experience after March 14, 2023 will see unpopulated fields present in the payload.                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                         |
| `initiatingUserEmail`                | String    | This field is Event-specific payload attributes; see the individual event for details. `initiatingUserId` and `initiatingUserEmail`: Accounts on Webhooks 2.0 will populate the `initiatingUserId` and `initiatingUserEmail` fields in the notification payload. Accounts that remain on the classic webhooks experience after March 14, 2023 will see unpopulated fields present in the payload.                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                         |
| `actingUserIpAddress`                | String    | IP address of user that triggered the event                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                         |
| `agreement`                          | Agreement | Information about the agreement on which the event occurred. This key returns only if the event is an agreement event.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                                                                                                                                                         |
| `widget`                             | Widget    | Information about the widget on which the event occurred. This key returns only if the event is a widget event.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                         |
| `megasign`                           | MegaSign  | Information about the megaSign on which the event occurred. This key returns only if the event is a megaSign event.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                         |


## Webhook URL

Information in WebhookUrlInfo:

| Parameter name | Type   | Description              | Sample value                             |
|----------------|--------|--------------------------|------------------------------------------|
| `Url`          | String | HTTPS URL of the webhook | `https://example.com/callback?guid=test` |


## webhookNotificationPayload

The webhookNotificationPayload now includes the following new fields for all AGREEMENT_* webhook subscription event types: userId, authenticationMethod, and createdGroupId.

The following example shows a **Webhook Payload for the AGREEMENT_CREATED** event.

<CodeBlock slots="heading, code" repeat="1" languages="JSON" />

#### Webhook Payload: AGREEMENT_CREATED

```json
{
 "webhookId":"9b7fc222-0c74-478b-9bde-8ac70a2dd163",
 "webhookName":"cjones_preview_acct_05_23_2024_1",
 "webhookNotificationId":"d20d758a-f8b2-41b7-8c20-016312de7978",
 "webhookUrlInfo":{
    "url":"https://callback-prod.ethos03-stage-va6.ethos.adobe.net/postWebhooksPublish?guid=cjones_preview_acct_05_23_2024_1"
 },
 "webhookScope":"ACCOUNT",
 "webhookNotificationApplicableUsers":[
    {
       "id":"CBJCHBCAABAAR17L9fNP9kJcZHy759YawVx-pR-aqpf2",
       "email":"cjones@adobe.com",
       "role":"SENDER",
       "payloadApplicable":true
    }
 ],
 "event":"AGREEMENT_CREATED",
 "eventDate":"2024-05-30T22:57:28Z",
 "eventResourceType":"agreement",
 "participantUserId":"CBJCHBCAABAAR17L9fNP9kJcZHy759YawVx-pR-aqpf2",
 "participantUserEmail":"cjones@adobe.com",
 "actingUserId":"CBJCHBCAABAAR17L9fNP9kJcZHy759YawVx-pR-aqpf2",
 "actingUserEmail":"cjones@adobe.com",
 "initiatingUserId":"CBJCHBCAABAAR17L9fNP9kJcZHy759YawVx-pR-aqpf2",
 "initiatingUserEmail":"cjones@adobe.com",
 "agreement":{
    "id":"CBJCHBCAABAA2XhaLGV0pKssKU03QXTcTXS4ebPyoSL_",
    "name":"sample_1page_user_guide_05_30_2024_1",
    "signatureType":"ESIGN",
    "status":"OUT_FOR_SIGNATURE",
    "documentVisibilityEnabled":false,
    "createdDate":"2024-05-30T22:57:29Z",
    "locale":"en_US",
    "message":"Please review and complete sample_1page_user_guide_05_30_2024_1.",
    "senderEmail":"cjones@adobe.com",
    "participantSetsInfo":{
       "participantSets":[
          {
             "memberInfos":[
                {
                   "id":"CBJCHBCAABAAUApjvujmE_gwjp5Hl9XhboO5oCjeIqsl",
                   "email":"cjones@adobe.com",
                   "company":"Adobe",
                   "name":"Casey Jones",
                   "status":"ACTIVE",
                   "userId":"CBJCHBCAABAAR17L9fNP9kJcZHy759YawVx-pR-aqpf2",
                   "securityOption":{
                      "authenticationMethod":"NONE"
                   }
                }
             ],
             "order":1,
             "role":"SIGNER",
             "status":"WAITING_FOR_MY_SIGNATURE",
             "id":"CBJCHBCAABAAte-PIPyeug0KlgUmRIncdyFBh-UvRKV8"
          },
          {
             "memberInfos":[
                {
                   "id":"CBJCHBCAABAAPRXGX41GIgOTh0N95BvHV3inlUGP2fh9",
                   "email":"cjones@gmail.com",
                   "company":"Adobe",
                   "name":"cjones preview1",
                   "status":"ACTIVE",
                   "userId":"CBJCHBCAABAAcAz8uVqsV9JAQxwf1_oCQojJ1efWdyvL",
                   "securityOption":{
                      "authenticationMethod":"NONE"
                   }
                }
             ],
             "order":2,
             "role":"SIGNER",
             "status":"NOT_YET_VISIBLE",
             "id":"CBJCHBCAABAA85vUWoa0pSTcQCdz_j8XDv41dMT2Qlbp"
          }
       ]
    },
    "createdGroupId":"CBJCHBCAABAAH9R6_Qng4mKIkTbAc66fi-uxaApLLuAm"
 }
}
```

***New fields in Webhook Payload***

| Attribute | Description | Prerequisite (to get this in the payload) | Example                                                          |
|---|---|---|------------------------------------------------------------------|
| userId | The unique identifier of the participant | Agreement Info needs to be checked | "userId": "CBJCHBCAABAAR17L9fNP9kJcZHy759YawVx-pR-aqpf2"         |
| authenticationMethod | The authentication method for the participants to have access to view and sign the document. possible values:["NONE" or "PASSWORD" or "PHONE" or "KBA" or "WEB_IDENTITY" or "ADOBE_SIGN" or "GOV_ID" or "DIG_ID" or "EMAIL_OTP"] | Agreement Info needs to be checked. | \{`"securityOption": { "authenticationMethod": "ADOBE_SIGN" }`\} |
| createdGroupId | The group id of agreement at the time of creation. | Agreement Participant Info needs to be checked. | "createdGroupId": "CBJCHBCAABAAR17L9fNP9kJcZHy759YawVx-pR-aqpf3" |

<HorizontalLine />
© Copyright 2023, Adobe Inc..  Last update: Aug 23, 2023.
![](../_static/adobelogo.png)
