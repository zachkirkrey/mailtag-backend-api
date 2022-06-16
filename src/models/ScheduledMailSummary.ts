import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface ScheduledMailSummaryAttributes {
  id: number;
  jobType: string;
  scheduledJobId: string;
  inputData: any;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ScheduledMailSummaryCreationAttributes = Pick<ScheduledMailSummaryAttributes, 'id'>;

interface ScheduledMailSummaryModel
  extends Model<ScheduledMailSummaryAttributes, ScheduledMailSummaryCreationAttributes>,
    ScheduledMailSummaryAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): ScheduledMailSummaryModel;
};

const model = <ModelInstance>sequelize.define('scheduled_mail_summary', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  jobType: {
    type: DataTypes.STRING(1024),
  },
  inputData: {
    field: 'input_data',

    type: DataTypes.JSON,
  },
  scheduledJobId: {
    type: DataTypes.UUID,
    references: {
      model: 'scheduled_job',
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
