import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface LinksAttributes {
  id: number;
  link: string;
  emailId: string;
  isDeleted: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type LinksCreationAttributes = Pick<LinksAttributes, 'id'>;

interface LinksModel extends Model<LinksAttributes, LinksCreationAttributes>, LinksAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): LinksModel;
};

const model = <ModelInstance>sequelize.define('link', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  link: {
    type: DataTypes.TEXT,
  },
  emailId: {
    type: DataTypes.UUID,
    field: 'email_id',
    references: {
      model: 'emails',
      key: 'id',
    },
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
