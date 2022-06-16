import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface PingEmailSendAttributes {
  id: number;
  from: string;
  fromUserName: string;
  to: string;
  toUserName: string;
  subject: any;
  html: string;
  message: string;
  references: string;
  inReplyTo: string;
  messageId: string;
  cc: string;
  bcc: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AccountSubscriptionCreationAttributes = Pick<PingEmailSendAttributes, 'id'>;

interface PingEmailSendModel
  extends Model<PingEmailSendAttributes, AccountSubscriptionCreationAttributes>,
    PingEmailSendAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): PingEmailSendModel;
};

const model = <ModelInstance>sequelize.define('ping_email_send', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  from: {
    type: DataTypes.STRING(1024),
  },
  fromUserName: {
    type: DataTypes.STRING,
  },
  to: {
    type: DataTypes.STRING,
  },
  toUserName: {
    type: DataTypes.STRING,
  },
  subject: {
    type: DataTypes.STRING,
  },
  html: {
    type: DataTypes.STRING,
  },
  message: {
    type: DataTypes.STRING,
  },
  references: {
    type: DataTypes.STRING,
  },
  inReplyTo: {
    type: DataTypes.STRING,
  },
  messageId: {
    type: DataTypes.STRING,
  },
  cc: {
    type: DataTypes.STRING,
  },
  bcc: {
    type: DataTypes.STRING,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
    defaultValue: false,
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

export default model;
