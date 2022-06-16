import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const sendNotification = async (message: admin.messaging.Message): Promise<void> => {
  try {
    const res = await admin.messaging().send(message);
    console.log('Notification res:', res);
  } catch (err) {
    console.log('sendNotification error:', err);
  }
};

export const sendMulticast = async (message: admin.messaging.MulticastMessage): Promise<void> => {
  try {
    await admin.messaging().sendMulticast(message);
  } catch (err) {
    console.log('sendMulticast error:', err);
  }
};

export const sendAll = async (messages: admin.messaging.Message[]): Promise<void> => {
  try {
    await admin.messaging().sendAll(messages);
  } catch (err) {
    console.log('sendAll error:', err);
  }
};
