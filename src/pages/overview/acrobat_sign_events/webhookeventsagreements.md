---
title: Agreement Events — Acrobat Sign Webhook Guide
---
# Agreement Events

## Common payload elements

### Minimum payload for agreements

The following returns for an agreement event if all the conditional parameters are set to false while creating webhooks:

***Minimum payload for agreements***

<table columnWidths="20,10,38,32">
    <thead>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Possible enums</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span style="color: #e74c3c">id</span></td>
            <td>String</td>
            <td>The unique identifier of agreement that can be used to query status and download signed documents.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">name</span></td>
            <td>String</td>
            <td>The name of the agreement that will be used to identify it in emails and on the website.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">status</span></td>
            <td>Enum</td>
            <td>The current status of the agreement.</td>
            <td>OUT_FOR_SIGNATURE, SIGNED, APPROVED, ACCEPTED, DELIVERED, FORM_FILLED, ABORTED, EXPIRED, OUT_FOR_APPROVAL, OUT_FOR_ACCEPTANCE, OUT_FOR_DELIVERY, OUT_FOR_FORM_FILLING, or CANCELLED</td>
        </tr>
    </tbody>
</table>

### Payload attributes inherited from Agreement

***Inherited payload attributes***

<table columnWidths="30,12,38,20">
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
            <td>The unique identifier of the agreement, which can be used to query the status and download signed documents.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">name</span></td>
            <td>String</td>
            <td>The name of the agreement that will be used to identify it, in emails and on the website.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">signatureType</span></td>
            <td>Enum</td>
            <td>Specifies the type of signature requested on the agreement—written or e-signature.</td>
            <td>ESIGN, WRITTEN</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">status</span></td>
            <td>Enum</td>
            <td>The current status of the agreement.</td>
            <td>OUT_FOR_SIGNATURE, OUT_FOR_DELIVERY, OUT_FOR_ACCEPTANCE, OUT_FOR_FORM_FILLING, OUT_FOR_APPROVAL, AUTHORING, CANCELLED, SIGNED, APPROVED, DELIVERED, ACCEPTED, FORM_FILLED, EXPIRED, ARCHIVED, PREFILL, WIDGET_WAITING_FOR_VERIFICATION, DRAFT, DOCUMENTS_NOT_YET_PROCESSED, WAITING_FOR_FAXING, WAITING_FOR_VERIFICATION</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">ccs</span></td>
            <td>Array of Strings</td>
            <td>Email IDs of cc: participants of the agreement.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">deviceInfo</span></td>
            <td>Object</td>
            <td>Device info of the offline device. It will only be returned in the case of offline agreement creation.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">documentVisibilityEnabled</span></td>
            <td>Boolean</td>
            <td>Determines whether limited document visibility is enabled or not. Will never be returned in offline agreement creation.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">createdDate</span></td>
            <td>Date</td>
            <td>Agreement creation date.</td>
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
            <td>A unique identifier provided by an external system search for your transaction through the API.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">postSignOption</span></td>
            <td>Object</td>
            <td>Determines the URL and associated properties for the success page the user will be taken to after completing the signing process. Will never be returned in offline agreement creation.</td>
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
            <td>The message associated with the agreement that the sender has provided.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">reminderFrequency</span></td>
            <td>Enum</td>
            <td>Specifies how often reminders will be sent to the recipients.</td>
            <td>DAILY_UNTIL_SIGNED, WEEKLY_UNTIL_SIGNED</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">senderEmail</span></td>
            <td>String</td>
            <td>Email of the sender.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">vaultingInfo</span></td>
            <td>Object</td>
            <td>Specifies the vaulting properties that allow Acrobat Sign to securely store documents with a vault provider.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">workflowId</span></td>
            <td>String</td>
            <td>Identifier of the custom workflow that defines the routing path of an agreement. Will not be returned in offline agreement creation.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantSetsInfo</span></td>
            <td>Object</td>
            <td>Returns a list of one or more participant sets. A participant set may have one or more participants. Returned only if the conditional parameter includeParticipantInfo is set to true and the payload size is less than the threshold.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">documentsInfo</span></td>
            <td>Object</td>
            <td>Returns the IDs of the documents of an agreement. Returned only if the conditional parameter includeDocumentsInfo is set to true and payload size is less than the threshold. In some cases when document processing takes a lot of time, you might not get documentsInfo even if the conditional parameter includeDocumentsInfo was set to true. In such a case try calling the v6 {`GET /agreements/{agreementId}/documents`} API to get the details of the documents of an agreement.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">supportingDocuments</span></td>
            <td>Object</td>
            <td>Returns the supporting documents of an agreement. Returned only if the conditional parameter includeDocumentsInfo is set to true and payload size is less than the threshold. In some cases when document processing takes a lot of time, you might not get documentsInfo even if the conditional parameter includeDocumentsInfo was set to true, In such a case try calling the v6 {`GET /agreements/{agreementId}/documents`} API to get the details of the supporting documents of an agreement.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">conditionalParametersTrimmed</span></td>
            <td>Array of Strings</td>
            <td>If event notification payload size exceeds the defined threshold, the conditional parameters will not be sent in the notification request, even if they are set to true by the webhook creator. The conditionalParametersTrimmed attribute will be set to the keys trimmed in this case. If no conditional parameters are specified by the webhook creator, or if they are specified, but no key is trimmed, this parameter will not be returned.</td>
            <td></td>
        </tr>
    </tbody>
