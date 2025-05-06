import express from 'express';
import { authRouter } from '../route/auth-router.js'
import { errorMiddleware } from '../middleware/error-middleware.js';

export const web = express();
web.use(express.json());

web.use(authRouter);

web.use(errorMiddleware);