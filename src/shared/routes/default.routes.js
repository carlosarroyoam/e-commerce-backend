const { Router } = require('express');

module.exports = () => {
  const router = Router();

  router.all('*', (request, response) => {
    const route = request.originalUrl;

    response.status(404).json({
      error: 'Not found',
      message: `The ${route} route was not found on this server`,
    });
  });

  return router;
};
