---
title: Webhooks OAuth 2.0 User Guide — Acrobat Sign Webhook Guide
---
# Webhooks OAuth 2.0 User Guide

<InlineAlert slots="text" />

Current release includes enhancement to the Webhooks OAuth 2.0. The /webhookEndpoints API can now be configured at both the account level and the application level. To enable webhookEndpoints/ API configuration at the account level, we made the *applicationIDs* field optional. This means that if you omit the applicationIDs in a POST /webhookEndpoint request, the webhookEndpoint is created at the account level instead of being linked to a specific application.

## Prerequisites

To use Webhook OAuth 2.0, you need to enable the account-level setting WEBHOOK_OAUTH20_ROLLOUT. Please contact Adobe customer support to activate this setting.

## Set up Webhooks OAuth 2.0

&nbsp;1. Create a customer application.

![image](./images/webhooks-1.png)

&nbsp;2. Enable the following scopes for the application:

+ webhook_read
+ webhook_write
+ webhook_retention

![image](./images/webhooks-2.png)

&nbsp;3. [<span style="color: #2980b9">Follow these steps</span>](../developer_guide/gstarted.md/#getting-the-access-token) to generate access_token to authorize requests for a Acrobat Sign API endpoint.

&nbsp;4. To create a WebhookEndpoint, send a [POST request](../developer_guide/webhook-endpoint-api.md) to the /api/rest/v6/accounts/{accountId}/webhookEndpoints with the following JSON body:

**webhookEndpoints_POST_curl**

```javascript
curl --location 'https://api.na1.adobesignpreview.com/api/rest/v6/accounts/CBJCHBCAABAAHVF2SeYL6q68j8ttKbJ7stmVG59DtWJT/webhookEndpoints' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer 3AAABLKmtbUBUicE9oSp05' \
--data '{
    "name" : "preview_na1_12_19_2023_1",
    "description": "preview_na_12_19_2023_1_description",
    "webhookEndpointUrl": "https://*.domain.subdomain.com/somePath?someQueryParam=*",
    "applicationIds": ["CBJCHBCAABAAhdTfTbSnTtEqZf_cLHgqnXwNqqucWvWa"],
    "oAuth20": {
      "authorizationServerUrl": "https://your.authorization-server.url",
      "clientId": "auth-server-client-id",
      "clientSecret": "auth-server-client-secret",
      "scope": "optional-scope-for-auth-server",
      "customHeaders": [
        {
          "headerName": "header1",
          "headerValue": "value1",
        }
      ]
    }
}'
```

<InlineNestedAlert variant="info" header="false" iconPosition="right">

Adobe Acrobat Sign uses the credentials provided in the OAuth2.0 to call the authorization server URL to get the access_token before a webhook notification. A standard response from the authorization server contains the following fields:
  <ul style="list-style-type: disc; margin: 15px">
      <li><span style="color: #e74c3c">access_token</span>: It is the only mandatory field.</li>
      <li><span style="color: #e74c3c">refresh_token</span>: It is an optional field.</li>
      <li><span style="color: #e74c3c">token_type</span>: Bearer token type is supported.</li>
      <li><span style="color: #e74c3c">expires_in</span>: It is measured in seconds.</li>
  </ul>

  ```json
  {
    "access_token":"HereIsYourSuperSecretAccessToken",
    "refresh_token":"HereIsYourSuperSecretRefreshToken",
    "token_type":"Bearer",
    "expires_in":3600
  }
  ```

</InlineNestedAlert>

**webhookEndpoints_POST**

```json
POST /api/rest/v6/accounts/{accountId}/webhookEndpoints HTTP/1.1
Host: api.na1.echosign.com
Authorization: Bearer 3AAABLKmtbUBUicE9oSp05
Content-Type: application/json

{
    "name" : "preview_na1_12_19_2023_1",
    "description": "preview_na_12_19_2023_1_description",
    "webhookEndpointUrl": "https://*.domain.subdomain.com/somePath?someQueryParam=*",
    "applicationIds": ["CBJCHBCAABAAhdTfTbSnTtEqZf_cLHgqnXwNqqucWvWa"],
    "oAuth20": {
      "authorizationServerUrl": "https://your.authorization-server.url",
      "clientId": "auth-server-client-id",
      "clientSecret": "auth-server-client-secret",
      "scope": "optional-scope-for-auth-server",
      "customHeaders": [
        {
          "headerName": "header1",
          "headerValue": "value1",
        }
      ]
    }
}
```

<InlineAlert slots="text" />

To enable webhookEndpoints/ API configuration at the account level, omit the applicationIDs in the above POST /webhookEndpoint request.

&nbsp;5. Replace the value for the following attributes with the correct values:

***Attributes***

<table columnWidths="25,75">
    <thead>
        <tr>
            <th>Attribute</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>name</td>
            <td>Name of the webhookEndpoint resource that you want to create. It’s length cannot be more than 255 characters.</td>
        </tr>
        <tr>
            <td>description</td>
            <td>Optionally, add a description for the webhookEndpoint.</td>
        </tr>
        <tr>
            <td>webhookEndpointUrl</td>
            <td>This is a webhookEndpoint URL pattern that you would like to be mapped to one or more webhook(s) that belong to the same account. See <a href="#webhookendpointurl-details" style="color: #2980B9">webhookEndpointUrl details</a>.</td>
        </tr>
        <tr>
            <td>applicationIds</td>
            <td>(Optional) You can provide one or more Application IDs (alphanumeric) that needs to be associated. If you don’t inlcude applicationIDs attribute, the webhookEndpoints/ is configured at account level.</td>
        </tr>
        <tr>
            <td>authorizationServerUrl</td>
            <td>URL of the authorization server for getting the access token.</td>
        </tr>
        <tr>
            <td>clientId</td>
            <td>clientId for the authorization server.</td>
        </tr>
        <tr>
            <td>clientSecret</td>
            <td>client secret for the authorization server.</td>
        </tr>
        <tr>
            <td>scope</td>
            <td>scope, if any, needed for the authorization server.</td>
        </tr>
        <tr>
            <td>customHeaders</td>
            <td>A map of key-value pairs that you want in webhook notification request for increased personalization.</td>
        </tr>
    </tbody>
</table>

&nbsp;6. To associate the [webhookEndpointUrl details](#webhookendpointurl-details) for a new webhook, send a POST request to /api/rest/v6/webhooks with the following JSON body:

<InlineAlert slots="text" />

The webhookUrlInfo is not required when creating a webhook linked to a webhookEndpoint.

```json
POST /api/rest/v6/webhooks HTTP/1.1
Host: api.na1.echosign.com
Authorization: 3AAABLKmtbUBUicE9oSp05 /* gitleaks:allow */
Content-Type: application/json

{
    "name": "preview_na1_webhook_12_19_2023_1",
    "scope": "USER",
    "state": "ACTIVE",
    "webhookSubscriptionEvents": [
        "AGREEMENT_ACTION_COMPLETED"
    ],
    "webhookEndpointInfo": {
        "webhookEndpointId": "e6a238bc-1c67-463c-992c-9edc9ba637a7",
        "domainPrefix": "callback-prod",
        "urlSuffix": "agreement_12_19_2023_1"
    }
}
```

Replace the value for the following attributes with the correct values:

<table columnWidths="30,70">
    <thead>
        <tr>
            <th>Attribute</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>name</td>
            <td>Name of the webhookEndpoint resource that you want to create. It’s length cannot be more than 255 characters.</td>
        </tr>
        <tr>
            <td>scope</td>
            <td>Scope of webhook. This attribute can’t be modified in PUT request. The possible values are ACCOUNT, GROUP, USER or RESOURCE.</td>
        </tr>
        <tr>
            <td>state</td>
            <td>The state in which the webhook should be created. The possible values are ACTIVE, INACTIVE and DELETED.</td>
        </tr>
        <tr>
            <td>webhookSubscriptionEvents</td>
            <td>Any valid Event(s) that a webhook would need to be notified.</td>
        </tr>
        <tr>
            <td>webhookEndpointId</td>
            <td>The webhookEndpointId that to be associated with this webhook.</td>
        </tr>
        <tr>
            <td>domainPrefix</td>
            <td>Optional URL subdomain value. This value will be used to replace the first wildcard (*).</td>
        </tr>
        <tr>
            <td>urlSuffix</td>
            <td>Optional Url Suffix to append to the WebhookEndpointId. This value will be used to replace the wildcard (*) at the end.</td>
        </tr>
    </tbody>
</table>

You will get the following response containing the id of the webhook created:

```json
{
    "id": "fe4880d0-4e16-4964-b5ab-07b06d30a430"
}
```

&nbsp;7. Once the webhook is configured with OAuth 2.0 (webhookEndpointId), all future webhook notifications (associated with respective scope) will include the access_token provided by the authorization server, as shown below.

<InlineAlert slots="text" />

Note the addition of a new value “authorization” under the requestHeaders. This will be included with the remaining headers from before.

## webhookEndpointUrl details

For webhookEndpointUrl, you can provide a leading and a trailing wildcard that would be replaced with respective values (domainPrefix and urlSuffix) when the webhook(s) are created by providing the webhookEndpointId, in addition to that.

Example webhookEndpointUrl: https: //yourDomain.com/webhook?agreementID=

You can link this webhookEndpointUrl to any new webhooks you create by using the id from the response in webhookEndpointInfo. Include domainPrefix and urlSuffix if you’re using wildcards. After associating the webhookEndpoint resource using the webhookEndpointId, with domainPrefix as “dev-01” and urlSuffix as “agreement123,” the resulting webhookUrl for /api/rest/v6/webhooks will be as follows: https: //dev-01.yourDomain.com/webhook?agreementId=agreement123

You will get the following response containing the id:

```json
{
    "id": "e6a238bc-1c67-463c-992c-9edc9ba637a7"
}
```

The returned id is used to uniquely identify the webhookEndpoint.
