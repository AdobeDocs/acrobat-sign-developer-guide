# Embed 2.0 API

<InlineAlert slots="text" />

Your feedback is valuable and is vital in improving our product and documentation. Send suggestions to [acrobatsignembed@adobe.com](mailto:acrobatsignembed%40adobe.com).

The Acrobat Sign Embed 2.0 frictionless model release exposes new APIs for streamlining account management as well as creating and validating new user tokens. Embed 2.0 provides the following benefits:

- Seamless onboarding of new customers via the API
- Partner ownership of all aspects of their end-customer relationship. End customers are not known to Adobe
- Access to the Adobe Admin Console, Global Admin Console, and Developer Console
- Support ticket access via the Admin Console
- The ability to add, remove, and fully manage end-users independently from Adobe
- Eliminates provisioning conflicts

Adobe provisions Embed 2.0 customers with access to both the Global and Admin Consoles so they can:

- Use the consoles for managing all licensed Adobe products.
- Create and assign roles for partner’s users (e.g. developers; not customers).
- Set up Federated directory and define Identity Provider (IdP).
- Claim domains (e.g. ‘oempartner.com’) for use with all customers (e.g. [bob.smith_joesbikeshop@oempartner.com](mailto:bob.smith_joesbikeshop%40oempartner.com))

<InlineAlert slots="text" />

Adobe creates and assigns a Sign ‘channel’ for exclusive partner use. All customer accounts will inherit from this channel’s settings. You will collaborate with the Acrobat Sign partner team to define set of ‘global’ settings for all of your customers.

As described in the [onboarding guide](onboarding.md), creating a technical account involves these high level steps in the Developer Console:

1. Create a token for creating a new customer organization within Acrobat Sign.
2. Use your token for creating new users. Repeat as necessary.
3. Use the the technical account token in the Adobe Developer Portal, and generate a cURL to create an endpoint such as:

```http
[https://ims-na1-stg1.adobelogin.com/ims/token/v2?grant_type=client_credentials&
client_id=xxxxxxxxxxxx&
client_secret=xxxxxxxxxx&scope=sign_webhook_retention,openid,widget_write,workflow_read,agreement_send,agreement_sign,AdobeID,agreement_write,widget_read,sign_webhook_read,sign_user_write,agreement_read,agreement_retention,sign_user_read,sign_library_read,user_management_sdk,agreement_vault,sign_user_login,sign_webhook_write,sign_library_retention,sign_library_write,workflow_write]
(https://ims-na1-stg1.adobelogin.com/ims/token/v2?grant_type=client_credentials&client_id=xxxxxxxxxx&client_secret=xxxxxxxxxx&scope=sign_webhook_retention,openid,widget_write,workflow_read,agreement_send,agreement_sign,AdobeID,agreement_write,widget_read,sign_webhook_read,sign_user_write,agreement_read,agreement_retention,sign_user_read,sign_library_read,user_management_sdk,agreement_vault,sign_user_login,sign_webhook_write,sign_library_retention,sign_library_write,workflow_write)
```

<InlineAlert slots="text" />

The rest of this document provides details about new Embed 2.0 APIs.

## Base Endpoint API

**Get Base_uri**

