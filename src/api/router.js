const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../shared/docs/swagger');

const rootRoute = require('../shared/routes/root.routes');
const defaultRoute = require('../shared/routes/default.routes');
const authRoutes = require('../modules/auth/auth.routes');
const adminRoutes = require('../modules/admins/admin.routes');
const userRoutes = require('../modules/users/user.routes');

module.exports = () => {
  const router = Router();
  const apiRouter = Router();

  apiRouter.use('/auth', authRoutes());
  apiRouter.use('/users', userRoutes());
  apiRouter.use('/admins', adminRoutes());
  apiRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  router.use('/', rootRoute());
  router.use('/api/v1', apiRouter);
  router.use('*', defaultRoute());

  return router;
};
