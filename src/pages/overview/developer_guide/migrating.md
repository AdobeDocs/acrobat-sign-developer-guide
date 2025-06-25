# Migrating and Updating Apps

## Updating API authentication methods

Adobe is committed to providing a safe and secure product experience for our customers by adhering to the latest industry-standard security protocols. As a part of that process, on December 2021, Adobe Acrobat Sign ended support for older API authentication models that allowed sending a username and password in the API call.

To move to a secure authentication model:

- Use REST APIs: Acrobat Sign APIs are now restricted to REST APIs. [You can try out the REST API here](https://secure.na1.echosign.com/public/docs/restapi/v6).
- Use OAuth: To enable an end user to use your client app with Acrobat Sign, have the end-user authenticate with Adobe. The recommended way for authenticating end users with Acrobat Sign is the standard OAuth protocol.

The general recommendation is that every user in the organization should directly authenticate with Adobe while using your client app to have their unique access tokens issued. SAML configuration with Acrobat Sign in your user’s organization provides an easy way to do so. However, there might be enterprise use-cases where only a single admin is required to authenticate with Adobe and other users in this organization can just use the client without an Adobe login. This is possible via Adobe’s OAUTH modifiers. Modifiers enable clients to call APIs with admins’ OAUTH token and actual regular user’s identity in “x-api-user” header.

## Migrating From SOAP

Applications using the legacy Acrobat Sign SOAP APIs should migrate to the more functional and secure v6 REST APIs.

### SOAP to REST mapping

The tables below maps SOAP endpoints to their REST equivalents. Both endpoints link directly to the full method description.

#### General-purpose Methods


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getBaseUris](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getBaseUris) | [/baseUris, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/baseUris/getBaseUris) |


<InlineAlert slots="text" />

Base URIs: API calls starting v5 of REST API must be made on a specific base URL obtained either from the api_access_point returned from the OAuth workflow or by making a call to the <span style="color: red;">GET /baseUris</span> endpoint.

#### Document Methods



