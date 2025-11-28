/**
 * @file app/repositories/post.repository.js
 * @description Post Repository
 * 251120 v1.0.0 김위민 init
 */

import db from '../models/index.js';
const { sequelize, Post, Comment } = db;

async function pagination(t = null, data) {
  return await Post.findAll(
    {
      order: [
        ['createdAt', 'DESC'],
        ['updatedAt', 'DESC'],
        ['id', 'ASC']
      ],
      limit: data.limit,
      offset: data.offset
    },
    {
      transaction: t,
    }
  );
}

async function findByPk(t = null, id) {
  return await Post.findByPk(
    id,
    {
      include: [
        {
          model: Comment,
          as: 'CommentPostId',
          where: {
            replyId: 0
          },
          required: false, // Left Join 설정, false: Left Join / true: Inner Join / 디폴트가 false(Left Join)
        }
      ],
      transaction: t
    }
  );
}

export default {
  pagination,
  findByPk,
}