</table>

## AGREEMENT_ALL

Web app name: Agreement all events

To subscribe to all agreement events, subscribe to AGREEMENT_ALL.

<InlineAlert slots="text" />

AGREEMENT_ALL retrieves all agreement events, including events added in the future.

## AGREEMENT_CREATED

Web app name: Agreement created

Triggers when an agreement or draft is created.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the originator of the agreement who sent the agreement on behalf of the sender in the case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the originator of the agreement who sent the agreement on behalf of the sender in the case of account sharing.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_RESTARTED

Web app name: Agreement restarted.

Triggers when an agreement is restarted.

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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_SHARED

Web app name: Agreement shared

Triggers when an agreement has been shared by a participant.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the user to whom the agreement is shared.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user to whom the agreement is shared.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the user by whom the agreement is shared. This can be sender, signer or delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user by whom the agreement is shared. This can be sender, signer or delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the user on whose behalf this agreement is shared in case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the user on whose behalf this agreement is shared in case of account sharing.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_UNSHARED

Web app name: Agreement unshared

Triggers when an agreement has been unshared.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the user to whom the agreement is shared.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user to whom the agreement is shared.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the user by whom the agreement is shared. This can be sender, signer or delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user by whom the agreement is shared. This can be sender, signer or delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the user on whose behalf this agreement is shared in case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the user on whose behalf this agreement is shared in case of account sharing.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_UNSHARED_AUTO

Web app name: Agreement unshared auto

Triggers when an agreement has been automatically unshared.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the user to whom the agreement is shared.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user to whom the agreement is shared.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the user by whom the agreement is shared. This can be sender, signer or delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user by whom the agreement is shared. This can be sender, signer or delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the user on whose behalf this agreement is shared in case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the user on whose behalf this agreement is shared in case of account sharing.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_MODIFIED

Web app name: Agreement modified

Triggers when an agreement in an "in-process" un-signed agreement has been replaced or changed.

**Status change on event**: The value of <span style="color: #e74c3c">status</span> in the event notification payload is unchanged.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the originator of the agreement who modified the agreement on behalf of the sender in the case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the originator of the agreement who modified the agreement on behalf of the sender in the case of account sharing.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_PARTICIPANT_COMPLETED

Web app name: Agreement participant completed

Triggers when a participant completes their action.

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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_PARTICIPANT_REPLACED

Web app name: Agreement participant replaced

Triggers when an agreement’s participant is replaced.

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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_ACTION_REPLACED_SIGNER

Web app name: Agreement participant replaced

Triggers when an agreement signer changes.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the replaced signer.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the replaced signer.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The ID of the originator of the agreement.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The email of the originator of the agreement.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the originator of the agreement who replaced a signer on behalf of the sender in the case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the originator of the agreement who replaced a signer on behalf of the sender in the case of account sharing.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_ACTION_DELEGATED

Web app name: Agreement delegated

Triggers when an agreement is delegated by a participant.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

<table columnWidths="22,8,70">
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
            <td><span style="color: #e74c3c">subEvent</span></td>
            <td>String</td>
            <td>Subevent.</td>
            <td>DELEGATED, AUTO_DELEGATED</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserId</span></td>
            <td>String</td>
            <td>The user ID of the delegatee.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the delegatee.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the delegator.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the delegator.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
            <td></td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantRole": "",
    "actionType": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_ACTION_REQUESTED

Web app name: Agreement sent

Triggers when an agreement is sent to a participant.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the user to whom the action is requested. User could be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user to whom the action is requested. User could be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantRole": "",
    "actionType": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_ACTION_COMPLETED

Web app name: Agreement participant completed

Triggers when a participant completes their action.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

<table columnWidths="22,8,70">
    <thead>
        <tr>
            <th>Parameter name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Possible Enums</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span style="color: #e74c3c">actionType</span></td>
            <td>String</td>
            <td>Action type for the event.</td>
            <td>ESIGNED, DIGSIGNED, WRITTEN_SIGNED, PRESIGNED, ACCEPTED, SIGNED, APPROVED, DELIVERED, FORM_FILLED, ACKNOWLEDGED, DIGITAL_SIGN_UIDAI_SIGNER_CONSENT</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserId</span></td>
            <td>String</td>
            <td>The user ID of the action taker. This can be the signer or the delegatee.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the action taker. This can be the signer or the delegatee.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the action taker. This can be the signer or the delegatee.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the action taker. This can be the signer or the delegatee.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
            <td></td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantRole": "",
    "actionType": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_AUTO_CANCELLED_CONVERSION_PROBLEM

Web app name: Agreement creation failed

Triggers when an agreement is auto-canceled due to a conversion problem.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user ID of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td></td>
        </tr>
    </tbody>
</table>