| SOAP Endpoint | REST Endpoint |
|---|---|
| [sendDocument](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#sendDocument) | [/agreements, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/createAgreement) |


SenderInfo is represented through <span style="color: red;">x-api-user</span>. Files are specified through /transientDocuments.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [sendDocumentInteractive](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#sendDocumentInteractive) | [/agreements/{agrId}/views, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/createAgreementView) |


From v6 onwards, the interactive views can be specified and obtained from the <span style="color: red;">POST /agreements/&#123;agrId&#125;/views</span> endpoint for the interactive behavior.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [sendDocumentMegaSign](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#sendDocumentMegaSign) | [/megaSigns, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/megaSigns/createMegaSign) |


MegaSign allows sending the same agreement to multiple recipients and creating a separate instance of agreement for each recipient.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [createLibraryDocument](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#createLibraryDocument) | [/libraryDocuments, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/libraryDocuments/createLibraryDocument) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [createLibraryDocumentInteractive](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#createLibraryDocumentInteractive) | [/libraryDocuments/{libraryDocumentId}, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/libraryDocuments/createLibraryDocumentView) |


From v6 onwards, the interactive views can be specified and obtained from the <span style="color: red;">POST /agreements/&#123;agrId&#125;/views</span> endpoint for the interactive behavior.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [sendReminder](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#sendReminder) | [/agreements/{agrId}/reminders, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/createReminderOnParticipant) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [removeDocument](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#removeDocument) | [/agreements/{agrId}/documents, DELETE](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/deleteDocuments) |


To delete the documents of agreements, use the <span style="color: red;">DELETE /agreements/&#123;agrId&#125;/documents</span> endpoint; and to remove it from Manage Page(GET /agreements), use <span style="color: red;">PUT /agreements/&#123;agrId&#125;/visibility</span>


| SOAP Endpoint | REST Endpoint |
|---|---|
| [cancelDocument](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#cancelDocument) | [/agreements/{agrId}/state, PUT](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/updateAgreementState) |


Cancel: Called by sender.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [rejectDocument](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#rejectDocument) | [/agreements/{agrId}/members/participantSets/{psId}/participants/{pId}/reject, PUT](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/rejectAgreementForParticipation) |


Reject: Called by current signer.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [replaceSigner](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#replaceSigner) | [/agreements/{agreementId}/members/participantSets/{participantSetId}, PUT](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/updateParticipantSet) |


Replace: Called by sender. Both the original signer and new one can sign.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [delegateSigning](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#delegateSigning) | [/agreements/{agrId}/members/participantSets/{psId}/participants/{pId}/delegatedParticipantSet, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/createDelegatedParticipantSets) |


Delegate: Called by signer. Both the delegator and delegatee can sign.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [notifyDocumentVaulted](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#notifyDocumentVaulted) | [/agreements/{agreementId}/vaulted, PUT](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/updateAgreementVaulted) |


#### Status Methods


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getDocumentInfo](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocumentInfo) | [/agreements/{agrId}, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAgreementInfo) |


In SOAP API, <span style="color: red;">getDocumentInfo</span>, <span style="color: red;">getDocuments</span>, <span style="color: red;">getAuditTrail</span> etc. work on <span style="color: red;">documentKeys</span>, which can be an ID for an agreement, widget, or library document. The REST API demarcates these as separate resources (cleaner design and strongly typed) and hence, based on the kind of resource you are working on, there is a corresponding /libraryDocuments, /widgets to these. Example: <span style="color: red;">/widgets/&#123;widgetId&#125;, GET</span> will getDocumentInfo for <span style="color: red;">widgetId</span>, and similarly for documents, audit trail, etc.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getDocumentInfosByExternalId](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocumentInfosByExternalId) | [/agreements, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAgreements) query = externalId |


<span style="color: red;">externalId</span> can be used to map your internal IDs to Acrobat Sign IDs.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getDocuments](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocuments) | [/agreements/{agrId}/documents, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAllDocuments) |


REST returns a list of document IDs that can be provided to the following endpoint to get a document stream.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getDocumentUrls](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocumentUrls) | [/agreements/{agrId}/combinedDocument/url, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getCombinedDocumentUrl) |


Retrieve the URL of the **combined document**.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getDocumentUrls](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocumentUrls) | [/agreements/{agrId}/documents/{docId}/url, GET](https://secure.na1.adobesign.com/public/docs/restapi/v5#!/agreements/getDocumentUrl) |


Retrieve the URL of an **individual document**.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getDocumentImageUrls](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocumentImageUrls) | [/agreements/{agrId}/documents/imageUrls, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAllDocumentsImageUrls) |


Retrieve the image URLs of **all visible pages** of an agreement.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getDocumentImageUrls](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocumentImageUrls) | [/agreements/{agrId}/documents/{docId}/imageUrls, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getDocumentImageUrls) |


Retrieve image URLs of a specified documentID.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getSupportingDocuments](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getSupportingDocuments) | [/agreements/{agrId}/documents, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAllDocuments) |


Can also specify the content format.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getFormData](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getFormData) | [/agreements/{agrId}/formData, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getFormData) |


Returns a CSV file stream.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getAuditTrail](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getAuditTrail) | [/agreements/{agrId}/auditTrail, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAuditTrail) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [getSigningUrl](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getSigningUrl) | [/agreements/{agrId}/signingUrls, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getSigningUrl) |


#### User Methods


| SOAP Endpoint | REST Endpoint |
|---|---|
| [createUser](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService19#createUser) | [/users, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/users/createUser) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [verifyUser](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#verifyUser) | [/users/{userId}, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/users/getUserDetail) |


The REST equivalent can be used to see if the user exists, but does not support password verification.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [searchUserDocuments](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#searchUserDocuments) | TBD |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [getDocumentEventsForUser](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocumentEventsForUser) | [/agreement/{agrId}/events, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getEvents) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [getEmbeddedView](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getEmbeddedView) | [/agreements/{agrId}/views, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/createAgreementView) |


Use the name = DOCUMENT to get the embedded view of an agreement.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getUserDocuments](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getUserDocuments) | [/agreements, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAgreements) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [getMyDocuments](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getMyDocuments) | [/agreements, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAgreements) |


Use <span style="color: red;">x-api-user</span> for specifying the user whose agreements are to be retrieved.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getLibraryDocumentsForUser](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getLibraryDocumentsForUser) | [/libraryDocuments, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/libraryDocuments/getLibraryDocuments) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [getMyLibraryDocuments](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getMyLibraryDocuments) | [/libraryDocuments, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/libraryDocuments/getLibraryDocuments) |


Use <span style="color: red;">x-api-user</span> for specifying the user whose library documents are to be retrieved.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getWidgetsForUser](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getWidgetsForUser) | [/widgets, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/getWidgets) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [getMyWidgets](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getMyWidgets) | [/widgets, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/getWidgets) |


Use <span style="color: red;">x-api-user</span> for specifying the user whose widgets are to be retrieved.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getMegaSignDocument](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getMegaSignDocument) | [/megaSigns/{megaSignId}/agreements, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/megaSigns/getMegaSignChildAgreements) |


