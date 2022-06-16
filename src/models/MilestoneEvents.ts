import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface MilestoneEventsAttributes {
  id: number;
  userId: string;
  eventType: number;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type MilestoneEventsCreationAttributes = Partial<MilestoneEventsAttributes>;

interface MilestoneEventsModel
  extends Model<MilestoneEventsAttributes, MilestoneEventsCreationAttributes>,
    MilestoneEventsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): MilestoneEventsModel;
};

const model = <ModelInstance>sequelize.define('milestone_event', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  eventType: {
    type: DataTypes.INTEGER,
    field: 'event_type',
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
