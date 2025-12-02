/**
 * @file routes/auth.router.js
 * @description 인증 관련 라우터
 * 251119 v1.0.0 김위민 init
 */

import express from 'express';
import authController from '../app/controllers/auth.controller.js';
import loginValidator from '../app/middlewares/validations/validators/auth/login.validator.js';
import validationHandler from '../app/middlewares/validations/validationHandler.js';
import authMiddleware from '../app/middlewares/auth/auth.middleware.js';

const authRouter = express.Router();

// client -> app.js -> router -> middleware(필요할 경우에만) -> controller -> 비지니스 로직(service)에서 연산 처리 -> repagitory -> service -> controller -> client
// router는 컨트롤러로 연결하는 연결책에 불과하다
// return은 후속 동작이 없을 때 확실히 작업을 끝내기 위해 사용
authRouter.post('/login', loginValidator, validationHandler, authController.login);
authRouter.post('/reissue', authController.reissue);

export default authRouter;