import Joi from '@hapi/joi';
import joi from '@hapi/joi';
import { ROUTES } from './types';

const objects = {
  id: Joi.number(),
  stripeKey: joi.string(),
  captchaSecretKey: joi.string(),
  segmentKey: Joi.string(),
  monthlyPlanId: Joi.number(),
  annuallyPlanId: Joi.number(),
  AWSaccessKeyId: Joi.string(),
  AWSsecretAccessKey: Joi.string(),
  paypalClientId: Joi.string(),
  statusCode: Joi.number(),
  message: Joi.string(),
  isAppConfig: Joi.boolean(),
  status: Joi.string(),
  isDeleted: Joi.boolean(),
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
  // CONFIG KEYS
  createConfigKeys: joi.object({
    body: generateSchema([
      'stripeKey',
      'captchaSecretKey',
      'segmentKey',
      'monthlyPlanId',
      'annuallyPlanId',
      'AWSaccessKeyId',
      'AWSsecretAccessKey',
      'paypalClientId',
      'isAppConfig',
      'isDeleted',
    ]),
  }),

  readConfigKeysById: joi.object({
    params: generateSchema(['id']),
  }),

  updateConfigKeys: joi.object({
    params: generateSchema(['id']),
    body: generateSchema([
      'stripeKey',
      'captchaSecretKey',
      'segmentKey',
      'monthlyPlanId',
      'annuallyPlanId',
      'AWSaccessKeyId',
      'AWSsecretAccessKey',
      'paypalClientId',
      'isAppConfig',
      'isDeleted',
    ]),
  }),

  removeConfigKeys: joi.object({
    params: generateSchema(['id']),
  }),

  // APP CONFIG KEYS
  createAppConfigKeys: joi.object({
    body: generateSchema([
      'stripeKey',
      'captchaSecretKey',
      'segmentKey',
      'monthlyPlanId',
      'annuallyPlanId',
      'AWSaccessKeyId',
      'AWSsecretAccessKey',
      'paypalClientId',
      'isAppConfig',
      'isDeleted',
    ]),
  }),

  readAppConfigKeysById: joi.object({
    params: generateSchema(['id']),
  }),

  updateAppConfigKeys: joi.object({
    params: generateSchema(['id']),
    body: generateSchema([
      'stripeKey',
      'captchaSecretKey',
      'segmentKey',
      'monthlyPlanId',
      'annuallyPlanId',
      'AWSaccessKeyId',
      'AWSsecretAccessKey',
      'paypalClientId',
      'isAppConfig',
      'isDeleted',
    ]),
  }),

  removeAppConfigKeys: joi.object({
    params: generateSchema(['id']),
  }),

  // ERRORS
  createError: joi.object({
    body: generateSchema(['message', 'status', 'isDeleted']),
  }),

  readErrorById: joi.object({
    params: generateSchema(['id']),
  }),

  updateError: joi.object({
    params: generateSchema(['id']),
    body: generateSchema(['message', 'status', 'isDeleted']),
  }),

  removeError: joi.object({
    params: generateSchema(['id']),
  }),
  readConfigKeys: undefined,
  readAppConfigKeys: undefined,
  readErrors: undefined
};

export default schema;
