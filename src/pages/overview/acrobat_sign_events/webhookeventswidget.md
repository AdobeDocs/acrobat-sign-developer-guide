---
title: Web Form Events — Acrobat Sign Webhook Guide
---
# Web Form Events

<InlineAlert slots="text" />

"Widgets" has been renamed to "web form" in many docs. Event names have not changed. Web form events pertain only to the creation of a web form template. The resultant child agreements are tracked as agreement events.

## Common payload elements

### Minimum payload for web form events

The following returns for an web form event if all the conditional parameters are set to false while creating webhooks:

| Parameter Name | Type | Description | Possible enums |
|---|---|---|---|
| id | String | The unique identifier of widget that can be used to retrieve the data entered by the signers |  |
| name | String | The name of the widget that will be used to identify it, in emails, website, and other places |  |
| status | Enum | The current status of the widget | DRAFT or ACTIVE or AUTHORING |


### Payload attributes inherited from Widget

***Inherited payload attributes***

| Parameter Name | Type | Description | Possible enums |
|---|---|---|---|
| id | String | The unique identifier of widget, which can be used to retrieve the data entered by the signers. |  |
| name | String | The name of the widget that will be used to identify it, in emails, website, and other places. |  |
| status | Enum | The current status of the widget. | DRAFT, AUTHORING, ACTIVE, DOCUMENTS_NOT_YET_PROCESSED, DISABLED, DISCARDED |
| ccs | Array of Strings | Email IDs of cc: participants of the widget. |  |
| authFailureInfo | Object | URL and associated properties for the error page to which the widget signer will be taken after failing to authenticate. |  |
| completionInfo | Object | URL and associated properties for the success page to which the widget signer will be taken after performing the desired action on the widget. |  |
| creatorEmail | String | Email of of the widget creator. |  |
| createdDate | Date | Widget creation date. |  |
| locale | String | Locale associated with this widget: specifies the language for the signing page and emails; for example en_US or fr_FR. If none is specified, this defaults to the language configured for the widget creator. |  |
| vaultingInfo | Object | Specifies the vaulting properties that allow Acrobat Sign to securely store documents with a vault provider. |  |
| participantSetsInfo | Object | List of all the participants in the widget except the widget signer. Returned only if the conditional parameter includeParticipantInfo is set to true and the payload size is less than the threshold. |  |
| widgetParticipantSet | Object | Represents widget participant info for whom email was not provided. |  |
| documentsInfo | Object | Retrieves the IDs of the documents associated with widget. Returned only if the conditional parameter includeDocumentsInfo is set to true and payload size is less than the threshold |  |
| conditionalParametersTrimmed | Array of Strings | If event notification payload size exceeds the defined threshold, the conditional parameters will not be sent in the notification request, even if they are set to true by the webhook creator. The conditionalParametersTrimmed attribute will be set to the keys trimmed in this case. If no conditional parameters are specified by the webhook creator, or if they are specified, but no key is trimmed, this parameter will not be returned. |  |


## WIDGET_ALL

If you want to subscribe to all widget events, subscribe to WIDGET_ALL.

Web app name: Web Form all events

<InlineAlert slots="text" />

WIDGET_ALL retrieves all agreement events, including events added in the future.

## WIDGET_CREATED

Web app name: Web Form created

Triggers when a web form is created.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Widget](#payload-attributes-inherited-from-widget)</span>.***

| Parameter name | Type | Description |
|---|---|---|
| participantUserId | String | The user ID of the widget creator. |
| participantUserEmail | String | The user email of the widget creator. |
| actingUserId | String | The user ID of the widget creator. |
| actingUserEmail | String | The user email of the widget creator. |
| initiatingUserId | String | The user ID of the sharee of the creator of the widget who created the widget on behalf of the creator in the case of account sharing. |
| initiatingUserEmail | String | The user email of the sharee of the creator of the widget who created the widget on behalf of the creator in the case of account sharing. |


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
    "widget": {
        "name": "",
        "status": "",
        "id": "",
        "authFailureInfo": {
            "url": "",
            "deframe": "",
            "delay": ""
        },
        "ccs": [
            {
                "email": ""
            }
        ],
        "completionInfo": {
            "url": "",
            "deframe": "",
            "delay": ""
        },
        "creatorEmail": "",
        "createdDate": "",
        "locale": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "participantSetsInfo": {
            "additionalParticipantSets": [
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
                    "id": ""
                }
            ],
            "widgetParticipantSet": {
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
                "id": ""
            }
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
            ]
        }
    }
}
```

## WIDGET_AUTO_CANCELLED_CONVERSION_PROBLEM

Web app name: Web Form creation failed

Triggers when Acrobat Sign can’t process certain PDFs; for example, LiveCycle documents.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Widget](#payload-attributes-inherited-from-widget)</span>.***

| Parameter name | Type | Description |
|---|---|---|
| participantUserId | String | The user ID of the widget creator. |
| participantUserEmail | String | The user email of the widget creator. |
| actingUserId | String | The user ID of the widget creator. |
| actingUserEmail | String | The user email of the widget creator. |
| initiatingUserId | String | The user ID of the sharee of the creator of the widget who created the widget on behalf of the creator in the case of account sharing. |
| initiatingUserEmail | String | The user email of the sharee of the creator of the widget who created the widget on behalf of the creator in the case of account sharing. |


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
    "widget": {
        "name": "",
        "status": "",
        "id": "",
        "authFailureInfo": {
            "url": "",
            "deframe": "",
            "delay": ""
        },
        "ccs": [
            {
                "email": ""
            }
        ],
        "completionInfo": {
            "url": "",
            "deframe": "",
            "delay": ""
        },
        "creatorEmail": "",
        "createdDate": "",
        "locale": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "participantSetsInfo": {
            "additionalParticipantSets": [
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
                    "id": ""
                }
            ],
            "widgetParticipantSet": {
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
                "id": ""
            }
        }
    }
}
```

