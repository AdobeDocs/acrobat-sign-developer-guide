
# Latest API Release Notes

Last update: Oct 30, 2025.

<InlineAlert slots="header, text" />

Tip

For non-developer product feature and UI changes, refer to [this link](https://helpx.adobe.com/sign/release-notes/adobe-sign.html)

## System requirement changes

For browser and product UI system requirements, see [https://helpx.adobe.com/sign/system-requirements.html](https://helpx.adobe.com/sign/system-requirements.html).

## New or updated developer assets

| Date           | Change                                                                                                                                                        |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| May, 2024      | [OAuth 2.0 support at account level](https://developer-stage.adobe.com/acrobat-sign/developer-guide/overview/acrobat_sign_events/webhooks-oauth-2-0)          |
| January, 2024  | [OAuth 2.0 support for customer applications](https://developer-stage.adobe.com/acrobat-sign/developer-guide/overview/acrobat_sign_events/webhooks-oauth-2-0) |
| July, 2023     | Doc updates for all docs                                                                                                                                      |
| May, 2023      | OEM 1.0 onboarding, quickstart, FAQ. OEM 2.0 beta docs                                                                                                        |
| April, 2023    | Solutions for Government: onboarding docs, Postman collection                                                                                                 |
| March 14, 2023 | [New Acrobat Sign Workspace on Postman](https://adobe.postman.co/workspace/Adobe-Acrobat-Sign~1faa30d0-1b34-493b-96b1-475cf3978a95/overview)                  |


## Webhook Changes


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
