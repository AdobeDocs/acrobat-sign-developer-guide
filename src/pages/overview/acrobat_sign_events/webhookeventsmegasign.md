---
title: Bulk Signing Events — Acrobat Sign Webhook Guide
---
# Bulk Signing Events
<InlineAlert slots="text" />

The Sign in Bulk feature was previously named “Megasign”. Hence the use of “megasign” in code samples, event names, and the REST APIs.

## Common payload elements


### Minimum payload for bulk signing events

The following returns for a bulk signing event if all the conditional parameters are set to false while creating webhooks:

<table columnWidths="20,10,44,26">
    <thead>
        <tr>
            <th>Parameter name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Possible enums</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span style="color: #e74c3c">id</span></td>
            <td>String</td>
            <td>The unique identifier of the agreement; it can be used to query status and download signed documents.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">name</span></td>
            <td>String</td>
            <td>The name of the agreement that will be used to identify it, in emails and on the website.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">status</span></td>
            <td>Enum</td>
            <td>The current status of the agreement.</td>
            <td>OUT_FOR_SIGNATURE, SIGNED, APPROVED, ACCEPTED, DELIVERED, FORM_FILLED, ABORTED, EXPIRED, OUT_FOR_APPROVAL, OUT_FOR_ACCEPTANCE, OUT_FOR_DELIVERY, OUT_FOR_FORM_FILLING, or CANCELLED</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">payloadApplicable</span></td>
            <td>boolean</td>
            <td>Indicates whether the payload attached to this notification is fetched in the context of this user or not. The boolean will be true for one and only one of the users in the <span style="color: #e74c3c">webhookNotificationApplicableUsers</span> array.</td>
            <td></td>
        </tr>
    </tbody>
</table>

For different Send in Bulk events, the detailed agreement info, participant info, document info, and the signed document returns based on the conditional parameters specified during webhook creation.

### Payload attributes inherited from MegaSign

<table columnWidths="20,12,44,24">
    <thead>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Possible Enums</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span style="color: #e74c3c">id</span></td>
            <td>String</td>
            <td>The unique identifier of the bulk signing parent agreement.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">name</span></td>
            <td>String</td>
            <td>The name of the agreement that will be used to identify it in emails, on the website, and elsewhere.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">status</span></td>
            <td>Enum</td>
            <td>State of the bulk signing event.</td>
            <td>IN_PROCESS</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">ccs</span></td>
            <td>Array of Strings</td>
            <td>Email IDs of cc: participants of the bulk signing event</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">createdDate</span></td>
            <td>Date</td>
            <td>Date when the bulk signing event was created, in the format yyyy-MM-dd’T’HH:mm:ssZ</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">expirationTime</span></td>
            <td>Timestamp</td>
            <td>The date after which the agreement can no longer be signed, if an expiration date is configured. The value is nil if an expiration date is not set for the document.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">externalId</span></td>
            <td>Object</td>
            <td>A unique identifier provided by an external system search for your transaction through API.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">firstReminderDelay</span></td>
            <td>Integer</td>
            <td>Integer which specifies the delay in hours before sending the first reminder. The minimum value allowed is 1 hour and the maximum value can’t be more than the difference between the agreement creation time and the expiration time of the agreement in hours. If this is not specified while creating the agreement, but the reminder frequency is specified, then the first reminder will be sent based on frequency: in other words, if the reminder is created with frequency specified as daily, the firstReminderDelay will be 24 hours. Will never be returned in offline agreement creation.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">locale</span></td>
            <td>String</td>
            <td>The locale associated with this agreement. Specifies the language for the signing page and emails: for example, en_US or fr_FR. If none specified, defaults to the language configured for the agreement sender.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">message</span></td>
            <td>String</td>
            <td>The message associated with the agreement that the sender has provided, describing what is being sent or why their signature is required.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">postSignOption</span></td>
            <td>Object</td>
            <td>Determines the URL and associated properties for the success page to which the user will be taken after completing the signing process.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">reminderFrequency</span></td>
            <td>Enum</td>
            <td>Specifies how often reminders will be sent to the recipients.</td>
            <td>DAILY_UNTIL_SIGNED or WEEKLY_UNTIL_SIGNED</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">senderEmail</span></td>
            <td>String</td>
            <td>Email of the sender.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">signatureType</span></td>
            <td>Enum</td>
            <td>Specifies the type of signature requested on the agreement—written or e-signature.</td>
            <td>ESIGN or WRITTEN</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">vaultingInfo</span></td>
            <td>Object</td>
            <td>Specifies the vaulting properties that allow Acrobat Sign to securely store documents with a vault provider.</td>
            <td></td>
        </tr>
    </tbody>
