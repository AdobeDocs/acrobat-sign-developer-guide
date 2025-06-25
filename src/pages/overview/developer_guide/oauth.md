---
title: Managing Oauth Tokens
---
# Managing Oauth Tokens

<InlineAlert slots="text" />

Sign Gov admins should note the minor differences from the content below. *Described HERE* [`https://developer.adobe.com/acrobat-sign/signgov/diffs.md`](../signgov/diffs.md).

## Authorization request

See [Create an authorization request link](gstarted.md#create-an-authorization-request-link)

## Access token request

See [Getting the access token](gstarted.md#getting-the-access-token)

## Refresh token request

You can find a customer’s instance using the state ID and store the tokens.

Since an access token expires in one hour (`expires_in`: 3600), use the refresh token to request new access tokens. You’ll call same access point (e.g. <span style="color: red;">$api_access_point = `https://api.na1.echosign.com`</span>), but you’ll POST to <span style="color: red;">`https://api.na1.echosign.com/oauth/refresh`</span>. Note the following:

-  The refresh token expires after 60 days of inactivity.
-  A client can continue to use a refresh token indefinitely as long as it is being used at least once every 60 days.
-  Every time you use the refresh token to get a new access token, reset the expiration on the refresh token to 60 days from the current time.
-  If you are concerned about slow or no activity causing the refresh token to expire, set up a job that refreshes the access token every 1-N days (e.g. 50)

```text
POST /oauth/v2/refresh HTTP/1.1
Host: api.na1.adobesign.com
Content-Type: application/x-www-form-urlencoded

  refresh_token=2AAABLKmtbUAK7FeMV0hAiLf_W5x38LM67PXHapM&
  client_id=xxxxxxxxxx&
  client_secret=xxxxxxxxxx&
  grant_type=refresh_token
```

| Parameter | Value | Required? | Description |
|---|---|---|---|
| grant_type | refresh_token | yes | The value must always be refresh_token. |
| client_id | The ID obtained from the OAuth configuration page. | yes | Identifies the application. |
| client_secret | The ID obtained from the OAuth configuration page. | yes | Authenticates the application. |
| refresh_token | The refresh token received during the previous step. | yes |  |


## Revoking a token

You can revoke both access tokens and refresh tokens. If an access token is revoked and it has a corresponding refresh token, the refresh token is also revoked. When a refresh token is revoked, all the access tokens issued from that refresh token are also revoked. Revoke tokens via a POST call to the /oauth/v2/revoke endpoint (using the <span style="color: red;">api_access_point</span> retrieved in the Access Token Request step) with the following:

| Parameter | Value | Required? |
|---|---|---|
| token | OAuth access or refresh token | yes |


```text
POST /oauth/v2/revoke HTTP/1.1
Host: api.na1.adobesign.com
Content-Type: application/x-www-form-urlencoded

token=2AAABLKmtbUAK7FeMV0hAiLf_W5x38LM67PXHapM*&
```

If request succeeds, an HTTP success code 200 returns without any body. If the request fails, the following error codes are returned in JSON format:

| HTTP Status Code | Error Code | Description |
|---|---|---|
| 400 | INVALID_REQUEST | Empty or missing token |
| 400 | EXPIRED_TOKEN | The token is expired or already revoked |
| 400 | INVALID_TOKEN | This is not a valid OAuth access or refresh token |

