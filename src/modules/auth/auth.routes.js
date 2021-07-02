const { Router } = require('express');
const validateRequestMiddleware = require('../core/middlewares/validateRequest.middleware');
const loginSchema = require('./schemas/login.schema');

module.exports = ({ authController }) => {
  const router = Router();

  router.post('/login', validateRequestMiddleware(loginSchema), authController.login.bind(authController));

  return router;
};
