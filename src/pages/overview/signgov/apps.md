
# APIs and Applications

Last update: Aug 04, 2023.

## Basic details

### Send API call to the right place

Acrobat Sign Commercial and Acrobat Sign for Government services reside on different top-level domains. Both the domain and extension are different:

*   Commercial Cloud, PCI and HIPAA compliant (note **.com**): `https://secure.adobesign.com`

*   US Government Cloud, FedRAMP Moderate compliant (note **.us**): `https://secure.na1.adobesign.us`

### Endpoint summary

> *   GET [https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/authorize](https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/authorize): Start the authorization code flow to login and consent to application permissions
>
> *   POST [https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/token](https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/token): Obtain an access\_token and, except for impersonation, a `refresh_token` upon successful completion and redirect back from the authorization code flow
>
> *   POST [https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/validate\_token](https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/validate_token): Validate an existing token
>
> *   POST [https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/invalidate\_token](https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/invalidate_token): Invalidate/revoke a particular token
>
> *   GET [https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/logout](https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/logout): Invalidate/revoke all tokens related to the user to which the token belongs
>

<InlineAlert slots="header, text" />

Note

These APIs follow an underscore naming convention, as opposed to camelCase, for parameters as they relate to OAuth, Adobe Identity, and Okta APIs with this similar naming convention. Sign Gov OAuth endpoints must be used–not direct Okta OAuth APIs. However, you may find the OAuth docs helpful: [https://developer.okta.com/docs/reference/api/oidc/#endpoints](https://developer.okta.com/docs/reference/api/oidc/#endpoints)

### Debugging

It’s recommended to pass an `x-request-id` header with APIs as a way to track requests for debugging.

## Impersonation

Some workflows are more efficient (and even possible) when a holder of one token can act on behalf of other users; in other words, when a user or client can perform actions on behalf of other users or clients (impersonate them). Impersonation occurs when the subject of the authentication identified by the original credentials differs from the one that will perform a certain action. An application or API cannot determine from a token if the subject is the logged in entity, so it’s often advantageous to use anonymous tokens to get work done.

Since it’s inefficient to have every user get an OAuth token, admins benefit when a token is available to all users. In Sign Gov, admins exchange their admin token for a user-specific token since, unlike the Acrobat Sign commercial instance, `x-api-user` is unsupported. Doing so avoids having every user log in, get a unique token, and so on.

Note that impersonation in Acrobat Sign for Government varies from the commercial instance. Sign Gov:

*   Does not support the `x-api-user` header for impersonation due to security Okta restrictions.

*   Supports OAuth only–not integration keys.

*   Supports impersonation from account-admin scoped tokens, not group-admin tokens.

*   Both direct customers and Acrobat Sign Embed partners have to ask Adobe to enable impersonation for an application.

    > *   Impersonation is enabled on an application via the `acc_imp` scope.
    >
    > *   Refresh tokens are enabled via `offline_access` scope.
    >

<InlineAlert slots="header, text" />

Note

Both the commercial and government Acrobat Sign instances enable the use of `autoLogin: true` for Sign /view APIs by the `user_login` scope.

### How to use impersonation

For impersonation, API applications need to exchange the Sign admin token for another user-impersonation token. Usage details:

*   Only admins can generate an `admin_token` and associated `admin_refresh_token`.

*   The admin uses the `admin_token` to generate an `impersonation_token`. An `admin_token` can only be used to generate the impersonation token for users in the same account as the account admin for which the admin token was generated.

*   The lifespan of the admin\_token is 5 min.

*   The `admin_refresh_token` lifetime is unlimited but will expire if not used for more than 30 days.

*   The `admin_refresh_token` should be persisted in a secure storage location (for headless/background processing).

## APIs

### Authorize

**Summary:** The request redirects the user agent to the specified (or default) identity provider for authentication. The actual UI that is displayed to the user depends on your client type in your respective identity provider.

This is a starting point for browser-based OpenID Connect flows such as authorization code flow. This request authenticates the user and returns an authorization code to the client application as a part of the callback response (redirect URI).

#### Request

*   **Method**: GET

*   **Authorization required**: No

*   **Available versions**: `https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/authorize`

**Request QueryParameters**

| Parameter | Required | Data Type | Default | Description |
| --- | --- | --- | --- | --- |
| client\_id | Yes | String |     | Identifies the application/client pre-registered with Authorization Server |
| response\_type | Yes | String | code | Expected as “code” for the authorization code flow to have authorization code to be returned as a part of the response. |
| redirect\_uri | Yes | String |     | User will be redirected here at the end of the authorization process. The value must belong to the set of values specified on the OAuth configuration page. |
| scope | Yes | String |     | The permissions (space separated, spaces becoming + or %20 when URL-encoded) that the user will be asked to approve; for example: `&scope=email,openid`. |
| state | Yes | String |     | A value to be returned as a query parameter. This will be used to implement CSRF protection on the client side. It can contain alphanumeric, comma, period, underscore, and hyphen characters. |
| login\_hint | Yes | String |     | The email of the user trying to log in which may help identify tenants by their email domain. |

#### Response

Once the user is authenticated by the identity provider, determines whether authorization can be granted, then **redirects the user agent to the URI that you have supplied or configured for your client’s start page.** The redirect contains the authorization grant, in the form of the code or token appropriate to your grant type.

**Note:** When making requests to the `/authorize` endpoint, the browser (user agent) should be redirected to the endpoint. You can’t use AJAX with this endpoint but you can have a link or button directly or indirectly via JS navigates to the `/authorize` URL: [https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/authorize?clientId=…&response\_type=…&scope=…&state=…&login\_hint=](https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/authorize?clientId=...&response_type=...&scope=...&state=...&login_hint=)…&redirectUri=&lt;insert url here&gt;

#### Success Response

The following is returned as URL query parameters from the identity provider (Okta or Adobe IMS) as part of a 302 redirect:

| Parameter | Description |
| --- | --- |
| code | An opaque value that can be used to redeem tokens from the token endpoint. `code` is returned if the `response_type` includes `code` |
| expires\_in | Number of seconds until the `access_token` expires. This is only returned if the response included an `access_token`. |
| state | The unmodified `state` value from the request. |

#### Error response

The API returns the following URL query parameters on error:

| Parameter | Description |
| --- | --- |
| error | The error code, if something went wrong. |
| error\_description | Additional error information (if any). |

**Error Codes**

| error | error\_description |
| --- | --- |
| invalid\_client | The specified client ID is invalid. |
| invalid\_request | &lt;Parameter Name&gt; is missing or empty/invalid. |
| invalid\_scope | The scopes list contains an invalid or unsupported value. |
| temporarily\_unavailable | The server is temporarily unavailable but should be able to process the request at a later time. |
| unsupported\_response\_type | The specified response type is invalid or unsupported. |
| internal\_server\_error | Service Error |

### Token

**Summary:** This endpoint returns access tokens, ID tokens, and refresh tokens, depending on the request parameters. Please refer to specific `grant_type` flows for a list of required parameters.

#### Common Request Aspects

*   **Method**: POST

*   **Authorization required**: No

*   **Content-Type:**: `application/x-www-form-urlencoded`

*   **Available versions**: `https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/token`

#### Request with Authorization Code

For the authorization code flow, calling `/token` is the second step of the flow.

**Request Body Parameters**

| Parameter | Required | Data Type | Description |
| --- | --- | --- | --- |
| client\_id | Yes | String | Your client ID. |
| client\_assertion\_type | No  | String | Specifies the type of value of client assertion. Refer to the Okta docs [here](https://developer.okta.com/docs/reference/api/oidc/). For example: `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. This must be present if `client_secret` is not provided. |
| client\_assertion | No  | String | The assertion related to the `client_assertion_type` above. It must be present if the `client_secret` is not provided. The audience used to generate this assertion must be `token_endpoint` provided as a part of application onboarding. |
| client\_secret | No  | String | The secret related to the `client_assertion_type`. It must be present if BOTH `client_assertion_type` and `client_assertion` are not provided. |
| grant\_type | Yes | String | Determines the mechanism the identity provider uses to initiate the creation of the tokens. Use the string literal `authorization_code`. |
| code | Yes | String | The authorization code that was returned from the `/authorize` endpoint. |
| redirect\_uri | Yes | String | Specifies the callback location where the authorization was sent. This value must match the `redirect_uri` parameter that was passed to the `/authorize` endpoint. |

<InlineAlert slots="header, text" />

Tip

If you want the response to this request to include a refresh token, you must have the scope `offline_access` enabled. In the authorization code flow, this means that you need to include `offline_access` as part of `scope` in your GET request to `/authorize`.

#### Request with Refresh Token

**Request Body Parameters**

| Parameter | Required | Data Type | Description |
| --- | --- | --- | --- |
| client\_id | Yes | String | Your client ID. |
| client\_assertion\_type | No  | String | Specifies the type of value of client assertion. Refer to the Okta docs [here](https://developer.okta.com/docs/reference/api/oidc/). For example: `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. This must be present if `client_secret` is not provided. |
| client\_assertion | No  | String | The assertion related to the `client_assertion_type` above. It must be present if the `client_secret` is not provided. The audience used to generate this assertion must be `token_endpoint` provided as a part of application onboarding. |
| client\_secret | No  | String | The secret related to the `client_assertion_type`. It must be present if BOTH `client_assertion_type` and `client_assertion` are not provided. |
| grant\_type | Yes | String | A grant type with a value such as `refresh_token`. It determines the mechanism the identity provider uses to initiate the creation of the tokens. |
| refresh\_token | Yes | String | The value is a valid refresh token that was returned from this endpoint previously. |

##### Request Impersonation

Exchanges a previously acquired token for an account/group admin inside an organization and scope to one for a selected user inside the organization. The parameters are based on RFC 8693.

**Request Body Parameters**

| Parameter | Required | Data Type | Description |
| --- | --- | --- | --- |
| client\_id | Yes | String | Your client ID. |
| client\_assertion\_type | No  | String | Specifies the type of value of client assertion. Refer to the Okta docs [here](https://developer.okta.com/docs/reference/api/oidc/). For example: `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. This must be present if `client_secret` is not provided. |
| client\_assertion | No  | String | The assertion related to the `client_assertion_type` above. It must be present if the `client_secret` is not provided. The audience used to generate this assertion must be `token_endpoint` provided as a part of application onboarding. |
| client\_secret | No  | String | The secret related to the `client_assertion_type`. It must be present if BOTH `client_assertion_type` and `client_assertion` are not provided. |
| grant\_type | Yes | String | Should have the value as `:urn:ietf:params:oauth:grant-type:token- exchange` |
| scope | Yes | String | A space-separated list of scopes (%20 when URL-encoded) that the client wants to includ in the access token. Please note:*The scopes being requested must be a subset of the actor\_token scopes*   Impersonation scopes can’t be requested (`acc_imp`, `group_imp`), even though they will be granted to `actor_token`. |
| actor\_token\_type | Yes | String | This should have have a value such as `access_token`. Though not specified to be passed in tables above the `access_toke` is granted for 3.1 and 3.2 as well. |
| subject\_token\_type | Yes | String | Should have the value as: `jwt` |
| subject\_token | Yes | String | For passing the subject user information for which impersonation is requested. It uses an unsecured user info `jwt_token` as per RFC 7519. A sample value for a subject with user ID [service-fedramp-dev@adobesignintegrationsdemo.com](mailto:service-fedramp-dev%40adobesignintegrationsdemo.com) might be:eyJhbGciOiJub25lIn0\=.eyJ1c2VyX2VtYWlsIj<  snip  \>5pbnRlZ3JhdGlvbnNkZW1vLmNvbSJ9Copy to clipboardThe value is obtained by doing a base64 encode of {“alg”:”none”} and concatenating it with a base64 encode of {“user\_email”:”[service-fedramp-dev@adobesignintegrationsdemo.com](mailto:service-fedramp-dev%40adobesignintegrationsdemo.com)”} separated by a period (.) as follows:{“alg”:”none”}.{“user\_email”:”[service-fedramp-dev@adobesignintegrationsdemo.com](mailto:service-fedramp-dev%40adobesignintegrationsdemo.com)”} |
| actor\_token | Yes | String | The admin token for which impersonation is requested. **Note**: The passed admin token should have an impersonation scope of `acc_imp` or `group_imp`. |

#### Success Response

The API returns the following JSON attributes on success:

| Parameter | Description |
| --- | --- |
| access\_token | An access token. |
| token\_type | The audience (Bearer) of the token. |
| expires\_in | The expiration time of the access token in seconds. |
| scope | The scopes (space separated) contained in the access token. |
| refresh\_token | Refresh Token, which can be used to get a fresh Access Token. This would not be returned from an impersonation flow token generation. |

#### Error response

The API returns the following JSON attributes on error:

| Parameter | Description |
| --- | --- |
| error | The error code, if something went wrong. |
| error\_description | Additional error information (if any). |

**Error Codes**

| error | error\_code | error\_description |
| --- | --- | --- |
| invalid\_client | 400 | The client credentials are invalid or expired. |
| invalid\_grant | 400 | The code or `refresh_token` or `redirect_uri` in combination with grant\_type is invalid. |
| invalid\_request | 400 | &lt;Parameter Name&gt; is missing or empty or invalid. |
| invalid\_scope | 400 | The scopes list contains an invalid or unsupported value. |
| invalid\_authenticating\_token | 401 | actor\_token is missing or invalid. |
| unsupported\_grant\_type | 400 | The `grant_type` isn’t authorization\_code , `refresh_token` or token\_exchange. |
| invalid\_body | 400 | The `actor_token` or `user_id` provided ineligible for issuing a token. |
| internal\_server\_error | 500 | Service Error |

### Validate Token

**Summary:** This endpoint takes an access, ID, or refresh token, and returns a boolean that indicates whether it is active or not. If the token is active, additional data about the token is also returned. If the token is invalid, expired, or revoked, it is considered inactive.

#### Common request elements

*   **Method**: POST

*   **Authorization required**: No

*   **Content-Type:**: application/x-www-form-urlencoded

*   **Available versions**: `https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/validate_token`

**Request Body Parameters**

| Parameter | Required | Data Type | Description |
| --- | --- | --- | --- |
| client\_id | Yes | String | Your client ID. |
| client\_assertion\_type | No  | String | Specifies the type of value of client assertion. Refer to the Okta docs [here](https://developer.okta.com/docs/reference/api/oidc/). For example: `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. This must be present if `client_secret` is not provided. |
| client\_assertion | No  | String | The assertion related to the `client_assertion_type` above. It must be present if the `client_secret` is not provided. The audience used to generate this assertion must be `token_endpoint` provided as a part of application onboarding. |
| client\_secret | No  | String | The secret related to the `client_assertion_type`. It must be present if BOTH `client_assertion_type` and `client_assertion` are not provided. |
| token | Yes | String | Token that needs to be validate |
| type | Yes | String | Type Of token being passed(Accepted Values :access\_token, `id_token,` `authorization_code,` `refresh_token` .) |

#### Success Response

The API returns the following JSON attributes on success:

| Parameter | Description |
| --- | --- |
| scope | A space-delimited list of scopes |
| valid | boolean to determine, If the provided token is valid |
| fg  | Floodgate value as described in the [here](https://wiki.corp.adobe.com/display/ims/Floodgate+in+IMS). |
| audience | The audience of the token |
| expires\_in | The duration in seconds for which the token is valid since the issued\_at time. |
| expires\_at | The expiration time of the token in seconds since January 1, 1970 UTC. |
| client\_id | The ID of the client associated with the token |
| device\_id | The ID of the device associated with the token |
| id  | The identifier of the token |
| issuer | The issuer of the token |
| issued\_at | The issuing time of the token in seconds since January 1, 1970 UTC. |
| as  | The short name of the authorization server that issued the token. |
| subject | The subject of the token |
| type | The type of token. |
| user\_id | The user ID. This parameter is returned only if the token is an access token and the subject is an end user. |

#### Error response

The API returns the following JSON attributes on error:

| Parameter | Description |
| --- | --- |
| error | Error Code |
| error\_description | Error Reason |

**Error Codes**

| error | error\_code | error\_description |
| --- | --- | --- |
| invalid\_client | 400 | The client credentials are invalid. |
| invalid\_request | 400 | &lt;Parameter Name&gt; is missing or empty/invalid. |
| `token_type_mismatch` | 400 | The `type` field was specified in the request, but it does not match the actual token type |
| internal\_server\_error | 500 | Service Error |

### Invalidate Token

**Summary:** The API takes an access or refresh token and revokes it.

#### Request

*   **Method**: POST

*   **Authorization required**: No

*   **Content-Type:**: application/x-www-form-urlencoded

*   **Available versions**: `https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/invalidate_token`

**Request Body Parameters**

| Parameter | Required | Data Type | Description |
| --- | --- | --- | --- |
| client\_id | No  | String | Your client ID. |
| client\_assertion\_type | No  | String | Specifies the type of value of client assertion. Refer to the Okta docs [here](https://developer.okta.com/docs/reference/api/oidc/). For example: `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`. This must be present if `client_secret` is not provided. |
| client\_assertion | No  | String | The assertion related to the `client_assertion_type` above. It must be present if the `client_secret` is not provided. The audience used to generate this assertion must be `token_endpoint` provided as a part of application onboarding. |
| client\_secret | No  | String | The secret related to the `client_assertion_type`. It must be present if BOTH `client_assertion_type` and `client_assertion` are not provided. |
| token | Yes | String | Token that needs to be validated |
| token\_type | Yes | String | Type Of token being passed(Accepted Values :access\_token, `id_token,` `authorization_code,` `refresh_token` .) |

#### Success Response

On success, the response has the HTTP **200** (OK) status code. This means only that the authorization was accepted, but it does not indicate the success or failure of the operation. The validate token API can be used to confirm that the token was successfully invalidated.

#### Error Response

The API returns the following JSON attributes on error:

| Parameter | Description |
| --- | --- |
| error | Error Code |
| error\_description | Error Reason |

**Error Codes**

| error | error\_code | error\_description |
| --- | --- | --- |
| invalid\_client | 400 | The client credentials are invalid. |
| invalid\_request | 400 | &lt;Parameter Name&gt; is missing or empty/invalid. |
| `token_type_mismatch` | 400 | The `type` field was specified in the request, but it does not match the actual token type |
| internal\_server\_error | 500 | Service Error |

### Logout

This endpoint logs the web browser user out of the identity provider if the subject matches that in the current identity provider session. An optional `redirect_uri` may be specified to redirect the browser after the logout is performed. Otherwise, the browser is redirected to the identity provider sign-in page.

Logout is meant to be used as a URL link navigation from an interactive web browser UI, whereas Invalidate Token is meant to be used as a service API call.

#### Request

*   **Request method**: GET

*   **Authorization required**: No

*   **Available versions**: `https://secure.na1.adobesign.us/api/gateway/adobesignauthservice/api/v1/logout`

**Request Query Parameters**

| Parameter | Required | Data Type | Description |
| --- | --- | --- | --- |
| client\_id | Yes | String | Your client ID. |
| access\_token | Yes | String | The revoked `access_token`. |
| redirect\_uri | No  | String | User will be redirected here at the end of the logout process. |

#### Success Response

After internal redirects, the identity provider redirects the user agent back to the supplied `redirect_uri` location (if provided).

#### Error response

The API returns the following JSON attributes on error:

| Parameter | Description |
| --- | --- |
| error | The error code, if something went wrong. |
| error\_description | Additional error information (if any). |

**Error Codes**

| error | error\_description |
| --- | --- |
| invalid\_client | The specified client ID is invalid. |
| invalid\_request | &lt;Parameter Name&gt; is missing or empty/invalid. |
| internal\_server\_error | Service Error |

## Clickjacking defense for sign views

API Applications using Sign Views in iframes or WebViews must leverage the clickjacking defense for Sign APIs. To do so, use the `frameParent` property with Sign `POST .../agreements/.../views`

*   `frameParent: <domain suffix`; for example, “adobe.com”.

*   The domain suffix is the domain to at least the 2nd level; for example, “adobe.com” but NOT just the top level “com”.

*   The domain suffix will also support a full origin such as `https://secure.adobesign.com`, but it will not support a wildcard (\*) domain prefix.

*   You can also use multiple domains as comma-separated values.

<InlineAlert slots="header, text" />

Tip

See [https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/createAgreementView](https://secure.na1.adobesign.com/public/docs/restapi/v6#!/agreements/createAgreementView).

## Signer authentication mechanisms

The following signer authentication mechanisms are available:

*   Email

*   Password

*   Phone

*   Knowledge-Based Authentication (KBA)

*   Acrobat Sign

*   Government ID

*   Digital Identity Gateway

------------------------------------
© Copyright 2023, Adobe Inc..  Last update: Aug 04, 2023.
![](../_static/adobelogo.png
