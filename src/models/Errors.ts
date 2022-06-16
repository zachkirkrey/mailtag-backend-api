import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface ErrorsAttributes {
  id: number;
  code: string;
  message: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ErrorsCreationAttributes = Pick<ErrorsAttributes, 'id'>;

interface SettingsModel extends Model<ErrorsAttributes, ErrorsCreationAttributes>, ErrorsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): SettingsModel;
};

const model = <ModelInstance>sequelize.define('error', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING(1024),
  },
  message: {
    type: DataTypes.STRING(1024),
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
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
