import { Application } from 'express';
import * as Controller from './controllers';

export default (app: Application): void => {
  const v1 = '/api/v1/email';
  const v2 = '/api/v1/email-event';
  const v3 = '/api/v1/ping-email';
  const v4 = '/api/v1/link';
  const v5 = '/api/v1/link-event';

  // EMAILS

  app.get(`${v1}/pixel`, Controller.pixelTracking);
  app.get(`${v1}`, Controller.readEmails);
  app.get(`${v1}/:id`, Controller.readEmailById);
  app.post(`${v1}`, Controller.createEmail);
  app.put(`${v1}/:id`, Controller.updateEmail);
  app.delete(`${v1}/:id`, Controller.removeEmail);
  app.post(`${v1}/email-mg`, Controller.postEmailMg);
  app.get(`${v1}/email-summary-old`, Controller.getEmailSummaryOld);
  app.get(`${v1}/email-summary`, Controller.getEmailSummary);
  app.get(`${v1}/sent-email/:date`, Controller.getSentEmailByDate);
  app.post(`${v1}/mobile-search-read-email-summary`, Controller.postMobileSearchReadEmailSummary);
  app.get(`${v1}/search-unread-email-summary`, Controller.getSearchUnreadEmailSummary);
  app.get(`${v1}/read-email-summary`, Controller.getReadEmailSummary);
  app.post(`${v1}/mobile-search-unread-email-summary`, Controller.postmobileSearchUnreadEmailSummary);
  app.get(`${v1}/unread-email-summary`, Controller.getUnreadEmailSummary);
  app.post(`${v1}/send-invitation-email-gmail-contacts`, Controller.postSendInvitationEmailGmailContacts);
  app.get(`${v1}/read-email/:date`, Controller.getReadEmailByDate);
  app.post(`${v1}/extension-link-send-email`, Controller.postExtensionLinkSendEmail);
  app.get(`${v1}/optimised-email-summary-v2`, Controller.getOptimisedEmailSummaryV2);
  app.post(`${v1}/create-mailchimp-user`, Controller.postCreateMailchimpUser);
  app.get(`${v1}/gmail-disclaimer`, Controller.getGmailDisclaimer);
  app.post(`${v1}/refresh-gmail`, Controller.postRefreshGmail);

  // EMAIL EVENTS
  app.get(`${v2}`, Controller.readEmailEvents);
  app.get(`${v2}/:id`, Controller.readEmailEventById);
  app.post(`${v2}`, Controller.createEmailEvent);
  app.put(`${v2}/:id`, Controller.updateEmailEvent);
  app.delete(`${v2}/:id`, Controller.removeEmailEvent);
  app.get(`${v2}/demo-email-event/:emailId`, Controller.getDemoEmailEventByEmailId);
  app.get(`${v2}/email-event/:emailId`, Controller.getEmailEventByEmailId);

  // PING EMAILS
  app.get(`${v3}`, Controller.readPingEmails);
  app.get(`${v3}/:id`, Controller.readPingEmailById);
  app.post(`${v3}`, Controller.createPingEmail);
  app.put(`${v3}/:id`, Controller.updatePingEmail);
  app.delete(`${v3}/:id`, Controller.removePingEmail);
  app.post(`${v3}/permanent-email-bounces-webhook`, Controller.postPermanentEmailBouncesWebhook);
  app.put(`${v3}/email-by-draft-id/:id`, Controller.putEmailByDraftById);

  // LINKS
  app.get(`${v4}`, Controller.readLinks);
  app.get(`${v4}/:id`, Controller.readLinkById);
  app.post(`${v4}`, Controller.createLink);
  app.put(`${v4}/:id`, Controller.updateLink);
  app.delete(`${v4}/:id`, Controller.removeLink);
  app.get(`${v4}/optimised-link-summary-v2/:emailId`, Controller.getOptimisedLinkSummaryByEmailId);
  app.get(`${v4}/custom-domain`, Controller.getCustomDomain);

  // LINK EVENTS
  app.get(`${v5}`, Controller.readLinkEvents);
  app.get(`${v5}/:id`, Controller.readLinkEventById);
  app.post(`${v5}`, Controller.createLinkEvent);
  app.put(`${v5}/:id`, Controller.updateLinkEvent);
  app.delete(`${v5}/:id`, Controller.removeLinkEvent);
};