<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreementCancellationInfo": {
        "comment": "",
        "notifyOthers": ""
      },
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        }
    }
}
```

#### Payload example

```json
{
    "webhookId": "d6128c34-eef7-498b-a689-05d6778ca78a",
    "webhookName": "test webhook",
    "webhookNotificationId": "55e823d5-82e3-4245-a6c4-23e7df4cd1f5",
    "webhookUrlInfo": {
      "url": "https://testurl.com/events"
    },
    "webhookScope": "ACCOUNT",
    "webhookNotificationApplicableUsers": [
      {
        "id": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
        "email": "sender@gmail.com",
        "role": "SENDER",
        "payloadApplicable": true
      }
    ],
    "event": "AGREEMENT_AUTO_CANCELLED_CONVERSION_PROBLEM",
    "eventDate": "2024-04-25T22:58:51Z",
    "eventResourceType": "agreement",
    "participantUserId": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
    "participantUserEmail": "sender@gmail.com",
    "actingUserId": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
    "actingUserEmail": "sender@gmail.com",
    "initiatingUserId": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
    "initiatingUserEmail": "sender@gmail.com",
    "agreementCancellationInfo": {
      "comment": "We were unable to create your agreement, because we had a problem processing your document.",
      "notifyOthers": false
    },
    "agreement": {
      "id": "CBJCHBCAABAAMwk43VWKmyL708A1teGI_XLeKJlHSljd",
      "name": "test agreement",
      "signatureType": "ESIGN",
      "status": "CANCELLED",
      "documentVisibilityEnabled": false,
      "createdDate": "2024-04-25T22:58:51Z",
      "locale": "en_US",
      "message": "Please review and complete test agr.",
      "senderEmail": "sender@gmail.com",
      "participantSetsInfo": {
        "participantSets": [
          {
            "memberInfos": [
              {
                "id": "CBJCHBCAABAALxrd1B4PEWKMjIjc2IAl-Gv3JXQJ8yP8",
                "email": "signer@gmail.com",
                "company": "Test Company",
                "name": "test user",
                "status": "ACTIVE"
              }
            ],
            "order": 1,
            "role": "SIGNER",
            "status": "NOT_YET_VISIBLE",
            "id": "CBJCHBCAABAA_0EWxXrpX53FCoX23etqlTnnRh7T7vMh"
          }
        ]
      }
    }
  }
```

## AGREEMENT_DOCUMENTS_DELETED

Web app name: Agreement deleted

Triggers when agreement documents are deleted.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the originator of the agreement who deleted the documents on behalf of the sender in the case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the originator of the agreement who deleted the documents on behalf of the sender in the case of account sharing.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_EMAIL_BOUNCED

Web app name: Agreement email bounced

Triggers when an agreement email gets bounced.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the user for which the email bounced. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user for which the email bounced. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the user for which the email bounced. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user for which the email bounced. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_EMAIL_VIEWED

Web app name: Agreement email viewed

Triggers when an agreement email is viewed by a recipient.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the user who viewed the email. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user who viewed the email. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the user who viewed the email. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_EMAIL_OTP_AUTHENTICATED

Web app name: Agreement participant Email OTP authenticated

Triggers when an agreement participant is authenticated via email OTP.

## AGREEMENT_RECALLED_MAX_SIGNING_EMAIL_OTP_ATTEMPTS

Web app name: Agreement RECALLED Maximum signing Email OTP attempts

Triggers when the maximum number of Email OTP authentication attempts exceeds.

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
            "email": "",
            "id": "",
            "payloadApplicable": "",
            "role": ""
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
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "emailOption": {
            "sendTarget": {
                "completionEmails": "",
                "inFlightEmails": "",
                "initEmails": ""
            }
        },
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_REMINDER_INITIATED

Web app name: Agreement reminder initiated

Triggers when an agreement reminder is initiated.

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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantRole": "",
    "actionType": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    },
    "reminderInfo": {
        "id": "",
        "note": "",
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

## AGREEMENT_REMINDER_SENT

Web app name: Agreement reminder sent

Triggers when an agreement reminder is sent.

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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantRole": "",
    "actionType": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    },
    "reminderInfo": {
        "id": "",
        "note": "",
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

## AGREEMENT_OFFLINE_SYNC

Web app name: Agreement synced post offline event

Triggers when an offline agreement syncs.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the user for whom the signing URL is fetched. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user for whom the signing URL is fetched. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the user for whom the signing URL is fetched. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user for whom the signing URL is fetched. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_WEB_IDENTITY_AUTHENTICATED

Web app name: Agreement participant social identity authenticated

Deprecated. Do not subscribe to this event.

Triggers when an agreement participant is authenticated through web or social identity, such as Google, Facebook, and so on.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the authenticated user. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the authenticated user. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the authenticated user. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the authenticated user. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_KBA_AUTHENTICATED

Web app name: Agreement participant KBA authenticated

Triggers when an agreement participant is authenticated through knowledge-based authentication.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the authenticated user. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the authenticated user. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the authenticated user. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the authenticated user. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_READY_TO_NOTARIZE

Web app name: Not available in the UI

Triggers when an agreement is ready to notarize.

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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "accountId": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_USER_ACK_AGREEMENT_MODIFIED

Web app name: Agreement modification acknowledged

Triggers when a signer acknowledges modification before signing.

**Status change on event**: The value of <span style="color: #e74c3c">status</span> in the event notification payload is unchanged.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the user who acknowledged the agreement modifications. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user who acknowledged the agreement modifications. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the user who acknowledged the agreement modifications. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user who acknowledged the agreement modifications. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_READY_TO_VAULT

Web app name: Not available in the UI

Triggers when an agreement is ready to vault.

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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_VAULTED

Web app name: Agreement vaulted

Triggers when an agreement is vaulted.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the most recent signing user. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the most recent signing user. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the most recent signing user. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the most recent signing user. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_SIGNER_NAME_CHANGED_BY_SIGNER

Web app name: Agreement signer name changed by signer

Triggers when a recipient changes their name value during the e-signing process from the name value provided when the agreement was created.

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
            "email": "",
            "id": "",
            "payloadApplicable": "",
            "role": ""
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
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "emailOption": {
            "sendTarget": {
                "completionEmails": "",
                "inFlightEmails": "",
                "initEmails": ""
            }
        },
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_WORKFLOW_COMPLETED

Web app name: Agreement workflow completed

Triggers when an agreement workflow is completed successfully, and all participants have taken their respective action.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the last action taker. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the last action taker. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the last action taker. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the last action taker. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantRole": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        },
        "signedDocumentInfo": {
            "document": ""
        }
    }
}
```

