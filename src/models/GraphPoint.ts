import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface GraphPointAttributes {
  id: number;
  count: number;
  limitOfSet: number;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type GraphPointCreationAttributes = Pick<GraphPointAttributes, 'id'>;

interface AccountsModel extends Model<GraphPointAttributes, GraphPointCreationAttributes>, GraphPointAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): AccountsModel;
};

const model = <ModelInstance>sequelize.define('graph_point', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  count: {
    type: DataTypes.DOUBLE,
  },
  limitOfSet: {
    type: DataTypes.DOUBLE,
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
