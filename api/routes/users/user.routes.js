const { Router } = require('express');

module.exports = ({ userController }) => {
  const router = Router();

  router.get('/', userController.index);

  return router;
};
