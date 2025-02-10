
# Sign Gov and Commercial Comparison

The Acrobat Sign commercial and Sign Gov instances differ in some key ways as described below. 

Differences between Acrobat Sign Gov and Commercial

Item | Sign Gov | Commercial  
---|---|---  
Compliance | FedRAMP Moderate | PCI and HIPAA  
API application creation | By Adobe | Self-service: Account Admin’s can create API applications from Account page **Acrobat Sign API > API Applications**.  
Top-level domain | <span style="color: #e74c3c;">https://secure.na1.adobesign.us</span> | https://secure.adobesign.com  
Authentication mechanisms | OAuth only | Commercial accounts can use the legacy API keys, integration keys, and OAuth.  
OAuth | Does not support <span style="color: #e74c3c;">x-api-user</span> | Supports <span style="color: #e74c3c;">x-api-user</span>  
OAuth APIs | Uses only the APIs described here. | Uses [commercial APIs](https://secure.na1.adobesign.com/public/static/oauthDoc.jsp)  
Impersonation | Exchange admin token for a user-specific token since <span style="color: #e74c3c;">x-api-user</span> is unsupported. See [Impersonation](apps.html#impersonation). | Use an admin token with an <span style="color: #e74c3c;">x-api-user</span> header to impersonate users by their <span style="color: #e74c3c;">userId</span> or <span style="color: #e74c3c;">email</span>.  
Login hint parameter | The <span style="color: #e74c3c;">login_hint</span> query parameter is optional. | The <span style="color: #e74c3c;">login_hint</span> query parameter is required.  
Endpoints | See below. | See below.  

## Impersonation setup

Unlike Acrobat Sign’s commercial instance, Sign Gov does
not support:

  * Fine grained (scope-level) impersonation.
  * Impersonating users by passing the user ID or email of the user in the <span style="color: #e74c3c;">x-api-user</span> HTTP Header value as part of the REST API call.

Instead, in the Sign Gov environment:

>   * Impersonation applies to all the application scopes.
>   * <span style="color: #e74c3c;">x-api-user</span> is unsupported, and impersonation involves generating OAuth
> tokens via the <span style="color: #e74c3c;">/authorize</span> and <span style="color: #e74c3c;">/token</span> endpoints.
>

The Sign Gov impersonation process is as follows:

  1. Generate an <span style="color: #e74c3c;">admin_token</span> and associated <span style="color: #e74c3c;">admin_refresh_token</span>.
  2. Use the <span style="color: #e74c3c;">admin_token</span> to generate an <span style="color: #e74c3c;">impersonation_token</span>.

Note the following:

  * Only account admins can generate an <span style="color: #e74c3c;">admin_token</span> and each token can only be used to generate an impersonation token for users in the same account as the account admin.
  * The lifespan of the <span style="color: #e74c3c;">admin_token</span> is 5 min.
  * The <span style="color: #e74c3c;">admin_refresh_token</span> lifetime is unlimited, but will expire if inactive (not used) for more than 30 days.
  * You should persist the <span style="color: #e74c3c;">admin_refresh_token</span> in a secure storage location (for headless partner integration).

<InlineAlert slots="header, text" />

Tip

Check out the [Sign Gov Postman collection](https://www.postman.com/adobe/workspace/adobe-acrobat-sign/folder/24728226-8eb1bfa8-4d5b-4099-b960-b55601d92103?ctx=documentation).

## Authentication endpoints

Note both the domain and version differences below.
Sign Commercial endpoints:

>   * <span style="color: #e74c3c;">GET https://secure.na1.adobesign.com/public/oauth/v2</span>: Start the
> authorization code flow to login and consent to application permissions
>   * <span style="color: #e74c3c;">POST https://secure.na1.adobesign.com/oauth/v2/token</span>: Obtain an
> <span style="color: #e74c3c;">access_token</span> and <span style="color: #e74c3c;">refresh_token</span> upon successful completion and redirect
> back from the authorization code flow
>   * <span style="color: #e74c3c;">POST https://secure.na1.adobesign.com/oauth/v2/refresh</span>: Obtain a new
> <span style="color: #e74c3c;">access_token</span> based on a <span style="color: #e74c3c;">refresh_token</span>
>   * <span style="color: #e74c3c;">POST https://secure.na1.adobesign.com/oauth/v2/revoke</span>: Revoke an
> <span style="color: #e74c3c;">access_token</span> or <span style="color: #e74c3c;">refresh_token</span> and any related tokens
>

Sign Gov endpoints:

  * <span style="color: #e74c3c;">POST https://secure.adobesign.us/api/gateway/adobesignauthservice/api/v1/token</span>: Obtain an <span style="color: #e74c3c;">access_token</span> and <span style="color: #e74c3c;">refresh_token</span> upon successful completion and redirect back from the authorization code flow.
  * <span style="color: #e74c3c;">POST https://secure.adobesign.us/api/gateway/adobesignauthservice/api/v1/refresh</span>: Obtain a new <span style="color: #e74c3c;">access_token</span> based on a <span style="color: #e74c3c;">refresh_token</span>.
  * <span style="color: #e74c3c;">POST https://secure.adobesign.us/api/gateway/adobesignauthservice/api/v1/revoke</span>: Revoke an <span style="color: #e74c3c;">access_token</span> or <span style="color: #e74c3c;">refresh_token</span> and any related tokens.
  * <span style="color: #e74c3c;">POST https://secure.adobesign.us/api/gateway/adobesignauthservice/api/v1/logout</span>: Log the web browser user out of identity provider if the subject matches that in the current identity provider session.

## Web app user interface

Sign Gov customers will see minor web application
differences between their view and the Commercial view. For example, not all
account settings apply in the Sign Gov environment, and these are removed from
the user interface. ![_images/webappui.png](_images/webappui.png)
