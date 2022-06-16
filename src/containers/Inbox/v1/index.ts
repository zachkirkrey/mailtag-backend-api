import { Application } from 'express';
import * as Controller from './controllers';

export default (app: Application): void => {
  const v1 = '/api/v1/inbox';

  // DOCUMENT API
  app.get(`${v1}/reaeded-email`, Controller.getReadedEmails);
  app.get(`${v1}/unreaded-email`, Controller.getUnreadedEmails);

  app.get(`${v1}/session-new`, Controller.getNewSession);
};
