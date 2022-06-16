import { Application } from 'express';
import * as Controller from './controllers';

export default (app: Application): void => {
  // app.get("/dashboard/signature/:id", Controller.getSignatureById);
  const v1 = '/api/v1/ping-sequence/';

  // DOCUMENT APIS
  app.get('/api/v1/ping-emails', Controller.getAllPingEmails);
  app.get('/api/v1/ping-sequence-details', Controller.getPingSequenceDetails);
  app.get('/api/v1/ping-settings', Controller.getPingSequenceSettings);
  app.put('/api/v1/ping-sequence-details', Controller.putPingSequenceDetails);
  app.post('/api/v1/ping-sequence-details', Controller.postPingSequenceDetails);
  app.delete('/api/v1/ping-sequence-details/:id', Controller.deletePingSequenceDetails);
  app.put('/api/v1/ping-settings', Controller.putPingSequenceSettings);
  app.post('/api/v1/ping-settings', Controller.postPingSequenceSettings);

  // CRUD
  app.get(`${v1}`, Controller.read);
  app.post(`${v1}`, Controller.create);
  app.put(`${v1}/:id`, Controller.update);
  app.delete(`${v1}/:id`, Controller.remove);

  // NEW Signature APIS
  app.get(`${v1}/:id`, Controller.readById);
  app.get('/api/v1/ping-sequence-details/:pingSequenceId', Controller.getPingSequenceDetailsById);

  app.get('/api/v1/ping-sequence/:id', Controller.getPingSequenceById);
  app.post('/api/v1/ping-email', Controller.postPingEmail);
  app.post('/api/v1/ping-email-mg', Controller.postPingEmailMg);
  app.post('/api/v1/stop-ping-email', Controller.postStopPingEmail);
  app.post('/api/v1/stop-ping-email-mg', Controller.postStopPingEmailMg);
  app.post('/api/v1/temporary-email-bounces-webhook', Controller.postTemporaryEmailBouncesWebhook);
  app.delete('/api/v1/ping-email', Controller.deletePingEmail);
  app.post('/api/v1/ping-sequence-details', Controller.postPingSequenceDetails);
  app.delete('/api/v1/ping-sequence', Controller.deletePingSequence);
  app.post('/api/v1/ping-sequence', Controller.postSendPingPreviewEmail);
  app.post('/api/v1/ping-email-by-draft-id', Controller.postPingEmailByDraftId);
  app.post('/api/v1/pings-detail', Controller.postPingsDetail);
  app.post('/api/v1/mobile/ping-emails', Controller.postMobilePingEmails);
  app.post('/api/v1/mobile-search-ping-email-summary', Controller.postMobileSearchPingEmailSummary);
  app.get('/api/v1/search-ping-email-summary', Controller.getSearchPingEmailSummary);
  app.get('/api/v1/restart-ping-email', Controller.getRestartPingEmail);
  app.post('/api/v1/custom-domain-pings', Controller.postCustomDomainPings);
  app.get('/api/v1/custom-domain-pings', Controller.getCustomDomainPings);
  app.get('/api/v1/ping-sequence-list/:offset', Controller.getPingSequenceListByOffset);
};
