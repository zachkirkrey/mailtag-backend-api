import { Application } from 'express';
import * as Controller from './controllers';

export default (app: Application): void => {
  app.get('/dashboard/signature/:id', Controller.getSignatureById);
};
