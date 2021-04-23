const { Router, json } = require('express');
const cors = require('cors');
const compression = require('compression');

module.exports = ({ userRoutes, bookRoutes }) => {
  const router = Router();
  const apiRouter = Router();

  apiRouter
    .use(cors())
    .use(json())
    .use(compression());

  apiRouter.use('/', (request, response) => {
    response.send({
      version: '0.1.0-snapshot',
      documentation: 'https://api.carlosarroyo.com/docs',
      author: 'carlosarroyoam',
    });
  });
  apiRouter.use('/user', userRoutes);
  apiRouter.use('/book', bookRoutes);
  apiRouter.get('*', (req, res) => {
    res.json({
      status: 'Not Found',
      message: `The ${req.path} route was not found on this server`,
    });
  });

  router.use('/api', apiRouter);

  return router;
};
