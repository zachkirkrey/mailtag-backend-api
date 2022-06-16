import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface AccountSubscriptionAttributes {
  id: number;
  email: string;
  subscriptionId: string;
  planId: string;
  imgUrl: string;
  featureSet: any;
  paymentStatus: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AccountSubscriptionCreationAttributes = Pick<AccountSubscriptionAttributes, 'id'>;

interface AccountsModel
  extends Model<AccountSubscriptionAttributes, AccountSubscriptionCreationAttributes>,
    AccountSubscriptionAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): AccountsModel;
};

const model = <ModelInstance>sequelize.define('account_subscription', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(1024),
  },
  subscriptionId: {
    type: DataTypes.UUID,
    references: {
      model: 'subscription',
      key: 'id',
    },
  },
  planId: {
    type: DataTypes.STRING,
  },
  imgUrl: {
    type: DataTypes.STRING(1024),
  },
  featureSet: {
    type: DataTypes.JSON,
  },
  paymentStatus: {
    type: DataTypes.STRING(1024),
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

const PROTECTED_VALUES = [];

model.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  PROTECTED_VALUES.forEach((item) => delete values[item]);

  return values;
};

export default model;