## AGREEMENT_DELETED

Web app name: Agreement deleted

Triggers when agreement documents are deleted.

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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_RECALLED

+ Updated: July, 2023
+ Web app name: Agreement cancelled
+ Triggers when an agreement is canceled/recalled

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

<table columnWidths="23,10,34,34">
    <thead>
        <tr>
            <th>Parameter name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Possible Enums</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span style="color: #e74c3c">subEvent</span></td>
            <td>String</td>
            <td>Subevent.</td>
            <td>RECALLED, MAX_SIGNING_KBA_ATTEMPTS_EXCEEDED, MAX_SIGNING_PASSWORD_ATTEMPTS_EXCEEDED, MAX_SIGNING_PHONE_ATTEMPTS_EXCEEDED</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserId</span></td>
            <td>String</td>
            <td>The user ID of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user ID email of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sender or originator of the agreement. When this agreement is created by signing a widget, then this will be details of the creator of the widget.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the originator of the agreement who recalled the agreement on behalf of the sender in the case of account sharing.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the originator of the agreement who recalled the agreement on behalf of the sender in the case of account sharing.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the originator of the agreement who recalled the agreement on behalf of the sender in the case of account sharing.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">comment</span></td>
            <td>String</td>
            <td>Any arbitrary comment.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">notifyOthers</span></td>
            <td>Boolean</td>
            <td>True or false (default) depending on whether recipients should be notified that the transaction(s) have been cancelled. This field is set when an agreement is cancelled using the <span style="color: #e74c3c">PUT {`/agreements/{agreementId}/state`}</span> API.</td>
            <td></td>
        </tr>
    </tbody>
</table>

<CodeBlock slots="heading, code" repeat="3" languages="JSON, JSON, JSON" />

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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    },
    "agreementCancellationInfo": {
        "comment": "",
        "notifyOthers": ""
    }
}
```

#### [Recalled with a reason](#recalled-with-a-reason "Payload template: Sender recalls the agreement along with a reason for cancellation")

```json
{
    "webhookId": "d6128c34-eef7-498b-a689-05d6778ca78a",
    "webhookName": "test webhook",
    "webhookNotificationId": "225ad211-9569-4509-9aa3-d85f88d4981e",
    "webhookUrlInfo": {
      "url": "https://testurl.com/events"
    },
    "webhookScope": "ACCOUNT",
    "webhookNotificationApplicableUsers": [
      {
        "id": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
        "email": "sender@gmail.com",
        "role": "SENDER",
        "payloadApplicable": true
      },
      {
        "id": "CBJCHBCAABAAODofjR2IzvDwNv6qQ4H85QnVqgykMVTW",
        "email": "signer@gmail.com",
        "role": "SIGNER",
        "payloadApplicable": false
      }
    ],
    "event": "AGREEMENT_RECALLED",
    "eventDate": "2024-04-25T21:04:33Z",
    "eventResourceType": "agreement",
    "participantUserId": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
    "participantUserEmail": "sender@gmail.com",
    "actingUserId": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
    "actingUserEmail": "sender@gmail.com",
    "initiatingUserId": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
    "initiatingUserEmail": "sender@gmail.com",
    "agreementCancellationInfo": {
      "comment": "Cancelling the Agreement to update the terms and conditions.",
      "notifyOthers": true
    },
    "agreement": {
      "id": "CBJCHBCAABAAT67oHETNYf-vouFg1WMsNZJMqtv6wEFD",
      "name": "test agreement",
      "signatureType": "ESIGN",
      "status": "CANCELLED",
      "documentVisibilityEnabled": false,
      "createdDate": "2024-04-25T21:03:56Z",
      "locale": "en_US",
      "message": "Please review and complete test agreement.",
      "senderEmail": "sender@gmail.com",
      "participantSetsInfo": {
        "participantSets": [
          {
            "memberInfos": [
              {
                "id": "CBJCHBCAABAAwI63k09w6xRLob7rE_TV9UAeksMjKTZu",
                "email": "signer@gmail.com",
                "company": "test1Global",
                "name": "test user",
                "status": "ACTIVE"
              }
            ],
            "order": 1,
            "role": "SIGNER",
            "status": "CANCELLED",
            "id": "CBJCHBCAABAAFLCGKLsKoN20y7i1X7cN7ZTXoA2Pqs5z"
          }
        ]
      },
      "documentsInfo": {
        "documents": [
          {
            "id": "3AAABLKmtbUAG5pZEwv-NE6kdRvfJf1yO-jKdQ6EuBHMLA6-ey8CcxBMXsXbRZV2n80Q9OQASMmeOrdOn4CX3pR7nUjJHs-uj",
            "numPages": 1,
            "mimeType": "application/pdf",
            "name": "Sample Form modify.pdf"
          }
        ]
      }
    }
  }
