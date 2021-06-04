const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

module.exports = ({
  authRoutes, userRoutes, adminRoutes, rootRoute, defaultRoute,
}) => {
  const router = Router();
  const apiRouter = Router();

  apiRouter.use('/auth', authRoutes);
  apiRouter.use('/user', userRoutes);
  apiRouter.use('/admin', adminRoutes);
  apiRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  router.use('/', rootRoute);
  router.use('/api/v1', apiRouter);
  router.use('*', defaultRoute);

  return router;
};
