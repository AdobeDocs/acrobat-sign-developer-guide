---
title: Webhook Event Payload Overview — Acrobat Sign Webhook Guide
---
# Webhook Event Payload Overview

## Payload info

Webhook notification payloads are delivered using the <span style="color: #e74c3c">application/json</span> content type. The payload object contains all the relevant information about what just happened, including the type of event and the data associated with that event. Acrobat Sign then sends the payload object, via an HTTP POST request, to any endpoint URLs that you have defined as webhook URLs.

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

<table columnWidths="34,12,38,16">
    <thead>
        <tr>
            <th>Parameter name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Possible values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span style="color: #e74c3c">webhookId</span></td>
            <td>String</td>
            <td>Webhook identifier of the webhook for which the notification sent</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">webhookname</span></td>
            <td>String</td>
            <td>Name of the webhook which was provided while creating a webhook</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">webhookNotificationId</span></td>
            <td>String</td>
            <td>The unique identifier of the webhook notification. This will be helpful in identifying duplicate notifications, if any.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">webhookNotificationApplicableUsers</span></td>
            <td>Object</td>
            <td>An array of the details of the users for which this notification is delivered. For example: Say User A and User B are in a Group G1. Say User C is in Group G2, and both these groups and all 3 users are in Account A. Assume, group level “webhook W1” is registered on Group G1 and group level “webhook W2” is registered on Group G2. Now an agreement is sent by User A and to User B. And User B delegates the signing to User C. In the above case, the sign will generate only two notifications (corresponding to W1 and W2) for the delegation event. The current field for W1 notification will be an array of details of User A and User B. The current field for W2 notification will be an array of details of User C.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">webhookUrlInfo</span></td>
            <td>Object</td>
            <td>URL on which this HTTPS POST notification triggers.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">webhookScope</span></td>
            <td>String</td>
            <td>Scope of the webhook</td>
            <td>ACCOUNT, GROUP, USER, RESOURCE</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">event</span></td>
            <td>String</td>
            <td>Event for which the webhook notification triggers.</td>
            <td>AGREEMENT_CREATED</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">eventDate</span></td>
            <td>String</td>
            <td>Event timestamp</td>
            <td>Example value: 2018-08-09T12:01:00Z</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">eventResourceParentType</span></td>
            <td>enum</td>
            <td>For agreements, it is possible that the agreement is created by signing a widget or while creating a megasign/bulk signing action. This field informs about such cases. Only added for payloads of agreement type resources.</td>
            <td>WIDGET, MEGASIGN</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">eventResourceParentId</span></td>
            <td>String</td>
            <td>Unique identifier of the widget or megasign action from which this agreement is created. Only added for payloads of agreement type resources.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">subEvent</span></td>
            <td>String</td>
            <td>Sub-event for which the webhook notification triggers. This field is event specific and returned with only a few events. See the individual event for details</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">eventResourceType</span></td>
            <td>String</td>
            <td>The resource type on which the event triggers.</td>
            <td>AGREEMENT, WIDGET, MEGASIGN</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantRole</span></td>
            <td>String</td>
            <td>Role assumed by all participants in the participant set to which the participant belongs (signer, approver etc.). This is the role of the <span style="color: #e74c3c">participantUser</span>. This key returns only for the following events: AGREEMENT_WORKFLOW_COMPLETED, AGREEMENT_ACTION_COMPLETED, AGREEMENT_ACTION_DELEGATED, AGREEMENT_ACTION_REQUESTED</td>
            <td>SENDER, SIGNER, DELEGATE_TO_SIGNER, APPROVER, DELEGATE_TO_APPROVER, ACCEPTOR, DELEGATE_TO_ACCEPTOR, FORM_FILLER, DELEGATE_TO_FORM_FILLER, CERTIFIED_RECIPIENT, DELEGATE_TO_CERTIFIED_RECIPIENT or SHARE</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actionType</span></td>
            <td>String</td>
            <td>This key is returned for only AGREEMENT_ACTION_COMPLETED.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserId</span></td>
            <td>String</td>
            <td>This field is Event-specific payload attributes; see the individual event for details</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>This field is Event-specific payload attributes; see the individual event for details</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>This field is Event-specific payload attributes; see the individual event for details</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>This field is Event-specific payload attributes; see the individual event for details.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>This field is Event-specific payload attributes; see the individual event for details. <span style="color: #e74c3c">initiatingUserId</span> and <span style="color: #e74c3c">initiatingUserEmail</span>: Accounts on Webhooks 2.0 will populate the <span style="color: #e74c3c">initiatingUserId</span> and <span style="color: #e74c3c">initiatingUserEmail</span> fields in the notification payload. Accounts that remain on the classic webhooks experience after March 14, 2023 will see unpopulated fields present in the payload.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>This field is Event-specific payload attributes; see the individual event for details. <span style="color: #e74c3c">initiatingUserId</span> and <span style="color: #e74c3c">initiatingUserEmail</span>: Accounts on Webhooks 2.0 will populate the <span style="color: #e74c3c">initiatingUserId</span> and <span style="color: #e74c3c">initiatingUserEmail</span> fields in the notification payload. Accounts that remain on the classic webhooks experience after March 14, 2023 will see unpopulated fields present in the payload.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserIpAddress</span></td>
            <td>String</td>
            <td>IP address of user that triggered the event</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">agreement</span></td>
            <td>Agreement</td>
            <td>Information about the agreement on which the event occurred. This key returns only if the event is an agreement event.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">widget</span></td>
            <td>Widget</td>
            <td>Information about the widget on which the event occurred. This key returns only if the event is a widget event.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">megasign</span></td>
            <td>MegaSign</td>
            <td>Information about the megaSign on which the event occurred. This key returns only if the event is a megaSign event.</td>
            <td></td>
        </tr>
    </tbody>
