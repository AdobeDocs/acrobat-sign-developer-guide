# Web Message Events

Acrobat Sign capabilities can be incorporated into external applications by directly embedding the Acrobat Sign user interface (UI) within these applications. Acrobat Sign also supports sending events (status updates) to the third-party application pages so that the external application is aware of the actions that the user is performing with the Acrobat Sign UI. These events are passed between the controller window and a receiver window running on different domains for event communication.

This page provides a guide to all the events supported by Acrobat Sign.

## System requirements

To use the event framework within Acrobat Sign, you need a browser that supports <span style="color: red;">postMessage</span>. See [this page](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to get a list of all supported browsers.

## Supported events

The following table lists the Acrobat Sign supported UI events that can be embedded and presented within the UI of external applications.

### Workflow events

<br/>
<table border="1" columnWidths="20,20,60">
    <tr>
        <th>Event Type</th>
        <th>Data</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><span style="color: red;">ESIGN</span></td>
        <td>NONE</td>
        <td>This event gets fired after a user has successfully signed an agreement.</td>
    </tr>
    <tr>
        <td><span style="color: red;">REJECT</span></td>
        <td>NONE</td>
        <td>This event is fired after a user rejects an agreement.</td>
    </tr>
    <tr>
        <td><span style="color: red;">PREFILL</span></td>
        <td>NONE</td>
        <td>This event is fired after a user completes prefilling an agreement and sends it.</td>
    </tr>
</table>

### Page Load events

<br/>
<table border="1" columnWidths="20,30,60">
    <tr>
        <th>Event Type</th>
        <th>Data</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>'PAGE_LOAD'</td>
        <td>
          <ul>
              <li><strong>pageName:</strong> 'POST_SEND'</li>
              <li> <strong>apiAgreementId:</strong> ''</li>
          </ul>
        </td>
        <td>This event gets fired after a user has successfully signed an agreement. This event fires when an agreement has been successfully sent and the post-send page has been loaded.</td>
    </tr>
    <tr>
        <td>'PAGE_LOAD'</td>
        <td>
            <strong>pageName:</strong> 'DIGSIG_DOWNLOAD'
        </td>
        <td>This is a special event that is fired for documents requiring Digital Signatures. This event fires when a user has completed all the required fields in a document and the page to download the document for Digital Signature gets loaded.</td>
    </tr>
    <tr>
        <td>'PAGE_LOAD'</td>
        <td>
            <strong>pageName:</strong> 'AUTHORING'
        </td>
        <td>This event fires when the form-field authoring page loads for an agreement.</td>
    </tr>
    <tr>
        <td>'PAGE_LOAD'</td>
        <td>
            <strong>pageName:</strong> 'DELEGATION'
        </td>
        <td>This event fires when the page from which an agreement can be delegated gets loaded. The loading of the page does not guarantee that delegation has or will actually occur.</td>
    </tr>
    <tr>
        <td>'PAGE_LOAD'</td>
        <td>
            <strong>pageName:</strong> 'MANAGE'
        </td>
        <td>This event fires when the manage page loads.</td>
    </tr>
    <tr>
        <td>'PAGE_LOAD'</td>
        <td>
            <strong>pageName:</strong> 'LOGIN'
        </td>
        <td>This event fires when the login page loads.</td>
    </tr>
</table>

### Session events

<br/>
<table border="1" columnWidths="25,40,50">
    <tr>
        <th>Event Type</th>
        <th>Data</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>'ESIGN', 'SESSION_TIMEOUT'</td>
        <td>
          <ul>
            <li><strong>message:</strong> 'PRE_SESSION_TIMEOUT'</li>
            <li><strong>warningTimeMinutes:</strong> &lt;float&gt;</li>
            <li><strong>expirationTimeMinutes:</strong> &lt;float&gt;</li>
          </ul>
        </td>
        <td>This event is triggered two seconds before the session timeout dialogue is displayed to the user. The UI shows “Your session is about to expire” message. The warningTimeMinutes and expirationTimeMinutes values correspond to the warning & session timeout times in minutes.</td>
    </tr>
    <tr>
        <td>'SESSION_TIMEOUT'</td>
        <td>
          <ul>
            <li><strong>message:</strong> 'POST_SESSION_TIMEOUT'</li>
            <li><strong>warningTimeMinutes:</strong> &lt;float&gt;</li>
            <li><strong>expirationTimeMinutes:</strong> &lt;float&gt;</li>
          </ul>
        </td>
        <td>This event is triggered when the user's session times out.</td>
    </tr>
    <tr>
        <td>'ERROR'</td>
        <td>
            <strong>message:</strong> &lt;varies&gt;
        </td>
        <td>This event fires when an error dialog or an error page is displayed to the user. A system error 500 or 503 is returned.</td>
    </tr>
</table>

### User action events

<br/>
<table border="1" columnWidths="20,40,50">
    <tr>
        <th>Event Type</th>
        <th>Data</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>'CLICK'</td>
        <td>
          <ul>
            <li><strong>pageName:</strong> 'POST_SEND' or 'POST_SIGN'</li>
            <li><li><strong>apiAgreementId:</strong> ''</li></li>
            <li><strong>url:</strong> ''</li>
            <li><strong>apiAgreementId:</strong> ''</li>
          </ul>
        </td>
        <td>This event fires when the user clicks the “Manage this document” button on the post-send page. The url contains the full link to open the manage page with the specific agreement selected. The apiAgreementId is the DocumentKey used by the client application making the API calls.</td>
    </tr>
    <tr>
        <td>'CLICK'</td>
        <td>
          <ul>
            <li><strong>pageName:</strong> 'POST_SEND' or 'POST_SIGN'</li>
            <li><strong>target:</strong> 'SEND_ANOTHER_LINK'</li>
          </ul>
        </td>
        <td>This event fires when the user clicks the “Send another document” button.</td>
    </tr>
</table>

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
