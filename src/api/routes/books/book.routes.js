const { Router } = require('express');

module.exports = ({ bookController }) => {
  const router = Router();

  router.get('/', async (request, response, next) => {
    await bookController.index()
      .then((result) => {
        response.send({
          status: 200,
          message: 'OK',
          data: result,
        });
      })
      .catch(next);
  });

  return router;
};
