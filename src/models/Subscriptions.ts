import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface SubscriptionsAttributes {
  id: number;
  plan: string;
  planId: string;
  subscriptionId: string;
  customerId: string;
  paymentStatus: string;
  expiryDate: string;
  isDeleted: boolean;
  userId: string;
  isCancelled: boolean;
  featureSet: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SubscriptionsCreationAttributes = Pick<SubscriptionsAttributes, 'id'>;

interface SubscriptionsModel
  extends Model<SubscriptionsAttributes, SubscriptionsCreationAttributes>,
    SubscriptionsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): SubscriptionsModel;
};

const model = <ModelInstance>sequelize.define('subscription', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  plan: {
    type: DataTypes.STRING(50),
  },
  planId: {
    type: DataTypes.STRING(1024),
    field: 'plan_id',
  },
  subscriptionId: {
    type: DataTypes.STRING(1024),
    field: 'subscription_id',
  },
  customerId: {
    type: DataTypes.STRING(1024),
    field: 'customer_id',
  },
  paymentStatus: {
    type: DataTypes.STRING(1024),
    field: 'payment_status',
  },
  expiryDate: {
    type: DataTypes.STRING,
    field: 'created_on',
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  isCancelled: {
    type: DataTypes.BOOLEAN,
    field: 'is_cancelled',
  },
  featureSet: {
    type: DataTypes.STRING(1024),
    field: 'featureset',
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
