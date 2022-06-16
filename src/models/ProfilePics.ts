import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface ProfilePicsAttributes {
  id: number;
  userEmail: string;
  userImage: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProfilePicsCreationAttributes = Pick<ProfilePicsAttributes, 'id'>;

interface ProfilePicsModel extends Model<ProfilePicsAttributes, ProfilePicsCreationAttributes>, ProfilePicsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): ProfilePicsModel;
};

const model = <ModelInstance>sequelize.define('profile_pic', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  userEmail: {
    type: DataTypes.STRING(1024),
    field: 'user_email',
  },
  userImage: {
    type: DataTypes.TEXT,
    field: 'user_image',
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
