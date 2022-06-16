import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface ReadEmailAttributes {
  id: number;
  name: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  attachment: any;
  bcc: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ReadEmailCreationAttributes = Pick<ReadEmailAttributes, 'id'>;

interface ReadEmailModel extends Model<ReadEmailAttributes, ReadEmailCreationAttributes>, ReadEmailAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): ReadEmailModel;
};

const model = <ModelInstance>sequelize.define('read_email', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(1024),
  },
  from: {
    type: DataTypes.STRING,
  },
  to: {
    type: DataTypes.STRING,
  },
  subject: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING,
  },
  html: {
    type: DataTypes.STRING,
  },
  attachment: {
    type: DataTypes.JSON,
  },
  bcc: {
    type: DataTypes.STRING,
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
