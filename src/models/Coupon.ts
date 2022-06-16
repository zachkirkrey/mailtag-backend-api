import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface CouponAttributes {
  id: number;
  email: string;
  coupon: string;
  stripeCoupon: string;
  percentageOff: number;
  repetitive: boolean;
  usedOn: Date;
  used: boolean;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CouponCreationAttributes = Partial<CouponAttributes>;

interface CouponModel extends Model<CouponAttributes, CouponCreationAttributes>, CouponAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): CouponModel;
};

const model = <ModelInstance>sequelize.define('coupon', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  email: DataTypes.STRING,
  coupon: DataTypes.STRING,
  repetitive: DataTypes.BOOLEAN,
  used: DataTypes.BOOLEAN,
  usedOn: {
    type: DataTypes.DATE,
    field: 'updated_on',
  },
  stripeCoupon: {
    type: DataTypes.STRING,
    field: 'stripe_coupon',
  },
  percentageOff: {
    type: DataTypes.INTEGER,
    field: 'percentage_off',
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
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
});

const PROTECTED_VALUES = [];

model.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  PROTECTED_VALUES.forEach((item) => delete values[item]);

  return values;
};

export default model;
