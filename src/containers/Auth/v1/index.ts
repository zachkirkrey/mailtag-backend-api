import { Application } from 'express';
import * as Controller from './controllers';

export default (app: Application): void => {
  //View
  app.get('/google-login', Controller.getGoogleLogin);
  app.get('/google-callback', Controller.getGoogleCallback);
  app.post('/login', Controller.login);
  app.get('/mobile/google-login', Controller.getmobileGoogleLogin);
  app.get('/delete-user', Controller.getDeleteUser);
  app.get('/twitter-callback', Controller.getTwitterCallback);
  app.get('/facebook-callback', Controller.getFacebookCallback);
  app.get('/set-admin', Controller.postSetAdmin);

  //API
  app.get('/api/v1/session', Controller.getSession);
  app.post('/api/v1/register', Controller.register);
  app.get('/api/v1/profile-pic/:email', Controller.getProfilePicByEmail);
  app.put('/api/v1/user', Controller.putUpdateUser);
  app.post('/api/v1/deleting-user', Controller.postDeletingUser);
  app.get('/api/v1/deleting-user-by-id/:id', Controller.getDeletingUserById);
  app.get('/api/v1/user', Controller.getUser);
  app.post('/api/v1/user-device', Controller.postUserDevice);
  app.post('/api/v1/mobile/user-device', Controller.postMobileUserDevice);
  app.post('/api/v1/mobile/user-data', Controller.postMobileUserData);
};
