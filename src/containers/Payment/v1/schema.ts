import Joi from '@hapi/joi';
import joi from '@hapi/joi';
import { ROUTES } from './types';

const objects = {
  id: joi.number(),
  name: joi.string(),
  couponCode: Joi.string(),
  duration: Joi.string(),
  planId: Joi.number(),
  teamId: Joi.number(),
  plan: Joi.string(),
  token: Joi.string(),
  referral: Joi.string(),
  tagId: Joi.string(),
  email: Joi.string().email(),
  switchEmail: Joi.string().email(),
  password: Joi.string(),
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
  postCreatingCoupon: joi.object({
    body: generateSchema(['couponCode', 'duration']),
  }),

  postCoupon: joi.object({
    body: generateSchema(['couponCode', 'duration']),
  }),

  postPlanSwitch: joi.object({
    body: generateSchema(['planId']),
  }),

  postSubscribeTeam: joi.object({
    body: generateSchema(['teamId', 'plan', 'token', 'duration', 'couponCode']),
  }),

  postSubscribeTeamPaypal: joi.object({
    body: generateSchema(['teamId', 'plan', 'duration', 'couponCode']),
  }),

  postSubscriptionPaypal: joi.object({
    body: generateSchema(['plan', 'planId', 'couponCode', 'duration', 'referral']),
  }),

  postSubscription: joi.object({
    body: generateSchema(['plan', 'planId', 'token', 'couponCode', 'duration', 'referral']),
  }),

  postSubscriptionWebhook: joi.object({
    body: generateSchema(['name', 'tagId']),
  }),

  postCheckSubscription: joi.object({
    body: generateSchema(['email']),
  }),

  postCancelSubscription: joi.object({
    body: generateSchema(['email']),
  }),

  postSwitchSubscription: joi.object({
    body: generateSchema(['email', 'switchEmail', 'password']),
  }),

  deleteSubscription: joi.object({
    params: generateSchema(['id']),
  }),

  postPaypalWebhookPaymentCaptureCompleted: joi.object({
    body: generateSchema(['name', 'tagId']),
  }),
};

export default schema;
