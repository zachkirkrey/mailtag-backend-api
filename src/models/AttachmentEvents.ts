import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface AttachmentEventsAttributes {
  id: number;
  attachmentClickedTime: string;
  attachmentClickedDeviceName: string;
  attachmentId: string;
  isDeleted: boolean;
  userAgent: any;
  location: any;
  clickRecipient: string;
  attachmentIndex: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AttachmentEventsCreationAttributes = Pick<AttachmentEventsAttributes, 'id'>;

interface AttachmentEventsModel
  extends Model<AttachmentEventsAttributes, AttachmentEventsCreationAttributes>,
    AttachmentEventsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): AttachmentEventsModel;
};

const model = <ModelInstance>sequelize.define('attachment_event', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  attachmentClickedTime: {
    type: DataTypes.STRING,
    field: 'attachment_cliked_time',
  },
  attachmentClickedDeviceName: {
    type: DataTypes.STRING(1024),
    field: 'attachment_clicked_device_name',
  },
  attachmentId: {
    type: DataTypes.UUID,
    references: {
      model: 'attachments',
      key: 'id',
    },
    field: 'attachment_id',
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  userAgent: {
    type: DataTypes.JSON,
    field: 'user_agent',
    field: 'user_agent',
  },
  location: {
    type: DataTypes.JSON,
  },
  clickRecipient: {
    type: DataTypes.STRING(1024),
    field: 'click_recipient',
  },
  attachmentIndex: {
    type: DataTypes.INTEGER,
    field: 'attachment_index',
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
