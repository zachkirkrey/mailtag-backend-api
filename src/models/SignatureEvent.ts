import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface SignatureEventAttributes {
  id: number;
  signatureClikedTime: Date;
  signatureId: string;
  userId: string;
  emailId: string;
  emailSubject: string;
  clickRecipient: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SignatureEventCreationAttributes = Pick<SignatureEventAttributes, 'id'>;

interface SignatureEventModel
  extends Model<SignatureEventAttributes, SignatureEventCreationAttributes>,
    SignatureEventAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): SignatureEventModel;
};

const model = <ModelInstance>sequelize.define('signature_event', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  signatureClikedTime: {
    field: 'signature_cliked_time',
    type: DataTypes.DATE,
  },

  signatureId: {
    type: DataTypes.UUID,
    field: 'signature_id',
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
  emailSubject: {
    type: DataTypes.STRING(1024),
    field: 'email_subject',
  },
  clickRecipient: {
    type: DataTypes.ARRAY,
    field: 'click_recipient',
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
