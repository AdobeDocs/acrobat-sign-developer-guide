---
title: Webhooks in Acrobat Sign — Acrobat Sign Webhook Guide
description: Create, manage, track, and automate signing workflows with the Acrobat Sign APIs. Create apps that integrate with Adobe's enterprise-class product lineup. Download JAVA, JS, C#, REST, or OpenAPI SDKs, test with Postman, or use Acrobat Sign Embed and the Solutions for Government APIs
---

# Webhooks in Acrobat Sign

<InlineAlert slots="text" />

Announcement: All customers are migrating to webhooks 2.0 in 2023. For details, see [http://www.adobe.com/go/acrobatsigndevrnotes](http://www.adobe.com/go/acrobatsigndevrnotes).

Webhooks are developer-defined HTTPS requests that trigger when a subscribed event occurs. They allow for real-time notification of workflow events such as “signed” or “created” without having to poll Acrobat Sign for status; your app is automatically notified when an event occurs. The service simply makes an HTTPS POST request to the webhook’s HTTPS URL. In simple words, a webhook is a <b>web service that accepts data or a stream of data</b> from a source using a PUSH communication model. You can create webhooks can via the REST APIs as well as the Acrobat Sign web application.

While not explicitly stated, the webhook framework is the underlying mechanism used for multiple Acrobat Sign features; for example, any time a resource (agreement, webform, etc.)/user/group/account/application receives an event notification from Acrobat Sign, the “webhooks infrastructure” is in play.

+ Webhooks (created via Sign UI/API)
+ Callbacks for agreements (especially v5 endpoints)
+ 3rd party applications (Salesforce, iCertis, Veeva, Microsoft Teams, etc.)
+ Power Automate Sign connectors
+ And so on… This list is not exhaustive

Events are the reason for webhooks, and you control what events your Acrobat Sign integration listens for and how it responds. When a subscribed event occurs, Acrobat Sign constructs an HTTPS POST with a JSON body payload and delivers it to the specified URL. You can change the list of subscribed events through the API or UI anytime. Each event has a similar JSON schema based on the resource type, but the event type determines its unique payload object.

You can learn about and explore the JSON payloads by downloading the JSON files:

+ [Agreement event payloads](./payloads/agreementpayloads.7z)
+ [Library event payloads](./payloads/librarypayloads.7z)
+ [Bulk signing event payloads](./payloads/bulksignpayloads.7z)
+ [Form filling event payloads](./payloads/formfillpayloads.7z)

This guide provides details about each event, including:

+ A list of available events
+ Payload examples
+ Notification details
+ Error code

## Webhook changes

Webhooks regularly evolve with major releases. It’s a good idea to track updates by date from the [Developer Release Notes](https://www.adobe.com/go/acrobatsigndevrnotes)

## Best Practices

+ **Required**: Allow your network to communicate via the [latest designated IP range list](https://helpx.adobe.com/sign/system-requirements.html#ipranges)
+ Subscribe to specific, needed events to limit the number of HTTPS requests to the server.
+ Be duplicate resistant: If you have more than one app sharing the same webhook URL and the same user mapped to each app, the same event is sent to your webhook multiple times (once per app). In some cases, your webhook may receive duplicate events. Your webhook application should process event IDs to avoid unnecessary handling of duplicate events.
+ Always respond to webhooks quickly: Your app only has 5 seconds to respond to webhook requests. For the verification request, this is rarely an issue, since your app doesn’t need to do any real work to respond. For notification requests, however, your app will usually do something that takes time in response to the request; for example, if you need to process and then store signed documents. To make sure you can always respond within 5 seconds, process work on a separate thread or asynchronously using a queue.

  There are two app settings for timeouts:

  + WEBHOOK_REQUEST_TIMEOUT_VALIDATION: 5 seconds
  + CALLBACK_REQUEST_TIMEOUT: 45 seconds. This value impacts callback and webhook execution.
+ Manage concurrency: When a user makes several changes in rapid succession, your app is likely to receive multiple notifications for the same user at roughly the same time. If you’re not careful about how you manage concurrency, your app may process the same changes for the same user more than once.
+ Maximize efficiency by understanding your usage needs:
  + What data do you want to return in the payload?
  + Who will be accessing this information?
  + What decisions or reporting will be generated?
+ Recommendations for signed documents: There are several factors to consider when determining how to receive a signed PDF from Acrobat Sign. While it is perfectly acceptable to just select the Agreement Signed Document option while creating a webhook, you might consider using the Acrobat Sign API to retrieve the documents after receiving an Agreement Status Complete event.
+ Create unique webhooks: Acrobat Sign does not allow duplicate webhooks. The uniqueness of a webhook is based on a combination of the following attributes: - Subscription event - URL - Scope/ResoureType - Resource ID - Application ID/Client ID that you are using for the API call - Webhook creator (not considered in the cases of group-level and account-level webhooks) - If a webhook’s status is changed from INACTIVE to ACTIVE and another webhook with a similar configuration already exists in the ACTIVE state, the activation call will fail.

<InlineAlert slots="text" />

See also “UI vs. API configuration” below.

## UI vs. API configuration

You can customize the JSON payload via the [web user interface](https://helpx.adobe.com/sign/using/adobe-sign-webhooks-api.html) or via the API. However, only a subset of the available parameters can be toggled on and off from the online UI. Moreover, the API provides for fine-tuning your JSON payloads. For this reason, we do not recommend that partners use this method for platform integrations.

### The API “best practice”

As a best practice, set up webhooks via the API as a “resource” or per-agreement webhooks. There are a few reasons for this.

+ **Simplicity**: Webhooks set up in the UI fire for ALL agreements created by ANY means for that user, including all users in the group or all agreements for ALL users in the entire account. You would then have to determine a way to distinguish between the agreements created by your integrated platform or application and any other agreements going through that user’s account that were initiated elsewhere.
+ **Reliability**: With a single webhook, if there is an issue causing the webhook to fail, the entire webhook “train” stops until the failing instance of the webhook can go through. The 72-hour “retry” process starts but all the agreements created after that failure continue to “back up” behind that failed instance and that single 72-hour clock. If using the “best practice” of creating pre-agreement webhooks, each agreement has a unique 72 hour clock which starts on the 1st failure. This means that if there is some issue that causes webhooks to start failing, there is less data loss if the failure is long enough to result in a disabled webhook.
+ **Troubleshooting awareness**: If using this “per-agreement” process, your system will immediately detect that there is a webhook issue. You will not have to wait for customers to start complaining about their agreements not updating.

### Polling as a “backup” update method

It is also recommended to set up some sort of “polling” mechanism and some way to re-create these “per-agreement” webhooks if the creation step has failed, and the agreements are still in some “non-terminal” state. It’s also recommended to configure some client-side monitoring that alerts you if the webhook creation process is failing. If you’re using the “per-agreement” process, your system will recognize that the issue has happened right away instead of needing to wait till customers complain about their agreement statuses not staying “current”. It’s also a good idea to automatically start the “polling” process for those agreements immediately on detecting webhook creation failure.

### Update Agreement Status “manual” option

An additional “best practice” is to add an “update agreement status” button or trigger in your interface that “polls” Adobe Sign for a single agreement. If there is an issue, the user can manually update critical agreements and immediately get their status and/or a copy of the completed agreement. This is common for all of Acrobat Sign’s integrations.

## Workflow example

Webhooks are a useful tool for apps that want to receive and process real-time data updates happening in Acrobat Sign; for example, after an agreement is signed, update the status of that agreement in an on-premises Content Management System like SharePoint.

Instead of requiring your application to make an API call every X number of minutes to check for a specific event in Sign (also known as polling), you can register webhooks and push HTTPS POST notifications to your webhook’s URL, thereby telling your application when an event occurs. This push-based model requires fewer API requests overall, provides you with real-time updates, and allows you to build more robust apps while updating your application instantly.

Acrobat Sign webhooks notifications are generated by changes to the agreement as it progresses from the creation to the sent, completed or aborted state. In the webhook notification, we provide updated information about the status of these agreements, optionally including detailed information about the agreement, the participants, and finally, the signed document.

**A simple workflow for webhooks:**

1. A webhook client application (your app) calls <span style="color: #e74c3c">POST /webhooks</span> with a user token to register (“create”) a webhook for a resource.
2. Acrobat Sign validates that the request and the webhook URL is valid. There is a defined mechanism for this validation where Acrobat Sign makes an HTTPS GET request (with the calling application’s client ID in a custom HTTPS request header) to the webhook URL and the webhook URL is expected to respond in a specific way; see [Verification of intent](#verificationofintentofthewebhookurl).
3. Acrobat Sign sends a success response (any HTTPS 2XX code) to your client app with the unique webhook identifier and location header which contains the URL of the webhook resource created in Acrobat Sign.
4. Whenever an event happens in Acrobat Sign, a notification for that event is sent to the webhook URL.

## Creating a webhook

### Prerequisites

Before you can create webhooks in Acrobat Sign, do the following:

1. Obtain a unique set of application credentials (an application ID and an application secret). Account administrators generate these credentials through the Acrobat Sign API page under “My Profile”.
2. Webhook API calls require an OAuth access token. Each operation on a resource requires specific OAuth scope(s), and your application will need to request all of the needed scopes during the OAuth authorization process.
3. Use the access token received from the OAuth authentication and authorization process in the following REST endpoints to perform operations on behalf of the user who authorized the API access.
4. **OAuth scopes for webhooks**: Enable webhook scopes for your application before calling webhook APIs. The scopes <span style="color: #e74c3c">webhook_read</span>, <span style="color: #e74c3c">webhook_write</span>, and <span style="color: #e74c3c">webhook_retention</span> are needed to call GET, POST/PUT and DELETE APIs respectively.

### Configure a webhook and subscribe to events

To create a webhook in Acrobat Sign, you must configure a webhook URL, register it as a webhook with Acrobat Sign, and subscribe to specific events. by calling the POST /webhooks API from the **client application**. The subscription specifies how a subscriber intends to consume events. At the most basic level, a subscription needs the following fields:

+ **An event name**: The names of your subscribed events.
+ **A resource type and corresponding resource identifier**
+ **A webhook URL for receiving event notifications from Acrobat Sign**: This is the URL where your webhook will listen for HTTPS POST notifications sent by Acrobat Sign for all the events to which you’ve subscribed. The URL endpoint must be listening to port 443.

### Verifying webhook URL intent

Before registering a webhook successfully, Acrobat Sign verifies that the webhook URL provided in the registration request really intends to receive notifications. For this purpose, receiving a new webhook registration request invokes a verification request to the webhook URL. This verification request is an HTTPS GET request sent to the webhook URL with a custom HTTP header, X-ADOBESIGN-CLIENTID. The value in this header is set to the client ID (Application ID) of the API application that is requesting to register the webhook. To register a webhook successfully, the webhook URL must respond to this verification request with an HTTPS 2XX response code, and it also MUST send back the same client ID value in one of the following two ways.

#### Method 1: Custom response header

You can respond to the verification request in a custom response header, X-ADOBESIGN-CLIENTID. This is the same header which was passed in the request, and can be echoed back in the response.

<CodeBlock slots="heading, code" repeat="2" languages="JAVASCRIPT, JAVASCRIPT" />

#### Sample: JavaScript

```javascript
// Fetch client id
var clientid = request.headers['X-ADOBESIGN-CLIENTID'];

//Validate it
if (clientid ==="BGBQIIE7H253K6") # gitleaks:allow //Replace 'BGBQIIE7H253K6' with the client id of the application using which the webhook is created
{
    //Return it in response header
    response.headers['X-AdobeSign-ClientId'] = clientid;
    response.status = 200;  // default value
}
```

#### Sample: PHP

```javascript
<?php
// Fetch client id
$clientid = $_SERVER['HTTP_X_ADOBESIGN_CLIENTID'];
//Validate it
if($clientid == "BGBQIIE7H253K6") # gitleaks:allow //Replace 'BGBQIIE7H253K6' with the client id of the application using which the webhook is created
{
    //Return it in response header
  header("X-AdobeSign-ClientId:$clientid");
  header("HTTP/1.1 200 OK"); // default value
}
?>
```

#### Method 2: JSON response body

You can respond to the verification request in the JSON response body of the response with the key of <span style="color: #e74c3c">xAdobeSignClientId</span> and its value being the same client ID that was sent in the request.

<CodeBlock slots="heading, code" repeat="3" languages="JAVASCRIPT, JAVASCRIPT, JSON" />

#### Sample: JavaScript

```javascript
// Fetch client id
var clientid = request.headers['X-ADOBESIGN-CLIENTID'];
//Validate it
if (clientid ==="BGBQIIE7H253K6") # gitleaks:allow //Replace 'BGBQIIE7H253K6' with the client id of the application using which the webhook is created
{
    var responseBody = {
        "xAdobeSignClientId" : clientid // Return Client Id in the body
    };
    response.headers['Content-Type'] = 'application/json';
    response.body = responseBody;
    response.status = 200;
}
```

#### Sample: PHP

```javascript
<?php
// Fetch client id
$clientid = $_SERVER['HTTP_X_ADOBESIGN_CLIENTID'];
//Validate it
if($clientid == "BGBQIIE7H253K6") # gitleaks:allow //Replace 'BGBQIIE7H253K6' with the client id of the application using which the webhook is created
{
  //Return it in response body
  header("Content-Type: application/json");
  $body = array('xAdobeSignClientId' => $clientid);
  echo json_encode($body);
  header("HTTP/1.1 200 OK"); // default value
}
?>
```

#### Sample: JSON response body

```json
{
    "xAdobeSignClientId": "BGBQIIE7H253K6" /* gitleaks:allow */
}
```

**The webhook is successfully registered only on a success response (2XX response code) and the validation of the client ID in either the header or response body.** The purpose of this verification request is to demonstrate to Acrobat Sign that your webhook really does want to receive notifications at that URL. Had you accidentally entered the wrong URL, the webhook would fail to respond correctly to the verification-of-intent request, and Acrobat Sign would not send any notifications to that URL. Your app can also validate that it will receive notifications only through webhooks that are registered by a specific application. This can be done by validating the client ID of the application passed in the X-ADOBESIGN-CLIENTID header. If the webhook does not recognize that client ID, it MUST NOT respond with the success response code and Acrobat Sign will take care that the URL is not registered as a webhook.

The call to verify the webhook URL occurs in the following scenarios:

+ Registering a webhook: If the verification of webhook URL call fails, the webhook is not created.
+ Updating a webhook: INACTIVE to ACTIVE: If the verification of webhook URL call fails, the webhook state is not changed to ACTIVE.

### How to respond to a webhook notification

Acrobat Sign performs an implicit verification of intent in each webhook notification request that is sent to the webhook URL. Every webhook notification HTTPS request contains the customer HTTP header called X-ADOBESIGN-CLIENTID* The value of this header is the client ID (Application ID) of the application that created the webhook. We will consider the webhook notification successfully delivered, if and only if a success response **(2XX response code)** is returned and the client ID is sent in either the HTTP header (X-ADOBESIGN-CLIENTID) or in a JSON response body with key as <span style="color: #e74c3c">xAdobeSignClientId</span> and value as the same client ID; otherwise, Acrobat Sign will retry to deliver the notification to the webhook URL until the retries are exhausted.

### Hosting your webhook in the cloud

Webhooks, as responsive functions, are ideally suited to hosting in the cloud. Several technology vendors have made available cloud-based, on-demand function execution platforms:

+ Adobe I/O Runtime (based on Apache OpenWhisk)
+ IBM Cloud Functions (based on Apache OpenWhisk)
+ Microsoft Azure Functions (See [Using Azure functions](https://opensource.adobe.com/acrobat-sign/developer_guide/webhookapis.html#using-azure-functions))
+ Amazon AWS Lambda Functions (See [Using AWS functions](https://opensource.adobe.com/acrobat-sign/developer_guide/webhookapis.html##using-aws-lambda-functions))

These platforms let you host webhook code in the cloud where it’s always ready to respond to Acrobat Sign. Using cloud-based functions offloads the most demanding functionality of your application to the cloud, and lets you build apps that can focus on functionality for the user without worrying about network loads and management.

## Webhook properties

### Webhook name

Use an intuitive name that other admins can readily understand.

### Events

The list of your subscribed events.

### Webhook URL

The webhook URL is The target URL where Acrobat Sign pushes the JSON payload. After you configure a webhook to listen on a given URL, register that URL with Acrobat Sign and use it to subscribe your webhook to the events.

+ The client must include a public HTTPS URL to which Acrobat Sign can send a POST request. For example, 127.0.0.1 and localhost URIs will not work since the Acrobat Sign Service will not be able to contact your local computer.
+ The URL endpoint must be listening on port 443 or 8443 (selected when defining the URL).
+ Make sure your webhook supports POST requests for incoming notifications and GET requests for the verification of intent request.
+ Your webhook URL must not be blocked by a firewall.

### Webhook status

+ A webhook can be either active or inactive. By default, a webhook is active.
+ An active webhook will receive requests for events as they occur within Acrobat Sign.
+ A webhook marked as inactive will stop receiving event requests. If an event’s request is processing while the webhook is made inactive, this request will finish. Any other existing, unprocessed event requests will be canceled and not sent to your endpoint.
+ If an inactive webhook is made active, it will begin receiving event requests once more as soon as new event requests are created.

### Webhook scopes

Currently webhooks are supported at Account, Group, User Account, and Resource levels.

+ **Account level webhook:** The webhook is created on an account for all the subscribed events happening in that account. To create an account-level webhook, specify the scope as ACCOUNT in the POST /webhooks API call. Account Admins have the authority to see all webhooks defined for the account and /all groups within that account.
+ **Group level webhook:** The webhook is created on a group for all the subscribed events happening in that group. To create a group-level webhook, specify the scope as “GROUP” in the POST /webhooks API call.
  + Group admins will only see the webhooks that are dedicated to their group. They cannot see the account-level webhooks or webhooks bound to other groups.
  + Accounts that have users in multiple groups enabled will see the option to select the group for that scope.
+ **User Account level webhook:** The webhook is created for a user for the events happening for that specific user. To create a user-level webhook, specify the scope as “USER” in the POST /webhooks API call. The “user” scope cannot be configured via the product UI.
+ **Resource level webhook:** This is created for a specific resource. Events specific to this resource are pushed to the webhook URL. To create a resource-level webhook, specify the scope as “RESOURCE”, resourceType as AGREEMENT or WIDGET or MEGASIGN, and the <span style="color: #e74c3c">resourceId</span> of the resource for which you want to create the webhook in the POST /webhooks API call. he “resource” scope cannot be configured via the product UI.

### Webhook conditional parameters

Webhook payloads may include the minimum, default parameters, or additional and optional parameters.

When you register or update a webhook, you can specify whether you want to receive the minimum payload or detailed info such as participant info, document info, and more details using these parameters. By default, all the conditional parameters are set to false and Acrobat Sign sends the minimum payload (resourceId, status and name). Specify the following conditional parameters in the API request to receive the corresponding details in the payload:

**Agreement**

+ <span style="color: #e74c3c">includeDetailedInfo</span>: Determines whether agreement detailed info returns in the response payload. Based on the state of the agreement and the event being notified, the keys in the JSON payload will change.
+ <span style="color: #e74c3c">includeDocumentsInfo</span>: Determines whether document info returns in the response payload. This might or might not be applicable in a specific event’s payload.
+ <span style="color: #e74c3c">includeParticipantsInfo</span>: Determines whether participants’ info returns in the response payload; the participant’s info JSON keys will change based on the event being notified. For example, an <span style="color: #e74c3c">AGREEMENT_CREATED</span> event does not contain the key for nextParticipant, while the AGREEMENT_ACTION_REQUESTED event will have it.
+ <span style="color: #e74c3c">includeSignedDocuments</span>: Determines whether signed documents returns in the webhook response payload. If set to true, the signed document returns in <strong>base64-encoded format</strong> in JSON when signing is complete. This is sent only in the notification for the AGREEMENT_WORKFLOW_COMPLETED event.

**Library Document**

+ <span style="color: #e74c3c">includeDetailedInfo</span>: Determines whether library document detailed info returns in the response payload. Based on the state of the library document and the event being notified, the keys in the JSON payload will change.
+ <span style="color: #e74c3c">includeDocumentsInfo</span>: Determines whether document info returns in the response payload. This might or might not be applicable in a specific event’s payload.

**Widget**

+ <span style="color: #e74c3c">includeDetailedInfo</span>: Determines whether widget detailed info returns in the response payload.
+ <span style="color: #e74c3c">includeDocumentsInfo</span>: Determines whether document info returns in the response payload.
+ <span style="color: #e74c3c">includeParticipantsInfo</span>: Determines whether participants’ info returns in the response payload.

**MegaSign**

+ <span style="color: #e74c3c">includeDetailedInfo</span>: Determines whether megasign detailed info returns in the response payload.

## Managing webhooks and subscriptions

Manage your webhooks via the webhook APIs. See the event guides for standard headers, error codes, and endpoint details:

+ POST /webhooks Creates a new webhook.
+ GET /webhooks Retrieves webhooks for a user.
+ GET /webhooks/{webhookId} retrieves details of a webhook.
+ PUT /webhooks/{webhookId} modifies an existing webhook.
+ PUT /webhooks/{webhookId}/state modifies an existing webhook’s status(ACTIVE/INACTIVE).
+ DELETE /webhooks/{webhookId} deletes a webhook.

## Acrobat Sign: security and reliability

### Webhook security

Acrobat Sign secures your webhooks in the following ways:

+ **Allowing only HTTPS URLs:** Only HTTPS URLs are valid.
+ **Validating webhooks subscription for authentication and authorization for webhooks created through the API:** This is done using the existing API authentication and authorization validation in Sign. The first step for securing Acrobat Sign webhooks is to include the standard authentication mechanism (OAuth access token and authorization header). While setting up a webhook subscription, Sign validates that the token is valid and the API caller has permission to create a webhook on the resource. We will also validate that the API caller has appropriate authorization to create account-level webhooks.
+ **Two-way SSL authentication:** Acrobat Sign supports a two-way SSL handshake when making callbacks to customer servers. Two-way SSL, often called Client-Side SSL, is a mode of SSL wherein both the server and the client (web browser) present certificates to identify themselves. We allow the account admins, via their account Security Settings page, to upload an identifying certificate, which the Adobe Sign webhooks system uses to identify itself when making webhook calls to their servers. Acrobat Sign verifies SSL certificates when delivering payloads to HTTPS webhook addresses. Webhooks that fail the SSL certificate verification will not successfully deliver to their respective hosts. Please ensure your server is correctly configured to support HTTPS with a valid SSL certificate.
+ **Keeping the webhook configuration immutable:** If your webhook URL changes, there is a possibility that your application consumer key and consumer secret have been compromised. By requiring you to create a new webhook configuration, we also require you to resubscribe to your user’s events. This requires the use of access tokens that a malicious party is less likely to possess. Doing so reduces the likelihood that another party will receive your user’s private information.
+ **Sending and receiving the client ID in the webhook notification request:** You can whitelist the client/application IDs through which you want to receive the payload. Notifications from the remaining apps can be ignored.
+ **Recommended server configurations:** Acrobat sign only supports TLS 1.2 for webhooks. TLS 1.0, 1.1, and 1.3 are not supported.
+ **IP validation:** To prevent setting an internal subnet (for example, a 10.x address), special IP address ranges such as the 169.254.169.254 range, and other invalid IP addresses as webhook URLs, Acrobat Sign validates the IP address at the time of webhook creation as well as while sending notifications. If the IP address is invalid, the webhook is not created. IP validation occurs as follows:
  1. Resolve the host name via DNS lookup.
  2. Validate the IP address. The following IP addresses are invalid and a webhook cannot be created using them:
      <ul style="list-style-type: disc">
        <li>SiteLocalAddress</li>
        <li>LoopbackAddress</li>
        <li>LinkLocalAddress</li>
        <li>AnyLocalAddress</li>
        <li>MulticastAddress</li>
      </ul>
+ **Avoid sending sensitive information:** Acrobat Sign does not send any sensitive information such as passwords or signing URLs in the payload.

### Reliable notifications: Retry policy

Acrobat Sign incorporates an advanced, reliable strategy for delivery of webhook notifications.

+ If there is an outage on the receiving end (suppose, for instance, the customer’s server is down), Acrobat Sign will retry the notification. The strategy for retrying delivery of notifications is a doubling of time between attempts, starting with a one-minute interval and doubling the interval with each attempt, up to a maximum interval of 12 hours, resulting in 15 retries in the space of 72 hours. For example:
  + Retry #1 in 30 seconds
  + #2 in one min
  + #3 in 2 minutes
  + #4 in 4 mins
  + Continue until the total time since the 1st failure is equal to or greater than 72 hours.
+ If the webhook fails to respond after exceeding either the maximum retry time or interval, the webhook is disabled.
+ No notifications are sent to the webhook URL until the webhook is activated again; all the notifications between the time the webhook is disabled and enabled again are lost.

<InlineNestedAlert variant="info" header="false" iconPosition="right">

You can check whether a webhook is enabled or disabled via the <span style="color: #e74c3c">`GET /webhooks/{webhook ID}`</span> API call.

Note that the API does not tell you if the webhook is failing but has not yet been disabled.

</InlineNestedAlert>
