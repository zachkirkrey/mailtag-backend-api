import Notification from 'services/PushNotification';
import * as admin from 'firebase-admin';

import { EventEmitter } from 'events';
import TypedEmitter from 'typed-emitter';

type MessageEvents = {
  notification: (config: admin.messaging.Message) => void;
};

const eventEmitter = new EventEmitter() as TypedEmitter<MessageEvents>;

eventEmitter.on('notification', Notification.eventHandler);

export default eventEmitter;
