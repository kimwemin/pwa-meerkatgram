/**
 * @file app/middlewares/validations/fields/post.field.js
 * @description 게시글 유효성 검사 필드
 * 251128 v1.0.0 김위민 init
 */

import { body, param } from "express-validator";

// 페이지 필드
export const page = body('page')
  .trim()
  .optional()
  .isNumeric() // 숫자인지 체크
  .withMessage('숫자만 허용합니다.')
  .toInt(); // 숫자로 변환
  
// 게시글 PK 필드
export const id = param('id')
  .trim()
  .notEmpty()
  .withMessage('필수 항목입니다.')
  .bail()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt();