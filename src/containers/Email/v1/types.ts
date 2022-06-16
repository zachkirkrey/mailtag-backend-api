export enum ROUTES {
  // EMAILS
  createEmail = 'createEmail',
  readEmails = 'readEmails',
  readEmailById = 'readEmailById',
  updateEmail = 'updateEmail',
  removeEmail = 'removeEmail',
  postEmailMg = 'postEmailMg',
  getEmailSummaryOld = 'getEmailSummaryOld',
  getEmailSummary = 'getEmailSummary',
  getSentEmailByDate = 'getSentEmailByDate',
  postMobileSearchReadEmailSummary = 'postMobileSearchReadEmailSummary',
  getSearchUnreadEmailSummary = 'getSearchUnreadEmailSummary',
  getReadEmailSummary = 'getReadEmailSummary',
  postmobileSearchUnreadEmailSummary = 'postmobileSearchUnreadEmailSummary',
  getUnreadEmailSummary = 'getUnreadEmailSummary',
  postSendInvitationEmailGmailContacts = 'postSendInvitationEmailGmailContacts',
  getReadEmailByDate = 'getReadEmailByDate',
  postExtensionLinkSendEmail = 'postExtensionLinkSendEmail',
  getOptimisedEmailSummaryV2 = 'getOptimisedEmailSummaryV2',
  postCreateMailchimpUser = 'postCreateMailchimpUser',
  getGmailDisclaimer = 'getGmailDisclaimer',
  postRefreshGmail = 'postRefreshGmail',

  // EMAIL EVENTS
  createEmailEvent = 'createEmailEvent',
  readEmailEvents = 'readEmailEvents',
  readEmailEventById = 'readEmailEventById',
  updateEmailEvent = 'updateEmailEvent',
  removeEmailEvent = 'removeEmailEvent',
  getDemoEmailEventByEmailId = 'getDemoEmailEventByEmailId',
  getEmailEventByEmailId = 'getEmailEventByEmailId',

  // PING EMAILS
  createPingEmail = 'createPingEmail',
  readPingEmails = 'readPingEmails',
  readPingEmailById = 'readPingEmailById',
  updatePingEmail = 'updatePingEmail',
  removePingEmail = 'removePingEmail',
  postPermanentEmailBouncesWebhook = 'postPermanentEmailBouncesWebhook',
  putEmailByDraftById = 'putEmailByDraftById',

  // LINKS
  createLink = 'createLink',
  readLinks = 'readLinks',
  readLinkById = 'readLinkById',
  updateLink = 'updateLink',
  removeLink = 'removeLink',
  getOptimisedLinkSummaryByEmailId = 'getOptimisedLinkSummaryByEmailId',
  getCustomDomain = 'getCustomDomain',

  // LINK EVENTS
  createLinkEvent = 'createLinkEvent',
  readLinkEvents = 'readLinkEvents',
  readLinkEventById = 'readLinkEventById',
  updateLinkEvent = 'updateLinkEvent',
  removeLinkEvent = 'removeLinkEvent',

  // UnreadEmailSummary
}
