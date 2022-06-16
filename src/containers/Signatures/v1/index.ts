import { Application } from 'express';
import * as Controller from './controllers';

export default (app: Application): void => {
  const v1 = '/api/v1/signature';

  // DOCUMENT APIS
  app.get('/signature-calculator', Controller.getSignatureCalculator);
  app.post('/signature', Controller.postSignature);
  app.get('/signature', Controller.read);
  app.post('/schedule-a-call', Controller.postScheduleCall);

  //Views
  app.post('/signature-calculator', Controller.postSignatureCalculator);

  // NEW Signature APIS
  app.get(`${v1}`, Controller.read);
  app.get(`${v1}/:id`, Controller.readById);
  app.post(`${v1}`, Controller.create);
  app.put(`${v1}/:id`, Controller.update);
  app.delete(`${v1}/:id`, Controller.remove);

  // OLD Signature APIS
  app.post('/api/v1/get-signature-data', Controller.postGettingSignatureData);
  app.get('/api/v1/set-default-signature', Controller.getSetDefaultSignature);
  app.put('/api/v1/signature-calculator/:id', Controller.putSignatureCalculator);
  app.delete('/signature-calculator/:id', Controller.deleteSignatureCalculator);
  app.get('/signature-event-v2', Controller.getSignatureEventV2);
  app.get('/signature-event/:email_id', Controller.getSignatureEventById);
  app.post('/api/v1/send-email-signature', Controller.postSendEmailSignature);
};
