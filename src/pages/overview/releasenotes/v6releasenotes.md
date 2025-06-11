
# 2016 REST v6 Release Notes

Last update: Jun 13, 2024.

<InlineAlert slots="header, text" />

Tip

For non-developer product feature and UI changes, refer to [this link](https://helpx.adobe.com/sign/release-notes/adobe-sign.html)

The 2016 (to present) REST v6 Acrobat Sign APIs release introduces numerous enhancements and features. To help developers migrate from older API versions to Version 6, we have tabulated the v6 APIs against their closest counterparts in previous versions in the [API Change Log](#api-change-log). In the change log, we have documented enhancements, features, and any changes from the prior version. In addition to the information compiled here, refer to the [Acrobat Sign API Reference](https://www.adobe.com/go/acrobatsignapireference) for a quick reference for the Acrobat Sign APIs. This page lists all our APIs in a easily discoverable format, and lets you try them out without having to write any code!

<InlineAlert slots="header, text" />

Note

v5 and SOAP-based apps will continue to function, but all versions prior to v6 are deprecated.

## REST API Enhancements

### Pagination Support

Existing Acrobat Sign APIs return the entire list of resources (agreements, widgets, or library documents) that a user has in a GET call. For some users with a large number of transactions this resource list becomes too big for consumption. The v6 APIs have introduced pagination support to all these resources with a client-configurable page size. This will be especially useful to our mobile clients and integrations who are constrained by their consumption capacity. This sample shows pagination in a request and response:

**Sample Request**

`GET https://api.na1.echosign.com:443/api/rest/v6/agreements?pageSize=50`

**Sample Response**

```javascript
{
    "userAgreementList": [{
      "displayDate": "2017-04-17T06:07:19-07:00",
      "displayUserSetInfos": [
        {
          "displayUserSetMemberInfos": [
            {
              "company": "Adobe",
              "email": "adobe.sign.user@adobe.com",
              "fullName": "AdobeSign User"
            }
          ]
        }
      ],
      "esign": true,
      "agreementId": "3AAABLblqZhDqIcUs4nFgivebIUdzuZyBrjO_VP_hHDhkrGhXxKuQ5Hi7C07vRbNzxP9TdTdRHzHdQLDsPJrjfXEuKe7jjEAl",
      "latestVersionId": "3AAABLblqZhACieamyoCl7qNWZTaU3WaoY3a9BL7-09sosH88HyRFfGmYc91jpQk-LXLVGlgEudioxgPlCprAScifamX16-QD",
      "name": "SampleAgreement",
      "status": "SIGNED"
    },
    {...},
    .
    .
    .],
    "page": {
        "nextCursor": "qJXXj2UAUX1X9rTSqoUOlkhsdo*"
    }
}
```
