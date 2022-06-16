import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface PingSequencesAttributes {
  id: number;
  pingSequenceName: string;
  numberOfPings: number;
  sequenceDuration: number;
  isDeleted: boolean;
  recipientsTimezone: string;
  sendPingWeekDays: any;
  isSendPingTime: boolean;
  sendPingStartTime: string;
  sendPingEndTime: string;
  isSendPingOnSpecialHolidays: boolean;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PingSequencesCreationAttributes = Pick<PingSequencesAttributes, 'id'>;

interface PingSequencesModel
  extends Model<PingSequencesAttributes, PingSequencesCreationAttributes>,
    PingSequencesAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): PingSequencesModel;
};

const model = <ModelInstance>sequelize.define('ping_sequence', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  pingSequenceName: {
    type: DataTypes.STRING(1024),
    field: 'ping_sequence_name',
  },
  numberOfPings: {
    type: DataTypes.INTEGER,
    field: 'number_of_pings',
  },
  sequenceDuration: {
    type: DataTypes.INTEGER,
    field: 'sequence_duration',
  },
  recipientsTimezone: {
    type: DataTypes.STRING(1024),
    field: 'recipients_timezone',
  },
  sendPingWeekDays: {
    type: DataTypes.JSON,
    field: 'send_ping_week_days',
  },
  isSendPingTime: {
    type: DataTypes.INTEGER,
    field: 'is_send_ping_time',
  },
  sendPingStartTime: {
    type: DataTypes.STRING(255),
    field: 'send_ping_start_time',
  },
  sendPingEndTime: {
    type: DataTypes.STRING(255),
    field: 'send_ping_end_time',
  },
  isSendPingOnSpecialHolidays: {
    type: DataTypes.BOOLEAN,
    field: 'is_send_ping_on_special_holidays',
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
