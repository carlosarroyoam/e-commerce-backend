const { Router } = require('express');
const validateMiddleware = require('../core/middlewares/validateRequest.middleware');
const loginDto = require('./schemas/login.dto');

module.exports = ({ authController }) => {
  const router = Router();

  router.post('/login', validateMiddleware(loginDto), authController.login.bind(authController));

  return router;
};