</table>

## Applicable users

Information in the <span style="color: #e74c3c">webhookNotificationApplicableUsers</span> array:

<table columnWidths="19,10,34,37">
    <thead>
        <tr>
            <th>Parameter name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Possible values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span style="color: #e74c3c">id</span></td>
            <td>String</td>
            <td>The unique identifier of the user for which the notification is applicable.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">email</span></td>
            <td>String</td>
            <td>Email address of the user for which the notification is applicable.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">role</span></td>
            <td>enum</td>
            <td>Role of the user in the workflow.</td>
            <td>SENDER, SIGNER, DELEGATE_TO_SIGNER, APPROVER, DELEGATE_TO_APPROVER, ACCEPTOR, DELEGATE_TO_ACCEPTOR, FORM_FILLER, DELEGATE_TO_FORM_FILLER, CERTIFIED_RECIPIENT, DELEGATE_TO_CERTIFIED_RECIPIENT, or SHARE</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">payloadApplicable</span></td>
            <td>boolean</td>
            <td>Indicates whether the payload attached to this notification is fetched in the context of this user or not. The boolean will be true for one and only one of the users in the <span style="color: #e74c3c">webhookNotificationApplicableUsers</span> array.</td>
            <td></td>
        </tr>
    </tbody>
</table>

## Webhook URL

Information in WebhookUrlInfo:

<table columnWidths="20,10,30,40">
    <thead>
        <tr>
            <th>Parameter name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Sample value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span style="color: #e74c3c">Url</span></td>
            <td>String</td>
            <td>HTTPS URL of the webhook</td>
            <td><span style="color: #e74c3c">https://example.com/callback?guid=test</span></td>
        </tr>
    </tbody>
</table>

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

<table columnWidths="22,23,23,32">
    <thead>
        <tr>
            <th>Attribute</th>
            <th>Description</th>
            <th>Prerequisite (to get this in the payload)</th>
            <th>Example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>userId</td>
            <td>The unique identifier of the participant</td>
            <td>Agreement Info needs to be checked</td>
            <td>"userId": "CBJCHBCAABAAR17L9fNP9kJcZHy759YawVx-pR-aqpf2"</td>
        </tr>
        <tr>
            <td>authenticationMethod</td>
            <td>The authentication method for the participants to have access to view and sign the document. possible values:["NONE" or "PASSWORD" or "PHONE" or "KBA" or "WEB_IDENTITY" or "ADOBE_SIGN" or "GOV_ID" or "DIG_ID" or "EMAIL_OTP"]</td>
            <td>Agreement Info needs to be checked.</td>
            <td>{`"securityOption": { "authenticationMethod": "ADOBE_SIGN" }`}</td>
        </tr>
        <tr>
            <td>createdGroupId</td>
            <td>The group id of agreement at the time of creation.</td>
            <td>Agreement Participant Info needs to be checked.</td>
            <td>"createdGroupId": "CBJCHBCAABAAR17L9fNP9kJcZHy759YawVx-pR-aqpf3"</td>
        </tr>
    </tbody>
</table>
