
# Latest API Release Notes

Last update: Oct 30, 2025.

<InlineAlert slots="header, text" />

Tip

For non-developer product feature and UI changes, refer to [this link](https://helpx.adobe.com/sign/release-notes/adobe-sign.html)

## System requirement changes

For browser and product UI system requirements, see [https://helpx.adobe.com/sign/system-requirements.html](https://helpx.adobe.com/sign/system-requirements.html).

## New or updated developer assets

| Date | Change                                                                                                                                       |
|---|----------------------------------------------------------------------------------------------------------------------------------------------|
| January, 2027 (v18.0) | **Acrobat Sign MCP integration with Microsoft Copilot.** Create draft agreements, check agreement status, send reminders, and access library templates through natural-language requests in Microsoft Copilot. Copilot creates drafts; users complete and send them in Acrobat Sign. |
| May, 2026 (v17.1) | **OEM 2.0 identity and trust boundary enhancements.** With "Show personalized/OEM email address everywhere" enabled, agreement participant resolution prioritizes users provisioned by the same partner and automatically creates a recipient record when no match exists. Audit reports indicate whether a sender is partner-provisioned or a personal account, and signer flows guide users to switch accounts when the same email exists across account types. |
| March, 2026 (v17.0.1) | **OEM 2.0 personalized email display (by request only).** Acrobat Sign can display a user's personalized email address instead of the partner-registered email across key UI surfaces and notifications, while the registered email is preserved for authentication and entitlements. |
| March, 2026 (v17.0.1) | **Integration key expiration visibility.** The Access Tokens tab in Personal Preferences now shows the expiration date of each integration key (10-year validity), so you can replace keys before API calls start returning an expired token error. |
| October, 2025 (v16.2) | **Super Group Admin role for OEM 2.0 partners.** Partners can give their customers limited administrative capabilities to create and manage groups without exposing full Account Admin privileges. The creator of a group automatically becomes its Group Admin, and Account Admins control which group settings are exposed. |
| April, 2025 (v16.0) | **GDPR: delete user information via API (OEM partners).** Partners can use the API to delete user information when removing a user's data in compliance with GDPR requirements. |
| March, 2025 (v15.2.2) | **New e-sign environment for OEM partners.** Includes a field layer that mobile signers can switch to. Partner accounts were enabled for the new experience on March 25, 2025. |
| May, 2024 | [OAuth 2.0 support at account level](../acrobat_sign_events/webhooks-oauth-2-0.md)                                                           |
| April, 2024 | **Cookieless Request Signature experience for customer integrations.** Customers whose own applications invoke the Request Signature experience can enable the cookieless environment, per application. |
| January, 2024 | [OAuth 2.0 support for customer applications](../acrobat_sign_events/webhooks-oauth-2-0.md)                                                  |
| November, 2023 | **Sandbox support for the Salesforce and Power Automate integrations.** Customers with Sandbox access can install Salesforce into the environment and use Power Automate through a new Sandbox connector. |
| July, 2023 | Doc updates for all docs                                                                                                                     |
| May, 2023 | OEM 1.0 onboarding, quickstart, FAQ. OEM 2.0 beta docs                                                                                       |
| April, 2023 | Solutions for Government: onboarding docs, Postman collection                                                                                |
| March 14, 2023 | [New Acrobat Sign Workspace on Postman](https://adobe.postman.co/workspace/Adobe-Acrobat-Sign~1faa30d0-1b34-493b-96b1-475cf3978a95/overview) |
| September, 2022 | **Sandbox prerelease.** Product releases are deployed to Sandbox four weeks before the production release. |
| June, 2022 | **Cookieless web forms.** Web forms no longer require signers to have third-party cookies enabled. |
| September, 2021 | **Sandbox environment.** Enterprise-tier customers can purchase a Sandbox to test templates, custom workflows, and API applications, then move them back to production once verified. |
| June, 2021 | **OAuth 2.0 is the new default.** The new OAuth endpoint returns `api_access_point` and `web_access_point` only in the body of the Access Token Request, no longer accepts the client secret as a query parameter, and supports client secret rotation by any admin with access to the application ID. The OAuth v1 endpoint continues to work for existing connections. |
| June, 2021 | Sign Search v6 API: list, search, filter, and sort the agreements a user has participated in |
| July, 2020 | **Cookieless signing for unauthenticated signers.** For integrations that launch the e-sign page in an iFrame, a new button lets the recipient open the agreement in a new tab to complete signing without enabling cookies. |
| July, 2020 | **Auto-provisioning for integrations.** For accounts managed in the Adobe Admin Console, admins can configure Acrobat Sign so end users are automatically provisioned into the Acrobat Sign product profile the first time they use a partner integration. |


## Webhook Changes

| Date | Change |
|---|---|
| January, 2027 (v18.0) | **Webhook TLS 1.3 support.** \<br/\> Acrobat Sign webhooks support TLS 1.3 for HTTPS callback endpoints. You can register webhooks and receive notifications when your receiving endpoint requires TLS 1.3. |
| May, 2026 (v17.1) | **mTLS key management for webhooks.** \<br/\> In addition to uploading your own private key and certificate, you can now have Acrobat Sign generate the private key and a certificate signing request (CSR). Submit the CSR to your certificate authority, then upload the issued certificate to complete the configuration. Available through the v6 `POST /webhooks` endpoint. |
| March, 2026 (v17.0.1) | &#8226;**New webhook event AGREEMENT_PHONE_BOUNCED:** Triggers when an agreement sent via SMS can't be delivered (invalid number, carrier rejection, or blocked line). \<br/\>&#8226;**New participant field `extendedStatus`:** Included in each `memberInfos[]` object when the sender modifies an in-flight agreement using dynamic participation. The existing `status` field is unchanged. |
| November, 2025 | &#8226;Webhook event for SMS delivery failures - A new webhook event for SMS delivery failures is available, providing a notification when a message can’t be delivered due to invalid numbers, carrier issues, or other problems. Notification is triggered after all retry attempts fail. \<br/\>&#8226;API polling threshold for GET API endpoints regarding status retrieval or listing purposes- A new polling threshold now limits how frequently client applications can poll specific GET /agreement endpoints. |
| June, 2025 | &#8226;The webhookNotificationApplicableUsers parameter is to be removed from the Webhook payload\<br/\>&#9702; The Webhook 2.0 infrastructure has been rolled out to all customers, and with that completed, signer notifications have been deprecated. As a result, the webhookNotificationApplicableUsers parameter of the webhook payload no longer provides any useful data and will be removed from all webhook payloads.\<br/\>&#8226; OAuth 2.0 capabilities have been extended to group-level administrators - Group-level admins now have the authority to use OAuth 2.0 tokens. |
| April, 2025 | New Webhook Field: eventDateTimezoneOffset\<br/\>&#8226;Adobe Acrobat Sign introduces **eventDateTimezoneOffset**, a new field in the webhook payload for the AGREEMENT_ACTION_COMPLETED subscribed event.\<br/\>This field captures the recipient’s timezone offset when they update the agreement, providing better visibility into the local signing time.\<br/\>&#9702;   **eventDateTimezoneOffset** records the recipient’s timezone offset in minutes relative to UTC (e.g., eventDateTimezoneOffset : “UTC-300”)\<br/\>&#9702;   The existing **eventDate** field remains unchanged and continues to store the action’s UTC timestamp. The timezone offset does not modify the eventDate value.\<br/\>This update enhances the tracking of signing activities across different time zones. |
| February, 2025 (v15.2.1) | &#8226;A new `accountId` attribute is added to all event notification payloads. \<br/\>&#8226;OEM Embed 2.0 partners can set up a webhook for their channel to receive asset notifications from each of their customer accounts. |
| November, 2024 | New Webhook \<br/\>&#8226; AGREEMENT_RESTARTED: Triggers when a recipient restarts their agreement. |
| June, 2024 | Webhook Event Payload Update\<br/\>&#8226; The webhookNotificationPayload now includes the following new fields for all AGREEMENT_* webhook subscription event types: userId, authenticationMethod, and createdGroupId.\<br/\>&#8226; A new field **agreementCancellationInfo** is added to [AGREEMENT_REJECTED](../acrobat_sign_events/webhookeventsagreements.md#agreement_rejected).\<br/\>&#8226; A new field **agreementExpirationInfo** is added to [AGREEMENT_EXPIRED](../acrobat_sign_events/webhookeventsagreements.md#agreement_expired).\<br/\>&#8226; A new field **agreementCancellationInfo** is added to [AGREEMENT_AUTO_CANCELLED_CONVERSION_PROBLEM](../acrobat_sign_events/webhookeventsagreements.md#agreement_auto_cancelled_conversion_problem).\<br/\>&#8226; A default message will now be populated when sender does not provide reason for **agreementCancellationInfo** field in event of [AGREEMENT_RECALLED](../acrobat_sign_events/webhookeventsagreements.md#agreement_recalled). |
| January, 2024 | New Webhooks\<br/\>&#8226; AGREEMENT_EMAIL_OTP_AUTHENTICATED: Triggers when an agreement is authenticated with Email OTP.\<br/\>&#8226; AGREEMENT_RECALLED_MAX_SIGNING_EMAIL_OTP_ATTEMPTS: Triggers when maximum number of Email OTP authentication attempts exceeds. |
| November, 2023 | New Webhooks\<br/\>&#8226; AGREEMENT_UNSHARED: Triggers when an agreement is unshared.\<br/\>&#8226; AGREEMENT_UNSHARED_AUTO: Triggers when an agreement is automatically unshared. |
| July 18, 2023 | New Webhooks\<br/\>&#8226; AGREEMENT_DOCUMENTS_VIEWED: Triggers when a user views an agreement.\<br/\>&#8226; AGREEMENT_DOCUMENTS_VIEWED_PASSWORD_PROTECTED: Triggers when a user views an agreement that is password protected. |
| July 18, 2023 | Updated Webhooks\<br/\>&#8226; AGREEMENT_RECALLED: Additional payload values now include `comments` and `notifyOthers`.\<br/\>&#8226; MEGASIGN_RECALLED: Additional payload values now include `comments` and `notifyOthers`. |
| July 18, 2023 | Updated IP Ranges: Webhooks require allow-listing to specific IP addresses. The [IP range list has been updated.](https://helpx.adobe.com/sign/system-requirements.html#ipranges). |
| July 18, 2023 | All `/search` API calls are subject to volume throttling at the rate of:\<br/\>&#8226; 1000 calls per minute \<br/\>&#8226; 2500 calls per hour\<br/\>&#8226; 7200 calls per day\<br/\>**Note**: Administrators may file a [support request](https://adobe.com/go/adobesign-support-center) to elevate the volumes. |
| March 14, 2023 | `initiatingUserId` and `initiatingUserEmail`: Accounts on Webhooks 2.0 will populate the `initiatingUserId` and `initiatingUserEmail` fields in the notification payload. Accounts that remain on the classic webhooks experience after March 14, 2023 will see unpopulated fields present in the payload. |
| March 14, 2023 | All accounts existing before November 8th, 2022, are migrated to webhooks 2.0. On July 18th, 2023, Adobe will sunset the legacy webhooks infrastructure (referred to as “classic webhooks”). **See below**. |
| January, 2023 | AGREEMENT_EXPIRATION_UPDATED is now available as a selectable event for agreements in the Acrobat Sign webhook interface. It was previously available only through the `POST /webhooks` API call. |
| Nov. 8, 2022 | Webhook conversion to a microservice (“webhooks 2.0”) with the following benefits:\<br/\>&#8226; Independent release cycles from the core code thereby supporting frequent and rapid updates, feature enhancements, bug fixes, etc.\<br/\>&#8226; An independent and new UI with features that streamline webhook visibility and management.\<br/\>&#8226; Enhanced performance.\<br/\>Webhooks 2.0 supports all the features of classic webhooks with one caveat: If a webhook was configured for the user, their group, or their account, classic webhooks delivered notifications to all agreement participants. In webhooks 2.0, ONLY webhooks configured for the sender, the sender’s group, or the sender’s account will receive notifications. Current customers can try webhooks 2.0 on a Trial, Developer, or Sandbox account via Adobe’s Insider Access program.\<br/\>Effective dates:\<br/\>&#8226; November 8th, 2022: All new customers will be onboarded to webhooks 2.0.\<br/\>&#8226; March 14th, 2023: All customers will be automatically migrated.\<br/\>&#8226; July 18th, 2023: Adobe sunsets the legacy webhooks infrastructure.\<br/\>**Note**: Customers with strict network security policies must configure new IP addresses per [https://helpx.adobe.com/sign/system-requirements.html](https://helpx.adobe.com/sign/system-requirements.html). |
| Nov. 8, 2022 | New Webhooks:\<br/\>&#8226; AGREEMENT_REMINDER_INITIATED: fires when an agreement reminder is triggered and reminder emails are suppressed.\<br/\>&#8226; MEGASIGN_REMINDER_SENT: webhook fires when a Send in Bulk reminder is triggered and reminder emails are enabled (default)..\<br/\>&#8226; MEGASIGN_REMINDER_INITIATED: fires when a Send in Bulk reminder is triggered and reminder emails are suppressed (the default) ( Unlike MEGASIGN_REMINDER_SENT webhook fires when reminder emails are enabled). Only one MEGASIGN_REMINDER_INITIATED (or MEGASIGN_REMINDER_SENT) webhook is delivered for the parent Send in Bulk container. Individual child agreements do not each fire a MEGASIGN_REMINDER_INITIATED webhook. |
| Sept. 13 | Support for webhook endpoints to communicate on port 8443 (in addition to 443) to support mTLS. |
| Sept. 13 | `POST /agreements/{agreementId}/` endpoint now supports an optional redirect URL that sends users to control a custom post-sending landing page instead of the default Acrobat Sign page. Developers can use the new `postSendOption.redirectUrl` for apps and integrations so that the sender redirects to a workflow-specific page, thereby both allowing the sender to remain in the integration (e.g. branded workflow), and providing a way for the developer to create a page where the sender can be notified about the sent status or modify the agreement (reminders, deadlines, etc.) You must configure a Sign setting to allow these URLs to avoid open redirect security issues. The description of this setting is similar to: “the authorized URLs the application can redirect to after completing a workflow”. This option does not apply to Fill & Sign flows. |
| June | AGREEMENT_EXPIRATION_UPDATED (API only): A new webhook event provides notification updates for an agreement’s expiration time. It can only be subscribed to via the POST /webhooks API call. |
| June | AGREEMENT_SIGNER_NAME_CHANGED_BY_SIGNER: This new event triggers when a recipient changes the pre-populated name value when signing an agreement. Name values can be pre-populated through the API or through the require recipient name when sending option. |
| April | REMINDER_SENT: A new webhook event executes on REMINDER_SENT events either by explicitly subscribing to the AGREEMENT_REMINDER_SENT event or subscribing to AGREEMENT_ALL.|
| October, 2021 | New Webhook \<br/\>&#8226; AGREEMENT_READY_FOR_NOTARIZATION: Triggers when an agreement is ready for notarization. The event is not visible in the webhooks UI and can be subscribed to only through the `POST /webhooks` API call. |


## REST API changes

| Date | Change |
|---|---|
| January, 2027 (v18.0) | **`reminderFrequency=NEVER` now disables reminders.** \<br/\> The Agreements API now treats `reminderFrequency=NEVER` as an explicit instruction to disable reminders, overriding any workflow, group, or account default. Previously, the value was treated as unset and the agreement inherited the default reminder frequency. \<br/\>&#8226; Applications that rely on inherited reminders must omit `reminderFrequency` from `POST` and `PUT` requests instead of specifying `NEVER`. \<br/\>&#8226; The change applies to standard agreements and custom workflows. \<br/\>&#8226; `GET` requests return the resolved reminder frequency. |
| January, 2027 (v18.0) | **Scheduled Send in the REST API v6.** \<br/\> Agreements can be scheduled to send automatically at a selected date and time, from 30 minutes to 30 days ahead. Scheduled agreements remain in Draft on the Manage page until they are sent, and can be edited, rescheduled, or canceled before delivery. Scheduled Send is not supported for Send in Bulk or custom workflows. |
| September, 2026 (v17.2) | **Document size available in the Agreements API.** \<br/\> The `fileSize` parameter, which returns the document size in bytes, is now included in the responses for `GET /agreements/{agreementId}` and `GET /agreements/{agreementId}/documents`. |
| June, 2026 (v17.1.1) | **Suppress agreement notifications via API.** \<br/\> The REST v6 `POST /agreements` call can now control which notifications are sent when an agreement is created, by suppressing specific email types for participants, CCs, or the sender. |
| May, 2026 (v17.1) | **`loginHint` parameter for Digital Identity Gateway authentication.** \<br/\> Several v6 `/agreements` endpoints now accept a `loginHint` parameter that lets API senders initialize Digital Identity Gateway authentication with a known login identifier, such as an email address or user ID number. The identifier appears masked on the Digital Identity Gateway landing page and in the audit report. \<br/\>&#8226; `POST /agreements` \<br/\>&#8226; `PUT /agreements/{agreementId}` \<br/\>&#8226; `GET /agreements/{agreementId}` \<br/\>&#8226; `GET /agreements/{agreementId}/members` \<br/\>&#8226; `GET /agreements/{agreementId}/members/participantSets/{participantSetId}` \<br/\>&#8226; `PUT` and `GET /agreements/{agreementId}/participantSets/{participantSetId}/participants/{participantId}/securityOptions` |
| October, 2025 | **All GET API endpoints are subject to a polling policy.** \<br/\> A limit will be applied to how often the effective user can make the same API call to the Acrobat Sign service. An error is returned if the same call is made within the minimum polling interval by the same effective user. |
| October, 2025 (v16.2) | **"Authentication Method Updated" event.** \<br/\> When a sender or authorized delegate changes a recipient's authentication method, the change is recorded as a discrete event. The event is exposed through `GET /agreements/{agreementId}/events` and also appears in the audit report and activity log. |
| September, 2025 (v16.1.1) | **Stricter locale validation when creating agreements via API.** \<br/\> When the account option "Allow users in your account to select a different signing language" is disabled, the API rejects any request where the agreement locale doesn't match the "Signing language" selected by the admin. Sending through the web interface is not affected. |
| June, 2025 | OAuth 2.0 capabilities have been extended to group-level administrators\<br/\>&#8226; Group-level admins now have the authority to use OAuth 2.0 tokens. |
| May, 2025 | **Update to API throttling**:\<br/\>&#8226; After the May 2025 release, [new API throttling rules will be applied](../developer_guide/apiusage.md#api-throttling):\<br/\>&#9702; When high overall system load is detected, Acrobat Sign will throttle a subset of API requests across the entire system.\<br/\>&#9702; When high-usage customers are identified as contributing to overall system slowness, Acrobat Sign will throttle a subset of API requests specifically for that customer.\<br/\>&#9702; When an API request is throttled, it will be rejected with a 429 HTTP status code, along with the following:\<br/\>Response Body [below](#response-body)\<br/\>Response Header [below](#response-header)\<br/\>Upon receiving the above response, you can use the Retry-After header or the retryAfter in the response body to determine when to attempt the request again.\<br/\>Retry Penalty\<br/\>For all new accounts created after the May 2025 release, a penalty will be applied if the account does not adhere to the specified retry time interval. If the same request is attempted again within this interval, the request will be throttled again, and the retry time interval will be reset.\<br/\>**GET /agreements API Now Served from a Microservice**:\<br/\>&#8226; The GET /agreements endpoint is migrating from the Acrobat Sign core application to a dedicated microservice. As part of this transition, search requests will retrieve data from the search service (secondary storage) instead of the primary database. This change enhances service stability and prevents atypical API calls from affecting the Acrobat Sign experience.\<br/\>&#9702; The maximum page size for the GET /agreements call is now 500 agreements per request. Historically, the search service did not fetch more than 100 agreements per page. If more agreements are required, multiple queries with a narrower scope may be necessary.\<br/\>&#9702; Since searches now occur in secondary storage, minor additional latency may be observed when calling the GET /agreements endpoint. |
| April, 2025 | **GET /agreements/\{agreement_id\}**\<br/\>&#8226;A status parameter has been added to the memberInfos object within participantSetsInfo:\<br/\>**GDPR Compliance - Delete User Info via API**: Payload [below](#payload)\<br/\>&#8226;Partners can now use the API to delete user information when removing a user’s data in compliance with GDPR requirements. This enhancement streamlines data management and ensures regulatory compliance. |
| November, 2024 | The `POST /agreements/{agreementId}/deliverableAccess` endpoint API category changed from EXTERNAL_PARTNER to PUBLIC. |
| September, 2024 | API support for Identity Check configuration in the `/agreements` endpoints. |
| May, 2024 | **Endpoint update**:\<br/\>&#8226; Enhanced webhookEndpoints API: The /webhookEndpoints API can now be configured at both the account level and the application level.\<br/\>**\/webhooks API update**:\<br/\>&#8226; MODIFYING_IMMUTABLE_FIELDS error code is returned in the following cases, in addition to the existing scenario:\<br/\>&#9702; When the caller does not include the webhookUrl or webhookEndpointInfo field in a PUT /webhooks API request while updating an existing webhook. Previously, the webhook service did not throw an error if the webhookUrl field was not included; it simply skipped updating this field. With the introduction of the webhookEndpointInfo field, the caller must provide either webhookUrl or webhookEndpointInfo. Failure to provide either field will result in an error.\<br/\>**Note**: Once a webhook is migrated from using webhookUrl to webhookEndpointInfo, it cannot revert back to using webhookUrl. This migration is necessary to upgrade the webhook to use OAuth 2.0 authentication.\<br/\>&#9702;When the caller attempts to update any part of the webhookEndpointInfoobject. The webhookEndpointInfo field is immutable and cannot be changed once set. |
| Febuary, 2025 | The Swagger pages have been updated to indicate me as a shorthand for the accountId. A new **accountId** attribute is being added to all event notification payloads.\<br/\>New Settings APIs:\<br/\>&#8226;**POST /accounts/\{accountId\|me\}/settings/search** - Takes the identified account (accountId) and a list of setting names and returns the list of setting names with their values for the account specified. Only account-level values are returned.\<br/\>&#8226;**PUT /accounts/\{accountId\|me\}/settings** - Applies a provided list of setting names and their values to the identified account (accountId).\<br/\>New Logo APIs:\<br/\>&#8226;**POST /accounts/\{accountId\|me\}/logo** - Uploads the CoBrandingLogo file.\<br/\>&#8226;**GET /accounts/\{accountId\|me\}/logo** - Returns the image data of the CoBrandingLogo image file in the same format that it was uploaded.\<br/\>&#8226;**DELETE /accounts/\{accountId\|me\}/logo** – Clears the CoBrandingLogo image for the account.\<br/\>Signing Reason APIs:\<br/\>&#8226;**GET /accounts/\{accountId\|me\}/signingReasons** - Returns a list of signing reasons for the identified account (accountId).\<br/\>&#8226;**POST /accounts/\{accountId\|me\}/signingReasons** - Creates a new signing reason for the identified account (accountId).\<br/\>&#8226;**GET /accounts/\{accountId\|me\}/signingReasons/\{signingReasonId\}** - Retrieves the text of the identified signing reason (signingReasonId) from the identified account (accountId). account’s identified signing reason.\<br/\>&#8226;**PUT /accounts/\{accountId\|me\}/signingReasons/\{signingReasonId\}** - Updates the identified signing reason (signingReasonId) from the identified account (accountId).\<br/\>&#8226;**DELETE /accounts/\{accountId\|me\}/signingReasons/\{signingReasonId\}** - Removes the identified signing reason (signingReasonId) from the identified account (accountId). |
| January, 2024 | New feature: [Support for WebhookEndpoint APIs](../developer_guide/webhook-endpoint-api.md) |
| November, 2023 | New feature:\<br/\>&#8226; [Generate templates from in-progress or signed agreements](../developer_guide/apiusage.md#generate-templates-from-in-progress-or-signed-agreements)\<br/\>&#8226; [Send private messages to the counter signers](../developer_guide/apiusage.md#send-private-messages-to-the-counter-signers) |
| November, 2023 | **`agreementStatus` parameter on post-completion redirect URLs.** \<br/\> Post-completion redirects can now be set separately for completed and declined agreements. A new `agreementStatus` parameter is automatically appended to the redirect URL when the agreement reaches a terminal status: `?agreementStatus=completed` for completed agreements and `?agreementStatus=declined` for canceled (declined) agreements. It applies to all agreements, including manually sent agreements, web forms, and Send in Bulk. |
| August, 2023 | [Associate FormFieldGenerator with specific documents](../developer_guide/apiusage.md#add-form-fields-to-agreements) |
| July 18, 2023 | `GET /combined` document returns merged field data; Merged (prefilled) data can be visually validated using the `GET /agreements/{agreementId}/combinedDocument` call and including the `includeMergedFieldData` parameter. The downloaded PDF includes the form field data that has already been merged via `PUT /formfields/mergeInfo` call. |
| Nov. 8 | New endpoints\<br/\>&#8226; DELETE /agreements/\{agreementId\} - A new endpoint that supports the “soft delete” function by moving an agreement and all related data (including database records and physical files) to the Deleted folder where it will be fully destroyed 14 days later (unless restored first).\<br/\>&#8226; GET /users/\{userId\}/settings - A new endpoint to obtain the authoring settings for a user. |
| Nov. 8 | Updated endpoints\<br/\>&#8226; GET /libraryDocument/\{libraryDocumentId\}/combinedDocument - An update to the existing endpoint to add a value (skipDocumentSealing) that returns a non-certified PDF.\<br/\>&#8226; POST /libraryDocuments - An update to an existing endpoint that creates a library document from an agreement.\<br/\>&#8226; GET /groups - This endpoint has been expanded to support the new Shared Users queue by listing the account shares within a group. |
| Sept | The description of the BYON_NOTARY notaryType was updated to reflect the “bring your own” aspect of a customer-provided notary. |
| July | Devs can [improve the delegation process](https://helpx.adobe.com/sign/release-notes/adobe-sign.html) by updating the delegation API to use the v6 REST endpoint `delegatedParticipantSets`. Customers should see no impact beyond enforcing the required name values configuration during delegation. |
| April, 2022 | **JSON export format.** \<br/\> When exporting agreement or web form data through the REST v6 API, developers can now select JSON as the export format in addition to CSV. |
| October, 2021 | **Notarize integration API updates.** \<br/\>&#8226; `POST /agreements`: New role NOTARY_SIGNER to indicate a notary session participant, and a new `NotaryInfo` attribute in the AgreementInfo definition. \<br/\>&#8226; `PUT /agreements/{agreementId}` accepts notarization options; `GET /agreements/{agreementId}` returns them. \<br/\>&#8226; `POST /agreements/{agreementId}/members/participantSets/{participantSetId}/participants/{participantId}/signingTokens`: Returns a signing token that lets notary signers complete the esign phase. \<br/\>&#8226; New signing capability ACCEPT_BEFORE_NOTARIZATION, new agreement status WAITING_FOR_NOTARIZATION, and new event types READY_TO_NOTARIZE and NOTARIZED. |
| September, 2021 | &#8226;Two new REST v6 calls provide read access to web forms: `GET /widgets/{resourceId}` and `GET /widgets/{resourceId}/combinedDocument/url`. \<br/\>&#8226;`GET /workflows/{workflowId}` now returns the participant role in the response. |
| August, 2021 | `POST /users` (REST v6): Creates the user in the account's Default group when the optional `primaryGroupId` parameter is not defined. |
| June, 2021 | &#8226;**OAuth 2.0 is the new default.** A new version of the OAuth endpoint returns `api_access_point` and `web_access_point` only in the body of the Access Token Request, no longer accepts the client secret as a query parameter, and supports client secret rotation. The OAuth v1 endpoint continues to work for existing connections; its deprecation will be announced on the Technical Notifications page. \<br/\>&#8226;**`GET /agreements/{agreementId}/signingUrls`:** Previously returned 404 immediately after an agreement was created. Instead of polling until a 200 is returned, subscribe to the AGREEMENT_CREATED webhook. \<br/\>&#8226;**Sign Search v6 API:** New APIs for listing, searching, filtering, and sorting a user's agreements. |
| May, 2021 | &#8226;**Asset transfer support (v6 only):** `PUT /libraryDocuments/{libraryDocumentId}` and `PUT /widgets/{widgetId}` accept `ownerId`; `GET /libraryDocuments`, `GET /libraryDocuments/{libraryDocumentId}`, and `GET /widgets/{widgetId}` return owner fields. \<br/\>&#8226;**`GET /workflows/{workflowId}`** now returns the current WorkflowID instead of the original version ID, matching what webhooks return. Contact support if your account needs the original ID. |
| March, 2021 | &#8226;Every v6 REST API request now includes standard headers. \<br/\>&#8226;All `/agreements` endpoints with an agreement ID path return a 404 AGREEMENT_DESTROYED error if the agreement was deleted through GDPR tools. \<br/\>&#8226;`POST` and `PUT /widgets` accept a `libraryDocumentId` to create a web form. \<br/\>&#8226;New `GET` and `PUT /megaSigns/{megaSignId}/formFields`; AUTHORING added as a state value on `POST /megaSigns` and `PUT /megaSigns/{megaSignId}/state`. |
| October, 2020 | &#8226;New `GET` and `PUT /libraryDocuments/{libraryDocumentId}/formFields` to retrieve and update form fields on a library template. \<br/\>&#8226;REST v5: Only the sender of an agreement can replace its recipients. Integrations that replace recipients on behalf of others (for example, Salesforce) may be affected; Advanced Account Sharing with Modify enabled is a workaround. \<br/\>&#8226;Post-sign redirects now default to a 0-second delay. API call parameters override group- and account-level redirect settings. |
| September, 2020 | &#8226;`GET /agreements/{agreementId}/signingUrls` adds `expiry` (30 to 315360000 seconds; default 14 days for new customers). \<br/\>&#8226;`POST /agreements` adds the optional `formFieldGenerators` attribute to position fields relative to anchor text. \<br/\>&#8226;`POST /widgets/{widgetId}/views` adds `personalizedSigningViewConfiguration` for personalized web forms. \<br/\>&#8226;New `POST /groups`, `PUT /groups/{groupId}`, and `DELETE /groups/{groupId}`. \<br/\>&#8226;Privacy administrators can call `DELETE /agreements/{agreementId}/documents` without the `x-api-user` header when using an account-scoped token. |
| July, 2020 | &#8226;`POST /agreements/{agreementId}/views` (COMPOSE view) adds `canEditFiles` to `ComposeViewConfiguration.FileUploadOptions`. \<br/\>&#8226;`PUT /users/{userId}/groups` supports the `isPrimaryGroup` argument. |
| March, 2020 | &#8226;`GET /agreements/{agreementId}`: `parentId` and `type` added to the AgreementInfo object for child Send in Bulk and web form agreements. \<br/\>&#8226;New `GET /accounts/{accountId}` returns the DetailedAccountInfo object. |
| January, 2020 | `GET /agreements/{agreementId}/combinedDocument` (REST v6) now includes the audit report and supporting documents. |



### Response body
```json
{
  "code":"THROTTLING_HIGH_SYSTEM_LOAD",
  "message":"Acrobat Sign system is experiencing high overall load, due to which subset of the requests are being throttled. Please try again in <wait_time_in_seconds> seconds.",
  "retryAfter": <wait_time_in_seconds>
}
```
### Response header
``` text
X-Throttling-Reason : "high-system-load"
Retry-After : <wait_time_in_seconds>
```

### Payload
```json
{
  participantSetsInfo": [
{
  "role": "SIGNER",
  "name": "string",
  "id": "string",
  "label": "string",
  "privateMessage": "string",
  "memberInfos": [
    "name": "string",
    "id": "string",
    "email": "string",
    "status": "REPLACED"

  ]
}
]
}
```

## Bug fixes

### July 2023

Refer to the [Resolved issue list](https://helpx.adobe.com/sign/release-notes/adobe-sign/sign-release-schedule.html#Schedule).

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

None

### April 2022

4328663 Customer accounts that have SAML set to Mandatory or SAML\_ACTIVATE\_PENDING\_USERS = true can not inactivate users using the bulk edit feature in the Acrobat Sign system as the userIDs reactivate immediately after the update. Additional code has been added to ensure that only “Created” users can be immediately activated.

4331146 REST v6 GET Agreements > displayUserSetMemberInfos is blank for some drafts when workflows are designed with more potential recipients than are utilized due to email values being required.

4333575: Identity Verification Methods defined in Workflow (PHONE and ADOBE\_SIGN) are not returned in REST v5 or v6 GET /workflows/\{workflowId\}

4333774 Multi-file agreements signed with a digital signature would not return a name-value when GET /agreements/\{agreementID\}/documents were called due to a null value in the document version reference. Agreements containing a digital signature now correctly contain a name property. For agreements created from multiple documents, the API will still return a single document for digitally signed agreements, and that document will now have the name listed as “multidoc.pdf”.

4335442 Error Code “MODIFYING\_IMMUTABLE\_FIELDS” is not listed in the swagger documentation for PUT /users/\{userId\} in REST v6

4336037 Calling GET /signingUrls after retrieving the agreement ID can generate an “AGREEMENT\_NOT\_SIGNABLE” status that can be inferred to indicate the agreement is in a terminal state. The conditions that trigger the status in these cases now trigger an “AGREEMENT\_NOT\_EXPOSED” status only.

4341807 The DISPLAY\_EMAIL back-end value is being returned in response to /signingUrls. The function to capture the email of a participant has been updated to take this context into account.

4341947 There is no retryAfter in the response body for some API calls when they trip the throttling threshold. The managing method has been updated to include the retryAfter response.

4343205 Agreements sent with a custom email template and a link expiration set to 60 return a 500 error when the Send new Link button is used. The link expiration function in conjunction with custom email templates has been modified to eliminate the error.

### January 2022

4308773 Signing on the iOS mobile application could result in an “AUTO\_CANCELLED\_CONVERSION\_PROBLEM” after the recipient signature was completed due to offline sync events that cause queued requests to be sent multiple times. Server-side code has been added to evaluate if a successful conversion process has completed for the same participation ID when a conversion times out, allowing for graceful resolution of conflicts.

4319974 The Locale selector on the signing page was still visible when the signingurl is retrieved using GET /signingurl v6 REST API due to the API call falling back to the application value instead of the session value. The API call has been updated to retrieve the setting value from the session (API user) instead of the application

<HorizontalLine />
© Copyright 2022, Adobe Inc..  Last update: Oct 30, 2025.
![](../_static/adobelogo.png)