```

####  [Recalled without reason](#recalled-without-reason "Payload template: Sender recalls the agreement without providing a reason")

```json
{
    "webhookId": "d6128c34-eef7-498b-a689-05d6778ca78a",
    "webhookName": "test webhook",
    "webhookNotificationId": "225ad211-9569-4509-9aa3-d85f88d4981e",
    "webhookUrlInfo": {
      "url": "https://testurl.com/events"
    },
    "webhookScope": "ACCOUNT",
    "webhookNotificationApplicableUsers": [
      {
        "id": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
        "email": "sender@gmail.com",
        "role": "SENDER",
        "payloadApplicable": true
      },
      {
        "id": "CBJCHBCAABAAODofjR2IzvDwNv6qQ4H85QnVqgykMVTW",
        "email": "signer@gmail.com",
        "role": "SIGNER",
        "payloadApplicable": false
      }
    ],
    "event": "AGREEMENT_RECALLED",
    "eventDate": "2024-04-25T21:04:33Z",
    "eventResourceType": "agreement",
    "participantUserId": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
    "participantUserEmail": "sender@gmail.com",
    "actingUserId": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
    "actingUserEmail": "sender@gmail.com",
    "initiatingUserId": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
    "initiatingUserEmail": "sender@gmail.com",
    "agreementCancellationInfo": {
      "comment": "Sender canceled without providing a reason.",
      "notifyOthers": true
    },
    "agreement": {
      "id": "CBJCHBCAABAAT67oHETNYf-vouFg1WMsNZJMqtv6wEFD",
      "name": "test agreement",
      "signatureType": "ESIGN",
      "status": "CANCELLED",
      "documentVisibilityEnabled": false,
      "createdDate": "2024-04-25T21:03:56Z",
      "locale": "en_US",
      "message": "Please review and complete test agreement.",
      "senderEmail": "sender@gmail.com",
      "participantSetsInfo": {
        "participantSets": [
          {
            "memberInfos": [
              {
                "id": "CBJCHBCAABAAwI63k09w6xRLob7rE_TV9UAeksMjKTZu",
                "email": "signer@gmail.com",
                "company": "test1Global",
                "name": "test user",
                "status": "ACTIVE"
              }
            ],
            "order": 1,
            "role": "SIGNER",
            "status": "CANCELLED",
            "id": "CBJCHBCAABAAFLCGKLsKoN20y7i1X7cN7ZTXoA2Pqs5z"
          }
        ]
      },
      "documentsInfo": {
        "documents": [
          {
            "id": "3AAABLKmtbUAG5pZEwv-NE6kdRvfJf1yO-jKdQ6EuBHMLA6-ey8CcxBMXsXbRZV2n80Q9OQASMmeOrdOn4CX3pR7nUjJHs-uj",
            "numPages": 1,
            "mimeType": "application/pdf",
            "name": "Sample Form modify.pdf"
          }
        ]
      }
    }
  }
```

## AGREEMENT_REJECTED

Web app name: Agreement rejected

Triggers when an agreement is rejected by a participant.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

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
            <td>The user ID of the action taker. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the action taker. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the action taker. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the action taker. This can be the signer or the delegatee.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
        </tr>
    </tbody>
</table>

<CodeBlock slots="heading, code" repeat="3" languages="JSON, JSON, JSON" />

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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreementCancellationInfo": {
        "comment": "",
        "notifyOthers": ""
      },
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

#### [Rejected without reason](#rejected-without-reason "Payload template: Signer rejects an agreement without providing a reason")

```json
{
    "webhookId": "d6128c34-eef7-498b-a689-05d6778ca78a",
    "webhookName": "test webhook",
    "webhookNotificationId": "8e511c56-14b5-4ae1-b838-6c031779fc86",
    "webhookUrlInfo": {
      "url": "https://testurl.com/events"
    },
    "webhookScope": "ACCOUNT",
    "webhookNotificationApplicableUsers": [
      {
        "id": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
        "email": "sender@gmail.com",
        "role": "SENDER",
        "payloadApplicable": true
      },
      {
        "id": "CBJCHBCAABAAODofjR2IzvDwNv6qQ4H85QnVqgykMVTW",
        "email": "signer@gmail.com",
        "role": "SIGNER",
        "payloadApplicable": false
      }
    ],
    "event": "AGREEMENT_REJECTED",
    "eventDate": "2024-04-25T21:01:47Z",
    "eventResourceType": "agreement",
    "participantUserId": "CBJCHBCAABAAODofjR2IzvDwNv6qQ4H85QnVqgykMVTW",
    "participantUserEmail": "signer@gmail.com",
    "actingUserId": "CBJCHBCAABAAODofjR2IzvDwNv6qQ4H85QnVqgykMVTW",
    "actingUserEmail": "signer@gmail.com",
    "initiatingUserId": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
    "initiatingUserEmail": "sender@gmail.com",
    "agreementCancellationInfo": {
      "comment": "Signer canceled without providing a reason.",
      "notifyOthers": false
    },
    "agreement": {
      "id": "CBJCHBCAABAAEcvooowoyU_fafwHqEEc0MlaZQ36iPs_",
      "name": "test agreement",
      "signatureType": "ESIGN",
      "status": "CANCELLED",
      "documentVisibilityEnabled": false,
      "createdDate": "2024-04-25T21:00:45Z",
      "locale": "en_US",
      "message": "Please review and complete test agreement.",
      "senderEmail": "sender@gmail.com",
      "participantSetsInfo": {
        "participantSets": [
          {
            "memberInfos": [
              {
                "id": "CBJCHBCAABAAuYILUZRn4Z0679H3Ktppxe0avhvfDGtB",
                "email": "signer@gmail.com",
                "company": "test1Global",
                "name": "test user",
                "status": "ACTIVE"
              }
            ],
            "order": 1,
            "role": "SIGNER",
            "status": "CANCELLED",
            "id": "CBJCHBCAABAAnekZaUMuKGJzUba9aKoD4G9zRRE3ELhR"
          }
        ]
      },
      "documentsInfo": {
        "documents": [
          {
            "id": "3AAABLKmtbUBzoeXDvcKDcY4w8S7itEJ-Ptbha7ai2gk7PFx4xh7ho9eazPB6duU8gSCAFHdWgT0pfOlaFNqjE5kCsMe_hRws",
            "numPages": 1,
            "mimeType": "application/pdf",
            "name": "Sample Form modify.pdf"
          }
        ]
      }
    }
  }
