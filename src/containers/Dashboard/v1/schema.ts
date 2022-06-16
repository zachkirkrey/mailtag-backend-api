import Joi from '@hapi/joi';
import joi from '@hapi/joi';
import { ROUTES } from './types';

const objects = {
  id: joi.number(),
  name: joi.string(),
  pingSequenceId: Joi.number(),
  searchCriteria: Joi.object(),
  cardNumber: Joi.number(),
  expirationDate: Joi.string(),
  cvc: Joi.number(),
  promoCode: Joi.string(),
  billedAmount: Joi.number(),
  isAnnual: Joi.boolean(),
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
  postSelectPlan: joi.object({
    body: generateSchema(['cardNumber', 'expirationDate', 'cvc', 'promoCode', 'billedAmount', 'isAnnual']),
  }),

  getGraphData: joi.object({
    body: generateSchema(['searchCriteria']),
  }),

  getSignatureById: joi.object({
    params: generateSchema(['id']),
  }),

  getShowSpecificSentEmailById: joi.object({
    params: generateSchema(['id']),
  }),

  getPingSequenceDetailsById: joi.object({
    params: generateSchema(['pingSequenceId']),
  }),

  getStopPingEmailById: joi.object({
    params: generateSchema(['id']),
  }),

  getShowSpecificSentPingById: joi.object({
    params: generateSchema(['id']),
  }),
};

export default schema;
