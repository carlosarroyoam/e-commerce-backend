const { Router } = require('express');

const productController = require('./product.controller');

const verifyTokenMiddleware = require('../../common/middlewares/verifyToken.middleware');
const adminGuardMiddleware = require('../../common/middlewares/adminGuard.middleware');
const validateRequestMiddleware = require('../../common/middlewares/validateRequest.middleware');

const indexProductSchema = require('./schemas/index.schema');
const showProductSchema = require('./schemas/show.schema');
const storeProductSchema = require('./schemas/store.schema');
const updateProductSchema = require('./schemas/update.schema');

module.exports = () => {
  // eslint-disable-next-line new-cap
  const router = Router();

  router.get('/', validateRequestMiddleware(indexProductSchema), productController.index);

  router.get('/:product_id', validateRequestMiddleware(showProductSchema), productController.show);

  router.post(
    '/',
    verifyTokenMiddleware,
    validateRequestMiddleware(storeProductSchema),
    adminGuardMiddleware,
    productController.store
  );

  return router;
};