Acrobat Sign APIs come with location awareness, so it’s important to use the correct geographic access point when calling resource-based APIs to ensure success. We highly recommend that clients store the base endpoint URL for each environment. This way, you can retrieve the appropriate geographic access points ([https://api.na1.adobesign.com](https://api.na1.adobesign.com), [https://api.eu1.adobesign.com](https://api.eu1.adobesign.com) for your resource-based API calls. Before making any API calls, make sure to include the valid access point returned as part of the base endpoint API in your request.

***Base API Host***

<br/>
<table border="1" columnWidths="30,70">
  <tr>
    <th>Environment</th>
    <th>Base API Host</th>
  </tr>
  <tr>
    <td>Sandbox Production</td>
    <td><a href="https://api.adobesignsandbox.com">https://api.adobesignsandbox.com</a></td>
  </tr>
  <tr>
    <td>Production</td>
    <td><a href="https://api.adobesign.com">https://api.adobesign.com</a></td>
  </tr>
</table>

***Overview***

<br/>
<table border="1" columnWidths="30,70">
  <tr>
    <th>Item</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>HTTP Method</td>
    <td>GET</td>
  </tr>
  <tr>
    <td>Endpoint Operation</td>
    <td>&#123;Base Api Host&#125;/api/rest/v6/baseUris</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>Very first API call to fetch geographical aware access points before you can call further APIs.</td>
  </tr>
  <tr>
    <td>Authentication</td>
    <td>Valid user/technical account token</td>
  </tr>
  <tr>
    <td>Request Header</td>
    <td>Auth API Headers</td>
  </tr>
  <tr>
    <td>Response Object</td>
    <td>BaseUri Response</td>
  </tr>
  <tr>
    <td>HTTP Status Code</td>
    <td>200</td>
  </tr>
  <tr>
    <td>Error Code</td>
    <td>BaseUri Error Codes</td>
  </tr>
</table>

***Response Object***

<br/>
<table border="1" columnWidths="30,20,50">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>apiAccessPoint</td>
    <td>String</td>
    <td>The access point from where other APIs need to be accessed. In case other APIs are accessed from a different endpoint, it will be considered an invalid request.</td>
  </tr>
  <tr>
    <td>webAccessPoint</td>
    <td>String</td>
    <td>Web access point acting as base host domain for all web-based calls.</td>
  </tr>
</table>

**BaseUri: Sample Response**

```json
{
    "apiAccessPoint": "https://api.na1.echosign.com/",
    "webAccessPoint": "https://secure.na1.echosign.com/"
}
```

**BaseUri: Error Response**

***Error codes***

<br/>
<table border="1" columnWidths="10,40,50">
  <tr>
    <th>HTTP Status Code</th>
    <th>Error Code</th>
    <th>Message</th>
  </tr>
  <tr>
    <td>401</td>
    <td>INVALID_ACCESS_TOKEN</td>
    <td>Access token provided is invalid or has expired.</td>
  </tr>
  <tr>
    <td>401</td>
    <td>NO_AUTHORIZATION_HEADER</td>
    <td>Authorization header not provided.</td>
  </tr>
</table>

## Authentication: Token APIs

Call these APIs via the AdobeSignAuthService for user token generation and validation:

- POST Token: Exchange technical account token for a user token.
- POST Validate Token: Validate Sign Embed User Token.

### Common auth token API attributes

***Common header attributes***

<br/>
<table border="1" columnWidths="20,40,40">
  <tr>
    <th>Header Name</th>
    <th>Values</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>content-type</td>
    <td>application/x-www-form-urlencoded</td>
    <td>The resource media type.</td>
  </tr>
  <tr>
    <td>x-request-id</td>
    <td>String</td>
    <td>A string value needed to track a given request.</td>
  </tr>
</table>

### Create an Embed user token

***Overview***

<br/>
<table border="1" columnWidths="30,70">
  <tr>
    <th>Item</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>HTTP Method</td>
    <td>POST</td>
  </tr>
  <tr>
    <td>Endpoint Operation</td>
    <td>&#123;apiAccessPoint&#125;/api/gateway/adobesignauthservice/api/v1/token</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>API to generate Sign Embed user Token.</td>
  </tr>
  <tr>
    <td>Request Header</td>
    <td>Auth API Headers</td>
  </tr>
  <tr>
    <td>Request Object</td>
    <td>Create token parameters</td>
  </tr>
  <tr>
    <td>Response Object</td>
    <td>Create token response</td>
  </tr>
  <tr>
    <td>HTTP Status Code</td>
    <td>200</td>
  </tr>
  <tr>
    <td>Error Code</td>
    <td>Generate Token - Error response</td>
  </tr>
</table>

#### Request

***Request Parameters***

<br/>
<table border="1" columnWidths="20,10,5,55,10">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Default Value</th>
    <th>Description</th>
    <th>Mandatory Fields by POST</th>
  </tr>
  <tr>
    <td>client_id</td>
    <td>String</td>
    <td></td>
    <td>IMS Client Id</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>client_secret</td>
    <td>String</td>
    <td></td>
    <td>IMS client secret</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>grant_type</td>
    <td>String</td>
    <td></td>
    <td>Auth Grant type</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>subject_token</td>
    <td>String</td>
    <td></td>
    <td>Unsigned JWT token of the user with email as payload. Refer below section for more details.</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>subject_token_type</td>
    <td>String</td>
    <td></td>
    <td>jwt: subject token type</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>actor_token_type</td>
    <td>String</td>
    <td></td>
    <td>access_token - actor Token type</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>actor_token</td>
    <td>String</td>
    <td></td>
    <td>Technical account token with mandatory scope: sign_oem_user_impersonate.</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>scope</td>
    <td>String</td>
    <td></td>
    <td>
      Scopes requested for the user access token. It must be a subset of the scopes that are available in the technical account token:  
      openid, AdobeID, agreement_read, agreement_sign, agreement_write, agreement_send, agreement_retention, agreement_vault,  
      sign_library_read, sign_library_write, sign_library_retention, widget_read, widget_write, workflow_read, workflow_write,  
      sign_user_write, sign_user_read, sign_user_login, sign_webhook_read, sign_webhook_write, sign_webhook_retention.  
      <strong>The following scopes are not allowed for user access token:</strong>  
      sign_account_read, sign_account_write, sign_oem_user_impersonate, ee.GROUP_SIGN_OEM, user_management_sdk.
    </td>
    <td>Required</td>
  </tr>
</table>

**Generating Subject Token**

Subject identifies the principal for which the JWT token [https://jwt.io/introduction](https://jwt.io/introduction) belongs & access token is being minted by exchanging technical account token(actor token). Subject is scoped to be locally unique in context of authorization server identified by email. The jwt token belonging to this subject is termed subject_token which is an unsigned one and has “email” as claim.

**Sample subject token (jwt)**

```json
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InN1YmplY3RfZW1haWxAc2lnbmVtYmVkcGFydG5lci5jb20ifQ.IOqyTkveGBDhfmanxttJnrcO-X8iYK1yyu7mU5Eb3dY

Payload:

{
  "email": "subject_email@signembedpartner.com"
}
```

For quick testing, copy this sample value and paste in jwt.io, Navigate to right hand payload section & update “email”. The jwt token at left side will be updated automatically. You can use this as subject token in token exchange api

**How to generate programmatically?**

You can use libraries [https://jwt.io/libraries](https://jwt.io/libraries) based on different languages to generate an unsigned subject token.

**Sample Request parameters**

```text
client_id:<IMS_client_id>
client_secret:<client_secret>
grant_type:urn:ietf:params:oauth:grant-type:token-exchange
subject_token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyZW1haWxAam9lc2Jpa2VzaG9wLmNvbSJ9.smfBPHgx68LXnwzKV_t2DurHyHT1aPlzFB8nxo_RiBY
subject_token_type:jwt
actor_token_type:access_token
actor_token:<technical_account_token>
scope:sign_webhook_retention,widget_write,workflow_read,agreement_send,agreement_sign,agreement_write,widget_read,sign_webhook_read,sign_user_write,agreement_read,agreement_retention,sign_user_read,sign_library_read,agreement_vault,sign_user_login,sign_webhook_write,sign_library_retention,sign_library_write,workflow_write
```

#### Response

***Response Parameters***

<br/>
<table border="1" columnWidths="20,20,60">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>access_token</td>
    <td>String</td>
    <td>User Access Token value</td>
  </tr>
  <tr>
    <td>token_type</td>
    <td>String</td>
    <td>Token type: <span style="color: red;">access_token</span></td>
  </tr>
  <tr>
    <td>expires_in</td>
    <td>Long</td>
    <td>Duration before expiry in seconds. The user token expires in 5 minutes.</td>
  </tr>
  <tr>
    <td>scope</td>
    <td>String</td>
    <td>Scope available in the user access token.</td>
  </tr>
</table>

**Sample Response**

```json
{
    "access_token": <user_access_token>,
    "token_type": "access_token",
    "expires_in": 300,
    "scope": "sign_webhook_retention,openid,widget_write,workflow_read,agreement_send,agreement_sign,AdobeID,agreement_write,widget_read,sign_webhook_read,sign_user_write,agreement_read,agreement_retention,sign_user_read,sign_library_read,agreement_vault,sign_user_login,sign_webhook_write,sign_library_retention,sign_library_write,workflow_write"
}
```

#### Errors

***Error codes for create an embed user token***

<br/>
<table border="1" columnWidths="10,40,50">
  <tr>
    <th>HTTP Status Code</th>
    <th>Error Code</th>
    <th>Message</th>
  </tr>
  <tr>
    <td>400</td>
    <td>BAD_REQUEST</td>
    <td>The request provided is invalid.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>INVALID_REQUEST</td>
    <td>&lt;required param name&gt; is missing or invalid.</td>
  </tr>
  <tr>
    <td>401</td>
    <td>INVALID_AUTHENTICATING_TOKEN</td>
    <td>actor_token is missing or invalid.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>AUTHENTICATION_FAILED</td>
    <td>Partner is not onboarded successfully.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>PERMISSION_DENIED</td>
    <td>The API caller does not have the permission to execute this operation.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>INTERNAL_SERVER_ERROR</td>
    <td>Some miscellaneous error has occurred.</td>
  </tr>
</table>

### Validate Embed User token

***Overview***

<br/>
<table border="1" columnWidths="30,70">
  <tr>
    <th>Item</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>HTTP Method</td>
    <td>POST</td>
  </tr>
  <tr>
    <td>Endpoint Operation</td>
    <td>&#123;apiAccessPoint&#125;/api/gateway/adobesignauthservice/api/v1/validate_token</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>API to check the validity of the user token.</td>
  </tr>
  <tr>
    <td>Request Header</td>
    <td>Auth API Headers</td>
  </tr>
  <tr>
    <td>Request Object</td>
    <td>Validate token request</td>
  </tr>
  <tr>
    <td>Response Object</td>
    <td>Validate token Response</td>
  </tr>
  <tr>
    <td>HTTP Status Code</td>
    <td>200</td>
  </tr>
  <tr>
    <td>Error Code</td>
    <td>Error Response - Validate Token</td>
  </tr>
</table>

#### Request

***Request Parameters***

<br/>
<table border="1" columnWidths="20,20,10,30,20">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Default Value</th>
    <th>Description</th>
    <th>Mandatory Fields by POST</th>
  </tr>
  <tr>
    <td>client_id</td>
    <td>String</td>
    <td></td>
    <td>IMS Client Id</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>token</td>
    <td>String</td>
    <td></td>
    <td>User access token</td>
    <td>Required</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td></td>
    <td>Token type</td>
    <td>Required</td>
  </tr>
</table>

**Sample request**

```text
client_id:<IMS_client_id>
token:<user_access_token>
type:access_token
```

#### Response

***Response Parameters***

<br/>
<table border="1" columnWidths="20,30,50">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>valid</td>
    <td>boolean</td>
    <td>Returns if the token is valid or not.</td>
  </tr>
  <tr>
    <td>expires_at</td>
    <td>long</td>
    <td>Token Expiry time in Epoc sec.</td>
  </tr>
</table>

**Sample Response**

```json
{
    "valid": true,
    "expires_at": 1673987741
}
```

#### Errors

***Error codes for validate account***

<br/>
<table border="1" columnWidths="10,40,50">
  <tr>
    <th>HTTP Status Code</th>
    <th>Error Code</th>
    <th>Message</th>
  </tr>
  <tr>
    <td>400</td>
    <td>BAD_REQUEST</td>
    <td>The request provided is invalid.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>INVALID_REQUEST</td>
    <td>&lt;required param name&gt; is missing or invalid.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>INTERNAL_SERVER_ERROR</td>
    <td>Some miscellaneous error has occurred.</td>
  </tr>
</table>

#### Common attributes

***Account & User APIs: Common headers for Partner APIs***

<br/>
<table border="1" columnWidths="20,30,50">
  <tr>
    <th>Header Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Authorization</td>
    <td>Bearer &lt;Technical Account Token&gt;</td>
    <td>Technical account token that is generated by the partner and the Partner is onboarded beforehand.</td>
  </tr>
  <tr>
    <td>content-type</td>
    <td>application/json</td>
    <td>Media type of the resource.</td>
  </tr>
  <tr>
    <td>x-request-id</td>
    <td>String</td>
    <td>A string value needed to track a given request.</td>
  </tr>
</table>

***Common headers for Auth token APIs***

<br/>
<table border="1" columnWidths="20,30,50">
  <tr>
    <th>Header Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>content-type</td>
    <td>application/x-www-form-urlencoded</td>
    <td>Media type of the resource.</td>
  </tr>
  <tr>
    <td>x-request-id</td>
    <td>String</td>
    <td>A string value needed to track a given request.</td>
  </tr>
</table>

## Register APIs

Register APIs allow you to register your partner application with Acrobat Sign as part of the on-boarding process. Call this API directly with your technical account token for each technical account. You must also do this in the sandbox environment as well.

You can call the following API to register your partner application by directly using Technical account token:

- Post Partners - Register the partner with Acrobat Sign

### Create partner

***Overview***

<br/>
<table border="1" columnWidths="30,70">
  <tr>
    <th>Item</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>HTTP Method</td>
    <td>POST</td>
  </tr>
  <tr>
    <td>Endpoint Operation</td>
    <td><span style="color: red;">&#123;apiAccessPoint&#125;/api/gateway/signembed/v1/partners</span></td>
  </tr>
  <tr>
    <td>Authentication/Authorization</td>
    <td>Values:
    <ul>
    <li>Valid Technical Account Token</li>
    <li>Mandatory scopes in token: <span style="color: red;">sign_user_write, sign_user_read, sign_account_write, sign_account_read, sign_oem_user_impersonate</span></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td>Description</td>
    <td>API to register the Partner with Acrobat Sign. This would be called once as part of Partner onboarding.</td>
  </tr>
  <tr>
    <td>Request Header</td>
    <td>Partner APIs Common Headers</td>
  </tr>
  <tr>
    <td>Request Object</td>
    <td>RegisterPartnerRequest</td>
  </tr>
  <tr>
    <td>Response Object</td>
    <td>RegisterPartnerResponse</td>
  </tr>
  <tr>
    <td>HTTP Status Code</td>
    <td>201</td>
  </tr>
  <tr>
    <td>Error Code</td>
    <td>Error Response - Register Partner</td>
  </tr>
</table>

#### Request

***Register Partner request parameters***

<br/>
<table border="1" columnWidths="15,15,20,30,20">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
    <th>Requirement</th>
    <th>Validations/Comments</th>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>NA</td>
    <td>Identifiable partner name</td>
    <td>Required</td>
    <td></td>
  </tr>
  <tr>
    <td>domains</td>
    <td>List&lt;String&gt;</td>
    <td>List of all the domains claimed/trusted by the partner org</td>
    <td>List of domains claimed/trusted by the partner organization</td>
    <td>Optional</td>
    <td>domain regex validation Validated against the domains claimed/trusted by the partner org</td>
  </tr>
</table>

**Register partner sample request**

```json
{
"name":"Partner Name",
"domains": [
  "partnerdomain.com",
  "partnerdomain.us"
 ]
}
```

#### Response

***Register partner response parameters***

<br/>
<table border="1" columnWidths="20,20,10,50">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>imsClientId</td>
    <td>String</td>
    <td></td>
    <td>The client ID associated with the technical account</td>
  </tr>
  <tr>
    <td>created</td>
    <td>Date</td>
    <td></td>
    <td>Created date in ISO format</td>
  </tr>
  <tr>
    <td>domains</td>
    <td>List&lt;String&gt;</td>
    <td></td>
    <td>List of domains claimed/trusted by the partner</td>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td></td>
    <td>Id for the Partner</td>
  </tr>
  <tr>
    <td>modified</td>
    <td>Date</td>
    <td></td>
    <td>Last modified date in ISO format</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td></td>
    <td>Identifiable partner name</td>
  </tr>
  <tr>
    <td>orgGuid</td>
    <td>String</td>
    <td></td>
    <td>Id of the IMS organization</td>
  </tr>
  <tr>
    <td>status</td>
    <td>String</td>
    <td>INACTIVE</td>
    <td>Status of the Partner</td>
  </tr>
  <tr>
    <td>technicalAccountId</td>
    <td>String</td>
    <td></td>
    <td>Technical account ID associated with the technical account</td>
  </tr>
  <tr>
    <td>updatedBy</td>
    <td>String</td>
    <td></td>
    <td>Technical account ID associated with the technical account</td>
  </tr>
</table>

**Register partner sample response**

```json
{
"id" :"1234",
"name":"Partner Name",
"orgGuid": "PartnerOrgGuid",
"imsClientId": "CliendIdOfTechnicalAccToken",
"technicalAccountId": "41AC2000634002540A49403A@techacct.adobe.com",
"status": "INACTIVE",
"updatedBy": "41AC2000634002540A49403A@techacct.adobe.com",
"created": "date",
"modified": "date",
"domains": [
  "partnerdomain.com",
  "partnerdomain.in"
]
}
```

#### Errors

***Error codes for register partner response***

<br/>
<table border="1" columnWidths="10,50,40">
  <tr>
    <th>HTTP Status Code</th>
    <th>Error Code</th>
    <th>Message</th>
  </tr>
  <tr>
    <td>400</td>
    <td>INVALID_PARAMETER</td>
    <td>The &lt;param_name&gt; value specified is invalid.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>DOMAIN_NOT_ELIGIBLE</td>
    <td>One or more domains are not allowed for the given partner.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>INVALID_JSON</td>
    <td>An invalid JSON was specified.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>MISSING_REQUIRED_PARAM</td>
    <td>Required parameter &lt;param name&gt; is missing.</td>
  </tr>
  <tr>
    <td>401</td>
    <td>INVALID_ACCESS_TOKEN</td>
    <td>Access token provided is invalid or has expired.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>MISSING_SCOPES</td>
    <td>The token does not contain the required scopes.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>ORG_DOMAINS_NOT_FOUND</td>
    <td>Org does not have any owned or trusted federated domains.</td>
  </tr>
  <tr>
    <td>409</td>
    <td>TECHNICAL_ACCOUNT_ID_ALREADY_EXISTS</td>
    <td>Partner already exists for this Technical Account Id.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>INTERNAL_SERVER_ERROR</td>
    <td>Some miscellaneous error has occurred.</td>
  </tr>
</table>

## Account APIs

Call these APIs directly using a technical account token to create or update an account.

- POST Account - To create a new account.
- PUT Account - To update a new account.
- GET Account - To fetch an account info.
- GET All Accounts - To fetch all accounts in a channel.

### Common account API header attributes

***Common header attributes***

<br/>
<table border="1" columnWidths="20,40,40">
  <tr>
    <th>Header Name</th>
    <th>Values</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Authorization</td>
    <td>Bearer &lt;Technical Account Token&gt;</td>
    <td>Technical account token that is generated by the partner and the Partner is onboarded beforehand.</td>
  </tr>
  <tr>
    <td>content-type</td>
    <td>application/json</td>
    <td>The resource media type.</td>
  </tr>
  <tr>
    <td>x-request-id</td>
    <td>String</td>
    <td>A string value needed to track a given request</td>
  </tr>
</table>

### Create Account

***Overview***

<br/>
<table border="1" columnWidths="30,70">
  <tr>
    <th>Item</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>HTTP Method</td>
    <td>POST</td>
  </tr>
  <tr>
    <td>Endpoint Operation</td>
    <td>&#123;apiAccessPoint&#125;/api/gateway/signembed/v1/accounts</td>
  </tr>
  <tr>
    <td>Authentication/Authorization</td>
    <td>Valid technical account token. Required scopes in token: <span style="color: red;">sign_account_write</span>.</td>
  </tr>
  <tr>
    <td>Audience</td>
    <td>Partner will call this API to create new accounts for their customers.</td>
  </tr>
  <tr>
    <td>Request Header</td>
    <td>Partner APIs Common Headers</td>
  </tr>
  <tr>
    <td>Request Object</td>
    <td>AccountProvisionRequest</td>
  </tr>
  <tr>
    <td>Response Object</td>
    <td>AccountProvisionResponse</td>
  </tr>
  <tr>
    <td>HTTP Status Code</td>
    <td>201</td>
  </tr>
  <tr>
    <td>Error Code</td>
    <td>Error Response: Create Account</td>
  </tr>
</table>

#### Request

***Account create-update request parameters***

<br/>
<table border="1" columnWidths="20,20,10,30,20,20">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
    <th>Needed in POST/PUT</th>
    <th>Updatable by PUT</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>NA</td>
    <td>Account ID of the Account</td>
    <td>Required and Permitted only in PUT</td>
    <td>Immutable</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>NA</td>
    <td>Name of the account. The name must only include numbers and letters. No special characters or spaces are allowed.</td>
    <td>Required</td>
    <td>mutable</td>
  </tr>
  <tr>
    <td>company</td>
    <td>String</td>
    <td>""</td>
    <td>Name of the company</td>
    <td>Optional</td>
    <td>mutable</td>
  </tr>
  <tr>
    <td>consumables</td>
    <td>List&lt;Consumable&gt;</td>
    <td>[ ]</td>
    <td>List of Consumables</td>
    <td>Optional</td>
    <td>mutable</td>
  </tr>
  <tr>
    <td>countryCode</td>
    <td>String</td>
    <td>NA</td>
    <td>Target Country for Account Provisioning. Ex US, FR, GB</td>
    <td>Required</td>
    <td>Immutable</td>
  </tr>
</table>

***Consumable***

<br/>
<table border="1" columnWidths="10,10,10,40,15,15">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Default Value</th>
    <th>Description</th>
    <th>Needed in POST/PUT</th>
    <th>Updatable by PUT</th>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>NA</td>
    <td>Name of consumable supported in Embed Accounts.
    <ul>
    <li>KBA_ANNUAL</li>
    <li>PHONE_AUTH_ANNUAL</li>
    <li>SEAT</li>
    </ul>
    </td>
    <td>Required</td>
    <td>mutable</td>
  </tr>
  <tr>
    <td>attributes</td>
    <td>Object</td>
    <td>N/A</td>
    <td>Properties for each consumable type</td>
    <td>Required</td>
    <td>mutable</td>
  </tr>
</table>

**Sample Account Provisioning Request**

```json
{
    "name": "SignEmbedTestAccount",
    "company": "Sign Embed Test Account",
    "countryCode": "US",
    "consumables":[
        {
            "type": "SEATS",
            "attributes": {
                "cap": 1
            }
        },
        {
            "type": "PHONE_AUTH",
            "attributes": {
                "cap": 1
            }
        },
        {
            "type": "KBA",
            "attributes": {
                "cap": 1
            }
        }
    ]
}
```

#### Account creation response object

<br/>
<table border="1">
  <tr>
    <th>Parameter Name</th>
    <th>REST Object</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>accountId</td>
    <td>String</td>
    <td>Account ID</td>
  </tr>
</table>

**Sample account creation response**

```json
{
  "accountId" : "2aabnucbm3xsdfweldvwporqvjqzxdkjorbikaifuiwufwihs*"
}
```

#### Errors

***Error codes for AccountCreateErrorResponse***

<br/>
<table border="1" columnWidths="10,40,50">
  <tr>
    <th>HTTP Status Code</th>
    <th>Error code</th>
    <th>Message</th>
  </tr>
  <tr>
    <td>400</td>
    <td>MISSING_REQUIRED_PARAMS</td>
    <td>Required parameter &lt;param name&gt; is missing.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>INVALID_JSON</td>
    <td>An invalid JSON was specified.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>INVALID_PARAMETER</td>
    <td>The &lt;param_name&gt; value specified is invalid.</td>
  </tr>
  <tr>
    <td>401</td>
    <td>INVALID_ACCESS_TOKEN</td>
    <td>Access token provided is invalid or has expired.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>MISSING_SCOPES</td>
    <td>The token does not contain the required scopes.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>AUTHENTICATION_FAILED</td>
    <td>Partner is not onboarded successfully.</td>
  </tr>
  <tr>
    <td>409</td>
    <td>ACCOUNT_ALREADY_EXISTS</td>
    <td>Account with this name already exists.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>INTERNAL_SERVER_ERROR</td>
    <td>Some miscellaneous error has occurred.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>ACCOUNT_COULD_NOT_BE_CONFIGURED</td>
    <td>Account with accountId &#123;account id&#125; could not be configured properly.</td>
  </tr>
</table>

### Update Account

***Overview***

<br/>
<table border="1" columnWidths="30,70">
  <tr>
    <th>Item</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>HTTP Method</td>
    <td>PUT</td>
  </tr>
  <tr>
    <td>Endpoint Operation</td>
    <td>&#123;apiAccessPoint&#125;/api/gateway/signembed/v1/accounts/&lt;accountId&gt;</td>
  </tr>
  <tr>
    <td>Authentication/Authorization</td>
    <td>Valid technical account token. Required scopes: <span style="color: red;">sign_account_write</span></td>
  </tr>
  <tr>
    <td>Audience</td>
    <td>Partner will call this API to update existing Embed account.</td>
  </tr>
  <tr>
    <td>Request Header</td>
    <td>Partner APIs Common Headers</td>
  </tr>
  <tr>
    <td>Request Object</td>
    <td>AccountUpdateRequest</td>
  </tr>
  <tr>
    <td>Response Object</td>
    <td>No Content</td>
  </tr>
  <tr>
    <td>HTTP Status Code</td>
    <td>204</td>
  </tr>
  <tr>
    <td>Error Code</td>
    <td>ErrorCodes - Update Account</td>
  </tr>
</table>

#### Request

Account update request parameters

**Sample Account Update Request**

```json
{
    "id":"accountid",
    "name": "SignEmbedTestAccountUpdated",
    "company": "Sign Embed Test Account Updated",
    "consumables":[
        {
            "type": "SEATS",
            "attributes": {
                "cap": 10
            }
        },
        {
            "type": "PHONE_AUTH",
            "attributes": {
                "cap": 10
            }
        },
        {
            "type": "KBA",
            "attributes": {
                "cap": 10
            }
        }
    ]
}
```

#### Errors

***Error codes for AccountUpdateErrorResponse***

<br/>
<table border="1" columnWidths="10,40,50">
  <tr>
    <th>HTTP Status Code</th>
    <th>Error code</th>
    <th>Message</th>
  </tr>
  <tr>
    <td>400</td>
    <td>MISSING_REQUIRED_PARAMS</td>
    <td>Missing required parameters &lt;required param name&gt;.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>INVALID_PARAMETER</td>
    <td>The &lt;param_name&gt; value specified is invalid.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>INVALID_INPUT</td>
    <td>An invalid input is provided.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>INVALID_JSON</td>
    <td>An invalid JSON was specified.</td>
  </tr>
  <tr>
    <td>401</td>
    <td>INVALID_ACCESS_TOKEN</td>
    <td>Access token provided is invalid or has expired.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>MISSING_SCOPES</td>
    <td>The token does not contain the required scopes.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>AUTHENTICATION_FAILED</td>
    <td>Partner is not onboarded successfully.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>PERMISSION_DENIED</td>
    <td>The API caller does not have the permission to execute this operation.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>ACCOUNT_NOT_FOUND</td>
    <td>Account does not exist.</td>
  </tr>
  <tr>
    <td>409</td>
    <td>ACCOUNT_ALREADY_EXISTS</td>
    <td>An account with this name already exists.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>INTERNAL_SERVER_ERROR</td>
    <td>Some miscellaneous error has occurred.</td>
  </tr>
</table>

### Get Account

***Overview***

<br/>
<table border="1" columnWidths="30,70">
  <tr>
    <th>Item</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>HTTP Method</td>
    <td>GET</td>
  </tr>
  <tr>
    <td>Endpoint Operation</td>
    <td>&#123;apiAccessPoint&#125;/api/gateway/signembed/v1/accounts/&lt;accountId&gt;</td>
  </tr>
  <tr>
    <td>Authorization</td>
    <td>Valid technical account token. Required Scopes in token: sign_account_read</td>
  </tr>
  <tr>
    <td>Audience</td>
    <td>Partner will call this API to fetch account details for their customers.</td>
  </tr>
  <tr>
    <td>Request Header</td>
    <td>Partner APIs Common Headers</td>
  </tr>
  <tr>
    <td>Request Object</td>
    <td>(No content provided)</td>
  </tr>
  <tr>
    <td>Response Object</td>
    <td>GetAccountResponse</td>
  </tr>
  <tr>
    <td>HTTP Status Code</td>
    <td>200</td>
  </tr>
  <tr>
    <td>Error Code</td>
    <td>ErrorCodes - get Account</td>
  </tr>
</table>

#### Response

***Response Object GetAccountResponse***

<br/>
<table border="1" columnWidths="30,30,40">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>account ID</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>Name of the account</td>
  </tr>
  <tr>
    <td>company</td>
    <td>String</td>
    <td>Name of the company</td>
  </tr>
  <tr>
    <td>consumables</td>
    <td>List&lt;Consumable&gt;</td>
    <td>List of Consumables with values. For example, KBA, PHONE_AUTH, and SEATS.</td>
  </tr>
  <tr>
    <td>countryCode</td>
    <td>String</td>
    <td>Target Country for Account Provisioning. Ex US, FR, GB</td>
  </tr>
  <tr>
    <td>created</td>
    <td>Date</td>
    <td>Account created date in ISO format.</td>
  </tr>
</table>

**Sample account creation GetAccountResponse**

```json
{
    "id":"accountId"
    "name": "SignEmbedTestAccountUpdated",
    "company": "Sign Embed Test Account Updated",
    "consumables":[
        {
            "type": "SEATS",
            "attributes": {
                "cap": 10
            }
        },
        {
            "type": "PHONE_AUTH",
            "attributes": {
                "cap": 10
            }
        },
        {
            "type": "KBA",
            "attributes": {
                "cap": 10
            }
        }
    ],
    "created": "2023-01-17T12:27:08Z"
}
```

#### Errors

***Error codes for AccountGetErrorResponse***

<br/>
<table border="1" columnWidths="10,40,50">
  <tr>
    <th>HTTP Status Code</th>
    <th>Error code</th>
    <th>Message</th>
  </tr>
  <tr>
    <td>400</td>
    <td>INVALID_INPUT</td>
    <td>An invalid input is provided.</td>
  </tr>
  <tr>
    <td>401</td>
    <td>INVALID_ACCESS_TOKEN</td>
    <td>Access token provided is invalid or has expired.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>MISSING_SCOPES</td>
    <td>The token does not contain the required scopes.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>AUTHENTICATION_FAILED</td>
    <td>Partner is not onboarded successfully.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>PERMISSION_DENIED</td>
    <td>The API caller does not have the permission to execute this operation.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>ACCOUNT_NOT_FOUND</td>
    <td>Account does not exist.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>INTERNAL_SERVER_ERROR</td>
    <td>Some miscellaneous error has occurred.</td>
  </tr>
</table>

### Get All Accounts

***Overview***

<br/>
<table border="1" columnWidths="30,70">
  <tr>
    <th>Item</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>HTTP Method</td>
    <td>GET</td>
  </tr>
  <tr>
    <td>Endpoint Operation</td>
    <td>/v1/accounts?isLegacy=&#123;true/false&#125;&pagesSize=&#123;&#125;&pageNumber=&#123;&#125;</td>
  </tr>
  <tr>
    <td>Authorization</td>
    <td>
    <ul>
    <li>Valid Technical Account Token.</li>
    <li>Mandatory Scope in token - sign_account_read</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td>Audience</td>
    <td>Partner will call this API to fetch paginated list of accounts for all their customers.</td>
  </tr>
  <tr>
    <td>Request Header</td>
    <td>Partner APIs Common Headers</td>
  </tr>
  <tr>
    <td>Request Object</td>
    <td>GetAccountsResponse</td>
  </tr>
  <tr>
    <td>HTTP Status Code</td>
    <td>200</td>
  </tr>
  <tr>
    <td>Error Code</td>
    <td>ErrorCodes - get Account</td>
  </tr>
</table>

***Query Params***

<br/>
<table border="1" columnWidths="15,10,20,15,40">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Description</th>
    <th>Needed</th>
    <th>Data Range</th>
  </tr>
  <tr>
    <td>pageNumber</td>
    <td>Integer</td>
    <td>pageNumber to navigate through pages</td>
    <td>Optional</td>
    <td>
    <strong>default:0</strong>
      <ul>
        <li>If pageNumber is less than 0, throw <strong>INVALID_PARAMETER</strong> exception</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>pageSize</td>
    <td>Integer</td>
    <td>pageSize to limit the number of records that will be fetched.</td>
    <td>Optional</td>
    <td>
    <strong>default:20 max:100</strong>
      <ul>
        <li>If pageSize is less than 1, throw <strong>INVALID_PARAMETER</strong> exception</li>
        <li>If pageSize is more than 100, throw <strong>PAGE_SIZE_LIMIT_EXCEEDED</strong> exception</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>isLegacy</td>
    <td>boolean</td>
    <td>Return legacy accounts that are on old Sign Embed Models.</td>
    <td>Optional</td>
    <td>
    <strong>default:false</strong>
      <ul>
        <li>If isLegacy value is not a boolean, throw <strong>INVALID_PARAMETER</strong> exception</li>
      </ul>
    </td>
  </tr>
</table>

#### Response

***Response Object GetAccountResponse***

<br/>
<table border="1" columnWidths="20,30,50">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>accountList</td>
    <td>List&lt;Account&gt;</td>
    <td>List of Account details.</td>
  </tr>
</table>

***Account***

<br/>
<table border="1" columnWidths="20,30,50">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>accountId</td>
    <td>String</td>
    <td>Secure Account id to identify an Account</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>Name of the account</td>
  </tr>
  <tr>
    <td>created</td>
    <td>Date</td>
    <td>Account created date in ISO format.</td>
  </tr>
</table>

**Sample GetAccountsResponse**

```json
{
"accountList": [
  {
    "accountId": "secureAccountId1234",
    "name": "Joes Bike Shop",
    "created": "2023-01-17T12:27:08Z"
  },
  {
    "accountId": "secureAccountId2345",
    "name": "Acme Corp",
    "created": "2023-01-17T12:27:08Z"
  }
]
}
```

#### Errors

***Error Response for Get Accounts***

<br/>
<table border="1" columnWidths="10,40,50">
  <tr>
    <th>HTTP Status Code</th>
    <th>Error code</th>
    <th>Message</th>
  </tr>
  <tr>
    <td>400</td>
    <td>INVALID_PARAMETER</td>
    <td>The pageSize specified must be greater than or equal to 1.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>PAGE_SIZE_LIMIT_EXCEEDED</td>
    <td>Page size has exceeded the maximum length of 100.</td>
  </tr>
  <tr>
    <td>401</td>
    <td>INVALID_TOKEN</td>
    <td>The token provided is invalid or expired.</td>
  </tr>
  <tr>
    <td>401</td>
    <td>MISSING_SCOPES</td>
    <td>The token does not contain the required scopes.</td>
  </tr>
  <tr>
    <td>401</td>
    <td>AUTHENTICATION_FAILED</td>
    <td>Partner is not onboarded successfully.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>PERMISSION_DENIED</td>
    <td>The API caller does not have the permission to execute this operation.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>INTERNAL_SERVER_ERROR</td>
    <td>Some miscellaneous error has occurred.</td>
  </tr>
</table>

## User APIs

Call these APIs directly using a technical account token to create or update an account and users.

- POST User - To add a user to an account.
- PUT User - To update a user.
- GET User - To fetch user info.

### Common user API header attributes

Common user header attributes are identical to the Account APIs.

### POST user

***Overview***

<br/>
<table border="1" columnWidths="30,70">
  <tr>
    <th>Item</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>HTTP Method</td>
    <td>POST</td>
  </tr>
  <tr>
    <td>Endpoint Operation</td>
    <td>&#123;apiAccessPoint&#125;/api/gateway/signembed/v1/users</td>
  </tr>
  <tr>
    <td>Authentication/ Authorization</td>
    <td>Valid Technical Account Token or Sign Embed user Admin token. Mandatory Scopes required in token: <span style="color: red;">sign_user_write.</span></td>
  </tr>
  <tr>
    <td>Audience</td>
    <td>Partner will call this API to add a new user to their customer’s account.</td>
  </tr>
  <tr>
    <td>Request Header</td>
    <td>Partner APIs Common Headers</td>
  </tr>
  <tr>
    <td>Request Object</td>
    <td>Create User Request</td>
  </tr>
  <tr>
    <td>Response Object</td>
    <td>Create User Response</td>
  </tr>
  <tr>
    <td>HTTP Status Code</td>
    <td>201</td>
  </tr>
  <tr>
    <td>Error Code</td>
    <td>ErrorCodes - Create User</td>
  </tr>
</table>

#### Request

***Create-update user request parameters***

<br/>
<table border="1" columnWidths="15,15,10,20,20,15">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Default Value</th>
    <th>Description</th>
    <th>Mandatory Fields by POST/PUT</th>
    <th>Update Allowed via PUT</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td></td>
    <td>Id to uniquely identify a user.</td>
    <td>Required and permitted only in a PUT call</td>
    <td>Immutable</td>
  </tr>
  <tr>
    <td>email</td>
    <td>String</td>
    <td></td>
    <td>Email of the user.</td>
    <td>Required</td>
    <td>Mutable</td>
  </tr>
  <tr>
    <td>emailAlias</td>
    <td>String</td>
    <td></td>
    <td>Email alias with customer domain displayed in the audit report.</td>
    <td>Optional</td>
    <td>Mutable</td>
  </tr>
  <tr>
    <td>firstName</td>
    <td>String</td>
    <td></td>
    <td>First Name of the User.</td>
    <td>Required</td>
    <td>Mutable</td>
  </tr>
  <tr>
    <td>lastName</td>
    <td>String</td>
    <td></td>
    <td>Last Name of the User.</td>
    <td>Required</td>
    <td>Mutable</td>
  </tr>
  <tr>
    <td>accountId</td>
    <td>String</td>
    <td></td>
    <td>Account ID where the user needs to be added.</td>
    <td>Required. Optional if User token is used for Authentication.</td>
    <td>Immutable</td>
  </tr>
  <tr>
    <td>status</td>
    <td>String</td>
    <td>ACTIVE</td>
    <td>Status of the user.</td>
    <td>Optional. Not supported in POST. Defaults to ACTIVE.</td>
    <td>Mutable</td>
  </tr>
  <tr>
    <td>initials</td>
    <td>String</td>
    <td>“”</td>
    <td>Initials of the user name.</td>
    <td>Optional</td>
    <td>Mutable</td>
  </tr>
  <tr>
    <td>phone</td>
    <td>String</td>
    <td>“”</td>
    <td>Phone number of the user.</td>
    <td>Optional</td>
    <td>Mutable</td>
  </tr>
  <tr>
    <td>title</td>
    <td>String</td>
    <td>“”</td>
    <td>Job Title of the user.</td>
    <td>Optional</td>
    <td>Mutable</td>
  </tr>
  <tr>
    <td>company</td>
    <td>String</td>
    <td>“”</td>
    <td>Name of the company.</td>
    <td>Optional</td>
    <td>Mutable</td>
  </tr>
  <tr>
    <td>roles</td>
    <td>List&lt;String&gt;</td>
    <td></td>
    <td>User roles Values: ACCOUNT_ADMIN, PRIVACY_ADMI</td>
    <td>Optional</td>
    <td>Mutable</td>
  </tr>
</table>

**Sample user creation request body**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe_joesbikeshop@partnerdomain.com",
  "emailAlias":"johndoe@joesbikeshop.com",
  "accountId": "CBJCHBCAABAAyQTAasUNZ-lxF0gKyvZUaB6rQ3UfrKr1",
  "status": "ACTIVE",
  "initials": "JD",
  "phone": "12345678111",
  "title": "SDE",
  "company": "Joes Bike Shop",
  "roles": [
    "ACCOUNT_ADMIN",
    "PRIVACY_ADMIN"
  ]
}
```

#### Response

**Create User Response**

<br/>
<table border="1">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>userId</td>
    <td>String</td>
    <td>User ID</td>
  </tr>
</table>

#### Error

***Error codes for UserCreateErrorResponse***

<br/>
<table border="1" columnWidths="10,50,40">
  <tr>
    <th>HTTP Status Code</th>
    <th>Error Code</th>
    <th>Message</th>
  </tr>
  <tr>
    <td>400</td>
    <td>MISSING_REQUIRED_PARAMS</td>
    <td>Required parameter &lt;param name&gt; is missing.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>INVALID_PARAMETER</td>
    <td>The &lt;param_name&gt; value specified is invalid.</td>
  </tr>
  <tr>
    <td>401</td>
    <td>INVALID_ACCESS_TOKEN</td>
    <td>Token provided is invalid or has expired.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>MISSING_SCOPES</td>
    <td>The token does not contain the required scopes.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>AUTHENTICATION_FAILED</td>
    <td>Partner is not onboarded successfully.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>MAXIMUM_USERS_FOR_ACCOUNT_LIMIT_EXCEEDED</td>
    <td>Maximum active user limit reached for the account.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>PERMISSION_DENIED</td>
    <td>The API caller does not have permission to execute this operation.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>ACCOUNT_NOT_FOUND</td>
    <td>Account does not exist.</td>
  </tr>
  <tr>
    <td>409</td>
    <td>USER_ALREADY_EXISTS</td>
    <td>User with this email already exists.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>USER_COULD_NOT_BE_CREATED</td>
    <td>User could not be created.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>INTERNAL_SERVER_ERROR</td>
    <td>Some miscellaneous error has occurred.</td>
  </tr>
</table>

### PUT User

***Overview***

<br/>
<table border="1" columnWidths="30,70">
  <tr>
    <th>Item</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>HTTP Method</td>
    <td>PUT</td>
  </tr>
  <tr>
    <td>Endpoint Operation</td>
    <td>&#123;apiAccessPoint&#125;/api/gateway/signembed/v1/users/&lt;userId&gt;</td>
  </tr>
  <tr>
    <td>Authentication/Authorization</td>
    <td>
    <ul></ul>
    <li>Valid Technical Account Token or Admin User Token.</li>
    <li>Mandatory scopes in token: <span style="color: red;">sign_user_write</span>.</li>
    </td>
  </tr>
  <tr>
    <td>Audience</td>
    <td>Partner will call this API to update the user attributes in the customer’s account.</td>
  </tr>
  <tr>
    <td>Request Header</td>
    <td>Partner APIs Common Headers</td>
  </tr>
  <tr>
    <td>Request Object</td>
    <td>UpdateUserRequest</td>
  </tr>
  <tr>
    <td>Response Object</td>
    <td>No Content</td>
  </tr>
  <tr>
    <td>HTTP Status Code</td>
    <td>204</td>
  </tr>
  <tr>
    <td>Error Code</td>
    <td>ErrorCode - Update User</td>
  </tr>
</table>

#### Request

**Sample update user request body**

```json
{
  "id":"userId",
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe_joesbikeshop@partnerdomain.com",
  "emailAlias":"johndoe@joesbikeshop.com",
  "accountId": "CBJCHBCAABAAyQTAasUNZ-lxF0gKyvZUaB6rQ3UfrKr1",
  "status": "ACTIVE",
  "initials": "JD",
  "phone": "12345678111",
  "title": "SDE",
  "company": "Joes Bike Shop",
  "roles": [
    "ACCOUNT_ADMIN",
    "PRIVACY_ADMIN"
  ]
}
```

#### Errors

***Error codes for UserUpdateErrorResponse***

<br/>
<table border="1" columnWidths="10,50,40">
  <thead>
    <tr>
      <th>HTTP Status Code</th>
      <th>Error Code</th>
      <th>Message</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>400</td>
      <td>MISSING_REQUIRED_PARAMS</td>
      <td>Required parameter &lt;param name&gt; is missing.</td>
    </tr>
    <tr>
      <td>400</td>
      <td>INVALID_PARAMETER</td>
      <td>The &lt;param_name&gt; value specified is invalid.</td>
    </tr>
    <tr>
      <td>400</td>
      <td>INVALID_JSON</td>
      <td>An invalid JSON was specified.</td>
    </tr>
    <tr>
      <td>400</td>
      <td>INVALID_INPUT</td>
      <td>An invalid input is provided.</td>
    </tr>
    <tr>
      <td>401</td>
      <td>INVALID_ACCESS_TOKEN</td>
      <td>Access token provided is invalid or has expired.</td>
    </tr>
    <tr>
      <td>403</td>
      <td>MISSING_SCOPES</td>
      <td>The token does not contain the required scopes.</td>
    </tr>
    <tr>
      <td>403</td>
      <td>AUTHENTICATION_FAILED</td>
      <td>Partner is not onboarded successfully.</td>
    </tr>
    <tr>
      <td>403</td>
      <td>PERMISSION_DENIED</td>
      <td>The API caller does not have the permission to execute this operation.</td>
    </tr>
    <tr>
      <td>404</td>
      <td>ACCOUNT_NOT_FOUND</td>
      <td>Account does not exist.</td>
    </tr>
    <tr>
      <td>404</td>
      <td>USER_NOT_FOUND</td>
      <td>User does not exist.</td>
    </tr>
    <tr>
      <td>409</td>
      <td>USER_ALREADY_EXISTS</td>
      <td>User with this email already exists.</td>
    </tr>
    <tr>
      <td>500</td>
      <td>INTERNAL_SERVER_ERROR</td>
      <td>Some miscellaneous error has occurred.</td>
    </tr>
    <tr>
      <td>500</td>
      <td>USER_COULD_NOT_BE_UPDATED</td>
      <td>User could not be updated.</td>
    </tr>
  </tbody>
</table>

### GET User

***Overview***

<br/>
<table border="1" columnWidths="30,70">
  <tr>
    <th>Item</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>HTTP Method</td>
    <td>GET</td>
  </tr>
  <tr>
    <td>Endpoint Operation</td>
    <td>/api/gateway/signembed/v1/users/&lt;userId&gt;</td>
  </tr>
  <tr>
    <td>Authorization</td>
    <td>
    <ul>
    <li>Valid Technical Account Token or Admin User Token.</li>
    <li>Mandatory scopes in token: <span style="color: red;">sign_user_read</span>.</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td>Mandatory Scopes</td>
    <td>sign_user_read</td>
  </tr>
  <tr>
    <td>Audience</td>
    <td>Partner will call this API to fetch details of a user.</td>
  </tr>
  <tr>
    <td>Request Header</td>
    <td>Partner APIs Common Headers</td>
  </tr>
  <tr>
    <td>Request Object</td>
    <td></td>
  </tr>
  <tr>
    <td>Response Object</td>
    <td>Get User Response</td>
  </tr>
  <tr>
    <td>HTTP Status Code</td>
    <td>200</td>
  </tr>
  <tr>
    <td>Error Code</td>
    <td>ErrorCodes - Get User</td>
  </tr>
</table>

#### Response

***Get user response attributes***

<br/>
<table border="1" columnWidths="20,20,60">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>Id to uniquely identify a user.</td>
  </tr>
  <tr>
    <td>email</td>
    <td>String</td>
    <td>Email of the user.</td>
  </tr>
  <tr>
    <td>emailAlias</td>
    <td>String</td>
    <td>Email alias with customer domain displayed in the audit report.</td>
  </tr>
  <tr>
    <td>firstName</td>
    <td>String</td>
    <td>First Name of the User.</td>
  </tr>
  <tr>
    <td>lastName</td>
    <td>String</td>
    <td>Last Name of the User.</td>
  </tr>
  <tr>
    <td>accountId</td>
    <td>String</td>
    <td>Account ID of the user’s account.</td>
  </tr>
  <tr>
    <td>status</td>
    <td>String</td>
    <td>Status of the user.</td>
  </tr>
  <tr>
    <td>initials</td>
    <td>String</td>
    <td>Initials of the user name.</td>
  </tr>
  <tr>
    <td>phone</td>
    <td>String</td>
    <td>Phone number of the user.</td>
  </tr>
  <tr>
    <td>title</td>
    <td>String</td>
    <td>Job Title of the user.</td>
  </tr>
  <tr>
    <td>company</td>
    <td>String</td>
    <td>Name of the company.</td>
  </tr>
  <tr>
    <td>roles</td>
    <td>List&lt;String&gt;</td>
    <td>ACCOUNT_ADMIN, PRIVACY_ADMIN: User roles values.</td>
  </tr>
  <tr>
    <td>created</td>
    <td>Date</td>
    <td>User creation date in ISO format.</td>
  </tr>
</table>

**Sample get user response**

```json
{
  "id": "userId",
  "email": "johndoe_joesbikeshop@partnerdomain.com",
  "emailAlias": "johndoe@joesbikeshop.com",
  "firstName": "John",
  "lastName": "Doe",
  "accountId": "CBJCHBCAABAAuchiIJRXpJ-IyaFxK6QvRPrLEahWSuRW",
  "status": "ACTIVE",
  "initials": "JD",
  "company": "Joes Bike Shop",
  "roles": [
    "ACCOUNT_ADMIN",
    "PRIVACY_ADMIN"
  ],
  "created": "2023-01-17T12:27:08Z"
}
```

#### Errors

***Error codes for UserGetErrorResponse***

<br/>
<table border="1" columnWidths="10,40,50">
  <tr>
    <th>HTTP Status Code</th>
    <th>Error Code</th>
    <th>Message</th>
  </tr>
  <tr>
    <td>400</td>
    <td>INVALID_PARAMETER</td>
    <td>The &lt;param_name&gt; value specified is invalid.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>INVALID_ACCESS_TOKEN</td>
    <td>Access token provided is invalid or has expired.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>MISSING_SCOPES</td>
    <td>The token does not contain the required scopes.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>AUTHENTICATION_FAILED</td>
    <td>Partner is not onboarded successfully.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>PERMISSION_DENIED</td>
    <td>The API caller does not have the permission to execute this operation.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>USER_NOT_FOUND</td>
    <td>User does not exist.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>INTERNAL_SERVER_ERROR</td>
    <td>Some miscellaneous error has occurred.</td>
  </tr>
</table>

## Consumable APIs

Adobe Acrobat Sign supports a variety of authentication methods to ensure the security and integrity of electronic signatures. These methods range from simple, single-factor authentication to more complex, multi-factor authentication options - ensuring that organizations can manage and budget their use according to their security needs and compliance requirements, while also providing flexibility to choose the appropriate level of authentication for different types of transactions.

- Phone Authentication: A six-digit code is sent to the recipient’s phone via SMS or voice call, which must be entered to view the agreement. For details, [check Phone authentication](https://helpx.adobe.com/sign/config/send-settings/auth-methods/phone-auth.html).

- Knowledge-Based Authentication (KBA): This high-level authentication method is used mainly in financial institutions. It involves answering personal questions derived from public databases and is only available for recipients in the US. For details, [check Knowledge-based authentication](https://helpx.adobe.com/sign/config/send-settings/auth-methods/knowledge-based-auth.html).

- Government ID Authentication: This method requires the recipient to provide an image of a government-issued ID and a selfie for verification. For details, [check Government ID](https://helpx.adobe.com/sign/config/send-settings/auth-methods/government-id-auth.html).

<InlineAlert slots="text" />

Add-ons and transactions are referred to as “consumables” because they are resources that are used up or consumed as they are utilized. Each time a transaction is initiated, such as sending an electronic document for signature, it is considered consumed and is deducted from the user’s available transaction quota. Similarly, authentication services like Knowledge-Based Authentication or Phone Authentication are also treated as consumables, as they are used up on a per-recipient basis when employed in the signing process. This means that each time a recipient uses one of these methods, it counts against the total number of transactions available to the sender, which must be replenished as needed.

### Consumables summary on integration

<br/>
<table border="1" columnWidths="30,70">
  <thead>
    <tr>
      <th></th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTTP Method</td>
      <td>GET</td>
    </tr>
    <tr>
      <td>Endpoint Operation</td>
      <td>/v1/partners/me/consumableSummary</td>
    </tr>
    <tr>
      <td>Authentication/ Authorization</td>
      <td>Valid technical account token with ee.sign_group_oem</td>
    </tr>
    <tr>
      <td>Audience</td>
      <td>Partner will call this API to fetch count of consumables consumed within a given date range</td>
    </tr>
    <tr>
      <td>Request Header</td>
      <td>Partner APIs Common Headers</td>
    </tr>
    <tr>
      <td>Query Params</td>
      <td>FilterQueryParams</td>
    </tr>
    <tr>
      <td>Response Object</td>
      <td>ConsumableSummaryResponse</td>
    </tr>
    <tr>
      <td>HTTP Status Code</td>
      <td>200</td>
    </tr>
    <tr>
      <td>Error Code</td>
      <td>CommonErrorResponse</td>
    </tr>
  </tbody>
</table>

**FilterRequestParams**

<br/>
<table border="1" columnWidths="20,15,20,15,30">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Description</th>
    <th>Required</th>
    <th>Value Range</th>
  </tr>
  <tr>
    <td>startDate</td>
    <td>DateTime</td>
    <td>DateTime in ISO-8601 format with UTC timezone</td>
    <td>Yes</td>
    <td>startDate should not be earlier than 2025-01-01T00:00:00Z</td>
  </tr>
  <tr>
    <td>endDate</td>
    <td>DateTime</td>
    <td>DateTime in ISO-8601 format with UTC timezone</td>
    <td>Yes</td>
    <td>endDate should be greater than startDate but not more than 31 days from startDate. Ex: 2025-01-15T00:00:00Z</td>
  </tr>
</table>

**ConsumableSummaryResponse**

<br/>
<table border="1" columnWidths="40,40,20">
  <tr>
    <th>Type</th>
    <th>Description</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td>List&lt;ConsumableSummary&gt;</td>
    <td>List of ConsumableSummary</td>
    <td>[]</td>
  </tr>
</table>

**ConsumableSummary**

<br/>
<table border="1" columnWidths="20,20,30,30">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Description</th>
    <th>Sample Value</th>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>Type of consumables</td>
    <td>Ex: TXN, PHONE_AUTH</td>
  </tr>
  <tr>
    <td>count</td>
    <td>Long</td>
    <td>Count of consumable consumed within given range</td>
    <td>Ex: 100</td>
  </tr>
</table>

***ConsumableSummaryResponse***

```json
{
  "consumableSummary": [
    {
     "type": "KBA",
     "count": 1
    },
    {
     "type": "PHONE_AUTH",
     "count": 2
    }
  ]
}
```

### Get consumables summary on account level

<br/>
<table border="1" columnWidths="40,60">
  <tr>
    <th></th>
    <th>Value</th>
  </tr>
  <tr>
    <td>HTTP Method</td>
    <td>GET</td>
  </tr>
  <tr>
    <td>Endpoint Operation</td>
    <td>/v1/accounts/&#123;account_id&#125;/consumableSummary</td>
  </tr>
  <tr>
    <td>Authentication/ Authorization</td>
    <td>Valid Technical Account Token</td>
  </tr>
  <tr>
    <td>Mandatory Scopes in token</td>
    <td>sign_account_read, agreement_read</td>
  </tr>
  <tr>
    <td>Audience</td>
    <td>Partner will call this API to fetch details of consumables (agreements, add-ons) consumed within a given date range for a given account</td>
  </tr>
  <tr>
    <td>Request Header</td>
    <td>Partner APIs Common Headers</td>
  </tr>
  <tr>
    <td>Query Params</td>
    <td>AccountFilterQueryParams</td>
  </tr>
  <tr>
    <td>Response Object</td>
    <td>ConsumableSummaryDetailsResponse</td>
  </tr>
  <tr>
    <td>HTTP Status Code</td>
    <td>200</td>
  </tr>
  <tr>
    <td>Error Code</td>
    <td>CommonErrorResponse</td>
  </tr>
</table>

**ConsumableSummaryResponse**

```json
{
  "consumableSummary": [
      {
        "type": "KBA",
        "count": 1
      },
      {
        "type": "PHONE_AUTH",
        "count": 2
      }
  ]
}
```

### Get consumables summary details on account level

<br/>
<table border="1" columnWidths="40,60">
  <tr>
    <th></th>
    <th>Value</th>
  </tr>
  <tr>
    <td>HTTP Method</td>
    <td>GET</td>
  </tr>
  <tr>
    <td>Endpoint Operation</td>
    <td>/v1/accounts/&#123;account_id&#125;/consumableSummaryDetails</td>
  </tr>
  <tr>
    <td>Authentication/ Authorization</td>
    <td>Valid Technical Account Token</td>
  </tr>
  <tr>
    <td>Mandatory Scopes in token</td>
    <td>sign_account_read, agreement_read</td>
  </tr>
  <tr>
    <td>Audience</td>
    <td>Partner will call this API to fetch details of consumables (agreements, add-ons) consumed within a given date range for a given account</td>
  </tr>
  <tr>
    <td>Request Header</td>
    <td>Partner APIs Common Headers</td>
  </tr>
  <tr>
    <td>Query Params</td>
    <td>AccountFilterQueryParams</td>
  </tr>
  <tr>
    <td>Response Object</td>
    <td>ConsumableSummaryDetailsResponse</td>
  </tr>
  <tr>
    <td>HTTP Status Code</td>
    <td>200</td>
  </tr>
  <tr>
    <td>Error Code</td>
    <td>CommonErrorResponse</td>
  </tr>
</table>

**AccountFilterQueryParams**

<br/>
<table border="1" columnWidths="15,15,30,10,30">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Description</th>
    <th>Required</th>
    <th>Value Range</th>
  </tr>
  <tr>
    <td>startDate</td>
    <td>DateTime</td>
    <td>DateTime in ISO-8601 format with UTC timezone</td>
    <td>Yes</td>
    <td>startDate should not be earlier than 2025-01-01T00:00:00Z</td>
  </tr>
  <tr>
    <td>endDate</td>
    <td>DateTime</td>
    <td>DateTime in ISO-8601 format with UTC timezone</td>
    <td>Yes</td>
    <td>endDate should be greater than startDate but not more than 31 days from startDate. Ex: 2025-01-15T00:00:00Z</td>
  </tr>
  <tr>
    <td>pageSize</td>
    <td>Integer</td>
    <td>Count of records to be returned per specific call</td>
    <td>No</td>
    <td>—</td>
  </tr>
  <tr>
    <td>cursor</td>
    <td>String</td>
    <td>Reference to get next set of records with given pageSize. This is used to navigate through the pages. If not provided, returns the first page.</td>
    <td>No</td>
    <td></td>
  </tr>
</table>

**ConsumableSummaryDetailsResponse**

<br/>
<table border="1" columnWidths="40,40,20">
  <tr>
    <th>Type</th>
    <th>Description</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td>List&lt;ConsumableSummaryDetails&gt;</td>
    <td>List of ConsumableSummaryDetails</td>
    <td>[]</td>
  </tr>
</table>

**ConsumableSummaryDetails**

<br/>
<table border="1" columnWidths="20,25,30,25">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Description</th>
    <th>Sample Value</th>
  </tr>
  <tr>
    <td>agreementId</td>
    <td>String</td>
    <td>Secure agreement identifier</td>
    <td>Ex: CBJCHBCAABAA-N0tAR3aLID-u4R5RO</td>
  </tr>
  <tr>
    <td>createdDate</td>
    <td>DateTime</td>
    <td>Agreement created time recorded in the system in UTC format</td>
    <td></td>
  </tr>
  <tr>
    <td>addonDetails</td>
    <td>List&lt;AddonDetails&gt;</td>
    <td>List of secondary consumables like add-ons with their count</td>
    <td></td>
  </tr>
</table>

**AddonDetails**

<br/>
<table border="1" columnWidths="20,20,30,30">
  <tr>
    <th>Parameter Name</th>
    <th>Type</th>
    <th>Description</th>
    <th>Sample Value</th>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>Name of consumable</td>
    <td>Ex: PHONE_AUTH, KBA</td>
  </tr>
  <tr>
    <td>count</td>
    <td>Long</td>
    <td>Count of consumable consumed with an agreement</td>
    <td>Ex: 100</td>
  </tr>
</table>

**ConsumptionResponseReportResponseItemDetail**

```json
{
  "page": {
    "nextCursor": "xyzjbjdbjb"
  },
  "agreements": [
    {
      "id": "CBJCHBCAABAA-N0tAR3aLID-u4R5RO",
      "createdDate": 2025-01-10T00:00:15Z,
      "addonDetails": [
        {
          "type": "KBA",
          "count": 1
        },
        {
          "type": "PHONE_AUTH",
          "count": 2
        }
      ]
    }
  ]
}
```

### CommonErrorResponse

<br/>
<table border="1" columnWidths="10,40,50">
  <tr>
    <th>HTTP Code</th>
    <th>Error Code</th>
    <th>Message</th>
  </tr>
  <tr>
    <td>400</td>
    <td>BAD_REQUEST</td>
    <td>The request provided is invalid</td>
  </tr>
  <tr>
    <td>403</td>
    <td>PERMISSION_DENIED</td>
    <td>The API caller does not have the permission to execute this operation</td>
  </tr>
  <tr>
    <td>429</td>
    <td>TOO_MANY_REQUESTS</td>
    <td>The request rate limit has reached</td>
  </tr>
  <tr>
    <td>500</td>
    <td>MISC_SERVER_ERROR</td>
    <td>Some miscellaneous error has occurred.</td>
  </tr>
</table>

### Partner APIs Common Headers

<br/>
<table border="1" columnWidths="30,30,40">
  <tr>
    <th>Header Name</th>
    <th>Values</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Authorization</td>
    <td>Bearer &lt;Technical Account Token&gt;</td>
    <td>Technical account token that is generated by the partner</td>
  </tr>
  <tr>
    <td>content-type</td>
    <td>application/json</td>
    <td>Media type of the resource</td>
  </tr>
  <tr>
    <td>x-request-id</td>
    <td>String</td>
    <td>A unique string value needed to track a given request</td>
  </tr>
</table>
