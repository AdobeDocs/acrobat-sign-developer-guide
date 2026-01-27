# Phases of the upgrade

Last update: Oct 30, 2025.

<InlineAlert slots="header, text" />

Tip

Your feedback is valuable and is vital in improving our product and documentation. Send suggestions to acrobatsignembed@adobe.com.
## Phase 1 - Adobe and the Partner discuss the OEM 2.0 Partner platform and the upgrade process

- Adobe will share the upgrade documentation and resources.
- The Partner will identify their Upgrade Team representatives (Project Manager, Lead Engineer, etc.) who will work with the Adobe partner upgrade team.
- The Partner should identify any default setting values they require to be inherited by all of their child accounts (content protection, email settings, authentication types, signature preferences, etc).
- The Partner should review all workflows and templates to remove Acrobat Sign Authentication as an authentication method for their (the Partner’s) users. It wont work after the migration, so you don’t want outstanding agreements to require it.
- The Partner should consider and prepare for any required communication content to the Partner’s customers.

## Phase 2 - Partner integrates with 2.0 OEM Partner platform

- Adobe will complete the provisioning of the Acrobat Sign Sandbox and Production accounts in the Adobe Global Admin Console for the Partner. The Global Admin Console establishes a “parent / child” relationship between the Partner and their customers. 
  - The Partner is the “parent” account with visibility and control over the various “child” accounts. There can only be one Parent account. 
  - The customer “child” accounts are insulated from, and invisible to, each other. There is no limit to the number of child accounts that can be governed by the parent account. While most partners maintain a one-to-one relationship between customers and child organizations, keep in mind that child organizations can be used for any segmentation of use. For example:
    - Different partner tiers of service (Gold, Silver, Bronze, and the like)
    - Different environments (Developer, Test, QA)
    - Separating the partner’s internal Adobe product usage (e.g. Acrobat and Creative Cloud licenses for the partner’s employees) vs. the partner’s Acrobat Sign Embed usage (e.g. Acrobat Sign licenses for the Partner’s customers).
- Adobe will assign the Partner to an Acrobat Sign “channel” (causing all customer accounts to inherit the Partner’s preferred account settings as their default values.)
- Once Adobe verfies that the Global Admin account is created, the Partner [should set up their parent organization](onboarding2.md#set-up-parent-organization).
- The Partner must [claim their domain(s)](onboarding2.md#claim-domain). User creation is predicated on the claimed domain(s). Users having email domains other than claimed domain(s) won’t be provisioned.
- The Partner must [link their domain(s) a with federated directory](onboarding2.md#create-a-directory-and-link-with-the-claimed-domain). Federation allows the customer’s users to authenticate without managing user names and passwords, enabling the Partner to limit the interaction between Adobe and the customer’s users. Other Adobe authentication methods (e.g. Enterprise ID, Adobe ID) require the user to manage a password and may require account management notifications or other emails to be sent to the user. Federation enables the Partner own the customer relationship by avoiding these undesirable interactions with Adobe.
- The Partner must [create child organization(s) for their customer(s)](onboarding2.md#create-and-configure-child-organization) and allocate Acrobat Sign transactions to these organization(s).
- The Partner must [create a technical account (in the Adobe Developer Console)](onboarding2.md#create-a-technical-account). Technical account tokens are generated, which allow the Partner to authenticate to and engage with Acrobat Sign and provision customer accounts and customer users.
- The Partner must [use the technical account token to register the Partner application](onboarding2.md#register-the-partner-on-acrobat-sign) via API.
- The Partner should create new webhooks using new 2.0 tokens only.
- Adobe will certify your new application process.

## Phase 3 - “Cutover”

<InlineAlert slots="header, text" />
Tip

Phases 3A and 3B can happen separately or simultaneously.

**Phase 3A - Partner onboards new customers onto the new 2.0 platform**

Complete documentation for onboarding to the 2.0 platform can be found here: https://developer.adobe.com/acrobat-sign/docs/overview/embedpartner/embedapi2. Once your partner application is certified, the Partner can use the Acrobat Sign Embed APIs to:

- Create customer accounts
- Add users
- Generate user tokens
Once Phase 3A is complete, new customers should be onboarded onto the new 2.0 platform only (independent of the Phase 3B upgrade).

**Phase 3B - Adobe upgrades existing customers to the new 2.0 platform**

Adobe will:

1. Change management of the Partner’s existing customer accounts.
2. (If required) Change the email addresses of the Partner’s end users.

The estimated duration for the upgrade of existing customers is measured in hours, but that number of hours is dependent on the number of Acrobat Sign accounts and end users that must be upgraded. During the upgrade:

- No new users or accounts can be created.
- No updates to existing users or accounts are allowed.
- The Partner can query the upgrade status for individual users.
- Acrobat Sign usage will remain functional as long as the existing user token is still valid.
- Agreements that are in progress will remain signable.
The Partner’s customer will experience no data loss nor disruption to accessing their content.

## Phase 4 - Adobe and Partner review the status after cutover. Partner retires their legacy processes.

Adobe will notify the Partner of the upgrade’s success when done.

If issues are encountered during the upgrade, Adobe will roll back to the previous state while the issue is resolved. Once the issues are resolved, the upgrade will be re-initiated.

- The Partner should validate that their workflows are working as expected with new OEM 2.0 platform.
- The Partner should retire all legacy SOAP API integrations (if any).
- The Partner must remove the legacy Application IDs associated with any Webhook verification (if any).
- Adobe and the Partner will conduct a post-mortem review of the upgrade.

<HorizontalLine />
© Copyright 2022, Adobe Inc..  Last update: Jan 30, 2025.
![](../_static/adobelogo.png)
