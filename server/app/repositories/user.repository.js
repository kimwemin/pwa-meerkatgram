/**
 * @file app/repositories/user.repository.js
 * @description User Repository
 * 251120 v1.0.0 김위민 init
 */

import db from '../models/index.js';
const { User } = db;

// DB에 접속, 데이터 검색 및 획득, 반환 처리

// transaction의 약어로 t를 많이 사용한다
async function findByEmail(t = null, email) {
  // SELECT * FROM users WHERE email = ? AND deleted_at IS NULL;
  return await User.findOne(
    {
      where: {
        email: email
      }
    },
    {
      transaction: t
    }
  );
}

export default {
  findByEmail,
}