---
title: Acrobat Sign REST API Samples — Acrobat Sign SDK Downloads
---

# Acrobat Sign REST API Samples

<br />
<span style="font-size: 16px">These sample Java clients of the Acrobat Sign REST APIs demonstrate how to use the API as well as some of its key capabilities.</span>

The samples are arranged according to the version of the Acrobat Sign REST API’s that they use. For example, the samples for v6 REST API’s are under the v6 folder.

All sources are under the **adobesign.api.rest.sample** package (and sub packages) and are laid out as follows:

+ **adobesign.api.rest.sample**: Contains individual sample clients each demonstrating a specific capability. Each client is named according to the capability it demonstrates. For example, the client GetUsersInAccount.java shows how to retrieve a list of users from the account of the user on whose behalf the API call is made (also called **API user** in this document).
+ **adobesign.api.rest.sample.util**: Contains helper classes that encapsulate the REST calls required by the sample clients. Of particular note is RestApiUtils.java which contains methods that make the actual low-level REST API calls.
+ **adobesign.api.rest.sample.requests**: Contains input files used by the sample clients. These include JSON objects that specify the input data and arguments required by some of the API calls.

## Prerequisites

Before using the samples, you need to obtain either an OAuth access token or an integration key as described at <span style="color: #2980b9">https://opensource.adobe.com/acrobat-sign/developer_guide/gstarted.html</span>.

You can provide this token or key as a value to the OAUTH_ACCESS_TOKEN constant in RestApiOAuthTokens.java, or you can provide a refresh token as a value to the OAUTH_REFRESH_TOKEN constant (in the same class) which will be used to refresh the OAuth access token.

If neither is provided then a new OAuth access token will be requested from AdobeSign based on credentials provided in the OAuthCredentials.json file. Please refer to the AdobeSign OAuth page (<span style="color: #2980b9">https://secure.echosign.com/public/static/oauthDoc.jsp</span>) for information on how to obtain OAuth credentials for your account.

## Using the Samples

Each sample client has a set of instructions (provided as class comments) that needs to be followed. In particular, look for “TODO” comments in the client code and in the JSON input files for values that needs to be updated before the client can work properly. Once the clients and support files are updated with appropriate values, they can be compiled and run.

The following steps outline one way this can be done using the command line on Windows.

Note that on Linux and Mac OS, the path separator for the <span style="color: #e74c3c">-cp</span> and <span style="color: #e74c3c">-sourcepath</span> options is “:” (colon) instead of “;” (semicolon).

+ Navigate to the top-most folder i.e., version of the interested Acrobat Sign REST API, say v6, (the one containing “adobesign” and “lib”) so that it becomes the current directory.
+ Compile the sources using the following command:

```bash
javac -sourcepath .;adobesign -cp lib/json_simple-1.1.jar adobesign/api/rest/sample/*.java
```

+ To run a specific client, use the following command

```bash
java -cp .;lib/json_simple-1.1.jar adobesign.api.rest.sample.{name of client class}
```

For example, to run DownloadAuditTrail, use

```bash
java -cp .;lib/json_simple-1.1.jar adobesign.api.rest.sample.DownloadAuditTrail
```

You may also use an IDE of your choice. In that case, you will need to create a new project with sources taken from the adobesign folder and lib/json.jar set up as an input library.

### Output Path

The default output path used in the sample clients is the user temp directory. If needed, this can be changed by updating the method <span style="color: #e74c3c">adobesign.api.rest.sample.util.FileUtils.getDefaultOutputPath()</span>.

## Downloads

**Download**: https://github.com/adobe/acrobat-sign/tree/main/sdks/AcrobatSign_REST_Samples/v6

V6 Acrobat Sign REST API (2016) introduces many advanced features, including Draft, Reminder API’s, Pagination, ETag, Suppress Email among others.

<InlineAlert slots="text" />

The deprecated versions 3, 4, and 5 are available but should not be used in production.
