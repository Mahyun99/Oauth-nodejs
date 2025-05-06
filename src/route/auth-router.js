import express from 'express';
import { handleCallback, initateAuth, logout } from '../controller/auth-controller.js';
import session from 'express-session';
import { getUser } from '../controller/user-controller.js';

export const authRouter = new express.Router();

authRouter.use(session({
    secret: 'SECRET-KEY',
    resave: false,
    saveUninitialized: false
}))
authRouter.get('/auth/google', initateAuth);    // Google login
authRouter.get('/auth/google/callback', handleCallback);    // Google Callback Login
authRouter.get('/profile', getUser);

authRouter.get('/logout', logout);