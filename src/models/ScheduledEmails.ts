import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface ScheduledEmailsAttributes {
  id: number;
  destinationEmail: string;
  name: string;
  subject: string;
  gmailDraftId: string;
  gmailThreadId: string;
  scheduledTime: string;
  status: string;
  isDeleted: boolean;
  userId: string;
  emailBody: string;
  senderEmail: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ScheduledEmailsCreationAttributes = Pick<ScheduledEmailsAttributes, 'id'>;

interface ScheduledEmailsModel
  extends Model<ScheduledEmailsAttributes, ScheduledEmailsCreationAttributes>,
    ScheduledEmailsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): ScheduledEmailsModel;
};

const model = <ModelInstance>sequelize.define('scheduled_email', {
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
  gmailDraftId: {
    type: DataTypes.STRING(1024),
    field: 'gmail_draft_id',
  },
  gmailThreadId: {
    type: DataTypes.STRING(1024),
    field: 'gmail_thread_id',
  },
  scheduledTime: {
    type: DataTypes.STRING(1024),
    field: 'scheduled_time',
  },
  status: {
    type: DataTypes.STRING(1024),
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
  emailBody: {
    type: DataTypes.TEXT,
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