```

#### [Rejected with comment](#rejected-with-comment "Payload template: Signer rejects an agreement with comment")

```json
{
    "webhookId": "d6128c34-eef7-498b-a689-05d6778ca78a",
    "webhookName": "test webhook",
    "webhookNotificationId": "c2c736a1-e8ff-4dd2-b07b-2bdf9e379827",
    "webhookUrlInfo": {
      "url": "https://testurl.com/events"
    },
    "webhookScope": "ACCOUNT",
    "webhookNotificationApplicableUsers": [
      {
        "id": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
        "email": "sender@gmail.com",
        "role": "SENDER",
        "payloadApplicable": true
      },
      {
        "id": "CBJCHBCAABAAODofjR2IzvDwNv6qQ4H85QnVqgykMVTW",
        "email": "signer@gmail.com",
        "role": "SIGNER",
        "payloadApplicable": false
      }
    ],
    "event": "AGREEMENT_REJECTED",
    "eventDate": "2024-04-25T20:53:36Z",
    "eventResourceType": "agreement",
    "participantUserId": "CBJCHBCAABAAODofjR2IzvDwNv6qQ4H85QnVqgykMVTW",
    "participantUserEmail": "signer@gmail.com",
    "actingUserId": "CBJCHBCAABAAODofjR2IzvDwNv6qQ4H85QnVqgykMVTW",
    "actingUserEmail": "signer@gmail.com",
    "initiatingUserId": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
    "initiatingUserEmail": "sender@gmail.com",
    "agreementCancellationInfo": {
      "comment": "Declining to sign the agreement",
      "notifyOthers": false
    },
    "agreement": {
      "id": "CBJCHBCAABAAmDDrjaJHSS2X0iJCVx072w7vyii6yjXv",
      "name": "test agreement",
      "signatureType": "ESIGN",
      "status": "CANCELLED",
      "documentVisibilityEnabled": false,
      "createdDate": "2024-04-25T20:52:45Z",
      "locale": "en_US",
      "message": "Please review and complete test agreement.",
      "senderEmail": "sender@gmail.com",
      "participantSetsInfo": {
        "participantSets": [
          {
            "memberInfos": [
              {
                "id": "CBJCHBCAABAAVydxko4RkOlEqFio2Ug-JSFSuiIrbvS8",
                "email": "signer@gmail.com",
                "company": "testGlobal",
                "name": "test user",
                "status": "ACTIVE"
              }
            ],
            "order": 1,
            "role": "SIGNER",
            "status": "CANCELLED",
            "id": "CBJCHBCAABAA93Jpi2FumEKmZQp4Z_zdkIH3AZLuEaLJ"
          }
        ]
      },
      "documentsInfo": {
        "documents": [
          {
            "id": "3AAABLKmtbUAz51oinPNFxC4CVK06zUbX3V4vvcpIFJWSDqiT3T1U5YrIB4GL1IIEi3Lbq1cAr7HzTsObnNyl9bwybZ6RyYqW",
            "numPages": 1,
            "mimeType": "application/pdf",
            "name": "Sample Form modify.pdf"
          }
        ]
      }
    }
  }
