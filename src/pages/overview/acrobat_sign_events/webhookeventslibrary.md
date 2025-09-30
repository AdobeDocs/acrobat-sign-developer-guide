---
title: Library Events — Acrobat Sign Webhook Guide
---
# Library Events

## Common payload elements

### Minimum payload for library events

The following returns for a library event if all the conditional parameters are set to false while creating webhooks:

| Parameter Name | Type | Description | Possible enums |
|---|---|---|---|
| id | String | The unique identifier that is used to refer to the library template. |  |
| name | String | The name of the library template that will be used to identify it, in emails and on the website. |  |
| status | Enum | The current status of the library document. | AUTHORING, ACTIVE or REMOVED |


### Payload attributes inherited from Library

| Parameter Name | Type | Description | Possible enums |
|---|---|---|---|
| id | String | The unique identifier that is used to refer to the library template. |  |
| name | String | The name of the library template that will be used to identify it, in emails and on the website. |  |
| creatorEmail | String | Email of the creator of the library document. |  |
| createdDate | Date | Library document creation date. |  |
| status | Enum | The current status of the library document. | AUTHORING, ACTIVE, or REMOVED |
| sharingMode | String | Specifies who should have access to this library document. | USER, GROUP, ACCOUNT, or GLOBAL |
| templateTypes | String | A list of one or more library template types. | DOCUMENT or FORM_FIELD_LAYER |
| conditionalParametersTrimmed | String[] | If the event notification payload size exceeds the defined threshold, the conditional parameters will not be sent in the notification request, even if they are set to true by the webhook creator. The conditionalParametersTrimmed parameter will be set to the keys trimmed in this case. If no conditional parameters are specified by the webhook creator, or if they are specified, but no key is trimmed, this parameter will not be returned. |  |
| documentsInfo | Object | Returns the IDs of the documents of a library document. Returned only if the conditional parameter includeDocumentsInfo is set to true and the payload size is less than the threshold. In some cases when document processing takes a lot of time, you might not get documentsInfo even if the conditional parameter includeDocumentsInfo was set to true. In such a case, try calling the v6 {`GET /libraryDocuments/{libraryDocumentId}/documents`} API to get the details of the documents of a library document. |  |


## LIBRARY_ALL

Web app name: Not available in the UI

If you want to subscribe to all library events, subscribe to LIBRARY_ALL.

<InlineAlert slots="text" />

LIBRARY_ALL retrieves all agreement events, including events added in the future.

## LIBRARY_DOCUMENT_AUTO_CANCELLED_CONVERSION_PROBLEM

***The payload may include these event-specific payload as well as the `[Payload attributes inherited from Library](#payload-attributes-inherited-from-library)`.***

| Parameter name | Type | Description |
|---|---|---|
| participantUserId | String | The user ID of the creator of the library document. |
| participantUserEmail | String | The user email of the creator of the library document. |
| actingUserId | String | The user ID of the creator of the library document. |
| actingUserEmail | String | The user email of the creator of the library document. |
| initiatingUserId | String | Never part of the payload. |
| initiatingUserEmail | String | Never part of the payload. |


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
    "libraryDocument": {
        "id": "",
        "name": "",
        "creatorEmail": "",
        "createdDate": "",
        "status": "",
        "sharingMode": "",
        "templateTypes": [
            ""
        ]
    }
}
```

## LIBRARY_DOCUMENT_CREATED

Web app name: Not available in the UI

***The payload may include these event-specific payload as well as the `[Payload attributes inherited from Library](#payload-attributes-inherited-from-library)`.***

| Parameter name | Type | Description |
|---|---|---|
| participantUserId | String | The user ID of the creator of the library document. |
| participantUserEmail | String | The user email of the creator of the library document. |
| actingUserId | String | The user ID of the creator of the library document. |
| actingUserEmail | String | The user email of the creator of the library document. |
| initiatingUserId | String | The user ID of the sharee of the creator of the library document who modified the library document on behalf of the creator in the case of account sharing. |
| initiatingUserEmail | String | The user email of the sharee of the creator of the library document who modified the library document on behalf of the creator in the case of account sharing. |


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
    "libraryDocument": {
        "id": "",
        "name": "",
        "creatorEmail": "",
        "createdDate": "",
        "status": "",
        "sharingMode": "",
        "templateTypes": [
            ""
        ],
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

## LIBRARY_DOCUMENT_MODIFIED

Web app name: Not available in the UI

***The payload may include these event-specific payload as well as the `[Payload attributes inherited from Library](#payload-attributes-inherited-from-library)`.***

| Parameter name | Type | Description |
|---|---|---|
| participantUserId | String | The user ID of the creator of the library document. |
| participantUserEmail | String | The user email of the creator of the library document. |
| actingUserId | String | The user ID of the creator of the library document. |
| actingUserEmail | String | The user email of the creator of the library document. |
| initiatingUserId | String | The user ID of the sharee of the creator of the library document who modified the library document on behalf of the creator in the case of account sharing |
| initiatingUserEmail | String | The user email of the sharee of the creator of the library document who modified the library document on behalf of the creator in the case of account sharing |


<CodeBlock slots="heading, code" repeat="1" languages="JSON" />

#### Payload template

````json
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
    "libraryDocument": {
        "id": "",
        "name": "",
        "creatorEmail": "",
        "createdDate": "",
        "status": "",
        "sharingMode": "",
        "templateTypes": [
            ""
        ],
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
````
