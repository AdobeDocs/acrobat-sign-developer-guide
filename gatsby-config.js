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
        path: '/'
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
          path: 'http://google.com'
        },{
          title: 'API Reference (v.6)',
          path: 'https://secure.na1.adobesign.com/public/docs/restapi/v6'
        },{
          title: 'Core Dev Guide',
          path: 'http://google.com'
        },{
          title: 'Webhook Reference',
          path: 'http://google.com'
        },{
          title: 'Acrobat Sign Embed',
          path: 'http://google.com'
        },{
          title: 'SDK Downloads',
          path: 'http://google.com'
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