## WIDGET_DISABLED

Web app name: Web Form disabled

Triggers when a web form is disabled.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Widget](#payload-attributes-inherited-from-widget)</span>.***

| Parameter name | Type | Description |
|---|---|---|
| participantUserId | String | The user ID of the widget creator. |
| participantUserEmail | String | The user email of the widget creator. |
| actingUserId | String | The user ID of the widget creator. |
| actingUserEmail | String | The user email of the widget creator. |
| initiatingUserId | String | The user ID of the sharee of the creator of the widget who disbaled the widget on behalf of the creator in the case of account sharing. |
| initiatingUserEmail | String | The user email of the sharee of the creator of the widget who disbaled the widget on behalf of the creator in the case of account sharing. |


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
    "widget": {
        "name": "",
        "status": "",
        "id": "",
        "authFailureInfo": {
            "url": "",
            "deframe": "",
            "delay": ""
        },
        "ccs": [
            {
                "email": ""
            }
        ],
        "completionInfo": {
            "url": "",
            "deframe": "",
            "delay": ""
        },
        "creatorEmail": "",
        "createdDate": "",
        "locale": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "participantSetsInfo": {
            "additionalParticipantSets": [
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
                    "id": ""
                }
            ],
            "widgetParticipantSet": {
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
                "id": ""
            }
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
            ]
        }
    }
}
```

## WIDGET_ENABLED

Web app name: Web form enabled.

Triggers when a web form is enabled.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Widget](#payload-attributes-inherited-from-widget)</span>.***

| Parameter name | Type | Description |
|---|---|---|
| participantUserId | String | The user ID of the widget creator. |
| participantUserEmail | String | The user email of the widget creator. |
| actingUserId | String | The user ID of the widget creator. |
| actingUserEmail | String | The user email of the widget creator. |
| initiatingUserId | String | The user ID of the sharee of the creator of the widget who enabled the widget on behalf of the creator in case of account sharing. |
| initiatingUserEmail | String | The user email of the sharee of the creator of the widget who enabled the widget on behalf of the creator in case of account sharing. |


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
    "widget": {
        "name": "",
        "status": "",
        "id": "",
        "authFailureInfo": {
            "url": "",
            "deframe": "",
            "delay": ""
        },
        "ccs": [
            {
                "email": ""
            }
        ],
        "completionInfo": {
            "url": "",
            "deframe": "",
            "delay": ""
        },
        "creatorEmail": "",
        "createdDate": "",
        "locale": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "participantSetsInfo": {
            "additionalParticipantSets": [
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
                    "id": ""
                }
            ],
            "widgetParticipantSet": {
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
                "id": ""
            }
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
            ]
        }
    }
}
```

## WIDGET_MODIFIED

Web app name: Web form modified

Triggers when a web form is modified.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Widget](#payload-attributes-inherited-from-widget)</span>.***

| Parameter name | Type | Description |
|---|---|---|
| participantUserId | String | The user ID of the widget creator. |
| participantUserEmail | String | The user email of the widget creator. |
| actingUserId | String | The user ID of the widget creator. |
| actingUserEmail | String | The user email of the widget creator. |
| initiatingUserId | String | The user ID of the sharee of the creator of the widget who modified the widget on behalf of the creator in the case of account sharing. |
| initiatingUserEmail | String | The user email of the sharee of the creator of the widget who modified the widget on behalf of the creator in the case of account sharing. |


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
    "widget": {
        "name": "",
        "status": "",
        "id": "",
        "authFailureInfo": {
            "url": "",
            "deframe": "",
            "delay": ""
        },
        "ccs": [
            {
                "email": ""
            }
        ],
        "completionInfo": {
            "url": "",
            "deframe": "",
            "delay": ""
        },
        "creatorEmail": "",
        "createdDate": "",
        "locale": "",
        "vaultingInfo": {
            "enabled": ""
        },
        "participantSetsInfo": {
            "additionalParticipantSets": [
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
                    "id": ""
                }
            ],
            "widgetParticipantSet": {
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
                "id": ""
            }
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
            ]
        }
    }
}
```

## WIDGET_SHARED

Web app name: Web form shared

Triggers when a web form is shared.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Widget](#payload-attributes-inherited-from-widget)</span>.***

| Parameter name | Type | Description |
|---|---|---|
| participantUserId | String | The user ID of the user to whom the widget is shared. |
| participantUserEmail | String | The user email of the user to whom the widget is shared. |
| actingUserId | String | The user ID of the user by whom the widget is shared. This will be creator of the widget. |
| actingUserEmail | String | The user email of the user by whom the widget is shared. This will be creator of the widget. |
| initiatingUserId | String | The user ID of the sharee of the user on whose behalf this widget is shared in the case of account sharing. |
| initiatingUserEmail | String | The user email of the sharee of the user on whose behalf this widget is shared in the case of account sharing. |


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
