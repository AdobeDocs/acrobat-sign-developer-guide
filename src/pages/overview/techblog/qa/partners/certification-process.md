---
title: Partner Application Certification
---
# Partner Application Certification

Last update: Apr 06, 2023.

Before your integration is certified, you can still test it with other accounts representing what would typically be a customer's account by changing a setting under **Account > Account Settings > Security Settings > "Allow Uncertified partner applications to access data from this account"**.

There are some things you should be aware of and follow through on as part of your dev process.

- Your platform will normally be required to allow instance users (typically an admin) to connect their own Adobe Sign accounts (whether provisioned for them by you as a partner or acquired by them direct from Adobe) to your platform through [OAuth](https://secure.echosign.com/public/static/oauthDoc.jsp). This is usually **required** so you will need to have developed and set things up on your side to account for this.
- We need to make sure you are following the [OWASP top 10](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project) as well as making sure you're **encrypting all the tokens as well as your partner "App Secret"**.
- You should be finished or nearly finished with your integration development and be able to allow our reviewers to log into an instance to do their testing.
- You can help speed up the process by providing any recent 3rd party security testing summary reports you may already have, related to the OWASP guidelines.

## Certification review process

During the security review and "Certification" process, we will do a few things:

1. **Meet to go over the process** of connecting your application/platform to Adobe Sign and typical use of the functions related. This meeting will typically include the partner manager from Adobe + someone from the security group + the Solution Consultant you've been working with. In this meeting we will want to see the OAuth process from your app plus basic instructions on sending, tracking and/or signing for your app's typical eSign use case. This is normally recorded so our security folks can refer back when doing their testing.

2. **Security team review** — The security team will follow the instructions in an instance of your app/platform where you have given them access. During this process they will connect the instance of your platform to Adobe Sign, send and track agreements or use other functions you've implemented, and do some light sniffing to make sure the integration is not exposing our mutual customers to any major security or data breach vulnerabilities. They will **verify with you that you are storing all tokens for the integration in an encrypted format.**

3. **Issue resolution** — If there are any major issues, the group will get back to your development team with the discovered issues and ask you to address them.

4. **Certification** — Once all concerns have been addressed, your app will be certified and you will be able to make it available to your customers for general use. If your integration functionality or permissions related to your app need to change in the future, the application will need to be re-certified.

## Post certification

Once your integration is certified, you can work with our Partner Success Managers to collaborate on co-marketing. We can also list your integration on the Adobe Exchange - Document Cloud page. Best practice on this would be to make sure we have collateral or pointers to documentation on the partner website for how the integration works, the range of functionality included, and how it looks on the integrated app/platform. The certification will allow customers to use the integration without needing to change their security settings to allow "uncertified app data access."

<HorizontalLine />
© Copyright 2023, Adobe Inc..  Last update: Apr 06, 2023.
![](../../../../_static/adobelogo.png)
