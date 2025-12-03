/**
 * @file routes/comments.router.js
 * @description comment 관련 라우터
 * 251203 v1.0.0 김위민 init
 */

import express from 'express';
import authMiddleware from '../app/middlewares/auth/auth.middleware.js';
import storeValidatior from '../app/middlewares/validations/validators/comments/store.validatior.js';
import validationHandler from '../app/middlewares/validations/validationHandler.js';
import commentsController from '../app/controllers/comments.controller.js';

const commentsRouter = express.Router();

commentsRouter.post('/', authMiddleware, storeValidatior, validationHandler, commentsController.store);

export default commentsRouter;