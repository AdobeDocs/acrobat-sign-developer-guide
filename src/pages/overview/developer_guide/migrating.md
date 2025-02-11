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

<br/>
<table border="1" style="width: auto;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getBaseUris">getBaseUris</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/baseUris/getBaseUris">/baseUris, GET</a></td>
        </tr>
    </tbody>
</table>

<InlineAlert slots="text" />

Base URIs: API calls starting v5 of REST API must be made on a specific base URL obtained either from the api_access_point returned from the OAuth workflow or by making a call to the <span style="color: red;">GET /baseUris</span> endpoint.

#### Document Methods

<br/>
<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#sendDocument">sendDocument</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/createAgreement">/agreements, POST</a></td>
        </tr>
    </tbody>
</table>

SenderInfo is represented through <span style="color: red;">x-api-user</span>. Files are specified through /transientDocuments.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#sendDocumentInteractive">sendDocumentInteractive</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/createAgreementView">/agreements/&#123;agrId&#125;/views, POST</a></td>
        </tr>
    </tbody>
</table>


From v6 onwards, the interactive views can be specified and obtained from the <span style="color: red;">POST /agreements/&#123;agrId&#125;/views</span> endpoint for the interactive behavior.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#sendDocumentMegaSign">sendDocumentMegaSign</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/megaSigns/createMegaSign">/megaSigns, POST</a></td>
        </tr>
    </tbody>
</table>

MegaSign allows sending the same agreement to multiple recipients and creating a separate instance of agreement for each recipient.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#createLibraryDocument">createLibraryDocument</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/libraryDocuments/createLibraryDocument">/libraryDocuments, POST</a></td>
        </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#createLibraryDocumentInteractive">createLibraryDocumentInteractive</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/libraryDocuments/createLibraryDocumentView">/libraryDocuments/&#123;libraryDocumentId&#125;, POST</a></td>
        </tr>
    </tbody>
</table>


From v6 onwards, the interactive views can be specified and obtained from the <span style="color: red;">POST /agreements/&#123;agrId&#125;/views</span> endpoint for the interactive behavior.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#sendReminder">sendReminder</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/createReminderOnParticipant">/agreements/&#123;agrId&#125;/reminders, POST</a></td>
        </tr>
    </tbody>
</table> 

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#removeDocument">removeDocument</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/deleteDocuments">/agreements/&#123;agrId&#125;/documents, DELETE</a></td>
        </tr>
    </tbody>
</table>

To delete the documents of agreements, use the <span style="color: red;">DELETE /agreements/&#123;agrId&#125;/documents</span> endpoint; and to remove it from Manage Page(GET /agreements), use <span style="color: red;">PUT /agreements/&#123;agrId&#125;/visibility</span>


<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#cancelDocument">cancelDocument</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/updateAgreementState">/agreements/&#123;agrId&#125;/state, PUT</a></td>
        </tr>
    </tbody>
</table>

Cancel: Called by sender.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;" columnWidths="30,70">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#rejectDocument">rejectDocument</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/rejectAgreementForParticipation">/agreements/&#123;agrId&#125;/members/participantSets/&#123;psId&#125;/participants/&#123;pId&#125;/reject, PUT</a></td>
        </tr>
    </tbody>
</table>

Reject: Called by current signer.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;" columnWidths="30,70">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#replaceSigner">replaceSigner</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/updateParticipantSet">/agreements/&#123;agreementId&#125;/members/participantSets/&#123;participantSetId&#125;, PUT</a></td>
        </tr>
    </tbody>
</table>

Replace: Called by sender. Both the original signer and new one can sign.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;" columnWidths="30,70">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#delegateSigning">delegateSigning</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/createDelegatedParticipantSets">/agreements/&#123;agrId&#125;/members/participantSets/&#123;psId&#125;/participants/&#123;pId&#125;/delegatedParticipantSet, POST</a></td>
        </tr>
    </tbody>
</table>

Delegate: Called by signer. Both the delegator and delegatee can sign.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#notifyDocumentVaulted">notifyDocumentVaulted</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/updateAgreementVaulted">/agreements/&#123;agreementId&#125;/vaulted, PUT</a></td>
        </tr>
    </tbody>
</table>

#### Status Methods

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocumentInfo">getDocumentInfo</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAgreementInfo">/agreements/&#123;agrId&#125;, GET</a></td>
        </tr>
    </tbody>
</table>

In SOAP API, <span style="color: red;">getDocumentInfo</span>, <span style="color: red;">getDocuments</span>, <span style="color: red;">getAuditTrail</span> etc. work on <span style="color: red;">documentKeys</span>, which can be an ID for an agreement, widget, or library document. The REST API demarcates these as separate resources (cleaner design and strongly typed) and hence, based on the kind of resource you are working on, there is a corresponding /libraryDocuments, /widgets to these. Example: <span style="color: red;">/widgets/&#123;widgetId&#125;, GET</span> will getDocumentInfo for <span style="color: red;">widgetId</span>, and similarly for documents, audit trail, etc.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocumentInfosByExternalId">getDocumentInfosByExternalId</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAgreements">/agreements, GET</a> query = externalId</td>
        </tr>
    </tbody>
