import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface PingSequenceActivitiesAttributes {
  id: number;
  status: string;
  isDeleted: boolean;
  pingEmailId: string;
  userId: string;
  pingSequenceId: string;
  pingSequenceDetailsId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PingSequenceActivitiesCreationAttributes = Pick<PingSequenceActivitiesAttributes, 'id'>;

interface PingSequenceActivitiesModel
  extends Model<PingSequenceActivitiesAttributes, PingSequenceActivitiesCreationAttributes>,
    PingSequenceActivitiesAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): PingSequenceActivitiesModel;
};

const model = <ModelInstance>sequelize.define('ping_sequence_activity', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING(1024),
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  pingEmailId: {
    type: DataTypes.UUID,
    references: {
      model: 'ping_emails',
      key: 'id',
    },
    field: 'ping_email_id',
  },
  pingSequenceDetailsId: {
    type: DataTypes.UUID,
    references: {
      model: 'ping_sequence_details',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  pingSequenceId: {
    field: 'ping_sequence_id',
    type: DataTypes.UUID,
    references: {
      model: 'ping_sequences',
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
