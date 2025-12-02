/**
 * @file app/middlewares/multer/uploaders/post.uploader.js
 * @description 게시글 이미지 업로더
 * 251127 v1.0.0 김위민 init
 */

import multer from 'multer';
import fs from 'fs';
import dayjs from 'dayjs';
import myError from '../../../errors/customs/my.error.js';
import { BAD_FILE_ERROR } from '../../../../configs/responseCode.config.js';
import pathUtil from '../../../utils/path/path.util.js';

/**
 * 게시글 이미지 업로더 처리 미들웨어
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export default function(req, res, next) {
  // multer 객체 인스턴스
  const upload = multer({
    // storage: 파일을 저장할 위치를 상세하게 제어하는 프로퍼티
    storage: multer.diskStorage({
      // 파일 저장 경로 설정
      destination(req, file, callback) {
        const fullPath = pathUtil.getPostsImagePath();

        // 저장 디렉토리 설정
        if(!fs.existsSync(fullPath)) {
          // 해당 디렉토리 없으면 생성 처리
          fs.mkdirSync(
            fullPath,
            {
              recursive: true, // 중간 디렉토리까지 모두 생성
              mode: 0o755 // 권한 설정 rwx(생성자)r-xr(그룹)-x(기타) 를 8진수로 설정
            }
          );
        }

        callback(null, fullPath); // multer 내장 콜백 함수, 첫번째 파라미터로 null이 들어가면 알아서 다음 처리 / error가 들어가면 error를 발생
      },
      // 파일명 설정
      filename(req, file, callback) {
        // 저장할 파일명 생성
        const uniqueFileName = `${dayjs().format('YYYYMMDD')}_${crypto.randomUUID()}`;
        const fileNameParts = file.originalname.split('.');
        const ext = fileNameParts[fileNameParts.length - 1].toLowerCase();// extention의 약자로 ext 사용

        callback(null, `${uniqueFileName}.${ext}`);
      }
    }),
    // fileFilter: 파일 필터링 처리를 제어하는 프로퍼티
    fileFilter(req, file, callback) {
      if(!file.mimetype.startsWith('image/')) {
        return callback(myError('이미지 파일 아님', BAD_FILE_ERROR));
      }

      callback(null, true);
    },
    // limits: 파일 사이즈 제한, 파일 개수 제한
    limits: {
      fileSize: parseInt(process.env.FILE_POST_IMAGE_SIZE)
    }
  }).single('image'); // single('key'): 키를 읽어 각각의 옵션에 맞춰 필터링 및 제어해 하나의 파일만 가져오겠다

  // 예외 처리
  upload(req, res, err => {
    if(err instanceof multer.MulterError || err) {
      next(myError(err.message, BAD_FILE_ERROR));
    }
    next();
  });
}