</table>

## MEGASIGN_ALL

If you want to subscribe to all library events, subscribe to MEGASIGN_ALL.

<InlineAlert slots="text" />

MEGASIGN_ALL retrieves all agreement events, including events added in the future.


## MEGASIGN_CREATED


Web app name: Send in Bulk created

Triggers when a bulk signing event is created.

***Event-specific payload attributes***

<table columnWidths="22,8,70">
    <thead>
        <tr>
            <th>Parameter name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span style="color: #e74c3c">participantUserId</span></td>
            <td>String</td>
            <td>The user ID of the creator of the bulk signing event.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the creator of the bulk signing event.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the creator of the bulk signing event.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the creator of the bulk signing event.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the creator of the megasign who created the bulk signing event on behalf of the creator in the case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the creator of the megasign who created the bulk signing event on behalf of the creator in the case of account sharing.</td>
        </tr>
    </tbody>
</table>

<CodeBlock slots="heading, code" repeat="1" languages="JSON" />

#### Payload template

```json
{
    "webhookId": "",
    "webhookName": "",
    "webhookNotificationId": "",
    "webhookUrlInfo": {
        "url": ""
    },
    "webhookScope": "",
    "webhookNotificationApplicableUsers": [
        {
            "id": "",
            "email": "",
            "role": "",
            "payloadApplicable": ""
        }
    ],
    "event": "",
    "subEvent": "",
    "eventDate": "",
    "eventResourceType": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "megaSign": {
        "name": "",
        "status": "",
        "id": "",
        "ccs": [
            {
                "email": ""
            }
        ],
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "reminderFrequency": "",
        "senderEmail": "",
        "signatureType": "",
        "vaultingInfo": {
            "enabled": ""
        }
    }
}
```

## MEGASIGN_RECALLED



+ Updated: July, 2023
+ Web app name: Send in Bulk recalled
+ Triggers when a send in bulk action is recalled


***Event-specific payload attributes***

<table columnWidths="21,10,69">
    <thead>
        <tr>
            <th>Parameter name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span style="color: #e74c3c">participantUserId</span></td>
            <td>String</td>
            <td>The user ID of the creator of the bulk signing event.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the creator of the bulk signing event.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the creator of the bulk signing event.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the creator of the bulk signing event.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the creator of the bulk signing event who recalled the bulk signing event on behalf of the creator in the case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the creator of the bulk signing event who recalled the bulk signing event on behalf of the creator in the case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">comment</span></td>
            <td>String</td>
            <td>Any arbitrary comment.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">notifyOthers</span></td>
            <td>Boolean</td>
            <td>True or false (default) depending on whether recipients should be notified that the transaction(s) have been cancelled. This field is set when an agreement is cancelled using the <span style="color: #e74c3c">{`PUT /agreements/{agreementId}/state`}</span> API.</td>
        </tr>
    </tbody>
</table>

<CodeBlock slots="heading, code" repeat="1" languages="JSON" />

#### Payload template

```json
{
    "webhookId": "",
    "webhookName": "",
    "webhookNotificationId": "",
    "webhookUrlInfo": {
        "url": ""
    },
    "webhookScope": "",
    "webhookNotificationApplicableUsers": [
        {
            "id": "",
            "email": "",
            "role": "",
            "payloadApplicable": ""
        }
    ],
    "event": "",
    "subEvent": "",
    "eventDate": "",
    "eventResourceType": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "megaSign": {
        "name": "",
        "status": "",
        "id": "",
        "ccs": [
            {
                "email": ""
            }
        ],
        "childAgreementsInfo": {
            "fileInfo": {
                "fileType": "",
                "childAgreementsInfoFileId": ""
            }
        },
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "reminderFrequency": "",
        "senderEmail": "",
        "signatureType": "",
        "vaultingInfo": {
            "enabled": ""
        }
    },
    "agreementCancellationInfo": {
        "comment": "",
        "notifyOthers": ""
    }
}
```

## MEGASIGN_SHARED


Web app name: Send in Bulk shared

Triggers when a send in bulk reminder is sent to recipients.

***Event-specific payload attributes***

<table columnWidths="21,10,69">
    <thead>
        <tr>
            <th>Parameter name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span style="color: #e74c3c">participantUserId</span></td>
            <td>String</td>
            <td>The user ID of the user to whom the bulk signing event is shared.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user to whom the bulk signing event is shared.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the user by whom the bulk signing event is shared. This will be creator of the bulk signing event.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user by whom the bulk signing event is shared. This will be creator of the bulk signing event.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the creator of the bulk signing event who recalled the bulk signing event on behalf of the creator in the case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the user on whose behalf this bulk signing event is shared in the case of account sharing.</td>
        </tr>
    </tbody>
</table>

<CodeBlock slots="heading, code" repeat="1" languages="JSON" />

#### Payload template

```json
{
    "webhookId": "",
    "webhookName": "",
    "webhookNotificationId": "",
    "webhookUrlInfo": {
        "url": ""
    },
    "webhookScope": "",
    "webhookNotificationApplicableUsers": [
        {
            "id": "",
            "email": "",
            "role": "",
            "payloadApplicable": ""
        }
    ],
    "event": "",
    "subEvent": "",
    "eventDate": "",
    "eventResourceType": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "megaSign": {
        "name": "",
        "status": "",
        "id": "",
        "ccs": [
            {
                "email": ""
            }
        ],
        "childAgreementsInfo": {
            "fileInfo": {
                "fileType": "",
                "childAgreementsInfoFileId": ""
            }
        },
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "reminderFrequency": "",
        "senderEmail": "",
        "signatureType": "",
        "vaultingInfo": {
            "enabled": ""
        }
    }
}
```

## MEGASIGN_REMINDER_INITIATED


Introduced: November 8, 2022

Web app name: Send in Bulk reminder initiated

Triggers when a Send in Bulk reminder is triggered and reminder emails are suppressed(the default) (Unlike MEGASIGN_REMINDER_SENT webhook fires when reminder emails are enabled). Only one MEGASIGN_REMINDER_INITIATED (or MEGASIGN_REMINDER_SENT) webhook is delivered for the parent Send in Bulk container. Individual child agreements do not each fire a MEGASIGN_REMINDER_INITIATED webhook.

<CodeBlock slots="heading, code" repeat="1" languages="JSON" />

#### Payload template

```json
{
    "webhookId": "",
    "webhookNotificationId": "",
    "webhookName": "",
    "webhookUrlInfo": {
        "url": ""
    },
    "webhookScope": "",
    "webhookNotificationApplicableUsers": [
        {
            "id": "",
            "email": "",
            "role": "",
            "payloadApplicable": ""
        }
    ],
    "event": "",
    "subEvent": "",
    "eventResourceType": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "megaSign": {
        "name": "",
        "status": "",
        "id": "",
        "ccs": [
            {
                "email": ""
            }
        ],
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "reminderFrequency": "",
        "senderEmail": "",
        "signatureType": "",
        "vaultingInfo": {
            "enabled": ""
        }
    },
    "reminderInfo": {
        "id": "",
        "note": "",
        "allUnsigned": "",
        "participantList": [
            {
                "participantUserId": "",
                "id": "",
                "email": ""
            }
        ]
    }
}
```

## MEGASIGN_REMINDER_SENT


Introduced: November 8, 2022

Web app name: Send in Bulk reminder sent

Triggers when a Send in Bulk reminder is triggered and reminder emails are enabled (default).

<CodeBlock slots="heading, code" repeat="1" languages="JSON" />

#### Payload template

```json
{
    "webhookId": "",
    "webhookNotificationId": "",
    "webhookName": "",
    "webhookUrlInfo": {
        "url": ""
    },
    "webhookScope": "",
    "event": "",
    "subEvent": "",
    "eventResourceType": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "megaSign": {
        "name": "",
        "status": "",
        "id": "",
        "ccs": [
            {
                "email": ""
            }
        ],
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "reminderFrequency": "",
        "senderEmail": "",
        "signatureType": "",
        "vaultingInfo": {
            "enabled": ""
        }
    },
    "reminderInfo": {
        "id": "",
        "note": "",
        "allUnsigned": "",
        "participantList": [
            {
                "participantUserId": "",
                "id": "",
                "email": ""
            }
        ]
    }
}
```
