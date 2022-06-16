import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface DateRangeAttributes {
  id: number;
  startDate: Date;
  endDate: Date;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type DateRangeCreationAttributes = Pick<DateRangeAttributes, 'id'>;

interface AccountsModel extends Model<DateRangeAttributes, DateRangeCreationAttributes>, DateRangeAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): AccountsModel;
};

const model = <ModelInstance>sequelize.define('date_range', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  startDate: {
    type: DataTypes.DATE,
    field: 'start_date',
  },
  endDate: {
    type: DataTypes.DATE,
    field: 'end_date',
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
