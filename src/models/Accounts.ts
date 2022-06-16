import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface AccountsAttributes {
  id: number;
  isDeleted: boolean;
  //   created_on: Date;
  //   updated_on: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AccountsCreationAttributes = Pick<AccountsAttributes, 'id'>;

interface AccountsModel extends Model<AccountsAttributes, AccountsCreationAttributes>, AccountsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): AccountsModel;
};

const model = <ModelInstance>sequelize.define('account', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
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
