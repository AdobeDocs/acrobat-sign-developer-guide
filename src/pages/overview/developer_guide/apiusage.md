# API Usage

The Acrobat Sign API allows you to quickly build client-side applications that can utilize the signing functionalities offered by Acrobat Sign. This guide contains the most common scenarios in which you can use the API.

Using the Acrobat Sign REST APIs, you can build elegant and scalable client-side applications in any scripting language that supports REST-based API calls. This section provides information on the API endpoint, request headers, request body, and the response. Before you begin, you can browse through the [API Reference](https://www.adobe.com/go/acrobatsignapireference) and try a few endpoints.

A 3-step basic signing workflow involves:

- [Send the document](apiusage.md#send-the-document)
- [Check the Document signing status](apiusage.md#check-the-document-signing-status)
- [Download the Agreement](apiusage.md#download-the-agreement)
- [Resolve Request Signature integration error](apiusage.md#resolve-request-signature-integration-error)

## Send for Signing (Create an agreement)

Your CRM or document management system can send/upload documents for signing,
either automatically or through user-initiated actions. When the document gets
signed by all the parties, a PDF copy of the signed document(agreement) can be
retrieved by your application.

![_images/sign_devguide_1.png](_images/sign_devguide_1.png)

While getting the authorization code from the Acrobat Sign service, you also
received the API access point as part of a query parameter (See [Create an authorization request link](gstarted.md#create-an-authorization-request-link)).

    
```http    
    https://secure.echosign.com/public/oauth?
       redirect_uri=https://your-oAuthInteraction-Server/your-oAuth-Page.html&
       response_type=code&
       client_id=xxxxxxxxxx&
       state=xxxxxxxxxx&
       scope=user_read:account+user_write:account+user_login:account+agreement_read:account+agreement_write:account+agreement_send:account+widget_read:account+widget_write:account+library_read:account+library_write:account+workflow_read:account+workflow_write:account
 ```   

For all future service calls, Acrobat Sign sends the requests to this access
point.

### Upload a document

To upload a PDF document for signing, send a POST request to the <span style="color: red;">transientDocuments</span> endpoint. This is a multipart request consisting of
filename, MIME type, and the file stream. You will get back an ID as a
response that uniquely represents the document. Your application needs to
specify the recipients and other sending options required for sending the
document for signing. Your application can also specify a callback URL that
will be used by Acrobat Sign to notify when the signature process is complete.

    
```http    
    POST /api/rest/v6/transientDocuments HTTP/1.1
    Host: api.na1.echosign.com
    Authorization: Bearer MvyABjNotARealTokenHkYyi
    Content-Type: multipart/form-data
    Content-Disposition: form-data; name=";File"; filename="MyPDF.pdf"
    
    <PDF CONTENT>
```    

You will get the following JSON body containing the <span style="color: red;">transientDocumentId</span> that
will uniquely represent the uploaded document:

    
```json    
    {
        "transientDocumentId":"3AAABLblqZhBVYbgJbl--NotArEaLID_zjaBYK"
    }
```    

The document uploaded through this call is termed as a _transient document_
since it is available only for 7 days after the upload.

You can only upload one file at a time through this request.

[TRY IT
OUT](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/getMergeInfo)

### Send the document

Once you have uploaded the document, send the document to all the related
parties for signing. For this to happen, you need to create an _agreement._

For creating an agreement, send a POST request to the <span style="color: red;">/agreements</span> endpoint
with the following JSON body:

    
```json    
    POST /api/rest/v6/agreements HTTP/1.1
    Host: api.na1.echosign.com
    Authorization: Bearer 3AAABLblNOTREALTOKENLDaV
    Content-Type: application/json
    {
        "fileInfos": [{
            "transientDocumentId": "<copy-transient-from-the-upload-document-step>"
        }],
        "name": "MyTestAgreement",
        "participantSetsInfo": [{
            "memberInfos": [{
                "email": "signer@somecompany.com"
            }],
            "order": 1,
            "role": "SIGNER"
        }],
        "signatureType": "ESIGN",
        "state": "IN_PROCESS"
    }
```    

Replace the value for the following attributes with the correct values:



<table border="1" columnWidths="30,70" >
    <thead>
        <tr>
            <th>Attribute</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span style="color: red;">transientDocumentId</span></td>
            <td>The unique ID representing the uploaded document.</td>
        </tr>
        <tr>
            <td><span style="color: red;">name</span></td>
            <td>The name of the agreement.</td>
        </tr>
        <tr>
            <td><span style="color: red;">email</span></td>
            <td>Recipient’s email address.</td>
        </tr>
        <tr>
            <td><span style="color: red;">signatureType</span></td>
            <td>The type of signature you would like to request. <span style="color: red;">ESIGN</span> and <span style="color: red;">WRITTEN</span>.</td>
        </tr>
        <tr>
            <td><span style="color: red;">order</span></td>
            <td>Index indicating the position at which this signing group needs to sign. Signing group to sign at first place is assigned 1 as index.</td>
        </tr>
        <tr>
            <td><span style="color: red;">role</span></td>
            <td>Role of the participant set. The possible values are: <span style="color:red;">SIGNER</span>, <span style="color:red;">APPROVER</span>, <span style="color:red;">ACCEPTOR</span>, <span style="color:red;">CERTIFIED_RECIPIENT</span>, <span style="color:red;">FORM_FILLER</span>, <span style="color:red;">DELEGATE_TO_SIGNER</span>, <span style="color:red;">DELEGATE_TO_APPROVER</span>, <span style="color:red;">DELEGATE_TO_ACCEPTOR</span>, <span style="color:red;">DELEGATE_TO_CERTIFIED_RECIPIENT</span>, <span style="color:red;">DELEGATE_TO_FORM_FILLER</span>, or <span style="color:red;">SHARE</span>.
            </td>
        </tr>
        <tr>
            <td><span style="color: red;">state</span></td>
            <td>
            The state in which the agreement should land. The possible values are  
            <span style="color: red;"> AUTHORING</span>, <span style="color: red;">DRAFT</span>, or 
            <span style="color: red;"> IN_PROCESS</span>. You can use:<br />
            a) <span style="color: red;">DRAFT</span> to incrementally build the agreement before sending out,<br />
            b) <span style="color: red;">AUTHORING</span> to add or edit form fields in the agreement,<br />
            c) <span style="color: red;">IN_PROCESS</span> to immediately send the agreement.<br /><br />
            You can use the <span style="color: red;">PUT /agreements/{"{"}agreementId{"}"}/state</span> endpoint 
            to transition an agreement between the above-mentioned states. An allowed transition would follow 
            this sequence: <span style="color: red;">DRAFT → AUTHORING → IN_PROCESS → CANCELLED</span>.
            </td>
        </tr>
    </tbody>
</table>


  
You will get the following response containing the <span style="color: red;">id</span>:

```json    
    {
        "id": "<an-adobe-sign-generated-id>"
    }
```    

The returned <span style="color: red;">agreementId</span> must be used to refer to the agreement in all
subsequent API calls. This ID must be used to retrieve up-to-date status of
the agreement, either by polling or when Acrobat Sign notifies your
application of any status change.

[TRY IT OUT](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/)

## Resolve Request Signature integration error

You may get an error when trying to create and send agreements for signature
if your browser blocks third-party cookies. You can resolve this issue by
enabling cookieless Request Signature workflow for your integration as
follows:

  1. Create a test API Application to validate the changes before enabling the cookieless workflow in your Production environment.
  2. Conduct required testing and implement necessary adjustments on your side.
  3. Have your OAuth API application ID ready.
  4. Contact Adobe Customer Support to enable the cookieless workflow for your Production API Application ID.

<InlineAlert slots="text" />

To contact Adobe Customer Support, go to the [Adobe Admin
Console](https://adminconsole.adobe.com/) and log in using your admin
credentials. Next, select the **Support** tab and then select **Create Case**.

## Check the Document signing status

Acrobat Sign can return the current status of the agreement and a complete
history of events that have happened on that particular agreement. The
simplest mechanism is for your application to provide a webhook URL when
sending the document for signature. Acrobat Sign will then ping your webhook
with the appropriate event whenever the agreement status changes.

![_images/sign_devguide_2.png](_images/sign_devguide_2.png)

You can also get the current status of an agreement by sending a GET request to <span style="color: red;">/agreements/{agreementid}</span>:

    
```http    
    GET /api/rest/v6/agreements/3AAABLblqZNOTREALAGREEMENTID5_BjiH HTTP/1.1
    Host: api.na1.echosign.com
    Authorization: Bearer 3AAANOTREALTOKENMS-4ATH
```    

You need to provide your access token in the <span style="color: red;">Authorization</span> header and the <span style="color: red;">agreementId</span> in the API call itself. You will get the following JSON response:

    
```json    
    {
      "id": "<an-adobe-sign-generated-id>",
      "name": "MyTestAgreement",
      "participantSetsInfo": [{
        "memberInfos": [{
          "email": "signer@somecompany.com",
          "securityOption": {
            "authenticationMethod": "NONE"
          }
        }],
        "role": "SIGNER",
        "order": 1
      }],
      "senderEmail": "sender@somecompany.com",
      "createdDate": "2018-07-23T08:13:16Z",
      "signatureType": "ESIGN",
      "locale": "en_US",
      "status": "OUT_FOR_SIGNATURE",
      "documentVisibilityEnabled": false
    }
```    

By default, the webhook URL is called whenever an event involving a particular
transaction occurs in Acrobat Sign. The webhook event includes the ID of the
agreement whose status has changed, the current status of the agreement, and
information on the event that resulted in the callback. Your application logic
can evaluate the received status and decide whether to perform an action in
the calling system.

An alternate way to determine an agreement’s status sent for signature is
for your application to periodically poll Acrobat Sign regarding the
agreement’s status. The upside of polling is that it can be used in cases
where your calling application is behind your firewall and not accessible
from the Internet, thus enabling Acrobat Sign to complete a callback. The
downside of polling is that you have to create a scheduling mechanism within
your application to periodically query the status of all documents that were
not yet signed, check whether the document’s status has changed, and update
your system accordingly. If you choose to use polling, we recommend you have
different policies based on document “age”. In other words, you would reduce
the frequency of polling for documents not signed after a certain number of
days.

[TRY IT OUT](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/_0_1_2)

## Send Reminders

A signing reminder can be sent to all the signers if they have not signed the
agreement. When you send a reminder, the signers will get the same
notification email that was originally sent.

![_images/sign_devguide_3.png](_images/sign_devguide_3.png)

    
```json    
    POST /api/rest/v6/agreements/{agreementId}/reminders HTTP/1.1
    Host: api.na1.echosign.com
    Authorization: Bearer 3AAABLblNOTREALTOKENLDaV
    Content-Type: application/json
    {
      "recipientParticipantIds": [
        "<id of a participant>."
      ],
      "nextSentDate": "< The date when the reminder is scheduled to be sent next.>",
      "status": "< valid status of reminder (ACTIVE)>"
    }
```    

Note that you need to provide the <span style="color: red;">agreementId</span> in the request URL. You will
get the following response from the server:

    
```json    
    {
       id: <An identifier of the reminder resource created on the server>
    }
```    

[TRY IT OUT](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/createReminderOnParticipant)

## Download the Agreement

Once an agreement is signed, your application can retrieve the signed copy of
the PDF and store that within your application.

![_images/sign_devguide_4.png](_images/sign_devguide_4.png)

The signed agreement can also be retrieved by sending a GET request to <span style="color: red;">/agreements/&#123;agreementId&#125;/combinedDocument</span>. This will return a single combined PDF document for the documents associated with the agreement. To retrieve any supporting document, you can send a GET request to <span style="color: red;">/agreements/&#123;agreementId&#125;/documents</span>. This will return the IDs of all the main and supporting documents of an agreement.  

The returned document ID can be used in the <span style="color: red;">/agreements/&#123;agreementId&#125;/documents/&#123;documentId&#125;</span> call to retrieve the file stream of a document of the agreement. Depending on your application, you can also retrieve the form field data that your signer may have entered when signing the document by sending a GET request to <span style="color: red;">/agreements/&#123;agreementId&#125;/formData</span>. The data can be used to update your calling application with the information provided by the signer during signing.


Send the following GET request to retrieve the signed agreement:

    
```http    
    GET /api/rest/v6/agreements/3AAA5NOTREALIDiH/combinedDocument HTTP/1.1
    Host: api.na1.echosign.com:443
    Authorization: Bearer 3AAABLblqZhB9BF
```    

The response body will contain the content of the PDF file, which you can save locally through your application.

Note that the agreement can be downloaded even before it gets signed. Provide
the <span style="color: red;">versionId</span> attribute when invoking <span style="color: red;">GET /agreements/&#123;agreementId&#125;/combinedDocument/</span> to get the correct version of the agreement. For example, when the agreement is sent to two entities for signing, and when only one entity signs, the document can still be downloaded. If the <span style="color: red;">versionId</span> is not specified, the document in the latest state is returned.

[TRY IT OUT](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/_0_1_2_3_4_5_6)

## Create a Widget

To create a widget through the API, you must first call /transientDocuments, then send a POST request to upload the document. This is a multipart request consisting of file name,MIME type, and the file stream. The returned <span style="color: red;">transientDocumentId</span> is to be used to refer to the document in the widget creation call (<span style="color: red;">/widgets</span>, POST). The API endpoint, in addition to the widget key, returns an embed-code, which can be used for embedding the widget within your application, as well as a URL at which the widget gets hosted. The URL can be posted within your application for users to navigate to for signing a document.

    
```json    
    POST /api/rest/v6/widgets HTTP/1.1
    Host: api.na1.echosign.com
    Authorization: Bearer 3AAABLblqZNotRelaTOKEN
    Content-Type: application/json
    {
        "name": "MyTestWidget",
        "widgetParticipantSetInfo": {
            "memberInfos": [{
                "email": ""
            }],
        "role": "A valid role of the widget signer (SIGNER/APPROVER)"
        },
        "state": "A valid state in which the widget should land (ACTIVE/AUTHORING/DRAFT)"
    }
```    

You will get the following JSON response:

    
```json    
    {
        id: <The unique identifier of widget which can be used to retrieve the data entered by the signers.>
    }
```    

Now, the Widget URL can be circulated to the parents for signing. At any time,
to get information about the Widget, send a GET request to <span style="color: red;">/widgets/&#123;widgetId&#125;</span>.

    
```http    
    GET /api/rest/v6/widgets/3AAANotTheRealID6o HTTP/1.1
    Host: api.na1.echosign.com
```    

You will get a JSON response containing details about the widget, including
participants’ information and status.

You can also send a <span style="color: red;">GET /widgets/&#123;widgetId&#125;/formData</span> to retrieve the data entered (by the parents) in the document when it got signed.

Each time a widget is signed by a person, a separate instance of a document gets created. To get the agreements created using the widget, call <span style="color: red;">GET /widgets/&#123;widgetId&#125;/agreements</span> where <span style="color: red;">widgetId</span> is the key returned by the service while creating the widget. To retrieve the data filled by the users at the time of signing the widget, call <span style="color: red;">GET /widgets/&#123;widgetId&#125;/formData</span>. The service returns data in comma-separated value (CSV) file format. The first line includes the column header names, and each row represents a distinct instance of the widget.


[TRY IT
OUT](https://secure.na1.echosign.com/public/docs/restapi/v6#!/widgets/)

## Get the Signing URL

When the agreement is ready for signing, invoke <span style="color: red;">GET /agreements/&#123;agreementId&#125;/signingUrls</span>
 to get the signing URL:

    
```http    
    GET /api/rest/v6/agreements/3AANotRealIDQN8_gg/signingUrls HTTP/1.1
    Host: api.na1.echosign.com
    Authorization: Bearer 3AAABLblqZNotRelaTOKEN
```    

You will get the following JSON response containing the signing URL:

    
```json    
    {
      "signingUrlSetInfos": [
        {
          "signingUrls": [
            {
              "email": "FJ@MYCOMPANY.COM",
              "esignUrl": "https://secure.na1.echosign.com/public/apiesign?pid=CBFNotTheRealIDw3w*"
            }
          ]
        }
      ]
    }
```    

Getting the signing URL becomes useful for scenarios involving in-person
signing. Load the signing URL in a browser window on a mobile device and get
the agreement signed in person.

[TRY IT
OUT](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/_0_1_2_3_4)

## Add form fields to agreements

Acrobat Sign APIs allow you to add form fields to a PDF document using
anchored text within the PDF content. To create a new agreement, you define
FormFieldGenerator via the POST/agreements REST API and provide AgreementInfo
parameters, which include a FileInfo array.

Each FormFieldGenerator specifies the form field description, participant set
name, anchored text to search for, and where to place the form field.
FormFieldGenerator specifications apply to all documents within an agreement.
However, with the <span style="color: red;">AnchorTextInfo</span> JSON object’s new parameter
**fileInfoLabel** , you can specify which document each FormFieldGenerator
should target. For example, if an agreement contains multiple documents for
different signers but shares the same anchored text, you can assign a
FormFieldGenerator to a specific document.

**To add form fields to all the documents in an agreement** :

  1. Send a POST request to the transientDocuments endpoint for all the documents you want to include in the agreement.
  2. Define FormFieldGenerator via the POST/agreements REST API and provide AgreementInfo parameters.

**To add form fields to specific documents in an agreement** :

  1. Send a POST request to the transientDocuments endpoint for all the documents (Document A and Document B in the current example) you want to include in the agreement.
 
     You get each agreement’s unique ID as a response, which is required for
     associating a document to the FormFieldGenerator.

  2. Use the agreement IDs and the ‘fileInfoLabel’ parameter to precisely position form fields for various recipients. To do so, send a POST request to the /agreements endpoint with the following JSON body:

```json
{
"fileInfos": [
    {
    "label": "DocumentA",
    "transientDocumentId": "xxxxxxxxxx"},
    {
    "label": "DocumentB",
    "transientDocumentId": "yyyyyyyyyy"}
],
"name": "Sample agreement: Anchor tags",
"participantSetsInfo": [
    {
    "memberInfos": [
        {
        "email": "rosemary@email.com"
        }
    ],
    "order": 1,
    "role": "SIGNER",
    "name": "signer_one"
    },
    {
    "memberInfos": [
        {
        "email": "cjones@email.com"
        }
    ],
    "order": 2,
    "role": "SIGNER",
    "name": "signer_two"
    }
],
"signatureType": "ESIGN",
"state": "IN_PROCESS",
"formFieldGenerators": [
    {
    "formFieldNamePrefix": "signature_one",
    "anchorTextInfo": {
        "fileInfoLabel": "DocumentA",
        "anchorText": "2018 United States Holiday Calendar",
        "anchoredFormFieldLocation": {
        "offsetX": 0,
        "offsetY": -25,
        "height": 15,
        "width": 12
        }
    },
    "formFieldDescription": {
        "backgroundColor": "0xD9D1D1",
        "borderColor": "0xFF0000",
        "borderWidth": "0.5",
        "inputType": "SIGNATURE",
        "contentType": "SIGNATURE_BLOCK",
        "required": true
    },
    "participantSetName": "signer_one"
    },
    {
    "formFieldNamePrefix": "signature_two",
    "anchorTextInfo": {
        "fileInfoLabel": "DocumentA",
        "anchorText": "2018 United States Holiday Calendar",
        "anchoredFormFieldLocation": {
        "offsetX": 0,
        "offsetY": -70,
        "height": 10,
        "width": 8
        }
    },
    "formFieldDescription": {
        "backgroundColor": "0xD1D9D1",
        "borderColor": "0xFF0000",
        "borderWidth": "0.5",
        "inputType": "SIGNATURE",
        "contentType": "SIGNATURE_BLOCK",
        "required": true
    },
    "participantSetName": "signer_two"
    },
    {
    "formFieldNamePrefix": "signature_three",
    "anchorTextInfo": {
        "fileInfoLabel": "DocumentB",
        "anchorText": "United States 2020 Holiday Schedule",
        "anchoredFormFieldLocation": {
        "offsetX": 0,
        "offsetY": -40,
        "height": 10,
        "width": 8
        }
    },
    "formFieldDescription": {
        "backgroundColor": "0xD1D1D9",
        "borderColor": "0xFF0000",
        "borderWidth": "0.5",
        "inputType": "SIGNATURE",
        "contentType": "SIGNATURE_BLOCK",
        "required": true
    },
    "participantSetName": "signer_one"
    }
]
}
```

[TRY IT
OUT](https://secure.na1.echosignstage.com/public/docs/restapi/v6#!/agreements/createAgreement)

You’ll get the following response containing the <span style="color: red;">id</span>:

    
```json    
    {
        "id": "<an-adobe-sign-generated-id>"
    }
```    

Once the agreement id is generated, you can open the agreement to verify the
placement of the signature fields, as shown below. The signers get the ‘After’
view of the agreement.

![_images/anchor-text-sample.png](_images/anchor-text-sample.png)

## Generate templates from in-progress or signed agreements

Acrobat Sign now allows you to generate Agreement templates from in-progress
or completed agreements. To generate a template:

  1. Get the id of the agreement by sending a GET request to /agreements/{agreementid}:

> a. Go to [Get/agreements](https://secure.na1.echosignstage.com/public/docs/restapi/v6#!/agreements/createAgreement)  
> b. Select **OAuth Access-Token** to fetch the required access token.  
> c. Select **Try it out!**. The Response Body displays a list of agreements with different statuses.  
> d. For any in-progress or Signed agreement, copy the ‘id’ string.  


  2. To generate the new template ID from the above copied id:

> a. Go to [Post/libraryDocuments](https://secure.na1.echosignstage.com/public/docs/restapi/v6#!/libraryDocuments/createLibraryDocument)  
> b. Select **OAuth Access-Token** to fetch the required access token.  

 
![_images/template-3.png](_images/template-3.png)


 > c. In the LibraryDocumentInfo field, enter the following JSON:

   ```json
{
"fileInfos": [
    {
    "agreementId": "CBJCHBCAABAAKrGqtTd7ODjEKDb4czMjRTXppG3H1RGV"
    }
],
"name": "template testing",
"sharingMode": "USER",
"state": "ACTIVE",
"templateTypes": [
    "DOCUMENT"
]
}
```
   
 > d. Select **Try it out!**.

   You’ll get the following response containing the template id.

```json
Request URL: https://api.na1.echosignstage.com:443/api/rest/v6/libraryDocuments
Response Body:
{
"id": "CBJCHBCAABAAncSuj1tFB_PyS-FMa7dL5oRJXOsEiILU"
}
Response Headers:
{
"Cache-Control": "no-cache, no-store, must-revalidate",
"Content-Length": "53",
"Content-Type": "application/json;charset=UTF-8",
"Etag": "D0CA32AB5F61126FA86F33034A7BE6.B89F308E6D0E27BA4E894BA77DD2DD",
"Expires": "0",
"Pragma": "no-cache",
"X-Request-Id": "c3b05346-728b-4167-80c5-ec00e3e10359"
}
```

> e. Copy the document ID and save it for getting the template URL via the POST View endpoint for library documents.


3. Go to [Post/libraryDouments](https://secure.na1.echosignstage.com/public/docs/restapi/v6#!/libraryDocuments/createLibraryDocumentView)
4. Select **OAuth Access-Token** to fetch the required access token.
5. In the _LibraryDocumentID_ field, paste the document ID that you copied above.
6. In the _LibraryViewInfo_ field, enter the following json:

```text
 {
"name":ALL"
}
```

7. Select **Try it out!**

> ![_images/template-1.png](_images/template-1.png)

8. From the Response Body, copy the url for ‘Document’ and paste it in the browser. It opens the newly generated template, as shown below.

> ![_images/template-2.png](_images/template-2.png)



## Send private messages to the counter signers

You can send private messages to the counter signers or adhoc participants of
an agreement. To do so:

  1. Create a transient document using the following steps:

> a. Go to the [Post/transientDocuments](https://secure.na1.echosignstage.com/public/docs/restapi/v6#!/transientDocuments/createTransientDocument) endpoint and request OAuth access token for widget_write:self.  

![_images/private-message-1.png](_images/private-message-1.png)

> b. For the *File parameter*, select **Browse** and then select the agreement to which you want to add a message.  
> c. Select **Try it out!**.  
> d. From the response body, copy the <span style="color: red;">transientDocumentID</span>.  



  2. Create a Post widget using the following steps:

> a. Go to the [POST /widgets](https://secure.na1.echosignstage.com/public/docs/restapi/v6#!/widgets/createWidget) endpoint and in the _WidgetInfo_ field, enter the following JSON, where you replace the <span style="color: red;">transientDocumentID</span> with the string copied in the previous step.

```json
{
"additionalParticipantSetsInfo": [
    {
    "memberInfos": [
        {
        "securityOption": {
            "authenticationMethod": "NONE"
        },
        "email": "cjones.adobe@email.com"
        },
        {
        "securityOption": {
            "authenticationMethod": "NONE"
        },
        "email": "cjones@adobe.com"
        }
    ],
    "order": 1,
    "name": "adhoc group",
    "role": "SIGNER",
    "privateMessage": "Private Message for adhoc group"
    }
],
"fileInfos": [
    {
    "transientDocumentId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
],
"name": "Demo Webform",
"state": "ACTIVE",
"widgetParticipantSetInfo": {
    "memberInfos": [
    {
        "securityOption": {
        "authenticationMethod": "NONE"
        }
    }
    ],
    "role": "SIGNER"
}
}
```

> b. Select **Try it out!**  
> c. Once the widget is created, copy the ID from the Response body.  


  3. To get the agreement URL:


> a. Go to the [POST /widgets/{id}/views](https://secure.na1.echosignstage.com/public/docs/restapi/v6#!/widgets/getWidgetView) and request OAuth access token for widget_read:self.  
> b. In the *widgetID* field, paste the copied ID.  
> c. In the *WidgetViewInfo* field, enter the following JSON and select **Try it out!**:  

```json
{
"name": "DOCUMENT"
}
```

  4. From the Response Body, copy the document URL and paste it into a browser.
  5. Enter your login credentials when prompted.
  6. You can now edit the private message for the ad-hoc recipients, as shown below.

![_images/private-message-3.png](_images/private-message-3.png)

## Redirect signers to a specific URL

You can customize the agreement so that signers are automatically directed to
a particular URL after signing (ESIGNED event), after a custom time gap. While
creating an agreement, you must provide the redirect information (delay in
seconds, URL) as part of the payload. Alternatively, Account Admins can set
redirect information at the account and group levels using Acrobat Sign
Account Setup page.

<InlineAlert slots="text" />

The redirect information provided as part of the payload (API level) overrides
the values set at the account and group levels.

**Prerequisites**

Account Admins must enable the POST_SIGN_REDIRECT_ENABLED feature using the
following steps:

  1. Go to **Account Settings** > **Account Setup** and then take the following steps:
     1. Under _Post Agreement Completion URL Redirect_ select the checkboxes for **Recipients should be redirected after completing agreement** and **Recipients should be redirected after declining agreement**.  
     2. In the field boxes, enter the url where you want to redirect the signers.  
     3. Select **Save**.

Alternatively, go to **Group Setup** > **Post Agreement Completion URL**.

![_images/agreement-signed-redirect-1.png](_images/agreement-signed-redirect-1.png)

  2. Set **POST_SIGN_REDIRECT_ENABLED** = TRUE

**To redirect signers to a specific URL, follow these steps** :

1. Go to the [Post/transientDocuments](https://secure.na1.echosignstage.com/public/docs/restapi/v6#!/transientDocuments/createTransientDocument) endpoint and request OAuth access token for agreement_read and workflow_read.
2. Create an agreement using [V6 POST /agreements](https://previewusers.na1.echosignawspreview.com/public/docs/restapi/v6#!/agreements/createAgreement) ` and enter the JSON payload with the redirectOptions object, including the redirectUrl and redirectDelay parameters set according to your requirements. The minimal postSignOption payload object allows for just the redirect URL to be specified. The default delay is zero seconds, that is, signers will be immediately redirected upon signing the agreement. As participants sign the agreement, they are automatically redirected to the specified URL after the set delay.

JSON payload examples:

  * Minimal postSignOption payload object, where you specify only redirect URL. The default delay is zero seconds, where signers are immediately redirected upon signing the agreement.

> **“postSignOption”**: {  
>  
>
> “redirectUrl”:”<https://www.adobe.com>”
>
> }

  * Redirect with no delay after signing (immediate redirect):

> **“postSignOption”**: {  
>  
>
> “redirectUrl”:”<https://www.adobe.com>”, “redirectDelay”: 0
>
> }

  * Redirect with a delay of 2 seconds after signing:

> **“postSignOption”**: {  
>  
>
> “redirectUrl”:”<https://www.adobe.com>”, “redirectDelay”: 2
>
> }

  * Redirect with no delay after signing (null delay - immediate redirect):

> **“postSignOption”**: {  
>  
>
> “redirectUrl”:”<https://www.adobe.com>”, “redirectDelay”: null
>
> }

As participants sign the agreement, they are automatically redirected to the
specified URL after a specified delay.

JSON payload to create an agreement with Post Sign Redirect Options that
redirects each signer upon signing to “<https://www.adobe.com>” after a delay
of 5 seconds:

    
```json    
    {
    "ccs": [],
    "createdDate": "",
    "deviceInfo": {},
    "documentRetentionApplied": false,
    "documentVisibilityEnabled": null,
    "emailOption": {},
    "expirationTime": null,
    "externalId": {},
    "fileInfos": [
        {
        "transientDocumentId": "CBSCTBABDUAAABACAABAAElUgc9mrHBK8FGaOKeTJ7s3zB68eYQiqCXkrTJJssW2FnXixXX60RZNQDkl5tfsMhs3govR0O2S2WvHKHwQpJn0BoGLuyRSIsTQN6JfJMniGXhK_29STm8QO8V9aAWjs7lW-dHe67ioF_oZT7Qx6nda3nBLYO24946bvqn0zkRo-9YmBk5_4gWzbMNIficPeT74kUKYEtz7QL1ZRdS1erQITNR7DYQFFSZgUX5lKZbDPFqX375c9QSMQ09oWI6mOJlj70qenVdXMA7pnpvQUX0fb0cNgfhmlW1x1IS7rbW8*"
        }
    ],
    "firstReminderDelay": null,
    "formFieldLayerTemplates": [],
    "hasFormFieldData": false,
    "hasSignerIdentityReport": false,
    "isDocumentRetentionApplied": false,
    "locale": "en_US",
    "mergeFieldInfo": [],
    "message": "Please review and complete this agreement",
    "name": "Post Sign Redirection Test",
    "parentId": "",
    "participantSetsInfo": [
        {
        "memberInfos": [
            {
            "email": "signer1@outlook.com",
            "name": "First Signer",
            "securityOption": {
                "authenticationMethod": "NONE"
            },
            "notaryAuthentication": ""
            }
        ],
        "order": 1,
        "role": "SIGNER",
        "signingOrder": 1,
        "privateMessage": "",
        "label": null,
        "name": null,
        "visiblePages": []
        },
        {
        "memberInfos": [
            {
            "email": "signer2@outlook.com",
            "name": "Second Signer",
            "securityOption": {
                "authenticationMethod": "NONE"
            },
            "notaryAuthentication": ""
            }
        ],
        "order": 2,
        "role": "SIGNER",
        "signingOrder": 2,
        "privateMessage": "",
        "label": null,
        "name": null,
        "visiblePages": []
        },
        {
        "memberInfos": [
            {
            "email": "signer3@outlook.com",
            "name": "Third Signer",
            "securityOption": {
                "authenticationMethod": "NONE"
            },
            "notaryAuthentication": ""
            }
        ],
        "order": 3,
        "role": "SIGNER",
        "signingOrder": 3,
        "privateMessage": "",
        "label": null,
        "name": null,
        "visiblePages": []
        }
    ],
    "postSignOption": {
        "redirectDelay": 5,
        "redirectUrl": "https://www.adobe.com"
    },
    "reminderFrequency": "",
    "securityOption": {},
    "senderEmail": "",
    "signatureType": "ESIGN",
    "state": "IN_PROCESS",
    "status": "OUT_FOR_SIGNATURE",
    "type": "AGREEMENT",
    "vaultingInfo": {},
    "notaryInfo": {},
    "workflowId": null,
    "workflow": {
        "id": "default",
        "agreementNameInfo": {
        "required": true,
        "defaultValue": "",
        "editable": true,
        "visible": true
        },
        "authoringInfo": {
        "required": false,
        "defaultValue": "true",
        "editable": true,
        "visible": true
        },
        "created": "",
        "ccsListInfo": [
        {
            "defaultValues": [
            ""
            ],
            "required": false,
            "editable": true,
            "visible": true,
            "minListCount": 0,
            "maxListCount": 11,
            "label": "",
            "name": ""
        }
        ],
        "description": "",
        "displayName": "",
        "expirationInfo": {
        "required": false,
        "defaultValue": "0",
        "editable": true,
        "visible": false,
        "maxDays": 180
        },
        "fileInfos": [
        {
            "required": true,
            "label": "",
            "name": "",
            "workflowLibraryDocumentSelectorList": []
        }
        ],
        "localeInfo": {
        "required": false,
        "defaultValue": "es_ES",
        "editable": true,
        "visible": true,
        "availableLocales": [
            "en_US",
            "en_US_Echosign",
            "en_GB",
            "de_DE",
            "fr_FR",
            "nl_NL",
            "it_IT",
            "fi_FI",
            "da_DK",
            "sv_SE",
            "es_ES",
            "nb_NO",
            "nn_NO",
            "no_NO",
            "pt_BR",
            "pt_PT",
            "ru_RU",
            "is_IS",
            "ja_JP",
            "zh_CN",
            "zh_TW",
            "ko_KR",
            "pl_PL",
            "in_ID",
            "ms_MY",
            "vi_VN",
            "th_TH",
            "cs_CZ",
            "tr_TR",
            "ca_ES",
            "eu_ES",
            "hr_HR",
            "hu_HU",
            "ro_RO",
            "sk_SK",
            "sl_SI",
            "uk_UA",
            "zz_ZZ"
        ]
        },
        "mergeFieldsInfo": [],
        "messageInfo": {
        "required": false,
        "defaultValue": "",
        "editable": true,
        "visible": true
        },
        "modified": "",
        "name": "",
        "passwordInfo": {
        "required": false,
        "visible": true,
        "editable": true,
        "model": {}
        },
        "recipientsListInfo": [
        {
            "defaultValue": "",
            "minListCount": 1,
            "maxListCount": 25,
            "editable": true,
            "visible": true,
            "allowfax": false,
            "allowSender": true,
            "authenticationMethod": "NONE",
            "role": "SIGNER",
            "label": "",
            "name": ""
        }
        ],
        "scope": "",
        "status": "",
        "scopeId": ""
    },
    "authoringRequested": true,
    "signatureFlow": "HYBRID"
    }
```    

Once a signer signs the agreement, they are redirected to the set URL after a specified delay. 
The redirect Url reflects the status of the agreement, as shown below.

![_images/agreement-signed-redirect-2.png](_images/agreement-signed-redirect-2.png)

## Add Agreement Redirect Options

You can redirect signers to a specific URL with a custom delay when they 
decline an agreement. (DECLINED event) using the new payload object called
redirectOptions. While creating an agreement, you must provide the redirect
information (delay in seconds, URL) as part of the payload. Alternatively,
Account Admins can set redirect information at the account and group levels
using Acrobat Sign Account Setup page. Unlike Post Sign Options, Agreement
Redirect Options allows you to also specify the action which is an alias for
the agreement event upon which the signers will get redirected to the
specified URL with a given delay. Currently, Acrobat Sign supports only
DECLINED agreement events.

<InlineAlert slots="text" />

The redirect information provided as part of the payload (API level) overrides
the values set at the account and group levels.

**Prerequisite**

Account Admins must enable the POST_SIGN_REDIRECT_ENABLED feature using the
following steps:

  1. Go to **Account Settings** > **Account Setup** and then take the following steps:
     1. Under _Post Agreement Completion URL Redirect_ select the checkboxes for **Recipients should be redirected after completing agreement** and **Recipients should be redirected after declining agreement**.  
     2. In the field boxes, enter the url where you want to redirect the signers.  
     3. Select **Save**.

Alternatively, go to **Group Setup** > **Post Agreement Completion URL**.

**To add agreement redirect options** :

  1. Go to the [Post/transientDocuments](https://secure.na1.echosignstage.com/public/docs/restapi/v6#!/transientDocuments/createTransientDocument) endpoint and request OAuth access token.

  2. Create an agreement using [V6 POST /agreements](https://previewusers.na1.echosignawspreview.com/public/docs/restapi/v6#!/agreements/createAgreement)  and enter the JSON payload with the redirectOptions` object, including the action, url, and delay parameters set according to your requirements.

The minimal redirectOptions payload object allows for just the action and the
redirect URL to be specified. The default delay is zero seconds, where the
signer is immediately redirected upon declining the agreement.

Here are examples of JSON payloads for different redirect scenarios:

  * Redirect upon declining with no delay (immediate redirect):

> **“redirectOptions”: {**
>  
>
> “action”:”DECLINED”, “url”:”<https://www.adobe.com>”, “delay”: 0
>
> }

  * Redirect upon declining with no delay (null delay - immediate redirect):

> **“redirectOptions”: {**
>  
>
> “action”:”DECLINED”, “url”:”<https://www.adobe.com>”, “delay”: null
>
> }

  * Redirect upon declining with no delay (default delay is zero seconds - immediate redirect):

> **“redirectOptions”: {**
>  
>
> “action”:”DECLINED”, “url”:”<https://www.adobe.com>”
>
> }

  * Redirect upon declining with a delay of 1 second:

> **“redirectOptions”: {**
>  
>
> “action”: “DECLINED”, “url”: “<https://www.adobe.com>”, “delay”: 1
>
> }

  * Redirect upon declining with a delay of exactly 5 seconds:

> **“redirectOptions”: {**
>  
>
> “action”: “DECLINED”, “url”:”<https://www.adobe.com>”, “delay”: 5
>
> }

JSON payload to create an agreement with Redirect Options that redirects a
signer that declines the agreement to “<https://www.adobe.com>” after a delay
of 5 seconds:

    
```json    
    {
    "ccs": [],
    "createdDate": "",
    "deviceInfo": {},
    "documentRetentionApplied": false,
    "documentVisibilityEnabled": null,
    "emailOption": {},
    "expirationTime": null,
    "externalId": {},
    "fileInfos": [
        {
        "transientDocumentId": "CBSCTBABDUAAABACAABAAElUgc9mrHBK8FGaOKeTJ7s3zB68eYQiqCXkrTJJssW2FnXixXX60RZNQDkl5tfsMhs3govR0O2S2WvHKHwQpJn0BoGLuyRSIsTQN6JfJMniGXhK_29STm8QO8V9aAWjs7lW-dHe67ioF_oZT7Qx6nda3nBLYO24946bvqn0zkRo-9YmBk5_4gWzbMNIficPeT74kUKYEtz7QL1ZRdS1erQITNR7DYQFFSZgUX5lKZbDPFqX375c9QSMQ09oWI6mOJlj70qenVdXMA7pnpvQUX0fb0cNgfhmlW1x1IS7rbW8*"
        }
    ],
    "firstReminderDelay": null,
    "formFieldLayerTemplates": [],
    "hasFormFieldData": false,
    "hasSignerIdentityReport": false,
    "isDocumentRetentionApplied": false,
    "locale": "en_US",
    "mergeFieldInfo": [],
    "message": "Please review and complete this agreement",
    "name": "Agreement Redirect Options Test",
    "parentId": "",
    "participantSetsInfo": [
        {
        "memberInfos": [
            {
            "email": "signer1@outlook.com",
            "name": "First Signer",
            "securityOption": {
                "authenticationMethod": "NONE"
            },
            "notaryAuthentication": ""
            }
        ],
        "order": 1,
        "role": "SIGNER",
        "signingOrder": 1,
        "privateMessage": "",
        "label": null,
        "name": null,
        "visiblePages": []
        },
        {
        "memberInfos": [
            {
            "email": "signer2@outlook.com",
            "name": "Second Signer",
            "securityOption": {
                "authenticationMethod": "NONE"
            },
            "notaryAuthentication": ""
            }
        ],
        "order": 2,
        "role": "SIGNER",
        "signingOrder": 2,
        "privateMessage": "",
        "label": null,
        "name": null,
        "visiblePages": []
        },
        {
        "memberInfos": [
            {
            "email": "signer3@outlook.com",
            "name": "Third Signer",
            "securityOption": {
                "authenticationMethod": "NONE"
            },
            "notaryAuthentication": ""
            }
        ],
        "order": 3,
        "role": "SIGNER",
        "signingOrder": 3,
        "privateMessage": "",
        "label": null,
        "name": null,
        "visiblePages": []
        }
    ],
    "redirectOptions": [
        {
        "action": "DECLINED",
        "delay": 5,
        "url": "https://www.adobe.com"
        }
    ],
    "reminderFrequency": "",
    "securityOption": {},
    "senderEmail": "",
    "signatureType": "ESIGN",
    "state": "IN_PROCESS",
    "status": "OUT_FOR_SIGNATURE",
    "type": "AGREEMENT",
    "vaultingInfo": {},
    "notaryInfo": {},
    "workflowId": null,
    "workflow": {
        "id": "default",
        "agreementNameInfo": {
        "required": true,
        "defaultValue": "",
        "editable": true,
        "visible": true
        },
        "authoringInfo": {
        "required": false,
        "defaultValue": "true",
        "editable": true,
        "visible": true
        },
        "created": "",
        "ccsListInfo": [
        {
            "defaultValues": [
            ""
            ],
            "required": false,
            "editable": true,
            "visible": true,
            "minListCount": 0,
            "maxListCount": 11,
            "label": "",
            "name": ""
        }
        ],
        "description": "",
        "displayName": "",
        "expirationInfo": {
        "required": false,
        "defaultValue": "0",
        "editable": true,
        "visible": false,
        "maxDays": 180
        },
        "fileInfos": [
        {
            "required": true,
            "label": "",
            "name": "",
            "workflowLibraryDocumentSelectorList": []
        }
        ],
        "localeInfo": {
        "required": false,
        "defaultValue": "es_ES",
        "editable": true,
        "visible": true,
        "availableLocales": [
            "en_US",
            "en_US_Echosign",
            "en_GB",
            "de_DE",
            "fr_FR",
            "nl_NL",
            "it_IT",
            "fi_FI",
            "da_DK",
            "sv_SE",
            "es_ES",
            "nb_NO",
            "nn_NO",
            "no_NO",
            "pt_BR",
            "pt_PT",
            "ru_RU",
            "is_IS",
            "ja_JP",
            "zh_CN",
            "zh_TW",
            "ko_KR",
            "pl_PL",
            "in_ID",
            "ms_MY",
            "vi_VN",
            "th_TH",
            "cs_CZ",
            "tr_TR",
            "ca_ES",
            "eu_ES",
            "hr_HR",
            "hu_HU",
            "ro_RO",
            "sk_SK",
            "sl_SI",
            "uk_UA",
            "zz_ZZ"
        ]
        },
        "mergeFieldsInfo": [],
        "messageInfo": {
        "required": false,
        "defaultValue": "",
        "editable": true,
        "visible": true
        },
        "modified": "",
        "name": "",
        "passwordInfo": {
        "required": false,
        "visible": true,
        "editable": true,
        "model": {}
        },
        "recipientsListInfo": [
        {
            "defaultValue": "",
            "minListCount": 1,
            "maxListCount": 25,
            "editable": true,
            "visible": true,
            "allowfax": false,
            "allowSender": true,
            "authenticationMethod": "NONE",
            "role": "SIGNER",
            "label": "",
            "name": ""
        }
        ],
        "scope": "",
        "status": "",
        "scopeId": ""
    },
    "authoringRequested": true,
    "signatureFlow": "HYBRID"
    }
 ```   

If a signer declines an agreement, they are redirected to the set URL after a
specified delay. The redirect Url reflects the status of the agreement, as
shown below.

![_images/agreement-signed-redirect-3.png](_images/agreement-signed-redirect-3.png)

## API Throttling

To prevent your API from being overwhelmed by too many requests, Adobe
throttles requests to your API.

When a request is throttled, the client will receive an **HTTP 429 “Too Many
Requests”** response with an error message appropriate to the request. When a
request gets back an HTTP 429 response, it means the user has consumed over
the limit of allowed resources within a certain time frame. It could be a
violation of the per-minute, -hour, or -day limit. The user will be allowed to
make more requests in the next minute, hour, or day (depending on which
threshold was crossed).

Each request made to Acrobat Sign is evaluated based on the system resources
it will consume. Different parameters passed to the same endpoint might
contribute a different amount of resource consumption. Your service package
(small business, business, enterprise) directly influences your transaction
rate. Higher tiers of service have higher throttle thresholds.

### REST API Response

    
```json    
    {
    "code":"THROTTLING_TOO_MANY_REQUESTS",
    "message":"<error_message_with_wait_time> (apiActionId=<api_action_id>)"
    "retryAfter": <wait_time_in_seconds>
    }
```    

Also, a _Retry-After_ HTTP header will be added into the response ([see
RFC-7231 Section 7.1.3](https://tools.ietf.org/html/rfc7231#section-7.1.3))

    
    
    Retry-After: <wait_time_in_seconds>
    

is the minimum time in seconds the client must wait until it can make the next
request. When the _retryAfter_ timer expires, the client’s resource count is
reset to 0 for the over-limit threshold. Therefore, the client can send the
request again and it should go through without being blocked.

### Steps to take when throttled

It is recommended that developers design workflows that can handle the HTTP
429 exceptions gracefully and use the retry-time from either the response body
or from the “Retry-After” header to recover from such errors.

* * *


