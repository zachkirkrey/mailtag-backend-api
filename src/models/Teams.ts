import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface TeamsAttributes {
  id: number;
  userId: string;
  owner: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TeamsCreationAttributes = Pick<TeamsAttributes, 'id'>;

interface TeamsModel extends Model<TeamsAttributes, TeamsCreationAttributes>, TeamsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): TeamsModel;
};

const model = <ModelInstance>sequelize.define('team', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  owner: {
    type: DataTypes.STRING(1024),
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
