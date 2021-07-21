const { Router } = require('express');
const validateRequestMiddleware = require('../../shared/middlewares/validateRequest.middleware');
const loginSchema = require('./schemas/login.schema');
const logoutSchema = require('./schemas/logout.schema');
const refreshTokenSchema = require('./schemas/refreshtoken.schema');
const resetPasswordSchema = require('./schemas/resetPassword.schema');
const forgotPasswordSchema = require('./schemas/forgotPassword.schema');

module.exports = ({ authController }) => {
  const router = Router();

  router.post(
    '/login',
    validateRequestMiddleware(loginSchema),
    authController.login.bind(authController)
  );

  router.post(
    '/logout',
    validateRequestMiddleware(logoutSchema),
    authController.logout.bind(authController)
  );

  router.post(
    '/refresh-token',
    validateRequestMiddleware(refreshTokenSchema),
    authController.refreshToken.bind(authController)
  );

  router.post(
    '/forgot-password',
    validateRequestMiddleware(forgotPasswordSchema),
    authController.forgotPassword.bind(authController)
  );

  router.post(
    '/reset-password',
    validateRequestMiddleware(resetPasswordSchema),
    authController.resetPassword.bind(authController)
  );

  return router;
};