</table>

<span style="color: red;">externalId</span> can be used to map your internal IDs to Acrobat Sign IDs.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocuments">getDocuments</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAllDocuments">/agreements/&#123;agrId&#125;/documents, GET</a></td>
        </tr>
    </tbody>
</table>

REST returns a list of document IDs that can be provided to the following endpoint to get a document stream.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocumentUrls">getDocumentUrls</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getCombinedDocumentUrl">/agreements/&#123;agrId&#125;/combinedDocument/url, GET</a></td>
        </tr>
    </tbody>
</table>

Retrieve the URL of the **combined document**.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocumentUrls">getDocumentUrls</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v5#!/agreements/getDocumentUrl">/agreements/&#123;agrId&#125;/documents/&#123;docId&#125;/url, GET</a></td>
        </tr>
    </tbody>
</table>


Retrieve the URL of an **individual document**.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocumentImageUrls">getDocumentImageUrls</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAllDocumentsImageUrls">/agreements/&#123;agrId&#125;/documents/imageUrls, GET</a></td>
        </tr>
    </tbody>
</table>

Retrieve the image URLs of **all visible pages** of an agreement.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocumentImageUrls">getDocumentImageUrls</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getDocumentImageUrls">/agreements/&#123;agrId&#125;/documents/&#123;docId&#125;/imageUrls, GET</a></td>
        </tr>
    </tbody>
</table>

Retrieve image URLs of a specified documentID.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getSupportingDocuments">getSupportingDocuments</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAllDocuments">/agreements/&#123;agrId&#125;/documents, GET</a></td>
        </tr>
    </tbody>
</table>

Can also specify the content format.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getFormData">getFormData</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getFormData">/agreements/&#123;agrId&#125;/formData, GET</a></td>
        </tr>
    </tbody>
</table>

Returns a CSV file stream.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getAuditTrail">getAuditTrail</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAuditTrail">/agreements/&#123;agrId&#125;/auditTrail, GET</a></td>
        </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getSigningUrl">getSigningUrl</a></td>
            <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getSigningUrl">/agreements/&#123;agrId&#125;/signingUrls, GET</a></td>
        </tr>
    </tbody>
</table>

#### User Methods

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService19#createUser">createUser</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/users/createUser">/users, POST</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#verifyUser">verifyUser</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/users/getUserDetail">/users/&#123;userId&#125;, GET</a></td>
    </tr>
    </tbody>
</table>

The REST equivalent can be used to see if the user exists, but does not support password verification.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#searchUserDocuments">searchUserDocuments</a></td>
      <td>TBD</td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getDocumentEventsForUser">getDocumentEventsForUser</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getEvents">/agreement/&#123;agrId&#125;/events, GET</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getEmbeddedView">getEmbeddedView</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/createAgreementView">/agreements/&#123;agrId&#125;/views, POST</a></td>
    </tr>
    </tbody>
</table>

Use the name = DOCUMENT to get the embedded view of an agreement.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getUserDocuments">getUserDocuments</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAgreements">/agreements, GET</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getMyDocuments">getMyDocuments</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAgreements">/agreements, GET</a></td>
    </tr>
    </tbody>
</table>

Use <span style="color: red;">x-api-user</span> for specifying the user whose agreements are to be retrieved.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getLibraryDocumentsForUser">getLibraryDocumentsForUser</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/libraryDocuments/getLibraryDocuments">/libraryDocuments, GET</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getMyLibraryDocuments">getMyLibraryDocuments</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/libraryDocuments/getLibraryDocuments">/libraryDocuments, GET</a></td>
    </tr>
    </tbody>
</table>

Use <span style="color: red;">x-api-user</span> for specifying the user whose library documents are to be retrieved.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getWidgetsForUser">getWidgetsForUser</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/getWidgets">/widgets, GET</a></td>
    </tr>
    </tbody>
</table>


<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getMyWidgets">getMyWidgets</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/getWidgets">/widgets, GET</a></td>
    </tr>
    </tbody>
</table>

Use <span style="color: red;">x-api-user</span> for specifying the user whose widgets are to be retrieved.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getMegaSignDocument">getMegaSignDocument</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/megaSigns/getMegaSignChildAgreements">/megaSigns/&#123;megaSignId&#125;/agreements, GET</a></td>
    </tr>
    </tbody>
</table>

Get all child agreement IDs of the parent MegaSign.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getUsersInAccount">getUsersInAccount</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/users/getUsers">/users, GET</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#createGroup">createGroup</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/groups/createGroup">/groups, POST</a></td>
    </tr>
    </tbody>
</table>


<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#deleteGroup">deleteGroup</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/groups/deleteGroup">/groups/groupId, DELETE</a></td>
    </tr>
    </tbody>
</table>


<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#renameGroup">renameGroup</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/groups/modifyGroup">/groups/&#123;groupId&#125;, PUT</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getGroupsInAccount">getGroupsInAccount</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/groups/getGroups">/groups, GET</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getUsersInGroups">getUsersInGroups</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/groups/getUsersInGroup">/groups/&#123;groupId&#125;/users, GET</a></td>
    </tr>
    </tbody>
