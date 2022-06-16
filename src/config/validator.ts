import joi from '@hapi/joi';

const schema = joi.object({
  ENV: joi.string().valid('dev', 'staging', 'prod').required(),
  JWT_SECRET: joi.string().required(),
  PORT: joi.string().required(),
  GOOGLE_API: joi.string().required(),
  STRIPE_KEY: joi.string().required(),
  APP_ROOT: joi.string().required(),
  CHROME_EXECUTABLE_PATH: joi.string().required(),
  DATABASE: joi.object({
    NAME: joi.string().required(),
    HOST: joi.string().required(),
    USERNAME: joi.string().required(),
    PASSWORD: joi.string().required(),
    PORT: joi.string().required(),
  }),
  MAIL: joi.object({
    NO_REPLY_EMAIL: joi.string().required(),
    SUPPORT_EMAIL: joi.string().required(),
  }),
  SMS: joi.object({}),
  LOGGER: joi.object({}),
  AWS: joi.object({
    ACCESS_KEY_ID: joi.string().required(),
    ACCESS_KEY: joi.string().required(),
    BUCKET_NAME: joi.string().required(),
    REGION: joi.string().required(),
    URL: joi.string().required(),
  }),
  IP: joi.object({
    IP_DATA_KEY: joi.string(),
  }),
});

export default (params) => {
  const { error } = schema.validate(params);
  if (error) {
    throw {
      error: 'src/config/validators.ts -> default -> .env validation failed',
      originalError: error,
    };
  }
};
