import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface SendEmailAttributes {
  id: number;
  name: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  attachment: any;
  bcc: string;
  replyTo: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SendEmailCreationAttributes = Pick<SendEmailAttributes, 'id'>;

interface SendEmailSummaryModel extends Model<SendEmailAttributes, SendEmailCreationAttributes>, SendEmailAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): SendEmailSummaryModel;
};

const model = <ModelInstance>sequelize.define('send_email', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(1024),
  },
  from: {
    type: DataTypes.STRING,
  },
  to: {
    type: DataTypes.STRING,
  },
  subject: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING,
  },
  html: {
    type: DataTypes.STRING,
  },
  attachment: {
    type: DataTypes.JSON,
  },
  bcc: {
    type: DataTypes.STRING,
  },
  replyTo: {
    type: DataTypes.STRING,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
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
