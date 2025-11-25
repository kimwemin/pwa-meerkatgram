/**
 * @file app/services/auth.service.js
 * @description auth Service
 * 251120 v1.0.0 김위민 init
 */

import bcrypt from 'bcrypt';
import userRepository from "../repositories/user.repository.js";
import myError from '../errors/customs/my.error.js';
import { NOT_REGISTERD_ERROR } from '../../configs/responseCode.config.js';

// 실질적으로 구현하고자 하는 비지니스 처리가 들어가는 파일

async function login(body) {
  const { email, password } = body;

  // email로 유저 정보 획득
  const result = await userRepository.findByEmail(null, email);

  //유저 존재 여부 체크
  if(!result) {
    throw myError('유저 미존재', NOT_REGISTERD_ERROR);
  }

  // 비밀번호 체크
  // compare : 비동기 처리 / compareSync : 동기 처리
  if(!bcrypt.compareSync(password, result.password)) {
    throw myError('비밀번호 틀림', NOT_REGISTERD_ERROR);
  }

  return result;
}

export default {
  login,
}