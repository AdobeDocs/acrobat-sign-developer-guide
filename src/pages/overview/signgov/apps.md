---
title: "APIs and Applications - Acrobat Sign for Government: Developer"
---
# APIs and Applications

## Basic details




### Send API call to the right place

Acrobat Sign Commercial and Acrobat Sign for Government services reside on different top-level domains. Both the domain and extension are different:

- Commercial Cloud, PCI and HIPAA compliant (note **.com**): https://secure.adobesign.com
- US Government Cloud, FedRAMP Moderate compliant (note **.us**): https://secure.na1.adobesign.us

### Endpoint summary

-  GET [https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/authorize](https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/authorize): Start the authorization code flow to login and consent to application permissions 
-  POST [https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/token](https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/token): Obtain an access_token and, except for impersonation, a `refresh_token` upon successful completion and redirect back from the authorization code flow 
-  POST [https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/validate_token](https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/validate_token): Validate an existing token 
-  POST [https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/invalidate_token](https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/invalidate_token): Invalidate/revoke a particular token 
-  GET [https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/logout](https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/logout): Invalidate/revoke all tokens related to the user to which the token belongs

<InlineAlert slots="text" />

These APIs follow an underscore naming convention, as opposed to camelCase, for parameters as they relate to OAuth, Adobe Identity, and Okta APIs with this similar naming convention. Sign Gov OAuth endpoints must be used–not direct Okta OAuth APIs. However, you may find the OAuth docs helpful: https://developer.okta.com/docs/reference/api/oidc/#endpoints

### Debugging

It’s recommended to pass an `x-request-id` header with APIs as a way to track requests for debugging.

## Impersonation

Some workflows are more efficient (and even possible) when a holder of one token can act on behalf of other users; in other words, when a user or client can perform actions on behalf of other users or clients (impersonate them). Impersonation occurs when the subject of the authentication identified by the original credentials differs from the one that will perform a certain action. An application or API cannot determine from a token if the subject is the logged in entity, so it’s often advantageous to use anonymous tokens to get work done.

Since it’s inefficient to have every user get an OAuth token, admins benefit when a token is available to all users. In Sign Gov, admins exchange their admin token for a user-specific token since, unlike the Acrobat Sign commercial instance, `x-api-user` is unsupported. Doing so avoids having every user log in, get a unique token, and so on.

Note that impersonation in Acrobat Sign for Government varies from the commercial instance. Sign Gov:

-  Does not support the `x-api-user` header for impersonation due to security Okta restrictions. 
-  Supports OAuth only–not integration keys. 
-  Supports impersonation from account-admin scoped tokens, not group-admin tokens. 
-  Both direct customers and Acrobat Sign Embed partners have to ask Adobe to enable impersonation for an application. 
    - Impersonation is enabled on an application via the `acc_imp` scope. 
    - Refresh tokens are enabled via `offline_access` scope.

<InlineAlert slots="text" />

Both the commercial and government Acrobat Sign instances enable the use of `autoLogin: true` for Sign /view APIs by the `user_login` scope.

### How to use impersonation

For impersonation, API applications need to exchange the Sign admin token for another user-impersonation token. Usage details:

- Only admins can generate an `admin_token` and associated `admin_refresh_token`. 
- The admin uses the `admin_token` to generate an `impersonation_token`. An `admin_token` can only be used to generate the impersonation token for users in the same account as the account admin for which the admin token was generated. 
- The lifespan of the admin_token is 5 min. 
- The `admin_refresh_token` lifetime is unlimited but will expire if not used for more than 30 days. 
- The `admin_refresh_token` should be persisted in a secure storage location (for headless/background processing).

## APIs

### Authorize

**Summary:** The request redirects the user agent to the specified (or default) identity provider for authentication. The actual UI that is displayed to the user depends on your client type in your respective identity provider.

This is a starting point for browser-based OpenID Connect flows such as authorization code flow. This request authenticates the user and returns an authorization code to the client application as a part of the callback response (redirect URI).

#### Request

- **Method**: GET 
- **Authorization required**: No 
- **Available versions**: https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/authorize

**Request QueryParameters**

