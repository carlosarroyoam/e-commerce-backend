import { Router } from 'express';

import authController from '#modules/auth/auth.controller.js';

import validateRequestMiddleware from '#common/middlewares/validateRequest.middleware.js';

import loginSchema from './schemas/login.schema.js';
import refreshTokenSchema from './schemas/refreshToken.schema.js';
import resetPasswordSchema from './schemas/resetPassword.schema.js';
import forgotPasswordSchema from './schemas/forgotPassword.schema.js';

export default () => {
	// eslint-disable-next-line new-cap
	const router = Router();

	router.post('/login', validateRequestMiddleware(loginSchema), authController.login);

	router.post('/logout', authController.logout);

	router.post(
		'/refresh-token',
		validateRequestMiddleware(refreshTokenSchema),
		authController.refreshToken
	);

	router.post(
		'/forgot-password',
		validateRequestMiddleware(forgotPasswordSchema),
		authController.forgotPassword
	);

	router.post(
		'/reset-password',
		validateRequestMiddleware(resetPasswordSchema),
		authController.resetPassword
	);

	return router;
};
