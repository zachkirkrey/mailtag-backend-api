import Joi from '@hapi/joi';
import joi from '@hapi/joi';
import { ROUTES } from './types';

const objects = {
  id: joi.number(),
  username: joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  random: Joi.string(),
  createdOn: Joi.date(),
  isDeleted: Joi.boolean(),
  accountId: Joi.number(),
  preferredLanguage: Joi.string(),
  timezone: Joi.string(),
  country: Joi.string(),
  referralCode: Joi.string(),
  imageUrl: Joi.string(),
  gmailAccessTokenData: Joi.string(),
  facebookAccessTokenData: Joi.string(),
  twitterAccessTokenData: Joi.string(),
  buildNumber: Joi.number(),
  utmSource: Joi.string(),
  team: Joi.string(),
  emailsSent: Joi.boolean(),
  publicKey: Joi.string(),
  token: Joi.string(),
  endpoint: Joi.string(),
  browserName: Joi.string(),
  teamId: Joi.number(),
  itemsNames: Joi.alternatives().try(Joi.array().min(1).items(Joi.string().trim()), Joi.string().trim()),
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
  register: joi.object({
    body: generateSchema([
      'id',
      'username',
      'email',
      'password',
      'random',
      'createdOn',
      'isDeleted',
      'accountId',
      'preferredLanguage',
      'timezone',
      'country',
      'referralCode',
      'imageUrl',
      'gmailAccessTokenData',
      'facebookAccessTokenData',
      'twitterAccessTokenData',
      'buildNumber',
      'utmSource',
      'team',
      'emailsSent',
    ]),
  }),

  login: joi.object({
    body: generateSchema(['username', 'email', 'password']),
  }),

  getProfilePicByEmail: joi.object({
    params: generateSchema(['email']),
  }),

  putUpdateUser: joi.object({
    body: generateSchema(['username', 'timezone', 'preferredLanguage', 'country']),
  }),

  postDeletingUser: joi.object({
    body: generateSchema(['itemsNames']),
  }),

  getDeletingUserById: joi.object({
    params: generateSchema(['id']),
  }),

  postUserDevice: joi.object({
    body: generateSchema(['publicKey', 'token', 'endpoint', 'browserName']),
  }),

  postMobileUserDevice: joi.object({
    body: generateSchema(['publicKey', 'token', 'endpoint', 'browserName']),
  }),

  postMobileUserData: joi.object({
    body: generateSchema([
      'id',
      'username',
      'email',
      'password',
      'random',
      'createdOn',
      'isDeleted',
      'accountId',
      'preferredLanguage',
      'timezone',
      'country',
      'referralCode',
      'imageUrl',
      'gmailAccessTokenData',
      'facebookAccessTokenData',
      'twitterAccessTokenData',
      'buildNumber',
      'utmSource',
      'team',
      'emailsSent',
    ]),
  }),

  postSetAdmin: joi.object({
    body: generateSchema(['email', 'teamId']),
  }),
};

export default schema;
