const { Router } = require('express');

module.exports = ({ config }) => {
  const router = Router();

  router.get('/', (request, response) => {
    const APP_URL = `${config.APP_URL}:${config.PORT}`;

    response.send({
      version: '0.1.0-snapshot',
      documentation: `${APP_URL}/api/v1/docs`,
      author: 'carlosarroyoam',
      resources: {
        users: {
          paths: [
            {
              name: 'index',
              path: `${APP_URL}/api/v1/user`,
            },
            {
              name: 'show',
              path: `${APP_URL}/api/v1/user/[id]`,
            },
          ],
        },
        books: {
          paths: [
            {
              name: 'index',
              path: `${APP_URL}/api/v1/book`,
            },
            {
              name: 'show',
              path: `${APP_URL}/api/v1/book/[id]`,
            },
          ],
        },
      },
    });
  });

  return router;
};
