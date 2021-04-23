const { Router, json } = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');

module.exports = ({
  userRoutes, bookRoutes, rootRoute, defaultRoute,
}) => {
  const router = Router();
  const apiRouter = Router();

  apiRouter
    .use(cors())
    .use(json())
    .use(compression())
    .use(morgan('dev'));

  apiRouter.use('/', rootRoute);
  apiRouter.use('/user', userRoutes);
  apiRouter.use('/book', bookRoutes);
  apiRouter.use('*', defaultRoute);

  router.use('/api', apiRouter);

  return router;
};
