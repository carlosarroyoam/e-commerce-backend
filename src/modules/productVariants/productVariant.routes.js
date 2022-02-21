const { Router } = require('express');

const productVariantController = require('./productVariant.controller');

const verifyTokenMiddleware = require('../../shared/middlewares/verifyToken.middleware');
const adminGuardMiddleware = require('../../shared/middlewares/adminGuard.middleware');
const validateRequestMiddleware = require('../../shared/middlewares/validateRequest.middleware');

const indexProductVariantSchema = require('./schemas/index.schema');
const showProductVariantSchema = require('./schemas/show.schema');
const storeProductVariantSchema = require('./schemas/store.schema');
const updateProductVariantSchema = require('./schemas/update.schema');

module.exports = () => {
  const router = Router();

  router.get(
    '/products/:product_id/variants',
    validateRequestMiddleware(indexProductVariantSchema),
    productVariantController.index
  );

  router.get(
    '/products/:product_id/variants/:variant_id',
    validateRequestMiddleware(showProductVariantSchema),
    productVariantController.show
  );

  return router;
};
