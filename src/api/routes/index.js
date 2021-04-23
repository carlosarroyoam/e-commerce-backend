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

  apiRouter.use('/user', userRoutes);
  apiRouter.use('/book', bookRoutes);

  router.use('/api', apiRouter);

  return router;
};
