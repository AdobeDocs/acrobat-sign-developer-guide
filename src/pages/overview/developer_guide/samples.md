# REST API Samples

The samples included in this section are Java clients of the Acrobat Sign REST API that demonstrate how to use the API as well as some of its key capabilities.

## The package

All sources are under the adobesign.api.rest.sample package (and sub packages) as published in the [Acrobat Sign GitHub repo](samples.md) and are laid out as follows:

- **adobesign.api.rest.sample**: Contains individual sample clients, each demonstrating a specific capability. Each client is named according to the capability it demonstrates. For example, the client GetUsersInAccount.java shows how to retrieve a list of users from the account of the user on whose behalf the API call is made (also called **API user** in this document).
- **adobesign.api.rest.sample.util**: Contains helper classes that encapsulate the REST calls required by the sample clients. Of particular note is RestApiUtils.java, which contains methods that make the actual low-level REST API calls.
- **adobesign.api.rest.sample.requests**: Contains input files used by the sample clients. These include JSON objects that specify the input data and arguments required by some of the API calls.

## Prerequisites

Before using the samples, you need to obtain either an OAuth access token or an integration key. Please refer to the AdobeSign API page ([https://secure.echosign.com/account/echosignApi](https://secure.echosign.com/account/echosignApi)) for information on how to do this for your account.

You can provide this token or key as a value to the <span style="color: red;">OAUTH_ACCESS_TOKEN</span> constant in RestApiOAuthTokens.java, or you can provide a refresh token as a value to the <span style="color: red;">OAUTH_REFRESH_TOKEN</span> constant (in the same class) which will be used to refresh the OAuth access token.

If neither is provided, then a new OAuth access token will be requested from AdobeSign based on credentials provided in the OAuthCredentials.json file. Please refer to the AdobeSign OAuth page ([https://secure.echosign.com/public/static/oauthDoc.jsp](https://secure.echosign.com/public/static/oauthDoc.jsp)) for information on how to obtain OAuth credentials for your account.

## Using the Samples

Each sample client has a set of instructions (provided as class comments) that need to be followed. In particular, look for “TODO” comments in the client code and in the JSON input files for values that need to be updated before the client can work properly. Once the clients and support files are updated with appropriate values, they can be compiled and run.

The following steps outline one way this can be done using the command line on Windows.

- Navigate to the top-most folder (the one containing “adobesign” and “lib”) so that it becomes the current directory.
Compile the sources using the following command: <span style="color: red;">javac -sourcepath .;adobesign -cp lib/json_simple-1.1.jar adobesign/api/rest/sample/*.java</span>
- To run a specific client, use the following command: <span style="color: red;"> java -cp .;lib/json_simple-1.1.jar adobesign.api.rest.sample.{name of client class}</span>
- For example, to run GetUsersInAccount, use:<span style="color: red;"> java -cp .;lib/json_simple-1.1.jar adobesign.api.rest.sample.GetUsersInAccount</span>

You may also use an IDE of your choice. In that case, you will need to create a new project with sources taken from the adobesign folder and lib/json.jar set up as an input library.

### Output Path

The default output path used in the sample clients is the user temp directory. If needed, this can be changed by updating the method <span style="color: red;">adobesign.api.rest.sample.util.FileUtils.getDefaultOutputPath()</span>.

## Create a New Widget with Countersigners

This sample client demonstrates how to create a new widget.

1. Before running this sample, check that you have modified the JSON files OAuthCredentials.json and CreateWidget.json with appropriate values. Which values need to be specified is indicated in the files.
2. You can also provide your OAuth access token in the <span style="color: red;">OAUTH_ACCESS_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class, which will then be used as the OAuth access token for making API calls.
3. You can also provide a refresh token in the <span style="color: red;">OAUTH_REFRESH_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class to refresh the OAuth access token.

```java
package adobesign.api.rest.sample;

import org.json.simple.JSONObject;

import adobesign.api.rest.sample.util.RestApiAgreements;
import adobesign.api.rest.sample.util.RestApiOAuthTokens;
import adobesign.api.rest.sample.util.RestApiUtils;
import adobesign.api.rest.sample.util.RestApiWidgets;
import adobesign.api.rest.sample.util.RestApiAgreements.DocumentIdentifierName;


public class CreateNewWidgetWithCounterSigners {

  // File containing request body to get an access token.
  private static final String authRequestJSONFileName = "OAuthCredentials.json";

  // File containing request body for creating a widget.
  private final static String createWidgetJSONFileName = "CreateWidget.json";

  //Name of the file to be uploaded for sending an agreement.
  // TODO: Specify file name of choice here. The file must exist in the "requests" sub-package.
  private static final String fileToBeUploaded = "Sample.pdf";

  //Name of the file from which form fields are to be extracted.
  // TODO: Specify file name of choice here. The file must exist in the "requests" sub-package.
  private static final String fileforFormFields = "DocumentWithFormFields.pdf";

  // Mime-type of the file being uploaded.
  // TODO: Change this depending on actual file used.
  private static final String mimeType = RestApiUtils.MimeType.PDF.toString();

  // Name to be given to the file after uploading it.
  // TODO: Specify a file name of choice, ensuring that its name consists only of characters in the ASCII character set (given this basic
  // sample implementation).
  private static final String uploadedFileName = "UploadedSample.pdf";

  // Name to be given to the file containing form fields.
  // TODO: Specify a file name of choice, ensuring that its name consists only of characters in the ASCII character set (given this basic
  // sample implementation).
  private static final String formFieldsFileName = "formFieldsSample.pdf";


  /**
   * Entry point for this sample client program.
   */
  public static void main(String args[]) {
    try {
      CreateNewWidgetWithCounterSigners client = new CreateNewWidgetWithCounterSigners();
      client.run();
    }
    catch (Exception e) {
      System.err.println("Failure in creating a new widget for the user.");
      e.printStackTrace();
    }
  }

  /**
   * Main work function. See the class comment for details.
   */
  private void run() throws Exception {
    // Get oauth access token to make further API calls.
    String accessToken = RestApiOAuthTokens.getOauthAccessToken(authRequestJSONFileName);

    // Upload a transient document with form fields to be used for extracting form fields for the created widget.
    JSONObject uploadFormFieldDocumentResponse = RestApiAgreements.postTransientDocument(accessToken, mimeType, fileforFormFields, formFieldsFileName);
    String formFieldDocumentId = (String) uploadFormFieldDocumentResponse.get("transientDocumentId");

    // Associate the identifiers with the uploaded documents.
    DocumentIdentifierName formFieldIdName = DocumentIdentifierName.TRANSIENT_DOCUMENT_ID;

    // Make API call to create new widget
    JSONObject widget = RestApiWidgets.createWidget(accessToken, createWidgetJSONFileName, formFieldDocumentId, formFieldIdName);

    // Display widget ID and corresponding code of newly created widget.
    System.out.println("Newly created widget's ID: " + widget.get("id"));
  }
}
```

## Download an Agreement’s Audit Report

This sample client demonstrates how to to download the audit report for the specified agreement.

1. Before running this sample, check that you have modified the JSON file OAuthCredentials.json with appropriate values. Which values need to be specified is indicated in the file.
2. You can also provide your OAuth access token in the <span style="color: red;">OAUTH_ACCESS_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class, which will then be used as the OAuth access token for making API calls.
3. You can also provide a refresh token in the <span style="color: red;">OAUTH_REFRESH_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class to refresh the OAuth access token.
4. Make sure that you have specified a valid agreement ID in <span style="color: red;">agreementId</span> below.
5. Check that the default output location in the field <span style="color: red;">OUTPUT_PATH</span> of FileUtils.java is suitable.

```java
package adobesign.api.rest.sample;

import org.json.simple.JSONObject;

import adobesign.api.rest.sample.util.FileUtils;
import adobesign.api.rest.sample.util.RestApiAgreements;
import adobesign.api.rest.sample.util.RestApiOAuthTokens;
import adobesign.api.rest.sample.util.RestError;

public class DownloadAuditTrail {
  // TODO: Enter a valid agreement ID. Please refer to the "agreements" end-point in the API documentation to learn how to obtain IDs of
  // agreements present in Acrobat Sign.
  private static String agreementId = "a valid agreement ID";

  // File containing request body to get an access token.
  private static final String authRequestJSONFileName = "OAuthCredentials.json";

  /**
   * Entry point for this sample client program.
   */
  public static void main(String args[]) {
    try {
      DownloadAuditTrail client = new DownloadAuditTrail();
      client.run();
    }
    catch (Exception e) {
      System.err.println("Error while retrieving audit trail for agreement");
      e.printStackTrace();
    }
  }

  /**
   * Main work function. See the class comment for details.
   */
  private void run() throws Exception {
    // Get oauth access token to make further API calls.
    String accessToken = RestApiOAuthTokens.getOauthAccessToken(authRequestJSONFileName);

    // Display name of the agreement associated with the specified agreement ID.
    JSONObject agreementInfo = RestApiAgreements.getAgreementInfo(accessToken, agreementId);
    String agreementName = (String) agreementInfo.get("name");
    System.out.println("Agreement name: " + agreementName);

    String fileName = agreementName + "_" + System.currentTimeMillis() + ".pdf";
    System.out.println("Saving audit report '" + fileName + "'");

    // Make API call to get audit trail of this agreement.
    byte auditStream[] = RestApiAgreements.getAgreementAuditTrailBytes(accessToken, agreementId);

    if (auditStream != null) {
      boolean success = FileUtils.saveToFile(auditStream, FileUtils.AUDIT_FILES_OUTPUT_PATH, fileName);
      if (success)
        System.out.println("Successfully saved audit report in '" + FileUtils.AUDIT_FILES_OUTPUT_PATH + "'.");
      else
        System.err.println(RestError.FILE_NOT_SAVED.errMessage);
    }
    else {
      System.err.println("Error while retrieving audit trail for agreement: " + agreementName);
    }
  }
}
```

## Download the Combined Document for an Agreement

This sample client demonstrates how to to download the combined document for the specified agreement.

**IMPORTANT:**

1. Before running this sample, check that you have modified the JSON file OAuthCredentials.json with appropriate values. Which values need to be specified is indicated in the file.
2. You can also provide your OAuth access token in the ’OAUTH_ACCESS_TOKEN<span style="color: red;">constant in the</span>RestApiOAuthTokens` class, which will then be used as the OAuth access token for making API calls.
3. You can also provide a refresh token in the <span style="color: red;">OAUTH_REFRESH_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class to refresh the OAuth access token.
4. Make sure that you have specified a valid agreement ID in <span style="color: red;">agreementId</span> below.
5. Check that the default output location in the field <span style="color: red;">OUTPUT_PATH</span> of FileUtils.java is suitable.

```java
package adobesign.api.rest.sample;

import adobesign.api.rest.sample.util.FileUtils;
import adobesign.api.rest.sample.util.RestApiAgreements;
import adobesign.api.rest.sample.util.RestApiOAuthTokens;
import adobesign.api.rest.sample.util.RestError;
import org.json.simple.JSONObject;

public class DownloadCombinedDocumentOfAgreement {
  // TODO: Enter a valid agreement ID. Please refer to the "agreements" end-point in the API documentation to learn how to obtain IDs of
  // agreements present in Acrobat Sign.
  private static String agreementId = "a valid agreement ID";

  // File containing request body to get an access token.
  private static final String authRequestJSONFileName = "OAuthCredentials.json";

  /**
   * Entry point for this sample client program.
   */
  public static void main(String args[]) {
    try {
      DownloadCombinedDocumentOfAgreement client = new DownloadCombinedDocumentOfAgreement();
      client.run();
    }
    catch (Exception e) {
      System.err.println("Error while retrieving combined document of agreement");
      e.printStackTrace();
    }
  }

  /**
   * Main work function. See the class comment for details.
   */
  private void run() throws Exception {
    // Get oauth access token to make further API calls.
    String accessToken = RestApiOAuthTokens.getOauthAccessToken(authRequestJSONFileName);

    // Display name of the agreement associated with the specified agreement ID.
    JSONObject agreementInfo = RestApiAgreements.getAgreementInfo(accessToken, agreementId);
    String agreementName = (String) agreementInfo.get("name");
    System.out.println("Agreement name: " + agreementName);

    String fileName = agreementName + "_" + System.currentTimeMillis() + ".pdf";
    System.out.println("Saving combined document of agreement '" + fileName + "'");

    // Make API call to get audit trail of this agreement.
    byte auditStream[] = RestApiAgreements.getAgreementCombinedBytes(accessToken, agreementId);

    if (auditStream != null) {
      boolean success = FileUtils.saveToFile(auditStream, FileUtils.AGREEMENT_COMBINED_DOC_OUTPUT_PATH, fileName);
      if (success)
        System.out.println("Successfully saved combined document of agreement in '" + FileUtils.AGREEMENT_COMBINED_DOC_OUTPUT_PATH + "'.");
      else
        System.err.println(RestError.FILE_NOT_SAVED.errMessage);
    }
    else {
      System.err.println("Error while retrieving combined document of agreement: " + agreementName);
    }
  }
}
```

## Download Documents from an Agreement

This sample client demonstrates how to to download documents from a specified agreement.

**IMPORTANT:**

1. Before running this sample, check that you have modified the JSON file OAuthCredentials.json with appropriate values. Which values need to be specified is indicated in the file.
2. You can also provide your OAuth access token in the <span style="color: red;">OAUTH_ACCESS_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class, which will then be used as the OAuth access token for making API calls.
3. You can also provide a refresh token in the <span style="color: red;">OAUTH_REFRESH_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class to refresh the OAuth access token.
4. Make sure that you have specified a valid agreement ID in <span style="color: red;">agreementId</span> below.
5. Check that the default output location in the field <span style="color: red;">OUTPUT_PATH</span> of FileUtils.java is suitable.

```java
package adobesign.api.rest.sample;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import adobesign.api.rest.sample.util.FileUtils;
import adobesign.api.rest.sample.util.RestApiAgreements;
import adobesign.api.rest.sample.util.RestApiOAuthTokens;
import adobesign.api.rest.sample.util.RestError;

 ```java
public class DownloadDocumentsOfAgreement {
  // TODO: Enter a valid agreement ID. Please refer to the "agreements" end-point in the API documentation to learn how to obtain IDs of
  // agreements present in Acrobat Sign.
  private static String agreementId = "a valid agreement ID";

  // File containing request body to get an access token.
  private static final String authRequestJSONFileName = "OAuthCredentials.json";

  /**
   * Entry point for this sample client program.
   */
  public static void main(String args[]) {
    try {
      DownloadDocumentsOfAgreement client = new DownloadDocumentsOfAgreement();
      client.run();
    }
    catch (Exception e) {
      System.err.println("Error while retrieving documents of the agreement");
      e.printStackTrace();
    }
  }

  /**
   * Main work function. See the class comment for details.
   */
  private void run() throws Exception {
    // Get oauth access token to make further API calls.
    String accessToken = RestApiOAuthTokens.getOauthAccessToken(authRequestJSONFileName);

    // Display name of the agreement associated with the specified agreement ID.
    JSONObject agreementInfo = RestApiAgreements.getAgreementInfo(accessToken, agreementId);
    String agreementName = (String) agreementInfo.get("name");
    System.out.println("Agreement name: " + agreementName);

    // Fetch list of documents associated with the specified agreement.
    JSONObject docJson = RestApiAgreements.getAgreementDocuments(accessToken, agreementId);
    JSONArray documentList = (JSONArray) docJson.get("documents");

    for (Object eachDocument : documentList) {
      JSONObject document = (JSONObject) eachDocument;

      // Get ID and name of each document.
      String documentId = (String) document.get("id");
      String documentName = (String) document.get("name");

      // Generate a running file name for storing locally. Note that in practice the document may not be a PDF file (e.g. the API call
      // requested the document in its original format) and document name itself might contain an extension. For simplicity we ignore
      // these possibilities.
      String fileName = documentName + "_" + System.currentTimeMillis() + ".pdf";
      System.out.println("Saving document '" + fileName + "'");

      // Download and save these documents.
      byte docStream[] = RestApiAgreements.getDocumentBytes(accessToken, agreementId, documentId);
      if (docStream != null) {
        boolean success = FileUtils.saveToFile(docStream, FileUtils.AGREEMENT_DOCS_OUTPUT_PATH, fileName);
        if (success)
          System.out.println("Successfully saved document in '" + FileUtils.AGREEMENT_DOCS_OUTPUT_PATH + "'.");
        else
          System.err.println(RestError.FILE_NOT_SAVED.errMessage);
      }
      else {
        System.err.println("Error while retrieving documents of the agreement: " + agreementName);
      }
    }
  }

}
```

## Get an Agreement’s Status

This sample client demonstrates how to to get status of all agreements of an account and display their agreement ID, name and status.

**IMPORTANT:**

1. Before running this sample, check that you have modified the JSON file OAuthCredentials.json with appropriate values. Which values need to be specified is indicated in the file.
2. You can also provide your OAuth access token in the <span style="color: red;">OAUTH_ACCESS_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class, which will then be used as the OAuth access token for making API calls.
3. You can also provide a refresh token in the <span style="color: red;">OAUTH_REFRESH_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class to refresh the OAuth access token.

```java
package adobesign.api.rest.sample;

import adobesign.api.rest.sample.util.RestApiAgreements;
import adobesign.api.rest.sample.util.RestApiOAuthTokens;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class GetStatusOfAgreements {
  // File containing request body to get an access token.
  private static final String authRequestJSONFileName = "OAuthCredentials.json";

  /**
   * Entry point for this sample client program.
   */
  public static void main(String args[]) {
    try {
      GetStatusOfAgreements client = new GetStatusOfAgreements();
      client.run();
    }
    catch (Exception e) {
      System.err.println("Failure in getting status of the agreements.");
      e.printStackTrace();
    }
  }

  /**
   * Main work function. See the class comment for details.
   */
  private void run() throws Exception {
    // Get oauth access token to make further API calls.
    String accessToken = RestApiOAuthTokens.getOauthAccessToken(authRequestJSONFileName);

    JSONArray agreementList = RestApiAgreements.getMyAgreements(accessToken);

    if (agreementList != null) {
      for (Object eachAgreement : agreementList) {
        JSONObject agreement = (JSONObject) eachAgreement;
        System.out.println("AgreementName: " + agreement.get("name"));
        System.out.println("AgreementID: " + agreement.get("id"));
        System.out.println("AgreementStatus: " + agreement.get("status"));
        System.out.println();
      }
    }
  }
}
```

## Get an Agreement’s Signing URL

This sample client demonstrates how to to get the signing URL for an agreement.

**IMPORTANT:**

1. Before running this sample, check that you have modified the JSON file OAuthCredentials.json with appropriate values. Which values need to be specified is indicated in the file.
2. You can also provide your OAuth access token in the <span style="color: red;">OAUTH_ACCESS_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class, which will then be used as the OAuth access token for making API calls.
3. You can also provide a refresh token in the <span style="color: red;">OAUTH_REFRESH_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class to refresh the OAuth access token.

```java
package adobesign.api.rest.sample;

import adobesign.api.rest.sample.util.RestApiAgreements;
import adobesign.api.rest.sample.util.RestApiOAuthTokens;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class GetSigningUrlForAnAgreement {
  // TODO: Enter a valid agreement ID. Please refer to the "agreements" end-point in the API documentation to learn how to obtain IDs of
  // agreements present in Acrobat Sign.
  private static String agreementId = "a valid agreement ID";

  // File containing request body to get an access token.
  private static final String authRequestJSONFileName = "OAuthCredentials.json";

  /**
   * Entry point for this sample client program.
   */
  public static void main(String args[]) {
    try {
      GetSigningUrlForAnAgreement client = new GetSigningUrlForAnAgreement();
      client.run();
    }
    catch (Exception e) {
      System.err.println("Failure in getting signing urls of the agreement.");
      e.printStackTrace();
    }
  }

  /**
   * Main work function. See the class comment for details.
   */
  private void run() throws Exception {
    // Get oauth access token to make further API calls.
    String accessToken = RestApiOAuthTokens.getOauthAccessToken(authRequestJSONFileName);

    // Display name of the agreement associated with the specified agreement ID.
    JSONObject agreementInfo = RestApiAgreements.getAgreementInfo(accessToken, agreementId);
    String agreementName = (String) agreementInfo.get("name");
    System.out.println("Agreement name: " + agreementName);

    System.out.println("Fetching signing url");

    JSONObject response = RestApiAgreements.getSigningUrl(accessToken, agreementId);

    if(response != null) {
      JSONArray signingUrlSetInfos = (JSONArray) response.get("signingUrlSetInfos");
      for (Object eachSigningUrlSet : signingUrlSetInfos) {
        JSONObject signingUrlSetInfo = (JSONObject)eachSigningUrlSet;
        JSONArray signingUrls = (JSONArray) signingUrlSetInfo.get("signingUrls");
        for(Object eachSigningUrl : signingUrls) {
          JSONObject signingUrl = (JSONObject) eachSigningUrl;
          System.out.print("Signer Email: " + signingUrl.get("email") + ", ");
          System.out.println("Signing Url: " + signingUrl.get("esignUrl"));
          System.out.println();
        }
      }

    }
    else {
      System.out.println("API User is not the current signer or sender of agreement: " + agreementName);
    }
  }
}
```

## Send Reminders to Participants

This sample client demonstrates how to send reminders to active participants (those who are next in line in the signing process) of various agreements. It retrieves all agreements of the current API user and checks to see which agreements are out for signature, and if any of them has a participant that has not signed for longer than a specified amount of time. If the time limit has been crossed, all active articipants of that agreement are sent a reminder email.

**IMPORTANT:**

1. Before running this sample, check that you have modified the JSON files OAuthCredentials.json and SendReminder.json with appropriate values. Which values need to be specified is indicated in the files.
2. You can also provide your OAuth access token in the <span style="color: red;">OAUTH_ACCESS_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class, which will then be used as the OAuth access token for making API calls.
3. You can also provide a refresh token in the <span style="color: red;">OAUTH_REFRESH_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class to refresh the OAuth access token.
4. The constant <span style="color: red;">WAITING_TIME_LIMIT</span> below determines how long a participant needs to have been waiting before a reminder becomes necessary. Any suitable value can be set here.

```java
package adobesign.api.rest.sample;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import adobesign.api.rest.sample.util.RestApiAgreements;
import adobesign.api.rest.sample.util.RestApiOAuthTokens;
import adobesign.api.rest.sample.util.RestError;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class SendRemindersForAgreement {
  // TODO: Enter a valid agreement ID. Please refer to the "agreements" end-point in the API documentation to learn how to obtain IDs of
  // agreements present in Acrobat Sign.
  private static String agreementId = "CBJCHBCAABAAEv-2_cscgcFJYHuloiuAf7eEiQ2WnYbB";

  // How long a participant needs to have been waiting (in milliseconds) before we can send them a reminder.
  private static final long MILLISECS_PER_DAY = 24 * 60 * 60 * 1000;
  private static long WAITING_TIME_LIMIT = 1 * MILLISECS_PER_DAY; // one day

  // JSON resource file used to obtain an access token.
  private static final String authRequestJsonFileName = "OAuthCredentials.json";

  // JSON resource file used to specify the agreement for which to send reminders.
  private final static String sendReminderJsonFileName = "SendReminder.json";

  /**
   * Entry point for this sample client program.
   */
  public static void main(String args[]) {
    try {
      SendRemindersForAgreement client = new SendRemindersForAgreement();
      client.run();
    }
    catch (Exception e) {
      System.err.println(RestError.SEND_REMINDER_ERROR.errMessage);
      e.printStackTrace();
    }
  }

  /**
   * Main work function. See the class comment for details.
   */
  private void run() throws Exception {
    // Get the current system date.
    Date now = new Date();

    // Fetch oauth access token to make further API calls.
    String accessToken = RestApiOAuthTokens.getOauthAccessToken(authRequestJsonFileName);

    // Display name of the agreement associated with the specified agreement ID.
    JSONObject agreement = RestApiAgreements.getAgreementInfo(accessToken, agreementId);
    String agreementName = (String) agreement.get("name");
    System.out.println("Agreement name: " + agreementName);

    sendRemindersForAgreement(accessToken, agreement, now);
  }

  /**
   * Sends reminders to active participants of an agreement if any of them is taking too long to sign.
   *
   * @param accessToken Access token of the user.
   * @param agreement JSON object representing an agreement.
   * @param now Current time.
   * @throws Exception
   */
  private void sendRemindersForAgreement(String accessToken, JSONObject agreement, Date now) throws Exception {
    // For the given agreement, get the list of next (in line) participants.
    String agreementId = (String) agreement.get("id");
    JSONArray nextParticipantList = getNextParticipantInfos(accessToken, agreementId);
    if (nextParticipantList == null)
      return;

    // For each next/active participant, check if her waiting time exceeds the limit and if so send a reminder.
    for (Object eachNextParticipant : nextParticipantList) {
      JSONObject nextParticipant = (JSONObject) eachNextParticipant;

      JSONArray members = (JSONArray)nextParticipant.get("memberInfos");

      List<String> participantIdList = new ArrayList<String>();

      for (Object eachMember : members) {
        JSONObject member = (JSONObject)eachMember;
        participantIdList.add((String)member.get("id"));
      }

      // Time limit exceeded. Send a reminder to all active participants of the agreement.
      JSONObject reminderResponse = RestApiAgreements.sendReminder(accessToken, sendReminderJsonFileName, agreementId, participantIdList);

      // Parse and display result
      System.out.println(formatResponse(reminderResponse, agreement));

      // All relevant participants have been sent a reminder; no need to check remaining participants.
      break;
    }
  }

  /**
   * Gets information about the next set of participants in the signing process of a given agreement.
   *
   * @param accessToken Access token of the user.
   * @param agreementId ID of the agreement in question.
   * @return A JSON object containing the list of next (active) participants of this agreement.
   * @throws Exception
   */
  private JSONArray getNextParticipantInfos(String accessToken, String agreementId) throws Exception {
    // Get the agreement information.
    JSONObject agreementInfo = RestApiAgreements.getAgreementMembers(accessToken, agreementId, true);

    // Retrieve next set of participants of this agreement.
    return (JSONArray) agreementInfo.get("nextParticipantSets");
  }


  /**
   * Formats (for displaying) the response from the call to send reminders.
   *
   * @param reminderResponse The response from the call to send reminders.
   * @param agreement The agreement on which the call was made.
   * @return Formatted response.
   */
  private String formatResponse(JSONObject reminderResponse, JSONObject agreement) {
    return "Sent a reminder to the next participant in line to sign the agreement '" + agreement.get("name") + "'. Result: "
        + reminderResponse.get("id") + ".";
  }
}
```

## Send an Agreement Using a Library Document

This sample client demonstrates how to send an agreement using a library document ID.

**IMPORTANT:**

1. Before running this sample, check that you have modified the JSON file OAuthCredentials.json with appropriate values. Which values need to be specified is indicated in the file.
2. You can also provide your OAuth access token in the <span style="color: red;">OAUTH_ACCESS_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class, which will then be used as the OAuth access token for making API calls.
3. You can also provide a refresh token in the <span style="color: red;">OAUTH_REFRESH_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class to refresh the OAuth access token.

```java
package adobesign.api.rest.sample;

import adobesign.api.rest.sample.util.RestApiAgreements;
import adobesign.api.rest.sample.util.RestApiLibraryDocuments;
import adobesign.api.rest.sample.util.RestApiOAuthTokens;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class SendAgreementUsingLibraryDocument {
  // File containing the request JSON for fetching access token.
  private static final String authRequestJSONFileName = "OAuthCredentials.json";

  // File containing the request JSON for sending an agreement.
  private static final String sendAgreementJSONFileName = "SendAgreement.json";

  /**
   * Entry point for this sample client program.
   */
  public static void main(String args[]) {
    try {
      SendAgreementUsingLibraryDocument client = new SendAgreementUsingLibraryDocument();
      client.run();
    }
    catch (Exception e) {
      System.err.println("Failure in sending the agreemnet using the library document ID specified.");
      e.printStackTrace();
    }
  }

  /**
   * Execution of this sample client program.
   */
  private void run() throws Exception {
    // Fetch oauth access token to make further API calls.
    String accessToken = RestApiOAuthTokens.getOauthAccessToken(authRequestJSONFileName);

    // Fetch library documents of the user using access token from above.
    JSONObject libraryDocumentsResponse = RestApiLibraryDocuments.getLibraryDocuments(accessToken);

    // Retrieve library documents list for the user and fetch the ID of first library document.
    JSONArray libraryDocumentList = (JSONArray) libraryDocumentsResponse.get("libraryDocumentList");

    String libraryDocumentId = null;

    // Fetch the first personal or shared library document of the user.
    for (Object eachLibraryDocument : libraryDocumentList) {
      JSONObject libraryDocument = (JSONObject) eachLibraryDocument;
      if (libraryDocument.get("sharingMode").equals("ACCOUNT") || libraryDocument.get("sharingMode").equals("GROUP") || libraryDocument.get("sharingMode").equals("USER")) {
        libraryDocumentId = (String) libraryDocument.get("id");
        break;
      }
    }

    if (libraryDocumentId != null && !libraryDocumentId.isEmpty()) {
      // Send agreement using this library document ID retrieved from above.
      JSONObject sendAgreementResponse = RestApiAgreements.sendAgreement(accessToken, sendAgreementJSONFileName, libraryDocumentId,
                                                                         RestApiAgreements.DocumentIdentifierName.LIBRARY_DOCUMENT_ID);

      // Parse and read response.
      System.out.println("Agreement Sent. Agreement ID = " + sendAgreementResponse.get("id"));
    }
    else {
      System.err.println("No library documents found.");
    }
  }
}
```

## Send an Agreement Using a Transient Document

This sample client demonstrates how to send an agreement using a transient document ID. See the postTransientDocument method in the file /util/RestApiAgreements.java for a definition of transient documents.

**IMPORTANT:**

1. Before running this sample, check that you have modified the JSON files OAuthCredentials.json and SendAgreement.json with appropriate values. Which values need to be specified is indicated in the files.
2. You can also provide your OAuth access token in the <span style="color: red;">OAUTH_ACCESS_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class, which will then be used as the OAuth access token for making API calls.
3. You can also provide a refresh token in the <span style="color: red;">OAUTH_REFRESH_TOKEN</span> constant in the <span style="color: red;">RestApiOAuthTokens</span> class to refresh the OAuth access token.
4. Check that the default input file in the field <span style="color: red;">fileToBeUploaded</span> below is suitable.
5. Check that the name to be given to the uploaded file in the field <span style="color: red;">uploadedFileName</span> below is suitable. This name can be different from the original file name.

```java
package adobesign.api.rest.sample;

import org.json.simple.JSONObject;

import adobesign.api.rest.sample.util.RestApiAgreements;
import adobesign.api.rest.sample.util.RestApiOAuthTokens;
import adobesign.api.rest.sample.util.RestApiUtils;
import adobesign.api.rest.sample.util.RestApiAgreements.DocumentIdentifierName;

public class SendAgreementUsingTransientDocument {

  // File containing the request JSON for fetching access token.
  private static final String authRequestJSONFileName = "OAuthCredentials.json";

  // File containing the request JSON for sending an agreement.
  private static final String sendAgreementJSONFileName = "SendAgreement.json";

  // Name of the file to be uploaded for sending an agreement.
  // TODO: Specify file name of choice here. The file must exist in the "requests" sub-package.
  private static final String fileToBeUploaded = "Sample.pdf";

  // Mime-type of the file being uploaded.
  // TODO: Change this depending on actual file used.
  private static final String mimeType = RestApiUtils.MimeType.PDF.toString();

  // Name to be given to the file after uploading it.
  // TODO: Specify a file name of choice, ensuring that its name consists only of characters in the ASCII character set (given this basic
  // sample implementation).
  private static final String uploadedFileName = "UploadedSample.pdf";

  /**
   * Entry point for this sample client program.
   */
  public static void main(String args[]) {
    try {
      SendAgreementUsingTransientDocument client = new SendAgreementUsingTransientDocument();
      client.run();
    }
    catch (Exception e) {
      System.err.println("Failure in sending the agreement using the transient document ID.");
      e.printStackTrace();
    }
  }

  /**
   * Main work function. See the class comment for details.
   */
  private void run() throws Exception {
    // Fetch oauth access token to make further API calls.
    String accessToken = RestApiOAuthTokens.getOauthAccessToken(authRequestJSONFileName);

    // Upload a transient document and retrieve transient document ID from the response.
    JSONObject uploadDocumentResponse = RestApiAgreements.postTransientDocument(accessToken, mimeType, fileToBeUploaded, uploadedFileName);
    String transientDocumentId = (String) uploadDocumentResponse.get("transientDocumentId");

    // Send an agreement using the transient document ID derived from above.
    DocumentIdentifierName idName = DocumentIdentifierName.TRANSIENT_DOCUMENT_ID;
    JSONObject sendAgreementResponse = RestApiAgreements.sendAgreement(accessToken, sendAgreementJSONFileName, transientDocumentId, idName);

    // Parse and read response.
    System.out.println("Agreement Sent. Agreement ID = " + sendAgreementResponse.get("id"));
  }
}
```
