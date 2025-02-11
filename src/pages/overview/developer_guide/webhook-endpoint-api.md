# WebhookEndpoint APIs

WebhookEndpoint APIs are the means by which your integration communicates with the Acrobat Sign service about webhookEndpoints to support OAuth2.0 in the Webhooks. Use the various API endpoints to create, delete, modify, and retrieve information about your webhookEndpoints. The account level setting, WEBHOOK_OAUTH20_ROLLOUT, needs to be set to use this feature.

Acrobat Sign APIs include the endpoints described below.

## POST /webhookEndpoints

<br/>
<table border="1" columnWidths="20,80">
  <tr>
    <th>Description</th>
    <th>Creates a webhookEndpoint</th>
  </tr>
    <tr>
    <th>Entity</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Endpoint operation</td>
    <td>/webhookEndpoints</td>
  </tr>
  <tr>
    <td>OAuth scopes</td>
    <td>webhook_write</td>
  </tr>
  <tr>
    <td>Request object</td>
    <td>
      <pre><code>
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
      </code></pre>
    </td>
  </tr>
  <tr>
    <td>Response header</td>
    <td>Location header (Specifies the resource location of the webhook)</td>
  </tr>
  <tr>
    <td>Response content type</td>
    <td>application/json</td>
  </tr>
  <tr>
    <td>Response object</td>
    <td>WebhookEndpointResponse<span style="color: red;">{`{
  "id": ""
}` }</span>
    </td>
  </tr>
  <tr>
    <td>HTTPS status code</td>
    <td>201</td>
  </tr>
</table>

**Error codes**

Be aware that APIs may return new errors or evolve existing error codes. Clients should be ready to handle errors they may not fully comprehend using default procedures.

***Error codes***

<br/>
<table border="1" columnWidths="10,55,35" style="width: 100%; border-collapse: collapse;">
  <thead>
    <tr>
      <th>Code</th>
      <th>Error Code</th>
      <th>Message</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>400</td>
      <td>INVALID_JSON</td>
      <td>An invalid JSON was specified.</td>
    </tr>
    <tr>
      <td>400</td>
      <td>INVALID_WEBHOOK_ENDPOINT_URL</td>
      <td>The webhook endpoint URL specified is too long. (or) The webhook endpoint URL specified is invalid. Please provide a well-formatted HTTPS-based URL.</td>
    </tr>
    <tr>
      <td>400</td>
      <td>INVALID_AUTHORIZATION_SERVER_URL</td>
      <td>The authorization server URL specified is invalid: &lt;specific_error_message&gt;</td>
    </tr>
    <tr>
      <td>400</td>
      <td>MISSING_REQUIRED_PARAM</td>
      <td>
        Valid name is missing. (or) Webhook Endpoint name must be 255 characters or less. (or) Valid applicationIds are missing. (or) Maximum of 25 applicationIds are allowed in the request. (or) Request contains invalid applicationIds &lt;comma separated applicationIds&gt;. (or) Webhook endpoint OAuth configuration is missing. (or) Authorization server URL is missing. (or) Client Id sent to the authorization URL is missing. (or) Client secret sent to the authorization URL is missing.
      </td>
    </tr>
    <tr>
      <td>403</td>
      <td>WEBHOOK_OAUTH20_NOT_ENABLED</td>
      <td>This webhook OAuth is not enabled for this account.</td>
    </tr>
    <tr>
      <td>409</td>
      <td>DUPLICATE_WEBHOOK_ENDPOINT_FOR_APPLICATION</td>
      <td>The webhook endpoint URL is already registered for the application.</td>
    </tr>
  </tbody>
</table>

POST /webhookEndpoints is used to create a webhookEndpoint that supports OAuth2.0 for webhooks in Acrobat Sign.

- Only an Account Admin can create a webhookEndpoint.
- The application creating the webhookEndpoint must have webhook_write scope.
- Only one webhookEdnpoint can be created for an application. But, multiple webhooks can be associated with a webhookEndpoint (see the changes to POST /webhooks).
- Group Admin and Account Admin can read the webhookEndpoints that belong to the same account.

The HTTP Location header field is returned in the response to provide information about the location of a newly created resource.

**Usage of access token**

Adobe Acrobat Sign uses the credentials provided in the OAuth2.0 to call the authorization server URL to get the access_token before a webhook notification. A standard response from the authorization server contains the following fields:

