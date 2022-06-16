import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface SqsMessageAttributes {
  id: number;
  messageBody: string;
  queueUrl: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SqsMessageCreationAttributes = Pick<SqsMessageAttributes, 'id'>;

interface SqsMessageModel extends Model<SqsMessageAttributes, SqsMessageCreationAttributes>, SqsMessageAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): SqsMessageModel;
};

const model = <ModelInstance>sequelize.define('sqs_message_model', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  messageBody: {
    type: DataTypes.STRING(1024),
  },
  queueUrl: {
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
