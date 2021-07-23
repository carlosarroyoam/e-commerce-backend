const { Router } = require('express');
const validateRequestMiddleware = require('../../shared/middlewares/validateRequest.middleware');
const indexAdminSchema = require('./schemas/index.schema');
const showAdminSchema = require('./schemas/show.schema');
const storeAdminSchema = require('./schemas/store.schema');
const updateAdminSchema = require('./schemas/update.schema');

module.exports = ({ adminController, verifyTokenMiddleware, adminGuardMiddleware }) => {
  const router = Router();

  router.get(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(indexAdminSchema),
    adminGuardMiddleware,
    adminController.index.bind(adminController)
  );

  router.get(
    '/:adminId',
    verifyTokenMiddleware,
    validateRequestMiddleware(showAdminSchema),
    adminController.show.bind(adminController)
  );

  router.post(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(storeAdminSchema),
    adminController.store.bind(adminController)
  );

  router.put(
    '/:adminId',
    verifyTokenMiddleware,
    validateRequestMiddleware(updateAdminSchema),
    adminController.update.bind(adminController)
  );

  return router;
};
