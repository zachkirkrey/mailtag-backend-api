import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface SignaturesAttributes {
  id: number;
  email: string;
  userId: number;
  index: number;
  html: boolean;
  template: string;
  isDeleted: any;
  data: boolean;
  name: string;
  defaultSignature: boolean;
  image: boolean;
  imageShape: string;
  position: string;
  companyName: string;
  websiteLink: string;
  physicalOfficeAddress: string;
  officePhoneNumber: string;
  mobilePhoneNumber: string;
  scheduleUrl: string;
  banner: string;
  bannerWidth: number;
  bannerHeight: number;
  bannerLinkUrl: string;
  color: string;
  socialMediaLinks: [];
  createdAt?: Date;
  updatedAt?: Date;
}

export type SignaturesCreationAttributes = Pick<SignaturesAttributes, 'id'>;

interface SignaturesModel extends Model<SignaturesAttributes, SignaturesCreationAttributes>, SignaturesAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): SignaturesModel;
};

const model = <ModelInstance>sequelize.define('signature', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(1024),
  },
  index: {
    type: DataTypes.INTEGER,
  },
  html: {
    type: DataTypes.TEXT,
  },
  template: {
    type: DataTypes.TEXT,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  data: {
    type: DataTypes.JSON,
  },
  name: {
    type: DataTypes.STRING(255),
  },
  defaultSignature: {
    type: DataTypes.BOOLEAN,
    field: 'default_signature',
  },
  image: {
    type: DataTypes.TEXT,
  },
  imageShape: {
    type: DataTypes.STRING(1024),
  },
  position: {
    type: DataTypes.STRING(1024),
  },
  companyName: {
    type: DataTypes.STRING(1024),
  },
  websiteLink: {
    type: DataTypes.STRING(255),
  },
  physicalOfficeAddress: {
    type: DataTypes.STRING(255),
  },
  officePhoneNumber: {
    type: DataTypes.STRING(1024),
  },
  mobilePhoneNumber: {
    type: DataTypes.STRING(1024),
  },
  scheduleUrl: {
    type: DataTypes.STRING(255),
  },
  banner: {
    type: DataTypes.STRING(255),
  },
  bannerWidth: {
    type: DataTypes.INTEGER,
  },
  bannerHeight: {
    type: DataTypes.INTEGER,
  },
  bannerLinkUrl: {
    type: DataTypes.STRING(255),
  },
  color: {
    type: DataTypes.STRING(1024),
  },
  socialMediaLinks: {
    type: DataTypes.ARRAY(DataTypes.STRING(255)),
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
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
