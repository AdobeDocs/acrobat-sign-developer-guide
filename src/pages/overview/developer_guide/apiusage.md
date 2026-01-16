# API Usage

Last update: Oct 27, 2025.

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

To upload a PDF document for signing, send a POST request to the `transientDocuments` endpoint. This is a multipart request consisting of
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

You will get the following JSON body containing the `transientDocumentId` that
will uniquely represent the uploaded document:

```json
    {
        "transientDocumentId":"3AAABLblqZhBVYbgJbl--NotArEaLID_zjaBYK"
    }
```

The document uploaded through this call is termed as a _transient document_
since it is available only for 7 days after the upload.

You can only upload one file at a time through this request.

[TRY IT OUT](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/getMergeInfo)

### Send the document

Once you have uploaded the document, send the document to all the related
parties for signing. For this to happen, you need to create an _agreement._

For creating an agreement, send a POST request to the `/agreements` endpoint
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

| Attribute | Description |
|---|---|
| `transientDocumentId` | The unique ID representing the uploaded document. |
| `name` | The name of the agreement. |
| `email` | Recipient’s email address. |
| `signatureType` | The type of signature you would like to request. `ESIGN` and `WRITTEN`. |
| `order` | Index indicating the position at which this signing group needs to sign. Signing group to sign at first place is assigned 1 as index. |
| `role` | Role of the participant set. The possible values are: `SIGNER`, `APPROVER`, `ACCEPTOR`, `CERTIFIED_RECIPIENT`, `FORM_FILLER`, `DELEGATE_TO_SIGNER`, `DELEGATE_TO_APPROVER`, `DELEGATE_TO_ACCEPTOR`, `DELEGATE_TO_CERTIFIED_RECIPIENT`, `DELEGATE_TO_FORM_FILLER`, or `SHARE`. |
| `state` | The state in which the agreement should land. The possible values are `AUTHORING`, `DRAFT`, or `IN_PROCESS`. You can use: a) `DRAFT` to incrementally build the agreement before sending out, b) `AUTHORING` to add or edit form fields in the agreement, c) IN_PROCESS to immediately send the agreement. You can use the `PUT /agreements/{"{"}agreementId{"}"}/state` endpoint to transition an agreement between the above-mentioned states. An allowed transition would follow this sequence: `DRAFT` → `AUTHORING` → `IN_PROCESS` → `CANCELLED`. |


You will get the following response containing the `id`:

```json
    {
        "id": "<an-adobe-sign-generated-id>"
    }
```

The returned `agreementId` must be used to refer to the agreement in all
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

You can also get the current status of an agreement by sending a GET request to `/agreements/{agreementid}`:

```http
    GET /api/rest/v6/agreements/3AAABLblqZNOTREALAGREEMENTID5_BjiH HTTP/1.1
    Host: api.na1.echosign.com
    Authorization: Bearer 3AAANOTREALTOKENMS-4ATH
```

You need to provide your access token in the `Authorization` header and the `agreementId` in the API call itself. You will get the following JSON response:

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

Note that you need to provide the `agreementId` in the request URL. You will
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

The signed agreement can also be retrieved by sending a GET request to `/agreements/{agreementId}/combinedDocument`. This will return a single combined PDF document for the documents associated with the agreement. To retrieve any supporting document, you can send a GET request to `/agreements/{agreementId}/documents`. This will return the IDs of all the main and supporting documents of an agreement.

The returned document ID can be used in the `/agreements/{agreementId}/documents/{documentId}` call to retrieve the file stream of a document of the agreement. Depending on your application, you can also retrieve the form field data that your signer may have entered when signing the document by sending a GET request to `/agreements/{agreementId}/formData`. The data can be used to update your calling application with the information provided by the signer during signing.

Send the following GET request to retrieve the signed agreement:

```http
    GET /api/rest/v6/agreements/3AAA5NOTREALIDiH/combinedDocument HTTP/1.1
    Host: api.na1.echosign.com:443
    Authorization: Bearer 3AAABLblqZhB9BF
```

