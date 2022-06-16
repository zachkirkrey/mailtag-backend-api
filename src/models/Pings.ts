import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface PingsAttributes {
  id: number;
  pingEmail: string;
  pingSequenceActivityCollection: any;
  pingSequenceDetails: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type MilestoneEventsCreationAttributes = Partial<PingsAttributes>;

interface PingsModel extends Model<PingsAttributes, MilestoneEventsCreationAttributes>, PingsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): PingsModel;
};

const model = <ModelInstance>sequelize.define('pings', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  pingEmail: {
    type: DataTypes.STRING,
  },
  pingSequenceActivityCollection: {
    type: DataTypes.JSON,
  },
  pingSequenceDetails: {
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
