---
title: Partner Application Quickstart v.1.0 — Acrobat Sign Embed  (v 1.0)
description: Create, manage, track, and automate signing workflows with the Acrobat Sign APIs. Create apps that integrate with Adobe's enterprise-class product lineup. Download JAVA, JS, C#, REST, or OpenAPI SDKs, test with Postman, or use Acrobat Sign Embed and the Solutions for Government APIs
---

# Partner Application Quickstart v.1.0

<InlineAlert slots="text" />

Your feedback is valuable and is vital in improving our product and documentation. Send suggestions to [acrobatsignembed@adobe.com](mailto:acrobatsignembed@adobe.com).

## Create an app in the web UI

To use Acrobat Sign APIs, create an application.

1. [Log in to Acrobat Sign](https://secure.adobesign.com/public/login).
2. Select **API** from the top menu. If you are already an enterprise customer, you may not see the API link. In that case, choose **Account**.
3. Select **API Applications**.

<div style="width: auto; border: 1px solid #EAEAEA; box-shadow: rgba(50, 50, 93, 0.25) 2px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; margin: 24px 0">
    <img src="_images/sign_gstarted_1.png" alt="_images/sign_gstarted_1.png" />
</div>

4. Select the **Create** (+) icon and provide details about your app.
5. Choose a domain based on the intended use:

+ **CUSTOMER**: Apps that only access your account or are used for internal use and testing.
+ **PARTNER**: Select this type if you’re developing an application for other users and your app needs access to other Acrobat Sign accounts.

<InlineAlert slots="text" />

PARTNER applications [must be certified](https://www.adobe.com/go/esign-dev-cert) to have full access to other accounts.

<div style="width: auto; border: 1px solid #EAEAEA; box-shadow: rgba(50, 50, 93, 0.25) 2px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; margin: 24px 0">
    <img src="_images/sign_gstarted_3.png" alt="_images/sign_gstarted_3.png" />
</div>

### Get the app ID and secret

1. Select **API Applications** to view your app list.
2. Select your app to view its action menu.

<div style="width: auto; border: 1px solid #EAEAEA; box-shadow: rgba(50, 50, 93, 0.25) 2px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; margin: 24px 0">
    <img src="_images/apiapps.png" alt="_images/apiapps.png" />
</div>

3. Select **View/Edit** to get the application ID and secret.
4. Save the app’s application ID and secret. You’ll use this information to issue access tokens in the Acrobat Sign API.

<InlineAlert slots="text" />

Your new partner application is *uncertified* until you complete the partner certification process. You will be able to test the process of getting Acrobat Sign accounts connected to it by changing certain settings in the test/customer account (described below).

<iframe
  style="margin: 2em 0 2em 0; position: relative; z-index: 10;"
  allowfullscreen
  width="100%"
  height="540"
  src="https://video.tv.adobe.com/v/38178/?mute=true"
  frameborder="0">
</iframe>

### Configure OAuth

The OAuth process requires that the client application request permissions from the end user before performing any actions on their behalf. The workflow redirects users to the Acrobat Sign application where they authenticate and grant the requested permissions. Acrobat Sign then redirects users back to the client application. Acrobat Sign uses the [OAuth 2.0 authentication protocol](https://tools.ietf.org/html/rfc6749) to authorize requests for any Sign API endpoint.

Once you have created your application, configure OAuth as follows:

+ Click **Configure OAuth for the Application** link to configure your OAuth integration.
+ Specify a secure (https) redirect URL to your servers/website (see [Configure the redirect URI on your server](./gstarted.md#config-redirect-uri)).

### Configure scopes

You now need to add the permissions and scopes needed by your app when it interacts with the Sign APIs. Scopes describe what resources and actions your application will access. If you apply for Certification, Adobe will review the enabled scopes to confirm that they match the intended application use.

Your application’s OAuth authorization requests include a scope parameter describing the permissions. Note the following:

+ The requested scopes must be a subset of the scopes that are enabled for the application.
+ The requested scopes must be appropriate for the action the user is attempting to perform.
+ The user will be asked to authorize the requested permissions for your application.

When your application makes API calls using the access token, the calls must be permitted by the scopes associated with the access token. For example, to call GET /agreements, the <span style="color: #e74c3c">agreement_read</span> scope must have been requested and authorized.

While this screen sets the max allowable scopes, every token does not exercise them all. You can create different tokens for various users, and specific scenarios may use one or more of the scopes. Limit the scopes to those that you intend to request through OAuth. For example, <span style="color: #e74c3c">agreement_send:account user_login:self</span> would allow the application to send on behalf of any user in the account and also log in on behalf of the user that authorized the request.

<InlineAlert slots="text" />

Only Group Admins can approve OAuth requests that use the <span style="color: #e74c3c">:group</span> scope modifier, and only account admins can approve OAuth requests that use the <span style="color: #e74c3c">:account</span> scope modifier.

<InlineAlert slots="text" />

It is often easier to enable everything during development since it is easy to adjust later.

To set the scopes:

1. Check the **Enabled** checkbox for each needed scope.
2. Set the modifier.
3. Choose **Save**.

<div style="width: auto; border: 1px solid #EAEAEA; box-shadow: rgba(50, 50, 93, 0.25) 2px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; margin: 24px 0">
    <img src="_images/scopes.png" alt="_images/scopes.png" />
</div>

The following modifiers are available:

<table columnWidths="15,85">
    <thead>
        <tr>
            <th>Modifier</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>self</td>
            <td>Perform the specified action on behalf of the authorizing user. This is the default: for example, <span style="color: #e74c3c">agreement_send:self</span> is the same scope as <span style="color: #e74c3c">agreement_send</span></td>
        </tr>
        <tr>
            <td>group</td>
            <td>Perform the specified action on behalf of any user in the same group as the authorizing user. The authorizing user must be a group admin to grant this scope and must have the Business or Enterprise edition of Acrobat Sign.</td>
        </tr>
        <tr>
            <td>account</td>
            <td>Perform the specified action on behalf of any user in the same account as the authorizing user. The authorizing user must be an account admin to grant this scope and must have the Business or Enterprise edition of Acrobat Sign.</td>
        </tr>
    </tbody>
</table>

## Create an authorization request link

Your app must include a link your customers use to initiate the OAuth request process. The OAuth process starts with the client directing the user’s browser request to the /public/oauth/v2 endpoint with the requisite query string parameters. You are simply invoking the Acrobat Sign APIs here. For example:

For partner apps the Base URI (Acrobat Sign endpoint) should NOT contain the “shard” of an account (i.e.: na1, na2, eu1, jp1, etc.)

```text
https://secure.echosign.com/public/oauth/v2?
   redirect_uri=https://your-oAuthInteraction-Server/your-oAuth-Page.html&
   response_type=code&
   client_id=xxxxxxxxxx&
   state=xxxxxxxxxx&
   scope=user_read:account+user_write:account+user_login:account+agreement_read:account+agreement_write:account+agreement_send:account+widget_read:account+widget_write:account+library_read:account+library_write:account+workflow_read:account+workflow_write:account
```

<table columnWidths="16,34,5,45">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Required?</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>response_type</td>
            <td>code</td>
            <td>yes</td>
            <td>The value must always be <span style="font-style: italic">code</span>. Tells the process you’re looking for the OAuth code on the redirect URI once your customer logs in and accepts the auth permissions.</td>
        </tr>
        <tr>
            <td>client_id</td>
            <td>Your ID obtained from the OAuth configuration page.</td>
            <td>yes</td>
            <td>Identifies to Acrobat Sign what application your customer is requesting a token for (the one for your app/platform)</td>
        </tr>
        <tr>
            <td>redirect_uri</td>
            <td>Your custom, secure, and absolute URI; for example, <a href="https://your-oAuthInteraction-Server/your-oAuth-Page.html" style="color: #2980b9; text-decoration: none">https://your-oauthinteraction-server/your-oAuth-Page.html</a>.</td>
            <td>yes</td>
            <td>Redirects users here at the end of the authorization process. The value must belong to the set of values specified on the OAuth Configuration page.</td>
        </tr>
        <tr>
            <td>scope</td>
            <td>A space-delimited set of permissions specified during the OAuth configuration setup on the Configure OAuth page.</td>
            <td>yes</td>
            <td>The permissions that the user will be asked to approve</td>
        </tr>
        <tr>
            <td>state</td>
            <td>Any string</td>
             <td>no</td>
            <td>This value returns to the client as a parameter at the end of the authorization process. While not required, use of the <span style="color: #e74c3c">state</span> parameter is <span style="font-style: italic">highly recommended</span> to protect against CSRF <a href="https://tools.ietf.org/html/rfc6749#section-10.12" style="color: #2980b9; text-decoration: none">as described in the RFC</a>. You can use it to pass a unique ID that will be passed to the redirect URI so your system knows which client/instance requested the token and where to save it inside your platform.</td>
        </tr>
    </tbody>
</table>

## Configure the redirect URI on your server {#config-redirect-uri}

Next, create a public redirect URI on your servers that captures the account details and code sent from your app’s authorization request so that the workflow connects to the customer’s Acrobat Sign account. The request URL that links your customer’s app instance to the Acrobat Sign account contains the permission parameters and account level (self, group, or account) that your API integration needs to enable the specified actions.

<div style="width: auto; border: 1px solid #EAEAEA; box-shadow: rgba(50, 50, 93, 0.25) 2px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; margin: 24px 0">
    <img src="_images/redirecturi.png" alt="_images/redirecturi.png" />
</div>

The redirect URI specified in your OAuth requests must belong to this list of URIs. You can mention multiple URIs as comma separated list.

1. Select **Configure OAuth for Application**.
2. Enter your URL.
3. Before continuing, set the scopes as described below.

<InlineAlert slots="text" />

If you’re building a partner app and would like to learn more about using redirects, see [What’s needed on the redirect URI page?](https://www.evernote.com/shard/s517/client/snv?noteGuid=4dcab9ae-99ea-4ad4-ae98-ffb86f95ebf9&noteKey=5f43b16e95b2329d&sn=https%3A%2F%2Fwww.evernote.com%2Fshard%2Fs517%2Fsh%2F4dcab9ae-99ea-4ad4-ae98-ffb86f95ebf9%2F5f43b16e95b2329d&title=What%25E2%2580%2599s%2Bneeded%2Bon%2Bthe%2B%25E2%2580%259Credirect%2BURI%25E2%2580%259D%2Bpage%253F)

## Success vs failure

When your customer initiates the OAuth process by clicking your app’s Sign link, their browser redirects to the <span style="color: #e74c3c">redirect_uri</span> specified in the initial request. Query string parameters are added to indicate whether the request succeed or failed.

***Success***

<table columnWidths="15,85">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>code</td>
            <td>The authorization code which the client must use when requesting access tokens.</td>
        </tr>
        <tr>
            <td>state</td>
            <td>The value of state initially passed in, if any.</td>
        </tr>
    </tbody>
</table>

***Failure***

<table columnWidths="15,85">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>error</td>
            <td>One of:
                <ul style="padding-left: 15px">
                    <li>INVALID_REQUEST: the request is not well formed due to missing or invalid parameters</li>
                    <li>UNAUTHORIZED_CLIENT: OAuth is not enabled for this application or the application isn’t active</li>
                    <li>INVALID_SCOPE: the requested scopes are not syntactically valid</li>
                    <li>ACCESS_DENIED: the user declined to grant access or wasn’t able to (for example, they weren’t an admin)</li>
                    <li>SERVER_ERROR: an internal error occurred while processing the request</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>state</td>
            <td>The value of state initially passed in, if any.</td>
        </tr>
    </tbody>
</table>

## The customer experience

<InlineAlert slots="text" />

Try out the [live demo](https://secure.na1.adobesign.com/public/oauthDemo).

1. Customers are routed to Acrobat Sign’s main log in page if they are not already logged in.
2. After signing in, a confirmation screen appears.
3. When the user selects **Allow Access**, the page redirects to the URL defined on your server (see above). The process adds the query string parameters the app needs to retrieve the refresh and access tokens for making API calls.

<div style="width: auto; border: 1px solid #EAEAEA; box-shadow: rgba(50, 50, 93, 0.25) 2px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; margin: 24px 0">
    <img src="_images/allowaccess.png" alt="_images/allowaccess.png" />
</div>

```text
https://your-oauthinteraction-server/your-oAuth-Page.html?
code=CBNCKBAAHBCAABAApvoU1TLVOj_GOmst9KP&
state=uhuhygtf576534&
```

<table columnWidths="15,85">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>code</td>
            <td>In this example, CBNCKBAAHBCAABAApvoU1TLVOj_GuGynhtExjJbQNOmst9KP is the code your system uses to make the actual API call to get tokens. <strong>It is valid for only 5 minutes.</strong></td>
        </tr>
        <tr>
            <td>state</td>
            <td>The string your system provided which identifies the instance of your application/platform making this request. state provides a way for you to return your customer to the app as well as know for which app instance you need to store tokens.</td>
        </tr>
    </tbody>
</table>

## Getting the access token

If the previous steps succeeded, request an access token by sending the authorization code along with the client ID and client secret to the Sign service. The client makes an HTTP POST to the /oauth/v2/token endpoint (using [https://api.na1.adobesign.com](https://api.na1.adobesign.com/)) with the following parameters in the post body (not through query parameters):

```text
POST /oauth/v2/token HTTP/1.1
Host: api.na1.adobesign.com
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

  grant_type=authorization_code&
  code=CBNCKBAThIsIsNoTaReAlcs_sL4K32wCzs4N&
  client_id=xxxxxxxxxx&
  client_secret=xxxxxxxxxx&
  redirect_uri=https://myserver.com HTTP/1.1
```

The response returns the following JSON body containing the access token and the refresh token:

```json
{
   "access_token":"3AAABLblThIsIsNoTaReAlToKeNPr6Cv8KcZ9p7E93k2Tf",
   "refresh_token":"3AAABLblThIsIsNoTaReAlToKeNWsLa2ZBVpD0uc*",
   "token_type":"Bearer",
   "expires_in":3600,
   "api_access_point ":"https://api.na1.adobesign.com/",
   "web_access_point":" https://secure.na1.adobesign.com/"
}
```

<table columnWidths="20,80">
    <thead>
        <tr>
            <th>Name</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>access_token</td>
            <td>Use this token to access any Acrobat Sign API endpoint.</td>
        </tr>
        <tr>
            <td>refresh_token</td>
            <td>If your access token expires, use the refresh token to request a new access token. Keep your client ID and secret handy to request a new access token from a refresh token.</td>
        </tr>
        <tr>
            <td>token_type</td>
            <td>Always “Bearer”</td>
        </tr>
        <tr>
            <td>expires_in</td>
            <td>The number of milliseconds in which the access token expires.</td>
        </tr>
        <tr>
            <td>api_access_point</td>
            <td>Use this endpoint for Sign API access; it the base URI to be used for subsequent calls (/oauth/v2/refresh and /oauth/v2/revoke)</td>
        </tr>
        <tr>
            <td>web_access_point</td>
            <td>Use this endpoint to open Sign Web, e.g. web_access_point + “/public/login” OR web_access_point + “/public/logout” .</td>
        </tr>
    </tbody>
</table>