The response body will contain the content of the PDF file, which you can save locally through your application.

Note that the agreement can be downloaded even before it gets signed. Provide
the `versionId` attribute when invoking `GET /agreements/{agreementId}/combinedDocument/` to get the correct version of the agreement. For example, when the agreement is sent to two entities for signing, and when only one entity signs, the document can still be downloaded. If the `versionId` is not specified, the document in the latest state is returned.

[TRY IT OUT](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/_0_1_2_3_4_5_6)

## Create a Widget

To create a widget through the API, you must first call /transientDocuments, then send a POST request to upload the document. This is a multipart request consisting of file name,MIME type, and the file stream. The returned `transientDocumentId` is to be used to refer to the document in the widget creation call (`/widgets`, POST). The API endpoint, in addition to the widget key, returns an embed-code, which can be used for embedding the widget within your application, as well as a URL at which the widget gets hosted. The URL can be posted within your application for users to navigate to for signing a document.

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
to get information about the Widget, send a GET request to `/widgets/{widgetId}`.

```http
    GET /api/rest/v6/widgets/3AAANotTheRealID6o HTTP/1.1
    Host: api.na1.echosign.com
```

You will get a JSON response containing details about the widget, including
participants’ information and status.

You can also send a `GET /widgets/{widgetId}/formData` to retrieve the data entered (by the parents) in the document when it got signed.

Each time a widget is signed by a person, a separate instance of a document gets created. To get the agreements created using the widget, call `GET /widgets/{widgetId}/agreements` where `widgetId` is the key returned by the service while creating the widget. To retrieve the data filled by the users at the time of signing the widget, call `GET /widgets/{widgetId}/formData`. The service returns data in comma-separated value (CSV) file format. The first line includes the column header names, and each row represents a distinct instance of the widget.

