/**
 * @file app/services/auth.service.js
 * @description auth Service
 * 251120 v1.0.0 김위민 init
 */

import bcrypt from 'bcrypt';
import userRepository from "../repositories/user.repository.js";
import myError from '../errors/customs/my.error.js';
import { NOT_REGISTERED_ERROR } from '../../configs/responseCode.config.js';
import jwtUtil from '../utils/jwt/jwt.util.js';
import db from '../models/index.js'

// 실질적으로 구현하고자 하는 비지니스 처리가 들어가는 파일

/**
 * 로그인
 * @param {{emali: string, password: string}}} body 
 * @returns {Promise<import("../models/User.js").User>}
 */
async function login(body) {
  // 트랜잭션 처리
  // 비지니스 처리 도중 오류가 생겼을 때 롤백하기 위해 비지니스 로직들을 하나의 트랜잭션으로 감싸주는 처리
  return await db.sequelize.transaction(async t => {
    const { email, password } = body;
  
    // email로 유저 정보 획득
    const user = await userRepository.findByEmail(t, email);
  
    //유저 존재 여부 체크
    if(!user) {
      throw myError('유저 미존재', NOT_REGISTERED_ERROR);
    }
  
    // 비밀번호 체크
    // compare : 비동기 처리 / compareSync : 동기 처리
    if(!bcrypt.compareSync(password, user.password)) {
      throw myError('비밀번호 틀림', NOT_REGISTERED_ERROR);
    }
  
    // JWT 생성(accessToken, refreshToken)
    const accessToken = jwtUtil.generateAccessToken(user);
    const refreshToken = jwtUtil.generateRefreshToken(user);
  
    // refreshToken 저장
    user.refreshToken = refreshToken;
    await userRepository.save(t, user);
  
    return {
      accessToken,
      refreshToken,
      user
    };
  });
}

export default {
  login,
}