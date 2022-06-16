import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface EmailEventsAttributes {
  id: number;
  emailReadTime: string;
  emailClickedDeviceName: string;
  emailId: string;
  isDeleted: boolean;
  userAgent: any;
  readRecipient: any;
  location: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export type EmailEventsCreationAttributes = Pick<EmailEventsAttributes, 'id'>;

interface EmailEventsModel extends Model<EmailEventsAttributes, EmailEventsCreationAttributes>, EmailEventsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): EmailEventsModel;
};

const model = <ModelInstance>sequelize.define('email_event', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  emailReadTime: {
    type: DataTypes.STRING,
    field: 'email_read_time',
  },
  emailClickedDeviceName: {
    type: DataTypes.STRING(1024),
    field: 'email_clicked_device_name',
  },
  emailId: {
    type: DataTypes.UUID,
    field: 'email_id',
    references: {
      model: 'emails',
      key: 'id',
    },
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  userAgent: {
    type: DataTypes.JSON,
    field: 'user_agent',
  },
  location: {
    type: DataTypes.JSON,
  },
  readRecipient: {
    type: DataTypes.STRING(1024),
    field: 'read_recipient',
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
