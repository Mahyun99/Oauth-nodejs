import express from 'express';
import session from 'express-session';
import authController from '../controller/auth-controller.js';

export const publicRouter = new express.Router();

publicRouter.use(session({
    secret: 'SECRET-KEY',
    resave: false,
    saveUninitialized: false
}))
publicRouter.get('/', authController.home);    // Google login
publicRouter.get('/auth/google', authController.initateAuth);    // Google login
publicRouter.get('/auth/google/callback', authController.handleCallback);    // Google Callback Login

