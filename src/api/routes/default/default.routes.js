const { Router } = require('express');

module.exports = () => {
  const router = Router();

  router.get('*', (request, response) => {
    response.send({
      status: 'Not Found',
      message: `The ${request.path} route was not found on this server`,
    });
  });

  return router;
};
