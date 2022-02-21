const { Router } = require('express');

const attributeController = require('./attribute.controller');

const verifyTokenMiddleware = require('../../shared/middlewares/verifyToken.middleware');
const adminGuardMiddleware = require('../../shared/middlewares/adminGuard.middleware');
const validateRequestMiddleware = require('../../shared/middlewares/validateRequest.middleware');

const indexAttributeSchema = require('./schemas/index.schema');
const showAttributeSchema = require('./schemas/show.schema');
const storeAttributeSchema = require('./schemas/store.schema');
const updateAttributeSchema = require('./schemas/update.schema');

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

  return router;
};
