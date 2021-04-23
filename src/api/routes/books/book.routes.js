const { Router } = require('express');

module.exports = ({ bookController }) => {
  const router = Router();

  router.get('/', bookController.index);

  return router;
};
