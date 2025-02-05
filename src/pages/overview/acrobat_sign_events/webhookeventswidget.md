---
title: Web Form Events — Acrobat Sign Webhook Guide
---
# Web Form Events

<InlineAlert slots="text" />

"Widgets" has been renamed to "web form" in many docs. Event names have not changed. Web form events pertain only to the creation of a web form template. The resultant child agreements are tracked as agreement events.

## Common payload elements

### Minimum payload for web form events

The following returns for an web form event if all the conditional parameters are set to false while creating webhooks:

<table columnWidths="12,12,46,30">
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
            <td>The unique identifier of widget that can be used to retrieve the data entered by the signers</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">name</span></td>
            <td>String</td>
            <td>The name of the widget that will be used to identify it, in emails, website, and other places</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">status</span></td>
            <td>Enum</td>
            <td>The current status of the widget</td>
            <td>DRAFT or ACTIVE or AUTHORING</td>
        </tr>
    </tbody>
</table>

### Payload attributes inherited from Widget

***Inherited payload attributes***

<table columnWidths="30,7,33,30">
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
            <td>The unique identifier of widget, which can be used to retrieve the data entered by the signers.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">name</span></td>
            <td>String</td>
            <td>The name of the widget that will be used to identify it, in emails, website, and other places.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">status</span></td>
            <td>Enum</td>
            <td>The current status of the widget.</td>
            <td>DRAFT, AUTHORING, ACTIVE, DOCUMENTS_NOT_YET_PROCESSED, DISABLED, DISCARDED</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">ccs</span></td>
            <td>Array of Strings</td>
            <td>Email IDs of cc: participants of the widget.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">authFailureInfo</span></td>
            <td>Object</td>
            <td>URL and associated properties for the error page to which the widget signer will be taken after failing to authenticate.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">completionInfo</span></td>
            <td>Object</td>
            <td>URL and associated properties for the success page to which the widget signer will be taken after performing the desired action on the widget.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">creatorEmail</span></td>
            <td>String</td>
            <td>Email of of the widget creator.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">createdDate</span></td>
            <td>Date</td>
            <td>Widget creation date.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">locale</span></td>
            <td>String</td>
            <td>Locale associated with this widget: specifies the language for the signing page and emails; for example en_US or fr_FR. If none is specified, this defaults to the language configured for the widget creator.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">vaultingInfo</span></td>
            <td>Object</td>
            <td>Specifies the vaulting properties that allow Acrobat Sign to securely store documents with a vault provider.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantSetsInfo</span></td>
            <td>Object</td>
            <td>List of all the participants in the widget except the widget signer. Returned only if the conditional parameter includeParticipantInfo is set to true and the payload size is less than the threshold.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">widgetParticipantSet</span></td>
            <td>Object</td>
            <td>Represents widget participant info for whom email was not provided.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">documentsInfo</span></td>
            <td>Object</td>
            <td>Retrieves the IDs of the documents associated with widget. Returned only if the conditional parameter includeDocumentsInfo is set to true and payload size is less than the threshold</td>
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

## WIDGET_ALL

If you want to subscribe to all widget events, subscribe to WIDGET_ALL.

Web app name: Web Form all events

<InlineAlert slots="text" />

WIDGET_ALL retrieves all agreement events, including events added in the future.

## WIDGET_CREATED

Web app name: Web Form created

Triggers when a web form is created.

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Widget](#payload-attributes-inherited-from-widget)</span>.***

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
            <td>The user ID of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the creator of the widget who created the widget on behalf of the creator in the case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the creator of the widget who created the widget on behalf of the creator in the case of account sharing.</td>
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
            <td>The user ID of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the creator of the widget who created the widget on behalf of the creator in the case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the creator of the widget who created the widget on behalf of the creator in the case of account sharing.</td>
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
            <td>The user ID of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the creator of the widget who disbaled the widget on behalf of the creator in the case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the creator of the widget who disbaled the widget on behalf of the creator in the case of account sharing.</td>
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
            <td>The user ID of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the creator of the widget who enabled the widget on behalf of the creator in case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the creator of the widget who enabled the widget on behalf of the creator in case of account sharing.</td>
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
            <td>The user ID of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the widget creator.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the creator of the widget who modified the widget on behalf of the creator in the case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the creator of the widget who modified the widget on behalf of the creator in the case of account sharing.</td>
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
            <td>The user ID of the user to whom the widget is shared.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user to whom the widget is shared.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the user by whom the widget is shared. This will be creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the user by whom the widget is shared. This will be creator of the widget.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the user on whose behalf this widget is shared in the case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the user on whose behalf this widget is shared in the case of account sharing.</td>
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
