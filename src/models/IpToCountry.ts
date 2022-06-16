import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface IpToCountryAttributes {
  id: number;
  ipFrom: string;
  ipTo: string;
  countryCode: string;
  countryName: string;
  regionName: string;
  cityName: string;
  latitude: number;
  longitude: number;
  zipCode: string;
  timezone: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IpToCountryCreationAttributes = Pick<IpToCountryAttributes, 'id'>;

interface LinkEventsModel extends Model<IpToCountryAttributes, IpToCountryCreationAttributes>, IpToCountryAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): LinkEventsModel;
};

const model = <ModelInstance>sequelize.define('ip_to_country', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  ipFrom: {
    type: DataTypes.STRING(1024),
  },
  ipTo: {
    type: DataTypes.STRING(1024),
  },
  countryCode: {
    type: DataTypes.STRING,
  },
  countryName: {
    type: DataTypes.STRING,
  },
  regionName: {
    type: DataTypes.STRING,
  },
  cityName: {
    type: DataTypes.STRING,
  },
  latitude: {
    type: DataTypes.DOUBLE,
  },
  longitude: {
    type: DataTypes.DOUBLE,
  },
  zipCode: {
    type: DataTypes.STRING,
  },
  timezone: {
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