Get all child agreement IDs of the parent MegaSign.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getUsersInAccount](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getUsersInAccount) | [/users, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/users/getUsers) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [createGroup](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#createGroup) | [/groups, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/groups/createGroup) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [deleteGroup](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#deleteGroup) | [/groups/groupId, DELETE](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/groups/deleteGroup) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [renameGroup](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#renameGroup) | [/groups/{groupId}, PUT](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/groups/modifyGroup) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [getGroupsInAccount](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getGroupsInAccount) | [/groups, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/groups/getGroups) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [getUsersInGroups](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getUsersInGroups) | [/groups/{groupId}/users, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/groups/getUsersInGroup) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [moveUsersToGroup](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#moveUsersToGroup) | [/users/{userId}/groups, PUT](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/users/updateGroupsOfUser) |


Specify the new <span style="color: red;">groupId</span> in the request.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getUserInfo](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getUserInfo) | [/users/{userId}, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/users/getUserDetail) |


#### Web Form Methods


| SOAP Endpoint | REST Endpoint |
|---|---|
| [createEmbeddedWidget](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#createEmbeddedWidget) | [/widgets, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/createWidget) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [createPersonalEmbeddedWidget](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#createPersonalEmbeddedWidget) | [/widgets/{widgetId}/views, POST](https://secure.na1.echosign.com/public/docs/restapi/v6#!/widgets/getWidgetView) |


Use PersonalizedSigningViewConfiguration for specifying personalization options


| SOAP Endpoint | REST Endpoint |
|---|---|
| [personalizeEmbeddedWidget](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#personalizeEmbeddedWidget) | [/widgets, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/createWidget) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [createUrlWidget](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#createUrlWidget) | [/widgets, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/createWidget) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [createPersonalUrlWidget](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#createPersonalUrlWidget) | [/widgets/{widgetId}/views, POST](https://secure.na1.echosign.com/public/docs/restapi/v6#!/widgets/getWidgetView) |


Use PersonalizedSigningViewConfiguration for specifying personalization options


| SOAP Endpoint | REST Endpoint |
|---|---|
| [personalizeUrlWidget](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#personalizeUrlWidget) | [/widgets, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/createWidget) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [disableWidget](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#disableWidget) | [/widgets/{widgetId}/state, PUT](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/updateWidgetState) |


Use status value as <span style="color: red;">INACTIVE</span>.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [enableWidget](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#enableWidget) | [/widgets/{widgetId}/state, PUT](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/updateWidgetState) |


Use status value as <span style="color: red;">ACTIVE</span>.


| SOAP Endpoint | REST Endpoint |
|---|---|
| [personalizeEmbeddedWidget](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService19#personalizeEmbeddedWidget) | [/widgets, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/createWidget) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [personalizeUrlWidget](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService19#personalizeUrlWidget) | [/widgets, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/createWidget) |


#### Test Methods


| SOAP Endpoint | REST Endpoint |
|---|---|
| [testPing](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#testPing) | [/baseURIs, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/baseUris/getBaseUris) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [testEchoFile](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#testEchoFile) | TBD |


### Deprecated SOAP methods

#### Access Methods

issueAccessToken - [Auth has replaced access tokens](gstarted.md).

#### Doc Methods


| SOAP Endpoint | REST Endpoint |
|---|---|
| [initiateInteractiveSendDocument](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#initiateInteractiveSendDocument) | [/agreements/{agrId}/views, POST](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/createAgreementView) |


#### Status Methods


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getDocumentUrlByVersion](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#getDocumentUrlByVersion) | [/agreement/{agreementID}/combinedDocument/url, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getCombinedDocumentUrl) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [getDocumentByVersion](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#getDocumentByVersion) | [/agreements/{agreementId}/combinedDocument, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getCombinedDocument) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [getImagesByVersion](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#getImagesByVersion) | [/agreements/{agrId}/documents/imageUrls, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAllDocumentsImageUrls) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [getLatestDocument](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#getLatestDocument) | [/agreements/{agrId}/documents, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAllDocuments) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [getLatestDocumentUrl](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#getLatestDocumentUrl) | /agreements/{agrId}/documents/{docId}/url, GET [[/agreements/{agrId}/combinedDocument/url, GET]](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getCombinedDocumentUrl) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [getLatestImages](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#getLatestImages) | [/agreements/{agrId}/documents/imageUrls, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAllDocumentsImageUrls) [[/agreements/{agrId}/documents/{docId}/imageUrls, GET]](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getDocumentImageUrls) |


#### User Methods


| SOAP Endpoint | REST Endpoint |
|---|---|
| [getDocumentsForUser](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#getDocumentsForUser) | [/agreements, GET](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAgreements) |



| SOAP Endpoint | REST Endpoint |
|---|---|
| [createAccount](https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService19#createAccount) | None |

