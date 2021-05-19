const { Router } = require('express');

module.exports = () => {
  const router = Router();

  router.get('/', (request, response) => {
    const fullUrl = `${request.protocol}://${request.hostname}:3000${request.originalUrl}`;

    response.send({
      version: '0.1.0-snapshot',
      documentation: `${fullUrl}api/v1/docs`,
      author: 'carlosarroyoam',
      resources: {
        users: {
          paths: [
            {
              name: 'index',
              path: `${fullUrl}api/v1/user`,
            },
            {
              name: 'show',
              path: `${fullUrl}api/v1/user/[id]`,
            },
          ],
        },
        books: {
          paths: [
            {
              name: 'index',
              path: `${fullUrl}api/v1/book`,
            },
            {
              name: 'show',
              path: `${fullUrl}api/v1/book/[id]`,
            },
          ],
        },
      },
    });
  });

  return router;
};
