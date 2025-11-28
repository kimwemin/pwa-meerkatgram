/**
 * @file app/repositories/user.repository.js
 * @description User Repository
 * 251120 v1.0.0 김위민 init
 */

import db from '../models/index.js';
const { User } = db;

// DB에 접속, 데이터 검색 및 획득, 반환 처리
/**
 * 이메일로 유저 찾기
 * @param {import("sequelize").Transaction} t 
 * @param {string} email 
 * @returns 
*/
async function findByEmail(t = null, email) {// transaction의 약어로 t를 많이 사용한다
  // SELECT * FROM users WHERE email = ? AND deleted_at IS NULL;
  return await User.findOne(
    {
      where: {
        email: email
      },
      transaction: t
    }
  );
}

/**
 * 유저 모델 인스턴스로 save 처리
 * @param {import("sequelize").Transaction} t 
 * @param {import("../models/index.js")} user 
 * @returns 
 */
async function save(t = null, user) {
  return await user.save({ transaction: t });
}

export default {
  findByEmail,
  save
}