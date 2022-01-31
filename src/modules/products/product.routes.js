const { Router } = require('express');

const productController = require('./product.controller');

const verifyTokenMiddleware = require('../../shared/middlewares/verifyToken.middleware');
const adminGuardMiddleware = require('../../shared/middlewares/adminGuard.middleware');
const validateRequestMiddleware = require('../../shared/middlewares/validateRequest.middleware');

const indexProductSchema = require('./schemas/index.schema');
const showProductSchema = require('./schemas/show.schema');
const storeProductSchema = require('./schemas/store.schema');
const updateProductSchema = require('./schemas/update.schema');

module.exports = () => {
  const router = Router();

  router.get('/', validateRequestMiddleware(indexProductSchema), productController.index);

  return router;
};
