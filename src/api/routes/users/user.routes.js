const { Router } = require('express');

module.exports = ({ userController }) => {
  const router = Router();

  router.get('/', userController.index);
  router.post('/', (request, response) => {
    response.send(request.body);
  });

  return router;
};
