import Joi from '@hapi/joi';
import joi from '@hapi/joi';
import { ROUTES } from './types';

const objects = {
  id: joi.number(),
  signatureId: joi.number().required(),
  html: joi.string().required(),
  template: Joi.string().required(),
  data: Joi.string().required(),
  name: Joi.string().required(),
  image: Joi.string().required(),
  email: Joi.string().required(),
  emailId: Joi.number().required(),
  scheduleEmailId: Joi.number().required(),
  updateType: Joi.string().required(),
  scheduledDateObj: Joi.object().required(),
  isLinkTrackingEnabled: Joi.string().required(),
  isTrackingEnabled: Joi.string().required(),
  pingSequenceId: Joi.number().required(),
  imageShape: Joi.string().required(),
  position: Joi.string().required(),
  companyName: Joi.string().required(),
  websiteLink: Joi.string().required(),
  physicalOfficeAddress: Joi.string().required(),
  officePhoneNumber: Joi.string().required(),
  mobilePhoneNumber: Joi.string().required(),
  scheduleUrl: Joi.string().required(),
  banner: Joi.string().required(),
  bannerWidth: Joi.number().required(),
  bannerHeight: Joi.number().required(),
  bannerLinkUrl: Joi.string().required(),
  color: Joi.string().required(),
  socialMediaLinks: Joi.array(),
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
  // DOCUMENT APIS
  postSignature: joi.object({
    body: generateSchema([
      'image',
      'imageShape',
      'name',
      'position',
      'companyName',
      'email',
      'websiteLink',
      'physicalOfficeAddress',
      'officePhoneNumber',
      'mobilePhoneNumber',
      'scheduleUrl',
      'banner',
      'bannerWidth',
      'bannerHeight',
      'bannerLinkUrl',
      'color',
      'socialMediaLinks',
    ]),
  }),

  postScheduleCall: joi.object({
    body: generateSchema(['email']),
  }),

  postGettingSignatureData: joi.object({
    body: generateSchema(['signatureId']),
  }),

  postSignatureCalculator: joi.object({
    body: generateSchema(['html', 'template', 'data', 'name', 'image']),
  }),

  putSignatureCalculator: joi.object({
    body: generateSchema(['html', 'template', 'data', 'name', 'image']),
    params: generateSchema(['id']),
  }),

  deleteSignatureCalculator: joi.object({
    params: generateSchema(['id']),
  }),

  getSignatureEventById: joi.object({
    params: generateSchema(['emailId']),
  }),

  postSendEmailSignature: joi.object({
    body: generateSchema([
      'scheduleEmailId',
      'updateType',
      'scheduledDateObj',
      'isLinkTrackingEnabled',
      'isTrackingEnabled',
      'pingSequenceId',
    ]),
  }),
};

export default schema;