[TRY IT
OUT](https://secure.na1.echosign.com/public/docs/restapi/v6#!/widgets/)

## Get the Signing URL

When the agreement is ready for signing, invoke `GET /agreements/{agreementId}/signingUrls`
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

[TRY IT OUT](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/_0_1_2_3_4)

## Add form fields to agreements

Acrobat Sign APIs allow you to add form fields to a PDF document using
anchored text within the PDF content. To create a new agreement, you define
FormFieldGenerator via the POST/agreements REST API and provide AgreementInfo
parameters, which include a FileInfo array.

Each FormFieldGenerator specifies the form field description, participant set
name, anchored text to search for, and where to place the form field.
FormFieldGenerator specifications apply to all documents within an agreement.
However, with the `AnchorTextInfo` JSON object’s new parameter
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

[TRY IT OUT](https://secure.na1.echosignstage.com/public/docs/restapi/v6#!/agreements/createAgreement)

You’ll get the following response containing the `id`:

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

1. Get the id of the agreement by sending a GET request to /agreements/\{agreementid\}:

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

> b. For the _File parameter_, select **Browse** and then select the agreement to which you want to add a message.  
> c. Select **Try it out!**.  
> d. From the response body, copy the `transientDocumentID`.

2. Create a Post widget using the following steps:

> a. Go to the [POST /widgets](https://secure.na1.echosignstage.com/public/docs/restapi/v6#!/widgets/createWidget) endpoint and in the _WidgetInfo_ field, enter the following JSON, where you replace the `transientDocumentID` with the string copied in the previous step.

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

> a. Go to the [POST /widgets/\{id\}/views](https://secure.na1.echosignstage.com/public/docs/restapi/v6#!/widgets/getWidgetView) and request OAuth access token for widget_read:self.  
> b. In the _widgetID_ field, paste the copied ID.  
> c. In the _WidgetViewInfo_ field, enter the following JSON and select **Try it out!**:

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

- Minimal postSignOption payload object, where you specify only redirect URL. The default delay is zero seconds, where signers are immediately redirected upon signing the agreement.

```json
{
  "postSignOption": {
    "redirectUrl": "[https://www.adobe.com]"
  }
}

```

- Redirect with no delay after signing (immediate redirect):


```json
{
  "postSignOption": {
    "redirectUrl": "[https://www.adobe.com]",
    "redirectDelay": 0
  }
}

```

- Redirect with a delay of 2 seconds after signing:

```json
{
  "postSignOption": {
    "redirectUrl": "[https://www.adobe.com]",
    "redirectDelay": 2
  }
}

```

- Redirect with no delay after signing (null delay - immediate redirect):


```json
{
  "postSignOption": {
    "redirectUrl": "[https://www.adobe.com]",
    "redirectDelay": null
  }
}

```

As participants sign the agreement, they are automatically redirected to the
specified URL after a specified delay.

JSON payload to create an agreement with Post Sign Redirect Options that
redirects each signer upon signing to “[https://www.adobe.com](https://www.adobe.com)” after a delay
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
information (delay in seconds, URL) as part of the payload. Alternatively ,
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

- Redirect upon declining with no delay (immediate redirect):

```json
{
  "redirectOptions": {
    "action": "DECLINED",
    "url": "[https://www.adobe.com]",
    "delay": 0
  }
}

```

- Redirect upon declining with no delay (null delay - immediate redirect):

```json
{
  "redirectOptions": {
    "action": "DECLINED",
    "url": "[https://www.adobe.com]",
    "delay": null
  }
}

```

- Redirect upon declining with no delay (default delay is zero seconds - immediate redirect):

```json
{
  "redirectOptions": {
    "action": "DECLINED",
    "url": "[https://www.adobe.com]"
  }
}

```

- Redirect upon declining with a delay of 1 second:

```json
{
  "redirectOptions": {
    "action": "DECLINED",
    "url": "[https://www.adobe.com]",
    "delay": 1
  }
}

```

- Redirect upon declining with a delay of exactly 5 seconds:

```json
{
  "redirectOptions": {
    "action": "DECLINED",
    "url": "[https://www.adobe.com]",
    "delay": 5
  }
}

```

JSON payload to create an agreement with Redirect Options that redirects a
signer that declines the agreement to “[https://www.adobe.com](https://www.adobe.com)” after a delay
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

All requests made to Acrobat Sign by a client are monitored to protect system resources and preserve Adobe’s ability to serve as many users as possible. Acrobat Sign APIs enforce limits on the number of API requests per endpoint at the minute, hour, and day levels to ensure optimal performance. These limits are applied per user, and if user information is unavailable, the system falls back to the request’s originating IP address (if available).

Each API request is evaluated based on its resource consumption, which varies depending on the parameters used. Your service plan determines your transaction rate, with higher-tier plans allowing more requests before reaching the limit.

If a request exceeds the allowed limit, it’s rejected with an HTTP 429 “Too Many Requests” response with an error message. The error message will specify the issue, and the “Retry-After” header in the response indicates when you can attempt the subsequent request.

There are four discrete throttling mechanisms, each throttling specific functions in the service:
- Rest APIs
- Agreement Document Processing
- Webform First Signer/Participant
- GET Endpoints



### REST API

```json
    {
  "code":"THROTTLING_TOO_MANY_REQUESTS",
  "message":"<error_message_with_wait_time> (apiActionId=<api_action_id>)",
  "retryAfter": <wait_time_in_seconds>
}
```

The Retry-After HTTP header, as defined in [RFC-7231 Section 7.1.3](https://datatracker.ietf.org/doc/html/rfc7231#section-7.1.3), specifies the minimum time, given in seconds, the client must wait before retrying or making another request.

 ```text
    Retry-After: <wait_time_in_seconds>
 ```
Once the Retry-After timer expires, the client’s resource count resets to zero for the exceeded threshold, allowing the next request to proceed without being blocked.


#### System Load Throttling

Beginning with the May 2025 release, Acrobat Sign includess the following enhanced throttling rules:
- During periods of high overall system load, API requests may be throttled across the entire platform to maintain performance.
- If a specific customer is identified as contributing to system slowdowns, Acrobat Sign may throttle API requests from that customer individually.

When an API request is throttled, it will be rejected with a 429 HTTP status code, along with the following:



##### Response Body
```json
    {
  "code":"THROTTLING_HIGH_SYSTEM_LOAD",
  "message":"Acrobat Sign system is experiencing high overall load, due to which subset of the requests are being throttled. Please try again in <wait_time_in_seconds> seconds.",
  "retryAfter": <wait_time_in_seconds>
}
```
##### Response Header
```text
    {
  "X-Throttling-Reason":"high-system-load",
  "retryAfter": <wait_time_in_seconds>
}
```

Upon receiving the above response, you can use the Retry-After header or the retryAfter in the response body to determine when to attempt the request again.

##### Retry Penalty

For accounts created after the May 20, 2025, a penalty is applied if the account does not adhere to the specified retry time interval. If the same request is attempted again within this interval, the request is throttled again, and the retry time interval is reset.





#### Handling Rate Limiting (HTTP 429)

To prevent disruptions, design your workflow to handle HTTP 429 (Too Many Requests) errors smoothly. Use the Retry-After header or the retry time in the response body to determine when to attempt the request again. Implement exponential backoff to avoid immediate retries and ensure efficient recovery.
<InlineAlert slots="text" />

- Avoid hardcoding retry intervals - Use the server-provided delay for the best retry results and to avoid the retry penalty.
- Avoid Polling Requests - Excessive polling can degrade Acrobat Sign API performance. If detected, Acrobat Sign may temporarily disable API access for the affected account. Instead of polling, use webhooks to receive real-time updates on agreement status changes.
- Increase Document Processing Limits - Contact your Customer Success Manager (CSM) or Support with estimated usage volumes to request higher processing limits. Include expected values for total participants, file size, and number of pages.



### Agreement Document Processing

In Acrobat Sign, all documents—whether sent through the web UI or API—are processed asynchronously when creating the following object types:

- Agreement
- Webform
- MegaSign
- Library Template
- Archive

To maintain performance, Acrobat Sign enforces request limits based on:

- Total number of participants
- Total file size (including all uploaded files)
- Total number of pages processed
These limits apply at the minute, hour, and day levels on a per-user basis. Requests made through both the web UI and API count toward these limits.

For the Create requests made through REST API, the request is rejected with 429 HTTP status code when the limits are breached and following error messages are returned.

##### Agreement
```json
    {
  "code":"THROTTLING_TOO_MANY_REQUESTS",
  "message":"You have reached the limit on the number of agreements you can send at this time. Please try again in <wait_time> seconds/minutes/hours.",
  "retryAfter": <wait_time_in_seconds>
}
```


##### Webform
```json
    {
  "code":"THROTTLING_TOO_MANY_REQUESTS",
  "message":"You have reached the limit on the number of web forms you can create at this time. Please try again in <wait_time> seconds/minutes/hours."
  "retryAfter": <wait_time_in_seconds>

}
```


##### Library Template
```json
    {
  "code":"THROTTLING_TOO_MANY_REQUESTS",
  "message":"You have reached the limit on the number of templates you can create at this time. Please try again in <wait_time> seconds/minutes/hours."
  "retryAfter": <wait_time_in_seconds>
}
```


##### Archive
```json
    {
  "code":"THROTTLING_TOO_MANY_REQUESTS",
  "message":"You have reached the limit on the number of documents you can archive at this time. Please try again in <wait_time> seconds/minutes/hours."
  "retryAfter": <wait_time_in_seconds>
}
```

MegaSign (Send in Bulk)

When using MegaSign endpoints (Send in Bulk in the UI), a single API call or UI action generates multiple agreements and sends multiple signature requests. Throttling limits are enforced on the number of requests per the hour and day levels. Due to the Send in Bulk batch-processing behavior, Acrobat Sign does not enforce per-minute limits. However, per-hour and per-day limits still apply.

Before processing a MegaSign request, Acrobat Sign pre-evaluates the workload:

- If the request does not exceed throttling limits, the MegaSign and all related child agreements will be processed.
- If the request would exceed the limits, it is declined upfront before creating any child agreements.

For MegaSign Create request from the REST API, the following error response with HTTP status code 429 will be returned when the limits are breached.

```json
    {
  "code":"THROTTLING_TOO_MANY_REQUESTS",
  "message":"You have reached the limit on the number of agreements you can send at this time. Please try again in <wait_time> seconds/minutes/hours.",
  "retryAfter": <wait_time_in_seconds>
}
```

Webform Signing

When a Webform is signed, Acrobat Sign creates a new agreement, which undergoes asynchronous document processing. Standard throttling limits apply to the Webform creator in your account, not the signer.

If the agreement processing exceeds throttling limits, the Webform signer will see the following error message:

```text

This web form is very popular right now and can't be processed due to high demand. Please try again in {x} hours, {xx} minutes, and {xxx} seconds.
Contact the owner of this web form for further information.

```

### Webform First Signer/Participant

Acrobat Sign allows webform creators to enable email verification for the first signer/participant. When enabled, submission limits are enforced based on the first signer’s activity. Throttling limits are enforced on the number of requests per minute, hour, and day levels.

- Limits are evaluated when the first signer/participant submits the webform or adds additional participants.
- The submission count increases only after email verification is completed.
- If the signer exceeds the limit, they will see the following error message:

```text

You've reached the limit on the number of times that you may access this web form. Please try again after {x} hours, {xx} minutes, and {xxx} seconds.
Contact the owner of this web form for further information.

```
If email verification is not enabled, no submission limits apply to the first signer. Contact your CSM or Support if you find that your throttling thresholds must be increased.
[More about Acrobat Sign webforms can be found here.](../developer_guide/apiusage.md#create-a-widget)

### GET Endpoints

High-frequency polling can put unnecessary loads on systems which can lead to suboptimal response times for all users. To bolster reliable API usage, Acrobat Sign enforces a polling threshold rule that limits duplicate GET API requests from the same effective user.

#### API polling threshold

The polling policy applies to all GET API endpoints. A Minimum Object Polling Interval (MOPI) will regulate how often clients can send the identical API request to the Acrobat Sign service. Your service plan determines your MOPI and the threshold for identical requests within the MOPI. Higher-tier plans allow shorter intervals and higher thresholds:

**Minimum Object Polling Interval (MOPI) - The default MOPI varies depending on the tier of service and application types:**

* Acrobat Sign partner applications: The MOPI for a partner app is determined by the tier of the user’s account.
  * **GLOBAL/ENTERPRISE tier**: 3 calls per one minute interval
  * **All other tiers**: 1 unique call per ten minute interval
* Customer applications under Global/Enterprise accounts: Three identical calls per one-minute interval.
* Customer applications under Developer accounts: One unique call per 10-minute interval.

Identical GET requests mean the same path, parameters, and headers requested by the same effective user more than once within the MOPI. If an identical request over the threshold is made within the MOPI by the same user, the system will return:

* 304 Not Modified status code (for HTTP conditional requests using an ETag).
* 429 Too Many Requests (status code with a retry-after header for other requests).

Recommended Implementation

* **Use ETags and cache repeated request responses** - If the API supports the 304 status code, use the ETag returned from the first request. Include ETag values in the If-None-Match header for the subsequent requests. When a 304 response is received, use the cached data instead of making a new API call.
* **Increase call limits within MOPI** - You cannot send more identical API calls than the threshold within the MOPI. Contact your Customer Success Manager (CSM) or Support with your calling pattern to request higher limits.

<HorizontalLine />
© Copyright 2022, Adobe Inc..  Last update: Dec 18, 2025.
![](../_static/adobelogo.png)
