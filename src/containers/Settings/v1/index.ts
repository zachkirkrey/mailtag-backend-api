import { Application } from 'express';
import * as Controller from './controllers';

export default (app: Application): void => {
  const v1 = '/api/v1/settings';

  //Views

  // CONFIG KEYS
  app.post(`${v1}/config-keys`, Controller.createConfigKeys);
  app.get(`${v1}/config-keys`, Controller.readConfigKeys);
  app.get(`${v1}/config-keys/:id`, Controller.readConfigKeysById);
  app.put(`${v1}/config-keys/:id`, Controller.updateConfigKeys);
  app.delete(`${v1}/config-keys/:id`, Controller.removeConfigKeys);

  // APP CONFIG KEYS
  app.post(`${v1}/app-config-keys`, Controller.createAppConfigKeys);
  app.get(`${v1}/app-config-keys`, Controller.readAppConfigKeys);
  app.get(`${v1}/app-config-keys/:id`, Controller.readAppConfigKeysById);
  app.put(`${v1}/app-config-keys/:id`, Controller.updateAppConfigKeys);
  app.delete(`${v1}/app-config-keys/:id`, Controller.removeAppConfigKeys);

  // ERRORS
  app.post(`${v1}/errors`, Controller.createError);
  app.get(`${v1}/errors`, Controller.readErrors);
  app.get(`${v1}/errors/:id`, Controller.readErrorById);
  app.put(`${v1}/errors/:id`, Controller.updateError);
  app.delete(`${v1}/errors/:id`, Controller.removeError);
};
