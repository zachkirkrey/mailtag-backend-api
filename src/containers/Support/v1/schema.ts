import Joi from '@hapi/joi';
import joi from '@hapi/joi';
import { ROUTES } from './types';

const objects = {
  id: joi.number(),
  name: joi.string(),
  attachmentId: Joi.number(),
  desktopNotification: Joi.number(),
  emailNotification: Joi.number(),
  reminders: Joi.number(),
  linkTracking: Joi.number(),
  clickNotification: Joi.number(),
  dailyReport: Joi.number(),
  bcc: Joi.string().email(),
  removeAds: Joi.number(),
  enableMailtag: Joi.number(),
  scheduledConfirmation: Joi.number(),
  subDomain: Joi.string().email(),
  emailDomain: Joi.string(),
  boomerang: Joi.string(),
  attachmentTracking: Joi.number(),
  signature: Joi.number(),
  signaturePings: Joi.number(),
  subject: Joi.string(),
  message: Joi.string(),
  gRecaptchaResponse: Joi.string(),
  utmSource: Joi.string(),
  token: Joi.string(),
  email: Joi.string().email(),
  rating: Joi.number(),
  link: Joi.string(),
  emailId: Joi.number(),
  createdOn: Joi.date(),
  isDeleted: Joi.boolean(),
  linkEventCollection: Joi.string(),
  eventName: Joi.string(),
  type: Joi.string(),
  title: Joi.string(),
  priority: Joi.number(),
  iconUrl: Joi.string(),
  check: Joi.boolean(),
  signatureId: Joi.number(),
  eventData: joi.object({
    emailAddress: joi.string().email(),
  }),
};

const keysTypes = [...Object.keys(objects), ...Object.keys(objects).map((key) => `${key}?`)];

const generateSchema = (keys: typeof keysTypes) => {
  const schema = {};

  keys.forEach((key) => {
    if (objects[key]) {
      schema[key] = objects[key].required();
    }
    if (key.charAt(key.length - 1) === '?' && objects[key.slice(0, -1)]) {
      schema[key.slice(0, -1)] = objects[key.slice(0, -1)];
    }
  });

  return schema;
};

const schema: { [key in keyof typeof ROUTES]: joi.ObjectSchema } = {
  getAttachmentEventById: joi.object({
    params: generateSchema(['attachmentId']),
  }),

  putPreferences: joi.object({
    body: generateSchema([
      'desktopNotification',
      'emailNotification',
      'reminders',
      'linkTracking',
      'clickNotification',
      'dailyReport',
      'bcc',
      'removeAds',
      'enableMailtag',
      'scheduledConfirmation',
      'subDomain',
      'emailDomain',
      'boomerang',
      'attachmentTracking',
      'signature',
      'signaturePings',
    ]),
  }),

  putMobileNotificationPreferences: joi.object({
    body: generateSchema([
      'desktopNotification',
      'emailNotification',
      'reminders',
      'linkTracking',
      'clickNotification',
      'dailyReport',
      'bcc',
      'removeAds',
      'enableMailtag',
      'scheduledConfirmation',
      'subDomain',
      'emailDomain',
      'boomerang',
      'attachmentTracking',
      'signature',
      'signaturePings',
    ]),
  }),

  postSupport: joi.object({
    body: generateSchema(['subject', 'message', 'gRecaptchaResponse']),
  }),

  postHomePageClickCall: joi.object({
    body: generateSchema(['utmSource']),
  }),

  putUpdateCardDetails: joi.object({
    body: generateSchema(['token']),
  }),

  postAddFeedback: joi.object({
    body: generateSchema(['email', 'rating', 'message']),
  }),

  postRaiseTicket: joi.object({
    body: generateSchema(['subject', 'email', 'name', 'message']),
  }),

  postchromeStoreLinkClicked: joi.object({
    body: generateSchema(['id', 'link', 'emailId', 'createdOn', 'isDeleted', 'linkEventCollection']),
  }),

  postSegmentAnalytics: joi.object({
    body: generateSchema(['eventName', 'eventData']),
  }),

  postAddFreeTrial10thFeedback: joi.object({
    body: generateSchema(['email', 'rating', 'message']),
  }),

  postMobilePushNotification: joi.object({
    body: generateSchema(['type', 'title', 'message', 'priority', 'iconUrl']),
  }),

  postBlog: joi.object({
    body: generateSchema(['check']),
  }),

  postSetDefaultSignature: joi.object({
    body: generateSchema(['signatureId']),
  }),
};

export default schema;
