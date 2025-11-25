/**
 * @file app/models/PushSubscription.js
 * @description push_subscription model
 * 251120 v1.0.0 김위민 init
 */

import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'PushSubscription';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '푸시구독 PK',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 PK',
  },
  endpoint: {
    field: 'endpoint',
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    commnet: '엔드포인트',
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue('createdAt');

      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue('updatedAt');

      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue('deletedAt');

      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};

const options = {
  tableName: 'push_subscriptions',
  timestamps: true,
  paranoid: true,
};

const PushSubscription = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  associate: (db) => {
    db.PushSubscription.belongsTo(db.User, { targetKey: 'id', foreignKey: 'user_id', as: 'user' });
  }
};

export default PushSubscription;