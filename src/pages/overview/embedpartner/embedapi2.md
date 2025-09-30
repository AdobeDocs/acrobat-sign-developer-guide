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
- Create and assign roles for partner's users (e.g. developers; not customers).
- Set up Federated directory and define Identity Provider (IdP).
- Claim domains (e.g. 'oempartner.com') for use with all customers (e.g. [bob.smith_joesbikeshop@oempartner.com](mailto:bob.smith_joesbikeshop%40oempartner.com))

<InlineAlert slots="text" />

Adobe creates and assigns a Sign 'channel' for exclusive partner use. All customer accounts will inherit from this channel's settings. You will collaborate with the Acrobat Sign partner team to define set of 'global' settings for all of your customers.

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

Acrobat Sign APIs come with location awareness, so it's important to use the correct geographic access point when calling resource-based APIs to ensure success. We highly recommend that clients store the base endpoint URL for each environment. This way, you can retrieve the appropriate geographic access points ([https://api.na1.adobesign.com](https://api.na1.adobesign.com), [https://api.eu1.adobesign.com](https://api.eu1.adobesign.com) for your resource-based API calls. Before making any API calls, make sure to include the valid access point returned as part of the base endpoint API in your request.

***Base API Host***

| Environment | Base API Host |
|-------------|---------------|
| Sandbox Production | [https://api.adobesignsandbox.com](https://api.adobesignsandbox.com) |
| Production | [https://api.adobesign.com](https://api.adobesign.com) |

***Overview***

| Item | Value |
|------|-------|
| HTTP Method | GET |
| Endpoint Operation | `{Base Api Host}/api/rest/v6/baseUris` |
| Description | Very first API call to fetch geographical aware access points before you can call further APIs. |
| Authentication | Valid user/technical account token |
| Request Header | Auth API Headers |
| Response Object | BaseUri Response |
| HTTP Status Code | 200 |
| Error Code | BaseUri Error Codes |

***Response Object***

| Parameter Name | Type | Description |
|----------------|------|-------------|
| apiAccessPoint | String | The access point from where other APIs need to be accessed. In case other APIs are accessed from a different endpoint, it will be considered an invalid request. |
| webAccessPoint | String | Web access point acting as base host domain for all web-based calls. |

**BaseUri: Sample Response**

```json
{
    "apiAccessPoint": "https://api.na1.echosign.com/",
    "webAccessPoint": "https://secure.na1.echosign.com/"
}
```

**BaseUri: Error Response**

***Error codes***

| HTTP Status Code | Error Code | Message |
|------------------|------------|---------|
| 401 | INVALID_ACCESS_TOKEN | Access token provided is invalid or has expired. |
| 401 | NO_AUTHORIZATION_HEADER | Authorization header not provided. |

## Authentication: Token APIs

Call these APIs via the AdobeSignAuthService for user token generation and validation:

- POST Token: Exchange technical account token for a user token.
- POST Validate Token: Validate Sign Embed User Token.

### Common auth token API attributes

***Common header attributes***

| Header Name | Values | Description |
|-------------|--------|-------------|
| content-type | application/x-www-form-urlencoded | The resource media type. |
| x-request-id | String | A string value needed to track a given request. |

### Create an Embed user token

***Overview***

| Item | Value |
|------|-------|
| HTTP Method | POST |
| Endpoint Operation | {apiAccessPoint}/api/gateway/adobesignauthservice/api/v1/token |
| Description | API to generate Sign Embed user Token. |
| Request Header | Auth API Headers |
| Request Object | Create token parameters |
| Response Object | Create token response |
| HTTP Status Code | 200 |
| Error Code | Generate Token - Error response |

#### Request

***Request Parameters***

| Parameter Name | Type | Default Value | Description | Mandatory Fields by POST |
|----------------|------|---------------|-------------|--------------------------|
| client_id | String | | IMS Client Id | Required |
| client_secret | String | | IMS client secret | Required |
| grant_type | String | | Auth Grant type | Required |
| subject_token | String | | Unsigned JWT token of the user with email as payload. Refer below section for more details. | Required |
| subject_token_type | String | | jwt: subject token type | Required |
| actor_token_type | String | | access_token - actor Token type | Required |
| actor_token | String | | Technical account token with mandatory scope: sign_oem_user_impersonate. | Required |
| scope | String | | Scopes requested for the user access token. It must be a subset of the scopes that are available in the technical account token: openid, AdobeID, agreement_read, agreement_sign, agreement_write, agreement_send, agreement_retention, agreement_vault, sign_library_read, sign_library_write, sign_library_retention, widget_read, widget_write, workflow_read, workflow_write, sign_user_write, sign_user_read, sign_user_login, sign_webhook_read, sign_webhook_write, sign_webhook_retention. The following scopes are not allowed for user access token: sign_account_read, sign_account_write, sign_oem_user_impersonate, ee.GROUP_SIGN_OEM, user_management_sdk. | Required |

**Generating Subject Token**

Subject identifies the principal for which the JWT token [https://jwt.io/introduction](https://jwt.io/introduction) belongs & access token is being minted by exchanging technical account token(actor token). Subject is scoped to be locally unique in context of authorization server identified by email. The jwt token belonging to this subject is termed subject_token which is an unsigned one and has "email" as claim.

**Sample subject token (jwt)**

```json
<example-jwt-token>

Payload:

{
  "email": "subject_email@signembedpartner.com"
}
```

For quick testing, copy this sample value and paste in jwt.io, Navigate to right hand payload section & update "email". The jwt token at left side will be updated automatically. You can use this as subject token in token exchange api

**How to generate programmatically?**

You can use libraries [https://jwt.io/libraries](https://jwt.io/libraries) based on different languages to generate an unsigned subject token.

**Sample Request parameters**

```text
client_id:<IMS_client_id>
client_secret:<client_secret>
grant_type:urn:ietf:params:oauth:grant-type:token-exchange
subject_token:<example-jwt-token>
subject_token_type:jwt
actor_token_type:access_token
actor_token:<technical_account_token>
scope:sign_webhook_retention,widget_write,workflow_read,agreement_send,agreement_sign,agreement_write,widget_read,sign_webhook_read,sign_user_write,agreement_read,agreement_retention,sign_user_read,sign_library_read,agreement_vault,sign_user_login,sign_webhook_write,sign_library_retention,sign_library_write,workflow_write
```

#### Response

***Response Parameters***


| Parameter Name | Type | Description |
|---|---|---|
| access_token | String | User Access Token value |
| token_type | String | Token type: access_token |
| expires_in | Long | Duration before expiry in seconds. The user token expires in 5 minutes. |
| scope | String | Scope available in the user access token. |


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


| HTTP Status Code | Error Code | Message |
|---|---|---|
| 400 | BAD_REQUEST | The request provided is invalid. |
| 400 | INVALID_REQUEST | &lt;required param name&gt; is missing or invalid. |
| 401 | INVALID_AUTHENTICATING_TOKEN | actor_token is missing or invalid. |
| 403 | AUTHENTICATION_FAILED | Partner is not onboarded successfully. |
| 403 | PERMISSION_DENIED | The API caller does not have the permission to execute this operation. |
| 500 | INTERNAL_SERVER_ERROR | Some miscellaneous error has occurred. |


### Validate Embed User token

***Overview***


| Item | Value |
|---|---|
| HTTP Method | POST |
| Endpoint Operation | {apiAccessPoint}/api/gateway/adobesignauthservice/api/v1/validate_token |
| Description | API to check the validity of the user token. |
| Request Header | Auth API Headers |
| Request Object | Validate token request |
| Response Object | Validate token Response |
| HTTP Status Code | 200 |
| Error Code | Error Response - Validate Token |


#### Request

***Request Parameters***

| Parameter Name | Type | Default Value | Description | Mandatory Fields by POST |
|----------------|------|---------------|-------------|--------------------------|
| client_id | String | | IMS Client Id | Required |
| token | String | | User access token | Required |
| type | String | | Token type | Required |

**Sample request**

```text
client_id:<IMS_client_id>
token:<user_access_token>
type:access_token
```

#### Response

***Response Parameters***


| Parameter Name | Type | Description |
|---|---|---|
| valid | boolean | Returns if the token is valid or not. |
| expires_at | long | Token Expiry time in Epoc sec. |


**Sample Response**

```json
{
    "valid": true,
    "expires_at": 1673987741
}
```

#### Errors

***Error codes for validate account***


| HTTP Status Code | Error Code | Message |
|---|---|---|
| 400 | BAD_REQUEST | The request provided is invalid. |
| 400 | INVALID_REQUEST | &lt;required param name&gt; is missing or invalid. |
| 500 | INTERNAL_SERVER_ERROR | Some miscellaneous error has occurred. |


#### Common attributes

***Account & User APIs: Common headers for Partner APIs***


| Header Name | Value | Description |
|---|---|---|
| Authorization | Bearer &lt;Technical Account Token&gt; | Technical account token that is generated by the partner and the Partner is onboarded beforehand. |
| content-type | application/json | Media type of the resource. |
| x-request-id | String | A string value needed to track a given request. |


***Common headers for Auth token APIs***


| Header Name | Value | Description |
|---|---|---|
| content-type | application/x-www-form-urlencoded | Media type of the resource. |
| x-request-id | String | A string value needed to track a given request. |


## Register APIs

Register APIs allow you to register your partner application with Acrobat Sign as part of the on-boarding process. Call this API directly with your technical account token for each technical account. You must also do this in the sandbox environment as well.

You can call the following API to register your partner application by directly using Technical account token:

- Post Partners - Register the partner with Acrobat Sign

### Create partner

***Overview***


| Item | Value |
|---|---|
| HTTP Method | POST |
| Endpoint Operation | {apiAccessPoint}/api/gateway/signembed/v1/partners |
| Authentication/Authorization | Values:

    Valid Technical Account Token
    Mandatory scopes in token: sign_user_write, sign_user_read, sign_account_write, sign_account_read, sign_oem_user_impersonate |
| Description | API to register the Partner with Acrobat Sign. This would be called once as part of Partner onboarding. |
| Request Header | Partner APIs Common Headers |
| Request Object | RegisterPartnerRequest |
| Response Object | RegisterPartnerResponse |
| HTTP Status Code | 201 |
| Error Code | Error Response - Register Partner |


#### Request

***Register Partner request parameters***


| Parameter Name | Type | Default | Description | Requirement | Validations/Comments |
|---|---|---|---|---|---|
| name | String | NA | Identifiable partner name | Required |  |
| domains | List&lt;String&gt; | List of all the domains claimed/trusted by the partner org | List of domains claimed/trusted by the partner organization | Optional | domain regex validation Validated against the domains claimed/trusted by the partner org |


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


| Parameter Name | Type | Default | Description |
|---|---|---|---|
| imsClientId | String |  | The client ID associated with the technical account |
| created | Date |  | Created date in ISO format |
| domains | List&lt;String&gt; |  | List of domains claimed/trusted by the partner |
| id | String |  | Id for the Partner |
| modified | Date |  | Last modified date in ISO format |
| name | String |  | Identifiable partner name |
| orgGuid | String |  | Id of the IMS organization |
| status | String | INACTIVE | Status of the Partner |
| technicalAccountId | String |  | Technical account ID associated with the technical account |
| updatedBy | String |  | Technical account ID associated with the technical account |


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


| HTTP Status Code | Error Code | Message |
|---|---|---|
| 400 | INVALID_PARAMETER | The &lt;param_name&gt; value specified is invalid. |
| 400 | DOMAIN_NOT_ELIGIBLE | One or more domains are not allowed for the given partner. |
| 400 | INVALID_JSON | An invalid JSON was specified. |
| 400 | MISSING_REQUIRED_PARAM | Required parameter &lt;param name&gt; is missing. |
| 401 | INVALID_ACCESS_TOKEN | Access token provided is invalid or has expired. |
| 403 | MISSING_SCOPES | The token does not contain the required scopes. |
| 404 | ORG_DOMAINS_NOT_FOUND | Org does not have any owned or trusted federated domains. |
| 409 | TECHNICAL_ACCOUNT_ID_ALREADY_EXISTS | Partner already exists for this Technical Account Id. |
| 500 | INTERNAL_SERVER_ERROR | Some miscellaneous error has occurred. |


## Account APIs

Call these APIs directly using a technical account token to create or update an account.

- POST Account - To create a new account.
- PUT Account - To update a new account.
- GET Account - To fetch an account info.
- GET All Accounts - To fetch all accounts in a channel.

### Common account API header attributes

***Common header attributes***


| Header Name | Values | Description |
|---|---|---|
| Authorization | Bearer &lt;Technical Account Token&gt; | Technical account token that is generated by the partner and the Partner is onboarded beforehand. |
| content-type | application/json | The resource media type. |
| x-request-id | String | A string value needed to track a given request |


### Create Account

***Overview***


| Item | Value |
|---|---|
| HTTP Method | POST |
| Endpoint Operation | {apiAccessPoint}/api/gateway/signembed/v1/accounts |
| Authentication/Authorization | Valid technical account token. Required scopes in token: sign_account_write. |
| Audience | Partner will call this API to create new accounts for their customers. |
| Request Header | Partner APIs Common Headers |
| Request Object | AccountProvisionRequest |
| Response Object | AccountProvisionResponse |
| HTTP Status Code | 201 |
| Error Code | Error Response: Create Account |


#### Request

***Account create-update request parameters***


| Parameter Name | Type | Default | Description | Needed in POST/PUT | Updatable by PUT |
|---|---|---|---|---|---|
| id | String | NA | Account ID of the Account | Required and Permitted only in PUT | Immutable |
| name | String | NA | Name of the account. The name must only include numbers and letters. No special characters or spaces are allowed. | Required | mutable |
| company | String | "" | Name of the company | Optional | mutable |
| consumables | List&lt;Consumable&gt; | [ ] | List of Consumables | Optional | mutable |
| countryCode | String | NA | Target Country for Account Provisioning. Ex US, FR, GB | Required | Immutable |


***Consumable***


| Parameter Name | Type | Default Value | Description | Needed in POST/PUT | Updatable by PUT |
|---|---|---|---|---|---|
| type | String | NA | Name of consumable supported in Embed Accounts.

    KBA_ANNUAL
    PHONE_AUTH_ANNUAL
    SEAT | Required | mutable |
| attributes | Object | N/A | Properties for each consumable type | Required | mutable |


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


| Parameter Name | REST Object | Description |
|---|---|---|
| accountId | String | Account ID |


**Sample account creation response**

```json
{
  "accountId" : "2aabnucbm3xsdfweldvwporqvjqzxdkjorbikaifuiwufwihs*"
}
```

#### Errors

***Error codes for AccountCreateErrorResponse***


| HTTP Status Code | Error code | Message |
|---|---|---|
| 400 | MISSING_REQUIRED_PARAMS | Required parameter &lt;param name&gt; is missing. |
| 400 | INVALID_JSON | An invalid JSON was specified. |
| 400 | INVALID_PARAMETER | The &lt;param_name&gt; value specified is invalid. |
| 401 | INVALID_ACCESS_TOKEN | Access token provided is invalid or has expired. |
| 403 | MISSING_SCOPES | The token does not contain the required scopes. |
| 403 | AUTHENTICATION_FAILED | Partner is not onboarded successfully. |
| 409 | ACCOUNT_ALREADY_EXISTS | Account with this name already exists. |
| 500 | INTERNAL_SERVER_ERROR | Some miscellaneous error has occurred. |
| 500 | ACCOUNT_COULD_NOT_BE_CONFIGURED | Account with accountId `{account id}` could not be configured properly. |


### Update Account

***Overview***


| Item | Value |
|---|---|
| HTTP Method | PUT |
| Endpoint Operation | {apiAccessPoint}/api/gateway/signembed/v1/accounts/&lt;accountId&gt; |
| Authentication/Authorization | Valid technical account token. Required scopes: sign_account_write |
| Audience | Partner will call this API to update existing Embed account. |
| Request Header | Partner APIs Common Headers |
| Request Object | AccountUpdateRequest |
| Response Object | No Content |
| HTTP Status Code | 204 |
| Error Code | ErrorCodes - Update Account |


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


| HTTP Status Code | Error code | Message |
|---|---|---|
| 400 | MISSING_REQUIRED_PARAMS | Missing required parameters &lt;required param name&gt;. |
| 400 | INVALID_PARAMETER | The &lt;param_name&gt; value specified is invalid. |
| 400 | INVALID_INPUT | An invalid input is provided. |
| 400 | INVALID_JSON | An invalid JSON was specified. |
| 401 | INVALID_ACCESS_TOKEN | Access token provided is invalid or has expired. |
| 403 | MISSING_SCOPES | The token does not contain the required scopes. |
| 403 | AUTHENTICATION_FAILED | Partner is not onboarded successfully. |
| 403 | PERMISSION_DENIED | The API caller does not have the permission to execute this operation. |
| 404 | ACCOUNT_NOT_FOUND | Account does not exist. |
| 409 | ACCOUNT_ALREADY_EXISTS | An account with this name already exists. |
| 500 | INTERNAL_SERVER_ERROR | Some miscellaneous error has occurred. |


### Get Account

***Overview***


| Item | Value |
|---|---|
| HTTP Method | GET |
| Endpoint Operation | {apiAccessPoint}/api/gateway/signembed/v1/accounts/&lt;accountId&gt; |
| Authorization | Valid technical account token. Required Scopes in token: sign_account_read |
| Audience | Partner will call this API to fetch account details for their customers. |
| Request Header | Partner APIs Common Headers |
| Request Object | (No content provided) |
| Response Object | GetAccountResponse |
| HTTP Status Code | 200 |
| Error Code | ErrorCodes - get Account |


#### Response

***Response Object GetAccountResponse***


| Parameter Name | Type | Description |
|---|---|---|
| id | String | account ID |
| name | String | Name of the account |
| company | String | Name of the company |
| consumables | List&lt;Consumable&gt; | List of Consumables with values. For example, KBA, PHONE_AUTH, and SEATS. |
| countryCode | String | Target Country for Account Provisioning. Ex US, FR, GB |
| created | Date | Account created date in ISO format. |


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


| HTTP Status Code | Error code | Message |
|---|---|---|
| 400 | INVALID_INPUT | An invalid input is provided. |
| 401 | INVALID_ACCESS_TOKEN | Access token provided is invalid or has expired. |
| 403 | MISSING_SCOPES | The token does not contain the required scopes. |
| 403 | AUTHENTICATION_FAILED | Partner is not onboarded successfully. |
| 403 | PERMISSION_DENIED | The API caller does not have the permission to execute this operation. |
| 404 | ACCOUNT_NOT_FOUND | Account does not exist. |
| 500 | INTERNAL_SERVER_ERROR | Some miscellaneous error has occurred. |


### Get All Accounts

***Overview***


| Item | Value |
|---|---|
| HTTP Method | GET |
| Endpoint Operation | /v1/accounts?isLegacy={true/false}&pagesSize={}&pageNumber={} |
| Authorization | Valid Technical Account Token.
    Mandatory Scope in token - sign_account_read |
| Audience | Partner will call this API to fetch paginated list of accounts for all their customers. |
| Request Header | Partner APIs Common Headers |
| Request Object | GetAccountsResponse |
| HTTP Status Code | 200 |
| Error Code | ErrorCodes - get Account |


***Query Params***


| Parameter Name | Type | Description | Needed | Data Range |
|---|---|---|---|---|
| pageNumber | Integer | pageNumber to navigate through pages | Optional | default:0

        If pageNumber is less than 0, throw INVALID_PARAMETER exception |
| pageSize | Integer | pageSize to limit the number of records that will be fetched. | Optional | default:20 max:100

        If pageSize is less than 1, throw INVALID_PARAMETER exception
        If pageSize is more than 100, throw PAGE_SIZE_LIMIT_EXCEEDED exception |
| isLegacy | boolean | Return legacy accounts that are on old Sign Embed Models. | Optional | default:false

        If isLegacy value is not a boolean, throw INVALID_PARAMETER exception |


#### Response

***Response Object GetAccountResponse***


| Parameter Name | Type | Description |
|---|---|---|
| accountList | List&lt;Account&gt; | List of Account details. |


***Account***


| Parameter Name | Type | Description |
|---|---|---|
| accountId | String | Secure Account id to identify an Account |
| name | String | Name of the account |
| created | Date | Account created date in ISO format. |


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


| HTTP Status Code | Error code | Message |
|---|---|---|
| 400 | INVALID_PARAMETER | The pageSize specified must be greater than or equal to 1. |
| 400 | PAGE_SIZE_LIMIT_EXCEEDED | Page size has exceeded the maximum length of 100. |
| 401 | INVALID_TOKEN | The token provided is invalid or expired. |
| 401 | MISSING_SCOPES | The token does not contain the required scopes. |
| 401 | AUTHENTICATION_FAILED | Partner is not onboarded successfully. |
| 403 | PERMISSION_DENIED | The API caller does not have the permission to execute this operation. |
| 500 | INTERNAL_SERVER_ERROR | Some miscellaneous error has occurred. |


## User APIs

Call these APIs directly using a technical account token to create or update an account and users.

- POST User - To add a user to an account.
- PUT User - To update a user.
- GET User - To fetch user info.

### Common user API header attributes

Common user header attributes are identical to the Account APIs.

### POST user

***Overview***


| Item | Value |
|---|---|
| HTTP Method | POST |
| Endpoint Operation | {apiAccessPoint}/api/gateway/signembed/v1/users |
| Authentication/ Authorization | Valid Technical Account Token or Sign Embed user Admin token. Mandatory Scopes required in token: sign_user_write. |
| Audience | Partner will call this API to add a new user to their customer's account. |
| Request Header | Partner APIs Common Headers |
| Request Object | Create User Request |
| Response Object | Create User Response |
| HTTP Status Code | 201 |
| Error Code | ErrorCodes - Create User |


#### Request

***Create-update user request parameters***


| Parameter Name | Type | Default Value | Description | Mandatory Fields by POST/PUT | Update Allowed via PUT |
|---|---|---|---|---|---|
| id | String |  | Id to uniquely identify a user. | Required and permitted only in a PUT call | Immutable |
| email | String |  | Email of the user. | Required | Mutable |
| emailAlias | String |  | Email alias with customer domain displayed in the audit report. | Optional | Mutable |
| firstName | String |  | First Name of the User. | Required | Mutable |
| lastName | String |  | Last Name of the User. | Required | Mutable |
| accountId | String |  | Account ID where the user needs to be added. | Required. Optional if User token is used for Authentication. | Immutable |
| status | String | ACTIVE | Status of the user. | Optional. Not supported in POST. Defaults to ACTIVE. | Mutable |
| initials | String | " | Initials of the user name. | Optional | Mutable |
| phone | String | " | Phone number of the user. | Optional | Mutable |
| title | String | " | Job Title of the user. | Optional | Mutable |
| company | String | " | Name of the company. | Optional | Mutable |
| roles | List&lt;String&gt; |  | User roles Values: ACCOUNT_ADMIN, PRIVACY_ADMI | Optional | Mutable |


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


| Parameter Name | Type | Description |
|---|---|---|
| userId | String | User ID |


#### Error

***Error codes for UserCreateErrorResponse***


| HTTP Status Code | Error Code | Message |
|---|---|---|
| 400 | MISSING_REQUIRED_PARAMS | Required parameter &lt;param name&gt; is missing. |
| 400 | INVALID_PARAMETER | The &lt;param_name&gt; value specified is invalid. |
| 401 | INVALID_ACCESS_TOKEN | Token provided is invalid or has expired. |
| 403 | MISSING_SCOPES | The token does not contain the required scopes. |
| 403 | AUTHENTICATION_FAILED | Partner is not onboarded successfully. |
| 403 | MAXIMUM_USERS_FOR_ACCOUNT_LIMIT_EXCEEDED | Maximum active user limit reached for the account. |
| 403 | PERMISSION_DENIED | The API caller does not have permission to execute this operation. |
| 404 | ACCOUNT_NOT_FOUND | Account does not exist. |
| 409 | USER_ALREADY_EXISTS | User with this email already exists. |
| 500 | USER_COULD_NOT_BE_CREATED | User could not be created. |
| 500 | INTERNAL_SERVER_ERROR | Some miscellaneous error has occurred. |


### PUT User

***Overview***


| Item | Value |
|---|---|
| HTTP Method | PUT |
| Endpoint Operation | {apiAccessPoint}/api/gateway/signembed/v1/users/&lt;userId&gt; |
| Authentication/Authorization | Valid Technical Account Token or Admin User Token.
    Mandatory scopes in token: sign_user_write. |
| Audience | Partner will call this API to update the user attributes in the customer's account. |
| Request Header | Partner APIs Common Headers |
| Request Object | UpdateUserRequest |
| Response Object | No Content |
| HTTP Status Code | 204 |
| Error Code | ErrorCode - Update User |


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


| HTTP Status Code | Error Code | Message |
|---|---|---|
| 400 | MISSING_REQUIRED_PARAMS | Required parameter &lt;param name&gt; is missing. |
| 400 | INVALID_PARAMETER | The &lt;param_name&gt; value specified is invalid. |
| 400 | INVALID_JSON | An invalid JSON was specified. |
| 400 | INVALID_INPUT | An invalid input is provided. |
| 401 | INVALID_ACCESS_TOKEN | Access token provided is invalid or has expired. |
| 403 | MISSING_SCOPES | The token does not contain the required scopes. |
| 403 | AUTHENTICATION_FAILED | Partner is not onboarded successfully. |
| 403 | PERMISSION_DENIED | The API caller does not have the permission to execute this operation. |
| 404 | ACCOUNT_NOT_FOUND | Account does not exist. |
| 404 | USER_NOT_FOUND | User does not exist. |
| 409 | USER_ALREADY_EXISTS | User with this email already exists. |
| 500 | INTERNAL_SERVER_ERROR | Some miscellaneous error has occurred. |
| 500 | USER_COULD_NOT_BE_UPDATED | User could not be updated. |


### GET User

***Overview***


| Item | Value |
|---|---|
| HTTP Method | GET |
| Endpoint Operation | /api/gateway/signembed/v1/users/&lt;userId&gt; |
| Authorization | Valid Technical Account Token or Admin User Token.
    Mandatory scopes in token: sign_user_read. |
| Mandatory Scopes | sign_user_read |
| Audience | Partner will call this API to fetch details of a user. |
| Request Header | Partner APIs Common Headers |
| Request Object |  |
| Response Object | Get User Response |
| HTTP Status Code | 200 |
| Error Code | ErrorCodes - Get User |


#### Response

***Get user response attributes***


| Parameter Name | Type | Description |
|---|---|---|
| id | String | Id to uniquely identify a user. |
| email | String | Email of the user. |
| emailAlias | String | Email alias with customer domain displayed in the audit report. |
| firstName | String | First Name of the User. |
| lastName | String | Last Name of the User. |
| accountId | String | Account ID of the user's account. |
| status | String | Status of the user. |
| initials | String | Initials of the user name. |
| phone | String | Phone number of the user. |
| title | String | Job Title of the user. |
| company | String | Name of the company. |
| roles | List&lt;String&gt; | ACCOUNT_ADMIN, PRIVACY_ADMIN: User roles values. |
| created | Date | User creation date in ISO format. |


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


| HTTP Status Code | Error Code | Message |
|---|---|---|
| 400 | INVALID_PARAMETER | The &lt;param_name&gt; value specified is invalid. |
| 400 | INVALID_ACCESS_TOKEN | Access token provided is invalid or has expired. |
| 403 | MISSING_SCOPES | The token does not contain the required scopes. |
| 403 | AUTHENTICATION_FAILED | Partner is not onboarded successfully. |
| 403 | PERMISSION_DENIED | The API caller does not have the permission to execute this operation. |
| 404 | USER_NOT_FOUND | User does not exist. |
| 500 | INTERNAL_SERVER_ERROR | Some miscellaneous error has occurred. |


## Consumable APIs

Adobe Acrobat Sign supports a variety of authentication methods to ensure the security and integrity of electronic signatures. These methods range from simple, single-factor authentication to more complex, multi-factor authentication options - ensuring that organizations can manage and budget their use according to their security needs and compliance requirements, while also providing flexibility to choose the appropriate level of authentication for different types of transactions.

- Phone Authentication: A six-digit code is sent to the recipient's phone via SMS or voice call, which must be entered to view the agreement. For details, [check Phone authentication](https://helpx.adobe.com/sign/config/send-settings/auth-methods/phone-auth.html).

- Knowledge-Based Authentication (KBA): This high-level authentication method is used mainly in financial institutions. It involves answering personal questions derived from public databases and is only available for recipients in the US. For details, [check Knowledge-based authentication](https://helpx.adobe.com/sign/config/send-settings/auth-methods/knowledge-based-auth.html).

- Government ID Authentication: This method requires the recipient to provide an image of a government-issued ID and a selfie for verification. For details, [check Government ID](https://helpx.adobe.com/sign/config/send-settings/auth-methods/government-id-auth.html).

<InlineAlert slots="text" />

Add-ons and transactions are referred to as "consumables" because they are resources that are used up or consumed as they are utilized. Each time a transaction is initiated, such as sending an electronic document for signature, it is considered consumed and is deducted from the user's available transaction quota. Similarly, authentication services like Knowledge-Based Authentication or Phone Authentication are also treated as consumables, as they are used up on a per-recipient basis when employed in the signing process. This means that each time a recipient uses one of these methods, it counts against the total number of transactions available to the sender, which must be replenished as needed.

### Consumables summary on integration


|  | Value |
|---|---|
| HTTP Method | GET |
| Endpoint Operation | /v1/partners/me/consumableSummary |
| Authentication/ Authorization | Valid technical account token with ee.sign_group_oem |
| Audience | Partner will call this API to fetch count of consumables consumed within a given date range |
| Request Header | Partner APIs Common Headers |
| Query Params | FilterQueryParams |
| Response Object | ConsumableSummaryResponse |
| HTTP Status Code | 200 |
| Error Code | CommonErrorResponse |


**FilterRequestParams**


| Parameter Name | Type | Description | Required | Value Range |
|---|---|---|---|---|
| startDate | DateTime | DateTime in ISO-8601 format with UTC timezone | Yes | startDate should not be earlier than 2025-01-01T00:00:00Z |
| endDate | DateTime | DateTime in ISO-8601 format with UTC timezone | Yes | endDate should be greater than startDate but not more than 31 days from startDate. Ex: 2025-01-15T00:00:00Z |


**ConsumableSummaryResponse**


| Type | Description | Default Value |
|---|---|---|
| List&lt;ConsumableSummary&gt; | List of ConsumableSummary | [] |


**ConsumableSummary**


| Parameter Name | Type | Description | Sample Value |
|---|---|---|---|
| type | String | Type of consumables | Ex: TXN, PHONE_AUTH |
| count | Long | Count of consumable consumed within given range | Ex: 100 |


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


|  | Value |
|---|---|
| HTTP Method | GET |
| Endpoint Operation | /v1/accounts/{account_id}/consumableSummary |
| Authentication/ Authorization | Valid Technical Account Token |
| Mandatory Scopes in token | sign_account_read, agreement_read |
| Audience | Partner will call this API to fetch details of consumables (agreements, add-ons) consumed within a given date range for a given account |
| Request Header | Partner APIs Common Headers |
| Query Params | AccountFilterQueryParams |
| Response Object | ConsumableSummaryDetailsResponse |
| HTTP Status Code | 200 |
| Error Code | CommonErrorResponse |


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


|  | Value |
|---|---|
| HTTP Method | GET |
| Endpoint Operation | /v1/accounts/{account_id}/consumableSummaryDetails |
| Authentication/ Authorization | Valid Technical Account Token |
| Mandatory Scopes in token | sign_account_read, agreement_read |
| Audience | Partner will call this API to fetch details of consumables (agreements, add-ons) consumed within a given date range for a given account |
| Request Header | Partner APIs Common Headers |
| Query Params | AccountFilterQueryParams |
| Response Object | ConsumableSummaryDetailsResponse |
| HTTP Status Code | 200 |
| Error Code | CommonErrorResponse |


**AccountFilterQueryParams**


| Parameter Name | Type | Description | Required | Value Range |
|---|---|---|---|---|
| startDate | DateTime | DateTime in ISO-8601 format with UTC timezone | Yes | startDate should not be earlier than 2025-01-01T00:00:00Z |
| endDate | DateTime | DateTime in ISO-8601 format with UTC timezone | Yes | endDate should be greater than startDate but not more than 31 days from startDate. Ex: 2025-01-15T00:00:00Z |
| pageSize | Integer | Count of records to be returned per specific call | No | — |
| cursor | String | Reference to get next set of records with given pageSize. This is used to navigate through the pages. If not provided, returns the first page. | No |  |


**ConsumableSummaryDetailsResponse**


| Type | Description | Default Value |
|---|---|---|
| List&lt;ConsumableSummaryDetails&gt; | List of ConsumableSummaryDetails | [] |


**ConsumableSummaryDetails**


| Parameter Name | Type | Description | Sample Value |
|---|---|---|---|
| agreementId | String | Secure agreement identifier | Ex: CBJCHBCAABAA-N0tAR3aLID-u4R5RO |
| createdDate | DateTime | Agreement created time recorded in the system in UTC format |  |
| addonDetails | List&lt;AddonDetails&gt; | List of secondary consumables like add-ons with their count |  |


**AddonDetails**


| Parameter Name | Type | Description | Sample Value |
|---|---|---|---|
| type | String | Name of consumable | Ex: PHONE_AUTH, KBA |
| count | Long | Count of consumable consumed with an agreement | Ex: 100 |


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


| HTTP Code | Error Code | Message |
|---|---|---|
| 400 | BAD_REQUEST | The request provided is invalid |
| 403 | PERMISSION_DENIED | The API caller does not have the permission to execute this operation |
| 429 | TOO_MANY_REQUESTS | The request rate limit has reached |
| 500 | MISC_SERVER_ERROR | Some miscellaneous error has occurred. |


### Partner APIs Common Headers


| Header Name | Values | Description |
|---|---|---|
| Authorization | Bearer &lt;Technical Account Token&gt; | Technical account token that is generated by the partner |
| content-type | application/json | Media type of the resource |
| x-request-id | String | A unique string value needed to track a given request |

