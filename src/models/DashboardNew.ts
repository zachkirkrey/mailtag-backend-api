import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';
import { double } from 'aws-sdk/clients/lightsail';

export interface DashboardNewAttributes {
  id: number;
  count: double;
  timeSpan: Date;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AccountSubscriptionCreationAttributes = Pick<DashboardNewAttributes, 'id'>;

interface DashboardNewModel
  extends Model<DashboardNewAttributes, AccountSubscriptionCreationAttributes>,
    DashboardNewAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): DashboardNewModel;
};

const model = <ModelInstance>sequelize.define('dashboard_new', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  count: {
    type: DataTypes.DOUBLE,
  },
  timeSpan: {
    type: DataTypes.DATE,
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
