import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface ActivitiesAttributes {
  id: number;
  type: string;
  typeId: string;
  status: string;
  name: string;
  destinationEmail: string;
  userId: string;
  isDeleted: boolean;
  emailId: string;
  username: string;
  emailSubject: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ActivitiesCreationAttributes = Pick<ActivitiesAttributes, 'id'>;

interface ActivitiesModel extends Model<ActivitiesAttributes, ActivitiesCreationAttributes>, ActivitiesAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): ActivitiesModel;
};

const model = <ModelInstance>sequelize.define('activity', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  email: DataTypes.STRING,

  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  type: {
    type: DataTypes.STRING(50),
  },
  typeId: {
    type: DataTypes.UUID,
    field: 'type_id',
  },
  status: {
    type: DataTypes.STRING(1024),
  },
  name: {
    type: DataTypes.STRING(1024),
  },
  destinationEmail: {
    field: 'destination_email',
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
  emailId: {
    type: DataTypes.UUID,
    field: 'email_id',
  },
  username: {
    type: DataTypes.STRING(1024),
  },

  emailSubject: {
    type: DataTypes.STRING(1024),
    field: 'email_subject',
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