</table>


<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#moveUsersToGroup">moveUsersToGroup</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/users/updateGroupsOfUser">/users/&#123;userId&#125;/groups, PUT</a></td>
    </tr>
    </tbody>
</table>

Specify the new <span style="color: red;">groupId</span> in the request.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#getUserInfo">getUserInfo</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/users/getUserDetail">/users/&#123;userId&#125;, GET</a></td>
    </tr>
    </tbody>
</table>

#### Web Form Methods

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#createEmbeddedWidget">createEmbeddedWidget</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/createWidget">/widgets, POST</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#createPersonalEmbeddedWidget">createPersonalEmbeddedWidget</a></td>
      <td><a href="https://secure.na1.echosign.com/public/docs/restapi/v6#!/widgets/getWidgetView">/widgets/&#123;widgetId&#125;/views, POST</a></td>
    </tr>
    </tbody>
</table>


Use PersonalizedSigningViewConfiguration for specifying personalization options

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#personalizeEmbeddedWidget">personalizeEmbeddedWidget</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/createWidget">/widgets, POST</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#createUrlWidget">createUrlWidget</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/createWidget">/widgets, POST</a></td>
    </tr>
    </tbody>
</table>


<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#createPersonalUrlWidget">createPersonalUrlWidget</a></td>
      <td><a href="https://secure.na1.echosign.com/public/docs/restapi/v6#!/widgets/getWidgetView">/widgets/&#123;widgetId&#125;/views, POST</a></td>
    </tr>
    </tbody>
</table>


Use PersonalizedSigningViewConfiguration for specifying personalization options

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#personalizeUrlWidget">personalizeUrlWidget</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/createWidget">/widgets, POST</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#disableWidget">disableWidget</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/updateWidgetState">/widgets/&#123;widgetId&#125;/state, PUT</a></td>
    </tr>
    </tbody>
</table>

Use status value as <span style="color: red;">INACTIVE</span>.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#enableWidget">enableWidget</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/updateWidgetState">/widgets/&#123;widgetId&#125;/state, PUT</a></td>
    </tr>
    </tbody>
</table>

Use status value as <span style="color: red;">ACTIVE</span>.

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService19#personalizeEmbeddedWidget">personalizeEmbeddedWidget</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/createWidget">/widgets, POST</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService19#personalizeUrlWidget">personalizeUrlWidget</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/widgets/createWidget">/widgets, POST</a></td>
    </tr>
    </tbody>
</table>

#### Test Methods

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#testPing">testPing</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/baseUris/getBaseUris">/baseURIs, GET</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService22#testEchoFile">testEchoFile</a></td>
      <td>TBD</td>
    </tr>
    </tbody>
</table>

### Deprecated SOAP methods

#### Access Methods

issueAccessToken - [Auth has replaced access tokens](gstarted.md).

#### Doc Methods

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#initiateInteractiveSendDocument">initiateInteractiveSendDocument</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/createAgreementView">/agreements/&#123;agrId&#125;/views, POST</a></td>
    </tr>
    </tbody>
</table>


#### Status Methods

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#getDocumentUrlByVersion">getDocumentUrlByVersion</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getCombinedDocumentUrl">/agreement/&#123;agreementID&#125;/combinedDocument/url, GET</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#getDocumentByVersion">getDocumentByVersion</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getCombinedDocument">/agreements/&#123;agreementId&#125;/combinedDocument, GET</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#getImagesByVersion">getImagesByVersion</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAllDocumentsImageUrls">/agreements/&#123;agrId&#125;/documents/imageUrls, GET</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#getLatestDocument">getLatestDocument</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAllDocuments">/agreements/&#123;agrId&#125;/documents, GET</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#getLatestDocumentUrl">getLatestDocumentUrl</a></td>
      <td>/agreements/&#123;agrId&#125;/documents/&#123;docId&#125;/url, GET <a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getCombinedDocumentUrl">[/agreements/&#123;agrId&#125;/combinedDocument/url, GET]</a></td>
    </tr>
    </tbody>
</table>

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#getLatestImages">getLatestImages</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAllDocumentsImageUrls">/agreements/&#123;agrId&#125;/documents/imageUrls, GET</a> <a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getDocumentImageUrls">[/agreements/&#123;agrId&#125;/documents/&#123;docId&#125;/imageUrls, GET]</a></td>
    </tr>
    </tbody>
</table>


#### User Methods

<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService13#getDocumentsForUser">getDocumentsForUser</a></td>
      <td><a href="https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/getAgreements">/agreements, GET</a></td>
    </tr>
    </tbody>
</table>


<br/>
<table border="1" style="width: auto; border-collapse: collapse;">
    <thead>
        <tr>
            <th>SOAP Endpoint</th>
            <th>REST Endpoint</th>
        </tr>
    </thead>
    <tbody>
    <tr>
      <td><a href="https://secure.na1.adobesign.com/public/docs/EchoSignDocumentService19#createAccount">createAccount</a></td>
      <td>None</td>
    </tr>
    </tbody>
</table>