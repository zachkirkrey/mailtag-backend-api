import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface PingSequenceDetailsAttributes {
  id: number;
  day: number;
  step: number;
  html: string;
  isDeleted: boolean;
  userId: string;
  pingSequenceId: string;
  pingName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PingSequenceDetailsCreationAttributes = Pick<PingSequenceDetailsAttributes, 'id'>;

interface PingSequenceDetailsModel
  extends Model<PingSequenceDetailsAttributes, PingSequenceDetailsCreationAttributes>,
    PingSequenceDetailsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): PingSequenceDetailsModel;
};

const model = <ModelInstance>sequelize.define('ping_sequence_details', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  day: {
    type: DataTypes.INTEGER,
  },
  step: {
    type: DataTypes.INTEGER,
  },
  html: {
    type: DataTypes.TEXT,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  pingName: {
    type: DataTypes.UUID,
    field: 'ping_name',
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
