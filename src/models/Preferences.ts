import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface PreferencesAttributes {
  id: number;
  removeAds: number;
  desktopNotification: number;
  emailNotification: number;
  reminders: number;
  linkTracking: number;
  clickNotification: number;
  dailyReport: number;
  deliveryTime: number;
  bcc: string;
  userId: string;
  isDeleted: boolean;
  enableMailTag: boolean;
  subDomain: string;
  subDomainDetails: any;
  emailDomain: string;
  attachmentTracking: number;
  notifyOnce: boolean;
  domainVerification: boolean;
  signature: number;
  signaturePings: number;
  boomerang: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PreferencesCreationAttributes = Pick<PreferencesAttributes, 'id'>;

interface PreferencesModel extends Model<PreferencesAttributes, PreferencesCreationAttributes>, PreferencesAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): PreferencesModel;
};

const model = <ModelInstance>sequelize.define('preferences', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  removeAds: {
    type: DataTypes.BOOLEAN,
    field: 'remove_ads',
  },
  desktopNotification: {
    type: DataTypes.BOOLEAN,
    field: 'desktop_notification',
  },
  emailNotification: {
    type: DataTypes.BOOLEAN,
    field: 'email_notification',
  },
  reminders: {
    type: DataTypes.BOOLEAN,
  },
  linkTracking: {
    type: DataTypes.BOOLEAN,
    field: 'link_tracking',
  },
  clickNotification: {
    type: DataTypes.BOOLEAN,
    field: 'click_notification',
  },
  dailyReport: {
    type: DataTypes.BOOLEAN,
    field: 'daily_report',
  },
  deliveryTime: {
    type: DataTypes.BOOLEAN,
    field: 'delivery_time',
  },
  bcc: {
    type: DataTypes.STRING(1024),
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
  },
  enableMailTag: {
    type: DataTypes.BOOLEAN,
    field: 'enable_mailtag',
  },
  subDomain: {
    type: DataTypes.STRING(1024),
    field: 'sub_domain',
  },
  subDomainDetails: {
    type: DataTypes.JSON,
    field: 'sub_domain_details',
  },
  emailDomain: {
    type: DataTypes.STRING,
    field: 'email_domain',
  },
  attachmentTracking: {
    type: DataTypes.BOOLEAN,
    field: 'attachment_tracking',
  },
  notifyOnce: {
    type: DataTypes.BOOLEAN,
    field: 'notify_once',
  },
  domainVerification: {
    type: DataTypes.BOOLEAN,
    field: 'domain_verification',
  },
  boomerang: {
    type: DataTypes.STRING(1024),
  },
  signature: {
    type: DataTypes.STRING(1024),
  },
  signaturePings: {
    type: DataTypes.STRING(1024),
    field: 'signature_pings',
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
