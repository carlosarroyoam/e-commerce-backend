const { Router } = require('express');

const attributeController = require('./attribute.controller');

const verifyTokenMiddleware = require('../../shared/middlewares/verifyToken.middleware');
const adminGuardMiddleware = require('../../shared/middlewares/adminGuard.middleware');
const validateRequestMiddleware = require('../../shared/middlewares/validateRequest.middleware');

const indexAttributeSchema = require('./schemas/index.schema');
const showAttributeSchema = require('./schemas/show.schema');
const storeAttributeSchema = require('./schemas/store.schema');
const updateAttributeSchema = require('./schemas/update.schema');
const deleteAttributeSchema = require('./schemas/delete.schema');
const restoreAttributeSchema = require('./schemas/restore.schema');

module.exports = () => {
  const router = Router();

  router.get(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(indexAttributeSchema),
    adminGuardMiddleware,
    attributeController.index
  );

  router.get(
    '/:attribute_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(showAttributeSchema),
    adminGuardMiddleware,
    attributeController.show
  );

  router.post(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(storeAttributeSchema),
    adminGuardMiddleware,
    attributeController.store
  );

  router.put(
    '/:attribute_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(updateAttributeSchema),
    adminGuardMiddleware,
    attributeController.update
  );

  router.delete(
    '/:attribute_id',
    verifyTokenMiddleware,
    validateRequestMiddleware(deleteAttributeSchema),
    adminGuardMiddleware,
    attributeController.destroy
  );

  router.put(
    '/:attribute_id/restore',
    verifyTokenMiddleware,
    validateRequestMiddleware(restoreAttributeSchema),
    adminGuardMiddleware,
    attributeController.restore
  );

  return router;
};
