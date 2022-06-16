import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';
import bcrypt from 'bcrypt';
export interface UsersAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  isDeleted: boolean;
  random: number;
  timezone: string;
  preferredLanguage: string;
  country: string;
  referralCode: string;
  accountId: string;
  imageUrl: string;
  gmailAccessTokenData: any;
  facebookAccessTokenData: any;
  twitterAccessTokenData: any;
  utmSource: string;
  team: string;
  emailsSent: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UsersCreationAttributes = Pick<UsersAttributes, 'id'>;

interface UsersModel extends Model<UsersAttributes, UsersCreationAttributes>, UsersAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): UsersModel;
};

const model = <ModelInstance>sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  email: DataTypes.STRING,
  password: {
    type: DataTypes.STRING(1024),
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  random: {
    type: DataTypes.INTEGER,
  },
  timezone: {
    type: DataTypes.STRING(255),
  },
  preferredLanguage: {
    type: DataTypes.STRING(255),
    field: 'preferred_language',
  },
  country: {
    type: DataTypes.STRING(255),
  },
  referralCode: {
    type: DataTypes.STRING(255),
    field: 'referral_code',
  },
  accountId: {
    type: DataTypes.UUID,
    references: {
      model: 'accounts',
      key: 'id',
    },
    field: 'account_id',
  },
  imageUrl: {
    type: DataTypes.TEXT,
    field: 'image_url',
  },
  gmailAccessTokenData: {
    type: DataTypes.JSON,
    field: 'gmail_access_token_data',
  },
  facebookAccessTokenData: {
    type: DataTypes.JSON,
    field: 'facebook_access_token_data',
  },
  twitterAccessTokenData: {
    type: DataTypes.JSON,
    field: 'twitter_access_token_data',
  },
  utmSource: {
    type: DataTypes.STRING(255),
    field: 'utm_source',
  },
  team: {
    type: DataTypes.UUID,
  },
  emailsSent: {
    type: DataTypes.BOOLEAN,
    field: 'emails_sent',
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_on',
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_on',
  },
});

const PROTECTED_VALUES = [];

model.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  PROTECTED_VALUES.forEach((item) => delete values[item]);

  return values;
};

const insertHook = (user) => {
  if (user.password) {
    user.password = bcrypt.hashSync(user.password, 10);
  }
};

model.beforeCreate(insertHook);
model.beforeUpdate(insertHook);

export default model;
