import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface ReadEmailSummaryAttributes {
  id: number;
  count: number;
  name: string;
  imgUrl: string;
  email: string;
  subject: string;
  threadId: string;
  emailId: string;
  messageId: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ReadEmailSummaryCreationAttributes = Pick<ReadEmailSummaryAttributes, 'id'>;

interface ReadEmailSummaryModel
  extends Model<ReadEmailSummaryAttributes, ReadEmailSummaryCreationAttributes>,
    ReadEmailSummaryAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): ReadEmailSummaryModel;
};

const model = <ModelInstance>sequelize.define('read_email_summary', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  count: {
    type: DataTypes.DOUBLE,
  },
  name: {
    type: DataTypes.STRING,
  },
  imgUrl: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  subject: {
    type: DataTypes.STRING,
  },
  threadId: {
    type: DataTypes.STRING,
  },
  emailId: {
    type: DataTypes.UUID,
    field: 'email_id',
  },
  messageId: {
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
