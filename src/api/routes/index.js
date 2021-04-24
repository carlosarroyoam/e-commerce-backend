const { Router } = require('express');

module.exports = ({
  userRoutes, bookRoutes, rootRoute, defaultRoute,
}) => {
  const router = Router();
  const apiRouter = Router();

  apiRouter.use('/', rootRoute);
  apiRouter.use('/user', userRoutes);
  apiRouter.use('/book', bookRoutes);
  apiRouter.use('*', defaultRoute);

  router.use('/api', apiRouter);

  return router;
};
