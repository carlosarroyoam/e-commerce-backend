const { Router } = require('express');

module.exports = () => {
  const router = Router();

  router.get('/', (request, response) => {
    response.send({
      version: '0.1.0-snapshot',
      documentation: 'https://api.carlosarroyo.com/docs',
      author: 'carlosarroyoam',
    });
  });

  return router;
};
