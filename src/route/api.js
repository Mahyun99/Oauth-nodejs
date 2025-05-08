import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import cookieParser from 'cookie-parser';
import authController from '../controller/auth-controller.js';
import userController from '../controller/user-controller.js';

export const apiRouter = new express.Router();

apiRouter.use(cookieParser());
apiRouter.use(authMiddleware);

apiRouter.get('/api/profile', userController.getUser);
apiRouter.delete('/api/logout', authController.logout);