import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface ScheduledJobsAttributes {
  id: number;
  type: string;
  scheduledTime: string;
  inputData: string;
  status: string;
  isDeleted: boolean;
  userId: string;
  senderEmail: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ScheduledJobsCreationAttributes = Pick<ScheduledJobsAttributes, 'id'>;

interface ScheduledJobsModel
  extends Model<ScheduledJobsAttributes, ScheduledJobsCreationAttributes>,
    ScheduledJobsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): ScheduledJobsModel;
};

const model = <ModelInstance>sequelize.define('scheduled_job', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING(1024),
  },
  scheduledTime: {
    type: DataTypes.STRING,
    field: 'scheduled_time',
  },
  inputData: {
    type: DataTypes.TEXT,
    field: 'input_data',
  },
  status: {
    type: DataTypes.STRING(1024),
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
  senderEmail: {
    field: 'sender_email',
    type: DataTypes.STRING(1024),
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
