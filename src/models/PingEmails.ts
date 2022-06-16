import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface PingEmailsAttributes {
  id: number;
  destinationEmail: string;
  name: string;
  subject: string;
  gmailMessageId: string;
  status: string;
  isDeleted: boolean;
  userId: string;
  pingSequenceId: string;
  recipient: any;
  domain: string;
  senderEmail: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PingEmailsCreationAttributes = Pick<PingEmailsAttributes, 'id'>;

interface PingEmailsModel extends Model<PingEmailsAttributes, PingEmailsCreationAttributes>, PingEmailsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): PingEmailsModel;
};

const model = <ModelInstance>sequelize.define('ping_email', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  destinationEmail: {
    field: 'destination_email',
    type: DataTypes.STRING(1024),
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
  status: {
    type: DataTypes.TEXT,
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
  pingSequenceId: {
    field: 'ping_sequence_id',
    type: DataTypes.UUID,
    references: {
      model: 'ping_sequences',
      key: 'id',
    },
  },
  senderEmail: {
    field: 'sender_email',
    type: DataTypes.STRING(1024),
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
