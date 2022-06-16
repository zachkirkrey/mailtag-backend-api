import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface ReferralCodesAttributes {
  id: number;
  referralCode: string;
  userId: string;
  isDeleted: boolean;
  type: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ReferralCodesCreationAttributes = Pick<ReferralCodesAttributes, 'id'>;

interface ReferralCodesModel
  extends Model<ReferralCodesAttributes, ReferralCodesCreationAttributes>,
    ReferralCodesAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): ReferralCodesModel;
};

const model = <ModelInstance>sequelize.define('referral_code', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  referralCode: {
    type: DataTypes.STRING(255),
    field: 'referral_code',
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  type: {
    type: DataTypes.STRING(1024),
  },
  email: {
    type: DataTypes.STRING(1024),
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
