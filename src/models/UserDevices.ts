import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface UserDevicesAttributes {
  id: number;
  token: string;
  userId: string;
  userAgent: any;
  isDeleted: number;
  endpoint: string;
  publicKey: string;
  browserName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserDevicesCreationAttributes = Pick<UserDevicesAttributes, 'id'>;

interface UserDevicesModel extends Model<UserDevicesAttributes, UserDevicesCreationAttributes>, UserDevicesAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): UserDevicesModel;
};

const model = <ModelInstance>sequelize.define('user_device', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING(50),
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  userAgent: {
    type: DataTypes.JSON,
    field: 'user_agent',
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  endpoint: {
    type: DataTypes.TEXT,
  },
  publicKey: {
    type: DataTypes.TEXT,
    field: 'public_key',
  },
  browserName: {
    type: DataTypes.STRING(1024),
    field: 'browser_name',
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
