import { Application } from 'express';
import * as Controller from './controllers';

export default (app: Application): void => {
  // app.get("/api/v1/lambda-test", Controller.getlambdaTest);
  // app.get("/api/v1/lambda-test-2", Controller.getlambdaTest2);
  // app.get("/api/v1/db-backup", Controller.getDbBackup);
  // app.get("/demo", Controller.getDemo);
  // app.get("/test", Controller.getTest);
  // app.get("/install", Controller.getInstall);

  //Views
  app.get('/', Controller.getIndex);
  app.get('/getting-started', Controller.getGettingStarted);
  app.get('/mt-special-upgrade', Controller.getMtSpecialUpgrade);
  app.get('/mt-special-upgrade-success', Controller.getMtSpecialUpgradeSuccess);
  app.get('/deal-fuel', Controller.getDealFuel);
  app.get('/deal-fuel-success', Controller.getDealFuelSuccess);
  app.get('/site-upgrade', Controller.getSiteUpgrade);
  app.get('/site-upgrade-onboarding', Controller.getSiteUpgradeOnboarding);
  app.get('/site-upgrade-success', Controller.getSiteUpgradeSuccess);
  app.get('/about-us', Controller.getAboutUs);
  app.get('/thanks', Controller.getThanks);
  app.get('/leaving', Controller.getLeaving);
  app.get('/cookies-policy', Controller.getCookiesPolicy);
  app.get('/disclosure-policy', Controller.getDisclosurePolicy);
  app.get('/press', Controller.getPress);
  app.get('/privacy-policy', Controller.getPrivacyPolicy);
  app.get('/information-security-policy', Controller.getInformationSecurityPolicy);
  app.get('/incident-response-policy', Controller.getIncidentResponsePolicy);
  app.get('/risk-management-policy', Controller.getRiskManagementPolicy);
  app.get('/installation-complete', Controller.getInstallationComplete);
  app.get('/final-step', Controller.getFinalStep);
  app.get('/terms-conditions', Controller.getTermsConditions);
  app.get('/gdpr', Controller.getGdpr);
  app.get('/gift', Controller.getGift);
  app.get('/gift-success', Controller.getGiftSuccess);
  app.get('/give-program', Controller.getGiveProgram);
  app.get('/pro-credit', Controller.getProCredit);
  app.get('/pro-credit-counter', Controller.getProCreditCounter);
  app.get('/signature-calc', Controller.getSignatureCalc);
  app.get('/enable-push', Controller.getEnablePush);
  app.get('/redir', Controller.getRedir);
  app.get('/link-event-v2', Controller.getLinkEventV2);
  app.get('/subprocessors', Controller.getSubprocessors);
  app.get('/eu', Controller.getEu);
  app.get('/ip-to-country', Controller.getIpToCountry);

  //APIs
  app.get('/api/v1/attachment-event/:attachmentId', Controller.getAttachmentEventById);
  app.get('/api/v1/attachment', Controller.getAttachment);
  app.get('/api/v1/preferences', Controller.getPreferences);
  app.put('/api/v1/preferences', Controller.putPreferences);
  app.put('/api/v1/mobile-notification-preferences', Controller.putMobileNotificationPreferences);
  app.post('/api/v1/support', Controller.postSupport);
  app.get('/api/v1/tracking-pixels', Controller.getTrackingPixels);
  app.post('/api/v1/home-page-click-call', Controller.postHomePageClickCall);
  app.get('/api/v1/google-contact-list', Controller.getGoogleContactList);
  app.get('/api/v1/retrieve-card-details', Controller.getRetrieveCardDetails);
  app.put('/api/v1/retrieve-card-details', Controller.getRetrieveCardDetails);
  app.put('/api/v1/update-card-details', Controller.putUpdateCardDetails);
  app.put('/api/v1/update-card-details', Controller.putUpdateCardDetails);
  app.get('/api/v1/domain-details', Controller.getDomainDetails);
  app.post('/api/v1/add-feedback', Controller.postAddFeedback);
  app.post('/api/v1/raise-ticket', Controller.postRaiseTicket);
  app.post('/api/v1/chromeStore-link-clicked', Controller.postchromeStoreLinkClicked);

  app.post('/api/v1/segment-analytics', Controller.postSegmentAnalytics);
  app.post('/api/v1/add-free-trial-10th-feedback', Controller.postAddFreeTrial10thFeedback);
  app.post('/api/v1/mobile/push-notification', Controller.postMobilePushNotification);
  app.post('/api/v1/blog', Controller.postBlog);
  app.post('/api/v1/set-default-signature', Controller.postSetDefaultSignature);
};
