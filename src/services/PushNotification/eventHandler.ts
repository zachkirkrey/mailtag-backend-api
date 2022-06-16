import { sendNotification } from '../PushNotification';
import * as admin from 'firebase-admin';

export default (message: admin.messaging.Message) => {
  sendNotification(message);
};