```

## AGREEMENT_EXPIRED

Web app name: Agreement expired

Triggers when an agreement expires.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Agreement](#payload-attributes-inherited-from-agreement)</span>.***

<table columnWidths="22,8,70">
    <thead>
        <tr>
            <th>Parameter name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Possible Enums</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span style="color: #e74c3c">subEvent</span></td>
            <td>String</td>
            <td>Subevent.</td>
            <td>EXPIRED, EXPIRED_AUTOMATICALLY</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserId</span></td>
            <td>String</td>
            <td>The user ID of the user for which agreement expired. This can be the signer or the delegatee.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user for which agreement expired. This can be the signer or the delegatee.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the user for which agreement expired. This can be the signer or the delegatee.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user for which agreement expired. This can be the signer or the delegatee.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>Never part of the payload.</td>
            <td></td>
        </tr>
    </tbody>
</table>

<CodeBlock slots="heading, code" repeat="3" languages="JSON, JSON, JSON" />

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
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserEmail": "",
    "actingUserIpAddress": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreementExpirationInfo" : {"comment" : ""},
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

#### [Expired with set expiration date](#expired-with-set-expiration-date "Payload template: Agreement expired with set expiration date")

```json
{
    "webhookId": "d6128c34-eef7-498b-a689-05d6778ca78a",
    "webhookName": "test webhook",
    "webhookNotificationId": "b205dc27-5013-4907-a9c4-27d923842b98",
    "webhookUrlInfo": {
      "url": "https://testurl.com/events"
    },
    "webhookScope": "ACCOUNT",
    "webhookNotificationApplicableUsers": [
      {
        "id": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
        "email": "sender@gmail.com",
        "role": "SENDER",
        "payloadApplicable": true
      },
      {
        "id": "CBJCHBCAABAAODofjR2IzvDwNv6qQ4H85QnVqgykMVTW",
        "email": "signer@gmail.com",
        "role": "SIGNER",
        "payloadApplicable": false
      }
    ],
    "event": "AGREEMENT_EXPIRED",
    "eventDate": "2024-04-25T21:10:42Z",
    "eventResourceType": "agreement",
    "participantUserId": "CBJCHBCAABAAODofjR2IzvDwNv6qQ4H85QnVqgykMVTW",
    "participantUserEmail": "signer@gmail.com",
    "actingUserId": "CBJCHBCAABAAODofjR2IzvDwNv6qQ4H85QnVqgykMVTW",
    "actingUserEmail": "signer@gmail.com",
    "initiatingUserId": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
    "initiatingUserEmail": "sender@gmail.com",
    "agreementExpirationInfo": {
      "comment": "Sender set the completion deadline of 2 days from creation. The agreement expired on 2024-04-25T21:10:35Z."
    },
    "agreement": {
      "id": "CBJCHBCAABAAyoW7KlbsBoeGXa1PrMlq3cEvk_g0lurQ",
      "name": "TEST agreement",
      "signatureType": "ESIGN",
      "status": "EXPIRED",
      "documentVisibilityEnabled": false,
      "createdDate": "2024-04-23T21:06:35Z",
      "expirationTime": "2024-04-25T21:10:35Z",
      "locale": "en_US",
      "message": "Please review and complete TEST agreement.",
      "senderEmail": "sender@gmail.com",
      "participantSetsInfo": {
        "participantSets": [
          {
            "memberInfos": [
              {
                "id": "CBJCHBCAABAAVU6xS21mYZ81Vzlj7QHNK-mXPSi87KF0",
                "email": "signer@gmail.com",
                "company": "test1Global",
                "name": "test user",
                "status": "ACTIVE"
              }
            ],
            "order": 1,
            "role": "SIGNER",
            "status": "EXPIRED",
            "id": "CBJCHBCAABAACAVjzl8-c802Hl0E0Y_MpuEpYv5EwGI1"
          }
        ]
      },
      "documentsInfo": {
        "documents": [
          {
            "id": "3AAABLKmtbUCuPAtEYDUcCcx3tnJtYG4m7ghd0kh_VetlG3QH6GztAtSI7LzDy5JY1D6lozKMV6GDG4liNlMJqCgQmNIw-JqG",
            "numPages": 1,
            "mimeType": "application/pdf",
            "name": "Sample Form modify.pdf"
          }
        ]
      }
    }
  }
```

#### [Expired after 365 days](#expired-after-365-days "Payload template: Agreement expired after 365 days")

```json
{
    "webhookId": "d6128c34-eef7-498b-a689-05d6778ca78a",
    "webhookName": "test webhook",
    "webhookNotificationId": "b205dc27-5013-4907-a9c4-27d923842b98",
    "webhookUrlInfo": {
      "url": "https://testurl.com/events"
    },
    "webhookScope": "ACCOUNT",
    "webhookNotificationApplicableUsers": [
      {
        "id": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
        "email": "sender@gmail.com",
        "role": "SENDER",
        "payloadApplicable": true
      },
      {
        "id": "CBJCHBCAABAAODofjR2IzvDwNv6qQ4H85QnVqgykMVTW",
        "email": "signer@gmail.com",
        "role": "SIGNER",
        "payloadApplicable": false
      }
    ],
    "event": "AGREEMENT_EXPIRED",
    "eventDate": "2024-04-25T21:10:42Z",
    "eventResourceType": "agreement",
    "participantUserId": "CBJCHBCAABAAODofjR2IzvDwNv6qQ4H85QnVqgykMVTW",
    "participantUserEmail": "signer@gmail.com",
    "actingUserId": "CBJCHBCAABAAODofjR2IzvDwNv6qQ4H85QnVqgykMVTW",
    "actingUserEmail": "signer@gmail.com",
    "initiatingUserId": "CBJCHBCAABAAnOQJR8SKYbAVrQ7tqpviuW2way7m5Kqv",
    "initiatingUserEmail": "sender@gmail.com",
    "agreementExpirationInfo": {
      "comment": "Acrobat Sign set the completion deadline of 365 days from creation. The agreement expired on 2024-04-25T21:10:35Z."
    },
    "agreement": {
      "id": "CBJCHBCAABAAyoW7KlbsBoeGXa1PrMlq3cEvk_g0lurQ",
      "name": "TEST agreement",
      "signatureType": "ESIGN",
      "status": "EXPIRED",
      "documentVisibilityEnabled": false,
      "createdDate": "2023-04-23T21:06:35Z",
      "expirationTime": "2024-04-25T21:10:35Z",
      "locale": "en_US",
      "message": "Please review and complete TEST agreement.",
      "senderEmail": "sender@gmail.com",
      "participantSetsInfo": {
        "participantSets": [
          {
            "memberInfos": [
              {
                "id": "CBJCHBCAABAAVU6xS21mYZ81Vzlj7QHNK-mXPSi87KF0",
                "email": "signer@gmail.com",
                "company": "test1Global",
                "name": "test user",
                "status": "ACTIVE"
              }
            ],
            "order": 1,
            "role": "SIGNER",
            "status": "EXPIRED",
            "id": "CBJCHBCAABAACAVjzl8-c802Hl0E0Y_MpuEpYv5EwGI1"
          }
        ]
      },
      "documentsInfo": {
        "documents": [
          {
            "id": "3AAABLKmtbUCuPAtEYDUcCcx3tnJtYG4m7ghd0kh_VetlG3QH6GztAtSI7LzDy5JY1D6lozKMV6GDG4liNlMJqCgQmNIw-JqG",
            "numPages": 1,
            "mimeType": "application/pdf",
            "name": "Sample Form modify.pdf"
          }
        ]
      }
    }
  }
