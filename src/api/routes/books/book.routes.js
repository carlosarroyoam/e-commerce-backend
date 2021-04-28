const { Router } = require('express');

module.exports = ({ bookController }) => {
  const router = Router();

  router.get('/', async (request, response) => {
    const books = await bookController.index();

    response.send({
      status: 200,
      message: 'OK',
      data: books,
    });
  });

  return router;
};
