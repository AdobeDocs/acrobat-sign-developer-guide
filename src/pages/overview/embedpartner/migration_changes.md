# Changes in the Acrobat Sign product and APIs


Last update: Oct 30, 2025.

<InlineAlert slots="header, text" />
Tip

Your feedback is valuable and is vital in improving our product and documentation. Send suggestions to acrobatsignembed@adobe.com.

## Changes in the Acrobat Sign product

| Workflow / Features                                       | Legacy 1.0 Model                                                           | New 2.0 Model                               | Comments                                                                                                                                                                                                                                                                                                                               |
|-----------------------------------------------------------|----------------------------------------------------------------------------|---------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| End users log in to Acrobat Sign                          | Allowed                                                                    | Restricted                                  | Users won’t be able to login to Acrobat Sign on new OEM 2.0 model. However partners can use the API to embed Acrobat Sign pages.                                                                                                                                                                                                       |
| User Email Domains                                        | Any domains allowed                                                        | Only partner domains allowed                | Only users with claimed partner are allowed to be provisioned on new model                                                                                                                                                                                                                                                             |
| Integration key                                           | Allowed                                                                    | Partially Restricted                        | Provisioning API usage can be only done via OEM tokens.                                                                                                                                                                                                                                                                                |
| SOAP API usage                                            | Allowed                                                                    | Restricted                                  | SOAP API usage is disallowed on the 2.0 platform                                                                                                                                                                                                                                                                                       |
| Ticketing                                                 | Via Acrobat Sign support using an external service                         | Via the Adobe Admin Console                 | Partners can raise support tickets via the Adobe Admin Console                                                                                                                                                                                                                                                                         |
| Acrobat Sign authentication enforced in agreement signing | Allowed                                                                    | Restricted                                  | Users on the OEM 2.0 solution are unable to log in to Acrobat Sign with their credentials, so the Acrobat Sign authentication method is not viable.                                                                                                                                                                                    |
| Sender as signer                                          | Allowed                                                                    | Allowed with different experience           | Sender as signer can still sign the agreement by signing out and logging in via another email to which agreement has been sent. The Send page has been made cookie-less and can be enabled by the settings NEW_EMBEDDED_SEND_WORKFLOW_ENABLED. Once enabled selection of multiple identities won’t appear for signers in same browser. |
| Sender email visibility in agreement requested email      | Allowed                                                                    | Allowed                                     | The emails visibility can be hidden using backend settings. Ex: HIDE_SENDER_INFO_IN_SIGNATURE_REQUESTED_EMAIL, HIDE_OTHER_RECIPIENTS_EMAIL_ADDRESSES_FROM_EMAIL, HIDE_OTHER_RECIPIENTS_INFO_IN_SIGNATURE_REQUESTED_EMAIL etc                                                                                                           |
| Visibility of OEM alias email in audit trail              | Not Available                                                              | Available                                   | An alias email can be added to a user on the 2.0 platform.                                                                                                                                                                                                                                                                             |
| Send in Bulk (SIB) (uses /megaSigns endpoints)            | Allowed via API Allowed via views (not recommended)                        | Allowed via API only (improving efficiency) | SIB can be used via API only.\<br/\>Support for Send in Bulk via an embedded view is targeted for a later release                                                                                                                                                                                                                      |
| Add-ons / Consumables Support                             | Seats / Transactions / Phone Authentication (SMS) / KBA / EMail OTP / etc. | Subsets available                           | Only Phone Authentication (SMS) / KBA / Seats are currently supported as consumables on OEM 2.0                                                                                                                                                                                                                                        |
| 21 CFR part 11 Compliance                                 | Supported                                                                  | SMS Authentication is supported             | Customer users are not allowed to sign into Acrobat Sign in 2.0 using their provisioned email address, so Acrobat Sign authentication is not supported.                                                                                                                                                                                |

## Changes in the Acrobat Sign API

**Changes to the Provisioning APIs**

| **Legacy 1.0 endpoint** | **New 2.0 endpoint**        |
|-------------------------|-----------------------------|
| SOAP /registerAccounts  | REST /signembed/v1/accounts |
| SOAP /createUser        | REST /signembed/v1/users    |
| REST /postAccount       | REST /signembed/v1/accounts |
| REST /postUser          | REST /signembed/v1/users    |

**Changes to the Authentication APIs**

| **Legacy 1.0 endpoint** | **New 2.0 endpoint**                       |
|-------------------------|--------------------------------------------|
| SOAP /issueAccessToken  | REST /adobesignauthentication/api/v1/token |

**Changes to the Acrobat Sign SOAP APIs**

| **Legacy SOAP endpoint**         | **New REST endpoint**                                                                                                                                                          |
|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| getBaseUris                      | /baseURIs, GET                                                                                                                                                                 |
| sendDocument                     | /agreements, POST                                                                                                                                                              |
| sendDocumentInteractive          | /agreements/{Id}/views, POST                                                                                                                                                   |
| sendDocumentMegaSign             | /megaSigns, POST                                                                                                                                                               |
| createLibraryDocument            | /libraryDocuments, POST                                                                                                                                                        |
| createLibraryDocumentInteractive | /libraryDocuments/{Id}, POST                                                                                                                                                   |
| sendReminder                     | /agreements/{Id}/reminders, POST                                                                                                                                               |
| removeDocument                   | /agreements/{Id}/documents, DELETE                                                                                                                                             |
| cancelDocument                   | /agreements/{Id}/state, PUT                                                                                                                                                    |
| rejectDocument                   | /agreements/{Id}/members/participationSets/{ID}/participants/{Id}/reject, PUT                                                                                                  |
| replaceSigner                    | /agreements/{Id}/members/participantSets/{Id}, PUT                                                                                                                             |
| delegateSigning                  | /agreements/{Id}/members/participantSets/{Id}/participants/{Id}/delegatedParticipantSet, POST                                                                                  |
| notifyDocumentVaulted            | /agreements/{Id}/vaulted, PUT                                                                                                                                                  |
| getDocumentInfo                  | /agreements/{Id}, GET                                                                                                                                                          |
| getDocumentInfosByExternalId     | /agreements, GET with query parameter externalId={Id}                                                                                                                          |
| getDocuments                     | /agreements/{Id}/documents, GET                                                                                                                                                |
| getDocumentUrls                  | /agreements/{Id}/combinedDocument/url, GET \<br/\>/agreements/{Id}/documents/{Id}/url, GET                                                                                     |
| getDocumentImageUrls             | /agreements/{Id}/documents/imageUrls, GET - Retrieve URL of an individual document \<br/\> /agreements/{Id}/documents/{Id}/imageUrls, GET - Retrieve URLs of all visible pages |
| getSupportingDocuments           | /agreements/{Id}/documents, GET                                                                                                                                                |
| getFormData                      | /agreements/{Id}/formData, GET                                                                                                                                                 |
| getAuditTrail                    | /agreements/{Id}/auditTrail, GET                                                                                                                                               |
| getSigningUrl                    | /agreements/{Id}/singingUrls, GET                                                                                                                                              |

Reference for the complete list regarding SOAP to REST mapping: [https://developer.adobe.com/acrobat-sign/docs/overview/developer_guide/migrating#deprecated-soap-methods](../developer_guide/migrating.md#deprecated-soap-methods)

<HorizontalLine />
© Copyright 2022, Adobe Inc..  Last update: Jan 30, 2025.
![](../_static/adobelogo.png)
