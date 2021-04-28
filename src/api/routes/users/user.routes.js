const { Router } = require('express');

module.exports = ({ userController }) => {
  const router = Router();

  router.get('/', async (request, response) => {
    const users = await userController.index();

    response.send({
      status: 200,
      message: 'OK',
      data: users,
    });
  });

  router.post('/', (request, response) => {
    response.send(request.body);
  });

  return router;
};
