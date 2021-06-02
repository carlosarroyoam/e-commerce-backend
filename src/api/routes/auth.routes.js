const { Router } = require('express');

module.exports = ({ authController }) => {
  const router = Router();

  router.post('/login', authController.login.bind(authController));

  return router;
};
