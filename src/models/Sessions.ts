import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface SessionsAttributes {
  id: number;
  authToken: string;
  timestamp: string;
  isExpired: boolean;
  expiredOn: boolean;
  random: number;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SessionsCreationAttributes = Pick<SessionsAttributes, 'id'>;

interface SessionsModel extends Model<SessionsAttributes, SessionsCreationAttributes>, SessionsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): SessionsModel;
};

const model = <ModelInstance>sequelize.define('session', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  authToken: {
    type: DataTypes.STRING(1024),
  },
  timestamp: {
    type: DataTypes.STRING,
  },
  isExpired: {
    type: DataTypes.BOOLEAN,
    field: 'is_expired',
  },
  random: {
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  expiredOn: {
    type: DataTypes.DATE,
    field: 'expired_on',
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
