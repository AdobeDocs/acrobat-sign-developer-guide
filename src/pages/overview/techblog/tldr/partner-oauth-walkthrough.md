---
title: Setting up a Partner OAuth Application
---
# Setting up a Partner OAuth Application

Last update: Apr 06, 2023.

Read the [Adobe Acrobat Sign OAuth doc](https://secure.echosign.com/public/static/oauthDoc) to start with an overview. The steps below walk you through the details.

1. [Create a "partner" app in your dev account](#create-a-partner-app-in-your-dev-account) — The necessary first action.
2. [Configure OAuth for the new app](#configure-oauth-for-the-new-app) — What permissions and access level do you need for your application API token?
3. [Add a link to your platform for an OAuth request](#add-a-link-to-your-platform-for-an-oauth-request) — This is how your customers will start the OAuth process.
4. [What does this OAuth process look like for your customers?](#what-does-this-oauth-process-look-like-for-your-customers) — More detail on the end-user experience and some code/process discussion.
5. [What's needed on the "redirect URI" page?](#whats-needed-on-the-redirect-uri-page) — More "nuts and bolts" for the developers.

## Create a partner app in your dev account

To start, you will need a [developers account on Adobe Acrobat Sign](https://acrobat.adobe.com/us/en/why-adobe/developer-form.html).

Once you have the account set up, log in and create a new partner application:

**Account > Acrobat Sign API > API Applications > +**

Fill out the form with your application name and domain, selecting **PARTNER** as the domain type.

Your new partner application will be "uncertified" until you have completed the [partner certification process](../qa/partners/certification-process.md). Still, you will be able to test the process of getting Adobe Sign accounts connected to it by changing some settings in the test/customer account.

## Configure OAuth for the new app

### What permissions and access levels do you need for your application?

To configure OAuth settings for a partner app, log into the developer account where you created the new partner app. Find the app, select it, and click **Configure OAuth for application**:

**Account > Acrobat Sign API > API Applications > AppName > Configure OAuth for application**

You now need to add the permissions and "scopes" that will be used by your application when it interacts with the Adobe Sign APIs, as well as the _redirect URI_ — a URL available publicly on your infrastructure that can capture the account details and code from the OAuth request.

The process of capturing this data and making the API call to get the "refresh" and "access" tokens will need to be done through code on your redirect URI page housed on your servers.

<InlineAlert slots="header, text" />

Note

These "scopes" set the "upper limit" of what can be requested. Only Group Admins can approve OAuth requests that use the `:group` scope modifier, and only Account Admins can approve OAuth requests that use the `:account` scope modifier.

During dev cycles it may be best to enable everything, then limit to the minimum necessary scopes before certification. Limiting to the minimum required scopes is a certification requirement.

Once you have this configured, click **Save**.

## Add a link to your platform for an OAuth request

Your app will need a URL link your customers can use to start the OAuth request process. The link URL should look something like this:

```
https://secure.echosign.com/public/oauth?redirect_uri=https://your-oAuthInteraction-Server/your-oAuth-Page.html&response_type=code&client_id=xxxxxxxxxx&state=uhuhygtf576534&scope=user_read:account+user_write:account+agreement_read:account+agreement_write:account+agreement_send:account+widget_read:account+widget_write:account+library_read:account+library_write:account+workflow_read:account+workflow_write:account
```

### How this breaks down

- **Base URL** — The base URL to start the process. For partner apps, this should NOT contain the "shard" of an account (na1, na2, eu1, jp1, etc.).
- **Redirect URI** — `redirect_uri=` This comes from your application's OAuth settings configured in your Adobe Sign developer account. This must match the configured URI exactly.
- **Response Type** — `&response_type=code` Tells the process you're looking for the OAuth code on the redirect URI once your customer logs in and accepts the auth permissions.
- **Client ID** — `&client_id=` Your partner application's client ID from the developer account.
- **State** — `&state=` A unique string you generate that will be returned with the response so you can verify it came from your request.
- **Scope** — `&scope=` The permissions your app needs, separated by `+`.

## What does this OAuth process look like for your customers?

When a customer clicks your OAuth link, they are directed to an Adobe Sign login page. After logging in they will be presented with a permissions acceptance page showing what your app is requesting access to. Once they accept, they are redirected to your redirect URI with a `code` parameter in the URL.

Your redirect URI page must capture this code and exchange it for an access token and refresh token via API call.

## What's needed on the "redirect URI" page?

Your redirect URI page needs to:

1. Capture the `code` and `state` parameters from the URL.
2. Verify the `state` matches what you sent (prevents CSRF attacks).
3. Make a POST request to `https://secure.echosign.com/oauth/token` with:
   - `code` — The code from the redirect.
   - `client_id` — Your application's client ID.
   - `client_secret` — Your application's client secret (keep this encrypted and server-side only).
   - `redirect_uri` — Must match exactly what was configured.
   - `grant_type` — Use `authorization_code`.
4. Store the returned `access_token` and `refresh_token` in encrypted form for that customer's account.

<InlineAlert slots="header, text" />

Security

Always store tokens in encrypted format. Exposing tokens or the client secret is a security violation and will prevent certification. See the [OWASP top 10](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project) for general security guidelines.

<HorizontalLine />
© Copyright 2023, Adobe Inc..  Last update: Apr 06, 2023.
![](../../_static/adobelogo.png)
