import { Application } from 'express';
import * as Controller from './controllers';

export default (app: Application): void => {
  const v1 = '/api/v1/dashboard';

  // API IN DOCUMENT
  app.get(`${v1}-stats`, Controller.getStatsInfo);
  app.post(`${v1}-graph`, Controller.getGraphData);
  app.get(`${v1}-recent-unread-emails-count`, Controller.getRecentUnreadEmailsCount);
  app.get(`${v1}-graph-unread-emails-count `, Controller.getGraphUnreadEmailsCount);
  app.get(`${v1}-graph-signature-clicks-count`, Controller.getSignatureClicksCount);
  app.post(`${v1}-select-plan`, Controller.postSelectPlan);

  // SORTED API
  app.get(`${v1}-email-send-today-count`, Controller.getEmailSendTodayCount);
  app.get(`${v1}-email-send-current-month`, Controller.getEmailSendCurrentMonthCount);
  app.get(`${v1}-avg-open-rate-percentage`, Controller.getAverageOpenRatePercentage);
  app.get(`${v1}/dashboard/read-emails`, Controller.getAllReadEmails);
  app.get(`${v1}/dashboard/recent-unread-emails`, Controller.getAllRecentUnreadEmails);
  app.get(`${v1}/dashboard/signature`, Controller.getSignature);
  app.get(`${v1}/dashboard/ping-emails`, Controller.getAllPingEmails);
  app.get(`${v1}/dashboard/email-sent-and-open`, Controller.getEmailSentAndOpen);
  app.get(`${v1}/dashboard/app-config-keys`, Controller.getAppConfigKeys);
  app.get(`${v1}/dashboard/milestone-event`, Controller.getMilestoneEvent);

  //Views
  app.get(`${v1}/test`, (req, res) => res.send('____OK'));
  app.get('/dashboard/signature', Controller.getSignature);
  app.get('/dashboard/signatures', Controller.getAllSignatures);
  app.get('/dashboard/team-management', Controller.getTeamManagement);
  app.get('/dashboard-old', Controller.getDashboardOld);
  app.get('/dashboard', Controller.getDashboard);
  app.get('/dashboard/show-specific-sent-email/:id', Controller.getShowSpecificSentEmailById);
  app.get('/dashboard/account', Controller.getAccount);
  app.get('/dashboard/read-emails', Controller.getAllReadEmails);

  app.get('/dashboard/unread-emails', Controller.getUnreadEmails);
  app.get('/dashboard/preferences', Controller.getAllPreferences);
  app.get('/dashboard/preferences', Controller.getUpgrade);
  app.get('/dashboard/invoice', Controller.getInvoice);
  app.get('/dashboard/videos', Controller.getAllVideos);
  app.get('/dashboard/support', Controller.getSupport);
  app.get('/dashboard/ping-sequence-details/:pingSequenceId', Controller.getPingSequenceDetailsById);
  app.get('/dashboard/stop-ping-email/:id', Controller.getStopPingEmailById);
  app.get('/dashboard/signature/:id', Controller.getSignatureById);
  app.get('/dashboard-optimization', Controller.getOptimization);

  //APIs
  app.get(`${v1}/dashboard-email-count`, Controller.getEmailCount);
  app.get(`${v1}/refer-a-friend`, Controller.getReferAFriend);
};
