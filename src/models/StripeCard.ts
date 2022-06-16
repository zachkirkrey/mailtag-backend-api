import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface StripeCardAttributes {
  id: number;
  data: any;
  token: string;
  stripeCustomerId: string;
  cardId: string;
  object: any;
  addressCity: string;
  addressCountry: string;
  addressLine1: string;
  addressLine1Check: string;
  addressLine2: string;
  addressState: string;
  addressZip: string;
  addressZipCheck: string;
  brand: string;
  country: string;
  cvcCheck: string;
  dynamicLast4: string;
  expMonth: string;
  expYear: string;
  fingerprint: string;
  funding: string;
  last4: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type StripeCardCreationAttributes = Pick<StripeCardAttributes, 'id'>;

interface StripeCardModel extends Model<StripeCardAttributes, StripeCardCreationAttributes>, StripeCardAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): StripeCardModel;
};

const model = <ModelInstance>sequelize.define('stripe_card', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  data: {
    type: DataTypes.JSON,
  },
  token: {
    type: DataTypes.STRING,
  },
  stripeCustomerId: {
    type: DataTypes.STRING,
  },
  cardId: {
    type: DataTypes.STRING,
  },
  object: {
    type: DataTypes.JSON,
  },
  addressCity: {
    type: DataTypes.STRING,
  },
  addressCountry: {
    type: DataTypes.STRING,
  },
  addressLine1: {
    type: DataTypes.STRING,
  },
  addressLine1Check: {
    type: DataTypes.STRING,
  },
  addressLine2: {
    type: DataTypes.STRING,
  },
  addressState: {
    type: DataTypes.STRING,
  },
  addressZip: {
    type: DataTypes.STRING,
  },
  addressZipCheck: {
    type: DataTypes.STRING,
  },
  brand: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  cvcCheck: {
    type: DataTypes.STRING,
  },
  dynamicLast4: {
    type: DataTypes.STRING,
  },
  expMonth: {
    type: DataTypes.STRING,
  },
  expYear: {
    type: DataTypes.STRING,
  },
  fingerprint: {
    type: DataTypes.STRING,
  },
  funding: {
    type: DataTypes.STRING,
  },
  last4: {
    type: DataTypes.STRING,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
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
