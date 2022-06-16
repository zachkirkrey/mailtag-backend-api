import { BuildOptions, DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';

export interface ReferAFriendOptionsAttributes {
  id: number;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ReferAFriendOptionsCreationAttributes = Pick<ReferAFriendOptionsAttributes, 'id'>;

interface ReferAFriendOptionsModel
  extends Model<ReferAFriendOptionsAttributes, ReferAFriendOptionsCreationAttributes>,
    ReferAFriendOptionsAttributes {}

type ModelInstance = typeof Model & {
  new (values?: unknown, options?: BuildOptions): ReferAFriendOptionsModel;
};

const model = <ModelInstance>sequelize.define('refer_a_friend_options', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
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
