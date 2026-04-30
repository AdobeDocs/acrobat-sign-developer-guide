---
title: Acrobat Sign API Best Practices
---
# API Best Practices

## Base URI

### Details

* Adobe Acrobat Sign tilizes a multi-sharded architecture, distributing accounts across different API endpoints based on geographical regions. To interact with the Sign API, it is essential to first identify the appropriate access point for your account. This endpoint can vary, such as [api.na1.adobesign.com](https://www.adobe.com/acrobat/business/sign.html?fromES=true), [api.na4.adobesign.com](https://www.adobe.com/acrobat/business/sign.html?fromES=true), [api.eu1.adobesign.com](https://www.adobe.com/acrobat/business/sign.html?fromES=true), or others, depending on your account’s regional allocation
* The `baseUri` API response includes the `apiAccessPoint`, which is a critical parameter needed to route subsequent API requests to the correct endpoint for accessing other Acrobat Sign APIs
* If other APIs are accessed using an incorrect endpoint, the request will be considered invalid and will not be processed

### Bad Practices Identified
* Redundant invocation of the `getBaseUri` API after obtaining the access token
* Redundant invocation of the `getBaseUri` API before every REST call for each user within the same account

### Best Practices
* If a subsequent REST API invocation returns `INVALID_API_ACCESS_POINT`, it indicates that the `apiAccessPoint` is incorrect. In this case, re-invoke the getBaseUri API to obtain the correct endpoint
* Cache and reuse the `apiAccessPoint` for all users within the same account, as the base URI remains consistent across the account. This optimization, based on your workflow use case, will prevent redundant invocations of the `getBaseUri API`

### Pseudo Code

Good Pattern
```
//Required OAuth Scopes**:
//Accepts ANY valid OAuth scope** - This endpoint accepts any valid OAuth access token regardless of scope. It is used to retrieve the correct API access point (base URI) for subsequent API calls.
//Should be called before making other API calls to ensure you're using the correct base URI
## Scenario 1: Partner Application (Multiple Accounts)

// Cache to store base URIs for different accounts
private Map<String, String> baseUriCache = new HashMap<>();

// Method to invoke API with base URI caching
public ApiResponse invokeApi(String apiEndpoint, Map<String, String> apiParams, String accountId) {
    // Check if base URI for the account is cached
    String apiAccessPoint = baseUriCache.get(accountId);

    if (apiAccessPoint == null) {
        // If not cached, invoke baseUri API to get the base URI
        apiAccessPoint = getBaseUriForAccount(accountId);
        // Cache the base URI for future use
        baseUriCache.put(accountId, apiAccessPoint);
    }

    // Perform the REST API call with the cached or newly retrieved base URI
    ApiResponse apiResponse = callRestApi(apiAccessPoint + apiEndpoint, apiParams);

    // Check if INVALID_API_ACCESS_POINT error is returned
    if (apiResponse.getError().equals("INVALID_API_ACCESS_POINT")) {
        // Reinvoke baseUri API to get correct access point
        apiAccessPoint = getBaseUriForAccount(accountId);
        // Update the cache with the new base URI
        baseUriCache.put(accountId, apiAccessPoint);
        // Retry API call with the updated access point
        apiResponse = callRestApi(apiAccessPoint + apiEndpoint, apiParams);
    }

    // Return final API response
    return apiResponse;
}


# This method:
# 1. Gets an access token for a user in the specified account
# 2. Calls the getBaseUri API endpoint with that access token
# 3. Returns the api_access_point from the response

private String getBaseUriForAccount(String accountId) {
    # Step 1: Get an access token for a user in this account
    # This typically involves:
    # - Using application credentials (client_id, client_secret) to authenticate
    # - Exchanging them for an access token via OAuth flow
    # Or using a service account token if available
    # For partner apps, you might have:
    # - A service account user per customer account
    # - Or use account-level tokens stored securely
    String accessToken = getAccessTokenForAccount(accountId);

    # Step 2: Call the getBaseUri API endpoint
    # GET /api/rest/v6/base_uris
    # Headers: Authorization: Bearer {accessToken}
    BaseUriResponse baseUriResponse = callGetBaseUriApi(accessToken);

    # Step 3: Extract and return the api_access_point
    # Response format: { "api_access_point": "https://api.na1.echosign.com",
    #                   "web_access_point": "https://secure.na1.echosign.com" }
    return baseUriResponse.getApiAccessPoint();
}

private String getAccessTokenForAccount(String accountId) {
    # Implementation depends on your authentication setup:
    # - OAuth 2.0 flow with client credentials
    # - Service account authentication
    # - Stored tokens (if securely managed)

    # Example: OAuth 2.0 client credentials flow
    # POST /oauth/v2/token
    # Body: grant_type=client_credentials&client_id={client_id}&client_secret={client_secret}
    #

    return oauthService.getAccessToken(accountId);
}

private BaseUriResponse callGetBaseUriApi(String accessToken) {
    # GET /api/rest/v6/base_uris
    # Headers:
    #   Authorization: Bearer {accessToken}

    # Response:
    #   {"api_access_point": "https://api.na1.echosign.com",
    #   "web_access_point": "https://secure.na1.echosign.com"}


    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + accessToken);

    return restTemplate.getForObject(
        "https://api.echosign.com/api/rest/v6/base_uris",
        BaseUriResponse.class,
        headers
    );
}


---

## Scenario 2: Customer Application (Single Identity)
#Customer applications typically work with a single user identity and don't need to manage multiple accounts. This simplifies the implementation significantly

private String cachedBaseUri = null;

public ApiResponse invokeApi(String apiEndpoint, Map<String, String> apiParams) {
    // Check if base URI is cached
    if (cachedBaseUri == null) {
        // If not cached, get the base URI using the current user's access token
        cachedBaseUri = getBaseUriForCurrentUser();
    }

    // Perform the REST API call with the cached or newly retrieved base URI
    ApiResponse apiResponse = callRestApi(cachedBaseUri + apiEndpoint, apiParams);

    // Check if INVALID_API_ACCESS_POINT error is returned
    if (apiResponse.getError() != null && apiResponse.getError().equals("INVALID_API_ACCESS_POINT")) {
        // Reinvoke baseUri API to get correct access point
        cachedBaseUri = getBaseUriForCurrentUser();
        // Retry API call with the updated access point
        apiResponse = callRestApi(cachedBaseUri + apiEndpoint, apiParams);
    }

    // Return final API response
    return apiResponse;
}


##  For customer apps, this is simpler:
## 1. Use the current user's access token (from OAuth login flow)
## 2. Call the getBaseUri API endpoint
## 3. Return the api_access_point

private String getBaseUriForCurrentUser() {
    // Step 1: Get the current user's access token
    // In customer apps, this is typically obtained during OAuth login:
    // - User authorizes the app
    // - App receives access token
    // - Token is stored in session or secure storage
    String accessToken = getCurrentUserAccessToken();

    // Step 2: Call the getBaseUri API endpoint
    // GET /api/rest/v6/base_uris
    // Headers: Authorization: Bearer {accessToken}
    BaseUriResponse baseUriResponse = callGetBaseUriApi(accessToken);

    // Step 3: Extract and return the api_access_point
    return baseUriResponse.getApiAccessPoint();
}

private String getCurrentUserAccessToken() {
    # In customer apps, this is typically:
    # - Retrieved from session storage after OAuth login
    # - Or from secure token storage
    # - Or from the OAuth token exchange flow

    return sessionManager.getAccessToken();
}
callGetBaseUriApi(String accessToken) {
    #Same as partner scenario.
}


---

## Key Differences Summary

| Aspect | Partner Application | Customer Application |
|--------|-------------------|---------------------|
| **Account Management** | Multiple accounts | Single identity |
| **Caching Structure** | `Map<String, String>` (accountId → baseUri) | Single `String` variable |
| **Access Token Source** | Per-account tokens (service accounts, stored tokens) | Current user's token (from OAuth login) |
| **Complexity** | Higher (needs account management) | Lower (single user context) |
| **Use Case** | ISVs, integrations managing multiple customers | End-user applications |

---

## Important Notes

1. **getBaseUriForAccount Implementation**:
- Must obtain an access token for a user in the target account
- The access token is used to call the `/api/rest/v6/base_uris` endpoint
- The response contains `api_access_point` which should be cached

2. **Error Handling**:
- Always handle `INVALID_API_ACCESS_POINT` errors
- This can occur if an account is migrated to a different shard
- When this error occurs, refresh the base URI and retry

3. **Token Management**:
- Partner apps: Need secure storage/retrieval of per-account tokens
- Customer apps: Typically use session-based token storage

4. **Cache Invalidation**:
- Consider implementing cache expiration/TTL
- Invalidate cache on `INVALID_API_ACCESS_POINT` errors
- May want to refresh cache periodically

```

Bad Pattern
```
public ApiResponse invokeApi(String apiEndpoint, Map<String, String> apiParams, String accountId) {
    // Always invoke baseUri API to get the base URI, even if it's already known
    String apiAccessPoint = getBaseUriForAccount(accountId);

    // Perform the REST API call with the retrieved base URI
    ApiResponse apiResponse = callRestApi(apiAccessPoint + apiEndpoint, apiParams);

    // Return final API response
    return apiResponse;
}
```

## Transient Document

### Details
* The document uploaded through this API call is considered transient, as it remains accessible for only seven days following the upload
* The returned transient document ID can be used in subsequent API calls to reference the uploaded file
* The transient document request is a multipart request comprising three components: the filename, the MIME type, and the file stream
* This request allows for the upload of only one file at a time
* The API output includes the `transientDocumentId`, which is subsequently used in the agreement creation API

### Bad Practices Identified
Invocation of API with invalid parameters causing request failures

* Empty file name and content
* File name greater than 255 characters
* File size exceeding the defined limit

### Best Practices
* Please navigate to /transient_Documents [endpoint ErrorCodes](https://secure.na1.echosign.com/public/docs/restapi/v6#!/transientDocuments). To understand the validations that should be performed before the actual request invocation for this case, consider the following:
  * **File Size Validation**: Ensure the file does not exceed the maximum allowed size(default value 10MB, min 1 byte, and max 100MB).
  * **File Name Length Validation**: Verify that the file name length is greater than 0 and less than 255 characters.
  * **File Type Validation**: Confirm that the file type is acceptable based on the specified MIME types.
  * **Empty File Check**: Ensure that the file is not empty before proceeding with the upload.
* [Handle Document Upload Error Scenarios](https://helpx.adobe.com/sign/kb/adobesign-doc-upload-error.html), that can occur in case document can not be processed
* Have look at [https://helpx.adobe.com/sign/using/transaction-limits.html](https://helpx.adobe.com/sign/using/transaction-limits.html) to know the limitation on uploaded file size as per service level 
  * If you attempt to upload a document that exceeds the specified boundaries, an error message will be displayed under the file, stating, “Upload limit exceeded.”
* Use library document if the same document need to be referenced for multiple agreement creation in future. 
  * Details for available library documents can also be retrieved through the [APIs provided by Acrobat Sign](https://secure.na1.echosign.com/public/docs/restapi/v6#!/libraryDocuments)

### Pseudo Code
Good Pattern
```
**Required OAuth Scopes** (ANY ONE of the following is sufficient):
- `agreement_write` - Required for creating agreements (most common for file uploads)
- `agreement_sign` - Required for signing agreements
- `widget_write` - Required for creating widgets
- `library_write` - Required for creating library documents

**Version-Specific Scopes**:
- **API v5 and earlier**: Also accepts `agreement_send` scope (deprecated in v6+)
- **API v6+**: `agreement_send` scope is **NOT** accepted

**API Type-Specific Scopes** (additional scopes accepted for special API types):
- **PRIVATE API type**: Also accepts `workflow_write` scope
- **INTERNAL_PARTNER API type**: Also accepts `agreement_sign` and `user_write` scopes


// method to perform input parameter validation
public boolean validateAndUploadFile(String filePath, String fileName) {

    // Step 1: Validate File Name
    if (fileName is null OR fileName is empty) {
        System.out.println("Error: File name cannot be empty.");
        return false; // Exit if validation fails
    }

    if (fileName.length() > 255) {
        System.out.println("Error: File name exceeds 255 characters.");
        return false; // Exit if validation fails
    }

    // Step 2: Validate File
    File file = new File(filePath);  // Assume File is a valid object representing the file

    if (!file.exists() OR file is a directory) {
        System.out.println("Error: File does not exist or is a directory.");
        return false; // Exit if validation fails
    }

    if (file.length() == 0) {
        System.out.println("Error: File is empty.");
        return false; // Exit if validation fails
    }

    if (file.length() > MAX_FILE_SIZE) { // MAX_FILE_SIZE is predefined (e.g., 10MB)
        System.out.println("Error: File size exceeds the maximum allowed size.");
        return false; // Exit if validation fails
    }


    System.out.println("File is valid.");
    return true;

}

public void invokeRestApi() {
    String filePath = <filePath>;
    String fileName = <fileName>;

    // method executing client side validation on filePath and fileName
    // Do note, there can be more validation that need to performed. This is just a sample. Have a look at the Swagger documentation for more details.
    if(!validateAndUploadFile(filePath, fileName)) {
        return;
    }

    invokeTransientDocumentApi(filePath, fileName);
}
```
Bad Pattern
```
public void invokeRestApi() {
    String filePath = <filePath>;
    String fileName = <fileName>;

    invokeTransientDocumentApi(filePath, fileName);
}

```

## Create Agreement

### Details
* Primary endpoint to create agreement using transient document, library document or URL
* Agreement is created in one of the following 3 states
  * **DRAFT** - to incrementally build the agreement before sending out
  * **AUTHORING** - to [add or edit form fields](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/addTemplateFieldsToAgreement) in the agreement
  * **IN_PROCESS** - to immediately send the agreement 
* The output is the agreementId used as input parameter to invoke other APIs such as /aggregate, /formData


### Bad Practices Identified
Invocation of API with invalid parameters
* Email validation
* Expired transientDocumentId
* Invalid state

### Best Practices
* Add fundamental pre-validation on inputs before invoking the API
* Look through [the endpoint ErrorCodes](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements) to to know more about the client side validations and what all error codes are expected
* Ensure that the necessary fields are populated with appropriate values, including `transientDocumentId`, `libraryDocumentId`, `urlFileInfo`, `membersInfo`, `email`, `state`, and others as required.

### Pseudo Code

Good Pattern
```
JSON:

{
"participantSetsInfo": [
    {
    "role": "SIGNER",
    "order": 1
    }
],
"name": "NDA",
"signatureType": "ESIGN",
"signatureFlow": "SENDER_SIGNATURE_NOT_REQUIRED"
"fileInfos": [
    {"transientDocumentId": "3AAABLblqZhXXXXXXXXXXXX"}
],
"state": "DRAFT"
}

JSON for IN_PROCESS state:

{
"name": "NDA",
"signatureType": "ESIGN",
"signatureFlow": "SENDER_SIGNATURE_NOT_REQUIRED",
"fileInfos": [
    {
    "transientDocumentId": "3AAABLblqZhXXXXXXXXXXXX"
    }
],
"state": "IN_PROCESS",
"participantSetsInfo": [
    {
    "role": "SIGNER",
    "memberInfos": [
        {
        "email": "end78183@adobe.com",
        "securityOption": {
            "authenticationMethod": "NONE"
        }
        }
    ],
    "order": 1
    }
]
}
```
Bad Pattern
```
{
"participantSetsInfo": [
    {
    "role": "SIGNER",
    "order": 1,
    "recipientSetMemberInfos": [
        { "email": "not-an-email" }
        ]
    }
],
"name": "Invalid NDA Example",
"message": "This will fail due to invalid data.",
"signatureType": "ESIGN",
"signatureFlow": "SENDER_SIGNATURE_NOT_REQUIRED"
"fileInfos": [
    {"transientDocumentId": "not-a-real-transient-id"}
],
"state": "DRAFT"
}
```

## Agreement State

### Details
* The `agreementId` obtained from the `POST /agreement` API is utilized as a path parameter to invoke this API, which is responsible for transitioning the state of the agreement.
* Following is the allowed transition state of agreement. DRAFT → AUTHORING → IN_PROCESS → CANCELLED/COMPLETED
* For GET agreements\{id\} allowed states DRAFT → AUTHORING → IN_PROCESS → IN_REVISION

It is important to know that the IN_REVISION agreement state supports the capability of modifying an in-flight agreement by removing recipients, but it is not an extension of the authoring state and does not offer the full range of agreement modifications that are possible when the agreement in the authoring state.
* Form fields can be added to the agreements only when it is in the AUTHORING state 
  * Refer Form Field Addition [during Agreement Send](https://helpx.adobe.com/sign/kb/place-form-fields-in-a-document-using-rest-api-adobe-sign.html) and on [agreement authoring](https://helpx.adobe.com/sign/kb/formfields-option-is-not-available-in-v6-of-rest-api-adobe-sign.html) using V6 Rest API.

### Bad Practices Identified
* Attempting to transition an agreement to an invalid state, such as moving an agreement to the **AUTHORING** state when it is already in the **IN_PROCESS** state, will result in an error. Valid state transitions must adhere to the predefined state flow
* Invoking the `formField` API to enter or edit form field data while the agreement is already in the **IN_PROCESS** state is not permitted. Modifications to form field data should occur only when the agreement is in an appropriate state for editing

### Best Practices
* To check the status of an agreement, call the `GET /agreements/{agreementId}` API. Based on the returned status of the agreement, you can then invoke the `PUT /agreements/{agreementId}/state` API to update the agreement’s state accordingly
* Ensure `PUT /agreements/{agreementId}/state` is used to transition only between correct states 
  * DRAFT → AUTHORING → (PUT /agreements/\{agreementId\}/formFields) → IN_PROCESS → CANCELLED/COMPLETED
* Once the agreement has been sent, it can no longer be modified or authored. Any attempts to make changes to the agreement’s content are prohibited after it has been dispatched

### Pseudo Code

Good Pattern
```
public void manageAgreementState(String agreementId) {
    // Step 1: Get current agreement status
    String currentStatus = getAgreementStatus(agreementId);

    // Step 2: Handle state transitions based on current status
    switch (currentStatus) {
        case "DRAFT":
            // Transition DRAFT -> AUTHORING
            updateAgreementState(agreementId, "AUTHORING");

            // After transitioning to AUTHORING, update form fields
            updateFormFields(agreementId);

            // Transition AUTHORING -> IN_PROCESS
            updateAgreementState(agreementId, "IN_PROCESS");
            break;

        case "IN_PROCESS":
            // Agreement is in process, no further authoring allowed
            // Optionally, transition to COMPLETED or CANCELLED if needed
            // updateAgreementState(agreementId, "COMPLETED") or
            // updateAgreementState(agreementId, "CANCELLED");
            break;

        case "CANCELLED":
        case "COMPLETED":
            // No further actions allowed if the agreement is completed or canceled
            print("No further actions allowed. Agreement is either completed or cancelled.");
            break;

        default:
            print("Error: Unknown or invalid agreement status.");
            break;
    }
}
```
Bad Pattern
```
public void manageAgreementState(String agreementId) {

    // Violation: Trying to update form fields even though agreement might be in DRAFT or COMPLETED state
    addUpdateFormData(agreementId);

    // Violation: Invalid state transitions (e.g., COMPLETED -> IN_PROCESS)
    updateAgreementState(agreementId, "IN_PROCESS");

    // Violation: Trying to update form fields again in an invalid state
    addUpdateFormData(agreementId);
}
```

## Signing URL
### Details
This API is used to obtain Signing URL for the agreement created. Obtaining the signing Url is useful for hosted signing where you can load the signing URL in a browser window on a mobile device and get the agreement signed in person

### Bad Practices Identified
**Immediately invoking the Signing URL API right after the agreement is created may result in a `404 HTTP` status code response. This occurs because the agreement may not yet be fully processed and available for signing**
* Agreement creation in the V6 APIs is asynchronous. Once the agreement is created, an asynchronous processing job is initiated, which subsequently changes the state of the agreement
* In this intermediate state, if the Signing URL API is called, it may return a 404 status code with the description: **DOCUMENT_NOT_YET_AVAILABLE**. This indicates that the document is not yet fully processed and accessible for signing

### Best Practices
* Handle the `404` status code when invoking the Signing URL API with care. Do not assume that a `404` error indicates that document processing has failed; it may simply mean that the agreement is still in an intermediate state. Implement a retry mechanism or wait for the agreement to reach a valid state before reattempting to retrieve the signing URL
* Poll the `GET /agreements/{agreementId}` API to check the status of the agreement. Ensure that the status has transitioned to **OUT_FOR_SIGNATURE** before invoking the Signing URL API to retrieve the signing URL for the agreement. This approach ensures that the agreement is ready for signing. (Wait between polls: start at 2 seconds, give up after 10 minutes for interactive/UI flows and up to 30 minutes for background jobs. Stop polling when status becomes terminal: SIGNED, APPROVED, CANCELLED, ABANDONED, EXPIRED (or equivalent in your version))

### Pseudo Code

Good Pattern
```
**Required OAuth Scopes**:
- **API v6+**: Always requires `agreement_write` scope
- **API v5 and earlier**: Conditional scopes based on request parameters:
- If `authoringRequested` OR `sendThroughWeb` is `true`: requires `agreement_write`
- If both `authoringRequested` AND `sendThroughWeb` are `false`: requires `agreement_send`
- If `autoLoginUser` is `true`: additionally requires `user_login` scope
public String getSigningUrl() {

    // Step 1: Create Agreement
    String agreementId = invokeCreateAgreementAPI();

    // Step 2: Polling to check if the agreement is "OUT_FOR_SIGNATURE"
    // add backoffTime and maxRetries to handle the polling mechanism
    boolean isOutForSignature = false;
    int backoffTime = 1000; // Initial backoff time in milliseconds (1 second)
    int maxRetries = 5;
    int attempt = 0;

    while (!isOutForSignature && attempt < maxRetries) {
        // Poll agreement status
        String agreementStatus = pollAgreementStatus(agreementId);

        if (agreementStatus.equals("OUT_FOR_SIGNATURE")) {
            isOutForSignature = true;
        } else {
            // Exponential backoff
            try {
                Thread.sleep(backoffTime);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            backoffTime *= 2;  // Double the backoff time
            attempt++;
        }
    }

    if (isOutForSignature) {
            String signingUrl = invokeGetSigningUrlAPI(agreementId);
            print("Signing URL: " + signingUrl);
            return signingUrl;
        } else {
            print("Failed to get agreement status within retry limit.");
        }
    return null;
}
```
Bad Pattern
```
public String getSigningUrl() {
        // Step 1: Create Agreement
        String agreementId = invokeCreateAgreementAPI();
        // Step 2: Invoke getSigningUrl API to get the signing URL
        String signingUrl = invokeGetSigningUrlAPI(agreementId);

        return signingUrl;
}
```
## Tracking Progress / Status of Agreement

### Details
* Once an agreement is sent, Acrobat Sign can provide the current status of the agreement along with a complete history of events that have occurred related to that specific agreement
* You can track the agreement progress in different ways:
  * Using [Webhooks](../acrobat_sign_events/index.md#best-practices) to receive per-agreement change updates event. 
    * Webhooks acts a callback on configured endpoint with appropriate event details whenever the agreement status changes
- [GET /agreements/\{agreementId\}](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/getAgreementInfo) (field - status, in the response) can be polled (at an appropriate polling frequency) to retrieve updated agreement status

### Bad Practices Identified
- Polling /agreement/\{id\} API for agreements in either draft or terminal state
- High frequency polling /agreement/\{id\} API for agreements status to query latest agreement status changes.
- Polling implemented with no/incorrect backoff policy ignoring the document age etc.

### Best Practices
* Webhooks: [Webhooks can be setup](../acrobat_sign_events/index.md#webhook-scopes) to get notified on any updates on agreement resource, as it transitions through 
  * Reduced API Invocations: This will help reduce the api redundant invocations, and you can update your system whenever there is a webhook notification received, avoiding reduce n/w resource overhead 
  * Backup: To not miss on events in case of unnoticed issue( webhook endpoint not reachable setup etc.), a polling mechanism with a very lenient frequency can be setup to maintain consistency, with optimised resource usage.
* [Poll GET /agreements/\{agreementId\}](https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/getAgreementInfo) API with an appropriate backoff policy to avoid redundant network overhead and throttling scenarios. This strategy helps reduce resource usage while still effectively monitoring the agreement's status changes.
* Poll the `/agreements/\{id\}` API only for agreements that are in non-terminal states, specifically those that are not in the "Draft" state or are currently in **IN_PROCESS**. This ensures efficient monitoring of agreements that are actively being processed
* Terminate the polling once the agreement reaches a terminal state, specifically when it transitions to **Completed** or **Canceled**. This ensures efficient resource utilization and avoids unnecessary API calls

### Pseudo Code

Good Pattern
```
public void handleAgreementNotification(Agreement agreement) {
    // Webhook received: update system based on agreement's new status
    boolean handleWebhookNotification = updateAgreementWithNewStatusFromWebhooks(agreement);

    if(handleAgreementNotification) {
        return;
    }

    // webhook was not processed due to miscellanous reasons
    // poll for agreement status

    // check if the current agreement status is non-terminal
    if(isTerminalState(agreement.getStatus())) {
        return;
    }

    startPollingForAgreementStatus(agreement);

}

public void startPollingForAgreementStatus(Agreement agreement) {
    int backoffTime = 1000; // Initial backoff time (in milliseconds)
    int maxBackoff = 60000; // Maximum backoff time
    String currentStatus;

    // Keep polling until the agreement reaches a terminal state
    while (true) {

        // Get the current agreement status
        currentStatus = getAgreementStatus(agreementId);

        // If agreement is in a terminal state, stop polling
        if (isTerminalState(currentStatus)) {

            terminatePolling(agreementId);
            break;

        }

        // Wait for the backoff time before next polling
        waitFor(backoffTime);

        // Increase the backoff time (exponential backoff)
        backoffTime = Math.min(backoffTime * 2, maxBackoff);

    }

}
```
Bad Pattern
```
public void handleAgreementNotification(Agreement agreement) {
    // Webhook received: update system based on agreement's new status
    boolean handleWebhookNotification = updateAgreementWithNewStatusFromWebhooks(agreement);

    if(handleAgreementNotification) {
        return;
    }
    // no fallback
    // return;

    startPollingForAgreementStatus(agreement);

}

public void startPollingForAgreementStatus(Agreement agreement) {
    String currentStatus;

    while (true) {
        currentStatus = getAgreementStatus(agreementId);

        // If agreement is in a terminal state, stop polling
        if (isTerminalState(currentStatus)) {
            terminatePolling(agreementId);
            break;
        }
}
```

## Retrieving List of Agreements and Details

### Details
* To retrieve list of agreements, REST V6 APIs have different endpoints 
  * GET v6/agreements : Retrieves agreements in a paginated manner depending on page size. Has filtering ability on groupId 
  * POST v6/search : Retrieves agreements in a paginated manner based on more advance criteria provided on the basis of createdDate, expirationDate, externalId, groupId, libraryDocumentId, modifiedDate etc. This API also provides a way to filter the results between date ranges and display them in a sorted manner
* GET v6/agreements 
  * “groupId” : Allows filtering results based on groups 
  * “pageSize” : Paginated navigation allows to control the result set item count in the response
* POST v6/search 
  * “creationDate, modified/expirationDate” : Helps narrow down the result set based on provided date range, to reduce the result items of the response 
  * “type” : a filter against the agreement asset type like “WIDGET”, “AGREEMENT”, “MEGASIGN_CHILD”, “MEGASIGN_PARENT”, “WIDGET_INSTANCE”, “LIBRARY_TEMPLATE”. 
    * This further helps narrowing the search items to only target “agreement” type only 
  * “status” : a filter against the agreement asset on the basis of agreement’s status : “WAITING_FOR_MY_SIGNATURE”, “WAITING_FOR_MY_APPROVAL”, “WAITING_FOR_MY_DELEGATION”, “OUT_FOR_SIGNATURE”, “OUT_FOR_DELIVERY”, etc
  * “role” : a filter against the agreement asset on the basis on target user roles : “SENDER”, “CC”, “SIGNER”, “APPROVER”, “FORM_FILLER”, etc
  * “sortByField”/ “sortByOrder” : Defines the field by which the results will be ordered

### Bad Practices Identified
* Usage of v5 or earlier GET /agreements API. These APIs do not have support for pagination and as well as advance filtering. As a result this increases the response time and increases network traffic
* Calling v6/agreements API at a higher frequency. Even though this API is paginated, clients should have a valid case as to why they need to call this API at a higher frequency 
  * Ideally, client should limit calling these APIs at a frequency lower than 3
* Iteratively calling `/agreements/\{agreementId\}` based on criteria such as status, role, created date, modified date, etc

### Best Practices
* Call GET v6/agreements or POST v6/search APIs and leverage pagination. This would ensure lesser response time and network traffic and optimal usage of resources
* If clients have a use case to filter agreements from the response returned from v6/agreements API, then they should instead call POST v6/search API, as this API has advance filtering capabilities that returns the agreements assets on the basis of ownership (“OWNED”, “SHARED”, “SHARED_AND_OWNED”), role, status, participantEmail, workflowId etc
* If clients have a use case that they want the result set to be filtered according to createdDate, expirationDate, modifiedDate. Then they use POST v6/search API that provide a capability to filter the results according the these parameter. Clients would just have to provide the startDate and endDate for which they need the agreement assets to be returned

### Pseudo Code
Good Pattern
```
**Required OAuth Scopes**:
- `agreement_read` - Required to retrieve agreements for the user

@GET
Public List<UserAgreements> getAgreementsAndDetails(String query, String id, String group, String namespace, String cursor, String pageSize){...}
```
Bad Pattern
```
@GET
Public List<UserAgreements> getAgreementsAndDetails(String query, String id, String group, String namespace){...}
```

## Retrieving List of Agreements of a Widget
### Details
* Once a widget is created, all the agreements that were created using this widget can be retrieved by using the following two APIs 
  * GET v6/widgets/\{widgetId\}/agreements` : Fetches list of agreements for the provided widgetId in a paginated manner 
  * POST v6/search : Fetches all agreements associated with the given associated widgetId additionally providing search, filter, sort capabilities
    * Specify type= WIDGET_INSTANCE search criteria
* Best practices are similar to what is mentioned in the “Retrieving List of Agreement and Details”

## Retrieving List of Users and Details
### Details
To retrieve list of users and user’s details, following two APIs are used

* GET v6/users : Fetched list of all users of the account in a paginated manner. This API has capability to filter the result set on the basis of their account administrator status (“ADMIN_ONLY”, “NON_ADMIN_ONLY”, “ALL”)
* GET v6/users/\{userId\} : Retrieves detailed information about the given user

### Bad Practices Identified
* Usage of v5 or older GET /users API. This is not a paginated API, thus increasing response time and network traffic
* Iteratively calling GET v6/users API with no limit on the number of invocations

### Best Practices
* Use paginated GET v6/users API in place of older version API and leverage pagination by defining the pageSize correctly, to reduce data transfer across network, resulting in faster response times. 
  * Limit GET all /users invocations to a limited (once per-hour, few per-day invocations)
    * Introduce sufficient delay(hour or two) between invocations on bulk endpoints (GET all based endpoints)
* Cache response received from GET v6/users/\{userId\} whenever possible to avoid repeated invocation this API for a particular user

### Pseudo Code
Good Pattern
```
public List<UserDetails> getUsersAndDetails(String query, String id, String group, String namespace, String cursor, String pageSize){...}
```
Bad Pattern
```
public List<UserDetails> getUsersAndDetails(String query, String id, String group, String namespace){...}
```

## API Rate Limits and Retry
### Details
* To prevent Acrobat Sign APIs being overwhelmed by too many requests, Adobe throttles Requests 
  * Different parameters passed to the same endpoint might contribute a different amount of resource consumption 
  * Your service package (small business, business, enterprise) directly influences your transaction rate. Higher tiers of service have higher throttle thresholds
* When a request is throttled, the client will receive an HTTP 429 “Too Many Requests” response with an error message appropriate to the request, it means the user/account has consumed over the limit of allowed resources within a certain time frame
* Client should handle the throttling errors appropriately to retry after the “wait_time”
* Rate Limit varies for different API endpoints
* Rate limited REST API Response
**Response received on a rate limited Invocation**
```
{
    "code":"THROTTLING_TOO_MANY_REQUESTS",
    "message":"<error_message_with_wait_time> (apiActionId=<api_action_id>)"
    "retryAfter": <wait_time_in_seconds>
}
```
**Retry-After Header**
```
Retry-After: <wait_time_in_seconds> //minimum time in seconds the client must wait until it can make the next request
```

### Bad Practices Identified
* Continuous invocation of API, even though the API failed with http error code 429
* If the API returned 429, clients not waiting for appropriate wait_time before the retrying the API call

### Best Practices
* When the api invocation receives a “HTTP error code 429” (rate limited), calling clients should use the retry header(Retry-After), and should pause invocation of sign apis, until the wait_time has elapsed 
  * To use the Retry-after delay, do the following:
    * Wait the number of seconds specified in the Retry-After header 
    * Retry with Exponential backoff, using the recommended “Retry-After” delay.
* It is recommend to log, monitor, and build alerts to get notified when the API calls are rate limited, to identify such rate-limited patterns

### Pseudo Code
Good Pattern
```
function callSignApiWithRetry(request):

    MAX_RETRIES = 5
    BASE_BACKOFF_SECONDS = 2
    MAX_BACKOFF_SECONDS = 60

    attempt = 0

    while (attempt < MAX_RETRIES):

        response = executeHttpRequest(request)

        if (response.status == 200):
            return response.body

        if (response.status == 429):
            attempt++

            retryAfter = response.headers["Retry-After"]

            if (retryAfter exists):
                waitTime = retryAfter
            else:
                // Fallback exponential backoff
                waitTime = min(
                    BASE_BACKOFF_SECONDS * (2 ^ attempt),
                    MAX_BACKOFF_SECONDS
                )

            log.warn(
                "Sign API throttled. " +
                "Attempt={}, Waiting={} seconds",
                attempt, waitTime
            )

            sleep(waitTime)
            continue

        if (response.status is retryable 5xx):
            attempt++
            waitTime = min(
                BASE_BACKOFF_SECONDS * (2 ^ attempt),
                MAX_BACKOFF_SECONDS
            )

            sleep(waitTime)
            continue

        // Non-retryable errors (4xx except 429)
        throw ApiException(response)

    throw RetryLimitExceededException("Max retries exceeded")
```

Bad Pattern
```
//Hammering the API after 429 (no delay)
while hasMoreWork():
resp = http.post("/api/rest/latest/agreements", payload)
if resp.status == 429:
    // ignore Retry-After; keep going
    continue
handle(resp);
/**/

// Fixed-delay retries ignoring Retry-After and backoff
// for attempt in 1..infinite:
resp = http.get("/api/rest/v5/agreements?query=NDA")
if resp.status != 429:
    break
sleep(100ms) // too short; constant; ignores server guidance
```


<HorizontalLine />
© Copyright 2022, Adobe Inc..  Last update: Dec 18, 2025.
![](../_static/adobelogo.png)
