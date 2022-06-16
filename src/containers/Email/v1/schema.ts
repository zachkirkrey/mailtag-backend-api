import Joi from '@hapi/joi';
import joi from '@hapi/joi';
import { ROUTES } from './types';

const objects = {
  id: joi.number(),
  name: joi.string(),
  from: Joi.string().email(),
  to: Joi.string().email(),
  subject: Joi.string().email(),
  inReplyTo: Joi.string().email(),
  bodyPlain: Joi.string(),
  contentType: Joi.string(),
  destinationEmail: Joi.string().email(),
  gmailMessageId: Joi.string(),
  gmailThreadId: Joi.number(),
  emailSentTime: Joi.date(),
  createdOn: Joi.date(),
  isDeleted: Joi.boolean(),
  isReaded: Joi.boolean(),
  userId: Joi.string(),
  emailId: Joi.string(),
  email: Joi.string().email(),
  ccRecipient: Joi.any(),
  bccRecipient: Joi.any(),
  recipient: Joi.any(),
  emailEventCollection: Joi.array(),
  emailBody: Joi.string(),
  pingEmailId: Joi.string(),
  emailReadTime: Joi.string(),
  emailClickedDeviceName: Joi.string(),
  userAgent: Joi.any(),
  readRecipient: Joi.any(),
  location: Joi.any(),
  status: Joi.string(),
  pingSequenceId: Joi.string(),
  senderEmail: Joi.string(),
  date: Joi.date(),
  sender: Joi.string().email(),
  deliveryStatus: Joi.string(),
  domain: Joi.string(),
  emailList: Joi.any(),
  link: Joi.string(),
  linkClickedTime: Joi.string(),
  linkClickedDeviceName: Joi.string(),
  linkId: Joi.string(),
  clickRecipient: Joi.any(),
  message: Joi.string(),
  requestId: Joi.number(),
  trackCurrentMail: Joi.string().email(),
  draftId: Joi.number(),
  isSentCalled: Joi.boolean(),
  sentHandlerRetryCount: Joi.number(),
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
  // EMAILS
  createEmail: joi.object({
    body: generateSchema([
      'destinationEmail',
      'name',
      'subject',
      'gmailMessageId',
      'gmailThreadId',
      'emailSentTime',
      'isDeleted',
      'userId',
      'ccRecipient',
      'bccRecipient',
      'recipient',
      'emailBody',
      'pingEmailId',
      'isReaded',
    ]),
  }),

  readEmailById: joi.object({
    params: generateSchema(['id']),
  }),

  updateEmail: joi.object({
    body: generateSchema([
      'destinationEmail',
      'name',
      'subject',
      'gmailMessageId',
      'gmailThreadId',
      'emailSentTime',
      'isDeleted',
      'userId',
      'ccRecipient',
      'bccRecipient',
      'recipient',
      'emailBody',
      'pingEmailId',
      'isReaded',
    ]),
    params: generateSchema(['id']),
  }),

  removeEmail: joi.object({
    body: generateSchema(['id']),
  }),

  postEmailMg: joi.object({
    body: generateSchema(['from', 'to', 'subject', 'inReplyTo', 'bodyPlain', 'contentType']),
  }),

  getSentEmailByDate: joi.object({
    params: generateSchema(['date']),
  }),

  postMobileSearchReadEmailSummary: joi.object({
    body: generateSchema([
      'id',
      'destinationEmail',
      'name',
      'subject',
      'gmailMessageId',
      'gmailThreadId',
      'emailSentTime',
      'createdOn',
      'isDeleted',
      'userId',
      'emailEventCollection',
    ]),
  }),

  postmobileSearchUnreadEmailSummary: joi.object({
    body: generateSchema([
      'id',
      'destinationEmail',
      'name',
      'subject',
      'gmailMessageId',
      'gmailThreadId',
      'emailSentTime',
      'createdOn',
      'isDeleted',
      'userId',
      'emailEventCollection',
    ]),
  }),

  postSendInvitationEmailGmailContacts: joi.object({
    body: generateSchema(['emailList']),
  }),

  getReadEmailByDate: joi.object({
    params: generateSchema(['date']),
  }),

  postExtensionLinkSendEmail: joi.object({
    body: generateSchema(['email']),
  }),

  postCreateMailchimpUser: joi.object({
    body: generateSchema(['email']),
  }),

  postRefreshGmail: joi.object({
    body: generateSchema(['email']),
  }),

  // EMAIL EVENTS
  createEmailEvent: joi.object({
    body: generateSchema([
      'emailReadTime',
      'emailClickedDeviceName',
      'emailId',
      'isDeleted',
      'userAgent',
      'readRecipient',
      'location',
    ]),
  }),

  readEmailEventById: joi.object({
    params: generateSchema(['id']),
  }),

  updateEmailEvent: joi.object({
    body: generateSchema([
      'emailReadTime',
      'emailClickedDeviceName',
      'emailId',
      'isDeleted',
      'userAgent',
      'readRecipient',
      'location',
    ]),
    params: generateSchema(['id']),
  }),

  removeEmailEvent: joi.object({
    body: generateSchema(['id']),
  }),

  getDemoEmailEventByEmailId: joi.object({
    params: generateSchema(['emailId']),
  }),

  getEmailEventByEmailId: joi.object({
    params: generateSchema(['emailId']),
  }),

  // PING EMAILS
  createPingEmail: joi.object({
    body: generateSchema([
      'destinationEmail',
      'name',
      'subject',
      'gmailMessageId',
      'status',
      'isDeleted',
      'userId',
      'pingSequenceId',
      'senderEmail',
    ]),
  }),

  readPingEmailById: joi.object({
    params: generateSchema(['id']),
  }),

  updatePingEmail: joi.object({
    body: generateSchema([
      'destinationEmail',
      'name',
      'subject',
      'gmailMessageId',
      'status',
      'isDeleted',
      'userId',
      'pingSequenceId',
      'senderEmail',
    ]),
    params: generateSchema(['id']),
  }),

  removePingEmail: joi.object({
    body: generateSchema(['id']),
  }),

  postPermanentEmailBouncesWebhook: joi.object({
    body: generateSchema(['sender', 'recipient', 'deliveryStatus', 'domain']),
  }),

  putEmailByDraftById: joi.object({
    params: generateSchema(['id']),
    body: generateSchema([
      'message',
      'requestId',
      'trackCurrentMail',
      'subject',
      'draftId',
      'isSentCalled',
      'sentHandlerRetryCount',
    ]),
  }),

  // LINKS
  createLink: joi.object({
    body: generateSchema(['link', 'emailId', 'isDeleted']),
  }),

  readLinkById: joi.object({
    params: generateSchema(['id']),
  }),

  updateLink: joi.object({
    body: generateSchema(['link', 'emailId', 'isDeleted']),
    params: generateSchema(['id']),
  }),

  removeLink: joi.object({
    body: generateSchema(['id']),
  }),

  getOptimisedLinkSummaryByEmailId: joi.object({
    params: generateSchema(['emailId']),
  }),

  // LINK EVENTS
  createLinkEvent: joi.object({
    body: generateSchema([
      'linkClickedTime',
      'linkClickedDeviceName',
      'linkId',
      'clickRecipient',
      'isDeleted',
      'userAgent',
      'location',
    ]),
  }),

  readLinkEventById: joi.object({
    params: generateSchema(['id']),
  }),

  updateLinkEvent: joi.object({
    body: generateSchema([
      'linkClickedTime',
      'linkClickedDeviceName',
      'linkId',
      'clickRecipient',
      'isDeleted',
      'userAgent',
      'location',
    ]),
    params: generateSchema(['id']),
  }),

  removeLinkEvent: joi.object({
    body: generateSchema(['id']),
  }),
};

export default schema;
