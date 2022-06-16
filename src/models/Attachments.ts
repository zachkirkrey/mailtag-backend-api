import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface AttachmentsAttributes {
  id: number;
  attachmentLink: any;
  destinationEmail: string;
  emailId: string;
  isDeleted: boolean;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AttachmentsCreationAttributes = Pick<AttachmentsAttributes, 'id'>;

interface AttachmentsModel extends Model<AttachmentsAttributes, AttachmentsCreationAttributes>, AttachmentsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): AttachmentsModel;
};

const model = <ModelInstance>sequelize.define('attachment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  destinationEmail: {
    field: 'destination_email',

    type: DataTypes.STRING(1024),
  },
  emailId: {
    type: DataTypes.UUID,
    field: 'email_id',
  },
  attachmentLink: {
    type: DataTypes.JSON,
    field: 'attachment_link',
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
