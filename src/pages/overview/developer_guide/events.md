# Web Message Events

Acrobat Sign capabilities can be incorporated into external applications by directly embedding the Acrobat Sign user interface (UI) within these applications. Acrobat Sign also supports sending events (status updates) to the third-party application pages so that the external application is aware of the actions that the user is performing with the Acrobat Sign UI. These events are passed between the controller window and a receiver window running on different domains for event communication.

This page provides a guide to all the events supported by Acrobat Sign.

## System requirements

To use the event framework within Acrobat Sign, you need a browser that supports `postMessage`. See [this page](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to get a list of all supported browsers.

## Supported events

The following table lists the Acrobat Sign supported UI events that can be embedded and presented within the UI of external applications.

### Workflow events


| Event Type | Data | Description |
|---|---|---|
| ESIGN | NONE | This event gets fired after a user has successfully signed an agreement. |
| REJECT | NONE | This event is fired after a user rejects an agreement. |
| PREFILL | NONE | This event is fired after a user completes prefilling an agreement and sends it. |


### Page Load events


| Event Type  | Data                         | Description                                                                                                                                                                                                                                 |
|-------------|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 'PAGE_LOAD' | &#8226;pageName: 'POST_SEND' | This event gets fired after a user has successfully signed an agreement. This event fires when an agreement has been successfully sent and the post-send page has been loaded.                                                              |
|             | &#8226;apiAgreementId: ''    |                                                                                                                                                                                                                                             |
| 'PAGE_LOAD' | pageName: 'DIGSIG_DOWNLOAD'  | This is a special event that is fired for documents requiring Digital Signatures. This event fires when a user has completed all the required fields in a document and the page to download the document for Digital Signature gets loaded. |
| 'PAGE_LOAD' | pageName: 'AUTHORING'        | This event fires when the form-field authoring page loads for an agreement.                                                                                                                                                                 |
| 'PAGE_LOAD' | pageName: 'DELEGATION'       | This event fires when the page from which an agreement can be delegated gets loaded. The loading of the page does not guarantee that delegation has or will actually occur.                                                                 |
| 'PAGE_LOAD' | pageName: 'MANAGE'           | This event fires when the manage page loads.                                                                                                                                                                                                |
| 'PAGE_LOAD' | pageName: 'LOGIN'            | This event fires when the login page loads.                                                                                                                                                                                                 |


### Session events


| Event Type                 | Data                                     | Description                                                                                                                                                                                                                                                                     |
|----------------------------|------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 'ESIGN', 'SESSION_TIMEOUT' | &#8226;message: 'PRE_SESSION_TIMEOUT'    | This event is triggered two seconds before the session timeout dialogue is displayed to the user. The UI shows “Your session is about to expire” message. The warningTimeMinutes and expirationTimeMinutes values correspond to the warning & session timeout times in minutes. |
|                            | &#8226;warningTimeMinutes: `<float>`     |                                                                                                                                                                                                                                                                                 |
|                            | &#8226;expirationTimeMinutes: `<float>`; |                                                                                                                                                                                                                                                                                 |
| 'SESSION_TIMEOUT'          | &#8226;message: 'POST_SESSION_TIMEOUT'   | This event is triggered when the user's session times out.                                                                                                                                                                                                                      |
|                            | &#8226;warningTimeMinutes: `<float> `    |                                                                                                                                                                                                                                                                                 |
|                            | &#8226;expirationTimeMinutes: `<float>`  |                                                                                                                                                                                                                                                                                 |
| 'ERROR'                    | message: `<varies>`                       | This event fires when an error dialog or an error page is displayed to the user. A system error 500 or 503 is returned.                                                                                                                                                         |


### User action events


| Event Type | Data                                        | Description                                                                                                                                                                                                                                                                            |
|------------|---------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 'CLICK'    | &#8226;pageName: 'POST_SEND' or 'POST_SIGN' | This event fires when the user clicks the “Manage this document” button on the post-send page. The url contains the full link to open the manage page with the specific agreement selected. The apiAgreementId is the DocumentKey used by the client application making the API calls. |
|            | &#8226;apiAgreementId: ''                   |                                                                                                                                                                                                                                                                                        |
|            | &#8226;url: ''                              |                                                                                                                                                                                                                                                                                        |
|            | &#8226;apiAgreementId: ''                   |                                                                                                                                                                                                                                                                                        |
| 'CLICK'    | &#8226;pageName: 'POST_SEND' or 'POST_SIGN' | This event fires when the user clicks the “Send another document” button.                                                                                                                                                                                                              |                                     
|            | &#8226;target: 'SEND_ANOTHER_LINK'          |                                                                                                                                                                                                                                                                                        |


## Using events

In order to use the events fired by Acrobat Sign, the external application should include a callback handler in the parent page that embeds the Acrobat Sign application UI.

The following example depicts an event handler that can be placed in the parent page:

```javascript
functioneventHandler(e){
    if(e.origin =="https://secure.echosign.com"){
        console.log("Event from Acrobat Sign!", JSON.parse(e.data));
    }else{
        console.log("Do not process this!");
    }
}
if(!window.addEventListener){
    window.attachEvent('onmessage', eventHandler);
}else{
    window.addEventListener('message', eventHandler,false);
}
```
