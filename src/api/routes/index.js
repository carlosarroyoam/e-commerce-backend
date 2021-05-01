const { Router } = require('express');

module.exports = ({
  userRoutes, bookRoutes, rootRoute, defaultRoute,
}) => {
  const router = Router();
  const apiRouter = Router();

  apiRouter.use('/user', userRoutes);
  apiRouter.use('/book', bookRoutes);

  router.use('/', rootRoute);
  router.use('/api', apiRouter);
  router.use('*', defaultRoute);

  return router;
};
