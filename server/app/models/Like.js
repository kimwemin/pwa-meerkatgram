/**
 * @file app/models/Like.js
 * @description like model
 * 251120 v1.0.0 김위민 init
 */

import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Like';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '좋아요 PK',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 PK',
  },
  postId: {
    field: 'post_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '게시글 PK'
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
  tableName: 'likes',
  timestamps: true,
  paranoid: true,
};

const Like = {
  init: (sequelize) => {
    const difine = sequelize.difine(modelName, attributes, options);

    return difine;
  },
  associate: (db) => {
    db.Like.belongsTo(db.User, { targetKey: 'id', foreignKey: 'user_id', as: 'user' });
    db.Like.belongsTo(db.Post, { targetKey: 'id', foreignKey: 'post_id', as: 'post' });
  }
};

export default Like;