import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface TeamAdminsAttributes {
  id: number;
  teamId: string;
  email: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TeamAdminsCreationAttributes = Pick<TeamAdminsAttributes, 'id'>;

interface TeamAdminsModel extends Model<TeamAdminsAttributes, TeamAdminsCreationAttributes>, TeamAdminsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): TeamAdminsModel;
};

const model = <ModelInstance>sequelize.define('team_admins', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  teamId: {
    type: DataTypes.UUID,
    field: 'created_on',
  },
  email: {
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
