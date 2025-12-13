import { Router } from 'express';

import productController from '#features/products/product.controller.js';

import verifyTokenMiddleware from '#core/middlewares/verifyToken.middleware.js';
import adminGuardMiddleware from '#core/middlewares/adminGuard.middleware.js';
import validateRequestMiddleware from '#core/middlewares/validateRequest.middleware.js';

import indexProductSchema from './schemas/index.schema.js';
import showProductSchema from './schemas/show.schema.js';
import storeProductSchema from './schemas/store.schema.js';
import updateProductSchema from './schemas/update.schema.js';

export default () => {
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