- <span style="color: red;">access_token</span>: It is the only mandatory field.
- <span style="color: red;">refresh_token</span>: It is an optional field.
- <span style="color: red;">token_type</span>: Bearer token type is supported.
- <span style="color: red;">expires_in</span>: It is measured in seconds.

```json
{
  "access_token":"HereIsYourSuperSecretAccessToken",
  "refresh_token":"HereIsYourSuperSecretRefreshToken",
  "token_type":"Bearer",
  "expires_in":3600
}
```

## GET /webhookEndpoints

<br/>
<table border="1" columnWidths="20,80">
  <tr>
    <th>Entity</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Description</td>
    <td>Get a list of all active webhookEndpoints from the account of the access token user.</td>
  </tr>
  <tr>
    <td>OAuth scopes</td>
    <td>webhook_read</td>
  </tr>
  <tr>
    <td>Query parameters</td>
    <td>
      <ul>
        <li><b><span style="color: red;">cursor</span></b>: A String used to navigate through the pages. If not provided, returns the first page.</li>
        <li><b><span style="color: red;">pageSize</span></b>: Number of intended items in the response page. If not provided, it is limited to the first 100.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Response content type</td>
    <td>application/json</td>
  </tr>
  <tr>
    <td>Response object</td>
    <td>
      <pre><code>
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
      </code></pre>
    </td>
  </tr>
  <tr>
    <td>HTTPS status code</td>
    <td>200</td>
  </tr>
</table>

**Error codes**

Be aware that APIs may return new errors or evolve existing error codes. Clients should be ready to handle errors they may not fully comprehend using default procedures.

***Error codes***

<br/>
<table border="1" columnWidths="10,40,50" style="width: 100%; border-collapse: collapse;">
  <thead>
    <tr>
      <th>HTTPS Status Code</th>
      <th>Error Code</th>
      <th>Message</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>400</td>
      <td>INVALID_CURSOR</td>
      <td>The page cursor provided is invalid.</td>
    </tr>
    <tr>
      <td>400</td>
      <td>INVALID_PAGE_SIZE</td>
      <td>Page size is either invalid or not within the permissible range.</td>
    </tr>
    <tr>
      <td>403</td>
      <td>WEBHOOK_OAUTH20_NOT_ENABLED</td>
      <td>This webhook oauth is not enabled for this account.</td>
    </tr>
    <tr>
      <td>403</td>
      <td>PERMISSION_DENIED</td>
      <td>The API caller does not have the permission to execute this operation.</td>
    </tr>
  </tbody>
</table>

## GET /webhookEndpoints/{webhookEndpointId}

<br/>
<table border="1" columnWidths="20,80">
  <tr>
    <th>Entity</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Description</td>
    <td>Get a list of all active webhookEndpoints from the account of the access token user.</td>
  </tr>
  <tr>
    <td>Endpoint operation</td>
    <td>/webhookEndpoints/&#123;webhookEndpointId&#125;</td>
  </tr>
  <tr>
    <td>OAuth scopes</td>
    <td>webhook_read</td>
  </tr>
  <tr>
    <td>Query parameters</td>
    <td>
      <ul>
        <li><b><span style="color: red;">cursor</span></b>: A String used to navigate through the pages. If not provided, returns the first page.</li>
        <li><b><span style="color: red;">pageSize</span></b>: Number of intended items in the response page. If not provided, it is limited to the first 100.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Response content type</td>
    <td>application/json</td>
  </tr>
  <tr>
    <td>Response object</td>
    <td>
      <pre><code>
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
      </code></pre>
    </td>
  </tr>
  <tr>
    <td>HTTPS status code</td>
    <td>200</td>
  </tr>
</table>

**Error codes**

Be aware that APIs may return new errors or evolve existing error codes. Clients should be ready to handle errors they may not fully comprehend using default procedures.

***Error codes***

