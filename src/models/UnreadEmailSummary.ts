import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface UnreadEmailSummaryAttributes {
  id: number;
  name: string;
  email: string;
  imgUrl: string;
  subject: string;
  threadId: string;
  messageId: number;
  userId: string;
  isDeleted: boolean;
  createdAt?: Date;
}

export type UnreadEmailSummaryAttributesCreationAttributes = Pick<UnreadEmailSummaryAttributes, 'id'>;

interface UnreadEmailSummaryModel
  extends Model<UnreadEmailSummaryAttributes, UnreadEmailSummaryAttributesCreationAttributes>,
    UnreadEmailSummaryAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): UnreadEmailSummaryModel;
};

const model = <ModelInstance>sequelize.define('team', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  owner: {
    type: DataTypes.STRING(1024),
  },
  name: {
    type: DataTypes.STRING(1024),
  },
  email: {
    type: DataTypes.STRING(1024),
  },
  imgUrl: {
    type: DataTypes.STRING(1024),
  },
  subject: {
    type: DataTypes.STRING(1024),
  },
  threadId: {
    type: DataTypes.STRING(1024),
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  messageId: {
    type: DataTypes.UUID,
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
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
