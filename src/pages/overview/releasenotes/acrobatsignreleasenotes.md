
# Latest API Release Notes

Last update: Jun 21, 2024.

<InlineAlert slots="header, text" />

Tip

For non-developer product feature and UI changes, refer to [this link](https://helpx.adobe.com/sign/release-notes/adobe-sign.html)

## System requirement changes

 For browser and product UI system requirements, see <https://helpx.adobe.com/sign/system-requirements.html>.

## New or updated developer assets

<table border="1" columnWidths="20,80">
    <thead>
        <tr>
            <th>Date</th>
            <th>Change</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>May, 2024</td>
            <td><a href="https://opensource.adobe.com/acrobat-sign/acrobat_sign_events/webhooks-oauth-2.0.html">OAuth 2.0 support at account level</a></td>
        </tr>
        <tr>
            <td>January, 2024</td>
            <td><a href="https://opensource.adobe.com/acrobat-sign/acrobat_sign_events/webhooks-oauth-2.0.html">OAuth 2.0 support for customer applications</a></td>
        </tr>
        <tr>
            <td>July, 2023</td>
            <td>Doc updates for all docs</td>
        </tr>
        <tr>
            <td>May, 2023</td>
            <td>OEM 1.0 onboarding, quickstart, FAQ. OEM 2.0 beta docs</td>
        </tr>
        <tr>
            <td>April, 2023</td>
            <td>Solutions for Government: onboarding docs, Postman collection</td>
        </tr>
        <tr>
            <td>March 14, 2023</td>
            <td><a href="https://adobe.postman.co/workspace/Adobe-Acrobat-Sign~1faa30d0-1b34-493b-96b1-475cf3978a95/overview">New Acrobat Sign Workspace on Postman</a></td>
        </tr>
    </tbody>
</table>

## Webhook Changes

<table border="1" columnWidths="20,80">
    <thead>
        <tr>
            <th>Date</th>
            <th>Change</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>June, 2024</td>
            <td>
                <strong>Webhook Event Payload Update</strong><br />
                &#8226; The webhookNotificationPayload now includes new fields for all AGREEMENT_* webhook subscription event types: userId, authenticationMethod, and createdGroupId.<br />
                &#8226; A new field <strong>agreementCancellationInfo</strong> is added to <a href="https://opensource.adobe.com/acrobat-sign/acrobat_sign_events/webhookeventsagreements.html#agreement-rejected">AGREEMENT_REJECTED</a>.<br />
                &#8226; A new field <strong>agreementExpirationInfo</strong> is added to <a href="https://opensource.adobe.com/acrobat-sign/acrobat_sign_events/webhookeventsagreements.html#agreement-expired">AGREEMENT_EXPIRED</a>.<br />
                &#8226; A new field <strong>agreementCancellationInfo</strong> is added to <a href="https://opensource.adobe.com/acrobat-sign/acrobat_sign_events/webhookeventsagreements.html#agreement-auto-cancelled-conversion-problem">AGREEMENT_AUTO_CANCELLED_CONVERSION_PROBLEM</a>.<br />
                &#8226; A default message will now be populated when sender does not provide reason for <strong>agreementCancellationInfo</strong> field in event of <a href="https://opensource.adobe.com/acrobat-sign/acrobat_sign_events/webhookeventsagreements.html#agreement-recalled">AGREEMENT_RECALLED</a>.
            </td>
        </tr>
        <tr>
            <td>January, 2024</td>
            <td>
                <strong>New Webhooks</strong><br />
                &#8226; AGREEMENT_EMAIL_OTP_AUTHENTICATED: Triggers when an agreement is authenticated with Email OTP.<br />
                &#8226; AGREEMENT_RECALLED_MAX_SIGNING_EMAIL_OTP_ATTEMPTS: Triggers when maximum number of Email OTP authentication attempts exceeds.
            </td>
        </tr>
        <tr>
            <td>November, 2023</td>
            <td>
                <strong>New Webhooks</strong><br />
                &#8226; AGREEMENT_UNSHARED: Triggers when an agreement is unshared.<br />
                &#8226; AGREEMENT_UNSHARED_AUTO: Triggers when an agreement is automatically unshared.
            </td>
        </tr>
        <tr>
            <td>July 18, 2023</td>
            <td>
                <strong>New Webhooks</strong><br />
                &#8226; AGREEMENT_DOCUMENTS_VIEWED: Triggers when a user views an agreement.<br />
                &#8226; AGREEMENT_DOCUMENTS_VIEWED_PASSWORD_PROTECTED: Triggers when a user views an agreement that is password protected.
            </td>
        </tr>
        <tr>
            <td>July 18, 2023</td>
            <td>
                <strong>Updated Webhooks</strong><br />
                &#8226; AGREEMENT_RECALLED: Additional payload values now include <span style="color: #e74c3c;">comments</span> and <span style="color: #e74c3c;">notifyOthers</span>.<br />
                &#8226; MEGASIGN_RECALLED: Additional payload values now include <span style="color: #e74c3c;">comments</span> and <span style="color: #e74c3c;">notifyOthers</span>.
            </td>
        </tr>
        <tr>
            <td>July 18, 2023</td>
            <td>
                <strong>Updated IP Ranges</strong>: Webhooks require allow-listing to specific IP addresses. The <a href="https://helpx.adobe.com/sign/system-requirements.html#ipranges">IP range list has been updated.</a>.
            </td>
        </tr>
        <tr>
            <td>July 18, 2023</td>
            <td>
                All <span style="color: #e74c3c;">/search</span> API calls are subject to volume throttling at the rate of:<br />
                &#8226; 1000 calls per minute<br />
                &#8226; 2500 calls per hour<br />
                &#8226; 7200 calls per day<br />
                <strong>Note</strong>: Administrators may file a <a href="https://adobe.com/go/adobesign-support-center">support reqeust</a> to elevate the volumes.
            </td>
        </tr>
        <tr>
            <td>March 14, 2023</td>
            <td>
                <span style="color: #e74c3c;">initiatingUserId</span> and <span style="color: #e74c3c;">initiatingUserEmail</span>: Accounts on Webhooks 2.0 will populate the <span style="color: #e74c3c;">initiatingUserId</span> and <span style="color: #e74c3c;">initiatingUserEmail</span> fields in the notification payload. Accounts that remain on the classic webhooks experience after March 14, 2023 will see unpopulated fields present in the payload.
            </td>
        </tr>
        <tr>
            <td>March 14, 2023</td>
            <td>
                All accounts existing before November 8th, 2022, are migrated to webhooks 2.0. On July 18th, 2023, Adobe will sunset the legacy webhooks infrastructure (referred to as “classic webhooks”). <strong>See below</strong>.
            </td>
        </tr>
        <tr>
            <td>Nov. 8, 2022</td>
            <td>
                Webhook conversion to a microservice (“webhooks 2.0”) with the following benefits:<br />
                &#8226; Independent release cycles from the core code thereby supporting frequent and rapid updates, feature enhancements, bug fixes, etc.<br />
                &#8226; An independent and new UI with features that streamline webhook visibility and management.<br />
                &#8226; Enhanced performance.<br />
				<br />
                Webhooks 2.0 supports all the features of classic webhooks with one caveat: If a webhook was configured for the user, their group, or their account, classic webhooks delivered notifications to all agreement participants. In webhooks 2.0, ONLY webhooks configured for the sender, the sender’s group, or the sender’s account will receive notifications. Current customers can try webhooks 2.0 on a Trial, Developer, or Sandbox account via Adobe’s Insider Access program.<br />
                Effective dates:<br />
                &#8226; November 8th, 2022: All new customers will be onboarded to webhooks 2.0.<br />
                &#8226; March 14th, 2023: All customers will be automatically migrated.<br />
                &#8226; July 18th, 2023: Adobe sunsets the legacy webhooks infrastructure.<br />
				<br />
                <strong>Note:</strong> Customers with strict network security policies must configure new IP addresses per https://helpx.adobe.com/sign/system-requirements.html.
            </td>
        </tr>
        <tr>
            <td>Nov. 8, 2022</td>
            <td>
                <strong>New Webhooks</strong>:<br />
                &#8226; AGREEMENT_REMINDER_INITIATED: fires when an agreement reminder is triggered and reminder emails are suppressed.<br />
                &#8226; MEGASIGN_REMINDER_SENT: webhook fires when a Send in Bulk reminder is triggered and reminder emails are enabled (default)..<br />
                &#8226; MEGASIGN_REMINDER_INITIATED: fires when a Send in Bulk reminder is triggered and reminder emails are suppressed (the default) ( Unlike MEGASIGN_REMINDER_SENT webhook fires when reminder emails are enabled). Only one MEGASIGN_REMINDER_INITIATED (or MEGASIGN_REMINDER_SENT) webhook is delivered for the parent Send in Bulk container. Individual child agreements do not each fire a MEGASIGN_REMINDER_INITIATED webhook.
            </td>
        </tr>
        <tr>
            <td>Sept. 13</td>
            <td>
                Support for webhook endpoints to communicate on port 8443 (in addition to 443) to support mTLS.
            </td>
        </tr>
        <tr>
            <td>Sept. 13</td>
            <td>
                POST /agreements/&#123;agreementId&#125;/ endpoint now supports an optional redirect URL that sends users to control a custom post-sending landing page instead of the default Acrobat Sign page. Developers can use the new <span style="color: #e74c3c;">postSendOption.redirectUrl</span> for apps and integrations so that the sender redirects to a workflow-specific page, thereby both allowing the sender to remain in the integration (e.g. branded workflow), and providing a way for the developer to create a page where the sender can be notified about the sent status or modify the agreement (reminders, deadlines, etc.) You must configure a Sign setting to allow these URLs to avoid open redirect security issues. The description of this setting is similar to: “the authorized URLs the application can redirect to after completing a workflow”. This option does not apply to Fill & Sign flows.
            </td>
        </tr>
		<tr>
            <td>July</td>
            <td>None</td>
        </tr>
        <tr>
            <td>June</td>
            <td>
                AGREEMENT_EXPIRATION_UPDATED (API only): A new webhook event provides notification updates for an agreement’s expiration time. It can only be subscribed to via the <span style="color: #e74c3c;">POST /webhooks</span> API call.
            </td>
        </tr>
        <tr>
            <td>June</td>
            <td>
                AGREEMENT_SIGNER_NAME_CHANGED_BY_SIGNER: This new event triggers when a recipient changes the pre-populated name value when signing an agreement. Name values can be pre-populated through the API or through the require recipient name when sending option.
            </td>
        </tr>
		<tr>
            <td>May</td>
            <td>None</td>
        </tr>
        <tr>
            <td>April</td>
            <td>
                REMINDER_SENT: A new webhook event executes on REMINDER_SENT events either by explicitly subscribing to the AGREEMENT_REMINDER_SENT event or subscribing to AGREEMENT_ALL.
            </td>
        </tr>
        <tr>
            <td>January</td>
            <td>None</td>
        </tr>
    </tbody>
</table>

## REST API changes

<table border="1" columnWidths="20,80">
    <thead>
        <tr>
            <th>Date</th>
            <th>Change</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>May, 2024</td>
            <td>
                <strong>Endpoint update:</strong><br />
                &#8226; Enhanced webhookEndpoints API: The /webhookEndpoints API can now be configured at both the account level and the application level.<br />
                <strong>/webhooks API update:</strong><br />
                &#8226; MODIFYING_IMMUTABLE_FIELDS error code is returned in the following cases, in addition to the existing scenario:<br />
                - When the caller does not include the webhookUrl or webhookEndpointInfo field in a PUT /webhooks API request while updating an existing webhook. Previously, the webhook service did not throw an error if the webhookUrl field was not included; it simply skipped updating this field. With the introduction of the webhookEndpointInfo field, the caller must provide either webhookUrl or webhookEndpointInfo. Failure to provide either field will result in an error.<br />
                <strong>Note:</strong> Once a webhook is migrated from using webhookUrl to webhookEndpointInfo, it cannot revert back to using webhookUrl. This migration is necessary to upgrade the webhook to use OAuth 2.0 authentication.<br />
                - When the caller attempts to update any part of the webhookEndpointInfoobject. The webhookEndpointInfo field is immutable and cannot be changed once set.
            </td>
        </tr>
        <tr>
            <td>January, 2024</td>
            <td>
                <strong>New feature:</strong> <a href="https://opensource.adobe.com/acrobat-sign/developer_guide/webhook-endpoint-api.html">Support for WebhookEndpoint APIs</a>
            </td>
        </tr>
        <tr>
            <td>November, 2023</td>
            <td>
                <strong>New features:</strong><br />
                &#8226; <a href="https://opensource.adobe.com/acrobat-sign/developer_guide/apiusage.html#generate-templates-from-in-progress-or-signed-agreements">Generate templates from in-progress or signed agreements</a><br />
                &#8226; <a href="https://opensource.adobe.com/acrobat-sign/developer_guide/apiusage.html#send-private-messages-to-the-counter-signers">Send private messages to the counter signers</a>
            </td>
        </tr>
        <tr>
            <td>August, 2023</td>
            <td>
                <a href="https://opensource.adobe.com/acrobat-sign/developer_guide/apiusage.html#add-form-fields-to-agreements">Associate FormFieldGenerator with specific documents</a>
            </td>
        </tr>
        <tr>
            <td>July 18, 2023</td>
            <td>
                <span style="color: #e74c3c;">GET /combined</span> document returns merged field data; Merged (prefilled) data can be visually validated using the <span style="color: #e74c3c;">GET /agreements/&#123;agreementId&#125;/combinedDocument</span> call and including the <span style="color: #e74c3c;">includeMergedFieldData</span> parameter. The downloaded PDF includes the form field data that has already been merged via <span style="color: #e74c3c;">PUT /formfields/mergeInfo</span> call.
            </td>
        </tr>
        <tr>
            <td>Nov. 8, 2023</td>
            <td>
                <strong>New endpoints</strong><br />
                &#8226; DELETE /agreements/&#123;agreementId&#125; - A new endpoint that supports the “soft delete” function by moving an agreement and all related data (including database records and physical files) to the Deleted folder where it will be fully destroyed 14 days later (unless restored first).<br />
                &#8226; GET /users/&#123;userId&#125;/settings - A new endpoint to obtain the authoring settings for a user.
            </td>
        </tr>
        <tr>
            <td>Nov. 8, 2023</td>
            <td>
                <strong>Updated endpoints</strong><br />
                &#8226; GET /libraryDocument/&#123;libraryDocumentId&#125;/combinedDocument - An update to the existing endpoint to add a value (skipDocumentSealing) that returns a non-certified PDF.<br />
                &#8226; POST /libraryDocuments - An update to an existing endpoint that creates a library document from an agreement.<br />
                &#8226; GET /groups - This endpoint has been expanded to support the new Shared Users queue by listing the account shares within a group.
            </td>
        </tr>
        <tr>
            <td>Sept, 2023</td>
            <td>
                The description of the BYON_NOTARY notaryType was updated to reflect the “bring your own” aspect of a customer-provided notary.
            </td>
        </tr>
        <tr>
            <td>July, 2023</td>
            <td>
                Devs can <a href="https://helpx.adobe.com/sign/release-notes/adobe-sign.html">improve the delegation process</a> by updating the delegation API to use the v6 REST endpoint <span style="color: #e74c3c;">delegatedParticipantSets</span>. Customers should see no impact beyond enforcing the required name values configuration during delegation.
            </td>
        </tr>
        <tr>
            <td>June, 2023</td>
            <td>None</td>
        </tr>
        <tr>
            <td>May, 2023</td>
            <td>None</td>
        </tr>
        <tr>
            <td>April, 2023</td>
            <td>None</td>
        </tr>
        <tr>
            <td>January, 2023</td>
            <td>None</td>
        </tr>
    </tbody>
</table>
                                                                                                                                         |
## Bug fixes

### July 2023

Refer to the [Resolved issue list](https://helpx.adobe.com/sign/release-notes/adobe-sign/sign-release-schedule.html#Schedule]).

### March 2023

4383351: Copying a web form between environments (e.g., Sandbox to production) results in fields that do not display on the final agreement. Fix: The <span style="color: #e74c3c;">PUT /widgets/{widgetId}/formFields</span> API call has been improved to ensure the fields are properly placed.

4399995: A bulk signing URL through the API needs to be composed with a vanity URL instead of the generic and secure URL to let the signer navigate to the Bulk Sign UI without an extra login experience if the signer has already been SAML authenticated. Fix: The code has been improved to allow the vanity URL when employing Send in Bulk API calls.

### September 2022

No API or webhook bug fixes. See (https://helpx.adobe.com/sign/release-notes/adobe-sign/sign-release-schedule.html#Schedule)

### July 2022

For product UI changes, see [https://helpx.adobe.com/sign/release-notes/adobe-sign.html](https://helpx.adobe.com/sign/release-notes/adobe-sign.html).

4355581: The reporting API for the new report system has been updated to better manage reports with null values. This enables account scoped report charts to list the reports showing their report ID.

4331709: Bug: A MISC\_SERVER\_ERROR is generated when replacing a recipient with a userID that is auto-delegating their agreements to a user that is not an active userID in the system. Fix: Code has been improved to successfully identify and create the auto-delegate <span style="color: #e74c3c;">userID</span> as a single-use user for the transaction.

### June 2022

4333689 Web form creators are unable to delegate countersignature for web forms from the modern manage page due to the API not providing a signable reply when the signature is attempted.

4352684 The API call <span style="color: #e74c3c;">PUT /widgets/{widgetId}/formFields</span> is not working for the SIGNATURE field.

4353564/4361472: The ability to create new accounts via POST/account was broken due to upstream settings updates.

### May 2022

### April 2022

4328663 Customer accounts that have SAML set to Mandatory or SAML\_ACTIVATE\_PENDING\_USERS = true can not inactivate users using the bulk edit feature in the Acrobat Sign system as the userIDs reactivate immediately after the update. Additional code has been added to ensure that only “Created” users can be immediately activated.

4331146 REST v6 GET Agreements > displayUserSetMemberInfos is blank for some drafts when workflows are designed with more potential recipients than are utilized due to email values being required.

4333575: Identity Verification Methods defined in Workflow (PHONE and ADOBE\_SIGN) are not returned in REST v5 or v6 GET /workflows/{workflowId}

4333774 Multi-file agreements signed with a digital signature would not return a name-value when GET /agreements/{agreementID}/documents were called due to a null value in the document version reference. Agreements containing a digital signature now correctly contain a name property. For agreements created from multiple documents, the API will still return a single document for digitally signed agreements, and that document will now have the name listed as “multidoc.pdf”.

4335442 Error Code “MODIFYING\_IMMUTABLE\_FIELDS” is not listed in the swagger documentation for PUT /users/{userId} in REST v6

4336037 Calling GET /signingUrls after retrieving the agreement ID can generate an “AGREEMENT\_NOT\_SIGNABLE” status that can be inferred to indicate the agreement is in a terminal state. The conditions that trigger the status in these cases now trigger an “AGREEMENT\_NOT\_EXPOSED” status only.

4341807 The DISPLAY\_EMAIL back-end value is being returned in response to /signingUrls. The function to capture the email of a participant has been updated to take this context into account.

4341947 There is no retryAfter in the response body for some API calls when they trip the throttling threshold. The managing method has been updated to include the retryAfter response.

4343205 Agreements sent with a custom email template and a link expiration set to 60 return a 500 error when the Send new Link button is used. The link expiration function in conjunction with custom email templates has been modified to eliminate the error.

### January 2022

4308773 Signing on the iOS mobile application could result in an “AUTO\_CANCELLED\_CONVERSION\_PROBLEM” after the recipient signature was completed due to offline sync events that cause queued requests to be sent multiple times. Server-side code has been added to evaluate if a successful conversion process has completed for the same participation ID when a conversion times out, allowing for graceful resolution of conflicts.

4319974 The Locale selector on the signing page was still visible when the signingurl is retrieved using GET /signingurl v6 REST API due to the API call falling back to the application value instead of the session value. The API call has been updated to retrieve the setting value from the session (API user) instead of the application

© Copyright 2024, Adobe Inc. Last update: Jun 21, 2024.

![](../_static/adobelogo.png