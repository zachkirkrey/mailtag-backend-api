import dotenv from 'dotenv';
import validator from './validator';
dotenv.config();
import path from 'path';

const config = {
  ENV: process.env.ENV,
  JWT_SECRET: process.env.JWT_SECRET || '',
  PORT: process.env.PORT || 3000,
  GOOGLE_API: process.env.GOOGLE_API || '',
  STRIPE_KEY: process.env.STRIPE_SECRET_KEY,
  APP_ROOT: path.resolve('./'),
  CHROME_EXECUTABLE_PATH: process.env.CHROME_EXECUTABLE_PATH,
  DATABASE: {
    NAME: process.env.DB_NAME || '',
    HOST: process.env.DB_HOST || '',
    USERNAME: process.env.DB_USERNAME || '',
    PASSWORD: process.env.DB_PASSWORD || '',
    PORT: process.env.DB_PORT || '',
  },
  MAIL: {
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || '',
    SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || '',
  },
  SMS: {},
  LOGGER: {},
  AWS: {
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    REGION: process.env.AWS_REGION,
    URL: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`,
  },

  IP: {
    IP_DATA_KEY: process.env.IP_DATA_KEY,
  },
};

validator(config);
export default config;