```

## AGREEMENT_EXPIRATION_UPDATED

Web app name: Not available in the UI

Triggers when an agreement’s expiration date is updated.

TBD

<CodeBlock slots="heading, code" repeat="1" languages="JSON" />

#### Payload template

```json
{
    "originatorAccountId": "",
    "actingUserEmail": "",
    "actingUserId": "",
    "actingUserIpAddress": "",
    "agreement": {
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "createdDate": "",
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "deviceTime": "",
            "location": {
                "latitude": "",
                "longitude": ""
            }
        },
        "documentVisibilityEnabled": "",
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "mimeType": "",
                    "name": "",
                    "numPages": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        },
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "firstReminderDelay": "",
        "id": "",
        "locale": "",
        "message": "",
        "name": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "id": "",
                    "memberInfos": [
                        {
                            "company": "",
                            "email": "",
                            "id": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "name": "",
                    "order": "",
                    "privateMessage": "",
                    "role": "",
                    "status": ""
                }
            ]
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "reminderFrequency": "",
        "senderEmail": "",
        "signatureType": "",
        "status": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": ""
    },
    "event": "",
    "eventDate": "",
    "eventResourceParentId": "",
    "eventResourceParentType": "",
    "eventResourceType": "",
    "initiatingUserEmail": "",
    "initiatingUserId": "",
    "participantUserEmail": "",
    "participantUserId": "",
    "subEvent": "",
    "webhookId": "",
    "webhookName": "",
    "webhookNotificationApplicableUsers": [
        {
            "email": "",
            "id": "",
            "payloadApplicable": "",
            "role": ""
        }
    ],
    "webhookNotificationId": "",
    "webhookScope": "",
    "webhookUrlInfo": {
        "url": ""
    }
}
```

## AGREEMENT_DOCUMENTS_VIEWED

+ Implemented: July, 2023
+ Web app name: Not available in the UI
+ Triggers when a user views an agreement

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
            "email": "",
            "id": "",
            "payloadApplicable": "",
            "role": ""
        }
    ],
    "event": "",
    "subEvent": "",
    "eventDate": "",
    "eventResourceType": "",
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserIpAddress": "",
    "actingUserEmail": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```

## AGREEMENT_DOCUMENTS_VIEWED_PASSWORD_PROTECTED

+ Implemented: July, 2023
+ Web app name: Not available in the UI
+ Triggers when a user views an agreement that is password protected

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
            "email": "",
            "id": "",
            "payloadApplicable": "",
            "role": ""
        }
    ],
    "event": "",
    "subEvent": "",
    "eventDate": "",
    "eventResourceType": "",
    "eventResourceParentType": "",
    "eventResourceParentId": "",
    "participantUserId": "",
    "participantUserEmail": "",
    "actingUserId": "",
    "actingUserIpAddress": "",
    "actingUserEmail": "",
    "initiatingUserId": "",
    "initiatingUserEmail": "",
    "agreement": {
        "id": "",
        "name": "",
        "signatureType": "",
        "status": "",
        "ccs": [
            {
                "email": "",
                "label": "",
                "visiblePages": [
                    ""
                ]
            }
        ],
        "deviceInfo": {
            "applicationDescription": "",
            "deviceDescription": "",
            "location": {
                "latitude": "",
                "longitude": ""
            },
            "deviceTime": ""
        },
        "documentVisibilityEnabled": "",
        "createdDate": "",
        "expirationTime": "",
        "externalId": {
            "id": ""
        },
        "postSignOption": {
            "redirectDelay": "",
            "redirectUrl": ""
        },
        "firstReminderDelay": "",
        "locale": "",
        "message": "",
        "reminderFrequency": "",
        "senderEmail": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "workflowId": "",
        "participantSetsInfo": {
            "participantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ],
            "nextParticipantSets": [
                {
                    "memberInfos": [
                        {
                            "id": "",
                            "email": "",
                            "company": "",
                            "name": "",
                            "privateMessage": "",
                            "status": ""
                        }
                    ],
                    "order": "",
                    "role": "",
                    "status": "",
                    "id": "",
                    "name": "",
                    "privateMessage": ""
                }
            ]
        },
        "documentsInfo": {
            "documents": [
                {
                    "id": "",
                    "label": "",
                    "numPages": "",
                    "mimeType": "",
                    "name": ""
                }
            ],
            "supportingDocuments": [
                {
                    "displayLabel": "",
                    "fieldName": "",
                    "id": "",
                    "mimeType": "",
                    "numPages": ""
                }
            ]
        }
    }
}
```
