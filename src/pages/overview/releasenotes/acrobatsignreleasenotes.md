---
title: Latest API Release Notes
description: Release notes for the latest Acrobat Sign API updates, including system requirements, new features, webhook changes, REST API changes, and bug fixes.
---

# Latest API Release Notes

Last update: Jun 21, 2024.

<InlineAlert slots="header, text" />

Tip

For non-developer product feature and UI changes, refer to [this link](https://helpx.adobe.com/sign/release-notes/adobe-sign.html)

## Testing Redocly Block

<RedoclyAPIBlock src="/acrobat-sign/developer-guide/openapi.yaml" disableSidebar disableSearch hideTryItPanel ></RedoclyAPIBlock>

## System requirement changes

For browser and product UI system requirements, see [https://helpx.adobe.com/sign/system-requirements.html](https://helpx.adobe.com/sign/system-requirements.html).

## New or updated developer assets
| Date | Change |
|---|---|
| May, 2024 | [OAuth 2.0 support at account level](https://opensource.adobe.com/acrobat-sign/acrobat_sign_events/webhooks-oauth-2.0.html) |
| January, 2024 | [OAuth 2.0 support for customer applications](https://opensource.adobe.com/acrobat-sign/acrobat_sign_events/webhooks-oauth-2.0.html) |
| July, 2023 | Doc updates for all docs |
| May, 2023 | OEM 1.0 onboarding, quickstart, FAQ. OEM 2.0 beta docs |
| April, 2023 | Solutions for Government: onboarding docs, Postman collection |
| March 14, 2023 | [New Acrobat Sign Workspace on Postman](https://adobe.postman.co/workspace/Adobe-Acrobat-Sign~1faa30d0-1b34-493b-96b1-475cf3978a95/overview) |


## Webhook Changes

| Date | Change |
|---|---|
| June, 2024 | Webhook Event Payload Update
                &#8226; The webhookNotificationPayload now includes new fields for all AGREEMENT_* webhook subscription event types: userId, authenticationMethod, and createdGroupId.
                &#8226; A new field agreementCancellationInfo is added to [AGREEMENT_REJECTED](https://opensource.adobe.com/acrobat-sign/acrobat_sign_events/webhookeventsagreements.html#agreement-rejected).
                &#8226; A new field agreementExpirationInfo is added to [AGREEMENT_EXPIRED](https://opensource.adobe.com/acrobat-sign/acrobat_sign_events/webhookeventsagreements.html#agreement-expired).
                &#8226; A new field agreementCancellationInfo is added to [AGREEMENT_AUTO_CANCELLED_CONVERSION_PROBLEM](https://opensource.adobe.com/acrobat-sign/acrobat_sign_events/webhookeventsagreements.html#agreement-auto-cancelled-conversion-problem).
                &#8226; A default message will now be populated when sender does not provide reason for agreementCancellationInfo field in event of [AGREEMENT_RECALLED](https://opensource.adobe.com/acrobat-sign/acrobat_sign_events/webhookeventsagreements.html#agreement-recalled). |
| January, 2024 | New Webhooks
&#8226; AGREEMENT_EMAIL_OTP_AUTHENTICATED: Triggers when an agreement is authenticated with Email OTP.
&#8226; AGREEMENT_RECALLED_MAX_SIGNING_EMAIL_OTP_ATTEMPTS: Triggers when maximum number of Email OTP authentication attempts exceeds. |
| November, 2023 | New Webhooks
&#8226; AGREEMENT_UNSHARED: Triggers when an agreement is unshared.
&#8226; AGREEMENT_UNSHARED_AUTO: Triggers when an agreement is automatically unshared. |
| July 18, 2023 | New Webhooks
&#8226; AGREEMENT_DOCUMENTS_VIEWED: Triggers when a user views an agreement.
&#8226; AGREEMENT_DOCUMENTS_VIEWED_PASSWORD_PROTECTED: Triggers when a user views an agreement that is password protected. |
| July 18, 2023 | Updated Webhooks
&#8226; AGREEMENT_RECALLED: Additional payload values now include comments and notifyOthers.
&#8226; MEGASIGN_RECALLED: Additional payload values now include comments and notifyOthers. |
| July 18, 2023 | Updated IP Ranges: Webhooks require allow-listing to specific IP addresses. The [IP range list has been updated.](https://helpx.adobe.com/sign/system-requirements.html#ipranges). |
| July 18, 2023 | All /search API calls are subject to volume throttling at the rate of:
&#8226; 1000 calls per minute
&#8226; 2500 calls per hour
&#8226; 7200 calls per day
Note: Administrators may file a [support reqeust](https://adobe.com/go/adobesign-support-center) to elevate the volumes. |
| March 14, 2023 | initiatingUserId and initiatingUserEmail: Accounts on Webhooks 2.0 will populate the initiatingUserId and initiatingUserEmail fields in the notification payload. Accounts that remain on the classic webhooks experience after March 14, 2023 will see unpopulated fields present in the payload. |
| March 14, 2023 | All accounts existing before November 8th, 2022, are migrated to webhooks 2.0. On July 18th, 2023, Adobe will sunset the legacy webhooks infrastructure (referred to as “classic webhooks”). See below. |
| Nov. 8, 2022 | Webhook conversion to a microservice (“webhooks 2.0”) with the following benefits:
&#8226; Independent release cycles from the core code thereby supporting frequent and rapid updates, feature enhancements, bug fixes, etc.
&#8226; An independent and new UI with features that streamline webhook visibility and management.
&#8226; Enhanced performance.

                Webhooks 2.0 supports all the features of classic webhooks with one caveat: If a webhook was configured for the user, their group, or their account, classic webhooks delivered notifications to all agreement participants. In webhooks 2.0, ONLY webhooks configured for the sender, the sender’s group, or the sender’s account will receive notifications. Current customers can try webhooks 2.0 on a Trial, Developer, or Sandbox account via Adobe’s Insider Access program.
                Effective dates:
                &#8226; November 8th, 2022: All new customers will be onboarded to webhooks 2.0.
                &#8226; March 14th, 2023: All customers will be automatically migrated.
                &#8226; July 18th, 2023: Adobe sunsets the legacy webhooks infrastructure.
				
                Note: Customers with strict network security policies must configure new IP addresses per https://helpx.adobe.com/sign/system-requirements.html. |
| Nov. 8, 2022 | New Webhooks:
&#8226; AGREEMENT_REMINDER_INITIATED: fires when an agreement reminder is triggered and reminder emails are suppressed.
&#8226; MEGASIGN_REMINDER_SENT: webhook fires when a Send in Bulk reminder is triggered and reminder emails are enabled (default)..
&#8226; MEGASIGN_REMINDER_INITIATED: fires when a Send in Bulk reminder is triggered and reminder emails are suppressed (the default) ( Unlike MEGASIGN_REMINDER_SENT webhook fires when reminder emails are enabled). Only one MEGASIGN_REMINDER_INITIATED (or MEGASIGN_REMINDER_SENT) webhook is delivered for the parent Send in Bulk container. Individual child agreements do not each fire a MEGASIGN_REMINDER_INITIATED webhook. |
| Sept. 13 | Support for webhook endpoints to communicate on port 8443 (in addition to 443) to support mTLS. |
| Sept. 13 | POST /agreements/{agreementId}/ endpoint now supports an optional redirect URL that sends users to control a custom post-sending landing page instead of the default Acrobat Sign page. Developers can use the new postSendOption.redirectUrl for apps and integrations so that the sender redirects to a workflow-specific page, thereby both allowing the sender to remain in the integration (e.g. branded workflow), and providing a way for the developer to create a page where the sender can be notified about the sent status or modify the agreement (reminders, deadlines, etc.) You must configure a Sign setting to allow these URLs to avoid open redirect security issues. The description of this setting is similar to: “the authorized URLs the application can redirect to after completing a workflow”. This option does not apply to Fill & Sign flows. |
| July | None |
| June | AGREEMENT_EXPIRATION_UPDATED (API only): A new webhook event provides notification updates for an agreement’s expiration time. It can only be subscribed to via the POST /webhooks API call. |
| June | AGREEMENT_SIGNER_NAME_CHANGED_BY_SIGNER: This new event triggers when a recipient changes the pre-populated name value when signing an agreement. Name values can be pre-populated through the API or through the require recipient name when sending option. |
| May | None |
| April | REMINDER_SENT: A new webhook event executes on REMINDER_SENT events either by explicitly subscribing to the AGREEMENT_REMINDER_SENT event or subscribing to AGREEMENT_ALL. |
| January | None |


## REST API changes

| Date | Change |
|---|---|
| May, 2024 | Endpoint update:
                &#8226; Enhanced webhookEndpoints API: The /webhookEndpoints API can now be configured at both the account level and the application level.
                /webhooks API update:
                &#8226; MODIFYING_IMMUTABLE_FIELDS error code is returned in the following cases, in addition to the existing scenario:
                - When the caller does not include the webhookUrl or webhookEndpointInfo field in a PUT /webhooks API request while updating an existing webhook. Previously, the webhook service did not throw an error if the webhookUrl field was not included; it simply skipped updating this field. With the introduction of the webhookEndpointInfo field, the caller must provide either webhookUrl or webhookEndpointInfo. Failure to provide either field will result in an error.
                Note: Once a webhook is migrated from using webhookUrl to webhookEndpointInfo, it cannot revert back to using webhookUrl. This migration is necessary to upgrade the webhook to use OAuth 2.0 authentication.
                - When the caller attempts to update any part of the webhookEndpointInfoobject. The webhookEndpointInfo field is immutable and cannot be changed once set. |
| January, 2024 | New feature: [Support for WebhookEndpoint APIs](https://opensource.adobe.com/acrobat-sign/developer_guide/webhook-endpoint-api.html) |
| November, 2023 | New features:
&#8226; [Generate templates from in-progress or signed agreements](https://opensource.adobe.com/acrobat-sign/developer_guide/apiusage.html#generate-templates-from-in-progress-or-signed-agreements)
&#8226; [Send private messages to the counter signers](https://opensource.adobe.com/acrobat-sign/developer_guide/apiusage.html#send-private-messages-to-the-counter-signers) |
| August, 2023 | [Associate FormFieldGenerator with specific documents](https://opensource.adobe.com/acrobat-sign/developer_guide/apiusage.html#add-form-fields-to-agreements) |
| July 18, 2023 | GET /combined document returns merged field data; Merged (prefilled) data can be visually validated using the GET /agreements/{agreementId}/combinedDocument call and including the includeMergedFieldData parameter. The downloaded PDF includes the form field data that has already been merged via PUT /formfields/mergeInfo call. |
| Nov. 8, 2023 | New endpoints
&#8226; DELETE /agreements/{agreementId} - A new endpoint that supports the “soft delete” function by moving an agreement and all related data (including database records and physical files) to the Deleted folder where it will be fully destroyed 14 days later (unless restored first).
&#8226; GET /users/{userId}/settings - A new endpoint to obtain the authoring settings for a user. |
| Nov. 8, 2023 | Updated endpoints
&#8226; GET /libraryDocument/{libraryDocumentId}/combinedDocument - An update to the existing endpoint to add a value (skipDocumentSealing) that returns a non-certified PDF.
&#8226; POST /libraryDocuments - An update to an existing endpoint that creates a library document from an agreement.
&#8226; GET /groups - This endpoint has been expanded to support the new Shared Users queue by listing the account shares within a group. |
| Sept, 2023 | The description of the BYON_NOTARY notaryType was updated to reflect the “bring your own” aspect of a customer-provided notary. |
| July, 2023 | Devs can [improve the delegation process](https://helpx.adobe.com/sign/release-notes/adobe-sign.html) by updating the delegation API to use the v6 REST endpoint delegatedParticipantSets. Customers should see no impact beyond enforcing the required name values configuration during delegation. |
| June, 2023 | None |
| May, 2023 | None |
| April, 2023 | None |
| January, 2023 | None |

                                                                                                                                         |
## Bug fixes

### July 2023

Refer to the [Resolved issue list](https://helpx.adobe.com/sign/release-notes/adobe-sign/sign-release-schedule.html#Schedule]).

### March 2023

4383351: Copying a web form between environments (e.g., Sandbox to production) results in fields that do not display on the final agreement. Fix: The `PUT /widgets/{widgetId}/formFields` API call has been improved to ensure the fields are properly placed.

4399995: A bulk signing URL through the API needs to be composed with a vanity URL instead of the generic and secure URL to let the signer navigate to the Bulk Sign UI without an extra login experience if the signer has already been SAML authenticated. Fix: The code has been improved to allow the vanity URL when employing Send in Bulk API calls.

### September 2022

No API or webhook bug fixes. See (https://helpx.adobe.com/sign/release-notes/adobe-sign/sign-release-schedule.html#Schedule)

### July 2022

For product UI changes, see [https://helpx.adobe.com/sign/release-notes/adobe-sign.html](https://helpx.adobe.com/sign/release-notes/adobe-sign.html).

4355581: The reporting API for the new report system has been updated to better manage reports with null values. This enables account scoped report charts to list the reports showing their report ID.

4331709: Bug: A MISC\_SERVER\_ERROR is generated when replacing a recipient with a userID that is auto-delegating their agreements to a user that is not an active userID in the system. Fix: Code has been improved to successfully identify and create the auto-delegate `userID` as a single-use user for the transaction.

### June 2022

4333689 Web form creators are unable to delegate countersignature for web forms from the modern manage page due to the API not providing a signable reply when the signature is attempted.

4352684 The API call `PUT /widgets/{widgetId}/formFields` is not working for the SIGNATURE field.

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

![](../_static/adobelogo.png)
