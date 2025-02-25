/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || '/acrobat-sign/developer-guide/docs/',
  siteMetadata: {
    pages: [
      {
        title: 'Adobe Acrobat Sign',
        path: 'overview/index.md'
      },
      {
        title: 'Resources',
        menu: [{
          title: 'Free Dev Account Sign-Up',
          path: 'https://www.adobe.com/sign/developer-form.html'
        },{
          title: 'FAQs and Tech Tips',
          path: 'https://www.adobe.com/go/acrobatsigntechblog'
        },{
          title: 'Application Certification Form',
          path: 'https://www.adobe.com/go/esign-dev-cert'
        },{
          title: 'Integration Guides',
          path: 'https://www.adobe.com/go/acrobatsignintegrations'
        },{
          title: '3rd Party Integrations',
          path: 'https://exchange.adobe.com/apps/browse/?product=SIGN&amp;sort=MOST_RECENT'
        },{
          title: 'Security and Compliance',
          path: 'https://www.adobe.com/trust/resources.html'
        },{
          title: 'Forum',
          path: 'https://www.adobe.com/go/acrobatsigndevforum'
        }]
      },
      {
        title: 'Documentation',
        menu: [{
          title: 'API Release Notes',
          path: 'overview/releasenotes/index.md'
        },{
          title: 'API Reference (v.6)',
          path: 'https://secure.na1.adobesign.com/public/docs/restapi/v6'
        },{
          title: 'Core Dev Guide',
          path: 'overview/developer_guide/index.md'
        },{
          title: 'Webhook Reference',
          path: 'overview/acrobat_sign_events/index.md'
        },{
          title: 'Acrobat Sign Embed',
          path: 'overview/embedpartner/index.md'
        },{
          title: 'SDK Downloads',
          path: 'overview/sdks/index.md'
        }]
      },
      {
        title: 'Solutions for Government',
        path: 'overview/signgov/index.md'
      },
      {
        title: 'Postman workspace',
        path: 'https://www.adobe.com/go/acrobatsignpostman'
      }
    ],
    subPages: [
      {
        title: "API Release Notes",
        subTitle: '',
        path: 'overview/releasenotes/index.md',
        pages: [
          {
            title: 'Acrobat Sign API Release Notes',
            path: 'overview/releasenotes/index.md'
          },
          {
            title: 'Latest API Release Notes',
            path: 'overview/releasenotes/acrobatsignreleasenotes.md'
          },
          {
            title: '2016 REST v6 Release Notes',
            path: 'overview/releasenotes/v6releasenotes.md'
          }
        ]
      },
      {
        title: "Core Dev Guide",
        subTitle: '',
        path: 'overview/developer_guide/index.md',
        pages: [
          {
            title: 'Acrobat Sign API Overview',
            path: 'overview/developer_guide/index.md'
          },
          {
            title: 'Create an Application Quickstart',
            path: 'overview/developer_guide/gstarted.md'
          },
          {
            title: 'Managing OAuth Tokens',
            path: 'overview/developer_guide/oauth.md'
          },
          {
            title: 'Example Scenarios',
            path: 'overview/developer_guide/scenarios.md'
          },
          {
            title: 'API Usage',
            path: 'overview/developer_guide/apiusage.md'
          },
          {
            title: 'Webhook APIs',
            path: 'overview/developer_guide/webhookapis.md'
          },
          {
            title: 'WebhookEndpoint APIs',
            path: 'overview/developer_guide/webhook-endpoint-api.md'
          },
          {
            title: 'REST API Samples',
            path: 'overview/developer_guide/samples.md'
          },
          {
            title: 'Web Message Events',
            path: 'overview/developer_guide/events.md'
          },
          {
            title: 'Migrating and Updating Apps',
            path: 'overview/developer_guide/migrating.md'
          },
          {
            title: 'Glossary',
            path: 'overview/developer_guide/glossary.md'
          }
        ]
      },
      {
        title: "Webhook Reference",
        subTitle: '',
        path: 'overview/acrobat_sign_events/index.md',
        pages: [
          {
            title: 'Webhooks in Acrobat Sign',
            path: 'overview/acrobat_sign_events/index.md'
          },
          {
            title: 'Webhook Event Payload Overview',
            path: 'overview/acrobat_sign_events/webhookpayloadoverview.md'
          },
          {
            title: 'Agreement Events',
            path: 'overview/acrobat_sign_events/webhookeventsagreements.md'
          },
          {
            title: 'Library Events',
            path: 'overview/acrobat_sign_events/webhookeventslibrary.md'
          },
          {
            title: 'Bulk Signing Events',
            path: 'overview/acrobat_sign_events/webhookeventsmegasign.md'
          },
          {
            title: 'Web Form Events',
            path: 'overview/acrobat_sign_events/webhookeventswidget.md'
          },
          {
            title: 'Webhooks OAuth 2.0 User Guide',
            path: 'overview/acrobat_sign_events/webhooks-oauth-2.0.md'
          }
        ]
      },
      {
        title: "Sign for Government",
        subTitle: '',
        path: 'overview/signgov/index.md',
        pages: [
          {
            title: 'Developer Overview',
            path: 'overview/signgov/index.md'
          },
          {
            title: 'Getting Started',
            path: 'overview/signgov/gstarted.md'
          },
          {
            title: 'APIs and Applications',
            path: 'overview/signgov/apps.md'
          },
          {
            title: 'Sign Gov and Commerical Comparison',
            path: 'overview/signgov/diffs.md'
          }
        ]
      },
      {
        title: "Acrobat Sign Embed",
        subTitle: '',
        path: 'overview/embedpartner/index.md',
        pages: [
          {
            title: 'Developing with Acrobat Sign Embed',
            path: 'overview/embedpartner/index.md'
          },
          {
            title: 'Onboarding Overview ',
            path: 'overview/embedpartner/onboarding.md'
          },
          {
            title: 'Provisioning Design and FAQ v.1.0',
            path: 'overview/embedpartner/provisioningfaq.md'
          },
          {
            title: 'Partner Application Quickstart v.1.0',
            path: 'overview/embedpartner/gstarted.md'
          },
          {
            title: 'Certifying Your Partner App v.1.0',
            path: 'overview/embedpartner/partnercertification.md'
          },
          {
            title: 'How-to Video Tutorials',
            path: 'overview/embedpartner/videos.md'
          },
          {
            title: 'Embed Partner Onboarding v 2.0',
            path: 'overview/embedpartner/onboarding2.md'
          },
          {
            title: 'Embed 2.0 API',
            path: 'overview/embedpartner/embedapi2.md'
          },
          {
            title: 'Channel Webhooks User Guide',
            path: 'overview/embedpartner/channel_webhooks.md'
          },
          {
            title: 'Certifying Your Partner App 2.0',
            path: 'overview/embedpartner/partnercertification2.md'
          },
          {
            title: 'How-to Video Tutorials 2.0',
            path: 'overview/embedpartner/videos2.md'
          }
        ]
      },
      {
        title: "SDK Downloads",
        subTitle: '',
        path: 'overview/sdks/index.md',
        pages: [
          {
            title: 'Acrobat Sign SDK Downloads',
            path: 'overview/sdks/index.md'
          },
          {
            title: 'Acrobat Sign JavaScript SDK',
            path: 'overview/sdks/js.md'
          },
          {
            title: 'Acrobat Sign JAVA SDK',
            path: 'overview/sdks/java.md'
          },
          {
            title: 'C#: Acrobat Sign SDK',
            path: 'overview/sdks/csharp.md'
          },
          {
            title: 'Acrobat Sign OpenAPI SDK',
            path: 'overview/sdks/openapi.md'
          },
          {
            title: 'Acrobat Sign REST API Samples',
            path: 'overview/sdks/rest.md'
          }
        ]
      }
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    }
  ]
};
