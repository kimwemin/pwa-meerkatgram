/**
 * @file app/models/Notification.js
 * @description notification model
 * 251120 v1.0.0 김위민 init
 */

import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Notification';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '알림 PK',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 PK',
  },
  title: {
    field: 'title',
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: '제목',
  },
  content: {
    field: 'content',
    type: DataTypes.STRING(1000),
    allowNull: false,
    comment: '내용'
  },
  isRead: {
    field: 'is_read',
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '읽음 여부'
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
  tableName: 'notifications',
  timestamps: true,
  paranoid: true,
};

const Notification = {
  init: (sequelize) => {
    const define = sequelize.define(modelName, attributes, options);

    return define;
  },
  associate: (db) => {
    db.Notification.belongsTo(db.User, { targetKey: 'id', foreignKey: 'user_id', as: 'user' });
  }
};

export default Notification;