# 2016 REST v6 Release Notes
Last update: Jun 13, 2024.

<InlineAlert slots="text" />

For non-developer product feature and UI changes, refer to [this link](https://helpx.adobe.com/sign/release-notes/adobe-sign.html)


The 2016 (to present) REST v6 Acrobat Sign APIs release introduces numerous enhancements and features. To help developers migrate from older API versions to Version 6, we have tabulated the v6 APIs against their closest counterparts in previous versions in the [API Change Log](#apichange). In the change log, we have documented enhancements, features, and any changes from the prior version. In addition to the information compiled here, refer to the [Acrobat Sign API Reference](https://www.adobe.com/go/acrobatsignapireference) for a quick reference for the Acrobat Sign APIs. This page lists all our APIs in a easily discoverable format, and lets you try them out without having to write any code!

<InlineAlert slots="text" />

v5 and SOAP-based apps will continue to function, but all versions prior to v6 are deprecated.

REST API Enhancements
----------------------------------------------------------------------------

### Pagination Support

Existing Acrobat Sign APIs return the entire list of resources (agreements, widgets, or library documents) that a user has in a GET call. For some users with a large number of transactions this resource list becomes too big for consumption. The v6 APIs have introduced pagination support to all these resources with a client-configurable page size. This will be especially useful to our mobile clients and integrations who are constrained by their consumption capacity. This sample shows pagination in a request and response:

**Sample Request**

`GET https://api.na1.echosign.com:443/api/rest/v6/agreements?pageSize=50`

**Sample Response**

```
{
    "userAgreementList": [{
      "displayDate": "2017-04-17T06:07:19-07:00",
      "displayUserSetInfos": [
        {
          "displayUserSetMemberInfos": [
            {
              "company": "Adobe",
              "email": "adobe.sign.user@adobe.com",
              "fullName": "AdobeSign User"
            }
          ]
        }
      ],
      "esign": true,
      "agreementId": "3AAABLblqZhDqIcUs4nFgivebIUdzuZyBrjO_VP_hHDhkrGhXxKuQ5Hi7C07vRbNzxP9TdTdRHzHdQLDsPJrjfXEuKe7jjEAl",
      "latestVersionId": "3AAABLblqZhACieamyoCl7qNWZTaU3WaoY3a9BL7-09sosH88HyRFfGmYc91jpQk-LXLVGlgEudioxgPlCprAScifamX16-QD",
      "name": "SampleAgreement",
      "status": "SIGNED"
    },
    {...},
    .
    .
    .],
    "page": {
        "nextCursor": "qJXXj2UAUX1X9rTSqoUOlkhsdo*"
    }
}
```

The subsequent GET /resources calls would just need to add <strong>nextCursor</strong> as <strong>query param</strong> in the URL for fetching the next set of resources.

**Sample Request**

`GET https://api.na1.echosign.com:443/api/rest/v6/agreements?pageSize=50&cursor=qJXXj2UAUX1X9rTSqoUOUOlkhsdo*`

### Constant IDs

Our Partners and Integrators have requested that the identifiers remain constant in the lifetime of a resource. This is because they tend to store these resource IDs and do a match later, which can break with ID changes. The v6 APIs address this by ensuring that IDs stay constant through time and across all API callers for a given resource. This will enable clients to build their own metadata associated with an Acrobat Sign resource ID.

Identifiers are forward-compatible: **older identifiers will continue working in v6 Sign APIs.** However, new identifiers generated through v6 APIs **will only be compatible with Acrobat Sign v6 or any higher version.**

### ETag support

Polling on a resource is a common operation; for instance, in the case of agreements, where a client application is attempting to check the latest status. The v6 REST APIs significantly optimize this by adding support for an ETag, which will only fetch the full body response if the resource has been modified. This saves the client from loading the same response as well as its unnecessary parsing.

In addition, this also helps to resolve conflicts in the case of concurrent update operations by only allowing the updates with the ETag of the latest version of the resource in their request header (_If-match_). This example explains the functioning of ETags in detail:

**Sample GET Operation (ETag in Request Header)**

```
URI : GET https://api.na1.echosign.com:443/api/rest/v6/agreements/CBJCHBCAABAAQonMXhG-V6w-rheRViZNFGxmCgEEf3k0

Headers : Authorization: Bearer <access-token>
          Accept: */*
          Accept-Encoding: gzip, deflate, br
          Accept-Language: en-US,en
          If-None-Match: CBJCHBCAABAA-mdO9PI7WFmHNkXFUIEYIOYGrnM3vVK_

```


The above request will result in a **304(Resource Not Modified)** HTTP response if the ETag provided in the If-None-Match header represents the latest version of the resource. Otherwise, the response body will include the queried resource in the usual format, along with an ETag representing the fetched version of the resource in the response header.

The _response header_ below represents the second scenario, in which the resource has been modified prior to the request (notice the ETag as one of the headers).

**Response Header**

```
Date: Mon, 12 Feb 2018 09:45:24 GMT
Server: Apache
ETag: D27e5290dc3a748068e42a59f4dfc6f6b1d5eaba1
Content-Length: 661
  ...
Keep-Alive: timeout=15, max=200
Connection: Keep-Alive
Content-Type: application/json;charset=UTF-8

```


Update or delete operations will have a similar workflow. The clients are required to provide the ETag of the resource version that they want to update in the If-Match request header. The update will only be successful if the ETag in the request header represents the latest version of the resource on the server. Otherwise, this will result in a **412 (Precondition Failed)** response. In this example, we are trying to update the status of the agreement fetched above:

**Sample PUT Operation (ETag In Request Header)**

```
URI : PUT  https://api.na1.echosign.com:443/api/rest/v6/agreements/CBJCHBCAABAAQonMXhG-V6w-rheRViZNFGxmCgEEf3k0/status

Headers : Authorization: Bearer <access-token>
          Accept: */*
          Accept-Encoding: gzip, deflate, br
          Accept-Language: en-US,en
          If-Match: CBJCHBCAABAA-mdO9PI7WFmHNkXFUIEYIOYGrnM3vVK_

```


The response below indicates that we are trying to update an older version (_observe the ETag in the request_) of this resource. Along with this response body, the response header contains the HTTP status code 412(Precondition Failed).

**Sample PUT Operation (ETag In Request Header)**

```
{
    "code": "RESOURCE_MODIFIED",
    "message": "Resource is already modified with newer version"
}

```


The ETag value required to be passed in any PUT or DELETE API can be obtained from a corresponding GET operation on the same entity. The table below mentions these modification (PUT or DELETE) APIs along with the corresponding GET APIs that provides the ETag value for these modification requests.


| **Update/Deletion API**                               | **Corresponding GET endpoint**                        |
|-------------------------------------------------------|------------------------------------------------------|
| PUT /agreements/{agreementId}                         | GET /agreements/{agreementId}                        |
| POST /agreements/{agreementId}/formFields             | GET /agreements/{agreementId}/formFields             |
| PUT /agreements/{agreementId}/formFields              | GET /agreements/{agreementId}/formFields             |
| PUT /agreements/{agreementId}/formFields/mergeInfo    | GET /agreements/{agreementId}/formFields/mergeInfo   |
| PUT /agreements/{agreementId}/members/participantSets/{participantSetId} | GET /agreements/{agreementId}/members/participantSets/{participantSetId} |
| PUT /agreements/{agreementId}/state                   | GET /agreements/{agreementId}                        |
| DELETE /agreements/{agreementId}/documents            | GET /agreements/{agreementId}/documents              |
| PUT /libraryDocuments/{libraryDocumentId}             | GET /libraryDocuments/{libraryDocumentId}            |
| PUT /libraryDocuments/{libraryDocumentId}/state       | GET /libraryDocuments/{libraryDocumentId}            |
| PUT /widgets/{widgetId}                               | GET /widgets/{widgetId}                              |
| PUT /widgets/{widgetId}/state                         | GET /widgets/{widgetId}                              |
| PUT /megaSigns/{megaSignId}/state                     | GET /megaSigns/{megaSignId}                          |
| DELETE /users/{userId}/signatures/{signatureId}       | GET /users/{userId}/signatures/{signatureId}         |
| PUT /webhooks/{webhookId}                             | GET /webhooks/{webhookId}                            |
| PUT /webhooks/{webhookId}/state                       | GET /webhooks/{webhookId}                            |
| DELETE /webhooks/{webhookId}                          | GET /webhooks/{webhookId}                            |



### GET, PUT, POST consistency

In building the Acrobat Sign v6 APIs, we have enabled more simplicity in the design of client applications by creating consistency across GET, POST, and PUT operations in each API, thereby enabling clients to reuse the same model across these APIs. For reference see the [agreement model](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/getAgreementInfo) in the (POST|PUT|GET) /agreements API.

### Performance improvements

The creation and update APIs are now asynchronous, which significantly improves their response time. This frees clients from waiting on these operations and they can move on to next steps in their workflow.

Clients should now poll on the status of the newly created resource before certain sub-resource operations, such as documents in the case of agreements. For example, in case of agreement creation, the initial status is `DOCUMENTS_NOT_YET_PROCESSED`, which is updated to the intended status such as `OUT_FOR_SIGNATURE` once all the background tasks are successfully completed.

### **Asynchronous API’s**

One of the significant change in v6 API’s has been to make resource intensive operations asynchronous to a larger extent. This reduces waiting/blocking time for clients in most of the scenarios. For example, in v5, workflows such as sending an agreement, creating megasign or a widgets etc. has significantly larger response time than v6. In v6, the API execution time has been improved by making the time intensive processes asynchronous and executing them in the background. Acrobat Sign provides status/error codes in the GET api’s for clients to know the status of these background processes and decide on their next steps accordingly. The clients can poll on these GET api’s or move on to new resource creation/workflow depending on their use case.

Refer the lists below all the asynchronous api’s and their corresponding GET api’s which clients can poll on till polling condition holds true.

* * *

**Asynchronous API:** [POST /agreements](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/createAgreement)

**GET API To Poll:** [GET /agreements/{agreementId}](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/getAgreementInfo)

**GET Response Body:** {

… “**status**”: “” }

**GET HTTP Status:** 200

**Polling Condition On GET:** status == DOCUMENTS\_NOT\_YET\_PROCESSED

* * *

**Asynchronous API:** [POST /agreements](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/createAgreement)

**GET API To Poll:** [GET /agreements/{agreementId}/signingUrls](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/getSigningUrl)

**GET Response Body:** { “**code**”: “AGREEMENT\_NOT\_SIGNABLE”, “**message**”: “The agreement is not currently waiting for anyone to sign it.” }

**GET HTTP Status:** 404

**Polling Condition On GET:** status == DOCUMENTS\_NOT\_YET\_PROCESSED

* * *

**Asynchronous API:** [PUT /agreements/{agreementId}/state](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/updateAgreementState)

**GET API To Poll:** [GET /agreements/{agreementId}](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/getAgreementInfo)

**GET Response Body:** { … “**status**”:“” }

**GET HTTP Status:** 200

**Polling Condition On GET:** status != IN\_PROCESS

* * *

**Asynchronous API:** [POST /widgets](https://secure.na1.echosign.com/public/docs/restapi/v6#!/widgets/createWidget)

**GET API To Poll:** [GET /widgets/{widgetId}](https://secure.na1.echosign.com/public/docs/restapi/v6#!/widgets/getWidgetInfo)

**GET Response Body:** { … “**status**”: “” }

**GET HTTP Status:** 200

**Polling Condition On GET:** status == DOCUMENTS\_NOT\_YET\_PROCESSED

* * *

**Asynchronous API:** [PUT /widgets/{widgetId}/state](https://secure.na1.echosign.com/public/docs/restapi/v6#!/widgets/updateWidgetState)

**GET API To Poll:**: [GET /widgets/{widgetId}](https://secure.na1.echosign.com/public/docs/restapi/v6#!/widgets/getWidgetInfo)

**GET Response Body:** { … “**status**”:“” }

**GET HTTP Status:** 200

**Polling Condition On GET:** status == DOCUMENTS\_NOT\_YET\_PROCESSED

* * *

**Asynchronous API:** [POST /megaSigns](https://secure.na1.echosign.com/public/docs/restapi/v6#!/megaSigns/createMegaSign)

**GET API To Poll:** [GET /megaSigns/{megaSignId}/agreements](https://secure.na1.echosign.com/public/docs/restapi/v6#!/megaSigns/getMegaSignChildAgreements)

**GET Response Body:** { “**megaSignList**” : \[ … {}, …\],

“**page**”: { … } }

**GET HTTP Status:** 200

**Polling condition on GET:** megaSignList.size() != Requested Number of Child Agreements

### Hosted Signing

One of the common workflows used by Acrobat Sign clients is to create an agreement and get the corresponding signing url. Since, the agreement creation is asynchronous the clients needs to poll on [GET /agreements/{agreementId}/signingUrls](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/getSigningUrl) for fetching signing url. The sample code below implements this use case.

**Polling For Signing Url**

```
var APIConfig = {
    "apiBaseUrl": "<base-uri-for-client>",
    "accessToken": "Bearer <valid-access-token>",
    "transientDocumentId": "<valid-transient-document-id>"
}

function getSigningUrlForAsyncAgreementCreation() {

    var getSigningUrl = function(agreementId) {
        var apiUrl = APIConfig.apiBaseUrl + "/api/rest/v6/agreements/" + agreementId + "/signingUrls";
        jQuery.ajax({
            url: apiUrl,
            type: "GET",
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', APIConfig.accessToken);
            },
            success: function(result, status, request) {
                // API execution is successful, the signing url is present in result
            },
            error: function(result, status, request) {
                // If error occurs with HTTP status 404 and error code is AGREEMENT_NOT_SIGNABLE the background processes in agreement creation has not completed.
                // Re attempt API after polling time period.
                if(status === 404 && result.code == "AGREEMENT_NOT_SIGNABLE") {
                    window.setTimeout(function() {
                        getSigningUrl(agreementId);
                    }, 500);
                }
                // In all other cases, there is a genuine failure in retrieving signing url. Parse error code and message for more detail.
            }
        });
    }

    var createAgreementAsynchronously = function() {

        var agreementCreationRequest = {
            "fileInfos": [{
                "transientDocumentId": APIConfig.transientDocumentId
            }],
            "name": "Asynchronous Agreement",
            "participantSetsInfo": [{
                "memberInfos": [{
                    "email": "<signer-email>"
                }],
                "order": 1,
                "role": "SIGNER"
            }],
            "signatureType": "ESIGN",
            "state": "IN_PROCESS"
        }

        agreementCreationRequest = JSON.stringify(agreementCreationRequest);

        jQuery.ajax({
            url: APIConfig.apiBaseUrl + "/api/rest/v6/agreements",
            type: "POST",
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', APIConfig.accessToken);

            },
            contentType: "application/json",
            data: agreementCreationRequest,
            success: function(result, status, request) {
                // Call GET /agreements/{agreementId}/signingUrls api after 500ms
                window.setTimeout(function() {
                    getSigningUrl(result.id);
                }, 500);
            }
        });
    }

    createAgreementAsynchronously();
}

getSigningUrlForAsyncAgreementCreation();

```


#### Simple Agreement Creation

Some operations on a newly created agreement like downloading agreement document are not allowed until all the background processes in creating agreement is completed. The [GET /agreements/{agreementId}](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/getAgreementInfo) API provides the status of the agreement on which the client can poll before performing such operations. Refer the sample code below for more details.

**Polling For Signing URL**

```
var APIConfig = {
    "apiBaseUrl": "<base-uri-for-client>",
    "accessToken": "Bearer <valid-access-token>",
    "transientDocumentId": "<valid-transient-document-id>"
}

function getAgreementInfoForAsyncAgreementCreation() {
    var getAgreementInfo = function(agreementId) {
        var apiUrl = APIConfig.apiBaseUrl + "/api/rest/v6/agreements/" + agreementId;
        jQuery.ajax({
            url: apiUrl,
            type: "GET",
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', APIConfig.accessToken);
            },
            success: function(result, status, request) {
                /**
                Parse API result for agreement status. If the agreement status is DOCUMENTS_NOT_YET_PROCESSED then, all the background processed in agreement creation is not complete yet.
                */
                if(result.status == "DOCUMENTS_NOT_YET_PROCESSED") {
                    window.setTimeout(function() {
                        getAgreementInfo(agreementId);
                    }, 500);
                }
                else {
                    // All the background tasks in agreement creation is completed.
                }
            },
            error: function() {
                // API execution failed.
            }
        });
    }

    var createAgreementAsynchronously = function() {
        var agreementCreationRequest = {
            "fileInfos": [{
                "transientDocumentId": APIConfig.transientDocumentId
            }],
            "name": "Asynchronous Agreement",
            "participantSetsInfo": [{
                "memberInfos": [{
                    "email": "<signer-email>"
                }],
                "order": 1,
                "role": "SIGNER"
            }],
            "signatureType": "ESIGN",
            "state": "IN_PROCESS"
        }

        agreementCreationRequest = JSON.stringify(agreementCreationRequest);

        jQuery.ajax({
            url: APIConfig.apiBaseUrl + "/api/rest/v6/agreements",
            type: "POST",
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', APIConfig.accessToken);

            },
            contentType: "application/json",
            data: agreementCreationRequest,
            success: function(result, status, request) {
                // Call GET /agreements/{agreementId} api after 500ms
                window.setTimeout(function() {
                    getAgreementInfo(result.id);
                }, 500);
            }
        });
    }

    createAgreementAsynchronously();
}
 getAgreementInfoForAsyncAgreementCreation();

```


#### Polling Frequency

The polling frequency can vary from clients to clients depending on their use case. Clients using large files in agreement creation are expected to keep time between subsequent polling calls more compared to the scenarios where the agreement files uploaded are small. The table below can be referred as a general guideline by clients to determine their polling frequency.


|File Size         |Polling Time Period|
|------------------|-------------------|
|< 100KB           |500 ms             |
|> 100KB and < 2 MB|1s                 |
|> 2MB             |2s                 |

### Authorization header

The Acrobat Sign API accepts an authorization token in the <span style="color: red;">access-token</span> header; however, from v6 onwards we will be migrating to the standard <span style="color: red;">Authorization</span> header. The Authorization header will hold the user’s authorization token in this format:

<span style="color:red">Authorization: Bearer &lt;access-token&gt;</span>

Clients can continue using their older access token, but in the <span style="color: red;">authorization</span>header using this format.

New Features
----------------------------------------------------------

### Agreement sharing

This feature enables users associated with an agreement to share the agreement at any point of time through Acrobat Sign APIs. This feature brings the agreement sharing capability in Acrobat Sign web app and Acrobat Sign APIs at par. The [POST /agreements/{agreementId}/members/share](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/createShareOnAgreement) API exposes the agreement sharing feature.

### Authoring APIs

The authoring APIs are a set of APIs that allow a user to _author_ the documents of an agreement before sending them out. The authoring operation here refers to creating, editing or placing form fields along with their configurations (assignee, conditions, data type, and more) in the agreement documents. The v6 APIs have these capabilities and a client can now leverage these APIs to create their own agreement authoring experience. The table below lists the APIs in this set along with the functionality that they provide.

| **Authoring API**                                      | **Functionality**                                                                 |
|--------------------------------------------------------|----------------------------------------------------------------------------------|
| [POST /agreements/{agreementId}/formFields](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/addTemplateFieldsToAgreement) | Adds forms to an agreement from the given template. The response would contain the information of all the newly added form fields. |
| [GET /agreements/{agreementId}/formFields](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/getFormFields) | Retrieves all the form fields present in an agreement.                          |
| [PUT /agreements/{agreementId}/formFields](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/updateFormFields) | Updates and configures (e.g., location, default value, background, etc.) the present form fields in the agreement documents. |


### Document visibility

The new document visibility feature allows senders to control the exposure of agreement documents for specific participants through APIs. This empowers clients to hide from participants those parts of agreements that are irrelevant to them. The agreement creation request below hides the second document of the agreement from the first participant.

**Document Visibility Example**

```
{
    "fileInfos": [{
            "transientDocumentId": "<first-transient-document>"
        },
        {
            "transientDocumentId": "<second-transient-document>"
        }
    ],
    "name": "Custom Agreement",
    "participantSetsInfo": [{
            "memberInfos": [{
                "email": "firstSigner@adobe.com"
            }],
            "name": "First Signer",
            "visiblePages": [
                "0", "1"
            ],
            "order": 1,
            "role": "SIGNER"
        },
        {
            "memberInfos": [{
                "email": "secondSigner@adobe.com"
            }],
            "name": "Second Signer",
            "visiblePages": [
                "0", "1", "2"
            ],
            "role": "SIGNER",
            "order": "2"
        }
    ],
    "signatureType": "ESIGN",
    "state": "IN_PROCESS"
}

```


### Draft

The v6 APIs provides the capability for an incremental creation of a resource by introducing the concept of “DRAFT”. The incremental creation of any resource is really helpful, especially when it is constituted of many complex components. Draft is a temporary or primitive stage of the final intended resource that can be updated in steps to create the final resource.

This example illustrates a stepwise creation of an agreement:

**Step 1: POST /agreements to create an initial draft**

```
{
    "fileInfos": [{
        "transientDocumentId": "<a-valid-transient-resource-id>"
    }],
    "name": "Draft",
    "signatureType": "ESIGN",
    "state": "DRAFT"
}

```


The step above creates a draft. Notice that we have not assigned any participant to this agreement yet.

**Step 2: PUT /agreements/{agreementId} to complete this draft**

```
{
    "fileInfos": [{
        "transientDocumentId": "<a-valid-transient-resource-id>"
    }],
    "name": "Agreement",
    "participantSetsInfo": [{
        "memberInfos": [{
            "email": "signer@adobe.com"
        }],
        "role": "SIGNER",
        "order": "1"
    }],
    "signatureType": "ESIGN",
    "state": "DRAFT"
}

```


Notice the addition of a participant and an update in the `name` field. This step can be iterated any number of times until we have all the data needed to create the agreement.

The next step finalizes the draft into an agreement.

**Step 3: PUT /agreements/{agreementId}/state to complete this draft**

```
{
  "state": "IN_PROCESS"
}

```

### Notes management

The v6 Acrobat Sign APIs has endpoints to manage notes in an agreement. Clients can add notes to an agreement and retrieve them using these API’s. The table below lists all these APIs and their operation.

| Notes API                                              | Functionality                                                                  |
|--------------------------------------------------------|--------------------------------------------------------------------------------|
| [GET /agreements/{agreementId}/me/note](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/getAgreementNoteForApiUser) | Retrieves the latest note on an agreement for the user.                         |
| [PUT /agreements/{agreementId}/me/note](https://secure.echosign.com/public/docs/restapi/v6) | Updates the latest note associated with an agreement.                           |
| [GET /libraryDocuments/{libraryDocumentId}/me/note](https://secure.echosign.com/public/docs/restapi/v6#!/libraryDocuments/getLibraryDocumentNoteForApiUser) | Retrieves the latest note on a library template for the user.                   |
| [PUT /libraryDocuments/{libraryDocumentId}/me/note](https://secure.echosign.com/public/docs/restapi/v6) | Updates the latest note of a library document for the API user.                |
| [GET /widgets/{widgetId}/me/note](https://secure.echosign.com/public/docs/restapi/v6#!/widgets/getWidgetNoteForApiUser) | Retrieves the latest note of a widget for the API user.                         |
| [PUT /widgets/{widgetId}/me/note](https://secure.echosign.com/public/docs/restapi/v6) | Updates the latest note of a widget for the API user.                           |


### Reminders

The reminder APIs in v6 enable clients to create reminders for _any_ participant at any time before their action on the agreement. The capability to list all reminders on an agreement is also availaible in v6. These capabilities will significantly improve clients’ experience of handling reminders for agreements. The table below lists all the endpoints in this set:


|Authoring API                           |Functionality                                   |
|----------------------------------------|------------------------------------------------|
|POST /agreements/{agreementId}/reminders|Sets reminders for a list of participants.      |
|GET /agreements/{agreementId}/reminders |Retrieves all the reminders set on an agreement.|


### Resource views

There are a number of _views_ associated with a resource. For example, an agreement may have an authoring view, agreement documents view, signing page view, or a manage page view with the agreement selected. The availaibility of all these views depends on both the state of the resource and also the relationship of the user with the resource. To access and customize these resource views, the v6 Acrobat Sign API includes this endpoint to list all such views in their desired configuration:

**Sample request/response:**

_Request - POST /agreements/{agreementId}/views_

```
{
    "names": "DOCUMENT",
    "commonViewConfiguration": {
        "autoLoginUser": false,
        "noChrome": true,
        "locale": "en"
    }
}

```


_Response - POST /agreements/{agreementId}/views_

```
[
    {
        "name": "DOCUMENT",
        "url": "https://secure.echosign.com/account/agreements?aid=CBJCHBCAABAA0RVdUCYoR5kU9vh4-b4qHhYW_1r10hKw&pid=CBJCHBCAABAAH-F0jK3mHa53G7gr0SiftgdqE-jjwNVq&noChrome=true",
        "embeddedCode": "<script type='text/javascript' language='JavaScript' src='https://secure.echosign.com/embed/account/agreements?aid=CBJCHBCAABAA0RVdUCYoR5kU9vh4-b4qHhYW_1r10hKw&pid=CBJCHBCAABAAH-F0jK3mHa53G7gr0SiftgdqE-jjwNVq&noChrome=true'></script>"
    }
]

```


### Resource visibility

The agreement visibility feature enables a client to control which resources are included in the response body of the enumeration/reource listing APIs like `GET /agreements`. This helps users to hide all resources from their view that they don’t want to focus on. The [PUT /resource/{resourceId}/me/visibility](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/updateAgreementVisibility) API exposes this functionality, wherein a resource can be an agreement, widget, template or megasign in Acrobat Sign.

### Suppress email

The suppress email feature, in a broader sense, enables us to specify which emails participants receive while sending out the agreement. This feature is exposed through our agreement creation API, `POST /agreements`. Here is a sample request that allows only agreement initiation emails to be sent to the participants:

**POST /agreements with email configuration**

```
{
    "fileInfos": [{
        "transientDocumentId": "<a-valid-transient-resource-id>"
    }],

    "name": "Sample Agreement with email config",

    "participantSetsInfo": [{
        "memberInfos": [{
            "email": "signer@adobe.com"
        }],
        "role": "SIGNER",
        "order": "1"
    }],

    "emailOption": {
        "sendTarget": {
            "initEmails": "ALL",
            "inFlightEmails": "NONE",
            "completionEmails": "NONE"
        }
    },

    "signatureType": "ESIGN",
    "status": "IN_PROCESS"
}

```


### Webhooks

Callbacks in Acrobat Sign are now handled through **webhooks**. A _webhook_ is essentially a web service designed to listen for and respond to POST requests. When you create a webhook and register it with Acrobat Sign, Acrobat Sign’s Webhook Subscription Service will notify your webhook of any relevant event by sending a POST request via HTTPS containing a JSON object with the details of the event. Your webhook then passes those details on to your application for handling. The service operates on a push model: your app doesn’t have to poll for events at all—those events are automatically sent to your webhook as they happen, with virtually no delay, so your app is instantaneously, automatically updated with any changes.

API Change Log
--------------------------------------------------------------

Acrobat Sign version 6 includes many changes to the API model.

### New APIs

[GET /agreements/{agreementId}/me/note](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/getAgreementNoteForApiUser)

*   Retrieves the latest note on an agreement for the user.


[GET /agreements/{agreementId}/members](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/getAllMembers)

*   Returns all the users associated with an agreement: participant set, cc’s, shared participants, and sender.


[GET /agreements/{agreementId}/members/participantSets/{participantSetId}](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/getParticipantSet)
*   Returns a detailed participant set object.


[GET /agreements/{agreementId}/reminders](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/getAgreementReminders)

*   Lists all the reminders on an agreement.


[GET /libraryDocuments/{libraryDocumentId}/me/note](https://secure.echosign.com/public/docs/restapi/v6#!/libraryDocuments/getLibraryDocumentNoteForApiUser)

*   Retrieves the latest note on a library template for the user.


[GET /megaSigns/{megaSignId}/childAgreementsInfo/{childAgreementsInfoFileId}](https://secure.na1.echosign.com/public/docs/restapi/v6#!/megaSigns/getChildAgreementsInfoFile)

*   Retrieves the file stream of the original CSV file that was uploaded by the sender while creating the MegaSign.


[GET /megaSigns/{megaSignId}/events](https://secure.na1.echosign.com/public/docs/restapi/v6#!/megaSigns/getEvents)

*   Lists all the events of a MegaSign.


[GET /users/{userId}/groups](https://secure.echosign.com/public/docs/restapi/v6#!/users/getGroupsOfUser)

*   Lists all the groups to which the user identified by the userId belongs.


[POST /agreements/{agreementId}/formFields](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/postFormFields)

*   Creates form fields in an agreement using a library template.


[POST /agreements/{agreementId}/members/share](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/createShareOnAgreement)

*   Allows users to share agreements with other users.


[POST /agreements/{agreementId}/views](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/getAgreementView)

*   Returns the requested views such as manage page view, agreement documents view, post send page view associated with an agreement in the requested configuration.


[POST /libraryDocuments/{libraryDocumentId}/views](https://corporate.na1.echosign.com/public/docs/restapi/v6#!/libraryDocuments/createLibraryDocumentView)
*   Returns the requested views, such as manage page view, library documents view, and send page view of this library document in the requested configuration.


[POST /megaSigns/{megaSignId}/views](https://secure.echosign.com/public/docs/restapi/v6#!/megaSigns/getMegaSignView)

*   Provides all the views associated with a megaSign, such as manage page view, documents view, etc.


[POST /users/{userId}/views](https://secure.echosign.com/public/docs/restapi/v6#!/users/getUserViews)

*   Provides all the views associated with a user, like profile page view, account page view, or manage page view.


[POST /widgets/{widgetId}/views](https://secure.echosign.com/public/docs/restapi/v6#!/widgets/getWidgetView)

*   Returns the requested views, such as manage page view, widget documents view, and post send page view associated with a widget in the requested configuration.


[PUT /agreements/{agreementId}](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/updateAgreement)

*   Updates the data of an agreement, such as name, participants, etc.


[PUT /agreements/{agreementId}/formFields](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/updateFormFields)

*   Edit or modify an existing form field on an agreement document.


[PUT /agreements/{agreementId}/me/visibility](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/updateAgreementVisibility)

*   Manage the visibility of an agreement in `GET /agreements`.


[PUT /agreements/{agreementId}/members/participantSets/{participantSetId}](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/updateParticipantSet)

*   Updates an existing participant set of an agreement. Adds some more capability to the existing recipient update feature:

1. Allows replacing a specific participant in the set instead of choosing between either replacing all participants or no one.
2. Allows sender to replace participants who are not the current signer as well.


[PUT /agreements/{agreementId}/state](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/updateAgreementState)

*   Transitions an agreement from one state to another: for example, `DRAFT` to `IN_PROCESS`. Note that not all transitions are allowed. An allowed transition would follow the following sequence: `DRAFT` -> `AUTHORING` -> `IN_PROCESS` -> `CANCELLED`.


[PUT /libraryDocuments/{libraryDocumentId}](https://secure.echosign.com/public/docs/restapi/v6#!/libraryDocuments/updateLibraryDocument)

*   Updates the data of a library document, such as name, type, scope, etc.


[PUT /libraryDocuments/{libraryDocumentId}/me/visibility](https://secure.echosign.com/public/docs/restapi/v6#!/libraryDocuments/updateLibraryDocumentVisibility)

*   A new API to control visibility of an agreement in the `GET /libraryDocuments` response.


[PUT /libraryDocuments/{libraryDocumentId}/state](https://secure.echosign.com/public/docs/restapi/v6#!/libraryDocuments/updateLibraryDocumentState)

*   Transitions a library document from one state to another: for example, `AUTHORING` to `ACTIVE`. Note that not all transitions are allowed. An allowed transition would follow the following sequence: `AUTHORING` -> `ACTIVE`.


[PUT /megaSigns/{megaSignId}/state](https://secure.echosign.com/public/docs/restapi/v6#!/megaSigns/updateMegaSignState)

*   Transitions a MegaSign from one state to another: for example, `IN_PROCESS` to `CANCELLED`. Note that not all transition are allowed. An allowed transition would follow the following sequence: `IN_PROCESS` -> `CANCELLED`.


[PUT /users/{userId}/groups](https://secure.echosign.com/public/docs/restapi/v6#!/users/updateGroupsOfUser)

*   Migrates the user to a different group or updates their role in the existing group.


[PUT /widgets/{widgetId}/state](https://secure.echosign.com/public/docs/restapi/v6#!/widgets/updateWidgetState)

*   Transitions a widget from one state to another: for example, `DRAFT` to `IN_PROCESS`. Note that not all transitions are allowed. An allowed transition would follow one of the following sequences: `DRAFT` -> `AUTHORING` -> `ACTIVE`, `ACTIVE` <-> `INACTIVE`, `DRAFT` -> `CANCELLED`.


### Updated APIs

[GET /baseUris](https://secure.echosign.com/public/docs/restapi/v6#!/base_uris/getBaseUris)

*   The endpoint path is now changed to be consistent with the camel casing convention in Acrobat Sign API (`base_uri` is now `baseUri`).
    
*   The response parameter is also renamed to have camel casing.
    

[GET /agreements](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/getAgreements)

*   The response is paginated.
    
*   The response also lists all the user-created drafts.
    
*   Filter to show/hide hidden agreements.
    
*   Data returned is same as v5.
    

[GET /agreements/{agreementId}](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/getAgreementInfo)

*   The model is consistent with the corresponding POST and PUT APIs.
    
*   Participants and events information are retrieved through separate granular APIs.
    
*   Detailed participants and events information are available through separate endpoints.
    

Includes audit reports for draft creation.

Uses `participantId` instead of `participantEmail` as a filter.

[GET /agreements/{agreementId}/documents](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/getAllDocuments)

*   Uses `participantId` instead of `participantEmail` as a filter.
    
*   There are minor changes in the field names.
    

[GET /agreements/{agreementId}/documents/imageUrls](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/getAllDocumentsImageUrls)

*   Uses `participantId` instead of `participantEmail` as a filter.
    
*   There are minor changes in the field names.
    
*   Provides annotated image URLs with `documentId` and page number.
    

[GET /agreements/{agreementId}/documents/{documentId}/imageUrls](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/getDocumentImageUrls)

*   Uses `participantId` instead of `participantEmail` as a filter.
    
*   There are minor changes in the field names.
    

[GET /libraryDocuments](https://secure.echosign.com/public/docs/restapi/v6#!/libraryDocuments/getLibraryDocuments)

*   Response is paginated.
    
*   Creator email and status is in the response.
    
*   We’ve added a query parameter to view/un-view all the hidden agreements.
    
*   The `scope` parameter in v5 is mapped to `sharingMode` in v6.
    
*   `PERSONAL` in v5 is now `USER` in v6.
    
*   `SHARED` in v5 is now \`GROUP in v6.
    
*   The `libraryTemplateType` filter is dropped from this API. This will be available along with other filtering through search services.
    

[GET /libraryDocuments/{libraryDocumentId}](https://secure.echosign.com/public/docs/restapi/v6#!/libraryDocuments/getLibraryDocumentInfo)

*   Events have been removed from the response of this endpoint and are now returned through a dedicated events endpoint.
    
*   The `latestVersionId` parameter is now removed from here and will be available in `GET /libraryDocuments`.
    
*   We have removed obsolete and unnecessary parameters: `locale`, `participants`, `message` and `securityOptions`.
    
*   The model is consistent with the corresponding POST and PUT operations.
    

[GET /libraryDocuments/{libraryDocumentId}/documents](https://secure.echosign.com/public/docs/restapi/v6#!/libraryDocuments/getDocuments)

*   Added a `label` parameter for using in the custom workflow.
    
*   A `versionId` of the documents has been added as a filter.
    

A base64 encoding option is available for the generated PDF.

Minor restructuring in the response.

[GET /users](https://secure.echosign.com/public/docs/restapi/v6#!/users/getUsers)

*   Paginated response.
    
*   The `groupId` is no longer returned through this API.
    
*   Returns the new account admin information.
    

[GET /users/{userId}](https://secure.echosign.com/public/docs/restapi/v6#!/users/getUserDetail)

*   A few unusable fields were dropped.
    
*   We have removed capability flags from here.
    

The model is consistent with the POST and PUT operations.

[POST /agreements](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/createAgreement)

*   The request body is now consistent with its GET/PUT counterpart. A common agreement model is used across all these APIs.
    
*   Interactive options have been removed from the request body and is available through the separate [POST /agreements/{agreementId}/views](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/getAgreementView) API.
    
*   Support for form fields, form fields layer template, amd merge fields has been removed from here and will now be available through the authoring APIs.
    
*   The document visibility feature is available in v6.
    
*   This API is more responsive as it is now asynchronous.
    
*   Clients can build up an agreement sequentially using draft functionality.
    
*   The `signatureFlow` parameter is dropped from v6 and is now implicitly inferred through the sequence that the values of other parameters are given in all participant sets.
    
*   The Suppress Email feature is available in v6.
    
*   You can create an agreement in different states using the `transistionState` field.
    
*   There is a separate state transitioning (from draft to agreement) API.
    

[POST /agreements/{agreementId}/members/participantSets/{participantSetId}/delegatedParticipantSets](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/createDelegatedParticipantSets)

*   You should specify an agent delegation role for a successful call.
    
*   You can delegate to multiple participants, who constitute a newly created participant set.
    
*   You are not allowed to perform “Someone else should sign” with this API, as it will now be done through [PUT /agreements/{agreementId}/members/participantSets/{participantSetId}](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/updateParticipantSet)
    

[POST /agreements/{agreementId}/reminders](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/createReminderOnParticipant)

Was: [POST /reminders](https://secure.na1.echosign.com/public/docs/restapi/v5#!/reminders/createReminder)

*   Creates reminders for multiple participants.
    
*   Lets you set the next send date, note, frequency, and other parameters.
    
*   You can track each reminder through the ID returned from here.
    

[POST /libraryDocuments](https://secure.echosign.com/public/docs/restapi/v6#!/libraryDocuments/createLibraryDocument)

*   The model is consistent with the corresponding GET & PUT operations.
    
*   Obsolete parameters `libraryDocumentId` and `libraryDocumentName` have been removed from `fileInfosstructure`. This was present in prior versions, but was unusable, because we did not allow library template creation using an existing template through the API.
    
*   Interactive options have been removed from the request body; the equivalent functionality is now available through the `POST /libraryDocuments/{libraryDocumentId}/views` API.
    
*   You can create a library template in different states using the transition state field.
    
*   There is a separate state transitioning (Authoring to Active) API.
    

[POST /transientDocuments](https://secure.echosign.com/public/docs/restapi/v6#!/transientDocuments/createTransientDocument)

*   Returns an `UNSUPPORTED_MEDIA_TYPE` error for unsupported media types in Acrobat Sign.
    

[POST /widgets](https://secure.echosign.com/public/docs/restapi/v6#!/widgets/createWidget)

*   The request body is now consistent with this API’s GET/PUT counterpart. A common agreement model is used across all these APIs.
    
*   Form fields layer template and Merge Fields support have been removed in v6 for widget creation.
    
*   The `signatureFlow` parameter has been dropped and the workflow is inferred through the order in the `additionalParticipantSetsInfo` parameter.
    

Enables a participant to reject an agreement.

[PUT /agreements/{agreementId}/state](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/updateAgreementState)

Was: [PUT /agreements/{agreementId}/status](https://secure.echosign.com/public/docs/restapi/v5#!/agreements/updateStatus)

*   Dropped the [PUT /agreements/{agreementId}/status](https://secure.echosign.com/public/docs/restapi/v5#!/agreements/updateStatus) API, as it was offering a dedicated endpoint for modifying a property of the agreement resource.
    
*   The new API offers an action-based semantic to transition between states of an agreement.
    
*   The intended final state of the agreement is provided in the request body and the response indicates if the agreement was successfully transitioned into the intended state.
    
*   This API can be used by the sender to cancel the agreement.
    

Updating the group of the user is now handled via the `PUT /users/{userId}/groups` API.

This is functionally the same as before, but the API structure is revamped to make it consistent with other state transition APIs in v6.

### Removed APIs

[DELETE /agreements/{agreementId}](https://secure.echosign.com/public/docs/restapi/v5#!/agreements/deleteAgreement)  
*   The equivalent functionality of removing an agreement permanently from a user’s manage page can be achieved through the combination of [DELETE /agreements/{agreementId}/documents](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/deleteDocuments) and [PUT /visibility](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/updateAgreementVisibility).

[GET /agreements/{agreementId}/documents/{documentId}/url](https://secure.echosign.com/public/docs/restapi/v5#!/agreements/getDocumentUrl)  
*   The v5 API had the redundant functionality of providing combined agreement docs, which can be achieved through the [GET /document](https://secure.echosign.com/public/docs/restapi/v6#!/agreements/getDocument) API.
