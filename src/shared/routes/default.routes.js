const { Router } = require('express');

module.exports = () => {
  const router = Router();

  router.all('*', (request, response) => {
    response.status(404).send({
      error: 'Not found',
      message: `The ${request.originalUrl} route was not found on this server`,
    });
  });

  return router;
};
