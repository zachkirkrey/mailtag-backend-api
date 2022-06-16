import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface SettingsAttributes {
  id: number;
  stripeKey: string;
  captchaSecretKey: string;
  segmentKey: string;
  monthlyPlanId: number;
  annuallyPlanId: number;
  AWSaccessKeyId: string;
  AWSsecretAccessKey: string;
  paypalClientId: string;
  isDeleted: boolean;
  isAppConfig: boolean;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SettingsCreationAttributes = Pick<SettingsAttributes, 'id'>;

interface SettingsModel extends Model<SettingsAttributes, SettingsCreationAttributes>, SettingsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): SettingsModel;
};

const model = <ModelInstance>sequelize.define('setting', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  stripeKey: {
    type: DataTypes.STRING(1024),
  },
  captchaSecretKey: {
    type: DataTypes.STRING(1024),
  },
  segmentKey: {
    type: DataTypes.STRING(1024),
  },
  monthlyPlanId: {
    type: DataTypes.UUID,
  },
  annuallyPlanId: {
    type: DataTypes.UUID,
  },
  AWSaccessKeyId: {
    type: DataTypes.STRING(1024),
  },
  AWSsecretAccessKey: {
    type: DataTypes.STRING(1024),
  },
  paypalClientId: {
    type: DataTypes.STRING(1024),
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
