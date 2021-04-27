const { Router } = require('express');

module.exports = ({ bookController }) => {
  const router = Router();

  router.get('/', (response, result) => {
    bookController.index(response, result);
  });

  return router;
};
