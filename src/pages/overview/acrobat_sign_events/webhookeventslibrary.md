---
title: Library Events — Acrobat Sign Webhook Guide
---
# Library Events

## Common payload elements

### Minimum payload for library events

The following returns for a library event if all the conditional parameters are set to false while creating webhooks:

<table columnWidths="18,12,39,31">
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
            <td>The unique identifier that is used to refer to the library template.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">name</span></td>
            <td>String</td>
            <td>The name of the library template that will be used to identify it, in emails and on the website.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">status</span></td>
            <td>Enum</td>
            <td>The current status of the library document.</td>
            <td>AUTHORING, ACTIVE or REMOVED</td>
        </tr>
    </tbody>
</table>

### Payload attributes inherited from Library

<table columnWidths="30,10,39,21">
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
            <td>The unique identifier that is used to refer to the library template.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">name</span></td>
            <td>String</td>
            <td>The name of the library template that will be used to identify it, in emails and on the website.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">creatorEmail</span></td>
            <td>String</td>
            <td>Email of the creator of the library document.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">createdDate</span></td>
            <td>Date</td>
            <td>Library document creation date.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">status</span></td>
            <td>Enum</td>
            <td>The current status of the library document.</td>
            <td>AUTHORING, ACTIVE, or REMOVED</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">sharingMode</span></td>
            <td>String</td>
            <td>Specifies who should have access to this library document.</td>
            <td>USER, GROUP, ACCOUNT, or GLOBAL</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">templateTypes</span></td>
            <td>String</td>
            <td>A list of one or more library template types.</td>
            <td>DOCUMENT or FORM_FIELD_LAYER</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">conditionalParametersTrimmed</span></td>
            <td>String[]</td>
            <td>If the event notification payload size exceeds the defined threshold, the conditional parameters will not be sent in the notification request, even if they are set to true by the webhook creator. The <span style="color: #e74c3c">conditionalParametersTrimmed</span> parameter will be set to the keys trimmed in this case. If no conditional parameters are specified by the webhook creator, or if they are specified, but no key is trimmed, this parameter will not be returned.</td>
            <td></td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">documentsInfo</span></td>
            <td>Object</td>
            <td>Returns the IDs of the documents of a library document. Returned only if the conditional parameter <span style="color: #e74c3c">includeDocumentsInfo</span> is set to true and the payload size is less than the threshold. In some cases when document processing takes a lot of time, you might not get documentsInfo even if the conditional parameter <span style="color: #e74c3c">includeDocumentsInfo</span> was set to true. In such a case, try calling the v6 <span style="color: #2980b9">{`GET /libraryDocuments/{libraryDocumentId}/documents`}</span> API to get the details of the documents of a library document.</td>
            <td></td>
        </tr>
    </tbody>
</table>

## LIBRARY_ALL

Web app name: Not available in the UI

If you want to subscribe to all library events, subscribe to LIBRARY_ALL.

<InlineAlert slots="text" />

LIBRARY_ALL retrieves all agreement events, including events added in the future.

## LIBRARY_DOCUMENT_AUTO_CANCELLED_CONVERSION_PROBLEM

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Library](#payload-attributes-inherited-from-library)</span>.***

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
            <td>The user ID of the creator of the library document.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the creator of the library document.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the creator of the library document.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the creator of the library document.</td>
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

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Library](#payload-attributes-inherited-from-library)</span>.***

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
            <td>The user ID of the creator of the library document.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the creator of the library document.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the creator of the library document.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the creator of the library document.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the creator of the library document who modified the library document on behalf of the creator in the case of account sharing.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the creator of the library document who modified the library document on behalf of the creator in the case of account sharing.</td>
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

***The payload may include these event-specific payload as well as the <span style="color: #2980b9">[Payload attributes inherited from Library](#payload-attributes-inherited-from-library)</span>.***

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
            <td>The user ID of the creator of the library document.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">participantUserEmail</span></td>
            <td>String</td>
            <td>The user email of the creator of the library document.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserId</span></td>
            <td>String</td>
            <td>The user ID of the creator of the library document.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">actingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the creator of the library document.</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserId</span></td>
            <td>String</td>
            <td>The user ID of the sharee of the creator of the library document who modified the library document on behalf of the creator in the case of account sharing</td>
        </tr>
        <tr>
            <td><span style="color: #e74c3c">initiatingUserEmail</span></td>
            <td>String</td>
            <td>The user email of the sharee of the creator of the library document who modified the library document on behalf of the creator in the case of account sharing</td>
        </tr>
    </tbody>
</table>

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
