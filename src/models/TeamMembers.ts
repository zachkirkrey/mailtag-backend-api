import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface TeamMembersAttributes {
  id: number;
  teamId: string;
  email: string;
  isDeleted: boolean;
  isAccepted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TeamMembersCreationAttributes = Pick<TeamMembersAttributes, 'id'>;

interface TeamMembersModel extends Model<TeamMembersAttributes, TeamMembersCreationAttributes>, TeamMembersAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): TeamMembersModel;
};

const model = <ModelInstance>sequelize.define('team_members', {
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
    field: 'team_id',
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
