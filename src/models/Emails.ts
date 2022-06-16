import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface EmailsAttributes {
  id: number;
  from: string;
  to: string;
  inReplyTo: string;
  bodyPlain: string;
  contentType: string;
  destinationEmail: string;
  name: string;
  subject: string;
  gmailMessageId: string;
  gmailThreadId: string;
  emailSentTime: Date;
  isDeleted: boolean;
  isReaded: boolean;
  userId: string;
  ccRecipient: any;
  bccRecipient: any;
  recipient: any;
  emailBody: string;
  pingEmailId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type EmailsCreationAttributes = Pick<EmailsAttributes, 'id'>;

interface EmailsModel extends Model<EmailsAttributes, EmailsCreationAttributes>, EmailsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): EmailsModel;
};

const model = <ModelInstance>sequelize.define('email', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  destination_email: {
    type: DataTypes.STRING(1024),
    field: 'destination_email',
  },
  name: {
    type: DataTypes.STRING(1024),
  },
  subject: {
    type: DataTypes.TEXT,
  },
  gmailMessageId: {
    type: DataTypes.STRING(1024),
    field: 'gmail_message_id',
  },
  gmailThreadId: {
    type: DataTypes.STRING(1024),
    field: 'gmail_thread_id',
  },
  emailSentTime: {
    type: DataTypes.STRING,
    field: 'email_sent_time',
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  ccRecipient: {
    type: DataTypes.JSON,
    field: 'cc_recipient',
  },
  bccRecipient: {
    type: DataTypes.JSON,
    field: 'bcc_recipient',
  },
  recipient: {
    type: DataTypes.JSON,
  },
  emailBody: {
    type: DataTypes.TEXT,
    field: 'email_body',
  },
  ping_email_id: {
    type: DataTypes.UUID,
    field: 'ping_email_id',
  },
  isReaded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_on',
    defaultValue: new Date(),
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