<br/>
<table border="1" columnWidths="10,55,35" style="width: 100%; border-collapse: collapse;">
  <thead>
    <tr>
      <th>Code</th>
      <th>Error code</th>
      <th>Message</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>400</td>
      <td>INVALID_CURSOR</td>
      <td>The page cursor provided is invalid.</td>
    </tr>
    <tr>
      <td>400</td>
      <td>INVALID_PAGE_SIZE</td>
      <td>Page size is either invalid or not within the permissible range.</td>
    </tr>
    <tr>
      <td>403</td>
      <td>WEBHOOK_OAUTH20_NOT_ENABLED</td>
      <td>This webhook oauth is not enabled for this account.</td>
    </tr>
    <tr>
      <td>403</td>
      <td>PERMISSION_DENIED</td>
      <td>The API caller does not have the permission to execute this operation.</td>
    </tr>
    <tr>
      <td>404</td>
      <td>INVALID_WEBHOOK_ENDPOINT_ID</td>
      <td>The webhook endpoint id specified is invalid.</td>
    </tr>
  </tbody>
</table>

## PUT /webhookEndpoints/{webhookEndpointId}

<br/>
<table border="1" columnWidths="20,80">
  <tr>
    <th>Entity</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Description</td>
    <td>This endpoint is used to update the webhookEndpoint resource.</td>
  </tr>
  <tr>
    <td>Endpoint operation</td>
    <td>/webhookEndpoints/&#123;webhookEndpointId&#125;</td>
  </tr>
  <tr>
    <td>OAuth scopes</td>
    <td>webhook_write</td>
  </tr>
  <tr>
    <td>Request header</td>
    <td>Standard header.</td>
  </tr>
  <tr>
    <td>Request body</td>
    <td>
      <pre><code>
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
      </code></pre>
    </td>
  </tr>
  <tr>
    <td>Response content type</td>
    <td>application/json</td>
  </tr>
  <tr>
    <td>Response object</td>
    <td>Empty response</td>
  </tr>
  <tr>
    <td>HTTPS status code</td>
    <td>204</td>
  </tr>
</table>

**Error codes**

Be aware that APIs may return new errors or evolve existing error codes. Clients should be ready to handle errors they may not fully comprehend using default procedures.

***Error codes***

<br/>
<table border="1" columnWidths="10,40,50" style="width: 100%; border-collapse: collapse;">
  <tr>
    <th>Code</th>
    <th>Error code</th>
    <th>Message</th>
  </tr>
  <tr>
    <td>400</td>
    <td><span style="color: red;">INVALID_JSON</span></td>
    <td>An invalid JSON was specified.</td>
  </tr>
  <tr>
    <td>400</td>
    <td><span style="color: red;">INVALID_WEBHOOK_ENDPOINT_URL</span></td>
    <td>The webhook endpoint url specified is too long. (or) The webhook endpoint url specified is invalid. Please provide a well-formatted https based url.</td>
  </tr>
  <tr>
    <td>400</td>
    <td><span style="color: red;">INVALID_AUTHORIZATION_SERVER_URL</span></td>
    <td>The authorization server url specified is invalid: &lt;specific_error_message&gt;</td>
  </tr>
  <tr>
    <td>400</td>
    <td><span style="color: red;">MISSING_REQUIRED_PARAM</span></td>
    <td>Valid name is missing. (or) Webhook Endpoint name must be 255 characters or less. (or) Valid applicationIds are missing. (or) Maximum of 25 applicationIds are allowed in the request (or) Request contains invalid applicationIds &lt;comma separated applicationIds&gt; (or) Webhook endpoint oauth configuration is missing (or) Authorization server url is missing. (or) Client Id sent to the authorization url is missing. (or) Client secret sent to the authorization url is missing.</td>
  </tr>
  <tr>
    <td>400</td>
    <td><span style="color: red;">WEBHOOK_OAUTH20_NOT_ENABLED</span></td>
    <td>This webhook oauth is not enabled for this account.</td>
  </tr>
  <tr>
    <td>400</td>
    <td><span style="color: red;">PERMISSION_DENIED</span></td>
    <td>The API caller does not have the permission to execute this operation.</td>
  </tr>
  <tr>
    <td>400</td>
    <td><span style="color: red;">INVALID_WEBHOOK_ENDPOINT_ID</span></td>
    <td>The webhook endpoint id specified is invalid.</td>
  </tr>
</table>

## DELETE /webhookEndpoints/{webhookEndpointId}

