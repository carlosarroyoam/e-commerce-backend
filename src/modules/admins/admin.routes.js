const { Router } = require('express');

const adminController = require('./admin.controller');

const verifyTokenMiddleware = require('../../common/middlewares/verifyToken.middleware');
const adminGuardMiddleware = require('../../common/middlewares/adminGuard.middleware');
const validateRequestMiddleware = require('../../common/middlewares/validateRequest.middleware');

const indexAdminSchema = require('./schemas/index.schema');
const showAdminSchema = require('./schemas/show.schema');
const storeAdminSchema = require('./schemas/store.schema');
const updateAdminSchema = require('./schemas/update.schema');

module.exports = () => {
  const router = Router();

  router.get(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(indexAdminSchema),
    adminGuardMiddleware,
    adminController.index
  );

  router.get(
    '/:admin_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(showAdminSchema),
    adminGuardMiddleware,
    adminController.show
  );

  router.post(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(storeAdminSchema),
    adminGuardMiddleware,
    adminController.store
  );

  router.put(
    '/:admin_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(updateAdminSchema),
    adminGuardMiddleware,
    adminController.update
  );

  return router;
};
