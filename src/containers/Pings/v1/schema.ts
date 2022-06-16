import Joi from '@hapi/joi';
import joi from '@hapi/joi';
import { ROUTES } from './types';

const objects = {
  id: joi.number(),
  name: joi.string(),
  pingSequenceId: Joi.number(),
  day: Joi.number(),
  step: Joi.number(),
  html: Joi.string(),
  isDeleted: Joi.boolean(),
  pingName: Joi.string(),
  destinationEmail: Joi.string().email(),
  subject: Joi.string(),
  gmailMessageId: Joi.number(),
  gmailThreadId: Joi.number(),
  emailSentTime: Joi.date(),
  userId: Joi.number(),
  ccRecipient: Joi.string().email(),
  bccRecipient: Joi.string().email(),
  recipient: Joi.string(),
  status: Joi.string(),
  sender: Joi.string(),
  deliveryStatus: Joi.string(),
  domain: Joi.string().email(),
  draftId: Joi.number(),
  ccRecipientArray: Joi.array(),
  bccRecipientArray: Joi.array(),
  recipientArray: Joi.array(),
  email: Joi.string().email(),
  created: Joi.date(),
  count: Joi.number(),
  emailId: Joi.number(),
  threadId: Joi.number(),
  messageId: Joi.number(),
  imgUrl: Joi.array(),
  pingSequenceName: Joi.string(),
  numberOfPings: Joi.number(),
  sequenceDuration: Joi.number(),
  recipientsTimezone: Joi.string(),
  sendPingWeekDays: Joi.any(),
  isSendPingTime: Joi.boolean(),
  sendPingStartTime: Joi.string(),
  sendPingEndTime: Joi.string(),
  isSendPingOnSpecialHolidays: Joi.boolean(),
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
  getPingSequenceDetailsById: joi.object({
    params: generateSchema(['pingSequenceId']),
  }),

  postPingSequenceDetails: Joi.object({
    body: generateSchema(['day', 'step', 'html', 'isDeleted', 'pingName']),
  }),

  putPingSequenceDetails: Joi.object({
    body: generateSchema(['id', 'day', 'step', 'html', 'isDeleted', 'pingName']),
  }),

  putPingSequenceSettings: Joi.object({
    body: generateSchema([
      'pingSequenceName',
      'numberOfPings',
      'sequenceDuration',
      'recipientsTimezone',
      'sendPingWeekDays',
      'isSendPingTime',
      'sendPingStartTime',
      'sendPingEndTime',
      'isSendPingOnSpecialHolidays',
    ]),
  }),

  postPingSequenceSettings: Joi.object({
    body: generateSchema([
      'pingSequenceName',
      'numberOfPings',
      'sequenceDuration',
      'recipientsTimezone',
      'sendPingWeekDays',
      'isSendPingTime',
      'sendPingStartTime',
      'sendPingEndTime',
      'isSendPingOnSpecialHolidays',
    ]),
  }),

  getPingSequenceById: Joi.object({
    params: generateSchema(['id']),
  }),

  postPingEmail: Joi.object({
    body: generateSchema([
      'id',
      'destinationEmail',
      'subject',
      'gmailMessageId',
      'gmailThreadId',
      'emailSentTime',
      'pingName',
      'userId',
      'ccRecipient',
      'bccRecipient',
      'recipient',
      'isDeleted',
    ]),
  }),

  postPingEmailMg: Joi.object({
    body: generateSchema([
      'id',
      'destinationEmail',
      'subject',
      'gmailMessageId',
      'gmailThreadId',
      'status',
      'userId',
      'ping_sequence_id',
      'isDeleted',
    ]),
  }),

  postStopPingEmail: Joi.object({
    body: generateSchema(['id']),
  }),

  postStopPingEmailMg: Joi.object({
    body: generateSchema(['id']),
  }),

  postTemporaryEmailBouncesWebhook: Joi.object({
    body: generateSchema(['sender', 'recipient', 'deliveryStatus', 'domain']),
  }),

  deletePingEmail: Joi.object({
    body: generateSchema(['id']),
  }),

  postPingSequenceDetails: Joi.object({
    body: generateSchema(['id', 'day', 'step', 'html', 'isDeleted', 'pingName']),
  }),

  deletePingSequence: Joi.object({
    body: generateSchema(['id']),
  }),

  postSendPingPreviewEmail: Joi.object({
    body: generateSchema(['id', 'day', 'step', 'html', 'isDeleted', 'pingName']),
  }),

  postPingEmailByDraftId: Joi.object({
    body: generateSchema([
      'destinationEmail',
      'name',
      'subject',
      'draftId',
      'ccRecipientArray',
      'bccRecipientArray',
      'recipientArray',
      'pingSequenceId',
    ]),
  }),

  postPingsDetail: Joi.object({
    body: generateSchema(['id']),
  }),

  postMobilePingEmails: Joi.object({
    body: generateSchema([
      'id',
      'destinationEmail',
      'subject',
      'gmailMessageId',
      'gmailThreadId',
      'emailSentTime',
      'pingName',
      'userId',
      'ccRecipient',
      'bccRecipient',
      'recipient',
      'isDeleted',
    ]),
  }),

  postMobileSearchPingEmailSummary: Joi.object({
    body: generateSchema([
      'email',
      'name',
      'created',
      'count',
      'subject',
      'emailId',
      'threadId',
      'messageId',
      'imgUrl',
    ]),
  }),

  postCustomDomainPings: Joi.object({
    body: generateSchema(['domain']),
  }),

  getPingSequenceListByOffset: Joi.object({
    params: generateSchema(['offset']),
  }),

  deletePingSequenceDetails: joi.object({
    params: generateSchema(['id']),
  }),
};

export default schema;