<br/>
<table border="1" columnWidths="30,70">
  <tr>
    <th>Entity</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Description</td>
    <td>This endpoint is used to update the webhookEndpoint resource.</td>
  </tr>
  <tr>
    <td>Endpoint operation</td>
    <td>/webhookEndpoints/&#123;webhookEndpointId&#125;</td>
  </tr>
  <tr>
    <td>OAuth scopes</td>
    <td>webhook_retention</td>
  </tr>
  <tr>
    <td>Request header</td>
    <td>Standard header</td>
  </tr>
  <tr>
    <td>Response content type</td>
    <td>application/json</td>
  </tr>
  <tr>
    <td>Response object</td>
    <td>Empty response</td>
  </tr>
  <tr>
    <td>HTTPS status code</td>
    <td>204</td>
  </tr>
</table>

**Error codes**

Be aware that APIs may return new errors or evolve existing error codes. Clients should be ready to handle errors they may not fully comprehend using default procedures.

***Error codes***

<br/>
<table border="1" columnWidths="10,50,40">
  <tr>
    <th>HTTPS status code</th>
    <th>Error code</th>
    <th>Message</th>
  </tr>
  <tr>
    <td>403</td>
    <td><span style="color: red;">WEBHOOK_OAUTH20_NOT_ENABLED</span></td>
    <td>This webhook oauth is not enabled for this account.</td>
  </tr>
  <tr>
    <td>403</td>
    <td><span style="color: red;">WEBHOOK_ENDPOINT_LINKED_WITH_WEBHOOKS</span></td>
    <td>This webhook endpoint is associated with one or more webhooks and cannot be deleted. Please contact Adobe Sign support team if you need assistance with deleting webhook endpoint.</td>
  </tr>
  <tr>
    <td>403</td>
    <td><span style="color: red;">PERMISSION_DENIED</span></td>
    <td>The API caller does not have the permission to execute this operation.</td>
  </tr>
  <tr>
    <td>404</td>
    <td><span style="color: red;">INVALID_WEBHOOK_ENDPOINT_ID</span></td>
    <td>The webhook endpoint id specified is invalid.</td>
  </tr>
</table>

## Standard API request headers

Every API request will have the following standard headers. If Any API in the list above does not have one or more of the following headers, the API will explicitly document this fact.

***Error codes***

<br/>
<table border="1" columnWidths="30,70">
  <tr>
    <th>Header Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>AUTHORIZATION</td>
    <td>An access token with the correct scopes.</td>
  </tr>
</table>

## Standard API request error codes

Any API request may return any of these standard error codes:

***Error codes***

<br/>
<table border="1" columnWidths="10,40,50">
  <tr>
    <th>HTTPS Status Code</th>
    <th>Error Code</th>
    <th>Message</th>
  </tr>
  <tr>
    <td>400</td>
    <td><span style="color: red;">BAD_REQUEST</span></td>
    <td>The request provided is invalid.</td>
  </tr>
  <tr>
    <td>400</td>
    <td><span style="color: red;">INVALID_JSON</span></td>
    <td>An invalid JSON was specified.</td>
  </tr>
  <tr>
    <td>400</td>
    <td><span style="color: red;">MISC_ERROR</span></td>
    <td>Some miscellaneous error has occurred.</td>
  </tr>
  <tr>
    <td>401</td>
    <td><span style="color: red;">UNVERIFIED_USER</span></td>
    <td>The user has registered but has not verified their email address. The user must use the Acrobat Sign website to complete verification.</td>
  </tr>
  <tr>
    <td>401</td>
    <td><span style="color: red;">NO_AUTHORIZATION_HEADER</span></td>
    <td>The authorization header was not provided.</td>
  </tr>
  <tr>
    <td>401</td>
    <td><span style="color: red;">INVALID_ACCESS_TOKEN</span></td>
    <td>The access token provided is invalid or has expired.</td>
  </tr>
  <tr>
    <td>401</td>
    <td><span style="color: red;">INVALID_USER</span></td>
    <td>An invalid user ID or email was provided in the x-user header.</td>
  </tr>
  <tr>
    <td>401</td>
    <td><span style="color: red;">API_TERMS_NOT_ACCEPTED</span></td>
    <td>Your account is locked because an administrator has not agreed to Acrobat Sign’s Terms of Use. Please contact your administrator to activate your account.</td>
  </tr>
  <tr>
    <td>403</td>
    <td><span style="color: red;">PERMISSION_DENIED</span></td>
    <td>The API caller does not have the permission to execute this operation.</td>
  </tr>
  <tr>
    <td>500</td>
    <td><span style="color: red;">MISC_SERVER_ERROR</span></td>
    <td>Some miscellaneous server error has occurred.</td>
  </tr>
</table>
