
# 2016 REST v6 Release Notes

Last update: Jun 13, 2024.

<InlineAlert slots="header, text" />

Tip

For non-developer product feature and UI changes, refer to [this link](https://helpx.adobe.com/sign/release-notes/adobe-sign.html)

The 2016 (to present) REST v6 Acrobat Sign APIs release introduces numerous enhancements and features. To help developers migrate from older API versions to Version 6, we have tabulated the v6 APIs against their closest counterparts in previous versions in the [API Change Log](#api-change-log). In the change log, we have documented enhancements, features, and any changes from the prior version. In addition to the information compiled here, refer to the [Acrobat Sign API Reference](https://www.adobe.com/go/acrobatsignapireference) for a quick reference for the Acrobat Sign APIs. This page lists all our APIs in a easily discoverable format, and lets you try them out without having to write any code!

<InlineAlert slots="header, text" />

Note

v5 and SOAP-based apps will continue to function, but all versions prior to v6 are deprecated.

## REST API Enhancements

### Pagination Support

Existing Acrobat Sign APIs return the entire list of resources (agreements, widgets, or library documents) that a user has in a GET call. For some users with a large number of transactions this resource list becomes too big for consumption. The v6 APIs have introduced pagination support to all these resources with a client-configurable page size. This will be especially useful to our mobile clients and integrations who are constrained by their consumption capacity. This sample shows pagination in a request and response:

**Sample Request**

`GET https://api.na1.echosign.com:443/api/rest/v6/agreements?pageSize=50`

**Sample Response**

```javascript
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

The subsequent GET /resources calls would just need to add **nextCursor** as **query param** in the URL for fetching the next set of resources.

**Sample Request**

`GET https://api.na1.echosign.com:443/api/rest/v6/agreements?pageSize=50&cursor=qJXXj2UAUX1X9rTSqoUOUOlkhsdo*`

### Constant IDs

Our Partners and Integrators have requested that the identifiers remain constant in the lifetime of a resource. This is because they tend to store these resource IDs and do a match later, which can break with ID changes. The v6 APIs address this by ensuring that IDs stay constant through time and across all API callers for a given resource. This will enable clients to build their own metadata associated with an Acrobat Sign resource ID.

Identifiers are forward-compatible: **older identifiers will continue working in v6 Sign APIs.** However, new identifiers generated through v6 APIs **will only be compatible with Acrobat Sign v6 or any higher version.**

### ETag support

Polling on a resource is a common operation; for instance, in the case of agreements, where a client application is attempting to check the latest status. The v6 REST APIs significantly optimize this by adding support for an ETag, which will only fetch the full body response if the resource has been modified. This saves the client from loading the same response as well as its unnecessary parsing.

In addition, this also helps to resolve conflicts in the case of concurrent update operations by only allowing the updates with the ETag of the latest version of the resource in their request header (_If-match_). This example explains the functioning of ETags in detail:

**Sample GET Operation (ETag in Request Header)**

```http
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

```http
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

```http
URI : PUT  https://api.na1.echosign.com:443/api/rest/v6/agreements/CBJCHBCAABAAQonMXhG-V6w-rheRViZNFGxmCgEEf3k0/status

Headers : Authorization: Bearer <access-token>
          Accept: */*
          Accept-Encoding: gzip, deflate, br
          Accept-Language: en-US,en
          If-Match: CBJCHBCAABAA-mdO9PI7WFmHNkXFUIEYIOYGrnM3vVK_

```

The response below indicates that we are trying to update an older version (_observe the ETag in the request_) of this resource. Along with this response body, the response header contains the HTTP status code 412(Precondition Failed).

**Sample PUT Operation (ETag In Request Header)**

```json
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

```javascript
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
