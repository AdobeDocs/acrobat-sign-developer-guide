---
title: API Agreement Statuses, Recipient Statuses, Agreement Events, and Webhook Events
---
# API Agreement Statuses, Recipient Statuses, Agreement Events, and Webhook Events

Last update: Apr 06, 2023.

Most states relate to specific Adobe Sign ["roles"](https://helpx.adobe.com/sign/using/set-up-signer-approver-roles.html).

PDF reference available [here](https://documentcloud.adobe.com/link/track?uri=urn%3Aaaid%3Ascds%3AUS%3A4eec32fd-527e-4133-9666-08fb35286d7e).

## STATUSES

| Status                            | Status meaning/description                                                                                                                                                                                                                                                                                                                                                  |
|:----------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `OUT_FOR_SIGNATURE`               | Waiting for Signature by one or more Signers                                                                                                                                                                                                                                                                                                                                |
| `OUT_FOR_DELIVERY`                | Waiting for acceptance by "Certified Recipient" (non-signer)                                                                                                                                                                                                                                                                                                                |
| `OUT_FOR_ACCEPTANCE`              | Waiting for acceptance by "Acceptor" (non-signer)                                                                                                                                                                                                                                                                                                                           |
| `OUT_FOR_FORM_FILLING`            | Waiting for "form filler" recipient to fill out data in fields (non-signer)                                                                                                                                                                                                                                                                                                 |
| `OUT_FOR_APPROVAL`                | Waiting for "Approver" to approve (non-signer)                                                                                                                                                                                                                                                                                                                              |
| `AUTHORING`                       | Agreement not yet finished with "authoring" so not yet sent to 1st recipient                                                                                                                                                                                                                                                                                                |
| `ABORTED`                         | Cancelled (by sender) OR rejected (by recipient) — **Terminal State**                                                                                                                                                                                                                                                                                                       |
| `CANCELLED`                       | Cancelled (by sender) OR rejected (by recipient) — Legacy status, now = ABORTED — **Terminal State**                                                                                                                                                                                                                                                                        |
| `SIGNED`                          | Completed "signed" — **Terminal State**                                                                                                                                                                                                                                                                                                                                     |
| `APPROVED`                        | Completed "approved" — **Terminal State**                                                                                                                                                                                                                                                                                                                                   |
| `DELIVERED`                       | Completed by "Certified Recipient" — **Terminal State**                                                                                                                                                                                                                                                                                                                     |
| `ACCEPTED`                        | Completed by "Acceptor" — **Terminal State**                                                                                                                                                                                                                                                                                                                                |
| `FORM_FILLED`                     | Filled out by "Form filler"                                                                                                                                                                                                                                                                                                                                                 |
| `EXPIRED`                         | Agreement has passed "Expiration Date/Time" — **Terminal State**                                                                                                                                                                                                                                                                                                            |
| `ARCHIVED`                        | Applies only to files "archived" to Adobe Sign for secure storage — **Terminal State**                                                                                                                                                                                                                                                                                      |
| `PREFILL`                         | Waiting to be pre-filled by sender                                                                                                                                                                                                                                                                                                                                          |
| `WIDGET_WAITING_FOR_VERIFICATION` | If email verification is on, signed web-forms (widgets) must have signer verify email address provided during signing before agreement is "complete"/fully executed                                                                                                                                                                                                         |
| `DRAFT`                           | A "stub record" state where no doc conversion has taken place so there is not yet an "authoring" or signing experience but you can change any related data before starting the steps to create an agreement. There is an agreement ID (stubbed) and associated data but nothing else has happened. Agreements in this state can be deleted without incurring a transaction. |
| `DOCUMENTS_NOT_YET_PROCESSED`     | Request has been made to create an agreement but Adobe Sign is still working on processing the docs for the agreement.                                                                                                                                                                                                                                                      |
| `WAITING_FOR_FAXIN`               | When agreement has been sent and forced WRITTEN. This status references legacy "Faxin" feature now deprecated but is still used for "written" (print, wet-sign, scan and upload) transactions.                                                                                                                                                                              |
| `WAITING_FOR_VERIFICATION`        | OLD status same as WIDGET_WAITING_FOR_VERIFICATION                                                                                                                                                                                                                                                                                                                          |

## Status related to recipients

| Status | Status meaning/description |
|:---|:---|
| `COMPLETED` | Your required action is complete |
| `CANCELLED` | You (or someone before you in the recipient order) has cancelled the agreement |
| `EXPIRED` | The agreement expired while waiting for you to take the required action |
| `NOT_YET_VISIBLE` | Recipients before you have not finished their required action/s |
| `WAITING_FOR_OTHERS` | Recipients after you still need to take their required actions |
| `WAITING_FOR_MY_APPROVAL` | You are the current recipient (APPROVER) and need to approve |
| `WAITING_FOR_AUTHORING` | You are the current sender and need to finish the authoring step and set the agreement to IN_PROCESS |
| `WAITING_FOR_MY_ACKNOWLEDGEMENT` | You are the current recipient (CERTIFIED_RECIPIENT) and need to Acknowledge your receipt |
| `WAITING_FOR_MY_ACCEPTANCE` | You are the current recipient (ACCEPTOR) and need to Accept |
| `WAITING_FOR_MY_FORM_FILLING` | You are the current recipient (FORM_FILLER) and need to fill out the fields |
| `WAITING_FOR_MY_DELEGATION` | You are the current recipient ([DELEGATOR](https://helpx.adobe.com/sign/how-to/use-the-delegator-role.html)) and need to delegate the agreement to someone |
| `WAITING_FOR_MY_SIGNATURE` | You are the current recipient (SIGNER) and need to sign |
| `WAITING_FOR_MY_VERIFICATION` | You have signed a web form (widget) but have not completed the post signing email verification step |
| `WAITING_FOR_PREFILL` | You are the 1st recipient where the sender has marked fields to be pre-filled (by her/him) but has not finished prefilling and sending |

## Agreement Events

| Event Name | Description of Event | Status Change |
|:---|:---|:---|
| `CREATED` | When an agreement or Draft is created | A new resource with DRAFT status or AUTHORING or with one of the OUT_FOR_ status depending on the participants roles. |
| `AGREEMENT_MODIFIED` | Agreement modified by sender modify document in flight | No change in the status. |
| `USER_ACK_AGREEMENT_MODIFIED` | When signer acknowledges modification before signing | No change in the status. |
| `ESIGNED` | When agreement is signed | Either change in status based on the next participants role if there are more recipients or the status changes to SIGNED. |
| `DIGSIGNED` | When agreement is digitally signed | Either change in status based on the next participants role if there are more recipients or the status changes to SIGNED. |
| `APPROVED` | When agreement is approved | Either change in status based on the next participants role if there are more recipients or the status changes to one of SIGNED or APPROVED. |
| `ACCEPTED` | When agreement is accepted | Either no change in status if there are more recipients or the status changes to one of SIGNED, APPROVED or ACCEPTED. |
| `DELIVERED` | When agreement is delivered | Either no change in status if there are more recipients or the status changes to one of SIGNED, APPROVED, ACCEPTED, FORM_FILLED or DELIVERED. |
| `FORM_FILLED` | When agreement is filled | Either no change in status if there are more recipients or the status changes to one of SIGNED, APPROVED, ACCEPTED or FORM_FILLED. |
| `ABORTED` | When agreement is cancelled or rejected | Status changes to ABORTED. |
| `EXPIRED` | When agreement is expired | Status changes to EXPIRED. |
| `RECALLED` | When agreement is recalled by sender | Status changes to ABORTED. |
| `DELEGATED` | When participant delegates to someone else | No change in status. |
| `REPLACED_SIGNER` | When a participant is replaced | No change in status. |
| `AUTO_CANCELLED_CONVERSION_PROBLEM` | When the documents cannot be converted successfully | Status changes to ABORTED. |

## Webhook Events

Webhook events follow the same naming conventions as Agreement Events but are delivered as HTTP POST payloads to your configured webhook endpoint. Key notes:

- Webhook payloads include the full agreement details at the time of the event.
- Partners should use per-agreement (resource-level) webhooks rather than account-level webhooks. See [Webhooks for Partner Integrations](webhooks-partner-integrations.md) for details.
- For the complete webhook event reference, see the [Webhook Reference](../../../overview/acrobat_sign_events/index.md).

<HorizontalLine />
© Copyright 2023, Adobe Inc..  Last update: Apr 06, 2023.
![](../../_static/adobelogo.png)
