/**
 * @file app/models/Post.js
 * @description post model
 * 251120 v1.0.0 김위민 init
 */

import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Post';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '게시글 PK',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 PK',
  },
  content: {
    field: 'content',
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: '내용',
  },
  image: {
    field: 'image',
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
    comment: '게시글 이미지'
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
  tableName: 'posts',
  timestamps: true,
  paranoid: true,
};

const Post = {
  init: (sequelize) => {
    const difine = sequelize.define(modelName, attributes, options);

    return difine;
  },
  associate: (db) => {
    db.Post.belongsTo(db.User, { targetKey: 'id', foreignKey: 'user_id', as: 'user' });
    db.Post.hasMany(db.Like, { sourceKey: 'id', foreignKey: 'post_id', as: 'likePostId' });
    db.Post.hasMany(db.Comment, { sourceKey: 'id', foreignKey: 'post_id', as: 'CommentPostId' });
  }
}

export default Post;