| Parametr                      | Required                   | Data Type                                                      | Default  | Description                                                                                                          |
|-------------------------------|----------------------------|----------------------------------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| client_id        | Yes                           | String                                                         |         | Identifies the application/client pre-registered with Authorization Server                                                                                                                      |
| response_type            | Yes     | String                                        | code     | Expected a code for the authorization code flow to have authorization code to be returned as a part of the response. |
| redirect_uri          | Yes    | String                                       |          | User will be redirected here at the end of the authorization process. The value must belong to the set of values specified on the OAuth configuration page. |
| scope     | Yes | String                               |          | The permissions (space separated, spaces becoming + or %20 when URL-encoded) that the user will be asked to approve; for example: &scope=email,openid. |
| state          | Yes           | String |          | A value to be returned as a query parameter. This will be used to implement CSRF protection on the client side. It can contain alphanumeric, comma, period, underscore, and hyphen characters. |
| login_hint         | Yes   | String          |          | The email of the user trying to log in which may help identify tenants by their email domain. |


#### Response

Once the user is authenticated by the identity provider, determines whether authorization can be granted, then **redirects the user agent to the URI that you have supplied or configured for your client’s start page.** The redirect contains the authorization grant, in the form of the code or token appropriate to your grant type.

**Note:** When making requests to the `/authorize` endpoint, the browser (user agent) should be redirected to the endpoint. You can’t use AJAX with this endpoint but you can have a link or button directly or indirectly via JS navigates to the `/authorize` URL: https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/authorize?clientId=…&response_type=…&scope=…&state=…&login_hint=…&redirectUri=<insert url here\>

#### Success Response

The following is returned as URL query parameters from the identity provider (Okta or Adobe IMS) as part of a 302 redirect:

| Parameter  | Description                                                                                                                                                           |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| code       | An opaque value that can be used to redeem tokens from the token endpoint. code is returned if the response_type includes code                                        |
| expires_in | Number of seconds until the access_token expires. This is only returned if the response included an access_token.                                                     |
| state      | The unmodified state value from the request.                                                                                                                          |




#### Error response

The API returns the following URL query parameters on error:



| Parameter  | Description                              |
|------------|------------------------------------------|
| error       | The error code, if something went wrong. |
| error_description | Additional error information (if any).                                         |





##### Error Codes

| error  | error_description                                                                                |
|------------|--------------------------------------------------------------------------------------------------|
| invalid_client       | The specified client ID is invalid.                                                         |
| invalid_request | <Parameter Name\> is missing or empty/invalid.                                                   |
| invalid_scope | The scopes list contains an invalid or unsupported value.                                        |
| temporarily_unavailable | The server is temporarily unavailable but should be able to process the request at a later time. |
| unsupported_response_type | The specified response type is invalid or unsupported.                                           |
| internal_server_error | Service Error.                                                                                   |

### Token

**Summary:** This endpoint returns access tokens, ID tokens, and refresh tokens, depending on the request parameters. Please refer to specific `grant_type` flows for a list of required parameters.

#### Common Request Aspects

- **Method**: POST 
- **Authorization required**: No 
- **Content-Type**: `application/x-www-form-urlencoded`
- **Available versions**: https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/token

#### Request with Authorization Code

For the authorization code flow, calling `/token` is the second step of the flow.

##### Request Body Parameters

| Parametr                      | Required                   | Data Type                                                       | Description                                                                                                          |
|-------------------------------|----------------------------|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| client_id        | Yes                           | String                                                         |        | Identifies the application/client pre-registered with Authorization Server                                                                                                                      |
| response_type            | Yes     | String                                        | code    | Expected a code for the authorization code flow to have authorization code to be returned as a part of the response. |
| redirect_uri          | Yes    | String                                       |         | User will be redirected here at the end of the authorization process. The value must belong to the set of values specified on the OAuth configuration page. |
| scope     | Yes | String                               |         | The permissions (space separated, spaces becoming + or %20 when URL-encoded) that the user will be asked to approve; for example: &scope=email,openid. |
| state          | Yes           | String |         | A value to be returned as a query parameter. This will be used to implement CSRF protection on the client side. It can contain alphanumeric, comma, period, underscore, and hyphen characters. |
| login_hint         | Yes   | String          |         | The email of the user trying to log in which may help identify tenants by their email domain. |