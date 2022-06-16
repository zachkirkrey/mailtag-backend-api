import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface LinkEventsAttributes {
  id: number;
  linkClickedTime: string;
  linkClickedDeviceName: string;
  linkId: string;
  isDeleted: boolean;
  userAgent: any;
  location: any;
  clickRecipient: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export type LinkEventsCreationAttributes = Pick<LinkEventsAttributes, 'id'>;

interface LinkEventsModel extends Model<LinkEventsAttributes, LinkEventsCreationAttributes>, LinkEventsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): LinkEventsModel;
};

const model = <ModelInstance>sequelize.define('link_event', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  linkClickedTime: {
    type: DataTypes.STRING,
    field: 'link_cliked_time',
  },
  linkClickedDeviceName: {
    type: DataTypes.STRING(1024),
    field: 'link_clicked_device_name',
  },
  linkId: {
    type: DataTypes.UUID,
    references: {
      model: 'links',
      key: 'id',
    },
    field: 'link_id',
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  userAgent: {
    type: DataTypes.JSON,
    field: 'user_agent',
  },
  location: {
    type: DataTypes.JSON,
  },
  clickRecipient: {
    type: DataTypes.JSON,
    field: 'click_recipient',
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
