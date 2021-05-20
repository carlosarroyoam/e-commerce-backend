const { Router } = require('express');

module.exports = () => {
  const router = Router();

  router.get('*', (request, response) => {
    response.status(404).send({
      message: `The ${request.originalUrl} route was not found on this server`,
      error: 'Not found',
    });
  });

  return router;
};
