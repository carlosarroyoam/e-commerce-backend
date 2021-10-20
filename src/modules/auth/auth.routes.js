const { Router } = require('express');

const authController = require('./auth.controller');
const validateRequestMiddleware = require('../../shared/middlewares/validateRequest.middleware');
const loginSchema = require('./schemas/login.schema');
const logoutSchema = require('./schemas/logout.schema');
const refreshTokenSchema = require('./schemas/refreshToken.schema');
const resetPasswordSchema = require('./schemas/resetPassword.schema');
const forgotPasswordSchema = require('./schemas/forgotPassword.schema');

module.exports = () => {
  const router = Router();

  router.post('/login', validateRequestMiddleware(loginSchema), authController.login);

  router.post('/logout', validateRequestMiddleware(logoutSchema), authController.logout);

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
