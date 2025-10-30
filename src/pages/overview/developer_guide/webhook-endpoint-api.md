# WebhookEndpoint APIs

WebhookEndpoint APIs are the means by which your integration communicates with the Acrobat Sign service about webhookEndpoints to support OAuth2.0 in the Webhooks. Use the various API endpoints to create, delete, modify, and retrieve information about your webhookEndpoints. The account level setting, WEBHOOK_OAUTH20_ROLLOUT, needs to be set to use this feature.

Acrobat Sign APIs include the endpoints described below.


## POST /webhookEndpoints


| Entity                | Value                                                            |
|-----------------------|------------------------------------------------------------------|
| Description           | Creates a webhookEndpoint                                        |
| Endpoint operation    | /webhookEndpoints                                                |
| OAuth scopes          | webhook_write                                                    |
| Request object        | Request object [below](#post-request-object)                     |
| Response header       | Location header (Specifies the resource location of the webhook) |
| Response content type | application/json                                                 |
| Response object       | Response object [below](#post-response-object)                   |
| HTTPS status code     | 201                                                              |

### POST Request object
```
{`{
  "name": "",
  "description": "",
  "webhookEndpointUrl": "",
  "applicationIds": [ "" ],
  "oAuth20": {
    "authorizationServerUrl": "",
    "clientId": "",
    "clientSecret": "",
    "scope": "",
    "customHeaders": [
      {
        "headerName": "header1",
        "headerValue": "value1"
      }
    ]
  }
}`}
```
### POST Response object
```
WebhookEndpointResponse{`{
  "id": ""
}` }
```


**Error codes**

Be aware that APIs may return new errors or evolve existing error codes. Clients should be ready to handle errors they may not fully comprehend using default procedures.

***Error codes***


| Code | Error Code                                 | Message                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|------|--------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 400  | INVALID_JSON                               | An invalid JSON was specified.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 400  | INVALID_WEBHOOK_ENDPOINT_URL               | The webhook endpoint URL specified is too long. (or) The webhook endpoint URL specified is invalid. Please provide a well-formatted HTTPS-based URL.                                                                                                                                                                                                                                                                                                                                          |
| 400  | INVALID_AUTHORIZATION_SERVER_URL           | The authorization server URL specified is invalid: `<specific_error_message>`                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 400  | MISSING_REQUIRED_PARAM                     | Valid name is missing. (or) Webhook Endpoint name must be 255 characters or less. (or) Valid applicationIds are missing. (or) Maximum of 25 applicationIds are allowed in the request. (or) Request contains invalid applicationIds `<comma separated applicationIds>`. (or) Webhook endpoint OAuth configuration is missing. (or) Authorization server URL is missing. (or) Client Id sent to the authorization URL is missing. (or) Client secret sent to the authorization URL is missing. |
| 403  | WEBHOOK_OAUTH20_NOT_ENABLED                | This webhook OAuth is not enabled for this account.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 409  | DUPLICATE_WEBHOOK_ENDPOINT_FOR_APPLICATION | The webhook endpoint URL is already registered for the application.                                                                                                                                                                                                                                                                                                                                                                                                                           |


POST /webhookEndpoints is used to create a webhookEndpoint that supports OAuth2.0 for webhooks in Acrobat Sign.

- Only an Account Admin can create a webhookEndpoint.
- The application creating the webhookEndpoint must have webhook_write scope.
- Only one webhookEdnpoint can be created for an application. But, multiple webhooks can be associated with a webhookEndpoint (see the changes to POST /webhooks).
- Group Admin and Account Admin can read the webhookEndpoints that belong to the same account.

The HTTP Location header field is returned in the response to provide information about the location of a newly created resource.

**Usage of access token**

Adobe Acrobat Sign uses the credentials provided in the OAuth2.0 to call the authorization server URL to get the access_token before a webhook notification. A standard response from the authorization server contains the following fields:

- `access_token`: It is the only mandatory field.
- `refresh_token`: It is an optional field.
- `token_type`: Bearer token type is supported.
- `expires_in`: It is measured in seconds.

```json
{
  "access_token":"HereIsYourSuperSecretAccessToken",
  "refresh_token":"HereIsYourSuperSecretRefreshToken",
  "token_type":"Bearer",
  "expires_in":3600
}
```

## GET /webhookEndpoints


| Entity                | Value                                                                                                     |
|-----------------------|-----------------------------------------------------------------------------------------------------------|
| Description           | Get a list of all active webhookEndpoints from the account of the access token user.                      |
| OAuth scopes          | webhook_read                                                                                              |
| Query parameters      | cursor: A String used to navigate through the pages. If not provided, returns the first page.             |
|                       | pageSize: Number of intended items in the response page. If not provided, it is limited to the first 100. |
| Response content type | application/json                                                                                          |
| Response object       | Response object [below](#get-list-response-object)                                                        |
| HTTPS status code     | 200                                                                                                       |

### GET List Response object
```
{`{
  "page": {
    "nextCursor": ""
  },
  "webhookEndpointList": [
    {
      "name": "webhookEndpoint_12_01_2023_1",
      "description": "webhookEndpoint_12_01_2023_1",
      "webhookEndpointId": "9c5ce683-011a-4663-b275-4d6c14193e8c",
      "webhookEndpointUrl": "https://.your.domain.com/queryParameter?qp_1=",
      "applicationIds": [
        "CBJCHBCAABAAC7LB161JEvq9PcSXTbplkpw3XpvAvnGr"
      ],
      "oAuth20": {
        "scope": "openid",
        "authorizationServerUrl": "https://your.authorization.server/oAuth20",
        "clientId": "yourClinetId",
        "customHeaders": [
          {}
        ]
      }
    }
  ]
}`}
```


**Error codes**

Be aware that APIs may return new errors or evolve existing error codes. Clients should be ready to handle errors they may not fully comprehend using default procedures.

***Error codes***


| HTTPS Status Code | Error Code                  | Message                                                                |
|-------------------|-----------------------------|------------------------------------------------------------------------|
| 400               | INVALID_CURSOR              | The page cursor provided is invalid.                                   |
| 400               | INVALID_PAGE_SIZE           | Page size is either invalid or not within the permissible range.       |
| 403               | WEBHOOK_OAUTH20_NOT_ENABLED | This webhook oauth is not enabled for this account.                    |
| 403               | PERMISSION_DENIED           | The API caller does not have the permission to execute this operation. |


## GET /webhookEndpoints/\{webhookEndpointId\}


| Entity                | Value                                                                                                     |
|-----------------------|-----------------------------------------------------------------------------------------------------------|
| Description           | Get a list of all active webhookEndpoints from the account of the access token user.                      |
| Endpoint operation    | /webhookEndpoints/\{webhookEndpointId\}                                                                   |
| OAuth scopes          | webhook_read                                                                                              |
| Query parameters      | cursor: A String used to navigate through the pages. If not provided, returns the first page.             |
|                       | pageSize: Number of intended items in the response page. If not provided, it is limited to the first 100. |
| Response content type | application/json                                                                                          |
| Response object       | Response object [below](#get-list-by-id-response-object)                                                  |
| HTTPS status code     | 200                                                                                                       |

### GET List by ID Response object
```
{`{
    "name": "webhookEndpoint_12_01_2023_1",
    "description": "webhookEndpoint_12_01_2023_1",
    "webhookEndpointId": "9c5ce683-011a-4663-b275-4d6c14193e8c",
    "webhookEndpointUrl": "https://*.your.domain.com/queryParameter?qp_1=*",
    "applicationIds": [
        "CBJCHBCAABAAC7LB161JEvq9PcSXTbplkpw3XpvAvnGr"
    ],
    "oAuth20": {
        "scope": "openid",
        "authorizationServerUrl": "https://your.authorization.server/oAuth20",
        "clientId": "anyThing",
        "customHeaders": [
            {}
        ]
    }
}`} 
```


**Error codes**

Be aware that APIs may return new errors or evolve existing error codes. Clients should be ready to handle errors they may not fully comprehend using default procedures.

***Error codes***


| Code | Error code                  | Message                                                                |
|------|-----------------------------|------------------------------------------------------------------------|
| 400  | INVALID_CURSOR              | The page cursor provided is invalid.                                   |
| 400  | INVALID_PAGE_SIZE           | Page size is either invalid or not within the permissible range.       |
| 403  | WEBHOOK_OAUTH20_NOT_ENABLED | This webhook oauth is not enabled for this account.                    |
| 403  | PERMISSION_DENIED           | The API caller does not have the permission to execute this operation. |
| 404  | INVALID_WEBHOOK_ENDPOINT_ID | The webhook endpoint id specified is invalid.                          |


## PUT /webhookEndpoints/\{webhookEndpointId\}


| Entity                | Value                                                         |
|-----------------------|---------------------------------------------------------------|
| Description           | This endpoint is used to update the webhookEndpoint resource. |
| Endpoint operation    | /webhookEndpoints/\{webhookEndpointId\}                       |
| OAuth scopes          | webhook_write                                                 |
| Request header        | Standard header.                                              |
| Request body          | Request body [below](#put-request-body)                       |
| Response content type | application/json                                              |
| Response object       | Empty response                                                |
| HTTPS status code     | 204                                                           |

### PUT Request body
```
{`{
    "name": "",
    "description": "",
    "webhookEndpointUrl": "",
    "applicationIds": [ "" ],
    "oAuth20": {
      "authorizationServerUrl": "",
      "clientId": "",
      "clientSecret": "",
      "scope": "",
      "customHeaders": [
      {
        "headerName": "header1",
        "headerValue": "value1"
      }
      ]
    }
}`} 
```


**Error codes**

Be aware that APIs may return new errors or evolve existing error codes. Clients should be ready to handle errors they may not fully comprehend using default procedures.

***Error codes***


| Code | Error code                       | Message                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|------|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 400  | INVALID_JSON                     | An invalid JSON was specified.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 400  | INVALID_WEBHOOK_ENDPOINT_URL     | The webhook endpoint url specified is too long. (or) The webhook endpoint url specified is invalid. Please provide a well-formatted https based url.                                                                                                                                                                                                                                                                                                                                       |
| 400  | INVALID_AUTHORIZATION_SERVER_URL | The authorization server url specified is invalid: `<specific_error_message>`                                                                                                                                                                                                                                                                                                                                                                                                               |
| 400  | MISSING_REQUIRED_PARAM           | Valid name is missing. (or) Webhook Endpoint name must be 255 characters or less. (or) Valid applicationIds are missing. (or) Maximum of 25 applicationIds are allowed in the request (or) Request contains invalid applicationIds `<comma separated applicationIds>` (or) Webhook endpoint oauth configuration is missing (or) Authorization server url is missing. (or) Client Id sent to the authorization url is missing. (or) Client secret sent to the authorization url is missing. |
| 400  | WEBHOOK_OAUTH20_NOT_ENABLED      | This webhook oauth is not enabled for this account.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 400  | PERMISSION_DENIED                | The API caller does not have the permission to execute this operation.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 400  | INVALID_WEBHOOK_ENDPOINT_ID      | The webhook endpoint id specified is invalid.                                                                                                                                                                                                                                                                                                                                                                                                                                              |


## DELETE /webhookEndpoints/\{webhookEndpointId\}


| Entity                | Value                                                         |
|-----------------------|---------------------------------------------------------------|
| Description           | This endpoint is used to update the webhookEndpoint resource. |
| Endpoint operation    | /webhookEndpoints/\{webhookEndpointId\}                       |
| OAuth scopes          | webhook_retention                                             |
| Request header        | Standard header                                               |
| Response content type | application/json                                              |
| Response object       | Empty response                                                |
| HTTPS status code     | 204                                                           |


**Error codes**

Be aware that APIs may return new errors or evolve existing error codes. Clients should be ready to handle errors they may not fully comprehend using default procedures.

***Error codes***


| HTTPS status code | Error code                            | Message                                                                                                                                                                            |
|-------------------|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 403               | WEBHOOK_OAUTH20_NOT_ENABLED           | This webhook oauth is not enabled for this account.                                                                                                                                |
| 403               | WEBHOOK_ENDPOINT_LINKED_WITH_WEBHOOKS | This webhook endpoint is associated with one or more webhooks and cannot be deleted. Please contact Adobe Sign support team if you need assistance with deleting webhook endpoint. |
| 403               | PERMISSION_DENIED                     | The API caller does not have the permission to execute this operation.                                                                                                             |
| 404               | INVALID_WEBHOOK_ENDPOINT_ID           | The webhook endpoint id specified is invalid.                                                                                                                                      |


## Standard API request headers

Every API request will have the following standard headers. If Any API in the list above does not have one or more of the following headers, the API will explicitly document this fact.

***Error codes***


| Header Name   | Description                              |
|---------------|------------------------------------------|
| AUTHORIZATION | An access token with the correct scopes. |


## Standard API request error codes

Any API request may return any of these standard error codes:

***Error codes***


| HTTPS Status Code | Error Code              | Message                                                                                                                                                    |
|-------------------|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 400               | BAD_REQUEST             | The request provided is invalid.                                                                                                                           |
| 400               | INVALID_JSON            | An invalid JSON was specified.                                                                                                                             |
| 400               | MISC_ERROR              | Some miscellaneous error has occurred.                                                                                                                     |
| 401               | UNVERIFIED_USER         | The user has registered but has not verified their email address. The user must use the Acrobat Sign website to complete verification.                     |
| 401               | NO_AUTHORIZATION_HEADER | The authorization header was not provided.                                                                                                                 |
| 401               | INVALID_ACCESS_TOKEN    | The access token provided is invalid or has expired.                                                                                                       |
| 401               | INVALID_USER            | An invalid user ID or email was provided in the x-user header.                                                                                             |
| 401               | API_TERMS_NOT_ACCEPTED  | Your account is locked because an administrator has not agreed to Acrobat Sign’s Terms of Use. Please contact your administrator to activate your account. |
| 403               | PERMISSION_DENIED       | The API caller does not have the permission to execute this operation.                                                                                     |
| 500               | MISC_SERVER_ERROR       | Some miscellaneous server error has occurred.                                                                                                              |

